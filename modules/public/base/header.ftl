<#assign project=rc.getContextPath()?substring(1)/>
<#if globalData.userId=='' || globalData.userId=='undefined'>
	<div class="header_menu_bg">
		<div class="header_menu">
			<span class="logo"><a href="http://www.tianji.com/home"><img src="http://static.tianji.com/images/home_new/logo.png?1355278076" /></a></span>
			<ul class="left_menu" >
				<li class="current ">
					<a  href="http://www.tianji.com/home">关于天际</a>
				</li>
				<li>
					<a href="http://www.tianji.com/groups">用户指南</a>
				</li>
			</ul>
            <ul class="right_menu">
				<li class="login">
					<a href="http://www.tianji.com">登录</a>
				</li>
				<li class="register">
					<a href="http://www.tianji.com/join">注册</a>
				</li>
            </ul>
		</div>
	</div>
	<div class="no_login_panel">
		<span class="go_tianji"><a href="http://www.tianji.com/join">注册天际网</a></span>
	</div>
<#else>
	<#if rc.getLocale() =='en_US'>
		<style type="text/css">
			#hd .header_menu ul.left_menu li a {padding:0 18px;}
		</style>
		<div class="header_menu_bg">
			<div class="header_menu">
				<span class="logo"><a href="http://www.tianji.com/home"><img src="http://static.tianji.com/images/home_new/logo.png" /></a></span>
				<ul class="left_menu">
					<li>
						<a href="http://www.tianji.com/home">Home</a>
					</li>
					<li>
						<a href="http://www.tianji.com/p" >Profile</a>
					</li>
					<li>
						<a href="http://www.tianji.com/contacts">Contacts</a>
					</li>
					<li>
						<a class="current" href="http://job.tianji.com/sr/home?trk=jobs_top">Jobs</a>
					</li>
					<li>
						<a href="http://www.tianji.com/events">Events</a>
					</li>
					<li>
						<a href="http://www.tianji.com/mba">MBA</a>
					</li>
				</ul>
	            <div class="top_search" id="j_search_zone">
					<form action="http://search.tianji.com/psearch">
						<input type="text" autocomplete="off" data-placeholder="找人" name="header_keyword" class="find_people placeholder" />
						<input name="header_destination" type="hidden" value="name"/>
						<input class="find_people_button" src="http://static.tianji.com/images/home_new/top_search.jpg?1355900788" type="image" />
					</form>
					<div class="search_list bottom_bg none" id="j_search_box">
						<ul class="search_main">
						  <li class="current">
						    <a href="javascript:void(0);" data-range="name">按姓名搜索“<b></b>”</a>
						  </li>
						  <li>
						    <a href="javascript:void(0);" data-range="company">按公司搜索“<b></b>”</a>
						  </li>
						  <li>
						    <a href="javascript:void(0);" data-range="title">按职位搜索“<b></b>”</a>
						  </li>
						  <li>
						    <a href="javascript:void(0);" data-range="school">按学校搜索“<b></b>”</a>
						  </li>
						</ul>
						<div class="clear"></div>
						<span class="use_hign_search">
						  <a href="javascript:void(0);">使用高级搜索</a>
						</span>
				  </div>
	            </div>
				<ul class="right_menu">
					<li the-id="look_see" class="contacts">
						<img src="http://static.tianji.com/images/home_new/notice_icon.png">0
						<#--
						<div class="span_promit" style="display:none;">
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_a.png" /></span>
							<span class="promit_b">0</span>
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_c.png" /></span>
						</div>
						<div class="messages_list bg_red" style="display: none;" data-role="look_list" >
							<span class="list_c"><img src="http://static.tianji.com/images/home_new/zhanshi_jian.png" /></span>
							<ul class="contacts_main">
								<h5>最新访客</h5>
								<li>
									<span class="logo1"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/vick_14.png" /></a></span>
									<span class="name1_title"><a href="javascript:void(0);">郑瑞</a></span>
									<span class="name1_title">天际网任招聘经理职位</span>
								</li>
								<li>
									<span class="logo1"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/vick_14.png" /></a></span>
									<span class="name1_title"><a href="javascript:void(0);">郑瑞</a></span>
									<span class="name1_title">天际网任招聘经理职位</span>
								</li>
								<li>
									<span class="logo1"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/vick_14.png" /></a></span>
									<span class="name1_title"><a href="javascript:void(0);">郑瑞</a></span>
									<span class="name1_title">天际网任招聘经理职位</span>
								</li>
							</ul>
							<div class="clear"></div>
							<span class="more_people"><a href="http://www.tianji.com/p/visitors">显示更多访客</a></span>
						</div>
						-->
					</li>
					<li the-id="look_see1" class="message">
						<img src="http://static.tianji.com/images/home_new/message_icon.png">
						<div class="span_promit" style="display:none;">
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_a.png" /></span>
							<span class="promit_b">0</span>
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_c.png" /></span>
						</div>
						<div class="messages_list bg_red" style="display: none;" data-role="look_list1" >
							<span class="list_c"><img src="http://static.tianji.com/images/home_new/zhanshi_jian.png" /></span>
							<ul class="message_main">
								<li>
									<span><a href="http://www.tianji.com/messages">查看私信</a></span>
									<span class="promit_icon" style="display:none;">0</span>
								</li>
								<li>
									<span><a href="http://m.tianji.com/inbox/mrd">查看直邮</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/notices">查看通知</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/contacts/invitation">好友请求</a></span>
								</li>

								<li>
									<span><a href="http://www.tianji.com/comments">查看评论</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/contacts/fans">关注者</a></span>
								</li>
							</ul>
						</div>
					</li>
					<li class="tool"  the-id="look_see2">
						<img src="http://static.tianji.com/images/home_new/account_icon.png">
						<div class="messages_list bg_red" style="display:none;" data-role="look_list2" >
							<span class="list_c"><img src="http://static.tianji.com/images/home_new/zhanshi_jian.png" /></span>
							<div class="top_info">
								<span class="top_poster"><a href="http://www.tianji.com/p/${globalData.userId}"><img src="${globalData.normalPhoto!'http://image.tianji.com/img/global/port_default.gif'}" /></a></span>
								<span class="top_name"><a href="http://www.tianji.com/p/${globalData.userId}">${globalData.name}</a></span>
							</div>

							<ul class="message_main">
								<li>
									<span><a href="http://www.tianji.com/setting/account">帐户设置</a></span>
								</li>
								<li>
									<span><a href="http://s.tianji.com/pages/guide">用户指南</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/tools/share">分享工具</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/setting/locale/zh_CN">中文</a></span>
								</li>

							</ul>
							<span class="quit_btn"> <img src="http://static.tianji.com/images/home_new/reture_btn.jpg" /><a href="http://www.tianji.com/Logout">退出</a></span>
						</div>
					</li>
					<div class="messages_pop" style="display:none;">
						<span class="list_c"><img src="http://static.tianji.com/images/home_new/tishi_top.png" /></span>
						<span class="list_x"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/home_new/x.png" /></a></span>
						<p>
							2条新评论，<a href="javascript:void(0);">查看</a>
						</p>
						<p>
							2条新评论，<a href="javascript:void(0);">查看</a>
						</p>
					</div>
				</ul>
			</div>
		</div>
	<#else>
		<div class="header_menu_bg">
			<div class="header_menu">
				<span class="logo"><a href="http://www.tianji.com/home"><img src="http://static.tianji.com/images/home_new/logo.png" /></a></span>
				<ul class="left_menu" >
					<li>
						<a href="http://www.tianji.com/home">首页</a>
					</li>
					<li>
						<a href="http://www.tianji.com/p" >我的档案</a>
					</li>
					<li>
						<a href="http://www.tianji.com/contacts">联系人</a>
					</li>
					<li>
						<a class="current" href="http://job.tianji.com/sr/home?trk=jobs_top">职位</a>
					</li>
					<li>
						<a href="http://www.tianji.com/events">活动</a>
					</li>
					<li>
						<a href="http://www.tianji.com/mba">教育</a>
					</li>
				</ul>
				<div class="top_search" id="j_search_zone">
					<form action="http://search.tianji.com/psearch">
						<input type="text" autocomplete="off" data-placeholder="找人" name="header_keyword" class="find_people placeholder" />
						<input name="header_destination" type="hidden" value="name"/>
						<input class="find_people_button" src="http://static.tianji.com/images/home_new/top_search.jpg?1355900788" type="image" />
					</form>
					<div class="search_list bottom_bg none" id="j_search_box">
						<ul class="search_main">
						  <li class="current">
						    <a href="javascript:void(0);" data-range="name">按姓名搜索“<b></b>”</a>
						  </li>
						  <li>
						    <a href="javascript:void(0);" data-range="company">按公司搜索“<b></b>”</a>
						  </li>
						  <li>
						    <a href="javascript:void(0);" data-range="title">按职位搜索“<b></b>”</a>
						  </li>
						  <li>
						    <a href="javascript:void(0);" data-range="school">按学校搜索“<b></b>”</a>
						  </li>
						</ul>
						<div class="clear"></div>
						<span class="use_hign_search">
						  <a href="javascript:void(0);">使用高级搜索</a>
						</span>
				  </div>
	            </div>
				<ul class="right_menu">
					<li the-id="look_see" class="contacts">
						<img src="http://static.tianji.com/images/home_new/notice_icon.png">0
						<#--
						<div class="span_promit" style="display:none;">
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_a.png" /></span>
							<span class="promit_b">0</span>
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_c.png" /></span>
						</div>
						<div class="messages_list bg_red" style="display: none;" data-role="look_list" >
							<span class="list_c"><img src="http://static.tianji.com/images/home_new/zhanshi_jian.png" /></span>
							<ul class="contacts_main">
								<h5>最新访客</h5>
								<li>
									<span class="logo1"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/vick_14.png" /></a></span>
									<span class="name1_title"><a href="javascript:void(0);">郑瑞</a></span>
									<span class="name1_title">天际网任招聘经理职位</span>
								</li>
								<li>
									<span class="logo1"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/vick_14.png" /></a></span>
									<span class="name1_title"><a href="javascript:void(0);">郑瑞</a></span>
									<span class="name1_title">天际网任招聘经理职位</span>
								</li>
								<li>
									<span class="logo1"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/vick_14.png" /></a></span>
									<span class="name1_title"><a href="javascript:void(0);">郑瑞</a></span>
									<span class="name1_title">天际网任招聘经理职位</span>
								</li>
							</ul>
							<div class="clear"></div>
							<span class="more_people"><a href="http://www.tianji.com/p/visitors">显示更多访客</a></span>
						</div>
						-->
					</li>
					<li the-id="look_see1" class="message"  >
						<img src="http://static.tianji.com/images/home_new/message_icon.png">
						<div class="span_promit" style="display:none;">
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_a.png" /></span>
							<span class="promit_b">0</span>
							<span class="promit_a"><img src="http://static.tianji.com/images/home_new/promit_c.png" /></span>
						</div>
						<div class="messages_list bg_red" style="display: none;" data-role="look_list1" >
							<span class="list_c"><img src="http://static.tianji.com/images/home_new/zhanshi_jian.png" /></span>
							<ul class="message_main">
								<li>
									<span><a href="http://www.tianji.com/messages">查看私信</a></span>
									<span class="promit_icon" style="display:none;">0</span>
								</li>
								<li>
									<span><a href="http://m.tianji.com/inbox/mrd">查看直邮</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/notices">查看通知</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/contacts/invitation">好友请求</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/comments">查看评论</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/contacts/fans">关注者</a></span>
								</li>
							</ul>
						</div>
					</li>
					<li class="tool"  the-id="look_see2">
						<img src="http://static.tianji.com/images/home_new/account_icon.png">
						<div class="messages_list bg_red" style="display:none;" data-role="look_list2" >
							<span class="list_c"><img src="http://static.tianji.com/images/home_new/zhanshi_jian.png" /></span>
							<div class="top_info">
								<span class="top_poster"><a href="http://www.tianji.com/p/${globalData.userId}"><img src="${globalData.normalPhoto!'http://image.tianji.com/img/global/port_default.gif'}" /></a></span>
								<span class="top_name"><a href="http://www.tianji.com/p/${globalData.userId}">${globalData.name}</a></span>
							</div>

							<ul class="message_main">

								<li>
									<span><a href="http://www.tianji.com/setting/account">帐户设置</a></span>
								</li>
								<li>
									<span><a href="http://s.tianji.com/pages/guide">用户指南</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/tools/share">分享工具</a></span>
								</li>
								<li>
									<span><a href="http://www.tianji.com/setting/locale/en_US">English</a></span>
								</li>

							</ul>
							<span class="quit_btn"> <img src="http://static.tianji.com/images/home_new/reture_btn.jpg" /><a href="http://www.tianji.com/Logout">退出</a></span>
						</div>
					</li>
					<div class="messages_pop" style="display:none;">
						<span class="list_c"><img src="http://static.tianji.com/images/home_new/tishi_top.png" /></span>
						<span class="list_x"><a href="javascript:void(0);"><img src="http://static.tianji.com/images/home_new/x.png" /></a></span>
						<p>
							2条新评论，<a href="javascript:void(0);">查看</a>
						</p>
						<p>
							2条新评论，<a href="javascript:void(0);">查看</a>
						</p>
					</div>
				</ul>
			</div>
		</div>
	</#if>
	<script>
		$(document).ready(function() {
			$("[data-placeholder]").placeholder({attr:"data-placeholder"});
			$('.find_people_button').click(function(){
				if($("[data-placeholder]").attr("value")=="找人"){
					$("[data-placeholder]").val('');
				}
			});

			/*
			$('[the-id=look_see]').hover(function() {
				$(this).addClass('contacts_hover');
				$('[data-role=look_list]').css('display', 'block');
			}, function() {
				$(this).removeClass('contacts_hover');
				$('[data-role=look_list]').css('display', 'none');
			});*/
			$('.search_main li').hover(function(){
				$(this).addClass('current');
			},function(){
				$(this).removeClass('current');
			})
			$('[the-id=look_see1]').hover(function() {
				$(this).addClass('message_hover');
				$('[data-role=look_list1]').css('display', 'block');
			}, function() {
				$(this).removeClass('message_hover');
				$('[data-role=look_list1]').css('display', 'none');
			});
			$('[the-id=look_see2]').hover(function() {
				$(this).addClass('tool_hover');
				$('[data-role=look_list2]').css('display', 'block');
			}, function() {
				$(this).removeClass('tool_hover');
				$('[data-role=look_list2]').css('display', 'none');
			});
		});
	</script>
</#if>