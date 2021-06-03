const codes = require('../helpers/Codes');
const { TasksServices } = require('../services/TasksServices');

const tasksServices = new TasksServices();

const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tasks = await tasksServices.getAllTasks(userId);
    res.status(codes.OK).json({
      status: 'success',
      code: codes.OK,
      data: tasks,
    });
  } catch (e) {
    next(e);
  }
};

const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = await tasksServices.createTask(userId, req.body);
    res.status(codes.CREATED).json({
      status: 'success',
      code: codes.CREATED,
      data: task,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createTask,
  getAllTasks,
};
