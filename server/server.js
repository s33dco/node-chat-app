const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');
const port      = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '/../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();		// make instance of Users....

app.use(express.static(publicPath));

// io.emit - sends to all Connected or io.to(params.room).emit
// socket.broadcast.emit - sends to all other sockets Connected socket.broadcast.to(params.room).emit
// socket.emit - sends to connected sockets - no need to target by room

io.on('connection', (socket) => {								// listens for connection

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) && !isRealString(params.room)) {
			 return callback('name and room name are required.')
		}

		socket.join(params.room);
		users.removeUser(socket.id);														// remove user from array (incase room change)
		users.addUser(socket.id, params.name, params.room);			// add user to array

		console.log(`${params.name} has joined the ${params.room} room`);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room)); // emit updated user list to everone in the room

		socket.emit('newMessage', generateMessage('admin',`Welcome to the ${params.room} room ${params.name}.`));									// send to user on socket
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin',`${params.name} joins the conversation...`));	// send to all other sockets in same room
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
		let user = users.removeUser(socket.id);									// variable for removed user, removeUser deletes from array and returns user...

		if (user) {																							// if there was a user, ie one removed....
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));					// emit event to update user list to all in room
			io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left the room`)); // send message to all in room
		}

	})
});


server.listen(port, () => {
	console.log(`server running on ${port}`);
});
