const { default: mongoose } = require('mongoose');

const leaveSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'End date must be greater than start date.',
      },
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: 'pending',
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 4,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Leave', leaveSchema);
