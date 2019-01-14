const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');
const port      = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {								// listens for connection

	console.log('new user connected');

	socket.emit('newMessage', generateMessage('admin','welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('admin','new user joined chat app'));

	socket.on('createMessage', (message, callback) => {			// listener for createMessage
		console.log(`createMessage`, message);
		io.emit('newMessage',generateMessage(message.from, message.text)); // emit to other sockets connected
		callback();																											// callback (2nd arguement)
	})

	socket.on('createLocationMessage', (coords) => {				// listener
		io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {              // listens for disconnect
		console.log('user has disconnected');
	})
});


server.listen(port, () => {
	console.log(`server running on ${port}`);
});
