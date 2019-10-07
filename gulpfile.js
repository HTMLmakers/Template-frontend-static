'use strict';

const {src, dest, series, watch} = require('gulp');

const plumber = require('gulp-plumber');
const del = require('del');
const fileInclude = require('gulp-file-include');
const replace = require('gulp-replace');
const typograf = require('gulp-typograf');

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
    root: `${srcRoot}/js`,
    vendors: `${srcRoot}/js/vendors`
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
  js: `${devRoot}/js`,
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
 * 2. Очистка от лишних коментариев, переводов строк
 * 3. Обработка текста с помощью https://github.com/typograf/typograf
 * 4. Сохранение собраных файлов .html в ./dev/
 */

function compileHtml() {
  return src(`${srcPath.pages.root}/*.html`)
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(replace(/(\<\!\-\-)(?!\s*build\:|\*|\s*endbuild\s)[^>]*(\S*\-\-\>)/gi, ''))
		.pipe(replace(/$(\n)(\s|\n|\t)+^/gm, '$1'))
    .pipe(typograf({ locale: ['ru', 'en-US'] }))
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


/**
 * Js
 * --------------------------------------------------------------------------
 */


/**
 * Сборка js:
 * 1. Сборка всех файлов .js из /src/js/vendors/ и ./src/components/
 * 2. Сохранение собраных файлов .js в ./dev/js
 */

function compileJsVendors() {
  return src(`${srcPath.js.root}/vendors.js`)
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(dest(`${devPath.js}`));
}

function compileJsComponents() {
  return src(`${srcPath.js.root}/components.js`)
    .pipe(plumber())
    .pipe(fileInclude())
    .pipe(dest(`${devPath.js}`));
}

function compileJsCommon() {
  return src(`${srcPath.js.root}/common.js`)
    .pipe(plumber())
    .pipe(dest(`${devPath.js}`));
}

/**
 * Очистка каталога ./dev/js от файлов .js
 */

function cleanJsVendors() {
  return del(`${devPath.js}/vendors.js`);
}

function cleanJsComponents() {
  return del(`${devPath.js}/components.js`);
}

function cleanJsCommon() {
  return del(`${devPath.js}/common.js`);
}

/**
 * Отслеживание изменений js:
 * 1. Отслеживание ./src/js/, ./src/js/vendors/ и ./src/components/ на change
 */

function watchJs() {
  watch([`${srcPath.js.root}/vendors.js`,`${srcPath.js.vendors}/*.js`], { events: 'change'}, series(cleanJsVendors, compileJsVendors));
  watch([`${srcPath.js.root}/components.js`,`${srcPath.components.root}/**/*.js`], { events: 'change'}, series(cleanJsComponents, compileJsComponents));
  watch(`${srcPath.js.root}/common.js`, { events: 'change'}, series(cleanJsCommon, compileJsCommon));
};



//-----------------------------------------------------


exports.html = watchHtml;
exports.js = watchJs;

