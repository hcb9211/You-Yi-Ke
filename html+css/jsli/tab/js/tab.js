window.onload=function(){
	var word=getClass("word");
	var con=getClass("con");
	for(var i=0;i<con.length;i++){
		word[i].index=i;
		word[i].onclick=function(){
			for(var j=0;j<con.length;j++){//让所有的内容不显示
				con[j].style.display="none";
				word[j].style.fontWeight="normal";
				word[j].style.textDecoration="none"
			}
			con[this.index].style.display="block"//让当前内容显示
			this.style.fontWeight="bold";
			this.style.textDecoration="underline"
		}
	}
}