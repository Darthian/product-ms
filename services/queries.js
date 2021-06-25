var mongoose = require('mongoose');
var Product = mongoose.model('Product');

exports.consultListProducts = function (req) {
    return Product.find()
        .select({
            'nombre': 1,
            'idProduct': 2,
            '_id': 1
        })
}