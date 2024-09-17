document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.createElement("div");
    toggleButton.id = "menu-toggle";
    toggleButton.innerHTML = "&#9664;";
    document.getElementById("menu-container").appendChild(toggleButton);

    toggleButton.addEventListener("click", toggleMenu);

    function toggleMenu() {
        document.getElementById('menu-container').classList.toggle('menu-hidden');
    }
});
