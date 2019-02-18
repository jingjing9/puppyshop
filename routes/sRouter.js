//引入
var express=require('express');
var sController=require('./../controller/sController.js');

//定义的模块
var myRouter=express.Router();
myRouter.route('/myCenter').get(sController.myCenter);
myRouter.route('/myAddr').get(sController.myAddr);
myRouter.route('/deleteAddr').get(sController.deleteAddr);
myRouter.route('/personalData').get(sController.personalData);
myRouter.route('/defRevision').get(sController.defRevision);
myRouter.route('/checkPass').get(sController.checkPass);
myRouter.route('/changePass').get(sController.changePass);
myRouter.route('/getCode').get(sController.getCode);
myRouter.route('/phoneVerify').get(sController.phoneVerify);
myRouter.route('/updatePdata').get(sController.updatePdata);
myRouter.route('/saveNewaddr').get(sController.saveNewaddr);
myRouter.route('/updateAddr').get(sController.updateAddr);
myRouter.route('/addrMessage').get(sController.addrMessage);
myRouter.route('/seeAppraise').get(sController.seeAppraise);
myRouter.route('/waiteAppraise').get(sController.waiteAppraise);
myRouter.route('/systemMessage').get(sController.systemMessage);
myRouter.route('/changeHead').post(sController.changeHead);
//导出模块
module.exports=myRouter;