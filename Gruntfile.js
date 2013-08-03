module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    //生成js mapVersion
    var mapStr = "/*dynamic generate js content for mapping version at  "+ grunt.template.today("yyyy-mm-dd hh:MM:ss") +" */\n" 
                 + "var map = {\n"
                     //you can copy the line below ,and replace industry.min with your fileName
                     //+ "\n'industry.min': '?v=" + pkg.version+"'," 
                     + "\n'industry.min': '?v=" + pkg.version+"'," 
                     + "\n'city.min': '?v=" + pkg.version+"'," 
                     + "\n'function.min': '?v=" + pkg.version+"'"
                 + "\n};";
    grunt.file.write( '.build/mapVersion.js', mapStr);
    //生成css mapVersion
    var cssMapStr = "/*dynamic generate js content for mapping version at  "+ grunt.template.today("yyyy-mm-dd hh:MM:ss") +" */\n" 
                 + "var cssMap = {\n"
                     //you can copy the line below ,and replace styleIndex with your fileName,do not forget to delete comma of the final line
                     //+ "\n'styleIndex': '?v=" + pkg.version+"'," 
                     + "\n'msPickStyle.min': '?v=" + pkg.version+"'"                     
                 + "\n};";
    grunt.file.write( '.build/cssMapVersion.js', cssMapStr);

    //industry json file create
    var jsonIndustry = grunt.file.read('modules/msPickMap/js/industryDataMap.js');
    eval(jsonIndustry);
    var arr = [];
    for (var v in industryDataMap){
        for(v_1 in industryDataMap[v]){
            if(typeof industryDataMap[v][v_1] === 'string'){
                arr.push('{"name":"' + industryDataMap[v][v_1] + '","code":"' + v_1 + '"}');
            }
            if(typeof industryDataMap[v][v_1] === 'object'){
                for(v_1_1 in industryDataMap[v][v_1]){
                arr.push('{"name":"' + industryDataMap[v][v_1][v_1_1] + '","code":"' + v_1_1 + '"}');
                }
            }
        }
    }
    var industryStr = '{"list":[' + arr.join(',') + ']}';
    grunt.file.write( '.build/industry.json', industryStr);

    //job json file create
    var jsonJob = grunt.file.read('modules/msPickMap/js/jobDataMap.js');
    jsonJob = jsonJob.replace(/var *jobDataMap *= *|(\s+)|{|}/g,'').split(',');
    var arrJob = [];
    for (var i = 0, len = jsonJob.length; i < len; i++){
        var c_n = jsonJob[i].split(':');
        arrJob.push('{"name":' + c_n[1] + ',"code":' + c_n[0] + '}');
    }
    var jobStr = '{"list":[' + arrJob.join(',') + ']}';
    grunt.file.write( '.build/job.json', jobStr);

    //city json file create
    var jsonCity = grunt.file.read('modules/msPickMap/js/cityDataMap.js');
    eval(jsonCity);
    var arrCity = [];
    var cdm = cityDataMap['MapTwo'];

    for (var v in cdm){
        arrCity.push('{"name":"' + cdm[v] + '","code":"' + v + '"}');
    }
    var cityStr = '{"list":[' + arrCity.join(',') + ']}';
    grunt.file.write( '.build/city.json', cityStr);

    //grunt config
    grunt.config.init({
        //拷贝
        copy :{
            modules:{
                files :[{
                    expand: true,
                    cwd: 'modules/',
                    src: ['**/*.*'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            },
            public:{
                files :[{
                    expand: true,
                    cwd: 'modules/public/',
                    src: ['**/*.*'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            },
            common:{
                files :[{
                    expand: true,
                    cwd: 'modules/public/js/',
                    src: ['**/*.*'],
                    dest: 'dist/common/',
                    filter: 'isFile'
                }]
            },
            gallery:{
                files :[{
                    expand: true,
                    cwd: 'gallery/',
                    src: ['**/*.*'],
                    dest: 'dist/gallery/',
                    filter: 'isFile'
                }]
            },
            base:{
                files :[{
                    expand: true,
                    cwd: 'modules/public/base/',
                    src: ['**/*.*'],
                    dest: 'dist/base/',
                    filter: 'isFile'
                }]
            },
            styles:{
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
            }
        },
        //文件合并
        concat : {
            options: {
                separator: ';'
            },
            job : {
                src : ['modules/msPick/js/functionData.js', 'modules/msPick/js/msFunctionPlugin.js'],
                dest: 'dist/msPick/js/function.js'
            },
            city : {
                src : ['modules/msPick/js/cityData.js', 'modules/msPick/js/msCityPlugin.js'],
                dest: 'dist/msPick/js/city.js'
            },
            industry : {
                src : ['modules/msPick/js/industryData.js', 'modules/msPick/js/msIndustryPlugin.js'],
                dest: 'dist/msPick/js/industry.js'
            },
            jobMap : {
                src : ['modules/msPickMap/js/jobDataMap.js', 'modules/msPickMap/js/jobMapFn.js'],
                dest: 'dist/msPickMap/js/function.js'
            },
            cityMap : {
                src : ['modules/msPickMap/js/cityDataMap.js', 'modules/msPickMap/js/cityMapFn.js'],
                dest: 'dist/msPickMap/js/city.js'
            },
            industryMap : {
                src : ['modules/msPickMap/js/industryDataMap.js', 'modules/msPickMap/js/defaultMapFn.js'],
                dest: 'dist/msPickMap/js/industry.js'
            },
            newReJobMap : {
                src : ['modules/msPickMap/js/jobDataMap.js', 'modules/msPickMap/js/newReJobFn.js'],
                dest: 'dist/msPickMap/js/newReFunction.js'
            },
            newReCityMap : {
                src : ['modules/msPickMap/js/cityDataMap.js', 'modules/msPickMap/js/newReCityFn.js'],
                dest: 'dist/msPickMap/js/newReCity.js'
            },
            newReIndustryMap : {
                src : ['modules/msPickMap/js/industryDataMap.js', 'modules/msPickMap/js/newReIndustryFn.js'],
                dest: 'dist/msPickMap/js/newReIndustry.js'
            },
            jsInit : {
                src : ['dist/common/mapVersion.js', 'modules/public/js/initJs.js'],
                dest: 'dist/common/initJs.min.js'
            },
            cssInit :  {
                src : ['dist/common/cssMapVersion.js', 'modules/public/js/initCss.js'],
                dest: 'dist/common/initCss.min.js'
            }
        },
        //JS文件压缩
        uglify : {
            options : {
                banner : '/* build at <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n'
            },
            all : {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.js', '!common/*.js', '!**/*.min.js', 'common/*.min.js', '!gallery/*.js'],
                    dest: 'dist/',
                    ext: '.min.js'
                }]
            }
        },
        //样式表压缩
        cssmin: {
          public: {
            options:{
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
              mode : 'zip',
              archive: 'compress/dist/tianji-frontend-' + pkg.version + '.war'
            },
            files: [
              {expand: true, cwd: 'dist/', src: ['**/*']}
            ]
          },
          createZip: {
            options: {
              mode : 'zip',
              archive: 'compress/source/' + pkg.version + '.zip'
            },
            files: [
              {expand: true, cwd: '.', src: ['*.*']},
              {expand: true, cwd: '.', src: ['modules/**/*']},
              {expand: true, cwd: '.', src: ['styles/**/*']},
              {expand: true, cwd: '.', src: ['gallery/**/*']}
            ]
          }
        },
        /*
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
                    cwd: 'compress/dist/',
                    src: '*.war',
                    filter: 'isFile',
                    // path on the server
                    dest: '/home/jsrepository/js/tianji-frontend/' + pkg.version
                }]
            },            
            deploy: {
                options: {
                    //host: 'web1.env-40-6.dev.tianji.com',
                    host: 'web1.env-40-7.dev.tianji.com',
                    username: 'root',
                    privateKey: grunt.file.read(global.process.env.HOME + '/.ssh/id_rsa'),
                    passphrase: ''
                },
                files: [{
                    cwd: 'compress/dist/',
                    src: '*.war',
                    filter: 'isFile',
                    // path on the server
                    dest: '/opt/tianji/apps/'
                }]
            }
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
        */
        //删除生成的目录
        clean : {
            build: ['dist','compress'],
            tempDir:['.build'],
            publicRep: ['dist/public', 'dist/js']
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
    grunt.registerTask('clear', ['clean']);
    grunt.registerTask('build',['clean:build', 'copy', 'concat', 'uglify', 'cssmin', 'clean:publicRep', 'compress', 'clean:tempDir']);
    grunt.registerTask('deploy',['clean:build', 'copy', 'concat', 'uglify', 'cssmin', 'compress', 'scp:deploy', 'clean:tempDir']);
    grunt.registerTask('rel',['clean', 'copy', 'concat', 'uglify', 'cssmin', 'compress', 'release', 'scp:release', 'clean:tempDir']);
}
