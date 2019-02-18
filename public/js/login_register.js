var oLgin = document.querySelector('#login');

var oReg = document.querySelector('#register');

var oL_form = document.querySelector('.login_form');
var oR_form = document.querySelector('.register_form');


oLgin.onclick =function () {

    oL_form.style.display = 'block';
    oR_form.style.display = 'none';
    oLgin.style.color = '#FF7F50';
    oLgin.style.borderBottom = '2px solid  #FF7F50';

    oReg.style.color = '#333';
    oReg.style.borderBottom = 'none';

};
oReg.onclick =function () {
    oR_form.style.display = 'block';
    oL_form.style.display = 'none';
    oReg.style.color = '#FF7F50';
    oReg.style.borderBottom = '2px solid  #FF7F50';

    oLgin.style.color = '#333';
    oLgin.style.borderBottom = 'none';

};

var oAlready = document.querySelector('#Already');
oAlready.onclick =function () {
    oR_form.style.display = 'block';
    oL_form.style.display = 'none';
    oReg.style.color = '#FF7F50';
    oReg.style.borderBottom = '2px solid  #FF7F50';

    oLgin.style.color = '#333';
    oLgin.style.borderBottom = 'none';

};

var oCode=document.querySelector('.code_btn');

var n=60;
var timer;

oCode.onclick=function () {
    timer=setInterval(clock,1000);

    function clock() {
        if(n>1){
            oCode.disabled=true;
            n--;
            oCode.innerText=n+'秒后重新发送';
            oCode.style.cursor = 'not-allowed'
        }else{
            oCode.disabled=false;
            oCode.style.cursor = 'pointer';
            oCode.innerText='重新发送';
            n=5;
            clearInterval(timer);
        }
    }
};


$('#luser').focus(function () {
    $('.user_name_text').css('borderColor','#d9d9d9');
    $('.user_pass_text').css('borderColor','#d9d9d9');
    $('#Tips').html('');
    $('#Tips2').html('');

});
$('#lpass').focus(function () {
    $('.user_name_text').css('borderColor','#d9d9d9');
    $('.user_pass_text').css('borderColor','#d9d9d9');
    $('#Tips').html('');
    $('#Tips2').html('');
});

$('#login_btn').click(function () {
    var suser = $('#luser').val();
    var spass = $('#lpass').val();

    console.log(suser,spass);
     if(suser == '' && spass == ''){
         $('#Tips').html('用户名不能为空');
         $('#Tips2').html('密码不能为空');
         $('.user_name_text').css('borderColor','red');
         $('.user_pass_text').css('borderColor','red');


     }else{
             $.ajax({
                 url:'/login',
                 data:{
                     luser:suser,
                     lpass:spass
                 },
                 success:function (res) {
                     if(res.state){
                         //错误
                         $('.user_name_text').css('borderColor','red');
                         $('.user_pass_text').css('borderColor','red');
                     }else{
                         //正确
                         // confirm('登录成功')
                         $('.login_user_cg').append('<p style="color: #29cc86;text-align: center;margin-top: 10px"><b>登录成功√</b></p>')
                         // window.location.replace("http://localhost:1234/index.html");

                         // window.location.href="http://localhost:1234/index.html"

                         window.location.href="http://localhost:1234/pageone"
                     }
                 }
             })
     }

});



//注册
$('#rname').focus(function () {
    $('.nickname').css('borderColor','#d9d9d9');
    $('.password').css('borderColor','#d9d9d9');
    $('.ophone').css('borderColor','#d9d9d9');
    $('.code').css('borderColor','#d9d9d9');

});
$('#res_btn').click(function () {
    var sname = $('#rname').val();
    var suser = $('.ruser').val();
    var spass = $('#rpass').val();
    var ocode = $('.code').val();


        if(sname==''||suser==''||spass==''||ocode==''){
            $('.nickname').css('borderColor','red');
            $('.password').css('borderColor','red');
            $('.ophone').css('borderColor','red');
            $('.code').css('borderColor','red');
        }else {
            $.ajax({
                url:'/phoneLogin2',
                type:'get',
                data:{
                    phone:$('#phone').val(),
                    code:$('.code').val()
                },
                success:function (res) {
                    if(res.error == 1){
                        $('.login-Tips4').html('验证码错误!')
                    }else{
                        $.ajax({
                            url:'/register',
                            type:'post',
                            data:{
                                rname:sname,
                                ruser:suser,
                                rpass:spass
                            },
                            success:function (res) {

                                confirm('注册成功')

                                window.location.href = 'http://localhost:1234/pages/login.html'
                            }
                        })
                    }
                }
            })
        }
});



//验证码
/*获取验证码*/
$('.code_btn').click(function () {
    $.ajax({
        url:'/phoneLogin',
        type:'get',
        data:{
            phone:$('#phone').val()
        },
        success:function (res) {
            console.log(res);
        }
    })
});


var  oRname = document.querySelector('#rname');
var  oRpass = document.querySelector('#rpass');
var  oRuser = document.querySelector('#phone');


var tipTxt1 = document.querySelector('.login-Tips1');
var tipTxt2 = document.querySelector('.login-Tips2');
var tipTxt3 = document.querySelector('.login-Tips3');



oRname.onblur = function () {
    var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,8}$/;
    var name = reg.test(oRname.value);
    if(!name){
        tipTxt1.innerHTML = '用户昵称为4-7个字符!';
        oRname.focus()
    }else {
        tipTxt1.innerHTML = '';
    }
};
oRpass.onblur = function () {
    var reg = /^[a-zA-Z0-9]{5,11}$/;
    var pass = reg.test(oRpass.value);
    if(!pass){
        tipTxt2.innerHTML = '密码为5-10个字母或数字!';
        oRpass.focus()
    }else {
        tipTxt2.innerHTML = '';
    }
}
oRuser.onblur = function () {
    var reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{11,12}$/;
    var user = reg.test(oRuser.value);
    if(!user){
        tipTxt3.innerHTML = '请输入正确的手机号码!';
        oRuser.focus();
    }else {
        tipTxt3.innerHTML = '';
    }
};


