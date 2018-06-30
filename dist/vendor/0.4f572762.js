(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/_css-loader@0.28.11@css-loader/index.js!./src/modules/Popup/css/Popup.css":
/*!***************************************************************************************!*\
  !*** ./node_modules/_css-loader@0.28.11@css-loader!./src/modules/Popup/css/Popup.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js */ "./node_modules/_css-loader@0.28.11@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".Popup {\r\n    width: 300px;\r\n    height: 400px;\r\n    text-align: center;\r\n    padding: 8px;\r\n    background: #B0E0E6;\r\n    font-size: 14px;\r\n}\r\n\r\n.Popup .white-space {\r\n    margin-top: 8px;\r\n}", ""]);

// exports


/***/ }),

/***/ "./src/modules/Popup/Popup.js":
/*!************************************!*\
  !*** ./src/modules/Popup/Popup.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slider = __webpack_require__(/*! antd/lib/slider */ "./node_modules/_antd@3.6.4@antd/lib/slider/index.js");

var _slider2 = _interopRequireDefault(_slider);

var _tooltip = __webpack_require__(/*! antd/lib/tooltip */ "./node_modules/_antd@3.6.4@antd/lib/tooltip/index.js");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _switch = __webpack_require__(/*! antd/lib/switch */ "./node_modules/_antd@3.6.4@antd/lib/switch/index.js");

var _switch2 = _interopRequireDefault(_switch);

var _button = __webpack_require__(/*! antd/lib/button */ "./node_modules/_antd@3.6.4@antd/lib/button/index.js");

var _button2 = _interopRequireDefault(_button);

var _input = __webpack_require__(/*! antd/lib/input */ "./node_modules/_antd@3.6.4@antd/lib/input/index.js");

var _input2 = _interopRequireDefault(_input);

var _notification2 = __webpack_require__(/*! antd/lib/notification */ "./node_modules/_antd@3.6.4@antd/lib/notification/index.js");

var _notification3 = _interopRequireDefault(_notification2);

var _select = __webpack_require__(/*! antd/lib/select */ "./node_modules/_antd@3.6.4@antd/lib/select/index.js");

var _select2 = _interopRequireDefault(_select);

__webpack_require__(/*! antd/lib/slider/style/css */ "./node_modules/_antd@3.6.4@antd/lib/slider/style/css.js");

__webpack_require__(/*! antd/lib/tooltip/style/css */ "./node_modules/_antd@3.6.4@antd/lib/tooltip/style/css.js");

__webpack_require__(/*! antd/lib/switch/style/css */ "./node_modules/_antd@3.6.4@antd/lib/switch/style/css.js");

__webpack_require__(/*! antd/lib/button/style/css */ "./node_modules/_antd@3.6.4@antd/lib/button/style/css.js");

__webpack_require__(/*! antd/lib/input/style/css */ "./node_modules/_antd@3.6.4@antd/lib/input/style/css.js");

__webpack_require__(/*! antd/lib/notification/style/css */ "./node_modules/_antd@3.6.4@antd/lib/notification/style/css.js");

__webpack_require__(/*! antd/lib/select/style/css */ "./node_modules/_antd@3.6.4@antd/lib/select/style/css.js");

