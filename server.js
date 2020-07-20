const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")
const formatMessage = require("./utils/messages")
const { setUser, countRoom } = require("./utils/users")
const { createTable, tableExists, addUser, deleteUser, findUser } = require("./service")

const db = require("./db")
db.connect((err) => {
    if (err) { throw err };
    console.log("Mysql conncected")
})

const app = express()

// app.use(express.static(path.join(__dirname, "public")))

const server = http.createServer(app)
const io = socketio(server)

// db.query("create database if not exists CHATAPP", err => {
//     console.log("crear chatapp?")
//     if (err) throw err
// })
db.query("use sql7356176git", err => {
    console.log("usar chatapp?")
    if (err) throw err
})

tableExists((err, result) => {
    if (err) throw err

    console.log(result, "resultado")
    if (!result.length) createTable()

})


io.on("connection", socket => {
    console.log("New WS Connection...")


    socket.on("JoinRoom", ({ username, room }) => {

        addUser(socket.id, username, room)
        socket.join(room)
        socket.emit("message", formatMessage("Admin", `${username} welcome to the ${room} chatroom :)`))

        //it's seen for everyone but not the user who connects
        socket.broadcast.to(room).emit("message", formatMessage("Admin", `${username} has joined the chatroom`))
        console.log("hooooola")
        db.query("select * from users where room=?",[room], (err, users) => {
            if (err) throw err
            io.in(room).emit("users", users)
        })

    })


    // setUser(socket.id, username, room)

    //user disconects


    socket.on("disconnect", () => {
        findUser(socket.id).on("result", user => {
            db.query("delete from users where id = ?", [socket.id], err => {
                if (err) throw err
                console.log(user, "thee euser")
                io.in(user.room).emit("message", formatMessage("Admin", `${user.name} has left the room`))

                db.query("select * from users where room = ?", [user.room], (err, users) => {
                    if (err) throw err

                    io.in(user.room).emit("users", users)
                })

            })
        })
    })






    socket.on("chatMessage", (info) => {
        console.log("vas o tereviente")
        const fullMessage = formatMessage(info.username, info.msg)

        //we usem io.emmit because it'll send to everyone (the messager included)
        io.emit("message", fullMessage)
    })

})

let PORT = process.env.PORT || 8000

server.listen(PORT, () => {
    console.log(`server running in port ${PORT}`)
})




