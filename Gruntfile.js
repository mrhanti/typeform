'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // Grunt Tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Paths

  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    jsDir: 'javascripts',
    cssDir: 'stylesheets',
    vendor: '<%= yeoman.app %>/vendor',
    assets: {
      javascripts: 'app/javascripts',
      stylesheets: 'app/stylesheets',
      images: '<%= yeoman.app %>/images'
    }
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    // Watch

    watch: {
      coffee: {
        files: ['<%= yeoman.assets.javascripts %>/**/*.coffee'],
        tasks: ['coffee:dist']
      },

      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
      },

      compass: {
        files: ['<%= yeoman.assets.stylesheets %>/**/*.{scss,sass}'],
        tasks: ['compass']
      },

      livereload: {
        files: [
          '<%= yeoman.app %>/*.html',
          '{.tmp,<%= yeoman.app %>}/<%= yeoman.cssDir %>/*.css',
          '{.tmp,<%= yeoman.app %>}/<%= yeoman.jsDir %>/*.js',
          '<%= yeoman.assets.images %>/*.{png,jpg,jpeg}'
        ],
        tasks: ['livereload']
      }
    },

    // Connect

    connect: {
      options: {
        port: 9000
      },

      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },

    // Open

    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },

    // Clean

    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },

    // JSHint

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.assets.javascripts %>/*.js'
      ]
    },

    // Test (Qunit) to be Added
    qunit: {
      all: ['test/**/*.html']
    },

    // CoffeeScript

    coffee: {
      dist: {
        files: {
          '.tmp/<%= yeoman.jsDir %>/coffee.js': '<%= yeoman.assets.javascripts %>/**/*.coffee'
        }
      },
      test: {
        files: [{
          expand: true,
          cwd: '.tmp/spec',
          src: '*.coffee',
          dest: 'test/spec'
        }]
      }
    },

    // Compass & Sass

    compass: {
      options: {
        sassDir: '<%= yeoman.assets.stylesheets %>',
        cssDir: '.tmp/<%= yeoman.cssDir %>',
        imagesDir: '<%= yeoman.assets.images %>',
        javascriptsDir: '<%= yeoman.assets.javascripts %>',
        fontsDir: '<%= yeoman.assets.stylesheets %>/fonts',
        importPath: '<%= yeoman.vendor %>',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Require.js

    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          // `name` and `out` is set by grunt-usemin
          baseUrl: '<%= yeoman.assets.javascripts %>',
          optimize: 'none',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
          mainConfigFile: '<%= yeoman.assets.javascripts %>/main.js'
        }
      }
    },

    // Minifiers

    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    usemin: {
      html: ['<%= yeoman.dist %>/*.html'],
      css: ['<%= yeoman.dist %>/<%= yeoman.cssDir %>/*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/<%= yeoman.cssDir %>/main.css': [
            '.tmp/<%= yeoman.cssDir %>/*.css',
            '<%= yeoman.app %>/<%= yeoman.cssDir %>/*.css'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Copy

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess'
          ]
        }]
      }
    },

    // Bower

    bower: {
      rjsConfig: '<%= yeoman.assets.javascripts %>/main.js',
      indent: '    '
    }
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  // $ grunt server

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'coffee:dist',
      'compass:server',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  // $ grunt test

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'qunit'
  ]);

  // $ grunt build

  grunt.registerTask('build', [
    'clean:dist',
    //'jshint',
    'test',
    'coffee',
    'compass:dist',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'uglify',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('default', ['server']);
};
