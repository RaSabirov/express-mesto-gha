const {
  celebrate, Joi, Segments,
} = require('celebrate');

const { isEmail } = require('validator');
const { regEx } = require('../config');

// Валидация для регистрации пользователя
const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    // валидация Email поля
    email: Joi.string().required().custom((value, helper) => {
      if (!isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Email адрес не указан',
      'string.notEmail': 'Email адрес не корректный',
    }),
    // валидация поля пароль
    password: Joi.string().required().min(5).messages({
      'any.required': 'Пароль не указан',
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
    avatar: Joi.string().pattern(regEx),
  }),
});

const validateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
  }),
});

const validateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(regEx),
  }),
});

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Минимальная длина поля 2 символа',
      'string.max': 'Максимальная длина поля 30 символов',
    }),
    link: Joi.string().pattern(regEx),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    // Требование чтобы строка содержала только буквы a-z, A-Z, и цифры 0-9
    cardId: Joi.string().alphanum().length(24).message({
      'string.length': 'Некорректное поле ID, требуемая длина должна равняться 24',
    }),
  }),
});

module.exports = {
  register,
  validateProfile,
  validateAvatar,
  validateCreateCard,
  validateId,
};
