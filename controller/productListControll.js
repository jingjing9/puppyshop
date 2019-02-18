var productListModel = require('./../model/productListModel.js');

var productListControll = {
    getData:function(req,res){
        productListModel.productListData(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getThing:function(req,res){
        productListModel.productListClassId1(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getFood:function(req,res){
        productListModel.productListClassId2(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getCostume:function(req,res){
        productListModel.productListCostume(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getToy:function(req,res){
        productListModel.productListToy(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getThing1:function(req,res){
        productListModel.productListThing(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getStaple:function(req,res){
        productListModel.productListStaple(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getSnacks:function(req,res){
        productListModel.productListSnacks(function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },
    getKeyword:function(req,res){
        productListModel.productListKeyword(req.query.keyword,function (err, data) {
            if(err){
                console.log('数据库报错')
            }else{
                res.send(data)
            }
        })
    },


}

module.exports = productListControll;