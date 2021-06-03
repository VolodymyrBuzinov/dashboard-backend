const express = require('express');
const router = express.Router();
const {
  validateCreateTask,
} = require('../validation/TasksValidation');
const tasksController = require('../controllers/TasksController');
const guard = require('../helpers/Guard');

router.get('/', guard, tasksController.getAllTasks);

// router.get('/:contactId', guard, contactsController.getById);
router.post(
  '/',
  guard,
  validateCreateTask,
  tasksController.createTask,
);

router.delete('/:taskId', guard, tasksController.deleteTask);

// router.patch(
//   '/:contactId',
//   guard,
//   updateContact,
//   contactsController.updateContact,
// );

// router.patch(
//   '/:contactId/favorite',
//   guard,
//   updateStatus,
//   contactsController.updateStatusContact,
// );

module.exports = router;
