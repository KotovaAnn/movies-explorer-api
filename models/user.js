const validator = require('validator');
const mongoose = require('mongoose');
const { USER_SCHEMA_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, USER_SCHEMA_MESSAGE.EMAIL],
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: USER_SCHEMA_MESSAGE.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, USER_SCHEMA_MESSAGE.PASSWORD],
  },
  name: {
    type: String,
    required: [true, USER_SCHEMA_MESSAGE.NAME],
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
