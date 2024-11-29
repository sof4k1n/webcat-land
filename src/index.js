import './styles/main.scss';

document.addEventListener("DOMContentLoaded", () => {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");

    if (mediaQuery.matches) {
        initCursorEffect();
        menuInner();
    }

    mediaQuery.addEventListener("change", (e) => {
        if (e.matches) {
            initCursorEffect();
            menuInner();
        }
        else {
            console.log("Разрешение меньше 1200 пикселей")
        }
    });

    function menuInner() {
        const menu_btn = document.querySelector('#menu-open');
        const menu = document.querySelector('#menu');
        const menu_exit = document.querySelector('#menu-exit');

        menu_btn.addEventListener('click', () => {
            menu.classList.add('open');
        });

        menu_exit.addEventListener('click', () => {
            menu.classList.remove('open');
        });
    }
    function initCursorEffect() {
        const links = document.querySelectorAll(".link-menu");

        links.forEach((link) => {
            // При движении мыши внутри ссылки
            link.addEventListener("mousemove", (e) => {
                const rect = link.getBoundingClientRect();

                // Координаты для псевдоэлемента ::before
                const beforeWidth = rect.width * 1.5; // Ширина ::before (150%)
                const beforeHeight = rect.height * 2.5; // Высота ::before (200%)

                const x = e.clientX - (rect.left - (beforeWidth - rect.width) / 2);
                const y = e.clientY - (rect.top - (beforeHeight - rect.height) / 2);

                // Координаты для псевдоэлемента ::after
                const x1 = e.clientX - rect.left;
                const y1 = e.clientY - rect.top;

                // Устанавливаем CSS-переменные для позиции
                link.style.setProperty("--cursor-x", `${x}px`);
                link.style.setProperty("--cursor-y", `${y}px`);
                link.style.setProperty("--cursor-x1", `${x1}px`);
                link.style.setProperty("--cursor-y1", `${y1}px`);

                // Делаем кружки видимыми
                link.classList.add("active");
            });

            // Добавляем проверку на выход за границы ссылки
            document.addEventListener("mousemove", (e) => {
                const rect = link.getBoundingClientRect();
                const isCursorOutside =
                    e.clientX < rect.left ||
                    e.clientX > rect.right ||
                    e.clientY < rect.top ||
                    e.clientY > rect.bottom;

                if (isCursorOutside) {
                    // Убираем видимость псевдоэлементов
                    link.classList.remove("active");
                }
            });
        });
    }
});
