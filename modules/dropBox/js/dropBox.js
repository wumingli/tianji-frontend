/*
*author:武明礼
*email:wumingli@sina.cn
*for:tianji drop box widget
*developed at :2013/5/16 21:17
*Copyright 2013. All rights reserved.
*/
define(function(require, exports, modules){
    var curBox = '';
    $.fn.dropBox = function (options){
        var config = {
            name: 'sex',
            type: 'select',
            container: 'div',
            conClass: 'dropBox',
            baseJsUrl: '../js/',
            baseJs: 'boxData.js',
            css: {
                width: 100
            },
            clearCache: false,
            version: '1.0.1-dev',
            method: 'click',
            required: false
        };
        var sel = $.extend(config, options);
        var $this = $(this);
        sel.clearCache = true;
        loadTitle($this,sel);
        //触发方式
        $(this).click(function (event){
            event = event || window.event;
            event.stopPropagation();
            format($this,sel);
        });
        return this;
    };

    //表单下拉列表必选验证
    $.fn.subDropList = function (){
        var canSubmit = true;
        $('[data-required="true"]').each(function (){
            if($(this)[0].defaultValue.indexOf('请选择') > -1 && $(this)[0].defaultValue == $(this).val()){
                $(this).parents('.p-data-wrap').addClass('data-sub-error');
                canSubmit = canSubmit && false;            
            }
        });
        return canSubmit;
    }
    //默认值输出
    function loadTitle($this,sel){
        if (!sel.clearCache){
            rqUrl = sel.baseJsUrl + sel.baseJs;
        }else {
            rqUrl = sel.baseJs.indexOf('.js') > -1 ? (sel.baseJsUrl + sel.baseJs + '?v=' + sel.version) : (sel.baseJsUrl + sel.baseJs + '.js?v=' + sel.version);
        }
        require.async(rqUrl,function (json){
            var reqStr = '',init = [],dftVal = '',dftHidVal = '';
            reqStr = sel.required ? 'data-required="true"' : '';
            dftVal = !!sel['init'] ? sel['init'][0]['name'] : '请选择'+json[sel.name]['title'];
            dftHidVal = !!sel['init'] ? sel['init'][0]['code'] : '';
            $this.html('<input type="text" readonly="readonly" name="'+sel.name+'" value="'+dftVal+'" class="dftTxt" '+reqStr+' /><input type="hidden" id="hidenInput" name="hidenInput" value="'+dftHidVal+'" /><em class="dropArr"></em>');
        });
    }
    //格式化输出
    function format($this,sel){
        var html = '',rd = '', rqUrl = '';
        curBox = $this.attr('id');
        //箭头改变
        $this.find('em.dropArr').addClass('dropArrUp').end()
             .siblings().find('em.dropArr').removeClass('dropArrUp');
        if (!sel.clearCache){
            rqUrl = sel.baseJsUrl + sel.baseJs;
        }else {
            rqUrl = sel.baseJs.indexOf('.js') > -1 ? (sel.baseJsUrl + sel.baseJs + '?v=' + sel.version) : (sel.baseJsUrl + sel.baseJs + '.js?v=' + sel.version);
        }
        require.async(rqUrl,function (json){
            var data = json[sel.name]['data'],
                sType = sel.type,
                classStr = '';
            html += '<ul>';
            for(var i=0 ;i<data.length ;i++ ){
                classStr = i % 2 == 0 ? 'class="even"' : '';
                var isSelected = !!sel['init'];
                html += '<li data-code="'+data[i]['code']+'" ' + classStr + '>'+data[i]['name']+ (isSelected && sel['init'][0]['code'] == data[i]['code'] ? '<em class="selected"></em>' : '')+'</li>';
            }
            html += '</ul>';
            //创建新节点
            var conNode = $('<div />');
            var thisOffset = $this.offset();
            var boxId = $this.attr('id') + '_dropBox';
            if ($('#' + boxId).length == 0){
                conNode.attr({
                    'class': 'dropList',
                    'id': boxId,
                    'data-for': $this.attr('id')
                });
                conNode.css({
                    left: thisOffset.left,
                    top: thisOffset.top + $this.height(),
                    width: $this.width() + 20
                });

                conNode.html(html);
                $('body').append(conNode);
                //选择事件
                $('#' + boxId).find('li').live('click',function (){
                    $this.find('input').val($(this).text());
                    $this.find('input#hidenInput').val($(this).attr('data-code'));
                    $(this).append('<em class="selected"></em>').siblings().find('em.selected').remove();
                    $('#'+conNode.attr('data-for')).removeClass('data-sub-error');
                });
            }else {
                $('#' + boxId).show();
            }
            //隐藏其他下拉列表
            $('#' + boxId).siblings('.dropList').hide();
        });
        //样式改变
        $this.css('backgroundPosition',($this.width()-10) + 'px 4px');
    }
    //失去焦点关闭下拉列表
    $(document).click(function (){
        $('.dropList').hide();
        $('.p-data-wrap em.dropArr').removeClass('dropArrUp');
        var reqInput = $('#' + curBox).find($('[data-required="true"]'));
        if('' != curBox && reqInput.length > 0 && reqInput[0].defaultValue.indexOf('请选择') > -1 && reqInput[0].defaultValue == reqInput.val()){
            $('#' + curBox).addClass('data-sub-error');
        }
    });
});