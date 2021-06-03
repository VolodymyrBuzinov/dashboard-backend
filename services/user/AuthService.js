const {
  UserRepository,
} = require('../../repositories/UserRepository');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {
    this.repository = new UserRepository();
  }
  async login(email, password) {
    const user = await this.repository.getByEmail(email);
    if (!user) {
      return null;
    }
    const valid = await user.validPassword(password);
    if (!valid) {
      return null;
    }
    const id = user.id;
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    await this.repository.updateToken(id, token);
    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
  async logout(userID) {
    const data = this.repository.updateToken(userID, null);
    return data;
  }
}

module.exports = { AuthService };
