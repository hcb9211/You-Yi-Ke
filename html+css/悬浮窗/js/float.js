window.onload=function(){
	var float=$(".float")[0];
	var close=$('.close')[0];
	var fw=float.offsetWidth;
	var fh=float.offsetHeight;
	var cw=document.documentElement.clientWidth;
	var ch=document.documentElement.clientHehght;
	var maxW=cw-fw;
	var maxH=ch-fh;
	var speedx=10;
	var speedy=10;

	window.onresize=function(){
		var cw=document.documentElement.clientWidth;
		var ch=document.documentElement.clientHehght;
		var maxW=cw-fw;
		var maxH=ch-fh;
	}
	var t=setInterval(move,20);
	function move(){
		lefts=float.offsetLeft;
		tops=float.offsetTop;
		
		if(lefts>=maxW){
			speedx=-speedx;
		}else if(lefts<=0){
			speedx=0;
		}
		if(tops>=maxH){
			speedy=-speedy;
		}
		else if(tops<=0){
			speedy=0;
		}
		float.style.left=lefts+speedx+'px';
		float.style.top=tops+speedy+'px';
	}
}