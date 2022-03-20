document.addEventListener("keydown", function (zEvent) {
    const modal = document.getElementById("commandPalette");
    if (zEvent.shiftKey && zEvent.key === "K") {
        if(modal.classList.contains("show") === true) {
            $('#commandPalette').modal('hide');
            console.log("modal kapatıldı")
        } else {
            $("#commandPalette").modal();
            console.log("modal açıldı")
        }
    }
});

const btn_c = document.querySelector('.command-palette-btn');

btn_c.addEventListener('click', () => {
    $("#commandPalette").modal();
    console.log("modal açıldı")
});