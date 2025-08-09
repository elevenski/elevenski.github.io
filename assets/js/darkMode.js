document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.switchModeButton');
    let theme = localStorage.getItem("data-theme");

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (!theme) {
        theme = prefersDark ? "dark" : "light";
        localStorage.setItem("data-theme", theme);
    }

    if (theme === "dark") {
        document.documentElement.classList.add('dark-theme');
        button.innerHTML = "<i class='fa-solid fa-moon opacity-90'></i>";
    } else {
        document.documentElement.classList.remove('dark-theme');
        button.innerHTML = "<i class='fa-solid fa-sun-bright opacity-90'></i>";
    }

    button.addEventListener('click', () => {
        const newTheme = (localStorage.getItem("data-theme") === "dark") ? "light" : "dark";
        localStorage.setItem("data-theme", newTheme);
        document.documentElement.classList.toggle('dark-theme');
        button.innerHTML = newTheme === "dark"
            ? "<i class='fa-solid fa-moon opacity-90'></i>"
            : "<i class='fa-solid fa-sun-bright opacity-90'></i>";
    });
});