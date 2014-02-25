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
        /*boxWidth: 860, //弹窗宽度
        boxHeight: 625, //弹窗高度
        ======已将默认宽、高，但可以通过boxWidth/boxHeight设置弹窗宽/高
        */
        boxID: 'tianjiPopupBox', //ID
        cssClassName: 'tianji_popup_box', //class name
        position: 'fixed', //定位方式，默认fixed
        enabled: true, //是否启用
        multiple: true, //单选、多选
        dragable: true, //是否可拖动
        showCloseBtn: true, //是否可关闭
        shandowable: true, //是否显示遮罩层
        escToClose: true, //ESC键关闭弹出层
        title: '弹窗默认标题', //默认标题
        type: 'focus', //默认为焦点图展示
        list: [{
            title: '焦点图标题1',
            link: 'http://www.baidu.com',
            pic: ''
        }]
    };
    //插件定义
    $.fn.tianjiPopup = function(cfg) {
        cfg = $.extend({}, defaultConfig, cfg || {});
        return this.each(function() {
            var $this = $(this);
            $this.on('click', function() {
                if (!cfg.enabled) {
                    return;
                }
                var html = '';
                //外层开始
                html += '<div id="tianjiPopupContainer">';
                if (cfg.showCloseBtn) {
                    html += '<div id="tianjiPopupCloseBtn" title="关闭"></div>';
                }
                html += '<h3 class="tianji_popup_title">' + cfg.title + '</h3>';
                html += '</div>';
                //外层结束
                if (cfg.shandowable) {
                    html += '<div id="tianjiPopupContainer_shandow"></div>';
                }
                $('body').append(html);
                if (cfg.dragable) {
                    $.getScript('../../js/drag.js', function() {
                        var $box = $('#tianjiPopupContainer');
                        fnTianjiDrag($box, $box.find('.tianji_popup_title'));
                    });
                }
                cfg.ok && cfg.ok();
                return false;
            });
        });
    };
})(jQuery);