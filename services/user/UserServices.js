const {
  UserRepository,
} = require('../../repositories/UserRepository');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  async addUser(body) {
    const data = await this.repository.addUser(body);
    return data;
  }
  async getByEmail(email) {
    const data = await this.repository.getByEmail(email);

    return data;
  }
  async getById(id) {
    const data = await this.repository.getById(id);

    return data;
  }
}

module.exports = { UserService };
