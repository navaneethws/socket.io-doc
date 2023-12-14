const express = require('express'); // importing express
const { createServer } = require('node:http'); // importing createServer method from http module in nodejs  ---  
                                              // createServer method is to create a server in our system it turns our system into http server

const { join } = require('node:path'); // to import join method from path module in node

const { Server } = require('socket.io');  //imports the Server class from the 'socket.io' library

const app = express();  // creating express application
const server = createServer(app);  // to create an HTTP server using Node.js's http.createServer method
                                    // attaching express app to the HTTP server. The Express app will handle routing, middleware, and other aspects of request handling

const io = new Server(server);  // This binds Socket.IO to the same HTTP server used by Express.
                                // creates a new instance of the Server class, passing the existing server instance (created with createServer from 'node:http') as an argument

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));  //sendfile is used to send content inside a file (here "index.html") as a response back to the client
});

io.on('connection', (socket) => {   //This line is an event listener for the 'connection' event. The 'connection' event is fired whenever a new client connects to the Socket.IO server.
                                    // callback function is executed and recieves a 'socket-(represents the connection to the specific client)' object when new connection is established

    // console.log('a user connected');    //This block of code listens for the 'connection' event, which is triggered whenever a client successfully connects to the server through Socket.IO.
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');   //This event is triggered when a client disconnects from the server, either intentionally (closing the browser tab or navigating away) or due to a network issue.
    // });

    socket.on('chat message', (msg) => {    // This event is triggered when a client sends a 'chat message' event to the server.
                                            // The provided callback function is executed when the 'chat message' event occurs.
                                            
        console.log('message: ' + msg);
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');  // starts the HTTP server to listen on port 3000
})