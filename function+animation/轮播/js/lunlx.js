window.onload=function(){
	var win=$(".window")[0];
	var as=$("a",win);
	var lis=$("li",win);
	var len=as.length;
	var num=0;
	var btn=$(".btn")[0];
	var btnL=$(".btnL",btn)[0];
	var btnR=$(".btnR",btn)[0];
	var flag=true;
	var arrColor=['#357BFF','#FB8287','#1BC1E7','#383838','#FFDDE3']
	for(var i = 0;i < len; i++){
		if(i==0){
			lis[0].style.background='red';
			continue;
		}
		animate(as[i],{opacity:0})
	}
// 让图片轮播起来
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

	function moveL(){
		num--;
		if(num<0)
		{	
			lis[0].style.background="red";
			num=len-1;
		}
		for(var i=0;i<len;i++)
		{
			animate(as[i],{opacity:0})
			lis[i].style.background="#ccc";
		}
		animate(as[num],{opacity:1},function(){flag=true})
		lis[num].style.background="red"
		win.style.borderColor=arrColor[num];
	}

	function moveR(){
		num++;
		if(num==len)
		{
			lis[0].style.background="red";
			num=0;
		}
		for(var i=0;i<len;i++)
		{
			animate(as[i],{opacity:0});
			lis[i].style.background="#ccc";
		}
		animate(as[num],{opacity:1},function(){flag=true})
		lis[num].style.background="red";
		win.style.borderColor=arrColor[num];
	}
// 选项卡
   for(var i=0;i<len;i++){
   	lis[i].index=i;
   	lis[i].onclick=function(){
   		for(var i=0;i<len;i++){
   			animate(as[i],{opacity:0});
   			lis[i].style.background="#ccc";
   		}
   			animate(as[this.index],{opacity:1});
   			lis[this.index].style.background="red";
   			win.style.borderColor=arrColor[this.index];
   	}
   }
}