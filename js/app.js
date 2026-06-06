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




// Función para el carrusel de inicio (Retorno instantáneo)
function moverCarrusel(direccion) {
    const track = document.getElementById('track-imagenes');
    if (!track) return;

    const anchoSlide = track.clientWidth;
    const scrollActual = track.scrollLeft;
    const scrollMaximo = track.scrollWidth - track.clientWidth;

    // Si presionamos flecha derecha (+1) o es automático
    if (direccion === 1) {
        if (scrollActual >= scrollMaximo - 10) { 
            // Vuelve a la posición 0 de forma INSTANTÁNEA (behavior: 'auto')
            track.scrollTo({ left: 0, behavior: 'auto' });
        } else {
            // Desplazamiento normal suave entre fotos
            track.scrollBy({ left: anchoSlide, behavior: 'smooth' });
        }
    } 
    // Si presionamos flecha izquierda (-1)
    else {
        if (scrollActual <= 10) {
            // Va a la última posición de forma INSTANTÁNEA
            track.scrollTo({ left: scrollMaximo, behavior: 'auto' });
        } else {
            track.scrollBy({ left: -anchoSlide, behavior: 'smooth' });
        }
    }
}

// Reproducción automática cada 5 segundos
setInterval(() => moverCarrusel(1), 5000);


