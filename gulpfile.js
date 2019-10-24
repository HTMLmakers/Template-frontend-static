const {
  src, dest, series, watch, parallel,
} = require('gulp');

const plumber = require('gulp-plumber');
const del = require('del');
const fileInclude = require('gulp-file-include');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const typograf = require('gulp-typograf');
const mediaQueriesGroup = require('gulp-group-css-media-queries');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const svgSprite = require('gulp-svgstore');
const imagemin = require('gulp-imagemin');
const fs = require('fs');
const gulpIf = require('gulp-if');
const pngSprite = require('gulp.spritesmith');
const pngSprite3x = require('gulp.spritesmith.3x');
const stylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const htmllint = require('gulp-htmllint');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2eot = require('gulp-ttf2eot');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
const psi = require('psi');
const ngrok = require('ngrok');
const path = require('path');
const tap = require('gulp-tap');
const autoprefixer = require('autoprefixer');
const htmlreplace = require('gulp-html-replace');
const concat = require('gulp-concat');

let buildUrl = '';
const urls = [];

const srcRoot = './src';
const devRoot = './dev';
const buildRoot = './build';

const srcPath = {
  assets: {
    root: `${srcRoot}/assets`,
    img: {
      root: `${srcRoot}/assets/img`,
      sprite: {
        root: `${srcRoot}/assets/img/sprite`,
        svg: `${srcRoot}/assets/img/sprite/svg`,
        png: `${srcRoot}/assets/img/sprite/png`,
      },
    },
  },
  components: {
    root: `${srcRoot}/components`,
    core: `${srcRoot}/components/core`,
    features: `${srcRoot}/components/features`,
  },
  fonts: `${srcRoot}/fonts`,
  js: {
    root: `${srcRoot}/js`,
    vendors: `${srcRoot}/js/vendors`,
  },
  pages: {
    root: `${srcRoot}/pages`,
    include: `${srcRoot}/pages/include`,
  },
  styles: {
    root: `${srcRoot}/styles`,
    common: `${srcRoot}/styles/common`,
    mixins: `${srcRoot}/styles/mixins`,
    uaKit: `${srcRoot}/styles/ua-kit`,
    vendors: `${srcRoot}/styles/vendors`,
  },
};

const devPath = {
  assets: {
    root: `${devRoot}/assets`,
    img: {
      root: `${devRoot}/assets/img`,
    },
  },
  fonts: `${devRoot}/fonts`,
  js: `${devRoot}/js`,
  pages: `${devRoot}`,
  styles: `${devRoot}/styles`,
};

const buildPath = {
  assets: `${buildRoot}/assets`,
  fonts: `${buildRoot}/fonts`,
  js: `${buildRoot}/js`,
  pages: `${buildRoot}`,
  styles: `${buildRoot}/styles`,
};

//-----------------------------------------------------

/**
 * Servers
 * --------------------------------------------------------------------------
 */

/**
 * Browser Sync:
 * 1. Инициализация dev-сервера
 * 2. Инициализация build-сервера
 * 3. Инициализация ngrok
 * 4. Live reload
 */

function initDevServer(done) {
  browserSync.init({
    server: devRoot,
    port: 8080,
    browser: 'chrome',
  }, (err, bs) => ngrok.connect(bs.options.get('port')).then((url) => {
    console.log('Tunnel Dev:', url);
    done();
  }));
}

function initBuildServer(done) {
  browserSync.init({
    server: buildRoot,
    port: 5000,
    browser: 'chrome',
  }, (err, bs) => ngrok.connect(bs.options.get('port')).then((url) => {
    console.log('Tunnel Build:', url);
    buildUrl = url;
    done();
  }));
}

function liveReload(done) {
  browserSync.reload();
  done();
}

/**
 * Cleaning
 * --------------------------------------------------------------------------
 */

/**
 * Очистка директорий:
 * 1. Очистка ./dev
 * 2. Очистка ./build
 */


function cleanDev() {
  return del(`${devRoot}`);
}

function cleanBuild() {
  return del(`${buildRoot}`);
}

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
  const buildRegEx = /(\/<\/!\/-\/-)(?!\s*build\/:|\*|\s*endbuild\s)[^>]*(\S*\/-\/-\/>)/gi;
  const emptySpacesRegEx = /$(\n)(\s|\n|\t)+^/gm;
  let svgSpriteExists;

  if (fs.existsSync(`${srcPath.assets.img.sprite.root}/sprite.svg`)) {
    svgSpriteExists = true;
  } else {
    svgSpriteExists = false;
  }

  return src(`${srcPath.pages.root}/*.html`)
    .pipe(plumber())
    .pipe(fileInclude({
      basepath: `${srcRoot}`,
      context: {
        svgSpriteExists,
      },
    }))
    .pipe(replace(buildRegEx, ''))
    .pipe(replace(emptySpacesRegEx, '$1'))
    .pipe(typograf({ locale: ['ru', 'en-US'] }))
    .pipe(htmllint())
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

