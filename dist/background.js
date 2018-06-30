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
/******/ 	return __webpack_require__(__webpack_require__.s = "./background/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./background/index.js":
/*!*****************************!*\
  !*** ./background/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Store = __webpack_require__(/*! ../util/Store */ "./util/Store.js");

var _Store2 = _interopRequireDefault(_Store);

var _Request = __webpack_require__(/*! ../util/Request */ "./util/Request.js");

var Request = _interopRequireWildcard(_Request);

var _options = __webpack_require__(/*! ./options */ "./background/options/index.js");

var _options2 = _interopRequireDefault(_options);

var _user = __webpack_require__(/*! ./user */ "./background/user.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 初始化默认配置
/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-09 21:42:02
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-30 13:53:17
 */
var local = new _Store2.default('options');

// 如果localStorage已经有了配置，那合并
var oldStorage = local.toObject();
local.fromObject(Object.assign({}, _options2.default, oldStorage));

var zoom = local.get('zoom');

window.store = local;

(0, _user.init_user_id)(local);

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    var message = response.message,
        zoom = response.zoom,
        search = response.search;

    var tasks = { error: '', tasks: '' };

    switch (message) {
        case 'get_zoom':
            tasks = Object.assign(tasks, { zoom: local.get('zoom') });
            break;

        case 'get_search':
            tasks = Object.assign(tasks, { search: local.get('search') });
            break;

        default:

            break;
    }

    sendResponse(tasks);
});

/***/ }),

/***/ "./background/options/index.js":
/*!*************************************!*\
  !*** ./background/options/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    zoom: 0.9 // 默认缩放,
};

/***/ }),

/***/ "./background/user.js":
/*!****************************!*\
  !*** ./background/user.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Request = __webpack_require__(/*! ../util/Request */ "./util/Request.js");

// 获得user_id
var getUserId = 'http://game.granbluefantasy.jp/user/user_id';

module.exports = {
    init_user_id: function init_user_id(STORE) {
        !STORE.get('userId') && (0, _Request.get_by_cookie)(getUserId, {}, function (result) {
            var user_id = result.user_id;


            STORE.set('userId', user_id);
        });
    }
};

/***/ }),

/***/ "./util/Request.js":
/*!*************************!*\
  !*** ./util/Request.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-08 09:13:33 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-29 16:09:30
 */
// 上传数据到服务器
var upload_to_server = exports.upload_to_server = function upload_to_server(url, data, callback) {
    if (!url) return;

    var params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    params = Object.assign(params, data);

    fetch(url, params).then(function (result) {
        return result.text();
    }).then(function (result) {
        return callback(result);
    }).catch(function (error) {
        // console.log(error)
    });
};

var get_by_cookie = exports.get_by_cookie = function get_by_cookie(url, data, callback) {
    if (!url) return;

    var params = {
        credentials: 'include' // 加入cookie
    };
    params = Object.assign(params, data);

    fetch(url, params).then(function (result) {
        return result.json();
    }).then(function (result) {
        return callback(result);
    }).catch(function (error) {
        // console.log(error);
    });
};

/***/ }),

/***/ "./util/Store.js":
/*!***********************!*\
  !*** ./util/Store.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-25 22:28:14 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-26 16:28:00
 */
var Store = function Store(name, defaults) {
    _classCallCheck(this, Store);

    _initialiseProps.call(this);

    this.name = name;

    if (defaults !== undefined) {
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key) && this.get(key) === undefined) {
                this.set(key, defaults[key]);
            }
        }
    }
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.get = function (propsName) {
        name = 'store.' + _this.name + '.' + propsName;

        if (localStorage.getItem(name) === null) {
            return undefined;
        }

        try {
            return JSON.parse(localStorage.getItem(name));
        } catch (e) {
            return null;
        }
    };

    this.set = function (name, value) {
        if (value === undefined) {
            _this.remove(name);
        } else {
            if (typeof value === 'function') {
                value = null;
            } else {
                try {
                    value = JSON.stringify(value);
                } catch (e) {
                    value = null;
                }
            }

            localStorage.setItem('store.' + _this.name + '.' + name, value);
        }

        return _this;
    };

    this.remove = function (name) {
        localStorage.removeItem('store.' + _this.name + '.' + name);

        return _this;
    };

    this.removeAll = function () {
        var name = 'store.' + _this.name + '.';
        for (var i = localStorage.length - 1; i >= 0; i--) {
            if (localStorage.key(i).substring(0, name.length) === name) {
                localStorage.removeItem(localStorage.key(i));
            }
        }

        return _this;
    };

    this.toObject = function () {
        var values = {},
            key = void 0,
            value = void 0;

        var name = 'store.' + _this.name + '.';
        for (var i = localStorage.length - 1; i >= 0; i--) {
            if (localStorage.key(i).substring(0, name.length) === name) {
                key = localStorage.key(i).substring(name.length);
                value = _this.get(key);
                if (value !== undefined) {
                    values[key] = value;
                }
            }
        }

        return values;
    };

    this.fromObject = function (values, merge) {
        if (merge !== true) {
            _this.removeAll();
        }
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                _this.set(key, values[key]);
            }
        }

        return _this;
    };
};

exports.default = Store;

/***/ })

/******/ });
//# sourceMappingURL=background.js.map