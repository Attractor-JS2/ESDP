const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../configs/auth.config');

const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'doctor',
    enum: ['admin', 'doctor', 'frontDesk'],
  },
});

UserSchema.pre('save', async function encryptIntoHash(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function checkPassword(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function generateToken() {
  this.token = jwt.sign({ userId: this._id }, config.secret, {
    expiresIn: '12h',
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
