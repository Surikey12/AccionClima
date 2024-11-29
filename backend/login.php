<?php
include 'connect.php';

// Inicializa la respuesta como un objeto JSON
$data = array(
    'status' => 'error',
    'message' => 'Campos incompletos.'
);

if (!empty($_POST['usuario']) && !empty($_POST['passin'])) {
    // Sanitiza las entradas para evitar inyecciones SQL
    $email = $conexion->real_escape_string($_POST['usuario']);
    $password = $_POST['passin'];

    // Consulta para buscar el usuario por correo
    $sql = "SELECT * FROM `registrados` WHERE `correo` = '$email'";
    $result = $conexion->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verifica la contraseña
        if (password_verify($password, $row['contraseña'])) {
            session_start();
            $_SESSION['correo'] = $row['correo'];
            
            $data['status'] = 'success';
            $data['message'] = 'Inicio de sesión exitoso.';
            $data['user'] = array(
                'nombre' => $row['nombre'],
                'correo' => $row['correo']
            );
        } else {
            $data['message'] = 'Usuario o contraseña incorrectos.';
        }
    } else {
        $data['message'] = 'Usuario no encontrado.';
    }
} else {
    $data['message'] = 'Por favor, complete todos los campos.';
}

// Devuelve la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($data, JSON_PRETTY_PRINT);
