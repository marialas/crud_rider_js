

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let editando = null;

document.getElementById("formUsuario").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  if (editando !== null) {
    usuarios[editando] = { nombre, correo };
    editando = null;
  } else {
    usuarios.push({ nombre, correo });
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
  this.reset();
});

function mostrarUsuarios() {
  const tbody = document.getElementById("tablaUsuarios");
  tbody.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.correo}</td>
      <td>
        <button onclick="editarUsuario(${index})">Editar</button>
        <button onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function editarUsuario(index) {
  const usuario = usuarios[index];
  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("correo").value = usuario.correo;
  editando = index;
}

function eliminarUsuario(index) {
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuarios();
  }
}

mostrarUsuarios();
