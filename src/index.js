import './styles/main.scss';
import * as THREE from 'three'; // Импорт библиотеки Three.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import modelPath from './models/hand.glb';

import cases_head from './images/cases_head.png';
import corousel1 from './images/carousel1.png';
import corousel2 from './images/carousel2.png';
import corousel3 from './images/carousel3.png';
import corousel4 from './images/carousel4.png';
import corousel5 from './images/carousel5.png';
import corousel6 from './images/carousel6.png';

import video2_2 from './video/video2_2.mp4';

import beeline from './partners/beeline.png';
import finntrail from './partners/finntrail.png';
import granel from './partners/granel.png';
import ipaksu from './partners/ipaksu.png';
import sber from './partners/sber.png';
import skidex from './partners/skidex.png';
import yandex from './partners/yandex.png';

import worker1 from './worker_cards/worker1.png';
import worker2 from './worker_cards/worker2.png';
import worker3 from './worker_cards/worker3.png';
import worker4 from './worker_cards/worker4.png';
import worker5 from './worker_cards/worker5.png';
import worker6 from './worker_cards/worker6.png';
import worker7 from './worker_cards/worker7.png';
import worker8 from './worker_cards/worker8.png';
import worker9 from './worker_cards/worker9.png';

import nx from './textures/nx.jpg';
import ny from './textures/ny.jpg';
import nz from './textures/nz.jpg';
import px from './textures/px.jpg';
import py from './textures/py.jpg';
import pz from './textures/pz.jpg';

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
        scene.background = new THREE.Color('#FDFCF9');
    
        // Устанавливаем карту окружения
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const envMap = cubeTextureLoader.load([
            px, // Путь к положительному X
            nx, // Путь к отрицательному X
            py, // Путь к положительному Y
            ny, // Путь к отрицательному Y
            pz, // Путь к положительному Z
            nz  // Путь к отрицательному Z
        ]);
        
        // Создание камеры
        const camera = new THREE.PerspectiveCamera(50, containerWidth / containerHeight, 0.1, 1000);
        camera.position.set(0, 0, 2);
    
        // Создание рендера
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        container.appendChild(renderer.domElement); // Вставляем рендер в указанный контейнер
    
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9); // Направленный свет
        directionalLight.position.set(4, -9, 4.1).normalize();
        scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.2);
        hemisphereLight.position.set(4, -9, 4.1).normalize();
        scene.add(hemisphereLight);
    
        // Переменные для хранения 3D-модели
        let model;
    
        // Загрузка GLB-модели
        const loader = new GLTFLoader();
        loader.load(
            modelPath, // Укажите путь к вашей модели
            (gltf) => {
                model = gltf.scene; // Сохраняем сцену модели
    
                model.traverse((child) => {
                    if (child.isMesh && child.material.isMeshStandardMaterial) {
                        child.material.envMap = envMap; // Устанавливаем карту отражений
                        child.material.envMapIntensity = 1.62; // Увеличиваем интенсивность
                        child.material.needsUpdate = true; // Обновляем материал
                    }
                });
    
                scene.add(model); // Добавляем модель в сцену
            },
            undefined,
            (error) => {
                console.error('Ошибка при загрузке модели:', error);
            }
        );
    
        // Переменные для отслеживания положения мыши
        const mouse = { x: 0, y: 0 };

        // Ограничения углов
        const maxRotationX = Math.PI / 4; // Предел по оси X (45 градусов)
        const maxRotationY = Math.PI / 4; // Предел по оси Y (45 градусов)

        // Отслеживание положения мыши
        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / containerWidth) * 2 - 1; // Нормализуем координаты
            mouse.y = -(event.clientY / containerHeight) * 2 + 1;
        });

        // Анимация модели
        const animate = () => {
            requestAnimationFrame(animate);

            if (model) {
                // Переводим положение мыши в углы вращения
                const rotationX = THREE.MathUtils.clamp(mouse.y * Math.PI / 4, -maxRotationX, maxRotationX);
                const rotationY = THREE.MathUtils.clamp(-mouse.x * Math.PI / 40, -maxRotationY, maxRotationY);
                
                // Применяем ограниченные углы к модели
                model.rotation.x = rotationX; // Вращение по оси X с ограничением
                model.rotation.y = rotationY; // Вращение по оси Y с ограничением
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
        }, 1500); // Задержка в миллисекундах (1.5 секунды)

        const elements = document.querySelectorAll(".group_for_anim g"); // находим все кнопки
        elements.forEach((element) => { // проходимся циклом по массиву кнопок которые мы нашли
            console.log(element)
            element.addEventListener("click", () => { 
                element.classList.toggle("active"); 
            })
        })
    }

    function application() {
        const discuss_btn = document.querySelector('#discuss_btn');
        const discuss_overlay = document.querySelector('.discuss_overlay');
        const discuss_exit = document.querySelector('#discuss_exit');

        discuss_btn.addEventListener("click", () => {
            if (menu.classList.contains('menu_opened')) {
                menu_btn.dispatchEvent(new Event('click'));
                discuss_overlay.classList.add('active');
            } else {
                discuss_overlay.classList.add('active');
            }
        });

        discuss_exit.addEventListener("click", () => {
            discuss_overlay.classList.remove('active');
        });

    }   

    function menuInner() {
        const menu_btn = document.querySelector('#menu_btn');
        const menu = document.querySelector('#menu');
        const menu_wrapper = document.querySelector('#heder_wrapper');

        const margin = menu_btn.offsetWidth;

        menu_btn.addEventListener("click", () => {  
            menu_btn.style.setProperty("--margin_exit", `${margin}px`);

            if (menu_btn.classList.contains('menu_btn')) {
                menu_btn.classList.remove('menu_btn');
                menu_btn.classList.add('menu_exit');
                menu_wrapper.classList.add('heder_wrapper');
            } else {
                menu_btn.classList.add('menu_btn');
                menu_btn.classList.remove('menu_exit');
                menu_wrapper.classList.remove('heder_wrapper');
            }

            menu.classList.toggle('menu_opened')
        });

        let lastScroll = 0;
        const defaultOffset = 200;
        const header = document.querySelector('header');

        const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
        const containHide = () => header.classList.contains('hide');

        const discuss_overlay = document.querySelector('.discuss_overlay');

        window.addEventListener('scroll', () => {

            if(scrollPosition() > lastScroll && !containHide() && !discuss_overlay.classList.contains('active') && !menu.classList.contains('menu_opened')) {
                header.classList.add('hide');
                // console.log('down');
            }

            else if(scrollPosition() < lastScroll && containHide()) {
                // console.log('up');
                header.classList.remove('hide');
            }

            lastScroll = scrollPosition();
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

    // const canvas = document.getElementById("block_hover_left");
    // const ctx = canvas.getContext("2d");
    // ctx.fillStyle = '#1758FF';

    // class Ball {
    //     constructor(effect, index) {
    //         this.effect = effect;
    //         this.radius = Math.random() * 15 + 10; // Немного уменьшил радиус
    //         this.speedX = 0;
    //         this.speedY = 0;
    //         this.initFromCenter(index);
    //     }

    //     initFromCenter(index) {
    //         // Начальная позиция в центре
    //         this.x = this.effect.width * 0.5;
    //         this.y = this.effect.height * 0.5;

    //         // Скорость для расползания из центра
    //         if (index % 2 === 0) {
    //             this.speedX = (Math.random() + Math.random() * 5);
    //         } else {
    //             this.speedX = (-(Math.random() + Math.random() * 5));
    //         }
    //         this.speedY = Math.random() - 0.5;
    //     }

    //     initFromBorders(index, totalBalls) {
    //         // Равномерное распределение по границам
    //         const rows = Math.ceil(Math.sqrt(totalBalls));
    //         const cols = rows;
    //         const spacingX = this.effect.width / cols;
    //         const spacingY = this.effect.height / rows;

    //         const col = index % cols;
    //         const row = Math.floor(index / cols);

    //         // Определяем позицию шаров на границах
    //         if (row === 0) { // Верхняя граница
    //             this.x = col * spacingX;
    //             this.y = 0;
    //         } else if (row === rows - 1) { // Нижняя граница
    //             this.x = col * spacingX;
    //             this.y = this.effect.height;
    //         } else if (col === 0) { // Левая граница
    //             this.x = 0;
    //             this.y = row * spacingY;
    //         } else if (col === cols - 1) { // Правая граница
    //             this.x = this.effect.width;
    //             this.y = row * spacingY;
    //         } else {
    //             this.x = Math.random() * this.effect.width;
    //             this.y = Math.random() * this.effect.height;
    //         }

    //         // Скорость к центру для плавного движения
    //         const centerX = this.effect.width / 2;
    //         const centerY = this.effect.height / 2;
    //         const factor = 0.008; // Плавность движения
    //         this.speedX = (centerX - this.x) * factor;
    //         this.speedY = (centerY - this.y) * factor;
    //     }

    //     update() {
    //         this.x += this.speedX;
    //         this.y += this.speedY;

    //         if (this.effect.mode === 'fromCenter') {
    //             if (this.y < this.radius || this.y > this.effect.height - this.radius) this.speedY *= -0.3, this.speedX *= 1.15;
    //         }

    //         // Останавливаем шары вблизи центра
    //         if (this.effect.mode === 'toCenter') {
    //             setTimeout(() => {
    //                 this.speedX = 0;
    //                 this.speedY = 0;
    //             }, 3000);
    //         }
    //     }

    //     draw(context) {
    //         context.beginPath();
    //         context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    //         context.fill();
    //     }
    // }

    // class MetaballsEffect {
    //     constructor(width, height) {
    //         this.width = width;
    //         this.height = height;
    //         this.metaballsArray = [];
    //         this.mode = 'fromCenter';
    //     }

    //     init(numberOfBalls) {
    //         this.metaballsArray = [];
    //         for (let i = 0; i < numberOfBalls; i++) {
    //             this.metaballsArray.push(new Ball(this, i));
    //         }
    //     }

    //     update() {
    //         this.metaballsArray.forEach(metaball => metaball.update());
    //     }

    //     draw(context) {
    //         this.metaballsArray.forEach(metaball => metaball.draw(context));
    //     }

    //     resetFromCenter() {
    //         this.mode = 'fromCenter';
    //         this.init(800); // Количество для центра
    //         this.metaballsArray.forEach((metaball, index) => metaball.initFromCenter(index));
    //     }

    //     resetFromBorders() {
    //         this.mode = 'toCenter';
    //         this.init(2500); // Увеличенное количество для границ
    //         this.metaballsArray.forEach((metaball, index) => 
    //             metaball.initFromBorders(index, this.metaballsArray.length));
    //     }
    // }

    // // Создаем эффект
    // const effect = new MetaballsEffect(canvas.width, canvas.height);
    // effect.init(800);
    // console.log(effect);

    // let animationId;
    // function animateHover() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     effect.update();
    //     effect.draw(ctx);
    //     animationId = requestAnimationFrame(animateHover);
    // }

    // // Привязка функций для изменения поведения
    // function startFromCenter() {
    //     cancelAnimationFrame(animationId);
    //     effect.resetFromCenter();
    //     animateHover();
    // }

    // function startFromBorders() {
    //     cancelAnimationFrame(animationId);
    //     effect.resetFromBorders();
    //     animateHover();
    // }

    // startFromBorders();
    // let hoverBlocks1 = document.querySelectorAll('.hover1'); 

    // // Цикл для каждого блока
    // hoverBlocks1.forEach(function(block) {
    //     // Функция при наведении
    //     block.addEventListener('mouseover', function() {
    //         startFromCenter();
    //     });

    //     // Функция при выходе с блока
    //     block.addEventListener('mouseout', function() {
    //         startFromBorders();
    //     });
    // });

});
