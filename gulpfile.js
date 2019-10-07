'use strict';

const {src, dest, series, watch} = require('gulp');

const plumber = require('gulp-plumber');
const del = require('del');
const fileInclude = require('gulp-file-include');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const typograf = require('gulp-typograf');
const mediaQueriesGroup = require('gulp-group-css-media-queries');
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

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
    root: `${srcRoot}/styles`,
    common: `${srcRoot}/styles/common`,
    mixins: `${srcRoot}/styles/mixins`,
    uaKit: `${srcRoot}/styles/ua-kit`,
    vendors: `${srcRoot}/styles/vendors`
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
  styles: `${devRoot}/styles`
};

const buildPath = {
  assets: {

  },
  fonts: {

  },
  js: `${buildRoot}/js`,
  pages: `${buildRoot}`,
  styles: `${buildRoot}/styles`
};


//-----------------------------------------------------


/**
 * Html
 * --------------------------------------------------------------------------
 */

/**
 * Сборка html:
 * 1. Сборка всех инклудов из ./src/components/, ./src/pages/
 * 2. Очистка от лишних коментариев и переводов строк
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
}


/**
 * Js
 * --------------------------------------------------------------------------
 */


/**
 * Сборка js:
 * 1. Сборка всех файлов .js из ./src/js/vendors/ и ./src/components/
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
 * Отслеживание изменений js:
 * 1. Отслеживание ./src/js/, ./src/js/vendors/ и ./src/components/ на change
 */

function watchJs() {
  watch([`${srcPath.js.root}/vendors.js`,`${srcPath.js.vendors}/*.js`], { events: 'change'}, compileJsVendors);
  watch([`${srcPath.js.root}/components.js`,`${srcPath.components.root}/**/*.js`], { events: 'change'}, compileJsComponents);
  watch(`${srcPath.js.root}/common.js`, { events: 'change'}, compileJsCommon);
}


/**
 * Минификация файлов .js для build
 * 1. Сохранение обычного файла .js в ./build/js/
 * 2. Минификация и сохранение файла .min.js в ./build/js/
 */

function minifyJs() {
  return src(`${devPath.js}/*.js`)
    .pipe(plumber())
    .pipe(dest(`${buildRoot}/js`))
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(dest(`${buildRoot}/js`));
}

exports.default = minifyJs;



/**
 * Scss, css
 * --------------------------------------------------------------------------
 */


/**
 * Сборка и компиляция scss:
 * 1. Сборка всех файлов .scss и .css из ./src/styles/ и ./src/components/
 * 2. Коплиляция .scss в .css и сохранение в ./dev/styles/
 */

function compileCssGeneral() {
  return src(`${srcPath.styles.root}/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(mediaQueriesGroup())
    // TODO: добавить autoprefixer
    // TODO: добавить обработкау шрифтов
    .pipe(dest(`${devPath.styles}`));
}

function compileCssVendors() {
  return src(`${srcPath.styles.root}/vendors.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(mediaQueriesGroup())
    // TODO: добавить autoprefixer
    // TODO: добавить обработкау шрифтов
    .pipe(dest(`${devPath.styles}`));
}

function compileCssComponents() {
  return src(`${srcPath.styles.root}/components.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(mediaQueriesGroup())
    // TODO: добавить autoprefixer
    // TODO: добавить обработкау шрифтов
    .pipe(dest(`${devPath.styles}`));
}

/**
 * Отслеживание изменений scss, css на change
 * 1. Отслеживание директории ./src/styles/** кроме ./src/styles/vendors,
 * vendors.scss и components.scss
 * 2. Отслеживание директории ./src/styles/vendors/ и файла vendors.scss
 * 3. Отслеживание директории ./src/components/** и файла components.scss
 */

function watchCss() {
  watch([`${srcPath.styles.root}/**/*.scss`,`!${srcPath.styles.vendors}/*`,`!${srcPath.styles.root}/vendors.scss`,`!${srcPath.styles.root}/components.scss`], { events: 'change'}, compileCssGeneral);
  watch([`${srcPath.styles.vendors}/*`,`${srcPath.styles.root}/vendors.scss`], { events: 'change'}, compileCssVendors);
  watch([`${srcPath.styles.root}/components.scss`,`${srcPath.components.root}/**/*.scss`], { events: 'change'}, compileCssComponents);
}

/**
 * Минификация файлов .css для build
 * 1. Сохранение обычного файла .css в ./build/styles/
 * 2. Минификация и сохранение файла .min.css в ./build/styles/
 */

function minifyCss() {
  return src(`${devPath.styles}/*.css`)
    .pipe(plumber())
    .pipe(dest(`${buildRoot}/styles`))
		.pipe(csso())
		.pipe(rename({suffix: ".min"}))
		.pipe(dest(`${buildRoot}/styles`));
}

//exports.default = minifyCss;


//-----------------------------------------------------

//exports.default = watchCss;

exports.html = watchHtml;
exports.js = watchJs;
exports.css = watchCss;

