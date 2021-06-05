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
  async updateToken(userId, token, refreshToken) {
    await this.model.updateOne(
      { _id: userId },
      { token, refreshToken },
    );
  }

  async verification({ verifyToken }) {
    const user = await this.model.findOne({ verifyToken });

    if (!user) {
      return false;
    }
    const record = await user.updateOne({
      verify: true,
      verifyToken: null,
    });
    return record;
  }
  async sendNewMaiL(email) {
    const data = await this.model.findOne({ email });
    return data;
  }
  async refresh(refreshToken) {
    const data = await this.model.findOne({ refreshToken });
    return data;
  }
}

module.exports = { UserRepository };
