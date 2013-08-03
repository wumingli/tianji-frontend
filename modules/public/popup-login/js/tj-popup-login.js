/*
 * author:wumingli
 * author email: wumingli@tianji.com
 * for:popup login of tianji.com
 * developed at : 2013/7/31 10:00
 * base on jquery-1.7.2
 * Copyright 2013. All rights reserved.
 */
$(function (){
    //注册、登录移动
    function frameMove(target){
        $('#tianji-popup-login .pop-left-con').animate({left: target}, 300);
        return false;
    }
    //创建登录框
    function frameCreate(){
        var frameHtml = '';
        //已经存在
        if ($('#tianji-popup-login').length != 0){
            frameShow();
        }
        //不存在，创建
        else {
            frameHtml += '<div id="tianji-popup-login"><div class="pop-left"><div class="pop-left-con"><div class="pop-reg"><h3>立即登录</h3><form method="post" action="http://www.tianji.com/index/login" id="tianji-pop-login-form"><ul><li><input type="text" placeholder="邮箱/手机号" name="account[email_or_mobile]" class="txt" regtype="email_mobile,notnull" /></li><li><input type="password" placeholder="密码" name="account[password]" class="txt" regtype="notnull" /></li><li><input type="hidden" name="remember" /><input type="hidden" name="return_to" value="" /><label>保持登录状态</label> <a href="http://www.tianji.com/account/account_password_backs/new" class="get-back-password" target="_blank" title="找回密码">找回密码</a></li><li><input type="button" id="tianji-popup-login-btn" class="tianji-submit-btn" value="" />　　　　<a href="http://www.tianji.com/join" class="fblue reg-now" target="_blank">没有帐号，立即注册</a></li></ul></form></div><div class="pop-login"><h3>快速注册天际网</h3><form method="post" action="http://www.tianji.com/account/accounts" id="tianji-pop-reg-form"><ul><li><input type="text" placeholder="真实姓名" name="account[name_native_display]" class="txt" regType="chinese,notnull" /></li><li><input type="text" placeholder="邮箱/手机号" name="account[email_or_mobile]" class="txt" regtype="email_mobile,notnull" /></li><li><input type="password" placeholder="密码" name="account[password]" class="txt" regtype="notnull" /></li><li><input type="button" id="tianji-popup-reg-btn" class="tianji-submit-btn" value="" />　　　　<a href="http://www.tianji.com/join" class="fblue login-now" target="_blank">已有帐号，直接登录</a></li></ul></form></div></div></div><div class="pop-right"><div class="pop-right-con"><p>用你的社交帐号登录</p><a href="http://www.tianji.com/auth/weibo" class="weiboLogin" title="用新浪微博登录">用新浪微博登录</a></div></div><b class="close" title="关闭"></b></div><div id="tianji-popup-login-outer-shade"></div><div id="tianji-popup-login-shade"></div>';
            $('body').append(frameHtml);
            frameShow();
        }
    }
    //隐藏登录框
    function frameHide(){
        $('#tianji-popup-login,#tianji-popup-login-shade,#tianji-popup-login-outer-shade').hide();
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
                if(value != ''){
                    bFail = true;
                }
                break;
            case 'email_mobile':
                var emailReg = /^\s*[a-zA-Z0-9]+([\._\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/;
                var phoneReg = /(^((\+86)|(86))?-?([12]\d|(0\d{2,3}))-?(\d{7}|\d{8})-?\d{1,4}$)|(^([^0]\d{6,7})$)/;
                bFail = ((/[a-z]/g.test(value) && emailReg.test(value)) || phoneReg.test(value));
                break;
            case 'chinese':
                var chineseReg = /^[\u4E00-\u9FA5]{2,5}$/;
                bFail = chineseReg.test(value);
        }
        obj.next('div.error').remove();
        if (!bFail){
            obj.after('<div class="error">' + msg + rules[type] + '</div>');
        }
    }
    //验证规则
    var rules = {
        notnull: '不能为空',
        email_mobile: '格式不正确',
        chinese: '应为2~5个汉字'
    };
    //手机、邮箱
    $('#tianji-popup-login input:text,#tianji-popup-login input:password').live('blur', function (){
        var val = $.trim($(this).val());
        var aReg = $(this).attr('regtype').split(',');
        $(this).next('div.error').remove();
        for (var i=0; i<aReg.length; i++){
            if (aReg[i] === 'notnull' && val !== '') {
                break;
            }
            regInput($(this), val, $(this).attr('placeholder'), aReg[i]);
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
    $('#tianji-popup-login .tianji-submit-btn').live('click', function (){
        var $thisForm = $(this).parents('form');
        $thisForm.find('input[name="return_to"]').val('http://www.tianji.com/p');
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
    });
    $('#tianji-popup-login .pop-left-con ul li input.txt').live('blur', function (){
        $(this).removeClass('focus');
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
    });
    $(window).keydown(function (e){
        e = e || window.event;
        if (e.keyCode === 27){
            frameHide();
        }
    });
});