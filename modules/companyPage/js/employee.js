/*
 * author: wumingli
 * author email: wumingli@tianji.com
 * for: tianji employee analyse
 * developed at : 2013/8/15 17:00
 * Copyright 2013. All rights reserved.
 */
$(function (){
    $('.em_a .avatarCon img').css('opacity', 0.3);
    //多种情况的映射关系
    var avatarMaps = {
        '0': {
            
        },
        '1': {
            'em2': {
            }
        }
    }
    //头像运动
    function avatarMove(obj, pos){
        $('.' + obj).animate(pos, 600, function (){
            $(this).find('dd').fadeIn();
            $('[data-for="' + obj + '"]').fadeIn();
        });
    }
    setTimeout(function (){
        $('.loadingGif').fadeOut(function (){
            $('.analyseCon h3').addClass('hideText');
            avatarMove('em1', {left: 160,top: 40});
            setTimeout(function(){
                avatarMove('em2', {left: 30,top: 115});
            }, 1200);
            setTimeout(function(){
                avatarMove('em3', {left: 183,top: 170});
            }, 1800);
            setTimeout(function(){
                avatarMove('em4', {left: 810,top: 30});
            }, 2600);
            setTimeout(function(){
                avatarMove('em5', {left: 705,top: 110});
            }, 3400);
            setTimeout(function(){
                avatarMove('em6', {left: 785,top: 175});
            }, 4200);
            /*
            setTimeout(function(){
                $('.analyseCon .em_a').fadeIn(1000);
            }, 4400);*/
        });
    }, 1000);
    //二度人脉头像滑过
    $('.em_a .avatarCon').hover(function (){
        $(this).find('img').stop().animate({
            opacity: 1
        });
    },function (){
        $(this).find('img').stop().animate({
            opacity: 0.3
        });
    });
});