$.fn.extend({
	select:function(btns,cons,className){
		btns.click(function(){
		var index=$(this).index();
		btns.removeClass(className).eq(index).addClass(className);
		cons.css('zIndex',0).eq(index).css('zIndex',1);
	})
	}	
})