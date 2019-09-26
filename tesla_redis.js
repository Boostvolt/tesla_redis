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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __webpack_require__(31);
const lodash_1 = __webpack_require__(1);
/**
 * Test if two buffers are equal
 *
 * @export
 * @param {Buffer} a
 * @param {Buffer} b
 * @returns {boolean} Whether the two buffers are equal
 */
function bufferEqual(a, b) {
    if (typeof a.equals === 'function') {
        return a.equals(b);
    }
    if (a.length !== b.length) {
        return false;
    }
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
exports.bufferEqual = bufferEqual;
/**
 * Convert a buffer to string, supports buffer array
 *
 * @param {*} value - The input value
 * @param {string} encoding - string encoding
 * @return {*} The result
 * @example
 * ```js
 * var input = [Buffer.from('foo'), [Buffer.from('bar')]]
 * var res = convertBufferToString(input, 'utf8')
 * expect(res).to.eql(['foo', ['bar']])
 * ```
 * @private
 */
function convertBufferToString(value, encoding) {
    if (value instanceof Buffer) {
        return value.toString(encoding);
    }
    if (Array.isArray(value)) {
        var length = value.length;
        var res = Array(length);
        for (var i = 0; i < length; ++i) {
            res[i] = value[i] instanceof Buffer && encoding === 'utf8'
                ? value[i].toString()
                : convertBufferToString(value[i], encoding);
        }
        return res;
    }
    return value;
}
exports.convertBufferToString = convertBufferToString;
/**
 * Convert a list of results to node-style
 *
 * @param {Array} arr - The input value
 * @return {Array} The output value
 * @example
 * ```js
 * var input = ['a', 'b', new Error('c'), 'd']
 * var output = exports.wrapMultiResult(input)
 * expect(output).to.eql([[null, 'a'], [null, 'b'], [new Error('c')], [null, 'd'])
 * ```
 * @private
 */
function wrapMultiResult(arr) {
    // When using WATCH/EXEC transactions, the EXEC will return
    // a null instead of an array
    if (!arr) {
        return null;
    }
    var result = [];
    var length = arr.length;
    for (var i = 0; i < length; ++i) {
        var item = arr[i];
        if (item instanceof Error) {
            result.push([item]);
        }
        else {
            result.push([null, item]);
        }
    }
    return result;
}
exports.wrapMultiResult = wrapMultiResult;
/**
 * Detect the argument is a int
 *
 * @param {string} value
 * @return {boolean} Whether the value is a int
 * @example
 * ```js
 * > isInt('123')
 * true
 * > isInt('123.3')
 * false
 * > isInt('1x')
 * false
 * > isInt(123)
 * true
 * > isInt(true)
 * false
 * ```
 * @private
 */
function isInt(value) {
    var x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}
exports.isInt = isInt;
/**
 * Pack an array to an Object
 *
 * @param {array} array
 * @return {object}
 * @example
 * ```js
 * > packObject(['a', 'b', 'c', 'd'])
 * { a: 'b', c: 'd' }
 * ```
 */
function packObject(array) {
    var result = {};
    var length = array.length;
    for (var i = 1; i < length; i += 2) {
        result[array[i - 1]] = array[i];
    }
    return result;
}
exports.packObject = packObject;
/**
 * Return a callback with timeout
 *
 * @param {function} callback
 * @param {number} timeout
 * @return {function}
 */
function timeout(callback, timeout) {
    var timer;
    var run = function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
            callback.apply(this, arguments);
        }
    };
    timer = setTimeout(run, timeout, new Error('timeout'));
    return run;
}
exports.timeout = timeout;
/**
 * Convert an object to an array
 *
 * @param {object} obj
 * @return {array}
 * @example
 * ```js
 * > convertObjectToArray({ a: '1' })
 * ['a', '1']
 * ```
 */
function convertObjectToArray(obj) {
    var result = [];
    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; i++) {
        result.push(keys[i], obj[keys[i]]);
    }
    return result;
}
exports.convertObjectToArray = convertObjectToArray;
/**
 * Convert a map to an array
 *
 * @param {Map} map
 * @return {array}
 * @example
 * ```js
 * > convertObjectToArray(new Map([[1, '2']]))
 * [1, '2']
 * ```
 */
function convertMapToArray(map) {
    var result = [];
    var pos = 0;
    map.forEach(function (value, key) {
        result[pos] = key;
        result[pos + 1] = value;
        pos += 2;
    });
    return result;
}
exports.convertMapToArray = convertMapToArray;
/**
 * Convert a non-string arg to a string
 *
 * @param {*} arg
 * @return {string}
 */
function toArg(arg) {
    if (arg === null || typeof arg === 'undefined') {
        return '';
    }
    return String(arg);
}
exports.toArg = toArg;
/**
 * Optimize error stack
 *
 * @param {Error} error - actually error
 * @param {string} friendlyStack - the stack that more meaningful
 * @param {string} filterPath - only show stacks with the specified path
 */
function optimizeErrorStack(error, friendlyStack, filterPath) {
    var stacks = friendlyStack.split('\n');
    var lines = '';
    var i;
    for (i = 1; i < stacks.length; ++i) {
        if (stacks[i].indexOf(filterPath) === -1) {
            break;
        }
    }
    for (var j = i; j < stacks.length; ++j) {
        lines += '\n' + stacks[j];
    }
    var pos = error.stack.indexOf('\n');
    error.stack = error.stack.slice(0, pos) + lines;
    return error;
}
exports.optimizeErrorStack = optimizeErrorStack;
/**
 * Parse the redis protocol url
 *
 * @param {string} url - the redis protocol url
 * @return {Object}
 */
function parseURL(url) {
    if (isInt(url)) {
        return { port: url };
    }
    var parsed = url_1.parse(url, true, true);
    if (!parsed.slashes && url[0] !== '/') {
        url = '//' + url;
        parsed = url_1.parse(url, true, true);
    }
    var result = {};
    if (parsed.auth) {
        result.password = parsed.auth.split(':')[1];
    }
    if (parsed.pathname) {
        if (parsed.protocol === 'redis:') {
            if (parsed.pathname.length > 1) {
                result.db = parsed.pathname.slice(1);
            }
        }
        else {
            result.path = parsed.pathname;
        }
    }
    if (parsed.host) {
        result.host = parsed.hostname;
    }
    if (parsed.port) {
        result.port = parsed.port;
    }
    lodash_1.defaults(result, parsed.query);
    return result;
}
exports.parseURL = parseURL;
/**
 * Get a random element from `array`
 *
 * @export
 * @template T
 * @param {T[]} array the array
 * @param {number} [from=0] start index
 * @returns {T}
 */
function sample(array, from = 0) {
    const length = array.length;
    if (from >= length) {
        return;
    }
    return array[from + Math.floor(Math.random() * (length - from))];
}
exports.sample = sample;
/**
 * Shuffle the array using the Fisher-Yates Shuffle.
 * This method will mutate the original array.
 *
 * @export
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        const index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        [array[counter], array[index]] = [array[index], array[counter]];
    }
    return array;
}
exports.shuffle = shuffle;
/**
 * Error message for connection being disconnected
 */
exports.CONNECTION_CLOSED_ERROR_MSG = 'Connection is closed.';
function zipMap(keys, values) {
    const map = new Map();
    keys.forEach((key, index) => {
        map.set(key, values[index]);
    });
    return map;
}
exports.zipMap = zipMap;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.defaults = __webpack_require__(27);
exports.noop = function () { };
exports.flatten = __webpack_require__(28);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const fbuffer = __webpack_require__(16);
const commands = __webpack_require__(7);
const calculateSlot = __webpack_require__(17);
const standard_as_callback_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(0);
const lodash_1 = __webpack_require__(1);
const promiseContainer_1 = __webpack_require__(5);
/**
 * Command instance
 *
 * It's rare that you need to create a Command instance yourself.
 *
 * @export
 * @class Command
 *
 * @example
 * ```js
 * var infoCommand = new Command('info', null, function (err, result) {
 *   console.log('result', result);
 * });
 *
 * redis.sendCommand(infoCommand);
 *
 * // When no callback provided, Command instance will have a `promise` property,
 * // which will resolve/reject with the result of the command.
 * var getCommand = new Command('get', ['foo']);
 * getCommand.promise.then(function (result) {
 *   console.log('result', result);
 * });
 * ```
 * @see {@link Redis#sendCommand} which can send a Command instance to Redis
 */
class Command {
    /**
     * Creates an instance of Command.
     * @param {string} name Command name
     * @param {(Array<string | Buffer | number>)} [args=[]] An array of command arguments
     * @param {ICommandOptions} [options={}]
     * @param {CallbackFunction} [callback] The callback that handles the response.
     * If omit, the response will be handled via Promise
     * @memberof Command
     */
    constructor(name, args = [], options = {}, callback) {
        this.name = name;
        this.transformed = false;
        this.isCustomCommand = false;
        this.replyEncoding = options.replyEncoding;
        this.errorStack = options.errorStack;
        this.args = lodash_1.flatten(args);
        this.callback = callback;
        this.initPromise();
        if (options.keyPrefix) {
            this._iterateKeys((key) => (options.keyPrefix + key));
        }
    }
    static getFlagMap() {
        if (!this.flagMap) {
            this.flagMap = Object.keys(Command.FLAGS).reduce((map, flagName) => {
                map[flagName] = {};
                Command.FLAGS[flagName].forEach((commandName) => {
                    map[flagName][commandName] = true;
                });
                return map;
            }, {});
        }
        return this.flagMap;
    }
    /**
     * Check whether the command has the flag
     *
     * @param {string} flagName
     * @param {string} commandName
     * @return {boolean}
     */
    static checkFlag(flagName, commandName) {
        return !!this.getFlagMap()[flagName][commandName];
    }
    static setArgumentTransformer(name, func) {
        this._transformer.argument[name] = func;
    }
    static setReplyTransformer(name, func) {
        this._transformer.reply[name] = func;
    }
    initPromise() {
        const Promise = promiseContainer_1.get();
        const promise = new Promise((resolve, reject) => {
            if (!this.transformed) {
                this.transformed = true;
                const transformer = Command._transformer.argument[this.name];
                if (transformer) {
                    this.args = transformer(this.args);
                }
                this.stringifyArguments();
            }
            this.resolve = this._convertValue(resolve);
            if (this.errorStack) {
                this.reject = (err) => {
                    reject(utils_1.optimizeErrorStack(err, this.errorStack, __dirname));
                };
            }
            else {
                this.reject = reject;
            }
        });
        this.promise = standard_as_callback_1.default(promise, this.callback);
    }
    getSlot() {
        if (typeof this.slot === 'undefined') {
            const key = this.getKeys()[0];
            this.slot = key == null ? null : calculateSlot(key);
        }
        return this.slot;
    }
    getKeys() {
        return this._iterateKeys();
    }
    /**
     * Iterate through the command arguments that are considered keys.
     *
     * @param {Function} [transform=(key) => key] The transformation that should be applied to
     * each key. The transformations will persist.
     * @returns {string[]} The keys of the command.
     * @memberof Command
     */
    _iterateKeys(transform = (key) => key) {
        if (typeof this.keys === 'undefined') {
            this.keys = [];
            if (commands.exists(this.name)) {
                const keyIndexes = commands.getKeyIndexes(this.name, this.args);
                for (const index of keyIndexes) {
                    this.args[index] = transform(this.args[index]);
                    this.keys.push(this.args[index]);
                }
            }
        }
        return this.keys;
    }
    /**
     * Convert command to writable buffer or string
     *
     * @return {string|Buffer}
     * @see {@link Redis#sendCommand}
     * @public
     */
    toWritable() {
        let bufferMode = false;
        for (const arg of this.args) {
            if (arg instanceof Buffer) {
                bufferMode = true;
                break;
            }
        }
        let result;
        let commandStr = '*' + (this.args.length + 1) + '\r\n$' + this.name.length + '\r\n' + this.name + '\r\n';
        if (bufferMode) {
            const resultBuffer = new fbuffer.FlexBuffer(0);
            resultBuffer.write(commandStr);
            for (const arg of this.args) {
                if (arg instanceof Buffer) {
                    if (arg.length === 0) {
                        resultBuffer.write('$0\r\n\r\n');
                    }
                    else {
                        resultBuffer.write('$' + arg.length + '\r\n');
                        resultBuffer.write(arg);
                        resultBuffer.write('\r\n');
                    }
                }
                else {
                    resultBuffer.write('$' + Buffer.byteLength(arg) + '\r\n' + arg + '\r\n');
                }
            }
            result = resultBuffer.getBuffer();
        }
        else {
            result = commandStr;
            for (const arg of this.args) {
                result += '$' + Buffer.byteLength(arg) + '\r\n' + arg + '\r\n';
            }
        }
        return result;
    }
    stringifyArguments() {
        for (let i = 0; i < this.args.length; ++i) {
            const arg = this.args[i];
            if (!(arg instanceof Buffer) && typeof arg !== 'string') {
                this.args[i] = utils_1.toArg(arg);
            }
        }
    }
    /**
     * Convert the value from buffer to the target encoding.
     *
     * @private
     * @param {Function} resolve The resolve function of the Promise
     * @returns {Function} A funtion to transform and resolve a value
     * @memberof Command
     */
    _convertValue(resolve) {
        return (value) => {
            try {
                resolve(this.transformReply(value));
            }
            catch (err) {
                this.reject(err);
            }
            return this.promise;
        };
    }
    /**
     * Convert buffer/buffer[] to string/string[],
     * and apply reply transformer.
     *
     * @memberof Command
     */
    transformReply(result) {
        if (this.replyEncoding) {
            result = utils_1.convertBufferToString(result, this.replyEncoding);
        }
        const transformer = Command._transformer.reply[this.name];
        if (transformer) {
            result = transformer(result);
        }
        return result;
    }
}
Command.FLAGS = {
    // Commands that can be processed when client is in the subscriber mode
    VALID_IN_SUBSCRIBER_MODE: ['subscribe', 'psubscribe', 'unsubscribe', 'punsubscribe', 'ping', 'quit'],
    // Commands that are valid in monitor mode
    VALID_IN_MONITOR_MODE: ['monitor', 'auth'],
    // Commands that will turn current connection into subscriber mode
    ENTER_SUBSCRIBER_MODE: ['subscribe', 'psubscribe'],
    // Commands that may make current connection quit subscriber mode
    EXIT_SUBSCRIBER_MODE: ['unsubscribe', 'punsubscribe'],
    // Commands that will make client disconnect from server TODO shutdown?
    WILL_DISCONNECT: ['quit']
};
Command._transformer = {
    argument: {},
    reply: {}
};
exports.default = Command;
const msetArgumentTransformer = function (args) {
    if (args.length === 1) {
        if (typeof Map !== 'undefined' && args[0] instanceof Map) {
            return utils_1.convertMapToArray(args[0]);
        }
        if (typeof args[0] === 'object' && args[0] !== null) {
            return utils_1.convertObjectToArray(args[0]);
        }
    }
    return args;
};
Command.setArgumentTransformer('mset', msetArgumentTransformer);
Command.setArgumentTransformer('msetnx', msetArgumentTransformer);
Command.setArgumentTransformer('hmset', function (args) {
    if (args.length === 2) {
        if (typeof Map !== 'undefined' && args[1] instanceof Map) {
            return [args[0]].concat(utils_1.convertMapToArray(args[1]));
        }
        if (typeof args[1] === 'object' && args[1] !== null) {
            return [args[0]].concat(utils_1.convertObjectToArray(args[1]));
        }
    }
    return args;
});
Command.setReplyTransformer('hgetall', function (result) {
    if (Array.isArray(result)) {
        var obj = {};
        for (var i = 0; i < result.length; i += 2) {
            obj[result[i]] = result[i + 1];
        }
        return obj;
    }
    return result;
});

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var debug = __webpack_require__(35);
var MAX_ARGUMENT_LENGTH = 200;
/**
 * helper function that tried to get a string value for
 * arbitrary "debug" arg
 *
 * @param  {mixed} v
 * @return {String|undefined}
 */
function getStringValue(v) {
    if (v === null)
        return;
    switch (typeof v) {
        case 'boolean': return;
        case 'number': return;
        case 'object':
            if (Buffer.isBuffer(v)) {
                return v.toString('hex');
            }
            if (Array.isArray(v)) {
                return v.join(',');
            }
            try {
                return JSON.stringify(v);
            }
            catch (e) {
                return;
            }
        case 'string': return v;
    }
}
/**
 * helper function that redacts a string representation of a "debug" arg
 *
 * @param  {String} str
 * @param  {Number} max_len
 * @return {String}
 */
function genRedactedString(str, max_len) {
    var len = str.length;
    return len <= max_len ? str : str.slice(0, max_len) + ' ... <REDACTED full-length="' + len + '">';
}
/**
 * a wrapper for the `debug` module, used to generate
 * "debug functions" that trim the values in their output
 *
 * @param   {String}
 * @return  {Function}
 */
module.exports = function genDebugFunction(name) {
    var fn = debug(name);
    function wrappedDebug() {
        if (!fn.enabled) {
            return; // no-op
        }
        var args = [].slice.call(arguments);
        var i = 1, l = args.length, str, len;
        // we skip the first arg because that is the message
        for (; i < l; i += 1) {
            str = getStringValue(args[i]);
            len = str && str.length || 0;
            if (len > MAX_ARGUMENT_LENGTH) {
                args[i] = genRedactedString(str, MAX_ARGUMENT_LENGTH);
            }
        }
        return fn.apply(null, args);
    }
    Object.defineProperties(wrappedDebug, {
        namespace: { get: function () {
                return fn.namespace;
            } },
        enabled: { get: function () {
                return fn.enabled;
            } },
        useColors: { get: function () {
                return fn.useColors;
            } },
        color: { get: function () {
                return fn.color;
            } },
        destroy: { get: function () {
                return fn.destroy;
            } },
        log: {
            get: function () {
                return fn.log;
            },
            set: function (l) {
                fn.log = l;
            }
        }
    });
    return wrappedDebug;
};
// expose private stuff for unit-testing
module.exports.MAX_ARGUMENT_LENGTH = MAX_ARGUMENT_LENGTH;
module.exports.getStringValue = getStringValue;
module.exports.genRedactedString = genRedactedString;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(30);
function throwLater(e) {
    setTimeout(function () {
        throw e;
    }, 0);
}
function asCallback(promise, nodeback, options) {
    if (typeof nodeback === 'function') {
        promise.then((val) => {
            let ret;
            if (options !== undefined && Object(options).spread && Array.isArray(val)) {
                ret = utils_1.tryCatch(nodeback).apply(undefined, [null].concat(val));
            }
            else {
                ret = val === undefined
                    ? utils_1.tryCatch(nodeback)(null)
                    : utils_1.tryCatch(nodeback)(null, val);
            }
            if (ret === utils_1.errorObj) {
                throwLater(ret.e);
            }
        }, (cause) => {
            if (!cause) {
                const newReason = new Error(cause + '');
                Object.assign(newReason, { cause });
                cause = newReason;
            }
            const ret = utils_1.tryCatch(nodeback)(cause);
            if (ret === utils_1.errorObj) {
                throwLater(ret.e);
            }
        });
    }
    return promise;
}
exports.default = asCallback;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isPromise(obj) {
    return !!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function';
}
exports.isPromise = isPromise;
let promise = Promise;
function get() {
    return promise;
}
exports.get = get;
function set(lib) {
    if (typeof lib !== 'function') {
        throw new Error(`Provided Promise must be a function, got ${lib}`);
    }
    promise = lib;
}
exports.set = set;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(1);
var util = __webpack_require__(9);
var EventEmitter = __webpack_require__(10).EventEmitter;
var Deque = __webpack_require__(11);
var Command = __webpack_require__(2).default;
var Commander = __webpack_require__(12);
var utils = __webpack_require__(0);
var asCallback = __webpack_require__(4).default;
var eventHandler = __webpack_require__(34);
var debug = __webpack_require__(3)('ioredis:redis');
var { StandaloneConnector, SentinelConnector } = __webpack_require__(47);
var ScanStream = __webpack_require__(14).default;
var commands = __webpack_require__(7);
var PromiseContainer = __webpack_require__(5);
/**
 * Creates a Redis instance
 *
 * @constructor
 * @param {(number|string|Object)} [port=6379] - Port of the Redis server,
 * or a URL string(see the examples below),
 * or the `options` object(see the third argument).
 * @param {string|Object} [host=localhost] - Host of the Redis server,
 * when the first argument is a URL string,
 * this argument is an object represents the options.
 * @param {Object} [options] - Other options.
 * @param {number} [options.port=6379] - Port of the Redis server.
 * @param {string} [options.host=localhost] - Host of the Redis server.
 * @param {string} [options.family=4] - Version of IP stack. Defaults to 4.
 * @param {string} [options.path=null] - Local domain socket path. If set the `port`,
 * `host` and `family` will be ignored.
 * @param {number} [options.keepAlive=0] - TCP KeepAlive on the socket with a X ms delay before start.
 * Set to a non-number value to disable keepAlive.
 * @param {boolean} [options.noDelay=true] - Whether to disable the Nagle's Algorithm. By default we disable
 * it to reduce the latency.
 * @param {string} [options.connectionName=null] - Connection name.
 * @param {number} [options.db=0] - Database index to use.
 * @param {string} [options.password=null] - If set, client will send AUTH command
 * with the value of this option when connected.
 * @param {boolean} [options.dropBufferSupport=false] - Drop the buffer support for better performance.
 * This option is recommended to be enabled when
 * handling large array response and you don't need the buffer support.
 * @param {boolean} [options.enableReadyCheck=true] - When a connection is established to
 * the Redis server, the server might still be loading the database from disk.
 * While loading, the server not respond to any commands.
 * To work around this, when this option is `true`,
 * ioredis will check the status of the Redis server,
 * and when the Redis server is able to process commands,
 * a `ready` event will be emitted.
 * @param {boolean} [options.enableOfflineQueue=true] - By default,
 * if there is no active connection to the Redis server,
 * commands are added to a queue and are executed once the connection is "ready"
 * (when `enableReadyCheck` is `true`,
 * "ready" means the Redis server has loaded the database from disk, otherwise means the connection
 * to the Redis server has been established). If this option is false,
 * when execute the command when the connection isn't ready, an error will be returned.
 * @param {number} [options.connectTimeout=10000] - The milliseconds before a timeout occurs during the initial
 * connection to the Redis server.
 * @param {boolean} [options.autoResubscribe=true] - After reconnected, if the previous connection was in the
 * subscriber mode, client will auto re-subscribe these channels.
 * @param {boolean} [options.autoResendUnfulfilledCommands=true] - If true, client will resend unfulfilled
 * commands(e.g. block commands) in the previous connection when reconnected.
 * @param {boolean} [options.lazyConnect=false] - By default,
 * When a new `Redis` instance is created, it will connect to Redis server automatically.
 * If you want to keep the instance disconnected until a command is called, you can pass the `lazyConnect` option to
 * the constructor:
 *
 * ```javascript
 * var redis = new Redis({ lazyConnect: true });
 * // No attempting to connect to the Redis server here.

 * // Now let's connect to the Redis server
 * redis.get('foo', function () {
 * });
 * ```
 * @param {Object} [options.tls] - TLS connection support. See https://github.com/luin/ioredis#tls-options
 * @param {string} [options.keyPrefix=''] - The prefix to prepend to all keys in a command.
 * @param {function} [options.retryStrategy] - See "Quick Start" section
 * @param {number} [options.maxRetriesPerRequest] - See "Quick Start" section
 * @param {number} [options.maxLoadingRetryTime=10000] - when redis server is not ready, we will wait for
 * `loading_eta_seconds` from `info` command or maxLoadingRetryTime (milliseconds), whichever is smaller.
 * @param {function} [options.reconnectOnError] - See "Quick Start" section
 * @param {boolean} [options.readOnly=false] - Enable READONLY mode for the connection.
 * Only available for cluster mode.
 * @param {boolean} [options.stringNumbers=false] - Force numbers to be always returned as JavaScript
 * strings. This option is necessary when dealing with big numbers (exceed the [-2^53, +2^53] range).
 * @param {boolean} [options.enableTLSForSentinelMode=false] - Whether to support the `tls` option
 * when connecting to Redis via sentinel mode.
 * @param {NatMap} [options.natMap=null] NAT map for sentinel connector.
 * @param {boolean} [options.updateSentinels=true] - Update the given `sentinels` list with new IP
 * addresses when communicating with existing sentinels.
 * @extends [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter)
 * @extends Commander
 * @example
 * ```js
 * var Redis = require('ioredis');
 *
 * var redis = new Redis();
 *
 * var redisOnPort6380 = new Redis(6380);
 * var anotherRedis = new Redis(6380, '192.168.100.1');
 * var unixSocketRedis = new Redis({ path: '/tmp/echo.sock' });
 * var unixSocketRedis2 = new Redis('/tmp/echo.sock');
 * var urlRedis = new Redis('redis://user:password@redis-service.com:6379/');
 * var urlRedis2 = new Redis('//localhost:6379');
 * var authedRedis = new Redis(6380, '192.168.100.1', { password: 'password' });
 * ```
 */
