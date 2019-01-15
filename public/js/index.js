let socket = io(); // creates connection and stores in variable

socket.on('connect', function () {            // listens for connection
  console.log('Connected to server');
});

socket.on('disconnect', function () {         // listens for disconnection
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {  // listens for  event
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // let li = jQuery('<li></li>');
  // li.text(`${formattedTime} - ${message.from}: ${message.text}`);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // let li = jQuery('<li></li>');
  // let a = jQuery('<a target="_blank">My Current Location`</a>');
  // li.text(`${formattedTime} - ${message.from}: `)
  // a.attr('href', message.url)
  // li.append(a);
  // jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  let messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function (){                              // callback clears form
    messageTextBox.val('')
  });
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Gelocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending........');

  navigator.geolocation.getCurrentPosition(function (position) { // 2 args success and error
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude  : position.coords.latitude,
      longitude : position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
