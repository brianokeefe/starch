module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      staging: ['staging'],
      build: ['public_html']
    },
    coffee: {
      staging: {
        expand: true,
        cwd: 'app',
        src: 'assets/js/**/*.coffee',
        dest: 'staging',
        ext: '.js'
      },
      build: {
        expand: true,
        cwd: 'app',
        src: 'assets/js/**/*.coffee',
        dest: 'public_html',
        ext: '.js'
      }
    },
    copy: {
      staging: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.html', 'assets/{images,fonts,media}/**/*'],
          dest: 'staging'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'app',
          src: ['**/*.html', 'assets/{images,fonts,media}/**/*'],
          dest: 'public_html'
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
          dest: 'staging'
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: 'app',
          src: 'assets/js/**/*.js',
          dest: 'public_html'
        }]
      }
    },
    watch: {
      coffee: {
        files: 'app/assets/js/**/*.coffee',
        tasks: 'coffee:staging',
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
        files: ['app/**/*.html', 'app/assets/{images,fonts,media}/**/*'],
        tasks: ['copy:staging'],
        options: { livereload: true }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('serve', ['stage', 'express', 'watch']);
  grunt.registerTask('stage', ['clean:staging', 'copy:staging', 'sass:staging', 'coffee:staging', 'uglify:staging']);
  grunt.registerTask('build', ['clean:build', 'copy:build', 'sass:build', 'coffee:build', 'uglify:build']);
};

