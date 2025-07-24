

let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
let editandoPelicula = null;

document.getElementById("formPelicula").addEventListener("submit", function (e) {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;

  if (editandoPelicula !== null) {
    peliculas[editandoPelicula] = { titulo, genero };
    editandoPelicula = null;
  } else {
    peliculas.push({ titulo, genero });
  }

  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  mostrarPeliculas();
  this.reset();
});

function mostrarPeliculas() {
  const tbody = document.getElementById("tablaPeliculas");
  tbody.innerHTML = "";

  peliculas.forEach((pelicula, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${pelicula.titulo}</td>
      <td>${pelicula.genero}</td>
      <td>
        <button onclick="editarPelicula(${index})">Editar</button>
        <button onclick="eliminarPelicula(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function editarPelicula(index) {
  const pelicula = peliculas[index];
  document.getElementById("titulo").value = pelicula.titulo;
  document.getElementById("genero").value = pelicula.genero;
  editandoPelicula = index;
}

function eliminarPelicula(index) {
  if (confirm("¿Seguro que deseas eliminar esta película?")) {
    peliculas.splice(index, 1);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    mostrarPeliculas();
  }
}

mostrarPeliculas();
