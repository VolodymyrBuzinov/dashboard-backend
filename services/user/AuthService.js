const {
  UserRepository,
} = require('../../repositories/UserRepository');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {
    this.repository = new UserRepository();
  }
  async login(email) {
    const user = await this.repository.getByEmail(email);
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    await this.repository.updateToken(id, token);
    return {
      token,
      user: { email: user.email },
    };
  }
}

module.exports = { AuthService };
