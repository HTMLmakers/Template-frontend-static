'use strict';


const {src, dest, series, watch} = require('gulp');

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
    root: `${srcRoot}/js`,
    vendors: `${srcRoot}/js/vendors`
  },
  pages: {

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
  pages: {

  },
  styles: {

  }
};

const buildPath = {

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
    //.pipe(plumber())
    .pipe(fileInclude())
    .pipe(dest(`${devPath.js}`));
}

function compileJsComponents() {
  return src(`${srcPath.js.root}/components.js`)
    //.pipe(plumber())
    .pipe(fileInclude())
    .pipe(dest(`${devPath.js}`));
}

function compileJsCommon() {
  return src(`${srcPath.js.root}/common.js`)
    //.pipe(plumber())
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

exports.js = watchJs;