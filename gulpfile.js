'use strict';

const { src, dest, series, parallel } = require('gulp');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2eot = require('gulp-ttf2eot');
const postcss = require('gulp-postcss');

const srcRoot = './src';
const devRoot = './dev';
const buildRoot = './build';

const srcPath = {
  assets: {

  },
  components: {

  },
  fonts: `${srcRoot}/fonts`,
  js: {

  },
  pages: {

  },
  styles: {

  }
};

const devPath = {
  fonts: `${devRoot}/fonts`,
  style: `${devRoot}/style.css`
};

const buildPath = {

};

/*const webFonts = {
  // вариант 1
  'Custom Font': {
    variants: {
      normal: {
        400: {
          url: {
            woff: `fonts/CustomFont.woff`,
            woff2: `fonts/CustomFont.woff2`,
            eot: `fonts/CustomFont.eot`,
          }
        },
        700: {
          url: {
            woff: `fonts/CustomFont-Bold.woff`,
            woff2: `fonts/CustomFont-Bold.woff2`,
            eot: `fonts/CustomFont-Bold.eot`,
          }
        }
      }
    }
  },

  // вариант 2
  'Custom Font Regular': {
    variants: {
      normal: {
        normal: {
          url: {
            woff: `fonts/CustomFont.woff`,
            woff2: `fonts/CustomFont.woff2`,
            eot: `fonts/CustomFont.eot`,
          }
        }
      }
    }
  },

  'Custom Font Italic': {
    variants: {
      normal: {
        normal: {
          url: {
            woff: `fonts/CustomFontItalic.woff`,
            woff2: `fonts/CustomFontItalic.woff2`,
            eot: `fonts/CustomFontItalic.eot`,
          }
        }
      }
    }
  },

  'Custom Font Bold': {
    variants: {
      normal: {
        normal: {
          url: {
            woff: `fonts/CustomFontBold.woff`,
            woff2: `fonts/CustomFontBold.woff2`,
            eot: `fonts/CustomFontBold.eot`,
          }
        }
      }
    }
  },
};*/

// ==========================================================================
// Генерация веб щрифтов
// ==========================================================================

//
// 1. Шрифты в формате TTF вставляем в ${srcPath.fonts}
// 2. На выходе получаем веб шрифты в ${devPath.fonts}
//
const fontGeneration = parallel(convertTTFToWOFF, convertTTFToWOFF2, convertTTFToEOT);

function convertTTFToWOFF() {
  return src([`${srcPath.fonts}/*.ttf`])
    .pipe(ttf2woff())
    .pipe(dest([`${devPath.fonts}`]));
}

function convertTTFToWOFF2() {
  return src([`${srcPath.fonts}/*.ttf`])
    .pipe(ttf2woff2())
    .pipe(dest([`${devPath.fonts}`]));
}

function convertTTFToEOT() {
  return src([`${srcPath.fonts}/*.ttf`])
    .pipe(ttf2eot())
    .pipe(dest([`${devPath.fonts}`]));
}

// TODO: Обновить, когда будет ясна структура dev директории для стилей
// ==========================================================================
// Post CSS трансформация
// ==========================================================================
//
// 1. Берем style.css файл из ${devPath.style}
// 2. Трансформируем его в ${devPath.style}
//

function transformByPostCSS() {
  return src(`${devPath.style}`).pipe(
    postcss([
      require('postcss-font-magician')({
        custom: webFonts,
      })
    ])
  ).pipe(
    dest(`${devRoot}`)
  );
}

exports.fontGeneration = fontGeneration;
// TODO: удалить позже
exports.transformByPostCSS = transformByPostCSS;

// список задач и вотчеров для создания dev-версии
exports.serve = series(
  // общие задачи
  fontGeneration,

  // работа со стилями
  transformByPostCSS,

  // колбек с вотчерами
  function (done) {
    // TODO: добавить вотчеры
    done();
  }
);

// список задач для создания build-версии
// TODO: добавить build задачи
exports.build = series(
  // Очистка build директории,
  parallel(
    // Минификация
    // Оптимизация картинок
    // И пр.
  )
);