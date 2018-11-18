$(function(){

	var title=$('.title')[0];
	var text=$('#text');
	var ts=$('.tishi')[0];
	var btn=$('#btn');

	text.onkeyup=text.onkeypress=function(){
		var val=text.value;
		var num=val.length;

		if(num>100){
			val=val.slice(0,100);
			text.value=val;
		}else{
			ts.innerHTML="您可以输入100个字,已输入"+num+"字,还可以输入"+(100-num)+"个字";
		}	
	}

	text.onkeydown=btn.onclick=function(e){
		var ev=e||window.event;
		if(ev.type=="click"){
			var val=text.value;
			val=val.replace("/^\s*|\s*$/","");
			if(val==""){
				alert("输入内容不能为空");
			}
		else{
				var p=document.createElement("p");
				p.innerHTML=val;
				title.appendChild(p);
				text.value="";
				ts.innerHTML="您可以输入100个子，已输入0个字，还剩下100个字"
		}
		}else if(ev.type=="keydown"){
			
				var val=text.value;
			if(ev.keyCode==13&&ev.ctrlKey){

				val=val.replace(/^\s*|\s*$/,"");
				if(val==""){
					alert("输入内容不能为空")
				}
				var p=document.createElement("p");
				p.innerHTML=val;
				title.appendChild(p);
				text.value=""
				ts.innerHTML="您可以输入100个子，已输入0个字，还剩下100个字"
			}
		}
	}


})