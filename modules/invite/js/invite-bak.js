/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:test
 * developed at : 2014/1/15
 * Copyright 2014. All rights reserved.
 */
(function($) {
    //默认配置
    var defaultConfig = {
        boxWidth: 810, //弹窗宽度
        boxHeight: 580, //弹窗高度
        boxID: 'inviteBox', //ID
        cssClassName: 'tianji_invite_box', //class name
        positioning: 'fixed', //定位方式，默认fixed
        disabled: false, //是否禁用                          
        multiple: true, //单选、多选
        dragable: true, //是否可拖动
        closeable: true, //是否可关闭
        title: '邀请我的好友', //默认标题
        autoLoadStyle: true
    };
    //插件定义
    $.fn.inviteBox = function(cfg) {
        cfg = $.extend({}, defaultConfig, cfg || {});
        return this.each(function() {
            var $this = $(this);
            $this.on('click', function() {
                var $styleLink = $('<link />');
                var strHtml = '<div class="' + cfg.cssClassName + '" id="' + cfg.boxID + '">';
                strHtml += '<h3>' + cfg.title + '</h3>';
                strHtml += '<span class="box_close"></span>';
                strHtml += '</div>';
                strHtml += '<div id="' + cfg.boxID + '_shandow" style="height:' + $(document).height() + 'px; background:#000; opacity: 0.3;position:absolute;left:0;top:0;width:100%;z-index:999999;"></div>';
                //<link rel="stylesheet" href="../../../styles/base.css" type="text/css" >
                $styleLink.attr({
                    rel: 'stylesheet',
                    href: '../css/style.css?' + Math.random(),
                    type: 'text/css',
                    id: 'inviteStyle'
                });
                //console.log($('#inviteStyle').length)
                if ($('#inviteStyle').length === 0 && cfg.autoLoadStyle) {
                    $('head').append($styleLink);
                }
                if ($('#' + cfg.boxID).length === 0) {
                    $('body').append(strHtml);
                } else {
                    $('#' + cfg.boxID + ', #' + cfg.boxID + '_shandow').show();
                    $('#' + cfg.boxID + '_shandow').css('height', $(document).height());
                }
                //可拖拽
                var $box = $('#' + cfg.boxID);
                var $boxShandow = $('#' + cfg.boxID + '_shandow');
                var $boxHeader = $('#' + cfg.boxID + ' h3');
                var $closeBtn = $box.find('.box_close');
                var pageX = 0;
                var pageY = 0;
                var bDrag = false;
                if (cfg.dragable) {
                    $boxHeader.css('cursor', 'move');
                    $boxHeader.on('mousedown', function(e) {
                        e = e || window.event;
                        var x = e.clientX;
                        var y = e.clientY;
                        pageX = x - $box.offset().left;
                        pageY = y - $box.offset().top;
                        bDrag = true;
                        $(this)[0].setCapture && $(this)[0].setCapture();
                        return false;
                    });
                    $(document).on('mousemove', function(e) {
                        if (!bDrag) return;
                        e = e || window.event;
                        var iL = e.clientX - pageX;
                        var iT = e.clientY - pageY;

                        var maxL = document.documentElement.clientWidth - $box.width();
                        var maxT = document.documentElement.clientHeight - $box.height();

                        iL = iL < 0 ? 0 : iL;
                        iT = iT < 0 ? 0 : iT;

                        iL = iL > maxL ? maxL : iL;
                        iT = iT > maxT ? maxT : iT;

                        $box.css({
                            left: iL,
                            top: iT,
                            margin: 0
                        });
                        return false;
                    });
                    $(document).on('mouseup', function(e) {
                        //$boxHeader.off('mousedown');
                        //$(document).off('mousemove');
                        $boxHeader[0].releaseCapture && $boxHeader[0].releaseCapture();
                        bDrag = false;
                    });
                }

                //关闭弹窗函数
                function closeBox(){
                    $box.hide();
                    $boxShandow.hide();
                }
                $closeBtn.on('click', closeBox);
                $(window).on('keyup', function(e) {
                    e = e || window.event;
                    if (e.keyCode === 27) {
                        closeBox();
                    }
                });
                //resize重置遮罩层高度
                $(document).on('resize', function() {
                    if ($box.is(':visible')) {
                        $boxShandow.css('height', $(document).height());
                    }
                });

                //动态配置的样式
                $('#' + cfg.boxID).css({
                    width: cfg.boxWidth,
                    height: cfg.boxHeight,
                    position: cfg.positioning,
                    left: '50%',
                    top: '50%',
                    marginLeft: -cfg.boxWidth / 2,
                    marginTop: -cfg.boxHeight / 2
                });
                if (cfg.callback) {
                    cfg.callback();
                }
            });
            if (cfg.fnAutoRun) {
                cfg.fnAutoRun();
            }
        });
    };
})(jQuery);