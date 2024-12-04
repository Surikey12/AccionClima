<?php
namespace MyApi\Read;

require_once __DIR__ . '/../DataBase.php';

use MyApi\DataBase;

class Read extends DataBase {
    // Atributo para almacenar la respuesta de las consultas
    protected $response;

    // Constructor con parámetros opcionales para inicializar la conexión a la BD
    public function __construct($dbname, $username = 'root', $password = '123_abc') {
        // Llamada al constructor de la clase padre (DataBase) para establecer la conexión
        parent::__construct($dbname, $username, $password);
        // Inicializa el atributo response como un arreglo vacío
        $this->response = [];
    }

    // Método para listar productos
    public function listPropuesta() {
        // Limpia el array response
        $this->response = [];

        // Realiza la consulta de búsqueda
        if ($result = $this->conexion->query("SELECT * FROM propuestas WHERE eliminado = 0")) {
            // Obtiene los resultados
            $rows = $result->fetch_all(MYSQLI_ASSOC);

            if (!is_null($rows)) {
                // Codifica los datos a UTF-8 y los agrega al array de respuesta
                foreach ($rows as $num => $row) {
                    foreach ($row as $key => $value) {
                        $this->response[$num][$key] = utf8_encode($value);
                    }
                }
            }
            $result->free();
        } else {
            die('Query Error: ' . $this->conexion->error);
        }
    }

    // Método para buscar productos por ID, nombre, marca o detalles
    public function login($usuario) {
        // INICIALIZA LA RESPUESTA
        $jsonOBJ = json_decode($usuario);

        // Resultado por defecto si ya existe el producto
        $this->response = [
            'status'  => 'error',
            'message' => 'Ya existe un producto con ese nombre'
        ];

        // Verificar si los campos necesarios están presentes
        if (isset($jsonOBJ->username) && isset($jsonOBJ->password)) {
            // Escapa los valores de entrada para evitar inyecciones SQL

            $password = $jsonOBJ->password;

            // Consulta para buscar el usuario por correo
            $sql = "SELECT * FROM `registrados` WHERE `correo` = '{$jsonOBJ->username}'"; // Usamos solo el correo, la contraseña se verifica luego

            $result = $this->conexion->query($sql);

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();

                // Verifica la contraseña usando password_verify
                if (password_verify($password, $row['contraseña'])) {
                    // Inicia sesión
                    session_start();
                    $_SESSION['correo'] = $row['correo'];

                    $this->response['status'] = 'success';
                    $this->response['message'] = 'Inicio de sesión exitoso. Redirigiendo...';
                    $this->response['user'] = array(
                        'nombre' => $row['nombre'],
                        'correo' => $row['correo']
                    );
                } else {
                    $this->response['message'] = 'Usuario o contraseña incorrectos.';
                }
            } else {
                $this->response['message'] = 'Usuario no encontrado.';
            }

            // Liberar el resultado de la consulta
            $result->free();
        } else {
            $this->response['message'] = 'Faltan campos necesarios en los datos enviados.';
        }
    }

    // Método para convertir el atributo response a JSON
    public function getData() {
        return json_encode($this->response);
    }

}
?>
