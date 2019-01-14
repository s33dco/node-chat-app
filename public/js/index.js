let socket = io(); // creates connection and stores in variable

socket.on('connect', function () {            // listens for connection
  console.log('Connected to server');
});

socket.on('disconnect', function () {          // listens for disconnection
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {   // listens for  event
  console.log('newMessage', message);
});

socket.emit('createMessage', {                 // emit
  from: 'frank',
  text: 'hello'
}, function (data) {                               // callback for acknowledgement from server
  console.log('got it', data);
});
