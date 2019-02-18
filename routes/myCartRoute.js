var myCartController = require('./../controller/myCartController.js')
var express = require('express');
var myCartRouter = express.Router();

myCartRouter.route('/myCart').get(myCartController.add);
myCartRouter.route('/myCartNum').get(myCartController.addnum); //添加数量
myCartRouter.route('/CartId').get(myCartController.queryId);  //查找id

myCartRouter.route('/Cart').get(myCartController.query);
myCartRouter.route('/remove').get(myCartController.remove);


module.exports = myCartRouter;