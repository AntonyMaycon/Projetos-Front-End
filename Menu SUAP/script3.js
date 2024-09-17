let menuIsOpen = true;
const menuIcon = document.querySelector("#menu-icon");
const menuTexto = document.querySelectorAll(".menu-texto");

menuIcon.addEventListener('click', function () {
    if (menuIsOpen) {
        menuIcon.src = "/assets/images/arrow-right.png"
        menuIsOpen = false;
        menuTexto.forEach(m => {
            m.style.display = "none";
        });
    } else {
        menuIcon.src = "assets/images/arrow-left.png"
        menuIsOpen = true;
        menuTexto.forEach(m => {
            m.style.display = "inline";
        });
    }
})