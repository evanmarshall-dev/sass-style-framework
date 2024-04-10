/* eslint-disable import/extensions */

// IMPORT NPM PACKAGES, GULP PLUGINS, AND MODULES.
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import pkg from 'gulp';
import minimist from 'minimist';
import concatStyles from './gulp-tasks/dev-tasks/cssTasks.js';
import concatScripts from './gulp-tasks/dev-tasks/jsTasks.js';
import injectAssets from './gulp-tasks/dev-tasks/htmlTasks.js';
import stylesProd from './gulp-tasks/prod-tasks/cssTasks.js';
import scriptsProd from './gulp-tasks/prod-tasks/jsTasks.js';
import htmlProd from './gulp-tasks/prod-tasks/htmlTasks.js';

// PULL IN GULP METHODS AND ASSIGN TO VARIABLES.
const { series, watch } = pkg;

// DEFINE PROJECT PATHS.
export const paths = {
  src: {
    sass: 'src/scss/**/*.scss',
    html: 'src/html/EN/index.html',
    htmlfr: 'src/html/FR/index.html',
    template: 'src/templates/EN/**/*',
    templatefr: 'src/templates/FR/**/*',
    js: 'src/js/**/*.js',
  },
  dev: 'dev',
  prod: 'prod',
};

// GULP CLEAN/DELETE TASK.
// Deletes the dev and prod directories.
export const clean = async () => {
  const deletedDirectoryPaths = await deleteAsync([
    paths.dev,
    paths.prod,
    `!${paths.dev}/fonts`,
  ]);
  console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'));
};

// * DEVELOPMENT: Define command-line options to specify the template to use
const options = minimist(process.argv.slice(2), {
  string: 'template',
  default: { template: 'default.html' },
});

// * DEVELOPMENT: GULP SERVE TASK.
// Initializes a local server and serves files from the dev directory to localhost:8888.
export const serve = (done) => {
  browserSync.init({
    server: {
      baseDir: paths.dev,
    },
    port: 8888,
    open: 'local',
    browser: 'google chrome',
    // browser: '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
  });
  done();
};

// * DEVELOPMENT: Compile SASS to CSS, concatenate CSS files into styles.css, and auto-prefix CSS. Output to dev/css.
export const styles = (done) => {
  concatStyles(paths.src.sass, `${paths.dev}/css`);
  done();
};

// * DEVELOPMENT: Concatenate JS files into app.js. Output to dev/js.
export const scripts = (done) => {
  concatScripts(paths.src.js, `${paths.dev}/js`);
  done();
};

// * DEVELOPMENT: Inject CSS and JS files into HTML files. Output to dev.
export const html = (done) => {
  injectAssets(`src/templates/EN/${options.template}`, paths.dev);
  done();
};

// * DEVELOPMENT: Inject CSS and JS files into French HTML files. Output to dev.
export const htmlFr = (done) => {
  injectAssets(`src/templates/FR/${options.template}`, paths.dev);
  done();
};

// * DEVELOPMENT: Watch for changes to SASS, JS, and HTML files. Run the appropriate task when a change is detected.
export const watchDev = () => {
  watch(paths.src.sass, styles);
  watch(paths.src.js, scripts);
  watch(paths.src.template, html);
  watch(paths.src.templatefr, htmlFr);
};

// * DEVELOPMENT: Run the clean, styles, scripts, html, serve, and watchDev tasks in series. The styles, scripts, and html tasks are run in parallel.
export default series(clean, styles, scripts, html, serve, watchDev);

// * DEVELOPMENT: Run the clean, styles, scripts, French html, serve, and watchDev tasks in series. The styles, scripts, and html tasks are run in parallel.
// TODO: gulp devFr --template your-template.html, if no --template is specified, the default template will be used.
export const devFr = series(clean, styles, scripts, htmlFr, serve, watchDev);

// ? PRODUCTION: Compile SASS to CSS, concatenate CSS files into styles.css, minify CSS, and auto-prefix CSS. Output to prod/css.
export const compileSass = async () => {
  try {
    await stylesProd(paths.src.sass, `${paths.prod}/css`);
  } catch (error) {
    console.error('Production: Sass compilation error:', error);
  }
};

// ? PRODUCTION: Concatenate JS files into app.js and minify JS. Output to prod/js.
export const concatAndMinifyJs = async () => {
  try {
    await scriptsProd(paths.src.js, `${paths.prod}/js`);
  } catch (error) {
    console.error('Production: JS concatenation error:', error);
  }
};

// ? PRODUCTION: Inline CSS and JS files into each of the template HTML files. Minify HTML files and remove any comments. Output to prod. The readFileSync method is used to read the contents of the CSS and JS files into variables. The injectString plugin is used to inject the CSS and JS variables into the HTML file.
export const inlineAssets = (done) => {
  htmlProd(paths.src.template, paths.prod);
  done();
};

// ? PRODUCTION: Same as above, but for the French version of HTML template files.
export const inlineAssetsFr = (done) => {
  htmlProd(paths.src.templatefr, paths.prod);
  done();
};

// ? PRODUCTION: Run the clean, compileSass, concatAndMinifyJs, and inlineAssets tasks in series.
export const build = series(
  clean,
  compileSass,
  concatAndMinifyJs,
  inlineAssets,
);

// ? PRODUCTION: Run the clean, compileSass, concatAndMinifyJs, and inlineAssets tasks in series. This is for the French version.
export const buildFr = series(
  clean,
  compileSass,
  concatAndMinifyJs,
  inlineAssetsFr,
);