function Redis() {
    if (!(this instanceof Redis)) {
        console.error(new Error('Calling `Redis()` like a function is deprecated. Using `new Redis()` instead.').stack.replace('Error', 'Warning'));
        return new Redis(arguments[0], arguments[1], arguments[2]);
    }
    this.parseOptions(arguments[0], arguments[1], arguments[2]);
    EventEmitter.call(this);
    Commander.call(this);
    this.resetCommandQueue();
    this.resetOfflineQueue();
    if (this.options.sentinels) {
        this.connector = new SentinelConnector(this.options);
    }
    else {
        this.connector = new StandaloneConnector(this.options);
    }
    this.retryAttempts = 0;
    // end(or wait) -> connecting -> connect -> ready -> end
    if (this.options.lazyConnect) {
        this.setStatus('wait');
    }
    else {
        this.connect().catch(_.noop);
    }
}
util.inherits(Redis, EventEmitter);
Object.assign(Redis.prototype, Commander.prototype);
/**
 * Create a Redis instance
 *
 * @deprecated
 */
Redis.createClient = function (...args) {
    return new Redis(...args);
};
/**
 * Default options
 *
 * @var defaultOptions
 * @private
 */
Redis.defaultOptions = {
    // Connection
    port: 6379,
    host: 'localhost',
    family: 4,
    connectTimeout: 10000,
    retryStrategy: function (times) {
        return Math.min(times * 50, 2000);
    },
    keepAlive: 0,
    noDelay: true,
    connectionName: null,
    // Sentinel
    sentinels: null,
    name: null,
    role: 'master',
    sentinelRetryStrategy: function (times) {
        return Math.min(times * 10, 1000);
    },
    natMap: null,
    enableTLSForSentinelMode: false,
    updateSentinels: true,
    // Status
    password: null,
    db: 0,
    // Others
    dropBufferSupport: false,
    enableOfflineQueue: true,
    enableReadyCheck: true,
    autoResubscribe: true,
    autoResendUnfulfilledCommands: true,
    lazyConnect: false,
    keyPrefix: '',
    reconnectOnError: null,
    readOnly: false,
    stringNumbers: false,
    maxRetriesPerRequest: 20,
    maxLoadingRetryTime: 10000
};
Redis.prototype.resetCommandQueue = function () {
    this.commandQueue = new Deque();
};
Redis.prototype.resetOfflineQueue = function () {
    this.offlineQueue = new Deque();
};
Redis.prototype.parseOptions = function () {
    this.options = {};
    for (var i = 0; i < arguments.length; ++i) {
        var arg = arguments[i];
        if (arg === null || typeof arg === 'undefined') {
            continue;
        }
        if (typeof arg === 'object') {
            _.defaults(this.options, arg);
        }
        else if (typeof arg === 'string') {
            _.defaults(this.options, utils.parseURL(arg));
        }
        else if (typeof arg === 'number') {
            this.options.port = arg;
        }
        else {
            throw new Error('Invalid argument ' + arg);
        }
    }
    _.defaults(this.options, Redis.defaultOptions);
    if (typeof this.options.port === 'string') {
        this.options.port = parseInt(this.options.port, 10);
    }
    if (typeof this.options.db === 'string') {
        this.options.db = parseInt(this.options.db, 10);
    }
    if (this.options.parser === 'hiredis') {
        console.warn('Hiredis parser is abandoned since ioredis v3.0, and JavaScript parser will be used');
    }
};
/**
 * Change instance's status
 * @private
 */
Redis.prototype.setStatus = function (status, arg) {
    if (debug.enabled) {
        debug('status[%s]: %s -> %s', this._getDescription(), this.status || '[empty]', status);
    }
    this.status = status;
    process.nextTick(this.emit.bind(this, status, arg));
};
/**
 * Create a connection to Redis.
 * This method will be invoked automatically when creating a new Redis instance
 * unless `lazyConnect: true` is passed.
 *
 * When calling this method manually, a Promise is returned, which will
 * be resolved when the connection status is ready.
 * @param {function} [callback]
 * @return {Promise<void>}
 * @public
 */
Redis.prototype.connect = function (callback) {
    var Promise = PromiseContainer.get();
    var promise = new Promise(function (resolve, reject) {
        if (this.status === 'connecting' || this.status === 'connect' || this.status === 'ready') {
            reject(new Error('Redis is already connecting/connected'));
            return;
        }
        this.setStatus('connecting');
        const { options } = this;
        this.condition = {
            select: options.db,
            auth: options.password,
            subscriber: false
        };
        var _this = this;
        this.connector.connect(function (err, stream) {
            if (err) {
                _this.flushQueue(err);
                _this.silentEmit('error', err);
                reject(err);
                _this.setStatus('end');
                return;
            }
            var CONNECT_EVENT = options.tls ? 'secureConnect' : 'connect';
            if (options.sentinels && !options.enableTLSForSentinelMode) {
                CONNECT_EVENT = 'connect';
            }
            _this.stream = stream;
            if (typeof options.keepAlive === 'number') {
                stream.setKeepAlive(true, options.keepAlive);
            }
            stream.once(CONNECT_EVENT, eventHandler.connectHandler(_this));
            stream.once('error', eventHandler.errorHandler(_this));
            stream.once('close', eventHandler.closeHandler(_this));
            stream.on('data', eventHandler.dataHandler(_this));
            if (options.connectTimeout) {
                /*
                 * Typically, Socket#setTimeout(0) will clear the timer
                 * set before. However, in some platforms (Electron 3.x~4.x),
                 * the timer will not be cleared. So we introduce a variable here.
                 *
                 * See https://github.com/electron/electron/issues/14915
                 */
                var connectTimeoutCleared = false;
                stream.setTimeout(options.connectTimeout, function () {
                    if (connectTimeoutCleared) {
                        return;
                    }
                    stream.setTimeout(0);
                    stream.destroy();
                    var err = new Error('connect ETIMEDOUT');
                    err.errorno = 'ETIMEDOUT';
                    err.code = 'ETIMEDOUT';
                    err.syscall = 'connect';
                    eventHandler.errorHandler(_this)(err);
                });
                stream.once(CONNECT_EVENT, function () {
                    connectTimeoutCleared = true;
                    stream.setTimeout(0);
                });
            }
            if (options.noDelay) {
                stream.setNoDelay(true);
            }
            var connectionReadyHandler = function () {
                _this.removeListener('close', connectionCloseHandler);
                resolve();
            };
            var connectionCloseHandler = function () {
                _this.removeListener('ready', connectionReadyHandler);
                reject(new Error(utils.CONNECTION_CLOSED_ERROR_MSG));
            };
            _this.once('ready', connectionReadyHandler);
            _this.once('close', connectionCloseHandler);
        }, function (type, err) {
            _this.silentEmit(type, err);
        });
    }.bind(this));
    return asCallback(promise, callback);
};
/**
 * Disconnect from Redis.
 *
 * This method closes the connection immediately,
 * and may lose some pending replies that haven't written to client.
 * If you want to wait for the pending replies, use Redis#quit instead.
 * @public
 */
Redis.prototype.disconnect = function (reconnect) {
    if (!reconnect) {
        this.manuallyClosing = true;
    }
    if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
    }
    if (this.status === 'wait') {
        eventHandler.closeHandler(this)();
    }
    else {
        this.connector.disconnect();
    }
};
/**
 * Disconnect from Redis.
 *
 * @deprecated
 */
Redis.prototype.end = function () {
    this.disconnect();
};
/**
 * Create a new instance with the same options as the current one.
 *
 * @example
 * ```js
 * var redis = new Redis(6380);
 * var anotherRedis = redis.duplicate();
 * ```
 *
 * @public
 */
Redis.prototype.duplicate = function (override) {
    return new Redis(Object.assign({}, this.options, override || {}));
};
/**
 * Flush offline queue and command queue with error.
 *
 * @param {Error} error - The error object to send to the commands
 * @param {object} options
 * @private
 */
Redis.prototype.flushQueue = function (error, options) {
    options = _.defaults({}, options, {
        offlineQueue: true,
        commandQueue: true
    });
    var item;
    if (options.offlineQueue) {
        while (this.offlineQueue.length > 0) {
            item = this.offlineQueue.shift();
            item.command.reject(error);
        }
    }
    if (options.commandQueue) {
        if (this.commandQueue.length > 0) {
            if (this.stream) {
                this.stream.removeAllListeners('data');
            }
            while (this.commandQueue.length > 0) {
                item = this.commandQueue.shift();
                item.command.reject(error);
            }
        }
    }
};
/**
 * Check whether Redis has finished loading the persistent data and is able to
 * process commands.
 *
 * @param {Function} callback
 * @private
 */
Redis.prototype._readyCheck = function (callback) {
    var _this = this;
    this.info(function (err, res) {
        if (err) {
            return callback(err);
        }
        if (typeof res !== 'string') {
            return callback(null, res);
        }
        var info = {};
        var lines = res.split('\r\n');
        for (var i = 0; i < lines.length; ++i) {
            var parts = lines[i].split(':');
            if (parts[1]) {
                info[parts[0]] = parts[1];
            }
        }
        if (!info.loading || info.loading === '0') {
            callback(null, info);
        }
        else {
            var loadingEtaMs = (info.loading_eta_seconds || 1) * 1000;
            var retryTime = _this.options.maxLoadingRetryTime && _this.options.maxLoadingRetryTime < loadingEtaMs
                ? _this.options.maxLoadingRetryTime
                : loadingEtaMs;
            debug('Redis server still loading, trying again in ' + retryTime + 'ms');
            setTimeout(function () {
                _this._readyCheck(callback);
            }, retryTime);
        }
    });
};
/**
 * Emit only when there's at least one listener.
 *
 * @param {string} eventName - Event to emit
 * @param {...*} arguments - Arguments
 * @return {boolean} Returns true if event had listeners, false otherwise.
 * @private
 */
Redis.prototype.silentEmit = function (eventName) {
    var error;
    if (eventName === 'error') {
        error = arguments[1];
        if (this.status === 'end') {
            return;
        }
        if (this.manuallyClosing) {
            // ignore connection related errors when manually disconnecting
            if (error instanceof Error &&
                (error.message === utils.CONNECTION_CLOSED_ERROR_MSG ||
                    error.syscall === 'connect' ||
                    error.syscall === 'read')) {
                return;
            }
        }
    }
    if (this.listeners(eventName).length > 0) {
        return this.emit.apply(this, arguments);
    }
    if (error && error instanceof Error) {
        console.error('[ioredis] Unhandled error event:', error.stack);
    }
    return false;
};
/**
 * Listen for all requests received by the server in real time.
 *
 * This command will create a new connection to Redis and send a
 * MONITOR command via the new connection in order to avoid disturbing
 * the current connection.
 *
 * @param {function} [callback] The callback function. If omit, a promise will be returned.
 * @example
 * ```js
 * var redis = new Redis();
 * redis.monitor(function (err, monitor) {
 *   // Entering monitoring mode.
 *   monitor.on('monitor', function (time, args, source, database) {
 *     console.log(time + ": " + util.inspect(args));
 *   });
 * });
 *
 * // supports promise as well as other commands
 * redis.monitor().then(function (monitor) {
 *   monitor.on('monitor', function (time, args, source, database) {
 *     console.log(time + ": " + util.inspect(args));
 *   });
 * });
 * ```
 * @public
 */
Redis.prototype.monitor = function (callback) {
    var monitorInstance = this.duplicate({
        monitor: true,
        lazyConnect: false
    });
    var Promise = PromiseContainer.get();
    return asCallback(new Promise(function (resolve) {
        monitorInstance.once('monitoring', function () {
            resolve(monitorInstance);
        });
    }), callback);
};
__webpack_require__(23).addTransactionSupport(Redis.prototype);
/**
 * Send a command to Redis
 *
 * This method is used internally by the `Redis#set`, `Redis#lpush` etc.
 * Most of the time you won't invoke this method directly.
 * However when you want to send a command that is not supported by ioredis yet,
 * this command will be useful.
 *
 * @method sendCommand
 * @memberOf Redis#
 * @param {Command} command - The Command instance to send.
 * @see {@link Command}
 * @example
 * ```js
 * var redis = new Redis();
 *
 * // Use callback
 * var get = new Command('get', ['foo'], 'utf8', function (err, result) {
 *   console.log(result);
 * });
 * redis.sendCommand(get);
 *
 * // Use promise
 * var set = new Command('set', ['foo', 'bar'], 'utf8');
 * set.promise.then(function (result) {
 *   console.log(result);
 * });
 * redis.sendCommand(set);
 * ```
 * @private
 */
Redis.prototype.sendCommand = function (command, stream) {
    if (this.status === 'wait') {
        this.connect().catch(_.noop);
    }
    if (this.status === 'end') {
        command.reject(new Error(utils.CONNECTION_CLOSED_ERROR_MSG));
        return command.promise;
    }
    if (this.condition.subscriber && !Command.checkFlag('VALID_IN_SUBSCRIBER_MODE', command.name)) {
        command.reject(new Error('Connection in subscriber mode, only subscriber commands may be used'));
        return command.promise;
    }
    var writable = (this.status === 'ready') ||
        (!stream && (this.status === 'connect') && commands.hasFlag(command.name, 'loading'));
    if (!this.stream) {
        writable = false;
    }
    else if (!this.stream.writable) {
        writable = false;
    }
    else if (this.stream._writableState && this.stream._writableState.ended) {
        // https://github.com/iojs/io.js/pull/1217
        writable = false;
    }
    if (!writable && !this.options.enableOfflineQueue) {
        command.reject(new Error('Stream isn\'t writeable and enableOfflineQueue options is false'));
        return command.promise;
    }
    if (!writable && command.name === 'quit' && this.offlineQueue.length === 0) {
        this.disconnect();
        command.resolve(Buffer.from('OK'));
        return command.promise;
    }
    if (writable) {
        if (debug.enabled) {
            debug('write command[%s]: %d -> %s(%o)', this._getDescription(), this.condition.select, command.name, command.args);
        }
        (stream || this.stream).write(command.toWritable());
        this.commandQueue.push({
            command: command,
            stream: stream,
            select: this.condition.select
        });
        if (Command.checkFlag('WILL_DISCONNECT', command.name)) {
            this.manuallyClosing = true;
        }
    }
    else if (this.options.enableOfflineQueue) {
        if (debug.enabled) {
            debug('queue command[%s]: %d -> %s(%o)', this._getDescription(), this.condition.select, command.name, command.args);
        }
        this.offlineQueue.push({
            command: command,
            stream: stream,
            select: this.condition.select
        });
    }
    if (command.name === 'select' && utils.isInt(command.args[0])) {
        var db = parseInt(command.args[0], 10);
        if (this.condition.select !== db) {
            this.condition.select = db;
            this.emit('select', db);
            debug('switch to db [%d]', this.condition.select);
        }
    }
    return command.promise;
};
/**
 * Get description of the connection. Used for debugging.
 * @private
 */
Redis.prototype._getDescription = function () {
    let description;
    if (this.options.path) {
        description = this.options.path;
    }
    else if (this.stream && this.stream.remoteAddress && this.stream.remotePort) {
        description = this.stream.remoteAddress + ':' + this.stream.remotePort;
    }
    else {
        description = this.options.host + ':' + this.options.port;
    }
    if (this.options.connectionName) {
        description += ` (${this.options.connectionName})`;
    }
    return description;
};
['scan', 'sscan', 'hscan', 'zscan', 'scanBuffer', 'sscanBuffer', 'hscanBuffer', 'zscanBuffer']
    .forEach(function (command) {
    Redis.prototype[command + 'Stream'] = function (key, options) {
        if (command === 'scan' || command === 'scanBuffer') {
            options = key;
            key = null;
        }
        return new ScanStream(_.defaults({
            objectMode: true,
            key: key,
            redis: this,
            command: command
        }, options));
    };
});
Object.assign(Redis.prototype, __webpack_require__(51));
module.exports = Redis;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var commands = __webpack_require__(29)

/**
 * Redis command list
 *
 * All commands are lowercased.
 *
 * @var {string[]}
 * @public
 */
exports.list = Object.keys(commands)

var flags = {}
exports.list.forEach(function (commandName) {
  flags[commandName] = commands[commandName].flags.reduce(function (flags, flag) {
    flags[flag] = true
    return flags
  }, {})
})
/**
 * Check if the command exists
 *
 * @param {string} commandName - the command name
 * @return {boolean} result
 * @public
 */
exports.exists = function (commandName) {
  return Boolean(commands[commandName])
}

/**
 * Check if the command has the flag
 *
 * Some of possible flags: readonly, noscript, loading
 * @param {string} commandName - the command name
 * @param {string} flag - the flag to check
 * @return {boolean} result
 * @public
 */
exports.hasFlag = function (commandName, flag) {
  if (!flags[commandName]) {
    throw new Error('Unknown command ' + commandName)
  }

  return Boolean(flags[commandName][flag])
}

/**
 * Get indexes of keys in the command arguments
 *
 * @param {string} commandName - the command name
 * @param {string[]} args - the arguments of the command
 * @param {object} [options] - options
 * @param {boolean} [options.parseExternalKey] - parse external keys
 * @return {number[]} - the list of the index
 * @public
 *
 * @example
 * ```javascript
 * getKeyIndexes('set', ['key', 'value']) // [0]
 * getKeyIndexes('mget', ['key1', 'key2']) // [0, 1]
 * ```
 */
