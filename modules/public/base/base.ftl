<@compress single_line=false>
<#assign c=JspTaglibs["http://java.sun.com/jstl/core"]>
<#assign globalData = navigationDataService.getNavigationData()/>
<#if !(globalData.locale??)>
	<#assign globalData={"locale":"zh_CN"}/>
</#if>
<#import "/spring.ftl" as spring />

<#assign defaultTitle = {"zh_CN":"您的人际网络比您想象的更强大！","en_US":"Your network is more powerful than you think!"} />

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>${defaultTitle[globalData.locale]}</title>
	<meta name="keywords" content="精英招聘,网络招聘, 社交网络招聘" />
	<meta name="description" content="精英招聘依托于中国最大的职业社交网站天际网,利用社交网络招聘,不仅可以将职位通过人际网络传递至数百万目标人群,还可以通过动态多维度考量候选人,为聘用提供依据." />
	<link rel="stylesheet" type="text/css" href="http://image.tianji.com/tjs/styles/base.css" />
	<script type="text/javascript" src="http://image.tianji.com/tjs/gallery/jquery-1.7.2.min.js"></script>
	<@block name="head"/>
</head>
<body>
	<#include 'header.ftl'/>
	<@block name="body"/>
	<div id="footer_bg"><#include 'footer.ftl'/></div>
	<@block name="extra"></@block>
</body>
</html>
</@compress>
