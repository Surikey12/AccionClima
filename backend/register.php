<?php
include_once __DIR__ . '/connect.php'; // Asegúrate de tener el archivo de conexión configurado correctamente


// OBTIENE LA INFORMACIÓN DEL USUARIO ENVIADA POR EL CLIENTE
$usuario = file_get_contents('php://input');

// INICIALIZA LA RESPUESTA
$data = array(
    'status' => 'error',
    'message' => 'Datos incompletos o inválidos.'
);

if (!empty($usuario)) {
    // DECODIFICA EL JSON A OBJETO PHP
    $jsonOBJ = json_decode($usuario);
    $password = $jsonOBJ->password;

    // Consulta para verificar si el correo ya está registrado
    $sql = "SELECT * FROM `registrados` WHERE `correo` = '{$jsonOBJ->email}'";
    $result = $conexion->query($sql);

    // Verificar si la consulta fue exitosa
    if ($result === false) {
        $data['message'] = 'Error en la consulta: ' . $conexion->error;
        echo json_encode($data, JSON_PRETTY_PRINT);
        exit;
    }

    if ($result->num_rows == 0) {
        // Hashear la contraseña
        $hashed_password = password_hash($password, PASSWORD_DEFAULT); // Hasheamos la contraseña
        
        // Insertar nuevo registro
        $conexion->set_charset("utf8");
        $sql = "INSERT INTO `registrados` (`nombre`, `apellidos`, `correo`, `contraseña`) 
                VALUES ('{$jsonOBJ->username}', '{$jsonOBJ->lastName}', '{$jsonOBJ->email}', '{$hashed_password}')";
        
        if ($conexion->query($sql)) {
            $data['status'] = 'success';
            $data['message'] = 'Registro exitoso.';
        } else {
            $data['message'] = 'ERROR: No se pudo registrar el usuario. ' . $conexion->error;
        }
    } else {
        $data['message'] = 'El correo ya está registrado.';
    }

    // Liberar resultado y cerrar conexión
    if ($result instanceof mysqli_result) {
        $result->free();
    }
}
    $conexion->close();

    // Responder
    echo json_encode($data, JSON_PRETTY_PRINT);

?>
