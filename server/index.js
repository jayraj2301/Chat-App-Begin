import express, { text } from 'express';
import {Server} from 'socket.io';
import http from 'http';
import {router} from './router.js';
import cors from 'cors';
import { addUser, getUser, removeUser } from './users.js';

const app = express()
app.use(cors({origin: 'http://localhost:5173'}))
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
    console.log("We have new connection");

    socket.on("join",({name,room},cb)=>{
      // console.log(name, room);

      const {error, user} = addUser({id: socket.id, name,room})

      if (error) cb(error)

      socket.join(user.room)

      socket.emit("message",{user:'admin', text: `${user.name}, welcome to room ${user.room}`})
      socket.broadcast.to(user.room).emit("message", {user:'admin', text: `${user.name} has joined`})

      // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});


      cb()
    })

    socket.on("sendMessage", (message,cb)=>{
      const user = getUser(socket.id)

      io.to(user.room).emit("message", {user:user.name, text: message})
      cb()
    })

    socket.on("disconnection",()=>{
        const user = removeUser(socket.id)
        
        if (user) {
          io.to(user.room).emit("message",{user:"Admin",text: `${user.name} has left.`})
          // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
  });

app.use(router)

server.listen(5000, ()=>{
    console.log("Server is running...");
})