<?php
// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar solicitudes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verificar que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

// Obtener los datos enviados
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que todos los campos requeridos estén presentes
if (!isset($data['nombre_completo']) || !isset($data['correo']) || !isset($data['telefono'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit();
}

// Ya no necesitamos el campo pais

// Configuración de la base de datos
$host = 'srv1779.hstgr.io'; // También puedes usar '82.197.82.132'
$db = 'u203548836_bdsoftdatai';
$user = 'u203548836_gerencia';
$password = '1023@Ndres';

// Conectar a la base de datos
try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    exit();
}

try {
    // Verificar si el correo ya existe
    $checkEmail = $conn->prepare("SELECT COUNT(*) as count FROM registros WHERE correo = :correo");
    $checkEmail->bindParam(':correo', $data['correo']);
    $checkEmail->execute();
    $emailExists = $checkEmail->fetch(PDO::FETCH_ASSOC)['count'] > 0;
    
    if ($emailExists) {
        http_response_code(409); // Conflict
        echo json_encode(['success' => false, 'message' => 'El correo electrónico ya está registrado']);
        exit();
    }
    
    // Verificar si el teléfono ya existe
    $checkPhone = $conn->prepare("SELECT COUNT(*) as count FROM registros WHERE telefono = :telefono");
    $checkPhone->bindParam(':telefono', $data['telefono']);
    $checkPhone->execute();
    $phoneExists = $checkPhone->fetch(PDO::FETCH_ASSOC)['count'] > 0;
    
    if ($phoneExists) {
        http_response_code(409); // Conflict
        echo json_encode(['success' => false, 'message' => 'El número de teléfono ya está registrado']);
        exit();
    }
    
    // Si no hay duplicados, proceder con el registro
    $stmt = $conn->prepare("INSERT INTO registros (nombre_completo, correo, telefono, fecha_registro) VALUES (:nombre_completo, :correo, :telefono, NOW())");
    
    // Vincular parámetros
    $stmt->bindParam(':nombre_completo', $data['nombre_completo']);
    $stmt->bindParam(':correo', $data['correo']);
    $stmt->bindParam(':telefono', $data['telefono']);
    
    // Ejecutar la consulta
    $stmt->execute();
    
    // Obtener el ID del nuevo registro
    $newId = $conn->lastInsertId();
    
    // Responder con éxito
    http_response_code(201);
    echo json_encode([
        'success' => true, 
        'message' => 'Registro guardado correctamente',
        'id' => $newId
    ]);
    
} catch (PDOException $e) {
    // Verificar si es un error de duplicado (por si acaso se saltó las validaciones)
    if ($e->getCode() == '23000' || strpos($e->getMessage(), 'Duplicate entry') !== false) {
        http_response_code(409);
        echo json_encode([
            'success' => false, 
            'message' => 'Error: El correo o teléfono ya están registrados'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Error al guardar el registro: ' . $e->getMessage()
        ]);
    }
}
?>
