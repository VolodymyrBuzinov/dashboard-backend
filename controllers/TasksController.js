const codes = require('../helpers/Codes');
const { TasksServices } = require('../services/TasksServices');

const tasksServices = new TasksServices();

const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = await tasksServices.createTask(userId, req.body);
    res.status(codes.CREATED).json({
      status: 'success',
      code: codes.CREATED,
      data: {
        task,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createTask,
};
