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
$(document).ready(function() {
    let edit = false;
    console.log('jQuery is working');
    fetchProductsForCarousel();
    //Funcion de envio de datos
    $(document).ready(function() {
    
        // Función para mostrar el mensaje de error debajo de cada campo
        function mostrarError(campo, mensaje) {
            $(campo).next('.error-message').remove();  // Elimina el mensaje previo si existe
            $(campo).after(`<span class="error-message" style="color: red;">${mensaje}</span>`);
        }
    
        // Función para limpiar el mensaje de error debajo de cada campo
        function limpiarError(campo) {
            $(campo).next('.error-message').remove();
        }
    
        // Función de validación para cada campo
        function validarCampo(campo) {
            let valid = true;
            let valor = $(campo).val();
            limpiarError(campo);
    
            switch (campo.id) {
                case 'nombre':
                    if (valor.length === 0 || valor.length > 100) {
                        mostrarError(campo, 'El nombre del producto es obligatorio');
                        valid = false;
                    }
                    break;
                case 'apellidos':
                        if (valor.length === 0 || valor.length > 100) {
                            mostrarError(campo, 'El apellido del producto es obligatorio');
                            valid = false;
                        }
                        break;
                case 'description':
                    if (valor.length > 250) {
                        mostrarError(campo, 'Los detalles no pueden tener más de 400 caracteres');
                        valid = false;
                    }
                    break;
            }
            return valid;
        }
    
        // Validación en tiempo real y al perder el foco en cada campo
        $('#propuesta-form input, #propuesta-form textarea').on('input blur', function() {
            validarCampo(this);
        });
    
        // Validación final y envío del formulario
        $('#propuesta-form').submit(function(e) {
            e.preventDefault();
            let valido = true;
    
            // Validar cada campo al enviar el formulario
            $('#propuesta-form input, #propuesta-form textarea').each(function() {
                if (!validarCampo(this)) {
                    valido = false;
                }
            });
            
            // Detener el envío si hay errores
            if (!valido) return;
    
            // Crear el objeto de datos finales
            const finalProductData = {
                id: $('#propuestaId').val(),
                nombre: $('#nombre').val(),
                apellidos: $('#apellidos').val(),
                detalles: $('#description').val()
            };
        
            // Enviar los datos vía AJAX
            $.ajax({
                url: 'backend/index.php/usuario/propuesta',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(finalProductData),
                success: function(response) {
                    //fetchProducts();
                    console.log(response);
                    let message = JSON.parse(response);
                    template = `<p>${message.message}</p>`;
                    
                    if (message.message.length > 0) {
                        alert(message.message);
                    }
                    location.reload();
                },
                error: function(err) {
                    console.error('Error al agregar producto:', err);
                }
            });
        });
    });
    

    // Función para listar productos en el carrusel
    function fetchProductsForCarousel() {
        $.ajax({
            url: '/backend/index.php/propuestas', // Asegúrate de que esta ruta sea correcta
            type: 'GET',
            success: function (response) {
                let products = JSON.parse(response);
                let template = '';
                let isActive = true;

                products.forEach(product => {
                    template += `
                        <div class="carousel-item ${isActive ? 'active' : ''}">
                            <div class="card text-center" style="background: transparent; border: none;">
                                <div class="card-body" >
                                    <h5 class="card-title" style="color: white;">${product.nombre}</h5>
                                    <p class="card-text" style="color: white;">${product.apellido}</p>
                                    <p class="card-text" style="color: white;"><strong>Propuesta:</strong> ${product.propuesta}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    isActive = false; // Solo el primer elemento debe ser activo
                });

                // Insertar el contenido en el carrusel
                $('#carousel-content').html(template);
            },
            error: function (err) {
                console.error('Error al obtener productos:', err);
            }
        });
    }

});