var mongoose = require('mongoose');
var Product = mongoose.model('Product');

exports.mapFullDocument = function (req) {
    return new Product({
        idProduct: req.body.idProduct ? req.body.idProduct : "",
        name: req.body.name ? req.body.name : "",
        unityMeasure: req.body.unityMeasure ? req.body.unityMeasure : "",
        measure: req.body.measure ? req.body.measure : "",
        imageUrl: req.body.imageUrl ? req.body.imageUrl : "",
        price: req.body.price ? req.body.price : req.body.price,
    });
}