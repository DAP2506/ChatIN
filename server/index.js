const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const { emit } = require("process");



const users = [{}];         // getting all users ina array of objects

const app = express();

const port = 4500 || process.env.PORT;

app.use(cors());            //cors for inter communication between url

app.get("/", (req, res) => {
    res.send("Its working");
})

//creating server
const server = http.createServer(app);
//passing are server in socket
const io = socketIO(server);


//connecting user to server
io.on("connection", (socket) => {
    console.log("New connection");

    socket.on('joined', ({ user }) => {

        users[socket.id] = user;                             //giving users a unique socket id 


        //"emit" is used to transfer data and it is received through "on" in sockets

        socket.broadcast.emit('userJoined',{ user:"Admin" , message: ` ${ users[socket.id] } joined the chat`})  //posting that someone has joined the chat visible to everyone other then the new one joined
        
        socket.emit('welcome', { user: "Admin", message: `welcome to the chat ${ users[socket.id] } ` });   //joing text to user who have joined the chat

        

    });
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('leave', {user:"Admin" , message: `${user[socket.id]} has left the chat`});
        console.log("User left");
    });
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{ user: users[id] , message, id}); //send to all 
    });
    
});


//staring our server
server.listen(port, () => {
    console.log("server is running on " + port);
});
