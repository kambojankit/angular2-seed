import {join} from 'path';
import {APP_SRC, TMP_DIR} from '../configW';
import {templateLocals, tsProjectFn} from '../utils';
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as debug from 'gulp-debug';

const INLINE_OPTIONS = {
  base: TMP_DIR ,
  useRelativePaths: true,
  removeLineBreaks: true
};

//This is responsible for pulling all typings delaration files from provided paths,
// and source component's typescript files, converting them to JS and storing in TMP_DIR
export = function buildJSProd(gulp, plugins) {
  return function () {
    let tsProject = tsProjectFn(plugins);
    util.log('BUILD JS Prod: tsProject', chalk.yellow(tsProject));

    let src = [
      'typings/browser.d.ts',
      'tools/manual_typings/**/*.d.ts',
      join(APP_SRC, '**/*.ts'),
      '!' + join(APP_SRC, '**/*.spec.ts'),
      '!' + join(APP_SRC, '**/*.e2e.ts')
    ];
    let result = gulp.src(src)
      .pipe(debug({title:'buildJS.Prod.src'}))
      .pipe(plugins.plumber())
      .pipe(debug({title:'buildJS.Prod.plumbr'}))
      .pipe(plugins.inlineNg2Template(INLINE_OPTIONS))
      .pipe(debug({title:'buildJS.Prod.inlineNG2'}))
      .pipe(plugins.typescript(tsProject));

    return result.js
      .pipe(debug({title:'buildJS.Prod.resultJS.tsProject'}))
      .pipe(plugins.template(templateLocals()))
      .pipe(debug({title:'buildJS.Prod.resultJS.templateLocals'}))
      .pipe(gulp.dest(TMP_DIR))
      .pipe(debug({title:'buildJS.Prod.resultJS.dir'}));
  };
};
