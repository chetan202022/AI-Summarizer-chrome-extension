# 🤖 AI Summarizer Chrome Extension

AI Summarizer is a Manifest V3 Chrome Extension that extracts webpage content and generates AI-powered summaries using Groq’s Llama models. It helps users quickly understand articles by converting long content into concise, readable summaries in multiple formats and languages.

---

## 🌐 Chrome Web Store

Install AI Summarizer from the Chrome Web Store:

https://chromewebstore.google.com/detail/lmgihigkgdlnplkagbbnclbfnpacaojf?utm_source=item-share-cb

---

## 🚀 Features

* 📄 Summarize content from almost any webpage
* ⚡ AI-powered summaries using Groq's Llama models
* 📝 Multiple summary modes:

  * Brief Summary
  * Detailed Summary
  * Bullet-Point Summary
* 🌍 Multi-language support (English, Hindi, Spanish, French, German, Japanese)
* 🌗 Theme support:

  * Light Mode
  * Dark Mode
  * System Theme (auto-detect OS setting)
* 🔑 Automatic onboarding for API key configuration
* 💾 Secure API key storage using Chrome Sync Storage
* 📋 Copy generated summaries with one click
* 📄 Export summaries as .txt file
* ⚙️ Settings page to manage API keys anytime
* 🎯 Clean and lightweight user interface
* 🔄 Real-time summarization directly inside the browser

---

## 🛠️ Tech Stack

* JavaScript (ES6+)
* HTML5
* CSS3
* Chrome Extension APIs (Manifest V3)
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
├── icons
├── manifest.json
├── options.html
├── options.js
├── popup.html
├── popup.js
└── README.md
```

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

## 🚀 How to use

1. Open any article or webpage.
2. Click the AI Summarizer extension icon.
3. Select a summary type:

   * Summary type
   * Language
   * Theme
4. Click **Summarize**.
5. View AI-generated summary.
6. Use:
   * **Copy** button
   * **Export TXT** button

---

## 🌗 Theme System
* The extension supports:
  * **Light Mode** 
  * **Dark Mode** 
  * **System Theme** (auto detects OS theme) 

---

## 🌍 Multi-Language Support
* Summaries can be generated in:
  * English
  * Hindi 
  * Spanish
  * French
  * German
  * Japanese

---

## 📄 Export Feature
* Export any summary as a .txt file
* Useful for notes, revision, or documentation

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
