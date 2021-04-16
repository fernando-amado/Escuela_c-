//Se obtiene el id de la persona que llega desde la URL
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = parseInt(urlParams.get('id'));
console.log(id, typeof(id))
let idnota =[]
let nombreAlumno = document.getElementById("NombreEstudiante")
let documento = document.getElementById("identificacion")
let tipoDoc = document.getElementById("tipoDocumento")
const tabla = document.querySelector(".tbody");

async function listarNotas(a) {
	await fetch("https://localhost:44351/api/Personas/"+a)
		.then((data) => data.json())
		.then((notas) => {
			llenarTabla(notas);
            console.log(notas)
		})
		.catch((error) => error);
}
function llenarTabla(notas) {
    html = " ";
	if(notas.length!=0){
		notas.forEach((n) => {
			
				nombreAlumno.innerHTML = n.Nombre+" "+n.Apellidos;
				documento.innerHTML = n.NumeroDocumento;
				tipoDoc.innerHTML = n.Tipodedocumento;
				html += `<tr id="tr" data-id="${n.Id}">
						<td id="info">${n.Profesor[0].Nombres}</td>
						<td id="info">${n.Materia}</td>
						<td id="infoNotas">${(n.Notas[0]==null||n.Notas==undefined)?"Aún no tiene nota asignada":n.Notas[0].Notas}</td>
							<td id="infoNotas"> ${(n.Notas[1]==null||n.Notas[1]==undefined)?"Aún no tiene nota asignada":n.Notas[1].Notas}</td>
						</tr>`;
				tabla.innerHTML = html;
			
		})}else{
			alert("Alumno sin notas");
			window.close();
			
		}
}



listarNotas(id)
function Imprimir(){
    window.print();
}