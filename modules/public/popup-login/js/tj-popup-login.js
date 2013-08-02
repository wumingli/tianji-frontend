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
            frameHtml += '';
        }
    }
    //隐藏登录框
    function frameHide(){
        $('#tianji-popup-login,#tianji-popup-login-shade,#tianji-popup-login-outer-shade').fadeOut();
    }
    //显示登录框
    function frameShow(){
        $('#tianji-popup-login,#tianji-popup-login-shade,#tianji-popup-login-outer-shade').fadeIn();
    }
    //前端校验
    function regInput(obj, value, msg, type){
        var sRuleMsg = '';
        var bFail = false;
        var oResult = {};
        switch (type){
            case 'notnull':
                if(value != ''){
                    bFail = true;
                }
                break;
            case 'email_telphone':
                var emailReg = /^\s*[a-zA-Z0-9]+([\._\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/;
                var phoneReg = /(^((\+86)|(86))?-?([12]\d|(0\d{2,3}))-?(\d{7}|\d{8})-?\d{1,4}$)|(^([^0]\d{6,7})$)/;

                bFail = ((/[a-z]/g.test(value) && emailReg.test(value)) || phoneReg.test(value));
                /*
                if (!(/[a-z]+/g.test(value) && emailReg.test(value))){
                    sRuleMsg = rules['email'];
                } else if(!phoneReg.test(value)){
                    sRuleMsg = rules['telphone'];
                }*/
                break;
        }
        oResult[obj.attr('name')+'_'+type] = bFail;
        console.log(oResult);
        sRuleMsg = msg + rules[type];
        if (!bFail){
            obj.next('div.error').remove();
            obj.after('<div class="error">' + sRuleMsg + '</div>');
        }
    }
    //验证规则
    var rules = {
        notnull: '不能为空',
        email_telphone: '格式不正确',
        chinese: '请输入真实姓名'
    };
    //手机、邮箱
    $('#tianji-popup-login input:text,#tianji-popup-login input:password').blur(function (){
        var val = $.trim($(this).val());
        var aReg = $(this).attr('regtype').split(',');
        for (var i=0; i<aReg.length; i++){
            regInput($(this), val, $(this).attr('placeholder'), aReg[i]);
        }
    });
    //Checkbox
    $('#tianji-popup-login .pop-left-con label').click(function (){
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')){
            $(this).prev('input').val('1');
        } else {
            $(this).prev('input').val('-1');
        }
    });
    //input box focus
    $('#tianji-popup-login .pop-left-con ul li input.txt').focus(function (){
        $(this).addClass('focus');
    }).blur(function (){
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
    $('.popup-login').click(function (){
        frameCreate();
    });
    $(window).keydown(function (e){
        e = e || window.event;
        if (e.keyCode === 27){
            frameHide();
        } if (e.keyCode === 83 || e.keyCode === 76){
            frameCreate();
        }
    });
});