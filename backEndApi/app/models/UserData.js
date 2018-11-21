// Here is booking collection schema is defined
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userDataSchema = new Schema(
  {
    userId: {
      type: String,
      default: null
    },
    platform: {
      type: String,
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

module.exports = userDataSchema;
