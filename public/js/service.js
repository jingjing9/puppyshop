/**
 * Created by Administrator on 2018/12/2.
 */


// 订单下单存储
console.log($('select option'))
$(function() {

    $('#findinput').keydown(function () {
        $('tbody tr').hide().filter(":contains('" + ($(this).val()) + "')").show();
    }).keyup();


    
    
//存储
    var data = [
        {state:'待使用',
            pic:'img src="../images/s-bath-big.jpg"',
            name:'大狗洗澡',
            door:'春熙路店',
            code:'JKEKDH231241JSJSJQ',
            user:'一位爱狗人士',
            price: '99'
        },

        {state:'待使用',
            pic:'img src="../images/s-bath-mid.jpg"',
            name:'中狗洗澡',
            door:'犀浦店',
            code:'QOHDWE112233LDLJRQ',
            user:'来自大海的神',
            price: '79'
        },

        {state:'待使用',
            pic:'img src="../images/s-bath-small.jpg"',
            name:'小狗洗澡',
            door:'世纪城店',
            code:'YEVBDG957365LDLJRB',
            user:'来自大海的神',
            price: '59'
        },

    ];
    function storage(arr) {
        localStorage.clear();
        var s = JSON.stringify(arr);
        localStorage.setItem('data',s);
    }
    storage(data);
    var json=localStorage.getItem('data');
    var obj=JSON.parse(json);
    console.log(obj);


//添加
    function init() {
        $('tbody').html('');
        $.each(data,function (i,v) {
            console.log(i);

            $('tbody').append(

                '<tr data-index="'+i+'"> ' +
                '<td> <span>' +v.state+ '</span> </td>' +
                ' <td> <img class="tupian"><' +v.pic+'width=260px;height=260px></img></td> ' +
                '<td> <span>' +v.name+ '</span> </td>' +
                '<td> <span>' +v.door+ '</span> </td>' +
                ' <td> <span>' +v.code+ '</span> </td>' +
                ' <td> <span style="color: red"><h4>' +v.price+ '￥</h4></span></td> ' +

                '<td> <span> <button type="submit" data-index="'+i+'" class="btn btn-danger" id="delete" data-toggle="modal" data-target="#myModal"style="width: 80px;background-color: #ffcd04;border: none"> <span class="glyphicon glyphicon-trash" aria-hidden="true">立即取消</span> </button> </span> </td> ' +

                // '<td> <span> <button type="submit" class="btn btn-info" style="width: 80px;background-color: #ffcd04;border: none">立即取消</button> </span> </td> ' +

                // '<td> <span> <button data-index="'+i+'" class="btn btn-danger" id="delete" data-toggle="modal" data-target="#myModal"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </span> </td> ' +


                // '<td> <span> <button data-index="'+i+'" class="btn btn-info" id="find" data-toggle="modal" data-target="#View"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> </button> </span> </td> ' +

                '</tr>');

        });
    }

    init();
    //
    // $('#add').on('click','#save',function () {
    //     var str1=$('.number1').val();
    //     var str2=$('.name1').val();
    //     var str3=$('.department-description1').val();
    //     var str4=$('.department-people1').val();
    //     var str5=$('.department-admin1').val();
    //     var str6=$('.department-phone1').val();
    //     data.push({
    //         state:str1,
    //         pic:str2,
    //         name:str3,
    //         code:str4,
    //         user:str5,
    //         price:str6
    //     });
    //     $('').val('');
    //     $('').val('');
    //     $('').val('');
    //     $('').val('');
    //     $('').val('');
    //     $('').val('');
    //
    //     storage(data);
    //     init();
    //
    // })

    //
    // //添加
    // function init() {
    //     $('tbody').html('');
    //     $.each(data,function (i,v) {
    //         console.log(i);
    //         $('tbody').append( '<tr data-index="'+i+'"> <td> <span><input type="checkbox"></span> </td> <td> <span>'+v.number+'</span> </td> <td> <span>'+v.name+'</span> </td> <td> <span>'+v.description+'</span> </td> <td> <span>'+v.people+'</span> </td> <td> <span> <button data-index="'+i+'" class="btn btn-info see" data-toggle="modal" data-target="#test"> <span class="glyphicon glyphicon-pencil"></span> </button> </span> </td> <td> <span> <button data-index="'+i+'" class="btn btn-danger" id="delete" data-toggle="modal" data-target="#myModal"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </span> </td> <td> <span> <button data-index="'+i+'" class="btn btn-info" id="find" data-toggle="modal" data-target="#View"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> </button> </span> </td> </tr>');
    //     });
    // }
    //
    // init();
    //
    // $('#add').on('click','#save',function () {
    //     var str1=$('.number1').val();
    //     var str2=$('.name1').val();
    //     var str3=$('.department-description1').val();
    //     var str4=$('.department-people1').val();
    //     var str5=$('.department-admin1').val();
    //     var str6=$('.department-phone1').val();
    //     data.push({
    //     number:str1,
    //     name:str2,
    //     description:str3,
    //     people:str4,
    //     admin:str5,
    //     phone:str6
    //     });
    //     $('.number1').val('');
    //     $('.name1').val('');
    //     $('.department-description1').val('');
    //     $('.department-people1').val('');
    //     $('.department-admin1').val('');
    //     $('.department-phone1').val('');
    //
    //     storage(data);
    //     init();
    //
    // })


//删除服务订单
    $('#myModal').on('show.bs.modal',function (ev) {
        $('#prompt').html('确定立刻删除此条服务订单吗? 如果确定删除，将不收取任何费用，并将退款返回到你的银行账户。');
        $(this).attr('data-index',$(ev.relatedTarget).attr('data-index'))
    });
    $('#myModal').on('click','#del',function () {
        var index = $(this).parents('tr').attr('data-index');
        data.splice(index,1); init();
        $('tr[data-index='+index+']').remove();
        console.log(index)
    });



// 查看
    $('tbody').on('click','#find',function () {

        var index=$(this).parents('tr').attr('data-index');
        $('.number2').val(data[index].number);
        $('.name2').val(data[index].name);
        $('.department-description2').val(data[index].description);
        $('.department-people2').val(data[index].people);
        $('.department-admin2').val(data[index].admin);
        $('.department-phone2').val(data[index].phone);

    });

});
    
    
    
    // //编辑
    // $('tbody').on('click','.see',function () {
    //
    //     var index=$(this).parents('tr').attr('data-index');
    //
    //     $('.number').val(data[index].number);
    //     $('.name').val(data[index].name);
    //     $('.department-description').val(data[index].description);
    //     $('.department-people').val(data[index].people);
    //     $('.department-select option').html(data[index].admin);
    //     $('.department-phone').val(data[index].phone);
    //
    //    
    //
    // });
    //
    //





