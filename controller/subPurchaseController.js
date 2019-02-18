/**
 * Created by 91275 on 2018/11/16.
 */
var subPurchaseModel = require('./../model/subPurchaseModel.js');
var subPurchaseController = {
    subPurchase:function (req,res) {
       var data =  req.query.data1;//数组里存json对象
/*        console.log(data[0]);*/
        /*'goods_id':goods_id,
            'goods_name':goods_name,
            'c_num':c_num,
            'now_price':now_price*/
       var add_id = req.query.add_id;//地址编号 只传1个
        var user_id = req.query.user_id;//用户id 只传1个
        var order_say = req.query.order_say;//用户留言，没有为null 只传1个
        var order_id = 0;
        subPurchaseModel.subPurchase4(function (err,data1) {
            if(err){
                console.log('subPurchase4数据库报错')
            }else {
                console.log('清空t_orderimedi表成功')
            }
        });
            subPurchaseModel.subPurchase1(add_id,order_say,req.query.order_day,req.query.order_time,function (err,data1) {
            if(err){
                console.log('subPurchase1数据库报错')
            }else {
               console.log('插入事件t_order表成功')
            }
        });
        subPurchaseModel.subPurchase2(user_id,data,function (err,data2) {
            if(err){
                console.log('subPurchase2数据库报错')
            }else {
                console.log('查询order_id成功');
                order_id = data2[0].order_id;
            }
        });
        setTimeout(function () {
            subPurchaseModel.subPurchase3(order_id,user_id,data,function (err,data3) {
                if(err){
                    console.log('subPurchase3数据库报错')
                }else {
                    console.log('插入t_orderdet表成功');
                    res.send({'order_id':order_id});//发送订单编号
                }
            })
        },1000);
    }
};
//导出模块
module.exports = subPurchaseController;