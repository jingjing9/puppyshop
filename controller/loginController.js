var loginModel=require('./../model/loginModel.js');
var AV= require('leanengine');
var loginController={
    login:function (req,res) {
        loginModel.login(req.query.luser,req.query.lpass,function (err,data) {
            if(err){
                console.log('数据库错误'+err);
            }else{
                if(data.length){
                    req.session.msg=data[0];
                    console.log(req.session.msg);
                    res.send({"state":0,"context":"成功"});
                }else{
                    res.send({"state":1,"context":"账号名或密码错误"});
                }
            }
        });
    },
    register:function (req,res) {
        loginModel.register(req.body.ruser,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                if(data.length){
                    res.send({"state":1,"context":"用户名已经存在"})
                }else{
                    loginModel.add(req.body.rname,req.body.ruser,req.body.rpass,function (err,data) {
                        if(err){
                            console.log('数据库错误')
                        }else{
                            // res.send(req.body.rname)
                            res.send({"state":0,"context":"成功"})
                        }
                    });
                }
            }
        });
    },

    pageone:function(req,res){

        res.render('index')

    },
    a:function (req,res) {
         console.log(req.session.msg,11111111111111111111111111);
        if(req.session.msg){
            res.send({error:0,user:req.session.msg})
        }else {
            res.send({error:1})
        }
    },
    clear_session:function (req,res) {
        req.session.destroy()
    },

    picIndex:function (req,res) {
        loginModel.picIndex(function (err,data) {
            if(err){
                console.log('数据库错误')
            }else {
                res.send(data)
            }
        })
    },
    phoneLogin:function (req,res) {
        console.log(req.query.phone);
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber:req.query.phone,
            name: '伯爵网咖',
            op: '会员日 充多少送多少',
            ttl: 10                     // 验证码有效时间为 10 分钟
        }).then(function(res){
            //调用成功
            console.log(res);
            res.send({error:0})
        }, function(err){
            //调用失败
            console.log(err);
            res.send({error:1})
        });
    },
    phoneLogin2:function (req,res) {
        console.log(req.query.phone,req.query.code);
        AV.Cloud.verifySmsCode(req.query.code,req.query.phone).then(function(){
            //验证成功
            res.send({error:0})
        }, function(err){
            //验证失败
            res.send({error:1})
        });
    },

};

module.exports=loginController;
