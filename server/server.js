const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');
const port      = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '/../public');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {								// listens for connection

	console.log('new user connected');

	socket.on('createMessage', (message) => {			// listener for message created
		console.log(`createMessage`, message);
		io.emit('newMessage', {											// emit to all connected
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	})

	socket.on('disconnect', () => {              // listens for disconnect
		console.log('user has disconnected');
	})
});


server.listen(port, () => {
	console.log(`server running on ${port}`);
});
