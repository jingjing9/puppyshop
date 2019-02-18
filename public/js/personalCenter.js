

$(window).load(function () {

    if(sessionStorage.page_id==3){
        $('#pc-content>div').css({'display':'none'});
        $('#orderdetail').css({'display':'block'});
         seeorderdetail();
        pData();
        delete sessionStorage.page_id;
    }else{
        $('#pc-content>div').css({'display':'none'});
        $('#def-message').css({'display':'block'});
        pData();
    }


});
// 更新个人资料
function pData() {
    $.ajax({
        url:'/personalData',
        success:function (res) {
            if(res.state){
                $('#def-message>img').attr('src',res.arr[0].user_pic);
                $('#def-name').html(res.arr[0].user_name);
                $('#def-tel').html(res.arr[0].u_user);
            }
        }
    })
}
// 从数据库更新地址
function updateAddr(arr){
    $('#ma-ul').html('');
    for (var i = 0; i<arr .length; i++) {
        $('#ma-ul').append(`
    <li data-index="${arr[i].add_id}">
          <div class="ma-left">
               <p><span class="ma-name">${arr[i].add_person}</span><span class="ma-tel">${arr[i].add_tel}</span></p>
                <p><span class="ma-def">默认</span>${arr[i].a_address}</p>
          </div>
          <div class="ma-right"><span>|</span>编辑</div>
    </li>
   `);
        if (!arr[i].is_def) {
            var node = $('#ma-ul').find('li[data-index="' + arr[i].add_id + '"]');
            node.find('.ma-def').remove();
        }
    }
}
// 查看评价
function seeappraise(arr){
    $('#me-ul').html('');

    for (var i = 0; i<arr .length; i++) {
        $('#me-ul').append(`
    <li>
         <p class="me-word">${arr[i].appraise_word}</p>
          <img src="..${arr[i].pic1}" height="103" width="100" class="me-pic"/>
           <div>
                <p class="me-goodsname">${arr[i].goods_name}</p>
                <p>单价：<span class="me-price">￥${arr[i].pre_price}</span>&nbsp;&nbsp;数量：<span class="me-number">${arr[i].order_buynum}</span></p>
                <p>小计：<span class="me-subtotal">￥${arr[i].pre_price}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="isgood"></span></p>
            </div>
    </li>
   `);
        if(arr[i].appraise_des==5){
            $('.isgood').html('已好评')
        }
    }
}
// 查看待评价
function waiteappraise(arr){
    $('#wa-ul').html('');
    var num1;
    var num2;
    var total
    for (var i = 0; i<arr .length; i++) {
        num1=arr[i].now_price;
        num2=arr[i].order_buynum;
        total=num1*num2;
        $('#wa-ul').append(`
    <li data-index="${arr[i].goods_id}">
         <img src="..${arr[i].pic1}" height="103" width="100"/>
             <div>
             <p>${arr[i].goods_name}</p>
             <p>单价：<span class="wa-price">￥${num1}</span>&nbsp;&nbsp;数量：<span class="wa-number">${num2}</span></p>
             <p>小计：<span class="wa-subtotal">￥${total}</span></p>
            </div>
            <div>
            <div class="wa-appraise">评价</div>
            </div>
    </li>
   `);

    }
}
function systemmessage(arr){
    $('#sm-ul').html('');
    for (var i = 0; i<arr .length; i++) {
        $('#sm-ul').append(`
    <li>
         <p>【卖家消息】<span class="sm-inform${i}"></span></p>
         <img src="..${arr[i].pic1}" height="103" width="100"/>
         <div>
         <p>订单号：<span class="sm-ordernum">${arr[i].order_num}</span></p>
         <p class="sm-notice${i}"></p>
         </div>
         &nbsp;
    </li>
   `);
        // console.log(arr[i].order_return);

        if(arr[i].order_return==2){
            $('.sm-inform0').html('卖家已同意您的退货申请');
            $('.sm-notice0').html('请在规定时间内将快递寄回');
        }
        else if(arr[i].order_return==3){
            $('.sm-inform1').html('您的快递信息已提交');
            $('.sm-notice1').html('等待收货');
        }
        else{
            $('.sm-inform2').html('您退回的货物已收货');
            $('.sm-notice2').html('等待审核中');
            $('.sm-inform3').html('您退回的货物已收货');
            $('.sm-notice3').html('等待审核中');
        }
    }
}
// 个人资料点击事件
$('#p-data').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#def-message').css({'display':'block'});
    $('#pc-ul>li').removeClass('active');
    $(this).addClass('active');
});

