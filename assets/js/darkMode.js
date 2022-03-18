const toggleBtn = document.querySelector('.switch-mode-btn');

toggleBtn.addEventListener('click', () => {
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
        localStorage.setItem("data-theme", "light");
        document.documentElement.classList.remove('dark-theme');
        console.log("light moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "Switch Dark Mode"
    } else if (theme === null || theme === "light") {
        localStorage.setItem("data-theme", "dark");
        document.documentElement.classList.toggle('dark-theme');
        console.log("dark moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "Switch Light Mode"
    }
});

$(document).ready(function(){
    let theme = localStorage.getItem("data-theme");
    if (theme === "dark") {
        document.documentElement.classList.toggle('dark-theme');
        console.log("dark moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "Switch Light Mode"
    } else if (theme === null || theme === "light") {
        document.documentElement.classList.remove('dark-theme');
        console.log("light moda geçildi")
        document.getElementById("switch-mode-btn").innerHTML = "Switch Dark Mode"
    }
});