function buildHtml() {
  return src(`${devPath.pages}/*.html`)
    .pipe(htmlreplace({
      css: {
        src: null,
        tpl: '<link rel="stylesheet" href="styles/style.min.css" media="all">',
      },
      js: {
        src: null,
        tpl: '<script src="js/script.min.js" async></script>',
      },
    }))
    .pipe(dest(`${buildPath.pages}`));
}

function watchHtml() {
  const tasks = series(cleanHtml, compileHtml, liveReload);

  watch(`${srcPath.pages.root}/*.html`, tasks);
  watch([
    `${srcPath.pages.include}/*.html`,
    `${srcPath.components.root}/**/*.html`,
  ], { events: 'change' }, tasks);
  watch(`${srcPath.assets.img.sprite.root}/sprite.svg`, tasks);
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
    .pipe(fileInclude({
      basepath: `${srcRoot}`,
    }))
    .pipe(dest(`${devPath.js}`));
}

function compileJsComponents() {
  return src(`${srcPath.js.root}/components.js`)
    .pipe(plumber())
    .pipe(fileInclude({
      basepath: `${srcRoot}`,
    }))
    .pipe(eslint())
    .pipe(dest(`${devPath.js}`));
}

function compileJsCommon() {
  return src(`${srcPath.js.root}/common.js`)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(dest(`${devPath.js}`));
}

/**
 * Отслеживание изменений js:
 * 1. Отслеживание ./src/js/, ./src/js/vendors/ и ./src/components/ на change
 */

function watchJs() {
  watch([
    `${srcPath.js.root}/vendors.js`,
    `${srcPath.js.vendors}/*.js`,
  ], { events: 'change' }, series(compileJsVendors, liveReload));
  watch([
    `${srcPath.js.root}/components.js`,
    `${srcPath.components.root}/**/*.js`,
  ], { events: 'change' }, series(compileJsComponents, liveReload));
  watch(`${srcPath.js.root}/common.js`, { events: 'change' }, series(compileJsCommon, liveReload));
}


/**
 * Минификация файлов .js для build
 * 1. Сохранение обычного файла .js в ./build/js/
 * 2. Минификация и сохранение файла .min.js в ./build/js/
 */

function minifyJs() {
  return src(`${devPath.js}/*.js`)
    .pipe(plumber())
    .pipe(dest(`${buildPath.js}`))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(`${buildPath.js}`));
}


/**
 * Scss, css
 * --------------------------------------------------------------------------
 */

/**
 * Сборка и компиляция scss:
 * 1. Сборка всех файлов .scss и .css из ./src/styles/ и ./src/components/
 * 2. Коплиляция .scss в .css и сохранение в ./dev/styles/
 * 3. Post CSS трансформация
 */

const stylelintOptions = {
  fix: true,
  reporters: [
    {
      formatter: 'string',
      console: true,
    },
  ],
};

function compileCssGeneral() {
  return src(`${srcPath.styles.root}/style.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(mediaQueriesGroup())
    .pipe(
      postcss([
        autoprefixer(),
      ]),
    )
    .pipe(stylelint(stylelintOptions))
    .pipe(dest(`${devPath.styles}`));
}

function compileCssVendors() {
  return src(`${srcPath.styles.root}/vendors.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(mediaQueriesGroup())
    .pipe(
      postcss([
        autoprefixer(),
      ]),
    )
    .pipe(dest(`${devPath.styles}`));
}

function compileCssComponents() {
  return src(`${srcPath.styles.root}/components.scss`)
    .pipe(plumber())
    .pipe(sass())
    .pipe(mediaQueriesGroup())
    .pipe(
      postcss([
        autoprefixer(),
      ]),
    )
    .pipe(stylelint(stylelintOptions))
    .pipe(dest(`${devPath.styles}`));
}

/**
 * Build для файлов .css
 * 1. Сохранение обычного файла .css в ./build/styles/
 * 2. Минификация и сохранение файла .min.css в ./build/styles/
 */

function buildCss() {
  return src([
    `${devPath.styles}/vendors.css`,
    `${devPath.styles}/style.css`,
    `${devPath.styles}/components.css`,
  ])
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(dest(`${buildPath.styles}`))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(`${buildPath.styles}`));
}

