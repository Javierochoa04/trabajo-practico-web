document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  const tablaBody = document.querySelector("#tabla-consultas tbody");
  let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
  let editIndex = null;

  function renderSolicitudes() {
    if (!tablaBody) return;
    tablaBody.innerHTML = "";
    solicitudes.forEach((s, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${s.nombre}</td>
        <td>${s.email}</td>
        <td>${s.telefono}</td>
        <td>${s.consulta}</td>
        <td>
          <button class="btn-editar" data-index="${index}">Editar</button>
          <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        </td>
      `;
      tablaBody.appendChild(fila);
    });
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nuevaSolicitud = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        consulta: document.getElementById("mensaje").value,
      };

      if (editIndex !== null) {
        solicitudes[editIndex] = nuevaSolicitud;
        editIndex = null;
        alert("✅ Consulta editada correctamente");
      } else {
        solicitudes.push(nuevaSolicitud);
        alert("✅ Consulta enviada correctamente");
      }

      localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
      form.reset();
      renderSolicitudes();
    });
  }

  if (tablaBody) {
    tablaBody.addEventListener("click", (e) => {
      const index = e.target.dataset.index;

      if (e.target.classList.contains("btn-editar")) {
        const s = solicitudes[index];
        document.getElementById("nombre").value = s.nombre;
        document.getElementById("email").value = s.email;
        document.getElementById("telefono").value = s.telefono;
        document.getElementById("mensaje").value = s.consulta;
        editIndex = index;

        document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
      }

      if (e.target.classList.contains("btn-eliminar")) {
        if (confirm("¿Seguro que querés eliminar esta consulta?")) {
          solicitudes.splice(index, 1);
          localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
          renderSolicitudes();
        }
      }
    });
  }

  renderSolicitudes();

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});
