var productDetailsModel = require('./../model/productDetailsModel.js');

var productDetailsControll = {
    
    data:function(req,res){
        
        productDetailsModel.productDetails(req.url.match(/\d+/),function(err,data){
            if(err){
                console.log('数据库报错');
            }else{
                var arr = [];
                for(var key in data[0]){
                    arr.push(key)
                }
                var arr1 = arr.splice(16);
                var arr2=[];
                for(var i = 0;i < arr1.length;i ++){
                    if(data[0][arr1[i]] !== null){
                        arr2.push(data[0][arr1[i]])
                    }
                }
                res.render('ProductDetails',{data:data,data1:arr2})
            }
        })
    }
}

module.exports = productDetailsControll;