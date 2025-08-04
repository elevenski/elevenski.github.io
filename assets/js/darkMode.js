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
        button.innerHTML = "<i class='fa-solid fa-moon'></i>";
    } else {
        document.documentElement.classList.remove('dark-theme');
        button.innerHTML = "<i class='fa-solid fa-sun-bright'></i>";
    }

    button.addEventListener('click', () => {
        const newTheme = (localStorage.getItem("data-theme") === "dark") ? "light" : "dark";
        localStorage.setItem("data-theme", newTheme);
        document.documentElement.classList.toggle('dark-theme');
        button.innerHTML = newTheme === "dark"
            ? "<i class='fa-solid fa-moon'></i>"
            : "<i class='fa-solid fa-sun-bright'></i>";
    });
});