
import "./styles.sass"




function send() {
  let message = document.querySelector('#message').value
  let email = document.querySelector('#email').value
  
  fetch('/contact', {
    method: "POST", 
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${email}&message=${message}`
  })
  .then(response => response.json())
  .then(res => window.location.href = 'http://wayfair.tech/')
  .catch(err => {
    console.log('Err')
    alert('There has been an error')
  })
}




let submit = document.querySelector('#submit').addEventListener('click', () => send())



