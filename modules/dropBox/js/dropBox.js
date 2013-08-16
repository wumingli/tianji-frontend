/*
 * author:武明礼
 * email:wumingli@tianji.com
 * for:tianji drop box plugin
 * developed at :2013/5/16 21:17
 * not by seajs
 * rewrite at : 2013/6/27 17:24
 * Copyright 2013. All rights reserved.
 */
(function($){
    var curBox = '';
    var dropBoxStyle = '<style type="text/css">.wml-p-data-wrap{width:280px;height:37px;border:1px solid #e6e6e6;background-color:#fff;text-align:left;position:relative;zoom:1;font-size:12px;-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;-webkit-box-shadow:#e9e9e9 0 0 3px;-moz-box-shadow:#e9e9e9 0 0 3px;box-shadow:#e9e9e9 0 0 3px}.wml-p-data-wrap .dropBox{position:absolute;top:30px;left:-1px;width:400px;border:1px solid #ccc;background:#fff;z-index:999}div label{vertical-align:middle;position:relative;top:-4px;color:#666}.wml-p-data-wrap .dropBox em.close{color:#f30;position:absolute;right:10px;top:8px;font:700 14px/15px Arial normal;cursor:pointer}.wml-p-data-wrap input.dftTxt{border:0;background:0;outline:0;height:37px;line-height:37px;margin-left:10px;cursor:default;*margin-left:0;color:#999}.dropList li em.selected{display:block;width:11px;height:6px;background:url(../images/dropIcons.png) -5px -31px no-repeat;position:absolute;right:10px;top:10px;_background:url(../images/dropicons.gif) -5px -31px no-repeat;overflow:hidden}.wml-p-data-wrap em.dropArr{background:url(http://image.tianji.com/tjs/msPickMap/images/newRebtn.gif) no-repeat;position:absolute;width:32px;height:31px;cursor:pointer;right:4px;top:3px}.dropList{position:absolute;background-color:#f9f9f9;border:1px solid;border-color:#e6e6e6;z-index:999;overflow:hidden;-webkit-box-shadow:#e9e9e9 0 0 3px;-moz-box-shadow:#e9e9e9 0 0 3px;box-shadow:#e9e9e9 0 0 3px}.dropList li{height:30px;line-height:30px;padding-left:10px;font-size:12px;position:relative;padding-right:20px;overflow:hidden;cursor:pointer}.dropList li.even{background-color:#fefefe}.dropList li em.selected{background-position:-5px -56px;height:8px;right:10px}.dropList li:hover,.dropList li.cur{background-color:#ececec;color:#000}.dropList li.disabled{cursor:not-allowed;color:#aaa}.data-sub-error{background-color:#ffb9b9;-webkit-animation:flash 1s .2s ease both;-moz-animation:flash 1s .2s ease both}@-webkit-keyframes flash{25%,50%,100%{opacity:1}25%,75%{opacity:0}}@-webkit-keyframes flash{25%,50%,100%{opacity:1}25%,75%{opacity:0}}@-moz-keyframes flash{25%,50%,100%{opacity:1}25%,75%{opacity:0}}.subCon{clear:both}.subCon input{width:80px;height:30px}</style>';
    $('head').append(dropBoxStyle);

    $.fn.dropBox = function (options){
        var config = {
            dataName: 'sex',
            //dataBase: '../js/boxData.json',
            clearCache: false,
            version: '1.0.1-dev',
            method: 'click',
            required: false,
            cssClass: 'wml-p-data-wrap'
        };
        var sel = $.extend(config, options);
        var $this = $(this),
            rqUrl = '',
            isLinkage = sel.linkage && sel.linkageType;
        if (sel['css']){
            $this.css(sel['css']);
        }
        if (!$this.hasClass('wml-p-data-wrap')){
            $this.addClass('wml-p-data-wrap');
        }

        //读取数据字典中的Title，若初始化时有默认值，则默认选择
        var reqStr = '',
            init = [],
            dftVal = '',
            dftHidVal = '',
            dataName = '',
            hidInputName = '',
            textShow = '',
            boxData = {};
        if ('customData' in sel){
            boxData = sel['customData'];
        } else {
            boxData = TJ_box_data;
        }

        dataName = sel['dataName'];
        hidInputName = sel['name'] || sel['dataName'];
        textShow = sel['text'] || boxData[dataName]['title'];

        //是否必选项，若是，添加data-required属性为true
        reqStr = sel.required ? 'data-required="true"' : '';

        //是否传入默认值
        dftHidVal = '-1';
        if (typeof boxData[dataName] == 'undefined'){
            dftVal = 'dataName出错，请检查';
            $this.addClass('dataName_error data-sub-error');
        }
        else {
            dftVal = '请选择' + textShow;
            if ('initCode' in sel){
                var dv = getdataNameByCode(boxData[dataName]['data'], sel['initCode']);
                if (dv != ''){
                    dftVal = dv;
                    dftHidVal = sel['initCode'];
                }
            }
        }
        //操作DOM            
        dataName = isLinkage ? dataName + '_' + sel.linkageType : dataName;
        $this.html('<input type="text" readonly="readonly" value="' + dftVal + '" class="dftTxt" ' + reqStr + 
                ' style="width:' + ($this.width() - 20) + 'px;" /><input type="hidden" name="' + hidInputName + '" value="' + dftHidVal + '" /><em class="dropArr"></em>');
        //触发方式
        $(this).on('click', function (event){
            event = event || window.event;
            event.stopPropagation();
            if (!$this.hasClass('dataName_error')){
                format($(this));
            }
        });
        //取Code对应的dataName
        function getdataNameByCode(data, code){
            var i,len;
            if (data.length == 0){
                return '';
            } else {
                for (var i=0,len=data.length; i<len; i++){
                    if (data[i]["code"] == code){
                        return data[i]['name'];
                    }
                }
            }
            return '';
        }
        //格式化输出
        function format($this){
            var html = '',rd = '';
            curBox = $this.attr('id');
            var data = null,
                sType = sel.type,
                classStr = '',
                text = '',
                boxData = {};
            //自定义
            if ('customData' in sel){
                boxData = sel['customData'];
            } else {
                boxData = TJ_box_data;
            }
            data = boxData[sel.dataName]['data'];
            text = sel['text'] || boxData[sel.dataName]['title'];
            html += '<ul>';
            html += '<li data-code="-1" class="cur">请选择' + text + '</li>';
            for(var i=0 ;i<data.length ;i++ ){
                classStr = i % 2 == 0 ? 'class="even"' : '';
                var isSelected = !!sel['init'];
                html += '<li data-code="'+data[i]['code']+ '" ' + classStr + '>' + data[i]['name']
                        + (isSelected && sel['initCode'] == data[i]['code'] ? '<em class="selected"></em>' : '')+'</li>';
            }
            //是否相关，如薪资范围
            if (isLinkage){
                if (sel.linkageType == 'from'){
                    html += '<li data-code="" class="facetoface">面议</li>';
                } else {
                    html += '<li data-code="-1" class="facetoface">以上</li>';
                }
            }
            html += '</ul>';
            //创建新节点
            var conNode = $('<div />');
            var thisOffset = $this.offset();
            var boxId = $this.attr('id') + '_dropBox';
            if ($('#' + boxId).length == 0){
                //添加属性
                conNode.attr({
                    'class': 'dropList',
                    'id': boxId,
                    'data-for': $this.attr('id')
                });
                //添加样式，动态控制下拉列表位置
                conNode.css({
                    left: thisOffset.left,
                    top: thisOffset.top + $this.outerHeight(),
                    width: $this.width()
                });
                //添加节点
                conNode.html(html);
                $('body').append(conNode);
                //选择事件
                $('#' + boxId).on('click', 'li', function (){
                    if ($(this).hasClass('disabled')){
                        return false;
                    }
                    $this.find('input').val($(this).text());
                    $this.find('input:hidden').val($(this).attr('data-code'));
                    //标识选中状态
                    if($(this).text().indexOf('请选择') == -1){
                        $(this).append('<em class="selected"></em>').siblings().find('em.selected').remove();
                        $('#'+conNode.attr('data-for')).removeClass('data-sub-error');
                    } else {
                        $(this).siblings().find('em.selected').remove();
                    }
                    //相关数据，选择了开始数据
                    if (sel.linkageType == 'from'){
                        if ($(this).text() == '面议'){
                            $(sel.linkage).hide().prev('span').hide();
                        } else {
                            $(sel.linkage).show().prev('span').show();
                            $(sel.linkage).find('.dftTxt').val('以上');
                            $(sel.linkage).removeClass('data-sub-error');
                        }
                    }
                    //执行回调函数
                    if ('callback' in sel){
                        sel['callback']();
                    }
                });
            }
            else {
                $('#' + boxId).show();
            }
            if (sel.linkageType == 'to' && $this.find('.dftTxt').val() == '以上'){
                $('#' + boxId + ' ul li em').remove();
                $('#' + boxId).find('li:contains("以上")').append('<em class="selected"></em>');
            }
            //隐藏其他下拉列表
            $('#' + boxId).siblings('.dropList').hide();
            //相关联数据处理
            var $linkage = $(sel.linkage);
            if (isLinkage && $linkage.length != 0){
                $('#' + boxId + ' li').removeClass('disabled');
                if (sel.linkageType == 'from'){
                    $('#' + boxId + ' li:not(:contains("请选择")):not(:contains("面议"))').each(function (){
                        var linkageVal = parseInt($linkage.find('.dftTxt').val()),
                            thisVal = parseInt($(this).text());
                        if (!isNaN(linkageVal)){
                            if (thisVal > linkageVal){
                                $(this).addClass('disabled');
                            } else {
                                $(this).removeClass('disabled');
                            }
                        } 
                    });
                } else {
                    $('#' + boxId + ' li:not(:contains("请选择")):not(:contains("以上"))').each(function (){
                        var linkageVal = parseInt($linkage.find('.dftTxt').val()),
                            thisVal = parseInt($(this).text());
                        if (!isNaN(linkageVal)){
                            if (thisVal < linkageVal){
                                $(this).addClass('disabled');
                            } else {
                                $(this).removeClass('disabled');
                            }
                        } 
                    });
                }
            }
        }
        return this;
    };
    //表单下拉列表必选验证
    $.fn.subDropList = function (){
        var canSubmit = true;
        $('[data-required="true"]').each(function (){
            if($(this).val().indexOf('请选择') > -1){
                var $this = $(this);
                $this.parents('.wml-p-data-wrap').removeClass('data-sub-error');
                setTimeout(function (){
                    $this.parents('.wml-p-data-wrap').addClass('data-sub-error');
                },200);
                canSubmit = false;            
            }
        });
        return canSubmit;
    }
    //失去焦点关闭下拉列表
    $(document).click(function (){
        $('.dropList').hide();
        //$('.wml-p-data-wrap em.dropArr').removeClass('dropArrUp');
        var reqInput = $('#' + curBox).find($('[data-required="true"]'));
        if('' != curBox && reqInput.length > 0 && reqInput.val().indexOf('请选择') > -1){
            $('#' + curBox).addClass('data-sub-error');
        }
    });
    //通过Code查找name
    $('[data-dropbox-code]').each(function (){
        $(this).text(findDropBoxData($(this).attr('data-dropbox-code')));
    });
    function findDropBoxData(code){
        for (var n in TJ_box_data){
            var data = TJ_box_data[n]['data'];
            for (var i=0; i<data.length; i++){
                if (data[i]['code'] === code){
                    return data[i]['name'];
                }
            }
        }
        return '';
    }
})(jQuery);