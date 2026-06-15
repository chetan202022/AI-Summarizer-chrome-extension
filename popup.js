document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarize");
  const copyBtn = document.getElementById("copy-btn");
  const exportBtn = document.getElementById("export-btn");
  const settingsBtn = document.getElementById("settings-btn");

  const resultDiv = document.getElementById("result");

  const summaryTypeEl = document.getElementById("summary-type");
  const languageEl = document.getElementById("language");
  const themeEl = document.getElementById("theme");

  // ===============================
  // LOAD SAVED SETTINGS
  // ===============================
  chrome.storage.sync.get(
    ["summaryType", "language", "theme"],
    (res) => {
      if (res.summaryType) summaryTypeEl.value = res.summaryType;
      if (res.language) languageEl.value = res.language;
      if (res.theme) applyTheme(res.theme);
    }
  );

  // ===============================
  // SAVE SETTINGS
  // ===============================
  summaryTypeEl.addEventListener("change", () => {
    chrome.storage.sync.set({ summaryType: summaryTypeEl.value });
  });

  languageEl.addEventListener("change", () => {
    chrome.storage.sync.set({ language: languageEl.value });
  });

  themeEl.addEventListener("change", () => {
    chrome.storage.sync.set({ theme: themeEl.value });
    applyTheme(themeEl.value);
  });

  // ===============================
  // BUTTON EVENTS
  // ===============================
  summarizeBtn.addEventListener("click", summarizePage);

  copyBtn.addEventListener("click", () => {
    const text = resultDiv.innerText.trim();
    if (!text) return;

    navigator.clipboard.writeText(text);

    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
  });

  exportBtn.addEventListener("click", () => {
    const text = resultDiv.innerText.trim();
    if (!text) return;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    a.click();

    URL.revokeObjectURL(url);
  });

  settingsBtn.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });

  // ===============================
  // THEME HANDLER
  // ===============================
  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else if (theme === "light") {
      document.body.classList.remove("dark");
    } else {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.classList.toggle("dark", dark);
    }
  }

  // ===============================
  // SUMMARIZE PAGE
  // ===============================
  async function summarizePage() {
    const summaryType = summaryTypeEl.value;
    const language = languageEl.value;

    resultDiv.innerHTML =
      '<div class="loading"><div class="loader"></div></div>';

    chrome.storage.sync.get(["groqApiKey"], (res) => {
      const apiKey = res.groqApiKey;

      if (!apiKey) {
        resultDiv.innerText = "Please set Groq API key in settings.";
        chrome.runtime.openOptionsPage();
        return;
      }

chrome.tabs.query(
  { active: true, currentWindow: true },
  async ([tab]) => {
    if (!tab?.id) {
      resultDiv.innerText = "Could not access current tab.";
      return;
    }

    try {
      // Inject content.js only when user clicks Summarize
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_ARTICLE_TEXT" },
        async (response) => {
          if (chrome.runtime.lastError || !response?.text) {
            resultDiv.innerText =
              "Unable to read page content. Refresh and try again.";
            return;
          }

          try {
            const summary = await getGroqSummary(
              response.text,
              summaryType,
              language,
              apiKey
            );

            resultDiv.innerText = summary;
          } catch (err) {
            resultDiv.innerText =
              err.message || "Failed to generate summary.";
          }
        }
      );
    } catch (error) {
      console.error(error);

      resultDiv.innerText =
        "Unable to access this page. Chrome extensions cannot summarize certain pages such as the Chrome Web Store, chrome:// pages, or internal browser pages.";
    }
  }
);
    });
  }

  // ===============================
  // GROQ API
  // ===============================
  async function getGroqSummary(text, type, lang, apiKey) {
    const trimmed =
      text.length > 15000 ? text.slice(0, 15000) + "..." : text;

    let prompt = "";

    if (type === "brief") {
      prompt = `Summarize in 2-3 sentences in ${lang}:\n\n${trimmed}`;
    } else if (type === "detailed") {
      prompt = `Provide a detailed summary in ${lang}:\n\n${trimmed}`;
    } else {
      prompt = `Summarize in 5-7 bullet points in ${lang} (use '- ' only):\n\n${trimmed}`;
    }

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          max_tokens: 800,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data?.error?.message ||
          "Groq API request failed"
      );
    }

    return (
      data?.choices?.[0]?.message?.content?.trim() ||
      "No summary generated."
    );
  }
});