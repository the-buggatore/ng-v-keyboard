'use strict';

/* global module, require */

module.exports = function(grunt) {
  var conf = {
    csslint: {
      files: ['www/css/*.css'],
      options: {
        csslintrc: '.csslintrc'
      }
    },
    jshint: {
      files: {
        src: ['Gruntfile.js', 'www/js/**/*.js']
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jsonlint: {
      src: ['www/js/**/*.json']
    },
    less: {
      components: {
        options: {},
        files: {
          "www/abb-components/css/abb-components.css": "www/abb-components/css/abb-components.less"
        }
      },
      application: {
        options: {},
        files: {
          "www/css/application.css": "less/application.less"
        }
      }
    }
  };

  grunt.initConfig(conf);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('lint', ['jshint', 'jsonlint']);
  grunt.registerTask('default', ['jshint', 'csslint']);

};