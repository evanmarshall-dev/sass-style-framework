import pkg from 'gulp';
import injectString from 'gulp-inject-string';
import fs from 'fs';
import htmlmin from 'gulp-htmlmin';

const { src, dest } = pkg;

export default function htmlProd(srcPath, destPath) {
  const cssContent = fs.readFileSync('prod/css/styles.css', 'utf8');
  const jsContent = fs.readFileSync('prod/js/app.js', 'utf8');

  // return new Promise((resolve, reject) => {
  src(srcPath)
    .pipe(injectString.after('</title>', `\n<style>${cssContent}</style>`))
    .pipe(injectString.before('</body>', `<script>${jsContent}</script>\n`))
    .pipe(injectString.replace(/<!--[\s\S]*?-->/g, ''))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(destPath));
  // .on("end", resolve)
  // .on("error", reject);
  // });
}
