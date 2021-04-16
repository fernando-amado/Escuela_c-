const tabla = document.querySelector(".tbody");

const selectestudiante = document.getElementById("estudiante")
const selectmateria= document.getElementById("materia")
const selectPeriodo= document.getElementById("Periodo")
const inputnota= document.getElementById("nota")
const btnagregar= document.getElementById("Botonagregar")

const periodoeditar= document.getElementById("seleccionPeriodo");
const btnEditar= document.getElementById("ButtonEditar")

let idnotas=[]

function listarSelect(url,input){
    fetch(url)
    .then((data)=>data.json())
    .then((notas)=>notas.forEach(nota=>{
        llenarSelect(nota,input)
    }))
}

btnagregar.addEventListener("click" , ()=>{
    Agregar(selectestudiante.value,selectmateria.value,selectPeriodo.value,inputnota.value)
})

function listarNotas(){
    fetch("https://localhost:44351/api/Personas")
    .then((data)=>data.json())
    .then((notas)=>notas.forEach(nota=>{
        if (idnotas.includes(nota.Notas[0]==undefined)||!idnotas.includes(nota.Notas[0].Idnota)) {
            idnotas.push(nota.Notas[0].Idnota)
            llenarTabla(nota)
        }
        
    }))
}

function llenarSelect(datos,input){
    input.innerHTML+=`<option value="${datos.Id}">${datos.Nombre}</option>`
}

function llenarTabla(n) {
	let trNotas = document.createElement("tr");

	trNotas.innerHTML += `<td>${n.Nombre} ${n.Apellidos} </td>
    <td>${n.Materia}</td>
    <td>${(n.Notas[0]==null||n.Notas==undefined)?"Aún no tiene nota asignada":n.Notas[0].Notas}</td>
    <td>${(n.Notas[1]==null||n.Notas[1]==undefined)?"Aún no tiene nota asignada":n.Notas[1].Notas}</td>`;
	trNotas.setAttribute("data-id", n.Id);
	trNotas.innerHTML += `<td class="tdBoton "><button class="buttonEditar far fa-edit"
    onclick="AbrirEditar(${n.Notas[0].Idnota},${(n.Notas[1]==null||n.Notas[1]==undefined)?0:n.Notas[1].Idnota},'${n.Nombre}','${n.Notas[0].Notas}','${(n.Notas[1]==null||n.Notas[1]==undefined)?"Aún no tiene nota asignada":n.Notas[1].Notas}','${n.Materia}')">Editar</button>
    <button class=" fas fa-trash-alt buttonEliminar" onclick="Eliminar(${n.Id},${n.Materia_id},${n.Notas[0].Idnota},${(n.Notas[1]==null||n.Notas[1]==undefined)?0:n.Notas[1].Idnota})">Eliminar</button></td>`;
	tabla.appendChild(trNotas);
}

function Agregar(nombre,materia,periodo,nota){
    fetch("https://localhost:44351/api/NotasMaterias",{
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
        method:"POST",
        body:JSON.stringify({
            Notas:nota,
            Periodo_id:periodo,
            Materia_id:materia,
            Estudiante_id:nombre
        })
    }).then((response) => response.json()).then(listarNotas)
}

function AbrirEditar(idnota1,idnota2,nombre,nota1,nota2,materia){
    OpenUpdate();
    document.getElementById("nombreUpdate").value=nombre
    
    document.getElementById("idnota").value=idnota
    document.getElementById("estadoEditar").value= materia

    periodoeditar.addEventListener("change",()=>{
    if (periodoeditar.value==1) {
        document.getElementById("idnota").value=idnota1
        document.getElementById("EditarNota").value=nota1
    }else if(periodoeditar.value==2){
        document.getElementById("idnota").value=idnota2
        document.getElementById("EditarNota").value=nota2
    }
})
    
}

function Editar(id,periodo,nota){
    fetch("https://localhost:44351/api/NotasMaterias/"+id,{
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
        method:"PUT",
        body:JSON.stringify({
            Id: parseInt(id),
            Notas:nota,
            Periodo_id:parseInt (periodo),
        })
    }).then((response) => response).then(listarNotas)
}

function Eliminar(idpersona,idmateria,idnota1,idnota2){
    fetch("https://localhost:44351/api/NotasMaterias/"+idnota1,{
        headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
        method:"DELETE",
        body:JSON.stringify({
            Id: parseInt(idnota1),
            Estudiante_id:parseInt(idpersona),
            Materia_id:parseInt (idmateria),
            Notas: parseInt(idnota2)
        })
    }).then((response) => response).then(listarNotas)
}

btnEditar.addEventListener("click",()=>{
    Editar(document.getElementById("idnota").value,periodoeditar.value,document.getElementById("EditarNota").value)
})








function limpiarDatos() {
	document.querySelector(".formulario").reset();
   
}

function OpenUpdate() {
	let modal = document.querySelector(".modalUpdate");

	modal.style.display = "block";
}

function CloseUpdate() {
	let modal = document.querySelector(".modalUpdate");
	modal.style.display = "none";
}






listarNotas()
listarSelect("https://localhost:44351/api/Personas",selectestudiante)
listarSelect("https://localhost:44351/api/Materias",selectmateria)
listarSelect("https://localhost:44351/api/Periodoes",selectPeriodo)
listarSelect("https://localhost:44351/api/Periodoes", periodoeditar)



/*var url="https://localhost:44316/api/MateriaEstudiante";
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
*/