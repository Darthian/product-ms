var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    modelResources = require('./model/ProductModel'),
    ProductCreationCtrl = require('./controllers/ProductCreation'),
    ProductFindingCtrl = require('./controllers/ProductFinding');

const connectionURL = 'mongodb://nodejsuser:Colombia1%2A@127.0.0.1:27017/';
const databaseName = 'products?authSource=resources&gssapiServiceName=mongodb';

mongoose.set('bufferCommands', false);
mongoose.connect(connectionURL + databaseName,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        console.log('Connection parameters: ', connectionURL + databaseName);
        if (err) throw err;
        console.log('Connected to Database');
    });

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

// Health Route
var router = express.Router();
router.get('/health', function (req, res) {
    res.send("{\"ok\":\"ok\"}");
});

// API routes
var productsServices = express.Router();
productsServices.route('/product')
.post(ProductCreationCtrl.addResource)
.get(ProductFindingCtrl.findAllProducts);

app.use(router);
app.use('/api',productsServices);

// Start server
app.listen(3002, function () {
    console.log("Node server running on http://localhost:3002");
});