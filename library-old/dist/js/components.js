/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./library/js/components.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./library/components/features/slider-slick/slider-slick.js":
/*!******************************************************************!*\
  !*** ./library/components/features/slider-slick/slider-slick.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_ui_kit_slider_slider_slick_slider_slick_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../js/ui-kit/slider/slider-slick/slider-slick.class */ \"./library/js/ui-kit/slider/slider-slick/slider-slick.class.js\");\n/* harmony import */ var _js_ui_kit_popup_popup_fancybox_popup_fancybox_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../js/ui-kit/popup/popup-fancybox/popup-fancybox.class */ \"./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.class.js\");\n\r\n\r\n\r\n$(document).ready(() => {\r\n  const slider = new _js_ui_kit_slider_slider_slick_slider_slick_class__WEBPACK_IMPORTED_MODULE_0__[\"SliderSlick\"](\r\n    $('.slider-slick__list'),\r\n    {\r\n      fade: false,\r\n      appendDots: $('.slider-slick__pagination'),\r\n    },\r\n  );\r\n  const popup = new _js_ui_kit_popup_popup_fancybox_popup_fancybox_class__WEBPACK_IMPORTED_MODULE_1__[\"PopupFancybox\"](\r\n    $('.slider-slick__popup'),\r\n    {\r\n      beforeShow() {\r\n        console.log('beforeShow');\r\n      },\r\n      afterShow() {\r\n        console.log('afterShow');\r\n      },\r\n    },\r\n  );\r\n\r\n  slider.init();\r\n  $('.slider-slick-arrow__next').on('click', () => {\r\n    slider.next();\r\n  });\r\n  $('.slider-slick-arrow__prev').on('click', () => {\r\n    slider.prev();\r\n  });\r\n\r\n  $('.slider-slick__button').on('click', () => {\r\n    popup.open();\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./library/components/features/slider-slick/slider-slick.js?");

/***/ }),

/***/ "./library/components/shared/common/back-to-top/back-to-top.js":
/*!*********************************************************************!*\
  !*** ./library/components/shared/common/back-to-top/back-to-top.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//* ==========================================================================\r\n//  Component back-to-top\r\n//  ==========================================================================\r\n\r\n$(document).ready(() => {\r\n  const $backToTop = $('.back-to-top');\r\n\r\n  $(window).on('scroll', () => {\r\n    if ($(this).scrollTop() > 100) {\r\n      $backToTop.addClass('back-to-top--is-visible');\r\n    } else {\r\n      $backToTop.removeClass('back-to-top--is-visible');\r\n    }\r\n  });\r\n\r\n  $backToTop.on('click', () => {\r\n    $('body,html').animate({\r\n      scrollTop: 0,\r\n    }, 800);\r\n\r\n    return false;\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./library/components/shared/common/back-to-top/back-to-top.js?");

/***/ }),

/***/ "./library/components/shared/common/toggle/toggle.js":
/*!***********************************************************!*\
  !*** ./library/components/shared/common/toggle/toggle.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//* ==========================================================================\r\n//  Component toggle\r\n//  ==========================================================================\r\n\r\n$(document).ready(() => {\r\n  const $toggle = $('.toggle');\r\n\r\n  $toggle.on('click', () => {\r\n    $toggle.toggleClass('toggle--is-active');\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./library/components/shared/common/toggle/toggle.js?");

/***/ }),

/***/ "./library/components/shared/layout/header-fixed/header-fixed.js":
/*!***********************************************************************!*\
  !*** ./library/components/shared/layout/header-fixed/header-fixed.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//  ==========================================================================\r\n//  Component header-fixed\r\n//  ==========================================================================\r\n\r\n$(document).ready(() => {\r\n  const $headerFixed = $('.header-fixed');\r\n\r\n  $(window).on('scroll', () => {\r\n    if ($(this).scrollTop() > 100) {\r\n      $headerFixed.addClass('header-fixed--visible');\r\n    } else {\r\n      $headerFixed.removeClass('header-fixed--visible');\r\n    }\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./library/components/shared/layout/header-fixed/header-fixed.js?");

/***/ }),

