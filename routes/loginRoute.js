//引入
var express=require('express');
var loginController=require('./../controller/loginController.js');
//定义的模块
var myRouter=express.Router();

myRouter.route('/login').get(loginController.login);

myRouter.route('/register').post(loginController.register);


myRouter.route('/pageone').get(loginController.pageone);


myRouter.route('/a').get(loginController.a);

myRouter.route('/clear_session').get(loginController.clear_session);

//首页
myRouter.route('/picIndex').get(loginController.picIndex);

myRouter.route('/phoneLogin').get(loginController.phoneLogin);

myRouter.route('/phoneLogin2').get(loginController.phoneLogin2);




//导出模块
module.exports=myRouter;