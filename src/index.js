import './styles/main.scss';
import * as THREE from 'three'; // Импорт библиотеки Three.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelPath from './models/hand.glb';

import nx from './images/nx.jpg';
import ny from './images/ny.jpg';
import nz from './images/nz.jpg';

import px from './images/px.jpg';
import py from './images/py.jpg';
import pz from './images/pz.jpg';

document.addEventListener("DOMContentLoaded", () => {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");

    if (mediaQuery.matches) {
        initCursorEffect();
        menuInner();
        application();
        logo_anim()
        anim_hand()
    } else {
        initCursorEffect();
        menuInner();
        application();
        logo_anim()
        anim_hand()
    }

    mediaQuery.addEventListener("change", (e) => {
        if (e.matches) {
            initCursorEffect();
            menuInner();
            application();
            logo_anim()
        } else {
            console.log("Разрешение меньше 1200 пикселей")
            initCursorEffect();
            menuInner();
            application();
            logo_anim()
        }
    });

    function anim_hand() {
        
        const container = document.getElementById('anim_hand'); // Укажите ID вашего блока

        // Устанавливаем размеры контейнера
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
    
        // Создание сцены
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
    
        // Создание камеры
        const camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000);
        camera.position.z = 2;
        camera.position.x = -0.3;
        camera.position.y = 0.2;
    
        // Создание рендера
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        container.appendChild(renderer.domElement); // Вставляем рендер в указанный контейнер
    
        // Добавляем свет
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Мягкий свет
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Направленный свет
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
    
        // Переменные для хранения 3D-модели
        let model;
    
        // Загрузка GLB-модели
        const loader = new GLTFLoader();
        loader.load(
            (modelPath), // Укажите путь к вашей модели
            (gltf) => {
                model = gltf.scene; // Сохраняем сцену модели
                scene.add(model); // Добавляем модель в сцену
            },
            undefined,
            (error) => {
                console.error('Ошибка при загрузке модели:', error);
            }
        );
    
        // Переменные для отслеживания положения мыши
        const mouse = { x: 0, y: 0 };
    
        // Отслеживание положения мыши
        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / containerWidth) * 2 - 1; // Нормализуем координаты
            mouse.y = -(event.clientY / containerHeight) * 2 + 1;
        });
    
        // Анимация модели
        const animate = () => {
            requestAnimationFrame(animate);
    
            if (model) {
                // Изменение вращения модели на основе положения мыши
                model.rotation.y = mouse.x * Math.PI; // Вращение по оси Y
                model.rotation.x = mouse.y * Math.PI * 0.5; // Вращение по оси X
            }
    
            renderer.render(scene, camera); // Рендеринг сцены
        };
    
        animate(); // Запуск анимации
    
        // Обновление размеров рендера при изменении размеров контейнера
        const resizeRenderer = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
    
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
    
        window.addEventListener('resize', resizeRenderer);

    }   

    function logo_anim() {
        setTimeout(() => {
            const logo_animed = document.querySelector('#logo_for_anim');
            logo_animed.classList.add('logo_animed');
        }, 1500); // Задержка в миллисекундах (3 секунды)
    }

    function application() {
        const discuss_btn = document.querySelector('#discuss_btn');
        const discuss_overlay = document.querySelector('.discuss_overlay');
        const discuss_exit = document.querySelector('#discuss_exit');

        discuss_btn.addEventListener("click", () => {
            if (menu.classList.contains('menu_opened')) {
                menu_btn.dispatchEvent(new Event('click'));
                discuss_overlay.style.setProperty('display', 'flex');
            } else {
                discuss_overlay.style.setProperty('display', 'flex');
            }
        });

        discuss_exit.addEventListener("click", () => {
            discuss_overlay.style.setProperty('display', 'none');
        });

    }   

    function menuInner() {
        const menu_btn = document.querySelector('#menu_btn');
        const menu = document.querySelector('#menu');
        const menu_wrapper = document.querySelector('#heder_wrapper');
        const main = document.querySelector('.logo_main');

        const margin = menu_btn.offsetWidth;

        menu_btn.addEventListener("click", () => {  
            menu_btn.style.setProperty("--margin_exit", `${margin}px`);

            if (menu_btn.classList.contains('menu_btn')) {
                menu_btn.classList.remove('menu_btn');
                menu_btn.classList.add('menu_exit');
                menu_wrapper.classList.add('heder_wrapper');
                main.classList.add('main_margin');
            } else {
                menu_btn.classList.add('menu_btn');
                menu_btn.classList.remove('menu_exit');
                menu_wrapper.classList.remove('heder_wrapper');
                main.classList.remove('main_margin');
            }

            menu.classList.toggle('menu_opened')
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