// 我的收货地址点击事件
$('#p-addr').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#ma-box').css({'display':'block'});
    $('#pc-ul>li').removeClass('active');
    $(this).addClass('active');
    $.ajax({
        url: '/myAddr',
        success:function (res) {
            if (res.state) {
                updateAddr(res.arr);
            };

        }
    });
});
// 我的评价点击事件
$('#p-appraise').click(function () {
    $('#pc-ul>li').removeClass('active');
    $(this).addClass('active');
    $('#pc-content>div').css({'display':'none'});
    $('#me-box').css({'display':'block'});
    $.ajax({
        url:'/seeAppraise',
        success:function (res) {
          if(res.state){
           seeappraise(res.arr);
              // console.log(res.arr);
          }
        }
    })
});
// 修改密码点击事件
$('#p-changepass').click(function () {
    $('#pc-ul>li').removeClass('active');
    $(this).addClass('active');
    $('#pc-content>div').css({'display':'none'});
    $('#cp-box').css({'display':'block'});
    $('#cp-repass').val('');
    $('#cp-newpass').val('');
    $('#cp-conpass').val('');
});
// 系统消息点击事件
$('#p-message').click(function () {
    $('#pc-ul>li').removeClass('active');
    $(this).addClass('active');
    $('#pc-content>div').css({'display':'none'});
    $('#sm-box').css({'display':'block'});
    $.ajax({
        url:'/systemMessage',
        success:function(res){
        if(res.state){
            systemmessage(res.arr);
        }
        }
    })
});
// 添加收货地址
$('#ma-addaddr').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#aa-box').css({'display':'block'});
});
// 修改个人资料
$('#def-revision').click(function () {
    $('#pd-notice').html('');
    $('#pc-content>div').css({'display':'none'});
    $('#pd-box').css({'display':'block'});
    $.ajax({
        url:'/defRevision',
        data:{tel:$('#def-tel').html()},
        success:function (res) {
            if(res.state){
                $('#pd-img').attr('src','../images/'+res.arr[0].user_pic);
                $('#pd-name').val(res.arr[0].user_name);
                var str1=res.arr[0].pet_time;
                var arr1=str1.split('T');
                $('#pd-pettime').val(arr1[0]);
                var str2=res.arr[0].pet_birth;
                var arr2=str2.split('T');
                $('#pd-birth').val(arr2[0]);
                $('#pd-tel').val(res.arr[0].u_user);
            }
        }
    })
});
// 获取验证码
$('#pd-getCode').click(function () {
    $.ajax({
        url:'/getCode',
        data:{
            phone:$('#pd-tel').val()
        },
        success:function (res) {
            // console.log(res);
        }
    })
})
// 保存修改过后的个人资料
$('#pd-save').click(function () {
    // $('#pc-content>div').css({'display':'none'});
    // $('#def-message').css({'display':'block'});
    $.ajax({
        url:'/phoneVerify',
        data:{
            phone:$('#pd-tel').val(),
            code:$('#pd-code').val()
        },
        success:function (res) {
            if(res.state){
                $.ajax({
                    url:'/updatePdata',
                    data:{
                        pname:$('#pd-name').val(),
                        time1:$('#pd-pettime').val(),
                        time2:$('#pd-birth').val(),
                        phone:$('#pd-tel').val()
                    },
                    success:function(res){
                        if(res.state){
                            pData();
                             $('#pc-content>div').css({'display':'none'});
                            $('#def-message').css({'display':'block'});
                        }
                    }
                })
            }else {
                $('#pd-notice').html('提示：验证码输入错误！')
            }
        }
    })
});
// 编辑收货地址
$('#ma-ul').on('click','.ma-right',function () {
    $('#pc-content>div').css({'display':'none'});
    $('#ra-box').css({'display':'block'});
    $('#ra-setdef').prop('checked','');
    var index=$(this).parent().attr('data-index');
    $('#ra-delete').attr('data-index',index);
    $.ajax({
        url:'/addrMessage',
        data:{num:index},
        success:function (res) {
         if(res.state){
             var arr=res.arr[0].a_address.split('|');
             console.log(arr);
             $('#ra-rename').val(res.arr[0].add_person);
             $('#ra-retel').val(res.arr[0].add_tel);
             $('#address').distpicker('destroy');
             $('#address').distpicker({
                 province: arr[0],
                 city: arr[1],
                 district: arr[2],
                 autoSelect: true
             });
             $('#ra-redetail').val(arr[3]);
             if(res.arr[0].is_def){
                 $('#ra-setdef').prop('checked','checked');
             }

         }
        }
    })
})
// 保存编辑过的地址
$('#ra-save').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#ma-box').css({'display':'block'});
    var flag;
    if($('#ra-setdef').prop('checked')){
        flag=1;
    }else{
        flag=0;
    }
    var str=$('#province').val()+'|'+$('#city').val()+'|'+$('#country').val()+'|'+$('#ra-redetail').val();

       $.ajax({
        url:'/updateAddr',
        data:{
          id:$('#ra-delete').attr('data-index'),
          newName:$('#ra-rename').val(),
          newTel:$('#ra-retel').val(),
          newAddr:str,
          isDef:flag,  
        },
        success:function (res) {
            if(res.state){
                $.ajax({
                    url: '/myAddr',
                    success:function (res) {
                        if (res.state) {
                            updateAddr(res.arr);
                        };

                    }
                });
            }
        }
    })
});
// 删除地址
$('#ra-delete').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#ma-box').css({'display':'block'});
    $.ajax({
        url:'/deleteAddr',
        data:{num:$(this).attr('data-index')},
        success:function (res) {
            if (res.state) {
                updateAddr(res.arr);
            }
        }
    });

});
// 保存新增地址
$('#aa-save').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#ma-box').css({'display':'block'});
    var flag;
    if($('#aa-setdef').prop('checked')){
        flag=1;
    }else{
        flag=0;
    }
    var str=$('#newprovince').val()+'|'+$('#newcity').val()+'|'+$('#newcountry').val()+'|'+$('#aa-addr').val();
    $.ajax({
        url:'/saveNewaddr',
        data:{
            saveName:$('#aa-addname').val(),
            saveTel:$('#aa-addtel').val(),
            saveAddr:str,
            isDef:flag
        },
        success:function (res) {
            if(res.state){
                $.ajax({
                    url: '/myAddr',
                    success:function (res) {
                        if (res.state) {
                            updateAddr(res.arr);
                        };

                    }
                });
            }
        }
    })
})
// 取消新增地址
$('#aa-cancel').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#ma-box').css({'display':'block'});
});

