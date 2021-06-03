const express = require('express');
const router = express.Router();
const {
  validateCreateTask,
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

// router.patch(
//   '/:contactId/favorite',
//   guard,
//   updateStatus,
//   contactsController.updateStatusContact,
// );

module.exports = router;
