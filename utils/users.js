
let users = []

const setUser =(socketId, name, room)=>{

    const newUser = {
        socketId,
        name,
        room
    }

    users = [...users, newUser]
    console.log(users)
    
}

const findUser =(socketId)=>{

    return users.find(user=>user.socketId === socketId)
}

const deleteUser =(socketId)=>{

       updatedUsers = users.filter(user=>user.socketId !== socketId)
       users = updatedUsers
       console.log(users, "usuarios despues de eliminarrr")

}

const countRoom =(room)=>{

       numberOfRooms = users.filter(user=>user.room === room)
       return numberOfRooms.length
}

const getUsers =()=>users

module.exports = {setUser, findUser, deleteUser, countRoom, getUsers}