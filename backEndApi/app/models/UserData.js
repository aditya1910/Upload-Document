// Here is booking collection schema is defined
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userDataSchema = new Schema(
  {
    // userId: {
    //   type: String,
    //   default: null
    // },
    // platform: {
    //   type: String,
    //   default: null,
    // },
    firstName: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },
    middleName: {
      type: String,
      default: null,
      trim: true,
      index: true,
    },
    lastName: {
      type: String,
      default: null,
      trim: true,
      index: true,
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
