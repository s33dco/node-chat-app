
// addUser(id, name, room)

// removeUser(id)

// getUser(id)

// getUserList(room)



class Users {
  constructor () {
    this.users = [];              // initializes empty array
  }
  addUser(id, name, room) {
    let user = {id, name, room};  // create object from attribute
    this.users.push(user);        // push object onto array
    return user;                  // return user
  }
  removeUser(id) {
    let user = this.getUser(id);

    if (user){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];

  }
  getUserList(room){
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports = {Users};
