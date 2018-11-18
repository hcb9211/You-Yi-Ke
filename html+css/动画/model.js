window.onload=function(){
	/*function animate(obj,attr,end,speed,callback){
      var t=setInterval(function(){
      	var width=parseInt(getStyle(obj,attr));
      	width+=speed;
      	if(width>=end){
      		clearInterval(t);
      		if(callback){
      			callback();
      		}
      	}
      	obj.style[attr]=width+"px";
      },50)
}*/

/*function animate(obj,attrobj,speed,callback){
	var t=setInterval(function(){
		for(var i in attrobj){
			var start=parseInt(getStyle(obj,i))
			speed+=1;
			start+=speed;
			if(start>=attrobj[i]){
				clearInterval(t);
				if(callback){
					callback();
				}
			}
			obj.style[i]=start+"px"
		}
	},50)
}*/

function animate(obj,attrobj,dur,callback){
		var time=0;
		var t=setInterval(function(){

			for(var i in attrobj){
				var cha=attrobj[i]-parseInt(getStyle(obj,i));
				
				var speed=cha*60/dur;
				 if(time>=dur){
				 	clearInterval(t);
					if(callback){
					callback();
				}
				 }
		obj.style[i]=parseInt(getStyle(obj,i)+speed+"px")
			}
			time+=60;
		},60)
}
}