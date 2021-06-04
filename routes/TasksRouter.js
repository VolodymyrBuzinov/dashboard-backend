const express = require('express');
const router = express.Router();
const {
  validateCreateTask,
  validateUpdateStatusTask,
  // validateUpdateTask,
} = require('../validation/TasksValidation');
const tasksController = require('../controllers/TasksController');
const guard = require('../helpers/Guard');

router.get('/', guard, tasksController.getAllTasks);

router.post(
  '/',
  guard,
  validateCreateTask,
  tasksController.createTask,
);

router.delete('/:taskId', guard, tasksController.deleteTask);

router.put(
  '/:taskId',
  guard,
  validateCreateTask,
  tasksController.updateTask,
);

router.patch(
  '/:taskId/done',
  guard,
  validateUpdateStatusTask,
  tasksController.updateStatusTask,
);

module.exports = router;
