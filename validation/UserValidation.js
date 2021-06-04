const Joi = require('joi');
const codes = require('../helpers/Codes');
const schemaRegistrationUser = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),
  password: Joi.string().alphanum().min(6).required(),
});
const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),
  password: Joi.string().alphanum().min(6).required(),
});

const schemaVerifyUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),
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
const validateRegistrationUser = (req, res, next) => {
  return validate(schemaRegistrationUser, req.body, next);
};
const validateLoginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};

const validateVerifyUser = (req, res, next) => {
  return validate(schemaVerifyUser, req.body, next);
};
module.exports = {
  validateRegistrationUser,
  validateLoginUser,
  validateVerifyUser,
};
