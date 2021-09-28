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
app.use(express.json());
app.use(express.urlencoded());
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

// API mock
productsServices.route('/mockFecho')
.get(ProductFindingCtrl.mock);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(router);
app.use('/api',productsServices);

// Start server
app.listen(3002, function () {
    console.log("Node server running on http://localhost:3002");
});