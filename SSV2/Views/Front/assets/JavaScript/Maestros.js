const tabla = document.querySelector(".tbody");
const boton = document.getElementById("ButtonAdd");
const btnGuardarMateria = document.getElementById("ButtonAddEditar");

let inputNombre = document.getElementById("nombre");
let inputApellido = document.getElementById("apellido");
let inputDocumento = document.getElementById("documento");
let inputTipo = document.getElementById("tipoId");
let inputId = document.getElementById("idMaestro");

let documentoEditar = document.getElementById("documentoEditar");
let nombreEditar = document.getElementById("nombreEditar");
let apellidoEditar = document.getElementById("apellidoEditar");
let tipoIdEditar = document.getElementById("tipoIdEditar");
let estadoEditar = document.getElementById("estadoEditar");

boton.addEventListener("click", () => {
  inputNombre = document.getElementById("nombre").value;
  inputApellido = document.getElementById("apellido").value;
  inputTipo = parseInt(document.getElementById("tipoId").value);
  inputDocumento = document.getElementById("documento").value;
      Agregar(inputNombre,inputApellido,inputTipo,inputDocumento);
});

function listarProfesor() {
  fetch("https://localhost:44351/api/Personas")
    .then((response) => response.json())
    .then((personas) =>
      personas.forEach((person) => {
        if (person.Tp_Id == 2) {
          llenarTablaProfesor(person);
        }
      })
    );
}

function llenarTablaProfesor(p) {
  let profe = document.createElement("tr");

  profe.innerHTML += `<td> ${p.NDoc} </td>
  <td>  ${p.Nombres} </td>
  <td>  ${p.Apellidos} </td>
  <td>  ${p.TDoc_Id ==1? "CC":"TI" }  </td>
  <td>  ${p.Activo ? "Activo" : "Inactivo"}  </td>`;
  profe.innerHTML += `<td class="tdBoton ">
  <button class="buttonEditar far fa-edit"onclick="AbrirEditar
	(${p.Id},
	${p.NDoc},
	'${p.Nombres}',
    '${p.Apellidos}',
    ${p.TDoc_Id},
	${p.Activo}
	)">Editar</button>
  <button class="fas fa-trash-alt buttonEliminar" onclick="Eliminar(${p.Id})">Eliminar</button></td>`;
  profe.setAttribute("data-id", p.Id);
  tabla.appendChild(profe);
  inputNombre.value = "";
}

function Agregar(nombre,apellido,tdoc,ndoc,) {
  fetch("https://localhost:44351/api/Personas", {
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
          Nombres: nombre,
          Apellidos: apellido,
          TDoc_Id: tdoc,
          NDoc: ndoc,
          Activo: true,
          Tp_Id: 2
      })
  })
      .then((response) => response.json())
      .then((p) => {
          llenarTablaProfesor(p)
          alert("Se ha agregado exitosamente")
      });
}

function AbrirEditar(id, nDoc, nombres, apellidos, tDoc, estado) {
  OpenUpdate();
  documentoEditar.value = nDoc;
  nombreEditar.value = nombres;
  apellidoEditar.value = apellidos;
  tipoIdEditar.value = tDoc;
  estadoEditar.value = estado;
  btnGuardarMateria.addEventListener("click", () => {
    Editar(
      id,
      documentoEditar.value,
      nombreEditar.value,
      apellidoEditar.value,
      tipoIdEditar.value,
      estadoEditar.value
    );
  });
}

function Editar(id, nDoc, nombres, apellidos, tDoc, estado) {
  console.log(id, nDoc, nombres, apellidos, tDoc, estado)
  fetch("https://localhost:44351/api/Personas/" + id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      Id: id,
      Nombres: nombres,
      Apellidos: apellidos,
      Tdoc_Id: parseInt(tDoc),
      NDoc: nDoc,
      Activo: estado == "1" ? true : false,
      Tp_Id: 2,
    }),
  })
    .then((p) => {
      let tr = document.querySelector(`tr[data-id="${id}"]`);
      tr.innerHTML = `<td> ${nDoc} </td>
    <td>  ${nombres} </td>
    <td>  ${apellidos} </td>
    <td>  ${tDoc} </td>
    <td>  ${estado ? "Activo" : "Inactivo"}  </td>`;
      tr.innerHTML += `<td class="tdBoton ">
    <button class="buttonEditar far fa-edit"onclick="AbrirEditar
    (${id},
    ${nDoc},
    '${nombres}',
      '${apellidos}',
      ${tDoc},
    ${estado}
    )">Editar</button>
    <button class="fas fa-trash-alt buttonEliminar" onclick="Eliminar(${id})">Eliminar</button></td>`;
    location.reload();  
  })
    .catch((error) => {
      console.error(error);
    });
  CloseUpdate();
}

function Eliminar(id) {
  fetch("https://localhost:44351/api/Personas/" + id, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      Id: parseInt(id),
    }),
  }).then(() => {
    let tr = document.querySelector(`tr[data-id="${id}"]`);
    tabla.removeChild(tr);
    inputId.value = "";
    inputNombre.value = "";
  });
}

listarProfesor();
