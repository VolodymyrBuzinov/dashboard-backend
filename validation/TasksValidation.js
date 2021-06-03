const Joi = require('joi');
const codes = require('../helpers/Codes');

const schemaCreateTask = Joi.object({
  category: Joi.string()
    .valid('STUFF', 'FAMILY', 'HEALTH', 'LEARNING', 'LEISURE', 'WORK')
    .required(),

  difficulty: Joi.string().valid('Hard', 'Easy', 'Normal').required(),

  title: Joi.string().min(3).max(30).required(),

  challenge: Joi.boolean().optional(),

  done: Joi.boolean().optional(),

  time: Joi.string().required(),
});

// const schemaUpdateTask = Joi.object({
//   category: Joi.string()
//     .valid('STUFF', 'FAMILY', 'HEALTH', 'LEARNING', 'LEISURE', 'WORK')
//     .required(),

//   difficulty: Joi.string().valid('Hard', 'Easy', 'Normal').required(),

//   title: Joi.string().min(3).max(30).required(),

//   challenge: Joi.boolean().optional(),

//   done: Joi.boolean().optional(),

//   time: Joi.string().required(),
// });

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

const validateCreateTask = (req, res, next) => {
  return validate(schemaCreateTask, req.body, next);
};

// const validateUpdateTask = (req, res, next) => {
//   return validate(schemaUpdateTask, req.body, next);
// };

module.exports = {
  validateCreateTask,
  // validateUpdateTask,
};
