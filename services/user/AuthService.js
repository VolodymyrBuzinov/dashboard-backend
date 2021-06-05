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
    if (!user.verify) {
      return undefined;
    }
    const id = user.id;
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '30d',
    });

    await this.repository.updateToken(id, token, refreshToken);
    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
  async logout(userID) {
    const data = this.repository.updateToken(userID, null, null);
    return data;
  }
  async current(email) {
    const user = await this.repository.getByEmail(email);
    return {
      email: user.email,
      token: user.token,
      verify: user.verify,
      verifyToken: user.verifyToken,
    };
  }
  async refresh(refreshToken) {
    const user = jwt.verify(refreshToken, process.env.JWT_KEY);
    if (user) {
      return this.login(user.email, user.password);
    }
  }
}

module.exports = { AuthService };
