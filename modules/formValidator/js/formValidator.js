/*
 * author : wumingli
 * author email : wumingli@tianji.com
 * with jquery-1.7.2
 * for : form validator
 * developed at : 2013/6/28 10:06:45
 * Copyright 2013. All rights reserved.
 */
(function ($){
    'use strict';
    $.fn.formValidator = function (config){
        var opt = {
                testAttr: 'data-validation',
                alertMsg: '',
                btnData: 'validation-config',
                triggerMethod: 'blur',
                formCssClass: 'valForm',
                errorMsgConClass: 'val_error'
            },
            pluginCfg = $.extend(config, opt),
            $this = $(this),
            $form = $this,
            $vs = $form.find('[' + pluginCfg.btnData + ']');
        $this.attr({
            'class': pluginCfg.formCssClass
        });
        if ($form.is('[' + pluginCfg.testAttr + ']') && $form.attr(pluginCfg.testAttr) == 'true'){
            //$vs.filter(':text,:password').addClass('vFormText');
            $form.on(pluginCfg.triggerMethod, '[' + pluginCfg.btnData + ']', function (){
                $(this).next('span.' + pluginCfg.errorMsgConClass).remove();
                //try{
                    var cfg = eval('(' + $(this).attr(pluginCfg.btnData) + ')');
                    var checkingArray = cfg.checking;
                    var initArray = cfg.init;
                    var i,
                        len;
                    if (!cfg.checking || !cfg.init || cfg.checking.length != cfg.init.length){
                        alert('"' + $(this).attr(pluginCfg.btnData) + '" \n数据不匹配，请检查');
                    }
                    else {
                        for (i = 0, len = checkingArray.length; i < len; i++){
                            var oGetRule = rules[checkingArray[i]]['fnReg']($(this), initArray[i], cfg.name);
                            if (oGetRule && !oGetRule['result']){
                                $(this).after('<span class="' + pluginCfg.errorMsgConClass + '">' + oGetRule['msg'] + '</span>');
                                break;
                            }
                        }
                    }
                //}
                //catch (e){
                //    alert('"' + $(this).attr(pluginCfg.btnData) + '" \n数据格式错误，请检查');
                //}
            });
        } else {
            console.log('not found attribute of ' + pluginCfg.testAttr);
        }
        //rules
        var rules = {
            required: {
                regex: 'none',
                alertText: '请输入',
                alertTextSelect: '请选择',
                alertTextCheckbox: '必须勾选',
                fnReg: function (element, need, name){
                    if ($.trim(element.val()) == '' && need){
                        return {
                            msg: this.alertText + name,
                            result: false
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            minSize: {
                regex: 'none',
                alertText: '最少【',
                alertText2: '】个字符',
                fnReg: function (element, mLen, name){
                    console.log(element.size());
                    if (element.val().length < mLen){
                        return {
                            msg: name + this.alertText + mLen + this.alertText2,
                            result: false
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            maxSize: {
                regex: 'none',
                alertText: '最多【',
                alertText2: '】个字符',
                fnReg: function (element, mLen, name){
                    if (element.val().length > mLen){
                        return {
                            msg: name + this.alertText + mLen + this.alertText2,
                            result: false
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            min: {
                regex: /\d+/,
                alertText: '最小值为',
                alertText2: '不是正整数',
                fnReg: function (element, min, name){
                    if ($.trim(element.val()) != ''){
                        if (rules.isNotNum(element.val())){
                            return {
                                msg: name + this.alertText2,
                                result: false
                            }
                        } else if (parseInt(element.val()) < min){
                            return {
                                msg: name + this.alertText + min,
                                result: false
                            }
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            max: {
                regex: /\d+/,
                alertText: '最大值为',
                alertText2: '不是正整数',
                fnReg: function (element, max, name){
                    if ($.trim(element.val()) != ''){
                        if (rules.isNotNum(element.val())){
                            return {
                                msg: name + this.alertText2,
                                result: false
                            }
                        } else if (parseInt(element.val()) > max){
                            return {
                                msg: name + this.alertText + max,
                                result: false
                            }
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            email: {
                regex: /^\s*[a-zA-Z0-9]+([\._\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/,
                alertText: '请输入正确的',
                alertText2: '格式不正确',
                fnReg: function (element, text, name){
                    if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))){
                        return {
                            msg: name + this.alertText2,
                            result: false
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            phone: {
                regex: /(^((\+86)|(86))?-?([12]\d|(0\d{2,3}))-?(\d{7}|\d{8})-?\d{1,4}$)|(^([^0]\d{6,7})$)/,
                alertText: '请输入正确的',
                alertText2: '格式不正确',
                alertText3: '，正确格式为：(+86)01058951128/(+86)0543(-)1234567(8)(-)(1~4位分机号)',
                fnReg: function (element, text, name){
                    if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))){
                        return {
                            msg: name + this.alertText2 + this.alertText3,
                            result: false
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            mobilePhone: {
                regex: /^((\+86)|(86))?-?1\d{10}$/,
                alertText: '请输入正确的',
                alertText2: '格式不正确',
                alertText3: '，正确格式为：(+86)13800138000',
                fnReg: function (element, text, name){
                    if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))){
                        return {
                            msg: name + this.alertText2 + this.alertText3,
                            result: false
                        }
                    }
                    else {
                        return {
                            result: true
                        }
                    }
                }
            },
            isNotNum: function (val){
                return isNaN(val) || !/^[^0]\d*$/.test(val);
            }
        };
        //$vs.trigger(pluginCfg.triggerMethod);
    }
})(jQuery);