const themeToggle = document.querySelector(".theme-toggle");

// Set theme based on saved preference or system default
(() => {
    const savedTheme = localStorage.getItem("theme");
    // 1. Fixed typo: prefers-color-scheme
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    
    // 2. Fixed target: toggles 'dark' on <html> to match your CSS (html.dark)
    document.documentElement.classList.toggle("dark", isDarkTheme);
    themeToggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
})();

const toggleTheme = () => {
    if (!themeToggle) return;

    // Fix: Toggle 'dark' on <html> instead of <body>
    const isDarkTheme = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
    
    // Switch the icon between sun and moon
    const icon = themeToggle.querySelector("i");
    if (icon) {
        icon.className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
};

themeToggle?.addEventListener("click", toggleTheme);