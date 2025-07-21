const apiUrl = '/api/products';
const tableBody = document.querySelector('#productsTable tbody');
const reloadBtn = document.getElementById('reloadBtn');
const statusMessage = document.getElementById('statusMessage');

const cargarDatos = async () => {
  statusMessage.textContent = 'Cargando productos...';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Error al obtener los datos');
    const productos = await response.json();
    mostrarTabla(productos);
    statusMessage.textContent = '';
  } catch (error) {
    statusMessage.textContent = 'Error al cargar los datos.';
    console.error(error);
  }
};

const mostrarTabla = (productos) => {
  tableBody.innerHTML = '';
  productos.forEach(p => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>$${p.precio.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>${new Date(p.fecha_creacion).toLocaleDateString()}</td>
    `;
    tableBody.appendChild(fila);
  });
};

reloadBtn.addEventListener('click', cargarDatos);
window.addEventListener('DOMContentLoaded', cargarDatos);
