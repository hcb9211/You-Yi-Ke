function $(selecter){
	return new aa(selecter);
}
function aa(selecter){
	
	if(typeof selecter=="string"){
		var obj=document.getElementsByTagName(selecter);
		for(var i=0;i<obj.length;i++){
			this[i]=obj[i];
		}
		this.length=obj.length;
	}else if(typeof selecter=="function"){
		window.onload=function(){
			selecter()
		}
	}
}
aa.prototype={
	each:function(callback){
		for(var i=0;i<this.length;i++){
			callback(i,this[i]);
		}
	},
	css:function(attrObj){
		this.each(function(index,obj){
			for(var i in attrObj){
					obj.style[i]=attrObj[i];
			}
		
		})
		return this;
	},
	html:function(val){
		this.each(function(index,obj){
			obj.innerHTML=val;
		})
		return this;
	},
	click:function(fn){
		this.each(function(index,obj){
			obj.onclick=function(){
				fn();
			}
		})
		return this;
	}




}