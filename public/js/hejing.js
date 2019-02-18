$(function () {
    /*显示查看订单*/
    function getSeeOrder() {
        var rorder_state = 4;
        var order_return = 1;
        var see_showlist = document.getElementById('see_showlist');
        $.ajax({
            url:'/seeOrder',
            success:function (res) {
                var i=0;
                var arr1 = [];
                while(i<res.data.length-1){
                    if(res.data[i].order_id==res.data[i+1].order_id){
                       var json1 = res.data[i];
                       var json2 = res.data[i+1];
                       var arr=[];
                       arr.push(json1);
                       arr.push(json2);
                        arr1.push(arr);
                        i+=2;

                    }else {
                        var json = res.data[i];
                        var arr=[];
                        arr.push(json);
                        arr1.push(arr);
                        i+=1;
                    }
                }
                var str ='';
                for(var j=0;j<arr1.length;j++){
                    var price=0;
                     str += '<li class="list1">\n' +
                        '<p class="title5">订单编号：<span class="seeGorder_id">'+arr1[j][0].order_id+'</span></p>\n';
                    for(var n=0;n<arr1[j].length;n++){
                        price += parseInt(arr1[j][n].now_price);
                            str+='<ul class="clearfix">\n' +
                            '<li><img src="..'+arr1[j][n].pic1+'"></li>\n' +
                            '<li> <p class="title6">'+arr1[j][n].goods_name+'</p></li>\n' +
                            '<li><p class="title4"><span>'+arr1[j][n].spe1_val+'</span><span>'+arr1[j][n].spe2_val+'</span><span>x</span><span>'+arr1[j][n].order_buynum+'</span></p></li>\n' +
                            '</ul>';
                    }
                    str+=' </li><div class="liFoot">\n' +
                        '<span>实付款：</span>\n' +
                        '<span class="money2">￥'+price+'.00</span>';
                    if(arr1[j][0].order_state==2||arr1[j][0].order_state==3){
                        rorder_state = arr1[j][0].order_state;
                        str += '<div class="seeOrderbtn return" data_index="'+arr1[j][0].order_id+'">退款中</div><div class="seeOrderbtn seeMove">查看物流</div></div>';
                    }else {
                        rorder_state = 4;
                        str += '<div class="seeOrderbtn confimTake" data_index="'+arr1[j][0].order_id+'">确认收货</div><div class="seeOrderbtn applyReturn"data_index="'+arr1[j][0].order_id+'">申请退款</div><div class="seeOrderbtn seeMove">查看物流</div></div>';
                    }
                }
                see_showlist.innerHTML = str;
                /*点击订单列表跳转查看详情*/
                $('#see_showlist').on('click','.list1',function () {
                    var norder_id = parseInt($(this).find('.seeGorder_id').html());
                    sessionStorage.norder_id=norder_id;
                    sessionStorage.page_id=3;
                    window.location.href = './../pages/orderdetail.html'; //打开center订单详情页
                    seeorderdetail();
                })
                /*点击退款按钮*/
               $('#see_showlist').on('click','.applyReturn',function () {
                   var Rorder_id = $(this).attr('data_index');
                   $('.returnmodel').fadeIn();
                   sessionStorage.Rorder_id=Rorder_id;//存储要退款的订单
                    $('#returngoods').on('click',function () {
                        order_return = 2;//退货
                        sessionStorage.order_return = order_return;
                        $('#pc-content>div').css({'display':'none'});
                        $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    });
                    $('#returnmoney').on('click',function () {
                        order_return = 3;//仅退款
                        sessionStorage.order_return = order_return;
                        $('#pc-content>div').css({'display':'none'});
                        $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    });
                   $('.close').on('click',function () {
                       $('.returnmodel').fadeOut();
                   })
               });
                /*点击退款中查看退款状态*/
                $('#see_showlist').on('click','.return',function () {
                    /*点击退款按钮时发送请求，获取当前order_return状态值*/
                    var order_id2 = $(this).attr('data_index');//获取当前点击了退款订单的order_id
                    sessionStorage.order_id2 = order_id2;
                    window.location.href = './../pages/returngoods.html';//跳转个人中心退款进度页面
                })
            }
        })
    }
  $('#seeGorder').onclick = getSeeOrder();

    /*查看全部订单的接口函数 全局函数*/
    function getSeeAllOrder() {
        var see_alllist = document.getElementById('AllOrder');
        $.ajax({
            url:'/seeAllOrder',
            success:function (res) {
                var i=0;
                var arr1 = [];
                while(i<res.data.length-1){
                    if(res.data[i].order_id==res.data[i+1].order_id){
                        var json1 = res.data[i];
                        var json2 = res.data[i+1];
                        var arr=[];
                        arr.push(json1);
                        arr.push(json2);
                        arr1.push(arr);
                        i+=2;
                    }else {
                        var json = res.data[i];
                        var arr=[];
                        arr.push(json);
                        arr1.push(arr);
                        i+=1;
                    }
                }
                var str ='';
                for(var j=0;j<arr1.length;j++){
                    str += '<li class="list1">\n' +
                        '<p class="title5">订单编号：<span class="seeGorder_id">'+arr1[j][0].order_id+'</span></p>\n';
                    for(var n=0;n<arr1[j].length;n++){
                        var price=0;
                        price += parseInt(arr1[j][n].now_price);
                        str+='<ul class="clearfix">\n' +
                            '<li><img src="..'+arr1[j][n].pic1+'"></li>\n' +
                            '<li> <p class="title6">'+arr1[j][n].goods_name+'</p></li>\n' +
                            '<li><p class="title4"><span>'+arr1[j][n].spe1_val+'</span><span>'+arr1[j][n].spe2_val+'</span><span>x</span><span>'+arr1[j][n].order_buynum+'</span></p></li>\n' +
                            '</ul>';
                    }
                    str+='</li>';
                }
                see_alllist.innerHTML = str;
                $('#AllOrder').on('click','.list1',function () {
                    var norder_id = parseInt($(this).find('.seeGorder_id').html());
                       sessionStorage.norder_id=norder_id;
                       sessionStorage.page_id=3;
                       window.location.href = './../pages/orderdetail.html'; //打开center
                       seeorderdetail();
                })
            }
        })
    }
    $('#seeAllorder').onclick = getSeeAllOrder();





    /*查看订单详情的接口函数 全局函数*/
   function seeorderdetail() {
       var order_return = 1;
       var norder_id = sessionStorage.norder_id;//点击某个订单和立即下单时存储一个order_id
       var orderdetail2 = document.getElementById('orderdetail2');
        $.ajax({
            url:'/orderdetail',
            data:{
                'order_id':norder_id
            },
            success:function (res) {
                var sumPrice=0;
                var str = '    <p class="title1">查看订单详情</p>\n' +
                    '    <div id="datilhead" class="clearfix">\n' +
                    '        <div class="first">\n' +
                    '            <p class="title2">收货地址</p>\n' +
                    '            <p id="orderAddr"><span>'+res.data[0].add_person+'</span><span>18565336925</span><span>四川省成都市武侯区天府三街253号</span></p>\n' +
                    '        </div>\n' +
                    '        <div class="second">\n' +
                    '            <p class="title2">买家留言</p>\n' +
                    '            <p id="orderSay">'+res.data[0].order_say+'</p>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div id="goodli">\n' +
                    '        <p class="title2">商品信息</p>\n' +
                    '        <ul id="list1">\n' +
                    '            <li id="title8">\n' +
                    '                <ul class="clearfix firset">\n' +
                    '                    <li>&nbsp;</li>\n' +
                    '                    <li>描述</li>\n' +
                    '                    <li>购买数量</li>\n' +
                    '                    <li>配送方式</li>\n' +
                    '                    <li>金额</li>\n' +
                    '                </ul>\n' +
                    '            </li>';
               for(var i=0;i<res.data.length;i++){
                   sumPrice += parseInt(res.data[i].now_price);
                   str +='<li class="detaillist clearfix">\n' +
                       '                <ul class="clearfix">\n' +
                       '                    <li><img src="..'+res.data[i].pic1+'"></li>\n' +
                       '                    <li class="descriptname">'+res.data[i].goods_name+'</li>\n' +
                       '                    <li class="buynum">'+res.data[i].order_buynum+'</li>\n' +
                       '                    <li class="peisong">免邮</li>\n' +
                       '                    <li class="money1">￥'+res.data[i].now_price+'.00</li>\n' +
                       '                </ul>\n' +
                       '            </li>'
               }
                if(res.order_state==4){
                        str += '    <div class="liFoot clearfix">\n' +
                            '                <p>订单编号：<span>'+norder_id+'</span></p>\n' +
                            '                <span>实付款：</span>\n' +
                            '                <span class="money2">￥'+sumPrice+'.00</span>\n' +
                            '                <div class="seeOrderbtn confimTake" data_index="'+norder_id+'">确认收货</div>\n' +
                            '                <div class="seeOrderbtn applyReturn" data_index="'+norder_id+'">申请退货</div>\n' +
                            '                <div class="seeOrderbtn seeMove" data_index="'+norder_id+'">查看物流</div>\n' +
                            '            </div>\n' +
                            '        </ul>\n' +
                            '    </div>'
                }
                else if(res.order_state==2||res.order_state==3){
                        str +=' <div class="liFoot clearfix">\n' +
                            '                <p>订单编号：<span>'+norder_id+'</span></p>\n' +
                            '                <span>实付款：</span>\n' +
                            '                <span class="money2">￥'+sumPrice+'.00</span>\n' +
                            '                <div class="seeOrderbtn return" data_index="'+norder_id+'">退款中</div>\n' +
                            '                <div class="seeOrderbtn seeMove" data_index="'+norder_id+'">查看物流</div>\n' +
                            '            </div>\n' +
                            '        </ul>\n' +
                            '    </div>'
                } else if(res.order_state==5){
                    str +='  <div class="liFoot clearfix">\n' +
                        '                <p>订单编号：<span>'+norder_id+'</span></p>\n' +
                        '                <span>实付款：</span>\n' +
                        '                <span class="money2">￥'+sumPrice+'.00</span>\n' +
                        '                <div class="seeOrderbtn"data_index="'+norder_id+'">评价</div>\n' +
                        '            </div>\n' +
                        '        </ul>\n' +
                        '    </div>';
                }else {
                    str +=   '        </ul>\n' +
                        '    </div>';
                }
                orderdetail2.innerHTML = str;
                $('.liFoot').on('click','.applyReturn',function () {
                    var Rorder_id = $(this).attr('data_index');
                    $('.returnmodel').fadeIn();
                    sessionStorage.Rorder_id=Rorder_id;//存储要退款的订单号
                    $('.returngoods')[0].on('click',function () {
                        order_return = 2;//退货
                        sessionStorage.order_return = order_return;
                        $('#pc-content>div').css({'display':'none'});
                        $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    });
                    $('.returnmoney')[0].on('click',function () {
                        order_return = 3;//仅退款
                        sessionStorage.order_return = order_return;
                        $('#pc-content>div').css({'display':'none'});
                        $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    });
                    $('.close').on('click',function () {
                        $('.returnmodel').fadeOut();
                    })
                });
                /*点击退款按钮*/
                $('.detaillist').on('click','.applyReturn',function () {
                    var Rorder_id = $(this).attr('data_index');
                    $('.returnmodel').fadeIn();
                    sessionStorage.Rorder_id=Rorder_id;//存储要退款的订单
                    $('.returngoods').on('click',function () {
                        order_return = 2;//退货
                        sessionStorage.order_return = order_return;
                        $('#pc-content>div').css({'display':'none'});
                        $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    });
                    $('.returnmoney').on('click',function () {
                        order_return = 3;//仅退款
                        sessionStorage.order_return = order_return;
                        $('#pc-content>div').css({'display':'none'});
                        $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    });
                    $('.close').on('click',function () {
                        $('.returnmodel').fadeOut();
                    })
                });
                /*点击退款中查看退款状态*/
                $('.detaillist').on('click','.return',function () {
                    /*点击退款按钮时发送请求，获取当前order_return状态值*/
                    var order_id2 = $(this).attr('data_index');//获取当前点击了退款订单的order_id
                    sessionStorage.order_id2 = order_id2;
                    window.location.href = './../pages/returngoods.html';//跳转个人中心退款进度页面
                })
            }
        })

        }
        $('#orderdetail').onclick = seeorderdetail();//调用接口函数


    /*Reason页面的js代码 页面里的函数*/

       $('#reason3').on('click',function () {
           $('#selReason').slideDown();
       });
       $('#selReason').on('click','li',function () {
           $('#selReson').html($(this).html());
           $('#selReason').slideUp();
       });
       $('#subRaeson').on('click',function () {
           var order_reason = $('#selReson').html();
           var  order_id = sessionStorage.Rorder_id;
           var  order_return = parseInt(sessionStorage.order_return);
           $.ajax({
               url:'/subReason',
               data:{
                   'order_reason': order_reason,
                  'order_id': order_id,
                   'order_return': order_return
               },
               success: function (res) {

               }
           });
           console.log(1)
           window.location.href = './../pages/returngoods.html';//跳转个人中心退款信息界面
       })
    /*退款页的函数*/
    var returnGoods = document.getElementById('returnGoods');
    /*退款中的接口函数 全局函数*/
    function returnPage() {
        var order_id2 = sessionStorage.order_id2;
        var str = '<p class="title2">退货退款进度</p>';
        $.ajax({
            url:'/returnGoodsMoney',
            data:{
                'order_id': order_id2,
                async: false,
            },
            success: function (res) {
                var order_return = parseInt(res.data[0].order_return);
                var order_rnum = res.data[0].order_rnum;
                var order_rcom = res.data[0].order_rcom;
                var order_dtate = res.data[0].order_state;
                var str1 = ' <p class="title5"><span class="finished">审核成功！</span></p>\n' +
                    '        <p class="title7">邮寄地址</p>\n' +
                    '        <div class="explain clearfix">\n' +
                    '            <div>\n' +
                    '                <p id="Readdr">四川省成都市武侯区上层建筑88号</p>\n' +
                    '                <p id="Rename">刘东东</p>\n' +
                    '                <p id="Tel">18885623668</p>\n' +
                    '                <p class="peSong">本店拒收到付件，请买家自付邮寄费用！</p>\n' +
                    '            </div>\n' +
                    '            <div>\n' +
                    '                <p class="finished title5">请在三个工作日内寄出，超时将不再为您退款！</p>\n' +
                    '            </div>\n' +
                    '        </div>';
                var str2 = '  <div id="writeNumber" class="clearfix"><div class="writexplain">\n' +
                    '                <p class="title7">填写物流单号：</p>\n' +
                    '                <div id="returnnum" contenteditable="true"></div>\n' +
                    '            </div>\n' +
                    '             <div class="writexplain">\n' +
                    '                 <p class="title7">填写物流单号：</p>\n' +
                    '                 <div id="returncompany" contenteditable="true"></div>\n' +
                    '             </div>\n' +
                    '             <div id="subMoveExplain">提交物流信息</div></div>';
                var str3 = '      <div id="writeNumber" class="clearfix">\n' +
                    '        <div class="alreadysub">\n' +
                    '            <p class="title7">物流单号：</p>\n' +
                    '            <div id="returnnum">'+order_rnum+'</div>\n' +
                    '        </div>\n' +
                    '        <div class="alreadysub">\n' +
                    '            <p class="title7">物流公司：</p>\n' +
                    '            <div id="returncompany">'+order_rcom+'</div>\n' +
                    '        </div>\n' +
                    '    </div>';
                var str4 = '<p class="title7">等待到货</p>\n' +
                    '        <p class="title8">我们成功收货后，将在三个工作日内退款给您，感谢您的支持！</p>\n' +
                    '        ';
                var str5 = '<p class="title8">退款成功</p>';
                if(order_dtate==2){
                switch (order_return) {
                    case 1:
                        str += ' <p class="title5">已提交申请，请等待审核，我们将会在1个工作日内审核。</p>';
                        break;
                    case 2:
                        str += str1;
                        break;
                    case 3:
                        str += str1 + str3;
                        break;
                    case 4:
                        str += str1 + str3 + str4;
                        break;
                    case 5:
                        str += str1 + str3 + str4 + str5;
                        break;
                }
                returnGoods.innerHTML = str;
            }
            else {
                    switch (order_return) {
                        case 1:
                            str += ' <p class="title5">已提交申请，请等待审核，我们将会在1个工作日内审核。</p>';
                            break;
                        case 2:
                            str += '<p class="title5"><span class="finished">审核成功！</span></p><p class="title7">等待退款</p>';
                            break;
                        case 5:
                            str += '<p class="title5"><span class="finished">审核成功！</span></p><p class="title7">等待退款</p>' + str5;
                            break;
                    }
                    returnGoods.innerHTML = str;
            }
            }
        })
    }
    returnGoods.onclick = returnPage();//调用returnGoodsMoney接口

})