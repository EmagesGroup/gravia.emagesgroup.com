<script>
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmV-ladv2Gu74q_70lrv375kPXcn8v6hHTAv4iZdJ9mozkscUmNU9zaFRA3zI1ebhcm25sCP4TiUhD/pub?output=csv";

async function buscarCertificados() {
  const dni = document.getElementById("dni").value.trim();
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";

  if (!dni) {
    resultados.innerHTML = "<p>Ingrese un DNI válido.</p>";
    return;
  }

  try {
    const response = await fetch(CSV_URL);
    const csv = await response.text();

    const lineas = csv.split(/\r?\n/);
    let encontrados = 0;

    for (let i = 1; i < lineas.length; i++) {
      if (!lineas[i]) continue;

      const cols = lineas[i].split(",");

      if (cols[0].trim() === dni) {
        encontrados++;

        resultados.innerHTML += `
          <div class="cert">
            <div class="cert-title">${cols[2]}</div>
            <div class="cert-code">Código: ${cols[1]}</div>
            <div><b>Participante:</b> ${cols[5]} ${cols[4]}</div>
            <div><b>Horas:</b> ${cols[6]}</div>
            <div><b>Modalidad:</b> ${cols[7]}</div>
            <div><b>Fecha:</b> ${cols[8]}</div>
            <a href="${cols[10]}" target="_blank">⬇ Descargar certificado</a>
          </div>
        `;
      }
    }

    if (encontrados === 0) {
      resultados.innerHTML = "<p>No se encontraron certificados para este DNI.</p>";
    }

  } catch (e) {
    resultados.innerHTML = "<p>Error al consultar certificados.</p>";
    console.error(e);
  }
}
</script>
