import pkg from 'gulp';
import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';

const { src, dest } = pkg;

export default function scriptsProd(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    src(srcPath)
      .pipe(plumber())
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(dest(destPath))
      .on('end', resolve)
      .on('error', reject);
  });
}
