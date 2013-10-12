'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // Import package manifest
        pkg: grunt.file.readJSON("gridgallery.jquery.json"),

        watch: {
            styles: {
                files: ['src/{,*/}*.less'],
                tasks: ['recess']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'dist/*.html',
                    'dist/{,*/}*.css',
                    'dist/{,*/}*.js',
                ]
            },
            base64: {
                files: ['src/{,*/}*.css'],
                tasks: ['imageEmbed']
            },
            js: {
                files: ['src/*.js'],
                tasks: ['copy']
            }
        },

        // Banner definitions
        meta: {
            banner: "/*\n" + " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" + " *  <%= pkg.description %>\n" + " *  <%= pkg.homepage %>\n" + " *\n" + " *  Made by <%= pkg.author.name %>\n" + " *  Under <%= pkg.licenses[0].type %> License\n" + " */\n"
        },

        imageEmbed: {
            dist: {
                src: ["src/jquery.gridgallery.css"],
                dest: "dist/jquery.gridgallery.css",
                options: {
                    deleteAfterEncoding: false
                }
            }
        },
        // Concat definitions
        concat: {
            dist: {
                src: ["src/jquery.gridgallery.js"],
                dest: "dist/jquery.gridgallery.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },

        // Lint definitions
        jshint: {
            files: ["src/jquery.gridgallery.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        recess: {
            dist: {
                options: {
                    compile: true
                },
                files: {
                    'src/jquery.gridgallery.css': ['src/jquery.gridgallery.less']
                }
            }
        },

        // Minify definitions
        uglify: {
            my_target: {
                src: ["dist/jquery.gridgallery.js"],
                dest: "dist/jquery.gridgallery.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            },
        },
        copy: {
            main: {
                src: 'src/jquery.gridgallery.js',
                dest: 'dist/jquery.gridgallery.js',
            }
        }
    });

    grunt.registerTask("default", ["jshint", "concat", "uglify"]);
    grunt.registerTask("travis", ["jshint"]);

    grunt.registerTask('server', function(target) {
        grunt.task.run([
            //'autoprefixer',
            'connect:livereload',
            //'open',
            'watch'
        ]);
    });

};
