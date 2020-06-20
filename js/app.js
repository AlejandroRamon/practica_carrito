//Variables
const cursos = document.getElementById('lista-cursos'),
    carro = document.getElementById('carrito'),
    lista = document.querySelector('#lista-carrito tbody'),
    vaciar = document.getElementById('vaciar-carrito');

//Listeners
cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona 'Agregar Carrito'
    cursos.addEventListener('click', comprarCurso);

    //Eliminar del carrito
    lista.addEventListener('click', borrarCurso);

    //Vaciar Carrito
    vaciar.addEventListener('click', vaciarCarrito);

    //Leer LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



//Funciones
//Añade curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //Delegation para seleccionar el curso
    if (e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviamos los datos del curso seleccionado para leer sus datos
        leerDatosCurso(curso);
    }
}
//Lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

//Inserta curso al carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${curso.imagen}" width="100"/></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
    `
    lista.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//Borrar curso del carrito
function borrarCurso(e){
    e.preventDefault();
    let curso, cursoID;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoID);
}

//Vaciar Carrito
function vaciarCarrito(e){
    e.preventDefault();
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

//Guardar en LocalStorage
function guardarCursoLocalStorage(curso){
    let cursos;

    //Verificar si hay elementos en LocalStorage
    cursos = verificarLocalStorage();
    
    //Agregar curso al array
    cursos.push(curso);

    //Convertir array en asdasd
    localStorage.setItem('cursos', JSON.stringify(cursos))
}

function verificarLocalStorage(){
    let cursosLS;

    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

function leerLocalStorage(){
    let cursosLS;

    cursosLS = verificarLocalStorage();
    
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"/></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
        `
        lista.appendChild(row);
    })
}

//Eliminar curso LocalStorage
function eliminarCursoLocalStorage(curso){
    let cursosLS;

    cursosLS = verificarLocalStorage();

    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

//Vaciar localStorage
function vaciarLocalStorage(){
    localStorage.clear();
}