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


/*------------------------------------------------------------ */
