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

// Verificar que los campos requeridos estén presentes
if (!isset($data['field']) || !isset($data['value'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit();
}

// Validar que el campo sea válido
$validFields = ['email', 'telefono'];
if (!in_array($data['field'], $validFields)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Campo no válido']);
    exit();
}

// Configuración de la base de datos
$host = 'srv1779.hstgr.io';
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
    // Preparar la consulta para verificar si el valor ya existe
    $field = $data['field'] === 'email' ? 'correo' : 'telefono';
    $value = $data['value'];
    
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM registros WHERE $field = :value");
    $stmt->bindParam(':value', $value);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $exists = $result['count'] > 0;
    
    // Responder con el resultado
    echo json_encode([
        'success' => true,
        'exists' => $exists,
        'message' => $exists ? 'El valor ya existe' : 'El valor está disponible'
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error al verificar duplicados: ' . $e->getMessage()
    ]);
}
?>
