var mysql = require('mysql');
var pupy = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
})

var productListModel = {
    productListData:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name)"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListClassId1:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE class_id=1"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListClassId2:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE class_id=2"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListCostume:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE goods_id=2001"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListToy:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE goods_id=2002"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListThing:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE goods_id=2003"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListStaple:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE goods_id=2005"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListSnacks:function(fn){
        var sql = "SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE goods_id=2004"
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },
    productListKeyword:function(data,fn){
        var sql = `SELECT *FROM t_goods LEFT JOIN goods_det USING (goods_name) WHERE goods_name LIKE'%${data}%'`
        pupy.query(sql,function(err,data){
            fn(err,data)
        })
    },


}

module.exports = productListModel;