exports.getKeyIndexes = function (commandName, args, options) {
  var command = commands[commandName]
  if (!command) {
    throw new Error('Unknown command ' + commandName)
  }

  if (!Array.isArray(args)) {
    throw new Error('Expect args to be an array')
  }

  var keys = []
  var i, keyStart, keyStop, parseExternalKey
  switch (commandName) {
    case 'zunionstore':
    case 'zinterstore':
      keys.push(0)
    // fall through
    case 'eval':
    case 'evalsha':
      keyStop = Number(args[1]) + 2
      for (i = 2; i < keyStop; i++) {
        keys.push(i)
      }
      break
    case 'sort':
      parseExternalKey = options && options.parseExternalKey
      keys.push(0)
      for (i = 1; i < args.length - 1; i++) {
        if (typeof args[i] !== 'string') {
          continue
        }
        var directive = args[i].toUpperCase()
        if (directive === 'GET') {
          i += 1
          if (args[i] !== '#') {
            if (parseExternalKey) {
              keys.push([i, getExternalKeyNameLength(args[i])])
            } else {
              keys.push(i)
            }
          }
        } else if (directive === 'BY') {
          i += 1
          if (parseExternalKey) {
            keys.push([i, getExternalKeyNameLength(args[i])])
          } else {
            keys.push(i)
          }
        } else if (directive === 'STORE') {
          i += 1
          keys.push(i)
        }
      }
      break
    case 'migrate':
      if (args[2] === '') {
        for (i = 5; i < args.length - 1; i++) {
          if (args[i].toUpperCase() === 'KEYS') {
            for (var j = i + 1; j < args.length; j++) {
              keys.push(j)
            }
            break
          }
        }
      } else {
        keys.push(2)
      }
      break
    default:
    // step has to be at least one in this case, otherwise the command does not contain a key
      if (command.step > 0) {
        keyStart = command.keyStart - 1
        keyStop = command.keyStop > 0 ? command.keyStop : args.length + command.keyStop + 1
        for (i = keyStart; i < keyStop; i += command.step) {
          keys.push(i)
        }
      }
      break
  }

  return keys
}

