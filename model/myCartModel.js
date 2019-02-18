var mysql = require('mysql');
var pupy = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
})


var myCartModel = {
    add:function(con,fn){
        var sql=`INSERT INTO t_cart VALUES(null,${con.user_id},${con.goods_id},${con.c_num})`
        pupy.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    query:function(fn){
        var sql = "SELECT *FROM t_cart LEFT JOIN t_goods USING (goods_id) LEFT JOIN goods_det USING (goods_name)"
        pupy.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    remove:function(id,fn){
        var sql = `DELETE FROM t_cart WHERE goods_id = ${id}`
        pupy.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addnum:function(num,fn){
        var sql = `UPDATE t_cart SET c_num = c_num + ${num.c_num} WHERE goods_id = ${num.goods_id}`
        pupy.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    queryId:function(fn){
        var sql = `SELECT * FROM t_cart`
        pupy.query(sql,function (err,data) {
            fn(err,data);
        })
    }
}

module.exports = myCartModel;