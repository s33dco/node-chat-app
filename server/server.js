const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');
const port      = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '/../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

// io.emit - sends to all Connected or io.to(params.room).emit
// socket.broadcast.emit - sends to all other sockets Connected socket.broadcast.to(params.room).emit
// socket.emit - sends to connected sockets - no need to target by room

io.on('connection', (socket) => {								// listens for connection

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) && !isRealString(params.room)) {
			callback('name and room name are required.')
		}

		socket.join(params.room);
		socket.emit('newMessage', generateMessage('admin',`Welcome to the ${params.room} room ${params.name}.`));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin',`${params.name} joins the conversation...`));
		// socket.leave(params.room);

		callback();
	});

	// above join has access to params - how to persist this data, vila socket.id 

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
