const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },

})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;