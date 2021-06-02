const {
  TasksRepository,
} = require('../repositories/tasksRepository');

class TasksServices {
  constructor() {
    this.tasksRepository = new TasksRepository();
  }

  async createTask(userId, body) {
    return await this.tasksRepository.addTask(userId, body);
  }
}

module.exports = { TasksServices };
