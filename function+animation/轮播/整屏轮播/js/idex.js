$(function(){

	var zheng=$('.zheng');
	var lis=$('li');
	var index=0;
	var next=0;
	var dw=document.documentElement.clientHeight;
	var flag=true;
	// var btn=$('.btn')[0];
	// var btnli=$('li',btn);
	zheng[0].style.top="0px";
	
	mouseWheel(document,function(){
		//向下
		if(!flag){return}
		next++;
		zheng[next].style.top=dw+'px';
		flag=false;
// 边界判断
		if(next>=lis.length){next=0}
		zheng[index].style.zIndex=0;
	    zheng[next].style.zIndex=10;
		zheng[next].style.top=dw+'px';

		zheng[index].style.top=-dw+'px'
		animate(zheng[index],{top:-dw});
		animate(zheng[next],{top:0},function(){
			flag=true;
		})
		index=next;    
		},function(){
			// 向上
			if(!flag){return}
			next--;
			flag=false;
			if(next<0){next=lis.length-1}

			 zheng[index].style.top=dw+'px'
			animate(zheng[index],{top:-dw});
			animate(zheng[next],{top:0},function(){
				flag=true;
			})
			index=next;
			
		for(var i=0;i<lis.length;i++){
			lis[i].index=i;
			addEvent(lis[i],'click',function(){

				if(!flag){return}
				if(this.index==index){return}
				zheng[this.index].style.top=dw+'px'

				if(this.index>index){
					animate(zheng[index],{top:-dw});
				    animate(zheng[this.index],{top:0});
			}else if(this.index<index){
				zheng[this.index].style.top=dw+'px'
			}
				
				index=this.index
			})
		}

})