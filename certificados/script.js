const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmV-ladv2Gu74q_70lrv375kPXcn8v6hHTAv4iZdJ9mozkscUmNU9zaFRA3zI1ebhcm25sCP4TiUhD/pub?output=csv";

async function buscarCertificados() {
  const dni = document.getElementById("dni").value.trim();
  const resultado = document.getElementById("resultado");

  if (!dni) {
    resultado.innerHTML = "Ingrese un DNI.";
    return;
  }

  const response = await fetch(CSV_URL);
  const data = await response.text();

  const filas = data.split("\n").slice(1);
  const encontrados = filas.filter(f => f.startsWith(dni + ","));

  if (encontrados.length === 0) {
    resultado.innerHTML = "No se encontraron certificados asociados al DNI ingresado.";
    return;
  }

  resultado.innerHTML = "";

  encontrados.forEach(fila => {
    const cols = fila.split(",");

    const curso = cols[1];
    const año = cols[2];
    const apellidos = cols[3];
    const nombres = cols[4];
    const horas = cols[5];
    const modalidad = cols[6];
    const fecha = cols[7];
    const pdf = cols[9]; // LINK DIRECTO

    resultado.innerHTML += `
      <div class="cert">
        <strong>${curso}</strong><br>
        ${nombres} ${apellidos} – ${año}<br>
        ${horas} | ${modalidad}<br>
        Emitido: ${fecha}<br>
        <a href="${pdf}" target="_blank">Descargar certificado</a>
      </div>
      <hr>
    `;
  });
}
