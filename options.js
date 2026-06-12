document.addEventListener(
  "DOMContentLoaded",
  () => {
    chrome.storage.sync.get(
      ["groqApiKey"],
      (result) => {
        if (result.groqApiKey) {
          document.getElementById(
            "api-key"
          ).value = result.groqApiKey;
        }
      }
    );

    document
      .getElementById("save-button")
      .addEventListener("click", () => {
        const apiKey =
          document
            .getElementById("api-key")
            .value.trim();

        if (!apiKey) return;

        chrome.storage.sync.set(
          {
            groqApiKey: apiKey,
          },
          () => {
            const success =
              document.getElementById(
                "success-message"
              );

            success.style.display = "block";

            setTimeout(() => {
              window.close();
            }, 1000);
          }
        );
      });
  }
);