/***/ "./library/components/shared/layout/header/header.js":
/*!***********************************************************!*\
  !*** ./library/components/shared/layout/header/header.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//  ==========================================================================\r\n//  Component header\r\n//  ==========================================================================\r\n\r\n$(document).ready(() => {\r\n  const $header = $('.header');\r\n\r\n  $(window).on('scroll', () => {\r\n    if ($(this).scrollTop() > 0) {\r\n      $header.addClass('header--fixed');\r\n    } else {\r\n      $header.removeClass('header--fixed');\r\n    }\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./library/components/shared/layout/header/header.js?");

/***/ }),

/***/ "./library/js/components.js":
/*!**********************************!*\
  !*** ./library/js/components.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable */\r\n__webpack_require__(/*! ../components/features/slider-slick/slider-slick */ \"./library/components/features/slider-slick/slider-slick.js\");\r\n__webpack_require__(/*! ../components/shared/layout/header/header */ \"./library/components/shared/layout/header/header.js\");\r\n__webpack_require__(/*! ../components/shared/layout/header-fixed/header-fixed */ \"./library/components/shared/layout/header-fixed/header-fixed.js\");\r\n__webpack_require__(/*! ../components/shared/common/back-to-top/back-to-top */ \"./library/components/shared/common/back-to-top/back-to-top.js\");\r\n__webpack_require__(/*! ../components/shared/common/toggle/toggle */ \"./library/components/shared/common/toggle/toggle.js\");\r\n\n\n//# sourceURL=webpack:///./library/js/components.js?");

/***/ }),

/***/ "./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.class.js":
/*!************************************************************************!*\
  !*** ./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.class.js ***!
  \************************************************************************/
/*! exports provided: defaultOptions, PopupFancybox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultOptions\", function() { return defaultOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PopupFancybox\", function() { return PopupFancybox; });\nconst defaultOptions = {\r\n  closeExisting: true,\r\n  smallBtn: false,\r\n  toolbar: false,\r\n  touch: false,\r\n};\r\n\r\nclass PopupFancybox {\r\n  constructor($popup, options) {\r\n    this.$popup = $popup;\r\n    this.$popupCloseButton = this.$popup.find('[data-ui-kit--popup-close-button]');\r\n    this.fancybox = $.fancybox;\r\n    this.options = options;\r\n\r\n    this.$popupCloseButton.on('click', () => {\r\n      this.close();\r\n    });\r\n  }\r\n\r\n  open() {\r\n    this.fancybox.open(\r\n      this.$popup,\r\n      { ...defaultOptions, ...this.options },\r\n    );\r\n  }\r\n\r\n  close() {\r\n    this.fancybox.close();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.class.js?");

/***/ }),

/***/ "./library/js/ui-kit/slider/slider-slick/slider-slick.class.js":
/*!*********************************************************************!*\
  !*** ./library/js/ui-kit/slider/slider-slick/slider-slick.class.js ***!
  \*********************************************************************/
/*! exports provided: defaultOptions, SliderSlick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultOptions\", function() { return defaultOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SliderSlick\", function() { return SliderSlick; });\nconst defaultOptions = {\r\n  arrows: false,\r\n  dots: true,\r\n  fade: true,\r\n  speed: 2000,\r\n  autoplay: true,\r\n};\r\n\r\nclass SliderSlick {\r\n  constructor($slider, options) {\r\n    this.$slider = $slider;\r\n    this.options = options;\r\n  }\r\n\r\n  init() {\r\n    this.$slider.slick({ ...defaultOptions, ...this.options });\r\n  }\r\n\r\n  next() {\r\n    this.$slider.slick('slickNext');\r\n  }\r\n\r\n  prev() {\r\n    this.$slider.slick('slickPrev');\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./library/js/ui-kit/slider/slider-slick/slider-slick.class.js?");

/***/ })

/******/ });