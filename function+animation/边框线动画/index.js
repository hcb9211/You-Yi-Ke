window.onload=function(){
	var one=$(".one")[0];
	var lis=$('li',one);
		line(lis);
	
	function line(obj)
	{	
		for(var i=0;i<obj.length;i++)
		{
			obj[i].index=i;
			var widths=obj[i].offsetWidth;
			var heights=obj[i].offsetHeight;			
			obj[i].onmouseover=function()
			{
				var left=$(".left",obj[this.index])[0];
				var right=$(".right",obj[this.index])[0];
				var top=$(".top",obj[this.index])[0];
				var bottom=$(".bottom",obj[this.index])[0];
				

				animate(left,{height:heights});
				animate(right,{height:heights});
				animate(top,{width:widths});
				animate(bottom,{width:widths});
			}

			obj[i].onmouseout=function()
			{
				var left=$(".left",obj[this.index])[0];
				var right=$(".right",obj[this.index])[0];
				var top=$(".top",obj[this.index])[0];
				var bottom=$(".bottom",obj[this.index])[0];

				animate(left,{height:0});
				animate(right,{height:0});
				animate(top,{width:0});
				animate(bottom,{width:0});
			}
		}
	}
	 // xian(one);
}

