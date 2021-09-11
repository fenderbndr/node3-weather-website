console.log('Client side JavaScript file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    const location = search.value
    const searchUrl = 'http://localhost:3000/weather?address=' + location

    fetch(searchUrl).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    })
})



} )