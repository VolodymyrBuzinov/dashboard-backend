const schema = require('../schemas/UserSchema');

class UserRepository {
  constructor() {
    this.model = schema();
  }
  async addUser(body) {
    const user = new this.model(body);
    return user.save();
  }
  async getByEmail(email) {
    const data = await this.model.findOne({ email });
    return data;
  }
}

module.exports = { UserRepository };
