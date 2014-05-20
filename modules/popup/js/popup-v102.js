/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:tianji popup
 * type: Object-Oriented
 * developed at : 2014/4/8
 * Copyright 2014. All rights reserved.
 */
(function() {
    var cfg;
    //默认配置
    var defaultConfig = {
        name: 'tianjiPopupName', //弹窗名称
        title: '弹窗默认标题', //默认标题
        noDataTip: '暂无可用数据', //数据为空时提示文案
        noDataNodeClass: 'no_data_tip_sad', //无数据时HTML节点的css class名称
        boxID: 'tianjiPopupBox', //ID
        position: 'fixed', //定位方式，默认fixed
        pageTabMethod: 'mouseover', //分页切换响应事件
        effect: 'slideLeft', //效果，可选值slideLeft/slideUp/fadein，默认为h(水平滚动)
        titleHeight: 45, //标题栏高度
        boxWidth: 700, //
        boxHeight: 320, //
        autoPlay: true, //是否自动播放
        enabled: true, //是否启用
        dragable: false, //是否可拖动
        showCloseBtn: true, //是否可关闭
        showShadow: true, //是否显示遮罩层
        showTitle: true, //是否显示标题栏，默认显示
        showPage: true, //是否显示分页
        showPreNext: true, //是否显示上一页下一页按钮
        showLoading: true, //显示加载画面
        esc: true, //ESC键关闭弹出层
        cookie: false, //是否记住关闭状态
        closeWhenClickPage: false, //点击页面空白处关闭弹窗
        content: {}
    };
    //基本样式
    var commonStyle = 'body{overflow-x:hidden}#tianjiPopupContainer{background:#fff;font-size:14px;z-index:99999;height:400px;width:750px;position:absolute;left:50%;margin-left:-375px;top:50%;margin-top:-200px}#tianjiPopupContainer h3{font:bold 14px/45px "Microsoft Yahei";height:45px;text-indent:10px;background:#eee;color:#797979;position:relative;z-index:2}#tianjiPopupContainer_shadow{width:100%;background:#000;opacity:0.6;filter:alpha(opacity=50);position:absolute;z-index:99998;left:0;top:0;height:100%}#tianjiPopupCloseBtn{position:absolute;right:-32px;top:0;width:32px;height:32px;background:#000 url(http://image.tianji.com/tjs/popup/images/icons.png);cursor:pointer;z-index:2;}#tianjiPopupContainer .popup_container{overflow:hidden;width:100%;position:relative;height:100%;}#tianjiPopupContainer .popup_container .popup_page{position:absolute;bottom:15px;left:50%;display:none;z-index:2;}#tianjiPopupContainer .popup_container .popup_page_btn{position:absolute;width:19px;height:57px;background:url(http://image.tianji.com/tjs/popup/images/nextAndPreArr.png) no-repeat 0 0;left:20px;top:50%;margin-top:-28px;cursor:pointer;display:none;z-index:2;}#tianjiPopupContainer .popup_container .popup_next_btn{background-position:-19px 0;left:auto;right:20px;display:none}#tianjiPopupContainer .popup_container .popup_loading{background:url(http://image.tianji.com/tjs/popup/images/loading1.gif) center center no-repeat;width:100%;height:100%;position:relative}#tianjiPopupContainer .popup_list{position:relative}#tianjiPopupContainer .popup_container .no_data_tip_sad,#tianjiPopupContainer .popup_container .no_data_tip_happy{color:#888;padding-left:50px;height:40px;line-height:40px;background:url(http://www.tianji.com/images/case1/new_nav/no_contacts.jpg) no-repeat 0 0;position:absolute;left:50%;top:50%;margin-left:-75px;margin-top:-20px;}#tianjiPopupContainer .popup_container .no_data_tip_happy{background-image:url(http://www.tianji.com/images/case1/normandy/joinin_success.jpg);color:green;}';

    //重置阴影高度
    function resizeShadowHeight() {
        var $shadow = $('#tianjiPopupContainer_shadow');
        var $container =
            $shadow.length > 0 && $shadow.height($(document).height());
    }

    //基础类构造函数
    function Popup(config) {
        this.currentIndex = 0;
        this.popupTimer = null;
        this.initialize.apply(this, arguments);
    }
    Popup.prototype = {
        constructor: Popup,
        initialize: function(config) {
            if (typeof jQuery !== 'function') {
                alert('jQuery is not defined,you have to import the jquery file!');
                return;
            }
            this.config = $.extend({}, defaultConfig, config || {});
            cfg = this.config;
            //不弹出的情况
            if (!this.config.enabled || (this.cookie && document.cookie.indexOf(cfg.name + '_remembered=true') != -1)) {
                return;
            }
            cfg.beforeCreate && $.isFunction(cfg.beforeCreate) && cfg.beforeCreate();
            this.createDialog();
        },
        createDialog: function() {
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
            if (cfg.showLoading) {
                html += '<div class="popup_loading"><span class="popup_hourglass"></span></div>';
            }

            html += '</div>';
            html += '</div>';
            //外层结束
            if (cfg.showShadow) {
                html += '<div id="tianjiPopupContainer_shadow"></div>';
            } else {
                $('#tianjiPopupContainer').css('border', '1px solid #ccc');
            }
            if ($('#tianjiPopupContainer').length == 0) {
                cfg.content['style'] = cfg.content['style'] || '';
                $('head').append('<style type="text/css" id="commonStyle">' +
                    commonStyle + cfg.content['style'] +
                    '</style>');
                $('body').append(html);
            }
            //自动计算内侧容器高度
            cfg.showTitle && $('#tianjiPopupContainer .popup_container').css({
                'height': $('#tianjiPopupContainer').height() - cfg.titleHeight
            });
            //事件绑定
            $('#tianjiPopupCloseBtn').on('click', this.destroyDialog);
            if (cfg.esc) {
                $(window).on('keyup.' + cfg.name, function(e) {
                    e = e || window.event;
                    console.log('window.keyup is runing as keyup.' + cfg.name);
                    if (cfg.esc && e.keyCode === 27) {
                        this.destroyDialog();
                    }
                });
            }
        },
        destroyDialog: function() {
            var $box = $('#tianjiPopupContainer');
            var $boxShandow = $('#tianjiPopupContainer_shadow');
            //是否开启Cookie
            if (cfg.cookie) {
                document.cookie = cfg.name + '_remembered=true';
            }
            //重置变量
            this.popupTimer && clearInterval(this.popupTimer);

            //事件销毁
            $box.children().off('click');
            $(document).off('mousemove.' + cfg.name + 'mouseup.' + cfg.name);
            $(window).off('keyup.' + cfg.name);

            //节点销毁
            $box.remove();
            $boxShandow.remove();
            cfg.whenClose && cfg.whenClose();
            $('#commonStyle').remove();
        },
        autoplay: function() {
            alert(this.currentIndex);
        }
    }
    window.TianjiPopup = Popup;
})();