const socket = io()

const username = JSON.parse(localStorage.getItem("username"))
const room = JSON.parse(localStorage.getItem("room"))


socket.emit("JoinRoom", { username, room })

const chatbox = document.querySelector(".chat-messages")


socket.on("message", socket => {
    const container = document.createElement("div")
    container.classList.add("message")

    const newMsg = document.createElement("p")

    newMsg.innerHTML = `<p class="meta">${socket.user}<span>${socket.time}</span></p>
    <p class="text">${socket.text}</p>`
    container.appendChild(newMsg)
    chatbox.appendChild(container)
    chatbox.scrollTop = chatbox.scrollHeight
})


const chatInput = document.getElementById("chat-form")

chatInput.addEventListener("submit", handleMessage)

function handleMessage(e) {
    e.preventDefault()


    const msg = e.target.elements.msg.value
    console.log(msg, "mensagee")


    const info = {
        msg,
        username
    }
    console.log(info, "la info")

    socket.emit("chatMessage", info)

    e.target.elements.msg.value = ""
    e.target.elements.msg.focus()
}

document.getElementById("leave").addEventListener("click", handleLeave)

function handleLeave() {

    socket.emit("disconnect", username)
    window.location.replace("/index.html")
}


const arrayRooms = ["Javascript", "Python", "PHP", "C#", "Ruby", "Java"]



socket.on("users", socket => {

    document.getElementById("room-name").innerText = room

    populateUsers(socket)

})

function populateUsers(users) {
console.log(users, "mamama")
document.querySelector("#users").innerHTML = ""
    users.forEach(user => {
        let li = document.createElement("li")
        li.innerText = user.name
        li.className = "user"
        document.querySelector("#users").appendChild(li)
    })

}

