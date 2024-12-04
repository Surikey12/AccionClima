<?php
/*include_once __DIR__ . '/connect.php'; // Asegúrate de tener el archivo de conexión configurado correctamente

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
    
    // Verificar si los campos necesarios están presentes
    if (isset($jsonOBJ->username) && isset($jsonOBJ->password)) {
        // Escapa los valores de entrada para evitar inyecciones SQL

        $password = $jsonOBJ->password;

        // Consulta para buscar el usuario por correo
        $sql = "SELECT * FROM `registrados` WHERE `correo` = '{$jsonOBJ->username}'"; // Usamos solo el correo, la contraseña se verifica luego

        $result = $conexion->query($sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Verifica la contraseña usando password_verify
            if (password_verify($password, $row['contraseña'])) {
                // Inicia sesión
                session_start();
                $_SESSION['correo'] = $row['correo'];

                $data['status'] = 'success';
                $data['message'] = 'Inicio de sesión exitoso. Redirigiendo...';
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

        // Liberar el resultado de la consulta
        $result->free();
    } else {
        $data['message'] = 'Faltan campos necesarios en los datos enviados.';
    }
} else {
    $data['message'] = 'Por favor, complete todos los campos.';
}

// Cerrar la conexión
$conexion->close();

// Enviar la respuesta JSON
echo json_encode($data, JSON_PRETTY_PRINT);*/

    namespace backend;
    require_once __DIR__ . '/vendor/autoload.php';
    use MyApi\Read\Read;

    $usuario = new Read('accionclima');
    $usuario -> login(file_get_contents('php://input'));
    echo $usuario->getData();
?>
