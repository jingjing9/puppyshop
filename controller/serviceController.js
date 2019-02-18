/**
 * Created by dc on 2018/12/10.
 */

var serviceModel=require('./../model/serviceModel');

var serviceController={
    // login:function (req,res) {
    //     loginModel.login(req.query.luser,req.query.lpass,function (err,data) {
    //         if(err){
    //             console.log('数据库错误'+err);
    //         }else{
    //             if(data.length){
    //                 req.session.t_user=data[0];
    //                 console.log(req.session.t_user);
    //                 res.send({"state":0,"context":"成功"});
    //             }else{
    //                 res.send({"state":1,"context":"账号名或密码错误"});
    //             }
    //         }
    //     });
    // },
    // register:function (req,res) {
    //     loginModel.register(req.body.ruser,function (err,data) {
    //         if(err){
    //             console.log('数据库错误')
    //         }else{
    //             if(data.length){
    //                 res.send({"state":1,"context":"用户名已经存在"})
    //             }else{
    //                 loginModel.add(req.body.ruser,req.body.rpass,function (err,data) {
    //                     if(err){
    //                         console.log('数据库错误')
    //                     }else{
    //                         res.send({"state":0,"context":"成功"})
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // }
};

module.exports=serviceController;
