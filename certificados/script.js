const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmV-ladv2Gu74q_70lrv375kPXcn8v6hHTAv4iZdJ9mozkscUmNU9zaFRA3zI1ebhcm25sCP4TiUhD/pub?output=csv";

let registros = [];

Papa.parse(CSV_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    registros = results.data.map(r => ({
      ...r,
      dni: r.dni?.trim()
    }));
    console.log("Certificados cargados:", registros);
  }
});

function buscarCertificados() {
  const dni = document.getElementById("dniInput").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (!dni) {
    resultado.innerHTML = "<p class='error'>Ingrese un DNI válido</p>";
    return;
  }

  const encontrados = registros.filter(r => r.dni === dni);

  if (encontrados.length === 0) {
    resultado.innerHTML = "<p class='error'>No se encontraron certificados asociados al DNI ingresado.</p>";
    return;
  }

  let html = `<h3>Certificados encontrados</h3>`;

  encontrados.forEach(r => {
    html += `
      <div class="certificado">
        <strong>${r.curso}</strong><br>
        ${r.horas} – ${r.modalidad}<br>
        Año: ${r.año}<br>
        Emitido: ${r.fecha_emision}<br>
        <a href="${r.pdf_link}" target="_blank">📄 Descargar certificado</a>
      </div>
    `;
  });

  resultado.innerHTML = html;
}
