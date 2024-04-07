import * as dartSass from 'sass';

import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import pkg from 'gulp';
import gulpSass from 'gulp-sass';
import plumber from 'gulp-plumber';
import cssnano from 'gulp-cssnano';

const sass = gulpSass(dartSass);
const { src, dest } = pkg;

export default function stylesProd(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    src(srcPath)
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(concat('styles.css'))
      .pipe(cssnano())
      .pipe(dest(destPath))
      .on('end', resolve)
      .on('error', reject);
  });
}
