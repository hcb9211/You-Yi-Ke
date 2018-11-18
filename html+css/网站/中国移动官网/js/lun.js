window.onload=function(){
// banner轮播图 
	var win=$('.window')[0];
	var as=$("a",win);
	var lis=$("li",win);
	var len=as.length;
	var num=0;
	var btn=$(".btn")[0];
	var btnL=$(".btnL",btn)[0];
	var btnR=$(".btnR",btn)[0];
	var flag=true;
	/*var arrColor=['#E65B08','#FEB3CA','#D2D2D2','#B9DFF2','#E8F6FF','#7A306F','#F34BA3','#8A0000']*/
	for(var i=0;i<len;i++){
		if(i==0){
			continue;
			lis[0].style.background="#E71C84"
		}
		animate(as[i],{opacity:0})
	}

	var t=setInterval(moveR,1000);
	win.onmouseover=function(){
		clearInterval(t);
		animate(btn,{opacity:1});
	}
	win.onmouseout=function(){
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
			if(flag){
				flag=false;
				moveL();	
			}
		}

	function moveR(){
		num++;
		if(num==len){
			lis[0].style.background="#E71C84";
			num=0;
		}
		for(var i=0;i<len;i++){
			animate(as[i],{opacity:0});
			lis[i].style.background="#ccc";
		}
			animate(as[num],{opacity:1},function(){flag=true});
		lis[num].style.background="#E71C84";
		/*win.style.borderColor=arrColor[num];*/
	}

	function moveL(){
		num--;
		if(num<0){
			lis[0].style.background="#E71C84";
			num=len-1;
		}
		for(var i=0;i<len;i++){
			animate(as[i],{opacity:0});
			lis[i].style.background="#ccc";
		}
			animate(as[num],{opacity:1},function(){flag=true})
			lis[num].style.background="#E71C84";
			/*win.style.borderColor=arrColor[num];*/
	}

	for(var i=0;i<len;i++){
   		lis[i].index=i;
   		lis[i].onmouseover=function(){
   		for(var i=0;i<len;i++){
   			animate(as[i],{opacity:0});
   			lis[i].style.background="#ccc";
   		}
   			animate(as[this.index],{opacity:1});
   			lis[this.index].style.background="#E71C84";
   			/*win.style.borderColor=arrColor[this.index];*/
   	}
   }

  // 首页选项卡
            var shou=document.getElementsByClassName('shou');
    		var son=document.getElementsByClassName('son');
    		for(var i=0;i<son.length;i++){
    			shou[i].index=i;      /* 给某一个对象添加一个属性*/
    			shou[i].onmouseover=function(){
    				for(var j=0;j<son.length;j++){
    					son[j].style.display='none'; 
    				}
    				son[this.index].style.display='block'
    			}
    			shou[i].onmouseout=function(){
    				for(var j=0;j<son.length;j++){
    					son[j].style.display='none'
    				}
    			}
    		}

         
// 登录选项卡
 var deng=$(".deng")[0];
 var den1=$(".den1")[0];

 deng.onmouseover=function(){
 	den1.style.display="block";
 }
 deng.onmouseout=function(){
 	den1.style.display="none";
 }

// 二维码选项卡
var sj=$(".sj")[0];
var ewm=$(".erweima")[0];

sj.onmouseover=function(){
	ewm.style.display="block";
}
sj.onmouseout=function(){
	ewm.style.display="none";
}

// 省份选项卡
var city=$(".city")[0];
var city1=$(".city1")[0];

city.onmouseover=function(){
	city1.style.display="block";
}
city.onmouseout=function(){
	city1.style.display="none";
}

// 节点轮播
// var tcbox=$('.tcbox')[0];
// // var box=$('.box',tcbox)[0];
// var liq=$('li',box);
// nodeLunbo(liq,2);
	


}