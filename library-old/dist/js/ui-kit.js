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
/******/ 	return __webpack_require__(__webpack_require__.s = "./library/js/ui-kit.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./library/js/ui-kit.js":
/*!******************************!*\
  !*** ./library/js/ui-kit.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable */\r\n__webpack_require__(/*! ./ui-kit/slider/slider-slick/slider-slick */ \"./library/js/ui-kit/slider/slider-slick/slider-slick.js\");\r\n__webpack_require__(/*! ./ui-kit/popup/popup-fancybox/popup-fancybox */ \"./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.js\");\r\n// require('./ui-kit/carusel');\r\n// require('./ui-kit/go-to-section');\r\n// require('./ui-kit/form-placeholderl');\r\n// require('./ui-kit/form-validation');\r\n// require('./ui-kit/custom-select');\r\n\n\n//# sourceURL=webpack:///./library/js/ui-kit.js?");

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

/***/ "./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.js":
/*!******************************************************************!*\
  !*** ./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _popup_fancybox_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup-fancybox.class */ \"./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.class.js\");\n\r\n\r\n$(document).ready(() => {\r\n  $('[data-ui-kit--popup-open-button]').on('click', (ev) => {\r\n    ev.preventDefault();\r\n\r\n    const $popupOpenButton = $(ev.currentTarget);\r\n    const popupName = $popupOpenButton.data('ui-kit--popup-open-button');\r\n    const options = $popupOpenButton.data('ui-kit--popup-open-options');\r\n    const $popup = $(`[data-ui-kit--popup-name=${popupName}]`);\r\n\r\n    const popup = new _popup_fancybox_class__WEBPACK_IMPORTED_MODULE_0__[\"PopupFancybox\"](\r\n      $popup,\r\n      { ..._popup_fancybox_class__WEBPACK_IMPORTED_MODULE_0__[\"defaultOptions\"], ...options },\r\n    );\r\n\r\n    popup.open();\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./library/js/ui-kit/popup/popup-fancybox/popup-fancybox.js?");

/***/ }),

/***/ "./library/js/ui-kit/slider/slider-slick/slider-slick.class.js":
/*!*********************************************************************!*\
  !*** ./library/js/ui-kit/slider/slider-slick/slider-slick.class.js ***!
  \*********************************************************************/
/*! exports provided: defaultOptions, SliderSlick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultOptions\", function() { return defaultOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SliderSlick\", function() { return SliderSlick; });\nconst defaultOptions = {\r\n  arrows: false,\r\n  dots: true,\r\n  fade: true,\r\n  speed: 2000,\r\n  autoplay: true,\r\n};\r\n\r\nclass SliderSlick {\r\n  constructor($slider, options) {\r\n    this.$slider = $slider;\r\n    this.options = options;\r\n  }\r\n\r\n  init() {\r\n    this.$slider.slick({ ...defaultOptions, ...this.options });\r\n  }\r\n\r\n  next() {\r\n    this.$slider.slick('slickNext');\r\n  }\r\n\r\n  prev() {\r\n    this.$slider.slick('slickPrev');\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./library/js/ui-kit/slider/slider-slick/slider-slick.class.js?");

/***/ }),

/***/ "./library/js/ui-kit/slider/slider-slick/slider-slick.js":
/*!***************************************************************!*\
  !*** ./library/js/ui-kit/slider/slider-slick/slider-slick.js ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slider_slick_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider-slick.class */ \"./library/js/ui-kit/slider/slider-slick/slider-slick.class.js\");\n\r\n\r\n$(document).ready(() => {\r\n  const $sliderContainer = $('[data-ui-kit--slider-container]');\r\n\r\n  $sliderContainer.each((index, el) => {\r\n    const $container = $(el);\r\n    const $slider = $container.find('[data-ui-kit--slider-list]');\r\n    const $buttonNext = $container.find('[data-ui-kit--slider-next-button]');\r\n    const $buttonPrev = $container.find('[data-ui-kit--slider-prev-button]');\r\n    const options = $slider.data('ui-kit--slider-options');\r\n\r\n    _slider_slick_class__WEBPACK_IMPORTED_MODULE_0__[\"defaultOptions\"].appendDots = $container.find('[data-ui-kit--slider-pagination]');\r\n\r\n    const slider = new _slider_slick_class__WEBPACK_IMPORTED_MODULE_0__[\"SliderSlick\"](\r\n      $slider,\r\n      { ..._slider_slick_class__WEBPACK_IMPORTED_MODULE_0__[\"defaultOptions\"], ...options },\r\n    );\r\n\r\n    slider.init();\r\n    $buttonNext.on('click', () => {\r\n      slider.next();\r\n    });\r\n    $buttonPrev.on('click', () => {\r\n      slider.prev();\r\n    });\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack:///./library/js/ui-kit/slider/slider-slick/slider-slick.js?");

/***/ })

/******/ });