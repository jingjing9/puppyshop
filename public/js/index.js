try{
    //导航栏

    +function (){
        $.ajax({
            url:'/a',
            success:function (res) {
                sessionStorage.setItem('user',res.user.user_id)
                if(res.error==0){
                    $('#nav_login').html('<a id="user_id" class="link">欢迎您! '+ res.user.user_name+'<a class="link" id="close_u" href="javascript:void(0);">退出登录</a></a>')

                    var oClose_u = $('#close_u');
                    var oNav_login = $('#nav_login');
                    oClose_u.click(function(){
                        oNav_login.html ('<a href="http://localhost:1234/pages/login.html" class="link">登录</a> <span class="sep">|</span> <a href="http://localhost:1234/pages/login.html" class="link">注册</a> <span class="sep">|</span> <a href="" class="message">消息通知</a>')
                        window.location.reload()

                        $.ajax({
                            url:'/clear_session',
                            success:function (res) {
                                // window.location.href = 'http://localhost:1234/pageone';

                            }
                        })
                        window.location.href = 'http://localhost:1234/pageone';
                        sessionStorage.clear();
                    })

                }
            },
        });
    }()


    $(function () {
        $.ajax({
            url:'/picIndex',
            success:function (res) {
                var oA=document.querySelectorAll('.home-hero-slider a');

                // console.log(res)
                for(var i = 0;i<res.length;i++){

                    oA[i].innerHTML ='<img src="'+res[i].banner_img+'">'
                }
            }
        });
        var oHome = document.querySelector('.home-hero-slider');
        var oLeftbtn = document.querySelector('.btn-left');
        var oRightbtn = document.querySelector('.btn-right');
        var aImg = document.querySelectorAll('.home-hero-slider a');
        var aOL = document.querySelectorAll('.ui-pager-item li');
        var index = 0;//图片下标

        oRightbtn.onclick = right;

        oLeftbtn.onclick = left;

        function right() {
// 清除上一次样式
            aImg[index].style.opacity = '0';
            aOL[index].className = '';
            // 变换index的值
            index ++;
            if(index >=aImg.length){
                index = 0
            }
            aImg[index].style.opacity = '1';
            aOL[index].className = 'active';

            // 新样式
        }
        function left() {
// 清除上一次样式
            aImg[index].style.opacity = '0';
            aOL[index].className = '';
            // 变换index的值
            index --;
            if(index < 0){
                index = aImg.length - 1
            }
            aImg[index].style.opacity = '1';
            aOL[index].className = 'active';

            // 新样式
        }
        for(var i = 0;i<aOL.length;i++){
            aOL[i].index = i;
            aOL[i].onclick = function () {
                index = this.index;
                for (var i = 0;i<aOL.length;i++){
                    aImg[i].style.opacity= '0';
                    aOL[i].className = ''
                }
                this.className = 'active';
                aImg[index].style.opacity = '1'
            }
        }
        var timer
        oHome.onmouseover = function () {

            clearInterval(timer)
        };
        oHome.onmouseleave = function () {

            timer = setInterval(right,2000);
        };

    });




//侧边栏
    var oSid = document.querySelector('.sidebar');
    var oBartop = document.querySelectorAll('.bar-top');
    var oList = document.querySelectorAll('.bar-top li');
    var oLink = document.querySelectorAll('.bar-top .original-img');
    var oHover = document.querySelectorAll('.bar-top .hover-img');


    for(let  i = 0;i<oList.length;i++){

        oList[i].onmouseover = function () {
            // alert(1)
            oLink[i].style.display = 'none';
            oHover[i].style.display = 'block';
        };
        oList[i].onmouseleave = function () {
            // alert(1)
            oLink[i].style.display = 'block';
            oHover[i].style.display = 'none';
        }
    }
    var x = document.querySelector('.home-hero');
    var offsetLeft,offsetWidth;
    try{
        +function () {
            window.onresize = arguments.callee;
            offsetLeft = x.offsetLeft;
            offsetWidth = x.offsetWidth;
            oSid.style.position = 'fixed';
            oSid.style.top = '50%';
            oSid.style.left = offsetLeft+offsetWidth +20+'px';

        }();
    }catch{
        console.log(1)
    }


// console.log(document.documentElement.scrollTop & document.body.scrollTop);
    window.onscroll = function(){ //绑定scroll事件
        var sT = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动距离
        var oTop = document.querySelector('.to-top');

        if( sT >=4000 ) { //判断
            oTop.style.opacity = "1";
        } else {
            oTop.style.opacity = "0";
        }
    };


//门店服务
    var oUl = document.querySelector('.bacrdArea');
    var oArea = document.querySelectorAll('.bacrdArea li');
    var oCon = document.querySelectorAll('.content-box');
    var oText = document.querySelectorAll('.content-box .content-text');
    var oContent_img = document.querySelectorAll('.content-box .content-img');
    for (var i = 0;i<oArea.length;i++){
        oArea[i].index = i;
        oArea[i].onmouseover = function () {
            for(var i = 0;i<oArea.length;i++){
                oArea[i].style.width = '190px';
                oText[i].style.width = '190px';
                // oArea[i].style.transform = 'scale(1)';
            }
            this.style.width = '400px';
            // this.style.transform = 'scale(1.1)';
            oText[this.index].style.width = '400px'

        };

        oUl.onmouseleave = function () {
            for(var i = 0;i<oArea.length;i++){
                oArea[i].style.width = '232px';
                oText[i].style.width = '232px';
            }
        }
    }


    $("#back-top").click(function() {
        $('body,html').animate({scrollTop: '0'}, 'slow');
        return false; //防止默认事件行为
    });


console.log(sessionStorage.user)
    var oMyself = document.querySelector('#myself');
    oMyself.onclick = function () {
        // alert(1)
        if(sessionStorage.user){
            window.location.href = '/myCenter'
        }else {
            window.location.href = 'http://localhost:1234/pages/login.html';
        }



    };

    $('#oclothes').click( function () {

        window.location.href = 'http://localhost:1234/pages/ProductList.html'
    });






    $(function () {
        $.ajax({
            url:'/picIndex',
            success:function (res) {
                var data = res

                $('.do-element-media-ul').html('')
                for(var i = 0;i<data.length;i++){
                    var n = i+1
                    $('.commodity_ul').append(`
                    <li>
                        <div>
                            <img src="${data[i].food_img}" height="100%" width="100%"/>
                        </div>
                        <p class="shop-name">${data[i].food_name}</p>
                        <p class="shop-hot"><span class="shop-hot">NEW</span></p>
                        <p class="shop-price"><i class="fa fa-cny"></i>${data[i].food_price}</p>
                        <a class="buy_btn " href="http://localhost:1234/ProductDetails.html?id=200${n}"><span>加入购物车<span class="ico"> > </span></span></a>
                    </li>
                    `);
                    $('.commodity_ul2').append(`
                    <li>
                        <div>
                            <img src="${data[i].articles_img}" height="100%" width="100%"/>
                        </div>
                        <p class="shop-name">${data[i].articles_name}</p>
                        <p class="shop-hot"><span class="shop-hot">NEW</span></p>
                        <p class="shop-price"><i class="fa fa-cny"></i>${data[i].articles_price}</p>
                        <a class="buy_btn " href="http://localhost:1234/ProductDetails.html?id=200${n}"><span>加入购物车<span class="ico"> > </span></span></a>
                    </li>
                    `);
                    $('.commodity_ul3').append(`
                    <li>
                        <div>
                            <img src="${data[i].Toys_img}" height="100%" width="100%"/>
                        </div>
                        <p class="shop-name">${data[i].Toys_name}</p>
                        <p class="shop-hot"><span class="shop-hot">NEW</span></p>
                        <p class="shop-price"><i class="fa fa-cny"></i>${data[i].Toys_price}</p>
                        <a class="buy_btn " href="http://localhost:1234/ProductDetails.html?id=200${n}"><span>加入购物车<span class="ico"> > </span></span></a>
                    </li>
                    `)
                }




                var oElement = document.querySelectorAll('.do-element-media-ul li');
                var oIco = document.querySelectorAll('.do-element-media-ul .ico');
                var oImg = document.querySelectorAll('.do-element-media-ul li img');
                for(let  i=0;i<oElement.length;i++) {

                    oElement[i].onmouseenter = function(){
                        oElement[i].style.backgroundColor = '#fcedef';
                        oImg[i].style.transform = 'scale(1.2)';
                        oIco[i].innerHTML = '+'

                    }
                    oElement[i].onmouseleave = function () {
                        oElement[i].style.backgroundColor = '';
                        oImg[i].style.transform = 'scale(1)';
                        oIco[i].innerHTML = '>'

                    };



                }



            }
        });
    });


    $('#shopcart').click(function () {

        window.location.href = 'http://localhost:1234/pages/myCart.html'

    })






}catch{
    console.log(1)
}