const {
  UserRepository,
} = require('../../repositories/UserRepository');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const session = require('../../schemas/SessionSchema');
class AuthService {
  constructor() {
    this.repository = new UserRepository();
    this.session = session;
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
    const sessionStorage = new this.session({ uid: id });
    await sessionStorage.save();
    const payload = { sid: sessionStorage._id, id, email };
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
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
    await this.session.findOneAndDelete({ uid: userID });
    await this.repository.updateToken(userID, null, null);
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
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    if (user) {
      const id = user.id;
      await this.session.findOneAndDelete({ uid: id });
      const sessionStorage = new this.session({ uid: id });
      await sessionStorage.save();
      const payload = {
        sid: sessionStorage._id,
        id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH,
        {
          expiresIn: '30d',
        },
      );
      await this.repository.updateToken(id, token, refreshToken);
      return {
        token,
        refreshToken,
        user: {
          id,
          email: user.email,
        },
      };
    }
  }
}

module.exports = { AuthService };
