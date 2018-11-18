//兼容函数
       //功能：兼容className在IE8中的问题；
       //参数说明：classname表示要获取的html中的类名的名称，它代表个字符串；obj是个形参，为获取的函数命名；
     function getClass(classname,obj){
     	var obj=obj||document;
     	if(obj.getElementsByClassName){ //判断是w3c浏览器    		
     		return obj.getElementsByClassName(classname)
     	}else{// 否则是IE8
             var all=obj.getElementsByTagName("*");// 先获取到所有元素，是一个集合
             var arr=[];//新数组，用来保存找到的数组
             for(var i=0;i<all.length;i++){//遍历all
             	if(checkRel(all[i].className,classname)){
             		arr.push(all[i]);
             	}
             }
             return arr;
     	}
     }
     //"inner one"["inner","one"]
     //参数说明：str 多个类名的集合以后的字符串；   val：想找的类名；    checkRel：判断这个值的真假；
     function checkRel(str,val){
           var newarr=str.split(" ");//字符串转换成数组，以空格拆分
           for(var i=0;i<newarr.length;i++){//遍历数组，如果数组中的值与val相同.
           	  if(newarr[i]==val){
           	  	return true;//函数返回true，表示找到
           	  }
           }
           return false;//如果循环完成后还没有找到，返回假
     }