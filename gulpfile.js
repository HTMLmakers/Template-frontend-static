const { src, dest, series, parallel, watch } = require('gulp');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2eot = require('gulp-ttf2eot');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

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

const webFonts = {
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
};

/**
 * Fonts
 * --------------------------------------------------------------------------
 */

/**
 * Генерация веб щрифтов:
 * 1. Шрифты в формате TTF вставляем в ./src/fonts/
 * 2. На выходе получаем веб шрифты в ./dev/fonts
 */

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

/**
 * Styles
 * --------------------------------------------------------------------------
 */

// TODO: Обновить, когда будет ясна структура dev директории для стилей
/**
 * Post CSS трансформация:
 * 1. Берем style.css файл из ./dev/style.css
 * 2. Трансформируем его и перезаписываем в ./dev/style.css
 */

function transformByPostCSS() {
  const fontMagician = require('postcss-font-magician');
  const autoprefixer = require('autoprefixer');

  return src(`${devPath.style}`).pipe(
    postcss([
      fontMagician({
        custom: webFonts,
      }),
      autoprefixer()
    ])
  ).pipe(
    dest(`${devRoot}`)
  );
}

/**
 * Server
 * --------------------------------------------------------------------------
 */

/**
 * Browser Sync:
 * 1. Инициализация дев-сервера
 * 2. Live reload
 */

function initServer(done) {
  browserSync.init({
    server: devRoot
  });
  done();
}

function liveReload(done) {
  browserSync.reload();
  done();
}

/**
 * Exports
 * --------------------------------------------------------------------------
 */

exports.fontGeneration = fontGeneration;

// список задач и вотчеров для создания dev-версии
exports.serve = series(
  // общие задачи
  fontGeneration,

  // работа со стилями

  // инициализация дев-сервера
  initServer,

  // колбек с вотчерами
  function (done) {
    // TODO: добавить вотчеры
    console.log('watch');
    done();
  }
);

// список задач для создания build-версии
// TODO: добавить build задачи
/*exports.build = series(
  // Очистка build директории,
  parallel(
    // Минификация
    // Оптимизация картинок
    // И пр.
  )
);*/
