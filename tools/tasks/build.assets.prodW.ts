import {join} from 'path';
import {APP_SRC, APP_DEST} from '../configW';
import * as debug from 'gulp-debug';

export = function buildAssetsDev(gulp, plugins) {
  // TODO There should be more elegant to prevent empty directories from copying
  let es = require('event-stream');
  var onlyDirs = function (es) {
    return es.map(function (file, cb) {
      if (file.stat.isFile()) {
        return cb(null, file);
      } else {
        return cb();
      }
    });
  };
  return function () {
    return gulp.src([                   // picks source files, except HTML, CSS and ts files
        join(APP_SRC, '**'),
        '!' + join(APP_SRC, '**', '*.ts'),
        '!' + join(APP_SRC, '**', '*.css'),
        '!' + join(APP_SRC, '**', '*.html'),
      ])
      // .pipe(debug({title:'ASSETS.prodW.src'}))
      .pipe(onlyDirs(es))               // Allows to copy only non empty directories.
      .pipe(debug({title:'ASSETS.prodW.onlyDIRs'}))
      .pipe(gulp.dest(APP_DEST))       // adds files to APP_DEST directory.
      .pipe(debug({title:'ASSETS.prodW.DEST'}));
  };
}
