// MENÚ HAMBURGUESA
document.addEventListener("DOMContentLoaded", () => {
    const navegacion = document.querySelector(".navegacion");
    const menu = document.querySelector(".menu");
    const botonMenu = document.querySelector(".boton-menu");

    if (navegacion && menu && botonMenu) {
        botonMenu.addEventListener("click", () => {
            const abierto = menu.classList.toggle("menu-abierto");

            botonMenu.setAttribute("aria-expanded", abierto);
            botonMenu.setAttribute(
                "aria-label",
                abierto ? "Cerrar menú" : "Abrir menú"
            );
        });

        menu.querySelectorAll("a").forEach(enlace => {
            enlace.addEventListener("click", () => {
                menu.classList.remove("menu-abierto");
                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");
            });
        });
    }

    // VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
    const formulario = document.getElementById("formulario-contacto");

    if (formulario) {
        formulario.noValidate = true;

        formulario.addEventListener("submit", async (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById("nombre");
            const correo = document.getElementById("correo");
            const telefono = document.getElementById("telefono");
            const motivo = document.getElementById("motivo");
            const mensaje = document.getElementById("mensaje");

            // VERIFICAR SI TODOS LOS CAMPOS ESTÁN VACÍOS
            const todosVacios =
                !nombre.value.trim() &&
                !correo.value.trim() &&
                !telefono.value.trim() &&
                !motivo.value.trim() &&
                !mensaje.value.trim();

            if (todosVacios) {
                alert("Por favor, completa todos los campos.");
                nombre.focus();
                return;
            }

            // VALIDAR CORREO ELECTRÓNICO
            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());

            // VALIDAR TELÉFONO
            const telefonoValido =
                /^[0-9]{10}$/.test(telefono.value.trim());

            // VALIDAR NOMBRE
            if (nombre.value.trim().length < 3) {
                alert("Escribe tu nombre completo (mínimo 3 caracteres).");
                nombre.focus();
                return;
            }

            // VALIDAR CORREO
            if (!emailValido) {
                alert("Escribe un correo electrónico válido.");
                correo.focus();
                return;
            }

            // VALIDAR TELÉFONO
            if (!telefonoValido) {
                alert("Escribe un teléfono válido de 10 dígitos.");
                telefono.focus();
                return;
            }

            // VALIDAR MOTIVO
            if (!motivo.value.trim()) {
                alert("Por favor, selecciona un motivo de contacto.");
                motivo.focus();
                return;
            }

            // VALIDAR MENSAJE
            if (mensaje.value.trim().length < 10) {
                alert("Tu mensaje debe tener al menos 10 caracteres.");
                mensaje.focus();
                return;
            }

            // COMPROBAR LOS DEMÁS CAMPOS OBLIGATORIOS
            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            // ENVIAR DATOS A MYSQL
            try {
                const respuesta = await fetch("procesar_contacto.php", {
                    method: "POST",
                    body: new FormData(formulario)
                });

                const resultado = await respuesta.json();

                if (resultado.exito) {
                    alert("¡Gracias por contactar a IRIS Florería! Tu consulta se guardó correctamente.");
                    formulario.reset();
                } else {
                    alert(resultado.mensaje);
                }

            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo enviar el formulario. Verifica que XAMPP esté funcionando.");
            }
        });
    }
});


// VENTANA CON INFORMACIÓN DE LOS PRODUCTOS
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalProducto");
    const cerrar = document.getElementById("cerrarModal");

    if (!modal || !cerrar) return;

    const productos = document.querySelectorAll(".tarjeta-producto");

    productos.forEach(tarjeta => {
        const imagen = tarjeta.querySelector("img");

        imagen.style.cursor = "pointer";

        imagen.addEventListener("click", () => {
            const nombre = tarjeta.querySelector("h3").textContent;
            const precio = tarjeta.querySelector("strong").textContent;
            const categoria = tarjeta.querySelector(".categoria-producto").textContent;

            document.getElementById("imagenModal").src = imagen.src;
            document.getElementById("imagenModal").alt = imagen.alt;
            document.getElementById("nombreModal").textContent = nombre;
            document.getElementById("precioModal").textContent = precio;

            document.getElementById("descripcionModal").textContent =
                imagen.dataset.descripcion || "Hermoso arreglo floral de IRIS Florería.";

            modal.classList.add("activo");
        });
    });

    cerrar.addEventListener("click", () => {
        modal.classList.remove("activo");
    });

    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.classList.remove("activo");
        }
    });
});


// FILTRO DE CATEGORÍAS DEL CATÁLOGO
document.addEventListener("DOMContentLoaded", () => {
    const filtros = document.querySelectorAll(".filtros-categorias a");
    const productos = document.querySelectorAll(".tarjeta-producto");

    filtros.forEach(filtro => {
        filtro.addEventListener("click", (evento) => {
            evento.preventDefault();

            const categoriaSeleccionada = filtro.textContent
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
                .toLowerCase();

            productos.forEach(producto => {
                const categoriaProducto = producto
                    .querySelector(".categoria-producto")
                    .textContent
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .trim()
                    .toLowerCase();

                if (
                    categoriaSeleccionada === "todos" ||
                    categoriaProducto === categoriaSeleccionada
                ) {
                    producto.style.display = "";
                } else {
                    producto.style.display = "none";
                }
            });
        });
    });
});