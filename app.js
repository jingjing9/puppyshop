/**
 * Created by hejingjing on 2018/11/29.
 */
var express = require('express');//引入express框架
var favicon = require('serve-favicon');//引入图标框架
var morgan = require('morgan');//引入日志模块
var bodyParser = require('body-parser');//引入post请求的模块
var ejs = require('ejs');//引入ejs模板引擎
var app=express();//搭建服务
var cookie = require('cookie-parser');//引入cookie
var session = require('express-session');//引入session
//使用cookie
app.use(cookie());
//使用session
app.use(session({
    secret:'aaa',//一个字符串，session的签名
    name:'demo',//返回给客户端cookie的key值
    cookie:{maxAge:300000},//设置失效时间
    rolling:true,//是否更新失效时间
    resave:true//重新保存
}));

app.use(morgan('dev'));//配日志
//配置静态文件访问地址 方法一
app.use(express.static(__dirname+'/public')); //两个下划线dirname绝对路径
app.use(favicon(__dirname+'/public/favicon.ico'));//配置图标地址
//文件上传模块
var multer = require('./untils/multer.js');
//使用post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//配置视图路径
app.set('views',__dirname+'/view');
//配置html格式为模板引擎
app.engine('html',ejs.__express);
//设置模板引擎的类型
app.set('view engine','html');


// 何静
var purchase = require('./routes/purchaseRouter.js');//立即下单+付款
app.use(purchase);
var subPurchase = require('./routes/subPurchaseRouter.js');//提交订单
app.use(subPurchase);
var seeOrder = require('./routes/seeOrderRouter.js');//查看未完成订单
app.use(seeOrder);

//宋子瑜
var loginRoute = require('./routes/loginRoute.js');
app.use(loginRoute);

//唐开峰
var productListRouter = require('./routes/productListRoute.js');
var productDetailsRouter = require('./routes/productDetailsRoute.js');
var myCartRouter = require('./routes/myCartRoute.js')
app.use(productListRouter);
app.use(productDetailsRouter);
app.use(myCartRouter);




var sRoute=require('./routes/sRouter.js');
app.use(sRoute);
// app.use(bodyParser({limit:'10000kb'}));
// app.use(express.json({limit:'10000kb'}));
/*-------------短信验证-----------*/


var AV= require('leanengine');

AV.init({
    appId: 'XHmGo2oiDGXuuTB8lLQoAexI-gzGzoHsz',
    appKey: '3JMUfz82GNn4KBA8AOb2cNeC',
    masterKey: 'Bk686fd7svtX55pqhQrAETVU'
    // 控制台预设的短信签名
});
app.use(AV.express());

/*--------------------------------*/




app.listen(1234,function () {  //配置端口号
    console.log('localhost:1234/')
});



