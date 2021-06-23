var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
    idProduct: String,
    name: String,
    unityMeasure: String,
    measure: Number,
    imageUrl: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);