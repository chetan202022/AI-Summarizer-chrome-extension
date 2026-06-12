document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarize");
  const copyBtn = document.getElementById("copy-btn");
  const settingsBtn = document.getElementById("settings-btn");
  const resultDiv = document.getElementById("result");

  summarizeBtn.addEventListener("click", summarizePage);
  copyBtn.addEventListener("click", copySummary);

  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      chrome.runtime.openOptionsPage();
    });
  }

  async function summarizePage() {
    resultDiv.innerHTML =
      '<div class="loading"><div class="loader"></div></div>';

    const summaryType =
      document.getElementById("summary-type").value;

    chrome.storage.sync.get(
      ["groqApiKey"],
      async (result) => {
        const apiKey = result.groqApiKey;

        if (!apiKey) {
          resultDiv.innerText =
            "Groq API key not found. Opening Settings...";

          chrome.runtime.openOptionsPage();
          return;
        }

        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          ([tab]) => {
            if (!tab || !tab.id) {
              resultDiv.innerText =
                "Could not access current tab.";
              return;
            }

            chrome.tabs.sendMessage(
              tab.id,
              { type: "GET_ARTICLE_TEXT" },
              async (res) => {
                if (chrome.runtime.lastError) {
                  console.error(
                    chrome.runtime.lastError
                  );

                  resultDiv.innerText =
                    "Unable to access this page. Please refresh the page and try again.";

                  return;
                }

                if (!res || !res.text) {
                  resultDiv.innerText =
                    "Could not extract article text from this page.";

                  return;
                }

                try {
                  const summary =
                    await getGroqSummary(
                      res.text,
                      summaryType,
                      apiKey
                    );

                  resultDiv.innerText = summary;
                } catch (error) {
                  resultDiv.innerText =
                    error.message ||
                    "Failed to generate summary.";
                }
              }
            );
          }
        );
      }
    );
  }

  function copySummary() {
    const summaryText = resultDiv.innerText;

    if (!summaryText.trim()) return;

    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        const originalText = copyBtn.innerText;

        copyBtn.innerText = "Copied!";

        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error(
          "Failed to copy:",
          err
        );
      });
  }
});


async function getGroqSummary(
  text,
  summaryType,
  apiKey
) {
  const maxLength = 15000;

  const truncatedText =
    text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;

  let prompt = "";

  switch (summaryType) {
    case "brief":
      prompt = `
Provide a brief summary of the following article in 2–3 sentences.

Article:
${truncatedText}
`;
      break;

    case "detailed":
      prompt = `
Provide a detailed summary of the following article.
Cover all major points and important details.

Article:
${truncatedText}
`;
      break;

    case "bullets":
      prompt = `
Summarize the following article into 5–7 concise bullet points.

Each point should start with "- ".

Article:
${truncatedText}
`;
      break;

    default:
      prompt = `
Summarize the following article.

Article:
${truncatedText}
`;
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 700,
        }),
      }
    );

    const data = await response.json();

    console.log("Groq Response:", data);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid Groq API Key. Please update it in Settings."
        );
      }

      if (response.status === 429) {
        throw new Error(
          "Groq rate limit exceeded. Please try again in a few seconds."
        );
      }

      if (response.status >= 500) {
        throw new Error(
          "Groq service is temporarily unavailable. Please try again later."
        );
      }

      throw new Error(
        data.error?.message ||
          "Groq API request failed."
      );
    }

    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      "No summary available."
    );
  } catch (error) {
    console.error(
      "Error calling Groq API:",
      error
    );

    throw new Error(
      error.message ||
      "Failed to generate summary."
    );
  }
}