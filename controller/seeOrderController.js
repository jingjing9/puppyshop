/**
 * Created by 91275 on 2018/11/16.
 */
var seeOrderModel = require('./../model/seeOrderModel.js');
    var seeOrderController = {
        seeOrder:function (req,res) {
        var user_id = parseInt(req.query.user_id);
        seeOrderModel.seeOrder(user_id,function (err,data1) {
            if(err){
                console.log('seeOrder数据库报错')
            }else {
                console.log('seeOrder查询数据库成功');
                res.send({data:data1})
            }
        });
    },
        orderdetail:function (req,res) {
            var order_state;
           seeOrderModel.orderdetail1(req.query.order_id,function (err,data1) {
                if(err){
                    console.log('orderdetail1数据库报错')
                }else {
                  console.log('查询订单状态成功');
                    order_state = data1[0].order_state;
                }
            });
           setTimeout(function () {
               seeOrderModel.orderdetail2(req.query.order_id,function (err,data2) {
                   if(err){
                       console.log('orderdetail2数据库报错')
                   }else {
                       console.log('orderdetail2查询成功');
                       var order_appraise = order_appraise;
                       res.send({'data':data2,'order_state':order_state,'order_appraise':order_appraise})
                   }
               });
           },500);
        },
        seeAllOrder:function (req,res) {
            var user_id = parseInt(req.query.user_id);
            console.log(41,user_id)
            seeOrderModel.seeAllOrder(user_id,function (err,data1) {
                if(err){
                    console.log('seeAllOrder数据库报错')
                }else {
                    console.log('seeAllOrder查询数据库成功');
                    res.send({data:data1})
                }
            });
        },
        subReason:function (req,res) {
            var order_id = parseInt(req.query.order_id);
            var order_state = parseInt(req.query.order_state);
            seeOrderModel.subReason(order_id,req.query.order_reason,order_state,function (err,data1) {
                if(err){
                    console.log('subReason数据库报错')
                }else {
                    console.log('subReason插入数据库成功');

                }
            });

        },
        returnGoodsMoney:function (req,res) {
            var order_id = parseInt(req.query.order_id);
            console.log(15,req.query)
            seeOrderModel.returnGoodsMoney(order_id,function (err,data1) {
                if(err){
                    console.log('returnGoodsMoney数据库报错')
                }else {
                    res.send({data:data1})
                }
            });
        },
        confirm:function (req,res) {
            var order_id = parseInt(req.query.order_id);
            seeOrderModel.confirm(order_id,function (err,data1) {
                if(err){
                    console.log('confirm数据库报错')
                }else {
                    console.log('confirm数据库成功')
                }
            });
        },
        subGoodsRecommed:function (req,res) {
            console.log(req.query);
            var data2;
            var order_id = parseInt(req.query.order_id);
            var appraise_word = req.query.appraise_word;
            var appraise_des = req.query.appraise_des;
            var appraise_log = req.query.appraise_log;
            var appraise_syn = req.query.appraise_syn;
            seeOrderModel.subGoodsRecommed1(order_id,function (err,data1) {
                if(err){
                    console.log('subGoodsRecommed查询数据库报错')
                }else {
                    data2 = data1;
                    console.log('subGoodsRecommed查询数据库成功',data1)
                }
            });
          setTimeout(function () {
              for(var i=0;i<data2.length;i++){
                  var goods_id = data2[i].goods_id;
                  seeOrderModel.subGoodsRecommed2(goods_id,appraise_word,appraise_des,appraise_log,appraise_syn,function (err,data1) {
                      if(err){
                          console.log('subGoodsRecommed插入数据库报错')
                      }else {
                          console.log('subGoodsRecommed插入数据库成功')
                      }
                  });
              }
          },1000)
        },
        subReturnMove:function (req,res) {
            var order_id = req.query.order_id;
            var return_rnum = req.query.return_num;
            var return_rcom = req.query.return_com;
                    seeOrderModel.subReturnMove(order_id,return_rnum,return_rcom,function (err,data1) {
                        if(err){
                            console.log('subReturnMove数据库报错')
                        }else {
                            console.log('subReturnMove数据库成功')
                        }
                    });
        }
};
//导出模块
module.exports = seeOrderController;