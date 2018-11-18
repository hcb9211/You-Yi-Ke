$(function(){
// 小盒子
	var sb=$('.smallbox')[0];
	var sw=parseInt(getStyle(sb,'width'));
	var sh=parseInt(getStyle(sb,'height'));
// mask遮罩
	var mask=$('.mask')[0];
	var mw=parseInt(getStyle(mask,'width'));
	var mh=parseInt(getStyle(mask,'height'));
	var opacity=$('.opacity')[0];
// 大盒子
	var bigbox=$('.bigbox')[0];
	var bw=parseInt(getStyle(bigbox,'width'));
	var bh=parseInt(getStyle(bigbox,'height'));
// 大图
	var bigImg=$('img',bigbox)[0];

	opacity.onmousemove=function(e){
		var ev=e||window.event;
		mask.style.display='block';
		bigImg.style.display="block";

		// 拖拽mask
		var ox=ev.offsetX-mw/2;
		var oy=ev.offsetY-mh/2;
		var lefts=ox;
		var tops=oy;

		// 让mask动起来
		if(lefts>=sw-mw){
			lefts=sw-mw;
		}
		if(lefts<=0){
			lefts=0;
		}
		if(tops>=sh-mh){
			tops=sh-mh;
		}
		if(tops<=0){
			tops=0;
		}
		mask.style.left=lefts+'px';
		mask.style.top=tops+'px';
	//图片缩放
	    var biliX=mw/bw;
	    var biliY=mh/bh;
		bigImg.style.width=bw/(biliX)+"px";
   		bigImg.style.height=bh/(biliY)+"px";
	//图片移动
	   	bigImg.style.left=-(lefts/biliX)+"px";
	    bigImg.style.top=-(tops/biliY)+"px";

	}

	opacity.onmouseout=function(e){
		var ev=e||window.event;
		mask.style.display='none';
		bigImg.style.display="none";
	}



})