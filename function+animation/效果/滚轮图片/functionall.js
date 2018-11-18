//$
function $(select,obj){
  var obj=obj||document;
   if(typeof select=="string"){
    select.replace(/^\s*|\s*$/g,"")  //正则  /^\s*|\s*$/去掉空格
    if(select.charAt(0)=="."){
      return getClass(select.slice(1),obj)
     }else if(select.charAt(0)=="#"){
      return obj.getElementById(select.slice(1))
     }else if(/^[a-z|1-6]{1,10}$/g.test(select)){
      return obj.getElementsByTagName(select)
     }
   }else if(typeof select=="function"){//表示是一个函数
      window.onload=function(){//当函数在body上面时，要加window.onload，后面不用
         select();
      }
   }
}


//getClass

 function getClass(classname,obj){
      var obj=obj||document;//下面document都可以换成obj
      if(document.getElementsByClassName){//判断W3C浏览器
         return document.getElementsByClassName(classname);
      }else{ //否则是IE8浏览器
         var all=document.getElementsByTagName("*");//用标签名先获取所有元素是一个集合
         var arr=[]//新数组，用来保存找到的元素
         for(var i=0;i<all.length;i++){
            if(checkRel(all[i].className,classname)){
               arr.push(all[i]);
            }
         }
            return arr;
      }
    }
    //参数说明：str：多个类名的集合以后的字符串;val:想找的类名，是形参
    function checkRel(str,val){//类名不止一个的情况下解决办法
       var newarr=str.split(" ");//字符串转换成数组，以空格拆分
       for(var i=0;i<newarr.length;i++){//遍历数组
         if(newarr[i]==val){//如果数组中的值与val相同
            return true;//返回true，表示找到
          }
       }
       return false;//没找到，返回假
    }



//getText
    function getText(obj,val){
   if(val==undefined){//如果val为undefined，表示只有一个参数这个函数实现的功能获取函数
     if(obj.innerText){//如果为真是IE8浏览器
       return obj.innerText;
      
      }else{//是W3C浏览器   如果val不是undefined，表示要设置文本
      
       return obj.textContent;
      
      }
   
   }else{
        
       if(obj.innerText||obj.innerText==""){//如果为真是IE8浏览器,当对象的内容为空的时候也可以设置文本
       obj.innerText=val;
      
      }else{//是W3C浏览器   如果val不是undefined，表示要设置文本
      
       obj.textContent=val;
      
      }
   }
}



//getStyle
function getStyle(obj,attr){
   if(obj.currentStyle){
   return obj.currentStyle[attr];
   }else{
   return getComputedStyle(obj,null)[attr];
   }
}



//getChilds
function getChilds(parent,type){
   var type=type||"a";
   var childs=parent.childNodes;//获取所有的子容器
   var arr=[];
   for(var i=0;i<childs.length;i++){
    if(type=="a"){
      if(childs[i].nodeType==1){
      arr.push(childs[i]);
      }
    }else if(type=="b"){//元素+文本
      if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
         arr.push(childs[i]);
      }
     }
   }
   return arr;
}




//获得第一个子节点
function getFirst(parent){
  return getChilds(parent)[0]
}



//获得最后一个子节点
function getLast(parent){
  return getChilds(parent)[getChilds(parent).length-1]
}

//获得指定子节点

function getNum(parent,num){
  return getChilds(parent)[num]
}

//获取下一个兄弟节点

function getNext(obj){
  var next=obj.nextSibling;
   if(next==null){
    return false; 
  }
  while(next.nodeType==3||next.nodeType==8)
  {
  next=next.nextSibling;
  if(next==null){
    return false; 
  }
  }  
  return next;
}


//获取上一个兄弟节点

function getUp(obj){
  var up=obj.previousSibling;
   if(up==null){
    return false; 
  }
  while(up.nodeType==3||up.nodeType==8)
  {
  up=up.previousSibling;
  if(up==null){
    return false; 
  }
  }  
  return up;
}




//插入某个对象之后
     //对象
     //重点，给对象的原型添加此方法
     //原理：找到第二个参数插入到此兄弟节点之前（插入到下一个对象之前）
     //obj1插到obj2之后
Object.prototype.insertAfter=function(obj1,obj2){
        var next=getNext(obj2);
        if(next){
         this.insertBefore(obj1,next)
        }else{
        this.appendChild(obj1)
        }
       
     }




     //scrollTop

     function getScrollT(){
        var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
        document.title=scrollT;

        return scrollT;
  }



//给同一个元素添加多个事件

 function addEvent(obj,ev,fun){
   if(obj.addEventListener){
    return box.addEventListener(ev,function(){fun.call(obj)},false)
   }else{
    return obj.attachEvent("on"+ev,function(){
      fun.call(obj);
    })
   }//在ie8中，this不指当前对象，指的是window
}




/*******************************************************************/

function getCW(){
  return document.documentElement.clientWidth;
}
function getCH(){
  return document.documentElement.clientHeight;
}



//拖拽函数
function drug(obj){
    var cw=getCW();//浏览器的高度
    var ch=getCH();//浏览器的高度
    var ow=obj.offsetWidth;
    var oh=obj.offsetHeight;
    obj.onmousedown=function(e){
       var ev=e||window.event;
       var ox=ev.offsetX;
       var oy=ev.offsetY;
       //阻止浏览器默认行为
      if (ev.preventDefault ){
      ev.preventDefault();
      } //阻止默认浏览器动作(W3C) 
      else{
        ev.returnValue = false;
      }
      document.onmousemove=function(e){//把obj移动时的时间转移到document上，时间委托思想,可以快速移动了
       var ev=e||window.event;
       var cx=ev.clientX;
       var cy=ev.clientY;
       var newx=cx-ox;
       var newy=cy-oy;
      
       if(newx<=0){//限制移动的范围
        newx=0;
       }
       if(newx>=(cw-ow)){
             newx=cw-ow;
       }
       if(newy<=0){
             newy=0;
       }
       if(newy>=(ch-oh)){
        newy=ch-oh;
       }
             obj.style.left=(newx)+"px"
             obj.style.top=(newy)+"px"
      } 
    }
    obj.onmouseup=function(){
         document.onmousemove=null;
    }
  }




    //obj:哪个对象添加滚轮事件
      //upfun:处理滚轮向上的函数
      //downfun:处理滚轮向下的函数 

    function mouseWheel(obj,upfun,downfun){
        if(obj.attachEvent){ obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera 
    }else if(obj.addEventListener){
     obj.addEventListener("mousewheel",scrollFn,false);  //chrome,safari    -webkit
     obj.addEventListener("DOMMouseScroll",scrollFn,false);  //firefox     -moz
    } 

    
        function scrollFn(e){
         var ev=e||window.event;

         if (ev.preventDefault ){
          ev.preventDefault();
          } //阻止默认浏览器动作(W3C) 
          else{
            ev.returnValue = false;
          }//IE中阻止函数器默认动作的方式

    
         var num=ev.detail||ev.wheelDelta;
         if(num==-3||num==120){//向上
          if(upfun){
            upfun();
            }
          }
           if(num==3||num==-120){//向下
          if(downfun){
             downfun();
            }
          }
        }
  }



//15.hover
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