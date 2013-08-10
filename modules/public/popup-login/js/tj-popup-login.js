/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:popup login of tianji.com
 * developed at : 2013/7/31 10:00
 * base on jquery-1.7.2
 * Copyright 2013. All rights reserved.
 */
$(function (){
    //样式表
    //注册、登录移动
    function frameMove(target){
        $('#tianji-popup-login .pop-left-con').animate({left: target}, 300);
        return false;
    }
    //创建登录框
    function frameCreate(){
        var frameHtml = '';
        var styleCode = '<style type="text/css">#tianji-popup-login,#tianji-popup-login-outer-shade {width:640px;height:336px;position:fixed;background:#fff;left:50%;top:50%;margin-left:-320px;margin-top:-168px;z-index:9999;_position:absolute;}#tianji-popup-login-outer-shade {width:650px;height:346px;border-radius:5px;background:#000;opacity:0.3;filter:alpha(opacity=30);margin-top:-173px;margin-left:-325px;z-index:9998;}#tianji-popup-login-shade {width:100%;height:100%;position:fixed;background:#000;z-index:9998; opacity:0.45; filter:alpha(opacity=45); _position:absolute;top:0;}#tianji-popup-login .pop-left,#tianji-popup-login .pop-right {width:425px;height:335px;overflow:hidden;float:left;position:relative;}#tianji-popup-login .pop-left .pop-left-con {width:850px;position:absolute;left:0;top:0;}#tianji-popup-login .pop-reg,#tianji-popup-login .pop-login {width:385px;float:left;height:315px;padding-left:35px;}#tianji-popup-login .pop-left-con ul li label,#tianji-popup-login b.close,#tianji-popup-login-btn,#tianji-popup-reg-btn {background:url(http://image.tianji.com/tjs/popup-login/images/pop-up-btns.png) no-repeat;}#tianji-popup-login .pop-left-con{padding:20px 0 0 20px;width:255px;height:315px;}#tianji-popup-login .pop-left-con h3 {font:normal 20px/50px "Microsoft Yahei","SimHei";color:#555;}#tianji-popup-login .pop-left-con ul li {height:62px; font-size:12px;color:#d20000;position:relative;}#tianji-popup-login .pop-left-con ul li input.txt {height:35px;line-height:35px;border:1px solid #ddd;text-indent:8px;width:280px;outline:none;border-radius:3px;color:#999;}#tianji-popup-login .pop-left-con ul li input.focus {border-color:#e55942;box-shadow:0 0 3px #ccc;}#tianji-popup-login .pop-left-con ul li span.inputTip {position:absolute;top:12px;left:10px;color:#999;z-index:0;}#tianji-popup-login .pop-left-con ul li label {margin:0 135px 0 5px;color:#333;padding-left:20px;background-position:0 -28px;display:inline-block; height:20px;line-height:20px;_background-position:0 -30px;}#tianji-popup-login .pop-left-con ul li label.checked {background-position:0 -66px;}#tianji-popup-login .pop-left-con ul li a {color:#999;text-decoration:none;}#tianji-popup-login .pop-left-con ul li a.fblue {color:#152f9f;}#tianji-popup-login .pop-left-con .error { padding:5px 0 0 15px;background:url(http://www.tianji.com/images/case1/login/false.jpg) left 6px no-repeat;*margin-left:10px;}#tianji-popup-login-btn,#tianji-popup-reg-btn {width:126px;height:36px;cursor:pointer;background-position:0 -108px;border:none;vertical-align:middle;}#tianji-popup-reg-btn {background-position:0 -164px;}#tianji-popup-login .pop-right {background:#f8f8f8;width:215px}#tianji-popup-login .pop-right .pop-right-con {font-size:12px; color:#999;text-align:center;padding-top:70px;}#tianji-popup-login .pop-right a.weiboLogin{display:block; margin:15px auto 0; background:url(http://www.tianji.com/images/case1/login/xinlang.jpg) no-repeat; width:125px; height:26px;text-indent:-300px;overflow:hidden;}#tianji-popup-login b.close {position:absolute;right:-15px;top:-15px;background-position:8px 8px;background-color:#5f5f5f;border-radius:13px;width:26px;height:26px;text-align:center;cursor:pointer;z-index:9999;display:block;}</style>';
        $('head').append(styleCode);
        //已经存在
        if ($('#tianji-popup-login').length != 0){
            frameShow();
        }
        //不存在，创建
        else {
            frameHtml += '<div id="tianji-popup-login"><div class="pop-left"><div class="pop-left-con"><div class="pop-reg"><h3>立即登录</h3><form method="post" action="http://www.tianji.com/index/login" id="tianji-pop-login-form"><ul><li><span class="inputTip">请输入邮箱或手机号</span><input type="text" place-holder="正确邮箱或者手机号" name="account[email_or_mobile]" class="txt" regtype="email_mobile,notnull" /></li><li><span class="inputTip">请输入密码</span><input type="password" place-holder="密码" name="account[password]" class="txt" regtype="notnull" /></li><li><input type="hidden" name="remember" /><input type="hidden" name="return_to" value="" /><label class="checked">保持登录状态</label> <a href="http://www.tianji.com/account/account_password_backs/new" class="get-back-password" target="_blank" title="找回密码">找回密码</a></li><li><input type="button" id="tianji-popup-login-btn" class="tianji-submit-btn" value="" />　　　　<a href="http://www.tianji.com/join" class="fblue reg-now" target="_blank">没有帐号，立即注册</a></li></ul></form></div><div class="pop-login"><h3>快速注册天际网</h3><form method="post" action="http://www.tianji.com/account/accounts" id="tianji-pop-reg-form"><ul><li><span class="inputTip">请输入真实姓名</span><input type="text" place-holder="真实姓名" name="account[name_native_display]" class="txt" regType="chinese,notnull" /></li><li><span class="inputTip">请输入邮箱或手机号</span><input type="text" place-holder="正确邮箱或者手机号" name="account[email_or_mobile]" class="txt" regtype="email_mobile,notnull" /></li><li><span class="inputTip">请输入密码</span><input type="password" place-holder="密码" name="account[password]" class="txt" regtype="notnull" /></li><li><input type="button" id="tianji-popup-reg-btn" class="tianji-submit-btn" value="" />　　　　<a href="http://www.tianji.com/join" class="fblue login-now" target="_blank">已有帐号，直接登录</a></li></ul></form></div></div></div><div class="pop-right"><div class="pop-right-con"><p>用你的社交帐号登录</p><a href="http://www.tianji.com/auth/weibo" class="weiboLogin" title="用新浪微博登录">用新浪微博登录</a></div></div><div style="clear:both;"></div><b class="close" title="关闭"></b></div><div id="tianji-popup-login-outer-shade"></div><div id="tianji-popup-login-shade"><iframe src="about:blank" border="0" frameborder="0" scrolling="no" style="width:100%;height:'+$(document).height()+'px;background:transparent;"></iframe></div>';
            $('body').append(frameHtml);
        }
    }
    //隐藏登录框
    function frameHide(){
        $('#tianji-popup-login,#tianji-popup-login-shade,#tianji-popup-login-outer-shade').remove();
    }
    //显示登录框
    function frameShow(){
        $('#tianji-popup-login,#tianji-popup-login-shade,#tianji-popup-login-outer-shade').show();
    }
    //前端校验
    function regInput(obj, value, msg, type){
        var sRuleMsg = '';
        var bFail = false;
        var oResult = [];
        switch (type){
            case 'notnull':
                if(value !== ''){
                    bFail = true;
                }
                break;
            case 'email_mobile':
                var emailReg = /^\s*[a-zA-Z0-9]+([\._\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/;
                var phoneReg = /(^((\+86)|(86))?-?([12]\d|(0\d{2,3}))-?(\d{7}|\d{8})-?\d{1,4}$)|(^([^0]\d{6,7})$)/;
                bFail = ((/[a-z]/g.test(value) && emailReg.test(value)) || phoneReg.test(value));
                break;
            case 'chinese':
                var chineseReg = /^\s*([\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*|[a-zA-Z]{2,20}(\s+[a-zA-Z]{2,20})+)\s*$/;
                bFail = chineseReg.test(value);
        }
        obj.next('div.error').remove();
        if (!bFail){
            if (obj.val() === ''){
                obj.prev('span.inputTip').show();
            }
            if (obj.attr('type') === 'password'){
                if(obj.parents('form').attr('id') === 'tianji-pop-login-form'){
                    obj.after('<div class="error">输入登录密码</div>');
                } else {
                    obj.after('<div class="error">请设置6-16位英文字母，数字，符号密码</div>');
                }
                
            } else {
                obj.after('<div class="error">请输入' + msg + '</div>');
            }
        }
    }
    //手机、邮箱
    $('#tianji-popup-login input:text,#tianji-popup-login input:password').live('blur', function (){
        var val = $.trim($(this).val());
        var aReg = $(this).attr('regtype').split(',');
        $(this).next('div.error').remove();
        for (var i=0; i<aReg.length; i++){
            if (aReg[i] === 'notnull' && val !== '') {
                ($(this).attr('type') === 'password' && val.length > 0 && (val.length < 6 || val.length > 16)) && $(this).after('<div class="error">密码长度应该在6-16位之间，且为英文、数字或符号</div>');
                break;
            }
            regInput($(this), val, $(this).attr('place-holder'), aReg[i]);
        }
    });
    //Checkbox
    $('#tianji-popup-login .pop-left-con label').live('click', function (){
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')){
            $(this).prev('input').val('on');
        } else {
            $(this).prev('input').val('');
        }
    });
    //password input box keyup event
    $('#tianji-popup-login input:password').live('keyup', function (e){
        e = e || window.event;
        $(this).val($(this).val().replace(/\s+/g, ''));
    });
    //submit button click
    $('#tianji-popup-login .tianji-submit-btn').live('click', function (){
        var $thisForm = $(this).parents('form');
        $thisForm.find('input[name="return_to"]').val(window.location);
        $thisForm.find('input.txt').trigger('blur');
        if ($thisForm.find('div.error').length != 0) {
            return false;
        } else {

            $thisForm.submit();
        }
    });
    //input box focus
    $('#tianji-popup-login .pop-left-con ul li input.txt').live('focus', function (){
        $(this).addClass('focus');
        $(this).prev('span.inputTip').hide();
    });
    $('#tianji-popup-login .pop-left-con ul li input.txt').live('blur', function (){
        $(this).removeClass('focus');
    });
    $('#tianji-popup-login span.inputTip').live('click',function (){
        $(this).hide().next('input').focus();
    });
    $('#tianji-popup-login .reg-now').live('click', function (){
        return frameMove(-425);
    });
    $('#tianji-popup-login .login-now').live('click', function (){
        return frameMove(0);
    });
    $('#tianji-popup-login b.close').live('click', function (){
        frameHide();
    });
    $('.popup-login').live('click', function (){
        frameCreate();
        if ($(this).attr('data-init') && $(this).attr('data-init') === 'register'){
            $('#tianji-popup-login .pop-left-con').css('left', -425);
        }
        if ($(this).attr('data-checked') && $(this).attr('data-checked') === 'false'){
            $('#tianji-popup-login .pop-left-con label').removeClass('checked');
        }
        return false;
    });
    if($('.popup-login').attr('data-auto-popup') === 'true'){
        $(this).trigger('click');
    }
    $('.popup-login').each(function (){
        if ($(this).attr('data-auto-popup') === 'true'){
            $(this).trigger('click');
            return false;
        }
    });
    //esc hide the box
    $(document).keydown(function (e){
        e = e || window.event;
        if (e.keyCode === 27){
            frameHide();
        }
    });
    //cross domain
    if ($('#crossdomain-iframe').length === 0){
        var hostname = window.location.hostname;
        var config = {
            domain: hostname.substring(hostname.indexOf('.') + 1),
            crossDomainFrameUrl: 'http://www.tianji.com/crossdomain.html',
            crossDomainFrameId: 'crossdomain-iframe'
        };
        var thisDomain = hostname.match(/[a-z]+/)[0];
        var ridDomain = config.crossDomainFrameUrl.match(/[a-z]+/g)[1];
        var crossDom;
        //set domain
        document.domain = config.domain;
        if (thisDomain != ridDomain){
            var frame = document.createElement('iframe'),
                frameQuery;
            frame.src = config.crossDomainFrameUrl;
            frame.id = config.crossDomainFrameId;
            frame.style.display = 'none';
            document.body.appendChild(frame);
            frame.onload = function (){
                window.__$ = document.getElementById(config.crossDomainFrameId).contentWindow.$;
            }
        }
    }
    if (!window.__$){
        window.__$ = $;
    }
    //email or mobile
    var lastAccountValue = '';
    $('.pop-login input:[name="account[email_or_mobile]"]').live('blur',function (){
        var $this = $(this),
            thisVal = $.trim($(this).val());
        if (thisVal !== ''){
            console.log(lastAccountValue);
            console.log(thisVal);
            if (lastAccountValue !== thisVal){
                setTimeout(function (){
                    __$.ajax({
                        url: 'http://www.tianji.com/validators/account_unique',
                        type: 'get',
                        data: {
                            email_or_mobile: $this.val()
                        },
                        statusCode:{
                            201: function (){
                                $('input:[name="account[email_or_mobile]"]').prev('span.inputTip').hide().end().val($this.val()).next('div.error').remove();
                                if ($this.next('div.error').length !== 0){
                                    $this.next('div.error').html('该帐号已存在，请更换帐号 或 <a href="javascript:void(0);" class="fblue login-now">登录</a>');
                                } else {
                                    $this.after('<div class="error">该帐号已存在，请更换帐号 或 <a href="javascript:void(0);" class="fblue login-now">登录</a></div>');
                                }
                            }
                        }
                    });
                }, 50);
            }
            lastAccountValue = thisVal;
        }
    });
    $('#tianji-popup-login input').live('keydown',function (e){
        e = e || window.event;
        if (e.keyCode === 13){
            $(this).parents('form').find('.tianji-submit-btn').trigger('click');
            $(this).parents('form').find('div.error:eq(0)').prev('input').focus();
        }
    });
});