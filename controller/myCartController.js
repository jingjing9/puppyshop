var myCartModel = require('./../model/myCartModel.js')
var myCartController = {
        add:function(req,res){
            
            var data =  req.query.data[0];
            
            myCartModel.add(data,function(err,data){
                if(err){
                    console.log('数据库报错');
                }else{
                    console.log('成功')
                }
            })
        },
        query:function(req,res){
            myCartModel.query(function(err,data){
                if(err){
                    console.log('数据库报错');
                }else{
                    res.send(data)
                }
            })
        },
        remove:function(req,res){
            var arr = req.query.data
            for(var i =0;i<arr.length;i ++){
                myCartModel.remove(arr[i],function(err,data){
                    if(err){
                        console.log('数据库报错');
                    }else{
                        console.log('删除成功');
                    }
                })
            }
            
        },
        addnum:function(req,res){
            console.log(req.query.data[0].c_num);
            myCartModel.addnum(req.query.data[0],function(err,data){
                if(err){
                    console.log('数据库报错');
                }else{
                    console.log('成功');
                    
                }
            })
        },
        queryId:function(req,res){
            myCartModel.queryId(function(err,data){
                if(err){
                    console.log('数据库报错');
                }else{
                    res.send(data);
                }
            })
        }
}
module.exports = myCartController;