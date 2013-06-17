module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //拷贝
        copy :{
            msPick:{
                files :[{
                    expand: true,
                    cwd: 'modules/msPick/',
                    src: ['**/*.*'],
                    dest: 'dist/msPick/',
                    filter: 'isFile'
                }]
            },
            header:{
                files :[{
                    expand: true,
                    cwd: 'modules/public/header/',
                    src: ['**/*.*'],
                    dest: 'dist/header/',
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
            styles:{
                files: [{
                    expand: true,
                    cwd: 'styles/',
                    src: ['*.css'],
                    dest: 'dist/styles/',
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
                dest: 'dist/msPick/js/function.min.js'
            },
            city : {
                src : ['modules/msPick/js/cityData.js', 'modules/msPick/js/msCityPlugin.js'],
                dest: 'dist/msPick/js/city.min.js'
            },
            industry : {
                src : ['modules/msPick/js/industryData.js', 'modules/msPick/js/msIndustryPlugin.js'],
                dest: 'dist/msPick/js/industry.min.js'
            }
        },
        //JS文件压缩
        uglify : {
            options : {
                banner : '/* build at <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n'
            },
            msPick : {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.js', '!**/*-debug.js', '!**/*.html', '!**/*.css'],
                    dest: 'dist/'
                }]
            }
        },
        //样式表压缩
        cssmin: {
          msPick: {
            expand: true,
            cwd: 'modules/msPick/css/',
            src: ['*.css'],
            dest: 'dist/msPick/css/',
            ext: '.min.css'
          },
          public: {
            options:{
                banner: '/*common styles minify file, build at <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %>*/'
            },
            expand: true,
            cwd: 'dist/styles/',
            src: ['*.css'],
            dest: 'dist/styles/',
            ext: '.min.css'
          }
        },
        //删除生成的目录
        clean : {
            build : ['dist','compress']
        },
        //文件打包
        compress: {
          zip: {
            options: {
              archive: 'compress/tianji-frontend-<%= pkg.version %>.zip'
            },
            files: [
              {expand: true, cwd: 'dist/', src: ['**/*']},
              {expand: true, cwd: '.', src: ['gallery/**/*']}
            ]
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
                    cwd: 'compress',
                    src: '*.zip',
                    filter: 'isFile',
                    // path on the server
                    dest: '/home/jsrepository/js/tianji-frontend/<%= pkg.version %>'
                }]
            },            
            deploy: {
                options: {
                    host: 'www11.qa.tianji.com',
                    username: 'root',
                    privateKey: grunt.file.read(global.process.env.HOME + '/.ssh/id_rsa'),
                    passphrase: ''
                },
                files: [{
                    cwd: 'compress',
                    src: '*.zip',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/front/deploy'
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
        }
    })

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-scp');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('clear', ['clean']);
  grunt.registerTask('build', ['clean', 'copy', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('deploy',['clean', 'copy', 'concat', 'uglify', 'cssmin','compress','scp:deploy']);
  grunt.registerTask('rel',['clean', 'copy', 'concat', 'uglify', 'cssmin','compress','release', 'scp:release']);
}
