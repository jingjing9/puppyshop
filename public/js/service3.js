/**
 * Created by dc on 2018/12/7.
 */
/**
 * Created by dc on 2018/12/7.
 */
// 订单下单存储
console.log($('select option'))
$(function() {

    $('#findinput').keydown(function () {
        $('tbody tr').hide().filter(":contains('" + ($(this).val()) + "')").show();
    }).keyup();




//存储
    var data = [
        {user:'一个爱狗的程序猿',
            door:'春熙路店',
            time:'201812031004',
            name:'中分',
            appraise:'很不开心，店主给我我推荐说中分适合我家狗狗，适合个鬼噢，丑死了，还那么贵，下次再也不来了！',
            pic:'img src="../images/s-hair-z.jpg"',
        },

        {user:'国信安张学友',
            door:'世纪城店',
            time:'201812031004',
            name:'大狗洗澡',
            appraise:'这家店给狗狗洗澡很有条理，在给爱犬洗完澡之后，会给狗狗吹 理毛发让狗狗毛发干燥，狗狗会不停的抖身子甩掉身上的水， 就找块毛巾反复来把它身上毛发擦干，再用吹水机把 它的毛都吹干。开心！',
            pic:'img src="../images/s-bath-big.jpg"',
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
                ' <td> <span>' +v.name+ '</span> </td>' +
                '<td> <span>' +v.door+ '</span> </td>' +
                '<td> <span>' +v.user+ '</span> </td>' +
                '<td> <span>' +v.time+ '</span> </td>' +
                '</tr>'+
        
                 '<tr data-index="'+i+'"> ' +
                ' <td> <img class="tupian"><' +v.pic+'width=130px;height=130px></img></td> ' +
                 '<td> <span>' +v.appraise+ '</span> </td>' +
                '</tr>'
                    

            );

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


