/*
 * author:wanghaiyan,wumingli
 * author email: wanghaiyan@tianji.com;wumingli@tianji.com
 * for:new header of tianji
 * developed at : 2013/7/23 11:29
 * Copyright tianji 2013. All rights reserved.
 */
//GA检测
if (typeof _gaq == 'undefined') {
    _gaq = [];
}
window.addGaTrach = function(ga_category, ga_action, ga_area) {
    _gaq.push(['_trackEvent', ga_category, ga_action, ga_area]);
}
$(function() {
    //计时器
    var info_timer = null;
    //当前链接地址
    var locLink = window.location.href;
    var isIE6 = ($.browser.msie && $.browser.version == 6.0);
    var isEn = ($('#header .header_menu_two ul.left_menu li:eq(0)').find('a').text() == 'Home');
    var isLogin = false;
    //var DD_belatedPNG = DD_belatedPNG || false;
    //页面代码迁移——IE6透明&tipsy
    if (isIE6) {
        DD_belatedPNG.fix('.png_ie6');
    }
    $('.auther_icon').tipsy({
        gravity: 's',
        live: true
    });
    if ($('#header .header_menu .user_info .user_name .zi').width() > 60) {
        $('#header .header_menu .user_info .user_name .zi').width(60);
    }
    //用户名滑过
    $('.user_name').hover(function() {
        $(this).addClass('font_hui user_bg');
        $(this).find('.arrow-ud').addClass('arrow-ud_hover');
        $(this).find('.user_item').css('display', 'block');
    }, function() {
        $(this).removeClass('font_hui user_bg');
        $(this).find('.arrow-ud').removeClass('arrow-ud_hover');
        $(this).find('.user_item').css('display', 'none');
    });
    //标识当前频道
    var urlPath = window.location.pathname;
    var aUrlSplit = urlPath.split('/');
    var sUrlReturn = '';
    var chanel = {
        'home': 0,
        'p': 1,
        'hr': 1,
        'contacts': 2,
        'job': 3,
        'corps': 4,
        'mba': 5,
        'ce': 6,
        'groups': 7,
        'pub': 7,
        'events': 7
    };
    var isRemoveCur = (aUrlSplit[1] == 'p' && aUrlSplit.length > 2) || locLink.indexOf('m.tianji') > 0 ||
        locLink.indexOf('bbs.tianji') > 0 || locLink.indexOf('search.tianji') > 0;
    var urlIndex = locLink.indexOf('job.tianji') > 0 ? 3 : chanel[aUrlSplit[1]];
    //是否标识当前
    if (isRemoveCur) {
        $('.header_menus .left_menu li a').removeClass('current');
    } else {
        $('.header_menus .left_menu li').eq(urlIndex).children('a').addClass('current').end().siblings().children('a').removeClass('current');
    }
    //导航滑过
    $('.left_menu li').hover(function() {
        $(this).children('a').addClass('mover');
        $(this).children('.more_panel').stop().slideDown(100);
    }, function() {
        $(this).children('a').removeClass('mover');
        $(this).children('.more_panel').stop().slideUp(100);
    });
    //注册、登录链接
    $('.user_unlogin_info a').attr('href', locLink);
    //设置Domain
    var hostname = window.location.hostname;
    var config = {
        crossDomainFrameUrl: 'http://www.tianji.com/crossdomain.html',
        crossDomainFrameId: 'crossdomain-iframe'
    };
    if (hostname == 'tianji.com') {
        config.crossDomainFrameUrl = 'http://tianji.com/crossdomain.html'
    }
    var thisDomain = hostname.match(/[a-z]+/);
    thisDomain = thisDomain != null ? thisDomain[0] : '';
    var ridDomain = config.crossDomainFrameUrl.match(/[a-z]+/g);
    ridDomain = ridDomain != null ? ridDomain[1] : '';
    var crossDom;
    if (!/tianji.com/.test(hostname)) {
        $('#header .header_menu_two ul.right_menu').hide();
    }
    //登录状态调用
    if ($('.user_unlogin_info').length == 0) {
        //语言切换
        /*var $lanLink = $('.user_info .user_item li:eq(1)').find('a');
        var lanHref = $lanLink.attr('href');
        $lanLink.attr('href', lanHref.substring(0, lanHref.length - 1) + locLink);*/
        //因跨域页延迟
        setTimeout(function() {
            //封装测试
            function getUserInfo($$) {
                if (/tianji.com/.test(hostname)) {
                    if ( !! $$) {
                        //用户信息
                        $$.get('http://www.tianji.com/front/nav/user?' + Math.random(), function(data) {
                            if (data) {
                                var uData = data['data'],
                                    name = '';
                                if (!uData) {
                                    return false;
                                } else {
                                    name = uData['name'];
                                    //英文，取First Name                                            
                                    if (/[a-z -_\.]+/i.test(name)) {
                                        name = name.split(' ')[0];
                                    } else {
                                        name = name.substring(0, 4);
                                    }
                                    $('.user_info, .right_menu').fadeIn();
                                    $('.user_poster img').attr('src', uData['avatar']);
                                    $('.user_name .zi').text(name);
                                    $('.user_poster img,.user_name .zi').attr('title', uData['name'] + ', ' + uData['headline']);
                                    isLogin = true;
                                }
                            }
                        });
                        //初始化数字
                        $$.get('http://www.tianji.com/front/nav/counts?' + Math.random(), function(data) {
                            if (data && data['notices']) {
                                var notice_msg = data['notices'];
                                //好友请求
                                if (notice_msg['unread_friend_requests_count'] == 0) {
                                    $('#contacts_one .span_promit').hide();
                                } else {
                                    $('#contacts_one .span_promit').attr('data-num', notice_msg['unread_friend_requests_count']);
                                    $('#contacts_one .span_promit').show().text(notice_msg['unread_friend_requests_count'] > 99 ? '99+' : notice_msg['unread_friend_requests_count']);
                                    $('#contacts_one .promit_no').hide();
                                }
                                //通知
                                if (notice_msg['unread_notices_count'] == 0) {
                                    $('#look_see2 .span_promit').hide();
                                } else {
                                    $('#look_see2 .span_promit').attr('data-num', notice_msg['unread_notices_count']);
                                    $('#look_see2 .span_promit').show().text(notice_msg['unread_notices_count'] > 99 ? '99+' : notice_msg['unread_notices_count']);
                                }
                                //私信
                                if (notice_msg['unread_message_topics_count'] == 0) {
                                    $('#look_see1 .span_promit').hide();
                                } else {
                                    $('#look_see1 .span_promit').show().text(notice_msg['unread_message_topics_count'] > 99 ? '99+' : notice_msg['unread_message_topics_count']);
                                }
                            } else {
                                return false;
                            }
                        });
                    }
                }
            }
            if (thisDomain != ridDomain && /tianji.com/.test(hostname)) {
                if (hostname != 'www.tianji.com' && hostname != 'tianji.com') {
                    document.domain = 'tianji.com';
                }
                var frame = document.createElement('iframe'),
                    frameQuery;
                if (document.getElementById(config.crossDomainFrameId) == null) {
                    frame.src = config.crossDomainFrameUrl;
                    frame.id = config.crossDomainFrameId;
                    frame.style.display = 'none';
                    document.body.appendChild(frame);
                }

                if (isIE6 || frame.attachEvent) {
                    frame.attachEvent('onload', function() {
                        window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$;
                        getUserInfo(window.__$);
                    });
                } else {
                    frame.onload = function() {
                        window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$;
                        getUserInfo(window.__$);
                    }
                }
                //加载用于登录的iframe
                var infoIframe = document.createElement('iframe');
                infoIframe.src = 'http://www.tianji.com/front/nav/login';
                infoIframe.style.display = 'none';
                document.body.appendChild(infoIframe);
                if (isIE6 && infoIframe.attachEvent) {
                    infoIframe.attachEvent('onload', function() {
                        getUserInfo(window.__$);
                    });
                } else {
                    infoIframe.onload = function() {
                        getUserInfo(window.__$);
                    }
                }
            } else {
                window.__$ = $;
                getUserInfo(window.__$);
            }
            var lenMayKnow = 0;
            //可能认识的人，封装
            function personMayKnow(url, type, needData, htmlMethod, callback) {
                htmlMethod = htmlMethod || 'html';
                __$.ajax(url, {
                    'type': type,
                    'data': needData,
                    'success': function(data) {
                        var pHtml = '',
                            pDatas = data['data'],
                            pLen = pDatas.length,
                            starHtml = '';
                        $('#contacts_one .emails_panel').hide();
                        if (pDatas.length > 0) {
                            for (var i = 0; i < pLen; i++) {
                                var addTxt = isEn ? 'Add' : '加为好友';
                                var sendTxt = isEn ? 'Sent' : '已发送';
                                var headlineTxt = pDatas[i]['headline'] == null ? '' : pDatas[i]['headline'].substring(0, 17);
                                if (pDatas[i]['hr_stars'] != 0) {
                                    starHtml = '<ul class="star_list">';
                                    for (var st = 0; st < pDatas[i]['hr_stars']; st++) {
                                        starHtml += '<li class="png_ie6"></li>';
                                    }
                                    starHtml += '</ul>';
                                }
                                pHtml += '<li data-id="' + pDatas[i]['id'] + '"> <span class="logo1"><a href="http://www.tianji.com/p/' + pDatas[i]['id'] + '?origin=navigation_bar_pymk" target="_blank" class="goToProfile"><img src="' + pDatas[i]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/' + pDatas[i]['id'] + '?origin=navigation_bar_pymk" target="_blank" class="goToProfile">' + pDatas[i]['name'] + '</a> </span> ' + starHtml + ' <span class="name1_companies">' + headlineTxt + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="adds_btn">' + addTxt + '</a> <a href="javascript:void(0);" class="adds_btn_yi">' + sendTxt + '</a> </li>';
                            }
                        } else {
                            $('#contacts_one_list .emails_panel').show();
                        }
                        if (htmlMethod == 'html') {
                            $('#people_kone').html(pHtml);
                        } else {
                            $('#people_kone').append(pHtml);
                        }
                        $('#people_kone li:last').css('border-bottom', 'none').siblings().removeAttr('style');
                        !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('update');
                        //$('#people_kone li:last').css('border-bottom','none');
                    }
                });
            }
            //人脉邀请同意、删除函数封装
            function concat($obj, url, type, action) {
                __$.ajax({
                    'url': url,
                    'data': {
                        'id': $obj.attr('data-id'),
                        'lastId': $('#new_header>li:last').attr('data-id')
                    },
                    'type': type,
                    success: function(data) {
                        var returnHtml = '',
                            retData = [],
                            starHtml = '';
                        //删除记录
                        function removeObj(html) {
                            $obj.slideUp(function() {
                                $(this).remove();
                                if (data['data'].length == 0 && $('#new_header li').length == 0) {
                                    $('#contacts_one .promit_no').show();
                                } else {
                                    $('#new_header').append(html);
                                }
                            });
                        }
                        if (data && data['data'].length > 0) {
                            retData = data['data'];
                            for (var i = 0; i < retData.length; i++) {
                                var acpTxt = isEn ? 'Accept' : '同意';
                                if (retData[i]['hr_stars'] != 0) {
                                    starHtml = '<ul class="star_list">';
                                    for (var st = 0; st < retData[i]['hr_stars']; st++) {
                                        starHtml += '<li class="png_ie6"></li>';
                                    }
                                    starHtml += '</ul>';
                                }
                                var headlineTxt = retData[i]['headline'] == null ? '' : retData[i]['headline'].substring(0, 17);
                                returnHtml += '<li data-id="' + retData[i]['id'] + '" data-userID="' + retData[i]['userId'] + '"> <span class="logo1"><a href="http://www.tianji.com/p/' + retData[i]['userId'] + '?origin=navigation_bar_invitation" target="_blank" class="goToProfile"><img src="' + retData[i]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/' + retData[i]['userId'] + '?origin=navigation_bar_invitation" target="_blank" class="goToProfile">' + retData[i]['name'] + '</a> </span>' + starHtml + ' <span class="name1_companies">' + headlineTxt + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="agree_btn">' + acpTxt + '</a> </li>\n';
                            }
                        }
                        //同意需要延时删除，不同意直接删除
                        if (action === 'agree') {
                            setTimeout(function() {
                                removeObj(returnHtml);
                                $('#new_header,#people_kone').on('mouseover', 'li', function() {
                                    $(this).addClass('current');
                                });
                            }, 2000);
                        } else if (action === 'delete') {
                            removeObj(returnHtml);
                        } else if (action === 'init') {
                            $('#contacts_one_list .loding_notice').fadeOut(function() {
                                $('#new_header').html(returnHtml);
                                if ($('#new_header').find('li').length == 0) {
                                    $('#contacts_one_list .promit_no').show();
                                }
                            });
                        }
                    }
                });
            }
            //更新可能认识的人容器高度
            function updatePersonListHeight($obj) {
                $obj.slideUp(function() {
                    $obj.remove();
                    var listLen = $('#people_kone li').length;
                    if (listLen === 0) {
                        $('#contacts_one_list .hd_scroll_box').animate({
                            height: 145
                        });
                    } else if (listLen === 1) {
                        $('#contacts_one_list .hd_scroll_box').animate({
                            height: 73
                        });
                        !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('destroy');
                    } else {
                        !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('update');
                    }
                    $('#people_kone li:last').css('border-bottom', 'none');
                });
            }
            //获取新的人脉邀请、可能认识的人
            $('#contacts_one').hover(function() {
                clearTimeout(info_timer);
                $(this).siblings('li').find('.messages_list').hide();
                $('#look_list2').hide();
                $('#contacts_one').addClass('contacts_hover');
                $('#contacts_one_list,#contacts_one_list .hd_scroll_box').show();
                if (!$('#contacts_one').hasClass('contacts_loaded')) {
                    //人脉邀请
                    concat($('#people_kone li'), 'http://www.tianji.com/front/nav/contact_requests', 'get', 'init');
                    //可能认识的人
                    personMayKnow('http://www.tianji.com/front/nav/pymk?' + Math.random(), 'get', {
                        count: 0,
                        next: 4
                    }, 'html');
                    if ($('#people_kone li').length >= 3) {
                        setTimeout(function() {
                            //可能认识的人滚动加载更多
                            !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar({
                                autoHideScrollbar: true,
                                theme: "dark",
                                callbacks: {
                                    onTotalScroll: function() {
                                        personMayKnow('http://www.tianji.com/front/nav/pymk', 'get', {
                                            count: $('#people_kone li').length,
                                            next: 4
                                        }, 'append');
                                    }
                                }
                            });
                        }, 500);
                    }
                };
                !isIE6 && $('#contacts_one_list .hd_scroll_box').mCustomScrollbar('update');
                setTimeout(function() {
                    $('#contacts_one_list .loding_notice').hide();
                }, 1000);
                $('#contacts_one').addClass('contacts_loaded');
            }, function() {
                $('#contacts_one').removeClass('contacts_hover');
                info_timer = setTimeout(function() {
                    $('#contacts_one_list').hide();
                }, 500);
            });
            //人脉邀请、可能认识的人【列表】滑过
            $('#new_header,#people_kone').on('mouseover', 'li', function() {
                $(this).addClass('current');
            });
            $('#new_header,#people_kone').on('mouseout', 'li', function() {
                $(this).removeClass('current');
            });
            //人脉邀请同意、删除
            $('#new_header').on('click', 'span.bi_x1, a.agree_btn', function(event) {
                var $this = $(this),
                    $thisList = $(this).parent('li');
                var $concatNum = $('#contacts_one .span_promit'),
                    $concatNumOut = $concatNum.attr('data-num');
                event = event || window.event;
                //同意
                if ((event.srcElement || event.target).className == 'agree_btn') {
                    $this.siblings('ul.star_list').remove();
                    addGaTrach('notification_bar', 'AcceptContactrequest', 'CR');
                    $('#new_header,#people_kone').off('mouseover', 'li');
                    var nameTitleHtml = $thisList.find('.name1_title').html();
                    var dataID = $thisList.attr('data-userID');
                    $thisList.find('.name1_title, .bi_x1, .agree_btn').hide();
                    $thisList.find('.name1_companies').html('<a href="http://www.tianji.com/p/contacts/' + dataID + '" class="goToProfile" target="_blank">查看TA的联系人</a> | <a href="http://www.tianji.com/p/' + dataID + '?origin=navigation_bar_invitation" class="sendMessage" target="_blank">给TA写信</a>');
                    $thisList.find('.name1_companies').before('<span class="name2_title">' + nameTitleHtml + '</span><span class="name2_companies">已成为你的人脉</span>');
                    concat($thisList, 'http://www.tianji.com/front/nav/accept_cr', 'put', 'agree');
                }
                //删除
                else if ((event.srcElement || event.target).className == 'bi_x1') {
                    addGaTrach('notification_bar', 'DeleteContactRequest', 'CR');
                    concat($thisList, 'http://www.tianji.com/front/nav/ignore_cr', 'put', 'delete');
                }
                //数字变化
                if ($concatNum.text() == 1) {
                    $concatNum.text('0');
                    $concatNum.fadeOut(2000);
                } else {
                    $concatNum.attr('data-num', $concatNum.attr('data-num') - 1);
                    $concatNumOut = $concatNum.attr('data-num') > 99 ? '99+' : $concatNum.attr('data-num');
                    $concatNum.text($concatNumOut);
                }
            });
            //可能认识的人加为好友、删除
            $('#people_kone').on('click', 'li .adds_btn,li .bi_x1', function(event) {
                var $this = $(this);
                event = event || window.event;
                //发送
                if ((event.srcElement || event.target).className == 'adds_btn') {
                    addGaTrach('notification_bar', 'SendContactRequest', 'CR');
                    $this.parent('li').find('.bi_x1,.adds_btn').hide()
                        .end().find('.adds_btn_yi').fadeIn(1000);
                    personMayKnow('http://www.tianji.com/front/nav/apply_pymk', 'post', {
                        id: $(this).parent('li').attr('data-id'),
                        count: $('#people_kone').find('li').length
                    }, 'append');
                    setTimeout(function() {
                        updatePersonListHeight($this.parent('li'));
                    }, 1000);
                }
                //删除
                else if ((event.srcElement || event.target).className == 'bi_x1') {
                    addGaTrach('notification_bar', 'HiddePYMK', 'CR');
                    personMayKnow('http://www.tianji.com/front/nav/ignore_pymk', 'delete', {
                        id: $(this).parent('li').attr('data-id'),
                        count: $('#people_kone').find('li').length
                    }, 'append');
                    updatePersonListHeight($this.parent('li'));
                }
            });
            //查看私信
            $('#look_see1').hover(function() {
                clearTimeout(info_timer);
                $(this).siblings('li').find('.messages_list').hide();
                $(this).addClass('message_hover');
                $('#look_list1').show();
                if (!$('#look_see1').hasClass('look_see1_loaded')) {
                    __$.get('http://www.tianji.com/front/nav/messages?' + Math.random(), function(data) {
                        if (data && data['data'].length > 0) {
                            var msgData = data['data'],
                                msgHtml = '',
                                msgLen = msgData.length >= 6 ? 6 : msgData.length,
                                i = 0,
                                hasRe = '',
                                starHtml = '';
                            $('#look_list1 .no_notice').hide();
                            while (i < msgLen) {
                                var name = msgData[i]['name'];
                                //英文，取First Name                                            
                                if (/[a-z -_\.]+/i.test(name)) {
                                    name = name.split(' ')[0].substring(0, 8);
                                } else {
                                    name = name.substring(0, 4);
                                }
                                if (msgData[i]['hr_stars'] != 0) {
                                    starHtml = '<ul class="star_list">';
                                    for (var st = 0; st < msgData[i]['hr_stars']; st++) {
                                        starHtml += '<li class="png_ie6"></li>';
                                    }
                                    starHtml += '</ul>';
                                }
                                hasRe = msgData[i]['status'] == 2 ? '<b class="yi_icon"></b>' : '';
                                msgHtml += '<li data-status="' + msgData[i]['status'] + '"> <a href="http://www.tianji.com/messages/' + msgData[i]['topicId'] + '" target="_blank"> <span class="logo1"><img src="' + msgData[i]['avatar'] + '" /></span> <span class="name1_title">' + name + '</span>' + starHtml + ' <span class="times">' + msgData[i]['time'] + '</span> <span class="name1_companies">' + hasRe + msgData[i]['content'].replace(/\[[a-z0-9]+\]/gi, '') + '</span> <span class="bi_x" style="display: none"></span> </a> </li>';
                                i++;
                            }
                            $('#look_list1 .loding_notice').fadeOut(function() {
                                $('#look_list1 .hd_scroll_box').show();
                                $('#new_header_message').html(msgHtml);
                                $('#new_header_message li').filter('[data-status=0]').find('span.name1_companies,span.name1_title').addClass('new_msg');
                                $('#new_header_message li:last').css('border-bottom', 'none');
                            });
                        } else if (data['data'].length == 0) {
                            $('#look_list1 .loding_notice').fadeOut(function() {
                                $('#look_list1 .no_notice').show();
                            });
                        }
                    });
                }
                $('#look_see1').addClass('look_see1_loaded');
                setTimeout(function() {
                    $('#look_list1 .loding_notice').hide();
                }, 1000);
            }, function() {
                $('#look_see1').removeClass('message_hover');
                clearTimeout(info_timer);
                info_timer = setTimeout(function() {
                    $('#look_list1').hide();
                }, 500);
            });
            //通知GA映射
            var noticeMap = {
                visitor: ['notification_bar', 'GoToRecentVisit', 'Recentvisit'],
                visitors: ['notification_bar', 'GoToGroup3', 'Groups'],
                notice_0: ['notification_bar', 'GoToProfile', 'Notice'],
                notice_1: ['notification_bar', 'GoToGroup1', 'Groups'],
                notice_2: ['notification_bar', 'GoToGroup2', 'Groups'],
                notice_3: ['notification_bar', 'GoToEvent', 'Event'],
                notice_4: ['notification_bar', 'GoToGroup3', 'Groups'],
                notice_5: ['notification_bar', 'GoToStatus', 'Status'],
                notice_6: ['notification_bar', 'GoToMyProfile1', 'Verification'],
                notice_7: ['notification_bar', 'Share', 'Verification'],
                notice_8: ['notification_bar', 'GoToVerificationConditions1', 'Verification'],
                notice_9: ['notification_bar', 'GoToProfile', 'Verification'],
                notice_10: ['notification_bar', 'GoToMyProfile1', 'Skills'],
                notice_11: ['notification_bar', 'GoToProfile', 'Skills'],
                notice_12: ['notification_bar', 'GoToMyProfile2', 'Skills'],
                notice_13: ['notification_bar', 'GoToVerificationConditions2', 'Verification'],
                notice_14: ['notification_bar', 'GoToVerificationConditions3', 'Verification'],
                notice_15: ['notification_bar', 'GoToMyProfile2', 'Verification'],
                notice_16: ['notification_bar', 'GoToVerificationConditions4', 'Verification'],
                notice_17: ['notification_bar', 'GoToMyProfile', 'InvitePeople'],
                notice_18: ['notification_bar', 'GoToMyProfile', 'Profile'],
                notice_19: ['notification_bar', 'GoToVerificationConditions', 'InvitePeople'],
                notice_21: ['notification_bar', 'GoToProfile', 'RecentVisit'],
                notice_22: ['notification_bar', 'GoToProfile', 'Verification'],
                notice_23: ['notification_bar', 'GoToProfile', 'InvitePeople']
            };
            $('#look_see2 .contacts2_main').on('click', 'li a', function() {
                var notice_type = noticeMap[$(this).attr('data-ga')];
                addGaTrach(notice_type[0], notice_type[1], notice_type[2]);
            });
            //查看通知
            var countNotice = 0;
            $('#look_see2').hover(function() {
                clearTimeout(info_timer);
                var $this = $(this);
                $(this).siblings('li').find('.messages_list').hide();
                $(this).addClass('tool_hover');
                $('#look_list2').show();
                if (!$(this).hasClass('notices_loaded')) {
                    __$.ajax('http://www.tianji.com/front/nav/notices?' + Math.random(), {
                        type: 'get',
                        success: function(data) {
                            $this.find('.loding_notice').fadeOut(function() {
                                var nDatas = data['data'],
                                    retHtml = '',
                                    nameStr = '',
                                    classStr = '';
                                for (var i = 0; i < nDatas.length; i++) {
                                    if (nDatas[i]['names']) {
                                        var aNames = nDatas[i]['names'];
                                        var aTempNames = [];
                                        for (var j = 0; j < aNames.length; j++) {
                                            //英文，取First Name
                                            if (j >= 3) {
                                                break;
                                            }
                                            if (/[a-z -_\.]+/i.test(aNames[j])) {
                                                aTempNames.push(aNames[j].split(' ')[0]);
                                            } else {
                                                aTempNames.push(aNames[j].substring(0, 4));
                                            }
                                        }
                                        nameStr = aTempNames.join('，') + '等' + aNames.length + '人';
                                    } else {
                                        nameStr = nDatas[i]['name'];
                                    }
                                    var url = nDatas[i]['url'];
                                    url = url.indexOf('/p/') === -1 ? url : url + '?origin=navigation_bar_notification';
                                    nameStr += nDatas[i]['content'] ? ' ' + nDatas[i]['content'] : ' 最近访问了你的档案';
                                    classStr = nDatas[i]['status'] == 0 ? ' class="bg_new"' : '';
                                    retHtml += '<li> <a href="' + url + '" ' + classStr + ' data-ga="' + nDatas[i]['type'] + '" data-notice-id="' + nDatas[i]['id'] + '" target="_blank"> <span class="logo1"><img src="' + nDatas[i]['avatar'] + '" /></span> <span class="name1_title">' + nameStr + '</span> <span class="times">' + nDatas[i]['time'] + '</span> </a> </li>';
                                }
                                $('#look_see2 .loding_notice').hide();
                                $('#look_list2 .hd_scroll_box').show();
                                $('#look_list2 .contacts2_main').html(retHtml);
                                //滚动条
                                if ($('#look_list2 .contacts2_main li').length < 6) {
                                    $('#look_list2 .hd_scroll_box').height($('#look_list2 .contacts2_main li').length * 73);
                                } else {
                                    $('#look_list2 .hd_scroll_box').height(437);
                                }
                                $('#look_list2 .contacts2_main li:last').css('border-bottom', 'none');
                                !isIE6 && $('#look_list2 .hd_scroll_box').mCustomScrollbar({
                                    autoHideScrollbar: true,
                                    theme: "dark",
                                    callbacks: {
                                        onTotalScroll: function() {
                                            if ($('#look_list2 .hd_scroll_box').find('.load_more_notice').length == 0) {
                                                $('#look_list2 .contacts2_main li:last').removeAttr('style');
                                                $('#look_list2 .contacts2_main').append('<li class="load_more_notice" style="height:20px;padding:10px 0;text-align:center;border-bottom:none;"><a href="http://www.tianji.com/notices" style="padding:0">查看更多通知 &gt;&gt;</a></li>');
                                                $('#look_list2 .hd_scroll_box').mCustomScrollbar('update');
                                            }
                                        }
                                    }
                                });
                                //$(this).hide();
                            });
                        }
                    });
                } else {
                    //$this.find('.span_promit').hide();
                    $('#look_see2 .loding_notice').hide();
                    !isIE6 && $('#look_list2 .hd_scroll_box').mCustomScrollbar('update');
                }
                /*setTimeout(function() {
                    $('#look_see2 .loding_notice').hide();
                    $this.find('.span_promit').fadeOut(1000,function (){
                        $('#look_list2 .contacts2_main li a').removeClass('bg_new');
                    });
                }, 1000);*/
                $(this).addClass('notices_loaded');
            }, function() {
                $(this).removeClass('tool_hover');
                clearTimeout(info_timer);
                info_timer = setTimeout(function() {
                    $('#look_list2').hide();
                }, 500);
            });
            //鼠标滑过标记通知已读
            $('#look_see2').on('mouseenter', '.contacts2_main li a', function() {
                var $promit = $('#look_see2 .span_promit');
                var promitNum = $promit.attr('data-num');
                if ($(this).attr('data-notice-id') && $(this).hasClass('bg_new')) {
                    $(this).removeClass('bg_new');
                    if ($promit.is(':visible')) {
                        //数字变化
                        if ($promit.text() == 1) {
                            $promit.text('0');
                            $promit.fadeOut(2000);
                        } else {
                            $promit.attr('data-num', $promit.attr('data-num') - 1);
                            promitNum = $promit.attr('data-num') > 99 ? '99+' : $promit.attr('data-num');
                            $promit.text(promitNum);
                        }
                    }
                    __$.ajax('http://www.tianji.com/front/notices/' + $(this).attr('data-notice-id') + '/read', {
                        type: 'put',
                        success: function(data) {

                        }
                    });
                }
            });
            //添加GA
            $('#new_header, #people_kone').on('click', 'li a.goToProfile', function() {
                addGaTrach('notification_bar', 'GoToProfile', 'CR');
            });
            $('#new_header_message').on('click', 'li a', function() {
                addGaTrach('notification_bar', 'ReplyMessage', 'Message');
            });
            $('#header .header_menu_two ul.right_menu li .wirte_info').on('click', function() {
                addGaTrach('notification_bar', 'WriteMessage', 'Message');
            });
            $('#contacts_one_list .title_renmai:eq(0) a,#contacts_one a:eq(0)').click(function() {
                addGaTrach('notification_bar', 'GoToInvite', 'CR');
            });
            $('#contacts_one .emails_panel a').click(function() {
                addGaTrach('notification_bar', 'Import', 'CR');
            });
            $('#contacts_one_list .border_t a.all_kone').click(function() {
                addGaTrach('notification_bar', 'GoToPYMK', 'CR');
            });
            $('#look_see1 a:eq(0)').on('click', function() {
                addGaTrach('notification_bar', 'GoToMessage', 'Message');
            });
            $('#look_see2 a:eq(0)').on('click', function() {
                addGaTrach('notification_bar', 'GoToNotice', 'Notice');
            });

            //人脉邀请链接： addGaTrach('notification_bar','GoToInvite','CR');

            //添加窗口获得焦点事件，监测用户是否已退出登录
            var focusTimer = null;
            $(window).focus(function() {
                clearTimeout(focusTimer);
                focusTimer = setTimeout(function() {
                    __$.get('http://www.tianji.com/front/nav/user?' + Math.random(), function(data) {
                        if (data['error']) {
                            window.location.href = 'http://www.tianji.com/index?ifr=o';
                        }
                    });
                }, 300);
            });
        }, 800);
    }
    //新搜索
    var $searchInput = $('#new_search_input');
    var $searchLoading = $('.loading_search_result');
    var searchTimer = null;
    var arrFnKeyCode = [9, 18, 19, 20, 27, 35, 36, 37, 38, 39, 40, 42, 43, 45, 46, 47];
    var searchSelectedIndex = -1;
    var timerSearchList = null;
    var timerGetDropbox = null;
    var inputChanged = false;
    //粘贴事件
    $.fn.pasteEvents = function(delay) {
        if (delay == undefined) delay = 20;
        return $(this).each(function() {
            var $el = $(this);
            $el.on("paste", function() {
                $el.trigger("prepaste");
                setTimeout(function() {
                    $el.trigger("postpaste");
                }, delay);
            });
        });
    };
    //跳到搜索
    function gotoSearch() {
        if (inputChanged) {
            if (isLogin) {
                window.location.href = 'http://search.tianji.com/psearch?name=' + $.trim($searchInput.val()) + '&requestFrom=headerSearch';
            } else {
                window.location.href = 'http://search.tianji.com/search/n/' + $.trim($searchInput.val());
            }
        } else {
            $searchInput.focus();
        }
    }
    //清除计时器
    function clearTimers() {
        searchTimer && clearTimeout(searchTimer);
        timerSearchList && clearTimeout(timerSearchList);
    }
    $('.find_people_button').on('click', function() {
        gotoSearch();
    });
    $searchInput.on({
        focus: function() {
            clearTimers();
            timerGetDropbox && clearTimeout(timerGetDropbox);
            $(this).addClass('find_bg');
            $(this).siblings('.find_people_button').addClass('find_btn_bg');

            if ($(this)[0].defaultValue == $(this).val()) {
                $(this).val('');
            }
            if ($.trim($(this).val()) === '') {
                $('.search_list').hide();
            } else if ($('.search_list').find('.search_result_item').length > 1) {
                $('.search_list').slideDown();
            }
            timerGetDropbox = setTimeout(function() {
                if (!window.findDropBoxDataName) {
                    $.getScript('http://image.tianji.com/tjs/dropBox/js/tjDropBox.min.js');
                }
            }, 100);
        },
        blur: function() {
            clearTimers();
            $searchLoading.hide();
            $(this).removeClass('find_bg');
            $(this).parents('.top_search').find('.find_people_button').removeClass('find_btn_bg');
            if ($.trim($(this).val()) == '') {
                if (isEn) {
                    $(this).val('Search');
                } else {
                    $(this).val('搜索');
                }
            }
            timerSearchList = setTimeout(function() {
                $('.search_list').slideUp();
            }, 500);
        },
        keydown: function(e) {
            clearTimers();
            e = e || window.event;
            var code = e.keyCode;
            inputChanged = true;


            if ($.inArray(code, arrFnKeyCode) === -1 && e.keyCode != 17 && e.keyCode != 16) {
                $('.loading_search_result').show();
                $('.search_list').hide();
            }
        },
        keyup: function(e) {
            //如果为空，直接返回

            if ($.trim($searchInput.val()) === '') {
                $('.search_list,.loading_search_result').hide();
                $('.search_list').hide().find('.search_main li').remove();
                inputChanged = false;
                return false;
            }
            clearTimers();
            e = e || window.event;
            var code = e.keyCode;
            var $searchResultItem = $('.search_main').find('.search_result_item');
            //ESC TAB键关闭联想
            if (code === 27 || code == 9) {
                if ($('.search_list').is(':visible')) {
                    $('.search_list').hide();
                    searchSelectedIndex = -1;
                    $searchResultItem.removeClass('current');
                }
            }
            //上下键选择
            if ($('.search_list').is(':visible')) {
                if (code === 38 || code === 40) {
                    code === 38 ? (searchSelectedIndex--) : (searchSelectedIndex++);
                    if (searchSelectedIndex < 0) {
                        searchSelectedIndex = $searchResultItem.length - 1;
                    } else if (searchSelectedIndex === $searchResultItem.length) {
                        searchSelectedIndex = 0;
                    }
                    var $currentSearchTab = $searchResultItem.eq(searchSelectedIndex);
                    $currentSearchTab.addClass('current').siblings('.search_result_item').removeClass('current');
                }
            }
            if (code === 13) {
                $('.search_list,.loding_search_result').hide();
                if (searchSelectedIndex !== -1) {
                    window.location.href = $('.search_main').find('.search_result_item').eq(searchSelectedIndex).find('a').eq(0).attr('href');
                } else {
                    gotoSearch();
                }
                return false;
            }
            if (!e.shiftKey && $.inArray(code, arrFnKeyCode) !== -1) {
                return;
            }
            if (e.keycode == 17) {
                return;
            }
            $('.loading_search_result').show();
            searchTimer = setTimeout(function() {
                var searchVal = $.trim($searchInput.val());
                $.ajax('http://search.tianji.com/search360', {
                    //$.ajax('../js/data.json', {
                    dataType: 'jsonp',
                    //jsonpCallback: '_getResult',
                    /**/
                    //dataType: 'json',
                    type: 'get',
                    data: {
                        keyword: searchVal //encodeURIComponent()
                    },
                    success: function(data) {
                        if (data === null) {
                            $('.search_main li').remove();
                            $('.search_list,.loading_search_result').hide();
                            return;
                        }
                        if ($.trim($searchInput.val()) === '') {
                            $('.search_list').hide().find('.search_main li').remove();
                            inputChanged = false;
                            return;
                        }
                        var html = '';
                        var strNameMore = '',
                            strCompanyMore = 'http://www.tianji.com/corps/search_corp?q=' + searchVal + '&utf8=✓',
                            strJobMore = 'http://job.tianji.com/career/search/K/' + searchVal + '?cur=1';
                        var strNameLink = '';
                        if (isLogin) {
                            strNameMore = 'http://search.tianji.com/psearch?name=' + searchVal + '&requestFrom=headerSearch';
                            /*strCompanyMore = 'http://search.tianji.com/psearch?company=' + searchVal + '&requestFrom=headerSearch';
                            strJobMore = 'http://search.tianji.com/psearch?title=' + searchVal + '&requestFrom=headerSearch';*/
                        } else {
                            strNameMore = 'http://search.tianji.com/search/n/' + searchVal;
                            /*strCompanyMore = 'http://search.tianji.com/search/c/' + searchVal;
                            strJobMore = 'http://search.tianji.com/search/t/' + searchVal;*/
                        }
                        //重新请求数据后，searchSelectedIndex重置
                        searchSelectedIndex = -1;
                        if (data['userList']) {
                            html += '<li class="search_list_title">按姓名搜索<a class="search_more_link" href="' + strNameMore + '">更多&gt;&gt;</a></li>';
                            for (var u = 0; u < data['userList'].length; u++) {
                                var uData = data['userList'][u];
                                var headLine = uData['headline'];
                                var userLink = '';
                                if (isLogin) {
                                    userLink = 'http://www.tianji.com/p/' + uData['userId'];
                                } else {
                                    userLink = 'http://www.tianji.com/profile/' + (uData['nickName'] || uData['userName']);
                                }
                                html += '<li class="search_result_item"><a href="' + userLink + '" title="' + uData['userName'] + ',' + headLine + '"><dl><dt><img src="' + uData['imageUrl'] + '" /></dt><dd><h4>' + uData['userName'] + '</h4><p>' + headLine.substring(0, 18) + '</p></dd></dl></a></li>';
                            }
                        }
                        if (data['corpList']) {
                            html += '<li class="search_list_title">按公司搜索<a class="search_more_link" href="' + strCompanyMore + '">更多&gt;&gt;</a></li>';
                            for (var c = 0; c < data['corpList'].length; c++) {
                                var cData = data['corpList'][c];
                                var logo = cData['square_logo_url']['feed'];
                                var cSize = '';
                                var region = cData['corp_region'] === '' ? '未知' : cData['corp_region'];
                                cSize = findDropBoxDataName(cData['size'], 'companyLevel');
                                html += '<li class="search_result_item"><a href="http://www.tianji.com/corps/' + cData['name'] + '" title="' + cData['name'] + '"><dl><dt><img src="' + logo + '" /></dt><dd><h4>' + cData['name'].substring(0, 18) + '</h4><p>地区：' + region + ' &nbsp;&nbsp;规模：' + cSize + '</p></dd></dl></a></li>';
                            }
                        }
                        if (data['jobList']) {
                            html += '<li class="search_list_title">按职位搜索<a class="search_more_link" href="' + strJobMore + '">更多&gt;&gt;</a></li>';
                            for (var j = 0; j < data['jobList'].length; j++) {
                                var jData = data['jobList'][j];
                                var img = jData['imageUrl'] ? jData['imageUrl'] : 'http://static.tianji.com/images/new_companies/image/photo_2.jpg';
                                html += '<li class="search_result_item"><a href="http://job.tianji.com/career/position/' + jData['jobId'] + '" title="' + jData['companyName'] + ', ' + jData['title'] + '"><dl><dt><img src="' + img + '" /></dt><dd><h4>' + jData['title'] + '</h4><p>公司名称：' + jData['companyName'].substring(0, 15) + '</p></dd></dl></a></li>';
                            }
                        }
                        //html += '<li class="search_result_item search_all_keywords"><a href="http://search.tianji.com/psearch?header_keyword=' + $searchInput.val() + '" title="查看全部 ' + $searchInput.val() + ' 的搜索结果"><span>∨</span> 查看全部搜索结果 <span>∨</span></a></li>';
                        $('.search_main').html(html);
                        $('.loading_search_result').hide();
                        $('.search_list').slideDown();
                    },
                    cache: false
                });
            }, 500);
        }
    });
    $searchInput.on("postpaste", function() {
        $(this).trigger('keyup');
    }).pasteEvents();
    //新搜索end

    var timerShowSearch = null,
        timerHideSearch = null;
    var $headerMenuBg = $('#header .header_menu_bg');
    //显示搜索栏
    function showSearch() {
        clearTimeout(timerShowSearch);
        clearTimeout(timerHideSearch);
        timerShowSearch = setTimeout(function() {
            $('#header .header_menu').show();
            $headerMenuBg.height(100);
        }, 500);
    }
    //隐藏搜索栏
    function hideSearch() {
        clearTimeout(timerShowSearch);
        clearTimeout(timerHideSearch);
        timerHideSearch = setTimeout(function() {
            if ((document.body.scrollTop || document.documentElement.scrollTop) >= 60) {
                $('#header .header_menu,.search_list').hide();
                $headerMenuBg.height(40);
            }
        }, 500);
    }
    //页面滚动
    $(document).scroll(function() {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop >= 60) {
            $('#header').css({
                position: 'fixed',
                top: 0
            });
            if ($('.pos100').length == 0) {
                $('#header').after('<div class="pos100" style="height:100px;"></div>');
            } else {
                $('.pos100').show();
            }
            $headerMenuBg.height(40);
            $('#header .header_menu').hide();
            $headerMenuBg.on('mouseover', showSearch);
            $headerMenuBg.on('mouseout', hideSearch);
        } else {
            $('#header .header_menu').show();
            $('#header').css({
                position: 'relative'
            });
            $('.pos100').hide();
            $headerMenuBg.height(100);
            $headerMenuBg.off('mouseover', showSearch);
            $headerMenuBg.off('mouseout', hideSearch);
        }
    });
    //阻止默认事件
    $('#header .header_menu_two ul.left_menu li,#header .header_menu_two ul.right_menu').mouseover(function(e) {
        e = e || window.event;
        e.stopPropagation();
    });
});