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

    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    const formulario = document.getElementById("formulario-contacto");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const nombre = document.getElementById("nombre");
            const correo = document.getElementById("correo");
            const telefono = document.getElementById("telefono");
            const mensaje = document.getElementById("mensaje");

            const emailValido =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());

            const telefonoValido = /^[0-9]{10}$/.test(telefono.value.trim());

            if (nombre.value.trim().length < 3) {
                alert("Escribe tu nombre completo (mínimo 3 caracteres).");
                nombre.focus();
                return;
            }

            if (!emailValido) {
                alert("Escribe un correo electrónico válido.");
                correo.focus();
                return;
            }

            if (!telefonoValido) {
                alert("Escribe un teléfono válido de 10 dígitos.");
                telefono.focus();
                return;
            }

            if (mensaje.value.trim().length < 10) {
                alert("Tu mensaje debe tener al menos 10 caracteres.");
                mensaje.focus();
                return;
            }

            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }

            alert("¡Gracias por contactar a IRIS Florería! Tu formulario fue validado correctamente.");
            formulario.reset();
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