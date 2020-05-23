const gulp     = require('gulp'),
  htmlmin      = require('gulp-htmlmin'),
  cleanCSS     = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin     = require('gulp-imagemin'),
  uglify       = require('gulp-uglify'),
  concat       = require('gulp-concat'),
  browserSync  = require('browser-sync').create(),
  sass         = require('gulp-sass'),
  watch        = require('gulp-watch');

gulp.task('minifyHTML', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
});

gulp.task('minifyCSS', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({level: 2}))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('build/css'))
});

gulp.task('minifyImage', () => {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
});

gulp.task('minifyScript', () => {
  return gulp.src('script/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/script'))
});

gulp.task('minify', gulp.parallel('minifyHTML', 'minifyCSS', 'minifyImage', 'minifyScript'));

gulp.task('exportFonts', () => {
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('build/fonts'));
})

gulp.task('build', gulp.parallel('minify', 'exportFonts'));

gulp.task('startBuild', () => {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });

  browserSync.watch("./build", browserSync.reload);
});

gulp.task('startServer', () => {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  browserSync.watch("./src", browserSync.reload);
});

gulp.task('сompilationSass', () => {
  return gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
});

gulp.task('watchSass', () => {
  gulp.watch('src/sass/*.sass', gulp.series('сompilationSass'))
});

gulp.task('default', gulp.parallel('startServer', 'watchSass'));