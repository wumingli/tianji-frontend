/**
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:test
 * developed at : 2014/1/15
 * Copyright 2014. All rights reserved.
 */

(function($) {
    var _TJ = {};

    //构造函数
    function Dialog(cfg) {
        this.cfg = cfg || {};
        this.cfg = $.extend({}, this.defaultConfig, this.cfg);
    }

    //默认配置
    Dialog.prototype.defaultConfig = {
        boxWidth: 810, //弹窗宽度
        boxHeight: 580, //弹窗高度
        boxID: 'inviteBox', //ID
        cssClassName: 'tianji_invite_box', //class name
        positioning: 'fixed', //定位方式，默认fixed
        disabled: false, //是否禁用                          
        multiple: true, //单选、多选
        dragable: true, //是否可拖动
        title: '天际弹层控件', //默认标题
        autoLoadStyle: true,
        overHide: true
    };

    //初始化
    Dialog.prototype.init = function() {
        //执行参数中的函数
        var _cfg = this.cfg;
        for (var o in _cfg) {
            if (typeof _cfg[o] === 'function') {
                _cfg[o]();
            }
        }
        this.create();
        if (_cfg.dragable) {
            this.drag();
        }
    };

    //创建对话框
    Dialog.prototype.create = function() {
        var _cfg = this.cfg;
        var boxID = _cfg.boxID;
        var $styleLink = $('<link />');
        var strHtml = '<div class="' + _cfg.cssClassName + '" id="' + boxID + '">';
        strHtml += '<h3>' + _cfg.title + '</h3>';
        strHtml += '<span class="box_close"></span>';
        strHtml += '</div>';
        if (_cfg.overHide) {
            strHtml += '<div id="' + boxID + '_shandow" style="height:' + $(document).height() + 'px; background:#000; opacity: 0.3;position:absolute;left:0;top:0;width:100%;z-index:999999;"></div>';
        }
        //<link rel="stylesheet" href="../../../styles/base.css" type="text/css" >
        $styleLink.attr({
            rel: 'stylesheet',
            href: '../css/style.css?' + Math.random(),
            type: 'text/css',
            id: 'inviteStyle'
        });
        //console.log($('#inviteStyle').length)
        if ($('#inviteStyle').length === 0 && _cfg.autoLoadStyle) {
            $('head').append($styleLink);
        }
        if ($('#' + boxID).length === 0) {
            $('body').append(strHtml);
        } else {
            $('#' + boxID + ', #' + boxID + '_shandow').show();
            $('#' + boxID + '_shandow').css('height', $(document).height());
        }

        //动态配置的样式
        $('#' + boxID).css({
            width: _cfg.boxWidth,
            height: _cfg.boxHeight,
            position: _cfg.positioning,
            left: '50%',
            top: '50%',
            marginLeft: -_cfg.boxWidth / 2,
            marginTop: -_cfg.boxHeight / 2
        });

        //关闭事件
        $('#' + boxID).find('.box_close').on('click', this.destroy);
    };

    //拖拽
    Dialog.prototype.drag = function() {
        var cfg = this.cfg;
        var $box = $('#' + cfg.boxID);
        var $boxShandow = $('#' + cfg.boxID + '_shandow');
        var $boxHeader = $('#' + cfg.boxID + ' h3');
        var $closeBtn = $box.find('.box_close');
        var pageX = 0;
        var pageY = 0;
        var bDrag = false;
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
        //resize重置遮罩层高度
        $(window).on('resize', function() {
            if ($box.is(':visible')) {
                $boxShandow.css('height', $(document).height());
            }
        });
    };

    //销毁
    Dialog.prototype.destroy = function() {
        $(document).off('mousemove mouseup');
        $(window).off('resize');
        console.log(this)
        //$('#' + this.cfg.boxID + ' h3').off('mousedown');
        //$('.' + this.cfg.cssClassName).remove();
    }
    window.TJ = _TJ;
    TJ.Dialog = Dialog;
})(jQuery);