document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initMobileMenu();
    initVehicleFilters();
    initQuoteButtons();
    initQuoteForm();
});

/* =========================================================
   HERO SLIDER
   ========================================================= */

function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");

    if (!slides.length) return;

    let currentIndex = 0;

    setInterval(() => {
        slides[currentIndex].classList.remove("active");

        currentIndex = (currentIndex + 1) % slides.length;

        slides[currentIndex].classList.add("active");
    }, 5000);
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

        const whatsappUrl = `https://wa.me/56982185894?text=${encodeURIComponent(whatsappMessage)}`;

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