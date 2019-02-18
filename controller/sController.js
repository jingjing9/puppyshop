var sModel=require('./../model/sModel.js');
var AV= require('leanengine');
var sController={
    myCenter:function (req,res) {
        res.render('personalCenter');
    },
    myAddr:function (req,res) {
        sModel.myAddr(function(err,data){
            if(err){
                console.log('数据库报错');
            }else{
                res.send({'state':1,'arr':data});
            }
        })
    },
    deleteAddr:function (req,res) {
        sModel.deleteAddr(req.query.num,function (err,data) {
            if(err){
                console.log('数据库报错');
            }else{
                sModel.myAddr(function (err,data1) {
                    if(err){
                        console.log('数据库报错');
                    }else{
                        res.send({'state':1,'arr':data1});
                    }
                })
            }
        })
    },
    personalData:function (req,res) {
        sModel.personalData(function (err,data) {
            if(err){
                console.log('数据库报错');
            }else{
                res.send({'state':1,'arr':data});
            }
        })
    },
    defRevision:function (req,res) {
        sModel.defRevision(req.query.tel,function (err,data) {
            if(err){
                console.log('数据库报错');
            }else{
                res.send({'state':1,'arr':data});
            }
        })
    },
    checkPass:function (req,res) {
       sModel.checkPass(req.query.oldpass,function (err,data) {
           if(err){
               console.log('数据库报错');
           }else{
              if (data.length){
                  res.send({'state':1});
              }else{
                  res.send({'state':0});
              }
           }
       })
    },
    changePass:function(req,res){
       sModel.changePass(req.query.newpass,function (err,data) {
           if(err){
               console.log('数据库报错');
           }else{
               res.send({'state':1});
           }
       })
    },
    getCode:function (req,res) {
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber:req.query.phone,
            name: '迅捷科技',
            op: '短信验证，恭喜您获得本公司超级无敌大礼包一份，请于今日内凭验证码在青年公寓楼下提取奖品',
            ttl: 10                     // 验证码有效时间为 10 分钟
        }).then(function(res){
            //调用成功
            console.log(1);
            res.send({'state':1})
        }, function(err){
            //调用失败
            console.log(err);
            res.send({'state':0})
        });
    },
    phoneVerify:function (req,res) {
        console.log(req.query.phone,req.query.code);
        AV.Cloud.verifySmsCode(req.query.code,req.query.phone).then(function(){
            //验证成功
            res.send({'state':1})
        }, function(err){
            //验证失败
            res.send({'state':0})
        });
    },
    updatePdata:function (req,res) {
      sModel.updatePdata(req.query.pname,req.query.time1,req.query.time2,req.query.phone,function (err,data) {
          if(err){
              console.log('数据库报错');
          }else{
              res.send({'state':1});
          }
      })
    },
    saveNewaddr:function (req,res) {
        if(req.query.isDef){
           sModel.changeDef(function (err,data) {
               if(err){
                   console.log('数据库报错');
               }else{
                   sModel.saveNewaddr(req.query.saveName,req.query.saveTel,req.query.saveAddr,req.query.isDef,function (err,data) {
                       if(err){
                           console.log('数据库报错');
                       }else{
                           res.send({'state':1});
                       }
                   });
               }
           })
        }else{
            sModel.saveNewaddr(req.query.saveName,req.query.saveTel,req.query.saveAddr,req.query.isDef,function (err,data) {
                if(err){
                    console.log('数据库报错');
                }else{
                    res.send({'state':1});
                }
            });
        }

    },
    updateAddr:function (req,res) {
        if(req.query.isDef){
            sModel.changeDef(function (err,data) {
                if(err){
                    console.log('数据库报错');
                }else{
                    sModel.updateAddr(req.query.id,req.query.newName,req.query.newTel,req.query.newAddr,req.query.isDef,function (err,data) {
                        if(err){
                            console.log('数据库报错 ');
                        }else {
                            res.send({'state':1});
                        }
                    });
                }
            })

        }else {
            sModel.updateAddr(req.query.id,req.query.newName,req.query.newTel,req.query.newAddr,req.query.isDef,function (err,data) {
                if(err){
                    console.log('数据库报错 ');
                }else {
                    res.send({'state':1});
                }
            });
        }
    },
    addrMessage:function (req,res) {
      sModel.addrMessage(req.query.num,function (err,data) {
          if(err){
              console.log('数据库报错 ');
          }else {
              res.send({'state':1,'arr':data});
          }
      })
    },
    seeAppraise:function (req,res) {
        sModel.seeAppraise(function (err,data) {
            if(err){
                console.log(12,'数据库报错');
            }else{
                res.send({'state':1,'arr':data});

            }
        })
    },
    waiteAppraise:function (req,res) {
       sModel.waiteAppraise(function (err,data) {
           if(err){
               console.log('数据库报错');
           }else{
               res.send({'state':1,'arr':data});
               console.log(data);
           }
       }) 
    },
    systemMessage:function (req,res) {
       sModel.systemMessage(function (err,data) {
           if(err){
               console.log('数据库报错');
           }else{
               console.log(data);
               res.send({'state':1,'arr':data});
           }
       })
    },
    changeHead:function (req,res) {

        sModel.changeHead(req.body.url,function (err,data) {

           if(err){
               console.log('数据库报错');
           }else{
               console.log(1);
               res.send({'state':1});
           }
        })
    }
};
module.exports=sController;