//
// //全选 取消，反选
// $('#all').click(function () {
//     $('td input').each(function () {
//         $(this).prop('checked',true)
//     })
// });
// $('#exit').click(function () {
//     $('td input').each(function () {
//         $(this).prop('checked',false)
//     })
// });
// $('#back').click(function () {
//     $('td input').each(function () {
//         if($(this).prop('checked')){
//             $(this).prop('checked',false)
//         }else {
//             $(this).prop('checked',true)
//         }
//     })
// });
//
//






/*
 *
 * 控件震动动画
 * obj控件
 * time震动时间长——短循环长度
 * wh震动幅度px
 * fx动画速度s
 */
function flash(obj,time,wh,fx)
{
    $(function(){
        var $panel = $(obj);
        var offset = $panel.offset()-$panel.width();
        var x= offset.left;
        var y= offset.top;
        for(var i=1; i<=time; i++){
            if(i%2==0)
            {
                $panel.animate({left:'+'+wh+'px'},fx);
            }else
            {
                $panel.animate({left:'-'+wh+'px'},fx);
            }

        }
        $panel.animate({left:0},fx);
        $panel.offset({ top: y, left: x });

    })
}

//弹出和关闭二维码支付

var hshowAddr = $('#hshowAddr');
var selAddrmodel = $('#selAddrmodel');
hshowAddr.on('click',function () {
    selAddrmodel.slideToggle();
});
$('#selPreAddr').on('click',function () {
    selAddrmodel.slideToggle();
});
selAddrmodel.on('click','li',function () {
    hshowAddr.html($(this).html());
    selAddrmodel.slideToggle();
});
$('#subOrder').on('click',function () {
    $('.paymodel').show();

    $.ajax({
        url:'',
        type:'post',
        data:{
            user_id: '1001',

        },
        success:function (res) {

        }
    })
});
$('#close').on('click',function () {
    $('.paymodel').hide();
    window.location.href = '../pages/personalCenter.html'
});



//上传图片

$('#s1').click(function () {

    var formData=new FormData();
    var file=$('#f1')[0].files[0];
    formData.append('files',file);

    $.ajax({
        url:'/upload',
        data:formData,
        type:'post',
        contentType:false, //让他不用appliation/x-www-urlencoded
        processData:false,
        success:function (res) {
            console.log(res)
        }
    })
})