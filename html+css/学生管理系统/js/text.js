$(function () {
	/*$.ajax({
		//url:'/php/text.php',//指定http指定的位置
		//type:'post ',  //指定http请求的类型
		//data:{id:112}, //要发送给服务器的数据 通常是一个对象
		
		


		//.....................................
		dataType:'json',
		// 指定服务器返回的数据类型,如果服务器没有按规定返回对应的类型,尝试在本地做转换.默认值是'text';
		context:$('h1'),
		dataFilter:function(data,type){
      		return '1';
   		},
		success:function(d){
			//$(data).appendTo('body');
			//this.css('color','red');
			console.log(d);
		}
		//converters:{'text json':window.String},
		///////////////////
    	// var $.ajax = function (op) {
    	//   var data= '111';
    	//   if(op.context){
    	//     op.success.apply(op.context,[data,'success']);
    	//   }else{
    	//     op.success(data)
    	//   }
    	// }
    	////////////////
		//请求成功之后会调用这个函数,调用的时候是传参调用(1个参数)
        //传递的给这个函数的参数为服务器的返回结果
        error:function(){
      		console.log(1);
    	},
    	complete:function(){
    		console.log(1);
    	},
    	//无论数据请求的成功与失败，都让它执行该程序
    	async:false,
        // ajax请求失败的时候调用这个函数

        //.................
        accepts:'text/javascript',
	})
	$(document).click(function(){
        alert(1);
    })*/




	/*$.ajax({
		url:'http://192.168.2.242/php/jsonp.js',
		//url:'http://api.map.baidu.com/telematics/v3/weather?location=112.5,37.73&output=json&ak=ZG1tvdMHs46r8OMGzNDy7pLK&callback=JSON_CALLBACK',
		dataType:'jsonp',
		jsonpCallback:'call',
		success:function(d){
			console.log(d);
		}
	})*/
	
	//jsonp原理
	/*var data;
  	call= function (x){
   		data = x;
   		console.log(x)
  	}
  	$('<script>')
  	.attr('src','http://192.168.2.77/php/jsonp.js')
  	.appendTo(document.body);*/

	/*
	1.定义一个call函数 function call (x){return x};
  	2.创建一个script脚本
  	3.script脚本的src指定成要获取数据的地址
  	4.<script>
      call(
        {x:1,x:2}
      );
    </script>
    5.插入到页面中执行得到服务器的数据
    */
	
	/*$.ajax({
	    url:'/php/selectStudent.php',
	    dataType:'json',
	    global:false,
	    success:function(data){
	      console.log(data)
	    }
	})
	$(document).ajaxSuccess(function(){
	    $(document.body).css('background','red');
	})*/


	/*$.ajax({
	    url:'/css/index.css',
	    dataType:'text',
	    global:false,
	    statusCode: {
	      404: function() {
	        alert('page not found');
	      },
	    },
	    // headers:{a:1,b:2},
	    success:function(data){
	      console.log(data)
	    }
	})
	$(document).ajaxSuccess(function(){
	    // $(document.body).css('background','red');
	})
	$('h1 div').load('/css/a.html');*/


    setTimeout(function(){
    	$.ajax({
      		url:'/php/selectStudent.php',
    	});
  	},0);
  	$(document).ajaxSuccess(function(){
    	console.log('success');
  	})
  	.ajaxStart(function(){
    	console.log('start')
  	})
  	.ajaxSend(function(){
   	 	console.log('send')
  	})
  	.ajaxComplete(function(){
    	console.log('complete')
  	})
})