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

  async getAllTasks(userId) {
    return await this.tasksRepository.getAllTasks(userId);
  }
}

module.exports = { TasksServices };
