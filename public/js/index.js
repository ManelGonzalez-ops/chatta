

const handleForm =  (e) =>{
    e.preventDefault()
    console.log("hola nnnnnnena")
    const username = e.target.elements.username.value
    const room = e.target.elements.room.value
    localStorage.setItem("username", JSON.stringify(username))
    localStorage.setItem("room", JSON.stringify(room))
    window.location.replace("/chat.html") 
}

document.getElementById("enter-form").addEventListener("submit", handleForm)
