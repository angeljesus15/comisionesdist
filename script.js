function toggleCantidad() {
    let select = document.getElementById('tipo-comision');
    let cantidadInput = document.getElementById('cantidad');
    cantidadInput.disabled = (select.value === "");
    calcularComision();
}

function calcularComision() {
    let cantidad = parseFloat(document.getElementById('cantidad').value.replace(/,/g, '')) || 0;
    let porcentaje = parseFloat(document.getElementById('tipo-comision').value) / 100 || 0;
    let comision = Math.round(cantidad * porcentaje);
    let ivaComision = Math.round(comision * 0.16);
    let totalComision = comision + ivaComision;
    let recibimos = cantidad - totalComision;

    document.getElementById('comision').textContent = new Intl.NumberFormat("es-MX").format(comision);
    document.getElementById('iva-comision').textContent = new Intl.NumberFormat("es-MX").format(ivaComision);
    document.getElementById('total-comision').textContent = new Intl.NumberFormat("es-MX").format(totalComision);
    document.getElementById('recibimos').textContent = new Intl.NumberFormat("es-MX").format(recibimos);
    document.getElementById('porcentaje-comision').textContent = (porcentaje * 100) + "%";
}

function copiarTexto(id, button) {
    let texto = document.getElementById(id).textContent;
    let tipoComision = document.getElementById('tipo-comision').value === "2.5" ? "Tarjeta Física" : "Link de Pago";
    let textoCopiado = `Comisión ${tipoComision} $ ${texto}`;
    
    navigator.clipboard.writeText(textoCopiado).then(() => {
        button.classList.add('copied');
        button.textContent = '✔ Copiado';
        setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = '📋';
        }, 2000);
    });
}

function formatearCantidad() {
    let input = document.getElementById('cantidad');
    let value = input.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    let formattedValue = new Intl.NumberFormat("es-MX").format(value);
    input.value = formattedValue;
    calcularComision();
}

/**
 * Copia al portapapeles el texto definido en el atributo data-copy-text del botón.
 * @param {HTMLButtonElement} button — el botón que se pulsa
 */
function copiarTextoPersonalizado(button) {
  // 1) Leemos el texto a copiar del atributo data-copy-text
  const texto = button.getAttribute('data-copy-text') || '';
  // 2) Lo copiamos al portapapeles
  navigator.clipboard.writeText(texto).then(() => {
    // 3) Feedback visual
    button.classList.add('copied');
    const prev = button.textContent;
    button.textContent = '✔ Copiado';
    setTimeout(() => {
      button.classList.remove('copied');
      button.textContent = prev;
    }, 2000);
  });
} 