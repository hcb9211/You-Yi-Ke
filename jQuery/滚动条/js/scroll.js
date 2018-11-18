$(function() {
	var container = $(".container");
	var content = $(".content");
	var scroll = $(".scroll");
	var scrollBtn = $(".scrollbtn");
	var outHeight = container.outerHeight(); //盒子的高度
	var innerHeight = content.innerHeight(); //包括padding值，内容的高度 
	var scrollHeight = scroll.height(); //滚轮的高度
	// 判断如果内容的高度大于盒子的高度，然后让滚动条显示
	if (innerHeight > outHeight) {
		scroll.show();
	}

	//盒子的高度/内容的高度=滚动按钮的高度/滚动条的高度
	//内容的高度/浮动条的高度=内容移动的距离/滚动按钮移动的距离
	var bili = outHeight / innerHeight; //小容器/大容器
	var bili2 = innerHeight / scrollHeight; //大容器/滚动条的高度
	var scrollBtnHeight = scrollHeight * bili;
	scrollBtn.height(scrollBtnHeight);

	// 拖拽  clientY 鼠标相对于浏览器Y轴的距离
	scrollBtn.on("mousedown", function(e) {
		var startY = e.clientY; //一开始的
		var oldTop = parseInt(scrollBtn.css("marginTop"));
		e.preventDefault(); //阻止浏览器默认行为
		$(document).on("mousemove", function(e) {
		
			var currentY = e.clientY; //当前的
			console.log(currentY);
			var changeY = currentY - startY + oldTop;
			if (changeY<=0) {
				changeY=0;
			}
			if (changeY >= scrollHeight - scrollBtnHeight) {
				changeY = scrollHeight - scrollBtnHeight;
			}
			scrollBtn.css({"marginTop":changeY});
			content.css({
				"marginTop": -changeY * bili2
			});
		})
	})
	//注销事件
	$(document).on("mouseup", function() {
		$(document).off("mousemove");
	})

	//滚轮事件
	var obj=container[0];
	//IE进行事件绑定的方式
	if(obj.attachEvent){
 		obj.attachEvent('onmousewheel',fun);
 	}
 	//w3c进行事件绑定的方式 传true说明是一个捕获型事件流
 	if(obj.addEventListener){
 		obj.addEventListener('mousewheel',fun,false);
 		obj.addEventListener('DOMMouseScroll',fun,false);
 	}
	
	function fun(e){

		// 事件对象的兼容
		var ev=e||window.event;

		// 事件对象.wheelDelta 获取滚轮滚动的方向 IE 
		// 事件对象.detail 获取滚轮滚动的方向 FF
		var dir=ev.detail||ev.wheelDelta;//兼容

		//阻止浏览器默认行为的兼容
		if(ev.preventDefault){
			ev.preventDefault();
		}else{
			ev.returnValue=false;
		}

		//获取目标事件源的兼容
		var target=ev.target||ev.srcElement
		var target=$(target);
		var value=10;
		if(target.is(".dir")){
			value=30;
		}
		var value=target.is(".dir")?30:10;
		var top=parseInt(scrollBtn.css("marginTop"));
		//向上滚动
		if(dir==-3||dir==120||target.is(".up")){
			top-=value;
			if(top<=0){
				top=0;
			}
		}
		//向下滚动
		else if(dir==3||dir==-120||target.is(".down")){
			top+=value;
			if(top>=scrollHeight - scrollBtnHeight){
				top=scrollHeight - scrollBtnHeight;
			}
		}
		scrollBtn.css({"marginTop":top});
			content.css({
				"marginTop": -top * bili2
			});
	}

	//上下箭头
	$(".up,.down").click(fun);
})