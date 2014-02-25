$(function() {
    var cardTimer = null,
        cardCache = {};
    //缓存数据
    function cacheCardData(userId) {
        return $.data(cardCache, 'mini_card_' + userId);
    }
    $('body').on('mouseover', '[data-uid]', function() {
        var $newMiniCard = $('#newMiniCard');
        var $this = $(this),
            userId = $(this).attr('data-uid'),
            oPosition = $(this).offset(),
            $thisImg = $this.find('img'),
            cardWidth = $newMiniCard && $newMiniCard.width() || 240,
            cardHeight = $newMiniCard && $newMiniCard.height() || 300,
            cardLeft = 0,
            cardTop = 0,
            nodeWidth = 0,
            nodeHeight = 0,
            boxHtml = '';
        clearTimeout(cardTimer);
        nodeWidth = $this.width();
        nodeHeight = $this.height();
        if ($thisImg.length > 0) {
            nodeWidth = $thisImg.width();
            nodeHeight = $thisImg.height();
            oPosition = $thisImg.offset();
        }
        //判断card位置
        if (($(window).width() - oPosition.left) <= cardWidth) {
            cardLeft = oPosition.left + nodeWidth - cardWidth;
        } else {
            cardLeft = oPosition.left;
        }
        if (($(window).height() + $(window).scrollTop() - oPosition.top) <= cardHeight) {
            cardTop = oPosition.top - cardHeight;
        } else {
            cardTop = oPosition.top + nodeHeight;
        }
        boxHtml = '';
        //是否已缓存
        if ( !! $.data(cardCache, 'mini_card_' + userId)) {
            $('#newMiniCard').html($.data(cardCache, 'mini_card_' + userId)).show();
        } else {
            __$.ajax('http://www.tianji.com/front/mini/profile/' + userId, {
                success: function(data) {
                    var data = data['data'];
                    var isFriend = data['is_friend'],
                        isVerify = data['verified'],
                        levelNum = data['hr_star'] || 0,
                        headline = data['headline'],
                        avatar = data['avatar'],
                        name = data['name'],
                        ce = data['ce'],
                        sentCr = data['sent_cr'],
                        frdStr = '',
                        cardHtml = '',
                        userLink = '',
                        starHtml = '',
                        verifyHtml = '',
                        ceImg = '';
                    //是否是好友
                    if (userId == window.CURRENT_USER_ID) {
                        frdStr = '<li></li>';
                        userLink = 'http://www.tianji.com/p';
                    } else {
                        userLink = 'http://www.tianji.com/p/' + userId;
                        if (isFriend) {
                            frdStr = '<li class="newMiniShow"><a href="javascript:void(0);" id="j_message2_send_button" data="' + userId + '" user_name="' + name + '">发送私信</a></li><li class="newMiniHide"><a href="http://www.tianji.com/p/' + userId + '?pk=1" id="newMiniPkLink" target="_blank">与TA对比</a></li>';
                        } else if (sentCr) {
                            frdStr = '<li><a href="javascript:void(0);">已发送</a></li>';
                        } else {
                            frdStr = '<li><a href="javascript:void(0);" id="newMiniAddFriend" data-friend-id="' + userId + '">加为好友</a></li>';
                        }
                    }
                    //是否是认证用户
                    if (isVerify) {
                        verifyHtml = '<img alt="Verify" src="http://static.tianji.com/images/verify.gif" />'
                    } else {
                        verifyHtml = '';
                    }
                    
                    //headline = data['city'] + '，' + data['industry'];
                    //计算等级
                    if (levelNum === 0) {
                        starHtml += '<li class="png_ie6 grayStar"></li><li class="png_ie6 grayStar"></li><li class="png_ie6 grayStar"></li><li class="png_ie6 grayStar"></li><li class="png_ie6 grayStar"></li>';
                    } else {
                        for (var i = 0; i < levelNum; i++) {
                            starHtml += '<li class="png_ie6"></li>';
                        }
                    }
                    //测评结果
                    if (ce === null) {
                        ceImg = 'http://image.tianji.com/tjs/miniProfile/images/default.png';
                    } else {
                        ceImg = 'http://image.tianji.com/tjs/miniProfile/images/' + data['ce']['type'].toLowerCase() + '.png';
                    }
                    ga_data_area = $this.attr("data-area") || window.CURRENT_LOCATION || 'NewMiniProfile';
                    cardHtml = '<div id="newMiniCard" style="display:block;left:' + cardLeft + 'px;top:' + cardTop + 'px;" data-area="' + ga_data_area + '"><a id="newMiniAvatarLink" href="' + userLink + '" target="_blank" class="gotoProfileLink"> </a><a id="newMiniCeLink" href="' + userLink + '#ce" target="_blank"><img id="newMiniCe" class="png_ie6" src="' + ceImg + '" /></a><img id="newMiniAvatar" src="' + avatar + '" /><ul id="newMiniList"><li><a id="newMiniName" href="' + userLink + '" target="_blank" title="' + name + '" class="gotoProfileLink">' + name.substring(0, 10) + verifyHtml + '</a></li><li><a id="backgroundMsgJob" href="' + userLink + '" target="_blank" title="' + headline + '" class="gotoProfileLink">' + headline.substring(0, 18) + '</a></li><li><ul><a class="gotoProfileLink" href="' + userLink + '" target="_blank">' + starHtml + '</a></ul></li></ul><ul id="newMiniOpt">' + frdStr + '</ul></div>';
                    if ($('#newMiniCard').length !== 0) {
                        $('#newMiniCard').remove();
                    }
                    $('body').append(cardHtml);
                    $('#newMiniCard').show();
                    $.data(cardCache, 'mini_card_' + userId, $('#newMiniCard').html());
                }
            });
        }
        $('#newMiniCard').css({
            left: cardLeft,
            top: cardTop
        });
    });
    $('body').on('mouseout', '[data-uid]', function() {
        var $this = $(this);
        cardTimer = setTimeout(function() {
            $('#newMiniCard').hide();
        }, 500);
    });
    $('body').on('mouseover', '#newMiniCard', function() {
        clearTimeout(cardTimer);
    });
    $('body').on('mouseout', '#newMiniCard', function() {
        cardTimer = setTimeout(function() {
            $('#newMiniCard').hide();
        }, 500);
    });
    $('body').on('mouseover', '#newMiniOpt', function() {
        $('#newMiniOpt li.newMiniShow').stop().animate({
            width: 150
        });
    });
    $('body').on('mouseout', '#newMiniOpt', function() {
        $('#newMiniOpt li.newMiniShow').stop().animate({
            width: 240
        });
    });
    //GA监测
    $('body').on('click', '#newMiniCeLink', function() {
        addGaTrach('MiniProfile', 'GoToCE', $('#newMiniCard').attr('data-area'));
    });
    $('body').on('click', '#newMiniPkLink', function() {
        addGaTrach('MiniProfile', 'GoToPK', $('#newMiniCard').attr('data-area'));
    });
    $('body').on('click', '#newMiniCard .gotoProfileLink', function() {
        addGaTrach('MiniProfile', 'GoToProfile', $('#newMiniCard').attr('data-area'));
    });

    $('body').on('click', '#newMiniAddFriend', function() {
        var $this = $(this),
            userId = $this.attr('data-friend-id');
        if (!$this.hasClass('hasSent')) {
            __$.ajax({
                url: "http://www.tianji.com/ajax/mini_add_friend/" + userId,
                success: function() {
                    $this.text('已发送');
                    $this.addClass('hasSent');
                    $.data(cardCache, 'mini_card_' + userId, $('#newMiniCard').html());
                    addGaTrach('MiniProfile', 'AddToContact', $('#newMiniCard').attr('data-area'));
                    //$('#newMiniAddFriend').off('click');
                }
            });
        }
    });
    $('body').on('click', '#j_message2_send_button', function() {
        $('#newMiniCard').hide();
    });
});