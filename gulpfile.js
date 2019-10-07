'use strict';


const {src, dest, watch, series} = require('gulp');

const plumber = require('gulp-plumber');
const del = require('del');
const fileInclude = require('gulp-file-include');


const srcRoot = './src';
const devRoot = './dev';
const buildRoot = './build';

const srcPath = {
  assets: {

  },
  components: {
    root: `${srcRoot}/components`,
    core: `${srcRoot}/components/core`,
    features: `${srcRoot}/components/features`
  },
  fonts: {

  },
  js: {

  },
  pages: {
    root: `${srcRoot}/pages`,
    include: `${srcRoot}/pages/include`
  },
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
  pages: `${devRoot}`,
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
  return src(`${srcPath.pages.root}/*.html`)
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(replace(/(\<\!\-\-)(?!\s*build\:|\*|\s*endbuild\s)[^>]*(\S*\-\-\>)/gi, ''))
		.pipe(replace(/$(\n)(\s|\n|\t)+^/gm, '$1'))
    .pipe(dest(`${devPath.pages}`));
}

/**
 * Очистка каталога ./dev/ от всех файлов .html
 */

function cleanHtml() {
  return del(`${devPath.pages}/*.html`);
}

/**
 * Отслеживание изменений html:
 * 1. Отслеживание ./src/pages/ на все события (add, del, change)
 * 2. Отслеживание ./src/components/, ./src/pages/include/ на change
 */

function watchHtml() {
  watch(`${srcPath.pages.root}/*.html`, series(cleanHtml, compileHtml));
  watch([`${srcPath.pages.include}/*.html`,`${srcPath.components.root}/**/*.html`], { events: 'change'}, series(cleanHtml, compileHtml));
};

exports.html = watchHtml;
