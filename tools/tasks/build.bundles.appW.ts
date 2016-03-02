import {join} from 'path';
import * as Builder from 'systemjs-builder';
import {
  BOOTSTRAP_MODULE,
  JS_PROD_APP_BUNDLE,
  JS_DEST,
  SYSTEM_BUILDER_CONFIG,
  TMP_DIR
} from '../configW';
import * as util from 'gulp-util';
import * as chalk from 'chalk';

const BUNDLER_OPTIONS = {
  format: 'cjs',
  minify: true,
  mangle: false
};

//This picks js and other files from TMP_DIST and pushes all content to app.js at JS_DEST
export = function bundles(gulp, plugins) {
  return function (done) {
    let builder = new Builder(SYSTEM_BUILDER_CONFIG);
    console.log(builder);
    util.log('join(TMP_DIR, BOOTSTRAP_MODULE)', chalk.yellow(join(TMP_DIR, BOOTSTRAP_MODULE)));
    util.log('join(JS_DEST, JS_PROD_APP_BUNDLE)', chalk.yellow(join(JS_DEST, JS_PROD_APP_BUNDLE)));
    builder
      .buildStatic(join(TMP_DIR, BOOTSTRAP_MODULE),
                   join(JS_DEST, JS_PROD_APP_BUNDLE),
                   BUNDLER_OPTIONS)
      .then(() => done());
  };
};
