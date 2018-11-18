$(function(){
    // 选项卡切换
        $(".ponse").select($(".left_btn"),$(".m_con"))
   
    // 样式选项
    var flag=true;
    $(".open").click(function(){
        if(flag) {
            $("#custumize-style").css({ left: 0 });
            flag=false;
    }else{
            $("#custumize-style").css({ left:-270 });
            flag=true;
        }
    })



    //  技能展示
    var leftW=$(".left-con-1-copy li").width();
    var rate1W=leftW*0.95;
    var rate2W=leftW*0.9;
    var rate3W=leftW*0.85;
    var rate4W=leftW*0.9;
    var rate5W=leftW*0.95;
    var rate6W=leftW*0.65;
    var rate7W=leftW*0.80;
    var rate8W=leftW*0.6;
    var rate9W=leftW*0.65;
    var rate10W=leftW*0.8;
    var rate11W=leftW*0.75;
    var rate12W=leftW*0.95;
    var rate13W=leftW*0.9;
    var rate14W=leftW*0.85;
    var rate15W=leftW*0.9;

    function rW(r,rW){
        $("#resume").on("click",function(){
            r.css({width:rW})
        })
    }

    rW($(".rate1"),rate1W);
    rW($(".rate2"),rate2W);
    rW($(".rate3"),rate3W);
    rW($(".rate4"),rate4W);
    rW($(".rate5"),rate5W);
    rW($(".rate6"),rate6W);
    rW($(".rate7"),rate7W);
    rW($(".rate8"),rate8W);
    rW($(".rate9"),rate9W);
    rW($(".rate10"),rate10W);
    rW($(".rate11"),rate11W);
    rW($(".rate12"),rate12W);
    rW($(".rate13"),rate13W);
    rW($(".rate14"),rate14W);
    rW($(".rate15"),rate15W);



    //  小屏顶部动画
    $(".touX").hover(function(){
        $(".touX1").css({
            opacity:0,
            right:'400px',
        })
        $(".touxRights").css({
            opacity:1,
            right:100
        })
    },function(){})


    //  小屏底部动画
    $('.aa').each(function () {
        var flag1=true;
          $(this).find(".bb").click(function () {
              if(flag1){
                 $(this).find(".m_con").slideDown();
                  flag1=false;
              }else{
                  $(this).find(".m_con").slideUp();
                  flag1=true;
              }
            })
    })

    var ewm=$("#ewm");

    ewm.click(function () {
            $(".masks").css({
                opacity:1,
                height:280
            })
            $(".mask").css({
                opacity:0.5,
                height:580
            })
        
    })
    var mask=$(".mask");
    mask.click(function () {
        $(this).css({
            height:0
        })
        $(".masks").css({
            opacity:0,
            height:0
        })
    })

    






})
