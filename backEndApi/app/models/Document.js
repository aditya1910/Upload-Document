// Here is booking collection schema is defined
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const documentSchema = new Schema(
  {
    text: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['locked', 'unlocked'],
      default: 'unlocked',
    },
    lockedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  },
  {
    strict: false,
  },
);

module.exports = documentSchema;
