var express = require('express');
var productDetailsControll = require('../controller/productDetailsControll.js')
var productDetailsRouter = express.Router();

productDetailsRouter.route('/ProductDetails.html').get(productDetailsControll.data);

module.exports= productDetailsRouter;