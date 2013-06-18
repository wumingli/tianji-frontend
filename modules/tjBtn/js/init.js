/*
*author:武明礼
*email:wumingli@sina.cn
*for:test
*developed at :2013/5/16 21:17
*Copyright 2013. All rights reserved.
*/
define(function(require, exports, modules){
    var sel = require('./selector');
    $('#p-data-wrap').tjSelector({
        name: 'city',
        css: {
            width: 100
        },
        method: 'load'
    });
    $('#p-data-wrap1').tjSelector({
        name: 'companyLevel',
        type: 'radio'
    });
    $('#p-data-wrap2').tjSelector({
        name: 'companyProperty',
        type: 'radio',
        css: {
            width: 300
        }
    });
    $('#p-data-wrap3').tjSelector({
        name: 'workExperience',
        type: 'radio'
    });
});