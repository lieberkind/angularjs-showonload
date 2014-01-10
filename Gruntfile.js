module.exports = function(grunt) {
 
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      js: {
        files: {
          'showonload.min.js': ['showonload.js']
        }
      }
    },
    watch: {
      js: {
        files: ['showonload.js'],
        tasks: ['uglify:js'],
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
};