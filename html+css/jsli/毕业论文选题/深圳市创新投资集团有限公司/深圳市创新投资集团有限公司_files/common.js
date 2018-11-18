// JavaScript Document


$(function(){
 var num = $("#pic_show ul li").length;
 if(num >6){
  	$("#pic_show").jCarouselLite({  
		btnPrev: "#go_l",   //上一张按钮  
        btnNext: "#go_r",   //下一张按钮

		visible: 6,     // 显示图片数量 
		auto:3000,
		circular: true,
		speed: 600,    //滚动完成时长 单位毫秒  
		scroll: 1       // 每次滚动图片数量	
	
	    });  
			}
  });



$(function(){
 var num = $("#notice_show ul li").length;
 if(num >1){
  	$("#notice_show").jCarouselLite({  
		btnPrev: "#notice_go_l",   //上一条按钮  
        btnNext: "#notice_go_r",   //下一条按钮

		visible: 1,     // 显示图片数量 
		auto:1788,
		circular: true,
		vertical:true,
		speed: 600,    //滚动完成时长 单位毫秒  
		scroll: 1       // 每次滚动图片数量	
	
	    });  
			}
  });


