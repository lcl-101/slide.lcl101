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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/module/slide/slide.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/module/slide/slide.ts":
/*!**************************************!*\
  !*** ./static/module/slide/slide.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n///<<reference path=\"@types/jquery\"/>\nvar Slide = /** @class */ (function () {\n    function Slide(el, config) {\n        this.el = $(el);\n        //传入数据\n        this.props = {\n            init: config.init || true,\n            time: config.time || 3000\n        };\n        //事件\n        this.on = {\n            slideChangeStart: config.on && config.on.slideChangeStart || '',\n            slideChangeEnd: config.on && config.on.slideChangeEnd || ''\n        };\n        //内部数据\n        this.data = {\n            index: 0,\n            next: 0,\n            prev: 0,\n            play: null,\n            isPagination: this.el.find('.slide-pagination').length\n        };\n        //内部方法\n        this.move = null;\n        // 初始化\n        this.initData();\n    }\n    ;\n    Slide.prototype.initData = function () {\n        var that = this;\n        try {\n            this.el.find('.slide-item').hide();\n            this.el.find('.slide-item').eq(0).stop(true, false).show();\n            //初始化按钮数量\n            if (this.data.isPagination) {\n                for (var i = 0; i < that.el.find('.slide-item').length; i++) {\n                    that.el.find('.slide-pagination').append('<span class=\"slide-pagination-bullet\" data-index=\"' + i + '\"></span>');\n                }\n                that.el.find('.slide-pagination-bullet').eq(0).addClass('active');\n            }\n            if (this.props.init) {\n                this.autoPlayer();\n            }\n            this.initEvent();\n        }\n        catch (e) {\n            console.log(e);\n        }\n    };\n    ;\n    Slide.prototype.initEvent = function () {\n        var that = this;\n        this.el.delegate('.slide-pagination-bullet', 'click', function (event) {\n            // @ts-ignore\n            that.slideChage.call(this, that);\n        });\n        this.el.on('mouseenter', function (event) {\n            if (that.data.play) {\n                clearInterval(that.data.play);\n                that.data.play = '';\n                console.log('enter');\n            }\n        });\n        this.el.on('mouseleave', function (event) {\n            if (that.data.play) {\n                return;\n            }\n            that.data.play = setInterval(that.move, that.props.time);\n            console.log('leave');\n        });\n    };\n    ;\n    Slide.prototype.autoPlayer = function () {\n        var that = this;\n        this.move = function () {\n            if (that.on.slideChangeStart) {\n                that.on.slideChangeStart({ index: that.data.index + 1 });\n            }\n            that.data.next++;\n            if (that.data.next >= that.el.find('.slide-item').length) {\n                that.data.next = 0;\n            }\n            that.el.find('.slide-item').eq(that.data.index).stop(true, false).fadeOut();\n            that.el.find('.slide-item').eq(that.data.next).stop(true, false).fadeIn();\n            if (that.data.isPagination) {\n                that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');\n                that.el.find('.slide-pagination-bullet').eq(that.data.next).addClass('active');\n            }\n            that.data.index = that.data.next;\n            if (that.on.slideChangeEnd) {\n                that.on.slideChangeEnd({ index: that.data.index + 1 });\n            }\n        };\n        clearInterval(that.data.play); //创建定时器前先清除掉上一个定时器\n        that.data.play = setInterval(that.move, that.props.time);\n    };\n    ;\n    Slide.prototype.slideChage = function (that) {\n        var _this = $(this);\n        var index = _this.attr('data-index');\n        if (index === that.data.index) {\n            return;\n        }\n        if (that.on.slideChangeStart) {\n            that.on.slideChangeStart({ index: +that.data.index + 1 });\n        }\n        that.el.find('.slide-item').eq(that.data.index).stop(true, false).fadeOut();\n        that.el.find('.slide-item').eq(index).stop(true, false).fadeIn();\n        if (that.data.isPagination) {\n            that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');\n            that.el.find('.slide-pagination-bullet').eq(index).addClass('active');\n        }\n        // @ts-ignore\n        that.data.index = that.data.next = +index;\n        if (that.on.slideChangeEnd) {\n            // @ts-ignore\n            that.on.slideChangeEnd({ index: +index + 1 });\n        }\n    };\n    return Slide;\n}());\nwindow.Slide = Slide;\n\n\n//# sourceURL=webpack:///./static/module/slide/slide.ts?");

/***/ })

/******/ });