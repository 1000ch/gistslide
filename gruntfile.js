module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ["src/js/gistslide.js"]
		},
		csslint: {
			all: ["src/css/gistslide.css"]
		},
		watch: {
			files: ["src/js/gistslide.js"],
			tasks: ["jshint"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-livereload');

	grunt.registerTask("default", "watch");
};
