const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');

function cleanCSS() {
  return del('dev/css');
}

function taskCSS() {
  return src('src/styles/*.css')
    .pipe(dest('dev/css'));
}

function taskJS() {
  return src('src/js/*.js')
    .pipe(dest('dev/js'));
}

function taskCSSWatch() {
  watch('src/styles/', series(cleanCSS, taskCSS));
}

exports.default = taskCSSWatch;