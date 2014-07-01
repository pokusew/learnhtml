module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			less: {
				files: ['less/*.less'],
				tasks: ['less'],
				options: {
					spawn: false
				},
			}
		},
		less: {
			development: {
				options: {
					// allow to import easily bootstrap less libs
					//paths: ["www/dev/bootstrap/less"]
				},
				files: {
					"css/style.css": "less/style.less",
				}
			},
		}
	});

	// load plugins
//	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-concat');
//	grunt.loadNpmTasks('grunt-contrib-copy');
//	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
//	grunt.loadNpmTasks('grunt-usemin');
//	grunt.loadNpmTasks('grunt-nette-basepath');
	grunt.loadNpmTasks('grunt-contrib-watch');

//	// register tasks
//	grunt.registerTask('build', [
//		'useminPrepare',
//		'netteBasePath',
//		'uglify',
//		'concat',
//		'cssmin',
//		'copy'
//	]);
//	
	grunt.registerTask('default', ['watch']);

};