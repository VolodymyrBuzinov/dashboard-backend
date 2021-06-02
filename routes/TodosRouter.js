const express = require('express');
const router = express.Router();
const {
  validateCreateTodo,
} = require('../validation/todosValidation');
const todosController = require('../controllers/todosController');

const guard = require('../helpers/Guard');

// router.get('/', guard, contactsController.listContacts);

// router.get('/:contactId', guard, contactsController.getById);

router.post(
  '/',
  // guard,
  validateCreateTodo,
  todosController.createTodo,
);

// router.delete('/:contactId', guard, contactsController.removeContact);

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
