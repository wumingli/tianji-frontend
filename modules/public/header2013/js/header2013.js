/*
 * author:wanghaiyan,wumingli
 * author email: wanghaiyan@tianji.com;wumingli@tianji.com
 * for:new header of tianji
 * developed at : 2013/7/23 11:29
 * Copyright tianji 2013. All rights reserved.
 */
$(function (){
    var userId = '55667630';
    var info_timer = null;
    $('#notices_see3').hover(function(){
        clearTimeout(info_timer);
        $('.messages_list').hide();
        $(this).addClass('notices_hover');
        $('[data-role=notices_list1]').show();
    }, function (){
        info_timer = setTimeout(function (){
            $(this).removeClass('notices_hover');
            $('[data-role=notices_list1]').hide();
        }, 300);
    });
    $('#look_see2').hover(function(){
        clearTimeout(info_timer);
        $('.messages_list').hide();
        $(this).addClass('tool_hover');
        $('[data-role=look_list2]').show();
    }, function (){
        info_timer = setTimeout(function (){
            $(this).removeClass('tool_hover');
            $('[data-role=look_list2]').hide();
        }, 300);
    });

    $('[data-role=auther_icon]').hover(function(){
        $(this).children('[data-role=auther_promit]').show();
    },function (){
        $(this).children('[data-role=auther_promit]').hide();
    });

    $('#new_header_message li').hover(function(){
        $(this).find('.bi_x,.agree_btn,.ignore_btn').show();
    },function (){
        $(this).find('.bi_x1,.agree_btn,.ignore_btn').hide();
    });
    $('.bi_x').on('click',function(){
        $(this).parents('#new_header_message li').remove();
    });
    $('.ignore_btn').on('click',function(){
        $(this).parents('#new_header_message li').remove();
    });
    $('.messages_list .hd_scroll_box .scroll_panel').hover(function(){
        $(this).find('.hd_scroll_bg').show();
    },function (){
        $(this).find('.hd_scroll_bg').hide();
    });
    $('.user_name').hover(function(){
        $(this).addClass('font_hui user_bg');
        $(this).find('.arrow-ud').addClass('arrow-ud_hover');
        $(this).find('.user_item').css('display','block');
    },function (){
        $(this).removeClass('font_hui user_bg');
        $(this).find('.arrow-ud').removeClass('arrow-ud_hover');
        $(this).find('.user_item').css('display','none');
    });
    /* 搜索 */
    $(".find_people").focus(function(){
         $(this).addClass('find_bg');
         $(this).parents('.top_search').find('.find_people_button').addClass('find_btn_bg');
         if ($(this)[0].defaultValue == $(this).val()){
            $(this).val('');
         }
    });
    $(".find_people").blur(function(){
        $(this).removeClass('find_bg');
        $(this).parents('.top_search').find('.find_people_button').removeClass('find_btn_bg');
        if ($.trim($(this).val()) == ''){
            $(this).val('搜索');
        }
    });
    $('.bi_x').on('click',function(){
        $(this).parents('#new_header_work li').remove();
    });	
    $('#new_header_work li').hover(function(){
        $(this).find('.bi_x').show();
    },function (){
        $(this).find('.bi_x').hide();
    });

    //获取string长度
    String.prototype.length2 = function() {
      var cArr = this.match(/[^\x00-\xff]/ig);
      return this.length + (cArr == null ? 0 : cArr.length);
    }
    //原搜索
    window.SearchBox = {
        selectors: {
          root: $(".top_search"),
          input: $(".top_search form :text:first"),
          box: $(".search_list"),
          highlight: $(".search_main li a b")
        },
        keyCode: {
          UP: 38,
          DOWN: 40
        },
        defalutText: "",
        host: "http://search.tianji.com/psearch",
        init: function(){
          this._bind();
          return this;
        },
        _bind: function(){
          this.selectors.input.bind("blur", this._hide).bind("keyup", this._keyup);
          this.selectors.box.bind("click", this._hide);
          this.selectors.box.hover(function(){
            SearchBox.selectors.input.unbind("blur");
          },function(){
            SearchBox.selectors.input.bind("blur", SearchBox._hide);
          });
        },
        _keyup: function(e){
          switch(e.which){
            case 38: 
                SearchBox._up();
                break;
            case 40: 
                SearchBox._down();
                break;
            case 13:
                SearchBox._input();
                this._hide;
                break;
            default:
                SearchBox._input();
                break;
          }
          SearchBox._select();
        },
        _show: function(){
          SearchBox.selectors.box.show();
        },
        _hide: function(){
          SearchBox.selectors.box.hide();
        },
        _up: function(){
          if($(".search_list li.current:last").index(".search_list li")>0){
            $(".search_list li.current").removeClass("current").prev("li").addClass("current");
          }
        },
        _down: function(){
          if($(".search_list li.current:last").index(".search_list li")<3){
            $(".search_list li.current").removeClass("current").next("li").addClass("current");
          }
        },
        _input: function(){
          var str = SearchBox.selectors.input.val();
          SearchBox._resetUrl(encodeURIComponent(str));
          if(str.length == 0){
            SearchBox._hide();
            SearchBox._resetHighlight();
          }else{
            SearchBox._show();
            str = SearchBox._truncate(str, 13);
            SearchBox.selectors.highlight.text(str);
          }
        },
        _select:function(){
          $(".top_search form :hidden[name=header_destination]").val($(".search_list li.current a").attr("data-range"));
        },
        // 截断字符
        _truncate: function(str, len){
          var _omission = "…";
          var _maxLength = len * 2;
          var len2 = str.length2();
          //如果用户输入的内容 字节数小于等于10， 则return 原字符串
          if(len2 <= _maxLength) return str;
          
          // 否则截断字符
          // 截取前5个字符，判断字节数是否等于10，如果小于10则补进下一个字符，直到字节数为10,并添加omission
          var _str = str.substring(0,len);
          var _len2 = _str.length2();
          
          while(_len2 < _maxLength){
            var _tmpStr = str.substring(0,len++);
            _len2 = _tmpStr.length2();
            //判断最后一个字符是中文的情况
            if(_len2 > _maxLength) break;
            _str = _tmpStr;
          }
          return _str+_omission;
        },
        _resetHighlight: function(){
          SearchBox.selectors.highlight.text(SearchBox.defalutText);
        },
        _resetUrl: function(_str){
          $(".search_list ul li a[data-range]").each(function(){
            $(this).attr("href", SearchBox.host+"?header_destination="+$(this).attr("data-range")+"&header_keyword="+_str);
          });
          $(".search_list .use_hign_search a").attr("href", "http://search.tianji.com/psearch?keyword="+_str);
        }
    }
    //初始化搜索
    SearchBox.init();

    var hostname = window.location.hostname;
    var config = {
        domain: hostname.substring(hostname.indexOf('.') + 1),
        crossDomainFrameUrl: 'http://www.tianji.com/crossdomain.html',
        crossDomainFrameId: 'crossdomain-iframe'
    };
    var thisDomain = hostname.match(/[a-z]+/)[0];
    var ridDomain = config.crossDomainFrameUrl.match(/[a-z]+/g)[1];
    var crossDom;
    //设置Domain
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
    //因跨域页延迟
    setTimeout(function (){
        //用户信息
        __$.get('http://www.tianji.com/front/nav/user',function(data){
            if (data){
                var uData = data['data'];
                $('.user_poster img').attr('src', uData['avatar_url']);
                $('.user_name .zi').text(uData['name']);
                $('.user_poster img,.user_name .zi').attr('title',uData['name'] + ', ' + uData['headline']);
            }
        });
        //初始化数字
        __$.get('http://www.tianji.com/front/nav/counts',function(data) {
            if(data){
              var notice_msg = data['notices'];
              //好友请求
              if (notice_msg['unread_friend_requests_count'] == 0){
                $('#contacts_one .span_promit').hide();
                $('#contacts_one .promit_no').show();
              } else {
                $('#contacts_one .span_promit').show().text(notice_msg['unread_friend_requests_count']);
                $('#contacts_one .promit_no').hide();
              }
              //通知
              if (notice_msg['unread_notices_count'] == 0){
                $('look_see2 .span_promit').hide();
              } else {
                $('#look_see2 .span_promit').show().text(notice_msg['unread_notices_count']);
              }
              //私信
              if (notice_msg['unread_messages_count'] == 0){
                $('#look_see1 .span_promit').hide();
              } else {
                $('#look_see1 .span_promit').show().text(notice_msg['unread_messages_count']);
              }
            }
        });

        //获取新的人脉邀请、可能认识的人
        $('#contacts_one a.icon_01').hover(function(){
            clearTimeout(info_timer);
            var len = 0;
            $('.messages_list').hide();
            $('#contacts_one').addClass('contacts_hover');
            $('#contacts_one_list').show();
            if (!$(this).hasClass('contacts_loaded')){
                //人脉邀请
                __$.ajax('/front/nav/contact_requests', function (data){
                    var frdHtml = '',
                        cDatas = data['data'],
                        i;
                    if (data['data'].length > 0){
                        for (i=0, len = cDatas.length; i < len; i++){
                            frdHtml += '<li data-id="'+cDatas[i]['id']+'"> <span class="logo1"><a href="http://www.tianji.com/p/'+cDatas[i]['userId']+'" target="_blank"><img src="' + cDatas[i]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/'+cDatas[i]['userId']+'" target="_blank">' + cDatas[i]['name'] + '</a> </span> <span class="name1_companies">' + cDatas[i]['headline'] + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="agree_btn">同意</a> </li>';
                        }
                        $('#contacts_one_list .loding_notice').fadeOut(function (){
                            $('#new_header').html(frdHtml);
                        });
                    } else {
                        $('#contacts_one .loding_notice').hide();
                        $('#contacts_one .promit_no').show();
                    }
                });
                //可能认识的人
                console.log(len);
                __$.getJSON('http://www.tianji.com/front/nav/pymk?count=0&next='+(5 - len - 1), function (json){
                    var pHtml = '',
                        pDatas = json['data'],
                        pLen = pDatas.length,
                        noBorderBottom = '';
                    if (pDatas.length > 0){
                        $('#contacts_one .hd_scroll_box .emails_panel').hide();
                        for (var i=0; i < 5 - len && i < pLen; i++){
                            if (i == (pLen - 1)){
                                noBorderBottom = 'style="border-bottom:none;"';
                            }
                            pHtml += '<li data-id="' + pDatas[i]['id'] + '"' + noBorderBottom+'> <span class="logo1"><a href="http://www.tianji.com/p/'+pDatas[i]['id']+' target="_blank""><img src="' + pDatas[i]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/'+pDatas[i]['id']+'" target="_blank">' + pDatas[i]['name'] + '</a> </span> <span class="name1_companies">' + pDatas[i]['headline'] + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="adds_btn">加为好友</a> <a href="javascript:void(0);" class="adds_btn_yi">已发送</a> </li>';
                        }
                    } else {
                        $('#contacts_one .hd_scroll_box .emails_panel').show();
                    }
                    $('.hd_scroll_box,.title_renmai').fadeIn();
                    $('#people_kone').html(pHtml);
                });
            }
        },function (){
            $('#contacts_one').removeClass('contacts_hover');
            info_timer = setTimeout(function (){
                $('#contacts_one_list').hide();
            }, 300);
            $(this).addClass('contacts_loaded');
        });
        //列表划过
        $('.messages_list').hover(function (){
            clearTimeout(info_timer);
        },function (){
            $('#contacts_one').removeClass('contacts_hover');
            info_timer = setTimeout(function (){
                $('#contacts_one_list').hide();
            }, 300);
        });
        //人脉邀请、可能认识的人 列表滑过
        $('#new_header,#people_kone').on('mouseover','li', function (){
            $(this).addClass('current');
        });
        $('#new_header,#people_kone').on('mouseout','li', function (){
            $(this).removeClass('current');
        });
        //人脉邀请同意、删除
        $('#new_header').on('click','span.bi_x1, a.agree_btn', function (event){
            event = event || window.event;
            //同意
            if (event.srcElement.className == 'agree_btn'){
                __$.ajax({
                    url: 'http://www.tianji.com/front/nav/accept_cr',
                    data: {
                        id: $(this).parent('li').attr('data-id'),
                        lastId: $('#new_header li:last').attr('data-id')
                    },
                    type: 'put',
                    statusCode: {
                        404: function (){
                            alert(404);
                        }
                    },
                    success:function (data){
                        if (data && data['data'].length > 0){
                            var retData = data['data'];
                            var returnHtml = '<li data-id="'+retData[0]['id']+'"> <span class="logo1"><a href="http://www.tianji.com/p/'+retData[0]['userId']+'" target="_blank"><img src="' + retData[0]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/'+retData[0]['userId']+'" target="_blank">' + retData[0]['name'] + '</a> </span> <span class="name1_companies">' + retData[0]['headline'] + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="agree_btn">同意</a> </li>';
                            $('#new_header').append(returnHtml);
                        }
                    }
                });
            }
            //删除
            else if(event.srcElement.className == 'bi_x1') {
                __$.ajax({
                    url: 'http://www.tianji.com/front/nav/ignore_cr',
                    data: {
                        id: $(this).parent('li').attr('data-id'),
                        lastId: $('#new_header li:last').attr('data-id')
                    },
                    type: 'put',
                    statusCode: {
                        404: function (){
                            alert(404);
                        }
                    },
                    success:function (data){
                        if (data && data['data'].length > 0){
                            var retData = data['data'];
                            var returnHtml = '<li data-id="'+retData[0]['id']+'"> <span class="logo1"><a href="http://www.tianji.com/p/'+retData[0]['userId']+'" target="_blank"><img src="' + retData[0]['avatar'] + '" /></a></span> <span class="name1_title"> <a href="http://www.tianji.com/p/'+retData[0]['userId']+'" target="_blank">' + retData[0]['name'] + '</a> </span> <span class="name1_companies">' + retData[0]['headline'] + '</span> <span class="bi_x1"></span> <a href="javascript:void(0);" class="agree_btn">同意</a> </li>';
                            $('#new_header').append(returnHtml);
                        }
                    }
                });
            }
            $(this).parent('li').slideUp(500, function (){
                if ($('#contacts_one .span_promit').text()-1 == 0){
                    $('#contacts_one .span_promit').fadeOut();
                } else {
                    $('#contacts_one .span_promit').text($('#contacts_one .span_promit').text()-1);
                }
                $(this).remove();
                if ($('#new_header').find('li').length == 0){
                    $('#contacts_one .promit_no').show().text('暂时没有新的人脉邀请');
                }
            });
        });
        //可能认识的人加为好友、删除
        $('#people_kone').on('click', 'li .adds_btn', function(){
            $(this).hide();
            $(this).parent('li').find('.adds_btn_yi').show();
            $(this).parent('li').find('.bi_x1').remove();
            //添加
            if (event.srcElement.className == 'adds_btn'){
                __$.ajax({
                    url: 'http://www.tianji.com/front/nav/apply_pymk',
                    data: {
                        id: $(this).parent('li').attr('data-id'),
                        count: 3
                    },
                    type: 'post',
                    success:function (data){
                        console.log(data);
                    }
                });
            }
            //删除
            else if(event.srcElement.className == 'bi_x1') {
                __$.ajax({
                    url: 'http://www.tianji.com/front/nav/ignore_pymk',
                    data: {
                        id: $(this).parent('li').attr('data-id'),
                        count: 3
                    },
                    type: 'delete',
                    success:function (data){
                        console.log(data);
                    }
                });
            }
        });
        //查看私信
        $('#look_see1').hover(function(){
            clearTimeout(info_timer);
            $('.messages_list').hide();
            $(this).addClass('message_hover');
            $('#look_list1').show();
            if (!$(this).hasClass('contacts_loaded')){
                __$.get('http://www.tianji.com/front/nav/messages', function (data){
                    if (data && data['data'].length > 0){
                        var msgData = data['data'],
                            msgHtml = '',
                            len = msgData.length,
                            i = 0,
                            noBorderBottom = '';
                        $('#look_list1 .no_notice').hide();
                        while(i < len){
                            if (i == (len - 1)){
                                noBorderBottom = 'style="border-bottom:none;"';
                            }
                            msgHtml += '<li '+noBorderBottom+'> <a href="http://www.tianji.com/messages"> <span class="logo1"><img src="' + msgData[i]['avatar'] + '" /></span> <span class="name1_title">' + msgData[i]['name'] + '</span> <span class="times">' + msgData[i]['time'] + '</span> <span class="name1_companies">' + msgData[i]['content'] + '</span> <span class="bi_x" style="display: none"></span> </a> </li>';
                            i++;
                        }
                        $('#look_list1 .loding_notice').fadeOut(function (){
                            $('#look_list1 .hd_scroll_box,#look_list1 .title_renmai').show();
                            $('#new_header_message').html(msgHtml);
                        });
                    } else if(data['data'].length == 0){
                        $('#look_list1 .no_notice').show();
                    }
                });
            }
        }, function (){
            $('#look_see1').removeClass('message_hover');
            info_timer = setTimeout(function (){
                $('#look_list1').hide();
            }, 300);
            $(this).addClass('contacts_loaded');
        });
    }, 300);

});