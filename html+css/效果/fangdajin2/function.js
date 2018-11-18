//兼容函数1：getClass
//功能：解决IE8不能用getElementsByClassName方法的问题
/*参数说明：
	classname: 	要寻找的类名
	obj: 		查找的范围*/
	function getClass(classname,obj){//obj是查找的范围
		obj=obj||document
		if(obj.getElementsByClassName){//判断是火狐或者谷歌  W3C  是的话这个方法是存在的，布尔值为真；不是的话这个方法为undefined，布尔值为假
			return obj.getElementsByClassName(classname)
		}else{//否则是IE8
			var all=obj.getElementsByTagName("*")  //先获取所有的标签，是一个集合
			var arr=[]
			for(var i=0;i<all.length;i++){
				if(checkRel(all[i].className,classname)){
				//if(all[i].className==classname){
					arr.push(all[i])
				}
			}
			return arr
		}
	}
	function checkRel(str,val){//类名不止一个的情况下的解决办法
		var newarr=str.split(" ")
		for(var i=0;i<newarr.length;i++){
			if(newarr[i]==val){
				return true
			}
		}
		return false
	}

//兼容函数2：getText
//功能：对IE8和w3c获取元素内容方法的不同作统一
/*参数说明：
	obj:哪个对象用这个方法
	val:接收第二个实参，表示设置一个文本*/

	function getText(obj,val){
		if(val==undefined){//如果val为undefined，表示只有一个参数，这个函数实现的功能是获取文本
			if(obj.innerText){//如果为真是IE8浏览器
				return obj.innerText
			}else{//w3c浏览器
				return obj.textContent
			}
		}else{//否则就是设置成val中的内容
			if(obj.innerText||obj.innerText==""){//IE8浏览器,当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本（当div里啥也没包时，）
				obj.innerText=val
			}else{//w3c浏览器
				obj.textContent=val
			}
		}
	}




//3.通用方式获取样式的兼容函数
//obj:哪个对象    attr:哪个属性
//对象.属性    对象["属性"]   传属性的时候要加""
function getStyle(obj,attr){
	if(obj.currentStyle){//如果为真，是IE8   只写obj.currentStyle就行   就能判断这个方法存在不存在  
		return obj.currentStyle[attr]
	}else{//否则是W3C
		return getComputedStyle(obj,null)[attr]
	}
}

//4.获取元素的函数$()
/*
    $(".box");  类名
    $("#fisrt"); ID名
    $("a");    标签名
*/
//"  .box   " "box"   box" getClass("box")
function $(select,obj){
  var obj=obj||document;
   if(typeof select=="string"){
    //去掉字符串前后的空格
      select=select.replace(/^\s*|\s*$/g,"");
      if(select.charAt(0)=="."){// 类名
        return getClass(select.slice(1),obj);
      }else if(select.charAt(0)=="#"){
        return obj.getElementById(select.slice(1));
      }else if(/^[a-z|1-6]{1,10}$/g.test(select)){//标签名
         return obj.getElementsByTagName(select);
      }
   }else if(typeof select=="function"){//表示是一个函数
      window.onload=function(){
        select();
      }
   }
}

/*
5.getChilds(parent)
获取元素子节点的兼容函数,目的是解决谷歌空格也当做子节点的
type：
"a":获取元素子节点的兼容函数
"b":获取子元素+文本

原理：先获取所有的儿子，然后根据节点类型判断，如果为1（元素节点），将其保存到数组中
	  加type参数是想要将子元素和获取到
*/
function getChilds(parent,type){
	var type=type||"a"
	var childs=parent.childNodes //所有的儿子
	var arr=[]//创建一个数组用来放需要的子元素
	for(var i=0;i<childs.length;i++){
		if(type=="a"){//是a就按 只要子元素来走
			if(childs[i].nodeType==1){
				arr.push(childs[i])
			}
		}else if(type=="b"){//是b的话除了要子元素，还要文本
			if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){//childs[i].nodeType==1是指元素节点  childs[i].nodeType==3是指文本节点  childs[i].nodeValue.replace(/^\s|\s*$/g)是该文本节点去掉空值之后
				arr.push(childs[i])
			}
		}	
	}
	return arr
}

/*

6./*获得第一个子节点

*/

