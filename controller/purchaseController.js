/**
 * Created by 91275 on 2018/11/16.
 */
var purchaseModel = require('./../model/purchaseModel.js');
var purchaseController = {
    purchase:function (req,res) {
        var arr = req.query.data;
        purchaseModel.orderimdet1(function (err,data1) {
            if(err){
                console.log('清空orderimdet1数据库报错')
            }else {
                console.log('清空orderimdet1数据库成功')
            }
        });
        purchaseModel.orderimdet(arr,function (err,data1) {
              if(err){
                  console.log('orderimdet2数据库报错',arr)
              }else {
                  console.log('orderimdet2数据库插入成功')
              }
        });

    },
    orderimdet:function (req,res) {//渲染页面
       var user_id = 1001;
        var arr;
      /* var arr  = [{'goods_id':'2001','user_id':'1001','goods_name':'大狗狗狗粮','pic1':'/images/Orderimmedtimg2.jpg','c_num':'1','now_price':'89'},
            {'goods_id':'2002','user_id':'1001','goods_name':'大狗狗狗粮','pic1':'/images/Orderimmedtimg2.jpg','c_num':'1','now_price':'30'}];
        //数组，存一组json对象，商品id，用户id,商品标题，展示图片，购买数量，实际销售价格*/
     purchaseModel.purchase1(user_id,function (err,data1) {
         if(err){
             console.log('purchase数据库报错')
         }else {
             arr = data1;
         }
     });
        purchaseModel.purchase2(user_id,function (err,data2) {
            if(err){
                console.log('purchase数据库报错')
            }else {
                var arr2 = data2;
                res.render('OrderImmediately',{
                    data:arr2,
                    addr:arr,
                    user_id:user_id
                });
            }
        });
    }
};
//导出模块
module.exports = purchaseController;