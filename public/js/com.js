
var oBox = document.querySelector('.slider-body')
var oLeftbtn = document.querySelector('.com_btn_left');
var oRightbtn = document.querySelector('.com_btn_right');
var aImg = document.querySelectorAll('.slider-body img');
var aOL = document.querySelectorAll('.pager-item li');
var index = 0;//图片下标

oRightbtn.onclick = right();
oLeftbtn.onclick = left();

function right() {
// 清除上一次样式
    aImg[index].className = '';
    aOL[index].className = '';
    // 变换index的值
    index ++;
    if(index >=aImg.length){
        index = 0
    }
    aImg[index].className = 'comimg';
    aOL[index].className = 'comactive';

    // 新样式
}
function left() {
// 清除上一次样式
    aImg[index].className = '';
    aOL[index].className = '';
    // 变换index的值
    index --;
    if(index < 0){
        index = aImg.length - 1
    }
    aImg[index].className = 'comimg';
    aOL[index].className = 'comactive';

    // 新样式
}
for(var i = 0;i<aOL.length;i++){
    aOL[i].index = i;
    aOL[i].onclick = function () {
        index = this.index;
        for (var i = 0;i<aOL.length;i++){
            aImg[i].className= '';
            aOL[i].className = ''
        }
        this.className = 'comactive';
        aImg[index].className = 'comimg'
    }
}
var timer = setInterval(right,1500);
oBox.onmouseover = function () {
    clearInterval(timer)
};
oBox.onmouseleave = function () {
    timer = setInterval(right,1500);
};


var oEamine_pets = document.querySelector('.examine-pets')

var oDog = document.querySelector('#dog')
var oCat = document.querySelector('#cat')

oCat.onclick = function () {
    oEamine_pets.style.left = '-328px'
    oDog.className = '';
    oCat.className = 'active-cut'
}
oDog.onclick = function () {

        oEamine_pets.style.left = '0';
        oDog.className = 'active-cut';
        oCat.className = ''


}
var oDisease = document.querySelector('.disease');//疾病百科按钮
var oCom_body = document.querySelector('.com_body');//疾病百科盒子
var oForum = document.querySelector('.forum');//论坛按钮
var com_Box = document.querySelector('.com_box');//富文本
var oContainer = document.querySelector('.com_container');
var oPublish = document.querySelector('.theme_publish');
var oMeto_warp = document.querySelector('.meto_warp');
var oMeto = document.querySelector('.mito');
oDisease.onclick = function(){
    oCom_body.style.display = 'block';
    oContainer.style.display = 'none';
    com_Box.style.display = 'none';
    oMeto_warp.style.display = 'none';
}

oForum.onclick = function(){
    oContainer.style.display = 'block';
    oCom_body.style.display = 'none';
    com_Box.style.display = 'none';
    oMeto_warp.style.display = 'none';
}

oPublish.onclick = function(){
    oContainer.style.display = 'none';
    oMeto_warp.style.display = 'none';
    oCom_body.style.display = 'none';
    com_Box.style.display = 'block';
};
oMeto.onclick = function(){

    oMeto_warp.style.display = 'block';
    oContainer.style.display = 'none';
    oCom_body.style.display = 'none';
    com_Box.style.display = 'none';
};