function getFirst(parent){
	return getChilds(parent)[0]//只传了一个参数
}


/*7.获得最后一个节点*/


function getLast(parent){
	//return getClass(parent)[parent.length-1]
	return getChilds(parent)[getChilds(parent).length-1]
}

/*8.获得一个指定节点*/
function getNum(parent,num){
	return getChilds(parent)[num]
}


/*
9.获得下一个子兄弟节点

*/
function getNext(obj){
	var next=obj.nextSibling
	if(next==null){
			return false
		}
	while(next.nodeType==3||next.nodeType==8){
		next=next.nextSibling
		if(next==null){
			return false
		}
	}
	return next
}



/*
10.获得上一个子兄弟节点

*/
function getUp(obj){
	var up=obj.previousSibling
	if(up==null){
		return false
	}
	while(up.nodeType==3||up.nodeType==8){
		up=up.previousSibling
		if(up==null){
			return false
		}
	}
	return up
}
/*
11.插入元素之后
重点：给对象的原型添加此方法
原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前
obj1：要插入的对象
obj2：插人此对象之后
obj1插入obj2之后
*/

Object.prototype.insertAfter=function(obj1,obj2){
	var next=getNext(obj2)
	if(next){//如果第二个对象之后有元素，就是真
		this.insertBefore(obj1,next)
	}else{//如果第二个对象之后没东西啦，就执行这里的
		this.appendChild(obj1)
	}
}


//12.

function getScrollT(){
		var scrollT=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop
		return scrollT
	}


//13.给一个元素添加多个事件的兼容函数

// obj:给那个对象添加
// ev:什么事件  "click"  "dblclick"
// fun:事件处理程序
function addEvent(obj,ev,fun){
  if(obj.addEventListener){
    return obj.addEventListener(ev,function(){fun.call(obj)},false)
  }else{
    return obj.attachEvent("on"+ev,function(){fun.call(obj)})
  }
}

//14.获取浏览器宽、高
function getCW(){
	return document.documentElement.clientWidth;
}
function getCH(){
	return document.documentElement.clientHeight;
}



//15.一个对象的拖拽函数
	//obj是要设置拖拽的对象

	function drag(obj){
		cw=getCW()
		ch=getCH()
		ow=obj.offsetWidth
		oh=obj.offsetHeight
		obj.onmousedown=function(e){
			var ev=e||window.event;
			var ox=ev.offsetX  //这是鼠标相对于
			var oy=ev.offsetY
			//阻止浏览器的末仍行为
			if (ev.preventDefault){
				ev.preventDefault(); //阻止默认浏览器动作(W3C)
			}else{
				ev.returnValue = false;//IE中阻止函数器默认动作的方式
			}
			document.onmousemove=function(e){   //把obj  [移动时的事件]转到document上，事件委托的思想  注意只是把移动事件的事件源改了
				var ev=e||window.event;
				var cx=ev.clientX
				var cy=ev.clientY			
				var x=cx-ox
				var y=cy-oy

				if(x<=0){    //这里是限定obj移动的范围
					x=0
				}
				if(x>=(cw-ow)){
					x=cw-ow
				}
				if(y<=0){
					y=0
				}
				if(y>=(ch-oh)){
					y=ch-oh
				}

				obj.style.left=x+"px"
				obj.style.top=y+"px"
			}
		}
		obj.onmouseup=function(){
			document.onmousemove=null;
		}
	}


/*
16.滚轮事件的函数
obj:哪个对象添加滚轮事件
upfun:处理滚轮向上的函数
downfun:处理滚轮向下的函数
*/

	function mouseWheel(obj,upfun,downfun){
		if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
		}else if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);
			//chrome,safari -webkit
			obj.addEventListener("DOMMouseScroll",scrollFn,false);
			//firefox -moz-
		}
		function scrollFn(e){
			var ev=e||window.event
			if(ev.preventDefault){
				ev.preventDefault()
			}else{
				ev.returnValue=false;
			}
			//阻止一下默认行为
			var num=ev.detail||ev.wheelDelta
			if(num==-3||num==120){
				if(upfun){
					upfun()
				}
			}
			if(num==3||num==-120){
				if(downfun){
					downfun()
				}
			}
		}
	}

//17.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
