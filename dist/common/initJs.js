/* build at 2013-06-17 10:19:15 */
!function(){var a=document.getElementById("pageScriptInit").src,b="",c={};if(-1==a.indexOf("dynamic")&&a.indexOf("?")>-1){b=a.substring(a.indexOf("?")+1).split("&"),c={"function.min":"?v=1.0.1","city.min":"?=1.0.1","industry.min":"?=1.0.1",initFunction:"?=1.0.1"};for(var d=0;d<b.length;d++){var e=b[d].split("=");if("clearCache"!=e[0]){var f=e[0].indexOf(".js")>0?e[0]:e[0]+".js",g=e[1].indexOf("http")>-1?"":"http://",h=e[0]in c?c[e[0]]:"";$LAB.script(g+e[1]+f+h).wait()}}}}();