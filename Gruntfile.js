module.exports = function (grunt) {

   // load time-grunt and all grunt plugins found in the package.json
   require('time-grunt')(grunt);
   //require('load-grunt-tasks')(grunt);

   require('jit-grunt')(grunt, {
     buildcontrol: 'grunt-build-control',
     rem_to_px: 'grunt-rem-to-pixels',
     useminPrepare: 'grunt-usemin' // plugin can't be resolved in automatic mapping
   });

   grunt.initConfig({
      //-----------------------------------------------------
      // Configure Paths
      //-----------------------------------------------------
      config: {
         app: 'src',
         build: 'build',
         dist: 'bin',
         port: '9292',
         takanaOn: false, // see notes in 'Watch'
         git: 'git@github.com:liquidvisual/vssa-1614.git'
      },
      //-----------------------------------------------------
      // TAKANA - live Sass refreshing
      //
      // Sometimes Takana screws up with Foundation's 'functions.scss'.
      // To fix, remove '/_scss' below. Run grunt takana, then quit..
      // add '/_scss' back onto it and re-run. Don't ask.
      //-----------------------------------------------------
      takana: {
         options: {
            path: '<%= config.app %>/_scss'
         }
      },
      //-----------------------------------------------------
      // JEKYLL
      //-----------------------------------------------------
      shell: {
        jekyllServe: {
            command: "jekyll build --source <%= config.app %>  --destination <%= config.build %> --config _config.yml"
         },
         jekyllBuild: {
            command: "jekyll build --source <%= config.app %>  --destination <%= config.build %> --config _config.yml,_config.build.yml"
         }
      },
      //-----------------------------------------------------
      // BUILD CONTROL (GIT)
      //-----------------------------------------------------
      buildcontrol: {
        options: {
          commit: true,
          connectCommits: false,
          push: true,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        master: {
          options: {
            dir: './',
            remote: '<%= config.git %>',
            branch: 'master'
          }
        },
        pages: {
          options: {
            dir: '<%= config.build %>',
            remote: '<%= config.git %>',
            branch: 'gh-pages'
          }
        },
        local: {
          options: {
            remote: '../',
            branch: 'build'
          }
        }
      },
      //-----------------------------------------------------
      // SASS - Compiles sass only, leaves .css alone
      //-----------------------------------------------------
      sass: {
        temp: {
            files: [{
                expand: true,
                cwd: '<%= config.app %>/_scss',
                src: ['**/*.scss'],
                dest: '<%= config.build %>/css',
                ext: '.css'
            }]
        }
        // dist: {
        //   options: {
        //     outputStyle: 'compressed'
        //   },
        //   files: {
        //       '<%= config.dist %>/css/main.css' : '<%= config.app %>/_scss/main.scss',
        //       '<%= config.dist %>/css/liquidvisual.css' : '<%= config.app %>/_scss/liquidvisual/liquidvisual.scss',
        //       '<%= config.dist %>/css/foundation.css' : '<%= config.app %>/_scss/foundation/foundation.scss',
        //       '<%= config.dist %>/css/fonts.css' : '<%= config.app %>/_scss/fonts.scss'
        //   }
        // }
      },
      //-----------------------------------------------------
      // Usemin for JavaScripts
      //-----------------------------------------------------
      useminPrepare: {
        options: {
          dest: '<%= config.build %>'
        },
        html: '<%= config.build %>/index.html',
      },
      usemin: {
        options: {
          assetsDirs: '<%= config.build %>'
        },
        html: ['<%= config.build %>/**/*.html']
      },
      //-----------------------------------------------------
      // Copy into assets
      //-----------------------------------------------------
      copy: {
        vendor_files: {
          files: [{cwd: 'vendor', src: '**/*', dest: '<%= config.build %>/vendor', expand: true}]
        },
        build: {
          files: [
          {cwd: '<%= config.build %>/img', src: '**/*', dest: '<%= config.build %>/assets/img', expand: true},
          {cwd: '<%= config.build %>/fonts', src: '**/*', dest: '<%= config.build %>/assets/fonts', expand: true}
          ]
        }
      },
      //-----------------------------------------------------
      // Clean - remove redundant folders after tasks
      //-----------------------------------------------------
      clean: {
        build: {
          src: [
            "<%= config.build %>/img",
            "<%= config.build %>/css",
            "<%= config.build %>/fonts",
            "<%= config.build %>/scripts",
            "<%= config.build %>/vendor"
          ]
        }
      },
      //-----------------------------------------------------
      // IE8 REM Fallback
      //-----------------------------------------------------
      pixrem: {
        options: {
          rootvalue: '16px'
        },
        dist: {
          src: '<%= config.build %>/assets/css/optimized.css',
          dest: '<%= config.build %>/assets/css/optimized.css'
        }
      },
      //-----------------------------------------------------
      // A. CONNECT
      //-----------------------------------------------------
      connect: {
         options: {
            port: '<%= config.port %>',
            livereload: 35729,
            hostname: '0.0.0.0'
         },
         livereload: {
            options: {
               open: true,
               base: ['<%= config.build %>', '<%= config.app %>']
            }
         },
         dist: {
            options: {
               open: true,
               base: '<%= config.build %>',
               livereload: false
            }
         }
      },
      //-----------------------------------------------------
      // B. WATCH
      //-----------------------------------------------------
      watch: {

        options: {
          livereload: true,
          spawn: true
        },

         sass: {
            files: ['<%= config.app %>/_scss/**/*.{scss,sass}'],
            tasks: ['sass:temp'],
            options : {
               livereload: '<%= config.takanaOn %>' // SWITCH true to live inject but BREAK Takana
            }
         },

         css: {
            files: ['<%= config.build %>/css/**/*.css'],
            tasks: [],
            reload: true
         },

         // If any of these files change:
         // 1. Run Jekyll Build
         // 2. Compile Sass and drop into _site

         livereload: {
            options: {
               livereload: '<%= connect.options.livereload %>'
            },
            // files: ['<%= config.app %>/index.html'],
            files: [
                '<%= config.app %>/**/*.html',
                '<%= config.app %>/**/*.yml',
                '<%= config.app %>/**/*.md',
                '<%= config.app %>/_data/**/*.json',
                '<%= config.app %>/scripts/**/*.js',
                '<%= config.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                //'!<%= config.app %>/**/_s/**'
            ],
            tasks: ['shell:jekyllServe', 'sass:temp', 'copy:vendor_files']
         }
      }
   //-- end initConfig
   });
   //-----------------------------------------------------
   // Register Tasks
   //-----------------------------------------------------
   grunt.registerTask('serve', [
      'shell:jekyllServe',
      'copy:vendor_files',
      'sass:temp',
      'connect:livereload',
      'watch'
   ]);

   grunt.registerTask('build', [
      'shell:jekyllBuild',
      'copy:vendor_files',
      'copy:build',
      'sass:temp',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'usemin',
      'pixrem',
      'clean:build',
      'connect:dist',
      'watch'
   ]);

  // Deploy to Github Pages
   grunt.registerTask('deploy', [
      'shell:jekyllBuild',
      'copy:vendor_files',
      'copy:build',
      'sass:temp',
      'useminPrepare',
      'concat',
      'uglify',
      'cssmin',
      'usemin',
      'pixrem',
      'clean:build',
      'buildcontrol:master',
      'buildcontrol:pages'
  ]);

//-- end module.exports
};