var mysql=require('mysql');

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});

var seeOrderModel={
    seeOrder:function (user_id,fn) {
        var sql1 = 'SELECT user_id,order_id,order_num,order_com,order_state,pic1,goods_name,spe1_val,spe2_val,order_buynum,now_price\n' +
            'FROM t_orderdet\n' +
            'LEFT JOIN t_order\n' +
            'USING(order_id)\n' +
            'LEFT JOIN t_goods\n' +
            'USING (goods_id)\n' +
            'LEFT JOIN goods_det\n' +
            'USING (goods_name)\n' +
            'WHERE user_id='+user_id+' && order_state NOT IN (5,1) ORDER BY order_id;';
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
    },
    orderdetail1:function (order_id,fn) {
        var sql2 = 'SELECT order_state\n' +
            'FROM t_order\n' +
            'WHERE order_id = '+order_id+';';
        db.query(sql2,function (err,data) {
            fn(err,data);
        });
    },
    orderdetail2:function (order_id,fn) {
        var sql3 = 'SELECT goods_id,order_id,pic1,goods_name,order_buynum,order_com,order_num,order_say,now_price,add_person,add_tel,a_address,order_appraise\n' +
            'FROM t_orderdet\n' +
            'LEFT JOIN t_order\n' +
            'USING(order_id)\n' +
            'LEFT JOIN t_goods\n' +
            'USING (goods_id)\n' +
            'LEFT JOIN goods_det\n' +
            'USING (goods_name)\n' +
            'LEFT JOIN t_address\n' +
            'USING (add_id)\n' +
            'WHERE order_id='+order_id+';';
        db.query(sql3,function (err,data) {
            fn(err,data);
        });
    },
    seeAllOrder:function (user_id,fn) {
        var sql1 = 'SELECT user_id,order_id,order_state,pic1,order_num,order_com,goods_name,spe1_val,spe2_val,order_buynum,now_price\n' +
            'FROM t_orderdet\n' +
            'LEFT JOIN t_order\n' +
            'USING(order_id)\n' +
            'LEFT JOIN t_goods\n' +
            'USING (goods_id)\n' +
            'LEFT JOIN goods_det\n' +
            'USING (goods_name)\n' +
            'WHERE user_id='+user_id+' ORDER BY order_id;';
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
    },
    subReason:function (order_id,order_reason,order_state,fn) {
        var sql1 = 'UPDATE t_order SET order_reson="'+order_reason+'",order_return=1,order_state='+order_state+' WHERE order_id = '+order_id+';';
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
    },
    returnGoodsMoney:function (order_id,fn) {
        var sql1 = 'SELECT order_return,order_rnum,order_rcom,order_state FROM t_order WHERE order_id='+order_id+';';
        console.log(15,sql1)
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
    },
    confirm:function (order_id,fn) {
        var sql1 = 'UPDATE t_order SET order_state=5 WHERE order_id='+order_id+';';
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
    },
    subReturnMove:function (order_id,return_rnum,return_rcom,fn) {
        var sql1 = `UPDATE t_order SET order_rnum=${return_rnum} ,order_rcom= '${return_rcom}',order_return=4 WHERE order_id=${order_id};`;
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
    },
    subGoodsRecommed1:function (order_id,fn) {
        var sql1 = `SELECT DISTINCT goods_id,order_id
FROM t_orderdet
LEFT JOIN t_order
USING(order_id)
LEFT JOIN t_appraise
USING (goods_id)
WHERE order_id=${order_id};`;
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
    },
    subGoodsRecommed2:function (goods_id,appraise_word,appraise_des,appraise_log,appraise_syn,fn) {
        var sql1 = `UPDATE t_appraise SET appraise_word='${appraise_word}',appraise_des=${appraise_des},appraise_log=${appraise_log},appraise_syn=${appraise_syn} WHERE goods_id=${goods_id};`;
        db.query(sql1,function (err,data) {
            fn(err,data);
        });
      console.log(sql1)
    },
};

module.exports=seeOrderModel;
