const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Ошибка: невалидный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле "password" должно быть заполнено'],
  },
  name: {
    type: String,
    default: 'Мария',
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
