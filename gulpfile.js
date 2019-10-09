const { src, dest, series, parallel, watch } = require('gulp');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2eot = require('gulp-ttf2eot');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const psi = require('psi');
const ngrok = require('ngrok');
const path = require('path');
const tap = require('gulp-tap');

let buildUrl = '';
let urls = [];

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
 * Servers
 * --------------------------------------------------------------------------
 */

/**
 * Browser Sync:
 * 1. Инициализация dev-сервера
 * 2. Live reload
 * 3. Инициализация ngrok
 */

function initDevServer(done) {
  browserSync.init({
    server: devRoot,
    port: 8080,
  }, function(err, bs) {
    return ngrok.connect(bs.options.get('port')).then(function (url) {
      console.log('Tunnel Dev:', url);
      done();
    });
  });
}

function initBuildServer(done) {
  browserSync.init({
    server: buildRoot,
    port: 5000,
  }, function(err, bs) {
    return ngrok.connect(bs.options.get('port')).then(function (url) {
      console.log('Tunnel Build:', url);
      buildUrl = url;
      done();
    });
  });
}

function liveReload(done) {
  browserSync.reload();
  done();
}

/**
 * Optimization reports
 * --------------------------------------------------------------------------
 */

/**
 * Psi:
 * 1. получаем все url страниц
 * 2. Выводим десктопный отчет
 * 3. Выводим мобильный отчет
 */

const getPsiReport = series(getAllBuildUrls, getPsiDesktopReport, getPsiMobileReport);

function getAllBuildUrls() {
  return src(`${buildRoot}/*.html`)
    .pipe(
      tap(function(file){
        const filename = path.basename(file.path);
        const url = `${buildUrl}/${filename}`;

        urls.push(url);
      })
    );
}

function getPsiDesktopReport(done) {
  logPsiReport('DESKTOP PSI REPORT', 'desktop', done);
}

function getPsiMobileReport(done) {
  logPsiReport('MOBILE PSI REPORT', 'mobile', done);
}

function logPsiReport(title, strategy, done) {
  console.log('--------------------------------------');
  console.log(title);
  console.log('--------------------------------------');
  urls.forEach(function (url, index) {
    psi(url, {
      nokey: 'true',
      strategy: strategy
    }).then(function (data) {
      console.log(url);
      console.log('Speed score:', data.ruleGroups.SPEED.score);
      if (strategy === 'mobile') {
        console.log('Usability score:', data.ruleGroups.USABILITY.score);
      }
      console.log('---');

      setTimeout(function () {
        if(index === (urls.length - 1)) {
          done();
        }
      }, 1000);
    });
  });
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

  // инициализация dev-сервера
  initDevServer,

  // колбек с вотчерами
  function (done) {
    // TODO: добавить вотчеры
    console.log('watch');
    done();
  }
);

// список задач для создания build-версии
// TODO: добавить build задачи
exports.build = series(
  // Очистка build директории,
  /*parallel(
    // Минификация
    // Оптимизация картинок
    // И пр.
  ),*/
  // инициализация build-сервера
  initBuildServer,
  // Psi отчет
  getPsiReport,
);