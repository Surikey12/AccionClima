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
$(document).ready(function() {
    let edit = false;
    console.log('jQuery is working');
    //fetchProducts();
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
                case 'email': // Validación del campo de email en registro
                        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if (!emailPattern.test(valor)) {
                            mostrarError(campo, 'Por favor, ingresa un correo electrónico válido');
                            esValido = false;
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
        $('#volunteer-form input, #volunteer-form textarea').on('input blur', function() {
            validarCampo(this);
        });
    
        // Validación final y envío del formulario
        $('#volunteer-form').submit(function(e) {
            e.preventDefault();
            let valido = true;
    
            // Validar cada campo al enviar el formulario
            $('#volunteer-form input, #volunteer-form textarea').each(function() {
                if (!validarCampo(this)) {
                    valido = false;
                }
            });
            
            // Detener el envío si hay errores
            if (!valido) return;
    
            // Crear el objeto de datos finales
            const finalProductData = {
                id: $('#voluntarioId').val(),
                nombre: $('#nombre').val(),
                apellidos: $('#apellidos').val(),
                email: $('#email').val(),
                detalles: $('#description').val()
            };
        
            // Enviar los datos vía AJAX
            $.ajax({
                url: 'backend/voluntario.php',
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
    

    /*Función de listar productos
    function fetchProducts() {
        $.ajax({
            url: 'backend/product-list.php',
            type: 'GET',
            success: function(response){
                let products = JSON.parse(response);
                let template = '';
                products.forEach(product =>{
                    template += `
                        <tr productId = "${product.id}">
                            <td>${product.id}</td>
                            <td>
                                <a href="#" class="product-item">${product.nombre}</a>
                            </td>
                            <td>${product.detalles}</td>
                            <td>
                                <button class="product-delete btn btn-danger">
                                    Eliminar
                                </button>  
                            </td>
                        </tr>
                    `
                });
                $('#products').html(template);
            }
        });
    }*/

});