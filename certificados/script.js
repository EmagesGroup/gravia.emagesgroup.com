<script>
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSmV-ladv2Gu74q_70lrv375kPXcn8v6hHTAv4iZdJ9mozkscUmNU9zaFRA3zI1ebhcm25sCP4TiUhD/pub?output=csv";

async function buscarCertificados() {
  const dni = document.getElementById("dni").value.trim();
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = "";

  if (!dni) {
    resultados.innerHTML = "Ingrese DNI";
    return;
  }

  const res = await fetch(CSV_URL);
  const text = await res.text();

  const filas = text.split(/\r?\n/).slice(1);
  let ok = false;

  filas.forEach(fila => {
    if (!fila) return;
    const c = fila.split(",");

    if (c[0] === dni) {
      ok = true;
      resultados.innerHTML += `
        <p>
          <b>${c[2]}</b><br>
          Código: ${c[1]}<br>
          <a href="${c[10]}" target="_blank">Descargar</a>
        </p>
      `;
    }
  });

  if (!ok) resultados.innerHTML = "No se encontraron certificados";
}
</script>
