let botonMenu = document.querySelector(".hamburguesa");
let ver=document.querySelectorAll('.ver');
botonMenu.addEventListener('click',MostrarNav);

function MostrarNav(){
    if(botonMenu){
        console.log('dio click')
      ver.forEach((mostrar) => {
				mostrar.classList.toggle("hidden");
			});
    }
    else{
        alert('error')
    }
}

document.getElementById("facebook-icon").onclick=function(){
    window.open("http://facebook.com", "Página Facebook");
}

document.getElementById("instagram-icon").onclick=function(){
    window.open("http://instagram.com", "Página Facebook");
}

document.getElementById("twitter-icon").onclick=function(){
    window.open("http://twitter.com", "Página Facebook");
}

document.getElementById("gmail-icon").onclick=function(){
    window.open("http://gmail.com", "Página Facebook");
}
