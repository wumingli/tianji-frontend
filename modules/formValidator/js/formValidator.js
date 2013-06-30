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
        var methods = {
            init: function (options){
                if ($form.is('[' + pluginCfg.testAttr + ']') && $form.attr(pluginCfg.testAttr) == 'true'){
                    methods.initCss();
                    $form.on(pluginCfg.triggerMethod, '[' + pluginCfg.btnData + ']', function (){
                        var cfg = methods.getConfig($(this));
                        methods.outputError(methods.makeErrorToObj(cfg), $(this));
                        console.log(methods.makeErrorToObj(cfg));
                    });
                } else {
                    console.log('not found attribute of ' + pluginCfg.testAttr);
                }
            },
            getRequire: function (){
                return $vs;
            },
            initCss: function (){
                $vs.filter(':text').addClass('vFormText');
            },
            getConfig: function (element){
                return element.attr(pluginCfg.btnData);
            },
            makeErrorToObj: function (config){
                var obj = {},
                    arrCfg = [],
                    i,
                    len;
                arrCfg = config.replace(/ +/g, '').split('&');
                for (i = 0, len = arrCfg.length; i < len; i++){
                    var tempItem = arrCfg[i].split('=');
                    obj[tempItem[0]] = tempItem[1];
                }
                return obj;
            },
            outputError: function (msgs, target){
                var errorTip = '';
                var type = msgs.type;
                if (type){
                    //target.parent().find('.' + pluginCfg.errorMsgConClass).remove();
                    target.next('span.' + pluginCfg.errorMsgConClass).remove();
                    msgs.name = msgs.name ? msgs.name : '';
                    errorTip = rules[type].alertText + msgs.name;
                    switch (type){
                        case 'required':
                            if ($.trim(target.val()) == ''){
                                target.after('<span class="' + pluginCfg.errorMsgConClass + '">' + errorTip + '</span>');
                            }
                            break;
                        default:
                            target.after('<span class="' + pluginCfg.errorMsgConClass + '">' + errorTip + '</span>');
                            break;
                    }
                }
            }
        };
        var rules = {
            required: {
                regex: 'none',
                alertText: '请输入',
                alertTextSelect: '请选择',
                alertTextCheckbox: '必须勾选'
            },
            minSize: {
                regex: 'none',
                alertText: '最少',
                alertText2: '个字符'
            },
            maxSize: {
                regex: 'none',
                alertText: '最多',
                alertText2: '个字符'
            },
            min: {
                regex: /\d+/,
                alertText: '最小值为'
            },
            max: {
                regex: /\d+/,
                alertText: '最大值为'
            },
            email: {
                regex: /www@sina.cn/,
                alertText: '请输入正确的邮箱格式'
            }
        };
        methods.init();
        //$vs.trigger(pluginCfg.triggerMethod);
    }
})(jQuery);