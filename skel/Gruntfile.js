module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      stagingDir: 'staging',
      buildDir: 'public_html'
    },
    clean: {
      staging: ['<%= config.stagingDir %>'],
      build: ['<%= config.buildDir %>']
    },
    coffee: {
      staging: {
        expand: true,
        cwd: 'app',
        src: 'assets/js/**/*.coffee',
        dest: '<%= config.stagingDir %>',
        ext: '.js'
      },
      build: {
        expand: true,
        cwd: 'app',
        src: 'assets/js/**/*.coffee',
        dest: '<%= config.buildDir %>',
        ext: '.js'
      }
    },
    copy: {
      staging: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'assets/{files,fonts}/**/*',
          dest: '<%= config.stagingDir %>'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'assets/{files,fonts}/**/*',
          dest: '<%= config.buildDir %>'
        }]
      }
    },
    express: {
      main: {
        options: {
          bases: ["staging"],
          livereload: true,
          hostname: '0.0.0.0',
          port: 8000
        }
      }
    },
    generator: {
      options: {
        defaultTemplate: 'default',
        frontmatterType: 'yaml',
        helpers: require('./app/helpers.js'),
        partialsGlob: 'app/partials/**/*.hbp',
        templateExt: 'hbt',
        templates: 'app/templates'
      },
      staging: {
        files: [{
          cwd: 'app/pages',
          src: '**/*.html',
          dest: '<%= config.stagingDir %>',
          ext: '.html'
        }]
      },
      build: {
        files: [{
          cwd: 'app/pages',
          src: '**/*.html',
          dest: '<%= config.buildDir %>',
          ext: '.html'
        }]
      }
    },
    imagemin:{
      staging: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'assets/images/**/*.{png,jpg,gif}',
          dest: '<%= config.stagingDir %>'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'assets/images/**/*.{png,jpg,gif}',
          dest: '<%= config.buildDir %>'
        }]
      }
    },
    sass: {
      staging: {
        files: [{
          src: 'app/assets/stylesheets/main.scss',
          dest: 'staging/assets/stylesheets/main.css'
        }]
      },
      build: {
        options: {
          style: 'compressed'
        },
        files: [{
          src: 'app/assets/stylesheets/main.scss',
          dest: 'public_html/assets/stylesheets/main.css'
        }]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      staging: {
        options: {
          beautify: true
        },
        files: [{
          expand: true,
          cwd: 'app',
          src: 'assets/js/**/*.js',
          dest: '<%= config.stagingDir %>'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'assets/js/**/*.js',
          dest: '<%= config.buildDir %>'
        }]
      }
    },
    watch: {
      coffee: {
        files: 'app/assets/js/**/*.coffee',
        tasks: 'coffee:staging',
        options: { livereload: true }
      },
      html: {
        files: ['app/{pages,partials,templates}/**/*', 'app/helpers.js'],
        tasks: ['generator:staging'],
        options: { livereload: true }
      },
      images: {
        files: 'app/assets/images/**/*.{png,jpg,gif}',
        tasks: ['imagemin:staging'],
        options: { livereload: true }
      },
      js: {
        files: 'app/assets/js/**/*.js',
        tasks: ['uglify:staging'],
        options: { livereload: true }
      },
      sass: {
        files: 'app/assets/stylesheets/**/*',
        tasks: ['sass:staging'],
        options: { livereload: true }
      },
      static: {
        files: 'app/assets/{files,fonts}/**/*',
        tasks: ['copy:staging'],
        options: { livereload: true }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-generator');

  grunt.registerTask('serve', ['stage', 'express', 'watch']);
  grunt.registerTask('stage', ['clean:staging', 'generator:staging', 'copy:staging', 'imagemin:staging', 'sass:staging', 'coffee:staging', 'uglify:staging']);
  grunt.registerTask('build', ['clean:build', 'generator:build', 'copy:build', 'imagemin:build', 'sass:build', 'coffee:build', 'uglify:build']);
};

