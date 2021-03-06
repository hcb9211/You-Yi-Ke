 /*循环*/
      function each(num,callback)
      {
      for(var i=0;i<num;i++)
      {
        callback(i);
      }
   }

   /*最大值*/
   function arrVal(a,type)
   {
     var type=type ||'max';
      var maxs=a[0];
   for(var i=0;i<a.length;i++)
   { 
      if(type=='max')
      {
        if(maxs<a[i])
        {
         maxs=a[i]
         }
      }
      else if(type=='min')
      {
          if(maxs>a[i])
          {
            maxs=a[i]
            }
      }
     
    }
    return maxs;
  }

/*数组排序*/
function arrOrder(arr,type)
{
  var type=type||'min';
  for(var i=0;i<arr.length;i++)
  {
    for(var j=i+1;j<arr.length;j++)
    {
      if(type=='min')
      {
        if(arr[i]>arr[j])
        {
             var temp=arr[i];
             arr[i]=arr[j];
             arr[j]=temp;
           }
      }
      else if(type=='max')
      {
        if(arr[i]<arr[j])
        {
             var temp=arr[i];
             arr[i]=arr[j];
             arr[j]=temp;
        }
      }         
    }
  }
  return arr;
}

// 第二种方法
 function arrSort(arr,callback)
 {
  for(var i=0;i<arr.length;i++)
  {
     for(var j=i+1;j<arr.length;j++)
     {
         if(callback(arr[i],arr[j]))
         {
            var temp=arr[i];
             arr[i]=arr[j];
             arr[j]=temp;
         }
     }
  }
  return arr;
 }

// 删除指定值
function arrDel(arr,val)
{
  var newarr=[];
  for(var i=0;i<arr.length;i++)
  {
         if(arr[i]!=val)
      {
          newarr.push(arr[i])
      }
  }
   return newarr;
}

// 删除重复值
function delRepeat(arr)
{
  var newarr=[]
  for(var i=0;i<arr.length;i++)
  {
    var flag=true;
    for(var j=i+1;j<arr.length;j++)
    {
      if(arr[i]==arr[j])
      {
        flag=false;
        break;
      }
    }
    if(flag)
    {
      newarr.push(arr[i]);
    }
  }
  return newarr;
 }
// dom中classname的兼容函数
function getClass(className,range){
      var range=range?range:document;
      if(document.getElementsByClassName){
        return range.getElementsByClassName(className)
      }else{
        var arr=[];
        var all=range.getElementsByTagName('*');
        for(var i=0;i<all.length;i++){
          if(checkClass(all[i].className,className)){
            arr.push(all[i]);
          }
        }
      }
      return arr;
  }
  function checkClass(obj,classname){
    var arr=obj.split(" ");
    for(var i=0;i<arr.length;i++){
      if(arr[i]==classname){
        return true;
      }
    }
    return false;
  }

  /*
       getContent(obj,[val])   获取或者设置对象的文本
       obj  指定的对象
       val  要设置的内容
  */
  function getContent(obj,val){
      if(obj.innerText){
        if(val===undefined){
          return obj.innerText;
        }else{
          obj.innerText=val;
        }
      }else{
        if(val===undefined){
          return obj.textContent;
        }else{
          obj.textContent=val;
        }
      }
    }

  /*
  getStyle(obj,attr);
  获取指定元素指定的样式
  obj   指定的元素
  attr  指定的样式
  */
  function getStyle(obj,attr){
        if(obj.currentStyle){
          return obj.currentStyle[attr];
        }else{
          return getComputedStyle(obj,null)[attr];
        }
      }
      alert(getStyle(div,"width"))