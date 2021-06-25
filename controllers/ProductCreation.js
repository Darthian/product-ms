var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var ProductMappingCtrl = require('../mappers/ProductMapping');

exports.addResource = (req, res) => {
    if (!req.body.idProduct) return res.send(400, 'no hay un id de producto');
    if (!req.body.name) return res.status(400).send(JSON.stringify({ 'response': 'el nombre de la receta es obligatorio' }));
    if (!req.body.unityMeasure) return res.status(400).send(JSON.stringify({ 'response': 'la unidad de medida es obligatoria' }));
    if (!req.body.measure) return res.status(400).send(JSON.stringify({ 'response': 'la medida es obligatoria' }));
    if (!req.body.imageUrl) return res.status(400).send(JSON.stringify({ 'response': 'la imagen es obligatoria' }));
    if (!req.body.price) return res.status(400).send(JSON.stringify({ 'response': 'el precio es obligatorio' }));
    Product.findOne({
        'idProduct': req.body.idProduct,
        'name': req.body.name
    }, ((err, doc) => {
        if (doc !== null && doc !== undefined) {
            return res.status(409).send(JSON.stringify({ 'response': 'ya existe un producto registrado con esos datos' }));
        }
        var resourceDocument = ProductMappingCtrl.mapFullDocument(req);
        resourceDocument.save(function (err, resourceDocument) {
            if (err) return res.status(500).send(JSON.stringify({ 'response': err.message }));
            res.status(200).jsonp(resourceDocument);
        });
    }));
};