var _react = __webpack_require__(/*! react */ "./node_modules/_react@16.4.1@react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Request = __webpack_require__(/*! ../../../util/Request */ "./util/Request.js");

var Request = _interopRequireWildcard(_Request);

var _Store = __webpack_require__(/*! ../../../util/Store */ "./util/Store.js");

var _Store2 = _interopRequireDefault(_Store);

__webpack_require__(/*! ./css/Popup.css */ "./src/modules/Popup/css/Popup.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: zy9@github.com/zy410419243 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2018-05-20 14:46:14 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified by: zy9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Last Modified time: 2018-06-30 14:02:31
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Option = _select2.default.Option;

/**
 * start时是没有chrome的api的，用到localStorage的地方都会报错，
 * 这会让我感觉很多无关紧要的代码白写了，很气，
 * 于是有了以下容错
*/
var environment = void 0;
if (chrome.extension) {
    environment = chrome.extension.getBackgroundPage();
} else {
    environment = { store: new _Store2.default() };
}
var _environment = environment,
    STORE = _environment.store;


// item第二页，红跟豆那页
var article = 'http://game.granbluefantasy.jp/item/article_list_by_filter_mode';
// item第一页，日常素材
var recovery = 'http://game.granbluefantasy.jp/item/recovery_and_evolution_list_by_filter_mode';

var Popup = function (_Component) {
    _inherits(Popup, _Component);

    function Popup(props) {
        _classCallCheck(this, Popup);

        var _this = _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));

        _initialiseProps.call(_this);

        var coopraid_search_value = STORE.get('search') || '';

        _this.state = {
            btn_loading: false,
            btn_type: 'primary',
            address: 'localhost:8023',
            head_address: 'http://',
            coopraid_search_value: coopraid_search_value,
            coopraid_switch_checked: !!coopraid_search_value,
            defaultZoom: STORE.get('zoom')
        };

        !!coopraid_search_value && _this.handle_search();
        return _this;
    }

    // 数组扁平化


    return Popup;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.componentWillMount = function () {};

    this.handle_upload = function () {
        var _state = _this2.state,
            head_address = _state.head_address,
            address = _state.address;


        _this2.setState({ btn_loading: true });

        var user_id = STORE.get('userId');
        if (!user_id) {
            _notification3.default.open({
                message: '非法操作',
                description: '没获得到userId',
                duration: 3
            });

            _this2.setState({ btn_loading: false });

            return;
        }

        Request.get_by_cookie(article, {}, function (result) {
            Request.get_by_cookie(recovery, {}, function (recovery) {
                recovery = _this2.steam_roller(recovery);

                result = [].concat(_toConsumableArray(result), _toConsumableArray(recovery));

                var body = 'user_id=' + STORE.get('userId');
                Request.upload_to_server('' + head_address + address + '/Memo/gbf/i_item.do', { body: 'user_id=6964955&data=' + JSON.stringify(result) }, function (result) {
                    if (result == 'success') {
                        _notification3.default.open({
                            message: '上传成功',
                            description: '',
                            duration: 3
                        });
                    }

                    _this2.setState({ btn_loading: false });
                });
            });
        });
    };

    this.steam_roller = function (arr) {
        var new_arr = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                Array.isArray(item) ? new_arr.push.apply(new_arr, _this2.steam_roller(item)) : new_arr.push(item);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return new_arr;
    };

    this.handle_address = function (event) {
        return _this2.setState({ address: event.target.value });
    };

    this.handle_head_address = function (head_address) {
        return _this2.setState({ head_address: head_address });
    };

    this.handle_coopraid_search = function (event) {
        return _this2.setState({ coopraid_search_value: event.target.value });
    };

    this.handle_coopraid_switch = function (checked) {
        if (checked) {
            _this2.handle_search();
        } else {
            STORE.remove('search');
            _this2.setState({ coopraid_search_value: '' });
        }

        _this2.setState({ coopraid_switch_checked: checked });
    };

    this.handle_search = function () {
        var coopraid_search_value = _this2.state.coopraid_search_value;


        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

            STORE.set('search', coopraid_search_value);

            port.postMessage({ message: 'open_coopraid_search', search: coopraid_search_value });
        });
    };

    this.handle_zoom = function (zoom) {
        STORE.set('zoom', zoom);

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var port = chrome.tabs.connect(tabs[0].id, { name: 'popup_to_content' });

            port.postMessage({ zoom: zoom, message: 'set_zoom' });
        });
    };

    this.render = function () {
        var _state2 = _this2.state,
            btn_loading = _state2.btn_loading,
            address = _state2.address,
            coopraid_search_value = _state2.coopraid_search_value,
            defaultZoom = _state2.defaultZoom,
            coopraid_switch_checked = _state2.coopraid_switch_checked;


        var selectBefore = _react2.default.createElement(
            _select2.default,
            { defaultValue: 'http://', style: { width: 90 }, onChange: _this2.handle_head_address },
            _react2.default.createElement(
                Option,
                { value: 'http://' },
                'http://'
            ),
            _react2.default.createElement(
                Option,
                { value: 'https://' },
                'https://'
            ),
            _react2.default.createElement(
                Option,
                { value: 'ftp://' },
                'ftp://'
            )
        );

        return _react2.default.createElement(
            'div',
            { className: 'Popup' },
            _react2.default.createElement(_input2.default, { addonBefore: selectBefore, style: { width: '90%' }, onChange: _this2.handle_address, value: address }),
            _react2.default.createElement('div', { className: 'white-space' }),
            _react2.default.createElement(
                _button2.default,
                { type: 'primary', loading: btn_loading, onClick: _this2.handle_upload, style: { width: '90%' } },
                '\u4E0A\u4F20\u7D20\u6750'
            ),
            _react2.default.createElement('div', { className: 'white-space' }),
            _react2.default.createElement(_input2.default, { style: { width: '90%' }, onChange: _this2.handle_coopraid_search, value: coopraid_search_value, placeholder: '\u8FD9\u91CC\u586B\u623F\u95F4\u63CF\u8FF0' }),
            _react2.default.createElement('div', { className: 'white-space' }),
            _react2.default.createElement(
                'div',
                { style: { marginLeft: '6%' } },
                _react2.default.createElement(
                    _tooltip2.default,
                    { title: '\u770B\u89C1\u4E0A\u9762\u7684\u6587\u672C\u6846\u4E86\u4E48\uFF0C\u586B\u4E86\u8FD9\u4E2A\u4F60\u624D\u80FD\u5F00\u542F\u641C\u7D22' },
                    _react2.default.createElement(
                        'span',
                        { style: { float: 'left', color: '#666' } },
                        '\u662F\u5426\u5F00\u542F\u5171\u6597\u641C\u7D22'
                    ),
                    _react2.default.createElement(_switch2.default, { disabled: !coopraid_search_value, onChange: _this2.handle_coopraid_switch, checked: coopraid_switch_checked, style: { float: 'right', marginRight: '6%' } }),
                    _react2.default.createElement('div', { style: { clear: 'both' } })
                )
            ),
            _react2.default.createElement('div', { className: 'white-space' }),
            _react2.default.createElement(
                'div',
                { style: { margin: '0 6%', textAlign: 'left' } },
                _react2.default.createElement(
                    'span',
                    { style: { color: '#666' } },
                    '\u8C03\u8282\u7A97\u53E3\u5927\u5C0F'
                ),
                _react2.default.createElement(_slider2.default, { step: 0.01, min: 0.3, max: 1.5, defaultValue: defaultZoom, onChange: _this2.handle_zoom })
            )
        );
    };
};

exports.default = Popup;

/***/ }),

/***/ "./src/modules/Popup/css/Popup.css":
/*!*****************************************!*\
  !*** ./src/modules/Popup/css/Popup.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/_css-loader@0.28.11@css-loader!./Popup.css */ "./node_modules/_css-loader@0.28.11@css-loader/index.js!./src/modules/Popup/css/Popup.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js */ "./node_modules/_style-loader@0.21.0@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

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

}]);
//# sourceMappingURL=0.4f572762.js.map