const socket = io('http://localhost:3000')
const submitForm = document.querySelector('.mess-form')
const messInput = document.getElementById('mess')
const messContainer = document.querySelector('.mess-container')
const usersList = document.querySelector('.users-list')

const appendMess = (mess) => {
    const newDiv = document.createElement('div')
    newDiv.innerText = mess
    messContainer.append(newDiv)
}

const name = prompt('Please input your name:')
socket.emit('new-user', name)
appendMess('You connected!')



socket.on('send-mess', mess => {
    appendMess(mess)
} )

socket.on('user-connected', name => {
    appendMess(`${name} connected!`)
} )

socket.on('user-disconnected', name => {
    appendMess(`${name} disconnected!`)
} )

submitForm.addEventListener('submit', e => {
    e.preventDefault()
    const mess = messInput.value
    appendMess(`You: ${mess}`)
    socket.emit('new-mess', mess)
    messInput.value = ''
})

