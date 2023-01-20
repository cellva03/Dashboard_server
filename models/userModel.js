// importing the mongoose module and create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the user
const userSchema = new Schema({
    username: {
        type: String,
        required: true
      },
    lastName: { 
        type: String,
        required: true
      },
    firstName: { 
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
    },
    mobile: {
        type: Number,
        required: true
      },
    discount: {
        type: Number,
    },
    history: {
      type: Array,
    }
  });

  // Create a model for the user
const User = mongoose.model('user', userSchema);

module.exports = User;