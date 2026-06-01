// Archivo: js/app.js

function cargarPagina(pagina) {
    const contenedor = document.getElementById('contenido-dinamico');

    contenedor.innerHTML = '<div style="text-align:center; padding: 50px;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 40px; color: #0b5c40;"></i><p>Cargando...</p></div>';

    fetch(`pages/${pagina}.html`)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Página no encontrada");
            }
            return respuesta.text();
        })
        .then(html => {
            // Inyectamos el contenido
            contenedor.innerHTML = html;
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // ==========================================
            // LÓGICA CONDICIONAL: Llamamos a las funciones externas
            // ==========================================
            if (pagina === 'servicios') {
                if (typeof inicializarFormularioServicios === 'function') inicializarFormularioServicios();
            } else if (pagina === 'cursos') {
                if (typeof inicializarFormularioCursos === 'function') inicializarFormularioCursos();
            }
        })
        .catch(error => {
            contenedor.innerHTML = `
                <div style="text-align: center; padding: 100px 20px;">
                    <i class="fa-solid fa-person-digging" style="font-size: 60px; color: #FBBC05; margin-bottom: 20px;"></i>
                    <h2 style="font-family: 'Montserrat', sans-serif; color: #005088;">Página en Construcción</h2>
                    <p style="color: #4a5568; margin-top: 10px;">La sección <strong>${pagina}</strong> aún se está desarrollando.</p>
                </div>
            `;
            console.error("Error al cargar la página:", error);
        });
}

// Al cargar la web por primera vez, abrimos 'inicio'
document.addEventListener("DOMContentLoaded", () => {
    cargarPagina('inicio');
});