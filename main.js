
let reseñas = []
let editMode = false
let editionId = null
const addButton = document.getElementById('add')
addButton.addEventListener('click', function(event){
if (editMode === false){
  create(event)
} else {
  update(event)
}

})

function create (event) {
    event.preventDefault()
    const reseña = readForm()
    const values = Object.values(reseña)
    const resultado = values.every((value) => value !=='')
    if(resultado === false){
      Swal.fire('Hay Campos Vacios','','Error')
    } else {
    reseñas.push(reseña)
    createRow (reseña)
    clearForm()
    saveDataLS()

    }

}

function readForm() {
    const clasificacionInput = document.getElementById('clasificacion')
    const tituloInput = document.getElementById('titulo')  
    const rankingInput = document.getElementById('ranking')  
    const dateInput = document.getElementById('date')  
    const reviewInput = document.getElementById('review') 

    const reseña = {
        clasificacion: clasificacionInput.value,
        titulo: tituloInput.value,
        ranking: rankingInput.value,
        date: dateInput.value,
        review: reviewInput.value,
        id: Date.now()
    }

    return reseña
}


function createRow(reseña) {

    const tbody = document.getElementById('tbody')

    tbody.innerHTML += ` 
    <tr id="${reseña.id}">
     <td>${reseña.clasificacion}</td>
     <td>${reseña.titulo}</td>
     <td>${reseña.ranking}</td>
     <td>${reseña.date}</td>
     <td>${reseña.review}</td>
     <td>
        <button class="edit" onclick="editTask(${reseña.id})">Editar</button>
        <button class="delete" onclick="deleteTask(${reseña.id})">Eliminar</button>
     </td>

    </tr> 
    
    
    `
}
  

function clearForm() {
    const form = document.getElementById('form')
    form.reset()
  }
  
  function saveDataLS() {
    localStorage.setItem('reseñas', JSON.stringify(reseñas))
  }
  
  function deleteTask(id){

    Swal.fire({
      title: '¿Estás seguro?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!',
      cancelButtonText:'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {
        const row = document.getElementById(id)
        row.remove()

        reseñas = reseñas.filter((reseña) => reseña.id !== id)

        saveDataLS()

        Swal.fire(
          'Borrado!',
          '',
          ''
        )
      }
    })

  }

  function readFromLS() {
    reseñas = JSON.parse(localStorage.getItem('reseñas')) || []
    reseñas.forEach((el) => createRow (el))
  }

  function editTask (id) {
    editMode = true
    addButton.innerText = 'actualizar'
    editionId = id
    document.getElementById(id).style.backgroundColor = 'grey'

  
    const reseña = reseñas.find((reseña) => reseña.id === id)

    const clasificacionInput = document.getElementById('clasificacion')
    const tituloInput = document.getElementById('titulo')  
    const rankingInput = document.getElementById('ranking')  
    const dateInput = document.getElementById('date')  
    const reviewInput = document.getElementById('review') 

    clasificacionInput.value = reseña.clasificacion
    tituloInput.value = reseña.titulo
    rankingInput.value = reseña.ranking
    dateInput.value = reseña.date
    reviewInput.value = reseña.review
  
  }
  function update (event) {
    event.preventDefault()
    const valores = readForm()
    valores.id = editionId

    const index = reseñas.findIndex((reseña) => reseña.id === editionId)

    reseñas.splice(index, 1, valores)

    saveDataLS()

    const row = document.getElementById(editionId)
    row.innerHTML= `
     <td>${valores.clasificacion}</td>
     <td>${valores.titulo}</td>
     <td>${valores.ranking}</td>
     <td>${valores.date}</td>
     <td>${valores.review}</td>
     <td>
        <button class="edit" onclick="editTask(${valores.id})">Editar</button>
        <button class="delete" onclick="deleteTask(${valores.id})">Eliminar</button>
     </td>
     `

     row.style.backgroundColor = 'initial'


    clearForm()
    editMode = false
    editionId = null
    addButton.innerText = 'Agregar'
  }

function top5 (){
readFromLS()
function ordenar() {
  return reseñas.sort(function(a, b) {
    return b.ranking - a.ranking;
  });
}
let top5Element = document.getElementById("top-5");

function generarTop5() {
  let top5 = ordenar().slice(0, 5);
  let html = "<ol>";
  
  top5.forEach(function(reseña) {
    html += "<li>" + reseña.titulo + " (" + reseña.clasificacion + ")</li>";
  });
  html += "</ol>";
  return html;
}
top5Element.innerHTML = generarTop5();

}
top5()

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
})

readFromLS()