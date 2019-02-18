$('.details-btn').click(function () {
    $(this).attr('class', 'details-btn defult-color');
    $('.eva-btn').attr('class', 'eva-btn');
    $('.details-con').show();
    $('.evalute').hide();
    $('.user-eva').hide();
})
$('.eva-btn').click(function () {
    $(this).attr('class', 'eva-btn defult-color');
    $('.details-btn').attr('class', 'details-btn');
    $('.details-con').hide();
    $('.evalute').show();
    $('.user-eva').show();
})

// 图片列表点击切换展示
$('.preview-img-list > div > img').each(function () {
    $(this).on('click', function () {
        var src = $(this).attr('src');

        $('.img-box > img').attr('src', src);
        $('.img-box-big >img').attr('src', src);
    })
})


$('.img-box').on('mouseover', function (e) {
    $('.img-box-small').show();
    $('.img-box-big').show();
    var x = e.clientX;
    var y = e.clientY;
    $('.img-box').on('mousemove', function (e) {
        var l = e.clientX - $('.img-box-small').width() / 2 - $(this).offset().left;
        var t = e.clientY - $('.img-box-small').height() / 2 - $(this).offset().top;

        if (l <= 0) {
            l = 0;
        } else if (l >= $(this).width() - $('.img-box-small').width()) {
            l = $(this).width() - $('.img-box-small').width();
        }
        if (t <= 0) {
            t = 0;
        } else if (t >= $(this).height() - $('.img-box-small').height()) {
            t = $(this).height() - $('.img-box-small').height();
        }
        $('.img-box-small').css({
            top: t,
            left: l
        });
        $('.img-box-big > img').css({
            top: -t,
            left: -l
        })
    })
    $('.img-box').on('mouseleave', function () {
        $('.img-box-small').hide();
        $('.img-box-big').hide();
    })
})


// 选择商品
$('.type1-list > div').click(function () {
    $.each($('.type1-list > div'), function (i) {
        $($('.type1-list > div')[i]).removeClass('active')
    })
    $(this).addClass('active')
})
$('.type2-list > div').click(function () {
    $.each($('.type2-list > div'), function (i) {
        $($('.type2-list > div')[i]).removeClass('active')
    })
    $(this).addClass('active')
})

$('.fa-plus-square').click(function () {
    var num = $('#com-number').val()
    num++;
    $('#com-number').val(num)
})

$('.fa-minus-square').click(function () {
    var num = $('#com-number').val()
    num--;
    if (num < 1) {
        num = 1
    }
    $('#com-number').val(num)
})



// 聊天客服


$('.contact-ser').on('click', function (e) {
    var x = e.clientX,
        y = e.clientY + $(window).scrollTop();
    var nx = window.innerWidth - $('.chat').width() - 27,
        ny = window.innerHeight - $('.chat').height() - 10;

    $('.chat').offset({
        top: y,
        left: x,
    })
    $('.chat').css({
        opacity: 1,
        transform: 'scale(1)'
    })
    $('.chat').animate({
        top: ny,
        left: nx
    })
    $('.chat').addClass('transform')
})
$('.user-input input').on('click', function (e) {
    if ($('#user-val').val() !== '') {
        var str = $('#user-val').val();
        $('.chat-con').append(`
        <div class="clearfix user-box">
                <div class="head-portrait"><img src="../images/666.jpg"></div>
                <div class="chat-box">
                    <p class="chat-text">${str}</p>
                </div>
        </div>`)
        $('#user-val').val('');
    }
})

$('.close').on('click', function () {
    $('.chat').removeClass('transform').css({
        opacity: 0,
        transform: 'scale(0)'
    })
    setTimeout(function () {
        $('.chat').removeAttr('style')
    }, 500)
})


function render(src, des, pre, now, sales) {
    return `
    <div class="serp-list">
    <div class="center">
            <div class="img">
                    <img src="${src}">
            </div>
            <p class="notice">${des}</p>
            <p class="price clearfix"><del>¥${pre}</del><span>¥${now}</span></p>
            <p class="sales">${sales}人已购买</p>
    </div>
</div>
    `
}

