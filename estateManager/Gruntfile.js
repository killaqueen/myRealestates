module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
    	options: {
    		atBegin: true
    	},
      browserify: {
        files: ['src/main/webapp/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserify: {
      dist: {
        options: {
           transform: [['babelify', {presets: ['es2015', 'react']}]]
        },        
        src: ['src/main/webapp/table.js'],
        dest: 'src/main/resources/static/app/app.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');  
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);

};