var gulp = require("gulp"),
	concatCSS = require('gulp-concat-css'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync');

// CSS concat
gulp.task('build', function() { // билд
	gulp.src('app/css/**/*.css')
		.pipe(concatCSS("../build/bundle.css")) 	// объединить все css файлы в один
		.pipe(minifyCSS('')) 						// минифицировать файл
		.pipe(rename("../build/bundle.min.css"))	// переименовать его
		.pipe(gulp.dest("app/"));					// ...
});

// Server
gulp.task('server', function() { // запуск сервера
	browserSync({
		port: 8000,
		server: {
			baseDir: 'app'
		}
	});
});

// Watch
gulp.task('watch', function() { // следить за изменениями в файлах
	gulp.watch([
		'app/*.html',
		'app/*.php',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']); // работает по умолчанию