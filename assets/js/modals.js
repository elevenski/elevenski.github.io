document.addEventListener("keydown", function (zEvent) {
    const modal = document.getElementById("commandPallette");
    if (zEvent.shiftKey && zEvent.key === "K") {
        if(modal.classList.contains("show") === true) {
            $('#commandPallette').modal('hide');
            console.log("modal kapatıldı")
        } else {
            $("#commandPallette").modal();
            console.log("modal açıldı")
        }
    }
});