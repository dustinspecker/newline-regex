'use strict';
import babel from 'gulp-babel';
import babelCompiler from 'babel';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import istanbul from 'gulp-istanbul';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import mocha from 'gulp-mocha';

const configFiles = './gulpfile.babel.js'
  , srcFiles = 'src/*.js'
  , testFiles = 'test.js'

  , destDir = './lib';

gulp.task('lint', () => {
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
  return gulp.src(srcFiles)
    .pipe(babel({
      auxiliaryCommentBefore: 'istanbul ignore next',
      modules: 'common'
    }))
    .pipe(gulp.dest(destDir));
});

gulp.task('build', ['compile']);

gulp.task('test', ['build'], (cb) => {
  gulp.src(['index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () => {
      gulp.src([testFiles])
        .pipe(mocha({
          compilers: {
            js: babelCompiler
          }
        }))
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
