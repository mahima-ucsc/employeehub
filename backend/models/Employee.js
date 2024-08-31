const { Schema, default: mongoose } = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Firstname cannot be empty.'],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Lastname cannot be empty.'],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  userRole: {
    type: String,
    required: [true, 'User role error'],
  },
});

EmployeeSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

EmployeeSchema.methods.createJWT = function () {
  return jwt.sign(
    { employeeId: this._id, role: this.userRole },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
};

EmployeeSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatched = await bcrypt.compare(candidatePassword, this.password);
  return isMatched;
};

module.exports = mongoose.model('Employee', EmployeeSchema);
