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

document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-registro');
    if (event.target === modal) {
        cerrarModalRegistro();
    }
});

function verificarOtros() {
    const select = document.getElementById('reg-enterado');
    const inputOtro = document.getElementById('reg-enterado-otro');
    if(select.value === 'Otros') {
        inputOtro.style.display = 'block';
        inputOtro.required = true;
    } else {
        inputOtro.style.display = 'none';
        inputOtro.required = false;
        inputOtro.value = '';
    }
}

function inicializarFormularioCursos() {
    const formCursos = document.getElementById('formulario-registro-curso');
    if (!formCursos) return;

    formCursos.onsubmit = function(e) {
        e.preventDefault(); 
        
        const btnEnviar = document.getElementById('btn-enviar-registro');
        // REEMPLAZA ESTA URL CON LA NUEVA VERSIÓN DE TU SCRIPT SI CAMBIA
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxiw0_5Qhv5MpkqWU41OWdxfrOUysoi2JtRv7mCjKcbVoOiO9Fr78PqgD4sngRkz9Q_/exec';
        
        btnEnviar.textContent = 'Enviando registro y voucher...';
        btnEnviar.disabled = true;

        const fileInput = document.getElementById('archivo-voucher');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Data = event.target.result.split(',')[1];
                const mimeType = file.type;
                const fileName = file.name;

                const formData = new FormData(formCursos);
                formData.append('fileData', base64Data);
                formData.append('mimeType', mimeType);
                formData.append('fileName', fileName);

                fetch(scriptURL, { method: 'POST', body: formData })
                    .then(response => response.text())
                    .then(result => {
                        // AQUÍ ESTÁ LA MAGIA: Leemos la respuesta real de Google
                        if (result === "Éxito") {
                            alert('¡Registro y pago recibidos! Nos pondremos en contacto contigo pronto.');
                            formCursos.reset(); 
                            document.getElementById('reg-enterado-otro').style.display = 'none';
                            cerrarModalRegistro();
                        } else {
                            // Si Google devuelve un error, lo forzamos a salir en pantalla
                            alert('ATENCIÓN - El servidor de Google dice:\n\n' + result);
                        }
                        btnEnviar.textContent = 'Confirmar Registro';
                        btnEnviar.disabled = false;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Hubo un error de conexión al enviar. Revisa la consola.');
                        btnEnviar.textContent = 'Confirmar Registro';
                        btnEnviar.disabled = false;
                    });
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, adjunta tu voucher de pago.");
            btnEnviar.textContent = 'Confirmar Registro';
            btnEnviar.disabled = false;
        }
    };
}