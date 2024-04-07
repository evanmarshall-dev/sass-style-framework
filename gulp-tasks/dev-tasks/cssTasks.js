import * as dartSass from 'sass';

import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import pkg from 'gulp';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);
const { src, dest } = pkg;

export default function concatStyles(srcPath, destPath) {
  src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(dest(destPath))
    .pipe(browserSync.stream());
}
