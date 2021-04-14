var url="https://localhost:44316/api/MateriaEstudiante";
Get();
function Get(){
fetch(url).then(function(response){
    return response.json();
}).then(function(MateriaEstudiante){ 
    document.querySelector(".tbody").innerHTML="";
    console.log(MateriaEstudiante)
    for(i=0; i<MateriaEstudiante.length; i++){
        let tr = document.createElement("tr");
        let tdButton = document.createElement("td");
        let buttonEditar = document.createElement("button");
        let buttonEliminar = document.createElement("button");
        buttonEditar.innerHTML="Editar";
        buttonEliminar.innerHTML="Eliminar";
        buttonEditar.nombre = MateriaEstudiante[i].nombreEstudiante;
        buttonEditar.nombreMateria = MateriaEstudiante[i].nombreMateria;
        buttonEditar.nota1 = MateriaEstudiante[i].nota1;
        buttonEditar.nota2 = MateriaEstudiante[i].nota2;
        buttonEditar.addEventListener('click', function(mybutton){
            OpenUpdate(mybutton.target.nombre,mybutton.target.nombreMateria,mybutton.target.nota1,mybutton.target.nota2);
        });
        let campos = `<td>${MateriaEstudiante[i].nombreEstudiante}</td>
                      <td>${MateriaEstudiante[i].nombreMateria}</td>
                      <td contenteditable>${MateriaEstudiante[i].nota1}</td>
                      <td contenteditable>${MateriaEstudiante[i].nota2}</td>`         
        tr.innerHTML = campos;
        buttonEditar.classList.add("buttonEditar");
        buttonEliminar.classList.add("buttonEliminar");
        tdButton.appendChild(buttonEditar);
        tdButton.appendChild(buttonEliminar);
        buttonEditar.addEventListener("click",OpenUpdate)
        tr.appendChild(tdButton);
        document.querySelector(".tbody").appendChild(tr);
    }
})}

function Post(){
    fetch(url, {
        method:"POST",
        body : JSON.stringify({
            "nombres": document.getElementById("nombre"),
            "apellidos": document.getElementById(apellido),
            "documento": "123123312",
            "tipo_Documento": "TI",
        }),
        headers:{
            'Accept':"application/json",
            "content-Type":"application/json"
        }
    }).then(function(response){
        if(response.ok){
            response.text().then(function(personas){
                alert('Confirmación', 'Usuario Agregado exitosamente!');
                Get();
                LimpiarTextBox();
            });
        }else{
            alertify.alert('ERROR AL GENERAR SOLICITUD');
        }
    })
}

function Update(){
    fetch(url, {
        method:"PUT",
        body : JSON.stringify({
            identificacion:parseInt(document.getElementById("identificacionUpdate").value),
            nombre:document.getElementById("nombreUpdate").value,
            apellido:document.getElementById("apellidoUpdate").value,
            fechaNacimiento:document.getElementById("fechaNacimientoUpdate").value,
        }),
        headers:{
            'Accept':"application/json",
            "content-Type":"application/json"
        }
    }).then(function(personas){
        if(personas.ok){
            return personas.text();
        }else{
            alert ("ERROR AL GENERAR LA SOLUCITUD")
        }
    }).then(function(personas){
        alert('Confirmación', 'Usuario Actualizado exitosamente!', function(){ CloseUpdate()});
        Get();
    })
}
function Delete(id){
    fetch(url, {
        method:"DELETE",
        body : JSON.stringify({
            identificacion:parseInt(id),
        }),
        headers:{
            'Accept':"application/json",
            "content-Type":"application/json"
        }
    }).then(function(MateriaEstudiante){
        if(MateriaEstudiante.ok){
            return personas.text();
        }else{
            alert ("ERROR AL GENERAR LA SOLUCITUD")
        }
    }).then(function(MateriaEstudiante){
        Get();
        alertify.success('Eliminado correctamente')
    })
}


function OpenUpdate(id,nombre,nombreMateria, nota1,nota2){
    let modal = document.querySelector(".modalUpdate");
    document.getElementById("nombreUpdate"). value=nombre;
    document.getElementById("estadoEditar"). value = nombreMateria;
    document.getElementById("seleccionPeriodo"). value =nota1;
    document.getElementById("nota"). value =nota2;
    modal.style.display = "block";
}
function CloseUpdate(){
    let modal = document.querySelector(".modalUpdate");
    modal.style.display = "none";
}
function LimpiarTextBox(){
    document.getElementById("identificacion").value="";
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("fechaNacimiento").value="";
    document.getElementById("edad").value="";
}
