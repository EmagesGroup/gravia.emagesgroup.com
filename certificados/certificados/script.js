const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmV-ladv2Gu74q_70lrv375kPXcn8v6hHTAv4iZdJ9mozkscUmNU9zaFRA3zI1ebhcm25sCP4TiUhD/pub?output=csv";

let data = [];

fetch(CSV_URL)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    data = rows.map(row => row.split(","));
  });

function buscarCertificados() {
  const dni = document.getElementById("dniInput").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (!dni) {
    resultado.innerHTML = "<p>Ingrese un DNI válido.</p>";
    return;
  }

  const encontrados = data.filter(row => row[1] === dni);

  if (encontrados.length === 0) {
    resultado.innerHTML = "<p>No se encontraron certificados para este DNI.</p>";
    return;
  }

  encontrados.forEach(row => {
    const cursoHTML = `
      <div class="curso">
        <strong>Curso:</strong> ${row[2]}<br>
        <strong>Horas:</strong> ${row[7]}<br>
        <strong>Modalidad:</strong> ${row[8]}<br>
        <strong>Fecha de emisión:</strong> ${row[9]}<br>
        <a href="${row[10]}" target="_blank">⬇ Descargar certificado</a>
      </div>
    `;
    resultado.innerHTML += cursoHTML;
  });
}
