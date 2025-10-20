// --- FASE 2: CREATE (Guardar solicitud de contacto) ---

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const telefono = document.getElementById("telefono").value;
      const consulta = document.getElementById("consulta").value;

      const solicitud = {
        id: Date.now(),
        nombre,
        email,
        telefono,
        consulta,
      };

      // Guardar en localStorage
      const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      solicitudes.push(solicitud);
      localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

      alert("✅ Tu consulta fue enviada con éxito.");
      form.reset();
    });
  }
});
