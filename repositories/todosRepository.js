const Todo = require('../schemas/TodoSchema');

class TodosRepository {
  constructor() {
    this.todoModel = Todo;
  }

  async addContact(userId, body) {
    const newContact = await this.todoModel.create({
      ...body,
      owner: userId,
    });

    return newContact;
  }
}

module.exports = { TodosRepository };
