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

  async getAllTasks(userId) {
    const tasks = await this.taskModel.find({
      owner: userId,
    });

    return tasks;
  }

  async deleteTask(userId, taskId) {
    const record = await this.taskModel.findByIdAndRemove(taskId, {
      owner: userId,
    });

    return record;
  }
}

module.exports = { TasksRepository };
