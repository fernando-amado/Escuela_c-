var url = "https://localhost:44316/api/estudiantes";
Get();
function Get() {
    fetch(url).then(res => res.json()).then(function (estudiantes) {
        pintar(estudiantes);
    })
}

function pintar(estudiantes) {
    document.querySelector(".tbody").innerHTML = "";
    for (i = 0; i < estudiantes.length; i++) {
        let tr = document.createElement("tr");
        let tdButton = document.createElement("td");
        let buttonEditar = document.createElement("button");
        let buttonEliminar = document.createElement("button");
        buttonEditar.innerHTML = "Editar";
        buttonEliminar.innerHTML = "Eliminar";
        buttonEditar.id = estudiantes[i].id;
        buttonEditar.nombre = estudiantes[i].nombres;
        buttonEditar.apellido = estudiantes[i].apellidos;
        buttonEditar.documento =estudiantes[i].documento;
        buttonEditar.tipoDocumento = estudiantes[i].tipoDocumento
        buttonEliminar.addEventListener('click', Delete);
        buttonEditar.addEventListener('click', function(mybutton){
            OpenUpdate(mybutton.target.id,mybutton.target.nombre,mybutton.target.apellido,mybutton.target.documento,mybutton.target.tipoDocumento);
        });
        let campos = `<td>${estudiantes[i].nombres}</td>
                      <td>${estudiantes[i].apellidos}</td>
                      <td>${estudiantes[i].documento}</td>
                      <td>${estudiantes[i].tipoDocumento}</td>`
        tr.innerHTML = campos;
        buttonEditar.classList.add("buttonEditar");
        buttonEliminar.classList.add("buttonEliminar");
        tdButton.appendChild(buttonEditar);
        tdButton.appendChild(buttonEliminar);
        tr.setAttribute("data-id", estudiantes[i].id);
        tr.appendChild(tdButton);
        document.querySelector(".tbody").appendChild(tr);
    }
}

function Post() {
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            nombres: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellido").value,
            documento: document.getElementById("documento").value,
            tipo_Documento: document.getElementById("tipoId").value,
        }),
        headers: {
            'Accept': "application/json",
            "content-Type": "application/json"
        }
    }).then(res => res.json()).then(data => {
        alert("Transacción ejecutada con éxito", "Se ha agregado correctamente al estudiante", "success");
                Get();
                LimpiarTextBox();
    }).catch(err =>
       alert("error")
    );
}


function Update(e) {
    console.log(typeof( e.srcElement.getAttribute("data-id")))
    let documento = e.srcElement.getAttribute("data-id");
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            id: documento,
            nombres: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellido").value,
            documento: document.getElementById("documento").value,
            tipo_Documento: document.getElementById("tipoId").value
        }),
        headers: {
            'Accept': "application/json",
            "content-Type": "application/json"
        }
    }).then(function (personas) {
        if (personas.ok) {
            return personas.text();
        } else {
            alert("ERROR AL GENERAR LA SOLUCITUD")
        }
    }).then(function (personas) {
        alert('Confirmación', 'Usuario Actualizado exitosamente!', function () { CloseUpdate() });
        Get();
    })
}
function Delete(e) {
    let tr = e.srcElement.parentNode.parentNode;
    let id = tr.getAttribute("data-id");
    fetch(`${url}/${id}`, {
        method: "DELETE",
    }).then(res => res.json()).then(data => {
        document.querySelector(".tbody").removeChild(tr);
        console.log(data);
        swal("Transacción ejecutada con éxito", `Se ha eliminado correctamente al estudiante ${data.nombres} identificado con ${data.tipoDocumento} ${data.documento}`, "success");
    }).catch(err => swal({
        title: "Error al ejecutar la transacción",
        text: "Ha ocurrido un error en la transacción por favor comunicate con Sincosoft por medio de un help desk",
        icon: "error",
        button: "Ok!",
    }));
}


function OpenUpdate(id,nombre,apellido,documento,tipoDocumento) {

    let modal = document.querySelector(".modalUpdate");
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("documentoEditar").value = documento;
    document.getElementById("tipoIdEditar").value = tipoDocumento;
    document.getElementById("ButtonAddEditar").setAttribute("data-id",id)
    document.getElementById("ButtonAddEditar").addEventListener("click",Update);
    modal.style.display = "block";
}
function CloseUpdate() {
    let modal = document.querySelector(".modalUpdate");
    modal.style.display = "none"
}
function LimpiarTextBox() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("tipoId").value = "";
}
