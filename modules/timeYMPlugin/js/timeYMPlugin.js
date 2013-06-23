/*
*author:Wumingli
*for:time plugin,only contains year and month.auto select month when year selected.
*jQuery:1.7.2
*developed at :2013/6/21 10:02:34
*Copyright 2011. All rights reserved.
*/
(function ($){
    var yearPage = 0, curPage = 0;
    /*返回时间数据
     st:开始年份/月份
     et:结束年份/月份,
    */
    function getTimeData(st, et, type){
        var start = st || 1949,
            end = et || 2013;
        if (type && type == 'month'){
            start = st || 1;
            end = et || 12;
        }
        var timeArray = [];
        while (end >= start){
            timeArray.push(end);
            end--;
        }
        if (type && type == 'month'){
            timeArray = timeArray.sort(function (a, b){
                return a-b;
            });
        }
        //年份页数
        if (type == 'year'){
            yearPage =  Math.ceil(timeArray.length/12);
        }
        return timeArray;
    }
    //生成控件
    function createTimeBox($target, type, cfg){
        $('.timeYM_box').remove();
        var $timeBox = $('<div />'),
            titHtml = '',
            sinceNowStr = '',
            timeArray = [],
            timeSort = '年';
        //元素非法
        if ($target.length == 0){
            alert('ID不存在，请检查');
            return false;
        }
        //获取输入框位置
        var targetOffset = $target.offset();
        //添加属性
        $timeBox.attr({
            'id': $target.attr('id') + '_box',
            'class': 'timeYM_box',
            'data-box-for': $target.attr('id')
        });
        //添加样式
        $timeBox.css({
            left: targetOffset.left,
            top: targetOffset.top + $target.height()
        });
        //月份列表
        if (cfg.type == 'month'){
            //开始月份，开始年份和结束年份相同
            if(cfg.name == '#start_date_m' && $('#start_date_y').val() != '' && 
                $('#start_date_y').val() == $('#end_date_y').val() && $('#end_date_y').val() != ''){
                timeArray = getTimeData(1, $('#end_date_m').val(), 'month');
            }
            else if(cfg.name == '#end_date_m' && $('#start_date_y').val() != '' && 
                $('#start_date_y').val() == $('#end_date_y').val() && $('#start_date_m').val() != ''){
                timeArray = getTimeData($('#start_date_m').val(), 12, 'month');
            }
            else{
                timeArray = getTimeData(1, 12, 'month');
            }
            titHtml = '<div class="tit">请选择' + cfg.title + '</div>';
            timeSort = '月';
        }
        //年份列表
        else {
            if(cfg.name == '#start_date_y' && $('#end_date_y').val() != ''){
                timeArray = getTimeData(1949, $('#end_date_y').val(), 'year');
            }
            else if(cfg.name == '#end_date_y' && $('#start_date_y').val() != ''){
                timeArray = getTimeData($('#start_date_y').val(), 2013, 'year');
            }
            else{
                timeArray = getTimeData(1949, 2013, 'year');
            }
            titHtml = '<div class="tit"><em class="prev disable">&lt;&lt; </em>请选择' + cfg.title + 
                    '<em class="next"> &gt;&gt;</em></div>';
        }
        titHtml += '<div class="timeCon">';
        titHtml += '<div class="oneBlock">';
        for (var i=0, len = timeArray.length; i < len ; i++){
            titHtml += '<span>' + timeArray[i] + timeSort + '</span> ';
            if ((i + 1) % 12 == 0){
                titHtml += '</div>';
                titHtml += '<div class="oneBlock">'
            }
        }
        titHtml += '</div>';
        titHtml += '</div>';
        //清空
        if (cfg.name == '#end_date_y' || cfg.name == '#end_date_m' ){
            sinceNowStr = '<a class="btnSinceNow" href="javascript:void(0);">至今</a> ';
        }
        titHtml += '<div class="btns">' + sinceNowStr + '<a href="javascript:void(0);" class="clear">清空</a>' + 
                ' <a href="javascript:void(0);" class="btnClose">关闭</a></div>';
        $timeBox.append($(titHtml));
        $('body').append($timeBox);
    }
    $.fn.timeYM = function (options){
        $this = $(this);
        var config = {
            name: '#' + $this.attr('id'),
            title: '开始年份',
            next: '开始月份',
            next: '#start_date_m',
            minYear: 1949,
            method: 'click',
            type: 'year'
        };
        var timePlugin = $.extend(config, options);
        $this.bind(timePlugin.method,function (event){
            (event || window.event).stopPropagation();
            $this.keydown(function (event){
                event = event || window.event;
                if(event.keyCode != 116 && event.keyCode != 9){
                    return false;
                }
                return true;
            });
            if($(timePlugin.name + '_box').length == 0){
                createTimeBox($(timePlugin.name), timePlugin.type, timePlugin);
            }
        });
    }
    $(document).click(function (){
        $('.timeYM_box').remove();
    });
    $('.timeYM_box').live('click', function (event){
        (event || window.event).stopPropagation();
    });
    //左箭头点击事件
    $('.timeYM_box .tit em.prev').live('click', function (){
        if (curPage > 0 && !$('.timeYM_box .timeCon').is(':animated')){
            curPage--;
            $('#' + $(this).parents('.timeYM_box').attr('id') +' .timeCon').animate({
                left: -$('.timeYM_box').width()*curPage
            },function (){
                $('.timeYM_box .tit em.next').removeClass('disable');
                if (curPage == 0){
                    $('.timeYM_box .tit em.prev').addClass('disable');
                }
            });
        }
    });
    //右箭头点击事件
    $('.timeYM_box .tit em.next').live('click', function (){
        if ((curPage + 1) < yearPage && !$('.timeYM_box .timeCon').is(':animated')){
            curPage++;
            $('#' + $(this).parents('.timeYM_box').attr('id') +' .timeCon').animate({
                left: -$('.timeYM_box').width()*curPage
            },function (){
                $('.timeYM_box .tit em.prev').removeClass('disable');
                if ((curPage + 1) == yearPage){
                    $('.timeYM_box .tit em.next').addClass('disable');
                }
            });
        }
    });
    //时间点击
    $('.timeYM_box .timeCon .oneBlock span').live('click',function (){
        var $theBox = $(this).parents('.timeYM_box');
        var theTimeTxt = $theBox.attr('data-box-for');        
        $('#' + theTimeTxt).val($(this).text().replace(/年|月/,''));
        $(this).addClass('cur').siblings().removeClass('cur');
        switch (theTimeTxt){
            case 'start_date_y':
                if($('#start_date_m').val() == ''){
                    $('#start_date_m').trigger('click').focus();
                }
                break;
            case 'start_date_m':
                if($('#end_date_y').val() == ''){
                    $('#end_date_y').trigger('click').focus();
                }
                break;
            case 'end_date_y':
                if($('#end_date_m').val() == ''){
                    $('#end_date_m').trigger('click').focus();
                }
                break;
        }
        $theBox.remove();
    });
    //清空
    $('.timeYM_box .btns .clear').live('click', function (){
        var $theBox = $(this).parents('.timeYM_box');
        var theTimeTxt = $theBox.attr('data-box-for'); 
        $('#' + theTimeTxt).val('').focus();
    });
    //关闭
    $('.timeYM_box .btns .btnClose').live('click', function (){
        $(this).parents('.timeYM_box').remove();
    });
})(jQuery);