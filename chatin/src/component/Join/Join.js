import React, { useState } from 'react'
import "./Join.css"
import { Link } from "react-router-dom";

let user;

const Join = () => {

    //useState is a Hook that allows you to have state variables in functional components.
    const [name, setName] = useState("")    //giving null to usesate initially
    console.log(name);
    
    
    const sendUser = ()=>{
        user = document.getElementById("joinInput").value;
        document.getElementById("joinInput").value = null;
    }

    return (
        <div className="joinpage">
            <div className="joinContainer">
                <img src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/231/among-us-player-white-512.png" alt="image" />
                <h1>ChatIN</h1>
                <input type="text" id="joinInput" placeholder="username" onChange={(e)=>setName(e.target.value)} />
                <Link to="/chat" onClick={(e)=>name ==="" ? e.preventDefault() : null} >
                    <button className="joinButton" onClick={sendUser}>Login</button>
                </Link>

            </div>

        </div>
    )
}

export default Join
export {user}
