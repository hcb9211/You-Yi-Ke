$(function(){
// 小盒子
	var smallbox=$('.smallbox')[0];
	var sw=parseInt(getStyle(smallbox,'width'));
	var sh=parseInt(getStyle(smallbox,'height'));
// 大图片
	var bigimg=$('img',$('.bigbox')[0])[0];
	var bw=parseInt(getStyle(bigimg,'width'));
	var bh=parseInt(getStyle(bigimg,'height'));

	smallbox.onmousemove=function(e){
		var ev=e||window.event;
		var ox=ev.offsetX; 
		var oy=ev.offsetY;


		var bilix=sw/bw;
		var biliy=sh/bh;

		var lefts=ox/bilix;
		var tops=oy/biliy;

		bigimg.style.left=-lefts+'px';
		bigimg.style.top=-tops+'px';
	}

})