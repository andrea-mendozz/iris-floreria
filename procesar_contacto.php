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
$motivo = trim($_POST["motivo"] ?? "");
$mensaje = trim($_POST["mensaje"] ?? "");

if (
    $nombre === "" ||
    !filter_var($correo, FILTER_VALIDATE_EMAIL) ||
    $telefono === "" ||
    $motivo === "" ||
    $mensaje === ""
) {
    echo json_encode([
        "exito" => false,
        "mensaje" => "Completa todos los campos."
    ]);
    exit;
}

$sql = "INSERT INTO `consultas/cotizaciones`
(nombre, correo, telefono, motivo, mensaje)
VALUES (?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "exito" => false,
        "mensaje" => "Error al preparar la consulta."
    ]);
    exit;
}

$stmt->bind_param(
    "sssss",
    $nombre,
    $correo,
    $telefono,
    $motivo,
    $mensaje
);

if ($stmt->execute()) {
    echo json_encode([
        "exito" => true,
        "mensaje" => "Tu consulta se guardó correctamente."
    ]);
} else {
    echo json_encode([
        "exito" => false,
        "mensaje" => "No se pudo guardar tu consulta."
    ]);
}

$stmt->close();
$conexion->close();
?>