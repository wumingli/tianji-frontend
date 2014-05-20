<@compress single_line=false>
<#assign c=JspTaglibs["http://java.sun.com/jstl/core"]>
<#assign globalData = navigationDataService.getNavigationData()/>
<#import "/spring.ftl" as spring />
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<@block name ="title-meta"/>
	<link rel="shortcut icon" type="image/x-icon" href="http://image.tianji.com/tjs/recruiting/images/tianji.ico?v=20140106" />
	<link rel="stylesheet" type="text/css" href="http://image.tianji.com/tjs/styles/base.css" />
	<script type="text/javascript" src="http://image.tianji.com/tjs/gallery/jquery-1.7.2.min.js"></script>
	<@block name="head"/>
</head>
<body>

	<!-- Google Tag Manager -->
	<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-53RPVC"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-53RPVC');</script>
	<!-- End Google Tag Manager -->

	<#include 'header.ftl'/>
	<@block name="body"/>
	<div id="footer_bg"><#include 'footer.ftl'/></div>
	<@block name="extra"></@block>

	<!--GA Code start-->
	<script type="text/javascript">
		function getCharByNum(arr,days) {
			for (var i = arr.length-1; i > -1; i--) {
				var reg = /\[(.+)\](\d+)/;
				var m = arr[i].match(reg);
				if (m == null) return 'a';
				if (days >=parseInt(m[2]) )return m[1];
			}
		}
		var var1="Anonymous",var2="Anonymous",var3="Anonymous",var4="Anonymous",var5="Anonymous",userBasic=null;
		<#if globalData.userId>
		window.CURRENT_USER_ID = "${globalData.userId}";
		var userBasic={
				"regTime":new Date("${globalData.regTime?string("yyyy/MM/dd")}"),
				"subReferer":"${globalData.subReferer}",
				"friendCount":${globalData.friendCount},
				"userId":${globalData.userId},
				"active":${globalData.active?string}
			};
		</#if>
		if(userBasic){
			var days=Math.floor((new Date().getTime()-userBasic.regTime.getTime())/1000/3600/24);
			var regTime = ['[0Day]0', '[1-3Days]1','[4-7Days]4', '[8-14Days]8','[15-30Days]15','[31-90Days]31','[91-365Days]91','[1Year]366','[2Years]731','[3Years]1096','[4Years]1461','[5Years]1826','[6Years]2191'];
			var friendsCount=['[0]0','[1]1','[2-5]2','[6-10]6','[11-20]11','[21-50]21','[51-100]51','[101-200]101','[201-500]201','[>500]500'];
			var1='Normal';
			if (days <= 30) {
				var1='Recent';
			}
			var2=userBasic.subReferer||'null';
	        if(userBasic.active){
				var3="Active";
			}else{
				var3="Nonactive";
			}
			var4=getCharByNum(regTime,days);
			var5=getCharByNum(friendsCount,userBasic.friendCount);
		}

	   var _gaq = _gaq || [];
	   _gaq.push(['_setAccount', 'UA-4345674-2']);
	   _gaq.push(['_setDomainName', 'tianji.com']);
	   _gaq.push(['_setCampaignCookieTimeout', 0]);
	   _gaq.push(['_addIgnoredRef', 'tianji']);
	   _gaq.push(['_addOrganic', 'soso', 'w']);
	   _gaq.push(['_addOrganic', 'sogou', 'query']);
	   _gaq.push(['_addOrganic', 'youdao', 'q']);

	  _gaq.push(['_setCustomVar', 1, 'M-type', var1, 2]);
	   _gaq.push(['_setCustomVar', 2, 'M-orig', var2, 2]);
	  // _gaq.push(['_setCustomVar', 3, 'M-idrange', var3, 2]);
	   _gaq.push(['_setCustomVar', 3, 'M-activness', var3, 2]);
	   _gaq.push(['_setCustomVar', 4, 'M-oldness', var4, 2]);
	   _gaq.push(['_setCustomVar', 5, 'M-NetworkSize', var5, 2]);

	   _gaq.push(['_trackPageview']);
	   (function() {
	   var ga = document.createElement('script');
	    ga.type ='text/javascript';
	     ga.async = true;
	     //ga.src = ('https:' == document.location.protocol ? 'https://ssl' :'http://www') + '.google-analytics.com/ga.js';
	       ga.src = ('https:' == document.location.protocol ? 'https://login.tianji.com/cas/js/ga.js':'http://image.tianji.com/extjs/google/ga.js');
	     var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga, s);
	     })();
	   var _bdhmProtocol = (("https:" == document.location.protocol) ? "https://" : " http://");
	   document.write(unescape("%3Cscript src='" + _bdhmProtocol +"hm.baidu.com/h.js%3Fce06253aba52736c15a80e9b50ff017a' type='text/javascript'%3E%3C/script%3E"));
    </script>
  	<!--GA Code end-->

  	
 
</body>
</html>
</@compress>