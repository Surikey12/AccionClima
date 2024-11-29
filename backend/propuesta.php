<?php
    include_once __DIR__.'/connect.php';

    // SE OBTIENE LA INFORMACIÓN DEL PRODUCTO ENVIADA POR EL CLIENTE
    $propuesta = file_get_contents('php://input');
    $data = array(
        'status'  => 'error',
        'message' => 'Ya existe una cuenta asociada a ese correo'
    );
    if(!empty($propuesta)) {
        // SE TRANSFORMA EL STRING DEL JASON A OBJETO
        $jsonOBJ = json_decode($propuesta);
        // SE ASUME QUE LOS DATOS YA FUERON VALIDADOS ANTES DE ENVIARSE
        
        $conexion->set_charset("utf8");
        $sql = "INSERT INTO propuestas VALUES (null, '{$jsonOBJ->nombre}', '{$jsonOBJ->apellidos}', '{$jsonOBJ->detalles}', 0)";
        if($conexion->query($sql)){
            $data['status'] =  "success";
            $data['message'] =  "Listo, se registro tu propuesta";
        } else {
            $data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($conexion);
        }

        // Cierra la conexion
        $conexion->close();
    }

    // SE HACE LA CONVERSIÓN DE ARRAY A JSON
    echo json_encode($data, JSON_PRETTY_PRINT);
?>