/**
 * Отслеживание изменений scss, css на change
 * 1. Отслеживание директории ./src/styles/** кроме ./src/styles/vendors,
 * vendors.scss и components.scss
 * 2. Отслеживание директории ./src/styles/vendors/ и файла vendors.scss
 * 3. Отслеживание директории ./src/components/** и файла components.scss
 */

function watchCss() {
  watch([
    `${srcPath.styles.root}/**/*.scss`,
    `!${srcPath.styles.vendors}/*`,
    `!${srcPath.styles.root}/vendors.scss`,
    `!${srcPath.styles.root}/components.scss`,
  ], { events: 'change' }, series(compileCssGeneral, liveReload));
  watch([
    `${srcPath.styles.vendors}/*`,
    `${srcPath.styles.root}/vendors.scss`,
  ], { events: 'change' }, series(compileCssVendors, liveReload));
  watch([
    `${srcPath.styles.root}/components.scss`,
    `${srcPath.components.root}/**/*.scss`,
  ], { events: 'change' }, series(compileCssComponents, liveReload));
}

/**
 * Svg спрайт
 * --------------------------------------------------------------------------
 */

/**
 * Создание спрайта svg
 * 1. Сбор всех файлов .svg из ./src/assets/img/sprite/svg/ в спрайт
 * 2. Оптимизация svg-спрайта
 * 3. Переименование и сохранение в ./dev/assets/img/sprite/
 */

function compileSvgSprite() {
  return src(`${srcPath.assets.img.sprite.svg}/*.svg`)
    .pipe(plumber())
    .pipe(svgSprite({ inlineSvg: true }))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(rename({ basename: 'sprite' }))
    .pipe(dest(`${srcPath.assets.img.sprite.root}`));
}

function watchSvgSprite() {
  watch(`${srcPath.assets.img.sprite.svg}/*.svg`, compileSvgSprite);
}

function compilePngSprite() {
  let plugin = pngSprite;
  let spriteSrc = `${srcPath.assets.img.sprite.png}/*.png`;
  let imgs = 0;
  let imgs2x = 0;
  let imgs3x = 0;

  const options = {
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png',
    cssName: '_sprites.scss',
  };
  const options2x = {
    retinaImgName: 'sprite@2x.png',
    retinaImgPath: '../img/sprite@2x.png',
    retinaSrcFilter: './src/assets/img/sprite/png/*@2x.png',
  };
  const options3x = {
    retina3xImgName: 'sprite@3x.png',
    retina3xImgPath: '../img/sprite@3x.png',
    retina3xSrcFilter: './src/assets/img/sprite/png/*@3x.png',
  };

  fs.readdirSync(`${srcPath.assets.img.sprite.png}`).forEach((file) => {
    if ((/^[^@]+\.png$/i).test(file)) {
      imgs++;
    }
    if ((/@2x\.png$/i).test(file)) {
      imgs2x++;
    }
    if ((/@3x\.png$/i).test(file)) {
      imgs3x++;
    }
  });

  if (imgs === imgs2x && imgs === imgs3x) {
    plugin = pngSprite3x;
    Object.assign(options, options2x, options3x);
  } else if (imgs === imgs2x) {
    spriteSrc = [
      `${srcPath.assets.img.sprite.png}/*.png`,
      `!${srcPath.assets.img.sprite.png}/*@3x.png`,
    ];
    Object.assign(options, options2x);
  } else {
    spriteSrc = [
      `${srcPath.assets.img.sprite.png}/*.png`,
      `!${srcPath.assets.img.sprite.png}/*@2x.png`,
      `!${srcPath.assets.img.sprite.png}/*@3x.png`,
    ];
  }

  return src(spriteSrc)
    .pipe(plumber())
    .pipe(plugin(options))
    .pipe(gulpIf('*.png', dest(`${srcPath.assets.img.sprite.root}`)))
    .pipe(gulpIf('*.scss', dest(`${srcPath.styles.mixins}`)));
}

function watchPngSprite() {
  watch(`${srcPath.assets.img.sprite.png}`, compilePngSprite);
}

/**
 * Fonts
 * --------------------------------------------------------------------------
 */

/**
 * Генерация веб щрифтов:
 * 1. Шрифты в формате TTF вставляем в ./src/fonts/
 * 2. На выходе получаем веб шрифты в ./dev/fonts
 */

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

