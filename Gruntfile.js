module.exports = function(grunt) {
    // https://github.com/sindresorhus/load-grunt-tasks
    //require('load-grunt-tasks')(grunt);
    // 
    // TODO
    // - Think about concatenating & copying CSS & JS from bower_components
    // - Think about adding a banner to JS/CSS files while doing that
    // |-> Then the asset_bunlder would just compress and hash
    // - Use package.json properties (where sensible) in here
    //
    // - Really, I should probably limit Grunt use to purely development & testing
    // and maybe deployment (TBD)
    //
    // - The rest I should put into a Ruby-based asset pipeline (compiling, compressing, etc.)
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint'); // Local dev only
    grunt.loadNpmTasks('grunt-jsbeautifier'); // Ditto
    grunt.loadNpmTasks('grunt-browser-sync'); // Ditto. Required node.
    grunt.loadNpmTasks('grunt-open');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch task
        watch: {
            options: {
                spawn: false
            },
            // Lint, beautify, copy assets and reload on JS file edits
            js: {
                files: ['ui/js/*.js', '*.json', 'Gruntfile.js'],
                tasks: ['jshint', 'jsbeautifier', 'copy:js'],
                options: {
                    livereload: true
                }
            },
            // Less compile, copy assets on edit
            less: {
                files: ['ui/less/*.less'],
                tasks: ['less:development', 'copy:css'],
                // BrowserSync is now watching for CSS changes
                //options: { 
                //livereload: true
                //}
            },
            images: {
                files: ['ui/img/*'],
                tasks: ['copy:images'],
                options: {
                    livereload: true
                }
            },
            html: {
                // Order matters!
                // Watch for changes to files and regenerate _site on edit
                files: ['**/*.html', '**/*.md', '**/*.csv', '!**/node_modules/**', '!**/bower_components/**'],
                tasks: ['jekyll:dist'],
                options: {
                    livereload: true,
                    debounceDelay: 300,
                }
            }
        },

        // BrowserSync task
        // Keep browsers in sync and inject CSS changes (or reload for images)
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        '_site/assets/*.css',
                        '_site/ui/img/*.jpg',
                        '_site/ui/img/*.png'
                    ]
                },
                options: {
                    watchTask: true
                }
            }
        },
        // Less task
        less: {
            options: {},
            development: {
                files: [{
                    expand: true,
                    cwd: 'ui/less/',
                    //src: ['**/*.less'],
                    src: ['styles.less'],
                    dest: 'ui/css/',
                    ext: '.css',
                    report: 'min'
                }]
            },
            production: {}
        },
        // Copy task
        // Move files on edit so that the livereload works as expected
        copy: {
            css: {
                files:
                // includes files within path
                [{
                    expand: true,
                    src: ['ui/css/*'],
                    dest: '_site/assets/',
                    flatten: true,
                    filter: 'isFile'
                }]
            },
            js: {
                files:
                // includes files within path
                [{
                    expand: true,
                    src: ['ui/js/*'],
                    dest: '_site/assets/',
                    flatten: true,
                    filter: 'isFile'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    src: ['ui/img/*'],
                    dest: '_site/ui/img/',
                    filter: 'isFile'
                }]
            }
        },
        // JSHint task
        jshint: {
            options: {
                force: true
            },
            all: ['ui/js/*.js', '*.json', 'Gruntfile.js', '!**/node_modules/**', '!**/bower_components/**'],
        },
        jsbeautifier: {
            files: ['ui/js/*.js', '*.json', 'Gruntfile.js', '!**/node_modules/**', '!**/bower_components/**']
        },
        // Jekyll tasks
        jekyll: {
            options: {
                bundleExec: true // run commands with bundle exec ...
            },
            dist: { // jekyll build
                options: {
                    config: '_config.yml,_config.development.yml,_config.development_w_grunt.yml',
                    drafts: true
                }
            },
            serve: { // Not using this, because we're using Connect
                options: {
                    drafts: true,
                    serve: true
                }
            }
        },
        // Connect tasks
        connect: {
            server: {
                options: {
                    port: 4000,
                    base: '_site'
                }
            }
        },
        // Open the browser!
        open: {
            dev: {
                path: 'http://localhost:4000',
                app: 'Google Chrome',
                delay: 5
            }
        },
    });

    // Default task(s).
    grunt.registerTask('default', ['serve']);

    grunt.registerTask('serve', function(target) {
        grunt.task.run([
            'connect',
            'less:development',
            'jshint',
            'jsbeautifier',
            'jekyll:dist',
            'browserSync',
            'open:dev',
            'watch'
        ]);
    });
};
