'use strict';
import babel from 'gulp-babel';
import del from 'del';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import istanbul from 'gulp-istanbul';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';

const configFiles = './Gulpfiles.js'
  , srcFiles = 'generator/app/*.js'
  , templateFiles = ['generator/app/*/*', 'generator/app/*/.travis.yml']
  , testFiles = 'test.js'

  , destDir = './app';

gulp.task('clean', (cb) => {
  del(destDir, cb);
});

gulp.task('lint', ['clean'], () => {
  return gulp.src([configFiles, srcFiles, testFiles])
    .pipe(eslint())
    .pipe(eslint.formatEach('./node_modules/eslint-path-formatter'))
    .pipe(eslint.failOnError())
    .pipe(jscs({
      esnext: true
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('compile', ['lint'], () => {
  return gulp.src(srcFiles, {base: './generator/app/'})
    .pipe(babel({
      auxiliaryComment: 'istanbul ignore next',
      modules: 'common'
    }))
    .pipe(gulp.dest(destDir));
});

gulp.task('copy:templates', ['compile'], () => {
  return gulp.src(templateFiles, {base: './generator/app/'})
    .pipe(gulp.dest(destDir));
});

gulp.task('build', ['copy:templates']);

gulp.task('test', ['build'], (cb) => {
  gulp.src([destDir + 'index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src([testFiles])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
