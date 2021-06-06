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

const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const deletedTask = await tasksServices.deleteTask(
      userId,
      req.params.taskId,
    );

    if (deletedTask) {
      res.status(codes.NO_CONTENT);
    } else {
      return next({
        status: codes.NOT_FOUND,
        code: codes.NOT_FOUND,
        message: 'Task not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const task = await tasksServices.updateTask(
      userId,
      taskId,
      req.body,
    );

    if (task) {
      res.status(codes.OK).json({
        status: 'success',
        code: codes.OK,
        data: task,
      });
    } else {
      return next({
        status: codes.NOT_FOUND,
        code: codes.NOT_FOUND,
        message: 'Task not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateStatusTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.taskId;
    const task = await tasksServices.updateStatusTask(
      userId,
      taskId,
      req.body,
    );

    if (task) {
      res.status(codes.OK).json({
        status: 'success',
        code: codes.OK,
        data: task,
      });
    } else {
      return next({
        status: codes.NOT_FOUND,
        code: codes.NOT_FOUND,
        message: 'Task not found',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  deleteTask,
  updateTask,
  updateStatusTask,
};
