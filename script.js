document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initMobileMenu();
    initVehicleFilters();
    initQuoteButtons();
    initQuoteForm();
    initHeroVideoSound();
});

/* =========================================================
   HERO SLIDER
   ========================================================= */

function initHeroSlider() {
    const sliders = document.querySelectorAll(".hero-slider");

    if (!sliders.length) return;

    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll(".hero-slide");

        if (!slides.length) return;

        let currentIndex = 0;
        let sliderTimer;

        function stopVideoInSlide(slide) {
            const video = slide.querySelector(".hero-video-frame video");

            if (!video) return;

            video.pause();
            video.muted = true;
            video.currentTime = 0;

            const button = slide.querySelector(".video-sound-btn");
            const icon = button?.querySelector("i");

            if (button && icon) {
                icon.className = "fas fa-volume-mute";
                button.setAttribute("aria-label", "Activar sonido");
            }
        }

        function playVideoInSlide(slide) {
            const video = slide.querySelector(".hero-video-frame video");

            if (!video) return;

            video.muted = true;
            video.currentTime = 0;

            video.play().catch(() => {
                // Algunos navegadores pueden bloquear el autoplay.
            });
        }

        function changeSlide() {
            const currentSlide = slides[currentIndex];

            currentSlide.classList.remove("active");
            stopVideoInSlide(currentSlide);

            currentIndex = (currentIndex + 1) % slides.length;

            const nextSlide = slides[currentIndex];
            nextSlide.classList.add("active");
            playVideoInSlide(nextSlide);

            const isVideoSlide = nextSlide.classList.contains("hero-video-slide");
            const duration = isVideoSlide ? 10000 : 5000;

            sliderTimer = setTimeout(changeSlide, duration);
        }

        const firstSlide = slides[currentIndex];
        playVideoInSlide(firstSlide);

        const firstSlideIsVideo = firstSlide.classList.contains("hero-video-slide");
        const initialDuration = firstSlideIsVideo ? 10000 : 5000;

        sliderTimer = setTimeout(changeSlide, initialDuration);
    });
}

/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

/* =========================================================
   FILTROS DE VEHÍCULOS
   ========================================================= */

function initVehicleFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const vehicleCards = document.querySelectorAll(".vehicle-card");

    if (!filterButtons.length || !vehicleCards.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            vehicleCards.forEach((card) => {
                const category = card.dataset.category;

                if (selectedFilter === "todos" || category === selectedFilter) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });
}

/* =========================================================
   BOTONES COTIZAR MODELO
   ========================================================= */

function initQuoteButtons() {
    const quoteButtons = document.querySelectorAll(".quote-model");
    const modelSelect = document.getElementById("modelo");

    if (!quoteButtons.length || !modelSelect) return;

    quoteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const model = button.dataset.model;

            if (!model) return;

            const optionExists = Array.from(modelSelect.options).some(
                (option) => option.value === model
            );

            if (optionExists) {
                modelSelect.value = model;
            }

            setTimeout(() => {
                modelSelect.focus();
            }, 500);
        });
    });
}

/* =========================================================
   FORMULARIO COTIZACIÓN
   ========================================================= */

