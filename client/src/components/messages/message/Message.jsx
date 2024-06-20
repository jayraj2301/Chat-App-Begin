import './message.css';

function Message({message: {text,user},name=""}) {

    let isSentByCurrentUser = false
    let trimName = name.trim().toLowerCase()
    if (trimName === user) {
        isSentByCurrentUser = true
    }
    
  return (
    isSentByCurrentUser ?
    (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
          </div>
        </div>
    ) :
    (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
        </div>
    )
  )
}

export default Message