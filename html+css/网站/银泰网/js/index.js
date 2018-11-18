window.onload=function(){
// 微信  
	var tub1=$(".tub1")[0];
	var tub2=$(".tub2")[0];
	var ass=$("a",tub1)[0];
	var imgs=$("img",ass)[0];
	var tub01=$(".tub01")[0];
	var tub02=$(".tub02")[0];
	var wei2=$(".wei2",ass)[0];
	var xiahua=$(".xiahua",ass)[0];
	tub1.onmouseover=function(){
		this.style.background='#fff';
		tub01.style.display="block"
	}
	tub1.onmouseout=function(){
		tub01.style.display="none";
		this.style='none'
	}
	tub2.onmouseover=function(){
		this.style.background='#fff';
		tub02.style.display="block"
	}
	tub2.onmouseout=function(){
		tub02.style.display="none";
		this.style='none'
	}
// 我的银泰
var ytai=$(".ytai")[0];
var ytai1=$(".ytai1",ytai)[0];
ytai.onmouseover=function(){
	ytai1.style.display="block";
}
ytai.onmouseout=function(){
	ytai1.style.display="none";
}

// banner轮播
var ban=$(".banner")[0];
var lun=$(".lun",ban)[0];
var as=$("a",lun);
var lis=$("li",lun);
var btn=$(".btn")[0];
var btnL=$(".btnL",btn)[0];
var btnR=$(".btnR",btn)[0];
var len=as.length;
var num=0;
var flag=true;

for(var i=0;i<len;i++){
	if(i==0){
		lis[0].style.background="#E5004F";
		continue;
	}
	animate(as[i],{opacity:0});
}
var t=setInterval(moveR,1000);
lun.onmouseover=function(){
	clearInterval(t);
	animate(btn,{opacity:1});

}
lun.onmouseout=function(){
	t=setInterval(moveR,1000);
	animate(btn,{opacity:0});
}
btnR.onclick=function(){
	if(flag){
		flag=false;
		moveR();
	}
}
btnL.onclick=function(){
	if (flag) {
		flag=false;
		moveL();
	}
}
function moveR(){
	num++;
	if(num==len){
		lis[0].style.background="#E5004F";
		num=0;
	}
	for(var i=0;i<len;i++){
		animate(as[i],{opacity:0});
		lis[i].style.background="#211616";
	}
		animate(as[num],{opacity:1},function(){flag=true});
		lis[num].style.background="#E5004F";
}
function moveL(){
	num--;
	if(num<0){
		lis[0].style.background="#E5004F";
		num=len-1;
	}
	for(var i=0;i<len;i++){
		animate(as[i],{opacity:0});
		lis[i].style.background="#211616";
	}
		animate(as[num],{opacity:1},function(){flag=true});
		lis[num].style.background="#E5004F";
}

	for(var i=0;i<len;i++){
   		lis[i].index=i;
   		lis[i].onclick=function(){
   		for(var j=0;j<len;j++){
   			animate(as[j],{opacity:0});
   			lis[j].style.background="#E211616";
   		}
   			animate(as[this.index],{opacity:1});
   			lis[this.index].style.background="#E5004F";
   	}
   }





// banner选项卡
var bannerl=$('.bannerl');
var ban1=$("#ban_1");
var xuan1=$(".xuan_1",ban1)[0];
ban1.onmouseover=function(){
	xuan1.style.display="block";
}
ban1.onmouseout=function(){
	xuan1.style.display="none"
}

var ban2=$("#ban_2");
var xuan2=$(".xuan_2",ban2)[0];
ban2.onmouseover=function(){
	xuan2.style.display="block";
}
ban2.onmouseout=function(){
	xuan2.style.display="none"
}

var ban3=$("#ban_3");
var xuan3=$(".xuan_3",ban3)[0];
ban3.onmouseover=function(){
	xuan3.style.display="block";
}
ban3.onmouseout=function(){
	xuan3.style.display="none"
}

var ban4=$("#ban_4");
var xuan4=$(".xuan_4",ban4)[0];
ban4.onmouseover=function(){
	xuan4.style.display="block";
}
ban4.onmouseout=function(){
	xuan4.style.display="none"
}

var ban5=$("#ban_5");
var xuan5=$(".xuan_5",ban5)[0];
ban5.onmouseover=function(){
	xuan5.style.display="block";
}
ban5.onmouseout=function(){
	xuan5.style.display="none"
}

var ban6=$("#ban_6");
var xuan6=$(".xuan_6",ban6)[0];
ban6.onmouseover=function(){
	xuan6.style.display="block";
}
ban6.onmouseout=function(){
	xuan6.style.display="none"
}

var ban7=$("#ban_7");
var xuan7=$(".xuan_7",ban7)[0];
ban7.onmouseover=function(){
	xuan7.style.display="block";
}
ban7.onmouseout=function(){
	xuan7.style.display="none"
}

var ban8=$("#ban_8");
var xuan8=$(".xuan_8",ban8)[0];
ban8.onmouseover=function(){
	xuan8.style.display="block";
}
ban8.onmouseout=function(){
	xuan8.style.display="none"
}

var ban9=$("#ban_9");
var xuan9=$(".xuan_9",ban9)[0];
ban9.onmouseover=function(){
	xuan9.style.display="block";
}
ban9.onmouseout=function(){
	xuan9.style.display="none"
}

var ban10=$("#ban_10");
var xuan10=$(".xuan_10",ban10)[0];
ban10.onmouseover=function(){
	xuan10.style.display="block";
}
ban10.onmouseout=function(){
	xuan10.style.display="none"
}

// 线条
var box=$('.te-bot')[0];
var xian=$('li',box);
line(xian);

var box0=$('.nan-right')[0];
var xian0=$('li',box0);
line(xian0);

var box1=$('.nan-right')[1];
var xian1=$('li',box1);
line(xian1);

var box2=$('.nan-right')[2];
var xian2=$('li',box2);
line(xian2);

var box3=$('.nan-right')[3];
var xian3=$('li',box3);
line(xian3);

var box4=$('.nan-right')[4];
var xian4=$('li',box4);
line(xian4);

var box5=$('.nan-right')[5];
var xian5=$('li',box5);
line(xian5);

var box6=$('.nan-right')[6];
var xian6=$('li',box6);
line(xian6);

var box7=$('.nan-right')[7];
var xian7=$('li',box7);
line(xian7);

var box8=$('.nan-right')[8];
var xian8=$('li',box8);
line(xian8);

	







}


