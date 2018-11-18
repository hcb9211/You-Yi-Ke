window.onload=function(){
	var win=$(".window")[0];
	var as=$("a",win);
	var lis=$("li",win);
	var btn=$(".btn",win)[0];
	var btnL=$(".btnL",win)[0];
	var btnR=$(".btnR",win)[0];
	var iw=parseInt(getStyle(as[0],"width"));
	var next=0;
	var index=0;
	var flag=true;

	for(var i=0;i<as.length;i++){
		if(i==0){
			continue;
		}
		as[i].style.left=iw+"px";
	}
	var t=setInterval(moveR,1000);
	win.onmouseover=function(){
		clearInterval(t);

	}
	win.onmouseout=function(){
		t=setInterval(moveR,1000);
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
		next--;
		if(next<0){
			next=as.length-1;
		}
		animate(lis[index],{background:"#ccc"});
		animate(lis[next],{background:"red"});
		// 下一张就位
		as[next].style.left=-iw+"px";
		// 当前离开
		animate(as[index],{left:iw})
		// 下一张显示
		animate(as[next],{left:0},function(){flag=true})
		index=next;
	}

	function moveR(){
		next++;
		if(next==as.length){
			next=0;
		}
		animate(lis[index],{background:"#ccc"});
		animate(lis[next],{background:"red"});
		// 下一张就位
		as[next].style.left=iw+"px";
		// 当前离开
		animate(as[index],{left:-iw})
		// 下一张显示
		animate(as[next],{left:0},function(){flag=true})
		index=next;
	}
	// 选项卡
	for(var i=0;i<as.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			if(index==this.index)
				return;
			for(var j=0;j<as.length;j++){ 
		       animate(lis[j],{background:"#ccc"});
			}
			animate(lis[this.index],{background:"#ff0000"});
			if(this.index>index){
				as[this.index].style.left=iw+"px";
				animate(as[index],{left:-iw});
				animate(as[this.index],{left:0});
				index=this.index;
			}else if(this.index<index){
				as[this.index].style.left=-iw+"px";
				animate(as[index],{left:iw});
				animate(as[this.index],{left:0});
				index=this.index;	
			}
		}
	}
}