document.addEventListener("keydown", function (zEvent) {
    if (zEvent.shiftKey && zEvent.key === "C") {
        localStorage.clear();
        location.reload();
        console.log("tüm yerel depolamalar silindi")
    }
});