import * as merge from 'merge-stream';
import {
  PROD_DEPENDENCIES,
  JS_PROD_SHIMS_BUNDLE,
  JS_DEST
} from '../configW';
import * as debug from 'gulp-debug';

export = function bundles(gulp, plugins) {
  return function () {

    return merge(bundleShims());

    function getShims() {
      let libs = PROD_DEPENDENCIES
        .filter(d => /\.js$/.test(d.src));
      return libs.filter(l => l.inject === 'shims')
        .concat(libs.filter(l => l.inject === 'libs'))
        .concat(libs.filter(l => l.inject === true))
        .map(l => l.src);
    }

    // This takes, PROD_DEPENDENCIES from config, and looks for JS,SHIMS,Libs files in specified path
    // adds them to a common JS bundle (Shimps.js) and saves them to a JS_DEST.
    function bundleShims() {
      return gulp.src(getShims())
      // Strip comments and sourcemaps
      .pipe(debug({title:'build.bundle.getShims.src'}))
      .pipe(plugins.uglify({
        mangle: false
      }))
      .pipe(debug({title:'build.bundle.getShims.uglify'}))
      .pipe(plugins.concat(JS_PROD_SHIMS_BUNDLE))
      .pipe(debug({title:'build.bundle.JS_PROD_SHIMS_BUNDLE.concat'}))
      .pipe(gulp.dest(JS_DEST))
      .pipe(debug({title:'build.bundle.JS_DEST.concat'}));
    }
  };
};
