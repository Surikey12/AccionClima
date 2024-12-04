<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require 'vendor/autoload.php'; // Slim Framework
require_once __DIR__ . '/MyApi/Create/Create.php';
require_once __DIR__ . '/MyApi/Read/Read.php';

use MyApi\Create\Create;
use MyApi\Read\Read;

$app = new Slim\App();

// Configuración de base de datos
$dbName = 'accionclima'; 

$create = new Create($dbName);
$read = new Read($dbName);

// Ruta base
$app->get('/', function ($request, $response, $args) {
    $response->write("API de Productos funcionando");
    return $response;
});

// Mostrar propuestas
$app->get('/propuestas', function ($request, $response, $args) use ($read) {
    $read->listPropuesta();
    $data = $read->getData();
    return $response->write($data);
});

// Login
$app->post('/login', function ($request, $response, $args) use ($read) {
    $usuario = file_get_contents('php://input');
    $read->login($usuario);
    $data = $read->getData();
    return $response->write($data);
});

// Registrar un usuario
$app->post('/registro', function ($request, $response, $args) use ($create) {
    $usuario = file_get_contents('php://input');
    $create->register($usuario);
    $data = $create->getData();
    return $response->write($data);
});

// Agregar un voluntario
$app->post('/voluntarios', function ($request, $response, $args) use ($create) {
    $usuario = file_get_contents('php://input');
    $create->voluntier($usuario);
    $data = $create->getData();
    return $response->write($data);
});

// Agregar una propuesta
$app->post('/usuario/propuesta', function ($request, $response, $args) use ($create) {
    $propuesta = file_get_contents('php://input');
    $create->propuesta($propuesta);
    $data = $create->getData();
    return $response->write($data);
});

$app->run();
?>