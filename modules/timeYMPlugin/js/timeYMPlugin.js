/*
*author:Wumingli
*for:time plugin,only contains year and month
*jQuery:1.7.2
*developed at :2013/6/21 10:02:34
*Copyright 2011. All rights reserved.
*/
(function ($){
    //插件扩展
    $.fn.timeYM = function (options){
        $this = $(this);
        var boxId = '';
        var config = {
            txtId: '#' + $this.attr('id'),
            title: '开始年份',
            minDate: 1949,
            maxDate: new Date().getFullYear(),
            method: 'click',
            type: 'year',
            boxCssClass: 'timeYM_box',
            seType: 'start'
        };
        var timePlugin = $.extend(config, options);
        boxId = timePlugin.txtId;
        $this.attr({
            'date-type': timePlugin.type,
            'se-type': timePlugin.seType        
        });
        /*返回时间数据
         st:开始年份/月份
         et:结束年份/月份,
        */
        function getTimeData(st, et, dft){
            var start = st || 1949,
                end = et || 2013,
                type = timePlugin.type || 'year',
                curPage = 0;
            if (type && type == 'month'){
                start = st > 12 ? 1 : st || 1;
                end = et >= 12 ? 12 : et || 12;
            }
            var timeArray = [];
            dft = dft || end;
            curPage = Math.ceil((end - dft) / 12) + 1;
            //curPage = curPage == 0 ? 1 : curPage;
            timeArray.curPage = curPage;
            while (end >= start){
                timeArray.push(end);
                end--;
            }
            //
            if (type && type == 'month'){
                timeArray = timeArray.sort(function (a, b){
                    return a-b;
                });
            }
            //年份页数
            if (type == 'year'){
                //pageLen中保存年份月数
                timeArray.pageLen = Math.ceil(timeArray.length/12);
            }
            return timeArray;
        }
        //生成控件
        function createTimeBox($target, type){
            $('.' + timePlugin.boxCssClass).remove();
            var $timeBox = $('<div />'),
                boxHtml = '',
                sinceNowStr = '',
                timeArray = [],
                timeSort = '年',
                isStart = true,
                isStartSibing = true,
                timePage = 0,
                curPage = 0,
                i,
                len;
            //获取输入框位置
            var targetOffset = $target.offset();
            //获取同类兄弟元素（月/年）
            var $tarSibling = $target.siblings('[date-type='+$target.attr('date-type')+']');
            //获取年份
            var $diffSortSibling = $target.siblings('[date-type][date-type!='+$target.attr('date-type')+']');
            //元素非法
            if ($target.length == 0){
                alert('ID不存在，请检查');
                return false;
            }
            //添加属性
            $timeBox.attr({
                'id': $target.attr('id') + '_box',
                'class': timePlugin.boxCssClass,
                'data-box-for': timePlugin.txtId
            });
            //添加样式
            $timeBox.css({
                left: targetOffset.left,
                top: targetOffset.top + $target.height()
            });
            //取日期数据
            isStart = $target.index() < $tarSibling.index() ? true : false;
            //月份与年份结构不同
            if (timePlugin.type == 'year'){
                if (isStart && $tarSibling.val() != ''){
                    timeArray = getTimeData(timePlugin.minDate, $tarSibling.val(), $target.val());
                } else if (!isStart && $tarSibling.val() != ''){
                    timeArray = getTimeData($tarSibling.val(), timePlugin.maxDate, $target.val());
                } else {
                    timeArray = getTimeData(timePlugin.minDate, timePlugin.maxDate, $target.val());
                }
                boxHtml = '<div class="tit"><em class="prev">&lt;&lt; </em>请选择' + timePlugin.title + 
                        '<em class="next"> &gt;&gt;</em></div>';
            } else {
                boxHtml = '<div class="tit">请选择' + timePlugin.title + '</div>';
                timeSort = '月';
                if ($diffSortSibling.eq(0).val() != '' && $diffSortSibling.eq(0).val() == $diffSortSibling.eq(1).val()){
                    if (isStart && $tarSibling.val() != ''){
                        timeArray = getTimeData(timePlugin.minDate, $tarSibling.val());
                    } else if (!isStart && $tarSibling.val() != ''){
                        timeArray = getTimeData($tarSibling.val(), timePlugin.maxDate);
                    }
                } else {
                    timeArray = getTimeData(timePlugin.minDate, timePlugin.maxDate);
                }
            }
            boxHtml += '<div class="timeCon">';
            boxHtml += '<div class="oneBlock">';
            for (i=0, len = timeArray.length; i < len ; i++){
                boxHtml += '<span>' + timeArray[i] + timeSort + '</span> ';
                if ((i + 1) % 12 == 0){
                    boxHtml += '</div>';
                    boxHtml += '<div class="oneBlock">'
                }
            }
            boxHtml += '</div>';
            boxHtml += '</div>';
            //清空
            if (timePlugin.seType == 'end'){
                sinceNowStr = '<a class="btnSinceNow" href="javascript:void(0);">至今</a> ';
            }
            boxHtml += '<div class="btns">' + sinceNowStr + '<a href="javascript:void(0);" class="clear">清空</a>' + 
                    ' <a href="javascript:void(0);" class="btnClose">关闭</a></div>';
            $timeBox.append($(boxHtml));
            $('body').append($timeBox);
            //
            if (timePlugin.type == 'year'){
                timePage = timeArray.pageLen;
                curPage = timeArray.curPage;
                var boxWidth = $(boxId +'_box').width();
                /* oPages用于存放两个年份的页数信息
                   time_page: 年份页数
                   cur_page: 当前页
                 */
                var oPages = {};
                oPages[boxId.substring(1) + '_time_page'] = timePage;
                oPages[boxId.substring(1) + '_cur_page'] = curPage;
                if (timePage == 1){
                    $(boxId + '_box .tit em.prev, ' + boxId + '_box .tit em.next').addClass('disable');
                } else {
                    if (curPage == 1){
                        $(boxId + '_box .tit em.prev').addClass('disable');
                    }
                    else if (curPage == timePage){
                        $(boxId + '_box .tit em.next').addClass('disable');
                    }
                }
                $(boxId +'_box .timeCon').css('left',-boxWidth * (oPages[boxId.substring(1) + '_cur_page']+1));
                //左箭头点击事件
                $(boxId +'_box .tit em.prev').live('click', function (){
                    if ((oPages[boxId.substring(1) + '_cur_page'] - 1) > 0 && !$(boxId +'_box .timeCon').is(':animated')){
                        oPages[boxId.substring(1) + '_cur_page'] -= 1;
                        console.log(oPages[boxId.substring(1) + '_cur_page']);
                        console.log(oPages[boxId.substring(1) + '_time_page']);
                        $(boxId +'_box .timeCon').animate({
                            left: -boxWidth * (oPages[boxId.substring(1) + '_cur_page'] - 1)
                        },function (){
                            -$(boxId +'_box .tit em.next').removeClass('disable');
                            if (oPages[boxId.substring(1) + '_cur_page'] - 1 == 0){
                                $(boxId +'_box .tit em.prev').addClass('disable');
                            }
                        });
                    }
                });
                //右箭头点击事件
                $(boxId +'_box .tit em.next').live('click', function (){
                        console.log(oPages[boxId.substring(1) + '_cur_page']);
                        console.log(oPages[boxId.substring(1) + '_time_page']);
                    if (oPages[boxId.substring(1) + '_cur_page'] < oPages[boxId.substring(1) + '_time_page'] && !$(boxId +'_box .timeCon').is(':animated')){
                        $(boxId +'_box .timeCon').animate({
                            left: -boxWidth * oPages[boxId.substring(1) + '_cur_page']
                        },function (){
                            $(boxId +'_box .tit em.prev').removeClass('disable');
                            if (oPages[boxId.substring(1) + '_cur_page'] == oPages[boxId.substring(1) + '_time_page']){
                                $(boxId +'_box .tit em.next').addClass('disable');
                            }
                        });
                        oPages[boxId.substring(1) + '_cur_page'] += 1;
                    }
                });
            }
            //输入框已有值，标识当前
            if ($target.val() != ''){
                $(boxId +'_box .timeCon span').each(function (){
                    if ($(this).text().replace(/年|月/,'') == $target.val()){
                        $(this).addClass('cur');
                        return false;
                    }
                });
            }
        }
        $this.bind(timePlugin.method,function (event){
            (event || window.event).stopPropagation();
            $this.keydown(function (event){
                event = event || window.event;
                if(event.keyCode != 116 && event.keyCode != 9){
                    return false;
                }
                return true;
            });
            //if($(timePlugin.boxId + '_box').length == 0){
            createTimeBox($(timePlugin.txtId), timePlugin.type);
            //}
        });
        
        $(document).click(function (){
            $('.timeYM_box').remove();
        });
        $('.timeYM_box').live('click', function (event){
            (event || window.event).stopPropagation();
        });
        //时间点击
        $(boxId +'_box .timeCon .oneBlock span').live('click',function (){
            var $theBox = $(this).parents('.timeYM_box');
            var theTimeTxt = $theBox.attr('data-box-for');
            var $nextTxts = $(theTimeTxt).nextAll('[date-type]');
            $(theTimeTxt).val($(this).text().replace(/年|月/,''));
            $(this).addClass('cur').siblings().removeClass('cur');
            if ($nextTxts.length > 0 && $nextTxts.eq(0).val() == ''){
                $nextTxts.eq(0).focus().trigger('click');
            }
            $theBox.remove();
        });
        //清空
        $(boxId +'_box .btns .clear').live('click', function (){
            var $theBox = $(this).parents('.timeYM_box');
            var theTimeTxt = $theBox.attr('data-box-for'); 
            $(theTimeTxt).val('').focus();
        });
        //关闭
        $(boxId +'_box .btns .btnClose').live('click', function (){
            $(this).parents('.timeYM_box').remove();
        });
    }
})(jQuery);