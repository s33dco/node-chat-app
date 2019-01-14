let socket = io(); // creates connection and stores in variable

socket.on('connect', function () {            // listens for connection
  console.log('Connected to server');
});

socket.on('disconnect', function () {          // listens for disconnection
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {   // listens for  event
  console.log('newMessage', message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `)
  a.attr('href', message.url)
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function (){

  });
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Gelocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function (position) { // 2 args success and error

    socket.emit('createLocationMessage', {
      latitude  : position.coords.latitude,
      longitude : position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
});
