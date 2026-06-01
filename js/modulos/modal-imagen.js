// js/modulos/modal-imagen.js

function abrirModalImagen(src) {
    const modal = document.getElementById('modal-imagen');
    const imgAmpliada = document.getElementById('img-ampliada');
    
    if (modal && imgAmpliada) {
        imgAmpliada.src = src; // Le pasamos la ruta de la imagen seleccionada
        modal.classList.add('activo');
    }
}

function cerrarModalImagen() {
    const modal = document.getElementById('modal-imagen');
    if (modal) {
        modal.classList.remove('activo');
    }
}