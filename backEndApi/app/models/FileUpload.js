// Here is booking collection schema is defined
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const fileUploadSchema = new Schema(
  {
    fileName: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
  {
    strict: false,
  },
);

module.exports = fileUploadSchema;
