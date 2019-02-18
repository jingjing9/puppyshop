/**
 * Created by 91275 on 2018/11/16.
 */

//引入express
var express = require('express');
//创建router对象
var myRouter = express.Router();
//引入自定义的控制层的模块
var seeOrderController = require('./../controller/seeOrderController.js');
//控制路由
// post方法
myRouter.route('/seeOrder').get(seeOrderController.seeOrder);
myRouter.route('/orderdetail').get(seeOrderController.orderdetail);
myRouter.route('/seeAllOrder').get(seeOrderController.seeAllOrder);
myRouter.route('/subReason').get(seeOrderController.subReason);
myRouter.route('/returnGoodsMoney').get(seeOrderController.returnGoodsMoney);
myRouter.route('/confirm').get(seeOrderController.confirm);
myRouter.route('/subGoodsRecommed').get(seeOrderController.subGoodsRecommed);
myRouter.route('/subReturnMove').get(seeOrderController.subReturnMove);
//导出模块
module.exports = myRouter;