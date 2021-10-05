import React from 'react'
import "./Messages.css"

const Messages = ({user , message, clas}) => {

    if(user){
        return (
            <div className={`messageBox ${clas}`}>
                { `${user} : ${message}` }
            </div>
        )
    }

    return (
        <div className="messageBox right">
            { `YOU : ${message}` }
        </div>
    )
}

export default Messages
