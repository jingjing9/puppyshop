var hshowAddr = $('#hshowAddr');
var selAddrmodel = $('#selAddrmodel');
var norder_id;
hshowAddr.on('click',function () {
    selAddrmodel.slideToggle();
});
$('#selPreAddr').on('click',function () {
    selAddrmodel.slideToggle();
});
selAddrmodel.on('click','li',function () {
    var hshowAddr2 = document.getElementById('hshowAddr');
    var span1 = hshowAddr2.getElementsByTagName('span');
    var selAddrmodel2 = document.getElementById('selAddrmodel');
    var span2 = selAddrmodel2.getElementsByTagName('span');
    for(var i=0;i<4;i++){
        span1[i].innerHTML = span2[i].innerHTML;
    }
    selAddrmodel.slideToggle();
});

$('#subOrder').on('click',function () {
    var nowAddr = parseInt($('#add_id').html());//地址id
    if(isNaN(nowAddr)){
        alert('请选择地址!')
    }else {
        var leavMsg1 = $('#leavMsg1').val();
        if(leavMsg1==''){
            leavMsg1 = null
        }
        $('.paymodel').fadeIn();
        var user_id = parseInt($('#user_id').html());
        var liLength = document.getElementsByClassName('list1');
        var goods_id;
        var json;
        var arr = [];
        for(var i=0;i<liLength.length;i++){
            goods_id = parseInt(liLength[i].getElementsByClassName('goods_id')[0].innerHTML);
            goods_name = liLength[i].getElementsByClassName('goods_name')[0].innerHTML;
            c_num = parseInt(liLength[i].getElementsByClassName('c_num')[0].innerHTML);
            now_price = parseInt(liLength[i].getElementsByClassName('now_price')[0].innerHTML);
            json = {
                'goods_id':goods_id,
                'goods_name':goods_name,
                'c_num':c_num,
                'now_price':now_price
            };
            arr.push(json)
        }
        var oDate = new Date();
       var year = oDate.getFullYear();
       var month = oDate.getMonth();
       var date = oDate.getDate();
       var hour = oDate.getHours();
       var minites = oDate.getMinutes();
        var order_day = year+'-'+month+'-'+date;
        var order_time = hour+':'+minites;
        if(month<10){
            month='0'+month
        }
        console.log(order_day,order_time)
        $.ajax({
            url:'/subPurchase',
            async: false,
            data:{
                'add_id':nowAddr,
                'order_say':leavMsg1,
                'user_id':user_id,
                'data1':arr,
                'order_day':order_day,
                'order_time':order_time

            },
            success:function (res) {
                /*  window.location.href = '/seeOrder';*/
                norder_id = res.order_id;
            }
        });
        sessionStorage.norder_id=norder_id;
        sessionStorage.page_id=3;
    }
});
$('#close').on('click',function () {
    $('.paymodel').fadeOut();
    window.location.href = '/myCenter';
    /*   window.location.href = '/myCenter';*/

});