// 保存修改过后的密码
$('#cp-confirm').click(function () {

    $('#cp-notice').html('');
    var repass=$('#cp-repass').val();
    var newpass=$('#cp-newpass').val();
    var conpass=$('#cp-conpass').val();
    if(repass==''||newpass==''||conpass==''){
        $('#cp-notice').html('密码不能为空');
    }else{
        $.ajax({
            url:'/checkPass',
            data:{oldpass:repass},
            success:function(res) {
                if(!res.state){
                    $('#cp-notice').html('原始密码输入错误');
                }else{
                    if(newpass!=conpass){
                        $('#cp-notice').html('两次新密码输入不一致');
                    }else{
                        $.ajax({
                            url:'/changePass',
                            data:{newpass:conpass},
                            success:function (res) {
                                if(res.state){
                                    $('#pc-content>div').css({'display':'none'});
                                    $('#def-message').css({'display':'block'});
                                }
                            }
                        })
                    }
                }
            }


        })
    }
});
// 取消修改密码
$('#cp-cancel').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#def-message').css({'display':'block'});
});
// 待付款点击事件
$('.def-wpay').click(function () {

    $('#pc-content>div').css({'display':'none'});
    $('#def-message').css({'display':'block'});
    $('#wp-box').css({'display':'block'});
});
// 待评价点击事件
$('.def-appraise').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#def-message').css({'display':'block'});
    $('#wa-box').css({'display':'block'});
    $.ajax({
        url:'/waiteAppraise',
        success:function(res){
           if(res.state){
               waiteappraise(res.arr);
           }
        }
    })
});
// 查看未完成订单
$('#p-notorder').click(function () {
    $('#pc-ul>li').removeClass('active');
    $(this).addClass('active');
    $('#pc-content>div').css({'display':'none'});
    $('#seeGorder').css({'display':'block'});
    getSeeOrder();
});
// 查看全部订单
$('#p-allorder').click(function () {
    $('#pc-ul>li').removeClass('active');
    $(this).addClass('active');
    $('#pc-content>div').css({'display':'none'});
    $('#seeAllorder').css({'display':'block'});
    getSeeAllOrder();
});
// 我的头像点击事件
$('#def-img').click(function () {
    $('#pc-content>div').css({'display': 'none'});
    // $('#def-message').css({'display': 'block'});
    $('#headPortrait').css({'display': 'block'});
    var oImg = document.getElementById('head-img');
    var oC = document.getElementById('c1');
    var gd = oC.getContext('2d');
    var oDiv = document.querySelector('#head-div1');
    var oDiv1 = document.querySelector('#head-box');
    // var cliW=document.documentElement.clientWidth;
    // var cliH=document.documentElement.clientHeight;
    var w = oDiv.offsetWidth;
    var h = oDiv.offsetHeight;
    var w1 = oDiv1.offsetWidth;
    var h1 = oDiv1.offsetHeight;
    var oS = document.getElementById('s1');
    var oF = document.getElementById('f1');
    oS.onclick = function () {
        oDiv.style.display = 'block';
        /*创建一个文件阅读器*/
        var oFReader = new FileReader();
        /*获取文件，因为可以上传多个，所以是数组，咱们获取第一个就可以了*/
        var file = oF.files[0];
        /*通过文件阅读器,解析uRL地址，并且转化成base64格式*/
        oFReader.readAsDataURL(file);
        /*等文件阅读器加载完毕的时候*/
        oFReader.onloadend = function (ev) {
            /*或者目标文件的解析结果*/
            var src = ev.target.result;
            /*创建，插入*/
            oImg.setAttribute('src', src);
        }

    }


    oDiv.onmousedown = function (ev) {
        var oEvent = event || ev;
        var disX = oEvent.clientX - oDiv.offsetLeft;
        var disY = oEvent.clientY - oDiv.offsetTop;
        document.onmousemove = function (ev1) {
            var oEvent1 = event || ev;
            var x = oEvent1.clientX - disX;
            var y = oEvent1.clientY - disY;
            if (x <= 0) {
                x = 0;
            } else if (x >= w1 - w) {
                x = w1 - w;
            }
            if (y <= 0) {
                y = 0;
            } else if (y >= h1 - h) {
                y = h1 - h;
            }
            oDiv.style.left = x + 'px';
            oDiv.style.top = y + 'px';

        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
        return false;
    };

    document.getElementById('btn1').onclick = function () {

        //根据图片画到画布上
        //gd.drawImage(oImg,100,100,300,200)  五个值画整张图
        var x = oDiv.offsetLeft;
        var y = oDiv.offsetTop;
        var wid = oDiv.offsetWidth;
        var hei = oDiv.offsetHeight;
        gd.drawImage(oImg, x, y, wid, hei, 50, 50, wid, hei);
        oC.style.display = 'block';
        oDiv1.style.display = 'none';
    };
    $('#headPortrait').on('click', '#btn2', function () {
        var data = oC.toDataURL('image/png',0.2);
        console.log(data);
        $('#def-img').attr('src', data);

        $.ajax({
            url: '/changeHead',
            type: 'post',
            data: {url:data},
            /*processData:false,
            contentType:false,*/
            success: function (res) {
                console.log(res);

                $('#headPortrait').css({'display': 'none'});
                $('#def-message').css({'display': 'block'});
                pData();
            }
        })
    })
});
$('#me-appraise').click(function () {
    $('#pc-content>div').css({'display':'none'});
    $('#wa-box').css({'display':'block'});
    $.ajax({
        url:'/waiteAppraise',
        success:function(res){
            if(res.state){
                waiteappraise(res.arr);
            }
        }
    });
});
// 评价点击事件
$('#wa-ul').on('click','.wa-appraise',function () {
    
})

/*何静的js代码*/

/*显示查看订单*/
function getSeeOrder() {
    var rorder_state = 4;
    var order_return = 1;
    var user_id=sessionStorage.user;
    var see_showlist = document.getElementById('see_showlist');
    $.ajax({
        url:'/seeOrder',
        data:{
          user_id:user_id
        },
        success:function (res) {
            var iNow = 0;
            var arr=res.data;
            var arr1 = [];
            arr1[0]=[];
            arr1[0].push(arr[0]);
            var currentValue = arr[0];
            for (var i = 1; i < arr.length ; i++)
            {
                if (currentValue.order_id == arr[i].order_id){
                    arr1[iNow].push(arr[i])
                }else{
                    currentValue = arr[i];
                    iNow++;
                    arr1[iNow] = [];
                    arr1[iNow].push(arr[i])
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
                    str += '<div class="seeOrderbtn return" data_index="'+arr1[j][0].order_id+'">退款中</div><div class="seeOrderbtn seeMove" data_index="'+arr1[j][0].order_num+'" data_com="'+arr1[j][0].order_com+'">查看物流</div></div>';
                }else {
                    rorder_state = 4;
                    str += '<div class="seeOrderbtn confimTake" data_index="'+arr1[j][0].order_id+'">确认收货</div><div class="seeOrderbtn applyReturn" data_index="'+arr1[j][0].order_id+'">申请退款</div><div class="seeOrderbtn seeMove" data_index="'+arr1[j][0].order_num+'" data_com="'+arr1[j][0].order_com+'">查看物流</div></div>';
                }
            }
            see_showlist.innerHTML = str;
            /*点击订单列表跳转查看详情*/
            $('#see_showlist').on('click','.list1',function () {
                var norder_id = parseInt($(this).find('.seeGorder_id').html());
                sessionStorage.norder_id=norder_id;
                $('#pc-content>div').css({'display':'none'});
                $('#orderdetail').css({'display':'block'});
                //打开center订单详情页
                seeorderdetail();
            })
            /*点击退款按钮*/
            $('#see_showlist').on('click','.applyReturn',function () {
                var Rorder_id = $(this).attr('data_index');
                sessionStorage.order_id2 = Rorder_id;
                $('.returnmodel').fadeIn();

                sessionStorage.Rorder_id=Rorder_id;//存储要退款的订单
                $('#returngnoods').on('click',function () {
                    order_state = 2;//退货

                    sessionStorage.order_state = order_state;
                    $('#pc-content>div').css({'display':'none'});
                    $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    $('.returnmodel').fadeOut();
                });
                $('#returnmoney').on('click',function () {
                    order_state = 3;//仅退款
                    sessionStorage.order_state = order_state;
                    $('#pc-content>div').css({'display':'none'});
                    $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    $('.returnmodel').fadeOut();
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
                $('#pc-content>div').css({'display':'none'});
                $('#returnGoods').css({'display':'block'});//跳转个人中心退款进度页面
                returnPage();
            });
            /*点击查看物流按钮*/

            $('#see_showlist').on('click','.seeMove',function () {
                var order_num = $(this).attr('data_index');
                sessionStorage.order_num=order_num;
                var order_com = $(this).attr('data_com');
                sessionStorage.order_com=order_com;
                if(order_com == 'null'){
                    alert('暂无物流信息哦！')
                }else{
                    $('#pc-content>div').css({'display':'none'});
                    $('#seemove').css({'display':'block'});  //跳转个人中心查看物流
                    seeMover();//调用查看物流函数
                }

            });
            /*点击确认收货跳转评价页面*/
            $('#see_showlist').on('click','.confimTake',function () {
                var order_id2 = $(this).attr('data_index');
                sessionStorage.order_id2 = order_id2;
                $('#pc-content>div').css({'display':'none'});
                $('#goodsRecom').css({'display':'block'});  //跳转个人中心评价
                confirmtaker();
            })
        }
    })
}

/*确认收货的接口函数*/
function confirmtaker() {
    var order_id =  sessionStorage.order_id2;
    $.ajax({
        url:'/confirm',
        data:{
            'order_id':order_id
        },
        success:function (res) {

        }
    })
}

/*评价页面的功能函数*/
var order_id =  sessionStorage.order_id2;
$('.star').on('click','li',function () {
    $(this).toggleClass('good').toggleClass('no');
});
var descri = document.getElementById('description');
var descriptionli = descri.getElementsByTagName('li');
var moveserver = document.getElementById('moveserver');
var moveserverli = moveserver.getElementsByTagName('li');
var multiple = document.getElementById('multiple');
var multipleli = multiple.getElementsByTagName('li');

$('#subRecommend').on('click',function () {
    var writr = $('#wordRecommend').html();
    var a=0;
    var b=0;
    var c=0;
    for(var s=0;s<5;s++){
        if(descriptionli[s].className.indexOf('good')>-1)
        {
            a++
        }
    }
    for(var s=0;s<5;s++){
        if(moveserverli[s].className.indexOf('good')>-1){
            b++
        }
    }
    for(var s=0;s<5;s++){
        if(multipleli[s].className.indexOf('good')>-1){
            c++
        }
    }

    if(writr==''){
        alert('请填写文字评价!')
    }else if(a==0||b==0||c==0){
        alert('请打星评价！')
    }else {
        $.ajax({
            url:'/subGoodsRecommed',
            data:{
                'order_id': order_id,
                'appraise_word':writr,
                'appraise_des':a,
                'appraise_log':b,
                'appraise_syn':c
            },
            success:function (res) {
                $('#pc-content>div').css({'display':'none'});
                $('#def-message').css({'display':'block'});
            }
        })
        $('#pc-content>div').css({'display':'none'});
        $('#def-message').css({'display':'block'});
    }
});



/*查看全部订单的接口函数 全局函数*/
function getSeeAllOrder() {
    var see_alllist = document.getElementById('AllOrder');
    var user_id=sessionStorage.user;
    $.ajax({
        url:'/seeAllOrder',
        data:{
            user_id:user_id
        },
        success:function (res) {
            var iNow = 0;
            var arr=res.data;
            var arr1 = [];
            arr1[0]=[];
            arr1[0].push(arr[0]);
            var currentValue = arr[0];
            for (var i = 1; i < arr.length ; i++)
            {
                if (currentValue.order_id == arr[i].order_id){
                    arr1[iNow].push(arr[i])
                }else{
                    currentValue = arr[i];
                    iNow++;
                    arr1[iNow] = [];
                    arr1[iNow].push(arr[i])
                }
            }
            var str ='';
            for(var j=0;j<arr1.length;j++){
                str += '<li class="list1" data_index="'+arr1[j][0].order_num+'" data_com="'+arr1[j][0].order_com+'">\n' +
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
                /*存快递*/
                $('#pc-content>div').css({'display':'none'});
                $('#orderdetail').css({'display':'block'}); //打开center
                seeorderdetail();
            })
        }
    })
}





/*查看订单详情的接口函数 全局函数*/
function seeorderdetail() {
    var order_state = 1;
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
                '            <p id="orderAddr"><span>'+res.data[0].add_person+'</span><span>'+res.data[0].add_tel+'</span><span>'+res.data[0].a_address+'</span></p>\n' +
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
                '                <ul>\n' +
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
                    '                <div class="seeOrderbtn seeMove" data_index="'+norder_id+'" data_num="'+res.data[0].order_num+'" data_com="'+res.data[0].order_com+'">查看物流</div>\n' +
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
                    '                <div class="seeOrderbtn seeMove" data_index="'+norder_id+'" data_num="'+res.data[0].order_num+'" data_com="'+res.data[0].order_com+'">查看物流</div>\n' +
                    '            </div>\n' +
                    '        </ul>\n' +
                    '    </div>'
            } else if(res.order_state==5&&res.order_appraise==0){
                str +='  <div class="liFoot clearfix">\n' +
                    '                <p>订单编号：<span>'+norder_id+'</span></p>\n' +
                    '                <span>实付款：</span>\n' +
                    '                <span class="money2">￥'+sumPrice+'.00</span>\n' +
                    '                <div class="seeOrderbtn recommend"data_index="'+norder_id+'">评价</div>\n' +
                    '            </div>\n' +
                    '        </ul>\n' +
                    '    </div>';
            }else {
                str +=   '        </ul>\n' +
                    '    </div>';
            }
            orderdetail2.innerHTML = str;

            /*点击申请退款按钮*/
            $('.liFoot').on('click','.applyReturn',function () {
                var Rorder_id = $(this).attr('data_index');
                sessionStorage.order_id2 = Rorder_id;
                console.log(939, sessionStorage.order_id2)
                $('.returnmodel').fadeIn();

                sessionStorage.Rorder_id=Rorder_id;//存储要退款的订单
                $('.returngnoods').on('click',function () {
                    order_state = 2;//退货
                    sessionStorage.order_state = order_state;
                    $('#pc-content>div').css({'display':'none'});
                    $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    $('.returnmodel').fadeOut();
                });
                $('.returnmoney').on('click',function () {
                    order_state = 3;//仅退款
                    sessionStorage.order_state = order_state;
                    $('#pc-content>div').css({'display':'none'});
                    $('#reason').css({'display':'block'});//跳转个人中心退款理由选择
                    $('.returnmodel').fadeOut();
                });
                $('.close').on('click',function () {
                    $('.returnmodel').fadeOut();
                })
            });
            /*点击退款中查看退款状态*/
            $('.liFoot').on('click','.return',function () {
                /*点击退款按钮时发送请求，获取当前order_state状态值*/
                var order_id2 = $(this).attr('data_index');//获取当前点击了退款订单的order_id
                sessionStorage.order_id2 = order_id2;
                $('#pc-content>div').css({'display':'none'});
                $('#returnGoods').css({'display':'block'});//跳转个人中心退款进度页面
                returnPage();
            });
            /*点击退货中*/
            $('.liFoot').on('click','.return',function () {
                /*点击退款按钮时发送请求，获取当前order_state状态值*/
                var order_id2 = $(this).attr('data_index');//获取当前点击了退款订单的order_id
                sessionStorage.order_id2 = order_id2;
                $('#pc-content>div').css({'display':'none'});
                $('#returnGoods').css({'display':'block'});//跳转个人中心退款进度页面

                returnPage();
            });
            /*点击查看物流按钮*/
            $('.liFoot').on('click','.seeMove',function () {
                var order_num = $(this).attr('data_num');
                sessionStorage.order_num=order_num;
                var order_com = $(this).attr('data_com');
                sessionStorage.order_com=order_com;
                if(order_com=='null'){
                    alert('暂无物流信息哦！')
                }else {
                    $('#pc-content>div').css({'display':'none'});
                    $('#seemove').css({'display':'block'});  //跳转个人中心查看物流
                    seeMover();//调用查看物流函数
                }
            });
            /*点击评价按钮*/
            $('.liFoot').on('click','.recommend',function () {
                /*点击退款按钮时发送请求，获取当前order_state状态值*/
                var order_id2 = $(this).attr('data_index');//获取当前点击了评价订单的order_id
                sessionStorage.order_id2 = order_id2;
                $('#pc-content>div').css({'display':'none'});
                $('#goodsRecom').css({'display':'block'});//跳转个人中心退款进度页面
            });
        }
    })

}


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
    var  order_state = parseInt(sessionStorage.order_state);
    $.ajax({
        url:'/subReason',
        data:{
            'order_reason': order_reason,
            'order_id': order_id,
            'order_state': order_state
        },
        success: function (res) {

        }
    });
    $('#pc-content>div').css({'display':'none'});
    $('#returnGoods').css({'display':'block'});//跳转个人中心退款信息界面
    returnPage();
});
/*退款页的函数*/
var returnGoods = document.getElementById('returnGoods');
/*退款中的接口函数 全局函数*/
function returnPage() {
    var order_id2 = sessionStorage.order_id2;
    var str = '<p class="title2">退货退款进度</p>';
    $.ajax({
        url:'/returnGoodsMoney',
        data:{
            order_id: order_id2,
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
                '                 <p class="title7">填写快递公司：</p>\n' +
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
                        str += str1+str2;
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
/*查看物流*/
var seemove = document.getElementById('seemove');
function seeMover() {
    var order_com = sessionStorage.order_com;
    var order_num = sessionStorage.order_num;
    $.ajax({
        url: 'http://v.juhe.cn/exp/index?key=bd03f2d2444f90b9545bce2a8b39991b&com=yd&no='+order_num,
        dataType: 'jsonp',
        async:false,
        jsonp:'callback',
        success: function (res) {
            var arr = res.result.list;
            var str = '<p class="title2">快递公司：<span>'+order_com+'</span></p>\n' +
                '                <p class="title2">快递单号：<span>'+order_num+'</span></p>';
            str += '     <p class="title2">物流处理信息</p> <ul class="list2"> <li class="title3">\n' +
                '                        <span class="time1">处理时间</span>\n' +
                '                        <span>处理消息</span>\n' +
                '                    </li>';
            for(var l=0;l<arr.length;l++){
                if(l==arr.length-1){
                    str += ' <li>\n' +
                        '                        <span class="time1 last">'+arr[l].datetime+'</span>\n' +
                        '                        <span class="last">'+arr[l].remark+'</span>\n' +
                        '                    </li>'
                }else {
                    str += ' <li>\n' +
                        '                        <span class="time1">'+arr[l].datetime+'</span>\n' +
                        '                        <span >'+arr[l].remark+'</span>\n' +
                        '                    </li>'
                }

            }
            str += ' </ul>';
            seemove.innerHTML = str;
        }
    })
}
$('#returnGoods').on('click','#subMoveExplain',function () {
    var returnnum = $('#returnnum').html();
    var returncompany = $('#returncompany').html();
    if(returnnum==''){
        alert('请填写物流单号！');
    }else if(returncompany==''){
        alert('请填写快递公司！')
    }else {
        var writeNumber = document.getElementById('writeNumber');
        writeNumber.innerHTML = ' <div class="alreadysub">\n' +
            '            <p class="title7">物流单号：</p>\n' +
            '            <div id="returnnum">'+returnnum+'</div>\n' +
            '        </div>\n' +
            '        <div class="alreadysub">\n' +
            '            <p class="title7">物流公司：</p>\n' +
            '            <div id="returncompany">'+returncompany+'</div>\n' +
            '        </div>';
        var order_id2 = sessionStorage.order_id2;
        $.ajax({
            url:'/subReturnMove',
            data:{
                'order_id':order_id2,
                'return_num':returnnum,
                'return_com':returncompany
            },
            success:function (res) {
                console.log('成功')
            }
        })

    }
});


