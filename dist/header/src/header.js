/* build at 2013-06-18 10:27:51 */
define(function(require,exports,module){function initHeader(){var curUID=window.CURRENT_USER_ID;null!=curUID&&($("[the-id=look_see]").hover(function(){$(this).addClass("contacts_hover"),$("[data-role=look_list]").css("display","block"),null==$(this).data("visited")&&($("[the-id=look_see]").data("visited",!0),$.ajax({dataType:"jsonp",url:"http://www.tianji.com/ajax/home/visitors",jsonp:"callback",data:{user_id:curUID,skip_ajax:!0},success:function(a){$("#j_box_vistors .contacts_main").append(a),$("#j_box_vistors .contacts_main a").each(function(){$(this).attr("href","http://www.tianji.com"+$(this).attr("href"))});var b=$("#j_box_vistors :hidden[name=new_visitors]").val();$("#j_box_vistors .messages_list li:lt("+b+") img.none").show()}}))},function(){$(this).removeClass("contacts_hover"),$("[data-role=look_list]").css("display","none")}),$("[data-role=pk_sai]").hover(function(){$(this).addClass("hot_nord"),$("[data-role=pk_com]").css("display","block")},function(){$(this).removeClass("hot_nord"),$("[data-role=pk_com]").css("display","none")})),$("[the-id=look_see1]").hover(function(){$(this).addClass("message_hover"),$("[data-role=look_list1]").css("display","block")},function(){$(this).removeClass("message_hover"),$("[data-role=look_list1]").css("display","none")}),$("[the-id=look_see2]").hover(function(){$(this).addClass("tool_hover"),$("[data-role=look_list2]").css("display","block")},function(){$(this).removeClass("tool_hover"),$("[data-role=look_list2]").hide()}),String.prototype.length2=function(){var a=this.match(/[^\x00-\xff]/gi);return this.length+(null==a?0:a.length)},window.SearchBox={selectors:{root:$("#j_search_zone"),input:$("#j_search_zone form :text:first"),box:$("#j_search_box"),highlight:$("#j_search_box li a b")},keyCode:{UP:38,DOWN:40},defalutText:"",host:"http://search.tianji.com/psearch",init:function(){return this._bind(),this},_bind:function(){this.selectors.input.bind("blur",this._hide).bind("keyup",this._keyup),this.selectors.box.hover(function(){SearchBox.selectors.input.unbind("blur")},function(){SearchBox.selectors.input.bind("blur",SearchBox._hide)})},_keyup:function(a){switch(a.which){case 38:SearchBox._up();break;case 40:SearchBox._down();break;default:SearchBox._input()}SearchBox._select()},_show:function(){SearchBox.selectors.box.show()},_hide:function(){SearchBox.selectors.box.hide()},_up:function(){$("#j_search_box li.current:last").index("#j_search_box li")>0&&$("#j_search_box li.current").removeClass("current").prev("li").addClass("current")},_down:function(){$("#j_search_box li.current:last").index("#j_search_box li")<3&&$("#j_search_box li.current").removeClass("current").next("li").addClass("current")},_input:function(){var a=SearchBox.selectors.input.val();SearchBox._resetUrl(encodeURIComponent(a)),0==a.length?(SearchBox._hide(),SearchBox._resetHighlight()):(SearchBox._show(),a=SearchBox._truncate(a,5),SearchBox.selectors.highlight.text(a))},_select:function(){$("#j_search_zone form :hidden[name=header_destination]").val($("#j_search_box li.current a").attr("data-range"))},_truncate:function(a,b){var c="…",d=2*b,e=a.length2();if(d>=e)return a;for(var f=a.substring(0,b),g=f.length2();d>g;){var h=a.substring(0,b++);if(g=h.length2(),g>d)break;f=h}return f+c},_resetHighlight:function(){SearchBox.selectors.highlight.text(SearchBox.defalutText)},_resetUrl:function(a){$("#j_search_box ul li a[data-range]").each(function(){$(this).attr("href",SearchBox.host+"?header_destination="+$(this).attr("data-range")+"&header_keyword="+a)}),$("#j_search_box .use_hign_search a").attr("href","http://search.tianji.com/psearch?keyword="+a)}},SearchBox.init(),window.TIANJI_NOTICE_FORMATS={unread_messages_count:"您有#{v}条新私信,<a href='http://www.tianji.com/messages'>查看</a>",unread_comments_count:"您有#{v}条新评论,<a href='http://www.tianji.com/comments'>查看</a>",unread_fans_count:"您有#{v}个新粉丝,<a href='http://www.tianji.com/contacts/fans'>查看</a>",unread_walls_count:"您有#{v}条新留言,<a href='http://www.tianji.com/p/walls'>查看</a>",unread_friend_requests_count:"您有#{v}条新邀请,<a href='http://www.tianji.com/contacts/invitation'>查看</a>",unread_notices_count:"您有#{v}条新通知,<a href='http://www.tianji.com/notices'>查看</a>",unread_dmails_count:"您有#{v}条新直邮,<a href='http://m.tianji.com/inbox/mrd'>查看</a>",unread_views_count:""},window.TIANJI_NOTICES=[];var set_counter=function(node,value){if(!(0>=value)){value>99&&(value="99+"),$("#j_box_notices [data-role='"+node+"']").append("<span class='promit_icon'>"+value+"</span>");var _notice=eval("TIANJI_NOTICE_FORMATS."+node);"undefined"!=typeof _notice&&_notice.length>0&&TIANJI_NOTICES.push(_notice.replace("#{v}",value))}},draw_box=function(){0!=TIANJI_NOTICES.length&&($.each(TIANJI_NOTICES,function(a,b){$("#j_box_pop").append("<p>"+b+"</p>")}),$("#j_box_pop").show())},draw_visitors=function(a,b){a>999&&(a="999+"),$("#j_box_vistors > a:first").text(a),0>=b||(b>99&&(b="99+"),$("#j_box_vistors .span_promit .promit_b").text(b),$("#j_box_vistors :hidden[name=new_visitors]").val(b),$("#j_box_vistors .span_promit").show())},show_notice_box=function(a,b){var c=0;$.each(a,function(a,b){set_counter(a,b),c+=b}),c>0&&(c>99&&(c="99+"),$("#j_box_notices .span_promit .promit_b").text(c),$("#j_box_notices .span_promit").show(),b&&draw_box())};null!=curUID&&($.ajax({dataType:"jsonp",url:"http://www.tianji.com/ajax/home/notices",data:{user_id:curUID,skip_ajax:!0},jsonp:"callback",success:function(a){null!=a&&(show_notice_box(a.notices,a.box.show),draw_visitors(a.visitors.count,a.visitors.unread_count))}}),$("#j_box_pop .j_fork").live("click",function(){$("#hideNotice").remove(),$("<iframe />").attr({src:"http://www.tianji.com/ajax/home/hide_notice",id:"hideNotice"}).css("display","none").appendTo("body"),$("#j_box_pop").fadeOut(300)})),$.ajax({url:"http://www.tianji.com/pk/"+curUID+"/nav",dataType:"jsonp",success:function(a){$(".header_menu .left_menu").append(a),$("[data-role=pk_sai]").hover(function(){$(this).addClass("hot_nord"),$("[data-role=pk_com]").css("display","block")},function(){$(this).removeClass("hot_nord"),$("[data-role=pk_com]").css("display","none")})}}),$.ajax({url:"http://www.tianji.com/jsonp/nav/user_infos/"+curUID,dataType:"jsonp",success:function(a){var b=a.name,c=a.headline,d=a.avatar_url;$(".top_info a").attr("title",b+", "+c),$(".top_poster img").attr("src",d),$(".top_name a").text(b)}});var url=window.location.href,urlPath=window.location.pathname,aUrlSplit=urlPath.split("/"),sUrlReturn="",chanel={home:0,p:1,contacts:2,mba:4},isRemoveCur="p"==aUrlSplit[1]&&aUrlSplit.length>2&&aUrlSplit[2]!=curUID||url.indexOf("m.tianji")>0||url.indexOf("bbs.tianji")>0||url.indexOf("search.tianji")>0,urlIndex=url.indexOf("job.tianji")>0?3:chanel[aUrlSplit[1]];isRemoveCur?$(".header_menu .left_menu li").removeClass("current"):$(".header_menu .left_menu li").eq(urlIndex).addClass("current").siblings().removeClass("current"),sUrlReturn=url.indexOf("search.tianji")>0?"":"?return_to="+url,$("[the-id=look_see2] .message_main li:eq(1) span a").attr("href","http://www.tianji.com/setting/locale/"+$("#header").attr("the-to-Lan")+sUrlReturn)}exports.initHeader=initHeader});