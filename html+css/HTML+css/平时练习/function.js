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
   for(var i=0;i<a.length;i++)
   {
    var maxs=a[0];
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
