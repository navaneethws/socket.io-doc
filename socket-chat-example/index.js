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
                                            
        // console.log('message: ' + msg); // to view the chat message in console

        io.emit('chat message', msg);   //  ith cheythal ethra socket indo avarkk okke pokum sender adakkam

        socket.broadcast.emit('chat message', msg); //  ith use cheythal sender kk varilla bakki ella socket(or receiver) nu pokum
    });



    // socket.on('hello', (arg1, arg2, arg3) => {   // Basic Emit  =>  client -> server is working & showing output 
    //     console.log(arg1); // 1
    //     console.log(arg2); // '2'
    //     console.log(arg3); // { 3: '4', 5: <Buffer 06> }
    // });  


    
    // socket.emit('hello', 1, '2', { 3: '4', 5: Buffer.from([6]) }); // Basic Emit  =>  server -> client is not working & not showing output 



    // socket.emit('hello', 'world');   // Basic Emit  =>  server -> client is not working & not showing output 


    // socket.on('request', (arg1, arg2, callback) => {    // Acknowledgement  =>  client -> server is working & showing output 
    //     console.log(arg1); // { foo: 'bar' }
    //     console.log(arg2); // 'baz'
    //     callback({
    //         status: 'ok'
    //     });
    // });


    // socket.timeout(5000).emit('request', { foo: 'bar' }, 'baz', (err, response) => {    //  Acknowledgement  =>  server -> client acknowledgement callback is working & not showing output 
    //     if (err) {
    //       // the client did not acknowledge the event in the given delay
    //     } else {
    //       console.log(response.status); // 'ok'
    //     }
    // });


    // socket.on('request', (arg1, arg2, callback) => {
    //     console.log(arg1); // { foo: 'bar' }
    //     console.log(arg2); // 'baz'
    //     callback({
    //       status: 'ok'
    //     });
    // });
});

io.on('connection', async (socket) => {
    try {
      const response = await socket.timeout(5000).emitWithAck('request', { foo: 'bar' }, 'baz');
      console.log(response.status); // 'ok'
    } catch (e) {
      // the client did not acknowledge the event in the given delay
    }
  });

server.listen(5000, () => {
    console.log('server running at http://localhost:5000');  // starts the HTTP server to listen on port 3000
})