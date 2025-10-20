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

// --- FASE 3: CRUD ADMIN ---

document.addEventListener("DOMContentLoaded", function () {
  const tabla = document.getElementById("tablaSolicitudes");
  const editForm = document.getElementById("editForm");

  if (tabla) {
    const tbody = tabla.querySelector("tbody");

    function cargarSolicitudes() {
      tbody.innerHTML = "";
      const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      solicitudes.forEach((sol) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${sol.nombre}</td>
          <td>${sol.email}</td>
          <td>${sol.telefono}</td>
          <td>${sol.consulta}</td>
          <td>
            <button class="btn btn-warning btn-sm editar" data-id="${sol.id}">Editar</button>
            <button class="btn btn-danger btn-sm borrar" data-id="${sol.id}">Borrar</button>
          </td>
        `;
        tbody.appendChild(fila);
      });
    }

    cargarSolicitudes();

    tbody.addEventListener("click", function (e) {
      if (e.target.classList.contains("borrar")) {
        const id = Number(e.target.dataset.id);
        if (confirm("¿Seguro que querés borrar esta solicitud?")) {
          let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
          solicitudes = solicitudes.filter((s) => s.id !== id);
          localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
          cargarSolicitudes();
        }
      }

      if (e.target.classList.contains("editar")) {
        const id = Number(e.target.dataset.id);
        const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
        const solicitud = solicitudes.find((s) => s.id === id);
        if (solicitud) {
          document.getElementById("editId").value = solicitud.id;
          document.getElementById("editNombre").value = solicitud.nombre;
          document.getElementById("editEmail").value = solicitud.email;
          document.getElementById("editTelefono").value = solicitud.telefono;
          document.getElementById("editConsulta").value = solicitud.consulta;
        }
      }
    });

    editForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const id = Number(document.getElementById("editId").value);
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      const index = solicitudes.findIndex((s) => s.id === id);

      if (index !== -1) {
        solicitudes[index] = {
          id,
          nombre: document.getElementById("editNombre").value,
          email: document.getElementById("editEmail").value,
          telefono: document.getElementById("editTelefono").value,
          consulta: document.getElementById("editConsulta").value,
        };
        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
        alert("✅ Cambios guardados correctamente.");
        cargarSolicitudes();
        editForm.reset();
      }
    });
  }
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ---------- CRUD LOCALSTORAGE ----------

// Leer solicitudes desde localStorage
function obtenerSolicitudes() {
  return JSON.parse(localStorage.getItem("solicitudes")) || [];
}

// Guardar solicitudes en localStorage
function guardarSolicitudes(solicitudes) {
  localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
}

// Mostrar solicitudes en tabla admin
function mostrarSolicitudes() {
  const tablaBody = document.querySelector("#tablaSolicitudes tbody");
  if (!tablaBody) return;

  tablaBody.innerHTML = "";
  const solicitudes = obtenerSolicitudes();

  solicitudes.forEach((solicitud, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${solicitud.nombre}</td>
      <td>${solicitud.email}</td>
      <td>${solicitud.mensaje}</td>
      <td>
        <button onclick="editarSolicitud(${index})">Editar</button>
        <button onclick="borrarSolicitud(${index})">Borrar</button>
      </td>
    `;
    tablaBody.appendChild(fila);
  });
}

// Borrar
function borrarSolicitud(index) {
  const solicitudes = obtenerSolicitudes();
  if (confirm("¿Seguro que querés borrar esta solicitud?")) {
    solicitudes.splice(index, 1);
    guardarSolicitudes(solicitudes);
    mostrarSolicitudes();
  }
}

// Editar
function editarSolicitud(index) {
  const solicitudes = obtenerSolicitudes();
  const solicitud = solicitudes[index];

  document.getElementById("editIndex").value = index;
  document.getElementById("editNombre").value = solicitud.nombre;
  document.getElementById("editEmail").value = solicitud.email;
  document.getElementById("editMensaje").value = solicitud.mensaje;
}

// Guardar edición
const editarForm = document.getElementById("editarForm");
if (editarForm) {
  editarForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const index = document.getElementById("editIndex").value;
    const solicitudes = obtenerSolicitudes();

    solicitudes[index] = {
      nombre: document.getElementById("editNombre").value,
      email: document.getElementById("editEmail").value,
      mensaje: document.getElementById("editMensaje").value
    };

    guardarSolicitudes(solicitudes);
    mostrarSolicitudes();
    editarForm.reset();
  });
}

if (window.location.pathname.includes("admin.html")) {
  mostrarSolicitudes();
}
