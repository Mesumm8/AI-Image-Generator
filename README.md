# 🎨 AI Image Generator

A lightweight, responsive web application built with vanilla JavaScript, HTML5, and CSS3 that generates custom images from text prompts using AI. Features dark mode, aspect ratio formatting, random prompt generation, and instant image downloading.

---

## ✨ Features

* **⚡ Free AI Image Generation:** Powered by Pollinations AI for fast, unlimited text-to-image generation without API keys or credit limits.
* **📐 Custom Aspect Ratios:** Supports multiple aspect ratios (`1:1`, `16:9`, `9:16`, `4:3`, `3:4`) automatically formatted to model dimensions.
* **🖼️ Multi-Image Generation:** Generate up to 4 images simultaneously with custom random seeds.
* **📥 Instant Download:** Clean image overlay interface with direct one-click downloading.
* **🌙 Dark / Light Theme:** Automatic system theme detection with manual toggle persistence stored in `localStorage`.
* **🎲 Prompt Suggestions:** Built-in list of creative prompts for quick testing.
* **📱 Fully Responsive:** Clean grid gallery layout optimized for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Icons:** Font Awesome (v6)
* **API:** Pollinations.ai (RESTful API / Blobs)

---

## 🚀 Getting Started

### Prerequisites

No complex installation or package managers are required! You only need a modern web browser (Chrome, Edge, Firefox, Safari).

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/ai-image-generator.git](https://github.com/your-username/ai-image-generator.git)
Navigate into the project folder:

Bash
cd ai-image-generator
Run the app:
Simply open index.html in your browser, or run it using a local development server like Live Server in VS Code.

📁 Project Structure
Plaintext
├── index.html        # Main HTML structure & controls
├── style.css         # Styling, themes, grid layout & animations
├── script.js        # Core logic, API fetching, theme toggling & download handling
└── README.md         # Project documentation
🕹️ How It Works
Input Prompt: Type a detailed prompt or click the random prompt button (🎲) to generate an idea.

Configure Settings: Choose your desired image count and aspect ratio.

Generate: Click Generate — loading cards with CSS spinners will appear while fetching images asynchronously via Promise.allSettled.

Download: Hover over any generated image and click the download icon to save it directly to your device.