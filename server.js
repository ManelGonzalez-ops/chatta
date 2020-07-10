const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")
const formatMessage = require("./utils/messages")
const {setUser, findUser, deleteUser, countRoom, getUsers} = require("./utils/users")

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const server = http.createServer(app)
const io = socketio(server)

io.on("connection", socket=>{
    console.log("New WS Connection...")

    socket.on("JoinRoom", ({username, room})=>{
        setUser(socket.id, username, room)
        socket.join(room)
        socket.emit("message", formatMessage("Admin",`${username} welcome to the ${room} chatroom :)`))

        //it's seen for everyone but not the user who connects
        socket.broadcast.to(room).emit("message", formatMessage("Admin",`${username} has joined the chatroom`))

        io.in(room).emit("users", getUsers())
        //user disconects
    })
    

    socket.on("disconnect", ()=>{
        const user = findUser(socket.id)
        deleteUser(socket.id)
        console.log(user, "thee euser")
        io.in(user.room).emit("message", formatMessage("Admin", `${user.name} has left the room`))
       
        io.in(user.room).emit("users", getUsers())
    })


    socket.on("chatMessage", (info)=>{
        console.log(info)
        const fullMessage = formatMessage(info.username, info.msg)
        
      //we usem io.emmit because it'll send to everyone (the messager included)
        io.emit("message", fullMessage)
    })
})

app.get("/xupona", (req,res)=>{
    console.log("commmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmeeeeeeeeeeeeeeeeee")
    res.status(200).send({data: "cooooooooooomemela guarra"})
})


server.listen("8000", ()=>{
    console.log("server running")
})




