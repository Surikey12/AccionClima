<?php
namespace MyApi\Create;

require_once __DIR__ . '/../DataBase.php';

use MyApi\DataBase;

class Create extends DataBase {
    // Atributo para almacenar la respuesta de las consultas
    protected $response;

    // Constructor con parámetros opcionales para inicializar la conexión a la BD
    public function __construct($dbname, $username = 'root', $password = '123_abc') {
        // Llamada al constructor de la clase padre (DataBase) para establecer la conexión
        parent::__construct($dbname, $username, $password);
        // Inicializa el atributo response como un arreglo vacío
        $this->response = [];
    }

    // Método para agregar un registro
    public function register($usuario) {
        // Decodifica el JSON recibido para obtener los datos del producto
        $jsonOBJ = json_decode($usuario);
        $password = $jsonOBJ->password;
        
        // Resultado por defecto si ya existe el producto
        $this->response = [
            'status'  => 'error',
            'message' => 'Ya existe un producto con ese nombre'
        ];

        // Consulta para verificar si el correo ya está registrado
        $sql = "SELECT * FROM `registrados` WHERE `correo` = '{$jsonOBJ->email}'";
        $result = $this->conexion->query($sql);

        /* Verificar si la consulta fue exitosa
        if ($result === false) {
            $this->response['message'] = 'Error en la consulta: ' . $conexion->error;
            echo json_encode($this->response, JSON_PRETTY_PRINT);
            exit;
        }*/

        if ($result->num_rows == 0) {
            // Hashear la contraseña
            $hashed_password = password_hash($password, PASSWORD_DEFAULT); // Hasheamos la contraseña
            
            // Insertar nuevo registro
            $this->conexion->set_charset("utf8");
            $sql = "INSERT INTO `registrados` (`nombre`, `apellidos`, `correo`, `contraseña`) 
                    VALUES ('{$jsonOBJ->username}', '{$jsonOBJ->lastName}', '{$jsonOBJ->email}', '{$hashed_password}')";
            
            if ($this->conexion->query($sql)) {
                $this->response['status'] = 'success';
                $this->response['message'] = 'Registro exitoso. Redirigiendo...';
            } else {
                $this->response['message'] = 'ERROR: No se pudo registrar el usuario. ' . $this->conexion->error;
            }
        } else {
            $this->response['message'] = 'El correo ya está registrado.';
        }

        // Liberar resultado y cerrar conexión
        if ($result instanceof mysqli_result) {
            $result->free();
        }
    }

    // Método para agregar un voluntario
    public function voluntier($voluntario){
        // Decodifica el JSON recibido para obtener los datos del producto
        $jsonOBJ = json_decode($voluntario);
        
        // Resultado por defecto si ya existe el producto
        $this->response = [
            'status'  => 'error',
            'message' => 'Ya existe un producto con ese nombre'
        ];

        // SE ASUME QUE LOS DATOS YA FUERON VALIDADOS ANTES DE ENVIARSE
        $sql = "SELECT * FROM voluntarios WHERE email = '{$jsonOBJ->email}'";
	    $result = $this->conexion->query($sql);
        
        if ($result->num_rows == 0) {
            $this->conexion->set_charset("utf8");
            $sql = "INSERT INTO voluntarios VALUES (null, '{$jsonOBJ->nombre}', '{$jsonOBJ->apellidos}', '{$jsonOBJ->email}', '{$jsonOBJ->detalles}')";
            if($this->conexion->query($sql)){
                $this->response['status'] =  "success";
                $this->response['message'] =  "Listo, ya estas registrado como voluntario";
            } else {
                $this->response['message'] = "ERROR: No se ejecuto $sql. " . $this->conexion->error;
            }
        }

        $result->free();
    }

    public function propuesta($propuesta){
        // Decodifica el JSON recibido para obtener los datos del producto
        $jsonOBJ = json_decode($propuesta);
        
        // Resultado por defecto si ya existe el producto
        $this->response = [
            'status'  => 'error',
            'message' => 'Ya existe un producto con ese nombre'
        ];

        $this->conexion->set_charset("utf8");
        $sql = "INSERT INTO propuestas VALUES (null, '{$jsonOBJ->nombre}', '{$jsonOBJ->apellidos}', '{$jsonOBJ->detalles}', 0)";
        if($this->conexion->query($sql)){
            $this->response['status'] =  "success";
            $this->response['message'] =  "Listo, se registro tu propuesta";
        } else {
            $this->response['message'] = "ERROR: No se ejecuto $sql. " . $this->conexion->error;
        }

    }
    // Método para convertir el atributo response a JSON
    public function getData() {
        return json_encode($this->response);
    }

}
?>
