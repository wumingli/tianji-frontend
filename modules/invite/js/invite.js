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
        boxWidth: 860, //弹窗宽度
        boxHeight: 625, //弹窗高度
        boxID: 'inviteBox', //ID
        cssClassName: 'tianji_invite_box', //class name
        position: 'fixed', //定位方式，默认fixed
        enabled: true, //是否禁用
        multiple: true, //单选、多选
        dragable: true, //是否可拖动
        showCloseBtn: true, //是否可关闭
        shandowable: true, //是否显示遮罩层
        escToClose: true, //ESC键关闭弹出层
        title: '邀请我的好友', //默认标题
        inviteUrl: window.location.href,
        tianjiMax: 0, //天际好友最多选择数量，复选时可用
        weiboMax: 0, //微博好友最多选择数量，复选时可用
        //autoLoadStyle: true,
        leftTabList: ['tianji', 'quick', 'weibo', 'friend'],
        tianjiIDs: [],
        weiboIDs: []
        //leftTabList: ['邀请我的天际好友','快速邀请','邀请我的微博好友','邀请我的站外好友']
    };
    var oTabText = {
        tianji: '邀请我的天际好友',
        quick: '快速邀请',
        weibo: '邀请我的微博好友',
        friend: '邀请我的站外好友'
    };
    //用于缓存数据
    var objTianjiPageData = {};
    var objWeiboPageData = {};
    //存储已选择的好友ID串，包括天际好友、微博好友
    var arrIDs = [];
    /*var arrTianjiUserIDs = [];
    var arrWeiboUserIDs = [];*/
    //获取已选择个数，适用于复选情况
    function getSelectedCount($target) {
        var len = $target.find('#inviteBoxRightInnerCon dl.selectedData').length;
        $target.find('#inviteBoxRightBottomCon p span').text(len);
    }
    //右侧内容
    function rightContent(contentFor, cfg) {
        var strHtml = '';
        var tianjiMax = cfg.tianjiMax;
        var weiboMax = cfg.weiboMax;
        switch (contentFor) {
            case 'tianji':
                //站内好友容器
                strHtml += '<div class="rightConBox" data-for="tianji">';
                strHtml += '<div id="inviteBoxRightTopCon" class="inviteBoxRightTopCon">\
                                <ul id="inviteBoxRightNav">\
                                    <li class="currentTab">全部好友</li>\
                                    <li>朋友</li>\
                                    <li>同学</li>\
                                    <li>同事</li>\
                                    <li>商业合作伙伴</li>\
                                </ul>\
                                <div class="otherGroupCon">\
                                    <span>更多分组</span>\
                                </div>\
                                <ul id="otherGroupList">\
                                    <li><span>猎头</span></li>\
                                    <li><span>天际网</span></li>\
                                </ul>\
                            </div>\
                            <div id="inviteBoxRightInnerCon"></div>';
                //分页
                strHtml += '<div id="inviteBoxPageCon"></div>';
                //分页end
                //确定
                strHtml += '<div id="inviteBoxRightBottomCon">'
                if (cfg.multiple && $.isNumeric(cfg.tianjiMax) && cfg.tianjiMax == 0) {
                    strHtml += '<label><span></span>全选</label><p>已选<span>0</span>个</p>';
                }
                strHtml += '<a href="javascript:void(0);" class="subBtn">确定</a>';
                strHtml += '</div>';
                //确定end
                strHtml += '</div>';
                //站内好友容器end
                break;
            case 'weibo':
                //微博邀请容器
                strHtml += '<div class="rightConBox" data-for="weibo">';
                strHtml += '<p class="loadingFriendList" style="text-align:center;padding-top:50px;color:#666;">加载中，请稍候……</p>';
                strHtml += '<div id="inviteBoxRightInnerCon" style="height:420px;"></div>';
                //分页
                strHtml += '<div id="inviteBoxPageCon"></div>';
                //分页end
                //确定
                strHtml += '<div id="inviteBoxRightBottomCon">'
                if (cfg.multiple && $.isNumeric(cfg.weiboMax) && weiboMax == 0) {
                    strHtml += '<label><span></span>全选</label><p>已选<span>0</span>个</p>';
                }
                strHtml += '<a href="javascript:void(0);" class="subBtn">确定</a>';
                strHtml += '</div>';
                //确定end
                strHtml += '</div>';
                //微博邀请容器end
                break;
            case 'quick':
                //快速邀请容器
                strHtml += '<div class="rightConBox" data-for="quick">\
                                <div class="quickCon">\
                                    <p>快速填写5个好友的邮件地址，完成邀请</p>\
                                    <ul>\
                                        <li><input type="text" name="email1" placeholder="好友的邮件地址1" /></li>\
                                        <li><input type="text" name="email2" placeholder="好友的邮件地址2" /></li>\
                                        <li><input type="text" name="email3" placeholder="好友的邮件地址3" /></li>\
                                        <li><input type="text" name="email4" placeholder="好友的邮件地址4" /></li>\
                                        <li><input type="text" name="email5" placeholder="好友的邮件地址5" /></li>\
                                    </ul>\
                                    <a class="subBtn">填好了，邀请</a>\
                                    <hr />\
                                    <p>复制下面链接，邀请好友为你评测</p>\
                                    <input type="text" name="inviteUrl" value="' + cfg.inviteUrl + '" placeholder="" />\
                                    <a href="javascript:void(0);" class="subBtn" style="margin-top:15px;">复制链接</a>\
                                    <p class="grayText" style="">*将链接通过QQ、MSN、微博、人人网、QQ空间等方式邀请好友</p>\
                                </div>\
                            </div>';
                //快速邀请容器end
                break;
            case 'friend':
                //站外好友容器
                strHtml += '<div class="rightConBox" data-for="friend">\
                                <ul class="mailList">\
                                    <li class="gmail" data-at="@gmail.com">gmail</li>\
                                    <li class="yeah" data-at="@yeah.net">yeah</li>\
                                    <li class="e163" data-at="@163.com">163</li>\
                                    <li class="e126" data-at="@126.com">126</li>\
                                </ul>\
                                <div class="formCon">\
                                    <p class="rightcon_formtitle">你的邮箱地址</p>\
                                    <div class="formcon_mail">\
                                        <input class="inputmail" maxlength="27" type="text" value="" placeholders="请输入邮箱地址前缀">\
                                        <span class="inputmail_at" id="mailInputsSelect">@yeah.net</span>\
                                    </div>\
                                    <p class="rightcon_formtitle">你的邮箱密码</p>\
                                    <input type="password" class="inputmail" value="" placeholders="请输入邮箱密码" autocomplete="off" id="email_pwd2">\
                                    <div class="formcon" id="get_contact">\
                                        <p class="promitInfo">天际网不会记录您的密码，并且未经许可不会随意发送邮件，请放心使用</p>\
                                        <a class="subBtn" id="email_continue" href="javascript:void(0);">继续</a>\
                                    </div>\
                                </div>\
                            </div>';
                //站外好友容器end
                break;
            default:
                strHtml += '';
        }
        return strHtml;
    }
    //插件定义
    $.fn.inviteBox = function(cfg) {
        cfg = $.extend({}, defaultConfig, cfg || {});
        return this.each(function() {
            var $this = $(this);
            $this.on('click', function() {
                if (!cfg.enabled) {
                    return false;
                }
                //var $styleLink = $('<link />');
                var arrTabList = cfg.leftTabList;
                var strRightContentHtml = '';
                //外层开始
                var strHtml = '<div class="' + cfg.cssClassName + '" id="' + cfg.boxID + '">';
                if (cfg.showCloseBtn) {
                    strHtml += '<div id="inviteCloseBtn" title="关闭"></div>';
                };
                strHtml += '<h3>' + cfg.title + '</h3>';
                //左侧列表可配置选项
                strHtml += '<div id="inviteBoxLeftCon"><ul id="inviteTab">';

                if ($.type(arrTabList) === 'array') {
                    for (var i = 0; i < arrTabList.length; i++) {
                        var strDataAttr = '';
                        if (arrTabList[i] === 'tianji') {
                            strDataAttr = ' data-url="../js/data.json"';
                        } else if (arrTabList[i] === 'weibo') {
                            strDataAttr = ' data-url="../js/data1.json"';
                        } else {
                            strDataAttr = '';
                        }
                        strHtml += '<li ' + (i == 0 ? 'class="currentTab"' : '') + ' data-target="' + arrTabList[i] + '" ' + strDataAttr + '><a href="javascript:void(0);">' + oTabText[arrTabList[i]] + '</a></li>';
                        strRightContentHtml += rightContent(arrTabList[i], cfg);
                    }
                } else if ($.type(arrTabList) === 'object') {
                    var tabIndex = 0;
                    $.each(arrTabList, function(i, n) {
                        var strDataAttr = '';
                        if (i === 'tianji') {
                            strDataAttr = ' data-url="../js/data.json"';
                        } else if (i === 'weibo') {
                            strDataAttr = ' data-url="../js/data1.json"';
                        } else {
                            strDataAttr = '';
                        }
                        strHtml += '<li ' + (tabIndex == 0 ? 'class="currentTab"' : '') + ' data-target="' + i + '"' + strDataAttr + '><a href="javascript:void(0);">' + n + '</a></li>';
                        strRightContentHtml += rightContent(i, cfg);
                        tabIndex++;
                    });
                } else {
                    alert('左侧列表可配置选项仅允许数组或对象类型，请参考API！');
                    return false;
                }
                strHtml += '</ul>';
                //广告显示
                var arrAd = [];
                var adLen = 0;
                var adTabHtml = '';
                if (cfg.adList) {
                    arrAd = cfg.adList;
                    adLen = arrAd.length;
                    strHtml += '<div id="inviteAdCon">';
                    strHtml += '<ul id="inviteAdList">';
                    for (var adIndex = 0; adIndex < adLen; adIndex++) {
                        strHtml += '<li><a href="' + arrAd[adIndex]['url'] + '" target="_blank" title="' + (arrAd[adIndex]['title'] ? arrAd[adIndex]['title'] : '') + '"><img src="' + arrAd[adIndex]['img'] + '" width="150" alt=""></a></li>';
                        adTabHtml += '<li ' + (adIndex === 0 ? 'class="currentAd" ' : '') + '>' + adIndex + '</li>';
                    }
                    strHtml += '</ul>';
                    strHtml += '<ul id="inviteAdTab">';
                    strHtml += adTabHtml;
                    strHtml += '</ul>';
                    strHtml += '</div>';
                }
                strHtml += '</div>'; //左侧结束
                //右侧
                strHtml += '<div id="inviteBoxRightCon">';
                strHtml += strRightContentHtml;
                strHtml += '</div>'; //右侧结束
                strHtml += '</div>'; //外层结束
                if (cfg.shandowable) {
                    strHtml += '<div id="' + cfg.boxID + '_shandow"></div>';
                };
                //添加到页面中
                if ($('#' + cfg.boxID).length === 0) {
                    $('body').append(strHtml);
                } else {
                    $('#' + cfg.boxID + ', #' + cfg.boxID + '_shandow').show();
                    alert($('#' + cfg.boxID + '_shandow'))
                    $('#' + cfg.boxID + '_shandow').css('height', $(document).height());
                }
                //可拖拽
                var $box = $('#' + cfg.boxID);
                var $boxHeader = $('#' + cfg.boxID + ' h3');
                if (cfg.dragable) {
                    $.getScript('../../js/drag.js', function() {
                        fnTianjiDrag($box, $boxHeader);
                    });
                }

                //链接，阻止事件冒泡
                $('#inviteBoxRightInnerCon dl a').on('click', function(e) {
                    e = e || window.event;
                    e.cancelBubble = true;
                    e.stopPropagation();
                });
                //动态配置的样式
                $('#' + cfg.boxID).css({
                    width: cfg.boxWidth,
                    height: cfg.boxHeight,
                    position: cfg.position,
                    left: '50%',
                    top: '50%',
                    marginLeft: -cfg.boxWidth / 2,
                    marginTop: -cfg.boxHeight / 2
                });
                //如果有广告，轮播
                var adTimer = null;
                var adCurrentIndex = 1;

                function fnAd(index) {
                    adCurrentIndex = index || adCurrentIndex;
                    (adCurrentIndex <= 0 || adCurrentIndex >= cfg.adList.length) && (adCurrentIndex = 0);
                    var $adNode = $('#inviteAdTab li').eq(adCurrentIndex);
                    if (!$adNode.hasClass('currentAd')) {
                        $adNode.addClass('currentAd').siblings('li').removeClass();
                        $('#inviteAdList').stop().animate({
                            left: -adCurrentIndex * 150
                        });
                    }
                    adCurrentIndex++;
                }
                if (cfg.adList) {
                    $('#inviteAdTab').css('marginLeft', -$('#inviteAdTab').width() / 2);
                    $('#inviteAdList').css('width', cfg.adList.length * 150);
                    adTimer = setInterval(fnAd, 4000);
                    $('#inviteAdList').on('mouseover', function() {
                        clearInterval(adTimer);
                    });
                    $('#inviteAdList').on('mouseout', function() {
                        adTimer = setInterval(fnAd, 4000);
                    });
                    $('#inviteAdTab li').on('mouseover', function() {
                        clearInterval(adTimer);
                        adCurrentIndex = $(this).index();
                        fnAd();
                    });
                }
                //站内好友数据加载
                $('#inviteTab li[data-target="tianji"],#inviteTab li[data-target="weibo"]').on('click', function() {
                    var $this = $(this);
                    if (!$(this).hasClass('dataloaded')) {
                        $.ajax($(this).attr('data-url'), {
                            dataType: 'json',
                            success: function(data) {
                                var strList = '';
                                var oData = data['datas'];
                                var multStr = '';
                                var $target = $('#inviteBoxRightCon .rightConBox[data-for="' + $this.attr('data-target') + '"]');
                                multStr = cfg.multiple ? '' : ' class="single"';
                                strList += '<ul class="letterNav">\
                                                <li class="hasContent currentTab" data-char="all"><span>#</span></li>\
                                                <li data-char="A"><span>A</span></li>\
                                                <li data-char="B"><span>B</span></li>\
                                                <li data-char="C"><span>C</span></li>\
                                                <li data-char="D"><span>D</span></li>\
                                                <li data-char="E"><span>E</span></li>\
                                                <li data-char="F"><span>F</span></li>\
                                                <li data-char="G"><span>G</span></li>\
                                                <li data-char="H"><span>H</span></li>\
                                                <li data-char="I"><span>I</span></li>\
                                                <li data-char="J"><span>J</span></li>\
                                                <li data-char="K"><span>K</span></li>\
                                                <li data-char="L"><span>L</span></li>\
                                                <li data-char="M"><span>M</span></li>\
                                                <li data-char="N"><span>N</span></li>\
                                                <li data-char="O"><span>O</span></li>\
                                                <li data-char="P"><span>P</span></li>\
                                                <li data-char="Q"><span>Q</span></li>\
                                                <li data-char="R"><span>R</span></li>\
                                                <li data-char="S"><span>S</span></li>\
                                                <li data-char="T"><span>T</span></li>\
                                                <li data-char="U"><span>U</span></li>\
                                                <li data-char="V"><span>V</span></li>\
                                                <li data-char="W"><span>W</span></li>\
                                                <li data-char="X"><span>X</span></li>\
                                                <li data-char="Y"><span>Y</span></li>\
                                                <li data-char="Z"><span>Z</span></li>\
                                            </ul>';
                                //好友列表
                                for (var i = 0; i < oData.length; i++) {
                                    strList += '<dl data-user-id="' + parseInt(Math.random() * 100000000) + '"><dt><a href="http://www.tianji.com/p/' + oData[i]['id'] + '" target="_blank"><img src="' + oData[i]['avatar'] + '" width="40" height="40" alt=""></a></dt><dd><h4><a href="http://www.tianji.com/p/' + oData[i]['id'] + '" target="_blank" title="">' + oData[i]['name'] + '</a></h4><p title="' + oData[i]['headline'] + '">' + oData[i]['headline'].substring(0, 7) + '</p><span' + multStr + '></span></dd></dl>';
                                }
                                $('#inviteBoxRightCon .rightConBox[data-for="' + $this.attr('data-target') + '"]').find('.loadingFriendList').hide();
                                $('#inviteBoxRightCon .rightConBox[data-for="' + $this.attr('data-target') + '"]').find('#inviteBoxRightInnerCon').append(strList);
                                //有内容的字母标识可点击
                                for (var c = 0; c < data['letters'].length; c++) {
                                    //console.log()
                                    $target.find('.letterNav li[data-char="' + data['letters'][c] + '"]').addClass('hasContent');
                                }
                                //生成分页
                                var strPage = '';
                                strPage += '<span data-page="1">首页</span>';
                                strPage += '<span data-page="' + (data['currentPage'] - 1) + '">上一页</span>';
                                for (var p = 0; p < data['pageCount']; p++) {
                                    if (p > 4) {
                                        break;
                                    }
                                    strPage += '<span data-page="' + (p + 1) + '">' + (p + 1) + '</span>';
                                }
                                strPage += '<span data-page="' + data['currentPage'] + '">下一页</span>';
                                strPage += '<span data-page="' + (data['pageCount'] - 1) + '">尾页</span>';
                                $target.find('#inviteBoxPageCon').html(strPage);
                                $target.find('#inviteBoxPageCon span[data-page="' + data['currentPage'] + '"]').eq(0).addClass('currentTab');
                                //分页点击
                                //自定义滚动条
                                $target.find('#inviteBoxRightInnerCon').mCustomScrollbar({
                                    theme: "dark",
                                    mouseWheelPixels: 200
                                });
                                //单个好友点击事件
                                $target.find('dl').on('click', function() {
                                    //天际好友or微博好友
                                    var isTianji = $target.is('[data-for="tianji"]');
                                    arrIDs = isTianji ? cfg.tianjiIDs : cfg.weiboIDs;
                                    var max = isTianji ? cfg.tianjiMax : cfg.weiboMax;
                                    if ($(this).find('span').is('.single')) {
                                        $target.find('dl').removeClass('selectedData');
                                        $(this).addClass('selectedData');
                                        return;
                                    }
                                    if (!$(this).is('.selectedData')) {
                                        if ($.isNumeric(max) && max !== 0 && $target.find('dl.selectedData').length === max) {
                                            alert('最多选择' + max + '项！');
                                            //$(this).removeClass('selectedData');
                                            return;
                                        }
                                        $(this).addClass('selectedData');
                                        if ($target.find('dl.selectedData').length === $target.find('dl').length) {
                                            $target.find('#inviteBoxRightBottomCon label span').addClass('currentTab');
                                        }
                                        if ($.inArray($(this).attr('data-user-id'), arrIDs) === -1) {
                                            arrIDs.push($(this).attr('data-user-id'));
                                        }
                                    } else {
                                        arrIDs.splice($.inArray($(this).attr('data-user-id'), arrIDs), 1);
                                        $(this).removeClass('selectedData');
                                        $target.find('#inviteBoxRightBottomCon label span').removeClass('currentTab');
                                    }
                                    getSelectedCount($target);
                                });
                                //全选、取消全选，适用于复选
                                $target.find('#inviteBoxRightBottomCon label').on('click', function() {
                                    //天际好友or微博好友
                                    var isTianji = $target.is('[data-for="tianji"]');
                                    arrIDs = isTianji ? cfg.tianjiIDs : cfg.weiboIDs;
                                    if ($(this).find('.currentTab').length == 0) {
                                        //arrIDs.length = 0;
                                        $(this).find('span').addClass('currentTab');
                                        $target.find('#inviteBoxRightInnerCon dl').each(function() {
                                            $(this).addClass('selectedData');
                                            if ($.inArray($(this).attr('data-user-id'), arrIDs) === -1) {
                                                arrIDs.push($(this).attr('data-user-id'));
                                            }
                                        });
                                    } else {
                                        $(this).find('span').removeClass('currentTab');
                                        $target.find('#inviteBoxRightInnerCon dl').removeClass('selectedData');
                                        arrIDs.length = 0;
                                    }
                                    getSelectedCount($target);
                                });
                                //字母分组
                                $target.find('.letterNav li.hasContent').on('click', function() {
                                    $(this).addClass('currentTab').siblings('li').removeClass('currentTab');
                                    if ($(this).hasClass('dataloaded')) {

                                    } else {
                                        $(this).addClass('dataloaded');
                                    }
                                });
                                //确定回调函数
                                if ($target.is('[data-for="tianji"]')) {
                                    $target.find('#inviteBoxRightBottomCon .subBtn').on('click', function() {
                                        cfg.ok && cfg.ok();
                                    });
                                } else {
                                    $target.find('#inviteBoxRightBottomCon .subBtn').on('click', function() {
                                        cfg.wbOk && cfg.wbOk();
                                    });
                                }
                            },
                            cache: false
                        });
                        $(this).addClass('dataloaded');
                    }
                });
                //容器切换
                $('#inviteTab li').on('click', function() {
                    $(this).addClass('currentTab').siblings('li').removeClass('currentTab');
                    $('.rightConBox[data-for="' + $(this).attr('data-target') + '"]').show().siblings('.rightConBox').hide();
                }).eq(0).trigger('click');
                //快速邀请邮箱切换
                $('#inviteBox .rightConBox ul.mailList li').on('click', function() {
                    var strClassName = $(this).attr('class');
                    if (strClassName.indexOf('_on') === -1) {
                        $(this).attr('class', strClassName + '_on');
                    }
                    $('#mailInputsSelect').show().text($(this).attr('data-at'));
                    $(this).siblings('li').each(function() {
                        var strSubClass = $(this).attr('class');
                        if (strSubClass.indexOf('_on') !== -1) {
                            $(this).attr('class', strSubClass.substring(0, strSubClass.indexOf('_')));
                        }
                    });
                });

                var $boxShandow = $('#' + cfg.boxID + '_shandow');
                //关闭弹窗函数
                function closeBox() {
                    //事件销毁
                    $box.children().off('click');
                    $(document).off('mousemove mouseup');
                    $(window).off('keyup');
                    //属性销毁
                    cfg.weiboIDs.length = 0;
                    cfg.tianjiIDs.length = 0;
                    cfg.objWeiboPageData = {};
                    cfg.objTianjiPageData = {};
                    //节点销毁
                    $box.remove();
                    $boxShandow.remove();
                    clearInterval(adTimer);
                }
                cfg.close = closeBox;
                $('#inviteCloseBtn').on('click', closeBox);
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
            });
        });
    };
})(jQuery);