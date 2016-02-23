import * as merge from 'merge-stream';
import {join} from 'path';
import {
  APP_SRC,
  TMP_DIR,
  PROD_DEPENDENCIES,
  CSS_PROD_BUNDLE,
  CSS_DEST
} from '../configW';
import * as debug from 'gulp-debug';

export = function buildJSDev(gulp, plugins) {
  return function () {

    return merge(minifyComponentCss(), prepareTemplates(), processExternalCss());

    // This method collects component's HTML files and pushed them to TMP_DIR.
    function prepareTemplates() {
      return gulp.src(join(APP_SRC, '**', '*.html'))
        .pipe(debug({title:'html_css.prepareTemplates.src'}))
        .pipe(gulp.dest(TMP_DIR))
        .pipe(debug({title:'html_css.prepareTemplates.dist'}));
    }

    // This method collects component's CSS files, minifies them and pushed them to TMP_DIR.
    function minifyComponentCss() {
      return gulp.src([
          join(APP_SRC, '**', '*.css'),
          '!' + join(APP_SRC, 'assets', '**', '*.css')  // This line restricts any other css place in folders under assets from being picked.
        ])
        .pipe(debug({title:'html_css.minifyComponentCss.src'}))
        .pipe(plugins.cssnano())
        .pipe(debug({title:'html_css.minifyComponentCss.cssnano'}))
        .pipe(gulp.dest(TMP_DIR))
        .pipe(debug({title:'html_css.minifyComponentCss.dist'}));
    }

// This takes, PROD_DEPENDENCIES from config, and looks for CSS files in specified path, minifies them
// adds them to a common css bundle and saves them to a CSS_DEST.
    function processExternalCss() {
      return gulp.src(getExternalCss().map(r => r.src))
        .pipe(debug({title:'html_css.processExternalCss.src'}))
        .pipe(plugins.cssnano())
        .pipe(debug({title:'html_css.processExternalCss.cssnano'}))
        .pipe(plugins.concat(CSS_PROD_BUNDLE))
        .pipe(debug({title:'html_css.processExternalCss.CSS_PROD_BUNDLE'}))
        .pipe(gulp.dest(CSS_DEST))
        .pipe(debug({title:'html_css.processExternalCss.CSS_DEST'}));
    }

    function getExternalCss() {
      return PROD_DEPENDENCIES.filter(d => /\.css$/.test(d.src));
    }
  };
};
