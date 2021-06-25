var mongoose = require('mongoose');
var Product = mongoose.model('Product');

exports.findAllProducts = (req, res) => {
    Product.find((err, products) => {
        if (err) return res.status(500).send(JSON.stringify({ 'response': err.message }));
        res.status(200).jsonp(products);
    });
};