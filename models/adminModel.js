// Importing mongoose and create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the admin
const adminSchema = new Schema({
    username: {
        type: String,
        required: true
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    }
  });

// Create a model for the admin
const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;