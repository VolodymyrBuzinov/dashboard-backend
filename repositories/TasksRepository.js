const Task = require('../schemas/TaskSchema');

class TasksRepository {
  constructor() {
    this.taskModel = Task;
  }

  async addTask(userId, body) {
    const newTask = await this.taskModel.create({
      ...body,
      owner: userId,
    });

    return newTask;
  }
}

module.exports = { TasksRepository };
