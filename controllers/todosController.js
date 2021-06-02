const codes = require('../helpers/Codes');
const { TodosServices } = require('../services/todosServices');

const todosServices = new TodosServices();

const createTodo = async (req, res, next) => {
  try {
    const userId = req.user?.id || 1;
    const todo = await todosServices.createTodo(userId, req.body);
    console.log(userId);
    console.log(todo);
    res.status(codes.CREATED).json({
      status: 'success',
      code: codes.CREATED,
      data: {
        todo,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createTodo,
};
