const toggleBtn = document.querySelector('.switch-mode-btn');

toggleBtn.addEventListener('click', () => {
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
        localStorage.setItem("data-theme", "light");
        document.documentElement.classList.remove('dark-theme');
        console.log("light moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "<i class='fa-solid fa-moon mr-2'></i>Switch Dark Mode"
    } else if (theme === null || theme === "light") {
        localStorage.setItem("data-theme", "dark");
        document.documentElement.classList.toggle('dark-theme');
        console.log("dark moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "<i class='fa-solid fa-sun mr-2'></i>Switch Light Mode"
    }
});

$(document).ready(function () {
    console.log("%c Eleven", "background: transparent; color: #b5b5e7; font-size: 30px; font-weight: 500")
    console.log("%c Temalar yükleniyor...", "background: transparent; color: red; font-size: 18px; font-weight: 400")
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
        document.documentElement.classList.toggle('dark-theme');
        console.log("dark moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "<i class='fa-solid fa-sun mr-2'></i>Switch Light Mode"
    } else if (theme === null || theme === "light") {
        document.documentElement.classList.remove('dark-theme');
        console.log("light moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "<i class='fa-solid fa-moon mr-2'></i>Switch Dark Mode"
    }
});

document.addEventListener("keydown", function (zEvent) {
    let theme = localStorage.getItem("data-theme");
    if (zEvent.shiftKey && zEvent.key === "T") {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
            if (theme === "dark") {
                console.log("site zaten dark")
            } else {
                localStorage.setItem("data-theme", "dark");
                document.documentElement.classList.toggle('dark-theme');
                console.log("system dark moda geçildi")
                document.getElementById("switch-mode-btn").innerHTML = "<i class='fa-solid fa-sun mr-2'></i>Switch Light Mode"
            }
        } else if (!darkThemeMq.matches) {
            if (theme === "light") {
                console.log("site zaten light")
            } else {
                localStorage.setItem("data-theme", "light");
                document.documentElement.classList.remove('dark-theme');
                console.log("system light moda geçildi")
                document.getElementById("switch-mode-btn").innerHTML = "<i class='fa-solid fa-moon mr-2'></i>Switch Dark Mode"
            }
        }
    }
});

document.addEventListener("keydown", function (zEvent) {
    if (zEvent.shiftKey && zEvent.key === "C") {
        localStorage.clear();
        location.reload();
        console.log("tüm yerel depolamalar silindi")
    }
});