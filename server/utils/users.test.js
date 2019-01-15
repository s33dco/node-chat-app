const expect  = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
                      id : '1',
                      name: 'mike',
                      room: 'node room'
                    },
                    {
                      id : '2',
                      name: 'frank',
                      room: 'react room'
                    },
                    {
                      id : '3',
                      name: 'george',
                      room: 'node room'
                    },
                  ]
  })

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'tony',
      room: 'room101'
    };

    let resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]); // confirms user added to array
  });

  it('should return names for node room', () => {
    let userList = users.getUserList('node room');
    expect(userList).toEqual(['mike', 'george'])
  })

  it('should return names for react room', () => {
    let userList = users.getUserList('react room');
    expect(userList).toEqual(['frank']);
  })

  it('should remove a user', () => {
    let userId = '2';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user(invalid id)', () => {
    let userId = 'notauser';
    let user = users.removeUser(userId);

    expect(user).toBeFalsey;
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let userId = '2'
    let found = users.getUser(userId);
    expect(found.id).toEqual(userId);
  });

  it('should not find a user(invlid id)', () => {
    let userId = 'notauser'
    let found = users.getUser(userId);
    expect(found).toBeFalsey;
  });
});
