import './styles/main.scss';

const menu_btn = document.querySelector('#menu-open');
const menu = document.querySelector('#menu');
const menu_exit = document.querySelector('#menu-exit');

menu_btn.addEventListener('click', () => {
    menu.classList.add('open');
});

menu_exit.addEventListener('click', () => {
    menu.classList.remove('open');
});