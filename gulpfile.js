const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const browserSync = require('browser-sync').create();

gulp.task('styles', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', gulp.series('styles', () => {
    browserSync.init({
        server: "./"
    });
    gulp.watch('src/scss/**/*.scss', (done) => {
        browserSync.reload();
        gulp.series(['clean', 'styles'])(done);
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('clean', () => {
    return del([
        'css/main.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));