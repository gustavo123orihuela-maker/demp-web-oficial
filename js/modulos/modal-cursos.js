// Archivo: js/modulos/modal-cursos.js

function abrirModalRegistro(curso) {
    const modal = document.getElementById('modal-registro');
    const inputCurso = document.getElementById('curso-seleccionado');
    const tituloModal = document.getElementById('modal-titulo-curso');
    
    if(modal) {
        inputCurso.value = curso;
        tituloModal.textContent = `Registro: ${curso}`;
        modal.classList.add('activo');
    }
}

function cerrarModalRegistro() {
    const modal = document.getElementById('modal-registro');
    if(modal) {
        modal.classList.remove('activo');
    }
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-registro');
    if (event.target === modal) {
        cerrarModalRegistro();
    }
});

function inicializarFormularioCursos() {
    const formCursos = document.getElementById('formulario-registro-curso');
    const btnEnviar = document.getElementById('btn-enviar-registro');
    
    if (!formCursos) return;

    // Tu enlace de Google Apps Script para cursos
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzVK-Yga86eG0pcSMVq9I8IvlToKZBR4cF9d0S2M9qsYgC0oIzEwGXPr8uK1eT9ICao/exec';

    formCursos.addEventListener('submit', e => {
        e.preventDefault(); 
        
        const textoOriginal = btnEnviar.textContent;
        btnEnviar.textContent = 'Registrando...';
        btnEnviar.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(formCursos)})
            .then(response => {
                alert('¡Registro completado! Nos pondremos en contacto contigo.');
                formCursos.reset(); 
                cerrarModalRegistro();
                btnEnviar.textContent = textoOriginal;
                btnEnviar.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert('Hubo un error. Por favor intenta de nuevo.');
                btnEnviar.textContent = textoOriginal;
                btnEnviar.disabled = false;
            });
    });
}