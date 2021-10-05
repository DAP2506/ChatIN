import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import Message from "../Messages/Messages";
import ReactScrollToBottom from "react-scroll-to-bottom";



let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {

    // writing server side of the chat


    const [id, setid] = useState("");

    const [messages, setmessages] = useState([])

    const send = () => {

        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }



    useEffect(() => {
        //on connecting to chat side page

        socket = socketIO(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert("connected");
            setid(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setmessages([...messages, data]);  // ... is a spread operator to load others exsiting values to messages and then add data to messages
            console.log(data.user, data.message);
        });
        socket.on('userJoined', (data) => {
            setmessages([...messages, data]);
            console.log(data.user, data.message);
        });
        socket.on('leave', (data) => {
            setmessages([...messages, data]);
            console.log(data.user, data.message);
        })

        return () => {
            
            socket.emit('disconnect');
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setmessages([...messages, data]);
        })
        return () => {
            socket.off();
        }
    }, [messages]);

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h1>ChatIN</h1>
                    <a href="/"><img src="https://icons-for-free.com/iconfiles/png/512/close+icon-1320184117228553763.png"></img></a>
                </div>
                
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, idex) => <Message user={item.id === id ? '': item.user } message={item.message} clas= {item.id === id ? 'right':'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="chatInput" onKeyPress={(e)=>e.key === 'Enter' ? send() : null} />
                    <button className="sendButton" onClick={send} >SEND</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
