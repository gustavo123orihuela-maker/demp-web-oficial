// Archivo: js/modulos/form-servicios.js

function inicializarFormularioServicios() {
    const form = document.getElementById('formulario-contacto');
    const btnEnviar = document.getElementById('btn-enviar');
    
    if (!form || !btnEnviar) return;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwNOStveoDpEzP_laMo66Qm7G7AATuRBX-L3d63roxIaH2bFpdVOftmNMtOGCK097b-uA/exec';

    form.addEventListener('submit', e => {
        e.preventDefault(); 
        
        const textoOriginal = btnEnviar.textContent;
        btnEnviar.textContent = 'Enviando información...';
        btnEnviar.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                alert('¡Tu solicitud ha sido enviada con éxito! Revisa tu bandeja de entrada.');
                form.reset(); 
                btnEnviar.textContent = textoOriginal;
                btnEnviar.disabled = false;
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert('Hubo un inconveniente al enviar los datos. Inténtalo de nuevo.');
                btnEnviar.textContent = textoOriginal;
                btnEnviar.disabled = false;
            });
    });
}