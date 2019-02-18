var express = require('express');
var productListControll = require('../controller/productListControll.js')
var productListRouter = express.Router();


productListRouter.route('/productList').get(productListControll.getData);


productListRouter.route('/thing').get(productListControll.getThing); // 分类-宠物用品
productListRouter.route('/food').get(productListControll.getFood); //分类-宠物食品
productListRouter.route('/costume').get(productListControll.getCostume); // 宠物服饰
productListRouter.route('/toy').get(productListControll.getToy); //宠物玩具
productListRouter.route('/thing1').get(productListControll.getThing1);//宠物用品
productListRouter.route('/staple').get(productListControll.getStaple);//宠物主食
productListRouter.route('/snacks').get(productListControll.getSnacks);//宠物零食

productListRouter.route('/keyword').get(productListControll.getKeyword);//搜索关键字










module.exports= productListRouter;