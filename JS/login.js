$(document).ready(function () {

    // Función para mostrar mensajes de error o éxito
    function mostrarMensaje(tipo, mensaje) {
        const contenedorMensaje = $('#message');
        contenedorMensaje.removeClass('alert-success alert-danger').addClass(`alert-${tipo}`).text(mensaje).fadeIn();
        setTimeout(() => contenedorMensaje.fadeOut(), 3000);
    }

    // Función para mostrar el mensaje de error debajo de cada campo
    function mostrarError(campo, mensaje) {
        $(campo).next('.error-message').remove();  // Elimina el mensaje previo si existe
        $(campo).after(`<span class="error-message" style="color: red;">${mensaje}</span>`);
    }

    // Función para limpiar el mensaje de error debajo de cada campo
    function limpiarError(campo) {
        $(campo).next('.error-message').remove();
    }


    // Validar campos del formulario
    function validarCampo(campo) {
        let valor = $(campo).val();
        let esValido = true;
        limpiarError(campo);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        switch (campo.id) {
            case 'usuario': // Validación del campo de usuario en login
                if (!emailPattern.test(valor)) {
                    mostrarError(campo, 'El usuario es obligatorio y/ debe ser un correo');
                    esValido = false;
                }
                break;
            case 'name': // Validación del campo de nombre en registro
                if (valor === '') {
                    mostrarError(campo, 'El nombre es obligatorio.');
                    esValido = false;
                }
                break;
            
            case 'apell': // Validación del campo de nombre en registro
                if (valor === '') {
                    mostrarError(campo, 'El apellido es obligatorio.');
                    esValido = false;
                }
                break;
            
            case 'passin': // Validación de la contraseña en login
                if (valor.length < 6) {
                    mostrarError(campo, 'La contraseña debe tener al menos 6 caracteres.');
                    esValido = false;
                }
                break;

            case 'passup': // Validación de la contraseña en registro
                if (valor.length < 6) {
                    mostrarError(campo, 'La contraseña debe tener al menos 6 caracteres.');
                    esValido = false;
                }
                break;

            case 'email': // Validación del campo de email en registro
                if (!emailPattern.test(valor)) {
                    mostrarError(campo, 'Por favor, ingresa un correo electrónico válido.');
                    esValido = false;
                }
                break;
        }

        return esValido;
    }

    // Manejo de eventos al perder el foco en los campos de login y registro
    $('#signInForm input, #signUpForm input').on('input blur', function() {
        validarCampo(this);
    });

    // Manejo del envío de formulario de inicio de sesión
    $('#signInForm').submit(function (e) {
        e.preventDefault();
        console.log("Formulario de inicio de sesión enviado.");
        let esValido = true;
        $('#signInForm input').each(function () {
            if (!validarCampo(this)) {
                esValido = false;
            }
        });

        if (!esValido) return;

        // Recopilar datos
        const loginData = {
            username: $('#usuario').val(),
            password: $('#passin').val()
        };

        // Enviar datos vía AJAX
        $.ajax({
            url: '/backend/index.php/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function (response) {
                console.log(response);
                let message = JSON.parse(response);
                template = `<p>${message.message}</p>`;
                
                if (message.message.length > 0) {
                    alert(message.message);
                }
                // Redirigir a otra página
                window.location.href = 'propuesta.html';
            },
            error: function () {
                mostrarMensaje('danger', 'Ocurrió un error en el servidor.');
            }
        });
    });

    // Manejo del envío de formulario de registro
    $('#signUpForm').submit(function (e) {
        e.preventDefault();

        let esValido = true;
        $('#signUpForm input').each(function () {
            if (!validarCampo(this)) {
                esValido = false;
            }
        });

        if (!esValido) return;

        // Recopilar datos
        const registerData = {
            username: $('#name').val(),
            lastName: $('#apell').val(),
            email: $('#email').val(),
            password: $('#passup').val()
        };

        // Enviar datos vía AJAX
        $.ajax({
            url: 'backend/index.php/registro',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(registerData),
            success: function (response) {
                console.log(response);
                let message = JSON.parse(response);
                template = `<p>${message.message}</p>`;
                
                if (message.message.length > 0) {
                    alert(message.message);
                }
                // Redirigir a otra página
                window.location.href = 'propuesta.html';;
            },
            error: function () {
                mostrarMensaje('danger', 'Ocurrió un error en el servidor.');
            }
        });
    });
});
