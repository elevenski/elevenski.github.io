const button = document.querySelector('.switchModeButton');

button.addEventListener('click', () => {
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
        localStorage.setItem("data-theme", "light");
        document.documentElement.classList.remove('dark-theme');
        console.log("light moda geçildi")
        document.getElementById("switchModeButton").innerHTML = "<i class='fa-regular fa-sun-bright'></i>"
    } else if (theme === null || theme === "light") {
        localStorage.setItem("data-theme", "dark");
        document.documentElement.classList.toggle('dark-theme');
        console.log("dark moda geçildi")
        document.getElementById("switchModeButton").innerHTML = "<i class='fa-light fa-moon'></i>"
    }
});

$(document).ready(function () {
    console.log("%c Eleven", "background: transparent; color: #b5b5e7; font-size: 30px; font-weight: 500")
    console.log("%c Temalar yükleniyor...", "background: transparent; color: red; font-size: 18px; font-weight: 400")
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
        document.documentElement.classList.toggle('dark-theme');
        console.log("dark moda geçildi")
        document.getElementById("switchModeButton").innerHTML = "<i class='fa-light fa-moon'></i>"
    } else if (theme === null || theme === "light") {
        document.documentElement.classList.remove('dark-theme');
        console.log("light moda geçildi")
        document.getElementById("switchModeButton").innerHTML = "<i class='fa-regular fa-sun-bright'></i>"
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
                document.getElementById("switchModeButton").innerHTML = "<i class='fa-light fa-moon'></i>"
            }
        } else if (!darkThemeMq.matches) {
            if (theme === "light") {
                console.log("site zaten light")
            } else {
                localStorage.setItem("data-theme", "light");
                document.documentElement.classList.remove('dark-theme');
                console.log("system light moda geçildi")
                document.getElementById("switchModeButton").innerHTML = "<i class='fa-regular fa-sun-bright'></i>"
            }
        }
    }
});