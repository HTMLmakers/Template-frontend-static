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
const svgSprite = require('gulp-svgstore');
const imagemin = require('gulp-imagemin');
const fs = require('fs');
const gulpIf = require('gulp-if');
const pngSprite = require('gulp.spritesmith');
const pngSprite3x = require('gulp.spritesmith.3x');

const srcRoot = './src';
const devRoot = './dev';
const buildRoot = './build';

const srcPath = {
  assets: {
    root: `${srcRoot}/assets`,
    img: {
      root: `${srcRoot}/assets/img`,
      sprite: {
        svg: `${srcRoot}/assets/img/sprite/svg`,
        png: `${srcRoot}/assets/img/sprite/png`
      }
    }
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
    root: `${devRoot}/assets`,
    img: {
      root: `${devRoot}/assets/img`,
      sprite: `${devRoot}/assets/img/sprite`
    }
  },
  fonts: {

  },
  js: `${devRoot}/js`,
  pages: `${devRoot}`,
  styles: `${devRoot}/styles`
};

const buildPath = {
  assets: `${buildRoot}/assets`,
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
    .pipe(dest(`${buildPath.js}`))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
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
    .pipe(dest(`${buildPath.styles}`))
    .pipe(csso())
    .pipe(rename({suffix: ".min"}))
    .pipe(dest(`${buildPath.styles}`));
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
    .pipe(svgSprite({inlineSvg: true}))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
      })
     ]))
    .pipe(rename({basename: "sprite"}))
    .pipe(dest(`${devPath.assets.img.sprite}`));
}

function watchSvgSprite() {
  watch(`${srcPath.assets.img.sprite.svg}/*.svg`, compileSvgSprite);
}



function compilePngSprite() {
  var retina3x = false; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var options = {};
  var imgs = 0, imgs2x = 0, imgs3x = 0;

  fs.readdirSync(`${srcPath.assets.img.sprite.png}`).forEach(file => {
    if ((/^[^@]+\.png$/i).test(file)) {
      imgs++;
    }
    if ((/@2x\.png$/i).test(file)) {
      imgs2x++;
    }
    if ((/@3x\.png$/i).test(file)) {
      imgs3x++;
    }
  })

  if (imgs == imgs2x && imgs == imgs3x) {
    retina3x = false;
   /* options = {
      retinaSrcFilter: './src/assets/img/sprite/png/*@2x.png',
      retina3xSrcFilter: './src/assets/img/sprite/png/*@3x.png',
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      retina3xImgName: 'sprite@3x.png',
      imgPath: '../img/sprite.png',//путь в _sprites.scss
      retinaImgPath: '../img/sprite@2x.png',//путь в _sprites.scss
      retina3xImgPath: '../img/sprite@3x.png',//путь в _sprites.scss
      cssName: '_sprites.scss'
    };*/
    console.log('---- '+imgs+imgs2x+imgs3x);
    //console.log('---- '+retina3x);
  } else if (imgs == imgs2x) {
    retina3x = true;
/*    options = {
      retinaSrcFilter: './src/assets/img/sprite/png/*@2x.png',
      imgName: 'sprite.png',
      retinaImgName: 'sprite@2x.png',
      imgPath: '../img/sprite.png',//путь в _sprites.scss
      retinaImgPath: '../img/sprite@2x.png',//путь в _sprites.scss
      cssName: '_sprites.scss'
    };*/
    console.log('++++ '+imgs+imgs2x+imgs3x);
    //console.log('++++ '+retina3x);
  } else {
    retina3x = true;
/*    options = {
      imgName: 'sprite.png',
      imgPath: '../img/sprite.png',//путь в _sprites.scss
      cssName: '_sprites.scss'
    };*/
    console.log('**** '+imgs+imgs2x+imgs3x);
    //console.log('**** '+retina3x);

  }

/*  return src(`${srcPath.assets.img.sprite.png}/*.png`) //Исключение @2 и @3
    .pipe(plumber())
    //.pipe(pngSprite(options))
    //.pipe(pngSprite3x(options))
    .pipe(gulpIf(retina3x, pngSprite(options), pngSprite3x(options))) //!!!!!!!
    .pipe(gulpIf('*.png', dest(`${devPath.assets.img.sprite}`)))
    .pipe(gulpIf('*.scss', dest(`${devPath.assets.img.sprite}`)));*/
}

exports.default = compilePngSprite;

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
  return src([`${srcPath.assets.img.root}/*.{png,jpg,svg}`,`!${srcPath.assets.img.sprite}`,`!${srcPath.assets.img.sprite}/**/*`])
    .pipe(plumber())
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest(`${devPath.assets.img.root}`));
}


//-----------------------------------------------------

//exports.default = watchCss;

exports.html = watchHtml;
exports.js = watchJs;
exports.css = watchCss;