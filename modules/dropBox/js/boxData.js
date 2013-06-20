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
            title: '性别'
        },
        'salary':{
            'data': [{
                    'code': '0000001000',
                    'name': '1000元/月以下'
                },{
                    'code': '0100002000',
                    'name': '1000-2000元/月'
                },{
                    'code': '0200104000',
                    'name': '4001-6000元/月'
                },{
                    'code': '0600108000',
                    'name': '6001-8000元/月'
                },{
                    'code': '0800110000',
                    'name': '8001-10000元/月'
                },{
                    'code': '1000115000',
                    'name': '10001-15000元/月'
                },{
                    'code': '1500125000',
                    'name': '15000-25000元/月'
                },{
                    'code': '2500199999',
                    'name': '25000元/月以上'
                },{
                    'code': '0000000000',
                    'name': '保密'
                }],
            'title': '工资水平'
        },
        'companyLevel':{
            'data':[{
                    'code': '101',
                    'name': '20人以下'
                },{
                    'code': '102',
                    'name': '20-99人'
                },{
                    'code': '103',
                    'name': '100-499人'
                },{
                    'code': '104',
                    'name': '500-999人'
                },{
                    'code': '105',
                    'name': '1000-9999人'
                },{
                    'code': '106',
                    'name': '10000人以上'
                }],
            'title': '公司规模'        
        },
        'companyProperty':{
            'data': [{
                    'code': '201',
                    'name': '民营'
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
                    'name': '代表处'
                },{
                    'code': '206',
                    'name': '合资'
                },{
                    'code': '207',
                    'name': '股份制企业'
                },{
                    'code': '208',
                    'name': '上市公司'
                },{
                    'code': '209',
                    'name': '国家机关'
                },{
                    'code': '210',
                    'name': '事业单位'
                },{
                    'code': '211',
                    'name': '其他'
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
        },
        'eduBackground':{
            'data': [{
                'code': '401',
                'name': '初中以下'
            },{
                'code': '402',
                'name': '高中'
            },{
                'code': '403',
                'name': '大专'
            },{
                'code': '404',
                'name': '本科'
            },{
                'code': '405',
                'name': '硕士'
            },{
                'code': '406',
                'name': '博士'
            },{
                'code': '407',
                'name': '博士后及以上'
            },{
                'code': '408',
                'name': '其他'
            }],
            'title': '学历'
        }
    }
});