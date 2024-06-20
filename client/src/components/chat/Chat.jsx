import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import {io} from 'socket.io-client';
import Infobar from "../Infobar/Infobar.jsx";
import Input from "../input/Input.jsx";
import Messages from '../messages/Messages.jsx';
import "./chat.css"
let socket;

function Chat() {

  const [name1, setName] = useState("")
  const [room1, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])


  const EP = import.meta.env.EP

  const location = useLocation()
    useEffect(()=>{
      const queryParams = new URLSearchParams(location.search);
      const name = queryParams.get('name');
      const room= queryParams.get('room');

      socket = io(EP)

      setName(name)
      setRoom(room)
      
      socket.emit("join", { name, room },(err)=>{
        if (err) {
          alert(err)
        }
      });

      return ()=>{
        socket.emit("disconnection")

        socket.off()
      }
    },[location.search,EP])

    useEffect(()=>{
      socket.on("message",(message)=>{
        setMessages(messages => [...messages,message])
      })
    },[messages])
  
    const sendMessage = (e)=>{
      e.preventDefault()

      if (message) {
        socket.emit("sendMessage",message, ()=> setMessage(""))
      }
    }

    // console.log(message, messages);

  return (
    <div className="outerbox">
      <div className="container">
        <Infobar room={room1} />
        <Messages messages={messages} name={name1} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat