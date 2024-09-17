const toggleButton = document.getElementById('toggle-button');
const menu = document.getElementById('menu');

toggleButton.addEventListener('click', () => {
    menu.classList.toggle('collapsed');
    toggleButton.innerHTML = menu.classList.contains('collapsed') ? '&#x25C0;' : '&#x25B6;';
});