function cleanFonts() {
  return del(`${devPath.fonts}`);
}

function watchFonts() {
  watch(`${srcPath.fonts}/*.ttf`, fontGeneration);
}

const fontGeneration = series(
  cleanFonts,
  parallel(convertTTFToWOFF, convertTTFToWOFF2, convertTTFToEOT),
);

/**
 * Optimization reports
 * --------------------------------------------------------------------------
 */

/**
 * Psi:
 * 1. получаем все url build-страниц
 * 2. Выводим десктопный отчет
 * 3. Выводим мобильный отчет
 */

function getAllBuildUrls() {
  return src(`${buildRoot}/*.html`)
    .pipe(
      tap((file) => {
        const filename = path.basename(file.path);
        const url = `${buildUrl}/${filename}`;

        urls.push(url);
      }),
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
  urls.forEach((url, index) => {
    psi(url, {
      nokey: 'true',
      strategy,
    }).then((data) => {
      console.log(url);
      console.log('Speed score:', data.ruleGroups.SPEED.score);
      if (strategy === 'mobile') {
        console.log('Usability score:', data.ruleGroups.USABILITY.score);
      }
      console.log('---');

      setTimeout(() => {
        if (index === (urls.length - 1)) {
          done();
        }
      }, 1000);
    });
  });
}

const getPsiReport = series(getAllBuildUrls, getPsiDesktopReport, getPsiMobileReport);

/**
 * Финальная сборка (build)
 * --------------------------------------------------------------------------
 */

/**
 * Оптимизация изображений
 * 1. Сбор всех файлов .png, .jpg, .svg из ./dev/assets/img/
 * 2. Оптимизация изображений
 * 3. Cохранение в ./build/assets/img/
 */

function minifyImg() {
  return src([`${srcPath.assets.img.root}/*.{png,jpg,svg}`, `!${srcPath.assets.img.sprite}`, `!${srcPath.assets.img.sprite}/**/*`])
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(dest(`${devPath.assets.img.root}`));
}

/**
 * Перенос файлов
 * Экспорт всех файлов из ./dev/assets/ (кроме ./dev/assets/img) в ./build/assets/
 */

/*function exportAssetsFiles() {
  return src([
    `${srcPath.assets.root}/!**!/!*`,
    `!${srcPath.assets.img.root}`,
    `!${srcPath.assets.img.root}/!**!/!*`,
  ])
    .pipe(dest(`${devPath.assets}`));
}*/

function cleanAsset() {
  return del(`${devPath.assets.root}`);
}

function exportAssetsDev() {
  return src([
    `${srcPath.assets.root}/**/*.*`,
    `!${srcPath.assets.img.sprite.png}`,
    `!${srcPath.assets.img.sprite.png}/**/*`,
    `!${srcPath.assets.img.sprite.svg}`,
    `!${srcPath.assets.img.sprite.svg}/**/*`,
  ])
    .pipe(dest(`${devPath.assets.root}`));
}

function watchAssets() {
  watch([
    `${srcPath.assets.root}/**/*.*`,
    `!${srcPath.assets.img.sprite.png}`,
    `!${srcPath.assets.img.sprite.png}/**/*`,
    `!${srcPath.assets.img.sprite.svg}`,
    `!${srcPath.assets.img.sprite.svg}/**/*`,
  ], series(cleanAsset, exportAssetsDev));
}

// список задач и вотчеров для создания dev-версии
exports.serve = series(
  // очистка
  cleanDev,
  // общие задачи
  fontGeneration,
  exportAssetsDev,
  // sprites
  compileSvgSprite,
  compilePngSprite,
  // html
  compileHtml,
  // css
  compileCssGeneral,
  compileCssVendors,
  compileCssComponents,
  // js
  compileJsCommon,
  compileJsVendors,
  compileJsComponents,

  // инициализация dev-сервера
  initDevServer,

  // колбек с вотчерами
  (done) => {
    watchHtml();
    watchCss();
    watchJs();
    watchSvgSprite();
    watchPngSprite();
    watchAssets();
    watchFonts();

    done();
  },
);

/**
 * Exports
 * --------------------------------------------------------------------------
 */

// список задач для создания build-версии
// TODO: добавить build задачи
exports.build = series(
  // очистка
  cleanBuild,
  // сборка
  buildHtml,
  buildCss,
  /* parallel(
    // Минификация
    // Оптимизация картинок
    // И пр.
  ), */
  // инициализация build-сервера
  initBuildServer,
  // Psi отчет
  // getPsiReport,
);
