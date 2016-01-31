$(function(){
    var box = $('.box');
    var copy = $(".copy");
    var canvas = $("canvas");
    var cobj =canvas[0].getContext("2d");
    $('.box').css({
        height:$(window).height()-52+"px"
    })
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })
    if($(window).width()<=700){
        $('.hasson').css("display","none");
        $(".yincang").click(function(e){
            e.preventDefault();
            $(".hasson").slideToggle();
        })
    }else{
        $('.hasson').css("display","block");
    }
    $(window).resize(function(){
        canvas.attr({
            width:copy.width(),
            height:copy.height()
        })
        if($(window).width()<=700){
            $('.hasson').css("display","none");
            $(".yincang").click(function(){
                $(".hasson").finish();
                $(".hasson").slideToggle();
            })
        }else{
            $('.hasson').css("display","block");
        }
    })
    $(".hasson").hover(function(){
        $(this).find(".son").finish();
        $(this).find(".son").fadeIn(1000);
    },function(){
        $(this).find(".son").finish();
        $(this).find(".son").fadeOut(200);
    })
    var obj=   new shape(copy[0],canvas[0],cobj,$(".xp"),$(".selector"));
    $(".hasson:eq(1) .son").find("li").click(function(){
        obj.shapes = $(this).attr("data-role");
        $(this).parent().find("li").css({color:"#000"});
        $(this).css("color","red");
        $(this).parent().hide();
        if(obj.shapes=="pen"){
            obj.pen();
        }else{
            obj.draw();
        }

    })
    $(".hasson:eq(2) .son").find("li").click(function(){
        obj.type = $(this).attr("data-role");
        $(this).parent().find("li").css({color:"#000"});
        $(this).css("color","red");
        $(this).parent().hide();
    })
    $(".hasson:eq(5) .son").find("li").click(function(){
        $(this).parent().find("li").css({color:"#000"});
        $(this).css("color","red");
        obj.lineWidth = $(this).attr("data-role");
        $(this).parent().hide();
    })
    $(".hasson:eq(6) .son").find("li").click(function(){
        $(this).parent().find("li").css({color:"#000"});
        $(this).css("color","red");
        var w = $(this).attr("data-role");
        $(this).parent().hide();
        obj.xp($(".xp"),w);

    })
    $(".lineColor input").change(function(){
        obj.borderColor = $(this).val();
    })
    $(".fillColor input").change(function(){
        obj.fillColor = $(this).val();
    })
    $(".hasson:eq(0) .son").find("li").click(function(){
        var index = $(this).index(".wenjian li");
        if(index == 0){
            if(obj.history.length>0){
                var yes=window.confirm("Whether to save");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
                }
            }
                obj.history=[];
                cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
             }else if(index==2){
                cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length==0){
                alert("can not go");
                return;
            }
            obj.history.pop();
            var data =obj.history[obj.history.length-1];
            if(data){
                cobj.putImageData(data,0,0);
            }else{
                return;
            }


        }else if(index==1){
            //data:stream/octet   data:image
            location.href=canvas[0].toDataURL().replace("data:image/png","data:steam/octet");
        }
    })
    $(".select").click(function(){
        obj.select($(".selector"));
    })






})