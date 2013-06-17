/*
*author:武明礼
*email:wumingli@sina.cn
*for:test
*developed at :2013/5/16 21:17
*Copyright 2013. All rights reserved.

seajs.config({
    alias: {
        jquery: '../../../gallery/jquery-1.7.2.min'
    }
});*/
define(function(require, exports, modules){
    $.fn.tjSelector = function (options){
        var config = {
            name: 'city',
            type: 'select',
            container: 'div',
            conClass: 'tjSelector',
            baseJsUrl: '../js/',
            baseJs: 'defaultData.js',
            css: {
                width: 100
            },
            clearCache: false,
            random: Math.random(),
            method: 'click'
        };
        var sel = $.extend(config, options);
        var $this = $(this);
        //触发方式
        if (sel.method == 'click'){
            $(this).click(function (event){
                event = event || window.event;
                event.stopPropagation();
                format($this,sel);
            });
        }
        else if(sel.method == 'load'){
            format($this,sel);
        }
        return this;
    };
    //格式化输出
    function format($this,sel){
        var html = '',rd = '', rqUrl = '';
        if($this.find('.' + sel.conClass).length > 0){
            console.log(0);
            //$this.find(sel.type).show();
            $this.find('.' + sel.conClass).show();
        }
        else{
            if (!sel.clearCache){
                rqUrl = sel.baseJsUrl + sel.baseJs;
            }else {
                rd = sel.random;
                rqUrl = sel.baseJs.indexOf('.js') > -1 ? (sel.baseJsUrl + sel.baseJs + '?v=' + rd) : (sel.baseJsUrl + sel.baseJs + '.js?v=' + rd);
            }
            require.async(rqUrl,function (json){
                var data = json[sel.name];
                var sType = sel.type;
                switch (sType){
                    case 'select': 
                        html = '<select name="'+name+'" style="width:'+sel.css.width+'px;">';
                        for(var i=0 ;i<data.length ;i++ ){
                            html += '<option value="'+data[i]['code']+'">'+data[i]['name']+'</option>';
                        }
                        html += '</select>';
                        break;
                    case 'radio':
                        html = '<'+sel.container+' class="'+sel.conClass+'">';
                        for(var i=0 ;i<data.length ;i++ ){
                            html += '<input type="radio" name="'+sel.name+'" value="'+data[i]['code']+'" id="rd_'+data[i]['code']+'"><label for="rd_'+data[i]['code']+'">'+data[i]['name']+'</label>';
                        }
                        html += '</'+sel.container+'>';
                        break;
                    case 'checkbox':
                        html = '<'+sel.container+' class="'+sel.conClass+'">';
                        for(var i=0 ;i<data.length ;i++ ){
                            html += '<input type="checkbox" name="'+sel.name+'" value="'+data[i]['code']+'" id="box_'+data[i]['code']+'"><label for="box_'+data[i]['code']+'">'+data[i]['name']+'</label>';
                        }
                        html += '</'+sel.container+'>';
                        break;
                    default:
                        break;
                }
                $this.append($(html));
            });
        }
        $this.siblings().find('.' + sel.conClass).hide();
    }
    //关闭提示框
    function closeTip(target){
        var $tar = target;
        $tar.hide();
    }
    $(document).click(function (){
        closeTip($('.tjSelector'));
    });
});