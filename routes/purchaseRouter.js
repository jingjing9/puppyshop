/**
 * Created by 91275 on 2018/11/16.
 */

//引入express
var express = require('express');
//创建router对象
var myRouter = express.Router();
//引入自定义的控制层的模块
var purchaseController = require('./../controller/purchaseController.js');
//控制路由
// post方法
myRouter.route('/purchase').get(purchaseController.purchase);//调用loginController模块的regist方法
myRouter.route('/orderimdet').get(purchaseController.orderimdet);//调用loginController模块的regist方法
//导出模块
module.exports = myRouter;