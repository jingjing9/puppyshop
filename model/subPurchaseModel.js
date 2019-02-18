var mysql=require('mysql');

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});

var subpurchaseModel={
    subPurchase1:function (add_id,order_say,order_day,order_time,fn) {
         var sql1= 'INSERT INTO t_order (order_id,order_state,add_id,order_say,order_day,order_time) VALUES(NULL,4,'+add_id+',"'+order_say+'",+"'+order_day+'",+"'+order_time+'");';
              db.query(sql1,function (err,data) {
            fn(err,data);
        });

    },
    subPurchase2:function (user_id,data,fn2) {
        var sql2 = 'SELECT MAX(order_id) AS order_id FROM t_order;';
        db.query(sql2,function (err,data) {
            fn2(err,data);
        });
    },
    subPurchase3:function (order_id,user_id,data,fn3) {
        console.log('model',order_id);
        var sql3 = 'INSERT INTO t_orderdet VALUES';
        for(var i=0;i<data.length;i++){
            sql3 += '(NULL,'+data[i].goods_id+','+user_id+','+order_id+',0,'+data[i].c_num+'),'
        }
        var sql4 = sql3.substr(0,sql3.length-1);
        console.log(sql4);
        db.query(sql4,function (err,data) {
            fn3(err,data);
        });
    },
    subPurchase4:function (fn) {
        var sql3 = 'TRUNCATE TABLE t_orderimedi;';

        db.query(sql3,function (err,data) {
            fn(err,data);
        });
    }
};

module.exports=subpurchaseModel;
