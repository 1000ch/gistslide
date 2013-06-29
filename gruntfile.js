module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ["src/js/gistslide.js"]
		},
		csslint: {
			all: ["src/css/gistslide.css"]
		},
		sass: {
			options: {
				style: 'expanded'
			},
			compile: {
				files: {
				'src/css/themes/simple.css': ['src/sass/themes/simple.scss'],
				'src/css/themes/night.css': ['src/sass/themes/night.scss'],
				'src/css/themes/green.css': ['src/sass/themes/green.scss']
				}
			}
		},
		watch: {
			js: {
				files: ["src/js/gistslide.js"],
				tasks: ["jshint"]
			},
			css: {
				files: ["src/sass/**/*.scss"],
				tasks: ["sass"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-livereload');

	grunt.registerTask("default", "watch");
	grunt.registerTask("css", ["sass"]);
};
