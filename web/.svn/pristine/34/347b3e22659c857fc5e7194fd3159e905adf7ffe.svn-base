
var search=$('.search');
search.click(function(){
    $(".mask").show();
    $("html,body").css("overflow","hidden");
    $('.bag-icon').addClass("active");
    $('.s-s').addClass("activea");
    $('.item,.search').each(function(){
        $(this).transition({'scale':[0.5,0.5],'opacity':'0'},function(){
            $(this).hide(); //  占当前行的位置，假如不hide的话input元素插不进来。
            if($(this).is(".search")){
          $('.searchbox').css('display','inline-block').transition({x:0})
            }
        })
    })
    $('.s-s3').each(function(){
        $(this).css('display','block').transition({x:0,delay:2})
    })

    $('.bag-icon.active').click(function(){
        $('.mask').hide();
        $("html,body").css("overflow","");
        $('.bag-icon').removeClass("active");
        $('.s-s').removeClass("activea");
        $('.searchbox').css('display','none').transition({x:80})
        $('.s-s3').each(function(){
            $(this).css('display','none').transition({x:380,delay:2})
        })
        $('.bag-input').blur();
        $('.item,.search').each(function(){
            $(this).transition({'scale':[1,1],'opacity':'1'},function(){
                $(this).css('display','inline-block')
            })
        })

    })

});


$('.small-menu').click(function(){
    $(this).children().toggleClass('active');
    if($(this).children().hasClass('active')){
        $(".menu-page").transition({'opacity':'1','height':'100%'});
        $(".wrapper").transition({'background':'#000'});
        $(".bag-icon").css('display','none').transition({x:80})
    }else{
        $(".menu-page").transition({'opacity':'0','height':'0'})
        $(".wrapper").transition({'background':'#333'});
        $(".bag-icon").css('display','block').transition({x:0})
    }
});

$(".gang-2").each(function(){
    $(this).click(function(){
        $(this).find(".gang-22").toggleClass("activec");
        $(this).find(".gang-3").slideToggle()
    })
})
















