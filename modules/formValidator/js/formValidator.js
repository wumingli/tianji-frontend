/*
 * author : wumingli
 * author email : wumingli@tianji.com
 * with jquery-1.7.2
 * for : form validator
 * developed at : 2013/6/28 10:06:45
 * Copyright 2013. All rights reserved.
 */
/*
 待增加功能：
 1.日期类验证

*/

(function ($) {
    'use strict';
    var oResults = {};
    var pluginCfg = {};
    /**  
     * 身份证15位编码规则：dddddd yymmdd xx p
     * dddddd：地区码
     * yymmdd: 出生年月日
     * xx: 顺序类编码，无法确定
     * p: 性别，奇数为男，偶数为女
     * <p />
     * 身份证18位编码规则：dddddd yyyymmdd xxx y
     * dddddd：地区码
     * yyyymmdd: 出生年月日
     * xxx:顺序类编码，无法确定，奇数为男，偶数为女
     * y: 校验码，该位数值可通过前17位计算获得
     * <p />
     * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
     * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
     * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
     * i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
     *
     */

    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子   
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X   

    function IdCardValidate(idCard) {
        if (idCard.length == 15) {
            return isValidityBrithBy15IdCard(idCard);
        } else if (idCard.length == 18) {
            var a_idCard = idCard.split(""); // 得到身份证数组
            if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function isTrueValidateCodeBy18IdCard(a_idCard) {
        var sum = 0; // 声明加权求和变量
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i]; // 加权求和
        }
        var valCodePosition = sum % 11; // 得到验证码所位置
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    }
    /**  
     * 验证18位数身份证号码中的生日是否是有效生日
     * @param idCard 18位书身份证字符串
     * @return
     */

    function isValidityBrithBy18IdCard(idCard18) {
        var year = idCard18.substring(6, 10);
        var month = idCard18.substring(10, 12);
        var day = idCard18.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题   
        if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }
    /**  
     * 验证15位数身份证号码中的生日是否是有效生日
     * @param idCard15 15位书身份证字符串
     * @return
     */

    function isValidityBrithBy15IdCard(idCard15) {
        var year = idCard15.substring(6, 8);
        var month = idCard15.substring(8, 10);
        var day = idCard15.substring(10, 12);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
        if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
            return false;
        } else {
            return true;
        }
    }
    //rules
    var rules = {
        required: {
            regex: 'none',
            alertText: '请输入',
            alertText2: '不能为空',
            alertTextSelect: '请选择',
            fnValidation: function (element, need, name, type) {
                var len = 0,
                    text1 = this.alertText,
                    text2 = '',
                    oResult = {};
                if (type == 'checkbox' || type == 'radio' || type == 'select' || type == 'div') {
                    if (((type == 'checkbox' || type == 'radio') && element.parent().find('[name=' + element.attr('name') + ']:checked').size() < 1) || (type == 'select' && element.find(':selected').text().indexOf('请选择') != -1) || (type == 'div' && !element.parent().find('input:hidden').val())) {
                        oResult['msg'] = '请选择' + name;
                        oResult['result'] = false;
                    } else {
                        oResult['result'] = true;
                    }
                } else {
                    if (element.is('[date-type]')) {
                        oResult['msg'] = this.alertTextSelect + name;
                    } else {
                        oResult['msg'] = text1 + name;
                    }
                    oResult['result'] = !($.trim(element.val()) == '' && need);
                }
                return oResult;
            }
        },
        minSize: {
            regex: 'none',
            alertText: '至少',
            alertText2: '个字',
            fnValidation: function (element, mLen, name, type) {
                var len = 0,
                    text1 = this.alertText,
                    text2 = this.alertText2,
                    oResult = {};
                len = element.val().length;
                if (type == 'checkbox' || type == 'radio') {
                    len = element.parent().find('[name=' + element.attr('name') + ']:checked').size();
                    text1 = '至少选择';
                    text2 = '项';
                } else if (type == 'select') {
                    if (element.find(':selected').text().indexOf('请选择') != -1) {
                        len = 0;
                    } else {
                        len = mLen;
                    }
                    text1 = '至少选择';
                    text2 = '项';
                } else {
                    len = element.val().length;
                }
                if (len < mLen) {
                    oResult['msg'] = name + text1 + mLen + text2;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        maxSize: {
            regex: 'none',
            alertText: '最多',
            alertText2: '个字',
            fnValidation: function (element, mLen, name) {
                var len = 0,
                    text1 = '',
                    text2 = '',
                    oResult = {};
                if (element.attr('type') == 'checkbox') {
                    len = element.parent().find('[name=' + element.attr('name') + ']:checked').size();
                    text1 = '最多选择';
                    text2 = '项';
                } else {
                    len = element.val().length;
                    text1 = this.alertText;
                    text2 = this.alertText2;
                }
                if (len > mLen) {
                    element.attr('checked', false);
                    oResult['msg'] = name + text1 + mLen + text2;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        min: {
            regex: /\d+/,
            alertText: '最小值为',
            alertText2: '不是正整数',
            fnValidation: function (element, min, name) {
                var oResult = {};
                var thisVal = $.trim(element.val());
                if (thisVal != '') {
                    if (rules.isNotNum(thisVal)) {
                        oResult['msg'] = name + this.alertText2;
                        oResult['result'] = false;
                    } else if (parseInt(thisVal) < min) {
                        oResult['msg'] = name + this.alertText + min;
                        oResult['result'] = false;
                    } else {
                        oResult['result'] = true;
                    }
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        max: {
            regex: /\d+/,
            alertText: '最大值为',
            alertText2: '不是正整数',
            fnValidation: function (element, max, name) {
                var oResult = {};
                var thisVal = $.trim(element.val());
                if (thisVal != '') {
                    if (rules.isNotNum(thisVal)) {
                        oResult['msg'] = name + this.alertText2;
                        oResult['result'] = false;
                    } else if (parseInt(thisVal) > max) {
                        oResult['msg'] = name + this.alertText + max;
                        oResult['result'] = false;
                    } else {
                        oResult['result'] = true;
                    }
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        email: {
            regex: /^\s*[a-zA-Z0-9]+([\._\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+([_\-][a-zA-Z0-9]+)*)+\s*$/,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            fnValidation: function (element, text, name) {
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))) {
                    oResult['msg'] = name + this.alertText2;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        phone: {
            regex: /(^((\+86)|(86))?-?([12]\d|(0\d{2,3}))-?(\d{7}|\d{8})-?\d{1,4}$)|(^([^0]\d{6,7})$)/,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            alertText3: '，正确格式为：01058951128/0543-1234567',
            fnValidation: function (element, text, name) {
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))) {
                    oResult['msg'] = this.alertText + name;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        mobilePhone: {
            regex: /^\s*1[3|4|5|7|8][0-9]\d{8}\s*$/,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            alertText3: '，正确格式为：13800138000',
            fnValidation: function (element, text, name) {
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))) {
                    oResult['msg'] = this.alertText + name;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        isNotNum: function (val) {
            return isNaN(val) || !/^0?\d*$/.test(val);
        },
        compare: {
            alertText: '的值与',
            alertText2: '不一致',
            fnValidation: function (element, text, name) {
                var oResult = {};
                if (element.val() != '' && element.val() != $('#' + text + ',[name=' + text + ']').val()) {
                    oResult['msg'] = name + this.alertText + eval('(' + $('#' + text).attr(pluginCfg.btnData) + ')').name + this.alertText2;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        chinese: {
            regex: /^\s*[\u4E00-\u9FA5]+\s*$/,
            alertText: '请输入正确的',
            alertText2: '只能为汉字',
            fnValidation: function (element, text, name) {
                var oResult = {};
                if ($.trim(element.val()) != '' && !this.regex.test($.trim(element.val()))) {
                    oResult['msg'] = name + this.alertText2;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        isID: {
            alertText: '请输入正确的',
            fnValidation: function (element, text, name) {
                var oResult = {};
                var thisVal = $.trim(element.val());
                if (thisVal != '' && !IdCardValidate(thisVal)) {
                    oResult['msg'] = this.alertText + name;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        url: {
            regex: /^((http|https|ftp):\/\/)(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            fnValidation: function (element, text, name) {
                var oResult = {};
                var thisVal = $.trim(element.val());
                if (thisVal != '' && !this.regex.test(thisVal)) {
                    oResult['msg'] = name + this.alertText2;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        },
        QQ: {
            regex: /^[1-9]\d{4,14}$/,
            alertText: '请输入正确的',
            alertText2: '格式不正确',
            fnValidation: function (element, text, name) {
                var oResult = {};
                var thisVal = $.trim(element.val());
                if (thisVal != '' && !this.regex.test(thisVal)) {
                    oResult['msg'] = name + this.alertText2;
                    oResult['result'] = false;
                } else {
                    oResult['result'] = true;
                }
                return oResult;
            }
        }
    };
    //数据检查

    function checkData(element, pluginCfg) {
        var elmOffset = element.offset();
        var type = element.attr('type');
        var checkingArray = [],
            initArray = [],
            left = 0,
            top = 0,
            cssClass = '',
            i,
            len,
            ltData,
            cfg;
        var fstNode;
        //element.parent().find('.' + pluginCfg.errorMsgConClass).remove();
        if (type == 'checkbox' || type == 'radio') {
            //element.parent().find('.' + pluginCfg.errorMsgConClass).remove();
            fstNode = element.parent().find('[name=' + element.attr('name') + ']:eq(0)');
            cfg = eval('(' + fstNode.attr(pluginCfg.btnData) + ')');
            elmOffset = fstNode.offset();
        } else {
            //element.next('.' + pluginCfg.errorMsgConClass).remove();
            cfg = eval('(' + element.attr(pluginCfg.btnData) + ')');
        }
        if (cfg == undefined) {
            return false;
        }
        checkingArray = cfg.checking;
        initArray = cfg.init;
        cssClass = cfg.cssClass || '';
        if (element.is('select')) {
            type = 'select';
        } else if (element.is('textarea')) {
            type = 'textarea';
        } else if (element.is('div')) {
            type = 'div';
        }

        if (cfg['leftTop']) {
            ltData = cfg['leftTop'].split(/[, ;:]+/);
            left = elmOffset.left + parseInt(ltData[0]);
            top = elmOffset.top + parseInt(ltData[1]);
        } else {
            left = elmOffset.left + element.width() + 15;
            top = elmOffset.top + 5;
        }
        if (!cfg.checking || !cfg.init || cfg.checking.length != cfg.init.length) {
            alert('"' + element.attr(pluginCfg.btnData) + '" \n数据不匹配，请检查');
        } else {
            for (i = 0, len = checkingArray.length; i < len; i++) {
                var oGetRule = rules[checkingArray[i]]['fnValidation'](element, initArray[i], cfg.name, type);
                var res = oGetRule && oGetRule['result'];
                var text = cfg.text || oGetRule['msg'];
                oResults[checkingArray[i] + cfg.name] = res;
                if (!res) {
                    element.parent().find('.' + pluginCfg.errorMsgConClass).length == 0 && element.parent().append('<' + pluginCfg.nodeName + ' class="' + pluginCfg.errorMsgConClass + ' ' + cssClass + '">' + text + '</' + pluginCfg.nodeName + '>');
                    break;
                    //return false;
                } else {
                    element.parent().find('.' + pluginCfg.errorMsgConClass).remove();
                }
            }
        }
    }
    //方法触发

    function triggerMethod($obj, method, cfg) {
        $obj.bind(method, function () {
            checkData($obj, cfg);
            $obj.siblings('[' + pluginCfg.btnData + ']').each(function () {
                checkData($(this), cfg);
            });
        });
        /*$(document).on('click', function() {
            $('[' + pluginCfg.btnData + ']').trigger(method);
        });*/
    }
    $.fn.formValidator = function (config) {
        var opt = {
            btnData: 'validation-config',
            triggerMethod: 'blur',
            formCssClass: 'valForm',
            errorMsgConClass: 'val_error',
            nodeName: 'span'
        },
            $this = $(this),
            $form = $this;
        pluginCfg = $.extend(opt, config);
        $this.attr({
            'class': pluginCfg.formCssClass
        });
        $form.on(pluginCfg.triggerMethod, function () {
            var canSub = true;
            oResults = {};
            $this.find('[' + pluginCfg.btnData + ']').each(function () {
                var $this = $(this);
                if ($this.is(':visible')) {
                    if ($(this).is('input') || $(this).is('select') || $(this).is('textarea')) {
                        if ($(this).is('[type="checkbox"]') || $(this).is('[type="radio"]')) {
                            $(this).parent().find('input:checkbox,input:radio').each(function () {
                                triggerMethod($(this), 'click', pluginCfg);
                            });
                        } else if ($(this).is('select')) {
                            triggerMethod($(this), 'change', pluginCfg);
                        } else {
                            triggerMethod($(this), 'blur', pluginCfg);
                        }
                    } else if ($(this).is('div')) {
                        $(document).on('click', function () {
                            checkData($this, pluginCfg);
                        });
                    }
                    checkData($(this), pluginCfg);
                }
            });
            for (var k in oResults) {
                if (!oResults[k]) {
                    canSub = false;
                }
            }
            if (canSub && pluginCfg.callback) {
                return pluginCfg.callback.call($this, pluginCfg);
            } else {
                $this.find('[' + pluginCfg.btnData + ']').siblings('.' + pluginCfg.errorMsgConClass).first().siblings('[' + pluginCfg.btnData + ']').focus();
                return false;
            }
        });
        return this;
    }
})(jQuery);