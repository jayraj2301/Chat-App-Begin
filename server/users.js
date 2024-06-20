const users = []

const addUser = ({id,name, room})=>{
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if(!name || !room) return { error: 'Username and room are required.' };
    const existUser = users.find(user=> user.name === name && user.room === room)

    if (existUser) {
        return {error: "Exist user"}
    }

    const user = {id,name,room}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const ind = users.findIndex(user => user.id === id)

    if (id!== -1) {
        users.splice(ind,1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export {addUser, removeUser, getUser, getUsersInRoom}