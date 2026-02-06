const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmV-ladv2Gu74q_70lrv375kPXcn8v6hHTAv4iZdJ9mozkscUmNU9zaFRA3zI1ebhcm25sCP4TiUhD/pub?output=csv";

async function buscar() {
  const dni = document.getElementById("dniInput").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (!dni) {
    resultado.innerHTML = "<p>Ingrese un DNI válido.</p>";
    return;
  }

  const response = await fetch(CSV_URL);
  const text = await response.text();

  const filas = text.split(/\r?\n/).slice(1);

  const encontrados = filas
    .map(fila => fila.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g))
    .filter(cols => cols && cols[0]?.replace(/"/g, "").trim() === dni);

  if (encontrados.length === 0) {
    resultado.innerHTML = "<p>No se encontraron certificados asociados al DNI ingresado.</p>";
    return;
  }

  encontrados.forEach(cols => {
    resultado.innerHTML += `
      <div class="card">
        <h3>${cols[2]}</h3>
        <p><strong>Participante:</strong> ${cols[6]} ${cols[5]}</p>
        <p><strong>Código:</strong> ${cols[1]}</p>
        <p><strong>Horas:</strong> ${cols[7]}</p>
        <p><strong>Modalidad:</strong> ${cols[8]}</p>
        <p><strong>Fecha emisión:</strong> ${cols[9]}</p>
        <a href="${cols[11]}" target="_blank">⬇ Descargar certificado</a>
      </div>
    `;
  });
}
