/*
*author:武明礼
*email:wumingli@sina.cn
*for:test
*developed at :2013/5/16 21:17
*Copyright 2013. All rights reserved.
*/
define(function(require, exports, modules){
    var sel = require('./dropBox');
    $('#p-data-wrap').dropBox({
        name: 'sex'
    });
    $('#p-data-wrap1').dropBox({
        name: 'salary',
        init: [{
            code: '0600108000',
            name: '6001-8000元/月'
        }]
    });
    $('#p-data-wrap2').dropBox({
        name: 'companyProperty',
        required: true
    });
    $('#p-data-wrap3').dropBox({
        name: 'workExperience',
        required: true
    });
    $('#p-data-wrap4').dropBox({
        name: 'companyLevel'
    });
    $('#p-data-wrap5').dropBox({
        name: 'eduBackground',
        init: [{
            code: '404',
            name: '本科'
        }]
    });
    $('#testForm').submit(function (){
        return $(this).subDropList();
    });
});