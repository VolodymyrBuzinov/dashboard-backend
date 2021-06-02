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
  async getById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }
  async updateToken(userId, token) {
    await this.model.updateOne({ _id: userId }, { token });
  }
}

module.exports = { UserRepository };
