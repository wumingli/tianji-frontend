/*
 * author: wumingli
 * author email: wumingli@tianji.com
 * for: global header of tianji site
 * developed start at : 2013/5/19 11:52
 * Copyright tianji 2013. All rights reserved.
 */

/**
 * [文档加载完成时要执行的代码]
 */
$(function() {
    //计时器
    var info_timer = null;
    //当前链接地址
    var locLink = window.location.href;
    var isIE6 = ($.browser.msie && $.browser.version == 6.0);
    //IE6透明
    if (isIE6 && typeof DD_belatedPNG != 'undefined') {
        DD_belatedPNG.fix('.png_ie6');
    }
    //tipsy
    $().tipsy && $('.auther_icon').tipsy({
        gravity: 's',
        live: true
    });
});
/**
 * [立即执行的代码]
 */
(function() {
    //GA检测
    if (typeof _gaq == 'undefined') {
        _gaq = [];
    }
    window.addGaTrach = function(ga_category, ga_action, ga_area) {
        _gaq.push(['_trackEvent', ga_category, ga_action, ga_area]);
    }
})();