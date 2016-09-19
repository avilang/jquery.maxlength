var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('clean', del.bind(null,['dist']));

gulp.task('default', ['clean'], function(){
    gulp.src('./jquery.maxlength.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});