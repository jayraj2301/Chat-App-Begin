import { useState } from "react"
import './join.css';
import {Link} from 'react-router-dom';

function Start() {

  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  return (
    <div className="outer">
      <div className="inner">
        <h1>Join</h1>
        <div className="in">
          <input placeholder="Enter name" name="name" type="text" onChange={(e)=> {setName(e.target.value)}} />
        </div>
        <div className="in">
          <input placeholder="Enter Room" name="name" type="text" onChange={(e)=> {setRoom(e.target.value)}} />
        </div>
        <Link  onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button type="submit">Sign in</button>
        </Link>
      </div>
    </div>
  )
}

export default Start