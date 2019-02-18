var mysql=require('mysql');

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});

var purchaseModel={
    purchase1:function (user_id,fn) {
        var sql = 'SELECT add_id,add_person,add_tel,a_address\n' +
            'FROM t_address\n' +
            'WHERE user_id = '+user_id+';';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    purchase2:function (user_id,fn) {
        var sql = ' SELECT DISTINCT goods_id,user_id,goods_name,pic1,c_num,now_price\n' +
            ' FROM t_orderimedi\n' +
            ' WHERE user_id='+user_id+';';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    orderimdet1:function (fn) {
        var sql = ' TRUNCATE TABLE t_orderimedi';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    orderimdet:function (arr,fn) {
        var sql = 'INSERT INTO t_orderimedi VALUES';
        for(var i=0;i<arr.length;i++){
          sql += `(NULL,${parseInt(arr[i].goods_id)},${parseInt(arr[i].user_id)},'${arr[i].goods_name}','${arr[i].pic1}',${parseInt(arr[i].c_num)},${parseInt(arr[i].now_price)}),`;
        }
        var sql2 = sql.substr(0,sql.length-1);
        console.log(sql2,39)
        db.query(sql2,function (err,data) {
            fn(err,data);
        })
    }
};

module.exports=purchaseModel;
