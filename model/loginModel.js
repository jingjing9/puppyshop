var mysql=require('mysql');

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'puppyshop'
});

var loginModel={
    login:function (user,pass,fn) {

        var sql='SELECT * FROM t_user WHERE u_user="'+user+'" AND u_password="'+pass+'";';

        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    register:function (user,fn) {

        var sql1='SELECT * FROM t_user WHERE u_user="'+user+'";';

        db.query(sql1,function (err,data) {
            fn(err,data)
        })
    },
    add:function (name,user,pass,fn) {
        var sql2 = 'INSERT INTO t_user VALUES(null,"'+name+'",null,null,null,"' + user + '","' + pass + '");';

        db.query(sql2, function (err, data) {
            fn(err, data)
        })
    },
    picIndex:function(fn){
        var sql = "SELECT * FROM food_articles"
        db.query(sql,function(err,data){
            fn(err,data)
        })
    }


};
module.exports=loginModel;
