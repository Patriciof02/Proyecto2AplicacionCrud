// const clasificacionInput = document.getElementById('clasificacion')  
// const nameInput = document.getElementById('name')  
// const rankingInput = document.getElementById('ranking')  
// const dateInput = document.getElementById('date')  
// const reviewInput = document.getElementById('review') 

// clasificacionInput.addEventListener('input', handleInput)
// nameInput.addEventListener('input', handleInput)
// rankingInput.addEventListener('input', handleInput)
// dateInput.addEventListener('input', handleInput)
// reviewInput.addEventListener('input', handleInput)

// const ids = ['clasificacion','name','ranking','date','review']

// ids.forEach((id) => {
//     const element = document.getElementById(id)
//     element.addEventListener('input', handleInput)
// })



// let reseña = {}

// function handleInput(event) {

//   const { value, name } = event.target
//   reseña = {
//     ...reseña,
//     [name]: value
//   }
// console.log(reseña)
// }


const addbutton = document.getElementById('add')
addbutton.addEventListener('click', create)
let reseñas = []

function create (event) {
    event.preventDefault()
    const reseña = readform()
    createRow (reseña)
    clearForm()
    saveDataLS()
    

}

function readform() {
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

  
    reseñas.push(reseña)

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
        <button class="edit">Editar</button>
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
    const row = document.getElementById(id)
    row.remove()

    reseñas = reseñas.filter((reseña) => reseña.id !== id)

    saveDataLS()


  }

  function readFromLS() {
    reseñas = JSON.parse(localStorage.getItem('reseñas')) || []
    reseñas.forEach((el) => createRow (el))
  }
  
  readFromLS()