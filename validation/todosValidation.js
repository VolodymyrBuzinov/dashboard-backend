const Joi = require('joi');
const codes = require('../helpers/Codes');

const schemaCreateTodo = Joi.object({
  category: Joi.string().min(3).max(30).required(),

  difficulty: Joi.string().min(3).max(13).required(),

  title: Joi.string().min(3).max(30).required(),

  challenge: Joi.boolean().optional(),

  done: Joi.boolean().optional(),

  challenge: Joi.boolean().optional(),

  time: Joi.string().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;

    return next({
      status: codes.BAD_REQUEST,
      message: `Field ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }
  next();
};

const validateCreateTodo = (req, res, next) => {
  return validate(schemaCreateTodo, req.body, next);
};

module.exports = {
  validateCreateTodo,
};
