module.exports = function(grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: ['dist/**']
        },
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'images/**',
                    dest: 'dist/'
                }]
            },
            index: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'index.html',
                    dest: 'dist/'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'scripts/**/*.js',
                    dest: 'dist/'
                }]
            },
            templates: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: 'templates/**/*.html',
                    dest: 'dist/'
                }]
            },
        },
        less: {

            compile: {
                options: {
                    paths: ["src/css"]
                },
                files: {
                    "dist/css/<%= pkg.name %>.css": "src/css/main.less"
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: ['src/**/*.js'],
                dest: 'dist/scripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {

                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {

                    'dist/scripts/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['css/*.css'],
                    dest: 'dist/'
                }]
            }
        },
        htmlmin: {
            options: {
                 collapseWhitespace: true,
            },
            html: {
                files: [
                    { expand: true, cwd: 'src/', src: ['templates/*.html'], dest: 'dist' }
                ]
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {

                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        usemin: {
            html: ['dist/index.html']
        },

        watch: {
            files: ['src/**'],
            tasks: ['clean', 'copy', 'wiredep', 'jshint', 'less'],
            options: { livereload: true }
        },

        wiredep: {
            task: {
                src: ['./src/index.html']
            }
        },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            server: {
                options: {
                    base: ['.'],
                    livereload: true
                }

            }


        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask('dev', ['clean']);
    grunt.registerTask('dev', ['clean', 'wiredep', 'copy', 'less', 'jshint', 'connect', 'watch']);
    grunt.registerTask('pro', ['clean', 'concat', 'wiredep', 'jshint', 'uglify', 'less', 'cssmin', 'htmlmin', 'copy:images','copy:index', 'usemin']);


};