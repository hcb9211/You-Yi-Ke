/*
	drag(one,{sideX:[0,500],sideY[0,500],animate:true})
	默认情况是无限制运动，有动画
	 dragX:水平方向是否可以移动   默认：true
	 dragY:垂直方向是否可以移动   默认：true
	 sideX:水平方向是否有范围	  默认：无限制；
	 sideY:垂直方向是否有范围	  默认：无限制；
	 animate:是否有动画			  默认：有动画
*/

function drag(obj,option){
	new drag1(obj,option);
}

function drag1(obj,option){
	this.obj=obj;
	var option=option||{};
	this.dragX=option.dragX?option.dragX:true;
	this.dragY=option.dragY?option.dragY:true;
	this.sideX=option.sideX?option.sideX:false;
	this.sideY=option.sideY?option.sideY:false;
	this.animate=option.animate?option.animate:true;
	this.speed=0.1;
	this.play();
}

drag1.prototype={
	play:function(){
		this.down();
	},
		down:function(){
			var that=this;	
			that.obj.onmousedown=function(e){
				var ev=e||window.event;
				that.ox=ev.offsetX;
				that.oy=ev.offsetY;
				that.startX=that.ox;
				that.startY=that.oy;
				that.move();
				that.up();
			}
		},

			move:function(){
				var that=this;
				document.onmousemove=function(e){
					var ev=e||window.event;
					that.cx=ev.clientX;
					that.cy=ev.clientY;
					that.moveX=that.cx;
					that.moveY=that.cy;
					var lefts=that.cx-(offset(that.obj).left-that.obj.offsetLeft)-that.ox;
					var tops=that.cy-(offset(that.obj).top-that.obj.offsetTop)-that.oy;

					if(that.sideX){
						if(lefts>=that.sideX[1]){
							lefts=that.sideX[1];
						}
						 else if(lefts<=that.sideX[0]){
						 	lefts=that.sideX[0];
						 }
					}
					if(that.sideY){
						if(tops>=that.sideY[1]){
							tops=that.sideY[1];
						}
						 else if(tops<=that.sideY[0]){
						 	tops=that.sideY[0];
						 }
					}
				
					if(that.dragX){
						that.obj.style.left=lefts+'px'
					}
					if(that.dragY){
						that.obj.style.top=tops+'px'
					}
					// 动画
					that.endX=that.moveX-that.startX;
					that.endY=that.moveY-that.startY;
					that.startX=that.moveX;
					that.startY=that.moveY;
				}
			},
			up:function(){
				var that=this;
				that.onmouseup=function(){
					// 判断水平和垂直哪个距离长，用开关控制	
						var flag=true;
						if(Math.abs(that.endX)>Math.abs(that.endY)){
							flag=true;
						}else{
							flag=false;
						}
					if (that.animate) {
						var t=setInterval(function(){
							that.endX*=that.speed;
							that.endY*=that.speed;

							if(flag){
								if(Math.abs(that.endX)<1){
									clearInterval(t)
								}
							}else{
								if(Math.abs(that.endY)<1){
									clearInterval(t)
								}
							}
							var lefts=that.obj.offsetLeft+that.endX;
							var tops=that.obj.offsetTop+that.endY;
							obj.style.left=lefts+'px'
							obj.style.top=tops+'px'
				// 临界值
					if(that.sideX){
						if(lefts>=that.sideX[1]){
							lefts=that.sideX[1];
						}
						 else if(lefts<=that.sideX[0]){
						 	lefts=that.sideX[0];
						 }
					}
					if(that.sideY){
						if(tops>=that.sideY[1]){
							tops=that.sideY[1];
						}
						 else if(tops<=that.sideY[0]){
						 	tops=that.sideY[0];
						 }
					}

						},60)
					}
					document.onmousemove=null;
					that.obj.onmouseup=null;
				}
			}
}