function getExternalKeyNameLength (key) {
  if (typeof key !== 'string') {
    key = String(key)
  }
  var hashPos = key.indexOf('->')
  return hashPos === -1 ? key.length : hashPos
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Errors = process.version.charCodeAt(1) < 55 && process.version.charCodeAt(2) === 46
  ? __webpack_require__(45) // Node.js < 7
  : __webpack_require__(46)

module.exports = Errors


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Custom implementation of a double ended queue.
 */
function Denque(array) {
  this._head = 0;
  this._tail = 0;
  this._capacityMask = 0x3;
  this._list = new Array(4);
  if (Array.isArray(array)) {
    this._fromArray(array);
  }
}

/**
 * -------------
 *  PUBLIC API
 * -------------
 */

/**
 * Returns the item at the specified index from the list.
 * 0 is the first element, 1 is the second, and so on...
 * Elements at negative values are that many from the end: -1 is one before the end
 * (the last element), -2 is two before the end (one before last), etc.
 * @param index
 * @returns {*}
 */
Denque.prototype.peekAt = function peekAt(index) {
  var i = index;
  // expect a number or return undefined
  if ((i !== (i | 0))) {
    return void 0;
  }
  var len = this.size();
  if (i >= len || i < -len) return undefined;
  if (i < 0) i += len;
  i = (this._head + i) & this._capacityMask;
  return this._list[i];
};

/**
 * Alias for peakAt()
 * @param i
 * @returns {*}
 */
Denque.prototype.get = function get(i) {
  return this.peekAt(i);
};

/**
 * Returns the first item in the list without removing it.
 * @returns {*}
 */
Denque.prototype.peek = function peek() {
  if (this._head === this._tail) return undefined;
  return this._list[this._head];
};

/**
 * Alias for peek()
 * @returns {*}
 */
Denque.prototype.peekFront = function peekFront() {
  return this.peek();
};

/**
 * Returns the item that is at the back of the queue without removing it.
 * Uses peekAt(-1)
 */
Denque.prototype.peekBack = function peekBack() {
  return this.peekAt(-1);
};

/**
 * Returns the current length of the queue
 * @return {Number}
 */
Object.defineProperty(Denque.prototype, 'length', {
  get: function length() {
    return this.size();
  }
});

/**
 * Return the number of items on the list, or 0 if empty.
 * @returns {number}
 */
Denque.prototype.size = function size() {
  if (this._head === this._tail) return 0;
  if (this._head < this._tail) return this._tail - this._head;
  else return this._capacityMask + 1 - (this._head - this._tail);
};

/**
 * Add an item at the beginning of the list.
 * @param item
 */
Denque.prototype.unshift = function unshift(item) {
  if (item === undefined) return this.size();
  var len = this._list.length;
  this._head = (this._head - 1 + len) & this._capacityMask;
  this._list[this._head] = item;
  if (this._tail === this._head) this._growArray();
  if (this._head < this._tail) return this._tail - this._head;
  else return this._capacityMask + 1 - (this._head - this._tail);
};

/**
 * Remove and return the first item on the list,
 * Returns undefined if the list is empty.
 * @returns {*}
 */
Denque.prototype.shift = function shift() {
  var head = this._head;
  if (head === this._tail) return undefined;
  var item = this._list[head];
  this._list[head] = undefined;
  this._head = (head + 1) & this._capacityMask;
  if (head < 2 && this._tail > 10000 && this._tail <= this._list.length >>> 2) this._shrinkArray();
  return item;
};

/**
 * Add an item to the bottom of the list.
 * @param item
 */
Denque.prototype.push = function push(item) {
  if (item === undefined) return this.size();
  var tail = this._tail;
  this._list[tail] = item;
  this._tail = (tail + 1) & this._capacityMask;
  if (this._tail === this._head) {
    this._growArray();
  }

  if (this._head < this._tail) return this._tail - this._head;
  else return this._capacityMask + 1 - (this._head - this._tail);
};

/**
 * Remove and return the last item on the list.
 * Returns undefined if the list is empty.
 * @returns {*}
 */
Denque.prototype.pop = function pop() {
  var tail = this._tail;
  if (tail === this._head) return undefined;
  var len = this._list.length;
  this._tail = (tail - 1 + len) & this._capacityMask;
  var item = this._list[this._tail];
  this._list[this._tail] = undefined;
  if (this._head < 2 && tail > 10000 && tail <= len >>> 2) this._shrinkArray();
  return item;
};

/**
 * Remove and return the item at the specified index from the list.
 * Returns undefined if the list is empty.
 * @param index
 * @returns {*}
 */
Denque.prototype.removeOne = function removeOne(index) {
  var i = index;
  // expect a number or return undefined
  if ((i !== (i | 0))) {
    return void 0;
  }
  if (this._head === this._tail) return void 0;
  var size = this.size();
  var len = this._list.length;
  if (i >= size || i < -size) return void 0;
  if (i < 0) i += size;
  i = (this._head + i) & this._capacityMask;
  var item = this._list[i];
  var k;
  if (index < size / 2) {
    for (k = index; k > 0; k--) {
      this._list[i] = this._list[i = (i - 1 + len) & this._capacityMask];
    }
    this._list[i] = void 0;
    this._head = (this._head + 1 + len) & this._capacityMask;
  } else {
    for (k = size - 1 - index; k > 0; k--) {
      this._list[i] = this._list[i = ( i + 1 + len) & this._capacityMask];
    }
    this._list[i] = void 0;
    this._tail = (this._tail - 1 + len) & this._capacityMask;
  }
  return item;
};

/**
 * Remove number of items from the specified index from the list.
 * Returns array of removed items.
 * Returns undefined if the list is empty.
 * @param index
 * @param count
 * @returns {array}
 */
Denque.prototype.remove = function remove(index, count) {
  var i = index;
  var removed;
  var del_count = count;
  // expect a number or return undefined
  if ((i !== (i | 0))) {
    return void 0;
  }
  if (this._head === this._tail) return void 0;
  var size = this.size();
  var len = this._list.length;
  if (i >= size || i < -size || count < 1) return void 0;
  if (i < 0) i += size;
  if (count === 1 || !count) {
    removed = new Array(1);
    removed[0] = this.removeOne(i);
    return removed;
  }
  if (i === 0 && i + count >= size) {
    removed = this.toArray();
    this.clear();
    return removed;
  }
  if (i + count > size) count = size - i;
  var k;
  removed = new Array(count);
  for (k = 0; k < count; k++) {
    removed[k] = this._list[(this._head + i + k) & this._capacityMask];
  }
  i = (this._head + i) & this._capacityMask;
  if (index + count === size) {
    this._tail = (this._tail - count + len) & this._capacityMask;
    for (k = count; k > 0; k--) {
      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;
    }
    return removed;
  }
  if (index === 0) {
    this._head = (this._head + count + len) & this._capacityMask;
    for (k = count - 1; k > 0; k--) {
      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;
    }
    return removed;
  }
  if (i < size / 2) {
    this._head = (this._head + index + count + len) & this._capacityMask;
    for (k = index; k > 0; k--) {
      this.unshift(this._list[i = (i - 1 + len) & this._capacityMask]);
    }
    i = (this._head - 1 + len) & this._capacityMask;
    while (del_count > 0) {
      this._list[i = (i - 1 + len) & this._capacityMask] = void 0;
      del_count--;
    }
    if (index < 0) this._tail = i;
  } else {
    this._tail = i;
    i = (i + count + len) & this._capacityMask;
    for (k = size - (count + index); k > 0; k--) {
      this.push(this._list[i++]);
    }
    i = this._tail;
    while (del_count > 0) {
      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;
      del_count--;
    }
  }
  if (this._head < 2 && this._tail > 10000 && this._tail <= len >>> 2) this._shrinkArray();
  return removed;
};

/**
 * Native splice implementation.
 * Remove number of items from the specified index from the list and/or add new elements.
 * Returns array of removed items or empty array if count == 0.
 * Returns undefined if the list is empty.
 *
 * @param index
 * @param count
 * @param {...*} [elements]
 * @returns {array}
 */
Denque.prototype.splice = function splice(index, count) {
  var i = index;
  // expect a number or return undefined
  if ((i !== (i | 0))) {
    return void 0;
  }
  var size = this.size();
  if (i < 0) i += size;
  if (i > size) return void 0;
  if (arguments.length > 2) {
    var k;
    var temp;
    var removed;
    var arg_len = arguments.length;
    var len = this._list.length;
    var arguments_index = 2;
    if (!size || i < size / 2) {
      temp = new Array(i);
      for (k = 0; k < i; k++) {
        temp[k] = this._list[(this._head + k) & this._capacityMask];
      }
      if (count === 0) {
        removed = [];
        if (i > 0) {
          this._head = (this._head + i + len) & this._capacityMask;
        }
      } else {
        removed = this.remove(i, count);
        this._head = (this._head + i + len) & this._capacityMask;
      }
      while (arg_len > arguments_index) {
        this.unshift(arguments[--arg_len]);
      }
      for (k = i; k > 0; k--) {
        this.unshift(temp[k - 1]);
      }
    } else {
      temp = new Array(size - (i + count));
      var leng = temp.length;
      for (k = 0; k < leng; k++) {
        temp[k] = this._list[(this._head + i + count + k) & this._capacityMask];
      }
      if (count === 0) {
        removed = [];
        if (i != size) {
          this._tail = (this._head + i + len) & this._capacityMask;
        }
      } else {
        removed = this.remove(i, count);
        this._tail = (this._tail - leng + len) & this._capacityMask;
      }
      while (arguments_index < arg_len) {
        this.push(arguments[arguments_index++]);
      }
      for (k = 0; k < leng; k++) {
        this.push(temp[k]);
      }
    }
    return removed;
  } else {
    return this.remove(i, count);
  }
};

/**
 * Soft clear - does not reset capacity.
 */
Denque.prototype.clear = function clear() {
  this._head = 0;
  this._tail = 0;
};

/**
 * Returns true or false whether the list is empty.
 * @returns {boolean}
 */
Denque.prototype.isEmpty = function isEmpty() {
  return this._head === this._tail;
};

/**
 * Returns an array of all queue items.
 * @returns {Array}
 */
Denque.prototype.toArray = function toArray() {
  return this._copyArray(false);
};

/**
 * -------------
 *   INTERNALS
 * -------------
 */

/**
 * Fills the queue with items from an array
 * For use in the constructor
 * @param array
 * @private
 */
Denque.prototype._fromArray = function _fromArray(array) {
  for (var i = 0; i < array.length; i++) this.push(array[i]);
};

/**
 *
 * @param fullCopy
 * @returns {Array}
 * @private
 */
Denque.prototype._copyArray = function _copyArray(fullCopy) {
  var newArray = [];
  var list = this._list;
  var len = list.length;
  var i;
  if (fullCopy || this._head > this._tail) {
    for (i = this._head; i < len; i++) newArray.push(list[i]);
    for (i = 0; i < this._tail; i++) newArray.push(list[i]);
  } else {
    for (i = this._head; i < this._tail; i++) newArray.push(list[i]);
  }
  return newArray;
};

/**
 * Grows the internal list array.
 * @private
 */
Denque.prototype._growArray = function _growArray() {
  if (this._head) {
    // copy existing data, head to end, then beginning to tail.
    this._list = this._copyArray(true);
    this._head = 0;
  }

  // head is at 0 and array is now full, safe to extend
  this._tail = this._list.length;

  this._list.length *= 2;
  this._capacityMask = (this._capacityMask << 1) | 1;
};

/**
 * Shrinks the internal list array.
 * @private
 */
Denque.prototype._shrinkArray = function _shrinkArray() {
  this._list.length >>>= 1;
  this._capacityMask >>>= 1;
};


module.exports = Denque;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(1);
var Command = __webpack_require__(2).default;
var Script = __webpack_require__(32).default;
var PromiseContainer = __webpack_require__(5);
var asCallback = __webpack_require__(4).default;
var DROP_BUFFER_SUPPORT_ERROR = '*Buffer methods are not available ' +
    'because "dropBufferSupport" option is enabled.' +
    'Refer to https://github.com/luin/ioredis/wiki/Improve-Performance for more details.';
/**
 * Commander
 *
 * This is the base class of Redis, Redis.Cluster and Pipeline
 *
 * @param {boolean} [options.showFriendlyErrorStack=false] - Whether to show a friendly error stack.
 * Will decrease the performance significantly.
 * @constructor
 */
function Commander() {
    this.options = _.defaults({}, this.options || {}, {
        showFriendlyErrorStack: false
    });
    this.scriptsSet = {};
}
var commands = __webpack_require__(7).list.filter(function (command) {
    return command !== 'monitor';
});
commands.push('sentinel');
/**
 * Return supported builtin commands
 *
 * @return {string[]} command list
 * @public
 */
Commander.prototype.getBuiltinCommands = function () {
    return commands.slice(0);
};
/**
 * Create a builtin command
 *
 * @param {string} commandName - command name
 * @return {object} functions
 * @public
 */
Commander.prototype.createBuiltinCommand = function (commandName) {
    return {
        string: generateFunction(commandName, 'utf8'),
        buffer: generateFunction(commandName, null)
    };
};
commands.forEach(function (commandName) {
    Commander.prototype[commandName] = generateFunction(commandName, 'utf8');
    Commander.prototype[commandName + 'Buffer'] = generateFunction(commandName, null);
});
Commander.prototype.call = generateFunction('utf8');
Commander.prototype.callBuffer = generateFunction(null);
Commander.prototype.send_command = Commander.prototype.call;
/**
 * Define a custom command using lua script
 *
 * @param {string} name - the command name
 * @param {object} definition
 * @param {string} definition.lua - the lua code
 * @param {number} [definition.numberOfKeys=null] - the number of keys.
 * If omit, you have to pass the number of keys as the first argument every time you invoke the command
 */
Commander.prototype.defineCommand = function (name, definition) {
    var script = new Script(definition.lua, definition.numberOfKeys, this.options.keyPrefix);
    this.scriptsSet[name] = script;
    this[name] = generateScriptingFunction(script, 'utf8');
    this[name + 'Buffer'] = generateScriptingFunction(script, null);
};
/**
 * Send a command
 *
 * @abstract
 * @public
 */
Commander.prototype.sendCommand = function () { };
function generateFunction(_commandName, _encoding) {
    if (typeof _encoding === 'undefined') {
        _encoding = _commandName;
        _commandName = null;
    }
    return function () {
        var firstArgIndex = 0;
        var commandName = _commandName;
        if (commandName === null) {
            commandName = arguments[0];
            firstArgIndex = 1;
        }
        var length = arguments.length;
        var lastArgIndex = length - 1;
        var callback = arguments[lastArgIndex];
        if (typeof callback !== 'function') {
            callback = undefined;
        }
        else {
            length = lastArgIndex;
        }
        var args = new Array(length - firstArgIndex);
        for (var i = firstArgIndex; i < length; ++i) {
            args[i - firstArgIndex] = arguments[i];
        }
        var options;
        if (this.options.dropBufferSupport) {
            if (!_encoding) {
                return asCallback(PromiseContainer.get().reject(new Error(DROP_BUFFER_SUPPORT_ERROR)), callback);
            }
            options = { replyEncoding: null };
        }
        else {
            options = { replyEncoding: _encoding };
        }
        if (this.options.showFriendlyErrorStack) {
            options.errorStack = new Error().stack;
        }
        if (this.options.keyPrefix) {
            options.keyPrefix = this.options.keyPrefix;
        }
        return this.sendCommand(new Command(commandName, args, options, callback));
    };
}
function generateScriptingFunction(_script, _encoding) {
    return function () {
        var length = arguments.length;
        var lastArgIndex = length - 1;
        var callback = arguments[lastArgIndex];
        if (typeof callback !== 'function') {
            callback = undefined;
        }
        else {
            length = lastArgIndex;
        }
        var args = new Array(length);
        for (var i = 0; i < length; i++) {
            args[i] = arguments[i];
        }
        var options;
        if (this.options.dropBufferSupport) {
            if (!_encoding) {
                return asCallback(PromiseContainer.get().reject(new Error(DROP_BUFFER_SUPPORT_ERROR)), callback);
            }
            options = { replyEncoding: null };
        }
        else {
            options = { replyEncoding: _encoding };
        }
        if (this.options.showFriendlyErrorStack) {
            options.errorStack = new Error().stack;
        }
        return _script.execute(this, args, options, callback);
    };
}
module.exports = Commander;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = __webpack_require__(50);
/**
 * Convenient class to convert the process of scaning keys to a readable stream.
 *
 * @export
 * @class ScanStream
 * @extends {Readable}
 */
class ScanStream extends stream_1.Readable {
    constructor(opt) {
        super(opt);
        this.opt = opt;
        this._redisCursor = '0';
        this._redisDrained = false;
    }
    _read() {
        if (this._redisDrained) {
            this.push(null);
            return;
        }
        const args = [this._redisCursor];
        if (this.opt.key) {
            args.unshift(this.opt.key);
        }
        if (this.opt.match) {
            args.push('MATCH', this.opt.match);
        }
        if (this.opt.count) {
            args.push('COUNT', String(this.opt.count));
        }
        this.opt.redis[this.opt.command](args, (err, res) => {
            if (err) {
                this.emit('error', err);
                return;
            }
            this._redisCursor = (res[0] instanceof Buffer) ? res[0].toString() : res[0];
            if (this._redisCursor === '0') {
                this._redisDrained = true;
            }
            this.push(res[1]);
        });
    }
    close() {
        this._redisDrained = true;
    }
}
exports.default = ScanStream;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(0);
const net_1 = __webpack_require__(13);
function getNodeKey(node) {
    node.port = node.port || 6379;
    node.host = node.host || '127.0.0.1';
    return node.host + ':' + node.port;
}
exports.getNodeKey = getNodeKey;
function nodeKeyToRedisOptions(nodeKey) {
    const portIndex = nodeKey.lastIndexOf(':');
    if (portIndex === -1) {
        throw new Error(`Invalid node key ${nodeKey}`);
    }
    return {
        host: nodeKey.slice(0, portIndex),
        port: Number(nodeKey.slice(portIndex + 1))
    };
}
exports.nodeKeyToRedisOptions = nodeKeyToRedisOptions;
function normalizeNodeOptions(nodes) {
    return nodes.map((node) => {
        const options = {};
        if (typeof node === 'object') {
            Object.assign(options, node);
        }
        else if (typeof node === 'string') {
            Object.assign(options, utils_1.parseURL(node));
        }
        else if (typeof node === 'number') {
            options.port = node;
        }
        else {
            throw new Error('Invalid argument ' + node);
        }
        if (typeof options.port === 'string') {
            options.port = parseInt(options.port, 10);
        }
        // Cluster mode only support db 0
        delete options.db;
        if (!options.port) {
            options.port = 6379;
        }
        if (!options.host) {
            options.host = '127.0.0.1';
        }
        return options;
    });
}
exports.normalizeNodeOptions = normalizeNodeOptions;
function getUniqueHostnamesFromOptions(nodes) {
    const uniqueHostsMap = {};
    nodes.forEach((node) => {
        uniqueHostsMap[node.host] = true;
    });
    return Object.keys(uniqueHostsMap).filter(host => !net_1.isIP(host));
}
exports.getUniqueHostnamesFromOptions = getUniqueHostnamesFromOptions;


/***/ }),
/* 16 */
/***/ (function(module, exports) {


function FlexBuffer(){
    this.originalArgs = arguments
   
    if (arguments[0] && typeof arguments[0] === "number") 
        this.buffer = new Buffer (arguments[0]);
    else
        this.buffer = Buffer.call(this,arguments);
    this.length = this.buffer.length
    this.tail = 0
}

FlexBuffer.prototype.rewind = function(){
    this.tail = 0
}

FlexBuffer.prototype.reset = function(){
    this.buffer = Buffer.call(this,this.originalArgs)
    this.length = this.buffer.length
    this.tail = 0
}

FlexBuffer.prototype.resizeBuffer = function(minLen){
    if(this.length == 0){
        this.length = 1
    }
    this.length = (this.length + minLen) * 2
    var oldBuffer = this.buffer
    this.buffer = new Buffer(this.length)
    oldBuffer.copy(this.buffer,0, 0, this.tail)
}

FlexBuffer.prototype.write = function(arg){
    if(!arg)
        return;
    if(!arg.length){
        arg = String(arg)
    }

    if(typeof arg === "string")
       var len = Buffer.byteLength(arg);
    else
       var len = arg.length;

    if(this.tail+len >= this.length)
        this.resizeBuffer(len)

    if(Buffer.isBuffer(arg)){
        arg.copy(this.buffer,this.tail)
    }else{
        this.buffer.write(arg,this.tail)
    }
    this.tail+=len   
}

FlexBuffer.prototype.getBufferReference = function(){
    return this.buffer.slice(0,this.tail)
}

FlexBuffer.prototype.getBuffer = function(){
    var buff = this.buffer.slice(0,this.tail)
    var b = new Buffer(buff.length)
    buff.copy(b)
    return b
}

FlexBuffer.prototype.delete = function(start, end) {
    checkParams(start, end, this.tail);
    var copy = this.buffer.slice(end, this.tail).copy(this.buffer, start)
    this.tail = this.tail - end + start
}

var checkParams = function (start, end, size) {
	if (end > size || start > size || start < 0 || end < 0 || start > end) {
		  throw new Error("Start and end not valid. start:["+start+"], end:["+end+"], size:["+size+"]");	
	}

}

FlexBuffer.prototype.deleteAndGet = function(start, end) {
    var b = new Buffer(end - start);
    this.buffer.slice(start, end).copy(b);
    this.delete(start, end);
    return b;
}

FlexBuffer.prototype.getLength = function() {
	return this.tail
}

FlexBuffer.prototype.getBufferLength = function() {
	return this.buffer.length;
}

module.exports.FlexBuffer = FlexBuffer



/***/ }),
/* 17 */
/***/ (function(module, exports) {

/*
 * Copyright 2001-2010 Georges Menie (www.menie.org)
 * Copyright 2010 Salvatore Sanfilippo (adapted to Redis coding style)
 * Copyright 2015 Zihua Li (http://zihua.li) (ported to JavaScript)
 * Copyright 2016 Mike Diarmid (http://github.com/salakar) (re-write for performance, ~700% perf inc)
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the University of California, Berkeley nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* CRC16 implementation according to CCITT standards.
 *
 * Note by @antirez: this is actually the XMODEM CRC 16 algorithm, using the
 * following parameters:
 *
 * Name                       : "XMODEM", also known as "ZMODEM", "CRC-16/ACORN"
 * Width                      : 16 bit
 * Poly                       : 1021 (That is actually x^16 + x^12 + x^5 + 1)
 * Initialization             : 0000
 * Reflect Input byte         : False
 * Reflect Output CRC         : False
 * Xor constant to output CRC : 0000
 * Output for "123456789"     : 31C3
 */

var lookup = [
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
  0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
  0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
  0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de,
  0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485,
  0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
  0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
  0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc,
  0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
  0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b,
  0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12,
  0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
  0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41,
  0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
  0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
  0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78,
  0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f,
  0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
  0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e,
  0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256,
  0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
  0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
  0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c,
  0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
  0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab,
  0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3,
  0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
  0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92,
  0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9,
  0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
  0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8,
  0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0
];

/**
 * Convert a string to a UTF8 array - faster than via buffer
 * @param str
 * @returns {Array}
 */
var toUTF8Array = function toUTF8Array(str) {
  var char;
  var i = 0;
  var p = 0;
  var utf8 = [];
  var len = str.length;

  for (; i < len; i++) {
    char = str.charCodeAt(i);
    if (char < 128) {
      utf8[p++] = char;
    } else if (char < 2048) {
      utf8[p++] = (char >> 6) | 192;
      utf8[p++] = (char & 63) | 128;
    } else if (
        ((char & 0xFC00) === 0xD800) && (i + 1) < str.length &&
        ((str.charCodeAt(i + 1) & 0xFC00) === 0xDC00)) {
      char = 0x10000 + ((char & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
      utf8[p++] = (char >> 18) | 240;
      utf8[p++] = ((char >> 12) & 63) | 128;
      utf8[p++] = ((char >> 6) & 63) | 128;
      utf8[p++] = (char & 63) | 128;
    } else {
      utf8[p++] = (char >> 12) | 224;
      utf8[p++] = ((char >> 6) & 63) | 128;
      utf8[p++] = (char & 63) | 128;
    }
  }

  return utf8;
};

/**
 * Convert a string into a redis slot hash.
 * @param str
 * @returns {number}
 */
var generate = module.exports = function generate(str) {
  var char;
  var i = 0;
  var start = -1;
  var result = 0;
  var resultHash = 0;
  var utf8 = toUTF8Array(str);
  var len = utf8.length;

  while (i < len) {
    char = utf8[i++];
    if (start === -1) {
      if (char === 0x7B) {
        start = i;
      }
    } else if (char !== 0x7D) {
      resultHash = lookup[(char ^ (resultHash >> 8)) & 0xFF] ^ (resultHash << 8);
    } else if (i - 1 !== start) {
      return resultHash & 0x3FFF;
    }

    result = lookup[(char ^ (result >> 8)) & 0xFF] ^ (result << 8);
  }

  return result & 0x3FFF;
};

/**
 * Convert an array of multiple strings into a redis slot hash.
 * Returns -1 if one of the keys is not for the same slot as the others
 * @param keys
 * @returns {number}
 */
module.exports.generateMulti = function generateMulti(keys) {
  var i = 1;
  var len = keys.length;
  var base = generate(keys[0]);

  while (i < len) {
    if (generate(keys[i++]) !== base) return -1;
  }

  return base;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(37);
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __webpack_require__(13);
const tls_1 = __webpack_require__(21);
const utils_1 = __webpack_require__(0);
const AbstractConnector_1 = __webpack_require__(22);
function isIIpcConnectionOptions(value) {
    return value.path;
}
exports.isIIpcConnectionOptions = isIIpcConnectionOptions;
class StandaloneConnector extends AbstractConnector_1.default {
    constructor(options) {
        super();
        this.options = options;
    }
    connect(callback, _) {
        const { options } = this;
        this.connecting = true;
        let connectionOptions;
        if (isIIpcConnectionOptions(options)) {
            connectionOptions = {
                path: options.path
            };
        }
        else {
            connectionOptions = {};
            if (options.port != null) {
                connectionOptions.port = options.port;
            }
            if (options.host != null) {
                connectionOptions.host = options.host;
            }
            if (options.family != null) {
                connectionOptions.family = options.family;
            }
        }
        if (options.tls) {
            Object.assign(connectionOptions, options.tls);
        }
        process.nextTick(() => {
            if (!this.connecting) {
                callback(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
                return;
            }
            let stream;
            try {
                if (options.tls) {
                    stream = tls_1.connect(connectionOptions);
                }
                else {
                    stream = net_1.createConnection(connectionOptions);
                }
            }
            catch (err) {
                callback(err);
                return;
            }
            this.stream = stream;
            callback(null, stream);
        });
    }
}
exports.default = StandaloneConnector;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AbstractConnector {
    constructor() {
        this.connecting = false;
    }
    check(info) {
        return true;
    }
    disconnect() {
        this.connecting = false;
        if (this.stream) {
            this.stream.end();
        }
    }
}
exports.default = AbstractConnector;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(0);
const standard_as_callback_1 = __webpack_require__(4);
const pipeline_1 = __webpack_require__(24);
function addTransactionSupport(redis) {
    redis.pipeline = function (commands) {
        const pipeline = new pipeline_1.default(this);
        if (Array.isArray(commands)) {
            pipeline.addBatch(commands);
        }
        return pipeline;
    };
    const { multi } = redis;
    redis.multi = function (commands, options) {
        if (typeof options === 'undefined' && !Array.isArray(commands)) {
            options = commands;
            commands = null;
        }
        if (options && options.pipeline === false) {
            return multi.call(this);
        }
        const pipeline = new pipeline_1.default(this);
        pipeline.multi();
        if (Array.isArray(commands)) {
            pipeline.addBatch(commands);
        }
        const exec = pipeline.exec;
        pipeline.exec = function (callback) {
            if (this._transactions > 0) {
                exec.call(pipeline);
            }
            const promise = exec.call(pipeline);
            return standard_as_callback_1.default(promise.then(function (result) {
                const execResult = result[result.length - 1];
                if (execResult[0]) {
                    execResult[0].previousErrors = [];
                    for (let i = 0; i < result.length - 1; ++i) {
                        if (result[i][0]) {
                            execResult[0].previousErrors.push(result[i][0]);
                        }
                    }
                    throw execResult[0];
                }
                return utils_1.wrapMultiResult(execResult[1]);
            }), callback);
        };
        const { execBuffer } = pipeline;
        pipeline.execBuffer = function (callback) {
            if (this._transactions > 0) {
                execBuffer.call(pipeline);
            }
            return pipeline.exec(callback);
        };
        return pipeline;
    };
    const { exec } = redis;
    redis.exec = function (callback) {
        return standard_as_callback_1.default(exec.call(this).then(function (results) {
            if (Array.isArray(results)) {
                results = utils_1.wrapMultiResult(results);
            }
            return results;
        }), callback);
    };
}
exports.addTransactionSupport = addTransactionSupport;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(2);
const flexbuffer_1 = __webpack_require__(16);
const util_1 = __webpack_require__(9);
const standard_as_callback_1 = __webpack_require__(4);
const redis_commands_1 = __webpack_require__(7);
const cluster_key_slot_1 = __webpack_require__(17);
const PromiseContainer = __webpack_require__(5);
const Commander = __webpack_require__(12);
function Pipeline(redis) {
    Commander.call(this);
    this.redis = redis;
    this.isCluster = this.redis.constructor.name === 'Cluster';
    this.options = redis.options;
    this._queue = [];
    this._result = [];
    this._transactions = 0;
    this._shaToScript = {};
    Object.keys(redis.scriptsSet).forEach((name) => {
        const script = redis.scriptsSet[name];
        this._shaToScript[script.sha] = script;
        this[name] = redis[name];
        this[name + 'Buffer'] = redis[name + 'Buffer'];
    });
    const Promise = PromiseContainer.get();
    this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
    });
    const _this = this;
    Object.defineProperty(this, 'length', {
        get: function () {
            return _this._queue.length;
        }
    });
}
exports.default = Pipeline;
Object.assign(Pipeline.prototype, Commander.prototype);
Pipeline.prototype.fillResult = function (value, position) {
    if (this._queue[position].name === 'exec' && Array.isArray(value[1])) {
        var execLength = value[1].length;
        for (let i = 0; i < execLength; i++) {
            if (value[1][i] instanceof Error) {
                continue;
            }
            const cmd = this._queue[position - (execLength - i)];
            try {
                value[1][i] = cmd.transformReply(value[1][i]);
            }
            catch (err) {
                value[1][i] = err;
            }
        }
    }
    this._result[position] = value;
    if (--this.replyPending) {
        return;
    }
    if (this.isCluster) {
        let retriable = true;
        let commonError;
        let inTransaction;
        for (let i = 0; i < this._result.length; ++i) {
            var error = this._result[i][0];
            var command = this._queue[i];
            if (command.name === 'multi') {
                inTransaction = true;
            }
            else if (command.name === 'exec') {
                inTransaction = false;
            }
            if (error) {
                if (command.name === 'exec' && error.message === 'EXECABORT Transaction discarded because of previous errors.') {
                    continue;
                }
                if (!commonError) {
                    commonError = {
                        name: error.name,
                        message: error.message
                    };
                }
                else if (commonError.name !== error.name || commonError.message !== error.message) {
                    retriable = false;
                    break;
                }
            }
            else if (!inTransaction) {
                var isReadOnly = redis_commands_1.exists(command.name) && redis_commands_1.hasFlag(command.name, 'readonly');
                if (!isReadOnly) {
                    retriable = false;
                    break;
                }
            }
        }
        if (commonError && retriable) {
            var _this = this;
            var errv = commonError.message.split(' ');
            var queue = this._queue;
            inTransaction = false;
            this._queue = [];
            for (let i = 0; i < queue.length; ++i) {
                if (errv[0] === 'ASK' && !inTransaction &&
                    queue[i].name !== 'asking' &&
                    (!queue[i - 1] || queue[i - 1].name !== 'asking')) {
                    var asking = new command_1.default('asking');
                    asking.ignore = true;
                    this.sendCommand(asking);
                }
                queue[i].initPromise();
                this.sendCommand(queue[i]);
                if (queue[i].name === 'multi') {
                    inTransaction = true;
                }
                else if (queue[i].name === 'exec') {
                    inTransaction = false;
                }
            }
            let matched = true;
            if (typeof this.leftRedirections === 'undefined') {
                this.leftRedirections = {};
            }
            const exec = function () {
                _this.exec();
            };
            this.redis.handleError(commonError, this.leftRedirections, {
                moved: function (slot, key) {
                    _this.preferKey = key;
                    _this.redis.slots[errv[1]] = [key];
                    _this.redis.refreshSlotsCache();
                    _this.exec();
                },
                ask: function (slot, key) {
                    _this.preferKey = key;
                    _this.exec();
                },
                tryagain: exec,
                clusterDown: exec,
                connectionClosed: exec,
                maxRedirections: () => {
                    matched = false;
                },
                defaults: () => {
                    matched = false;
                }
            });
            if (matched) {
                return;
            }
        }
    }
    let ignoredCount = 0;
    for (let i = 0; i < this._queue.length - ignoredCount; ++i) {
        if (this._queue[i + ignoredCount].ignore) {
            ignoredCount += 1;
        }
        this._result[i] = this._result[i + ignoredCount];
    }
    this.resolve(this._result.slice(0, this._result.length - ignoredCount));
};
Pipeline.prototype.sendCommand = function (command) {
    const position = this._queue.length;
    command.promise.then((result) => {
        this.fillResult([null, result], position);
    }).catch((error) => {
        this.fillResult([error], position);
    });
    this._queue.push(command);
    return this;
};
Pipeline.prototype.addBatch = function (commands) {
    let command, commandName, args;
    for (let i = 0; i < commands.length; ++i) {
        command = commands[i];
        commandName = command[0];
        args = command.slice(1);
        this[commandName].apply(this, args);
    }
    return this;
};
const multi = Pipeline.prototype.multi;
Pipeline.prototype.multi = function () {
    this._transactions += 1;
    return multi.apply(this, arguments);
};
const execBuffer = Pipeline.prototype.execBuffer;
const exec = Pipeline.prototype.exec;
Pipeline.prototype.execBuffer = util_1.deprecate(function () {
    if (this._transactions > 0) {
        this._transactions -= 1;
    }
    return execBuffer.apply(this, arguments);
}, 'Pipeline#execBuffer: Use Pipeline#exec instead');
Pipeline.prototype.exec = function (callback) {
    if (this._transactions > 0) {
        this._transactions -= 1;
        return (this.options.dropBufferSupport ? exec : execBuffer).apply(this, arguments);
    }
    if (!this.nodeifiedPromise) {
        this.nodeifiedPromise = true;
        standard_as_callback_1.default(this.promise, callback);
    }
    if (!this._queue.length) {
        this.resolve([]);
    }
    let pipelineSlot;
    if (this.isCluster) {
        // List of the first key for each command
        const sampleKeys = [];
        for (let i = 0; i < this._queue.length; i++) {
            var keys = this._queue[i].getKeys();
            if (keys.length) {
                sampleKeys.push(keys[0]);
            }
        }
        if (sampleKeys.length) {
            pipelineSlot = cluster_key_slot_1.generateMulti(sampleKeys);
            if (pipelineSlot < 0) {
                this.reject(new Error('All keys in the pipeline should belong to the same slot'));
                return this.promise;
            }
        }
        else {
            // Send the pipeline to a random node
            pipelineSlot = Math.random() * 16384 | 0;
        }
    }
    // Check whether scripts exists
    const scripts = [];
    for (let i = 0; i < this._queue.length; ++i) {
        var item = this._queue[i];
        if (this.isCluster && item.isCustomCommand) {
            this.reject(new Error('Sending custom commands in pipeline is not supported in Cluster mode.'));
            return this.promise;
        }
        if (item.name !== 'evalsha') {
            continue;
        }
        const script = this._shaToScript[item.args[0]];
        if (!script) {
            continue;
        }
        scripts.push(script);
    }
    var _this = this;
    if (!scripts.length) {
        return execPipeline();
    }
    return this.redis
        .script('exists', Array.from(new Set(scripts.map(({ sha }) => sha))))
        .then(function (results) {
        var pending = [];
        for (var i = 0; i < results.length; ++i) {
            if (!results[i]) {
                pending.push(scripts[i]);
            }
        }
        var Promise = PromiseContainer.get();
        return Promise.all(pending.map(function (script) {
            return _this.redis.script('load', script.lua);
        }));
    }).then(execPipeline);
    function execPipeline() {
        let data = '';
        let writePending = _this.replyPending = _this._queue.length;
        let node;
        if (_this.isCluster) {
            node = { slot: pipelineSlot, redis: _this.redis.connectionPool.nodes.all[_this.preferKey] };
        }
        let bufferMode = false;
        const stream = {
            write: function (writable) {
                if (writable instanceof Buffer) {
                    bufferMode = true;
                }
                if (bufferMode) {
                    if (typeof data === 'string') {
                        var flexBuffer = new flexbuffer_1.FlexBuffer(0);
                        flexBuffer.write(data);
                        data = flexBuffer;
                    }
                    data.write(writable);
                }
                else {
                    data += writable;
                }
                if (!--writePending) {
                    if (bufferMode) {
                        data = data.getBuffer();
                    }
                    if (_this.isCluster) {
                        node.redis.stream.write(data);
                    }
                    else {
                        _this.redis.stream.write(data);
                    }
                    // Reset writePending for resending
                    writePending = _this._queue.length;
                    data = '';
                    bufferMode = false;
                }
            }
        };
        for (let i = 0; i < _this._queue.length; ++i) {
            _this.redis.sendCommand(_this._queue[i], stream, node);
        }
        return _this.promise;
    }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports = module.exports = __webpack_require__(6);
var redis_errors_1 = __webpack_require__(8);
exports.ReplyError = redis_errors_1.ReplyError;
exports.Cluster = __webpack_require__(57).default;
exports.Command = __webpack_require__(2).default;
exports.ScanStream = __webpack_require__(14).default;
exports.Pipeline = __webpack_require__(24).default;
const PromiseContainer = __webpack_require__(5);
Object.defineProperty(exports, 'Promise', {
    get() {
        return PromiseContainer.get();
    },
    set(lib) {
        PromiseContainer.set(lib);
    }
});
exports.print = function (err, reply) {
    if (err) {
        console.log('Error: ' + err);
    }
    else {
        console.log('Reply: ' + reply);
    }
};


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ioredis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var ioredis__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ioredis__WEBPACK_IMPORTED_MODULE_0__);


var redis = new ioredis__WEBPACK_IMPORTED_MODULE_0___default.a(); // todo: add convar support for custom server params

global.onNet("wtf_redis:call", async (ev, id, cmd, args) => {
  let source = global.source;
  const sendResponse = (res, err) => {
    setImmediate(() =>
      global.TriggerClientEvent(ev, source, id, err || false, res)
    );
  };
  try {
    const res = await redis[cmd](...args);
    sendResponse(res, null);
  } catch (err) {
    sendResponse(null, err);
  }
});


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Used by `_.defaults` to customize its `_.assignIn` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(args) {
  args.push(undefined, assignInDefaults);
  return apply(assignInWith, undefined, args);
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = defaults;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, 1) : [];
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = flatten;


/***/ }),
/* 29 */
/***/ (function(module) {

module.exports = {"append":{"arity":3,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"asking":{"arity":1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"auth":{"arity":2,"flags":["noscript","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"bgrewriteaof":{"arity":1,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"bgsave":{"arity":-1,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"bitcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"bitfield":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"bitop":{"arity":-4,"flags":["write","denyoom"],"keyStart":2,"keyStop":-1,"step":1},"bitpos":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"blpop":{"arity":-3,"flags":["write","noscript"],"keyStart":1,"keyStop":-2,"step":1},"brpop":{"arity":-3,"flags":["write","noscript"],"keyStart":1,"keyStop":-2,"step":1},"brpoplpush":{"arity":4,"flags":["write","denyoom","noscript"],"keyStart":1,"keyStop":2,"step":1},"bzpopmax":{"arity":-2,"flags":["write","noscript","fast"],"keyStart":1,"keyStop":-2,"step":1},"bzpopmin":{"arity":-2,"flags":["write","noscript","fast"],"keyStart":1,"keyStop":-2,"step":1},"client":{"arity":-2,"flags":["admin","noscript"],"keyStart":0,"keyStop":0,"step":0},"cluster":{"arity":-2,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"command":{"arity":1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"config":{"arity":-2,"flags":["admin","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"dbsize":{"arity":1,"flags":["readonly","fast"],"keyStart":0,"keyStop":0,"step":0},"debug":{"arity":-2,"flags":["admin","noscript"],"keyStart":0,"keyStop":0,"step":0},"decr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"decrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"del":{"arity":-2,"flags":["write"],"keyStart":1,"keyStop":-1,"step":1},"discard":{"arity":1,"flags":["noscript","fast"],"keyStart":0,"keyStop":0,"step":0},"dump":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"echo":{"arity":2,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"eval":{"arity":-3,"flags":["noscript","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"evalsha":{"arity":-3,"flags":["noscript","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"exec":{"arity":1,"flags":["noscript","skip_monitor"],"keyStart":0,"keyStop":0,"step":0},"exists":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"expire":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"expireat":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"flushall":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"flushdb":{"arity":-1,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"geoadd":{"arity":-5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"geodist":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geohash":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"geopos":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"georadius":{"arity":-6,"flags":["write","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadius_ro":{"arity":-6,"flags":["readonly","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember":{"arity":-5,"flags":["write","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"georadiusbymember_ro":{"arity":-5,"flags":["readonly","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"get":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getbit":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"getrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"getset":{"arity":3,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"hdel":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"hexists":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hget":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hgetall":{"arity":2,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"hincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hincrbyfloat":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hkeys":{"arity":2,"flags":["readonly","sort_for_script"],"keyStart":1,"keyStop":1,"step":1},"hlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmget":{"arity":-3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hmset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"host:":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"hscan":{"arity":-3,"flags":["readonly","random"],"keyStart":1,"keyStop":1,"step":1},"hset":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hsetnx":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"hstrlen":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"hvals":{"arity":2,"flags":["readonly","sort_for_script"],"keyStart":1,"keyStop":1,"step":1},"incr":{"arity":2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrby":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"incrbyfloat":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"info":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"keys":{"arity":2,"flags":["readonly","sort_for_script"],"keyStart":0,"keyStop":0,"step":0},"lastsave":{"arity":1,"flags":["random","fast"],"keyStart":0,"keyStop":0,"step":0},"latency":{"arity":-2,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"lindex":{"arity":3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"linsert":{"arity":5,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"llen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"lpop":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"lpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"lrange":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"lrem":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"lset":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"ltrim":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"memory":{"arity":-2,"flags":["readonly"],"keyStart":0,"keyStop":0,"step":0},"mget":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":-1,"step":1},"migrate":{"arity":-6,"flags":["write","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"module":{"arity":-2,"flags":["admin","noscript"],"keyStart":0,"keyStop":0,"step":0},"monitor":{"arity":1,"flags":["admin","noscript"],"keyStart":0,"keyStop":0,"step":0},"move":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"mset":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"msetnx":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":2},"multi":{"arity":1,"flags":["noscript","fast"],"keyStart":0,"keyStop":0,"step":0},"object":{"arity":-2,"flags":["readonly"],"keyStart":2,"keyStop":2,"step":1},"persist":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpire":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pexpireat":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"pfadd":{"arity":-2,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"pfcount":{"arity":-2,"flags":["readonly"],"keyStart":1,"keyStop":-1,"step":1},"pfdebug":{"arity":-3,"flags":["write"],"keyStart":0,"keyStop":0,"step":0},"pfmerge":{"arity":-2,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"pfselftest":{"arity":1,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"ping":{"arity":-1,"flags":["stale","fast"],"keyStart":0,"keyStop":0,"step":0},"post":{"arity":-1,"flags":["loading","stale"],"keyStart":0,"keyStop":0,"step":0},"psetex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"psubscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"psync":{"arity":3,"flags":["readonly","admin","noscript"],"keyStart":0,"keyStop":0,"step":0},"pttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"publish":{"arity":3,"flags":["pubsub","loading","stale","fast"],"keyStart":0,"keyStop":0,"step":0},"pubsub":{"arity":-2,"flags":["pubsub","random","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"punsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"quit":{"arity":1,"flags":["loading","stale","readonly"],"keyStart":0,"keyStop":0,"step":0},"randomkey":{"arity":1,"flags":["readonly","random"],"keyStart":0,"keyStop":0,"step":0},"readonly":{"arity":1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"readwrite":{"arity":1,"flags":["fast"],"keyStart":0,"keyStop":0,"step":0},"rename":{"arity":3,"flags":["write"],"keyStart":1,"keyStop":2,"step":1},"renamenx":{"arity":3,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"replconf":{"arity":-1,"flags":["admin","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"restore":{"arity":-4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"restore-asking":{"arity":-4,"flags":["write","denyoom","asking"],"keyStart":1,"keyStop":1,"step":1},"role":{"arity":1,"flags":["noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"rpop":{"arity":2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"rpoplpush":{"arity":3,"flags":["write","denyoom"],"keyStart":1,"keyStop":2,"step":1},"rpush":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"rpushx":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"sadd":{"arity":-3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"save":{"arity":1,"flags":["admin","noscript"],"keyStart":0,"keyStop":0,"step":0},"scan":{"arity":-2,"flags":["readonly","random"],"keyStart":0,"keyStop":0,"step":0},"scard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"script":{"arity":-2,"flags":["noscript"],"keyStart":0,"keyStop":0,"step":0},"sdiff":{"arity":-2,"flags":["readonly","sort_for_script"],"keyStart":1,"keyStop":-1,"step":1},"sdiffstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"select":{"arity":2,"flags":["loading","fast"],"keyStart":0,"keyStop":0,"step":0},"set":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setbit":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setex":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"setnx":{"arity":3,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"setrange":{"arity":4,"flags":["write","denyoom"],"keyStart":1,"keyStop":1,"step":1},"shutdown":{"arity":-1,"flags":["admin","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"sinter":{"arity":-2,"flags":["readonly","sort_for_script"],"keyStart":1,"keyStop":-1,"step":1},"sinterstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"sismember":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"slaveof":{"arity":3,"flags":["admin","noscript","stale"],"keyStart":0,"keyStop":0,"step":0},"slowlog":{"arity":-2,"flags":["admin"],"keyStart":0,"keyStop":0,"step":0},"smembers":{"arity":2,"flags":["readonly","sort_for_script"],"keyStart":1,"keyStop":1,"step":1},"smove":{"arity":4,"flags":["write","fast"],"keyStart":1,"keyStop":2,"step":1},"sort":{"arity":-2,"flags":["write","denyoom","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"spop":{"arity":-2,"flags":["write","random","fast"],"keyStart":1,"keyStop":1,"step":1},"srandmember":{"arity":-2,"flags":["readonly","random"],"keyStart":1,"keyStop":1,"step":1},"srem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"sscan":{"arity":-3,"flags":["readonly","random"],"keyStart":1,"keyStop":1,"step":1},"strlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"subscribe":{"arity":-2,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"substr":{"arity":4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"sunion":{"arity":-2,"flags":["readonly","sort_for_script"],"keyStart":1,"keyStop":-1,"step":1},"sunionstore":{"arity":-3,"flags":["write","denyoom"],"keyStart":1,"keyStop":-1,"step":1},"swapdb":{"arity":3,"flags":["write","fast"],"keyStart":0,"keyStop":0,"step":0},"sync":{"arity":1,"flags":["readonly","admin","noscript"],"keyStart":0,"keyStop":0,"step":0},"time":{"arity":1,"flags":["random","fast"],"keyStart":0,"keyStop":0,"step":0},"touch":{"arity":-2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"ttl":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"type":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"unlink":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":-1,"step":1},"unsubscribe":{"arity":-1,"flags":["pubsub","noscript","loading","stale"],"keyStart":0,"keyStop":0,"step":0},"unwatch":{"arity":1,"flags":["noscript","fast"],"keyStart":0,"keyStop":0,"step":0},"wait":{"arity":3,"flags":["noscript"],"keyStart":0,"keyStop":0,"step":0},"watch":{"arity":-2,"flags":["noscript","fast"],"keyStart":1,"keyStop":-1,"step":1},"xack":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xadd":{"arity":-5,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"xclaim":{"arity":-5,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xdel":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"xgroup":{"arity":-2,"flags":["write","denyoom"],"keyStart":2,"keyStop":2,"step":1},"xinfo":{"arity":-2,"flags":["readonly"],"keyStart":2,"keyStop":2,"step":1},"xlen":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"xpending":{"arity":-3,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xread":{"arity":-3,"flags":["readonly","noscript","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"xreadgroup":{"arity":-3,"flags":["write","noscript","movablekeys"],"keyStart":1,"keyStop":1,"step":1},"xrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"xtrim":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zadd":{"arity":-4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zcard":{"arity":2,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zincrby":{"arity":4,"flags":["write","denyoom","fast"],"keyStart":1,"keyStop":1,"step":1},"zinterstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":0,"keyStop":0,"step":0},"zlexcount":{"arity":4,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zpopmax":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":-1,"step":1},"zpopmin":{"arity":-2,"flags":["write","fast"],"keyStart":1,"keyStop":-1,"step":1},"zrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zrem":{"arity":-3,"flags":["write","fast"],"keyStart":1,"keyStop":1,"step":1},"zremrangebylex":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyrank":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zremrangebyscore":{"arity":4,"flags":["write"],"keyStart":1,"keyStop":1,"step":1},"zrevrange":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebylex":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrangebyscore":{"arity":-4,"flags":["readonly"],"keyStart":1,"keyStop":1,"step":1},"zrevrank":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zscan":{"arity":-3,"flags":["readonly","random"],"keyStart":1,"keyStop":1,"step":1},"zscore":{"arity":3,"flags":["readonly","fast"],"keyStart":1,"keyStop":1,"step":1},"zunionstore":{"arity":-4,"flags":["write","denyoom","movablekeys"],"keyStart":0,"keyStop":0,"step":0}};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//Try catch is not supported in optimizing
//compiler, so it is isolated
exports.errorObj = { e: {} };
let tryCatchTarget;
function tryCatcher(err, val) {
    try {
        const target = tryCatchTarget;
        tryCatchTarget = null;
        return target.apply(this, arguments);
    }
    catch (e) {
        exports.errorObj.e = e;
        return exports.errorObj;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __webpack_require__(33);
const promiseContainer_1 = __webpack_require__(5);
const command_1 = __webpack_require__(2);
const standard_as_callback_1 = __webpack_require__(4);
class Script {
    constructor(lua, numberOfKeys = null, keyPrefix = '') {
        this.lua = lua;
        this.numberOfKeys = numberOfKeys;
        this.keyPrefix = keyPrefix;
        this.sha = crypto_1.createHash('sha1').update(lua).digest('hex');
    }
    execute(container, args, options, callback) {
        if (typeof this.numberOfKeys === 'number') {
            args.unshift(this.numberOfKeys);
        }
        if (this.keyPrefix) {
            options.keyPrefix = this.keyPrefix;
        }
        const evalsha = new command_1.default('evalsha', [this.sha].concat(args), options);
        evalsha.isCustomCommand = true;
        const result = container.sendCommand(evalsha);
        if (promiseContainer_1.isPromise(result)) {
            return standard_as_callback_1.default(result.catch((err) => {
                if (err.toString().indexOf('NOSCRIPT') === -1) {
                    throw err;
                }
                return container.sendCommand(new command_1.default('eval', [this.lua].concat(args), options));
            }), callback);
        }
        // result is not a Promise--probably returned from a pipeline chain; however,
        // we still need the callback to fire when the script is evaluated
        standard_as_callback_1.default(evalsha.promise, callback);
        return result;
    }
}
exports.default = Script;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var debug = __webpack_require__(3)('ioredis:connection');
var Command = __webpack_require__(2).default;
var utils = __webpack_require__(0);
var _ = __webpack_require__(1);
var { MaxRetriesPerRequestError } = __webpack_require__(43);
exports.connectHandler = function (self) {
    return function () {
        self.setStatus('connect');
        self.resetCommandQueue();
        // AUTH command should be processed before any other commands
        var flushed = false;
        if (self.condition.auth) {
            self.auth(self.condition.auth, function (err) {
                if (err) {
                    if (err.message.indexOf('no password is set') === -1) {
                        flushed = true;
                        self.flushQueue(err);
                        self.silentEmit('error', err);
                        self.disconnect(true);
                    }
                    else {
                        console.warn('[WARN] Redis server does not require a password, but a password was supplied.');
                    }
                }
            });
        }
        if (self.condition.select) {
            self.select(self.condition.select);
        }
        if (!self.options.enableReadyCheck) {
            exports.readyHandler(self)();
        }
        self.initParser();
        if (self.options.enableReadyCheck) {
            self._readyCheck(function (err, info) {
                if (err) {
                    if (!flushed) {
                        self.flushQueue(new Error('Ready check failed: ' + err.message));
                        self.silentEmit('error', err);
                        self.disconnect(true);
                    }
                }
                else {
                    self.serverInfo = info;
                    if (self.connector.check(info)) {
                        exports.readyHandler(self)();
                    }
                    else {
                        self.disconnect(true);
                    }
                }
            });
        }
    };
};
exports.closeHandler = function (self) {
    return function () {
        self.setStatus('close');
        if (!self.prevCondition) {
            self.prevCondition = self.condition;
        }
        if (self.commandQueue.length) {
            self.prevCommandQueue = self.commandQueue;
        }
        if (self.manuallyClosing) {
            self.manuallyClosing = false;
            debug('skip reconnecting since the connection is manually closed.');
            return close();
        }
        if (typeof self.options.retryStrategy !== 'function') {
            debug('skip reconnecting because `retryStrategy` is not a function');
            return close();
        }
        var retryDelay = self.options.retryStrategy(++self.retryAttempts);
        if (typeof retryDelay !== 'number') {
            debug('skip reconnecting because `retryStrategy` doesn\'t return a number');
            return close();
        }
        debug('reconnect in %sms', retryDelay);
        self.setStatus('reconnecting', retryDelay);
        self.reconnectTimeout = setTimeout(function () {
            self.reconnectTimeout = null;
            self.connect().catch(_.noop);
        }, retryDelay);
        var { maxRetriesPerRequest } = self.options;
        if (typeof maxRetriesPerRequest === 'number') {
            if (maxRetriesPerRequest < 0) {
                debug('maxRetriesPerRequest is negative, ignoring...');
            }
            else {
                var remainder = self.retryAttempts % (maxRetriesPerRequest + 1);
                if (remainder === 0) {
                    debug('reach maxRetriesPerRequest limitation, flushing command queue...');
                    self.flushQueue(new MaxRetriesPerRequestError(maxRetriesPerRequest));
                }
            }
        }
    };
    function close() {
        self.setStatus('end');
        self.flushQueue(new Error(utils.CONNECTION_CLOSED_ERROR_MSG));
    }
};
exports.dataHandler = function (self) {
    return function (data) {
        self.replyParser.execute(data);
    };
};
exports.errorHandler = function (self) {
    return function (error) {
        debug('error: %s', error);
        self.silentEmit('error', error);
    };
};
exports.readyHandler = function (self) {
    return function () {
        self.setStatus('ready');
        self.retryAttempts = 0;
        if (self.options.monitor) {
            self.call('monitor');
            var sendCommand = self.sendCommand;
            self.sendCommand = function (command) {
                if (Command.checkFlag('VALID_IN_MONITOR_MODE', command.name)) {
                    return sendCommand.call(self, command);
                }
                command.reject(new Error('Connection is in monitoring mode, can\'t process commands.'));
                return command.promise;
            };
            self.once('close', function () {
                delete self.sendCommand;
            });
            self.setStatus('monitoring');
            return;
        }
        var item;
        var finalSelect = self.prevCondition ? self.prevCondition.select : self.condition.select;
        if (self.options.connectionName) {
            debug('set the connection name [%s]', self.options.connectionName);
            self.client('setname', self.options.connectionName).catch(_.noop);
        }
        if (self.options.readOnly) {
            debug('set the connection to readonly mode');
            self.readonly().catch(_.noop);
        }
        if (self.prevCondition) {
            var condition = self.prevCondition;
            self.prevCondition = null;
            if (condition.subscriber && self.options.autoResubscribe) {
                // We re-select the previous db first since
                // `SELECT` command is not valid in sub mode.
                if (self.condition.select !== finalSelect) {
                    debug('connect to db [%d]', finalSelect);
                    self.select(finalSelect);
                }
                var subscribeChannels = condition.subscriber.channels('subscribe');
                if (subscribeChannels.length) {
                    debug('subscribe %d channels', subscribeChannels.length);
                    self.subscribe(subscribeChannels);
                }
                var psubscribeChannels = condition.subscriber.channels('psubscribe');
                if (psubscribeChannels.length) {
                    debug('psubscribe %d channels', psubscribeChannels.length);
                    self.psubscribe(psubscribeChannels);
                }
            }
        }
        if (self.prevCommandQueue) {
            if (self.options.autoResendUnfulfilledCommands) {
                debug('resend %d unfulfilled commands', self.prevCommandQueue.length);
                while (self.prevCommandQueue.length > 0) {
                    item = self.prevCommandQueue.shift();
                    if (item.select !== self.condition.select && item.command.name !== 'select') {
                        self.select(item.select);
                    }
                    self.sendCommand(item.command, item.stream);
                }
            }
            else {
                self.prevCommandQueue = null;
            }
        }
        if (self.offlineQueue.length) {
            debug('send %d commands in offline queue', self.offlineQueue.length);
            var offlineQueue = self.offlineQueue;
            self.resetOfflineQueue();
            while (offlineQueue.length > 0) {
                item = offlineQueue.shift();
                if (item.select !== self.condition.select && item.command.name !== 'select') {
                    self.select(item.select);
                }
                self.sendCommand(item.command, item.stream);
            }
        }
        if (self.condition.select !== finalSelect) {
            debug('connect to db [%d]', finalSelect);
            self.select(finalSelect);
        }
    };
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__(36);
} else {
  module.exports = __webpack_require__(38);
}



/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(18)(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */
var tty = __webpack_require__(39);

var util = __webpack_require__(9);
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  var supportsColor = __webpack_require__(40);

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // Camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  var val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var name = this.namespace,
      useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
    var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__(18)(exports);
var formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};



/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(41);
const hasFlag = __webpack_require__(42);

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const MaxRetriesPerRequestError_1 = __webpack_require__(44);
exports.MaxRetriesPerRequestError = MaxRetriesPerRequestError_1.default;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const redis_errors_1 = __webpack_require__(8);
class MaxRetriesPerRequestError extends redis_errors_1.AbortError {
    constructor(maxRetriesPerRequest) {
        const message = `Reached the max retries per request limit (which is ${maxRetriesPerRequest}). Refer to "maxRetriesPerRequest" option for details.`;
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
    get name() {
        return this.constructor.name;
    }
}
exports.default = MaxRetriesPerRequestError;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const assert = __webpack_require__(19)
const util = __webpack_require__(9)

// RedisError

function RedisError (message) {
  Object.defineProperty(this, 'message', {
    value: message || '',
    configurable: true,
    writable: true
  })
  Error.captureStackTrace(this, this.constructor)
}

util.inherits(RedisError, Error)

Object.defineProperty(RedisError.prototype, 'name', {
  value: 'RedisError',
  configurable: true,
  writable: true
})

// ParserError

function ParserError (message, buffer, offset) {
  assert(buffer)
  assert.strictEqual(typeof offset, 'number')

  Object.defineProperty(this, 'message', {
    value: message || '',
    configurable: true,
    writable: true
  })

  const tmp = Error.stackTraceLimit
  Error.stackTraceLimit = 2
  Error.captureStackTrace(this, this.constructor)
  Error.stackTraceLimit = tmp
  this.offset = offset
  this.buffer = buffer
}

util.inherits(ParserError, RedisError)

Object.defineProperty(ParserError.prototype, 'name', {
  value: 'ParserError',
  configurable: true,
  writable: true
})

// ReplyError

function ReplyError (message) {
  Object.defineProperty(this, 'message', {
    value: message || '',
    configurable: true,
    writable: true
  })
  const tmp = Error.stackTraceLimit
  Error.stackTraceLimit = 2
  Error.captureStackTrace(this, this.constructor)
  Error.stackTraceLimit = tmp
}

util.inherits(ReplyError, RedisError)

Object.defineProperty(ReplyError.prototype, 'name', {
  value: 'ReplyError',
  configurable: true,
  writable: true
})

// AbortError

function AbortError (message) {
  Object.defineProperty(this, 'message', {
    value: message || '',
    configurable: true,
    writable: true
  })
  Error.captureStackTrace(this, this.constructor)
}

util.inherits(AbortError, RedisError)

Object.defineProperty(AbortError.prototype, 'name', {
  value: 'AbortError',
  configurable: true,
  writable: true
})

// InterruptError

function InterruptError (message) {
  Object.defineProperty(this, 'message', {
    value: message || '',
    configurable: true,
    writable: true
  })
  Error.captureStackTrace(this, this.constructor)
}

util.inherits(InterruptError, AbortError)

Object.defineProperty(InterruptError.prototype, 'name', {
  value: 'InterruptError',
  configurable: true,
  writable: true
})

module.exports = {
  RedisError,
  ParserError,
  ReplyError,
  AbortError,
  InterruptError
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const assert = __webpack_require__(19)

class RedisError extends Error {
  get name () {
    return this.constructor.name
  }
}

class ParserError extends RedisError {
  constructor (message, buffer, offset) {
    assert(buffer)
    assert.strictEqual(typeof offset, 'number')

    const tmp = Error.stackTraceLimit
    Error.stackTraceLimit = 2
    super(message)
    Error.stackTraceLimit = tmp
    this.offset = offset
    this.buffer = buffer
  }

  get name () {
    return this.constructor.name
  }
}

class ReplyError extends RedisError {
  constructor (message) {
    const tmp = Error.stackTraceLimit
    Error.stackTraceLimit = 2
    super(message)
    Error.stackTraceLimit = tmp
  }
  get name () {
    return this.constructor.name
  }
}

class AbortError extends RedisError {
  get name () {
    return this.constructor.name
  }
}

class InterruptError extends AbortError {
  get name () {
    return this.constructor.name
  }
}

module.exports = {
  RedisError,
  ParserError,
  ReplyError,
  AbortError,
  InterruptError
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StandaloneConnector_1 = __webpack_require__(20);
exports.StandaloneConnector = StandaloneConnector_1.default;
const SentinelConnector_1 = __webpack_require__(48);
exports.SentinelConnector = SentinelConnector_1.default;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __webpack_require__(13);
const utils_1 = __webpack_require__(0);
const tls_1 = __webpack_require__(21);
const StandaloneConnector_1 = __webpack_require__(20);
const SentinelIterator_1 = __webpack_require__(49);
const AbstractConnector_1 = __webpack_require__(22);
const debug = __webpack_require__(3)('ioredis:SentinelConnector');
let Redis;
class SentinelConnector extends AbstractConnector_1.default {
    constructor(options) {
        super();
        this.options = options;
        if (this.options.sentinels.length === 0) {
            throw new Error('Requires at least one sentinel to connect to.');
        }
        if (!this.options.name) {
            throw new Error('Requires the name of master.');
        }
        this.sentinelIterator = new SentinelIterator_1.default(this.options.sentinels);
    }
    check(info) {
        const roleMatches = !info.role || this.options.role === info.role;
        if (!roleMatches) {
            debug('role invalid, expected %s, but got %s', this.options.role, info.role);
            // Start from the next item.
            // Note that `reset` will move the cursor to the previous element,
            // so we advance two steps here.
            this.sentinelIterator.next();
            this.sentinelIterator.next();
            this.sentinelIterator.reset(true);
        }
        return roleMatches;
    }
    connect(callback, eventEmitter) {
        this.connecting = true;
        this.retryAttempts = 0;
        let lastError;
        const _this = this;
        connectToNext();
        function connectToNext() {
            if (!_this.sentinelIterator.hasNext()) {
                _this.sentinelIterator.reset(false);
                const retryDelay = typeof _this.options.sentinelRetryStrategy === 'function'
                    ? _this.options.sentinelRetryStrategy(++_this.retryAttempts)
                    : null;
                let errorMsg = typeof retryDelay !== 'number'
                    ? 'All sentinels are unreachable and retry is disabled.'
                    : `All sentinels are unreachable. Retrying from scratch after ${retryDelay}ms.`;
                if (lastError) {
                    errorMsg += ` Last error: ${lastError.message}`;
                }
                debug(errorMsg);
                const error = new Error(errorMsg);
                if (typeof retryDelay === 'number') {
                    setTimeout(connectToNext, retryDelay);
                    eventEmitter('error', error);
                }
                else {
                    callback(error);
                }
                return;
            }
            const endpoint = _this.sentinelIterator.next();
            _this.resolve(endpoint, function (err, resolved) {
                if (!_this.connecting) {
                    callback(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
                    return;
                }
                if (resolved) {
                    debug('resolved: %s:%s', resolved.host, resolved.port);
                    if (_this.options.enableTLSForSentinelMode && _this.options.tls) {
                        Object.assign(resolved, _this.options.tls);
                        _this.stream = tls_1.connect(resolved);
                    }
                    else {
                        _this.stream = net_1.createConnection(resolved);
                    }
                    _this.sentinelIterator.reset(true);
                    callback(null, _this.stream);
                }
                else {
                    const endpointAddress = endpoint.host + ':' + endpoint.port;
                    const errorMsg = err
                        ? 'failed to connect to sentinel ' + endpointAddress + ' because ' + err.message
                        : 'connected to sentinel ' + endpointAddress + ' successfully, but got an invalid reply: ' + resolved;
                    debug(errorMsg);
                    eventEmitter('sentinelError', new Error(errorMsg));
                    if (err) {
                        lastError = err;
                    }
                    connectToNext();
                }
            });
        }
    }
    updateSentinels(client, callback) {
        if (!this.options.updateSentinels) {
            return callback(null);
        }
        client.sentinel('sentinels', this.options.name, (err, result) => {
            if (err) {
                client.disconnect();
                return callback(err);
            }
            if (!Array.isArray(result)) {
                return callback(null);
            }
            result.map(utils_1.packObject).forEach(sentinel => {
                const flags = sentinel.flags ? sentinel.flags.split(',') : [];
                if (flags.indexOf('disconnected') === -1 && sentinel.ip && sentinel.port) {
                    const endpoint = this.sentinelNatResolve(addressResponseToAddress(sentinel));
                    if (this.sentinelIterator.add(endpoint)) {
                        debug('adding sentinel %s:%s', endpoint.host, endpoint.port);
                    }
                }
            });
            debug('Updated internal sentinels: %s', this.sentinelIterator);
            callback(null);
        });
    }
    resolveMaster(client, callback) {
        client.sentinel('get-master-addr-by-name', this.options.name, (err, result) => {
            if (err) {
                client.disconnect();
                return callback(err);
            }
            this.updateSentinels(client, (err) => {
                client.disconnect();
                if (err) {
                    return callback(err);
                }
                callback(null, this.sentinelNatResolve(Array.isArray(result) ? { host: result[0], port: Number(result[1]) } : null));
            });
        });
    }
    resolveSlave(client, callback) {
        client.sentinel('slaves', this.options.name, (err, result) => {
            client.disconnect();
            if (err) {
                return callback(err);
            }
            if (!Array.isArray(result)) {
                return callback(null, null);
            }
            const availableSlaves = result.map(utils_1.packObject).filter(slave => (slave.flags && !slave.flags.match(/(disconnected|s_down|o_down)/)));
            callback(null, this.sentinelNatResolve(selectPreferredSentinel(availableSlaves, this.options.preferredSlaves)));
        });
    }
    sentinelNatResolve(item) {
        if (!item || !this.options.natMap)
            return item;
        return this.options.natMap[`${item.host}:${item.port}`] || item;
    }
    resolve(endpoint, callback) {
        if (typeof Redis === 'undefined') {
            Redis = __webpack_require__(6);
        }
        var client = new Redis({
            port: endpoint.port || 26379,
            host: endpoint.host,
            password: this.options.sentinelPassword || null,
            family: endpoint.family || (StandaloneConnector_1.isIIpcConnectionOptions(this.options) ? undefined : this.options.family),
            tls: this.options.sentinelTLS,
            retryStrategy: null,
            enableReadyCheck: false,
            connectTimeout: this.options.connectTimeout,
            dropBufferSupport: true
        });
        // ignore the errors since resolve* methods will handle them
        client.on('error', noop);
        if (this.options.role === 'slave') {
            this.resolveSlave(client, callback);
        }
        else {
            this.resolveMaster(client, callback);
        }
    }
}
exports.default = SentinelConnector;
function selectPreferredSentinel(availableSlaves, preferredSlaves) {
    if (availableSlaves.length === 0) {
        return null;
    }
    let selectedSlave;
    if (typeof preferredSlaves === 'function') {
        selectedSlave = preferredSlaves(availableSlaves);
    }
    else if (preferredSlaves !== null && typeof preferredSlaves === 'object') {
        const preferredSlavesArray = Array.isArray(preferredSlaves)
            ? preferredSlaves
            : [preferredSlaves];
        // sort by priority
        preferredSlavesArray.sort((a, b) => {
            // default the priority to 1
            if (!a.prio) {
                a.prio = 1;
            }
            if (!b.prio) {
                b.prio = 1;
            }
            // lowest priority first
            if (a.prio < b.prio) {
                return -1;
            }
            if (a.prio > b.prio) {
                return 1;
            }
            return 0;
        });
        // loop over preferred slaves and return the first match
        for (let p = 0; p < preferredSlavesArray.length; p++) {
            for (let a = 0; a < availableSlaves.length; a++) {
                const slave = availableSlaves[a];
                if (slave.ip === preferredSlavesArray[p].ip) {
                    if (slave.port === preferredSlavesArray[p].port) {
                        selectedSlave = slave;
                        break;
                    }
                }
            }
            if (selectedSlave) {
                break;
            }
        }
    }
    // if none of the preferred slaves are available, a random available slave is returned
    if (!selectedSlave) {
        selectedSlave = utils_1.sample(availableSlaves);
    }
    return addressResponseToAddress(selectedSlave);
}
function addressResponseToAddress(input) {
    return { host: input.ip, port: Number(input.port) };
}
function noop() { }


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isSentinelEql(a, b) {
    return ((a.host || '127.0.0.1') === (b.host || '127.0.0.1')) &&
        ((a.port || 26379) === (b.port || 26379));
}
class SentinelIterator {
    constructor(sentinels) {
        this.sentinels = sentinels;
        this.cursor = 0;
    }
    hasNext() {
        return this.cursor < this.sentinels.length;
    }
    next() {
        return this.hasNext() ? this.sentinels[this.cursor++] : null;
    }
    reset(moveCurrentEndpointToFirst) {
        if (moveCurrentEndpointToFirst && this.sentinels.length > 1 && this.cursor !== 1) {
            const remains = this.sentinels.slice(this.cursor - 1);
            this.sentinels = remains.concat(this.sentinels.slice(0, this.cursor - 1));
        }
        this.cursor = 0;
    }
    add(sentinel) {
        for (let i = 0; i < this.sentinels.length; i++) {
            if (isSentinelEql(sentinel, this.sentinels[i])) {
                return false;
            }
        }
        this.sentinels.push(sentinel);
        return true;
    }
    toString() {
        return `${JSON.stringify(this.sentinels)} @${this.cursor}`;
    }
}
exports.default = SentinelIterator;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _ = __webpack_require__(1);
var Command = __webpack_require__(2).default;
var SubscriptionSet = __webpack_require__(52).default;
var debug = __webpack_require__(3)('ioredis:reply');
var Parser = __webpack_require__(53);
/**
 * Init the parser
 *
 * @method _initParser
 * @memberOf Redis#
 * @private
 */
exports.initParser = function () {
    var _this = this;
    this.replyParser = new Parser({
        stringNumbers: this.options.stringNumbers,
        returnBuffers: !this.options.dropBufferSupport,
        returnError: function (err) {
            _this.returnError(err);
        },
        returnReply: function (reply) {
            _this.returnReply(reply);
        },
        returnFatalError: function (err) {
            err.message += '. Please report this.';
            _this.flushQueue(err, { offlineQueue: false });
            _this.silentEmit('error', err);
            _this.disconnect(true);
        }
    });
};
exports.returnError = function (err) {
    var item = this.commandQueue.shift();
    err.command = {
        name: item.command.name,
        args: item.command.args
    };
    var needReconnect = false;
    if (this.options.reconnectOnError) {
        needReconnect = this.options.reconnectOnError(err);
    }
    switch (needReconnect) {
        case 1:
        case true:
            if (this.status !== 'reconnecting') {
                this.disconnect(true);
            }
            item.command.reject(err);
            break;
        case 2:
            if (this.status !== 'reconnecting') {
                this.disconnect(true);
            }
            if (this.condition.select !== item.select && item.command.name !== 'select') {
                this.select(item.select);
            }
            this.sendCommand(item.command);
            break;
        default:
            item.command.reject(err);
    }
};
var sharedBuffers = {};
['message', 'pmessage', 'subscribe', 'psubscribe', 'unsubscribe', 'punsubscribe'].forEach(function (str) {
    sharedBuffers[str] = Buffer.from(str);
});
exports.returnReply = function (reply) {
    if (this.status === 'monitoring') {
        // Valid commands in the monitoring mode are AUTH and MONITOR,
        // both of which always reply with 'OK'.
        var replyStr = reply.toString();
        // If not the reply to AUTH & MONITOR
        if (replyStr !== 'OK') {
            // Since commands sent in the monitoring mode will trigger an exception,
            // any replies we received in the monitoring mode should consider to be
            // realtime monitor data instead of result of commands.
            var len = replyStr.indexOf(' ');
            var timestamp = replyStr.slice(0, len);
            var argindex = replyStr.indexOf('"');
            var args = replyStr.slice(argindex + 1, -1).split('" "').map(function (elem) {
                return elem.replace(/\\"/g, '"');
            });
            var dbAndSource = replyStr.slice(len + 2, argindex - 2).split(' ');
            this.emit('monitor', timestamp, args, dbAndSource[1], dbAndSource[0]);
            return;
        }
    }
    var item, channel, count;
    if (this.condition.subscriber) {
        var replyType = Array.isArray(reply) ? reply[0].toString() : null;
        debug('receive reply "%s" in subscriber mode', replyType);
        switch (replyType) {
            case 'message':
                if (this.listeners('message').length > 0) {
                    this.emit('message', reply[1].toString(), reply[2].toString());
                }
                if (this.listeners('messageBuffer').length > 0) {
                    this.emit('messageBuffer', reply[1], reply[2]);
                }
                break;
            case 'pmessage':
                var pattern = reply[1].toString();
                if (this.listeners('pmessage').length > 0) {
                    this.emit('pmessage', pattern, reply[2].toString(), reply[3].toString());
                }
                if (this.listeners('pmessageBuffer').length > 0) {
                    this.emit('pmessageBuffer', pattern, reply[2], reply[3]);
                }
                break;
            case 'subscribe':
            case 'psubscribe':
                channel = reply[1].toString();
                this.condition.subscriber.add(replyType, channel);
                item = this.commandQueue.shift();
                if (!fillSubCommand(item.command, reply[2])) {
                    this.commandQueue.unshift(item);
                }
                break;
            case 'unsubscribe':
            case 'punsubscribe':
                channel = reply[1] ? reply[1].toString() : null;
                if (channel) {
                    this.condition.subscriber.del(replyType, channel);
                }
                count = reply[2];
                if (count === 0) {
                    this.condition.subscriber = false;
                }
                item = this.commandQueue.shift();
                if (!fillUnsubCommand(item.command, count)) {
                    this.commandQueue.unshift(item);
                }
                break;
            default:
                item = this.commandQueue.shift();
                item.command.resolve(reply);
        }
    }
    else {
        item = this.commandQueue.shift();
        if (!item) {
            return this.emit('error', new Error('Command queue state error. If you can reproduce this, please report it. Last reply: ' +
                reply.toString()));
        }
        if (Command.checkFlag('ENTER_SUBSCRIBER_MODE', item.command.name)) {
            this.condition.subscriber = new SubscriptionSet();
            this.condition.subscriber.add(item.command.name, reply[1].toString());
            if (!fillSubCommand(item.command, reply[2])) {
                this.commandQueue.unshift(item);
            }
        }
        else if (Command.checkFlag('EXIT_SUBSCRIBER_MODE', item.command.name)) {
            if (!fillUnsubCommand(item.command, reply[2])) {
                this.commandQueue.unshift(item);
            }
        }
        else {
            item.command.resolve(reply);
        }
    }
    function fillSubCommand(command, count) {
        if (typeof command.remainReplies === 'undefined') {
            command.remainReplies = command.args.length;
        }
        if (--command.remainReplies === 0) {
            command.resolve(count);
            return true;
        }
        return false;
    }
    function fillUnsubCommand(command, count) {
        if (typeof command.remainReplies === 'undefined') {
            command.remainReplies = command.args.length;
        }
        if (command.remainReplies === 0) {
            if (count === 0) {
                command.resolve(reply[2]);
                return true;
            }
            return false;
        }
        if (--command.remainReplies === 0) {
            command.resolve(reply[2]);
            return true;
        }
        return false;
    }
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tiny class to simplify dealing with subscription set
 *
 * @export
 * @class SubscriptionSet
 */
class SubscriptionSet {
    constructor() {
        this.set = {
            subscribe: {},
            psubscribe: {}
        };
    }
    add(set, channel) {
        this.set[mapSet(set)][channel] = true;
    }
    del(set, channel) {
        delete this.set[mapSet(set)][channel];
    }
    channels(set) {
        return Object.keys(this.set[mapSet(set)]);
    }
    isEmpty() {
        return this.channels('subscribe').length === 0 &&
            this.channels('psubscribe').length === 0;
    }
}
exports.default = SubscriptionSet;
function mapSet(set) {
    if (set === 'unsubscribe') {
        return 'subscribe';
    }
    if (set === 'punsubscribe') {
        return 'psubscribe';
    }
    return set;
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(54)


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Buffer = __webpack_require__(55).Buffer
const StringDecoder = __webpack_require__(56).StringDecoder
const decoder = new StringDecoder()
const errors = __webpack_require__(8)
const ReplyError = errors.ReplyError
const ParserError = errors.ParserError
var bufferPool = Buffer.allocUnsafe(32 * 1024)
var bufferOffset = 0
var interval = null
var counter = 0
var notDecreased = 0

/**
 * Used for integer numbers only
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|number}
 */
function parseSimpleNumbers (parser) {
  const length = parser.buffer.length - 1
  var offset = parser.offset
  var number = 0
  var sign = 1

  if (parser.buffer[offset] === 45) {
    sign = -1
    offset++
  }

  while (offset < length) {
    const c1 = parser.buffer[offset++]
    if (c1 === 13) { // \r\n
      parser.offset = offset + 1
      return sign * number
    }
    number = (number * 10) + (c1 - 48)
  }
}

/**
 * Used for integer numbers in case of the returnNumbers option
 *
 * Reading the string as parts of n SMI is more efficient than
 * using a string directly.
 *
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|string}
 */
function parseStringNumbers (parser) {
  const length = parser.buffer.length - 1
  var offset = parser.offset
  var number = 0
  var res = ''

  if (parser.buffer[offset] === 45) {
    res += '-'
    offset++
  }

  while (offset < length) {
    var c1 = parser.buffer[offset++]
    if (c1 === 13) { // \r\n
      parser.offset = offset + 1
      if (number !== 0) {
        res += number
      }
      return res
    } else if (number > 429496728) {
      res += (number * 10) + (c1 - 48)
      number = 0
    } else if (c1 === 48 && number === 0) {
      res += 0
    } else {
      number = (number * 10) + (c1 - 48)
    }
  }
}

/**
 * Parse a '+' redis simple string response but forward the offsets
 * onto convertBufferRange to generate a string.
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|string|Buffer}
 */
function parseSimpleString (parser) {
  const start = parser.offset
  const buffer = parser.buffer
  const length = buffer.length - 1
  var offset = start

  while (offset < length) {
    if (buffer[offset++] === 13) { // \r\n
      parser.offset = offset + 1
      if (parser.optionReturnBuffers === true) {
        return parser.buffer.slice(start, offset - 1)
      }
      return parser.buffer.toString('utf8', start, offset - 1)
    }
  }
}

/**
 * Returns the read length
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|number}
 */
function parseLength (parser) {
  const length = parser.buffer.length - 1
  var offset = parser.offset
  var number = 0

  while (offset < length) {
    const c1 = parser.buffer[offset++]
    if (c1 === 13) {
      parser.offset = offset + 1
      return number
    }
    number = (number * 10) + (c1 - 48)
  }
}

/**
 * Parse a ':' redis integer response
 *
 * If stringNumbers is activated the parser always returns numbers as string
 * This is important for big numbers (number > Math.pow(2, 53)) as js numbers
 * are 64bit floating point numbers with reduced precision
 *
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|number|string}
 */
function parseInteger (parser) {
  if (parser.optionStringNumbers === true) {
    return parseStringNumbers(parser)
  }
  return parseSimpleNumbers(parser)
}

/**
 * Parse a '$' redis bulk string response
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|null|string}
 */
function parseBulkString (parser) {
  const length = parseLength(parser)
  if (length === undefined) {
    return
  }
  if (length < 0) {
    return null
  }
  const offset = parser.offset + length
  if (offset + 2 > parser.buffer.length) {
    parser.bigStrSize = offset + 2
    parser.totalChunkSize = parser.buffer.length
    parser.bufferCache.push(parser.buffer)
    return
  }
  const start = parser.offset
  parser.offset = offset + 2
  if (parser.optionReturnBuffers === true) {
    return parser.buffer.slice(start, offset)
  }
  return parser.buffer.toString('utf8', start, offset)
}

/**
 * Parse a '-' redis error response
 * @param {JavascriptRedisParser} parser
 * @returns {ReplyError}
 */
function parseError (parser) {
  var string = parseSimpleString(parser)
  if (string !== undefined) {
    if (parser.optionReturnBuffers === true) {
      string = string.toString()
    }
    return new ReplyError(string)
  }
}

/**
 * Parsing error handler, resets parser buffer
 * @param {JavascriptRedisParser} parser
 * @param {number} type
 * @returns {undefined}
 */
function handleError (parser, type) {
  const err = new ParserError(
    'Protocol error, got ' + JSON.stringify(String.fromCharCode(type)) + ' as reply type byte',
    JSON.stringify(parser.buffer),
    parser.offset
  )
  parser.buffer = null
  parser.returnFatalError(err)
}

/**
 * Parse a '*' redis array response
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|null|any[]}
 */
function parseArray (parser) {
  const length = parseLength(parser)
  if (length === undefined) {
    return
  }
  if (length < 0) {
    return null
  }
  const responses = new Array(length)
  return parseArrayElements(parser, responses, 0)
}

/**
 * Push a partly parsed array to the stack
 *
 * @param {JavascriptRedisParser} parser
 * @param {any[]} array
 * @param {number} pos
 * @returns {undefined}
 */
function pushArrayCache (parser, array, pos) {
  parser.arrayCache.push(array)
  parser.arrayPos.push(pos)
}

/**
 * Parse chunked redis array response
 * @param {JavascriptRedisParser} parser
 * @returns {undefined|any[]}
 */
function parseArrayChunks (parser) {
  const tmp = parser.arrayCache.pop()
  var pos = parser.arrayPos.pop()
  if (parser.arrayCache.length) {
    const res = parseArrayChunks(parser)
    if (res === undefined) {
      pushArrayCache(parser, tmp, pos)
      return
    }
    tmp[pos++] = res
  }
  return parseArrayElements(parser, tmp, pos)
}

/**
 * Parse redis array response elements
 * @param {JavascriptRedisParser} parser
 * @param {Array} responses
 * @param {number} i
 * @returns {undefined|null|any[]}
 */
function parseArrayElements (parser, responses, i) {
  const bufferLength = parser.buffer.length
  while (i < responses.length) {
    const offset = parser.offset
    if (parser.offset >= bufferLength) {
      pushArrayCache(parser, responses, i)
      return
    }
    const response = parseType(parser, parser.buffer[parser.offset++])
    if (response === undefined) {
      if (!(parser.arrayCache.length || parser.bufferCache.length)) {
        parser.offset = offset
      }
      pushArrayCache(parser, responses, i)
      return
    }
    responses[i] = response
    i++
  }

  return responses
}

/**
 * Called the appropriate parser for the specified type.
 *
 * 36: $
 * 43: +
 * 42: *
 * 58: :
 * 45: -
 *
 * @param {JavascriptRedisParser} parser
 * @param {number} type
 * @returns {*}
 */
function parseType (parser, type) {
  switch (type) {
    case 36:
      return parseBulkString(parser)
    case 43:
      return parseSimpleString(parser)
    case 42:
      return parseArray(parser)
    case 58:
      return parseInteger(parser)
    case 45:
      return parseError(parser)
    default:
      return handleError(parser, type)
  }
}

/**
 * Decrease the bufferPool size over time
 *
 * Balance between increasing and decreasing the bufferPool.
 * Decrease the bufferPool by 10% by removing the first 10% of the current pool.
 * @returns {undefined}
 */
function decreaseBufferPool () {
  if (bufferPool.length > 50 * 1024) {
    if (counter === 1 || notDecreased > counter * 2) {
      const minSliceLen = Math.floor(bufferPool.length / 10)
      const sliceLength = minSliceLen < bufferOffset
        ? bufferOffset
        : minSliceLen
      bufferOffset = 0
      bufferPool = bufferPool.slice(sliceLength, bufferPool.length)
    } else {
      notDecreased++
      counter--
    }
  } else {
    clearInterval(interval)
    counter = 0
    notDecreased = 0
    interval = null
  }
}

/**
 * Check if the requested size fits in the current bufferPool.
 * If it does not, reset and increase the bufferPool accordingly.
 *
 * @param {number} length
 * @returns {undefined}
 */
function resizeBuffer (length) {
  if (bufferPool.length < length + bufferOffset) {
    const multiplier = length > 1024 * 1024 * 75 ? 2 : 3
    if (bufferOffset > 1024 * 1024 * 111) {
      bufferOffset = 1024 * 1024 * 50
    }
    bufferPool = Buffer.allocUnsafe(length * multiplier + bufferOffset)
    bufferOffset = 0
    counter++
    if (interval === null) {
      interval = setInterval(decreaseBufferPool, 50)
    }
  }
}

/**
 * Concat a bulk string containing multiple chunks
 *
 * Notes:
 * 1) The first chunk might contain the whole bulk string including the \r
 * 2) We are only safe to fully add up elements that are neither the first nor any of the last two elements
 *
 * @param {JavascriptRedisParser} parser
 * @returns {String}
 */
function concatBulkString (parser) {
  const list = parser.bufferCache
  const oldOffset = parser.offset
  var chunks = list.length
  var offset = parser.bigStrSize - parser.totalChunkSize
  parser.offset = offset
  if (offset <= 2) {
    if (chunks === 2) {
      return list[0].toString('utf8', oldOffset, list[0].length + offset - 2)
    }
    chunks--
    offset = list[list.length - 2].length + offset
  }
  var res = decoder.write(list[0].slice(oldOffset))
  for (var i = 1; i < chunks - 1; i++) {
    res += decoder.write(list[i])
  }
  res += decoder.end(list[i].slice(0, offset - 2))
  return res
}

/**
 * Concat the collected chunks from parser.bufferCache.
 *
 * Increases the bufferPool size beforehand if necessary.
 *
 * @param {JavascriptRedisParser} parser
 * @returns {Buffer}
 */
function concatBulkBuffer (parser) {
  const list = parser.bufferCache
  const oldOffset = parser.offset
  const length = parser.bigStrSize - oldOffset - 2
  var chunks = list.length
  var offset = parser.bigStrSize - parser.totalChunkSize
  parser.offset = offset
  if (offset <= 2) {
    if (chunks === 2) {
      return list[0].slice(oldOffset, list[0].length + offset - 2)
    }
    chunks--
    offset = list[list.length - 2].length + offset
  }
  resizeBuffer(length)
  const start = bufferOffset
  list[0].copy(bufferPool, start, oldOffset, list[0].length)
  bufferOffset += list[0].length - oldOffset
  for (var i = 1; i < chunks - 1; i++) {
    list[i].copy(bufferPool, bufferOffset)
    bufferOffset += list[i].length
  }
  list[i].copy(bufferPool, bufferOffset, 0, offset - 2)
  bufferOffset += offset - 2
  return bufferPool.slice(start, bufferOffset)
}

class JavascriptRedisParser {
  /**
   * Javascript Redis Parser constructor
   * @param {{returnError: Function, returnReply: Function, returnFatalError?: Function, returnBuffers: boolean, stringNumbers: boolean }} options
   * @constructor
   */
  constructor (options) {
    if (!options) {
      throw new TypeError('Options are mandatory.')
    }
    if (typeof options.returnError !== 'function' || typeof options.returnReply !== 'function') {
      throw new TypeError('The returnReply and returnError options have to be functions.')
    }
    this.setReturnBuffers(!!options.returnBuffers)
    this.setStringNumbers(!!options.stringNumbers)
    this.returnError = options.returnError
    this.returnFatalError = options.returnFatalError || options.returnError
    this.returnReply = options.returnReply
    this.reset()
  }

  /**
   * Reset the parser values to the initial state
   *
   * @returns {undefined}
   */
  reset () {
    this.offset = 0
    this.buffer = null
    this.bigStrSize = 0
    this.totalChunkSize = 0
    this.bufferCache = []
    this.arrayCache = []
    this.arrayPos = []
  }

  /**
   * Set the returnBuffers option
   *
   * @param {boolean} returnBuffers
   * @returns {undefined}
   */
  setReturnBuffers (returnBuffers) {
    if (typeof returnBuffers !== 'boolean') {
      throw new TypeError('The returnBuffers argument has to be a boolean')
    }
    this.optionReturnBuffers = returnBuffers
  }

  /**
   * Set the stringNumbers option
   *
   * @param {boolean} stringNumbers
   * @returns {undefined}
   */
  setStringNumbers (stringNumbers) {
    if (typeof stringNumbers !== 'boolean') {
      throw new TypeError('The stringNumbers argument has to be a boolean')
    }
    this.optionStringNumbers = stringNumbers
  }

  /**
   * Parse the redis buffer
   * @param {Buffer} buffer
   * @returns {undefined}
   */
  execute (buffer) {
    if (this.buffer === null) {
      this.buffer = buffer
      this.offset = 0
    } else if (this.bigStrSize === 0) {
      const oldLength = this.buffer.length
      const remainingLength = oldLength - this.offset
      const newBuffer = Buffer.allocUnsafe(remainingLength + buffer.length)
      this.buffer.copy(newBuffer, 0, this.offset, oldLength)
      buffer.copy(newBuffer, remainingLength, 0, buffer.length)
      this.buffer = newBuffer
      this.offset = 0
      if (this.arrayCache.length) {
        const arr = parseArrayChunks(this)
        if (arr === undefined) {
          return
        }
        this.returnReply(arr)
      }
    } else if (this.totalChunkSize + buffer.length >= this.bigStrSize) {
      this.bufferCache.push(buffer)
      var tmp = this.optionReturnBuffers ? concatBulkBuffer(this) : concatBulkString(this)
      this.bigStrSize = 0
      this.bufferCache = []
      this.buffer = buffer
      if (this.arrayCache.length) {
        this.arrayCache[0][this.arrayPos[0]++] = tmp
        tmp = parseArrayChunks(this)
        if (tmp === undefined) {
          return
        }
      }
      this.returnReply(tmp)
    } else {
      this.bufferCache.push(buffer)
      this.totalChunkSize += buffer.length
      return
    }

    while (this.offset < this.buffer.length) {
      const offset = this.offset
      const type = this.buffer[this.offset++]
      const response = parseType(this, type)
      if (response === undefined) {
        if (!(this.arrayCache.length || this.bufferCache.length)) {
          this.offset = offset
        }
        return
      }

      if (type === 45) {
        this.returnError(response)
      } else {
        this.returnReply(response)
      }
    }

    this.buffer = null
  }
}

module.exports = JavascriptRedisParser


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(10);
const ClusterAllFailedError_1 = __webpack_require__(58);
const lodash_1 = __webpack_require__(1);
const ConnectionPool_1 = __webpack_require__(59);
const util_1 = __webpack_require__(15);
const ClusterSubscriber_1 = __webpack_require__(60);
const DelayQueue_1 = __webpack_require__(61);
const ScanStream_1 = __webpack_require__(14);
const redis_errors_1 = __webpack_require__(8);
const standard_as_callback_1 = __webpack_require__(4);
const PromiseContainer = __webpack_require__(5);
const ClusterOptions_1 = __webpack_require__(62);
const utils_1 = __webpack_require__(0);
const commands = __webpack_require__(7);
const command_1 = __webpack_require__(2);
const Deque = __webpack_require__(11);
const Redis = __webpack_require__(6);
const debug = __webpack_require__(3)('ioredis:cluster');
const Commander = __webpack_require__(12);
/**
 * Client for the official Redis Cluster
 *
 * @class Cluster
 * @extends {EventEmitter}
 */
class Cluster extends events_1.EventEmitter {
    /**
     * Creates an instance of Cluster.
     *
     * @param {(Array<string | number | object>)} startupNodes
     * @param {IClusterOptions} [options={}]
     * @memberof Cluster
     */
    constructor(startupNodes, options = {}) {
        super();
        this.slots = [];
        this.retryAttempts = 0;
        this.delayQueue = new DelayQueue_1.default();
        this.offlineQueue = new Deque();
        this.isRefreshing = false;
        /**
         * Every time Cluster#connect() is called, this value will be
         * auto-incrementing. The purpose of this value is used for
         * discarding previous connect attampts when creating a new
         * connection.
         *
         * @private
         * @type {number}
         * @memberof Cluster
         */
        this.connectionEpoch = 0;
        Commander.call(this);
        this.startupNodes = startupNodes;
        this.options = lodash_1.defaults(this.options, options, ClusterOptions_1.DEFAULT_CLUSTER_OPTIONS);
        // validate options
        if (typeof this.options.scaleReads !== 'function' &&
            ['all', 'master', 'slave'].indexOf(this.options.scaleReads) === -1) {
            throw new Error('Invalid option scaleReads "' + this.options.scaleReads +
                '". Expected "all", "master", "slave" or a custom function');
        }
        this.connectionPool = new ConnectionPool_1.default(this.options.redisOptions);
        this.connectionPool.on('-node', (redis, key) => {
            this.emit('-node', redis);
        });
        this.connectionPool.on('+node', (redis) => {
            this.emit('+node', redis);
        });
        this.connectionPool.on('drain', () => {
            this.setStatus('close');
        });
        this.connectionPool.on('nodeError', (error, key) => {
            this.emit('node error', error, key);
        });
        this.subscriber = new ClusterSubscriber_1.default(this.connectionPool, this);
        if (this.options.lazyConnect) {
            this.setStatus('wait');
        }
        else {
            this.connect().catch((err) => {
                debug('connecting failed: %s', err);
            });
        }
    }
    resetOfflineQueue() {
        this.offlineQueue = new Deque();
    }
    resetNodesRefreshInterval() {
        if (this.slotsTimer) {
            return;
        }
        this.slotsTimer = setInterval(function () {
            this.refreshSlotsCache();
        }.bind(this), this.options.slotsRefreshInterval);
    }
    /**
     * Connect to a cluster
     *
     * @returns {Promise<void>}
     * @memberof Cluster
     */
    connect() {
        const Promise = PromiseContainer.get();
        return new Promise((resolve, reject) => {
            if (this.status === 'connecting' || this.status === 'connect' || this.status === 'ready') {
                reject(new Error('Redis is already connecting/connected'));
                return;
            }
            const epoch = ++this.connectionEpoch;
            this.setStatus('connecting');
            this.resolveStartupNodeHostnames().then((nodes) => {
                if (this.connectionEpoch !== epoch) {
                    debug('discard connecting after resolving startup nodes because epoch not match: %d != %d', epoch, this.connectionEpoch);
                    reject(new redis_errors_1.RedisError('Connection is discarded because a new connection is made'));
                    return;
                }
                if (this.status !== 'connecting') {
                    debug('discard connecting after resolving startup nodes because the status changed to %s', this.status);
                    reject(new redis_errors_1.RedisError('Connection is aborted'));
                    return;
                }
                this.connectionPool.reset(nodes);
                function readyHandler() {
                    this.setStatus('ready');
                    this.retryAttempts = 0;
                    this.executeOfflineCommands();
                    this.resetNodesRefreshInterval();
                    resolve();
                }
                let closeListener;
                const refreshListener = () => {
                    this.removeListener('close', closeListener);
                    this.manuallyClosing = false;
                    this.setStatus('connect');
                    if (this.options.enableReadyCheck) {
                        this.readyCheck((err, fail) => {
                            if (err || fail) {
                                debug('Ready check failed (%s). Reconnecting...', err || fail);
                                if (this.status === 'connect') {
                                    this.disconnect(true);
                                }
                            }
                            else {
                                readyHandler.call(this);
                            }
                        });
                    }
                    else {
                        readyHandler.call(this);
                    }
                };
                closeListener = function () {
                    this.removeListener('refresh', refreshListener);
                    reject(new Error('None of startup nodes is available'));
                };
                this.once('refresh', refreshListener);
                this.once('close', closeListener);
                this.once('close', this.handleCloseEvent.bind(this));
                this.refreshSlotsCache(function (err) {
                    if (err && err.message === 'Failed to refresh slots cache.') {
                        Redis.prototype.silentEmit.call(this, 'error', err);
                        this.connectionPool.reset([]);
                    }
                }.bind(this));
                this.subscriber.start();
            }).catch((err) => {
                this.setStatus('close');
                this.handleCloseEvent(err);
                reject(err);
            });
        });
    }
    /**
     * Called when closed to check whether a reconnection should be made
     *
     * @private
     * @memberof Cluster
     */
    handleCloseEvent(reason) {
        if (reason) {
            debug('closed because %s', reason);
        }
        let retryDelay;
        if (!this.manuallyClosing && typeof this.options.clusterRetryStrategy === 'function') {
            retryDelay = this.options.clusterRetryStrategy.call(this, ++this.retryAttempts, reason);
        }
        if (typeof retryDelay === 'number') {
            this.setStatus('reconnecting');
            this.reconnectTimeout = setTimeout(function () {
                this.reconnectTimeout = null;
                debug('Cluster is disconnected. Retrying after %dms', retryDelay);
                this.connect().catch(function (err) {
                    debug('Got error %s when reconnecting. Ignoring...', err);
                });
            }.bind(this), retryDelay);
        }
        else {
            this.setStatus('end');
            this.flushQueue(new Error('None of startup nodes is available'));
        }
    }
    /**
     * Disconnect from every node in the cluster.
     *
     * @param {boolean} [reconnect=false]
     * @memberof Cluster
     */
    disconnect(reconnect = false) {
        const status = this.status;
        this.setStatus('disconnecting');
        if (!reconnect) {
            this.manuallyClosing = true;
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
            debug('Canceled reconnecting attempts');
        }
        if (this.slotsTimer) {
            clearInterval(this.slotsTimer);
            this.slotsTimer = null;
        }
        this.subscriber.stop();
        if (status === 'wait') {
            this.setStatus('close');
            this.handleCloseEvent();
        }
        else {
            this.connectionPool.reset([]);
        }
    }
    /**
     * Quit the cluster gracefully.
     *
     * @param {CallbackFunction<'OK'>} [callback]
     * @returns {Promise<'OK'>}
     * @memberof Cluster
     */
    quit(callback) {
        const status = this.status;
        this.setStatus('disconnecting');
        this.manuallyClosing = true;
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        if (this.slotsTimer) {
            clearInterval(this.slotsTimer);
            this.slotsTimer = null;
        }
        this.subscriber.stop();
        const Promise = PromiseContainer.get();
        if (status === 'wait') {
            const ret = standard_as_callback_1.default(Promise.resolve('OK'), callback);
            // use setImmediate to make sure "close" event
            // being emitted after quit() is returned
            setImmediate(function () {
                this.setStatus('close');
                this.handleCloseEvent();
            }.bind(this));
            return ret;
        }
        return standard_as_callback_1.default(Promise.all(this.nodes().map((node) => (node.quit().catch((err) => {
            // Ignore the error caused by disconnecting since
            // we're disconnecting...
            if (err.message === utils_1.CONNECTION_CLOSED_ERROR_MSG) {
                return 'OK';
            }
            throw err;
        })))).then(() => 'OK'), callback);
    }
    /**
     * Get nodes with the specified role
     *
     * @param {NodeRole} [role='all']
     * @returns {any[]}
     * @memberof Cluster
     */
    nodes(role = 'all') {
        if (role !== 'all' && role !== 'master' && role !== 'slave') {
            throw new Error('Invalid role "' + role + '". Expected "all", "master" or "slave"');
        }
        return this.connectionPool.getNodes(role);
    }
    /**
     * Change cluster instance's status
     *
     * @private
     * @param {ClusterStatus} status
     * @memberof Cluster
     */
    setStatus(status) {
        debug('status: %s -> %s', this.status || '[empty]', status);
        this.status = status;
        process.nextTick(() => {
            this.emit(status);
        });
    }
    /**
     * Refresh the slot cache
     *
     * @private
     * @param {CallbackFunction} [callback]
     * @memberof Cluster
     */
    refreshSlotsCache(callback) {
        if (this.isRefreshing) {
            if (typeof callback === 'function') {
                process.nextTick(callback);
            }
            return;
        }
        this.isRefreshing = true;
        const _this = this;
        const wrapper = function (error) {
            _this.isRefreshing = false;
            if (typeof callback === 'function') {
                callback(error);
            }
        };
        const nodes = utils_1.shuffle(this.connectionPool.getNodes());
        let lastNodeError = null;
        function tryNode(index) {
            if (index === nodes.length) {
                const error = new ClusterAllFailedError_1.default('Failed to refresh slots cache.', lastNodeError);
                return wrapper(error);
            }
            const node = nodes[index];
            const key = `${node.options.host}:${node.options.port}`;
            debug('getting slot cache from %s', key);
            _this.getInfoFromNode(node, function (err) {
                switch (_this.status) {
                    case 'close':
                    case 'end':
                        return wrapper(new Error('Cluster is disconnected.'));
                    case 'disconnecting':
                        return wrapper(new Error('Cluster is disconnecting.'));
                }
                if (err) {
                    _this.emit('node error', err, key);
                    lastNodeError = err;
                    tryNode(index + 1);
                }
                else {
                    _this.emit('refresh');
                    wrapper();
                }
            });
        }
        tryNode(0);
    }
    /**
     * Flush offline queue with error.
     *
     * @param {Error} error
     * @memberof Cluster
     */
    flushQueue(error) {
        let item;
        while (this.offlineQueue.length > 0) {
            item = this.offlineQueue.shift();
            item.command.reject(error);
        }
    }
    executeOfflineCommands() {
        if (this.offlineQueue.length) {
            debug('send %d commands in offline queue', this.offlineQueue.length);
            const offlineQueue = this.offlineQueue;
            this.resetOfflineQueue();
            while (offlineQueue.length > 0) {
                const item = offlineQueue.shift();
                this.sendCommand(item.command, item.stream, item.node);
            }
        }
    }
    natMapper(nodeKey) {
        if (this.options.natMap && typeof this.options.natMap === 'object') {
            const key = typeof nodeKey === 'string' ? nodeKey : `${nodeKey.host}:${nodeKey.port}`;
            const mapped = this.options.natMap[key];
            if (mapped) {
                debug('NAT mapping %s -> %O', key, mapped);
                return mapped;
            }
        }
        return typeof nodeKey === 'string' ? util_1.nodeKeyToRedisOptions(nodeKey) : nodeKey;
    }
    sendCommand(command, stream, node) {
        if (this.status === 'wait') {
            this.connect().catch(lodash_1.noop);
        }
        if (this.status === 'end') {
            command.reject(new Error(utils_1.CONNECTION_CLOSED_ERROR_MSG));
            return command.promise;
        }
        let to = this.options.scaleReads;
        if (to !== 'master') {
            const isCommandReadOnly = commands.exists(command.name) && commands.hasFlag(command.name, 'readonly');
            if (!isCommandReadOnly) {
                to = 'master';
            }
        }
        let targetSlot = node ? node.slot : command.getSlot();
        const ttl = {};
        const _this = this;
        if (!node && !command.__is_reject_overwritten) {
            command.__is_reject_overwritten = true;
            const reject = command.reject;
            command.reject = function (err) {
                const partialTry = tryConnection.bind(null, true);
                _this.handleError(err, ttl, {
                    moved: function (slot, key) {
                        debug('command %s is moved to %s', command.name, key);
                        targetSlot = Number(slot);
                        if (_this.slots[slot]) {
                            _this.slots[slot][0] = key;
                        }
                        else {
                            _this.slots[slot] = [key];
                        }
                        _this.connectionPool.findOrCreate(_this.natMapper(key));
                        tryConnection();
                        _this.refreshSlotsCache();
                    },
                    ask: function (slot, key) {
                        debug('command %s is required to ask %s:%s', command.name, key);
                        const mapped = _this.natMapper(key);
                        _this.connectionPool.findOrCreate(mapped);
                        tryConnection(false, `${mapped.host}:${mapped.port}`);
                    },
                    tryagain: partialTry,
                    clusterDown: partialTry,
                    connectionClosed: partialTry,
                    maxRedirections: function (redirectionError) {
                        reject.call(command, redirectionError);
                    },
                    defaults: function () {
                        reject.call(command, err);
                    }
                });
            };
        }
        tryConnection();
        function tryConnection(random, asking) {
            if (_this.status === 'end') {
                command.reject(new redis_errors_1.AbortError('Cluster is ended.'));
                return;
            }
            let redis;
            if (_this.status === 'ready' || (command.name === 'cluster')) {
                if (node && node.redis) {
                    redis = node.redis;
                }
                else if (command_1.default.checkFlag('ENTER_SUBSCRIBER_MODE', command.name) ||
                    command_1.default.checkFlag('EXIT_SUBSCRIBER_MODE', command.name)) {
                    redis = _this.subscriber.getInstance();
                    if (!redis) {
                        command.reject(new redis_errors_1.AbortError('No subscriber for the cluster'));
                        return;
                    }
                }
                else {
                    if (!random) {
                        if (typeof targetSlot === 'number' && _this.slots[targetSlot]) {
                            const nodeKeys = _this.slots[targetSlot];
                            if (typeof to === 'function') {
                                const nodes = nodeKeys
                                    .map(function (key) {
                                    return _this.connectionPool.getInstanceByKey(key);
                                });
                                redis = to(nodes, command);
                                if (Array.isArray(redis)) {
                                    redis = utils_1.sample(redis);
                                }
                                if (!redis) {
                                    redis = nodes[0];
                                }
                            }
                            else {
                                let key;
                                if (to === 'all') {
                                    key = utils_1.sample(nodeKeys);
                                }
                                else if (to === 'slave' && nodeKeys.length > 1) {
                                    key = utils_1.sample(nodeKeys, 1);
                                }
                                else {
                                    key = nodeKeys[0];
                                }
                                redis = _this.connectionPool.getInstanceByKey(key);
                            }
                        }
                        if (asking) {
                            redis = _this.connectionPool.getInstanceByKey(asking);
                            redis.asking();
                        }
                    }
                    if (!redis) {
                        redis =
                            (typeof to === 'function' ? null : _this.connectionPool.getSampleInstance(to)) ||
                                _this.connectionPool.getSampleInstance('all');
                    }
                }
                if (node && !node.redis) {
                    node.redis = redis;
                }
            }
            if (redis) {
                redis.sendCommand(command, stream);
            }
            else if (_this.options.enableOfflineQueue) {
                _this.offlineQueue.push({
                    command: command,
                    stream: stream,
                    node: node
                });
            }
            else {
                command.reject(new Error('Cluster isn\'t ready and enableOfflineQueue options is false'));
            }
        }
        return command.promise;
    }
    handleError(error, ttl, handlers) {
        if (typeof ttl.value === 'undefined') {
            ttl.value = this.options.maxRedirections;
        }
        else {
            ttl.value -= 1;
        }
        if (ttl.value <= 0) {
            handlers.maxRedirections(new Error('Too many Cluster redirections. Last error: ' + error));
            return;
        }
        const errv = error.message.split(' ');
        if (errv[0] === 'MOVED' || errv[0] === 'ASK') {
            handlers[errv[0] === 'MOVED' ? 'moved' : 'ask'](errv[1], errv[2]);
        }
        else if (errv[0] === 'TRYAGAIN') {
            this.delayQueue.push('tryagain', handlers.tryagain, {
                timeout: this.options.retryDelayOnTryAgain
            });
        }
        else if (errv[0] === 'CLUSTERDOWN' && this.options.retryDelayOnClusterDown > 0) {
            this.delayQueue.push('clusterdown', handlers.connectionClosed, {
                timeout: this.options.retryDelayOnClusterDown,
                callback: this.refreshSlotsCache.bind(this)
            });
        }
        else if (error.message === utils_1.CONNECTION_CLOSED_ERROR_MSG &&
            this.options.retryDelayOnFailover > 0 &&
            this.status === 'ready') {
            this.delayQueue.push('failover', handlers.connectionClosed, {
                timeout: this.options.retryDelayOnFailover,
                callback: this.refreshSlotsCache.bind(this)
            });
        }
        else {
            handlers.defaults();
        }
    }
    getInfoFromNode(redis, callback) {
        if (!redis) {
            return callback(new Error('Node is disconnected'));
        }
        redis.cluster('slots', utils_1.timeout((err, result) => {
            if (err) {
                redis.disconnect();
                return callback(err);
            }
            if (this.status === 'disconnecting' || this.status === 'close' || this.status === 'end') {
                debug('ignore CLUSTER.SLOTS results (count: %d) since cluster status is %s', result.length, this.status);
                callback();
                return;
            }
            const nodes = [];
            debug('cluster slots result count: %d', result.length);
            for (let i = 0; i < result.length; ++i) {
                const items = result[i];
                const slotRangeStart = items[0];
                const slotRangeEnd = items[1];
                const keys = [];
                for (let j = 2; j < items.length; j++) {
                    items[j] = this.natMapper({ host: items[j][0], port: items[j][1] });
                    items[j].readOnly = j !== 2;
                    nodes.push(items[j]);
                    keys.push(items[j].host + ':' + items[j].port);
                }
                debug('cluster slots result [%d]: slots %d~%d served by %s', i, slotRangeStart, slotRangeEnd, keys);
                for (let slot = slotRangeStart; slot <= slotRangeEnd; slot++) {
                    this.slots[slot] = keys;
                }
            }
            this.connectionPool.reset(nodes);
            callback();
        }, this.options.slotsRefreshTimeout));
    }
    /**
     * Check whether Cluster is able to process commands
     *
     * @param {Function} callback
     * @private
     */
    readyCheck(callback) {
        this.cluster('info', function (err, res) {
            if (err) {
                return callback(err);
            }
            if (typeof res !== 'string') {
                return callback();
            }
            let state;
            const lines = res.split('\r\n');
            for (let i = 0; i < lines.length; ++i) {
                const parts = lines[i].split(':');
                if (parts[0] === 'cluster_state') {
                    state = parts[1];
                    break;
                }
            }
            if (state === 'fail') {
                debug('cluster state not ok (%s)', state);
                callback(null, state);
            }
            else {
                callback();
            }
        });
    }
    dnsLookup(hostname) {
        return new Promise((resolve, reject) => {
            this.options.dnsLookup(hostname, (err, address) => {
                if (err) {
                    debug('failed to resolve hostname %s to IP: %s', hostname, err.message);
                    reject(err);
                }
                else {
                    debug('resolved hostname %s to IP %s', hostname, address);
                    resolve(address);
                }
            });
        });
    }
    /**
     * Normalize startup nodes, and resolving hostnames to IPs.
     *
     * This process happens every time when #connect() is called since
     * #startupNodes and DNS records may chanage.
     *
     * @private
     * @returns {Promise<IRedisOptions[]>}
     */
    resolveStartupNodeHostnames() {
        if (!Array.isArray(this.startupNodes) || this.startupNodes.length === 0) {
            return Promise.reject(new Error('`startupNodes` should contain at least one node.'));
        }
        const startupNodes = util_1.normalizeNodeOptions(this.startupNodes);
        const hostnames = util_1.getUniqueHostnamesFromOptions(startupNodes);
        if (hostnames.length === 0) {
            return Promise.resolve(startupNodes);
        }
        return Promise.all(hostnames.map((hostname) => this.dnsLookup(hostname))).then((ips) => {
            const hostnameToIP = utils_1.zipMap(hostnames, ips);
            return startupNodes.map((node) => (hostnameToIP.has(node.host)
                ? Object.assign({}, node, { host: hostnameToIP.get(node.host) })
                : node));
        });
    }
}
Object.getOwnPropertyNames(Commander.prototype).forEach(name => {
    if (!Cluster.prototype.hasOwnProperty(name)) {
        Cluster.prototype[name] = Commander.prototype[name];
    }
});
const scanCommands = ['sscan', 'hscan', 'zscan', 'sscanBuffer', 'hscanBuffer', 'zscanBuffer'];
scanCommands.forEach((command) => {
    Cluster.prototype[command + 'Stream'] = function (key, options) {
        return new ScanStream_1.default(lodash_1.defaults({
            objectMode: true,
            key: key,
            redis: this,
            command: command
        }, options));
    };
});
__webpack_require__(23).addTransactionSupport(Cluster.prototype);
exports.default = Cluster;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const redis_errors_1 = __webpack_require__(8);
class ClusterAllFailedError extends redis_errors_1.RedisError {
    constructor(message, lastNodeError) {
        super(message);
        this.lastNodeError = lastNodeError;
        Error.captureStackTrace(this, this.constructor);
    }
    get name() {
        return this.constructor.name;
    }
}
exports.default = ClusterAllFailedError;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(10);
const utils_1 = __webpack_require__(0);
const lodash_1 = __webpack_require__(1);
const util_1 = __webpack_require__(15);
const Redis = __webpack_require__(6);
const debug = __webpack_require__(3)('ioredis:cluster:connectionPool');
class ConnectionPool extends events_1.EventEmitter {
    constructor(redisOptions) {
        super();
        this.redisOptions = redisOptions;
        // master + slave = all
        this.nodes = {
            all: {},
            master: {},
            slave: {}
        };
        this.specifiedOptions = {};
    }
    getNodes(role = 'all') {
        const nodes = this.nodes[role];
        return Object.keys(nodes).map((key) => nodes[key]);
    }
    getInstanceByKey(key) {
        return this.nodes.all[key];
    }
    getSampleInstance(role) {
        const keys = Object.keys(this.nodes[role]);
        const sampleKey = utils_1.sample(keys);
        return this.nodes[role][sampleKey];
    }
    /**
     * Find or create a connection to the node
     *
     * @param {IRedisOptions} node
     * @param {boolean} [readOnly=false]
     * @returns {*}
     * @memberof ConnectionPool
     */
    findOrCreate(node, readOnly = false) {
        const key = util_1.getNodeKey(node);
        readOnly = Boolean(readOnly);
        if (this.specifiedOptions[key]) {
            Object.assign(node, this.specifiedOptions[key]);
        }
        else {
            this.specifiedOptions[key] = node;
        }
        let redis;
        if (this.nodes.all[key]) {
            redis = this.nodes.all[key];
            if (redis.options.readOnly !== readOnly) {
                redis.options.readOnly = readOnly;
                debug('Change role of %s to %s', key, readOnly ? 'slave' : 'master');
                redis[readOnly ? 'readonly' : 'readwrite']().catch(lodash_1.noop);
                if (readOnly) {
                    delete this.nodes.master[key];
                    this.nodes.slave[key] = redis;
                }
                else {
                    delete this.nodes.slave[key];
                    this.nodes.master[key] = redis;
                }
            }
        }
        else {
            debug('Connecting to %s as %s', key, readOnly ? 'slave' : 'master');
            redis = new Redis(lodash_1.defaults({
                // Never try to reconnect when a node is lose,
                // instead, waiting for a `MOVED` error and
                // fetch the slots again.
                retryStrategy: null,
                // Offline queue should be enabled so that
                // we don't need to wait for the `ready` event
                // before sending commands to the node.
                enableOfflineQueue: true,
                readOnly: readOnly
            }, node, this.redisOptions, { lazyConnect: true }));
            this.nodes.all[key] = redis;
            this.nodes[readOnly ? 'slave' : 'master'][key] = redis;
            redis.once('end', () => {
                delete this.nodes.all[key];
                delete this.nodes.master[key];
                delete this.nodes.slave[key];
                this.emit('-node', redis, key);
                if (!Object.keys(this.nodes.all).length) {
                    this.emit('drain');
                }
            });
            this.emit('+node', redis, key);
            redis.on('error', function (error) {
                this.emit('nodeError', error, key);
            });
        }
        return redis;
    }
    /**
     * Reset the pool with a set of nodes.
     * The old node will be removed.
     *
     * @param {(Array<string | number | object>)} nodes
     * @memberof ConnectionPool
     */
    reset(nodes) {
        debug('Reset with %O', nodes);
        const newNodes = {};
        nodes.forEach((node) => {
            newNodes[util_1.getNodeKey(node)] = node;
        });
        Object.keys(this.nodes.all).forEach((key) => {
            if (!newNodes[key]) {
                debug('Disconnect %s because the node does not hold any slot', key);
                this.nodes.all[key].disconnect();
            }
        });
        Object.keys(newNodes).forEach((key) => {
            const node = newNodes[key];
            this.findOrCreate(node, node.readOnly);
        });
    }
}
exports.default = ConnectionPool;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __webpack_require__(1);
const util_1 = __webpack_require__(15);
const utils_1 = __webpack_require__(0);
const Redis = __webpack_require__(6);
const debug = __webpack_require__(3)('ioredis:cluster:subscriber');
const SUBSCRIBER_CONNECTION_NAME = 'ioredisClusterSubscriber';
class ClusterSubscriber {
    constructor(connectionPool, emitter) {
        this.connectionPool = connectionPool;
        this.emitter = emitter;
        this.started = false;
        this.subscriber = null;
        this.connectionPool.on('-node', (_, key) => {
            if (!this.started || !this.subscriber) {
                return;
            }
            if (util_1.getNodeKey(this.subscriber.options) === key) {
                debug('subscriber has left, selecting a new one...');
                this.selectSubscriber();
            }
        });
        this.connectionPool.on('+node', () => {
            if (!this.started || this.subscriber) {
                return;
            }
            debug('a new node is discovered and there is no subscriber, selecting a new one...');
            this.selectSubscriber();
        });
    }
    getInstance() {
        return this.subscriber;
    }
    selectSubscriber() {
        const lastActiveSubscriber = this.lastActiveSubscriber;
        // Disconnect the previous subscriber even if there
        // will not be a new one.
        if (lastActiveSubscriber) {
            lastActiveSubscriber.disconnect();
        }
        const sampleNode = utils_1.sample(this.connectionPool.getNodes());
        if (!sampleNode) {
            debug('selecting subscriber failed since there is no node discovered in the cluster yet');
            this.subscriber = null;
            return;
        }
        const { options } = sampleNode;
        debug('selected a subscriber %s:%s', options.host, options.port);
        /*
         * Create a specialized Redis connection for the subscription.
         * Note that auto reconnection is enabled here.
         *
         * `enableReadyCheck` is also enabled because although subscription is allowed
         * while redis is loading data from the disk, we can check if the password
         * provided for the subscriber is correct, and if not, the current subscriber
         * will be disconnected and a new subscriber will be selected.
         */
        this.subscriber = new Redis({
            port: options.port,
            host: options.host,
            password: options.password,
            enableReadyCheck: true,
            connectionName: SUBSCRIBER_CONNECTION_NAME,
            lazyConnect: true,
            tls: options.tls
        });
        // Ignore the errors since they're handled in the connection pool.
        this.subscriber.on('error', lodash_1.noop);
        // Re-subscribe previous channels
        var previousChannels = { subscribe: [], psubscribe: [] };
        if (lastActiveSubscriber) {
            const condition = lastActiveSubscriber.condition || lastActiveSubscriber.prevCondition;
            if (condition && condition.subscriber) {
                previousChannels.subscribe = condition.subscriber.channels('subscribe');
                previousChannels.psubscribe = condition.subscriber.channels('psubscribe');
            }
        }
        if (previousChannels.subscribe.length || previousChannels.psubscribe.length) {
            var pending = 0;
            for (const type of ['subscribe', 'psubscribe']) {
                var channels = previousChannels[type];
                if (channels.length) {
                    pending += 1;
                    debug('%s %d channels', type, channels.length);
                    this.subscriber[type](channels).then(() => {
                        if (!--pending) {
                            this.lastActiveSubscriber = this.subscriber;
                        }
                    }).catch(lodash_1.noop);
                }
            }
        }
        else {
            this.lastActiveSubscriber = this.subscriber;
        }
        for (const event of ['message', 'messageBuffer']) {
            this.subscriber.on(event, (arg1, arg2) => {
                this.emitter.emit(event, arg1, arg2);
            });
        }
        for (const event of ['pmessage', 'pmessageBuffer']) {
            this.subscriber.on(event, (arg1, arg2, arg3) => {
                this.emitter.emit(event, arg1, arg2, arg3);
            });
        }
    }
    start() {
        this.started = true;
        this.selectSubscriber();
        debug('started');
    }
    stop() {
        this.started = false;
        if (this.subscriber) {
            this.subscriber.disconnect();
            this.subscriber = null;
        }
        debug('stopped');
    }
}
exports.default = ClusterSubscriber;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Deque = __webpack_require__(11);
const debug = __webpack_require__(3)('ioredis:delayqueue');
/**
 * Queue that runs items after specified duration
 *
 * @export
 * @class DelayQueue
 */
class DelayQueue {
    constructor() {
        this.queues = {};
        this.timeouts = {};
    }
    /**
     * Add a new item to the queue
     *
     * @param {string} bucket bucket name
     * @param {Function} item function that will run later
     * @param {IDelayQueueOptions} options
     * @memberof DelayQueue
     */
    push(bucket, item, options) {
        const callback = options.callback || process.nextTick;
        if (!this.queues[bucket]) {
            this.queues[bucket] = new Deque();
        }
        const queue = this.queues[bucket];
        queue.push(item);
        if (!this.timeouts[bucket]) {
            this.timeouts[bucket] = setTimeout(() => {
                callback(() => {
                    this.timeouts[bucket] = null;
                    this.execute(bucket);
                });
            }, options.timeout);
        }
    }
    execute(bucket) {
        const queue = this.queues[bucket];
        if (!queue) {
            return;
        }
        const { length } = queue;
        if (!length) {
            return;
        }
        debug('send %d commands in %s queue', length, bucket);
        this.queues[bucket] = null;
        while (queue.length > 0) {
            queue.shift()();
        }
    }
}
exports.default = DelayQueue;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = __webpack_require__(63);
exports.DEFAULT_CLUSTER_OPTIONS = {
    clusterRetryStrategy: (times) => Math.min(100 + times * 2, 2000),
    enableOfflineQueue: true,
    enableReadyCheck: true,
    scaleReads: 'master',
    maxRedirections: 16,
    retryDelayOnFailover: 100,
    retryDelayOnClusterDown: 100,
    retryDelayOnTryAgain: 100,
    slotsRefreshTimeout: 1000,
    slotsRefreshInterval: 5000,
    dnsLookup: dns_1.lookup
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("dns");

/***/ })
/******/ ]);
