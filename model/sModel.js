var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});
var sModel={
    myAddr:function (fn) {

        var sql='SELECT * FROM t_address WHERE user_id=1001;';

        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    deleteAddr:function (num,fn) {
     var sql="DELETE FROM t_address WHERE add_id='"+num+"';";
         db.query(sql,function (err,data){
            fn(err,data);
        });
    },
    personalData:function (fn) {
        var sql='SELECT * FROM t_user WHERE user_id=1001;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    defRevision:function (tel,fn) {
        var sql='SELECT * FROM t_user WHERE u_user="'+tel+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    checkPass:function (pass,fn) {
       var sql='SELECT * FROM t_user WHERE user_id=1001 AND u_password='+pass+';';
       db.query(sql,function (err,data) {
           fn(err,data);
       })

    },
    changePass:function (npass,fn) {
        var sql='UPDATE t_user SET u_password='+npass+' WHERE user_id=1001;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    updatePdata:function (name,pettime,petbirth,tel,fn) {
        var sql='UPDATE t_user SET user_name="'+name+'",pet_time="'+pettime+'",pet_birth="'+petbirth+'",u_user="'+tel+'" WHERE user_id=1001;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    saveNewaddr:function (name,tel,addr,def,fn) {
     var sql="INSERT INTO t_address VALUES(NULL,'"+name+"','"+tel+"','"+addr+"',"+def+",1001);";
        db.query(sql,function (err,data) {
            console.log(sql);
            fn(err,data);
        })
    },
    changeDef:function (fn) {
        var sql="UPDATE t_address SET is_def=0 WHERE user_id=1001;";
        db.query(sql,function (err,data) {

            fn(err,data);
        })
    },
    updateAddr:function (id,name,tel,addr,def,fn) {
       var sql="UPDATE t_address SET add_person='"+name+"',add_tel="+tel+",a_address='"+addr+"',is_def="+def+" WHERE add_id="+id+";";
       db.query(sql,function (err,data) {
           fn(err,data);
       })
    },
    addrMessage:function (number,fn) {
        var sql="SELECT *FROM t_address WHERE add_id="+number+";";
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    seeAppraise:function (fn) {
       var sql=`SELECT any_value(goods_name) AS goods_name,
any_value(goods_id) AS goods_id,
any_value(t_appraise.user_id) AS user_id,
any_value(appraise_word) AS appraise_word,
any_value(appraise_des) AS appraise_des,
any_value(order_buynum) AS order_buynum,
any_value(pre_price) AS pre_price,
any_value(now_price) AS now_price,
any_value(pic1) AS pic1
FROM t_orderdet
LEFT JOIN t_goods
USING (goods_id)
LEFT JOIN goods_det
USING (goods_name)
LEFT JOIN t_appraise
USING (goods_id)
WHERE t_orderdet.user_id=1001 && order_appraise=1 && t_appraise.user_id=1001 GROUP BY goods_id;`;
        console.log(sql,90)
       db.query(sql,function (err,data) {
           fn(err,data);
       })
    },
    waiteAppraise:function (fn) {
        var sql='SELECT goods_name,goods_id,order_buynum,pre_price,now_price,pic1,user_id\n' +
            'FROM t_order\n' +
            'LEFT JOIN t_orderdet\n' +
            'USING (order_id)\n' +
            'LEFT JOIN t_goods\n' +
            'USING (goods_id)\n' +
            'LEFT JOIN goods_det\n' +
            'USING (goods_name)\n' +
            'WHERE t_orderdet.user_id=1001 && order_appraise=0 && order_state=5';
        console.log(sql,105)
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    systemMessage:function (fn) {
        var sql=`SELECT any_value(goods_name) AS goods_name,any_value(pic1) AS pic1,any_value(user_id) AS user_id,any_value(order_num) AS order_num,any_value(order_return) AS order_return
                        FROM t_order
                        LEFT JOIN t_orderdet
                        USING (order_id)
                        LEFT JOIN t_goods
                        USING (goods_id)
                        LEFT JOIN goods_det
                        USING (goods_name)
                        WHERE t_orderdet.user_id=1001 && order_return>0
                        GROUP BY order_return;`;
        console.log(sql,119)
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    changeHead:function (pic,fn) {
       var sql="UPDATE t_user SET user_pic='"+pic+"' WHERE user_id=1001;";
       db.query(sql,function (err,data) {
           fn(err,data);
       })
    }
};
module.exports=sModel;