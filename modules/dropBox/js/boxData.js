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
                'code': '男',
                'name': '男'
                },{
                    'code': '女',
                    'name': '女'
                }],
            'title': '性别'
        },
        'salary':{
            'data': [{
                    'code': '3000及以上',
                    'name': '3000及以上'
                },{
                    'code': '5000及以上',
                    'name': '5000及以上'
                },{
                    'code': '8000及以上',
                    'name': '8000及以上'
                },{
                    'code': '10000及以上',
                    'name': '10000及以上'
                },{
                    'code': '15000及以上',
                    'name': '15000及以上'
                },{
                    'code': '20000及以上',
                    'name': '20000及以上'
                },{
                    'code': '30000及以上',
                    'name': '30000及以上'
                },{
                    'code': '50000及以上',
                    'name': '50000及以上'
                }],
            'title': '期望薪资'
        },
        'companyLevel':{
            'data':[{
                    'code': '1-49人',
                    'name': '1-49人'
                },{
                    'code': '50-99人',
                    'name': '50-99人'
                },{
                    'code': '100-499人',
                    'name': '100-499人'
                },{
                    'code': '500-999人',
                    'name': '500-999人'
                },{
                    'code': '1000-9999人',
                    'name': '1000-9999人'
                },{
                    'code': '10000人以上',
                    'name': '10000人以上'
                }],
            'title': '公司规模'        
        },
        'companyProperty':{
        "data": [{
                "code": "国有企业",
                "name": "国有企业"
            },{
                "code": "私营.股份制企业",
                "name": "私营.股份制企业"
            },{
                "code": "外资.合资",
                "name": "外资.合资"
            },{
                "code": "非盈利.事业单位",
                "name": "非盈利.事业单位"
            },{
                "code": "其他",
                "name": "其他"
            }],
            'title': '公司性质'        
        },
        'workExperience':{
            'data': [{
                'code': '在读学生',
                'name': '在读学生'
            },{
                'code': '应届毕业生',
                'name': '应届毕业生'
            },{
                'code': '1年',
                'name': '1年'
            },{
                'code': '2年',
                'name': '2年'
            },{
                'code': '3年',
                'name': '3年'
            },{
                'code': '4年',
                'name': '4年'
            },{
                'code': '5年',
                'name': '5年'
            },{
                'code': '6年',
                'name': '6年'
            },{
                'code': '7年',
                'name': '7年'
            },{
                'code': '8年以上',
                'name': '8年以上'
            }],
            'title': '工作经验'
        },
        'eduBackground':{
            'data': [{
                'code': '学士',
                'name': '学士'
            },{
                'code': 'MBA/EMBA',
                'name': 'MBA/EMBA'
            },{
                'code': '博士/博士后',
                'name': '博士/博士后'
            },{
                'code': '硕士',
                'name': '硕士'
            },{
                'code': '大专',
                'name': '大专'
            },{
                'code': '高中',
                'name': '高中'
            },{
                'code': '中技',
                'name': '中技'
            },{
                'code': '初中',
                'name': '初中'
            },{
                'code': '小学',
                'name': '小学'
            },{
                'code': '其他学历',
                'name': '其他学历'
            }],
            'title': '学历'
        },
        'language':{
            'data': [{
                'code': '英语',
                'name': '英语'
            },{
                'code': '日语',
                'name': '日语'
            },{
                'code': '法语',
                'name': '法语'
            },{
                'code': '德语',
                'name': '德语'
            },{
                'code': '俄语',
                'name': '俄语'
            },{
                'code': '韩语',
                'name': '韩语'
            },{
                'code': '西班牙语',
                'name': '西班牙语'
            },{
                'code': '葡萄牙语',
                'name': '葡萄牙语'
            },{
                'code': '阿拉伯语',
                'name': '阿拉伯语'
            },{
                'code': '意大利语',
                'name': '意大利语'
            },{
                'code': '朝鲜语',
                'name': '朝鲜语'
            },{
                'code': '其他语种',
                'name': '其他语种'
            }],
            'title': '语言类别'
        },
        'lanLS':{
            'data': [{
                'code': '一般',
                'name': '一般'
            },{
                'code': '良好',
                'name': '良好'
            },{
                'code': '熟练',
                'name': '熟练'
            },{
                'code': '精通',
                'name': '精通'
            }],
            'title': '听说'
        },
        'lanRW':{
            'data': [{
                'code': '一般',
                'name': '一般'
            },{
                'code': '良好',
                'name': '良好'
            },{
                'code': '熟练',
                'name': '熟练'
            },{
                'code': '精通',
                'name': '精通'
            }],
            'title': '读写'
        },
        'salarySingle':{
            'data': [{
                    'code': '3000',
                    'name': '3000'
                },{
                    'code': '5000',
                    'name': '5000'
                },{
                    'code': '8000',
                    'name': '8000'
                },{
                    'code': '10000',
                    'name': '10000'
                },{
                    'code': '15000',
                    'name': '15000'
                },{
                    'code': '20000',
                    'name': '20000'
                },{
                    'code': '30000',
                    'name': '30000'
                },{
                    'code': '50000',
                    'name': '50000'
                }],
            'title': '职位薪资'
        }
    }
});