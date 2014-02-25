/*
 * author:Wumingli
 * for:time plugin,only contains year and month
 * jQuery:1.7.2
 * developed at :2013/6/21 10:02:34
 * Copyright 2013. All rights reserved.
 */
(function($) {
    //加载样式aaaaasdfasfd
    var style = '<style type="text/css">.date_input{border:1px solid #f0f0f0;border-radius:2px;height:28px;line-height:28px;color:#999;padding-left:5px;width:43px;box-shadow:#e9e9e9 0 0 3px;outline:none;cursor:pointer;}.timeYM_box{position:absolute;top:-100px;left:-100px;z-index:9999;overflow:hidden;padding:1px;width:220px;height:160px;border:#aaa 1px solid;background:#fcfcfc;color:#000; box-shadow:#ccc 0 0 3px;}.timeYM_box .tit{position:relative;height:30px;background:#aaa;color:#fff;text-align:center;font-weight:bold;font-size:12px;line-height:30px}.timeYM_box .tit em{position:absolute;top:0;left:10px;font-weight:bold;font-family:\'Sim Hei\';cursor:pointer}.timeYM_box .tit em.next{right:10px;left:auto}.timeYM_box .tit em.disable{color:#bcd;text-shadow:1px 0 0 #fff;cursor:not-allowed}.timeYM_box .timeCon{position:absolute;left:0;width:2000px;height:150px}.timeYM_box .timeCon .oneBlock{float:left;margin-top:10px;padding-left:10px;width:212px;line-height:25px}.timeYM_box .timeCon .oneBlock span{float:left;display:block;margin:0 5px 5px 0;width:45px;height:25px;text-align:center;font-size:12px;cursor:pointer}.timeYM_box .timeCon .oneBlock span:hover,.timeYM_box .timeCon .oneBlock span.cur{background-color:#eee;color:#08c}.timeYM_box .btns{position:absolute;bottom:15px;width:100%;text-align:center}.timeYM_box .btns a{color:#09c;text-decoration:none;font-size:12px}span.modifyEndYM{padding-right:15px;background:url(http://image.tianji.com/tjs/timeYMPlugin/images/note.gif) right center no-repeat;color:#09c;cursor:pointer}.tillNow, .tillNowChecked {cursor: pointer;font-style:normal;display: inline-block;height:16px;}.tillNow .checkbox,.tillNowChecked .checkbox{background: url(http://image.tianji.com/tjs/recruiting/images/zp.gif) -228px -225px no-repeat; display: inline-block;height:15px;width:13px; }.tillNowChecked .checkbox{background-position: -206px -225px;}.tillNow span {vertical-align: top;}</style>';
    $('head').append(style);
    //插件扩展
    $.fn.timeYM = function(options) {
        $this = $(this);
        var boxId = '';
        var config = {
            txtId: '#' + $this.attr('id'),
            txtCssClass: 'date_input',
            title: '开始年份',
            minDate: 1949,
            maxDate: new Date().getFullYear(),
            method: 'click',
            type: 'year',
            boxCssClass: 'timeYM_box',
            seType: 'start'
        };
        var timePlugin = $.extend(config, options);
        var oPages = {};
        boxId = timePlugin.txtId;
        $this.attr({
            'autocomplete': 'off',
            //'class': timePlugin.txtCssClass,
            'date-type': timePlugin.type,
            'se-type': timePlugin.seType,
            'readonly': 'readonly',
            'title': '请选择' + timePlugin.title
        });
        $this.addClass(timePlugin.txtCssClass);
        if (timePlugin['css']) {
            $this.css(timePlugin['css']);
        }

        /* 返回时间数据
         * st:开始年份/月份
         * et:结束年份/月份,
         */

        function getTimeData(st, et, dft) {
            var start = st || 1949,
                end = et || timePlugin.maxDate,
                type = timePlugin.type || 'year',
                curPage = 0;
            /* timeArray数组用来返回日期
             * timeArray.curPage存储当前页数（若输入框不为空，则返回当前值所在页数）
             * timeArray.pageLen中保存年份/月数长度
             */
            var timeArray = [];

            if (type == 'month') {
                start = st > 12 ? 1 : st || 1; //实际参数传入的是年份值，返回1
                end = et >= 12 ? 12 : et || 12; //实际参数传入的是年份值，返回12
            }

            dft = dft || end;
            curPage = Math.ceil((end - dft + 1) / 12);
            while (end >= start) {
                timeArray.push(end);
                end--;
            }
            //月份，倒序排列
            if (type && type == 'month') {
                timeArray = timeArray.reverse();
            }
            //年份页数
            if (type == 'year') {
                curPage = curPage == 0 ? 1 : curPage;
                timeArray.curPage = curPage;
                timeArray.pageLen = Math.ceil(timeArray.length / 12);
            }
            return timeArray;
        }


        var thisMonth = new Date().getMonth() + 1;
        var maxMonth = 0;

        //生成控件

        function createTimeBox($target, type) {
            $('.' + timePlugin.boxCssClass).remove();
            var $timeBox = $('<div />'),
                boxHtml = '',
                timeArray = [],
                timeSort = '年',
                isStart = true,
                isStartSibing = true,
                timePage = 0,
                curPage = 0,
                targetVal = '',
                i,
                len;
            //获取输入框位置
            var targetOffset = $target.offset();
            //获取同类兄弟元素（月/年）
            var $tarSibling = $target.siblings('[date-type=' + $target.attr('date-type') + ']');
            var tarSibVal = $tarSibling.val();
            //获取年份
            var $diffSortSibling = $target.siblings('[date-type][date-type!=' + $target.attr('date-type') + ']');
            //月份时，获取相同类型年份（同是开始/结束）
            var $tarSameSort = $target.siblings('[se-type=' + $target.attr('se-type') + ']');
            var isCurYear = new Date().getFullYear() == $tarSameSort.val();
            //元素非法
            if ($target.length == 0) {
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
            targetVal = $target.val();
            //月份与年份结构不同
            if (type == 'year') {
                boxHtml = '<div class="tit"><em class="prev">&lt;&lt; </em>请选择' + timePlugin.title +
                    '<em class="next"> &gt;&gt;</em></div>';
                if (isStart && tarSibVal != '') {
                    timeArray = getTimeData(timePlugin.minDate, tarSibVal, targetVal);
                } else if (!isStart && tarSibVal != '') {
                    timeArray = getTimeData(tarSibVal, timePlugin.maxDate, targetVal);
                } else {
                    timeArray = getTimeData(timePlugin.minDate, timePlugin.maxDate, targetVal);
                }
            } else {
                boxHtml = '<div class="tit">请选择' + timePlugin.title + '</div>';
                timeSort = '月';
                if (isCurYear && $target.val() > thisMonth) {
                    $target.val('');
                }
                //开始年份和结束年份相同时
                if ($diffSortSibling.eq(0).val() != '' && $diffSortSibling.eq(0).val() == $diffSortSibling.eq(1).val()) {
                    if (isStart && tarSibVal != '') {
                        if (isCurYear) {
                            maxMonth = Math.min(thisMonth, tarSibVal);
                        } else {
                            maxMonth = tarSibVal;
                        }
                        timeArray = getTimeData(timePlugin.minDate, maxMonth, targetVal);
                    } else if (!isStart && tarSibVal != '') {
                        if (isCurYear) {
                            maxMonth = Math.min(thisMonth, timePlugin.maxDate);
                        } else {
                            maxMonth = timePlugin.maxDate;
                        }
                        timeArray = getTimeData(tarSibVal, maxMonth, targetVal);
                    } else {
                        if (isCurYear) {
                            maxMonth = Math.min(thisMonth, thisMonth);
                        } else {
                            maxMonth = 12;
                        }
                        timeArray = getTimeData(1, maxMonth);
                    }
                } else {
                    if (isCurYear) {
                        maxMonth = thisMonth;
                    } else {
                        maxMonth = timePlugin.maxDate;
                    }
                    timeArray = getTimeData(timePlugin.minDate, maxMonth, targetVal);
                }
            }
            boxHtml += '<div class="timeCon"><div class="oneBlock">';
            for (i = 0, len = timeArray.length; i < len; i++) {
                boxHtml += '<span>' + timeArray[i] + timeSort + '</span> ';
                if ((i + 1) % 12 == 0) {
                    boxHtml += '</div>';
                    boxHtml += '<div class="oneBlock">'
                }
            }
            boxHtml += '</div></div>';
            boxHtml += '<div class="btns"><a href="javascript:void(0);" class="clear">[清空]</a>' +
                ' <a href="javascript:void(0);" class="btnClose">[关闭]</a></div>';
            $timeBox.append($(boxHtml));
            $('body').append($timeBox);

            if (type == 'year') {
                timePage = timeArray.pageLen;
                curPage = timeArray.curPage;
                /* oPages用于存放两个年份的页数信息
                   time_page: 年份页数
                   cur_page: 当前页
                 */
                oPages[boxId.substring(1) + '_time_page'] = timePage;
                oPages[boxId.substring(1) + '_cur_page'] = curPage;
                if (timePage == 1) {
                    $(boxId + '_box .tit em.prev, ' + boxId + '_box .tit em.next').addClass('disable');
                } else {
                    if (curPage == 1) {
                        $(boxId + '_box .tit em.prev').addClass('disable');
                    } else if (curPage == timePage) {
                        $(boxId + '_box .tit em.next').addClass('disable');
                    }
                }
                $(boxId + '_box .timeCon').css('left', -$(boxId + '_box').width() * (curPage - 1));
            }
            //输入框已有值，标识当前
            if (targetVal != '') {
                $(boxId + '_box .timeCon span').each(function() {
                    if ($(this).text().replace(/年|月/, '') == targetVal) {
                        $(this).addClass('cur');
                        return false;
                    }
                });
            }
        }
        //绑定事件
        $this.bind(timePlugin.method, function(event) {
            (event || window.event).stopPropagation();
            if ($(boxId + '_box').length == 0) {
                createTimeBox($(timePlugin.txtId), timePlugin.type);
            }
        });
        $this.keydown(function(event) {
            event = event || window.event;
            if (event.keyCode == 116 || event.keyCode == 8) {
                return true;
            }
            return false;
        });
        $(document).click(function() {
            $('.' + timePlugin.boxCssClass).remove();
        });
        $(boxId + '_box').live('click', function(event) {
            (event || window.event).stopPropagation();
        });
        //左箭头点击事件
        $(boxId + '_box .tit em.prev').live('click', function() {
            var boxWidth = $(boxId + '_box').width();
            if ((oPages[boxId.substring(1) + '_cur_page'] - 1) > 0 && !$(boxId + '_box .timeCon').is(':animated')) {
                oPages[boxId.substring(1) + '_cur_page'] -= 1;
                $(boxId + '_box .timeCon').animate({
                    left: -boxWidth * (oPages[boxId.substring(1) + '_cur_page'] - 1)
                }, function() {
                    -$(boxId + '_box .tit em.next').removeClass('disable');
                    if (oPages[boxId.substring(1) + '_cur_page'] - 1 == 0) {
                        $(boxId + '_box .tit em.prev').addClass('disable');
                    }
                });
            }
        });
        //右箭头点击事件
        $(boxId + '_box .tit em.next').live('click', function() {
            var boxWidth = $(boxId + '_box').width();
            if (oPages[boxId.substring(1) + '_cur_page'] < oPages[boxId.substring(1) + '_time_page'] && !$(boxId + '_box .timeCon').is(':animated')) {
                $(boxId + '_box .timeCon').animate({
                    left: -boxWidth * oPages[boxId.substring(1) + '_cur_page']
                }, function() {
                    $(boxId + '_box .tit em.prev').removeClass('disable');
                    if (oPages[boxId.substring(1) + '_cur_page'] == oPages[boxId.substring(1) + '_time_page']) {
                        $(boxId + '_box .tit em.next').addClass('disable');
                    }
                });
                oPages[boxId.substring(1) + '_cur_page'] += 1;
            }
        });
        //时间点击
        $(boxId + '_box .timeCon .oneBlock span').live('click', function() {
            var $theBox = $(boxId + '_box');
            var theTimeTxt = $theBox.attr('data-box-for');
            var $nextTxts = $(theTimeTxt).nextAll('[date-type]');
            $(theTimeTxt).val($(this).text().replace(/年|月/, ''));
            $(this).addClass('cur').siblings().removeClass('cur');
            if ($nextTxts.length > 0 && $nextTxts.eq(0).val() == '' && $nextTxts.eq(0).is(':visible')) {
                $nextTxts.eq(0).focus().trigger(timePlugin.method);
            }
            $theBox.remove();
        });
        //为IE6添加Hover效果
        if ($.browser.msie && $.browser.version == '6.0') {
            $(boxId + '_box .timeCon .oneBlock span').live('mouseover', function() {
                $(this).addClass('cur');
            });
            $(boxId + '_box .timeCon .oneBlock span').live('mouseout', function() {
                $(this).removeClass('cur');
            });
        }
        //至今
        $('.tillNow:not(:disabled)').live('click', function() {
            if ($(this).is('[disabled]')) {
                return false;
            }
            var $thisParent = $(this).parent();
            var now = new Date().getTime();
            $(this).addClass('tillNowChecked');
            //var html = '<span class="modifyEndYM" title="修改结束年月">[现在]</span><input type="hidden" value="" id="tillNow" />';
            $thisParent.find('[se-type=end]').hide().val('')
                .next('span.txt').hide();
            /*if ($thisParent.find('span.modifyEndYM').length == 0) {
                //$thisParent.find('span.txt:last').after(html).hide();
            } else {
                $thisParent.find('span.modifyEndYM').show();
            }*/
            //$thisParent.find('#tillNow').val(now);
            $thisParent.find('[se-type=end]').attr('disabled', true);
            $(boxId + '_box').remove();
        });
        //不再至今
        $('.tillNowChecked:not(:disabled)').live('click', function() {
            if ($(this).is('[disabled]')) {
                return false;
            }
            var $thisParent = $(this).parent();
            $(this).removeClass('tillNowChecked');
            if ($(this).is('[disabled]')) {
                $(this).attr('title', '结束年月不可修改');
                return false;
            }
            $thisParent.find('[se-type=end],span').show();
            $thisParent.find('[se-type=end]').removeAttr('disabled');
            $thisParent.find('[se-type=end]').eq(0).trigger(timePlugin.method).focus().val('');
            $thisParent.find('#tillNow').val('');
            //$(this).hide();
            return false;
        });
        //清空
        $(boxId + '_box .btns .clear').live('click', function() {
            $(boxId + '_box .timeCon .oneBlock span.cur').removeClass('cur');
            $($(boxId + '_box').attr('data-box-for')).val('').focus();
        });
        //关闭
        $(boxId + '_box .btns .btnClose').live('click', function() {
            $(boxId + '_box').remove();
        });
    }
})(jQuery);

function tillNow() {
    $('.tillNow').each(function() {
        var $this = $(this);
        if ($(this).hasClass('tillNowChecked')) {
            $this.parent().find('[se-type=end]').attr('disabled', true).hide()
                .next('span.txt').hide();
        }
    });
}
$(document).ready(function() {
    tillNow();
});