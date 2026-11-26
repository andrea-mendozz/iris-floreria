<?php
header("Content-Type: application/json; charset=utf-8");

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "exito" => false,
        "mensaje" => "Solicitud no válida."
    ]);
    exit;
}

$nombre = trim($_POST["nombre"] ?? "");
$correo = trim($_POST["correo"] ?? "");
$telefono = trim($_POST["telefono"] ?? "");
$tipo_entrega = trim($_POST["entrega"] ?? "");
$direccion_entrega = trim($_POST["direccion"] ?? "");
$fecha_entrega = trim($_POST["fecha"] ?? "");
$metodo_pago = trim($_POST["pago"] ?? "");
$indicaciones = trim($_POST["mensaje"] ?? "");
$producto = $_POST["productos"] ?? "";
$total = $_POST["total"] ?? "";

if (
    $nombre === "" ||
    !filter_var($correo, FILTER_VALIDATE_EMAIL) ||
    $telefono === "" ||
    $tipo_entrega === "" ||
    $fecha_entrega === "" ||
    $metodo_pago === "" ||
    $producto === "" ||
    !is_numeric($total)
) {
    echo json_encode([
        "exito" => false,
        "mensaje" => "Faltan datos o algunos son incorrectos."
    ]);
    exit;
}

$sql = "INSERT INTO pedidos
(nombre, correo, telefono, tipo_entrega, direccion_entrega,
fecha_entrega, metodo_pago, indicaciones, producto, total)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "exito" => false,
        "mensaje" => "Error al preparar el pedido."
    ]);
    exit;
}

$total = (float)$total;

$stmt->bind_param(
    "sssssssssd",
    $nombre,
    $correo,
    $telefono,
    $tipo_entrega,
    $direccion_entrega,
    $fecha_entrega,
    $metodo_pago,
    $indicaciones,
    $producto,
    $total
);

if ($stmt->execute()) {
    echo json_encode([
        "exito" => true,
        "mensaje" => "Tu pedido se guardó correctamente."
    ]);
} else {
    echo json_encode([
        "exito" => false,
        "mensaje" => "No se pudo guardar el pedido."
    ]);
}

$stmt->close();
$conexion->close();
?>