function render1(num) {
    return `<span class="productList-num" style="margin-right: 20px;">共找到${num}件商品</span><span style="margin-right: 20px;">1/12</span>
    <input type="button" value="上一页" class="top">
    <input type="button" value="下一页" class="down">`
}

function render2(res) {
    $('.serp-result').html('');
    $('.paging .right').html('')
    $('.paging .right').append(render1(res.length));
    $.each(res, function (i) {
        $('.serp-result').append(render(res[i].pic1, res[i].goods_name, res[i].pre_price, res[i].now_price, res[i].goods_inv))
    })
}
// 默认展示商品列表
$.ajax({
    url: '/productList',
    success: function (res) {
        render2(res);
    }
})
// 商品分类
$('.commodity-title').on('click', function (e) {
    $.ajax({
        url: '/productList',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();
})
// 宠物用品
$('.thing').eq(0).on('click', function (e) {
    $.ajax({
        url: '/thing',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();

})

// 宠物零食
$('.snacks').on('click', function (e) {
    $.ajax({
        url: '/food',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();

})

// 宠物服饰
$('.costume').on('click', function (e) {
    $.ajax({
        url: '/costume',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();
})

// 宠物玩具
$('.toy').on('click', function (e) {
    $.ajax({
        url: '/toy',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();
})

// 宠物用品
$('.thing').eq(1).on('click', function (e) {
    $.ajax({
        url: '/thing1',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();
})

// 宠物主食
$('.snacks-list li').eq(0).on('click', function (e) {
    $.ajax({
        url: '/staple',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();
})

// 宠物零食
$('.snacks-list li').eq(1).on('click', function (e) {
    $.ajax({
        url: '/snacks',
        success: function (res) {
            render2(res);
        }
    })
    e.stopPropagation();
})


// 搜索
$('.search-btn').on('click', function () {
    var val = $('.search-con').val();
    $.ajax({
        url: '/keyword',
        data: {
            keyword: val
        },
        success: function (res) {
            render2(res);
        }
    })
})

$('.search-con').on('keydown', function (e) {
    if (e.keyCode == 13) {
        var val = $('.search-con').val();
        $.ajax({
            url: '/keyword',
            data: {
                keyword: val
            },
            success: function (res) {
                render2(res);
            }
        })
    }
})



// 页面跳转
setTimeout(function () {
    $('.serp-result').on('click', function (e) {
        $.each($(e.target).parents(), function (i) {
            if ($($(e.target).parents()[i]).attr('class') == 'serp-list') {
                var str = $(this).find('.notice').html();
                switch (str) {
                    case '2017年新款 妮可威尔 华夫格休闲亲子外套 狗狗装 黑色 M号':
                        window.location.href = 'http://localhost:1234/ProductDetails.html?id=2001'
                        $.ajax({
                            url: '/ProductDetails.html',
                            // data: {
                            //     str: str
                            // },
                            success: function () {}
                        })
                        break;
                    case 'Amycarol 狗狗玩具 风味洁牙棉绳系列 薄荷味 29cm*7.5cm':
                        window.location.href = 'http://localhost:1234/ProductDetails.html?id=2002'
                        $.ajax({
                            url: '/ProductDetails.html',
                            success: function () {}
                        })
                        break;
                    case '绒域坊 天然棉麻布厚实方窝 红色 L号 73*61*23cm ':
                        window.location.href = 'http://localhost:1234/ProductDetails.html?id=2003'
                        $.ajax({
                            url: '/ProductDetails.html',
                            success: function () {}
                        })
                        break;
                    case '钢骨 金刚级H型陪伴零食 牛肉味L号 182g*18支':
                        window.location.href = 'http://localhost:1234/ProductDetails.html?id=2004'
                        $.ajax({
                            url: '/ProductDetails.html',
                            success: function () {}
                        })
                        break;
                    case '冠能小型犬成犬全价犬粮 7kg':
                        window.location.href = 'http://localhost:1234/ProductDetails.html?id=2005'
                        $.ajax({
                            url: '/ProductDetails.html',
                            success: function () {}
                        })
                        break;
                }
            }
        })
    })
}, 100)



// 立即购买
$('.btn-buy').on('click', function () {
    var goods_id = document.getElementsByClassName('number')[0].innerHTML.replace(/[^0-9]/ig, "")
    var user_id = '1001';
    var goods_name = $('.commodity-title h3').html();
    var pic1 = $('.preview-img-list div').eq(0).children().attr('src')
    var c_num = $('#com-number').val();
    var now_price = $('.promotion > span').html().replace(/[^0-9]/ig, "")

    var arr = [];
    var json = {
        goods_id: goods_id,
        user_id: user_id,
        goods_name: goods_name,
        pic1: pic1,
        c_num: c_num,
        now_price: now_price
    }
    arr.push(json)
    $.ajax({
        url: '/purchase',
        data: {
            data: arr
        },
        success: function (res) {
            console.log('成功');
        }
    })
    window.location.href = "http://localhost:1234/orderimdet";
})


// 加入购物车

$('.btn-shopping').on('click', function () {
    var arr = [];
    var goods_id = document.getElementsByClassName('number')[0].innerHTML.replace(/[^0-9]/ig, "")
    var user_id = '1001';
    var c_num = $('#com-number').val();
    var json = {
        goods_id: goods_id,
        user_id: user_id,
        c_num: c_num,
    }
    arr.push(json)
    var arr1 = [];
    var json1 = {
        goods_id: goods_id,
        c_num: c_num
    }
    arr1.push(json1);
    setTimeout(function () {
        $.ajax({
            url: '/CartId',
            success: function (res) {
                var key = true;
                $.each(res, function (i) {
                    if (res[i].goods_id == goods_id) {
                        $.ajax({
                            url: '/myCartNum',
                            data: {
                                data: arr1
                            },
                            success: function (res) {
                                console.log('成功加入');
                            }
                        })
                        key = false;
                    } else {
                        if (i == res.length - 1 && key == true) {
                            $.ajax({
                                url: '/myCart',
                                data: {
                                    data: arr
                                },
                                success: function (res) {
                                    console.log('成功加入');
                                }
                            })
                        }
                    }
                })
            }
        })
    }, 100)
    alert('已加入购物车')
})

// 购物车数量加减
$('#mc-ul').on('click', '.mc-add', function () {
    var num = $(this).parent().children().eq(1).html()
    var amount = 0;
    num++;
    $(this).parent().children().eq(1).html(num);
    var price = $(this).parent().prev().children().first().children().html().replace(/[^0-9]/ig, "")
    var total = price * num;
    $(this).parent().prev().children().last().children().html(total);
    // $.each($('.total'), function (i) {
    //     amount += parseInt($($('.total')[i]).html().replace(/[^0-9]/ig, ""));
    //     $('#mc-totalprice').html(amount)
    // })
})
$('#mc-ul').on('click', '.mc-sub', function () {
    var num = $(this).parent().children().eq(1).html()
    var amount = 0;
    num--;
    if (num < 1) {
        num = 1
    }
    $(this).parent().children().eq(1).html(num);
    var price = $(this).parent().prev().children().first().children().html().replace(/[^0-9]/ig, "")
    var total = price * num;
    $(this).parent().prev().children().last().children().html(total)
    // $.each($('.total'), function (i) {
    //     amount += parseInt($($('.total')[i]).html().replace(/[^0-9]/ig, ""));
    //     $('#mc-totalprice').html(amount)

    // })
})


// 全选
$('#mc-ul').on('click', '.mc-check', function () {
    if ($(this).attr('style')) {
        $(this).removeAttr('style')
        $(this).parent().parent().removeAttr('index')
    } else {
        $(this).css({
            color: '#d91e25'
        })
        $(this).parent().parent().attr('index', 0)
    }

})




// 购物车 加载时

function render4(res) {

    var amount = 0;
    $('#mc-ul').html('');
    $.each(res, function (i) {
        amount += res[i].now_price * res[i].c_num;
        $('#mc-ul').append(`
                <li>
                        <p>${res[i].goods_name}</p>
                        <div class="mc-left">
                        <i class=" fa fa-check-circle mc-check" aria-hidden="true"></i>
                        </div>
                        <div class="mc-right">
                            <img src="${res[i].pic1}" alt="">
                            <div class="mc-det">
                                <p>单价：<span class="price">￥${res[i].now_price}</span></p>
                               ${res[i].goods_spe2}：<span>${res[i].spe2_val}</span>
                                ${res[i].goods_spe1}：<span>${res[i].spe1_val}</span>
                                <p>小计：<span class="total">￥${res[i].now_price * res[i].c_num}</span></p>
                            </div>
                            <div class="mc-operat">
                                <div class="mc-add">+</div>
                                <div class="mc-num">${res[i].c_num}</div>
                                <div class="mc-sub">-</div>
                            </div>
                        </div>
                </li>
        `)

    })
    // $('.amount').append(`
    //                     <span>共选 <i id="mc-total">${res.length}</i>件</span>
    //                     <span>共 <i id="mc-totalprice">￥${amount}</i>元</span>
    //                     <div id="mc-account">结算</div>
    //                     `)
}
$.ajax({
    url: "/Cart",
    success: function (res) {
        // console.log(res);

        render4(res);
        var num = [];
        // 删除
        $('#mc-delete').on('click', function () {
            var amount = 0;
            $.each($('#mc-ul >li'), function (i) {
                if ($($('#mc-ul >li')[i]).attr('index') == 0) {
                    console.log(i);
                    num.push(res[i].goods_id)
                }
            })

            $('#mc-ul').find('[index]').remove()

            // $.each($('.total'), function (i) {
            //     amount += parseInt($($('.total')[i]).html().replace(/[^0-9]/ig, ""));
            //     $('#mc-totalprice').html(amount)
            // })
            // $('#mc-total').html($('#mc-ul').children().length)
            $.ajax({
                url: '/remove',
                data: {
                    data: num
                },
                success: function (res) {
                    console.log('已删除');
                }
            })
        })
        //   结算
        $('.amount').on('click', '#mc-account', function () {
            var arr = []; // 商品名称
            var arrnum = []; // 商品数量
            var data = [] // 发送数据
            var number = 0;
            var number1 = 0;
            $.each($('#mc-ul > li'), function (i) {
                if ($($('#mc-ul > li')[i]).attr('index') == 0) {
                    number1++;
                    number += parseInt($($('.total')[i]).html().replace(/[^0-9]/ig, ""));
                    $('#mc-total').html(number1);
                    $('#mc-totalprice').html(`￥${number}`)

                    arrnum.push(parseInt($($('#mc-ul > li')[i]).find('.mc-num').html()))
                    arr.push($($('#mc-ul > li')[i]).find('p').eq(0).html())
                }
            })
            $.each(res, function (i) {
                $.each(arr, function (j) {
                    if (res[i].goods_name == arr[j]) {
                        var goods_id = res[i].goods_id;
                        var user_id = 1001;
                        var goods_name = res[i].goods_name;
                        var pic1 = res[i].pic1;
                        var c_num = arrnum[j];
                        var now_price = res[i].now_price;
                        var goods_id = res[i].goods_id
                        var json = {
                            goods_id: goods_id,
                            user_id: user_id,
                            goods_name: goods_name,
                            pic1: pic1,
                            c_num: c_num,
                            now_price: now_price
                        }
                        data.push(json)
                    }
                })
            });
            console.log(data)
            $.ajax({
                 url: '/purchase',
                 data: {
                     data: data
                 },
                 success: function (res) {
                     console.log('成功');
                 }
             })
             window.location.href = "http://localhost:1234/orderimdet";
        })
    }
})