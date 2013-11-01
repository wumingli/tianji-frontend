<#if !(globalData.locale)??>
	<#assign globalData={
		"locale":"zh_CN"
	}/>
</#if>
<#assign ftnav={
	"zh_CN":[{
		"text":"关于天际",
		"url":"http://s.tianji.com/html/about.html"
	},	{
		"text":"联系方式",
		"url":"http://s.tianji.com/html/contact.html"
	},	{
		"text":"对外合作",
		"url":"http://s.tianji.com/html/link_out.html" 
	},	{
		"text":"合作伙伴",
		"url":"http://s.tianji.com/html/link.html" 
	}
	,	{
		"text":"手机客户端",
		"url":"http://m.tianji.com?ga_from=footer" 
	},	{
		"text":"天际Blog",
		"url":"http://blog.tianji.com"
	},	{
		"text":"招贤纳士",
		"url":"http://s.tianji.com/html/job.html" 
	},	{
		"text":"服务条款",
		"url":"http://s.tianji.com/html/term.html"
	},	{
		"text":"隐私政策",
		"url":"http://s.tianji.com/html/privacy.html"
	},	{
		"text":"问题建议",
		"url":"http://www.tianji.com/Report"
	}],
	"en_US":[{
		"text":"About Tianji",
		"url":"http://www.tianji.com/help/zh-gb/about2.htm"
	},	{
		"text":"Privacy",
		"url":"http://www.tianji.com/help/en/privacy_en.htm"
	},	{
		"text":"Feedback",
		"url":"http://www.tianji.com/Report"
	},	{
		"text":"Viadeo.com",
		"url":"http://www.viadeo.com/"
	}]
}/>
<#assign copyRight={
	"zh_CN":"北京盈科时代信息技术有限公司",
	"en_US":"Beijing Yingkeshidai Information Technology Co. Ltd."
}/>

<div id="footer">

    <#list ftnav[globalData.locale] as item>
        <a href="${item.url}" target="_blank" title="${item.text}">${item.text}</a>
    </#list>
    <br>
    Copyright © 2004-2013　${copyRight[globalData.locale]}
    <a target="_blank" href="http://www.viadeo.com" class="font_cl">Viadeo.com</a>
    <br><a target="_blank" href="http://www.miibeian.gov.cn" class="font_cl">京ICP证050525号</a> 京公网安备110105002161号
    <a class="footer_icon" target="_blank" href="http://www.hd315.gov.cn/beian/view.asp?bianhao=010202005102400013"><img src="http://www.tianji.com/images/login_imgs_36.gif?1373857427"></a>

</div>