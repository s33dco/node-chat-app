const expect = require('expect');
const {generateMessage} = require('./message');

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
