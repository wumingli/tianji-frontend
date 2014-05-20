module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var taskName = grunt.cli.tasks[0];
    var testing = taskName.match(/\d+/)[0];
    console.log('progressing task ' + grunt.cli.tasks[0] + '...');
    //industry json file create
    var jsonIndustry = grunt.file.read('modules/msPickMap/js/industryDataMap.js');
    eval(jsonIndustry);
    var arr = [];
    for (var v in industryDataMap) {
        for (v_1 in industryDataMap[v]) {
            if (typeof industryDataMap[v][v_1] === 'string') {
                arr.push('{"name":"' + industryDataMap[v][v_1] + '","code":"' + v_1 + '"}');
            }
            if (typeof industryDataMap[v][v_1] === 'object') {
                for (v_1_1 in industryDataMap[v][v_1]) {
                    arr.push('{"name":"' + industryDataMap[v][v_1][v_1_1] + '","code":"' + v_1_1 + '"}');
                }
            }
        }
    }
    var industryStr = '{"list":[' + arr.join(',') + ']}';
    grunt.file.write('.build/industry.json', industryStr);

    function reWriteFile(fileName) {
        var filePath = 'modules/' + fileName;
        var fileContent = grunt.file.read(filePath);
        fileContent = fileContent.replace(/{%version%}/g, pkg.version);
        grunt.file.write('.build/' + fileName, fileContent);
    }
    var aRewriteFiles = ['js/initJs.js', 'js/initCss.js', 'header2013/html/header.html', 'header2013/html/header_en.html', 'header2013/html/header_unlogin.html', 'header2013/html/header_en_unlogin.html', 'base/header.ftl'];
    for (var f = 0; f < aRewriteFiles.length; f++) {
        reWriteFile(aRewriteFiles[f]);
    }

    //job json file create
    var jsonJob = grunt.file.read('modules/msPickMap/js/jobDataMap.js');
    jsonJob = jsonJob.replace(/var *jobDataMap *= *|(\s+)|{|}/g, '').split(',');
    var arrJob = [];
    for (var i = 0, len = jsonJob.length; i < len; i++) {
        var c_n = jsonJob[i].split(':');
        arrJob.push('{"name":' + c_n[1] + ',"code":' + c_n[0] + '}');
    }
    var jobStr = '{"list":[' + arrJob.join(',') + ']}';
    grunt.file.write('.build/job.json', jobStr);

    //city json file create
    var jsonCity = grunt.file.read('modules/msPickMap/js/cityDataMap.js');
    eval(jsonCity);
    var arrCity = [];
    var cdm = cityDataMap['MapTwo'];

    for (var v in cdm) {
        arrCity.push('{"name":"' + cdm[v] + '","code":"' + v + '"}');
    }
    var cityStr = '{"list":[' + arrCity.join(',') + ']}';
    grunt.file.write('.build/city.json', cityStr);

    //dropBox json file create
    var arrDropBox = [
        ['workExperience', 'work'],
        ['eduBackground', 'diploma'],
        ['language', 'language'],
        ['lanRW', 'readingWritingSkill'],
        ['lanLS', 'listeningSpeakingSkill'],
        ['salarySingle', 'salary'],
        ['companyLevel', 'companyLevel']
    ];

    eval(grunt.file.read('modules/dropBox/js/boxData.js'));
    for (var i = 0; i < arrDropBox.length; i++) {
        var arrTemp = [];
        var tempData = TJ_box_data[arrDropBox[i][0]]['data'];

        for (var temp in tempData) {
            arrTemp.push('{"name":"' + tempData[temp]['name'] + '","code":"' + tempData[temp]['code'] + '"}');
        }
        var workStr = '{"list":[' + arrTemp.join(',') + ']}';
        grunt.file.write('.build/' + arrDropBox[i][1] + '.json', workStr);
    }

    //deploy object
    var severFn = function(sever) {
        return {
            options: {
                host: 'web1.env-40-' + sever + '.dev.tianji.com',
                username: 'root',
                privateKey: grunt.file.read(global.process.env.HOME + '/.ssh/integ.pem'),
                passphrase: ''
            },
            files: [{
                cwd: 'compress/',
                src: '*.war',
                filter: 'isFile',
                dest: '/opt/tianji/apps/'
            }]
        };
    }

    //grunt config
    grunt.config.init({
        //拷贝
        copy: {
            modules: {
                files: [{
                    expand: true,
                    cwd: 'modules/',
                    src: ['**/*.*'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            },
            common: {
                files: [{
                    expand: true,
                    cwd: 'modules/js/',
                    src: ['**/*.*'],
                    dest: 'dist/common/',
                    filter: 'isFile'
                }]
            },
            gallery: {
                files: [{
                    expand: true,
                    cwd: 'gallery/',
                    src: ['**/*.*'],
                    dest: 'dist/gallery/',
                    filter: 'isFile'
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: 'styles/',
                    src: ['*.css'],
                    dest: 'dist/styles/',
                    filter: 'isFile'
                }]
            },
            createdFiles: {
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['*.*'],
                    dest: 'dist/common/',
                    filter: 'isFile'
                }]
            },
            headerHtmls: {
                files: [{
                    expand: true,
                    cwd: '.build/header2013/html/',
                    src: ['*.*'],
                    dest: 'dist/header2013/html/'
                }]
            },
            initFiles: {
                files: [{
                    expand: true,
                    cwd: '.build/js/',
                    src: ['*.*'],
                    dest: 'dist/common/',
                    filter: 'isFile'
                }]
            },
            baseHeader: {
                files: [{
                    expand: true,
                    cwd: '.build/base/',
                    src: ['*.*'],
                    dest: 'dist/base/',
                    filter: 'isFile'
                }]
            }
        },
        //文件合并
        concat: {
            options: {
                separator: ';'
            },
            job: {
                src: ['modules/msPick/js/functionData.js', 'modules/msPick/js/msFunctionPlugin.js'],
                dest: 'dist/msPick/js/function.js'
            },
            city: {
                src: ['modules/msPick/js/cityData.js', 'modules/msPick/js/msCityPlugin.js'],
                dest: 'dist/msPick/js/city.js'
            },
            industry: {
                src: ['modules/msPick/js/industryData.js', 'modules/msPick/js/msIndustryPlugin.js'],
                dest: 'dist/msPick/js/industry.js'
            },
            jobMap: {
                src: ['modules/msPickMap/js/jobDataMap.js', 'modules/msPickMap/js/jobMapFn.js'],
                dest: 'dist/msPickMap/js/function.js'
            },
            cityMap: {
                src: ['modules/msPickMap/js/cityDataMap.js', 'modules/msPickMap/js/cityMapFn.js'],
                dest: 'dist/msPickMap/js/city.js'
            },
            industryMap: {
                src: ['modules/msPickMap/js/industryDataMap.js', 'modules/msPickMap/js/defaultMapFn.js'],
                dest: 'dist/msPickMap/js/industry.js'
            },
            newReJobMap: {
                src: ['modules/msPickMap/js/jobDataMap.js', 'modules/msPickMap/js/newReJobFn.js'],
                dest: 'dist/msPickMap/js/newReFunction.js'
            },
            newReCityMap: {
                src: ['modules/msPickMap/js/cityDataMap.js', 'modules/msPickMap/js/newReCityFn.js'],
                dest: 'dist/msPickMap/js/newReCity.js'
            },
            newReIndustryMap: {
                src: ['modules/msPickMap/js/industryDataMap.js', 'modules/msPickMap/js/newReIndustryFn.js'],
                dest: 'dist/msPickMap/js/newReIndustry.js'
            },
            dropBox: {
                src: ['modules/dropBox/js/boxData.js', 'modules/dropBox/js/dropBox.js'],
                dest: 'dist/dropBox/js/tjDropBox.js'
            },
            header_login: {
                //src: ['gallery/jquery-mCustomScrollbar-concat.min.js', 'gallery/jquery-tipsy.js', 'modules/header2013/js/header2013.js', 'modules/popup-login/js/tj-popup-login.js', 'modules/miniProfile/js/miniCard.js'],
                src: ['gallery/jquery-mCustomScrollbar-concat.min.js', 'gallery/jquery-tipsy.js', 'modules/header2013/js/header2013.js', 'modules/popup-login/js/tj-popup-login.js', 'gallery/jquery.lazyload.min.js', 'modules/js/img-lazyload.js'],
                dest: 'dist/header2013/js/header-all.js'
            },
            header_unlogin: {
                src: ['gallery/jquery-tipsy.js', 'modules/header2013/js/header2013.js', 'modules/popup-login/js/tj-popup-login.js'],
                dest: 'dist/header2013/js/header-unlogin.js'
            },
            header_css: {
                src: ['modules/header2013/css/new_header.css', 'styles/jquery_mCustomScrollbar.css'],
                dest: 'dist/header2013/css/header-all.css'
            }
        },
        //JS文件压缩
        uglify: {
            options: {
                banner: '/* build at <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n'
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.js', '!common/*.js', '!**/*.min.js', 'common/*.min.js', '!gallery/*.min.js', 'common/init*.js'],
                    dest: 'dist/',
                    ext: '.min.js'
                }]
            }
        },
        //样式表压缩
        cssmin: {
            public: {
                options: {
                    banner: '/*css minify file, build at <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>*/'
                },
                expand: true,
                cwd: 'dist/',
                src: ['**/*.css'],
                dest: 'dist/',
                ext: '.min.css'
            }
        },
        //文件打包
        compress: {
            createWar: {
                options: {
                    mode: 'zip',
                    archive: 'compress/tianji-frontend-' + pkg.version + '.war'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*']
                }]
            },
            createZip: {
                options: {
                    mode: 'zip',
                    archive: 'compress/tianji-frontend-' + pkg.version + '.zip'
                },
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['*.*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: ['modules/**/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: ['styles/**/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: ['gallery/**/*']
                }]
            }
        },
        //文件部署
        scp: {
            release: {
                options: {
                    host: 'repository.tianji.com',
                    username: 'root',
                    privateKey: grunt.file.read(global.process.env.HOME + '/.ssh/id_rsa'),
                    passphrase: ''
                },
                files: [{
                    cwd: 'compress/',
                    src: '**/*.*',
                    filter: 'isFile',
                    dest: '/home/jsrepository/js/tianji-frontend/' + pkg.version
                }]
            },
            qa: {
                options: {
                    host: 'www11.qa.tianji.com',
                    username: 'root',
                    privateKey: grunt.file.read(global.process.env.HOME + '/.ssh/integ.pem'),
                    passphrase: ''
                },
                files: [{
                    cwd: 'compress/',
                    src: '*.war',
                    filter: 'isFile',
                    dest: '/var/front/deploy/'
                }]
            },
            401: severFn(1),
            403: severFn(3),
            405: severFn(5),
            406: severFn(6),
            407: severFn(7),
            409: severFn(9),
            4010: severFn(10),
            4013: severFn(13),
            4014: severFn(14),
            4016: severFn(16)
        },
        //发布
        release: {
            options: {
                bump: false, //default: true
                file: 'package.json', //default: package.json
                add: true, //default: true
                commit: true, //default: true
                tag: true, //default: true
                push: true, //default: true
                pushTags: true, //default: true
                npm: false, //default: true
                tagName: 'tianji-frontend-<%= version%>', //default: '<%= version %>'
                commitMessage: 'release <%= version%>', //default: 'release <%= version %>'
                tagMessage: 'Version <%= version%>' //default: 'Version <%= version %>'
            }
        },
        //删除生成的目录
        clean: {
            build: ['dist', 'compress'],
            tempDir: ['.build'],
            publicRep: ['dist/public', 'dist/js']
        },
        //压缩图片
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['*.png'],
                    dest: 'dist/imagesTest'
                }]
            }
        }
    });
    //加载任务
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-scp');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //执行任务
    grunt.registerTask('test', [], function() {
        var pkg1 = grunt.file.read('package.json')
        grunt.file.write('package1.json', pkg1.replace('version', pkg.version));
        console.log('test end.');
    });
    grunt.registerTask('version', function() {
        console.log(pkg.version);
    });
    grunt.registerTask('clear', ['clean']);
    grunt.registerTask('build', ['clean:build', 'copy', 'concat', 'uglify', 'cssmin', 'clean:publicRep', 'compress', 'clean:tempDir']);
    grunt.registerTask('deploy' + testing, ['clean:build', 'copy', 'concat', 'uglify', 'cssmin', 'compress', 'scp:' + testing, 'clean:tempDir']);
    grunt.registerTask('rel', ['clean:build', 'copy', 'concat', 'uglify', 'cssmin', 'clean:publicRep', 'compress', 'release', 'scp:release', 'clean:tempDir']);
}