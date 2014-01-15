module.exports = function(grunt) {
  'use strict';

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var src = {
    dir: 'src/',
    lib: 'src/lib',
    spec: 'src/spec',
    dist: 'dist'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src: src,
    jasmine: {
      all: {
        src: '<%= src.lib %>/*.js',
        options: {
          specs: '<%= src.spec %>/*.spec.js',
          vendor: [
            './bower_components/jquery/jquery.min.js',
            './bower_components/handlebars/handlebars.min.js',
            './bower_components/ember/ember.min.js',
            './bower_components/sinonjs/sinon.js'
          ]
        }
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        //
      },
      dist: {
        files: {
          '<%= src.dist %>/ember.oauth2.min.js': ['<%= src.lib %>/*.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: ['<%= src.lib %>/*.js'], dest: 'dist/' }
        ]
      }
    },
    jshint: {
      files: ['gruntfile.js', '<%= src.lib %>/*.js', '<%= src.spec %>/*.spec.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commit: true,
        bumpReadme: true,
        readmeText: 'Current Version:',
        commitFiles: ['package.json', 'bower.json', 'dist/*'],
        createTag: false,
        push: false
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify', 'copy']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('build', ['uglify', 'copy']);
  grunt.registerTask('bumpPatch', ['bump-only:patch', 'jshint', 'build']); 
  grunt.registerTask('bumpMinor', ['bump-only:minor', 'jshint', 'build']); 
  grunt.registerTask('bumpMajor', ['bump-only:major', 'jshint', 'build']); 

};
