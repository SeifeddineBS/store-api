class User {
  constructor(id, email, name, lastName, birthday, password, created_at) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
    this.birthday = birthday;
    this.password = password;
    this.created_at = created_at;
  }
}
module.exports = User;
