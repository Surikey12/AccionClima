<?php

    namespace MyApi;
    abstract class DataBase {
        // Atributo protegido para la conexión
        protected $conexion;
    
        // Constructor que recibe los parámetros de conexión
        public function __construct($dbname, $username, $password) {
            // Intenta establecer la conexión y maneja posibles errores
            try {
                $this->conexion = @mysqli_connect(
                    'localhost',
                    $username,
                    $password,
                    $dbname
                );
            } catch (PDOException $e) {
                // Muestra el error en caso de fallo de conexión
                die("Error de conexión: " . $e->getMessage());
            }
        }
    }
?>