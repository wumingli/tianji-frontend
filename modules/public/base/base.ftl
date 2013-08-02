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
	<link rel="shortcut icon" type="image/x-icon" href="http://image.tianji.com/ideal/common/img/tianji.ico" />
	<link rel="stylesheet" type="text/css" href="http://image.tianji.com/tjs/styles/base.css" />
	<script type="text/javascript" src = "http://image.tianji.com/tjs/gallery/jquery-1.7.2.min.js"></script>
	<@block name="head"/>
</head>
<body>
	<#include 'header.ftl'/>
	<@block name="body"/>
	<div id="footer"><#include 'footer.ftl'/></div>
	<@block name="extra"></@block>
</body>
</html>
</@compress>