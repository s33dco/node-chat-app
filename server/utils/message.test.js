const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {

    let from = 'tony';
    let text = 'some message';
    let message = generateMessage(from, text);

    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('text', text);
    expect(message.createdAt).toBeTruthy();
  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {

    let from = 'tony';
    let latitude = 1;
    let longitude = 1;
    let url = 'https://www.google.com/maps?q=1,1'
    let message = generateLocationMessage(from, latitude, longitude);

    expect(message).toHaveProperty('from', from);
    expect(message).toHaveProperty('url', url);
    expect(message.createdAt).toBeTruthy();
  })
});
