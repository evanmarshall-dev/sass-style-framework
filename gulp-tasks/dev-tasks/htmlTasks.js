/* eslint-disable import/no-extraneous-dependencies */

import pkg from 'gulp';
import injectString from 'gulp-inject-string';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const { src, dest } = pkg;

const injectAssets = (srcPath, destPath) => {
  const cssFilePath = 'css/styles.css';
  const jsFilePath = 'js/app.js';

  src(srcPath)
    .pipe(rename('index.html'))
    .pipe(
      injectString.after(
        '</title>',
        `\n<link rel="stylesheet" href="${cssFilePath}">`,
      ),
    )
    .pipe(
      injectString.before('</body>', `<script src="${jsFilePath}"></script>\n`),
    )
    .pipe(dest(destPath))
    .pipe(browserSync.stream());
};

export default injectAssets;
