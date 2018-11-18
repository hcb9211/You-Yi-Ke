$(function(){
    $("#product").hover(function(){
        $(".product_select").stop(true,true).slideDown();
    },function(){
        $(".product_select").stop(true,true).slideUp();
    })
})