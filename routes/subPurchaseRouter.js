/**
 * Created by 91275 on 2018/11/16.
 */

//引入express
var express = require('express');
//创建router对象
var myRouter = express.Router();
//引入自定义的控制层的模块
var subPurchaseController = require('./../controller/subPurchaseController.js');
//控制路由
// post方法
myRouter.route('/subPurchase').get(subPurchaseController.subPurchase);//调用loginController模块的regist方法
//导出模块
module.exports = myRouter;