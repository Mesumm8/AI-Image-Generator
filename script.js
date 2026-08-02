const themeToggle = document.querySelector(".theme-toggle");
const promptForm  = document.querySelector(".prompt-form");
const promptInput  = document.querySelector(".prompt-input");
const promptBtn  = document.querySelector(".prompt-btn");
const generateBtn  = document.querySelector(".generate-btn");
const modelSelect  = document.getElementById("model-select");
const countSelect  = document.getElementById("count-select");
const ratioSelect  = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];

// Set theme based on saved preference or system default
(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    document.documentElement.classList.toggle("dark", isDarkTheme);
    themeToggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

const toggleTheme = () => {
    if (!themeToggle) return;

    const isDarkTheme = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    
    const icon = themeToggle.querySelector("i");
    if (icon) {
        icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
};

// Replace loading spinner with the actual image & setup download button
const updateImageCard = (imgIndex, imgUrl) => {
    const imgCard = document.getElementById(`img-card-${imgIndex}`);
    if (!imgCard) return;

    imgCard.classList.remove("loading");
    imgCard.innerHTML = `<img src="${imgUrl}" alt="AI Generated Output" class="result-img">
                         <div class="img-overlay">
                             <a href="${imgUrl}" download="ai-image-${Date.now()}-${imgIndex + 1}.png" class="img-download-btn">
                                 <i class="fa-solid fa-download"></i>
                             </a>
                         </div>`;
};

const getImageDimensions = (aspectRatio, baseSize = 512) => {
    const [width, height] = aspectRatio.split("/").map(Number);
    const scaleFactor = baseSize / Math.sqrt(width * height);

    let calculatedWidth = Math.round(width * scaleFactor);
    let calculatedHeight = Math.round(height * scaleFactor);

    // Ensure dimensions are multiples of 16
    calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
    calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

    return { width: calculatedWidth, height: calculatedHeight };
};

// Send requests to free image generation API
const generateImages = async (selectedModel, imageCount, aspectRatio, promptText) => {
    // Disable generate button while processing
    generateBtn.setAttribute("disabled", "true");

    const { width, height } = getImageDimensions(aspectRatio);

    try {
        const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
            try {
                // Encode prompt for safe URL formatting
                const encodedPrompt = encodeURIComponent(promptText);
                
                // Add a unique random seed so multiple images generated together look different
                const seed = Math.floor(Math.random() * 1000000);
                
                const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

                // Fetch image stream as blob
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const imageBlob = await response.blob();

                // Update UI card with generated Blob URL
                updateImageCard(i, URL.createObjectURL(imageBlob));

                return imageBlob;

            } catch (error) {
                console.error(`Error on image card #${i + 1}:`, error);
                throw error;
            }
        });

        return await Promise.allSettled(imagePromises);
    } finally {
        // Re-enable generate button after completion/failure
        generateBtn.removeAttribute("disabled");
    }
};

// Create placeholder cards with loading spinners
const createImageCards = (selectedModel, imageCount, aspectRatio, promptText) => {
    gridGallery.innerHTML = "";

    for (let i = 0; i < imageCount; i++) {
        gridGallery.innerHTML += `<div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio}">
                        <div class="status-container">
                            <div class="spinner"></div>
                            <p class="status-text">Generating...</p>
                        </div>
                        </div>`;
    }

    generateImages(selectedModel, imageCount, aspectRatio, promptText);
};

// Handling form submission
const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const selectedModel = modelSelect.value;
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio = ratioSelect.value || "1/1";
    const promptText = promptInput.value.trim();

    createImageCards(selectedModel, imageCount, aspectRatio, promptText);
};

// Fill prompt input with random example
promptBtn.addEventListener("click", () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
});

promptForm.addEventListener("submit", handleFormSubmit);
themeToggle.addEventListener("click", toggleTheme);