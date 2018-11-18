/*$(function(){

	var tds=$('td');
	for(var i=0;i<tds.length;i++){

		tds[i].index=i;

		tds[i].onclick=function(){

			var num=this.index;

			var obj=tds[this.index].innerHTML;	

			tds[this.index].innerHTML='';

			var input=$('<input>');

			input.type='text';

			input.value=obj;

			tds[this.index].appendChild(input);
			input.focus();
		
			input.onblur=function(){
				var newobj=input.value;
				tds[num].removeChild(input);
				input=null;
				tds[num].innerHTML=newobj;
			}
		}
	}

})*/


// 事件流方式

$(function(){

	var table=$('table')[0];
	table.onclick=function(e){
		var ev=e||window.event;
		var obj=ev.target||ev.src.Element;
		if(obj.nodeName=='TH'){return}
		if(obj.nodeName=='TD'){

			var objv=obj.innerHTML;

			obj.innerHTML='';

			var input=$('<input>');

			input.type='text';

			input.value=objv;

			obj.appendChild(input);

			input.focus();

			input.onkeyup=input.ondblclick=input.onblur=function(e){
				var ev=e||window.event;
				if(ev.type=='blur'||ev.type=='dblclick'){

					var newobj=input.value;

					obj.removeChild(input);

					input=null;

					obj.innerHTML=newobj;

				}else if(ev.type=='keyup'){

					if(ev.keyCode==13 && ev.ctrlKey){

					var newobj=input.value;

					obj.removeChild(input)

					input=null;

					obj.innerHTML=newobj;
					}
				}
			}
		}
	
}
	var add=$('#add');
	add.onclick=function(){ 
		var tr=$('<tr>');
		tr.innerHTML="<td></td><td></td><td></td><td></td><td></td>"
		table.appendChild(tr)
	}

})