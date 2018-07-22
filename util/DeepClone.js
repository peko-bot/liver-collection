/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-01 10:02:40
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-18 11:46:58
 */
define([], function () {
	var copyIsArray,
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty;

	var class2type = {
			'[object Boolean]': 'boolean',
			'[object Number]': 'number',
			'[object String]': 'string',
			'[object Function]': 'function',
			'[object Array]': 'array',
			'[object Date]': 'date',
			'[object RegExp]': 'regExp',
			'[object Object]': 'object'
		},

		type = function (obj) {
			return obj == null
				? String(obj)
				: class2type[toString.call(obj)] || 'object';
		},

		isWindow = function (obj) {
			return obj && typeof obj === 'object' && 'setInterval' in obj;
		},

		isArray = Array.isArray || function (obj) {
			return type(obj) === 'array';
		},

		isPlainObject = function (obj) {
			if (!obj || type(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
				return false;
			}

			if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
				return false;
			}

			var key;

			return key === undefined || hasOwn.call(obj, key);
		},

		extend = function (target, options) {
			for (var name in options) {
				var src = target[name];
				var copy = options[name];

				if (target === copy) {
					continue;
				}

				if (copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					var clone;

					if (copyIsArray) {
						copyIsArray = false;
						clone = src && isArray(src)
							? src
							: [];

					} else {
						clone = src && isPlainObject(src)
							? src
							: {};
					}

					target[name] = extend(clone, copy);
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}

			return target;
		};

	return extend;
});