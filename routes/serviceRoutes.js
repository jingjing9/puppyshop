/**
 * Created by dc on 2018/12/10.
 */


//引入express
var express = require('express');
//创建router对象
var myRouter = express.Router();
//引入自定义的控制层的模块
var subPurchaseController = require('./../controller/subPurchaseController.js');
//控制路由
// post方法
myRouter.route('/service').get(serviceController.subPurchase);//调用serviceController模块的regist方法
//导出模块
module.exports = myRouter;