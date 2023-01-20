// importing the mongoose module and create a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the product
const productSchema = new Schema({
    title: {
        type: String,
        required: true
      },
    description: {
      type: String,
      required: true,
    },
    ProductImage: {
      data: Buffer,
      contentType: String
    },
    price: {
        type: String,
        required: true
      },
    stock: {
        type: Number,
        required: true
        },
    category: {
        type: String,
        required: true
        }
  });

  // Create a model for the product
const Product = mongoose.model('product', productSchema);

module.exports = Product;