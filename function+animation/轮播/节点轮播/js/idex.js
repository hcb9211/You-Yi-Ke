window.onload=function(){
	var win=$('.window')[0];
	/*for(var i=0;i<win.length;i++){
		nodeLunbo(win[i],i+1);
	}*/
	nodeLunbo(win,2);
function nodeLunbo(obj,num){
	var box=$('.box',obj)[0];
	var as=$("a",box);
	var aW=parseInt(getStyle(as[0],"width"));
	var btn=$(".btn",obj)[0];
	var btnL=$(".btnL",btn)[0];
	var btnR=$(".btnR",btn)[0];
	var flag=true;
	var t=setInterval(moveR,1000);
    obj.onmouseover=function(){
    	clearInterval(t);
    	animate(btn,{opacity:1});
    }
    obj.onmouseout=function(){
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
		//box左移
		//box的第一张图片插入到最后
		//把box抓回来，left=0
		animate(box,{left:-aW*num},function(){
			for(var i=0;i<num;i++){
				var first=firstChild(box);
				box.appendChild(first);
			}
			box.style.left=0;
			flag=true;
			})
	}
	function moveL(){
		for(var i=0;i<num;i++){
			var first=firstChild(box);
			var last=lastChild(box);
			box.insertBefore(last,first);
			box.style.left=-aW*num+"px";
		}		
		animate(box,{left:0},function(){flag=true})	
	}
	}
	

}
