const user = require('../schemas/UserSchema');

class UserRepository {
  constructor() {
    this.model = user;
  }
  async addUser(body) {
    const user = new this.model(body);
    return user.save();
  }
  async getByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }
}

module.exports = { UserRepository };
