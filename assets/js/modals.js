document.addEventListener("keydown", function (zEvent) {
    const modal = document.getElementById("aboutPanel");
    if (zEvent.shiftKey && zEvent.key === "K") {
        if(modal.classList.contains("show") === true) {
            $('#aboutPanel').modal('hide');
            console.log("modal kapatıldı")
        } else {
            $("#aboutPanel").modal();
            console.log("modal açıldı")
        }
    }
});

const btn_c = document.querySelector('.about-panel-btn');

btn_c.addEventListener('click', () => {
    $("#aboutPanel").modal();
    console.log("modal açıldı")
});