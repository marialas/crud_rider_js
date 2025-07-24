
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let editandoProducto = null;

document.getElementById("formProducto").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value).toFixed(2);

  if (editandoProducto !== null) {
    productos[editandoProducto] = { nombre, precio };
    editandoProducto = null;
  } else {
    productos.push({ nombre, precio });
  }

  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
  this.reset();
});

function mostrarProductos() {
  const tbody = document.getElementById("tablaProductos");
  tbody.innerHTML = "";

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>
        <button onclick="editarProducto(${index})">Editar</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function editarProducto(index) {
  const producto = productos[index];
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  editandoProducto = index;
}

function eliminarProducto(index) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();
  }
}

mostrarProductos();
