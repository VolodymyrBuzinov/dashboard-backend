const {
  TodosRepository,
} = require('../repositories/todosRepository');

class TodosServices {
  constructor() {
    this.todosRepository = new TodosRepository();
  }

  async createTodo(userId, body) {
    return await this.todosRepository.addContact(userId, body);
  }
}

module.exports = { TodosServices };
