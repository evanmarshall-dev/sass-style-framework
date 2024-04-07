import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import pkg from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';

const { src, dest } = pkg;

export default function concatScripts(srcPath, destPath) {
  src(srcPath)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(dest(destPath))
    .pipe(browserSync.stream());
}
