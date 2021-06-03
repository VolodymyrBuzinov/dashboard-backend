const TasksRepository = require('../repositories/TasksRepository');

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

  async deleteTask(userId, taskId) {
    return await this.tasksRepository.deleteTask(userId, taskId);
  }
}

module.exports = { TasksServices };
