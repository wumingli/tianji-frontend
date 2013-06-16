module.exports = function(grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
    grunt.initConfig({
        name : 'msPick and header plugin',
        version : '1.0.0-dev',
        transport: {
            options : {
              paths : ['.'],
              alias: {
                  msPick : 'dist/msPick/msPickPlugin'
              },
              parsers : {
                  '.js' : [script.jsParser],
                  '.css' : [style.css2jsParser]
              }
            },
            msPick : {
                options : {
                    idleading : 'dist/msPick/',
                    noncmd : false
                },
                files : [{
                    cwd : 'modules/msPick/js',
                    src : '*.js',
                    filter : 'isFile',
                    dest : '.build/msPick/'
                }]
            },
            header : {
                options : {
                    idleading : 'dist/header/'
                },
                files : [{
                    cwd : 'modules/public/header',
                    src : '**/*.*',
                    filter : 'isFile',
                    dest : '.build/header/'
                }]
            }
        },
        concat : {
            options : {
                paths : ['.'],
                include : 'relative'
            },
            msPick : {
                options : {
                    include : 'all',
                    noncmd : false
                },
                files: [{
                    expand: true,
                    cwd: '.build/',
                    src: ['msPick/**/*.js','!msPick/**/*-debug.js'],
                    dest: 'dist/',
                    ext: '.js'
                },
                {
                    expand: true,
                    cwd: '.build/',
                    src: ['header/**/*.*','!header/**/*-debug.*'],
                    dest: 'dist/'
                }
            ]}
        },

        uglify : {
            options : {
                banner : '/* <%= name %>,build at <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> */\n'
            },
            msPick : {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.js', '!**/*-debug.js', '!**/*.html'],
                    dest: 'dist/'
                }]
            }
        },

        // Configuration to be run (and then tested).
        compress: {
          zip: {
            options: {
              archive: 'compress/tianji-frontend.zip'
            },
            files: [
              {expand: true, cwd: 'dist/', src: ['**/*']},
              {expand: true, cwd: '.', src: ['gallery/**/*']}
            ]
          }
        },
        
        clean : {
            build : ['.build']
        },
        
        scp: {
            options: {
                host: 'www11.qa.tianji.com',
                username: 'root',
		        privateKey: grunt.file.read(global.process.env.HOME + '/.ssh/id_rsa'),
		        passphrase: ''
            },
            zip: {
                files: [{
                    cwd: 'compress',
                    src: '*.zip',
                    filter: 'isFile',
                    // path on the server
                    dest: '/var/front/versions/<%= version %>'
                }]
            }   
        }
    })

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-scp');

  grunt.registerTask('deploy', ['transport', 'concat', 'uglify', 'compress', 'clean','scp']);
  grunt.registerTask('build', ['transport', 'concat', 'uglify', 'clean']);
}
