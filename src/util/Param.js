define([], function () {
    var class2type = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Object]': 'object'
    }

    var rbracket = /\[\]$/;

    var isFunction = function(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    },
    isWindow = function(obj) {
        return obj != null && obj === obj.window;
    },
    isPlainObject = function(obj) {
        if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
            return false;
        }

        if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }

        var key;
        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
    },
    buildParams = function(prefix, obj, traditional, add) {
        var name;
    
        if ( Array.isArray( obj ) ) {
            each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {
                    add( prefix, v );
    
                } else {
                    buildParams(
                        prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                        v,
                        traditional,
                        add
                    );
                }
            } );
    
        } else if ( !traditional && toType( obj ) === "object" ) {
    
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }
    
        } else {
    
            add( prefix, obj );
        }
    },
    isArrayLike = function(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = toType( obj );
    
        if ( isFunction( obj ) || isWindow( obj ) ) {
            return false;
        }
    
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    },
    toType = function(obj) {
        if ( obj == null ) {
            return obj + "";
        }
    
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    },
    each = function(obj, callback) {
        var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
    },
    param = function(a, traditional) {
        var prefix, s = [],
		add = function(key, valueOrFunction) {
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

        if (Array.isArray( a ) || (a.jquery && !isPlainObject( a ))) {
            each( a, function() {
                add( this.name, this.value );
            } );

        } else {
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }

        return s.join( "&" );
    }

    return param;
});