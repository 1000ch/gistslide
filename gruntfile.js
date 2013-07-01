module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ["src/js/gistslide.js"]
		},
		uglify: {
			all: {
				files: {
					"src/js/gistslide.min.js": ["src/js/gistslide.js"]
				}
			}
		},
		csslint: {
			all: ["src/css/themes/*.css"]
		},
		sass: {
			// options: {
			// 	style: 'expanded'
			// },
			compile: {
				files: {
				'src/css/themes/default.css': ['src/sass/themes/default.scss'],
				'src/css/themes/simple.css': ['src/sass/themes/simple.scss'],
				'src/css/themes/night.css': ['src/sass/themes/night.scss'],
				'src/css/themes/redhot.css': ['src/sass/themes/redhot.scss'],
				'src/css/themes/green.css': ['src/sass/themes/green.scss']
				}
			}
		},
		csso: {
			option: {
				report: 'min'
			},
			dist: {
				files: {
				'src/css/themes/default.css': ['src/css/themes/default.css'],
				'src/css/themes/simple.css': ['src/css/themes/simple.css'],
				'src/css/themes/night.css': ['src/css/themes/night.css'],
				'src/css/themes/redhot.css': ['src/css/themes/redhot.css'],
				'src/css/themes/green.css': ['src/css/themes/green.css']
				}
			}
		},
		watch: {
			js: {
				files: ["src/js/gistslide.js"],
				tasks: ["jshint", "uglify"]
			},
			css: {
				files: ["src/sass/**/*.scss"],
				tasks: ["sass","csso"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-livereload');

	grunt.registerTask("default", "watch");
	grunt.registerTask("css", "watch");
};
