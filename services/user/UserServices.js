const {
  UserRepository,
} = require('../../repositories/UserRepository');
const { MailService } = require('./MailService');
const { v4: uuidv4 } = require('uuid');
class UserService {
  constructor() {
    this.repository = new UserRepository();
    this.mailService = new MailService();
  }
  async addUser(body) {
    try {
      const { email, name } = body;
      const verifyToken = uuidv4();
      const data = await this.repository.addUser({
        ...body,
        verifyToken,
      });
      await this.mailService.sendEmail(verifyToken, email, name);
      return data;
    } catch (error) {
      throw new Error(503, error.message, 'Service Unavaliable');
    }
  }
  async getByEmail(email) {
    const data = await this.repository.getByEmail(email);

    return data;
  }
  async getById(id) {
    const data = await this.repository.getById(id);

    return data;
  }
  async verification({ verificationToken }) {
    const data = await this.repository.verification({
      verifyToken: verificationToken,
    });
    return data;
  }
  async sendNewMail({ email }) {
    try {
      const user = await this.repository.sendNewMaiL(email);
      if (!user.verify) {
        this.mailService.sendEmail(
          user.verifyToken,
          email,
          user.name,
        );
        return user;
      }
    } catch (error) {
      return null;
    }
  }
}

module.exports = { UserService };
