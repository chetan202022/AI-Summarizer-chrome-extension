# 🤖 AI Summarizer Chrome Extension

AI Summarizer is a Manifest V3 Chrome Extension that extracts webpage content and generates AI-powered summaries using Groq's Llama models. It helps users quickly understand articles and web content by reducing reading time and presenting concise summaries in multiple formats.

---

## 🚀 Features

* 📄 Summarize content from almost any webpage
* ⚡ AI-powered summaries using Groq's Llama models
* 📝 Multiple summary modes:

  * Brief Summary
  * Detailed Summary
  * Bullet-Point Summary
* 🔑 Automatic onboarding for API key configuration
* 💾 Secure API key storage using Chrome Sync Storage
* 📋 Copy generated summaries with one click
* ⚙️ Settings page to manage API keys anytime
* 🎯 Clean and lightweight user interface
* 🔄 Real-time summarization directly inside the browser

---

## 🛠️ Tech Stack

* JavaScript (ES6+)
* HTML5
* CSS3
* Chrome Extension APIs
* Manifest V3
* Content Scripts
* Service Workers
* Chrome Storage API
* Groq API
* Llama Models

---

## 📂 Project Structure

```text
.
├── background.js
├── content.js
├── icon.png
├── manifest.json
├── options.html
├── options.js
├── popup.html
├── popup.js
└── README.md
```

---

### 🤖 AI Summary Popup

Generate summaries directly from the extension popup.

> Replace this section with screenshots of:
>
> * Brief Summary
> * Detailed Summary
> * Bullet-Point Summary

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/chetan202022/AI-Summarizer-chrome-extension.git
```

### 2. Navigate to the project

```bash
cd AI-Summarizer-chrome-extension
```

### 3. Open Chrome Extensions

Visit:

```text
chrome://extensions/
```

### 4. Enable Developer Mode

Toggle **Developer Mode** in the top-right corner.

### 5. Load the Extension

* Click **Load unpacked**
* Select the project folder

---

## 🔑 Getting a Groq API Key

1. Visit: https://console.groq.com/keys
2. Create a free Groq account.
3. Generate an API key.
4. Install the extension.
5. The extension automatically opens the Settings page on first install.
6. Paste your API key and save.

---

## 🚀 Usage

1. Open any article or webpage.
2. Click the AI Summarizer extension icon.
3. Select a summary type:

   * Brief
   * Detailed
   * Bullet Points
4. Click **Summarize**.
5. View the generated summary.
6. Copy the summary using the **Copy** button.

---

## 🔒 Security & Privacy

* API keys are stored locally using Chrome Sync Storage.
* Users provide and manage their own Groq API keys.
* No summaries are stored or shared by the extension.
* No personal browsing data is collected.

---

## 💡 What I Learned

Through this project, I gained hands-on experience with:

* Building Manifest V3 Chrome Extensions
* Content Script and Background Script communication
* Chrome Messaging APIs
* Chrome Storage APIs
* Integrating third-party AI services
* Handling asynchronous workflows and API errors
* Designing user onboarding experiences

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## ⭐ If you found this project useful, consider giving it a star!