function initQuoteForm() {
    const form = document.getElementById("quoteForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();
        const modelo = document.getElementById("modelo").value;
        const contactoPreferido = document.getElementById("contactoPreferido").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        if (!nombre || !telefono || !email || !modelo || !contactoPreferido) {
            alert("Por favor completa los campos obligatorios.");
            return;
        }

        const whatsappMessage = buildWhatsAppMessage({
            nombre,
            telefono,
            email,
            modelo,
            contactoPreferido,
            mensaje
        });

        const whatsappUrl = `https://wa.me/56982195894?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, "_blank");

        form.reset();

        alert("Tu solicitud fue preparada para enviar por WhatsApp.");
    });
}

function buildWhatsAppMessage({ nombre, telefono, email, modelo, contactoPreferido, mensaje }) {
    return `
Hola Margaret, quiero solicitar una cotización.

Nombre: ${nombre}
Teléfono: ${telefono}
Correo: ${email}
Modelo de interés: ${modelo}
Contacto preferido: ${contactoPreferido}

Mensaje:
${mensaje || "Sin mensaje adicional."}
    `.trim();
}

function initHeroSlider() {
    const sliders = document.querySelectorAll(".hero-slider");

    if (!sliders.length) return;

    function stopAllVideosInSlide(slide) {
        slide.querySelectorAll("video").forEach((video) => {
            video.pause();
            video.muted = true;
            video.currentTime = 0;
        });

        const button = slide.querySelector(".video-sound-btn");
        const icon = button?.querySelector("i");

        if (button && icon) {
            icon.className = "fas fa-volume-mute";
            button.setAttribute("aria-label", "Activar sonido");
        }
    }

    function playVideosInSlide(slide) {
        const videos = slide.querySelectorAll("video");

        videos.forEach((video) => {
            video.muted = true;
            video.currentTime = 0;

            video.play().catch(() => {
                // Autoplay puede ser bloqueado por el navegador.
            });
        });
    }

    sliders.forEach((slider) => {
        const slides = slider.querySelectorAll(".hero-slide");

        if (!slides.length) return;

        let currentIndex = 0;

        // Detiene todos los videos de este slider al iniciar.
        slides.forEach((slide) => stopAllVideosInSlide(slide));

        const firstSlide = slides[currentIndex];
        firstSlide.classList.add("active");
        playVideosInSlide(firstSlide);

        function changeSlide() {
            const currentSlide = slides[currentIndex];

            currentSlide.classList.remove("active");
            stopAllVideosInSlide(currentSlide);

            currentIndex = (currentIndex + 1) % slides.length;

            const nextSlide = slides[currentIndex];
            nextSlide.classList.add("active");
            playVideosInSlide(nextSlide);

            const duration = nextSlide.classList.contains("hero-video-slide")
                ? 10000
                : 5000;

            setTimeout(changeSlide, duration);
        }

        const initialDuration = firstSlide.classList.contains("hero-video-slide")
            ? 10000
            : 5000;

        setTimeout(changeSlide, initialDuration);
    });
}

function initHeroVideoSound() {
    const soundButtons = document.querySelectorAll(".video-sound-btn");

    soundButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currentSlide = button.closest(".hero-video-slide");

            if (!currentSlide) return;

            const videosInCurrentSlide = currentSlide.querySelectorAll("video");
            const mainVideo = currentSlide.querySelector(".hero-video-frame video");
            const icon = button.querySelector("i");

            if (!mainVideo || !icon) return;

            const willActivateSound = mainVideo.muted;

            // Silencia y pausa TODOS los videos que no pertenezcan
            // a la diapositiva actual.
            document.querySelectorAll(".hero-video-slide").forEach((slide) => {
                if (slide !== currentSlide) {
                    slide.querySelectorAll("video").forEach((video) => {
                        video.pause();
                        video.muted = true;
                        video.currentTime = 0;
                    });

                    const otherButton = slide.querySelector(".video-sound-btn");
                    const otherIcon = otherButton?.querySelector("i");

                    if (otherButton && otherIcon) {
                        otherIcon.className = "fas fa-volume-mute";
                        otherButton.setAttribute("aria-label", "Activar sonido");
                    }
                }
            });

            if (willActivateSound) {
                // Fondo siempre queda sin sonido.
                videosInCurrentSlide.forEach((video) => {
                    video.muted = true;
                });

                // Solo el video visible puede tener audio.
                mainVideo.muted = false;
                mainVideo.volume = 1;
                mainVideo.play();

                icon.className = "fas fa-volume-up";
                button.setAttribute("aria-label", "Silenciar video");
            } else {
                mainVideo.muted = true;

                icon.className = "fas fa-volume-mute";
                button.setAttribute("aria-label", "Activar sonido");
            }
        });
    });
}