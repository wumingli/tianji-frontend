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
        escClosed: true, //ESC键关闭弹出层
        effect: 'h', //效果，可选值h/v，默认为h(水平滚动)
        showTitle: true, //是否显示标题栏，默认显示
        title: '弹窗默认标题', //默认标题
        //titleHeight: 40, //标题栏高度
        content: { //默认为焦点图展示
            type: 'focus',
            list: [{
                title: '焦点图标题1',
                link: 'http://www.baidu.com',
                pic: '../images/f1.jpg?adf'
            }, {
                title: '焦点图标题2',
                link: 'http://www.tianji.com',
                pic: '../images/f2.jpg?ad'
            }, {
                title: '焦点图标题3',
                link: 'http://www.qq.com',
                pic: '../images/f3.jpg?aa'
            }]
        },
        style: '', //自定义样式
        html: '', //自定义HTML

    };

    //根据类型生成HTML
    function fnPopType(cfg) {
        var html = '',
            strTab = '';
        var content = cfg['content'];
        switch (content['type']) {
            /*case 'focus':
                var list = cfg.focusList;
                html += '<ul>'
                if ($.isArray(list) && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        html += '<li><a href="' + list[i]['link'] + '" target="_blank" title="' + list[i]['title'] + '"><img src="' + list[i]['pic'] + '" /></a></li>';
                    }
                }
                html += '</ul>';
                break;*/
            case 'userDefine':
                html = cfg.html;
            default:
                var list = content['list'];
                var strTab = '';
                html += '<ul class="popup_list">'
                strTab += '<ul class="popup_page">'
                if ($.isArray(list) && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        html += '<li><a href="' + list[i]['link'] + '" target="_blank" title="' + list[i]['title'] + '"><img src="' + list[i]['pic'] + '" /></a></li>';
                        strTab += '<li ' + (i === 0 ? 'class="currentTab" ' : '') + '>' + i + '</li>';
                    }
                }
                html += '</ul>';
                strTab += '</ul>';
                html += strTab;
                break;
        }
        return html;
    }
    //切换
    var crrentFocusIndex = 1;

    function fnPlay(index) {
        crrentFocusIndex = index || crrentFocusIndex;
        (crrentFocusIndex <= 0 || crrentFocusIndex >= cfg.adList.length) && (crrentFocusIndex = 0);
        var $adNode = $('#inviteAdTab li').eq(crrentFocusIndex);
        if (!$adNode.hasClass('currentAd')) {
            $adNode.addClass('currentAd').siblings('li').removeClass();
            $('#inviteAdList').stop().animate({
                left: -crrentFocusIndex * 150
            });
        }
        crrentFocusIndex++;
    }
    //关闭弹窗函数
    function closeBox() {
        var $box = $('#tianjiPopupContainer');
        var $boxShandow = $('#tianjiPopupContainer_shandow');
        //事件销毁
        $box.children().off('click');
        $(document).off('mousemove mouseup');
        $(window).off('keyup');

        //节点销毁
        $box.remove();
        $boxShandow.remove();
    }
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
                if (cfg.showTitle) {
                    html += '<h3 class="tianji_popup_title">' + cfg.title + '</h3>';
                }
                html += '<div class="popup_container">';
                html += fnPopType(cfg);
                html += '</div>';
                html += '</div>';
                //外层结束
                if (cfg.shandowable) {
                    html += '<div id="tianjiPopupContainer_shandow"></div>';
                }
                $('body').append(html);
                //是否可拖拽
                if (cfg.dragable) {
                    $.getScript('../../js/drag.js', function() {
                        var $box = $('#tianjiPopupContainer');
                        fnTianjiDrag($box, $box.find('.tianji_popup_title'));
                    });
                }
                //用户配置样式
                cfg.boxWidth && $('#tianjiPopupContainer').css({
                    width: cfg.boxWidth,
                    marginLeft: -cfg.boxWidth / 2
                });
                cfg.boxHeight && $('#tianjiPopupContainer').css({
                    height: cfg.boxHeight,
                    marginTop: -cfg.boxHeight / 2
                });
                cfg.titleHeight && $('#tianjiPopupContainer .tianji_popup_title').css('height', cfg.titleHeight);
                //自动计算内侧容器高度
                $('#tianjiPopupContainer .popup_container').css('height', $('#tianjiPopupContainer').height() - $('#tianjiPopupContainer .tianji_popup_title').height());
                var $focusListItem = $('#tianjiPopupContainer .popup_container .popup_list li');
                if (cfg.effect === 'h') {
                    $('#tianjiPopupContainer .popup_container .popup_list').css('width', $focusListItem.width() * $focusListItem.length);
                    $focusListItem.css('float', 'left');
                }

                $('#tianjiPopupContainer .popup_container .popup_page').css('marginLeft', -$('#tianjiPopupContainer .popup_container .popup_page').width() / 2);
                cfg.ok && cfg.ok();
                //关闭
                cfg.close = closeBox;
                $('#tianjiPopupCloseBtn').on('click', closeBox);
                $(window).on('keyup', function(e) {
                    e = e || window.event;
                    if (cfg.escClosed && e.keyCode === 27) {
                        closeBox();
                    }
                });
                return false;
            });
        });
    };
})(jQuery);