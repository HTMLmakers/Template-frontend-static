'use strict';


const {src, dest, watch, series} = require('gulp');

const del = require('del');
const fileInclude = require('gulp-file-include');


const srcRoot = './src';
const devRoot = './dev';
const buildRoot = './build';

const srcPath = {
  assets: {

  },
  components: {

  },
  fonts: {

  },
  js: {

  },
  pages: `${srcRoot}/pages/`,
  styles: {

  }
};

const devPath = {
  assets: {

  },
  components: {

  },
  fonts: {

  },
  js: {

  },
  pages: `${devRoot}/`,
  styles: {

  }
};

const buildPath = {

};


//-----------------------------------------------------




/**
 * Html
 * --------------------------------------------------------------------------
 */


/**
 * Сборка html:
 * 1. Сборка всех инклудов из ./src/components/, ./src/pages/
 * 2. Очистка от лишних коментариев, переводов строк !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 3. Сохранение собраных файлов .html в ./dev/
 */

function compileHtml() {
  return src(`${srcPath.pages}/*.html`)
    //.pipe(plumber())
    .pipe(fileInclude())
    //.pipe(replace(/(\<\!\-\-)(?!\s*build\:|\*|\s*endbuild\s)[^>]*(\S*\-\-\>)/gi, ''))
		//.pipe(replace(/$(\n)(\s|\n|\t)+^/gm, '$1'))
    .pipe(dest(`${devPath.pages}`));
}

/**
 * Очистка каталога ./dev/ от всех файлов .html
 */

function cleanHtml() {
  return del([`${devPath.pages}/*.html`]);
}

/**
 * Отслеживание html:   чистка каталога ./dev/ от всех файлов .html
 * 1. Отслеживание изменений в файлах .html ./src/components/, ./src/pages/
 */

function watchHtml() {
  watch('./src/pages/*.html', { events: 'unlink'}, series(cleanHtml, compileHtml));
};


//exports.default = function() {
//  watch('./src/pages/*.html', { events: 'unlink'}, series(cleanHtml, compileHtml));
//};


exports.default = watchHtml;
