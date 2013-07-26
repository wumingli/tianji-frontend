<@compress single_line=false>
<#assign globalData = navigationDataService.getNavigationData()/>
<#if !(globalData.locale??)>
  <#assign globalData={"locale":"zh_CN"}/>
</#if>
<#assign common=['reset','base','grids','global']/>
<#if ftl??>
  <#list ftl as items>
    <#include items+'.ftl'>
  </#list>
</#if>
<#import "/spring.ftl" as spring />
<#assign defaultTitle={
  "zh_CN":"您的人际网络比您想象的更强大！", "en_US":"Your network is more powerful than you think!"
}/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
	<@block name="head">
		<title>${pageTitle!defaultTitle[globalData.locale]}</title>
		<link rel="shortcut icon" type="image/x-icon" href="http://image.tianji.com/ideal/common/img/tianji.ico" />
		<#if docFix=="fix">
			<link rel="stylesheet" type="text/css" href="http://image.tianji.com/ideal/common/css/new_base.css" media="all">
		<#else>
			<link rel="stylesheet" type="text/css" href="http://image.tianji.com/ideal/common/css/base.css" media="all">
		</#if>
		<link rel="stylesheet" type="text/css" href="http://www.tianji.com/stylesheets/all.css" media="all"/>
		<link rel="stylesheet" type="text/css" href="http://image.tianji.com/ideal/job/new/css/new_header.css" media="all">
		<#if css??>
			<#list css as x>
			<#--<link rel="stylesheet" type="text/css" href="${baseUrl}/css/${x}.css" media="all">-->
			<link rel="stylesheet" type="text/css" href="http://image.tianji.com/ideal/job/new/css/${x}.css" media="all">
			</#list>
		</#if>
		<script type="text/javascript" src="http://image.tianji.com/ideal/common/js/require-jquery.js"></script>
		<script type="text/javascript" src="http://image.tianji.com/ideal/common/js/common.js"></script>
		<script src="http://static.tianji.com/assets/application-2e74a3ebda2d8ccd3023c4b786583a37.js" type="text/javascript"></script>
		<#--
		<script src="http://image.tianji.com/ideal/common/js/assets_header.js" type="text/javascript"></script>
		-->
		<#if js??>
			<#list js as x>
			<script type="text/javascript" src="${baseUrl}/js/${x}.js"></script>
			</#list>
		</#if>
		<script type="text/javascript">
			var defaultImg=function(obj){
					obj.src='http://image.tianji.com/img/global/port_default.gif';
					obj.onerror=null;
				},
				locale="${globalData.locale}";
				
				require({
					baseUrl:'http://image.tianji.com/ideal/',
					paths:{
						common:'common/js',
						contacts:'contacts/js',
						message:'message/js'
					}
				});
		</script>
	</@block>
</head>
<body>
	<div id="doc"<#if docClass?exists> class="${docClass}"</#if>>
		<div id="hd"><@block name="header"><#include 'header.ftl'/></@block></div>
		<div id="bd"><@block name="body"/></div>
		<div id="footer_bg">
			<div id="ft"><@block name="footer"><#include 'footer.ftl'/></@block></div>
		</div>
	</div>
	<script type="text/javascript" src="http://image.tianji.com/ideal/common/js/confirm.js"></script>
	<@block name="extra"></@block>
<!-- Begin comScore Tag -->
	<script>
		var _comscore = _comscore || [];
		comscore.push({ c1: "2", c2: "10136995" });
		(function() {
			var s = document.createElement("script"), el =document.getElementsByTagName("script")[0]; s.async = true;
			s.src = (document.location.protocol == "https:" ? "https://login.tianji.com/cas/js/beacon.js" : "http://image.tianji.com/extjs/comscore/beacon.js");
			el.parentNode.insertBefore(s, el);
		})();
	</script>

	<noscript><img src="http://b.scorecardresearch.com/p?c1=2&c2=10136995&cv=2.0&cj=1" alt /></noscript>
	<!-- End comScore Tag -->
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
  <#if globalData.locale=="en_US">
  <script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en',
    autoDisplay: false,
    multilanguagePage: true,
    floatPosition: google.translate.TranslateElement.FloatPosition.BOTTOM_RIGHT
    });
  }
  </script><script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
  </#if>
<div><script>-function(d){var a=location.protocol,e=(a=="https:");d.write("<script src='"+(e?'https':'http')+"://file.ipinyou.com"+(e?"":".cn")+"/js/fk_3432_0.js'><\/script>");}(document);</script><noscript><img src="//optimus.ipinyou.com/statsadv?v=1&owId=3432&owLabelId=" style="display:none;"></noscript></div>
</body>
</html>
</@compress>