<?php
require_once "conexion.php";

// Obtener pedidos
$sqlPedidos = "SELECT * FROM pedidos ORDER BY id_pedido DESC";
$resultadoPedidos = $conexion->query($sqlPedidos);

// Obtener consultas y cotizaciones
$sqlConsultas = "SELECT * FROM `consultas/cotizaciones` ORDER BY id_c DESC";
$resultadoConsultas = $conexion->query($sqlConsultas);

// Evitar que los datos se interpreten como HTML
function limpiar($dato) {
    return htmlspecialchars($dato ?? "", ENT_QUOTES, "UTF-8");
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | IRIS Florería</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 30px;
            font-family: Arial, sans-serif;
            background: #f5f0fa;
            color: #443653;
        }

        header {
            text-align: center;
            margin-bottom: 35px;
        }

        header h1 {
            color: #7952a3;
            font-size: 35px;
        }

        header p {
            color: #766487;
        }

        .contenedor {
            max-width: 1200px;
            margin: auto;
        }

        .seccion {
            background: white;
            padding: 25px;
            margin-bottom: 35px;
            border-radius: 12px;
            box-shadow: 0 3px 12px rgba(75, 48, 105, 0.09);
        }

        h2 {
            color: #7952a3;
            margin-top: 0;
        }

        .tabla-contenedor {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 750px;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #eee7f4;
            text-align: left;
            font-size: 14px;
        }

        th {
            background: #e9def4;
            color: #624080;
        }

        tr:hover {
            background: #f8f4fc;
        }

        .vacio {
            text-align: center;
            padding: 20px;
            color: #93869f;
        }

        footer {
            text-align: center;
            color: #766487;
            margin-top: 30px;
        }
    </style>
</head>

<body>

<div class="contenedor">

    <header>
        <h1>IRIS Florería</h1>
        <p>Dashboard administrativo</p>
    </header>

    <section class="seccion">
        <h2>Pedidos registrados</h2>

        <div class="tabla-contenedor">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Producto</th>
                        <th>Entrega</th>
                        <th>Fecha</th>
                        <th>Pago</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    <?php if ($resultadoPedidos && $resultadoPedidos->num_rows > 0): ?>

                        <?php while ($pedido = $resultadoPedidos->fetch_assoc()): ?>
                            <tr>
                                <td><?= limpiar($pedido["id_pedido"]) ?></td>
                                <td><?= limpiar($pedido["nombre"]) ?></td>
                                <td><?= limpiar($pedido["correo"]) ?></td>
                                <td><?= limpiar($pedido["telefono"]) ?></td>
                                <td><?= limpiar($pedido["producto"]) ?></td>
                                <td><?= limpiar($pedido["tipo_entrega"]) ?></td>
                                <td><?= limpiar($pedido["fecha_entrega"]) ?></td>
                                <td><?= limpiar($pedido["metodo_pago"]) ?></td>
                                <td>$<?= limpiar($pedido["total"]) ?></td>
                            </tr>
                        <?php endwhile; ?>

                    <?php else: ?>
                        <tr>
                            <td colspan="9" class="vacio">
                                Todavía no hay pedidos registrados.
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </section>

    <section class="seccion">
        <h2>Consultas y cotizaciones</h2>

        <div class="tabla-contenedor">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Motivo</th>
                        <th>Mensaje</th>
                    </tr>
                </thead>

                <tbody>
                    <?php if ($resultadoConsultas && $resultadoConsultas->num_rows > 0): ?>

                        <?php while ($consulta = $resultadoConsultas->fetch_assoc()): ?>
                            <tr>
                                <td><?= limpiar($consulta["id_c"]) ?></td>
                                <td><?= limpiar($consulta["nombre"]) ?></td>
                                <td><?= limpiar($consulta["correo"]) ?></td>
                                <td><?= limpiar($consulta["telefono"]) ?></td>
                                <td><?= limpiar($consulta["motivo"]) ?></td>
                                <td><?= limpiar($consulta["mensaje"]) ?></td>
                            </tr>
                        <?php endwhile; ?>

                    <?php else: ?>
                        <tr>
                            <td colspan="6" class="vacio">
                                Todavía no hay consultas registradas.
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </section>

    <footer>
        IRIS Florería © 2026
    </footer>

</div>

</body>
</html>