const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmV-ladv2Gu74q_70lrv375kPXcn8v6hHTAv4iZdJ9mozkscUmNU9zaFRA3zI1ebhcm25sCP4TiUhD/pub?output=csv";

let registros = [];

// Cargar datos del Google Sheets
fetch(CSV_URL)
  .then(response => response.text())
  .then(texto => {
    const filas = texto.split("\n").slice(1);
    registros = filas.map(fila => {
      const c = fila.split(",");
      return {
        codigo: c[0],
        dni: c[1],
        curso: c[2],
        anio: c[3],
        apellidos: c[5],
        nombres: c[6],
        horas: c[7],
        modalidad: c[8],
        fecha: c[9],
        pdf: c[10],
        estado: c[11]
      };
    });
  });

function buscarCertificados() {
  const dni = document.getElementById("dniInput").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (dni === "") {
    resultado.innerHTML = "<p class='error'>Ingrese un DNI válido</p>";
    return;
  }

  const encontrados = registros.filter(r => r.dni === dni && r.estado === "1");

  if (encontrados.length === 0) {
    resultado.innerHTML = "<p class='error'>No se encontraron certificados para este DNI</p>";
    return;
  }

  let html = `<h3>Certificados encontrados:</h3>`;

  encontrados.forEach(r => {
    html += `
      <div class="certificado">
        <strong>${r.curso}</strong><br>
        ${r.horas} - ${r.modalidad}<br>
        Año: ${r.anio}<br>
        <a href="${r.pdf}" target="_blank">📄 Descargar certificado</a>
      </div>
    `;
  });

  resultado.innerHTML = html;
}
