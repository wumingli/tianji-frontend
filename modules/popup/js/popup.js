/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:test
 * developed at : 2014/1/15
 * Copyright 2014. All rights reserved.
 */
(function($) {
    var isIE6 = ($.browser.msie && $.browser.version == 6.0);
    var __$ = window.__$ || $;
    //默认配置
    var defaultConfig = {
        /*boxWidth: 860, //弹窗宽度
            boxHeight: 625, //弹窗高度
            ======已将默认宽、高，但可以通过boxWidth/boxHeight设置弹窗宽/高
            */
        title: '弹窗默认标题', //默认标题
        noDataTip: '暂无可用数据', //数据为空时提示文案
        noDataNodeClass: 'no_data_tip_sad', //无数据时HTML节点的css class名称
        boxID: 'tianjiPopupBox', //ID
        position: 'fixed', //定位方式，默认fixed
        pageTabMethod: 'mouseover', //分页切换响应事件
        effect: 'slideLeft', //效果，可选值slideLeft/slideUp/fadein，默认为h(水平滚动)
        titleHeight: 45, //标题栏高度
        autoPlay: true, //是否自动播放
        enabled: true, //是否启用
        dragable: false, //是否可拖动
        showCloseBtn: true, //是否可关闭
        shandowable: true, //是否显示遮罩层
        showTitle: true, //是否显示标题栏，默认显示
        showPage: true, //是否显示分页
        showLoading: true, //显示加载画面
        esc: true, //ESC键关闭弹出层
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
            }, {
                title: '焦点图标题4',
                link: 'http://www.google.com',
                pic: '../images/f2.jpg?aa'
            }]
        }
    };
    //自动更改标题
    function autoChangeTitle(cfg) {
        var $title = $('#tianjiPopupContainer h3');
        var index = $('#tianjiPopupContainer .popup_container .popup_page li.currentTab').index();
        index = (index === -1) ? 0 : index;
        var strFromData = $('#tianjiPopupContainer .popup_list li').eq(index).attr('data-name');
        if (strFromData === undefined) {
            return;
        }
        $title.html('<i class="popup_title_name">' + strFromData + '</i>' + cfg.title);
    }
    //图片预加载
    (function() {
        var arrLoadPic = ['http://image.tianji.com/tjs/popup/images/icons.png', 'http://image.tianji.com/tjs/popup/images/nextAndPreArr.png', 'http://image.tianji.com/tjs/popup/images/loading1.gif', 'http://image.tianji.com/tjs/popup/images/loading2.jpg'];
        for (var i = 0; i < arrLoadPic.length; i++) {
            (function(i) {
                var oImg = new Image();
                oImg.onload = function() {
                    oImg.onload = null;
                    var $img = $('<img />');
                    $img.attr('src', this.src);
                    $img.css('display', 'none');
                    $img.addClass('preLoadImg');
                    $('body').append($img);
                }
                oImg.src = arrLoadPic[i];
            })(i);
        }
    })();
    var isDragJsLoaded = false;
    var commonStyle = '<style type="text/css" id="commonStyle">body{overflow-x:hidden}#tianjiPopupContainer{background:#fff;font-size:14px;z-index:99999;height:400px;width:750px;position:absolute;left:50%;margin-left:-375px;top:50%;margin-top:-200px}#tianjiPopupContainer h3{font:bold 14px/45px "Microsoft Yahei";height:45px;text-indent:10px;background:#eee;color:#797979;position:relative;z-index:2}#tianjiPopupContainer_shandow{width:100%;background:#000;opacity:0.6;filter:alpha(opacity=50);position:absolute;z-index:99998;left:0;top:0;height:100%}#tianjiPopupCloseBtn{position:absolute;right:-32px;top:0;width:32px;height:32px;background:#000 url(http://image.tianji.com/tjs/popup/images/icons.png);cursor:pointer}#tianjiPopupContainer .popup_container{overflow:hidden;width:100%;position:relative;height:100%;}#tianjiPopupContainer .popup_container .popup_page{position:absolute;bottom:15px;left:50%;display:none}#tianjiPopupContainer .popup_container .popup_page li{float:left;width:10px;height:10px;border-radius:10px;background-color:#ccc;margin-left:5px;text-indent:-100px;overflow:hidden;cursor:pointer}#tianjiPopupContainer .popup_container .popup_page li.currentTab{background-color:#069}#tianjiPopupContainer .popup_container .popup_page_btn{position:absolute;width:19px;height:57px;background:url(http://image.tianji.com/tjs/popup/images/nextAndPreArr.png) no-repeat 0 0;left:20px;top:50%;margin-top:-28px;cursor:pointer;display:none}#tianjiPopupContainer .popup_container .popup_next_btn{background-position:-19px 0;left:auto;right:20px;display:none}#tianjiPopupContainer .popup_container .popup_loading{background:url(http://image.tianji.com/tjs/popup/images/loading1.gif) center 80% no-repeat;width:100%;height:100%;position:relative}#tianjiPopupContainer .popup_container .popup_loading .popup_hourglass{display:block;width:55px;height:91px;background:url(http://image.tianji.com/tjs/popup/images/loading2.jpg) center center no-repeat;position:absolute;left:50%;top:50%;margin-left:-27px;margin-top:-45px}#tianjiPopupContainer .popup_list{position:relative}#tianjiPopupContainer .popup_list li{float:left}#tianjiPopupContainer .popup_container .no_data_tip_sad,#tianjiPopupContainer .popup_container .no_data_tip_happy{color:#888;padding-left:50px;height:40px;line-height:40px;background:url(http://www.tianji.com/images/case1/new_nav/no_contacts.jpg) no-repeat 0 0;position:absolute;left:50%;top:50%;margin-left:-75px;margin-top:-20px;}#tianjiPopupContainer .popup_container .no_data_tip_happy{background-image:url(http://www.tianji.com/images/case1/normandy/joinin_success.jpg);color:green;}';
    //根据类型生成HTML
    function fnPopType(cfg, callback) {
        var html = '',
            strPage = '';
        var content = cfg['content'];
        var $container = $('#tianjiPopupContainer .popup_container');
        var strPreNext = '<div class="popup_page_btn popup_pre_btn" id="popup_pre_btn"></div><div class="popup_page_btn popup_next_btn" id="popup_next_btn"></div>';
        var strPage = '<ul class="popup_page"></ul>';
        switch (content['type']) {
            case 'ajaxData':
                if (content['dataUrl']) {
                    $.ajax(content['dataUrl'], {
                        dataType: 'html',
                        success: function(data) {
                            if ($.trim(data) == '') {
                                html = '<p class="' + cfg.noDataNodeClass + '">' + cfg.noDataTip + '</p>';
                            } else {
                                html += '<ul class="popup_list">'
                                html += data;
                                html += '</ul>';
                                html += strPage + strPreNext;
                            }
                            $container.append(html);
                            callback && callback();
                            autoChangeTitle(cfg);
                        },
                        cache: false
                    });
                }
                break; /**/
            case 'userDefined':
                if ($.trim(content['html']) == '') {
                    html = '<p class="' + cfg.noDataNodeClass + '">' + cfg.noDataTip + '</p>';
                } else {
                    html += '<ul class="popup_list">'
                    html += content['html'];
                    html += '</ul>';
                    html += strPage + strPreNext;
                }
                $container.append(html);
                callback && callback();
                autoChangeTitle(cfg);
                break;
            case 'focus':
                var list = content['list'];
                html += '<ul class="popup_list">';
                for (var i = 0; i < list.length; i++) {
                    html += '<li><a href="' + list[i]['link'] + '" target="_blank" title="' + list[i]['title'] + '"><img src="' + list[i]['pic'] + '" /></a></li>';
                }
                html += '</ul>';
                html += strPage + strPreNext;
                $container.append(html)
                callback && callback();
                break;
            default:
                break;
        }
        //return html;
    }
    //切换
    var currentFocusIndex = 1;
    var popupTimer = null;

    function fnPlay(index, cfg, dir) {
        var nodeLen = $('.popup_page li').length;
        currentFocusIndex = index || currentFocusIndex;
        if (currentFocusIndex >= nodeLen) {
            currentFocusIndex = 0
        } else if (currentFocusIndex < 0) {
            currentFocusIndex = nodeLen - 1
        }
        var $focusNode = $('.popup_page li').eq(currentFocusIndex);
        if (!$focusNode.hasClass('currentTab')) {
            $focusNode.addClass('currentTab').siblings('li').removeClass();
            $('.popup_list').stop().animate({
                left: -currentFocusIndex * cfg.boxWidth
            });
        }
        //方向
        if (dir && dir === 'left') {
            currentFocusIndex--;
        } else {
            currentFocusIndex++;
        }
    }
    //插件定义
    $.fn.tianjiPopup = function(cfg) {
        cfg = $.extend({}, defaultConfig, cfg || {});
        return this.each(function() {
            var $this = $(this);
            if (!cfg.enabled) {
                $this.css('color', '#ccc');
                return;
            }
            $this.on('click', function() {
                if (!cfg.enabled) {
                    return;
                }
                cfg.whenClick && $.isFunction(cfg.whenClick) && cfg.whenClick();
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
                if (cfg.shandowable) {
                    html += '<div id="tianjiPopupContainer_shandow"></div>';
                }
                if ($('#tianjiPopupContainer').length == 0) {
                    cfg.content['style'] = cfg.content['style'] || '';
                    $('head').append(commonStyle + cfg.content['style'] + '</style>');
                    $('body').append(html);
                }
                /* else {
                    $('#tianjiPopupContainer,#tianjiPopupContainer_shandow').show();
                    return;
                }*/
                fnPopType(cfg, function() {
                    //setTimeout(function() {
                    $('.popup_loading').remove();
                    $('.popup_page_btn,.popup_next_btn').show();
                    cfg.showPage && $('.popup_page').show();
                    //}, 500);
                    //if (cfg.content && (cfg.content.type === 'focus' || cfg.content.type === 'ajaxData')) {
                    //动态计算页数
                    var strPage = '';
                    for (var i = 0; i < $('#tianjiPopupContainer .popup_list li').length; i++) {
                        strPage += '<li ' + (i === 0 ? 'class="currentTab" ' : '') + '>' + i + '</li>';
                    }
                    $('#tianjiPopupContainer .popup_container .popup_page').html(strPage);
                    //绑定播放事件
                    cfg.autoPlay && (popupTimer = setInterval(function() {
                        fnPlay(currentFocusIndex, cfg);
                        autoChangeTitle(cfg);
                    }, 4000));
                    $('.popup_container').on('mouseover', function() {
                        clearInterval(popupTimer);
                    });
                    $('.popup_container').on('mouseout', function() {
                        currentFocusIndex = $('.popup_page li.currentTab').index() + 1;
                        cfg.autoPlay && (popupTimer = setInterval(function() {
                            fnPlay(currentFocusIndex, cfg);
                            autoChangeTitle(cfg);
                        }, 4000));
                    });
                    $('.popup_page li').on(cfg.pageTabMethod, function() {
                        clearInterval(popupTimer);
                        currentFocusIndex = $(this).index();
                        if (!$(this).hasClass('currentTab')) {
                            fnPlay(currentFocusIndex, cfg);
                            autoChangeTitle(cfg);
                        }
                    });
                    $('#popup_pre_btn').on('click', function() {
                        var index = $('.popup_page li.currentTab').index() - 1;
                        (cfg.autoPlay && popupTimer != null) && clearInterval(popupTimer);
                        fnPlay(index, cfg, 'left');
                        autoChangeTitle(cfg);
                    });
                    $('#popup_next_btn').on('click', function() {
                        var index = $('.popup_page li.currentTab').index() + 1;
                        (cfg.autoPlay && popupTimer != null) && clearInterval(popupTimer);
                        fnPlay(index, cfg);
                        autoChangeTitle(cfg);
                    });
                    //}
                    cfg.boxWidth && $('#tianjiPopupContainer .popup_list li').width(cfg.boxWidth);
                    var $focusListItem = $('#tianjiPopupContainer .popup_container .popup_list li');
                    if (cfg.effect === 'slideLeft') {
                        $('#tianjiPopupContainer .popup_container .popup_list').css('width', $focusListItem.width() * $focusListItem.length);
                        $focusListItem.css('float', 'left');
                    }
                    $('#tianjiPopupContainer .popup_container .popup_page').css('marginLeft', -$('#tianjiPopupContainer .popup_container .popup_page').width() / 2);
                });
                //是否可拖拽
                if (cfg.showTitle && cfg.dragable) {
                    var $box = $('#tianjiPopupContainer');
                    if (!isDragJsLoaded) {
                        $.getScript('http://image.tianji.com/tjs/js/drag.min.js', function() {
                            fnTianjiDrag($box, $box.find('.tianji_popup_title'));
                            isDragJsLoaded = true;
                        });
                    } else {
                        fnTianjiDrag($box, $box.find('.tianji_popup_title'));
                    }
                }
                //用户配置样式
                if (isIE6) {
                    cfg.position = 'absolute';
                }
                cfg.boxWidth && $('#tianjiPopupContainer').css({
                    width: cfg.boxWidth,
                    marginLeft: -cfg.boxWidth / 2,
                    position: cfg.position
                })
                cfg.boxHeight && $('#tianjiPopupContainer').css({
                    height: cfg.boxHeight,
                    marginTop: -cfg.boxHeight / 2
                });
                cfg.titleHeight && $('#tianjiPopupContainer .tianji_popup_title').css('height', cfg.titleHeight);
                //自动计算内侧容器高度
                cfg.showTitle && $('#tianjiPopupContainer .popup_container').css('height', cfg.boxHeight - cfg.titleHeight);
                $('#tianjiPopupContainer_shandow').height($(document).height());
                cfg.ok && cfg.ok();
                //关闭弹窗函数
                function closeBox() {
                    var $box = $('#tianjiPopupContainer');
                    var $boxShandow = $('#tianjiPopupContainer_shandow');
                    //重置变量
                    currentFocusIndex = 0;
                    clearInterval(popupTimer);

                    //事件销毁
                    $box.children().off('click');
                    $(document).off('mousemove mouseup');
                    $(window).off('keyup');

                    //节点销毁
                    $box.remove();
                    $boxShandow.remove();
                    cfg.whenClose && cfg.whenClose();
                    $('#commonStyle').remove();
                    
                    if (!cfg.enabled) {
                        $this.css('color', '#ccc');
                    }

                    //$('#tianjiPopupContainer,#tianjiPopupContainer_shandow').hide();
                }
                //关闭
                cfg.close = closeBox;
                $('#tianjiPopupCloseBtn').on('click', closeBox);
                $(window).on('keyup', function(e) {
                    e = e || window.event;
                    if (cfg.esc && e.keyCode === 27) {
                        closeBox();
                    }
                });
                cfg.boxLoad && $.isFunction(cfg.boxLoad) && cfg.boxLoad();
                return false;
            });
        });
    };
})(jQuery);
window.onload = function() {
    $('.preLoadImg').remove();
};