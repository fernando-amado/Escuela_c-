//Se obtiene el id de la persona que llega desde la URL
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let id = urlParams.get('id');

const tabla = document.querySelector(".tbody");


function listarAlumno() {
	fetch("https://localhost:44351/api/Personas")
		.then((response) => response.json())
		.then((personas) =>
			personas.forEach((persona) => {
                if (persona.Tp_Id==1) {
                    console.log(persona)
                    llenarAlumno(persona);
                }
				
			})
		);
}


function llenarAlumno(p) {
	let alumno = document.createElement("tr");
	alumno.innerHTML += `<td>  ${p.Nombres} ${p.Apellidos}</td>
     <td> ${p.NDoc} </td>`;
	 alumno.innerHTML += `<td class="tdBoton ">
	 <button class="fas fa-trash-alt buttonVerReporte" onclick="AbrirReporte(${p.Id})">Ver reporte</button></td>`;
	 alumno.setAttribute("data-id", p.Id);
	 tabla.appendChild(alumno);
}
        
listarAlumno();





function Imprimir(){
    window.print();
}