const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    categoryID : {
        type: Number,
        unique: true
    },
    categoryName : {
        type: String,
        required: true
    },
    productID : {
        type: Number,
        unique: true
    },
    productName : {
        type: String,
        unique: true
    }, 
});

mongoose.model('Item', schema);

