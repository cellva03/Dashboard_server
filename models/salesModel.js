// importing the mongoose module and create a schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
    },
    cost : {
        type: Number,
        required: true
    },  
    date: {
        type: Date,
        required: true
    }
})

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;