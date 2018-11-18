/*
   思路：
	getClass(className,range)
	获取指定class的对象的集合
	className   指定的类名
	range    指定的范围，如果传入范围，就是指定的范围，如果不传，就是document
*/

function getClass(className,range){
     // 设置获取元素的范围；
        var range=range?range:document;
        // var range=range||document;
     // 判断浏览器是否是w3c
     if(document.getElementsByClassName){
     // w3c
     return range.getElementsByClassName(className);
     }else{
     // ie6~8
     // arr  保存指定的className对象
     var arr=[];
     // 1，获取所有的元素
     var all=range.getElementsByTagName('*');
     // 2,挑选符合条件的指定元素
     for(var i=0;i<all.length;i++){
     	// 函数：判断当前元素的className  是否包含指定的className
     	if(checkClass(all[i].className,className)){
           arr.push(all[i]);
     	}
     }
     }
     // 3,挑选完毕，将数组输出。
     return arr;
}

 	/*
 	checkClass(obj,classname)
 	检查obj里面是否包含className
    obj:"one two"  当前元素的className;
    classname: "one"   指定的classname;
 	*/
 	function checkClass(obj,classname){
 		var arr=obj.split(" ");
 		for(var i=0;i<arr.length;i++){
 			if(arr[i]==classname){
 				return true;
 			}
 		}
 		return false;
 	}

/*function getClass(className){
      if(document.getElementsByClassName){
      	 return document.getElementsByClassName(className);
      }
      else{
      	var arr=[];
      	var all=document.getElementsByTagName('*');
      	for(var i=0;i<all.length;i++){
      		if(all[i].className==className){
      			arr.push(all[i]);
      		}
      	}
      }
      return arr;
}*/
