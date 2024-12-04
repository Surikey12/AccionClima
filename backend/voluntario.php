<?php
    /*include_once __DIR__.'/connect.php';

    // SE OBTIENE LA INFORMACIÓN DEL PRODUCTO ENVIADA POR EL CLIENTE
    $voluntario = file_get_contents('php://input');
    $data = array(
        'status'  => 'error',
        'message' => 'Ya existe una cuenta asociada a ese correo'
    );
    if(!empty($voluntario)) {
        // SE TRANSFORMA EL STRING DEL JASON A OBJETO
        $jsonOBJ = json_decode($voluntario);
        // SE ASUME QUE LOS DATOS YA FUERON VALIDADOS ANTES DE ENVIARSE
        $sql = "SELECT * FROM voluntarios WHERE email = '{$jsonOBJ->email}'";
	    $result = $conexion->query($sql);
        
        if ($result->num_rows == 0) {
            $conexion->set_charset("utf8");
            $sql = "INSERT INTO voluntarios VALUES (null, '{$jsonOBJ->nombre}', '{$jsonOBJ->apellidos}', '{$jsonOBJ->email}', '{$jsonOBJ->detalles}')";
            if($conexion->query($sql)){
                $data['status'] =  "success";
                $data['message'] =  "Listo, ya estas registrado como voluntario";
            } else {
                $data['message'] = "ERROR: No se ejecuto $sql. " . mysqli_error($conexion);
            }
        }

        $result->free();
        // Cierra la conexion
        $conexion->close();
    }

    // SE HACE LA CONVERSIÓN DE ARRAY A JSON
    echo json_encode($data, JSON_PRETTY_PRINT);*/

    namespace backend;
    require_once __DIR__ . '/vendor/autoload.php';
    use MyApi\Create\Create;

    $usuario = new Create('accionclima');
    $usuario -> voluntier(file_get_contents('php://input'));
    echo $usuario->getData();
?>