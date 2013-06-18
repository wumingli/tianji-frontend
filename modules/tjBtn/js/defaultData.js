/*
*author:武明礼
*email:wumingli@sina.cn
*for:test
*developed at :2013/5/16 21:17
*Copyright 2013. All rights reserved.
*/
define(function(require, exports, modules){
    return {
        'sex':{
            'data': [{
                'code': 'male',
                'name': '男'
                },{
                    'code': 'famale',
                    'name': '女'
                }],
            title: '请选择性别'
        },
        'salary':{
            'data': [{
                    'code': '1001',
                    'name': '3000以下'
                },{
                    'code': '1002',
                    'name': '3000～5000'
                },{
                    'code': '1003',
                    'name': '5000～10000'
                },{
                    'code': '1004',
                    'name': '南阳'
                }],
            'title': '城市'
        },
        'companyLevel':{
            'data':[{
                    'code': '101',
                    'name': '1～50人'
                },{
                    'code': '102',
                    'name': '51～100人'
                },{
                    'code': '103',
                    'name': '100～500人'
                },{
                    'code': '104',
                    'name': '500人以上'
                }],
            'title': '公司规模'        
        },
        'companyProperty':{
            'data': [{
                    'code': '201',
                    'name': '私人企业'
                },{
                    'code': '202',
                    'name': '国有企业'
                },{
                    'code': '203',
                    'name': '外商独资'
                },{
                    'code': '204',
                    'name': '事业单位'
                },{
                    'code': '205',
                    'name': '不知道什么单位'
                }],
            'title': '公司性质'        
        },
        'workExperience':{
            'data': [{
                'code': '301',
                'name': '实习生'
            },{
                'code': '302',
                'name': '1～2年'
            },{
                'code': '303',
                'name': '3～5年'
            },{
                'code': '304',
                'name': '5～10年'
            },{
                'code': '305',
                'name': '10年以上'
            }],
            'title': '工作年限'
        }
    }
});