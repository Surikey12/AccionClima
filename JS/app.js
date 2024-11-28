/*------------------------------------------------------------ */
// Cambiar el color de la barra de navegación al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('bg-morado');
      nav.classList.remove('bg-transparent');
    } else {
      nav.classList.add('bg-transparent');
      nav.classList.remove('bg-morado');
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#climateCarousel");
    const carouselInner = carousel.querySelector(".carousel-inner");
    const propósitoOverlay = document.createElement("div");
  
    // Crear el overlay para el propósito
    propósitoOverlay.className = "propósito-overlay";
    propósitoOverlay.textContent =
      "Nuestro proposito es crear una plataforma informativa y participativa que sensibilice a la comunidad sobre los efectos del cambio climático en la ciudad de Puebla. A través de esta página web, se busca proporcionar información relevante sobre los impactos locales, así como apartados en donde se puedan hacer voluntarios y buscar soluciones prácticas para reducir el cambio climático, fomentando la acción colectiva mediante la promoción de iniciativas de voluntariado y propuestas de mejora";
    carousel.appendChild(propósitoOverlay);
  
    // Detener el carrusel al pasar el cursor
    carousel.addEventListener("mouseenter", () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) bsCarousel.pause(); // Detener carrusel
      propósitoOverlay.style.display = "flex"; // Mostrar propósito
    });
  
    // Reanudar el carrusel al quitar el cursor
    carousel.addEventListener("mouseleave", () => {
      const bsCarousel = bootstrap.Carousel.getInstance(carousel);
      if (bsCarousel) bsCarousel.cycle(); // Reiniciar carrusel
      propósitoOverlay.style.display = "none"; // Ocultar propósito
    });
  });
  


/*------------------------------------------------------------ */
