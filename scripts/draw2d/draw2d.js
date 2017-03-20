/**
 * @class draw2d
 * global namespace declarations
 *
 * @private
 */
var draw2d =
    {
        geo: {},

        io: {
            json: {},
            png: {},
            svg: {}
        },


        storage: {},

        util: {
            spline: {}
        },

        shape: {
            basic: {},
            composite: {},
            arrow: {},
            node: {},
            note: {},
            diagram: {},
            analog: {},
            icon: {},
            layout: {},
            pert: {},
            state: {},
            widget: {}
        },

        policy: {
            canvas: {},
            line: {},
            port: {},
            figure: {}
        },

        command: {},

        decoration: {
            connection: {}
        },

        layout: {
            connection: {},
            anchor: {},
            mesh: {},
            locator: {}
        },


        ui: {},

        isTouchDevice: (
            //Detect iPhone
            (navigator.platform.indexOf("iPhone") != -1) ||
            //Detect iPod
            (navigator.platform.indexOf("iPod") != -1) ||
            //Detect iPad
            (navigator.platform.indexOf("iPad") != -1)
        )

    };


// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Browser_compatibility
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (callback /*, initialValue*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !k in t) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };
}
draw2d.util.Base64 = {

    /**
     * Maps bytes to characters.
     * @type {Object}
     * @private
     */
    byteToCharMap_: null,


    /**
     * Maps characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMap_: null,


    /**
     * Maps bytes to websafe characters.
     * @type {Object}
     * @private
     */
    byteToCharMapWebSafe_: null,

    /**
     * Maps websafe characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMapWebSafe_: null,


    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     * @type {string}
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     * @type {string}
     */
    ENCODED_VALS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + '+/=',


    /**
     * Our websafe alphabet.
     * @type {string}
     */
    ENCODED_VALS_WEBSAFE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + '-_.',


    encodeByteArray: function (input, opt_webSafe) {
        draw2d.util.Base64.init();

        var byteToCharMap = opt_webSafe ? draw2d.util.Base64.byteToCharMapWebSafe_ : draw2d.util.Base64.byteToCharMap_;

        var output = [];

        for (var i = 0; i < input.length; i += 3) {
            var byte1 = input[i];
            var haveByte2 = i + 1 < input.length;
            var byte2 = haveByte2 ? input[i + 1] : 0;
            var haveByte3 = i + 2 < input.length;
            var byte3 = haveByte3 ? input[i + 2] : 0;

            var outByte1 = byte1 >> 2;
            var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            var outByte3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
            var outByte4 = byte3 & 0x3F;

            if (!haveByte3) {
                outByte4 = 64;

                if (!haveByte2) {
                    outByte3 = 64;
                }
            }

            output.push(byteToCharMap[outByte1],
                byteToCharMap[outByte2],
                byteToCharMap[outByte3],
                byteToCharMap[outByte4]);
        }

        return output.join('');
    },


    /**
     * @method
     * Base64-encode a string.
     *
     * @param {string} input A string to encode.
     * @param {boolean=} opt_webSafe If true, we should use the alternative alphabet.
     * @return {string} The base64 encoded string.
     */
    encode: function (input, opt_webSafe) {
        return draw2d.util.Base64.encodeByteArray(draw2d.util.Base64.stringToByteArray(input), opt_webSafe);
    },


    /**
     * @method
     * Base64-decode a string.
     *
     * @param {String} input to decode (length not required to be a multiple of 4).
     * @param {boolean=} opt_webSafe True if we should use the
     *     alternative alphabet.
     * @return {Array} bytes representing the decoded value.
     */
    decode: function (input, opt_webSafe) {
        draw2d.util.Base64.init();

        var charToByteMap = opt_webSafe ? draw2d.util.Base64.charToByteMapWebSafe_ : draw2d.util.Base64.charToByteMap_;

        var output = [];

        for (var i = 0; i < input.length;) {
            var byte1 = charToByteMap[input.charAt(i++)];

            var haveByte2 = i < input.length;
            var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;

            var haveByte3 = i < input.length;
            var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 0;
            ++i;

            var haveByte4 = i < input.length;
            var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 0;
            ++i;

            if (byte1 == null || byte2 == null ||
                byte3 == null || byte4 == null) {
                throw Error();
            }

            var outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);

            if (byte3 != 64) {
                var outByte2 = ((byte2 << 4) & 0xF0) | (byte3 >> 2);
                output.push(outByte2);

                if (byte4 != 64) {
                    var outByte3 = ((byte3 << 6) & 0xC0) | byte4;
                    output.push(outByte3);
                }
            }
        }

        return output;
    },

    /**
     * Turns a string into an array of bytes; a "byte" being a JS number in the
     * range 0-255.
     * @param {string} str String value to arrify.
     * @return {!Array.<number>} Array of numbers corresponding to the
     *     UCS character codes of each character in str.
     */
    stringToByteArray: function (str) {
        var output = [], p = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            while (c > 0xff) {
                output[p++] = c & 0xff;
                c >>= 8;
            }
            output[p++] = c;
        }
        return output;
    },

    init: function () {
        if (!draw2d.util.Base64.byteToCharMap_) {
            draw2d.util.Base64.byteToCharMap_ = {};
            draw2d.util.Base64.charToByteMap_ = {};
            draw2d.util.Base64.byteToCharMapWebSafe_ = {};
            draw2d.util.Base64.charToByteMapWebSafe_ = {};

            // We want quick mappings back and forth, so we precompute two maps.
            for (var i = 0; i < draw2d.util.Base64.ENCODED_VALS.length; i++) {
                draw2d.util.Base64.byteToCharMap_[i] = draw2d.util.Base64.ENCODED_VALS.charAt(i);
                draw2d.util.Base64.charToByteMap_[draw2d.util.Base64.byteToCharMap_[i]] = i;
                draw2d.util.Base64.byteToCharMapWebSafe_[i] = draw2d.util.Base64.ENCODED_VALS_WEBSAFE.charAt(i);
                draw2d.util.Base64.charToByteMapWebSafe_[draw2d.util.Base64.byteToCharMapWebSafe_[i]] = i;
            }
        }
    }
};
/*!
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */

// Script: JavaScript Debug: A simple wrapper for console.log
//
// *Version: 0.4, Last Updated: 6/22/2010*
//
// Tested with Internet Explorer 6-8, Firefox 3-3.6, Safari 3-4, Chrome 3-5, Opera 9.6-10.5
//
// Home       - http://benalman.com/projects/javascript-debug-console-log/
// GitHub     - http://github.com/cowboy/javascript-debug/
// Source     - http://github.com/cowboy/javascript-debug/raw/master/ba-debug.js
// (Minified) - http://github.com/cowboy/javascript-debug/raw/master/ba-debug.min.js (1.1kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Support and Testing
//
// Information about what browsers this code has been tested in.
//
// Browsers Tested - Internet Explorer 6-8, Firefox 3-3.6, Safari 3-4, Chrome
// 3-5, Opera 9.6-10.5
//
// About: Examples
//
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
//
// Examples - http://benalman.com/code/projects/javascript-debug/examples/debug/
//
// About: Revision History
//
// 0.4 - (6/22/2010) Added missing passthrough methods: exception,
//       groupCollapsed, table
// 0.3 - (6/8/2009) Initial release
//
// Topic: Pass-through console methods
//
// assert, clear, count, dir, dirxml, exception, group, groupCollapsed,
// groupEnd, profile, profileEnd, table, time, timeEnd, trace
//
// These console methods are passed through (but only if both the console and
// the method exists), so use them without fear of reprisal. Note that these
// methods will not be passed through if the logging level is set to 0 via
// <debug.setLevel>.

window.debug = (function () {
    var window = this,

        // Some convenient shortcuts.
        aps = Array.prototype.slice,
        con = window.console,

        // Public object to be returned.
        that = {},

        callback_func,
        callback_force,

        // Default logging level, show everything.
        log_level = 9,

        // Logging methods, in "priority order". Not all console implementations
        // will utilize these, but they will be used in the callback passed to
        // setCallback.
        log_methods = ['error', 'warn', 'info', 'debug', 'log'],

        // Pass these methods through to the console if they exist, otherwise just
        // fail gracefully. These methods are provided for convenience.
        pass_methods = 'assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace'.split(' '),
        idx = pass_methods.length,

        // Logs are stored here so that they can be recalled as necessary.
        logs = [];

    while (--idx >= 0) {
        (function (method) {

            // Generate pass-through methods. These methods will be called, if they
            // exist, as long as the logging level is non-zero.
            that[method] = function () {
                log_level !== 0 && con && con[method]
                && con[method].apply(con, arguments);
            };

        })(pass_methods[idx]);
    }

    idx = log_methods.length;
    while (--idx >= 0) {
        (function (idx, level) {

            // Method: debug.log
            //
            // Call the console.log method if available. Adds an entry into the logs
            // array for a callback specified via <debug.setCallback>.
            //
            // Usage:
            //
            //  debug.log( object [, object, ...] );                               - -
            //
            // Arguments:
            //
            //  object - (Object) Any valid JavaScript object.

            // Method: debug.debug
            //
            // Call the console.debug method if available, otherwise call console.log.
            // Adds an entry into the logs array for a callback specified via
            // <debug.setCallback>.
            //
            // Usage:
            //
            //  debug.debug( object [, object, ...] );                             - -
            //
            // Arguments:
            //
            //  object - (Object) Any valid JavaScript object.

            // Method: debug.info
            //
            // Call the console.info method if available, otherwise call console.log.
            // Adds an entry into the logs array for a callback specified via
            // <debug.setCallback>.
            //
            // Usage:
            //
            //  debug.info( object [, object, ...] );                              - -
            //
            // Arguments:
            //
            //  object - (Object) Any valid JavaScript object.

            // Method: debug.warn
            //
            // Call the console.warn method if available, otherwise call console.log.
            // Adds an entry into the logs array for a callback specified via
            // <debug.setCallback>.
            //
            // Usage:
            //
            //  debug.warn( object [, object, ...] );                              - -
            //
            // Arguments:
            //
            //  object - (Object) Any valid JavaScript object.

            // Method: debug.error
            //
            // Call the console.error method if available, otherwise call console.log.
            // Adds an entry into the logs array for a callback specified via
            // <debug.setCallback>.
            //
            // Usage:
            //
            //  debug.error( object [, object, ...] );                             - -
            //
            // Arguments:
            //
            //  object - (Object) Any valid JavaScript object.

            that[level] = function () {
                var args = aps.call(arguments),
                    log_arr = [level].concat(args);

                logs.push(log_arr);
                exec_callback(log_arr);

                if (!con || !is_level(idx)) {
                    return;
                }

                con.firebug ? con[level].apply(window, args)
                    : con[level] ? con[level](args)
                        : con.log(args);
            };

        })(idx, log_methods[idx]);
    }

    // Execute the callback function if set.
    function exec_callback(args) {
        if (callback_func && (callback_force || !con || !con.log)) {
            callback_func.apply(window, args);
        }
    }
    // Method: debug.setLevel
    //
    // Set a minimum or maximum logging level for the console. Doesn't affect
    // the <debug.setCallback> callback function, but if set to 0 to disable
    // logging, <Pass-through console methods> will be disabled as well.
    //
    // Usage:
    //
    //  debug.setLevel( [ level ] )                                            - -
    //
    // Arguments:
    //
    //  level - (Number) If 0, disables logging. If negative, shows N lowest
    //    priority levels of log messages. If positive, shows N highest priority
    //    levels of log messages.
    //
    // Priority levels:
    //
    //   log (1) < debug (2) < info (3) < warn (4) < error (5)

    that.setLevel = function (level) {
        log_level = typeof level === 'number' ? level : 9;
    };

    // Determine if the level is visible given the current log_level.
    function is_level(level) {
        return log_level > 0
            ? log_level > level
            : log_methods.length + log_level <= level;
    }
    // Method: debug.setCallback
    //
    // Set a callback to be used if logging isn't possible due to console.log
    // not existing. If unlogged logs exist when callback is set, they will all
    // be logged immediately unless a limit is specified.
    //
    // Usage:
    //
    //  debug.setCallback( callback [, force ] [, limit ] )
    //
    // Arguments:
    //
    //  callback - (Function) The aforementioned callback function. The first
    //    argument is the logging level, and all subsequent arguments are those
    //    passed to the initial debug logging method.
    //  force - (Boolean) If false, log to console.log if available, otherwise
    //    callback. If true, log to both console.log and callback.
    //  limit - (Number) If specified, number of lines to limit initial scrollback
    //    to.

    that.setCallback = function () {
        var args = aps.call(arguments),
            max = logs.length,
            i = max;

        callback_func = args.shift() || null;
        callback_force = typeof args[0] === 'boolean' ? args.shift() : false;

        i -= typeof args[0] === 'number' ? args.shift() : max;

        while (i < max) {
            exec_callback(logs[i++]);
        }
    };

    return that;
})();


/**
 * @class
 * Util class to handle colors in the draw2d enviroment.
 *
 *      // Create a new Color with RGB values
 *      var color = new draw2d.util.Color(127,0,0);
 *
 *      // of from a hex string
 *      var color2 = new draw2d.util.Color("#f00000");
 *
 *      // Create a little bit darker color
 *      var darkerColor = color.darker(0.2); // 20% darker
 *
 *      // create a optimal text color if 'color' the background color
 *      // (best in meaning of contrast and readability)
 *      var fontColor = color.getIdealTextColor();
 *
 */
draw2d.util.Color = Class.extend({

    /**
     * @constructor
     * Create a new Color object
     *
     * @param {Number|String|draw2d.util.Color|Array} red
     * @param {Number} green
     * @param {Number} blue
     */
    init: function (red, green, blue) {

        this.hashString = null;

        if (typeof red === "undefined" || red === null) {
            this.hashString = "none";
        }
        else if (red instanceof draw2d.util.Color) {
            if (red.hashString === "none") {
                this.hashString = "none";
            }
            else {
                this.red = red.red;
                this.green = red.green;
                this.blue = red.blue;
            }
        }
        else if (typeof red === "string") {
            if (red === "none") {
                this.hashString = "none";
            }
            else {
                var rgb = this.hex2rgb(red);
                this.red = rgb[0];
                this.green = rgb[1];
                this.blue = rgb[2];
            }
        }
        // JSON struct of {red:###, green:###, blue:### }
        else if (typeof red === "object" && typeof red.red === "number") {
            this.red = red.red;
            this.green = red.green;
            this.blue = red.blue;
        }
        // array detection 1
        else if (red instanceof Array && red.length === 3) {
            this.red = red[0];
            this.green = red[1];
            this.blue = red[2];
        }
        // array detection 2
        else if (typeof red === "object" && typeof red.length === "number" && red.length === 3) {
            this.red = red[0];
            this.green = red[1];
            this.blue = red[2];
        }
        else {
            this.red = parseInt(red);
            this.green = parseInt(green);
            this.blue = parseInt(blue);
        }
    },


    /**
     * @method
     * Convert the color object into a HTML CSS representation
     * @return {String} the color in rgb(##,##,##) representation
     **/
    getHTMLStyle: function () {
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    },


    /**
     * @method
     * The red part of the color.
     *
     * @return {Number} the [red] part of the color.
     **/
    getRed: function () {
        return this.red;
    },


    /**
     * @method
     * The green part of the color.
     *
     * @return {Number} the [green] part of the color.
     **/
    getGreen: function () {
        return this.green;
    },


    /**
     * @method
     * The blue part of the color
     *
     * @return {Number} the [blue] part of the color.
     **/
    getBlue: function () {
        return this.blue;
    },

    /**
     * @method
     * Returns the ideal Text Color. Useful for font color selection by a given background color.
     *
     * @return {draw2d.util.Color} The <i>ideal</i> inverse color.
     **/
    getIdealTextColor: function () {
        var nThreshold = 105;
        var bgDelta = (this.red * 0.299) + (this.green * 0.587) + (this.blue * 0.114);
        return (255 - bgDelta < nThreshold) ? new draw2d.util.Color(0, 0, 0) : new draw2d.util.Color(255, 255, 255);
    },


    /**
     * @private
     */
    hex2rgb: function (/*:String */hexcolor) {
        hexcolor = hexcolor.replace("#", "");
        return (
            {
                0: parseInt(hexcolor.substr(0, 2), 16),
                1: parseInt(hexcolor.substr(2, 2), 16),
                2: parseInt(hexcolor.substr(4, 2), 16)
            }
        );
    },

    /**
     * @private
     **/
    hex: function () {
        return (this.int2hex(this.red) + this.int2hex(this.green) + this.int2hex(this.blue));
    },


    /**
     * @method
     * Convert the color object into a HTML CSS representation
     * @return {String} the color in #RRGGBB representation
     **/
    hash: function () {
        if (this.hashString === null) {
            this.hashString = "#" + this.hex();
        }
        return this.hashString;
    },

    /**
     * @private
     */
    int2hex: function (v) {
        v = Math.round(Math.min(Math.max(0, v), 255));
        return ("0123456789ABCDEF".charAt((v - v % 16) / 16) + "0123456789ABCDEF".charAt(v % 16));
    },

    /**
     * @method
     * Returns a darker color of the given one. The original color is unchanged.
     *
     * @param {Number} fraction  Darkness fraction between [0..1].
     * @return{draw2d.util.Color}        Darker color.
     */
    darker: function (fraction) {
        // we can "darker" a undefined color. In this case we return the undefnied color itself
        //
        if (this.hashString === "none")
            return this;

        var red = parseInt(Math.round(this.getRed() * (1.0 - fraction)));
        var green = parseInt(Math.round(this.getGreen() * (1.0 - fraction)));
        var blue = parseInt(Math.round(this.getBlue() * (1.0 - fraction)));

        if (red < 0) red = 0; else if (red > 255) red = 255;
        if (green < 0) green = 0; else if (green > 255) green = 255;
        if (blue < 0) blue = 0; else if (blue > 255) blue = 255;

        return new draw2d.util.Color(red, green, blue);
    },


    /**
     * @method
     * Make a color lighter. The original color is unchanged.
     *
     * @param {Number} fraction  lighter fraction between [0..1].
     * @return {draw2d.util.Color} Lighter color.
     */
    lighter: function (fraction) {
        // we can "lighter" a undefined color. In this case we return the undefined color itself
        //
        if (this.hashString === "none")
            return this;

        var red = parseInt(Math.round(this.getRed() * (1.0 + fraction)));
        var green = parseInt(Math.round(this.getGreen() * (1.0 + fraction)));
        var blue = parseInt(Math.round(this.getBlue() * (1.0 + fraction)));

        if (red < 0) red = 0; else if (red > 255) red = 255;
        if (green < 0) green = 0; else if (green > 255) green = 255;
        if (blue < 0) blue = 0; else if (blue > 255) blue = 255;

        return new draw2d.util.Color(red, green, blue);
    },

    /**
     * @method
     * Return a new color wich is faded to the given color.
     * @param {draw2d.util.Color} color
     * @param {Number} pc the fade percentage in [0..1]
     * @returns {draw2d.util.Color}
     *
     * @since 2.1.0
     */
    fadeTo: function (color, pc) {

        var r = Math.floor(this.red + (pc * (color.red - this.red)) + .5);
        var g = Math.floor(this.green + (pc * (color.green - this.green)) + .5);
        var b = Math.floor(this.blue + (pc * (color.blue - this.blue)) + .5);

        return new draw2d.util.Color(r, g, b);
    },

    /**
     * @method
     * Compares two color objects
     *
     * @param {draw2d.util.Color} o
     * @return {Boolean}
     **/
    equals: function (o) {
        if (!(o instanceof draw2d.util.Color)) {
            return false;
        }
        return this.hash() == o.hash();
    }

});


/**
 * @class draw2d.util.ArrayList
 *
 * An ArrayList stores a variable number of objects. This is similar to making an array of
 * objects, but with an ArrayList, items can be easily added and removed from the ArrayList
 * and it is resized dynamically. This can be very convenient, but it's slower than making
 * an array of objects when using many elements.
 */
draw2d.util.ArrayList = Class.extend({

    /**
     * @constructor
     * Initializes a new instance of the ArrayList class that is empty and has
     * the default initial capacity.
     *
     */
    init: function (a) {
        if ($.isArray(a)) {
            this.data = a;
        }
        else {
            this.data = [];
        }
    },


    /**
     * @method
     * Reverses the order of the elements in the ArrayList. The array will be modified!
     *
     */
    reverse: function () {
        this.data.reverse();

        return this;
    },

    /**
     * @method
     * The size/count of the stored objects.
     *
     * @return {Number}
     */
    getSize: function () {
        return this.data.length;
    },


    /**
     * @method
     * checks to see if the Vector has any elements.
     *
     * @return {Boolean} true if the list is empty
     **/
    isEmpty: function () {
        return this.getSize() === 0;
    },

    /**
     * @method
     * return the last element.
     *
     * @return {Object}
     */
    last: function () {
        return this.data[this.data.length - 1];
    },
    /* @deprecated */
    getLastElement: function () {
        return this.last();
    },


    /**
     * @method
     * Return a reference to the internal javascript native array.
     *
     * @return {Array}
     */
    asArray: function () {
        return this.data;
    },

    /**
     * @method
     * returns the first element
     *
     * @return {Object}
     */
    first: function () {
        if (this.data.length > 0) {
            return this.data[0];
        }
        return null;
    },
    /* @deprecated */
    getFirstElement: function () {
        return this.first();
    },


    /**
     * @method
     * returns an element at a specified index
     *
     * @param {Number} i
     * @return {Object}
     */
    get: function (i) {
        return this.data[i];
    },

    /**
     * @method
     * Adds a element at the end of the Vector.
     *
     * @param {Object} obj the object to add
     */
    add: function (obj) {
        this.data.push(obj);

        return this;
    },

    /**
     * @method
     *
     * The method removes items from an array as necessary so that all remaining items pass a
     * provided test. The test is a function that is passed an array item and the index of the
     * item within the array. Only if the test returns true will the item stay in the array.
     *
     * @param {Function} func the filter function
     * @param {Object} func.value value of the element in iteration.
     * @since 2.0.0
     */
    grep: function (func) {
        this.data = $.grep(this.data, func);

        return this;
    },

    /**
     * @method
     * Translate all items in the array into new items. The array list is modified after this call.
     * You must clone the array before if you want avoid this.
     *
     *     var labels = this.commands.clone().map(function(e){
      *          return e.getLabel();
      *     });
     *
     * @param {Function} func The function to process each item against. The first argument to the function is the value; the second argument is the index or key of the array or object property.
     * @param {Object} func.value value of the element in iteration.
     * @param {Number} func.i index of the element in iteration
     *
     * @since 4.0.0
     */
    map: function (func) {
        this.data = $.map(this.data, func);

        return this;
    },

    /**
     * @method
     * Removes any duplicate elements from the array. The array is modified after this call. You
     * must clone the array before if you want avoid this
     *
     * @since 4.0.0
     */
    unique: function () {
        this.data = $.unique(this.data);

        return this;
    },


    /**
     * @method
     * Add all elements into this array.
     *
     * @param {draw2d.util.ArrayList} list
     * @param {boolean} [avoidDuplicates] checks whenever the new elements exists before insert if the parameter is to [true]
     *
     */
    addAll: function (list, avoidDuplicates) {
        if (!(list instanceof draw2d.util.ArrayList)) {
            throw "Unable to handle unknown object type in ArrayList.addAll";
        }

        this.data = this.data.concat(list.data);
        if (avoidDuplicates) {
            this.unique();
        }
        return this;
    },

    /**
     * @method
     * You can use the Array list as Stack as well. this is the pop method to remove one element
     * at the top of the stack.
     *
     * @returns
     */
    pop: function () {
        return this.removeElementAt(this.data.length - 1);
    },

    /**
     * @method
     * Push one element at the top of the stack/array
     *
     * @param path
     */
    push: function (value) {
        this.add(value);
    },

    /**
     * @method
     * Remove the element from the list
     *
     * @param {Object} obj the object to remove
     *
     * @return {Object} the removed object or null
     */
    remove: function (obj) {
        var index = this.indexOf(obj);
        if (index >= 0) {
            return this.removeElementAt(index);
        }

        return null;
    },


    /**
     * @method
     * Inserts an element at a given position. Existing elements will be shifted
     * to the right.
     *
     * @param {Object} obj the object to insert.
     * @param {Number} index the insert position.
     *
     */
    insertElementAt: function (obj, index) {
        this.data.splice(index, 0, obj);

        return this;
    },

    /**
     * @method
     * Removes an element at a specific index.
     *
     * @param {Number} index the index of the element to remove
     * @return {Object} the removed object
     */
    removeElementAt: function (index) {
        var element = this.data[index];

        this.data.splice(index, 1);

        return element;
    },

    /**
     * @method
     * removes all given elements in the Vector
     *
     * @param {draw2d.util.ArrayList} elements The elements to remove
     */
    removeAll: function (elements) {
        $.each(elements, $.proxy(function (i, e) {
            this.remove(e);
        }, this));

        return this;
    },

    /**
     * @method
     * Return the zero based index of the given element or -1 if the element
     * not in the list.
     *
     * @param {Object} obj the element to check
     *
     * @return {Number} the index of the element or -1
     */
    indexOf: function (obj) {
        return this.data.indexOf(obj);
    },

    /**
     * @method
     * returns true if the element is in the Vector, otherwise false.
     *
     * @param {Object} obj the object to check
     *
     * @return {boolean}
     */
    contains: function (obj) {
        return this.indexOf(obj) !== -1;
    },


    /**
     * @method
     * Sorts the collection based on a field name or sort a function. See on http://www.w3schools.com/jsref/jsref_sort.asp
     * if you use a sort function.
     *
     * @param {String|Function} f the field name for the sorting or a sort function
     *
     * @return {draw2d.util.ArrayList} self
     */
    sort: function (f) {
        if (typeof f === "function") {
            this.data.sort(f);
        }
        else {
            this.data.sort(function (a, b) {
                if (a[f] < b[f])
                    return -1;
                if (a[f] > b[f])
                    return 1;
                return 0;
            });
        }
        return this;
    },

    /**
     * @method
     * Copies the contents of a Vector to another Vector returning the new Vector.
     *
     * @param {boolean} [deep] call "clone" of each elements and add the clone to the new ArrayList
     *
     * @returns {draw2d.util.ArrayList} the new ArrayList
     */
    clone: function (deep) {
        var newVector = new draw2d.util.ArrayList();


        if (deep) {
            for (var i = 0; i < this.data.length; i++) {
                newVector.data.push(this.data[i].clone());
            }
        }
        else {
            newVector.data = this.data.slice(0);
        }

        return newVector;
    },


    /**
     * @method
     * Iterates over the list of elements, yielding each in turn to an iterator
     * function.
     * Each invocation of iterator is called with two arguments: (index, element).
     *
     * @param {Function} func the callback function to call for each element
     * @param {Number} func.i index of the element in iteration
     * @param {Object} func.value value of the element in iteration.
     * @param {boolean} [reverse] optional parameter. Iterate the collection reverse if it set to <b>true</b>
     *
     */
    each: function (func, reverse) {
        if (typeof reverse !== "undefined" && reverse === true) {
            for (var i = this.data.length - 1; i >= 0; i--) {
                if (func(i, this.data[i]) === false)
                    break;
            }
        }
        else {
            for (var i = 0; i < this.data.length; i++) {
                if (func(i, this.data[i]) === false)
                    break;
            }
        }
    },

    // overwriteElementAt() - overwrites the element with an object at the specific index.
    overwriteElementAt: function (obj, index) {
        this.data[index] = obj;

        return this;
    },

    getPersistentAttributes: function () {
        return {data: this.data};
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function (memento) {
        this.data = memento.data;
    }


});

draw2d.util.ArrayList.EMPTY_LIST = new draw2d.util.ArrayList();


// extending raphael with a polygon function
Raphael.fn.polygon = function (pointString) {
    var poly = ['M'];
    var point = pointString.split(' ');

    for (var i = 0; i < point.length; i++) {
        var c = point[i].split(',');
        for (var j = 0; j < c.length; j++) {
            var d = parseFloat(c[j]);
            if (!isNaN(d))
                poly.push(d);
        }
        if (i == 0)
            poly.push('L');
    }
    poly.push('Z');

    return this.path(poly);
};
draw2d.util.JSON = {

    /**
     * @method
     * Given a dot deliminated string set will create an object
     * based on the structure of the string with the desired value
     *
     * @param {Object} data   the json object to modify
     * @param {String} path   path indicating where value should be placed
     * @param {Object} value  the value desired to be set at the location determined by path
     */
    set: function (data, path, value) {
        if (!path || path === '') {
            return;
        }

        var re = /[\w-]+|\[\]|([^\[[\w]\]]|["'](.*?)['"])/g;
        // parse path on dots, and brackets
        var pathList = path.match(re);
        var parent = data;
        var parentKey;
        var grandParent = null;
        var grandParentKey = null;

        var addObj = function (obj, key, data) {
            if (key === '[]') {
                obj.push(data);
            } else {
                obj[key] = data;
            }
        };

        while (pathList.length > 0) {
            parentKey = pathList.shift().replace(/["']/g, '');

            // Number, treat it as an array
            if (!isNaN(+parentKey) || parentKey === "[]") {
                if ($.type(parent) !== "array") {
                    parent = [];
                    addObj(grandParent, grandParentKey, parent);
                }
                // String, treat it as a key
            }
            else if ($.type(parentKey) === "string") {
                if (!$.isPlainObject(parent)) {
                    parent = {};
                    addObj(grandParent, grandParentKey, parent);
                }
            }
            // Next
            grandParent = parent;
            grandParentKey = parentKey;
            parent = parent[parentKey];
        }

        addObj(grandParent, grandParentKey, value);
    },

    /**
     * @method
     * Returns the value defined by the path passed in
     *
     * @param  {Object} data the JSON data object
     * @param  {String} path string leading to a desired value
     */
    get: function (data, path) {
        var regex = /[\w-]+|\[\]|([^\[[\w]\]]|["'](.*?)['"])/g;
        //check if path is truthy
        if (!path) {
            return undefined;
        }
        //parse path on dots and brackets
        var paths = path.match(regex);
        //step through data object until all keys in path have been processed
        while (data !== null && paths.length > 0) {
            if (data.propertyIsEnumerable(paths[0].replace(/"/g, ''))) {
                data = data[paths.shift().replace(/"/g, '')];
            }
            else {
                return undefined;
            }
        }
        return data;
    },

    /**
     * @method
     * calculates the diff between the given json objects
     *
     */
    diff: function (obj1, obj2) {
        var result = {};
        for (key in obj1) {
            var v1 = obj1[key];
            var v2 = obj2[key];
            if (v1 !== v2) {
                if (v1.equals) {
                    if (!v1.equals(v2)) {
                        result[key] = obj1[key];
                    }
                }
                else {
                    result[key] = obj1[key];
                }
            }
        }
        return result;
    }

};

/**
 * @class draw2d.util.UUID
 * Generates a (pseudo) UUID's
 *
 *      // a UUID in the format
 *      // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12)
 *      var id = draw2d.util.UUID.create();
 *
 * @author Andreas Herz
 * @constructor
 * @private
 */
draw2d.util.UUID = function () {
};


/**
 * @method
 * Generates a unique id.<br>
 * But just for the correctness: <strong>this is no Global Unique Identifier</strong>, it is just a random generator
 * with the output that looks like a GUID. <br>
 * But may be also useful.
 *
 * @returns {String} the  UUID in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12)
 **/
draw2d.util.UUID.create = function () {
    var segment = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (segment() + segment() + "-" + segment() + "-" + segment() + "-" + segment() + "-" + segment() + segment() + segment());
};


/**
 * @class draw2d.util.spline.Spline
 *
 *  An abstract class defining a general spline object.
 */
draw2d.util.spline.Spline = Class.extend({

    NAME: "draw2d.util.spline.Spline",

    /**
     * @constructor
     */
    init: function () {
    },

    /**
     * Create a spline based on the given control points.
     * The generated curve starts in the first control point and ends
     * in the last control point.
     *
     * @param {Array} controlPoints  Control points of spline (x0,y0,z0,x1,y1,z1,...).
     * @param {Number} parts Number of parts to divide each leg into.
     **/
    generate: function (controlPoints, parts) {
        throw "inherit classes must implement the method 'draw2d.util.spline.Spline.generate()'";
    }

});
/**
 * @class draw2d.util.spline.CubicSpline
 *
 * A cubic spline object.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.util.spline.Spline
 */
draw2d.util.spline.CubicSpline = draw2d.util.spline.Spline.extend(
    {
        NAME: "draw2d.util.spline.CubicSpline",

        /**
         * @constructor
         */
        init: function () {
            this._super();
        },


        /**
         * Create a spline based on the given control points.
         * The generated curve starts in the first control point and ends
         * in the last control point.
         *
         * @param {Array} controlPoints  Control points of spline (x0,y0,z0,x1,y1,z1,...).
         * @param {Number} parts Number of parts to divide each leg into.
         *
         * @returns {Array} the new generated array with new draw2d.geo.Point
         */
        generate: function (controlPoints, parts) {
            // Endpoints are added twice to get them include in the
            // generated array
            var cp = new draw2d.util.ArrayList();
            cp.add(controlPoints.get(0));
            cp.addAll(controlPoints);
            cp.add(controlPoints.get(controlPoints.getSize() - 1));

            var n = cp.getSize();
            var spline = new draw2d.util.ArrayList();
            spline.add(controlPoints.get(0));
            spline.add(this.p(1, 0, cp));

            for (var i = 1; i < n - 2; i++) {
                for (var j = 1; j <= parts; j++) {
                    spline.add(this.p(i, j / parts, cp));
                }
            }
            spline.add(controlPoints.get(controlPoints.getSize() - 1));

            return spline;
        },


        p: function (i, t, cp) {
            var x = 0.0;
            var y = 0.0;

            var k = i - 1;
            for (var j = -2; j <= 1; j++) {
                var b = this.blend(j, t);
                var p = cp.get(k++);
                x += b * p.x;
                y += b * p.y;
            }

            return new draw2d.geo.Point(x, y);
        },


        blend: function (i, t) {
            if (i === -2)
                return (((-t + 3) * t - 3) * t + 1) / 6;
            else if (i === -1)
                return (((3 * t - 6) * t) * t + 4) / 6;
            else if (i === 0)
                return (((-3 * t + 3) * t + 3) * t + 1) / 6;

            return (t * t * t) / 6;
        }

    });

/**
 * @class draw2d.util.spline.CatmullRomSpline
 *
 * A catmull-rom spline object.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.util.spline.CubicSpline
 */
draw2d.util.spline.CatmullRomSpline = draw2d.util.spline.CubicSpline.extend(
    {
        NAME: "draw2d.util.spline.CatmullRomSpline",

        /**
         * @constructor
         */
        init: function () {
            this._super();
        },


        blend: function (i, t) {
            if (i == -2)
                return ((-t + 2) * t - 1) * t / 2;
            else if (i == -1)
                return (((3 * t - 5) * t) * t + 2) / 2;
            else if (i == 0)
                return ((-3 * t + 4) * t + 1) * t / 2;
            else
                return ((t - 1) * t * t) / 2;
        }

    });

/**
 * @class draw2d.util.spline.BezierSpline
 *
 * A bezier spline object.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.util.spline.Spline
 */
draw2d.util.spline.BezierSpline = draw2d.util.spline.Spline.extend(
    {
        NAME: "draw2d.util.spline.BezierSpline",

        /**
         * @constructor
         */
        init: function () {
            this._super();
        },


        /**
         * Create a spline based on the given control points.
         * The generated curve starts in the first control point and ends
         * in the last control point.
         *
         * @param {Array} controlPoints  Control points of spline (x0,y0,z0,x1,y1,z1,...).
         * @param {Number} parts Number of parts to divide each leg into.
         *
         * @returns {Array} the new generated array with new draw2d.geo.Point
         */
        generate: function (controlPoints, parts) {
            var n = controlPoints.getSize();
            var spline = new draw2d.util.ArrayList();

            spline.add(this.p(0, 0, controlPoints));

            for (var i = 0; i < n - 3; i += 3) {
                for (var j = 1; j <= parts; j++) {
                    spline.add(this.p(i, j / parts, controlPoints));
                }
            }

            //    spline.add(controlPoints.get(controlPoints.getSize()-1));

            return spline;
        },


        p: function (i, t, cp) {
            var x = 0.0;
            var y = 0.0;

            var k = i;
            for (var j = 0; j <= 3; j++) {
                var b = this.blend(j, t);
                var p = cp.get(k++);
                x += b * p.x;
                y += b * p.y;
            }

            return new draw2d.geo.Point(x, y);
        },


        blend: function (i, t) {
            if (i == 0) return (1 - t) * (1 - t) * (1 - t);
            else if (i == 1) return 3 * t * (1 - t) * (1 - t);
            else if (i == 2) return 3 * t * t * (1 - t);
            else             return t * t * t;
        }
    });


/**
 * @class draw2d.geo.PositionConstants
 * Static values for point orientation.
 *
 */
draw2d.geo.PositionConstants = function () {
};

draw2d.geo.PositionConstants.NORTH = 1;
draw2d.geo.PositionConstants.SOUTH = 4;
draw2d.geo.PositionConstants.WEST = 8;
draw2d.geo.PositionConstants.EAST = 16;


/**
 * @class draw2d.geo.Point Util class for geometrie handling.
 */
draw2d.geo.Point = Class.extend({

    NAME: "draw2d.geo.Point",

    /**
     * @constructor
     * Creates a new Point object with the hands over coordinates.
     * @param {Number} x
     * @param {Number} y
     */
    init: function (x, y) {
        if (x instanceof draw2d.geo.Point) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }

        // limit for the maxi/minimum boundary of this rectangle
        // It is not possible that the rect leave the boundary if set.
        this.bx = null;
        this.by = null;
        this.bw = null;
        this.bh = null;
    },


    /**
     * @method
     * Set the boundary of the rectangle. If set, the rectangle is always inside
     * the boundary. A setX or setY will always be adjusted.
     *
     */
    setBoundary: function (bx, by, bw, bh) {
        if (bx instanceof draw2d.geo.Rectangle) {
            this.bx = bx.x;
            this.by = bx.y;
            this.bw = bx.w;
            this.bh = bx.h;
        } else {
            this.bx = bx;
            this.by = by;
            this.bw = bw;
            this.bh = bh;
        }
        this.adjustBoundary();

        return this;
    },


    /**
     * @method
     * @private
     */
    adjustBoundary: function () {
        if (this.bx === null) {
            return;
        }
        this.x = Math.min(Math.max(this.bx, this.x), this.bw);
        this.y = Math.min(Math.max(this.by, this.y), this.bh);

        return this;
    },

    /**
     * @method
     * Moves this Rectangle horizontally by dx and vertically by dy, then returns
     * this Rectangle for convenience.<br>
     * <br>
     * The method return the object itself. This allows you to do command chaining, where
     * you can perform multiple methods on the same elements.
     *
     * @param {Number} dx  Shift along X axis
     * @param {Number} dy  Shift along Y axis
     *
     **/
    translate: function (dx, dy) {
        this.x += dx;
        this.y += dy;
        this.adjustBoundary();

        return this;
    },

    /**
     * @method
     * The X value of the point
     * @since 0.1
     * @return {Number}
     */
    getX: function () {
        return this.x;
    },

    /**
     * @method
     * The y value of the point
     *
     * @return {Number}
     */
    getY: function () {
        return this.y;
    },

    /**
     * @method
     * Set the new X value of the point
     *
     * @param {Number} x the new value
     */
    setX: function (x) {
        this.x = x;
        this.adjustBoundary();

        return this;
    },

    /**
     * @method
     * Set the new Y value of the point
     *
     * @param {Number}y the new value
     */
    setY: function (y) {
        this.y = y;
        this.adjustBoundary();

        return this;
    },

    /**
     * @method
     * Set the new x/y coordinates of this point
     *
     * @param {Number|draw2d.geo.Point} x
     * @param {Number} [y]
     */
    setPosition: function (x, y) {
        if (x instanceof draw2d.geo.Point) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
        this.adjustBoundary();

        return this;
    },

    /**
     * @method
     * Calculates the relative position of the specified Point to this Point.
     *
     * @param {draw2d.geo.Point} p The reference Point
     * @return {draw2d.geo.PositionConstants} NORTH, SOUTH, EAST, or WEST, as defined in {@link draw2d.geo.PositionConstants}
     */
    getPosition: function (p) {
        var dx = p.x - this.x;
        var dy = p.y - this.y;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0)
                return draw2d.geo.PositionConstants.WEST;
            return draw2d.geo.PositionConstants.EAST;
        }
        if (dy < 0)
            return draw2d.geo.PositionConstants.NORTH;
        return draw2d.geo.PositionConstants.SOUTH;
    },

    /**
     * @method
     * Compares two points and return [true] if x and y are equals.
     *
     * @param {draw2d.geo.Point} p the point to compare with
     * @return boolean
     */
    equals: function (p) {
        return this.x === p.x && this.y === p.y;
    },

    /**
     * @method
     * Return the distance between this point and the hands over.
     *
     * @param {draw2d.geo.Point} other the point to use
     * @return {Number}
     */
    getDistance: function (other) {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    },

    /**
     * @method
     * Return the th of the vector from [0,0]
     *
     * @return {Number}
     * @since 2.10.0
     */
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    /**
     * @method
     * Return a new Point translated with the x/y values of the hands over point.
     *
     * @param {draw2d.geo.Point} other the offset to add for the new point.
     * @return {draw2d.geo.Point} The new translated point.
     */
    getTranslated: function (other) {
        return new draw2d.geo.Point(this.x + other.x, this.y + other.y);
    },

    /**
     * @method
     * Return a new Point scaled with the x/y values of the hands over point.
     *
     * @param {Number} factor the factor to scaled the new point.
     * @return {draw2d.geo.Point} The new translated point.
     */
    getScaled: function (factor) {
        return new draw2d.geo.Point(this.x * factor, this.y * factor);
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        return {
            x: this.x,
            y: this.y
        };
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function (memento) {
        this.x = memento.x;
        this.y = memento.y;
    },

    /**
     * @method
     * substract the given point and return the new point.
     *
     * @param that
     * @returns {draw2d.geo.Point}
     */
    subtract: function (that) {
        return new draw2d.geo.Point(this.x - that.x, this.y - that.y);
    },


    dot: function (that) {
        return this.x * that.x + this.y * that.y;
    },

    cross: function (that) {
        return this.x * that.y - this.y * that.x;
    },


    lerp: function (that, t) {
        return new draw2d.geo.Point(this.x + (that.x - this.x) * t, this.y + (that.y - this.y) * t);
    },


    /**
     * @method
     * Clone the Point and return them
     *
     * @returns
     */
    clone: function () {
        return new draw2d.geo.Point(this.x, this.y);
    }

});
/**
 * @class draw2d.geo.Rectangle
 *
 * Util class for geometrie handling.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.geo.Point
 */
draw2d.geo.Rectangle = draw2d.geo.Point.extend({

    NAME: "draw2d.geo.Rectangle",

    /**
     * @constructor
     * Creates a new Point object with the hands over coordinates.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    init: function (x, y, w, h) {
        this._super(x, y);
        this.w = w;
        this.h = h;
    },


    /**
     * @method
     * @private
     */
    adjustBoundary: function () {
        if (this.bx === null) {
            return;
        }
        this.x = Math.min(Math.max(this.bx, this.x), this.bw - this.w);
        this.y = Math.min(Math.max(this.by, this.y), this.bh - this.h);
        this.w = Math.min(this.w, this.bw);
        this.h = Math.min(this.h, this.bh);
    },

    /**
     * @method
     * Resizes this Rectangle by the values supplied as input and returns this for
     * convenience. This Rectangle's width will become this.width + dw. This
     * Rectangle's height will become this.height + dh.
     * <br>
     * The method return the object itself. This allows you to do command chaining, where
     * you can perform multiple methods on the same elements.
     *
     *
     * @param {Number} dw  Amount by which width is to be resized
     * @param {Number} dh  Amount by which height is to be resized
     *
     * @return  {draw2d.geo.Rectangle} The method return the object itself
     **/
    resize: function (/*:int*/ dw, /*:int*/ dh) {
        this.w += dw;
        this.h += dh;
        this.adjustBoundary();
        return this;
    },

    /**
     * @method
     * Scale this Rectangle by the values supplied as input and returns this for
     * convenience. This Rectangle's width will become this.width + dw. This
     * Rectangle's height will become this.height + dh. The top left corner moves
     * -dw/2, -dh/2
     * <br>
     * The method return the object itself. This allows you to do command chaining, where
     * you can perform multiple methods on the same elements.
     *
     *
     * @param {Number} dw  Amount by which width is to be resized
     * @param {Number} dh  Amount by which height is to be resized
     *
     * @return  {draw2d.geo.Rectangle} The method return the object itself
     **/
    scale: function (dw, dh) {

        this.w += (dw);
        this.h += (dh);
        this.x -= (dw / 2);
        this.y -= (dh / 2);
        this.adjustBoundary();
        return this;
    },

    /**
     * Sets the parameters of this Rectangle from the Rectangle passed in and
     * returns this for convenience.<br>
     * <br>
     * The method return the object itself. This allows you to do command chaining, where
     * you can perform multiple methods on the same elements.
     *
     * @param {draw2d.geo.Rectangle} Rectangle providing the bounding values
     *
     * @return  {draw2d.geo.Rectangle} The method return the object itself
     */
    setBounds: function (rect) {
        this.setPosition(rect.x, rect.y);

        this.w = rect.w;
        this.h = rect.h;

        return this;
    },

    /**
     * @method
     * Returns <code>true</code> if this Rectangle's width or height is less than or
     * equal to 0.
     *
     * @return {Boolean}
     */
    isEmpty: function () {
        return this.w <= 0 || this.h <= 0;
    },

    /**
     * @method
     * The width of the dimension element.
     *
     * @return {Number}
     **/
    getWidth: function () {
        return this.w;
    },

    /**
     * @method
     * Set the new width of the rectangle.
     *
     * @param {Number} w the new width of the rectangle
     */
    setWidth: function (w) {
        this.w = w;
        this.adjustBoundary();
        return this;
    },

    /**
     * @method
     * The height of the dimension element.
     *
     * @return {Number}
     **/
    getHeight: function () {
        return this.h;
    },
    /**
     * @method
     * Set the new height of the rectangle.
     *
     * @param {Number} h the new height of the rectangle
     */
    setHeight: function (h) {
        this.h = h;
        this.adjustBoundary();
        return this;
    },

    /**
     * @method
     * The x coordinate of the left corner.
     *
     * @return {Number}
     **/
    getLeft: function () {
        return this.x;
    },

    /**
     * @method
     * The x coordinate of the right corner.
     *
     * @return {Number}
     **/
    getRight: function () {
        return this.x + this.w;
    },

    /**
     * @method
     * The y coordinate of the top.
     *
     *@return {Number}
     **/
    getTop: function () {
        return this.y;
    },

    /**
     * @method
     * The y coordinate of the bottom.
     *
     *@return {Number}
     **/
    getBottom: function () {
        return this.y + this.h;
    },

    /**
     * @method
     * The top left corner of the dimension object.
     *
     * @return {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getTopLeft: function () {
        return new draw2d.geo.Point(this.x, this.y);
    },

    /**
     * @method
     * The top center coordinate of the dimension object.
     *
     * @return {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getTopCenter: function () {
        return new draw2d.geo.Point(this.x + (this.w / 2), this.y);
    },

    /**
     * @method
     * The top right corner of the dimension object.
     *
     * @return {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getTopRight: function () {
        return new draw2d.geo.Point(this.x + this.w, this.y);
    },

    /**
     * @method
     * The bottom left corner of the dimension object.
     *
     * @return {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getBottomLeft: function () {
        return new draw2d.geo.Point(this.x, this.y + this.h);
    },

    /**
     * @method
     * The bottom center coordinate of the dimension object.
     *
     * @return {draw2d.geo.Point} a new point objects which holds the coordinates
     **/
    getBottomCenter: function () {
        return new draw2d.geo.Point(this.x + (this.w / 2), this.y + this.h);
    },

    /**
     * @method
     * The center of the dimension object
     *
     * @return {draw2d.geo.Point} a new point which holds the center of the object
     **/
    getCenter: function () {
        return new draw2d.geo.Point(this.x + this.w / 2, this.y + this.h / 2);
    },


    /**
     * @method
     * Bottom right corner of the object
     *
     * @return {draw2d.geo.Point} a new point which holds the bottom right corner
     **/
    getBottomRight: function () {
        return new draw2d.geo.Point(this.x + this.w, this.y + this.h);
    },

    /**
     * @method
     * Return all points of the rectangle as array. Starting at topLeft and the
     * clockwise.
     *
     * @return {draw2d.util.ArrayList} the points starting at top/left and the clockwise
     */
    getVertices: function () {
        var result = new draw2d.util.ArrayList();
        result.add(this.getTopLeft());
        result.add(this.getTopRight());
        result.add(this.getBottomRight());
        result.add(this.getBottomLeft());

        return result;
    },
    /* @deprecated */
    getPoints: function () {
        return this.getVertices();
    },

    /**
     * @method
     * Return a new rectangle which fits into this rectangle. <b>ONLY</b> the x/y coordinates
     * will be changed. Not the dimension of the given rectangle.
     *
     * @param {draw2d.geo.Rectangle} rect the rectangle to adjust
     * @return the new shifted rectangle
     */
    moveInside: function (rect) {
        var newRect = new draw2d.geo.Rectangle(rect.x, rect.y, rect.w, rect.h);
        // shift the coordinate right/down if coordinate not inside the rect
        //
        newRect.x = Math.max(newRect.x, this.x);
        newRect.y = Math.max(newRect.y, this.y);

        // ensure that the right border is inside this rect (if possible).
        //
        if (newRect.w < this.w) {
            newRect.x = Math.min(newRect.x + newRect.w, this.x + this.w) - newRect.w;
        }
        else {
            newRect.x = this.x;
        }

        // ensure that the bottom is inside this rectangle
        //
        if (newRect.h < this.h) {
            newRect.y = Math.min(newRect.y + newRect.h, this.y + this.h) - newRect.h;
        }
        else {
            newRect.y = this.y;
        }

        return newRect;
    },

    /**
     * @method
     * Return the minimum distance of this rectangle to the given {@link draw2d.geo.Point} or
     * {link draw2d.geo.Rectangle}.
     *
     * @param {draw2d.geo.Point} pointOrRectangle the reference point/rectangle for the distance calculation
     */
    getDistance: function (pointOrRectangle) {
        var cx = this.x;
        var cy = this.y;
        var cw = this.w;
        var ch = this.h;

        var ox = pointOrRectangle.getX();
        var oy = pointOrRectangle.getY();
        var ow = 1;
        var oh = 1;

        if (pointOrRectangle instanceof draw2d.geo.Rectangle) {
            ow = pointOrRectangle.getWidth();
            oh = pointOrRectangle.getHeight();
        }
        var oct = 9;

        // Determin Octant
        //
        // 0 | 1 | 2
        // __|___|__
        // 7 | 9 | 3
        // __|___|__
        // 6 | 5 | 4

        if (cx + cw <= ox) {
            if ((cy + ch) <= oy) {
                oct = 0;
            }
            else if (cy >= (oy + oh)) {
                oct = 6;
            }
            else {
                oct = 7;
            }
        }
        else if (cx >= ox + ow) {
            if (cy + ch <= oy) {
                oct = 2;
            }
            else if (cy >= oy + oh) {
                oct = 4;
            }
            else {
                oct = 3;
            }
        }
        else if (cy + ch <= oy) {
            oct = 1;
        }
        else if (cy >= oy + oh) {
            oct = 5;
        }
        else {
            return 0;
        }


        // Determin Distance based on Quad
        //
        switch (oct) {
            case 0:
                cx = (cx + cw) - ox;
                cy = (cy + ch) - oy;
                return -(cx + cy);
            case 1:
                return -((cy + ch) - oy);
            case 2:
                cx = (ox + ow) - cx;
                cy = (cy + ch) - oy;
                return -(cx + cy);
            case 3:
                return -((ox + ow) - cx);
            case 4:
                cx = (ox + ow) - cx;
                cy = (oy + oh) - cy;
                return -(cx + cy);
            case 5:
                return -((oy + oh) - cy);
            case 6:
                cx = (cx + cw) - ox;
                cy = (oy + oh) - cy;
                return -(cx + cy);
            case 7:
                return -((cx + cw) - ox);
        }

        throw "Unknown data type of parameter for distance calculation in draw2d.geo.Rectangle.getDistnace(..)";
    },


    /**
     * @method
     * Determin the octant of r2 in relation to this rectangle.
     * <pre>
     *
     *    0 | 1 | 2
     *    __|___|__
     *    7 | 8 | 3
     *    __|___|__
     *    6 | 5 | 4
     * </pre>
     *
     * @param {draw2d.geo.Rectangle} r2
     *
     */
    determineOctant: function (r2) {

        var HISTERESE = 3; // Tolleranz um diese vermieden wird, dass der Octant "8" zur?�ckgegeben wird

        var ox = this.x + HISTERESE;
        var oy = this.y + HISTERESE;
        var ow = this.w - (HISTERESE * 2);
        var oh = this.h - (HISTERESE * 2);

        var cx = r2.x;
        var cy = r2.y;
        var cw = 2;
        var ch = 2;
        if (r2 instanceof draw2d.geo.Rectangle) {
            cw = r2.w;
            ch = r2.h;
        }

        var oct = 0;

        if (cx + cw <= ox) {
            if ((cy + ch) <= oy) {
                oct = 0;
            }
            else if (cy >= (oy + oh)) {
                oct = 6;
            }
            else {
                oct = 7;
            }
        }
        else if (cx >= ox + ow) {
            if (cy + ch <= oy) {
                oct = 2;
            }
            else if (cy >= oy + oh) {
                oct = 4;
            }
            else {
                oct = 3;
            }
        }
        else if (cy + ch <= oy) {
            oct = 1;
        }
        else if (cy >= oy + oh) {
            oct = 5;
        }
        else {
            oct = 8;
        }

        return oct;
    },


    /**
     * @method
     * Returns the direction the point <i>p</i> is in relation to the given rectangle.
     * Util method for inherit router implementations.
     *
     * <p>
     * Possible values:
     * <ul>
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     * </ul>
     * <p>
     *
     * @param {draw2d.geo.Point} p the point in relation to the given rectangle
     *
     * @return {Number} the direction from <i>r</i> to <i>p</i>
     */
    getDirection: function (other) {
        var current = this.getTopLeft();
        switch (this.determineOctant(other)) {
            case 0:
                if ((current.x - other.x) < (current.y - other.y))
                    return draw2d.geo.Rectangle.DIRECTION_UP;
                return draw2d.geo.Rectangle.DIRECTION_LEFT;
            case 1:
                return draw2d.geo.Rectangle.DIRECTION_UP;
            case 2:
                current = this.getTopRight();
                if ((other.x - current.x) < (current.y - other.y))
                    return draw2d.geo.Rectangle.DIRECTION_UP;
                return draw2d.geo.Rectangle.DIRECTION_RIGHT;
            case 3:
                return draw2d.geo.Rectangle.DIRECTION_RIGHT;
            case 4:
                current = this.getBottomRight();
                if ((other.x - current.x) < (other.y - current.y))
                    return draw2d.geo.Rectangle.DIRECTION_DOWN;
                return draw2d.geo.Rectangle.DIRECTION_RIGHT;
            case 5:
                return draw2d.geo.Rectangle.DIRECTION_DOWN;
            case 6:
                current = this.getBottomLeft();
                if ((current.x - other.x) < (other.y - current.y))
                    return draw2d.geo.Rectangle.DIRECTION_DOWN;
                return draw2d.geo.Rectangle.DIRECTION_LEFT;
            case 7:
                return draw2d.geo.Rectangle.DIRECTION_LEFT;
            case 8:
                if (other.y > this.y) {
                    return draw2d.geo.Rectangle.DIRECTION_DOWN;
                }
                return draw2d.geo.Rectangle.DIRECTION_UP;

        }
        return draw2d.geo.Rectangle.DIRECTION_UP;
    },


    /**
     * @method
     * Compares two rectangle objects
     *
     * @param {draw2d.geo.Rectangle} o
     * @return {Boolean}
     **/
    equals: function (o) {
        return this.x == o.x && this.y == o.y && this.w == o.w && this.h == o.h;
    },

    /**
     * @method
     * Detect whenever the hands over coordinate is inside the rectangle.
     *
     * @param {Number/draw2d.geo.Point} iX
     * @param {Number} iY
     * @returns {Boolean}
     */
    hitTest: function (iX, iY) {
        if (iX instanceof draw2d.geo.Point) {
            iY = iX.y;
            iX = iX.x;
        }
        var iX2 = this.x + this.getWidth();
        var iY2 = this.y + this.getHeight();
        return (iX >= this.x && iX <= iX2 && iY >= this.y && iY <= iY2);
    },

    /**
     * @method
     * return true if this rectangle inside the hand over rectangle
     *
     *
     * @param {draw2d.geo.Rectangle} rect
     * @returns {Boolean}
     */
    isInside: function (rect) {
        return rect.hitTest(this.getTopLeft())
            && rect.hitTest(this.getTopRight())
            && rect.hitTest(this.getBottomLeft())
            && rect.hitTest(this.getBottomRight());
    },

    /**
     * @method
     * return true if this rectangle contains the hand over rectangle.
     *
     *
     * @param {draw2d.geo.Rectangle} rect
     * @returns {Boolean}
     * @since 4.7.2
     */
    contains: function (rect) {
        return this.hitTest(rect.getTopLeft())
            && this.hitTest(rect.getTopRight())
            && this.hitTest(rect.getBottomLeft())
            && this.hitTest(rect.getBottomRight());
    },

    /**
     * @method
     * checks whenever the rectangles has an intersection.
     *
     * @param {draw2d.geo.Rectangle} rect
     * @returns {Boolean}
     */
    intersects: function (rect) {
        x11 = rect.x,
            y11 = rect.y,
            x12 = rect.x + rect.w,
            y12 = rect.y + rect.h,
            x21 = this.x,
            y21 = this.y,
            x22 = this.x + this.w,
            y22 = this.y + this.h;

        x_overlap = Math.max(0, Math.min(x12, x22) - Math.max(x11, x21));
        y_overlap = Math.max(0, Math.min(y12, y22) - Math.max(y11, y21));

        return x_overlap * y_overlap !== 0;
    },

    /**
     * @method
     * Merge this rectangle with the given one.
     *
     * @param {draw2d.geo.Rectangle} rect
     * @since 4.8.0
     */
    merge: function (rect) {
        var r = Math.max(rect.getRight(), this.getRight());
        var b = Math.max(rect.getBottom(), this.getBottom());

        this.setPosition(Math.min(this.x, rect.x), Math.min(this.y, rect.y));

        this.w = r - this.x;
        this.h = b - this.y;

        return this;
    },

    /**
     * @method
     * returns the intersection points with the given line if any exists
     *
     * @param {draw2d.geo.Point} start
     * @param {draw2d.geo.Point} end
     */
    intersectionWithLine: function (start, end) {
        var result = new draw2d.util.ArrayList();
        var v = this.getVertices();
        v.add(v.first());
        var p1 = v.first();
        var p2 = null;
        for (var i = 1; i < 5; i++) {
            p2 = v.get(i);
            p1 = draw2d.shape.basic.Line.intersection(start, end, p1, p2);
            if (p1 !== null) {
                result.add(p1);
            }
            p1 = p2;
        }
        return result;
    },

    /**
     * @method
     * converts the rectangle to JSON representation. required for the draw2d.io.Writer
     *
     * @returns {Object}
     */
    toJSON: function () {
        return {
            width: this.w,
            height: this.h,
            x: this.x,
            y: this.y
        };
    }


});

/**
 * ENUM for Direction
 */
draw2d.geo.Rectangle.DIRECTION_UP = 0;
draw2d.geo.Rectangle.DIRECTION_RIGHT = 1;
draw2d.geo.Rectangle.DIRECTION_DOWN = 2;
draw2d.geo.Rectangle.DIRECTION_LEFT = 3;


/**
 * @class draw2d.geo.Ray
 * A ray is a line starting in [0,0,] with some additional
 * helper functions required for some router.
 *
 * @inheritable
 * @extends draw2d.geo.Point
 * @author Andreas Herz
 */
draw2d.geo.Ray = draw2d.geo.Point.extend({

    NAME: "draw2d.geo.Ray",

    /**
     * @constructor
     * Creates a ray object.
     *
     * @param {Number} x
     * @param {Number} y
     */
    init: function (x, y) {
        this._super(x, y);
    },


    isHorizontal: function () {
        return this.x != 0;
    },

    similarity: function (otherRay) {
        return Math.abs(this.dot(otherRay));
    },

    getAveraged: function (otherRay) {
        return new draw2d.geo.Ray((this.x + otherRay.x) / 2, (this.y + otherRay.y) / 2);
    }

});


/**
 * @class draw2d.command.CommandType
 *
 * EditPolicies should determine an Figures editing capabilities.
 * It is possible to implement an Figure such that it handles all editing
 * responsibility.<br>
 * However, it is much more flexible and object-oriented to use
 * EditPolicies. Using policies, you can pick and choose the editing behavior for
 * an Figure without being bound to its class hierarchy. Code reuse is increased,
 * and code management is easier.
 *
 * @author Andreas Herz
 */
draw2d.command.CommandType = Class.extend({

    NAME: "draw2d.command.CommandType",

    /**
     * @constructor
     * Create a new edit policy object
     *
     * @param {String} policy
     */
    init: function (policy) {
        this.policy = policy;
    },

    /**
     * @method
     * Return the String representation of the policy
     *
     * @return {String}
     **/
    getPolicy: function () {
        return this.policy;
    }
});

draw2d.command.CommandType.DELETE = "DELETE";
draw2d.command.CommandType.MOVE = "MOVE";
draw2d.command.CommandType.CONNECT = "CONNECT";
draw2d.command.CommandType.MOVE_BASEPOINT = "MOVE_BASEPOINT";
draw2d.command.CommandType.MOVE_VERTEX = "MOVE_VERTEX";
draw2d.command.CommandType.MOVE_VERTICES = "MOVE_VERTICES";
draw2d.command.CommandType.MOVE_GHOST_VERTEX = "MOVE_GHOST_VERTEX";
draw2d.command.CommandType.RESIZE = "RESIZE";
draw2d.command.CommandType.RESET = "RESET";


/**
 * @class draw2d.command.Command
 *
 * Commands are passed around throughout editing. They are used to encapsulate and combine
 * changes to the application's model. An application has a single command stack. Commands must
 * be executed using the command stack rather than directly calling execute.
 * <br>
 * This is requried for a deneric support for the undo/redo concept within draw2d.<br>
 *
 * @inheritable
 * @author Andreas Herz
 */
draw2d.command.Command = Class.extend({

    NAME: "draw2d.command.Command",

    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {String} label
     */
    init: function (label) {
        this.label = label;
    },


    /**
     * @method
     * Returns a label of the Command. e.g. "move figure".
     *
     * @return {String} the label for this command
     **/
    getLabel: function () {
        return this.label;
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. The execution of this Command doesn't modify the model.
     *
     * @return {boolean} return try if the command modify the model or make any relevant changes
     **/
    canExecute: function () {
        return true;
    },

    /**
     * @method
     * Execute the command the first time.
     * Sup-classes must implement this method.
     *
     * @template
     **/
    execute: function () {
    },

    /**
     * @method
     * Will be called if the user cancel the operation.
     *
     * @template
     **/
    cancel: function () {
    },

    /**
     * @method
     * Undo the command.
     * Sup-classes must implement this method.
     *
     * @template
     **/
    undo: function () {
    },

    /**
     * @method
     * Redo the command after the user has undo this command.
     * Sup-classes must implement this method.
     *
     * @template
     **/
    redo: function () {
    }
});


/**
 * @class draw2d.command.CommandCollection
 *
 * A CommandCollection works as a single command. You can add more than one
 * Command to this CommandCollection and execute/undo them onto the CommandStack as a
 * single Command.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandCollection = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandCollection",

    /**
     * @constructor
     * Create a new CommandConnect objects which can be execute via the CommandStack.
     *
     * @param {String} commandLabel the label to show on the command stack for the undo/redo operation
     */
    init: function (commandLabel) {
        this._super((typeof commandLabel === 'undefined') ? draw2d.Configuration.i18n.command.collection : commandLabel);

        this.commands = new draw2d.util.ArrayList();
    },

    /**
     * @method
     * Returns a label of the Command. e.g. "move figure".
     *
     * @return {String} the label for this command
     **/
    getLabel: function () {
        //return the label of the one and only command
        //
        if (this.commands.getSize() === 1) {
            return this.commands.first().getLabel();
        }

        // return a common label if all commands have the same label.
        //
        if (this.commands.getSize() > 1) {
            var labels = this.commands.clone().map(function (e) {
                return e.getLabel();
            });
            labels.unique();
            if (labels.getSize() === 1) {
                return labels.first();
            }
        }

        // return the all purpose label.
        return this._super();
    },


    /**
     * @method
     * Add a command to the collection.
     *
     * @param {draw2d.command.Command} command
     */
    add: function (command) {
        this.commands.add(command);
    },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. The execution of this Command doesn't modify the model.
     *
     * @return boolean
     **/
    canExecute: function () {
        // We ask all cmd's if they make any changes.
        // Keep in mind: the command will be execute if at least ONE command return [true]!!!!
        // doesn't matter if the other commands return [false].
        // The method should be renamed into: modifiesTheModel()....design flaw.
        var canExec = false;
        this.commands.each(function (i, cmd) {
            canExec = canExec || cmd.canExecute();
        });
        return canExec;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.commands.each(function (i, cmd) {
            cmd.execute();
        });
    },

    /**
     * @method
     * Redo the command after the user has undo this command.
     *
     **/
    redo: function () {
        this.commands.each(function (i, cmd) {
            cmd.redo();
        });
    },

    /**
     * @method
     * Undo the command.
     *
     **/
    undo: function () {
        // execute the undo operation in reverse direction.

        this.commands.reverse();
        this.commands.each(function (i, cmd) {
            cmd.undo();
        });
        this.commands.reverse();
    }
});


/**
 * @class draw2d.command.CommandStack
 * Stack for undo/redo operations
 */
draw2d.command.CommandStack = Class.extend({
    NAME: "draw2d.command.CommandStack",


    /**
     * @constructor
     * Create a new CommandStack objects which can be execute via the CommandStack.
     *
     */
    init: function () {
        this.undostack = [];
        this.redostack = [];
        this.maxundo = 50;
        this.transactionCommand = null;
        this.eventListeners = new draw2d.util.ArrayList();
    },


    /**
     * @method
     * Set the maximal undo stack size. Entries will be remove if the max. stack
     * size has been reached.
     *
     * @param {Number} count The maximal undo stack size.
     *
     **/
    setUndoLimit: function (count) {
        this.maxundo = count;

        return this;
    },

    /**
     * @method
     * Remove the undo / redo history. This is useful if the user has been save the
     * document.
     *
     **/
    markSaveLocation: function () {
        this.undostack = [];
        this.redostack = [];

        // fire an empty command to inform all listener that the stack has been changed
        this.notifyListeners(new draw2d.command.Command(), draw2d.command.CommandStack.POST_EXECUTE);

        return this;
    },

    /**
     * @method
     *
     * Executes the specified Command if possible. Prior to executing the command, a
     * draw2d.command.CommandStackEvent for {@link #PRE_EXECUTE} will be fired to event listeners.
     * Similarly, after attempting to execute the command, an event for {@link #POST_EXECUTE}
     * will be fired.
     *
     * @param {draw2d.command.Command} command The command to execute.
     *
     **/
    execute: function (command) {
        if (typeof command === "undefined")
            throw "Missing parameter [command] for method call CommandStack.execute";

        // nothing to do
        if (command === null)
            return; //silently

        // return if the command can't execute or it doesn't change the model
        // => Empty command
        if (command.canExecute() === false)
            return;

        // A command stack transaction is open.
        // The execution will be postpone until the transaction will commit
        //
        if (this.transactionCommand !== null) {
            this.transactionCommand.add(command);
            return;
        }

        this.notifyListeners(command, draw2d.command.CommandStack.PRE_EXECUTE);

        this.undostack.push(command);
        command.execute();

        // cleanup the redo stack if the user execute a new command.
        // I think this will create a "clean" behaviour of the unde/redo mechanism.
        //
        this.redostack = [];

        // monitor only the max. undo stack size
        //
        if (this.undostack.length > this.maxundo) {
            this.undostack = this.undostack.slice(this.undostack.length - this.maxundo);
        }
        this.notifyListeners(command, draw2d.command.CommandStack.POST_EXECUTE);

        return this;
    },

    /**
     * @method
     * Opens a transaction for further multiple commands. If you execute a command all
     * {@ #execute} calls will be ignored until you commit the current transaction.
     *
     * @param {String} commandLabel the label to show for the undo/redo operation
     *
     * @since 4.0.0
     */
    startTransaction: function (commandLabel) {
        this.transactionCommand = new draw2d.command.CommandCollection(commandLabel);

        return this;
    },

    /**
     * @method
     * Commit the running transaction. All commands between the start/end of a transaction
     * can be undo/redo in a single step.
     *
     * @since 4.0.0
     */
    commitTransaction: function () {
        if (this.transactionCommand === null) {
            return;//silently
        }

        var cmd = this.transactionCommand;
        this.transactionCommand = null;
        // we can drop the CommandCollection if the collection contains only one command.
        if (cmd.commands.getSize() === 1) {
            this.execute(cmd.commands.first());
        }
        else {
            this.execute(cmd);
        }

        return this;
    },

    /**
     * @method
     * Undo on command from the stack and store them on the redo command stack.
     *
     **/
    undo: function () {
        var command = this.undostack.pop();
        if (command) {
            this.notifyListeners(command, draw2d.command.CommandStack.PRE_UNDO);
            this.redostack.push(command);
            command.undo();
            this.notifyListeners(command, draw2d.command.CommandStack.POST_UNDO);
        }

        return this;
    },

    /**
     * @method
     * Redo a command after the user has undo a command
     *
     **/
    redo: function () {
        var command = this.redostack.pop();

        if (command) {
            this.notifyListeners(command, draw2d.command.CommandStack.PRE_REDO);
            this.undostack.push(command);
            command.redo();
            this.notifyListeners(command, draw2d.command.CommandStack.POST_REDO);
        }

        return this;
    },

    /**
     * @method
     * Return the label of the next REDO command.
     *
     * @return {String}
     **/
    getRedoLabel: function () {
        if (this.redostack.length === 0)
            return "";

        var command = this.redostack[this.redostack.length - 1];

        if (command) {
            return command.getLabel();
        }
        return "";
    },


    /**
     * @method
     * Return the label of the next UNDO command.
     *
     * @return {String}
     **/
    getUndoLabel: function () {
        if (this.undostack.length === 0)
            return "";

        var command = this.undostack[this.undostack.length - 1];

        if (command) {
            return command.getLabel();
        }
        return "";
    },


    /**
     * @method
     * Indicates whenever a REDO is possible.
     *
     * @return boolean <code>true</code> if it is appropriate to call {@link #redo()}.
     */
    canRedo: function () {
        return this.redostack.length > 0;
    },

    /**
     * @method
     * indicator whenever a undo is possible.
     *
     * @return {boolean} <code>true</code> if {@link #undo()} can be called
     **/
    canUndo: function () {
        return this.undostack.length > 0;
    },

    /**
     * @method
     * Adds a listener to the command stack, which will be notified whenever a command has been processed on the stack.
     *
     * @param {draw2d.command.CommandStackEventListener} listener the listener to add.
     */
    addEventListener: function (listener) {
        if (listener instanceof draw2d.command.CommandStackEventListener) {
            this.eventListeners.add(listener);
        }
        else if (typeof listener.stackChanged === "function") {
            this.eventListeners.add(listener);
        }
        else if (typeof listener === "function") {
            this.eventListeners.add({stackChanged: listener});
        }
        else {
            throw "Object doesn't implement required callback interface [draw2d.command.CommandStackListener]";
        }

        return this;
    },

    /**
     * @method
     * Removes a listener from the command stack.
     *
     * @param {draw2d.command.CommandStackEventListener} listener the listener to remove.
     */
    removeEventListener: function (listener) {
        for (var i = 0; i < size; i++) {
            var entry = this.eventListeners.get(i);
            if (entry === listener || entry.stackChanged === listener) {
                this.eventListeners.remove(entry);
                return;
            }
        }

        return this;
    },

    /**
     * @method
     * Notifies command stack event listeners that the command stack has changed to the
     * specified state.
     *
     * @param {draw2d.command.Command} command the command
     * @param {Number} state the current stack state
     *
     **/
    notifyListeners: function (command, state) {
        var event = new draw2d.command.CommandStackEvent(this, command, state);
        var size = this.eventListeners.getSize();

        for (var i = 0; i < size; i++) {
            this.eventListeners.get(i).stackChanged(event);
        }
    }
});


/** Constant indicating notification prior to executing a command (value is 1).*/
draw2d.command.CommandStack.PRE_EXECUTE = 1;
/** Constant indicating notification prior to redoing a command (value is 2).*/
draw2d.command.CommandStack.PRE_REDO = 2;
/** Constant indicating notification prior to undoing a command (value is 4).*/
draw2d.command.CommandStack.PRE_UNDO = 4;
/**  Constant indicating notification after a command has been executed (value is 8).*/
draw2d.command.CommandStack.POST_EXECUTE = 8;
/** Constant indicating notification after a command has been redone (value is 16).*/
draw2d.command.CommandStack.POST_REDO = 16;
/** Constant indicating notification after a command has been undone (value is 32).*/
draw2d.command.CommandStack.POST_UNDO = 32;
/** Constant indicating notification after the stack has been (re)init (value is 64).*/
draw2d.command.CommandStack.POST_INIT = 64;

draw2d.command.CommandStack.POST_MASK = draw2d.command.CommandStack.POST_EXECUTE | draw2d.command.CommandStack.POST_UNDO | draw2d.command.CommandStack.POST_REDO;
draw2d.command.CommandStack.PRE_MASK = draw2d.command.CommandStack.PRE_EXECUTE | draw2d.command.CommandStack.PRE_UNDO | draw2d.command.CommandStack.PRE_REDO;


/**
 * @class draw2d.command.CommandStackEvent
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 */
draw2d.command.CommandStackEvent = Class.extend({
    NAME: "draw2d.command.CommandStackEvent",

    /**
     * @constructor
     * Create a new CommandStack objects which can be execute via the CommandStack.
     * @param {draw2d.command.Command} command the related command
     * @param {Number} details the current state of the command execution
     *
     */
    init: function (stack, command, details) {
        this.stack = stack;
        this.command = command;
        this.details = details;
    },


    /**
     * @method
     * Return the corresponding stack of the event.
     *
     * @return {draw2d.command.CommandStack}
     **/
    getStack: function () {
        return this.stack;
    },


    /**
     * @method
     * Returns null or a Command if a command is relevant to the current event.
     *
     * @return {draw2d.command.Command}
     **/
    getCommand: function () {
        return this.command;
    },

    /**
     * @method
     * Returns an integer identifying the type of event which has occurred.
     * Defined by {@link draw2d.command.CommandStack}.
     *
     * @return {Number}
     **/
    getDetails: function () {
        return this.details;
    },


    /**
     * @method
     * Returns true if this event is fired after the stack having changed.
     *
     * @return {boolean} true if post-change event
     **/
    isPostChangeEvent: function () {
        return 0 != (this.getDetails() & draw2d.command.CommandStack.POST_MASK);
    },

    /**
     * @method
     * Returns true if this event is fired prior to the stack changing.
     *
     * @return {boolean} true if pre-change event
     **/
    isPreChangeEvent: function () {
        return 0 != (this.getDetails() & draw2d.command.CommandStack.PRE_MASK);
    }
});

/**
 * @class draw2d.command.CommandStackEventListener
 *
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 * @author Andreas Herz
 */
draw2d.command.CommandStackEventListener = Class.extend({
    NAME: "draw2d.command.CommandStackEventListener",

    /**
     * @constructor
     * Creates a new Listener Object
     *
     */
    init: function () {
    },

    /**
     * @method
     * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
     * can be used to identify the type of event which has occurred.
     *
     * @template
     *
     * @param {draw2d.command.CommandStackEvent} event
     **/
    stackChanged: function (event) {
    }

});


/**
 * @class draw2d.command.CommandMove
 *
 * Command for the movement of figures.
 *
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandMove = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandMove",

    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to move
     * @param {Number} [x] the current x position
     * @param {Number} [y] the current y position
     */
    init: function (figure, x, y) {
        this._super(draw2d.Configuration.i18n.command.moveShape);
        this.figure = figure;
        if (typeof x === "undefined") {
            this.oldX = figure.getX();
            this.oldY = figure.getY();
        }
        else {
            this.oldX = x;
            this.oldY = y;
        }
    },


    /**
     * @method
     * Set the initial position of the element
     *
     * @param {Number} x the new initial x position
     * @param {Number} y the new initial y position
     **/
    setStartPosition: function (x, y) {
        this.oldX = x;
        this.oldY = y;
    },

    /**
     * @method
     * Set the target/final position of the figure move command.
     *
     * @param {Number} x the new x position
     * @param {Number} y the new y position
     **/
    setPosition: function (x, y) {
        this.newX = x;
        this.newY = y;
    },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return this.newX != this.oldX || this.newY != this.oldY;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function () {
        this.figure.setPosition(this.oldX, this.oldY);
    },

    /**
     * @method
     *
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function () {
        this.figure.setPosition(this.newX, this.newY);
    }
});

/**
 * @class draw2d.command.CommandMoveLine
 *
 * Command for the movement of figures.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandMoveLine = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandMoveLine",

    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to move
     */
    init: function (figure) {
        this._super(draw2d.Configuration.i18n.command.moveLine);
        this.line = figure;
        this.dx = 0;
        this.dy = 0;
    },

    /**
     * @method
     * set the offset of the line translation
     *
     * @param {Number} dx
     * @param {Number} dy
     */
    setTranslation: function (dx, dy) {
        this.dx = dx;
        this.dy = dy;
    },

    /**
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @type boolean
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return this.dx !== 0 && this.dy !== 0;
    },

    /**
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * Undo the command
     *
     **/
    undo: function () {
        var _this = this;
        this.line.getVertices().each(function (i, e) {
            e.translate(-_this.dx, -_this.dy);
        });
        this.line.svgPathString = null;
        // required to update resize handles and the painting of the line
        this.line.setPosition(this.line.getStartPoint());
    },

    /**
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        var _this = this;
        this.line.getVertices().each(function (i, e) {
            e.translate(_this.dx, _this.dy);
        });
        this.line.svgPathString = null;

        // required to update resize handles and the painting of the line
        this.line.setPosition(this.line.getStartPoint());
    }
});

/**
 * @class draw2d.command.CommandMoveVertex
 *
 * Command for the vertex movement of a polyline/polygon.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandMoveVertex = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandMoveVertex",

    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.shape.basic.PolyLine} line the related line
     */
    init: function (line) {
        this._super(draw2d.Configuration.i18n.command.moveVertex);

        this.line = line;
        this.index = -1;
        this.newPoint = null;
    },


    /**
     * @method
     * Set the index of the vertex of the polyline/polygon to modify.
     *
     * @param {Number} index the related index of the vertex
     **/
    setIndex: function (index) {
        this.index = index;
        this.origPoint = this.line.getVertices().get(this.index).clone();
    },

    updatePosition: function (x, y) {
        this.newPoint = new draw2d.geo.Point(x, y);
    },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return this.index !== -1 && this.newPoint !== null;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function () {
        this.line.setVertex(this.index, this.origPoint.x, this.origPoint.y);
    },

    /**
     * @method
     *
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function () {
        this.line.setVertex(this.index, this.newPoint.x, this.newPoint.y);
    }
});

/**
 * @class draw2d.command.CommandMoveVertices
 *
 * Command for the vertices movement of a polyline/polygon.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandMoveVertices = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandMoveVertices",

    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.shape.basic.PolyLine} line the related line
     */
    init: function (line) {
        this._super(draw2d.Configuration.i18n.command.moveVertices);

        this.line = line;
        this.oldVertices = line.getVertices().clone();
        this.newVertices = null;
    },


    updateVertices: function (newVertices) {
        this.newVertices = newVertices;
    },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return this.newVertices !== null;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function () {
        this.line.setVertices(this.oldVertices);
    },

    /**
     * @method
     *
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function () {
        this.line.setVertices(this.newVertices);
    }
});

/**
 * @class draw2d.command.CommandResize
 * Resize command for figures. Can be execute/undo/redo via a CommandStack.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.command.Command
 */
draw2d.command.CommandResize = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandResize",

    /**
     * @constructor
     * Create a new resize Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to resize
     * @param {Number} [width] the current width
     * @param {Number} [height] the current height
     */
    init: function (figure, width, height) {
        this._super(draw2d.Configuration.i18n.command.resizeShape);
        this.figure = figure;

        if (typeof width === "undefined") {
            this.oldWidth = figure.getWidth();
            this.oldHeight = figure.getHeight();
        }
        else {
            this.oldWidth = width;
            this.oldHeight = height;
        }
    },

    /**
     * @method
     * Set the new dimension of the element.
     *
     * @param {Number} width the new width.
     * @param {Number} height the new height of the element.
     **/
    setDimension: function (width, height) {
        this.newWidth = width | 0;
        this.newHeight = height | 0;
    },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return this.newWidth != this.oldWidth || this.newHeight != this.oldHeight;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        this.figure.setDimension(this.oldWidth, this.oldHeight);
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        this.figure.setDimension(this.newWidth, this.newHeight);
    }
});

/**
 * @class draw2d.command.CommandRotate
 *
 * Set the rotation angle of the given figure
 *
 * @since 4.4.1
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.command.Command
 */
draw2d.command.CommandRotate = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandRotate",

    /**
     * @constructor
     * Create a new resize Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to resize
     * @param {Number} [width] the current width
     * @param {Number} [height] the current height
     */
    init: function (figure, angle) {
        this._super(draw2d.Configuration.i18n.command.rotateShape);
        this.figure = figure;

        this.oldAngle = figure.getRotationAngle();
        this.newAngle = angle;
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return this.oldAngle != this.newAngle;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        this.rotate(this.oldAngle);
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function (angle) {
        this.rotate(this.newAngle)
    },

    rotate: function (angle) {
        var w = this.figure.getWidth();
        var h = this.figure.getHeight();

        this.figure.setRotationAngle(angle);

        this.figure.setDimension(h, w);

        this.figure.portRelayoutRequired = true;
    }
});

/**
 * @class draw2d.command.CommandConnect
 *
 * Connects two ports with a connection.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandConnect = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandConnect",

    /**
     * @constructor
     * Create a new CommandConnect objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Canvas} canvas the canvas to user
     * @param {draw2d.Port} source the source port for the connection to create
     * @param {draw2d.Port} target the target port for the connection to create
     * @param {draw2d.Port} [dropTarget] the port who has initiate the connection creation. mainly the drop target
     */
    init: function (canvas, source, target, dropTarget) {
        this._super(draw2d.Configuration.i18n.command.connectPorts);
        this.canvas = canvas;
        this.source = source;
        this.target = target;
        this.connection = null;
        this.dropTarget = dropTarget; // optional
    },

    setConnection: function (connection) {
        this.connection = connection;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        var optionalCallback = $.proxy(function (conn) {
            this.connection = conn;
            this.connection.setSource(this.source);
            this.connection.setTarget(this.target);
            this.canvas.add(this.connection);
        }, this);

        // the createConnection must return either a connection or "undefined". If the method return "undefined"
        // the asynch callback must be called. Usefull if the createConnection shows a selection dialog
        //
        if (this.connection === null) {
            var result = draw2d.Connection.createConnection(this.source, this.target, optionalCallback, this.dropTarget);
            // well be handeld by the optional callback
            if (typeof result === "undefined") {
                return;
            }

            this.connection = result;
        }

        optionalCallback(this.connection);
    },

    /**
     * @method
     * Redo the command after the user has undo this command.
     *
     **/
    redo: function () {
        this.canvas.add(this.connection);
        this.connection.reconnect();
    },

    /**
     * @method
     * Undo the command.
     *
     **/
    undo: function () {
        this.canvas.remove(this.connection);
    }
});


/**
 * @class draw2d.command.CommandReconnect
 *
 * Reconnects two ports. This command is used during the DragDrop operation of a draw2d.Connection.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandReconnect = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandReconnect",


    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Connection} con the related Connection which is currently in the drag&drop operation
     */
    init: function (con) {
        this._super(draw2d.Configuration.i18n.command.connectPorts);
        this.con = con;
        this.oldSourcePort = con.getSource();
        this.oldTargetPort = con.getTarget();
//      this.oldRouter      = con.getRouter();
    },

    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return true;
    },

    /**
     * @method
     * The new ports to use during the execute of this command.
     *
     * @param {draw2d.Port} source
     * @param {draw2d.Port} target
     */
    setNewPorts: function (source, target) {
        this.newSourcePort = source;
        this.newTargetPort = target;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    cancel: function () {
        this.con.setSource(this.oldSourcePort);
        this.con.setTarget(this.oldTargetPort);

        // force a routing of the connection and DON'T set the old reouter again because this reset all manual added
        // vertices
        this.con.routingRequired = true;
        this.con.repaint();

//       this.con.setRouter(this.oldRouter);
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        this.con.setSource(this.oldSourcePort);
        this.con.setTarget(this.oldTargetPort);
        // force a routing of the connection and DON'T set the old reouter again because this reset all manual added
        // vertices
        this.con.routingRequired = true;
        this.con.repaint();
//      this.con.setRouter(this.oldRouter);
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        this.con.setSource(this.newSourcePort);
        this.con.setTarget(this.newTargetPort);
        // force a routing of the connection and DON'T set the old reouter again because this reset all manual added
        // vertices
        this.con.routingRequired = true;
        this.con.repaint();
//      this.con.setRouter(this.oldRouter);
    }

});


/**
 * @class draw2d.command.CommandDelete
 * Command to remove a figure with CommandStack support.
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandDelete = draw2d.command.Command.extend({

    /**
     * @constructor
     * Create a delete command for the given figure.
     *
     * @param {draw2d.Figure} figure
     */
    init: function (figure) {
        this._super(draw2d.Configuration.i18n.command.deleteShape);

        this.parent = figure.getParent();
        this.figure = figure;
        this.canvas = figure.getCanvas();
        this.connections = null;
        this.removedParentEntry = null; // can be null if the figure didn't ave any parent shape assigned
        this.indexOfChild = -1;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        if (this.parent !== null) {
            this.parent.add(this.removedParentEntry.figure, this.removedParentEntry.locator, this.indexOfChild);
            this.canvas.setCurrentSelection(this.parent);
        }
        else {
            this.canvas.add(this.figure);
            this.canvas.setCurrentSelection(this.figure);
        }

        if (this.figure instanceof draw2d.Connection) {
            this.figure.reconnect();
        }


        for (var i = 0; i < this.connections.getSize(); ++i) {
            this.canvas.add(this.connections.get(i));
            this.connections.get(i).reconnect();
        }
    },

    /**
     * @method
     *
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        this.canvas.setCurrentSelection(null);

        // Collect all connections that are bounded to the figure to delete. This connections
        // must be deleted too.
        //
        if (this.connections === null) {
            if (this.figure instanceof draw2d.shape.node.Node) {
                this.connections = this.figure.getConnections();
            }
            else {
                this.connections = new draw2d.util.ArrayList();
            }
        }


        if (this.figure instanceof draw2d.Connection) {
            this.figure.disconnect();
        }

        // remove this figure from the parent
        //
        if (this.parent !== null) {
            // determine the index of the child before remove
            this.indexOfChild = this.parent.getChildren().indexOf(this.figure);
            this.removedParentEntry = this.parent.remove(this.figure);
        }
        // or from the canvas
        else {
            this.canvas.remove(this.figure);
        }

        for (var i = 0; i < this.connections.getSize(); ++i) {
            this.canvas.remove(this.connections.get(i));
        }
    }
});

/**
 * @class draw2d.command.CommandAdd
 *
 * Command to add a figure with CommandStack support.
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandAdd = draw2d.command.Command.extend({

    /**
     * @constructor
     * Create a add command for the given figure.
     *
     * @param {draw2d.Canvas} canvas the canvas to use
     * @param {draw2d.Figure} figure the figure to add
     * @param {Number|draw2d.geo.Point} x the x-coordinate or a complete point where to place the figure
     * @param {Number} [y] the y-coordinate if x is a number and not a complete point
     */
    init: function (canvas, figure, x, y) {
        this._super(draw2d.Configuration.i18n.command.addShape);
        this.figure = figure;
        this.canvas = canvas;
        this.pos = new draw2d.geo.Point(x, y);
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.canvas.add(this.figure, this.pos.x, this.pos.y);
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        this.execute();
        this.figure.repaint();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        this.canvas.remove(this.figure);
    }

});

/**
 * @class draw2d.command.CommandGroup
 * Command to group a given set of figures
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandGroup = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandGroup",

    /**
     * @constructor
     * Create a group command for the given figure.
     *
     * @param {draw2d.util.ArrayList} figures the figures to group
     */
    init: function (canvas, figures) {
        this._super(draw2d.Configuration.i18n.command.groupShapes);
        if (figures instanceof draw2d.Selection) {
            this.figures = figures.getAll();
        }
        else {
            this.figures = figures;
        }

        // figures which already part of an non "Group" composite are removed from the set.
        // It is not possible to assign a figure to two different composite
        //
        this.figures.grep(function (figure) {
            return figure.getComposite() === null;
        });

        this.canvas = canvas;
        this.group = new draw2d.shape.composite.Group();
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. The execution of this Command doesn't modify the model.
     *
     * @return {boolean} return try if the command modify the model or make any relevant changes
     **/
    canExecute: function () {
        return !this.figures.isEmpty();
    },


    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        var _this = this;
        this.figures.each(function (i, figure) {
            _this.group.unassignFigure(figure);
        });

        this.canvas.remove(this.group);
        this.canvas.setCurrentSelection(this.figures);
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        var _this = this;
        this.figures.each(function (i, figure) {
            _this.group.assignFigure(figure);
        });

        this.canvas.add(this.group);
        this.canvas.setCurrentSelection(this.group);
    }
});

/**
 * @class draw2d.command.CommandUngroup
 * Command to ungroup a given group figures
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandUngroup = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandUngroup",

    /**
     * @constructor
     * Create a group command for the given figure.
     *
     * @param {draw2d.util.ArrayList} figures the figures to group
     */
    init: function (canvas, group) {
        this._super(draw2d.Configuration.i18n.command.ungroupShapes);
        if (group instanceof draw2d.Selection) {
            this.group = group.getAll().first();
        }
        else {
            this.group = group;
        }

        this.canvas = canvas;
        this.figures = this.group.getAssignedFigures().clone();
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
     * return false. The execution of this Command doesn't modify the model.
     *
     * @return {boolean} return try if the command modify the model or make any relevant changes
     **/
    canExecute: function () {
        return !this.figures.isEmpty();
    },


    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        var _this = this;
        this.figures.each(function (i, figure) {
            _this.group.assignFigure(figure);
        });
        this.canvas.add(this.group);
        this.canvas.setCurrentSelection(this.group);
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        var _this = this;
        this.figures.each(function (i, figure) {
            _this.group.unassignFigure(figure);
        });

        this.canvas.setCurrentSelection(this.figures);
        this.canvas.remove(this.group);
    }
});

/**
 * @class draw2d.command.CommandAddVertex
 *
 * Add a vertex to a polyline or polygon
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandAddVertex = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandAddVertex",

    /**
     * @constructor
     * Create a new Command objects which add a vertex to a PolyLine / Polygon.
     *
     * @param {draw2d.shape.basic.PolyLine} line the related line
     * @param {Number} index the index where to add
     * @param {Number} x the x coordinate for the new vertex
     * @param {Number} y the y coordinate for the new vertex
     */
    init: function (line, index, x, y) {
        this._super(draw2d.Configuration.i18n.command.addVertex);

        this.line = line;
        this.index = index;
        this.newPoint = new draw2d.geo.Point(x, y);
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return true;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function () {
        this.line.removeVertexAt(this.index);
    },

    /**
     * @method
     *
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function () {
        this.line.insertVertexAt(this.index, this.newPoint.x, this.newPoint.y);
    }
});

/**
 * @class draw2d.command.CommandAssignFigure
 *
 * Assign a figure to a compiste
 *
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 * @since 4.9.0
 */
draw2d.command.CommandAssignFigure = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandAssignFigure",

    /**
     * @constructor
     * Create a new Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to assign
     * @param {draw2d.Figure} composite the composite where the figure should assign
     */
    init: function (figure, composite) {
        this._super(draw2d.Configuration.i18n.command.assignShape);

        this.figure = figure;
        this.composite = composite;
        this.assignedConnections = new draw2d.util.ArrayList();
        this.isNode = this.figure instanceof draw2d.shape.node.Node;
        this.oldBoundingBox = composite.getBoundingBox();
        this.newBoundingBox = null; // see execute/redo
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return true;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.composite.assignFigure(this.figure);
        this.newBoundingBox = this.composite.getBoundingBox();

        // get all connections of the shape and check if source/target node
        // part of the composite. In this case the connection will be part of
        // the composite as well
        if (this.isNode === true) {
            var connections = this.figure.getConnections();
            var _this = this;
            connections.each(function (i, connection) {
                if (connection.getSource().getParent().getComposite() === _this.composite && connection.getTarget().getParent().getComposite() === _this.composite) {
                    if (connection.getComposite() !== _this.composite) {
                        _this.assignedConnections.add({
                            oldComposite: connection.getComposite(),
                            connection: connection
                        });
                        _this.composite.assignFigure(connection);
                    }
                }
            });
        }
    },

    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function () {
        this.composite.unassignFigure(this.figure);
        this.assignedConnections.each(function (i, entry) {
            if (entry.oldComposite !== null) {
                entry.oldComposite.assignFigure(entry.connection);
            }
            else {
                entry.connection.getComposite().unassignFigure(entry.connection);
            }
        });
        this.composite.stickFigures = true;
        this.composite.setBoundingBox(this.oldBoundingBox);
        this.composite.stickFigures = false;
    },

    /**
     * @method
     *
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function () {
        this.composite.setBoundingBox(this.oldBoundingBox);
        this.composite.assignFigure(this.figure);
        var _this = this;
        this.assignedConnections.each(function (i, entry) {
            _this.composite.assignFigure(entry.connection);
        });
    }
});


/**
 * @class draw2d.command.CommandBoundingBox
 * Set the bounding box of a figure with undo/redo support
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.command.Command
 */
draw2d.command.CommandBoundingBox = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandResize",

    /**
     * @constructor
     * Create a new resize Command objects which can be execute via the CommandStack.
     *
     * @param {draw2d.Figure} figure the figure to resize
     * @param {draw2d.geo.Rectangle} boundingBox the new bounding box of the figure
     */
    init: function (figure, boundingBox) {
        this._super(draw2d.Configuration.i18n.command.resizeShape);
        this.figure = figure;
        this.oldBoundingBox = this.figure.getBoundingBox();
        this.newBoundingBox = boundingBox;
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return !this.oldBoundingBox.equals(this.newBoundingBox);
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     * Undo the command
     *
     **/
    undo: function () {
        this.figure.setBoundingBox(this.oldBoundingBox);
    },

    /**
     * @method
     * Redo the command after the user has undo this command
     *
     **/
    redo: function () {
        this.figure.setBoundingBox(this.newBoundingBox);
    }
});

/**
 * @class draw2d.command.CommandRemoveVertex
 *
 * Remove a vertex from a polyline or polygon
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandRemoveVertex = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandRemoveVertex",

    /**
     * @constructor
     * Create a new Command objects which add a vertex to a PloyLine.
     *
     * @param {draw2d.shape.basic.PolyLine} line the related line
     * @param {Number} index the index where to add
     * @param {Number} x the x coordinate for the new vertex
     * @param {Number} y the y coordinate for the new vertex
     */
    init: function (line, index) {
        this._super(draw2d.Configuration.i18n.command.deleteVertex);

        this.line = line;
        this.index = index;
        this.oldPoint = line.getVertices().get(index).clone();
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return true;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function () {
        this.line.insertVertexAt(this.index, this.oldPoint.x, this.oldPoint.y);
    },

    /**
     * @method
     *
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function () {
        this.line.removeVertexAt(this.index);
    }
});

/**
 * @class draw2d.command.CommandReplaceVertices
 *
 * Replace the vertices of a polyline.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.command.Command
 */
draw2d.command.CommandReplaceVertices = draw2d.command.Command.extend({
    NAME: "draw2d.command.CommandReplaceVertices",

    /**
     * @constructor
     * Create a new Command objects which add a segment to a PolyLine / Polygon.
     *
     * @param {draw2d.shape.basic.PolyLine} line the related line
     * @param {draw2d.util.ArrayList} originalVertices the original vertices of the polyline
     * @param {draw2d.util.ArrayList} newVertices the new vertices of the polyline
     */
    init: function (line, originalVertices, newVertices) {
        this._super(draw2d.Configuration.i18n.command.addSegment);

        this.line = line;
        this.originalVertices = originalVertices;
        this.newVertices = newVertices;
    },


    /**
     * @method
     * Returns [true] if the command can be execute and the execution of the
     * command modify the model. A CommandMove with [startX,startX] == [endX,endY] should
     * return false. <br>
     * the execution of the Command doesn't modify the model.
     *
     * @return {boolean}
     **/
    canExecute: function () {
        // return false if we doesn't modify the model => NOP Command
        return true;
    },

    /**
     * @method
     * Execute the command the first time
     *
     **/
    execute: function () {
        this.redo();
    },

    /**
     * @method
     *
     * Undo the move command
     *
     **/
    undo: function () {
        this.line.setVertices(this.originalVertices);
    },

    /**
     * @method
     *
     * Redo the move command after the user has undo this command
     *
     **/
    redo: function () {
        this.line.setVertices(this.newVertices);
    }
});

/**
 * @class draw2d.layout.connection.ConnectionRouter
 * Routes a {@link draw2d.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 */
draw2d.layout.connection.ConnectionRouter = Class.extend({
    NAME: "draw2d.layout.connection.ConnectionRouter",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
    },


    /**
     * @method
     * Routes the Connection.
     *
     * @param {draw2d.Connection} connection The Connection to route
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     * @template
     */
    route: function (connection, oldVertices) {
        throw "subclasses must implement the method [ConnectionRouter.route]";
    },

    _paint: function (conn) {
        // calculate the path string for the SVG rendering
        // Important: to avoid subpixel error rendering we add 0.5 to each coordinate
        //            With this offset the canvas can paint the line on a "full pixel" instead
        //            of subpixel rendering.
        var ps = conn.getVertices();
        var p = ps.get(0);
        var distance = conn.getRadius();
        var path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5];
        var i = 1;
        if (distance > 0) {
            var lastP = p;
            var length = (ps.getSize() - 1);
            for (; i < length; i++) {
                p = ps.get(i);
                inset = this.insetPoint(p, lastP, distance);
                path.push("L", (inset.x | 0) + 0.5, ",", (inset.y | 0) + 0.5);

                p2 = ps.get(i + 1);
                inset = this.insetPoint(p, p2, distance);

                path.push("Q", p.x, ",", p.y, " ", (inset.x | 0) + 0.5, ", ", (inset.y | 0) + 0.5);
                lastP = p;
            }
            p = ps.get(i);
            path.push("L", (p.x | 0) + 0.5, ",", (p.y | 0) + 0.5);
        }
        else {
            var length = ps.getSize();
            for (; i < length; i++) {
                p = ps.get(i);
                path.push("L", (p.x | 0) + 0.5, ",", (p.y | 0) + 0.5);
            }
        }
        conn.svgPathString = path.join("");
    },

    insetPoint: function (start, end, distanceFromStart) {
        if (start.equals(end)) {
            return start;
        }
        var vx = start.x - end.x;
        var vy = start.y - end.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        var localDistance = Math.min(length / 2, distanceFromStart);
        return {
            x: end.x + vx / length * (length - localDistance),
            y: end.y + vy / length * (length - localDistance)
        };

    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {

    },

    /**
     * @method
     * Callback method if the router has been removed from the connection.
     *
     * @param {draw2d.Connection} connection The related connection
     * @template
     * @since 2.7.2
     */
    onUninstall: function (connection) {

    },

    /**
     * @method
     * Callback method for the PolyLine or Connection to check if it possible to remove a vertex from
     * the list. The router can send an veto for this.
     * Per default it is not possible to remove any vertex from the PolyLine exceptional if any interactive
     * router is installed.
     *
     * @param index
     * @since 4.2.3
     */
    canRemoveVertexAt: function (index) {
        return false;
    },

    /**
     * Callback method for the PolyLine or Connection to verify that a segment is deletable.
     * @param index
     * @returns {Boolean}
     * @since 4.2.3
     */
    canRemoveSegmentAt: function (index) {
        return false;
    },

    /**
     * @method
     * Tweak or enrich the polyline persistence data with routing information
     *
     * @since 2.10.0
     * @param {draw2d.shape.basic.PolyLine} line
     * @param {Object} memento The memento data of the polyline
     * @returns {Object}
     */
    getPersistentAttributes: function (line, memento) {
        return memento;
    },

    /**
     * @method
     * set the attributes for the polyline with routing information
     *
     * @since 2.10.0
     * @param {Object} memento the JSON data to read
     */
    setPersistentAttributes: function (line, memento) {
    }

});

/**
 * @class draw2d.layout.connection.DirectRouter
 * Router for direct connections between two ports. Beeline
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Override the default connection type. This is used during drag&drop operations of ports.
 *     //
 *     draw2d.Connection.createConnection=function(sourcePort, targetPort){
 *        // return my special kind of connection
 *        var con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.DirectRouter());
 *        return con;
 *     };
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // first Connection
 *     //
 *     var c = draw2d.Connection.createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ConnectionRouter
 */
draw2d.layout.connection.DirectRouter = draw2d.layout.connection.ConnectionRouter.extend({

    NAME: "draw2d.layout.connection.DirectRouter",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

    },

    /**
     * @method
     * Invalidates the given Connection
     */
    invalidate: function () {
    },

    /**
     * @method
     * Routes the Connection in air line (beeline).
     *
     * @param {draw2d.Connection} connection The Connection to route
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (connection, oldVertices) {
        var start = connection.getStartPoint();
        var end = connection.getEndPoint();

        // required for hit tests
        //
        connection.addPoint(start);
        connection.addPoint(end);

        // calculate the path
        var path = ["M", start.x, " ", start.y];
        path.push("L", end.x, " ", end.y);

        connection.svgPathString = path.join("");

    }
});


/**
 * @class draw2d.layout.connection.VertexRouter
 * Router for direct connections between two ports. Beeline
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Override the default connection type. This is used during drag&drop operations of ports.
 *     //
 *     draw2d.Connection.createConnection=function(sourcePort, targetPort){
 *        // return my special kind of connection
 *        var con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.DirectRouter());
 *        return con;
 *     };
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // first Connection
 *     //
 *     var c = draw2d.Connection.createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ConnectionRouter
 */
draw2d.layout.connection.VertexRouter = draw2d.layout.connection.ConnectionRouter.extend({

    NAME: "draw2d.layout.connection.VertexRouter",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.VertexSelectionFeedbackPolicy());
    },

    /**
     * @method
     * Invalidates the given Connection
     */
    invalidate: function () {
    },

    /**
     * @method
     * Routes the Connection in air line (beeline).
     *
     * @param {draw2d.Connection} connection The Connection to route
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (connection, oldVertices) {

        // required for hit tests
        //
        var count = oldVertices.getSize();
        for (var i = 0; i < count; i++) {
            connection.addPoint(oldVertices.get(i));
        }

        var ps = connection.getVertices();

        // respect the calculated anchor position if the start/end port has set any Anchor impl.
        var startAnchor = connection.getStartPoint(ps.get(1));
        var endAnchor = connection.getEndPoint(ps.get(ps.getSize() - 2));
        ps.first().setPosition(startAnchor);
        ps.last().setPosition(endAnchor);

        this._paint(connection);
    },

    /**
     * @method
     * Callback method for the PolyLine or Connection to check if it possible to remove a vertex from
     * the list. The router can send an veto for this.
     * Per default it is not possible to remove any vertex from the PolyLine exceptional if any interactive
     * router is installed.
     *
     * @param index
     * @since 4.2.3
     */
    canRemoveVertexAt: function (conn, index) {

        var count = conn.getVertices().getSize();

        return false;
    },

    /**
     * Callback method for the PolyLine or Connection to verify that a segment is deletable.
     * @param index
     * @returns {Boolean}
     * @since 4.2.3
     */
    canRemoveSegmentAt: function (conn, index) {

        var segmentCount = conn.getVertices().getSize() - 1; // segmentCount is one less than vertex count

        // The first and last segment isn't deletable
        //
        if ((index <= 0) || (index >= segmentCount)) {
            return false;
        }

        // a connection need at least one strokes
        //
        if (segmentCount < 2) {
            return false;
        }

        return true;
    },


    /**
     * @method
     * Tweak or enrich the polyline persistence data with routing information
     *
     * @since 2.10.0
     * @param {draw2d.shape.basic.PolyLine} line
     * @param {Object} memento The memento data of the polyline
     * @returns {Object}
     */
    getPersistentAttributes: function (line, memento) {
        memento.vertex = [];

        line.getVertices().each(function (i, e) {
            memento.vertex.push({x: e.x, y: e.y});
        });

        return memento;
    },

    /**
     * @method
     * set the attributes for the polyline with routing information
     *
     * @since 2.10.0
     * @param {Object} memento
     */
    setPersistentAttributes: function (line, memento) {
        // restore the points from the JSON data and add them to the polyline
        //
        if (typeof memento.vertex !== "undefined") {

            line.oldPoint = null;
            line.lineSegments = new draw2d.util.ArrayList();
            line.vertices = new draw2d.util.ArrayList();

            $.each(memento.vertex, function (i, e) {
                line.addPoint(e.x, e.y);
            });
        }
    }

});


/**
 * @class draw2d.layout.connection.ManhattanConnectionRouter
 * Provides a {@link draw2d.Connection} with an orthogonal route between the Connection's source
 * and target anchors.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Override the default connection type. This is used during drag&drop operations of ports.
 *     //
 *     draw2d.Connection.createConnection=function(sourcePort, targetPort){
 *        // return my special kind of connection
 *        var con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.ManhattanConnectionRouter());
 *        return con;
 *     };
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // first Connection
 *     //
 *     var c = draw2d.Connection.createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ConnectionRouter
 */
draw2d.layout.connection.ManhattanConnectionRouter = draw2d.layout.connection.ConnectionRouter.extend({
    NAME: "draw2d.layout.connection.ManhattanConnectionRouter",

    MINDIST: 20,
    TOL: 0.1,
    TOLxTOL: 0.01,
    TOGGLE_DIST: 5,

    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

    },

    /**
     * @method
     * Layout the hands over connection in a manhattan like layout
     *
     * @param {draw2d.Connection} conn
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (conn, oldVertices) {
        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        // calculate the lines between the two points.
        //
        this._route(conn, toPt, toDir, fromPt, fromDir);
        this._paint(conn);
    },

    /**
     * @method
     * Internal routing algorithm.
     *
     * @private
     * @param {draw2d.Connection} conn
     * @param {draw2d.geo.Point} fromPt
     * @param {Number} fromDir
     * @param {draw2d.geo.Point} toPt
     * @param {Number} toDir
     */
    _route: function (conn, fromPt, fromDir, toPt, toDir) {
        // fromPt is an x,y to start from.
        // fromDir is an angle that the first link must
        //
        var UP = draw2d.geo.Rectangle.DIRECTION_UP;
        var RIGHT = draw2d.geo.Rectangle.DIRECTION_RIGHT;
        var DOWN = draw2d.geo.Rectangle.DIRECTION_DOWN;
        var LEFT = draw2d.geo.Rectangle.DIRECTION_LEFT;

        var xDiff = fromPt.x - toPt.x;
        var yDiff = fromPt.y - toPt.y;
        var point;
        var dir;

        if (((xDiff * xDiff) < (this.TOLxTOL)) && ((yDiff * yDiff) < (this.TOLxTOL))) {
            conn.addPoint(new draw2d.geo.Point(toPt.x, toPt.y));
            return;
        }

        if (fromDir === LEFT) {
            if ((xDiff > 0) && ((yDiff * yDiff) < this.TOL) && (toDir === RIGHT)) {
                point = toPt;
                dir = toDir;
            }
            else {
                if (xDiff < 0) {
                    point = new draw2d.geo.Point(fromPt.x - this.MINDIST, fromPt.y);
                }
                else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP))) {
                    point = new draw2d.geo.Point(toPt.x, fromPt.y);
                }
                else if (fromDir == toDir) {
                    var pos = Math.min(fromPt.x, toPt.x) - this.MINDIST;
                    point = new draw2d.geo.Point(pos, fromPt.y);
                }
                else {
                    point = new draw2d.geo.Point(fromPt.x - (xDiff / 2), fromPt.y);
                }

                if (yDiff > 0) {
                    dir = UP;
                }
                else {
                    dir = DOWN;
                }
            }
        }
        else if (fromDir === RIGHT) {
            if ((xDiff < 0) && ((yDiff * yDiff) < this.TOL) && (toDir === LEFT)) {
                point = toPt;
                dir = toDir;
            }
            else {
                if (xDiff > 0) {
                    point = new draw2d.geo.Point(fromPt.x + this.MINDIST, fromPt.y);
                }
                else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP))) {
                    point = new draw2d.geo.Point(toPt.x, fromPt.y);
                }
                else if (fromDir === toDir) {
                    var pos = Math.max(fromPt.x, toPt.x) + this.MINDIST;
                    point = new draw2d.geo.Point(pos, fromPt.y);
                }
                else {
                    point = new draw2d.geo.Point(fromPt.x - (xDiff / 2), fromPt.y);
                }

                if (yDiff > 0) {
                    dir = UP;
                }
                else {
                    dir = DOWN;
                }
            }
        }
        else if (fromDir === DOWN) {
            if (((xDiff * xDiff) < this.TOL) && (yDiff < 0) && (toDir === UP)) {
                point = toPt;
                dir = toDir;
            }
            else {
                if (yDiff > 0) {
                    point = new draw2d.geo.Point(fromPt.x, fromPt.y + this.MINDIST);
                }
                else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
                    point = new draw2d.geo.Point(fromPt.x, toPt.y);
                }
                else if (fromDir === toDir) {
                    var pos = Math.max(fromPt.y, toPt.y) + this.MINDIST;
                    point = new draw2d.geo.Point(fromPt.x, pos);
                }
                else {
                    point = new draw2d.geo.Point(fromPt.x, fromPt.y - (yDiff / 2));
                }

                if (xDiff > 0) {
                    dir = LEFT;
                }
                else {
                    dir = RIGHT;
                }
            }
        }
        else if (fromDir === UP) {
            if (((xDiff * xDiff) < this.TOL) && (yDiff > 0) && (toDir === DOWN)) {
                point = toPt;
                dir = toDir;
            }
            else {
                if (yDiff < 0) {
                    point = new draw2d.geo.Point(fromPt.x, fromPt.y - this.MINDIST);
                }
                else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
                    point = new draw2d.geo.Point(fromPt.x, toPt.y);
                }
                else if (fromDir === toDir) {
                    var pos = Math.min(fromPt.y, toPt.y) - this.MINDIST;
                    point = new draw2d.geo.Point(fromPt.x, pos);
                }
                else {
                    point = new draw2d.geo.Point(fromPt.x, fromPt.y - (yDiff / 2));
                }

                if (xDiff > 0) {
                    dir = LEFT;
                }
                else {
                    dir = RIGHT;
                }
            }
        }
        this._route(conn, point, dir, toPt, toDir);
        conn.addPoint(fromPt);
    }

});

/**
 * @class draw2d.layout.connection.ManhattanBridgedConnectionRouter
 * Provides a {@link draw2d.Connection} with an orthogonal route between the Connection's source
 * and target anchors.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */
draw2d.layout.connection.ManhattanBridgedConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME: "draw2d.layout.connection.ManhattanBridgedConnectionRouter",

    BRIDGE_HORIZONTAL_LR: " r 0 0 3 -4 7 -4 10 0 13 0 ", // Left to right
    BRIDGE_HORIZONTAL_RL: " r 0 0 -3 -4 -7 -4 -10 0 -13 0 ", // right to left

    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

    },

    /**
     * @method
     * Layout the hands over connection in a manhattan like layout
     *
     * @param {draw2d.Connection} conn the connection to layout
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (conn, oldVertices) {
        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        // calculate the lines between the two points.
        //
        this._route(conn, toPt, toDir, fromPt, fromDir);

        // calculate the path string for the SVG rendering
        //
        var intersectionsASC = conn.getCanvas().getIntersection(conn).sort("x");
        var intersectionsDESC = intersectionsASC.clone().reverse();

        var intersectionForCalc = intersectionsASC;
        var i = 0;

        // ATTENTION: we cast all x/y coordinates to int and add 0.5 to avoid subpixel rendering of
        //            the connection. The 1px or 2px lines look much clearer than before.
        //
        var ps = conn.getVertices();
        var p = ps.get(0);
        var path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5];
        var oldP = p;
        for (i = 1; i < ps.getSize(); i++) {
            p = ps.get(i);

            // check for intersection and paint a bridge if required
            // line goes from left to right
            //
            var bridgeWidth = 5;
            var bridgeCode = this.BRIDGE_HORIZONTAL_LR;

            // line goes from right->left. Inverse the bridge and the bridgeWidth
            //
            if (oldP.x > p.x) {
                intersectionForCalc = intersectionsDESC;
                bridgeCode = this.BRIDGE_HORIZONTAL_RL;
                bridgeWidth = -bridgeWidth;
            }

            intersectionForCalc.each(function (ii, interP) {
                if (interP.justTouching == false && draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {
                    // we draw only horizontal bridges. Just a design decision
                    //
                    if (p.y === interP.y) {
                        path.push(" L", ((interP.x - bridgeWidth) | 0) + 0.5, " ", (interP.y | 0) + 0.5);
                        path.push(bridgeCode);
                    }
                }

            });

            path.push(" L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5);
            oldP = p;
        }
        conn.svgPathString = path.join("");
    }

});

/**
 * @class draw2d.layout.connection.InteractiveManhattanConnectionRouter
 * Route the connection in an Manhattan style and add resize handles to all vertex for interactive alignment of the
 * routing.
 *
 *
 * @author Andreas Herz
 * @since 4.0.2
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */
draw2d.layout.connection.InteractiveManhattanConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME: "draw2d.layout.connection.InteractiveManhattanConnectionRouter",


    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function () {
        this._super();

    },

    onInstall: function (conn) {
        conn.installEditPolicy(new draw2d.policy.line.OrthogonalSelectionFeedbackPolicy());
        if (!conn._routingMetaData) {
            conn._routingMetaData = {
                routedByUserInteraction: false,
                fromDir: -1,
                toDir: -1
            };
        }
    },

    onUninstall: function (conn) {
        delete conn._routingMetaData;
    },

    /**
     * @method
     * Layout the hands over connection in a manhattan like layout
     *
     * @param {draw2d.Connection} conn the connection to layout
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (conn, oldVertices) {
        if (oldVertices.getSize() === 0 || conn._routingMetaData.routedByUserInteraction === false) {
            this._super(conn, oldVertices);
            conn._routingMetaData.fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());
            conn._routingMetaData.toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());
        }
        else {
            this.halfRoute(conn, oldVertices);
            this._paint(conn);
        }
    },

    /**
     * @method
     * The routing algorithm if the user has changed at least on of the vertices manually.
     * This kind of routing just align the start and end vertices to the new source/target port
     * location.
     * The vertices between keep untouched. Modification of this vertices are done by the
     * draw2d.policy.line.OrthogonalSelectionFeedbackPolicy
     *
     * @param {draw2d.Connection} conn the connection to route
     * @param {draw2d.util.ArrayList} oldVertices the vertices of the routing before
     */
    halfRoute: function (conn, oldVertices) {

        var vertexCount = oldVertices.getSize();

        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        var max = Math.max;
        var min = Math.min;

        // the port orientation has been changed. This can happen if the node rotates. In this case
        // we must recalculate the routing.
        if (conn._routingMetaData.fromDir !== fromDir || conn._routingMetaData.toDir !== toDir) {
            conn._routingMetaData.routedByUserInteraction = false;
            this.route(conn, oldVertices);
        }

        //  go back to the default if no routing is possible anymore
        //
        if ((fromDir === 1 ) && (toDir === 3) && (fromPt.x > toPt.x) && (vertexCount <= 4)) {
            conn._routingMetaData.routedByUserInteraction = false;
            this.route(conn, oldVertices);
        }

        // transfer the old vertices into the connection
        //
        oldVertices.each(function (i, vertex) {
            conn.addPoint(vertex);
        });


        // The SOURCE port (labeled with p0) has been moved/changed.
        //
        if (!fromPt.equals(oldVertices.get(0))) {
            var p1 = oldVertices.get(1);
            var p2 = oldVertices.get(2);
            conn.setVertex(0, fromPt);
            switch (fromDir) {
                //          .
                //   p0     . p1
                //   +------+
                //          .
                //          .
                //
                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                    conn.setVertex(1, max(fromPt.x + 10, p1.x), fromPt.y);// p1
                    conn.setVertex(2, max(fromPt.x + 10, p1.x), p2.y);    // p2
                    break;
                //   .
                //   . p1     p0
                //   +------+
                //   .
                //   .
                //
                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                    conn.setVertex(1, min(fromPt.x - 10, p1.x), fromPt.y);// p1
                    conn.setVertex(2, min(fromPt.x - 10, p1.x), p2.y);    // p2
                    break;
                //     ...+....
                //     p1 |
                //        |
                //        |
                //     p0 +
                //
                case draw2d.geo.Rectangle.DIRECTION_UP:
                    conn.setVertex(1, fromPt.x, min(fromPt.y - 10, p1.y)); // p1
                    conn.setVertex(2, p2.x, min(fromPt.y - 10, p1.y)); // p2
                    break;
                //        +
                //     p0 |
                //        |
                //     p1 |
                //    ....+....
                //
                case draw2d.geo.Rectangle.DIRECTION_DOWN:
                    conn.setVertex(1, fromPt.x, max(fromPt.y + 10, p1.y)); // p1
                    conn.setVertex(2, p2.x, max(fromPt.y + 10, p1.y));     // p2
                    break;
            }
        }
        //////////////////////////////////////////////////////////////////
        // the TARGET port ( labeled with p0) has moved
        //
        if (!toPt.equals(oldVertices.get(vertexCount - 1))) {
            var p1 = oldVertices.get(vertexCount - 2);
            var p2 = oldVertices.get(vertexCount - 3);
            conn.setVertex(vertexCount - 1, toPt);                        // p0

            switch (toDir) {
                //               .
                //      p0       . p1
                //    +----------+
                //               .
                //               .
                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                    conn.setVertex(vertexCount - 2, max(toPt.x + 10, p1.x), toPt.y);  // p1
                    conn.setVertex(vertexCount - 3, max(toPt.x + 10, p1.x), p2.y);    // p2
                    break;

                //    .
                //    .
                //    . p1         p0
                //    +----------+
                //    .
                //    .
                //
                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                    conn.setVertex(vertexCount - 2, min(toPt.x - 10, p1.x), toPt.y);  // p1
                    conn.setVertex(vertexCount - 3, min(toPt.x - 10, p1.x), p2.y);    // p2
                    break;

                //     ...+....
                //     p1 |
                //        |
                //        |
                //     p0 +
                //
                case draw2d.geo.Rectangle.DIRECTION_UP:
                    conn.setVertex(vertexCount - 2, toPt.x, max(toPt.y + 10, p1.y));  // p1
                    conn.setVertex(vertexCount - 3, p2.x, max(toPt.y + 10, p1.y));  // p2
                    break;

                //        +
                //     p0 |
                //        |
                //     p1 |
                //     ...+...
                //
                case draw2d.geo.Rectangle.DIRECTION_DOWN:
                    conn.setVertex(vertexCount - 2, toPt.x, max(toPt.y + 10, p1.y));  // p1
                    conn.setVertex(vertexCount - 3, p2.x, max(toPt.y + 10, p1.y));  // p2
                    break;
            }
        }
    },

    /**
     * Callback method for the PolyLine or Connection to verify that a segment is deletable.
     * @param index
     * @returns {Boolean}
     * @since 4.2.3
     */
    canRemoveSegmentAt: function (conn, index) {

        var segmentCount = conn.getVertices().getSize() - 1; // segmentCount is one less than vertex count

        // The first and last segment isn't deletable
        //
        if ((index <= 0) || (index >= segmentCount)) {
            return false;
        }

        // a connection need at least three strokes
        //
        if (segmentCount < 4) {
            return false;
        }

        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        if (segmentCount <= 5) {
            //     ___
            //    |   |      From
            //    | 1 |-----+
            //    |___|     |
            //              |
            //   +----------+
            //   |
            //   |    ___
            //   |   |   |
            //   +---| 2 |    To
            //       |___|
            // the connection needs at least 5 segments if the routing is like this above
            //
            if ((fromDir === draw2d.geo.Rectangle.DIRECTION_RIGHT) && ( toDir === draw2d.geo.Rectangle.DIRECTION_LEFT) && (fromPt.x >= toPt.x)) {
                return false;
            }


            //     ___
            //    |   |        To
            //    | 2 |-----+
            //    |___|     |
            //              |
            //   +----------+
            //   |
            //   |    ___
            //   |   |   |
            //   +---| 1 |    From
            //       |___|
            //
            if ((fromDir == draw2d.geo.Rectangle.DIRECTION_LEFT) & ( toDir == draw2d.geo.Rectangle.DIRECTION_RIGHT) && (fromPt.x <= toPt.x)) {
                return false;
            }

            //                          ___
            //      +_______           |   |
            //      | from  |          | 2 |
            //     _+_      |          |___|
            //    |   |     |       To   +
            //    | 1 |     |____________|
            //    |___|
            //
            if ((fromDir == draw2d.geo.Rectangle.DIRECTION_UP) & ( toDir == draw2d.geo.Rectangle.DIRECTION_DOWN) && (fromPt.y <= toPt.y)) {
                return false;
            }

            //                          ___
            //      +_______           |   |
            //      | to    |          | 1 |
            //     _+_      |          |___|
            //    |   |     |     from   +
            //    | 2 |     |____________|
            //    |___|
            //
            if ((fromDir == draw2d.geo.Rectangle.DIRECTION_DOWN) & ( toDir == draw2d.geo.Rectangle.DIRECTION_UP) && (fromPt.y >= toPt.y)) {
                return false;
            }

            // unable to make the decision on the easy way. calculate the route again and
            // check if the segment count of the new routed connection allows a removal
            //
            var tmpConn = new draw2d.Connection();
            tmpConn.lineSegments = new draw2d.util.ArrayList();
            tmpConn.vertices = new draw2d.util.ArrayList();
            tmpConn.sourcePort = conn.sourcePort;
            tmpConn.targetPort = conn.targetPort;
            tmpConn._routingMetaData = {routedByUserInteraction: false, fromDir: -1, toDir: -1};
            this.route(tmpConn, new draw2d.util.ArrayList());
            var curSegmentCount = conn.getVertices().getSize() - 1;
            var minSegmentCount = tmpConn.getVertices().getSize() - 1;
            if (curSegmentCount <= minSegmentCount) {
                return false;
            }
        }

        return true;
    },


    /**
     * @method
     * Tweak or enrich the polyline persistence data with routing information
     *
     * @since 2.10.0
     * @param {draw2d.shape.basic.PolyLine} line
     * @param {Object} memento The memento data of the polyline
     * @returns {Object}
     */
    getPersistentAttributes: function (line, memento) {
        memento.vertex = [];

        line.getVertices().each(function (i, e) {
            memento.vertex.push({x: e.x, y: e.y});
        });
        memento.routingMetaData = $.extend({}, line._routingMetaData);

        return memento;
    },

    /**
     * @method
     * set the attributes for the polyline with routing information of the interactive manhattan router.
     *
     * @since 4..0.0
     * @param {Object} memento
     */
    setPersistentAttributes: function (line, memento) {
        // restore the points from the JSON data and add them to the polyline
        //
        if (typeof memento.vertex !== "undefined") {

            line.oldPoint = null;
            line.lineSegments = new draw2d.util.ArrayList();
            line.vertices = new draw2d.util.ArrayList();

            $.each(memento.vertex, function (i, e) {
                line.addPoint(e.x, e.y);
            });
        }

        if (typeof memento.routingMetaData !== "undefinied") {
            line._routingMetaData = $.extend({}, memento.routingMetaData);
        }
    }

});

/**
 * @class draw2d.layout.connection.CircuitConnectionRouter
 * Provides a {@link draw2d.Connection} with an orthogonal route between the Connection's source
 * and target anchors.
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */
draw2d.layout.connection.CircuitConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME: "draw2d.layout.connection.CircuitConnectionRouter",

    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function () {
        this._super();

        this.setBridgeRadius(4);
        this.setVertexRadius(2);

        // experimental
        this.abortRoutingOnFirstVertexNode = false;
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

    },

    /**
     * @method
     * Callback method if the router has been removed from the connection. In the case of the CircuitRouter
     * all vertex nodes will be removed from the canvas.
     *
     * @param {draw2d.Connection} connection The related connection
     * @template
     * @since 2.7.2
     */
    onUninstall: function (connection) {
        if (typeof connection.vertexNodes !== "undefined" && connection.vertexNodes !== null) {
            connection.vertexNodes.remove();
            connection.vertexNodes = null;
        }
    },

    /**
     * @method
     * Set the radius of the vertex circle.
     *
     * @param {Number} radius
     * @deprecated
     */
    setVertexRadius: function (radius) {
        this.vertexRadius = radius;
    },
    /** deprecated
     * @private
     * **/
    setJunctionRadius: function (radius) {
        this.vertexRadius = radius;
    },

    /**
     * @method
     * Set the radius or span of the bridge. A bridge will be drawn if two connections are crossing and didn't have any
     * common port.
     *
     * @param {Number} radius
     */
    setBridgeRadius: function (radius) {
        this.bridgeRadius = radius;
        this.bridge_LR = [" r", 0.5, -0.5, radius - (radius / 2), -(radius - radius / 4), radius, -radius, radius + (radius / 2), -(radius - radius / 4), radius * 2, "0 "].join(" ");
        this.bridge_RL = [" r", -0.5, -0.5, -(radius - (radius / 2)), -(radius - radius / 4), -radius, -radius, -(radius + (radius / 2)), -(radius - radius / 4), -radius * 2, "0 "].join(" ");
    },

    /**
     * @method
     * Layout the hands over connection in a manhattan like layout
     *
     * @param {draw2d.Connection} conn the connection to layout
     * @param {draw2d.util.ArrayList} oldVertePoints old/existing vertex of the Connection
     */
    route: function (conn, oldVertexPoints) {
        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        // calculate the lines between the two points with the standard ManhattanRouter.
        //
        this._route(conn, toPt, toDir, fromPt, fromDir);

        // get the intersections to the other connections
        //
        var intersectionsASC = conn.getCanvas().getIntersection(conn).sort("x");
        var intersectionsDESC = intersectionsASC.clone().reverse();

        var intersectionForCalc = intersectionsASC;
        var i = 0;

        // add a ArrayList of all added vertex nodes to the connection
        //
        if (typeof conn.vertexNodes !== "undefined" && conn.vertexNodes !== null) {
            conn.vertexNodes.remove();
        }
        conn.vertexNodes = conn.canvas.paper.set();

        // ATTENTION: we cast all x/y coordinates to integer and add 0.5 to avoid subpixel rendering of
        //            the connection. The 1px or 2px lines look much clearer than before.
        //
        var ps = conn.getVertices();
        var p = ps.get(0);
        var path = ["M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5];

        var oldP = p;
        var bridgeWidth = null;
        var bridgeCode = null;

        var lastVertexNode = null;

        for (i = 1; i < ps.getSize(); i++) {
            p = ps.get(i);

            // line goes from right->left.
            if (oldP.x > p.x) {
                intersectionForCalc = intersectionsDESC;
                bridgeCode = this.bridge_RL;
                bridgeWidth = -this.bridgeRadius;
            }
            // line goes from left->right
            else {
                intersectionForCalc = intersectionsASC;
                bridgeCode = this.bridge_LR;
                bridgeWidth = this.bridgeRadius;
            }

            // add a bridge or a vertex node depending to the intersection connection
            //
            // bridge   => the connections didn't have a common port
            // vertex => the connections did have a common source or target port
            //
            intersectionForCalc.each($.proxy(function (ii, interP) {
                if (draw2d.shape.basic.Line.hit(1, oldP.x, oldP.y, p.x, p.y, interP.x, interP.y) === true) {

                    // It is a vertex node..
                    //
                    if (conn.sharingPorts(interP.other)) {
                        var other = interP.other;
                        var otherZ = other.getZOrder();
                        var connZ = conn.getZOrder();
                        if (connZ < otherZ) {
                            var vertexNode = conn.canvas.paper.ellipse(interP.x, interP.y, this.vertexRadius, this.vertexRadius).attr({fill: conn.lineColor.hash()});
                            conn.vertexNodes.push(vertexNode);
                            // we found a vertex node. In this case an already existing connection did draw the connection.
                            //
                            if (this.abortRoutingOnFirstVertexNode === true) {
                                if (conn.getSource() == other.getSource() || conn.getSource() == other.getTarget()) {
                                    path = ["M", (interP.x | 0) + 0.5, " ", (interP.y | 0) + 0.5];
                                    if (lastVerteNode !== null) {
                                        lastVerteNode.remove();
                                        conn.vertexNodes.exclude(lastVerteNode);
                                    }
                                }
                                lastVerteNode = vertexNode;
                            }
                        }
                    }
                    // ..or a bridge. We draw only horizontal bridges. Just a design decision
                    //
                    else if (p.y === interP.y) {
                        path.push(" L", ((interP.x - bridgeWidth) | 0) + 0.5, " ", (interP.y | 0) + 0.5);
                        path.push(bridgeCode);
                    }
                }
            }, this));

            path.push(" L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5);
            oldP = p;
        }
        conn.svgPathString = path.join("");
    }
});
/**
 * @class draw2d.layout.connection.SplineConnectionRouter
 *
 * A MannhattanConnectionRouter with an spline interpolation between the bend points.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.layout.connection.ManhattanConnectionRouter
 */
draw2d.layout.connection.SplineConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({

    NAME: "draw2d.layout.connection.SplineConnectionRouter",

    /**
     * @constructor Creates a new Router object
     */
    init: function () {
        this._super();

//        this.spline = new draw2d.util.spline.CatmullRomSpline();
        this.spline = new draw2d.util.spline.CubicSpline();
//        this.spline = new draw2d.util.spline.BezierSpline();

        this.MINDIST = 50,
            this.cheapRouter = null;
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());
    },

    /**
     * @method
     * Layout the hands over connection with the cubic spline calculation and manhattan routing
     *
     * @param {draw2d.Connection} conn
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (conn, oldVertices) {
        var i = 0;
        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        // calculate the manhatten bend points between start/end.
        //
        this._route(conn, toPt, toDir, fromPt, fromDir);

        var ps = conn.getVertices();

        conn.oldPoint = null;
        conn.lineSegments = new draw2d.util.ArrayList();
        conn.vertices = new draw2d.util.ArrayList();

        var splinePoints = this.spline.generate(ps, 8);
        splinePoints.each(function (i, e) {
            conn.addPoint(e);
        });

        // calculate the path string for the SVG rendering
        //
        var ps = conn.getVertices();
        length = ps.getSize();
        var p = ps.get(0);
        var path = ["M", p.x, " ", p.y];
        for (i = 1; i < length; i++) {
            p = ps.get(i);
            path.push("L", p.x, " ", p.y);
        }
        conn.svgPathString = path.join("");
    }
});
/**
 * @class draw2d.layout.connection.FanConnectionRouter
 *
 * Automatic router that spreads its  {@link draw2d.Connection Connections} in a fan-like fashion upon collision.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Override the default connection type. This is used during drag&drop operations of ports.
 *     //
 *     draw2d.Connection.createConnection=function(sourcePort, targetPort){
 *        // return my special kind of connection
 *        var con = new draw2d.Connection();
 *        con.setRouter(new draw2d.layout.connection.FanConnectionRouter());
 *        return con;
 *     };
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // first Connection
 *     //
 *     var c = draw2d.Connection.createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *     // second Connection
 *     //
 *     c = draw2d.Connection.createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *     // third Connection
 *     //
 *     c = draw2d.Connection.createConnection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 * @inheritable
 * @author Andreas Herz
 *
 * @extends draw2d.layout.connection.DirectRouter
 */
draw2d.layout.connection.FanConnectionRouter = draw2d.layout.connection.DirectRouter.extend({
    NAME: "draw2d.layout.connection.FanConnectionRouter",

    /**
     * @constructor Creates a new Router object.
     */
    init: function () {
        this._super();

    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

    },

    /**
     * @method
     * Layout the hands over connection in a manhattan like layout
     *
     * @param {draw2d.Connection}  conn
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (conn, oldVertices) {
        var lines = conn.getSource().getConnections().clone();
        lines.grep(function (other) {
            return other.getTarget() === conn.getTarget() || other.getSource() === conn.getTarget();
        });

        if (lines.getSize() > 1) {
            this.routeCollision(conn, lines.indexOf(conn));
        }
        else {
            this._super(conn);
        }
    },

    /**
     * @method
     * route the connection if connections overlap. Two connections overlap if the combination
     * of source and target anchors are equal.
     *
     * @param {draw2d.Connection} conn
     * @param {Number} index
     */
    routeCollision: function (conn, index) {
        index = index + 1;
        var start = conn.getStartPoint();
        var end = conn.getEndPoint();

        var separation = 15;

        var midPoint = new draw2d.geo.Point((end.x + start.x) / 2, (end.y + start.y) / 2);
        var position = end.getPosition(start);
        var ray;
        if (position == draw2d.geo.PositionConstants.SOUTH || position == draw2d.geo.PositionConstants.EAST) {
            ray = new draw2d.geo.Point(end.x - start.x, end.y - start.y);
        }
        else {
            ray = new draw2d.geo.Point(start.x - end.x, start.y - end.y);
        }

        var length = Math.sqrt(ray.x * ray.x + ray.y * ray.y);

        var xSeparation = separation * ray.x / length;
        var ySeparation = separation * ray.y / length;

        var bendPoint;

        if (index % 2 === 0) {
            bendPoint = new draw2d.geo.Point(midPoint.x + (index / 2) * (-1 * ySeparation), midPoint.y + (index / 2) * xSeparation);
        }
        else {
            bendPoint = new draw2d.geo.Point(midPoint.x + (index / 2) * ySeparation, midPoint.y + (index / 2) * (-1 * xSeparation));
        }

        // required for hit tests
        conn.addPoint(start);
        conn.addPoint(bendPoint);
        conn.addPoint(end);

        // calculate the path string for the SVG rendering
        //
        this._paint(conn);
    }
});
/**
 * @class draw2d.layout.connection.MazeConnectionRouter
 * <b>BETA VERSION. Not for production!!!<br></b>
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ConnectionRouter
 */
var ROUTER_RECTS = null;

draw2d.layout.connection.MazeConnectionRouter = draw2d.layout.connection.ConnectionRouter.extend({
    NAME: "draw2d.layout.connection.MazeConnectionRouter",


    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function () {
        this._super();

        this.useSpline = false;
        this.useSimplify = true;
        this.useSimplifyValue = 2;
        this.useDebug = false;
        this.useShift = 4;
        this.portOutletOffset = 15;


//    	this.finder = new PF.AStarFinder();
//      this.finder = new PF.AStarFinder({ allowDiagonal: true, dontCrossCorners: true});
//      this.finder = new PF.AStarFinder({ allowDiagonal: false});
//      this.finder = new PF.BiBreadthFirstFinder({ allowDiagonal: false});
//      this.finder = new PF.BreadthFirstFinder({ allowDiagonal: false});
        this.finder = new PF.JumpPointFinder({allowDiagonal: false, dontCrossCorners: true});
    },


    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

    },

    /**
     * @method
     * Layout the hands over connection in a manhattan like layout
     *
     * @param {draw2d.Connection} conn
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (conn, oldVertices) {
        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        // calculate the lines between the two points.
        //
        this._route(conn, toPt, toDir, fromPt, fromDir);
        this._paint(conn);
    },

    /**
     * @method
     * Internal routing algorithm.
     *      * <p>
     * Possible values:
     * <ul>
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     * </ul>
     * <p>

     * @private
     * @param {draw2d.Connection} conn
     * @param {draw2d.geo.Point} fromPt
     * @param {Number} fromDir
     * @param {draw2d.geo.Point} toPt
     * @param {Number} toDir
     */
    _route: function (conn, fromPt, fromDir, toPt, toDir) {
        var shift = this.useShift;

        oldToPt = toPt;
        oldFromPt = fromPt;

        // move the points with an offset in the prefered routing direction of the ports
        // to avoid that the routed connection is sticking on one side of the figure.
        //
        fromPt = this.getAddjustedPoint(fromPt, fromDir, this.portOutletOffset);
        toPt = this.getAddjustedPoint(toPt, toDir, this.portOutletOffset);

        var grid = this.generateNoGoGrid(conn, fromPt, fromDir, toPt, toDir);

        // 4. Calculate the shortest path from source to target based on the grid
        //
        var path = this.finder.findPath(
            fromPt.x >> shift, fromPt.y >> shift,
            toPt.x >> shift, toPt.y >> shift,
            grid);

        // transfer the path from the grid based coordinates back to the real coordinates
        //
        $.each(path, function (i, e) {
            e.x = e[0] = e[0] << shift;
            e.y = e[1] = e[1] << shift;
        });

        // 5. paint the "no go" area in read if we are in debug mode
        //
        if (this.useDebug) {
            if (ROUTER_RECTS !== null) {
                ROUTER_RECTS.remove();
            }
            ROUTER_RECTS = conn.canvas.paper.set();

            for (var i = 0; i < grid.width; i++) {
                for (var j = 0; j < grid.height; j++) {
                    if (!grid.isWalkableAt(i, j))
                        ROUTER_RECTS.push(conn.canvas.paper.rect(i << shift, j << shift, 1 << shift, 1 << shift).attr({
                            "fill": "red",
                            "opacity": "0.1"
                        }));
                }
            }
            ROUTER_RECTS.push(conn.canvas.paper.rect(fromPt.x - 3, fromPt.y - 3, 6, 6).attr({
                "fill": "#ff0000",
                "opacity": "0.8"
            }));
            ROUTER_RECTS.push(conn.canvas.paper.rect(toPt.x - 3, toPt.y - 3, 6, 6).attr({
                "fill": "#ff0000",
                "opacity": "0.8"
            }));

            // paint the original calculated path without any simplification in BLUE
            $.each(path, function (i, e) {
                ROUTER_RECTS.push(conn.canvas.paper.rect(e.x - 3, e.y - 3, 6, 6).attr({
                    "fill": "#0000ff",
                    "opacity": "0.8"
                }));
            });
            var p = path[0];
            var svgPathBefore = ["M", p.x, " ", p.y];
            for (var i = 1; i < path.length; i++) {
                p = path[i];
                svgPathBefore.push("L", p.x, " ", p.y);
            }
            svgPathBefore = svgPathBefore.join("");
            ROUTER_RECTS.push(conn.canvas.paper.path(svgPathBefore).attr({"stroke": "#0000ff"}));
        }


        this.adjustPath(fromPt, path, fromDir);
        path.reverse();
        this.adjustPath(toPt, path, toDir);
        path.reverse();

        $.each(path, function (i, e) {
            e.x = e[0];
            e.y = e[1];
        });


        if (this.useSpline) {
            var p = new draw2d.util.ArrayList();
            p.add(oldFromPt);
            $.each(path, function (i, e) {
                p.add(new draw2d.geo.Point(e[0], e[1]));
            });
            p.add(oldToPt);

            if (this.useDebug) {
                $.each(path, function (i, e) {
                    ROUTER_RECTS.push(conn.canvas.paper.rect(e.x - 3, e.y - 3, 6, 6).attr({
                        "fill": "#00ff00",
                        "opacity": "0.8"
                    }));
                });
                var pt = path[0];
                var svgPathBefore = ["M", pt.x, " ", pt.y];
                for (var i = 1; i < path.length; i++) {
                    pt = path[i];
                    svgPathBefore.push("L", pt.x, " ", pt.y);
                }
                svgPathBefore = svgPathBefore.join("");
                ROUTER_RECTS.push(conn.canvas.paper.path(svgPathBefore).attr({"stroke": "#00ff00"}));
            }

            this.spline = new draw2d.util.spline.CubicSpline();
            var splinePoints = this.spline.generate(p, 8);

            if (this.useSimplify) {
                path = [];
                splinePoints.each(function (i, e) {
                    path.push({x: e.x, y: e.y});
                });
                path = this.simplify(path, this.useSimplifyValue, true);

                $.each(path, function (i, e) {
                    conn.addPoint(e.x, e.y);
                });
            }
            else {
                splinePoints.each(function (i, e) {
                    conn.addPoint(e);
                });
            }
        }
        else {
            if (this.useSimplify) {
                path = this.simplify(path, this.useSimplifyValue, true);
            }

            if (this.useDebug) {
                $.each(path, function (i, e) {
                    ROUTER_RECTS.push(conn.canvas.paper.rect(e.x - 3, e.y - 3, 6, 6).attr({
                        "fill": "#00ff00",
                        "opacity": "0.8"
                    }));
                });
                var p = path[0];
                var svgPathBefore = ["M", p.x, " ", p.y];
                for (var i = 1; i < path.length; i++) {
                    p = path[i];
                    svgPathBefore.push("L", p.x, " ", p.y);
                }
                svgPathBefore = svgPathBefore.join("");
                ROUTER_RECTS.push(conn.canvas.paper.path(svgPathBefore).attr({"stroke": "#00ff00"}));
            }

            conn.addPoint(oldFromPt);
            $.each(path, function (i, e) {
                conn.addPoint(e[0], e[1]);
            });
            conn.addPoint(oldToPt);

        }

    },

    /**
     * @method
     * Generate a grid base no go map required for the path finding algorithm
     *
     * @param conn
     * @returns {PF.Grid}
     */
    generateNoGoGrid: function (conn, fromPt, fromDir, toPt, toDir) {
        var shift = this.useShift;
        var oneShift2 = (1 << shift) / 2;

        // 1. generate a map with all "no go" areas. The bounding box of the shapes defines
        //    the no go areas.
        //
        var canvasWidth = conn.getCanvas().paper.width >> shift;
        var canvasHeight = conn.getCanvas().paper.height >> shift;
        var grid = new PF.Grid(canvasWidth, canvasHeight);
        var figures = conn.getCanvas().getFigures();
        figures.each(function (i, e) {
            var box = e.getBoundingBox();
            // remove shapes which are hit by the input or output ports. It is not possible to route
            // out from a not walkable area
            if (box.hitTest(fromPt.x, fromPt.y) === true || box.hitTest(toPt.x, toPt.y)) {
                return;
            }

            var x = box.x >> shift;
            var y = box.y >> shift;
            if (x < 1 || y < 1) {
                return;
            }
            var r_orig = (box.x + box.w + oneShift2) >> shift;
            var b_orig = (box.y + box.h + oneShift2) >> shift;
            for (var i = x; i <= r_orig; i++) {
                for (var j = y; j <= b_orig; j++) {
                    grid.setWalkableAt(i, j, false);
                }
            }
        });


        // 3. make the are walkable on the edge of the port side. Otherwise we a
        //    an enclosed area around the port if we are very close to another shape
        //
        var box = conn.getSource().getParent().getBoundingBox();
        if (toDir === 1 || toDir === 3) {
            var y = box.y >> shift;
            if (y > 0) {
                var b_orig = box.y + box.h;
                var i = (toPt.x >> shift);

                for (var j = y - 1; j << shift <= b_orig; j++) {
                    grid.setWalkableAt(i, j, true);
                }
            }
        }
        else {
            var x = box.x >> shift;
            if (x > 0) {
                var r_orig = box.x + box.w;
                var j = (toPt.x >> shift);
                for (var i = x - 1; i << shift <= r_orig; i++) {
                    grid.setWalkableAt(i, j, true);
                }
            }
        }

        box = conn.getTarget().getParent().getBoundingBox();
        if (fromDir === 1 || fromDir === 3) {
            var y = box.y >> shift;
            if (y > 0) {
                var b_orig = box.y + box.h;
                var i = (fromPt.x >> shift);
                for (var j = y - 1; j << shift <= b_orig; j++) {
                    grid.setWalkableAt(i, j, true);
                }
            }
        }
        else {
            var x = box.x >> shift;
            if (x > 0) {
                var r_orig = box.x + box.w;
                var j = (fromPt.x >> shift);
                for (var i = x - 1; i << shift <= r_orig; i++) {
                    grid.setWalkableAt(i, j, true);
                }
            }
        }

        return grid;
    },

    /**
     * @method
     * move the point in the given direction with the given offset
     *
     * @param {draw2d.geo.Point} pt
     * @param {Number} direction
     * @param {Number} adjustment
     *
     * @returns {draw2d.geo.Point}
     */
    getAddjustedPoint: function (pt, direction, adjustment) {

        switch (direction) {
            case draw2d.geo.Rectangle.DIRECTION_UP:
                return new draw2d.geo.Point(pt.x, pt.y - adjustment);
            case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                return new draw2d.geo.Point(pt.x + adjustment, pt.y);
            case draw2d.geo.Rectangle.DIRECTION_DOWN:
                return new draw2d.geo.Point(pt.x, pt.y + adjustment);
            case draw2d.geo.Rectangle.DIRECTION_LEFT:
                return new draw2d.geo.Point(pt.x - adjustment, pt.y);
        }
    },

    adjustPath: function (pt, path, direction) {
        var shift = this.useShift;
        var x = pt.x >> shift;
        var y = pt.y >> shift;
        $.each(path, function (i, e) {
            if (y === (e[1] >> shift)) {
                e[1] = pt.y;
            }
            else {
                return false;
            }
        });
        $.each(path, function (i, e) {
            if (x === (e[0] >> shift)) {
                e[0] = pt.x;
            }
            else {
                return false;
            }
        });
    },


    getSquareDistance: function (p1, p2) { // square distance between 2 points

        var dx = p1.x - p2.x,
            dy = p1.y - p2.y;

        return dx * dx +
            dy * dy;
    },

    getSquareSegmentDistance: function (p, p1, p2) { // square distance from a point to a segment

        var x = p1.x,
            y = p1.y,

            dx = p2.x - x,
            dy = p2.y - y,

            t;

        if (dx !== 0 || dy !== 0) {

            t = ((p.x - x) * dx +
                (p.y - y) * dy) /
                (dx * dx +
                dy * dy);

            if (t > 1) {
                x = p2.x;
                y = p2.y;

            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }

        dx = p.x - x;
        dy = p.y - y;

        return dx * dx +
            dy * dy;
    },

    simplifyRadialDistance: function (points, sqTolerance) { // distance-based simplification

        var i,
            len = points.length,
            point = null,
            prevPoint = points[0],
            newPoints = [prevPoint];

        for (i = 1; i < len; i++) {
            point = points[i];

            if (this.getSquareDistance(point, prevPoint) > sqTolerance) {
                newPoints.push(point);
                prevPoint = point;
            }
        }

        if (prevPoint !== point) {
            newPoints.push(point);
        }

        return newPoints;
    },


    // simplification using optimized Douglas-Peucker algorithm with recursion elimination

    simplifyDouglasPeucker: function (points, sqTolerance) {

        var len = points.length,

            MarkerArray = (typeof Uint8Array !== undefined + '')
                ? Uint8Array
                : Array,

            markers = new MarkerArray(len),

            first = 0,
            last = len - 1,

            i,
            maxSqDist,
            sqDist,
            index,

            firstStack = [],
            lastStack = [],

            newPoints = [];

        markers[first] = markers[last] = 1;

        while (last) {

            maxSqDist = 0;

            for (i = first + 1; i < last; i++) {
                sqDist = this.getSquareSegmentDistance(points[i], points[first], points[last]);

                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }

            if (maxSqDist > sqTolerance) {
                markers[index] = 1;

                firstStack.push(first);
                lastStack.push(index);

                firstStack.push(index);
                lastStack.push(last);
            }

            first = firstStack.pop();
            last = lastStack.pop();
        }

        for (i = 0; i < len; i++) {
            if (markers[i]) {
                newPoints.push(points[i]);
            }
        }

        return newPoints;
    },


    simplify: function (points, tolerance, highestQuality) {

        var sqTolerance = (tolerance !== undefined)
            ? tolerance * tolerance
            : 1;

        if (!highestQuality) {
            points = this.simplifyRadialDistance(points, sqTolerance);
        }
        points = this.simplifyDouglasPeucker(points, sqTolerance);

        return points;
    }
});

/**
 * @class draw2d.layout.connection.MuteableManhattanConnectionRouter
 *
 * JUST FOR RESEARCH AT THE MOMENT!!!!!!
 *
 * @inheritable
 * @author Andreas Herz
 *
 * @extends  draw2d.layout.connection.ManhattanConnectionRouter
 */

draw2d.layout.connection.MuteableManhattanConnectionRouter = draw2d.layout.connection.ManhattanConnectionRouter.extend({
    NAME: "draw2d.layout.connection.MuteableManhattanConnectionRouter",

    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    UP: new draw2d.geo.Ray(0, -1),
    DOWN: new draw2d.geo.Ray(0, 1),
    LEFT: new draw2d.geo.Ray(-1, 0),
    RIGHT: new draw2d.geo.Ray(1, 0),

    init: function () {
        this._super();

        this.rowsUsed = {};//new HashMap<Integer, Integer>();
        this.colsUsed = {};//new HashMap<Integer, Integer>();
        this.constraints = {};//new HashMap<Connection, Object>();
        this.reservedInfo = {};//new HashMap<Connection, ReservedInfo>();
    },


    /**
     * @method
     * Layout the hands over connection in a manhattan like layout
     *
     * @param {draw2d.Connection} conn
     * @param {draw2d.util.ArrayList} oldVertices old/existing vertices of the Connection
     */
    route: function (conn, oldVertices) {
        this.rowsUsed = {};//new HashMap<Integer, Integer>();
        this.colsUsed = {};//new HashMap<Integer, Integer>();
        this.constraints = {};//new HashMap<Connection, Object>();
        this.reservedInfo = {};//new HashMap<Connection, ReservedInfo>();

        var canvas = conn.getCanvas();
        var i;

        var startPoint = conn.getStartPoint();
        var endPoint = conn.getEndPoint();

        var start = new draw2d.geo.Ray(startPoint);
        var end = new draw2d.geo.Ray(endPoint);
        var average = new draw2d.geo.Ray((start.x + end.x) / 2, (start.y + end.y) / 2);

        var direction = new draw2d.geo.Ray(end.x - start.x, end.y - start.y);
        var startNormal = this.getStartDirection(conn);
        var endNormal = this.getEndDirection(conn);

        var positions = new draw2d.util.ArrayList();
        var horizontal = startNormal.isHorizontal();

        if (horizontal) {
            positions.add(start.y);
        }
        else {
            positions.add(start.x);
        }

        horizontal = !horizontal;

        // dot product is zero if the vector orthogonal (90�?)
        if (startNormal.dot(endNormal) === 0) {
            if ((startNormal.dot(direction) >= 0) && (endNormal.dot(direction) <= 0)) {
                // 0
            } else {

                // 2
                if (startNormal.dot(direction) < 0)
                    i = startNormal.similarity(start.getTranslated(startNormal.getScaled(10)));
                else {
                    if (horizontal)
                        i = average.y;
                    else
                        i = average.x;
                }

                positions.add(i);
                horizontal = !horizontal;

                if (endNormal.dot(direction) > 0) {
                    i = endNormal.similarity(end.getTranslated(endNormal.getScaled(10)));
                }
                else {
                    if (horizontal) {
                        i = average.y;
                    }
                    else {
                        i = average.x;
                    }
                }
                positions.add(i);
                horizontal = !horizontal;
            }
        } else {
            if (startNormal.dot(endNormal) > 0) {
                //1
                if (startNormal.dot(direction) >= 0)
                    i = startNormal.similarity(start.getTranslated(startNormal.getScaled(10)));
                else
                    i = endNormal.similarity(end.getTranslated(endNormal.getScaled(10)));
                positions.add(i);
                horizontal = !horizontal;
            } else {
                //3 or 1
                if (startNormal.dot(direction) < 0) {
                    i = startNormal.similarity(start.getTranslated(startNormal.getScaled(10)));
                    positions.add(i);
                    horizontal = !horizontal;
                }

                // my tweak to route SCA wires starts
                if (this.isCycle(conn)) {
                    if (horizontal)
                        i = conn.getSource().getParent().getBoundingBox().getTop() - 10;// * index;
                    else
                        i = conn.getSource().getParent().getBoundingBox().getRight() + 10;// * index;
                } else {
                    if (horizontal) {
                        var j = average.y;

                        var next = endNormal.similarity(end.getTranslated(endNormal.getScaled(10)));

                        var trial = new draw2d.geo.Ray((positions.get(positions.getSize() - 1)), j);
                        var figure = this.findFirstFigureAtStraightLine(canvas, trial, this.LEFT, draw2d.util.ArrayList.EMPTY_LIST);

                        while (figure != null && figure.getBoundingBox().x + figure.getBoundingBox().width > next) {
                            j = figure.getBoundingBox().y + figure.getBoundingBox().height + 5;
                            trial.y = j;
                            figure = this.findFirstFigureAtStraightLine(canvas, trial, this.LEFT, Collections.EMPTY_LIST);
                        }

                        i = j;

                    } else {
                        var figure = this.findFirstFigureAtStraightLine(canvas, start, this.RIGHT, this.getExcludingFigures(conn));
                        if (figure == null)
                            i = average.x;
                        else {
                            i = Math.min(average.x, start.getTranslated(new draw2d.geo.Ray(3 * (figure.getBoundingBox().x - start.x) / 4, 0)).x);
                            i = Math.max(start.x, i);
                        }
                        i = this.adjust(conn, i);
                    }
                }
                // my tweak to route SCA wires ends
                positions.add(i);
                horizontal = !horizontal;
                /*

                 if (startNormal.dot(direction) < 0) {
                 i = endNormal.similarity(end.getTranslated(endNormal.getScaled(10)));
                 positions.add( i);
                 horizontal = !horizontal;
                 } else {
                 // my tweak to route SCA wires starts
                 var reroute = false;

                 var j = end.y;

                 var figure = this.findFirstFigureAtStraightLine(canvas, new draw2d.geo.Ray(i, j), this.RIGHT, this.getExcludingFigures(conn));
                 while (figure != null && figure.getBoundingBox().x < end.x) {
                 reroute = true;
                 if (direction.dot(this.DOWN) > 0)
                 j = figure.getBoundingBox().y - 5;
                 else
                 j = figure.getBoundingBox().y + figure.getBoundingBox().height + 5;

                 figure = this.findFirstFigureAtStraightLine(canvas, new draw2d.geo.Ray(i, j), this.RIGHT, this.getExcludingFigures(conn));
                 }
                 if (reroute) {
                 i = j;
                 positions.add(i);
                 horizontal = !horizontal;

                 i = endNormal.similarity(end.getTranslated(endNormal.getScaled(10)));
                 positions.add( i);
                 horizontal = !horizontal;

                 }
                 // my tweak to route SCA wires ends

                 }
                 */
            }
        }
        if (horizontal)
            positions.add(end.y);
        else
            positions.add(end.x);

        this.processPositions(start, end, positions, startNormal.isHorizontal(), conn);


        this._paint(conn);
    },

    /**
     * @method
     *
     * @param {draw2d.Connection} connection
     * @param {Number} r
     * @param {Number} n
     * @param {Number} x
     *
     * @private
     */
    getColumnNear: function (connection, r, n, x) {
        var min = Math.min(n, x);
        var max = Math.max(n, x);

        if (min > r) {
            max = min;
            min = r - (min - r);
        }
        if (max < r) {
            min = max;
            max = r + (r - max);
        }

        var proximity = 0;
        var direction = -1;
        if (r % 6 != 0) {
            r = r - ( r % 6);
        }

        var i;
        while (proximity < r) {
            i = parseInt(r + proximity * direction);
            if (!(i in this.colsUsed)) {
                this.colsUsed[i] = i;
                this.reserveColumn(connection, i);
                return i;
            }

            if (i <= min) {
                return i + 6;
            }

            if (i >= max) {
                return i - 6;
            }

            if (direction === 1) {
                direction = -1;
            }
            else {
                direction = 1;
                proximity += 6;
            }
        }
        return r;
    },

    getRowNear: function (connection, r, n, x) {
        var min = Math.min(n, x);
        var max = Math.max(n, x);

        if (min > r) {
            max = min;
            min = r - (min - r);
        }
        if (max < r) {
            min = max;
            max = r + (r - max);
        }

        var proximity = 0;
        var direction = -1;
        if (r % 6 != 0) {
            r = r - ( r % 6);
        }

        var i;
        while (proximity < r) {
            i = parseInt(r + proximity * direction);
            if (!(i in this.rowsUsed)) {
                this.rowsUsed[i] = i;
                this.reserveRow(connection, i);
                return i;
            }
            if (i <= min)
                return i + 6;
            if (i >= max)
                return i - 6;
            if (direction == 1)
                direction = -1;
            else {
                direction = 1;
                proximity += 6;
            }
        }
        return r;
    },

    /**
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     **/
    getEndDirection: function (conn) {
        var p = conn.getEndPoint();
        var rect = conn.getTarget().getParent().getBoundingBox();
        return this.getDirection(rect, p);
    },


    /**
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     **/
    getStartDirection: function (conn) {
        var p = conn.getStartPoint();
        var rect = conn.getSource().getParent().getBoundingBox();
        return this.getDirection(rect, p);
    },

    /**
     * Returns the direction the point <i>p</i> is in relation to the given rectangle.
     * Possible values are LEFT (-1,0), RIGHT (1,0), UP (0,-1) and DOWN (0,1).
     *
     * @param r the rectangle
     * @param p the point
     * @return the direction from <i>r</i> to <i>p</i>
     */
    getDirection: function (r, p) {
        var i = Math.abs(r.y - p.y);
        var distance = Math.abs(r.x - p.x);
        var direction = this.LEFT;

        if (i <= distance) {
            distance = i;
            direction = this.UP;
        }

        i = Math.abs(r.getBottom() - p.y);
        if (i <= distance) {
            distance = i;
            direction = this.DOWN;
        }

        i = Math.abs(r.getRight() - p.x);
        if (i < distance) {
            distance = i;
            direction = this.RIGHT;
        }

        return direction;
    },

    processPositions: function (/*Ray*/ start, /*Ray*/ end, /*List*/ positions, /*boolean*/ horizontal, /*Connection*/ conn) {
        this.removeReservedLines(conn);

        var pos = [];
        if (horizontal)
            pos.push(start.x);
        else
            pos.oush(start.y);
        var i;
        for (i = 0; i < positions.getSize(); i++) {
            pos.push(positions.get(i));
        }

        if (horizontal == (positions.getSize() % 2 == 1)) {
            pos.push(end.x);
        }
        else {
            pos.push(end.y);
        }

        conn.addPoint(new draw2d.geo.Point(start.x, start.y));
        var p;
        var current, prev, min, max;
        var adjust;
        for (i = 2; i < pos.length - 1; i++) {
            horizontal = !horizontal;
            prev = pos[i - 1];
            current = pos[i];

            adjust = (i !== pos.length - 2);
            if (horizontal) {
                if (adjust) {
                    min = pos[i - 2];
                    max = pos[i + 2];
                    pos[i] = current = this.getRowNear(conn, current, min, max);
                }
                p = new draw2d.geo.Point(prev, current);
            } else {
                if (adjust) {
                    min = pos[i - 2];
                    max = pos[i + 2];
                    pos[i] = current = this.getColumnNear(conn, current, min, max);
                }
                p = new draw2d.geo.Point(current, prev);
            }
            conn.addPoint(p);
        }
        conn.addPoint(new draw2d.geo.Point(end.x, end.y));
    },


    removeReservedLines: function (connection) {
        var rInfo = this.reservedInfo[connection];
        if (typeof rInfo === "undefined" || rInfo === null)
            return;

        for (var i = 0; i < rInfo.reservedRows.getSize(); i++) {
            delete this.rowsUsed[rInfo.reservedRows.get(i)];
        }
        for (var i = 0; i < rInfo.reservedCols.getSize(); i++) {
            delete this.colsUsed[rInfo.reservedCols.get(i)];
        }
        delete this.reservedInfo[connection];
    },

    reserveColumn: function (connection, column) {
        var info = this.reservedInfo[connection];
        if (typeof info === "undefined" || info === null) {
            info = {reservedCols: new draw2d.util.ArrayList(), reservedRows: new draw2d.util.ArrayList()};
            this.reservedInfo[connection] = info;
        }
        info.reservedCols.add(column);
    },

    reserveRow: function (connection, row) {
        var info = this.reservedInfo[connection];
        if (typeof info === "undefined" || info === null) {
            info = {reservedCols: new draw2d.util.ArrayList(), reservedRows: new draw2d.util.ArrayList()};
            this.reservedInfo[connection] = info;
        }
        info.reservedRows.add(row);
    },

    getConstraint: function (connection) {
        return this.constraints[connection];
    },

    setConstraint: function (connection, constraint) {
        this.constraints[connection] = constraint;
    },

    isCycle: function (conn) {
        var source = conn.getSource().getParent();
        var target = conn.getTarget().getParent();

        return source.id === target.id;
    },

    getExcludingFigures: function (conn) {
        var excluding = new draw2d.util.ArrayList();

        excluding.add(conn.getSource().getParent());
        excluding.add(conn.getTarget().getParent());

        return excluding;
    },

    findFirstFigureAtStraightLine: function (canvas, /*Ray*/ start, /*Ray*/ direction, /*List*/ excluding) {
        var figure = null;

        var figures = canvas.getFigures();
        var _this = this;
        figures.each(function (i, child) {
            try {
                if (!excluding.contains(child)) {
                    var rect = child.getBoundingBox();
                    if (_this.LEFT.equals(direction)) {
                        if (start.x > rect.x && start.y >= rect.y && start.y <= rect.y + rect.h) {
                            if (figure === null || rect.x > figure.getBoundingBox().x)
                                figure = child;
                        }
                    } else if (_this.RIGHT.equals(direction)) {
                        if (start.x < rect.x + rect.w && start.y >= rect.y && start.y <= rect.y + rect.h) {
                            if (figure == null || rect.x < figure.getBoundingBox().x)
                                figure = child;
                        }
                    } else if (_this.UP.equals(direction)) {
                        if (start.y > rect.y && start.x >= rect.x && start.x <= rect.x + rect.w) {
                            if (figure === null || rect.y > figure.getBoundingBox().y)
                                figure = child;
                        }
                    } else if (_this.DOWN.equals(direction)) {
                        if (start.y < rect.y + rect.h && start.x >= rect.x && start.x <= rect.x + rect.w) {
                            if (figure === null || rect.y < figure.getBoundingBox().y)
                                figure = child;
                        }
                    }
                }
            }
            catch (exc) {
                console.log(exc);
            }
        });
        return figure;
    },

    adjust: function (connection, col) {
        var column = col;

        var start = connection.getSource().getPosition();

        var connections = connection.getCanvas().getLines();
        connections.each(function (i, conn) {
            try {
                if (conn === connection)
                    return;

                var end = conn.getTarget().getPosition();
                if (start.x < end.x && start.y == end.y) {
                    if (conn.getVertices().getMidpoint().x <= col)
                        column = conn.getVertices().getMidpoint().x - 5;
                }
            }
            catch (exc) {
                console.log(exc);
            }
        });
        return column;
    }


});

/**
 * @class draw2d.layout.connection.SketchBridgedConnectionRouter
 *
 * Provide a router which routes the connection in a hand drawn manner.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @since 2.7.2
 * @extends  draw2d.layout.connection.MazeConnectionRouter
 */
draw2d.layout.connection.SketchConnectionRouter = draw2d.layout.connection.MazeConnectionRouter.extend({
    NAME: "draw2d.layout.connection.SketchConnectionRouter",


    /**
     * @constructor
     * Creates a new Router object.
     *
     */
    init: function () {
        this._super();

        this.useSpline = true;
        this.useShift = 5;
        this.useSimplifyValue = 0.2;
        this.finder = new PF.JumpPointFinder({allowDiagonal: false, dontCrossCorners: true});
    },

    /**
     * @method
     * Callback method if the router has been assigned to a connection.
     *
     * @param {draw2d.Connection} connection The assigned connection
     * @template
     * @since 2.7.2
     */
    onInstall: function (connection) {
        connection.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

    }

});

/**
 * @class draw2d.layout.mesh.MeshLayouter
 * Layouter for a mesh or grid.
 *
 * @author Andreas Herz
 */
draw2d.layout.mesh.MeshLayouter = Class.extend({

    /**
     * @constructor
     * Creates a new layouter object.
     */
    init: function () {
    },

    /**
     * @method
     * Return a changes list for an existing mesh/canvas to ensure that the element to insert
     * did have enough space.
     *
     * @param {draw2d.Canvas} canvas the canvas to use for the analytic
     * @param {draw2d.Figure} figure The figure to add to the exising canvas
     *
     *
     * @return {draw2d.util.ArrayList} a list of changes to apply if the user want to insert he figure.
     */
    add: function (canvas, figure) {
        return new draw2d.util.ArrayList();
    }
});

/**
 * @class draw2d.layout.mesh.ExplodeLayouter
 * Routes a {@link draw2d.Connection}, possibly using a constraint.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.mesh.MeshLayouter
 */
draw2d.layout.mesh.ExplodeLayouter = draw2d.layout.mesh.MeshLayouter.extend({

    MIN_MARGIN: 40,

    /**
     * @constructor
     * Creates a new layouter object.
     */
    init: function () {
    },

    /**
     * @method
     * Return a changes list for an existing mesh/canvas to ensure that the element to insert
     * did have enough space.
     *
     * @param {draw2d.Canvas} canvas the canvas to use for the analytic
     * @param {draw2d.Figure} figure The figure to add to the exising canvas
     * @param {Number} x requested x-position for the figure
     * @param {Number} y requested y-position for the figure
     *
     *
     * @return {draw2d.util.ArrayList} a list of changes to apply if the user want to insert he figure.
     */
    add: function (canvas, figureToAdd) {
        // changes for the differenct octant areas
        var changes = [];
        changes[0] = {x: 0, y: 0};
        changes[1] = {x: 0, y: 0};
        changes[2] = {x: 0, y: 0};
        changes[3] = {x: 0, y: 0};
        changes[4] = {x: 0, y: 0};
        changes[5] = {x: 0, y: 0};
        changes[6] = {x: 0, y: 0};
        changes[7] = {x: 0, y: 0};
        changes[8] = {x: 0, y: 0};

        var boundingBox = figureToAdd.getBoundingBox();

        var figures = canvas.getFigures();
        var figure = null;

        var dis = 0;
        var oct = 0;
        var currentOctChanges = null;
        var i = 0;
        for (i = 0; i < figures.getSize(); i++) {

            figure = figures.get(i);

            // calculate the distance of all corners in relation to the requested x/y coordinate
            //
            if (figure !== figureToAdd) {
                dis = figure.getBoundingBox().getDistance(boundingBox);
                // other figure is to close
                //
                if (dis < this.MIN_MARGIN) {
                    // determine the octant of the figure
                    oct = this.determineOctant(boundingBox, figure.getBoundingBox());

                    // all other relevant segments must be arranged too!!
                    //
                    switch (oct) {
                        case 2:
                            changes[2].x = Math.max(changes[2].x, this.MIN_MARGIN - dis);
                            changes[3].x = Math.max(changes[3].x, this.MIN_MARGIN - dis);
                            changes[4].x = Math.max(changes[4].x, this.MIN_MARGIN - dis);
                            break;
                        case 3:
                            changes[2].x = Math.max(changes[2].x, this.MIN_MARGIN - dis);
                            changes[3].x = Math.max(changes[3].x, this.MIN_MARGIN - dis);
                            changes[4].x = Math.max(changes[4].x, this.MIN_MARGIN - dis);
                            break;
                        case 4:
                            changes[2].x = Math.max(changes[2].x, this.MIN_MARGIN - dis);
                            changes[3].x = Math.max(changes[3].x, this.MIN_MARGIN - dis);
                            changes[4].x = Math.max(changes[4].x, this.MIN_MARGIN - dis);
                            changes[4].y = Math.max(changes[4].y, this.MIN_MARGIN - dis);
                            changes[5].y = Math.max(changes[5].y, this.MIN_MARGIN - dis);
                            changes[6].y = Math.max(changes[6].y, this.MIN_MARGIN - dis);
                            break;
                        case 5:
                            changes[4].y = Math.max(changes[4].y, this.MIN_MARGIN - dis);
                            changes[5].y = Math.max(changes[5].y, this.MIN_MARGIN - dis);
                            changes[6].y = Math.max(changes[6].y, this.MIN_MARGIN - dis);
                            break;
                        case 6:
                            changes[4].y = Math.max(changes[4].y, this.MIN_MARGIN - dis);
                            changes[5].y = Math.max(changes[5].y, this.MIN_MARGIN - dis);
                            changes[6].y = Math.max(changes[6].y, this.MIN_MARGIN - dis);
                            break;
                        case 8:
                            // overlapping
                            // we must determine the new distance with the border of the figures
                            dis = (boundingBox.getBottomRight().getDistance(figure.getBoundingBox().getTopLeft())) | 0;

                            changes[2].x = Math.max(changes[2].x, this.MIN_MARGIN + dis);
                            changes[3].x = Math.max(changes[3].x, this.MIN_MARGIN + dis);
                            changes[4].x = Math.max(changes[4].x, this.MIN_MARGIN + dis);
                            changes[4].y = Math.max(changes[4].y, this.MIN_MARGIN + dis);
                            changes[5].y = Math.max(changes[5].y, this.MIN_MARGIN + dis);
                            changes[6].y = Math.max(changes[6].y, this.MIN_MARGIN + dis);
                            changes[8].x = Math.max(changes[8].x, this.MIN_MARGIN + dis);
//        				changes[8].y =  Math.max(changes[8].y,this.MIN_MARGIN+dis);
                    }
                }
            }
            // Falls die minimale Distance zu den Objecten kleiner 80 ist, muss ein layout erfolgen
        }

        // calculate the adjustment for each figure
        //
        var result = new draw2d.util.ArrayList();
        for (i = 0; i < figures.getSize(); i++) {
            figure = figures.get(i);
            if (figure !== figureToAdd) {
                oct = this.determineOctant(boundingBox, figure.getBoundingBox());
                currentOctChanges = changes[oct];
                if (currentOctChanges.x !== 0 || currentOctChanges.y !== 0) {
                    result.add(new draw2d.layout.mesh.ProposedMeshChange(figure, currentOctChanges.x, currentOctChanges.y));
                }
            }
        }

        return result;
    },


    /**
     * @method
     * Determin Octant
     *
     *    0 | 1 | 2
     *    __|___|__
     *    7 | 8 | 3
     *    __|___|__
     *    6 | 5 | 4
     *
     * @param cx
     * @param cy
     * @param cw
     * @param ch
     * @param ox
     * @param oy
     * @param ow
     * @param oh
     * @returns {Number}
     */
    determineOctant: function (r1, r2) {
        var ox = r1.x;
        var oy = r1.y;
        var ow = r1.w;
        var oh = r1.h;

        var cx = r2.x;
        var cy = r2.y;
        var cw = r2.w;
        var ch = r2.h;
        var oct = 0;

        if (cx + cw <= ox) {
            if ((cy + ch) <= oy) {
                oct = 0;
            }
            else if (cy >= (oy + oh)) {
                oct = 6;
            }
            else {
                oct = 7;
            }
        }
        else if (cx >= ox + ow) {
            if (cy + ch <= oy) {
                oct = 2;
            }
            else if (cy >= oy + oh) {
                oct = 4;
            }
            else {
                oct = 3;
            }
        }
        else if (cy + ch <= oy) {
            oct = 1;
        }
        else if (cy >= oy + oh) {
            oct = 5;
        }
        else {
            oct = 8;
        }

        return oct;
    }
});

/**
 * @class draw2d.layout.mesh.ProposedMeshChange
 * Change proposal for grid/mesh layout changes.
 *
 * @author Andreas Herz
 */
draw2d.layout.mesh.ProposedMeshChange = Class.extend({

    /**
     * @constructor
     * Creates change object.
     */
    init: function (figure, x, y) {
        this.figure = figure;
        this.x = x;
        this.y = y;
    },

    /**
     * @method
     * Return the related figure.
     *
     * @return {draw2d.Figure} the figure to the related change proposal
     */
    getFigure: function () {
        return this.figure;
    },

    /**
     * @method
     * The proposed x-coordinate.
     *
     * @return {Number}
     */
    getX: function () {
        return this.x;
    },

    /**
     * @method
     * The proposed y-coordinate
     *
     * @return {Number}
     */
    getY: function () {
        return this.y;
    }

});
/**
 * @class draw2d.layout.locator.Locator
 *
 * Controls the location of an IFigure.
 *
 * @author Andreas Herz
 */
draw2d.layout.locator.Locator = Class.extend({
    NAME: "draw2d.layout.locator.Locator",

    /**
     * @constructor
     * Initial Constructor
     *
     */
    init: function () {
    },


    /**
     * @method
     * Controls the location of an I{@link draw2d.Figure}
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @template
     **/
    relocate: function (index, figure) {
    },

    /**
     * @method
     * Return a clone of the locator object
     *
     * @returns
     */
    clone: function () {
        return eval("new " + this.NAME + "()");
    }
});
/**
 * @class draw2d.layout.locator.PortLocator
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.PortLocator = draw2d.layout.locator.Locator.extend({
    NAME: "draw2d.layout.locator.PortLocator",

    /**
     * @constructor
     * Default constructor for a Locator which can layout a port in context of a
     * {@link grapiti.shape.node.Node}
     *
     */
    init: function () {
        this._super();
    },

    applyConsiderRotation: function (port, x, y) {
        var parent = port.getParent();

        // determine the width/height before manipulate the
        // matrix of the shape
        var halfW = parent.getWidth() / 2;
        var halfH = parent.getHeight() / 2;

        var rotAngle = parent.getRotationAngle();
        var m = Raphael.matrix();
        m.rotate(rotAngle, halfW, halfH);
        if (rotAngle === 90 || rotAngle === 270) {
            var ratio = parent.getHeight() / parent.getWidth();
            m.scale(ratio, 1 / ratio, halfW, halfH);
        }

        port.setPosition(m.x(x, y), m.y(x, y));
    }
});
/**
 * @class draw2d.layout.locator.XYAbsPortLocator
 *
 * Create a locator for fixed x/y coordinate position.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.PortLocator
 * @since 4.0.0
 */
draw2d.layout.locator.XYAbsPortLocator = draw2d.layout.locator.PortLocator.extend({
    NAME: "draw2d.layout.locator.XYAbsPortLocator",

    /**
     * @constructor
     *
     * {@link grapiti.shape.node.Node}
     *
     * @param {Number} x the x coordinate of the port relative to the left of the parent
     * @param {Number} y the y coordinate of the port relative to the top of the parent
     */
    init: function (x, y) {
        this._super();

        this.x = x;
        this.y = y;
    },

    /**
     * @method
     * Controls the location of an I{@link draw2d.Figure}
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @template
     **/
    relocate: function (index, figure) {
        this.applyConsiderRotation(figure, this.x, this.y);
    }

});


/**
 * @class draw2d.layout.locator.XYRelPortLocator
 *
 * Create a locator for a relative x/y coordinate position. The coordinates are named in percentage
 * relative to the top/left corner of the parent node.<br>
 * <br>
 * <br>
 * Resize the shape in the example to see what happens.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.node.End({x:130,y:30,width:100,height:50});
 *     figure.add(new draw2d.shape.basic.Label({text:"x"}), new draw2d.layout.locator.XYRelPortLocator(20,20));
 *
 *     canvas.add(figure);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.PortLocator
 * @since 4.0.0
 */
draw2d.layout.locator.XYRelPortLocator = draw2d.layout.locator.PortLocator.extend({
    NAME: "draw2d.layout.locator.XYRelPortLocator",

    /**
     * @constructor
     *
     *
     * @param {Number} xPercentage the x coordinate in percent of the port relative to the left of the parent
     * @param {Number} yPercentage the y coordinate in percent of the port relative to the top of the parent
     */
    init: function (xPercentage, yPercentage) {
        this._super();

        this.x = xPercentage;
        this.y = yPercentage;
    },

    /**
     * @method
     * Controls the location of an I{@link draw2d.Figure}
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @template
     **/
    relocate: function (index, figure) {
        var node = figure.getParent();
        var x = node.getWidth() / 100 * this.x;
        var y = node.getHeight() / 100 * this.y;

        this.applyConsiderRotation(figure, x, y);
    }

});


/**
 * @class draw2d.layout.locator.InputPortLocator
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.InputPortLocator = draw2d.layout.locator.PortLocator.extend({
    NAME: "draw2d.layout.locator.InputPortLocator",

    /**
     * @constructor
     * Default constructor for a Locator which can layout a port in context of a
     * {@link grapiti.shape.node.Node}
     *
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Controls the location of an I{@link draw2d.Figure}
     *
     * @param {Number} index port index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @template
     **/
    relocate: function (index, figure) {
        var node = figure.getParent();

        var dividerFactor = 1;
        var thisNAME = this.NAME;
        var portIndex = 1;
        node.getPorts().each(function (i, p) {
            portIndex = (p === figure) ? dividerFactor : portIndex;
            dividerFactor += p.getLocator().NAME === thisNAME ? 1 : 0;
        });
        this.applyConsiderRotation(figure, 0, (node.getHeight() / dividerFactor) * portIndex);
    }

});

/**
 * @class draw2d.layout.locator.OutputPortLocator
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.OutputPortLocator = draw2d.layout.locator.PortLocator.extend({
    NAME: "draw2d.layout.locator.OutputPortLocator",

    /**
     * @constructor
     * Default constructor for a Locator which can layout a port in context of a
     * {@link grapiti.shape.node.Node}
     *
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Controls the location of an I{@link draw2d.Figure}
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @template
     **/
    relocate: function (index, figure) {
        var node = figure.getParent();
        var dividerFactor = 1;
        var thisNAME = this.NAME;
        var portIndex = 1;
        node.getPorts().each(function (i, p) {
            portIndex = (p === figure) ? dividerFactor : portIndex;
            dividerFactor += p.getLocator().NAME === thisNAME ? 1 : 0;
        });
        this.applyConsiderRotation(figure, node.getWidth(), (node.getHeight() / dividerFactor) * portIndex);
    }

});

/**
 * @class draw2d.layout.locator.ExtendPortLocator
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.ExtendPortLocator = draw2d.layout.locator.PortLocator.extend({
    NAME: "draw2d.layout.locator.ExtendPortLocator",

    /**
     * @constructor
     * Default constructor for a Locator which can layout a port in context of a
     * {@link grapiti.shape.node.Node}
     *
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Controls the location of an I{@link draw2d.Figure}
     *
     * @param {Number} index child index of the figure
     * @param {draw2d.Figure} figure the figure to control
     *
     * @template
     **/
    relocate: function (index, figure) {
        var node = figure.getParent();
        var dividerFactor = 1;
        var thisNAME = this.NAME;
        var portIndex = 1;
        node.getPorts().each(function (i, p) {
            portIndex = (p === figure) ? dividerFactor : portIndex;
            dividerFactor += p.getLocator().NAME === thisNAME ? 1 : 0;
        });
        this.applyConsiderRotation(figure, (node.getWidth() / dividerFactor) * portIndex, node.getHeight());
    }

});


/**
 * @class draw2d.layout.locator.ConnectionLocator
 *
 * Repositions a Figure attached to a Connection when the
 * Connection is moved. Provides for alignment at the start
 * (source), middle, or end (target) of the Connection.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.ConnectionLocator = draw2d.layout.locator.Locator.extend({
    NAME: "draw2d.layout.locator.ConnectionLocator",

    /**
     * @constructor
     * Default constructor for a Locator which can layout a figure in context of a
     * {@link grapiti.Connector}
     *
     * @param {draw2d.Figure} parentShape the base or parent figure for the locator
     */
    init: function (parentShape) {
        this._super(parentShape);
    }

});

/**
 * @class draw2d.layout.locator.ManhattanMidpointLocator
 *
 * A ManhattanMidpointLocator that is used to place figures at the midpoint of a Manhatten routed
 * connection. The midpoint is always in the center of an edge.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *     //create and add two Node which contains Ports (In and OUT)
 *     var start = new draw2d.shape.node.Start({x:50,y:50});
 *     var end   = new draw2d.shape.node.End({x:230,y:100});
 *
 *     canvas.add( start);
 *     canvas.add( end);
 *
 *     // Create a Connection and connect he Start and End node
 *     //
 *     var c = new draw2d.Connection();
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *     canvas.add(c);
 *
 *     // create a label which should attach to the connection
 *     //
 *     var label = new draw2d.shape.basic.Label({text:"I'm a Label"});
 *     label.setColor("#0d0d0d");
 *     label.setFontColor("#0d0d0d");
 *     label.setBackgroundColor("#f0f0f0");
 *
 *     // add the decoration to the connection with a ManhattanMidpointLocator.
 *     //
 *     c.add(label, new draw2d.layout.locator.ManhattanMidpointLocator());
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.ConnectionLocator
 */
draw2d.layout.locator.ManhattanMidpointLocator = draw2d.layout.locator.ConnectionLocator.extend({
    NAME: "draw2d.layout.locator.ManhattanMidpointLocator",

    /**
     * @constructor
     * Constructs a ManhattanMidpointLocator with associated Connection c.
     *
     * @param {draw2d.Connection} c the connection associated with the locator
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Relocates the given Figure always in the center of an edge.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var conn = target.getParent();
        var points = conn.getVertices();

        var segmentIndex = Math.floor((points.getSize() - 2) / 2);
        if (points.getSize() <= segmentIndex + 1)
            return;

        var p1 = points.get(segmentIndex);
        var p2 = points.get(segmentIndex + 1);

        var x = ((p2.x - p1.x) / 2 + p1.x - target.getWidth() / 2) | 0;
        var y = ((p2.y - p1.y) / 2 + p1.y - target.getHeight() / 2) | 0;

        target.setPosition(x, y);
    }
});


/**
 * @class draw2d.layout.locator.PolylineMidpointLocator
 *
 * A PolylineMidpointLocator is used to place figures at the midpoint of a routed
 * connection. <br>
 * If the connection did have an odd count of points the figure is located in the center vertex of the polyline.<br>
 * On an even count of junction point, the figure will be center on the middle segment of the ploy line.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.ManhattanMidpointLocator
 */
draw2d.layout.locator.PolylineMidpointLocator = draw2d.layout.locator.ManhattanMidpointLocator.extend({
    NAME: "draw2d.layout.locator.PolylineMidpointLocator",

    /**
     * @constructor
     * Constructs a ManhattanMidpointLocator with associated Connection c.
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var conn = target.getParent();
        var points = conn.getVertices();

        // it has an event count of points -> use the manhattan algorithm...this is working
        // well in this case
        if (points.getSize() % 2 === 0) {
            this._super(index, target);
        }
        // odd count of points. take the center point as fulcrum
        else {

            var index = Math.floor(points.getSize() / 2);

            var p1 = points.get(index);


            target.setPosition(p1.x - (target.getWidth() / 2), p1.y - (target.getHeight() / 2));
        }
    }
});


/**
 * @class draw2d.layout.locator.ParallelMidpointLocator
 *
 * A ParallelMidpointLocator that is used to place label at the midpoint of a  routed
 * connection. The midpoint is always in the center of an edge.
 * The label is aligned to the connection angle.
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.ConnectionLocator
 * @since 4.4.4
 */
draw2d.layout.locator.ParallelMidpointLocator = draw2d.layout.locator.ConnectionLocator.extend({
    NAME: "draw2d.layout.locator.ParallelMidpointLocator",

    /**
     * @constructor
     * Constructs a ManhattanMidpointLocator with associated Connection c.
     *
     * if the parameter <b>distanceFromConnection</b> is less than zero the label is
     * placed above of the connection. Else the label is below the connection.
     *
     * @param {Number} distanceFromConnection the distance of the label to the connection.
     */
    init: function (distanceFromConnection) {
        this._super();

        if (typeof distanceFromConnection !== "undefined") {
            this.distanceFromConnection = parseFloat(distanceFromConnection);
        }
        else {
            this.distanceFromConnection = -5;
        }
    },


    /**
     * @method
     * Relocates the given Figure always in the center of an edge.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var conn = target.getParent();
        var points = conn.getVertices();

        var segmentIndex = Math.floor((points.getSize() - 2) / 2);
        if (points.getSize() <= segmentIndex + 1)
            return;

        var p1 = points.get(segmentIndex);
        var p2 = points.get(segmentIndex + 1);

        // calculate the distance of the label (above or below the connection)
        var distance = this.distanceFromConnection <= 0 ? this.distanceFromConnection - target.getHeight() : this.distanceFromConnection;

        // get the angle of the segment
        var nx = p1.x - p2.x;
        var ny = p1.y - p2.y;
        var length = Math.sqrt(nx * nx + ny * ny);
        var radian = -Math.asin(ny / length);
        var angle = (180 / Math.PI) * radian;
        if (radian < 0) {
            if (p2.x < p1.x) {
                radian = Math.abs(radian) + Math.PI;
                angle = 360 - angle;
                distance = -distance - target.getHeight();
            }
            else {
                radian = Math.PI * 2 - Math.abs(radian);
                angle = 360 + angle;
            }
        }
        else {
            if (p2.x < p1.x) {
                radian = Math.PI - radian;
                angle = 360 - angle;
                distance = -distance - target.getHeight();
            }
        }

        var rotAnchor = this.rotate(length / 2 - target.getWidth() / 2, distance, 0, 0, radian);

        // rotate the x/y coordinate with the calculated angle around "p1"
        //
        var rotCenterOfLabel = this.rotate(0, 0, target.getWidth() / 2, target.getHeight() / 2, radian);

        target.setRotationAngle(angle);
        target.setPosition(rotAnchor.x - rotCenterOfLabel.x + p1.x, rotAnchor.y - rotCenterOfLabel.y + p1.y);
    },

    rotate: function (x, y, xm, ym, radian) {
        var cos = Math.cos,
            sin = Math.sin;

        // Subtract midpoints, so that midpoint is translated to origin
        // and add it in the end again
        return {
            x: (x - xm) * cos(radian) - (y - ym) * sin(radian) + xm,
            y: (x - xm) * sin(radian) + (y - ym) * cos(radian) + ym
        };
    }

});


/**
 * @class draw2d.layout.locator.TopLocator
 *
 * A TopLocator  is used to place figures at the top/center of a parent shape.
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.TopLocator = draw2d.layout.locator.Locator.extend({
    NAME: "draw2d.layout.locator.TopLocator",

    /**
     * @constructor
     * Constructs a ManhattanMidpointLocator with associated Connection c.
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var parent = target.getParent();
        var boundingBox = parent.getBoundingBox();

        var targetBoundingBox = target.getBoundingBox();
        if (target instanceof draw2d.Port) {
            target.setPosition(boundingBox.w / 2, 0);
        }
        else {
            target.setPosition(boundingBox.w / 2 - (targetBoundingBox.w / 2), -(targetBoundingBox.h + 2));
        }
    }
});


/**
 * @class draw2d.layout.locator.BottomLocator
 *
 * A bottomLocator is used to place figures at the bottom of a parent shape.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var circle = new draw2d.shape.basic.Circle({
 *         x:100,
 *         y:50,
 *         diameter:120,
 *         stroke: 3,
 *         color:"#A63343",
 *         bgColor:"#E65159"
 *     });
 *
 *     circle.add(new draw2d.shape.basic.Label({text:"Bottom Label"}), new draw2d.layout.locator.BottomLocator());
 *     canvas.add( circle);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.BottomLocator = draw2d.layout.locator.Locator.extend({
    NAME: "draw2d.layout.locator.BottomLocator",

    /**
     * @constructor
     *
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var parent = target.getParent();
        var boundingBox = parent.getBoundingBox();

        var targetBoundingBox = target.getBoundingBox();
        if (target instanceof draw2d.Port) {
            target.setPosition(boundingBox.w / 2, boundingBox.h);
        }
        else {
            target.setPosition(boundingBox.w / 2 - targetBoundingBox.w / 2, 2 + boundingBox.h);
        }
    }
});


/**
 * @class draw2d.layout.locator.LeftLocator
 *
 * A LeftLocator is used to place figures to the left of a parent shape.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     start.add(new draw2d.shape.basic.Label({text:"Left Label"}), new draw2d.layout.locator.LeftLocator());
 *     canvas.add( start, 100,50);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.LeftLocator = draw2d.layout.locator.Locator.extend({
    NAME: "draw2d.layout.locator.LeftLocator",

    /**
     * @constructor
     * Constructs a locator with associated parent.
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var parent = target.getParent();
        var boundingBox = parent.getBoundingBox();

        var targetBoundingBox = target.getBoundingBox();
        target.setPosition(-targetBoundingBox.w - 5, (boundingBox.h / 2) - (targetBoundingBox.h / 2));
    }
});


/**
 * @class draw2d.layout.locator.RightLocator
 *
 * A RightLocator is used to place figures to the right of a parent shape.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var end = new draw2d.shape.node.End();
 *     end.add(new draw2d.shape.basic.Label({text:"Right Label"}), new draw2d.layout.locator.RightLocator());
 *     canvas.add( end, 50,50);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.RightLocator = draw2d.layout.locator.Locator.extend({
    NAME: "draw2d.layout.locator.RightLocator",

    /**
     * @constructor
     * Constructs a locator with associated parent.
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var parent = target.getParent();
        var boundingBox = parent.getBoundingBox();

        var targetBoundingBox = target.getBoundingBox();
        target.setPosition(boundingBox.w + 5, (boundingBox.h / 2) - (targetBoundingBox.h / 2));
    }
});


/**
 * @class draw2d.layout.locator.CenterLocator
 *
 * A CenterLocator is used to place figures in the center of a parent shape.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     // create a basic figure and add a Label/child via API call
 *     //
 *     var circle = new draw2d.shape.basic.Circle({diameter:120});
 *     circle.setStroke(3);
 *     circle.setColor("#A63343");
 *     circle.setBackgroundColor("#E65159");
 *     circle.add(new draw2d.shape.basic.Label({text:"Center Label"}), new draw2d.layout.locator.CenterLocator());
 *     canvas.add( circle, 100,50);
 *
 *
 * @author Andreas Herz
 * @extend draw2d.layout.locator.Locator
 */
draw2d.layout.locator.CenterLocator = draw2d.layout.locator.Locator.extend({
    NAME: "draw2d.layout.locator.CenterLocator",

    /**
     * @constructor
     * Constructs a locator with associated parent.
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Relocates the given Figure.
     *
     * @param {Number} index child index of the target
     * @param {draw2d.Figure} target The figure to relocate
     **/
    relocate: function (index, target) {
        var parent = target.getParent();
        var boundingBox = parent.getBoundingBox();

        // TODO: instanceof is always a HACK. ugly. Redirect the call to the figure instead of
        // determine the position with a miracle.
        //
        if (target instanceof draw2d.Port) {
            target.setPosition(boundingBox.w / 2, boundingBox.h / 2);
        }
        else {
            var targetBoundingBox = target.getBoundingBox();
            target.setPosition(boundingBox.w / 2 - targetBoundingBox.w / 2, boundingBox.h / 2 - (targetBoundingBox.h / 2));
        }
    }
});


/**
 * @class draw2d.policy.EditPolicy
 *
 * A pluggable contribution implementing a portion of an behavior.
 *
 *
 * EditPolicies should determine an Canvas or figure editing capabilities. It is possible to implement
 * an figure such that it handles all editing responsibility. However, it is much more flexible
 * and object-oriented to use EditPolicies. Using policies, you can pick and choose the editing
 * behavior for an figure/canvas without being bound to its class hierarchy. Code management is easier.
 *
 *
 * This interface is not intended to be implemented by clients. Clients should inherit from {@link draw2d.policy.figure.SelectionFeedbackPolicy}
 * or {@link draw2d.policy.canvas.SelectionPolicy}.
 *
 * @author Andreas Herz
 */
draw2d.policy.EditPolicy = Class.extend({

    NAME: "draw2d.policy.EditPolicy",

    /**
     * @constructor
     *
     */
    init: function () {
    },

    /**
     * @method
     * Called by the host if the policy has been installed.
     *
     * @param {draw2d.Canvas/draw2d.Figure} host
     */
    onInstall: function (host) {
    },

    /**
     * @method
     * Called by the host if the policy has been uninstalled.
     *
     * @param {draw2d.Canvas/draw2d.Figure} host
     */
    onUninstall: function (host) {
    }
});


/**
 * @class draw2d.policy.canvas.CanvasPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.EditPolicy
 */
draw2d.policy.canvas.CanvasPolicy = draw2d.policy.EditPolicy.extend({

    NAME: "draw2d.policy.canvas.CanvasPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },

    onInstall: function (canvas) {
    },

    onUninstall: function (canvas) {
    },

    /**
     * @method
     * Called by the canvas if the user click on a figure.
     *
     * @param {draw2d.Figure} the figure under the click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 3.0.0
     *
     * @template
     */
    onClick: function (figure, mouseX, mouseY, shiftKey, ctrlKey) {
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseMove: function (canvas, x, y, shiftKey, ctrlKey) {
    },

    /**
     * @method
     * Called by the canvas if the user double click on a figure.
     *
     * @param {draw2d.Figure} the figure under the double click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 4.1.0
     *
     * @template
     */
    onDoubleClick: function (figure, mouseX, mouseY, shiftKey, ctrlKey) {
    },


    /**
     * @method
     * Adjust the coordinates to the given constraint.
     *
     * @param figure
     * @param {draw2d.geo.Point} clientPos
     * @returns {draw2d.geo.Point} the contraint position of th efigure
     */
    snap: function (canvas, figure, clientPos) {
        return clientPos;
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {

    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
    },

    /**
     * @method
     *
     * @param {draw2d.Figure} figure the shape below the mouse or null
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseUp: function (figure, x, y, shiftKey, ctrlKey) {
    },


    /**
     * @method
     * Called if the user press the right mouse in the canvas.
     *
     * @param {draw2d.Figure|draw2d.shape.basic.Line} figure the figure below the mouse
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since 4.4.0
     */
    onRightMouseDown: function (figure, x, y, shiftKey, ctrlKey) {
    },


    /**
     * @method
     * Helper method to make an monochrome GIF image WxH pixels big, first create a properly sized array: var pixels = new Array(W*H);.
     * Then, for each pixel X,Y that should be opaque, store a 1 at the proper location: pixels[X+Y*W] = 1;.
     * Finally, create the image: var my_glif = createGif(W, H, pixels, color);
     * "0" pixels are transparent.
     * The <b>color</b> defines the foreground color.
     *
     * Now, you can specify this image as the SRC attribute of an IMG tag: document.write("<IMG SRC=\"" + my_glif + "\">");
     * or for the canvas as background-image css attribute.
     *
     *
     * @param w
     * @param h
     * @param d
     * @param color
     * @returns {String}
     */
    createMonochromGif: function (w, h, d, color) {
        color = new draw2d.util.Color(color);
        var r = String.fromCharCode(w % 256) + String.fromCharCode(w / 256) + String.fromCharCode(h % 256) + String.fromCharCode(h / 256);
        var gif = "GIF89a" + r + "\xf0\0\0\xff\xff\xff" + String.fromCharCode(color.red) + String.fromCharCode(color.green) + String.fromCharCode(color.blue) + "\x21\xf9\4\1\0\0\0\0,\0\0\0\0" + r + "\0\2";

        // help method to generate uncompressed in memory GIF data structur without the usage of a canvas or any other
        // heavy weight stuff.
        var b = {
            bit: 1,
            byte_: 0,
            data: "",

            writeBit: function (b) {
                if (b) this.byte_ |= this.bit;
                this.bit <<= 1;
                if (this.bit == 256) {
                    this.bit = 1;
                    this.data += String.fromCharCode(this.byte_);
                    this.byte_ = 0;
                }
            },

            get: function () {
                var result = "";
                var data = this.data;
                if (this.bit != 1) {
                    data += String.fromCharCode(this.byte_);
                }
                for (var i = 0; i < data.length + 1; i += 255) {
                    chunklen = data.length - i;
                    if (chunklen < 0) chunklen = 0;
                    if (chunklen > 255) chunklen = 255;
                    result += String.fromCharCode(chunklen) + data.substring(i, i + 255);
                }
                return result + "\0";
            }
        };

        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                b.writeBit(d[x + w * y]);
                b.writeBit(0);
                b.writeBit(0);
                b.writeBit(0);
                b.writeBit(0);
                b.writeBit(1);
            }
        }
        gif += b.get() + ";";

        return "data:image/gif;base64," + draw2d.util.Base64.encode(gif);
    }

});

/**
 * @class draw2d.policy.canvas.ConnectionInterceptorPolicy
 * Connection interceptors are basically event handlers from which you can return a value
 * that tells draw2d to abort what it is that it was doing.<br>
 * <br>
 * Interceptors can be registered via the registerEditPolicy method on the draw2d canvas just like any other
 * edit policies.<br>
 * <br>
 * The <b>delegateDrop</b> method is responsible for all drop event especially to all connection and port handlings.
 *
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 * @since 5.0.0
 */
draw2d.policy.canvas.ConnectionInterceptorPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.ConnectionInterceptorPolicy",

    /**
     * @constructor
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called if the user want drop a port over any draw2d.Figure.<br>
     * Return a non <b>null</b> value if the interceptor accept the drop event.<br>
     * <br>
     * It is possible to delegate the drop event to another figure if the policy
     * returns another figure. This is usefull if a figure want to accept a port
     * drop event and delegates this drop event to another port.<br>
     *
     *
     * @param {draw2d.Figure} draggedFigure the dragged figure
     * @param {draw2d.Figure} dropTarget the potential drop target determined by the framework
     */
    delegateDrop: function (draggedFigure, dropTarget) {

        // a composite accept any kind of figures exceptional ports
        //
        if (!(draggedFigure instanceof draw2d.Port) && dropTarget instanceof draw2d.shape.composite.StrongComposite) {
            return dropTarget;
        }

        // Ports accepts only Ports as DropTarget
        //
        if (!(dropTarget instanceof draw2d.Port) || !(draggedFigure instanceof draw2d.Port)) {
            return null;
        }

        // consider the max possible connections for this port
        //
        if (dropTarget.getConnections().getSize() >= dropTarget.getMaxFanOut()) {
            return null;
        }

        // It is not allowed to connect two output ports
        if (draggedFigure instanceof draw2d.OutputPort && dropTarget instanceof draw2d.OutputPort) {
            return null;
        }

        // It is not allowed to connect two input ports
        if (draggedFigure instanceof draw2d.InputPort && dropTarget instanceof draw2d.InputPort) {
            return null;
        }

        // It is not possible to create a loop back connection at the moment.
        // Reason: no connection router implemented for this case
        if ((draggedFigure instanceof draw2d.Port) && (dropTarget instanceof draw2d.Port)) {
            if (draggedFigure.getParent().getId() === dropTarget.getParent().getId()) {
                return null;
            }
        }

        // return the dropTarget determined by the framework or delegate it to another
        // figure.
        return dropTarget;
    }

});


/**
 * @class draw2d.policy.canvas.KeyboardPolicy
 * Default interface for keyboard interaction with the canvas.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.KeyboardPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.KeyboardPolicy",

    /**
     * @constructor
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Callback if the user release a key
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onKeyUp: function (canvas, keyCode, shiftKey, ctrlKey) {
        // do nothing per default
    },

    /**
     * @method
     * Callback if the user press a key down
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onKeyDown: function (canvas, keyCode, shiftKey, ctrlKey) {
        // do nothing per default
    }


});


/**
 * @class draw2d.policy.canvas.DefaultKeyboardPolicy
 * Standard keyboard policy. This is the standard installed keyboard policy.
 * <br>
 * <br>
 * Keyboard commands
 * <ul>
 *    <li>DEL    - delete selection</li>
 * </ul>
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.KeyboardPolicy
 */
draw2d.policy.canvas.DefaultKeyboardPolicy = draw2d.policy.canvas.KeyboardPolicy.extend({

    NAME: "draw2d.policy.canvas.DefaultKeyboardPolicy",

    /**
     * @constructor
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Callback if the user press a key.<br>
     * This implementation checks only if the <b>DEL</b> has been pressed and creates an
     * CommandDelete if this happens.
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onKeyDown: function (canvas, keyCode, shiftKey, ctrlKey) {
        //
        if (keyCode === 46 && canvas.getCurrentSelection() !== null) {
            // create a single undo/redo transaction if the user delete more than one element.
            // This happens with command stack transactions.
            //
            canvas.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
            canvas.getSelection().each(function (index, figure) {
                var cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE));
                if (cmd !== null) {
                    canvas.getCommandStack().execute(cmd);
                }
            });
            // execute all single commands at once.
            canvas.getCommandStack().commitTransaction();
        }
        else {
            this._super(canvas, keyCode, shiftKey, ctrlKey);
        }

    }


});


/**
 * @class draw2d.policy.canvas.ExtendedKeyboardPolicy
 * Extended keyboard policy to <b>delete</b> and <b>group</b> figures in the canvas.
 * <br>
 * Keyboard commands
 * <ul>
 *    <li>DEL    - delete selection</li>
 *    <li>Ctrl+G - group/ungroup selection</li>
 *    <li>Ctrl+B - send current selection in the background (toBack)</li>
 *    <li>Ctrl+F - send current selection in the foreground (toFront)</li>
 * </ul>
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.KeyboardPolicy
 */
draw2d.policy.canvas.ExtendedKeyboardPolicy = draw2d.policy.canvas.KeyboardPolicy.extend({

    NAME: "draw2d.policy.canvas.ExtendedKeyboardPolicy",

    /**
     * @constructor
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Callback if the user press a key
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {Number} keyCode the pressed key
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onKeyDown: function (canvas, keyCode, shiftKey, ctrlKey) {
        if (canvas.getCurrentSelection() !== null && ctrlKey === true) {
            switch (keyCode) {

                case 71: // G
                    if (canvas.getCurrentSelection() instanceof draw2d.shape.composite.Group && canvas.getSelection().getSize() === 1) {
                        canvas.getCommandStack().execute(new draw2d.command.CommandUngroup(canvas, canvas.getCurrentSelection()));
                    }
                    else {
                        canvas.getCommandStack().execute(new draw2d.command.CommandGroup(canvas, canvas.getSelection()));
                    }
                    break;
                case 66: // B
                    canvas.getCurrentSelection().toBack();
                    break;
                case 70: // F
                    canvas.getCurrentSelection().toFront();
            }
        }
        else {
            this._super(canvas, keyCode, shiftKey, ctrlKey);
        }
    }


});


/**
 * @class draw2d.policy.canvas.SelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SelectionPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.SelectionPolicy",

    /**
     * @constructor
     * Creates a new selection policy
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Unselect the given figure in the canvas and remove all resize handles
     *
     * @param {draw2d.Canvas} canvas
     * @param {draw2d.Figure} figure
     */
    unselect: function (canvas, figure) {
        canvas.getSelection().remove(figure);

        figure.unselect();

        canvas.fireEvent("select", null);
    }

});


/**
 * @class draw2d.policy.canvas.SingleSelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
draw2d.policy.canvas.SingleSelectionPolicy = draw2d.policy.canvas.SelectionPolicy.extend({

    NAME: "draw2d.policy.canvas.SingleSelectionPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
        this.mouseMovedDuringMouseDown = false;
        this.mouseDraggingElement = null;
        this.mouseDownElement = null;
    },

    /**
     * @inheritdoc
     */
    select: function (canvas, figure) {
        if (canvas.getSelection().contains(figure)) {
            return; // nothing to to
        }

        var oldSelection = canvas.getSelection().getPrimary();
        if (canvas.getSelection().getPrimary() !== null) {
            this.unselect(canvas, canvas.getSelection().getPrimary());
        }

        if (figure !== null) {
            figure.select(true); // primary selection
        }

        canvas.getSelection().setPrimary(figure);

        // inform all selection listeners about the new selection.
        //
        if (oldSelection !== figure) {
            canvas.fireEvent("select", figure);
        }
    },


    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
        this.mouseMovedDuringMouseDown = false;
        var canDragStart = true;

        var figure = canvas.getBestFigure(x, y);

        // may the figure is assigned to a composite. In this case the composite can
        // override the event receiver
        while (figure !== null && figure.getComposite() !== null) {
            var delegate = figure.getComposite().delegateSelectionHandling(figure);
            if (delegate === figure) {
                break;
            }
            figure = delegate;
        }

        // check if the user click on a child shape. DragDrop and movement must redirect
        // to the parent
        // Exception: Port's
        while ((figure !== null && figure.getParent() !== null) && !(figure instanceof draw2d.Port)) {
            figure = figure.getParent();
        }

        if (figure !== null && figure.isDraggable()) {
            canDragStart = figure.onDragStart(x - figure.getAbsoluteX(), y - figure.getAbsoluteY(), shiftKey, ctrlKey);
            // Element send a veto about the drag&drop operation
            if (canDragStart === false) {
                this.mouseDraggingElement = null;
                this.mouseDownElement = figure;
            }
            else {
                this.mouseDraggingElement = figure;
                this.mouseDownElement = figure;
            }
        }

        if (figure !== canvas.getSelection().getPrimary() && figure !== null && figure.isSelectable() === true) {
            this.select(canvas, figure);

            // its a line
            if (figure instanceof draw2d.shape.basic.Line) {
                // you can move a line with Drag&Drop...but not a connection.
                // A Connection is fixed linked with the corresponding ports.
                //
                if (!(figure instanceof draw2d.Connection)) {
                    canvas.draggingLineCommand = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));
                    if (canvas.draggingLineCommand !== null) {
                        canvas.draggingLine = figure;
                    }
                }
            }
            else if (canDragStart === false) {
                figure.unselect();
            }
        }
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
        this.mouseMovedDuringMouseDown = true;
        if (this.mouseDraggingElement !== null) {
            // Can be a ResizeHandle or a normal Figure
            //
            var sel = canvas.getSelection().getAll();
            if (!sel.contains(this.mouseDraggingElement)) {
                this.mouseDraggingElement.onDrag(dx, dy, dx2, dy2);
            }
            else {
                sel.each(function (i, figure) {
                    figure.onDrag(dx, dy, dx2, dy2);
                });
            }

            var p = canvas.fromDocumentToCanvasCoordinate(canvas.mouseDownX + (dx / canvas.zoomFactor), canvas.mouseDownY + (dy / canvas.zoomFactor));
            var target = canvas.getBestFigure(p.x, p.y, this.mouseDraggingElement);

            if (target !== canvas.currentDropTarget) {
                if (canvas.currentDropTarget !== null) {
                    canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement);
                    canvas.currentDropTarget = null;
                }
                if (target !== null) {
                    canvas.currentDropTarget = target.onDragEnter(this.mouseDraggingElement);
                }
            }
        }
        // Connection didn't support panning at the moment. There is no special reason for that. Just an interaction
        // decision.
        //
        else if (this.mouseDownElement !== null && !(this.mouseDownElement instanceof draw2d.Connection)) {
            this.mouseDownElement.onPanning(dx, dy, dx2, dy2);
        }
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {
        if (this.mouseDraggingElement !== null) {
            var redrawConnection = new draw2d.util.ArrayList();
            if (this.mouseDraggingElement instanceof draw2d.shape.node.Node) {
                // TODO: don't add the connections with to check if a repaint is required
                //       may a moved connection didn't have an intersection with the named lines.
                //       in this case a redraw is useless
                canvas.lineIntersections.each(function (i, inter) {
                    if (!redrawConnection.contains(inter.line)) redrawConnection.add(inter.line);
                    if (!redrawConnection.contains(inter.other)) redrawConnection.add(inter.other);
                });
            }

            // start CommandStack transaction
            canvas.getCommandStack().startTransaction();

            var sel = canvas.getSelection().getAll();
            if (!sel.contains(this.mouseDraggingElement)) {
                this.mouseDraggingElement.onDragEnd(x, y, shiftKey, ctrlKey);
            }
            else {
                canvas.getSelection().getAll().each(function (i, figure) {
                    figure.onDragEnd(x, y, shiftKey, ctrlKey);
                });
            }

            if (canvas.currentDropTarget !== null && !this.mouseDraggingElement.isResizeHandle) {
                this.mouseDraggingElement.onDrop(canvas.currentDropTarget, x, y, shiftKey, ctrlKey);
                canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement);
                canvas.currentDropTarget.onCatch(this.mouseDraggingElement, x, y, shiftKey, ctrlKey);
                canvas.currentDropTarget = null;
            }

            // end command stack trans
            canvas.getCommandStack().commitTransaction();

            if (this.mouseDraggingElement instanceof draw2d.shape.node.Node) {
                canvas.lineIntersections.each(function (i, inter) {
                    if (!redrawConnection.contains(inter.line)) redrawConnection.add(inter.line);
                    if (!redrawConnection.contains(inter.other)) redrawConnection.add(inter.other);
                });
                redrawConnection.each(function (i, line) {
                    line.svgPathString = null;
                    line.repaint();
                });
            }

            this.mouseDraggingElement = null;
        }

        // Reset the current selection if the user click in the blank canvas.
        // Don't reset the selection if the user pan the canvas
        //
        if (this.mouseDownElement === null && this.mouseMovedDuringMouseDown === false) {
            this.select(canvas, null);
        }

        this.mouseDownElement = null;
        this.mouseMovedDuringMouseDown = false;
    }
});


/**
 * @class draw2d.policy.canvas.GhostMoveSelectionPolicy
 *
 * A drag&Drop feedback handler for the canvas. The policy didn't move the
 * shapes in real time rather it shows a ghost rectangle as feedback. <br>
 * <br>
 * The shapes are updated after the drag&drop operation.
 *
 *
 * See the example:
 *
 *       @example preview small frame
 *
 *       // install the policy to the canvas
 *       canvas.installEditPolicy(new draw2d.policy.canvas.GhostMoveSelectionPolicy());
 *
 *       // add some demo figure to the canvas
 *       canvas.add(new draw2d.shape.basic.Circle({diameter: 50, x: 10,  y: 30}));
 *       canvas.add(new draw2d.shape.basic.Circle({diameter: 30, x: 90,  y: 50}));
 *       canvas.add(new draw2d.shape.basic.Circle({diameter: 60, x: 110, y: 30}));
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"move the circle to see the drag&drop feedback"}),5,5);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SingleSelectionPolicy
 */
draw2d.policy.canvas.GhostMoveSelectionPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({

    NAME: "draw2d.policy.canvas.GhostMoveSelectionPolicy",

    /**
     * @constructor
     */
    init: function () {

        this.clone = null;
        this.ghostRectangle1 = null;
        this.ghostRectangle2 = null;

        this._super();
    },


    /**
     * @inheritdoc
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
        this.mouseMovedDuringMouseDown = true;
        if (this.mouseDraggingElement !== null) {

            // if the figure not part of the selection it must be a ResizeHandle...
            var sel = canvas.getSelection().getAll();
            if (!sel.contains(this.mouseDraggingElement)) {
                this.mouseDraggingElement.onDrag(dx, dy, dx2, dy2);
            }
            // it is a normal draw2d.Figure
            else {
                // create the ghost handles for the figure to move and update the position
                //
                if (this.ghostRectangle1 === null) {
                    this.ghostRectangle1 = new draw2d.shape.basic.Rectangle(/*{bgColor:"#303030", alpha:0.1}*/); // new API with version 5.0.0
                    // old API
                    this.ghostRectangle1.setBackgroundColor("#303030");
                    this.ghostRectangle1.setAlpha(0.1);

                    this.ghostRectangle2 = new draw2d.shape.basic.Rectangle(/*{dash:"- ", stroke:1, color:"#5497DC", bgColor:null}*/);
                    this.ghostRectangle2.setDashArray("- ");
                    this.ghostRectangle2.setStroke(1);
                    this.ghostRectangle2.setColor("#5497DC");
                    this.ghostRectangle2.setBackgroundColor(null);

                    this.ghostRectangle1.setBoundingBox(this.mouseDraggingElement.getBoundingBox());
                    this.ghostRectangle2.setBoundingBox(this.mouseDraggingElement.getBoundingBox());

                    this.ghostRectangle1.setCanvas(canvas);
                    this.ghostRectangle1.toFront();

                    this.ghostRectangle2.setCanvas(canvas);
                    this.ghostRectangle2.toFront();

                    this.clone = this.mouseDraggingElement.clone();
                    if (this.clone instanceof draw2d.shape.node.Node) {
                        this.clone.resetPorts();
                    }
                    this.clone.setCanvas(canvas);
                    this.clone.getShapeElement();
                    this.clone.setAlpha(0.4);
                    this.clone.repaint();
                }
                else {
                    this.ghostRectangle1.translate(dx2, dy2);
                    this.ghostRectangle2.translate(dx2, dy2);
                    this.clone.translate(dx2, dy2);
                }

                sel.each(function (i, figure) {
                    // store the new location in a tmp var.
                    figure._newPos = new draw2d.geo.Point(figure.ox + dx, figure.oy + dy);

                    // don't move the figure. This will be done in the MouseUp event
                    //figure.onDrag(dx, dy, dx2, dy2);
                });
            }

            var p = canvas.fromDocumentToCanvasCoordinate(canvas.mouseDownX + (dx / canvas.zoomFactor), canvas.mouseDownY + (dy / canvas.zoomFactor));
            var target = canvas.getBestFigure(p.x, p.y, this.mouseDraggingElement);

            if (target !== canvas.currentDropTarget) {
                if (canvas.currentDropTarget !== null) {
                    canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement);
                    canvas.currentDropTarget = null;
                }
                if (target !== null) {
                    canvas.currentDropTarget = target.onDragEnter(this.mouseDraggingElement);
                }
            }
        }
        // Connection didn't support panning at the moment. There is no special reason for that. Just an interaction
        // decision.
        //
        else if (this.mouseDownElement !== null && !(this.mouseDownElement instanceof draw2d.Connection)) {
            this.mouseDownElement.onPanning(dx, dy, dx2, dy2);
        }
    },

    /**
     * @inheritdoc
     */
    onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {

        if (this.ghostRectangle1 !== null) {
            this.ghostRectangle1.setCanvas(null);
            this.ghostRectangle1 = null;
            this.ghostRectangle2.setCanvas(null);
            this.ghostRectangle2 = null;
            this.clone.setCanvas(null);
            this.clone = null;
        }

        if (this.mouseDraggingElement !== null) {
            var redrawConnection = new draw2d.util.ArrayList();
            if (this.mouseDraggingElement instanceof draw2d.shape.node.Node) {
                canvas.lineIntersections.each(function (i, inter) {
                    if (!redrawConnection.contains(inter.line)) redrawConnection.add(inter.line);
                    if (!redrawConnection.contains(inter.other)) redrawConnection.add(inter.other);
                });
            }


            // start CommandStack transaction
            // Trigger an update of the connections if we have move a draw2d.shape.node.Node figure.
            // (only "nodes" can have ports and connections)
            //
            canvas.getCommandStack().startTransaction();


            var sel = canvas.getSelection().getAll();
            // We move a resize handle...
            //
            if (!sel.contains(this.mouseDraggingElement)) {

                this.mouseDraggingElement.onDragEnd(x, y, shiftKey, ctrlKey);
            }
            // ... or a real figure.
            //
            else {
                canvas.getSelection().getAll().each(function (i, figure) {
                    // set position and cleanup tmp variable
                    if (figure._newPos) {
                        figure.setPosition(figure._newPos);
                        delete figure._newPos;
                    }
                    // done
                    figure.onDragEnd(x, y, shiftKey, ctrlKey);
                });
            }

            // May we drop the figure onto another shape..handle this here
            //
            if (canvas.currentDropTarget !== null && !this.mouseDraggingElement.isResizeHandle) {
                this.mouseDraggingElement.onDrop(canvas.currentDropTarget, x, y, shiftKey, ctrlKey);
                canvas.currentDropTarget.onDragLeave(this.mouseDraggingElement);
                canvas.currentDropTarget.onCatch(this.mouseDraggingElement, x, y, shiftKey, ctrlKey);
                canvas.currentDropTarget = null;
            }

            // end command stack trans
            canvas.getCommandStack().commitTransaction();

            if (this.mouseDraggingElement instanceof draw2d.shape.node.Node) {
                canvas.lineIntersections.each(function (i, inter) {
                    if (!redrawConnection.contains(inter.line)) redrawConnection.add(inter.line);
                    if (!redrawConnection.contains(inter.other)) redrawConnection.add(inter.other);
                });
                redrawConnection.each(function (i, line) {
                    line.svgPathString = null;
                    line.repaint();
                });
            }

            this.mouseDraggingElement = null;
        }

        // Reset the current selection if the user click in the blank canvas.
        // Don't reset the selection if the user is panning the canvas
        //
        if (this.mouseDownElement === null && this.mouseMovedDuringMouseDown === false) {
            this.select(canvas, null);
        }

        this.mouseDownElement = null;
        this.mouseMovedDuringMouseDown = false;
    }
});


/**
 * @class draw2d.policy.canvas.PanningSelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SingleSelectionPolicy
 */
draw2d.policy.canvas.PanningSelectionPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({

    NAME: "draw2d.policy.canvas.PanningSelectionPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {

        this._super(canvas, dx, dy, dx2, dy2);

        if (this.mouseDraggingElement === null && this.mouseDownElement === null) {
            var area = canvas.getScrollArea();
            area.scrollTop(area.scrollTop() + dy2);
            area.scrollLeft(area.scrollLeft() + dx2);
        }
    }
});


/**
 * @class draw2d.policy.canvas.BoundingboxSelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
draw2d.policy.canvas.BoundingboxSelectionPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend({

    NAME: "draw2d.policy.canvas.BoundingboxSelectionPolicy",

    /**
     * @constructor
     * Creates a new selection policy for a canvas.
     */
    init: function () {
        this.isInsideMode = function (rect1, rect2) {
            return rect1.isInside(rect2);
        };
        this.intersectsMode = function (rect1, rect2) {
            return rect1.intersects(rect2);
        };

        this.decision = this.isInsideMode;

        this._super();

        this.boundingBoxFigure1 = null;
        this.boundingBoxFigure2 = null;
        this.x = 0;
        this.y = 0;
    },

    /**
     * @inheritdoc
     */
    select: function (canvas, figure) {
        if (canvas.getSelection().contains(figure)) {
            return; // nothing to to
        }

        var oldSelection = canvas.getSelection().getPrimary();

        if (figure !== null) {
            figure.select(true); // primary selection
        }

        if (oldSelection !== figure) {
            canvas.getSelection().setPrimary(figure);

            // inform all selection listeners about the new selection.
            //
            canvas.fireEvent("select", figure);
        }
    },


    /**
     * @method
     * Set the selection handling mode to <b>intersection</b> or to <b>isInside</b>.
     * <ul>
     *   <li>true = intersection, shapes must only touch the selection bounding box </li>
     *   <li>false = isInside, shapes must complete inside the selection bounding box (default)</li>
     * </ul>
     *
     * @param {boolean} useIntersectionMode set true if the selection handle should use the alternative selection approach
     * @since 4.9.0
     */
    setDecisionMode: function (useIntersectionMode) {
        if (flag === true) {
            this.decision = this.intersectsMode;
        }
        else {
            this.decision = this.isInsideMode;
        }
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
        try {
            var _this = this;

            this.x = x;
            this.y = y;

            var currentSelection = canvas.getSelection().getAll();

            // COPY_PARENT
            // this code part is copied from the parent implementation. The main problem is, that
            // the sequence of unselect/select of elements is broken if we call the base implementation
            // in this case a wrong of events is fired if we select a figure if already a figure is selected!
            // WRONG: selectNewFigure -> unselectOldFigure
            // RIGHT: unselectOldFigure -> selectNewFigure
            // To ensure this I must copy the parent code and postpond the event propagation
            //
            this.mouseMovedDuringMouseDown = false;
            var canDragStart = true;

            var figure = canvas.getBestFigure(x, y);

            // may the figure is assigned to a composite. In this case the composite can
            // override the event receiver
            while (figure !== null && figure.getComposite() !== null) {
                var delegate = figure.getComposite().delegateSelectionHandling(figure);
                if (delegate === figure) {
                    break;
                }
                figure = delegate;
            }

            // check if the user click on a child shape. DragDrop and movement must redirect
            // to the parent
            // Exception: Port's
            while ((figure !== null && figure.getParent() !== null) && !(figure instanceof draw2d.Port)) {
                figure = figure.getParent();
            }

            if (figure !== null && figure.isDraggable()) {
                canDragStart = figure.onDragStart(x - figure.getAbsoluteX(), y - figure.getAbsoluteY(), shiftKey, ctrlKey);
                // Element send a veto about the drag&drop operation
                if (canDragStart === false) {
                    this.mouseDraggingElement = null;
                    this.mouseDownElement = figure;
                }
                else {
                    this.mouseDraggingElement = figure;
                    this.mouseDownElement = figure;
                }
            }

            // we click on an element which are not part of the current selection
            // => reset the "old" current selection if we didn't press the shift key
            if (shiftKey === false) {
                if (this.mouseDownElement !== null && this.mouseDownElement.isResizeHandle === false && !currentSelection.contains(this.mouseDownElement)) {
                    currentSelection.each(function (i, figure) {
                        _this.unselect(canvas, figure);
                    });
                }
            }

            if (figure !== canvas.getSelection().getPrimary() && figure !== null && figure.isSelectable() === true) {
                this.select(canvas, figure);

                // its a line
                if (figure instanceof draw2d.shape.basic.Line) {
                    // you can move a line with Drag&Drop...but not a connection.
                    // A Connection is fixed linked with the corresponding ports.
                    //
                    if (!(figure instanceof draw2d.Connection)) {
                        canvas.draggingLineCommand = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));
                        if (canvas.draggingLineCommand !== null) {
                            canvas.draggingLine = figure;
                        }
                    }
                }
                else if (canDragStart === false) {
                    figure.unselect();
                }
            }
            // END_COPY FROM PARENT


            // inform all figures that they have a new ox/oy position for the relative
            // drag/drop operation
            currentSelection = canvas.getSelection().getAll();
            currentSelection.each(function (i, figure) {
                var canDragStart = figure.onDragStart(figure.getAbsoluteX(), figure.getAbsoluteY(), shiftKey, ctrlKey);
                // its a line
                if (figure instanceof draw2d.shape.basic.Line) {

                }
                else if (canDragStart === false) {
                    _this.unselect(canvas, figure);
                }
            });
        }
        catch (exc) {
            console.log(exc);
        }
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
        try {
            this._super(canvas, dx, dy, dx2, dy2);

            if (this.mouseDraggingElement === null && this.mouseDownElement === null && this.boundingBoxFigure1 === null) {
                this.boundingBoxFigure1 = new draw2d.shape.basic.Rectangle(1, 1);
                this.boundingBoxFigure1.setPosition(this.x, this.y);
                this.boundingBoxFigure1.setCanvas(canvas);
                this.boundingBoxFigure1.setBackgroundColor("#0f0f0f");
                this.boundingBoxFigure1.setAlpha(0.1);

                this.boundingBoxFigure2 = new draw2d.shape.basic.Rectangle(1, 1);
                this.boundingBoxFigure2.setPosition(this.x, this.y);
                this.boundingBoxFigure2.setCanvas(canvas);
                this.boundingBoxFigure2.setDashArray("- ");
                this.boundingBoxFigure2.setStroke(1);
                this.boundingBoxFigure2.setColor(new draw2d.util.Color(84, 151, 220));
                this.boundingBoxFigure2.setBackgroundColor(null);
            }

            if (this.boundingBoxFigure1 !== null) {
                this.boundingBoxFigure1.setDimension(Math.abs(dx), Math.abs(dy));
                this.boundingBoxFigure1.setPosition(this.x + Math.min(0, dx), this.y + Math.min(0, dy));
                this.boundingBoxFigure2.setDimension(Math.abs(dx), Math.abs(dy));
                this.boundingBoxFigure2.setPosition(this.x + Math.min(0, dx), this.y + Math.min(0, dy));
            }
        }
        catch (exc) {
            console.log(exc);
        }
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseUp: function (canvas, x, y, shiftKey, ctrlKey) {
        try {
            var _this = this;
            // delete the current selection if you have clicked in the empty
            // canvas.
            if (this.mouseDownElement === null) {
                canvas.getSelection().getAll().each(function (i, figure) {
                    _this.unselect(canvas, figure);
                });
            }
            else if (this.mouseDownElement instanceof draw2d.ResizeHandle || (this.mouseDownElement instanceof draw2d.shape.basic.LineResizeHandle)) {
                // Do nothing
                // A click on a resize handle didn't change the selection of the canvas
                //
            }
            // delete the current selection if you click on another figure than the current
            // selection and you didn't drag the complete selection.
            else if (this.mouseDownElement !== null && this.mouseMovedDuringMouseDown === false) {
                var sel = canvas.getSelection().getAll();
                if (!sel.contains(this.mouseDownElement)) {
                    canvas.getSelection().getAll().each(function (i, figure) {
                        _this.unselect(canvas, figure);
                    });
                }
            }
            this._super(canvas, x, y, shiftKey, ctrlKey);

            if (this.boundingBoxFigure1 !== null) {
                // retrieve all figures which are inside the bounding box and select all of them
                //
                var selectionRect = this.boundingBoxFigure1.getBoundingBox();
                canvas.getFigures().each(function (i, figure) {
                    if (figure.isSelectable() === true && _this.decision(figure.getBoundingBox(), selectionRect)) {
                        var canDragStart = figure.onDragStart(figure.getAbsoluteX(), figure.getAbsoluteY(), shiftKey, ctrlKey);
                        if (canDragStart === true) {
                            _this.select(canvas, figure, false);
                        }
                    }
                });


                this.boundingBoxFigure1.setCanvas(null);
                this.boundingBoxFigure1 = null;
                this.boundingBoxFigure2.setCanvas(null);
                this.boundingBoxFigure2 = null;
            }

            // adding connections to the selection of the source and target port part of the current selection
            //
            var selection = canvas.getSelection();
            canvas.getLines().each(function (i, line) {
                if (line instanceof draw2d.Connection) {
                    if (selection.contains(line.getSource().getRoot()) && selection.contains(line.getTarget().getRoot())) {
                        _this.select(canvas, line, false);
                    }
                }
            });
        }
        catch (exc) {
            console.log(exc);
        }
    }

});


/**
 * @class draw2d.policy.canvas.ReadOnlySelectionPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SelectionPolicy
 */
draw2d.policy.canvas.ReadOnlySelectionPolicy = draw2d.policy.canvas.SelectionPolicy.extend({

    NAME: "draw2d.policy.canvas.ReadOnlySelectionPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Called by the host if the policy has been installed.
     *
     * @param {draw2d.Canvas/draw2d.Canvas} canvas
     */
    onInstall: function (canvas) {
        canvas.getAllPorts().each(function (i, port) {
            port.setVisible(false);
        });
    },

    /**
     * @method
     * Called by the host if the policy has been uninstalled.
     *
     * @param {draw2d.Canvas/draw2d.Canvas} canvas
     */
    onUninstall: function (canvas) {
        canvas.getAllPorts().each(function (i, port) {
            port.setVisible(true);
        });
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
        var area = canvas.getScrollArea();
        area.scrollTop(area.scrollTop() + dy2);
        area.scrollLeft(area.scrollLeft() + dx2);
    }

});


/**
 * @class draw2d.policy.canvas.DecorationPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.DecorationPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.DecorationPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    }

});


/**
 * @class draw2d.policy.canvas.FadeoutDecorationPolicy
 *
 * Install this edit policy in a canvas if you want fadeout all decorations like ports, resize handles
 * if the user didn't move the mouse. This is good for a clean representation of your diagram.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
draw2d.policy.canvas.FadeoutDecorationPolicy = draw2d.policy.canvas.DecorationPolicy.extend({

    NAME: "draw2d.policy.canvas.FadeoutDecorationPolicy",

    DEFAULT_FADEOUT_DURATION: 60,
    DEFAULT_ALPHA_DECREMENT: 0.05,

    /**
     * @constructor
     * Creates a new fade out policy. Don't forget to install them into the canvas.
     *
     */
    init: function () {
        this._super();
        this.alpha = 1.0;
        this.alphaDec = this.DEFAULT_ALPHA_DECREMENT;
        this.hidePortsCounter = this.DEFAULT_FADEOUT_DURATION;
        this.canvas = null;
        this.portDragging = false;
    },

    onInstall: function (canvas) {
        this.canvas = canvas;
        this.timerId = window.setInterval($.proxy(this.onTimer, this), 50);

        // initial hide all decorations after install of this policy
        //
        this.hidePortsCounter = 1;
        this.alpha = 0.1;
    },

    onUninstall: function (canvas) {
        window.clearInterval(this.timerId);
        this.canvas.getAllPorts().each(function (i, port) {
            port.setAlpha(1.0);
        });

    },

    onTimer: function () {
        this.hidePortsCounter--;
        var _this = this;
        if (this.hidePortsCounter <= 0 && this.alpha > 0) {
            this.alpha = Math.max(0, this.alpha - this.alphaDec);

            this.canvas.getAllPorts().each(function (i, port) {
                port.setAlpha(_this.alpha);
            });

            this.canvas.getSelection().getAll().each(function (i, figure) {
                figure.selectionHandles.each(function (i, handle) {
                    handle.setAlpha(_this.alpha);
                });
            });
        }
        else if (this.hidePortsCounter > 0 && this.alpha !== 1.0) {
            this.alpha = 1;// Math.min(1,this.alpha+0.1);
            this.alphaDec = this.DEFAULT_ALPHA_DECREMENT;
            this.duringHide = false;
            this.canvas.getAllPorts().each(function (i, port) {
                port.setAlpha(_this.alpha);
            });
            this.canvas.getSelection().getAll().each(function (i, figure) {
                figure.selectionHandles.each(function (i, handle) {
                    handle.setAlpha(_this.alpha);
                });
            });
        }
    },


    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
        this.hidePortsCounter = this.DEFAULT_FADEOUT_DURATION;
        this.portDragging = (canvas.getBestFigure(x, y) instanceof draw2d.Port);
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseMove: function (canvas, x, y, shiftKey, ctrlKey) {
        this.hidePortsCounter = this.DEFAULT_FADEOUT_DURATION;
        this.portDragging = false;
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} dx The x diff between start of dragging and this event
     * @param {Number} dy The y diff between start of dragging and this event
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
        if (this.portDragging === false) {
            this.hidePortsCounter = 0;
            this.alphaDec = 0.1;
            this.onTimer();
        }
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseUp: function (figure, x, y, shiftKey, ctrlKey) {
        this.hidePortsCounter = this.DEFAULT_FADEOUT_DURATION;
        this.portDragging = false;
    }

});


/**
 * @class draw2d.policy.canvas.CoronaDecorationPolicy
 * This decorations hides draw2d.Ports which are to far from the current cursor position.
 * This makes the canvas more clean if you have a lot of nodes on it.<br>
 * You didn't see a bunch of ports.
 *
 * See the example:
 *
 *       @example preview small frame
 *
 *       // install the policy to the canvas
 *
 *       // add some demo figure to the canvas
 *       canvas.add(new draw2d.shape.node.Start({x: 10,  y: 30}));
 *       canvas.add(new draw2d.shape.node.End({x: 90,  y: 90}));
 *       canvas.add(new draw2d.shape.node.Between({ x: 310, y: 30}));
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"move the mouse and you see that ports are hidden if the mouse far from it"}),5,5);
 *
 *       canvas.installEditPolicy(new draw2d.policy.canvas.CoronaDecorationPolicy());
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.DecorationPolicy
 */
draw2d.policy.canvas.CoronaDecorationPolicy = draw2d.policy.canvas.DecorationPolicy.extend({

    NAME: "draw2d.policy.canvas.CoronaDecorationPolicy",

    /**
     * @constructor
     *
     */
    init: function () {
        this._super();

        this.startDragX = 0;
        this.startDragY = 0;

        this.diameterToBeVissible = 150;
        this.diameterToBeFullVisible = 20;
        this.sumDiameter = this.diameterToBeVissible + this.diameterToBeFullVisible;

    },

    /**
     * @inheritdoc
     */
    onInstall: function (canvas) {
        var figures = canvas.getFigures();
        figures.each(function (i, figure) {
            figure.getPorts().each(function (i, p) {
                p.setVisible(false);
            });
        });
    },

    /**
     * @inheritdoc
     */
    onUninstall: function (canvas) {
        var figures = canvas.getFigures();
        figures.each(function (i, figure) {
            figure.getPorts().each(function (i, p) {
                if (p.__origAlpha) {
                    p.setAlpha(p.__origAlpha);
                    delete p.__origAlpha;
                }
                p.setVisible(true);
            });
        });
    },


    /**
     * @inheritdoc
     */
    onMouseDown: function (canvas, x, y, shiftKey, ctrlKey) {
        this.startDragX = x;
        this.startDragY = y;
    },

    /**
     * @inheritdoc
     */
    onMouseMove: function (canvas, x, y, shiftKey, ctrlKey) {
        this.updatePorts(canvas, x, y);
    },

    /**
     * @inheritdoc
     */
    onMouseDrag: function (canvas, dx, dy, dx2, dy2) {
        this.updatePorts(canvas, this.startDragX + dx, this.startDragY + dy);
    },


    /**
     * @method
     * Update all ports with the new calculated opacity in relation to the distance to the current
     * mouse position
     *
     * @param canvas
     * @param x
     * @param y
     * @private
     */
    updatePorts: function (canvas, x, y) {
        // 3.) Check now the common objects
        //
        var figures = canvas.getFigures();
        var _this = this;
        figures.each(function (i, figure) {
            if (figure instanceof draw2d.shape.node.Node) {
                if (figure.isVisible() === true && figure.hitTest(x, y, _this.sumDiameter) === true) {
                    figure.getPorts().each(function (i, p) {
                        if (p.isVisible() === false) {
                            p.__origAlpha = figure.getAlpha();
                        }
                        var dist = figure.getBoundingBox().getDistance(new draw2d.geo.Point(x, y));
                        var alpha = 1 - ((100 / (_this.diameterToBeVissible - _this.diameterToBeFullVisible)) * dist) / 100.0;

                        p.setAlpha(alpha);

                        p.setVisible(true);
                    });
                }
                else {
                    figure.getPorts().each(function (i, p) {
                        if (p.__origAlpha) {
                            p.setAlpha(p.__origAlpha);
                            delete p.__origAlpha;
                        }
                        p.setVisible(false);
                    });
                }
            }
        });
    }

});


/**
 * @class draw2d.policy.canvas.SnapToEditPolicy
 *
 * A helper used by Tools for snapping certain mouse interactions.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.SnapToEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.SnapToEditPolicy",

    /**
     * @constructor
     * Creates a new constraint policy for snap to grid
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Adjust the coordinates to the given constraint of the policy.
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {draw2d.Figure} figure the figure to adjust
     * @param {draw2d.geo.Point} clientPos
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    snap: function (canvas, figure, clientPos) {
        return clientPos;
    }
});

/**
 * @class draw2d.policy.canvas.SnapToGridEditPolicy
 *
 * A helper used to perform snapping to a grid, which is specified on the canvas via the various
 * properties defined in this class.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.SnapToEditPolicy
 */
draw2d.policy.canvas.SnapToGridEditPolicy = draw2d.policy.canvas.SnapToEditPolicy.extend({

    NAME: "draw2d.policy.canvas.SnapToGridEditPolicy",

    GRID_COLOR: "#e0e0f0",
    GRID_WIDTH: 10,

    /**
     * @constructor
     * Creates a new constraint policy for snap to grid
     *
     * @param {Number} grid the grid width of the canvas
     */
    init: function (grid) {
        this.canvas = null;
        this.color = new draw2d.util.Color(this.GRID_COLOR);

        this._super();


        if (typeof grid === "undefined") {
            this.grid = this.GRID_WIDTH;
        }
        else {
            this.grid = grid;
        }

        this.generateBackgroundImage(this.grid, this.color);
    },

    onInstall: function (canvas) {
        this.canvas = canvas;
        this.oldBg = this.canvas.html.css("background-image");
        $(canvas.paper.canvas).css({"background-image": "url('" + this.imageDataURL + "')"});
    },

    onUninstall: function (canvas) {
        this.canvas = null;
        $(canvas.paper.canvas).css({"background-image": this.oldBg});
    },

    /**
     * @method
     * Set the grid color
     *
     * @param {draw2d.util.Color|String} color a color object or the CSS string declarion for a color
     * @since 5.0.3
     */
    setGridColor: function (color) {
        this.color = new draw2d.util.Color(color);
        this.generateBackgroundImage(this.grid, this.color);
        if (this.canvas !== null) {
            $(this.canvas.paper.canvas).css({"background-image": "url('" + this.imageDataURL + "')"});
        }
    },

    /**
     * @method
     * Set a new grid width/height
     *
     * @param {Number} grid
     * @since 5.0.3
     */
    setGrid: function (grid) {
        this.grid = Math.min(200, Math.max(2, grid));
        this.generateBackgroundImage(this.grid, this.color);
        if (this.canvas !== null) {
            $(this.canvas.paper.canvas).css({"background-image": "url('" + this.imageDataURL + "')"});
        }
    },


    /**
     * @method
     * Applies a snapping correction to the given result.
     *
     * @param figure
     * @param {draw2d.geo.Point} pos
     * @returns {draw2d.geo.Point} the contraint position of the figure
     * @since 2.3.0
     */
    snap: function (canvas, figure, pos) {

        var snapPoint = figure.getSnapToGridAnchor();

        pos.x = pos.x + snapPoint.x;
        pos.y = pos.y + snapPoint.y;


        pos.x = this.grid * Math.floor(((pos.x + this.grid / 2.0) / this.grid));
        pos.y = this.grid * Math.floor(((pos.y + this.grid / 2.0) / this.grid));

        pos.x = pos.x - snapPoint.x;
        pos.y = pos.y - snapPoint.y;

        return pos;
    },


    /**
     * @method
     * calculate the background image with the given grid width/height
     *
     * @param {Number} grid the grid width of the background decoration
     * @param {draw2d.util.Color} color the color of the grid lines
     * @private
     */
    generateBackgroundImage: function (grid, color) {
        // generate the background pattern with an data URL GIF image. This is much faster than draw
        // the pattern via the canvas and the raphael.line method
        //
        var mypixels = Array(grid * grid);
        // set the pixel at the coordinate [0,0] as opaque.
        for (var x = 0; x < grid; x++) {
            mypixels[x] = 1;
        }
        for (var y = 0; y < (grid * grid); y += grid) {
            mypixels[y] = 1;
        }
        this.imageDataURL = this.createMonochromGif(grid, grid, mypixels, color.hash());
    }

});

/**
 * @class draw2d.policy.canvas.ShowGridEditPolicy
 *
 * Just to paint a grid in the background.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.ShowGridEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.ShowGridEditPolicy",

    GRID_COLOR: "#e0e0f0",
    GRID_WIDTH: 10,

    /**
     * @constructor
     * Creates a new constraint policy for snap to grid
     *
     * @param {Number} grid the grid width of the canvas
     */
    init: function (grid) {
        this.color = new draw2d.util.Color(this.GRID_COLOR);
        this.canvas = null;

        this._super();

        if (typeof grid === "undefined") {
            this.grid = this.GRID_WIDTH;
        }
        else {
            this.grid = grid;
        }
        this.zoom = 1;


        this.generateBackgroundImage(this.grid / this.zoom, this.color);
        this.zoomListener = $.proxy(function (canvas, zoomData) {
            this.zoom = zoomData.factor;
            this.setGrid(this.grid);
        }, this);
    },

    onInstall: function (canvas) {
        this.canvas = canvas;
        this.zoom = canvas.getZoom();
        this.generateBackgroundImage(this.grid / this.zoom, this.color);
        this.oldBg = this.canvas.html.css("background-image");
        $(canvas.paper.canvas).css({"background-image": "url('" + this.imageDataURL + "')"});
//	    canvas.on("zoom", this.zoomListener);
    },

    onUninstall: function (canvas) {
//        canvas.off(this.zoomListener);
        this.canvas = null;
        $(canvas.paper.canvas).css({"background-image": this.oldBg});
    },

    /**
     * @method
     * Set the grid color
     *
     * @param {draw2d.util.Color|String} color a color object or the CSS string declaration for a color
     * @since 5.0.3
     */
    setGridColor: function (color) {
        this.color = new draw2d.util.Color(color);
        this.generateBackgroundImage(this.grid / this.zoom, this.color);
        if (this.canvas !== null) {
            $(this.canvas.paper.canvas).css({"background-image": "url('" + this.imageDataURL + "')"});
        }
    },

    /**
     * @method
     * Set a new grid width/height
     *
     * @param {Number} grid
     * @since 5.0.3
     */
    setGrid: function (grid) {
        this.grid = Math.min(200, Math.max(2, grid));
        this.generateBackgroundImage(this.grid / this.zoom, this.color);
        if (this.canvas !== null) {
            $(this.canvas.paper.canvas).css({"background-image": "url('" + this.imageDataURL + "')"});
        }
    },


    /**
     * @method
     * calculate the background image with the given grid width/height
     *
     * @param {Number} grid the grid width of the background decoration
     * @param {draw2d.util.Color} color the color of the grid lines
     * @private
     */
    generateBackgroundImage: function (grid, color) {
        grid = parseInt(Math.floor(grid));
        // generate the background pattern with an data URL GIF image. This is much faster than draw
        // the pattern via the canvas and the raphael.line method
        //
        var mypixels = Array(grid * grid);
        // set the pixel at the coordinate [0,0] as opaque.
        for (var x = 0; x < grid; x++) {
            mypixels[x] = 1;
        }
        for (var y = 0; y < (grid * grid); y += grid) {
            mypixels[y] = 1;
        }
        this.imageDataURL = this.createMonochromGif(grid, grid, mypixels, color.hash());
    }


});

/**
 * @class draw2d.policy.canvas.ShowDotEditPolicy
 *
 * Paint a dotted pattern in the background of the canvas.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.CanvasPolicy
 * @since 4.0.1
 */
draw2d.policy.canvas.ShowDotEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.ShowDotEditPolicy",

    DOT_COLOR: "#999999",
    DOT_RADIUS: 1,
    DOT_DISTANCE: 20,

    /**
     * @constructor
     * show a dot grid in the canvas for decoration.
     *
     * @param {Number} [dotDistance] the distance or grid width between the dots.
     * @param {Number} [dotRadius] the radius of the dots.
     * @param {draw2d.util.Color|String} [dotColor] the color for the dots.
     */
    init: function (dotDistance, dotRadius, dotColor) {
        this._super();
        this.canvas = null;

        this.dotDistance = dotDistance ? dotDistance : this.DOT_DISTANCE;
        this.dotRadius = dotRadius ? dotRadius : this.DOT_RADIUS;
        this.dotColor = new draw2d.util.Color(dotColor ? dotColor : this.DOT_COLOR);

        // generate the background pattern with an data URL GIF image. This is much faster than draw
        // the pattern via the canvas and the raphael.circle method
        //
        var mypixels = Array(this.dotDistance * this.dotDistance);
        // set the pixel at the coordinate [0,0] as opaque.
        mypixels[0] = 1;
        this.imageDataURL = this.createMonochromGif(this.dotDistance, this.dotDistance, mypixels, this.dotColor);
    },

    onInstall: function (canvas) {
        this.canvas = canvas;
        this.oldBg = this.canvas.html.css("background-image");
        $(canvas.paper.canvas).css({"background-image": "url('" + this.imageDataURL + "')"});
    },

    onUninstall: function (canvas) {
        this.canvas = null;
        $(canvas.paper.canvas).css({"background-image": this.oldBg});
    }


});

/**
 * @class draw2d.policy.canvas.ShowChessboardEditPolicy
 *
 * Just to paint a grid in the background.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.CanvasPolicy
 */
draw2d.policy.canvas.ShowChessboardEditPolicy = draw2d.policy.canvas.CanvasPolicy.extend({

    NAME: "draw2d.policy.canvas.ShowChessboardEditPolicy",

    GRID_COLOR: "#e0e0e0",
    GRID_WIDTH: 20,

    /**
     * @constructor
     * Creates a new constraint policy for snap to grid
     *
     * @param {Number} grid the grid width of the canvas
     */
    init: function (grid) {
        this._super();
        this.canvas = null;
        this.cells = null;
        if (grid) {
            this.grid = grid;
        }
        else {
            this.grid = this.GRID_WIDTH;
        }
    },

    onInstall: function (canvas) {
        this.canvas = canvas;
        this.showGrid();
    },

    onUninstall: function (canvas) {
        this.canvas = null;
        this.cells.remove();
    },

    /**
     * @method
     * paint the grid into the canvas
     *
     * @private
     * @since 2.3.0
     */
    showGrid: function () {
        // vertical lines
        var w = this.canvas.initialWidth;
        var h = this.canvas.initialHeight;
        this.cells = this.canvas.paper.set();

        var even = false;
        var xEven = even;
        for (var x = 0; x < w; x += this.grid) {
            for (var y = 0; y < h; y += this.grid) {
                if (even) {
                    var crect = this.canvas.paper.rect(x, y, this.grid, this.grid);
                    crect.attr({fill: this.GRID_COLOR, "stroke-width": 0});
                    this.cells.push(crect);
                }
                even = !even;
            }
            xEven = !xEven;
            even = xEven;
        }

        this.cells.toBack();
    }

});

draw2d.SnapToHelper = {};

draw2d.SnapToHelper.NORTH = 1;
draw2d.SnapToHelper.SOUTH = 4;
draw2d.SnapToHelper.WEST = 8;
draw2d.SnapToHelper.EAST = 16;
draw2d.SnapToHelper.CENTER = 32;

draw2d.SnapToHelper.NORTH_EAST = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.NORTH_WEST = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.SOUTH_EAST = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.EAST;
draw2d.SnapToHelper.SOUTH_WEST = draw2d.SnapToHelper.SOUTH | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NORTH_SOUTH = draw2d.SnapToHelper.NORTH | draw2d.SnapToHelper.SOUTH;
draw2d.SnapToHelper.EAST_WEST = draw2d.SnapToHelper.EAST | draw2d.SnapToHelper.WEST;
draw2d.SnapToHelper.NSEW = draw2d.SnapToHelper.NORTH_SOUTH | draw2d.SnapToHelper.EAST_WEST;

/**
 * @class draw2d.policy.canvas.SnapToGeometryEditPolicy
 *
 * Snapping is based on the existing children of a container. When snapping a shape,
 * the edges of the bounding box will snap to edges of other rectangles generated
 * from the children of the given canvas.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.canvas.SnapToEditPolicy
 */
draw2d.policy.canvas.SnapToGeometryEditPolicy = draw2d.policy.canvas.SnapToEditPolicy.extend({

    NAME: "draw2d.policy.canvas.SnapToGeometryEditPolicy",

    SNAP_THRESHOLD: 3,
    LINE_COLOR: "#1387E6",
    FADEOUT_DURATION: 300,

    /**
     * @constructor
     * Creates a new constraint policy for snap to grid
     *
     * @param {Number} grid the grid width of the canvas
     */
    init: function () {
        this._super();

        this.rows = null;
        this.cols = null;
        this.vline = null;
        this.hline = null;
        this.canvas = null;
    },

    onInstall: function (canvas) {
        this.canvas = canvas;
    },

    onUninstall: function (canvas) {
        this.canvas = null;
    },

    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onMouseUp: function (figure, x, y, shiftKey, ctrlKey) {
        this.rows = null;
        this.cols = null;
        this.hideVerticalLine();
        this.hideHorizontalLine();
    },

    /**
     * @method
     * Adjust the coordinates to the canvas neighbours
     *
     * @param figure
     * @param {draw2d.geo.Point} pos
     * @returns {draw2d.geo.Point} the contraint position of th efigure
     */
    snap: function (canvas, figure, pos) {

        if (figure instanceof draw2d.ResizeHandle) {
            var snapPoint = figure.getSnapToGridAnchor();
            pos.x += snapPoint.x;
            pos.y += snapPoint.y;
            var result = new draw2d.geo.Point(pos.x, pos.y);

            var snapDirections = figure.getSnapToDirection();
            var direction = this.snapPoint(snapDirections, pos, result);

            // Show a vertical line if the snapper has modified the inputPoint
            //
            if ((snapDirections & draw2d.SnapToHelper.EAST_WEST) && !(direction & draw2d.SnapToHelper.EAST_WEST))
                this.showVerticalLine(result.x);
            else
                this.hideVerticalLine();

            // Show a horizontal line if the snapper has modified the inputPoint
            //
            if ((snapDirections & draw2d.SnapToHelper.NORTH_SOUTH) && !(direction & draw2d.SnapToHelper.NORTH_SOUTH))
                this.showHorizontalLine(result.y);
            else
                this.hideHorizontalLine();

            result.x -= snapPoint.x;
            result.y -= snapPoint.y;
            return result;
        }

        // The user drag&drop a normal figure
        var inputBounds = new draw2d.geo.Rectangle(pos.x, pos.y, figure.getWidth(), figure.getHeight());
        var result = new draw2d.geo.Rectangle(pos.x, pos.y, figure.getWidth(), figure.getHeight());

        var snapDirections = draw2d.SnapToHelper.NSEW;
        var direction = this.snapRectangle(inputBounds, result);

        // Show a vertical line if the snapper has modified the inputPoint
        //
        if ((snapDirections & draw2d.SnapToHelper.WEST) && !(direction & draw2d.SnapToHelper.WEST))
            this.showVerticalLine(result.x);
        else if ((snapDirections & draw2d.SnapToHelper.EAST) && !(direction & draw2d.SnapToHelper.EAST))
            this.showVerticalLine(result.getX() + result.getWidth());
        else
            this.hideVerticalLine();


        // Show a horizontal line if the snapper has modified the inputPoint
        //
        if ((snapDirections & draw2d.SnapToHelper.NORTH) && !(direction & draw2d.SnapToHelper.NORTH))
            this.showHorizontalLine(result.y);
        else if ((snapDirections & draw2d.SnapToHelper.SOUTH) && !(direction & draw2d.SnapToHelper.SOUTH))
            this.showHorizontalLine(result.getY() + result.getHeight());
        else
            this.hideHorizontalLine();

        return result.getTopLeft();
    },


    snapRectangle: function (/*:draw2d.Dimension*/ inputBounds, /*:draw2d.Dimension*/ resultBounds) {
        var topLeftResult = inputBounds.getTopLeft();
        var bottomRightResult = inputBounds.getBottomRight();

        var snapDirectionsTopLeft = this.snapPoint(draw2d.SnapToHelper.NORTH_WEST, inputBounds.getTopLeft(), topLeftResult);
        resultBounds.x = topLeftResult.x;
        resultBounds.y = topLeftResult.y;

        var snapDirectionsBottomRight = this.snapPoint(draw2d.SnapToHelper.SOUTH_EAST, inputBounds.getBottomRight(), bottomRightResult);
        // the first test (topLeft) has not modified the point. so we can modify them with the bottomRight adjustment
        //
        if (snapDirectionsTopLeft & draw2d.SnapToHelper.WEST)
            resultBounds.x = bottomRightResult.x - inputBounds.getWidth();

        // the first test (topLeft) has not modified the point. so we can modify them with the bottomRight adjustment
        //
        if (snapDirectionsTopLeft & draw2d.SnapToHelper.NORTH)
            resultBounds.y = bottomRightResult.y - inputBounds.getHeight();


        return snapDirectionsTopLeft | snapDirectionsBottomRight;
    },

    snapPoint: function (/*:int*/ snapOrientation, /*:draw2d.Point*/ inputPoint, /*:draw2d.Point*/ resultPoint) {
        if (this.rows === null || this.cols === null)
            this.populateRowsAndCols();

        if ((snapOrientation & draw2d.SnapToHelper.EAST) !== 0) {
            var rightCorrection = this.getCorrectionFor(this.cols, inputPoint.getX() - 1, 1);
            if (rightCorrection !== this.SNAP_THRESHOLD) {
                snapOrientation &= ~draw2d.SnapToHelper.EAST;
                resultPoint.x += rightCorrection;
            }
        }

        if ((snapOrientation & draw2d.SnapToHelper.WEST) !== 0) {
            var leftCorrection = this.getCorrectionFor(this.cols, inputPoint.getX(), -1);
            if (leftCorrection !== this.SNAP_THRESHOLD) {
                snapOrientation &= ~draw2d.SnapToHelper.WEST;
                resultPoint.x += leftCorrection;
            }
        }

        if ((snapOrientation & draw2d.SnapToHelper.SOUTH) !== 0) {
            var bottomCorrection = this.getCorrectionFor(this.rows, inputPoint.getY() - 1, 1);
            if (bottomCorrection !== this.SNAP_THRESHOLD) {
                snapOrientation &= ~draw2d.SnapToHelper.SOUTH;
                resultPoint.y += bottomCorrection;
            }
        }

        if ((snapOrientation & draw2d.SnapToHelper.NORTH) !== 0) {
            var topCorrection = this.getCorrectionFor(this.rows, inputPoint.getY(), -1);
            if (topCorrection !== this.SNAP_THRESHOLD) {
                snapOrientation &= ~draw2d.SnapToHelper.NORTH;
                resultPoint.y += topCorrection;
            }
        }

        return snapOrientation;
    },

    populateRowsAndCols: function () {
        var selection = this.canvas.getSelection();
        this.rows = [];
        this.cols = [];

        var figures = this.canvas.getFigures();
        var index = 0;
        for (var i = 0; i < figures.getSize(); i++) {
            var figure = figures.get(i);
            if (!selection.contains(figure)) {
                var bounds = figure.getBoundingBox();
                this.cols[index * 3] = {type: -1, location: bounds.getX()};
                this.rows[index * 3] = {type: -1, location: bounds.getY()};
                this.cols[index * 3 + 1] = {type: 0, location: bounds.x + (bounds.getWidth() - 1) / 2};
                this.rows[index * 3 + 1] = {type: 0, location: bounds.y + (bounds.getHeight() - 1) / 2};
                this.cols[index * 3 + 2] = {type: 1, location: bounds.getRight() - 1};
                this.rows[index * 3 + 2] = {type: 1, location: bounds.getBottom() - 1};
                index++;
            }
        }
    },

    getCorrectionFor: function (/*:Array*/ entries, /*:double*/ value, /*:int*/ side) {
        var resultMag = this.SNAP_THRESHOLD;
        var result = this.SNAP_THRESHOLD;

        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            var magnitude;

            if (entry.type === -1 && side !== 0) {
                magnitude = Math.abs(value - entry.location);
                if (magnitude < resultMag) {
                    resultMag = magnitude;
                    result = entry.location - value;
                }
            }
            else if (entry.type === 0 && side === 0) {
                magnitude = Math.abs(value - entry.location);
                if (magnitude < resultMag) {
                    resultMag = magnitude;
                    result = entry.location - value;
                }
            }
            else if (entry.type === 1 && side !== 0) {
                magnitude = Math.abs(value - entry.location);
                if (magnitude < resultMag) {
                    resultMag = magnitude;
                    result = entry.location - value;
                }
            }
        }
        return result;
    },

    showVerticalLine: function (x) {
        if (this.vline != null) {
            return; //silently
        }
        this.vline = this.canvas.paper
            .path("M " + x + " 0 l 0 " + this.canvas.getHeight())
            .attr({"stroke": this.LINE_COLOR, "stroke-width": 1});
    },

    hideVerticalLine: function () {
        if (this.vline == null) {
            return;
        }
        var tmp = this.vline;
        tmp.animate({
            opacity: 0.1
        }, this.FADEOUT_DURATION, function () {
            tmp.remove();
        });

        this.vline = null;
    },

    showHorizontalLine: function (y) {
        if (this.hline != null) {
            return;
        }

        this.hline = this.canvas.paper
            .path("M 0 " + y + " l " + this.canvas.getWidth() + " 0")
            .attr({"stroke": this.LINE_COLOR, "stroke-width": 1});
    },

    hideHorizontalLine: function () {
        if (this.hline == null) {
            return; //silently
        }
        var tmp = this.hline;
        tmp.animate({
            opacity: 0.1
        }, this.FADEOUT_DURATION, function () {
            tmp.remove();
        });
        this.hline = null;
    }

});

/**
 * @class draw2d.policy.figure.FigureEditPolicy
 *
 * Called by the framework if the user edit the position of a figure with a drag drop operation.
 * Sub class like SelectionEditPolicy or RegionEditPolicy cam adjust th e position of the figure or the selections handles.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.EditPolicy
 * @since 4.4.0
 */
draw2d.policy.figure.FigureEditPolicy = draw2d.policy.EditPolicy.extend({

    NAME: "draw2d.policy.figure.FigureEditPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Called if the user press the right mouse on the figure.<br>
     * You can either override the "onContextMenu" method of the figure or install an editor policy and override this method.
     * Booth is valid and possible.
     *
     * @param {draw2d.Figure|draw2d.shape.basic.Line} figure the figure below the mouse
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since 4.4.0
     */
    onRightMouseDown: function (figure, x, y, shiftKey, ctrlKey) {
    }
});

/**
 * @class draw2d.policy.figure.DragDropEditPolicy
 *
 * Called by the framework if the user edit the position of a figure with a drag drop operation.
 * Sub class like SelectionEditPolicy or RegionEditPolicy can adjust the position of the figure or the selections handles.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.figure.FigureEditPolicy
 */
draw2d.policy.figure.DragDropEditPolicy = draw2d.policy.figure.FigureEditPolicy.extend({

    NAME: "draw2d.policy.figure.DragDropEditPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework if the related shape has init a drag&drop
     * operation
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onDragStart: function (canvas, figure, x, y, shiftKey, ctrlKey) {
        figure.shape.attr({cursor: "move"});

        // this happens if you drag&drop the shape outside of the screen and
        // release the mouse button outside the window. We restore the alpha
        // with the next drag&drop operation
        if (figure.isMoving === true) {
            figure.setAlpha(figure.originalAlpha);
        }

        figure.originalAlpha = figure.getAlpha();
        figure.isMoving = false;
    },

    /**
     * @method
     * Called by the framework during drag a figure.
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @template
     */
    onDrag: function (canvas, figure) {

        // enable the alpha blending of the first real move of the object
        //
        if (figure.isMoving === false) {
            figure.isMoving = true;
            figure.setAlpha(figure.originalAlpha * 0.4);
        }
    },

    /**
     * @method
     * Called by the framework if the drag drop operation ends.
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onDragEnd: function (canvas, figure, x, y, shiftKey, ctrlKey) {
        figure.shape.attr({cursor: "default"});
        figure.isMoving = false;
        figure.setAlpha(figure.originalAlpha);
    },

    /**
     * @method
     * Adjust the coordinates to the rectangle/region of this constraint.
     *
     * @param figure
     * @param {Number|draw2d.geo.Point} x
     * @param {number} [y]
     * @returns {draw2d.geo.Point} the constraint position of the figure
     *
     * @template
     */
    adjustPosition: function (figure, x, y) {
        // do nothing per default implementation
        if (x instanceof draw2d.geo.Point) {
            return x;
        }
        return new draw2d.geo.Point(x, y);
    },

    /**
     * @method
     * ensure that the dimension didn't goes outside the given restrictions
     *
     * @param figure
     * @param {Number} w
     * @param {number} h
     * @returns {draw2d.geo.Rectangle} the constraint position of the figure
     */
    adjustDimension: function (figure, w, h) {
        return new draw2d.geo.Rectangle(0, 0, w, h);
    },

    /**
     * @method
     * Callback if the figure has moved
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     *
     * @template
     */
    moved: function (canvas, figure) {
    }
});

/**
 * @class draw2d.policy.figure.RegionConstraintPolicy
 *
 * An EditPolicy for use with Figures. The constraint for RegionContraintPolicy is a Rectangle. It is
 * not possible to move the related figure outside this contrained area.
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.figure.RegionEditPolicy = draw2d.policy.figure.DragDropEditPolicy.extend({

    NAME: "draw2d.policy.figure.RegionEditPolicy",

    /**
     * @constructor
     * Creates a new constraint object
     *
     * @param {Number|draw2d.geo.Rectangle} x x coordinate or a rectangle as constraint for the assigned figure.
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    init: function (x, y, w, h) {
        this._super();
        if (x instanceof draw2d.geo.Rectangle) {
            this.constRect = x;
        }
        else if (typeof h === "number") {
            this.constRect = new draw2d.geo.Rectangle(x, y, w, h);
        }
        else {
            throw "Invalid parameter. RegionConstraintPolicy need a rectangle as parameter in the constructor";
        }
    },

    /**
     * @method
     * Update the constraint bounding box for the policy.
     *
     * @param {draw2d.geo.Rectangle} boundingBox the constraint rectangle
     * @since 4.8.2
     */
    setBoundingBox: function (boundingBox) {
        this.constRect = boundingBox;

        return this;
    },

    /**
     * @method
     * Adjust the coordinates to the rectangle/region of this constraint.
     *
     * @param figure
     * @param {Number|draw2d.geo.Point} x
     * @param {number} [y]
     *
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    adjustPosition: function (figure, x, y) {
        var r = null;
        if (x instanceof draw2d.geo.Point) {
            r = new draw2d.geo.Rectangle(x.x, x.y, figure.getWidth(), figure.getHeight());
        }
        else {
            r = new draw2d.geo.Rectangle(x, y, figure.getWidth(), figure.getHeight());
        }
        r = this.constRect.moveInside(r);
        return r.getTopLeft();
    },

    /**
     * @method
     * Adjust the dimension of the rectangle to fit into the region of the policy
     *
     * @param {draw2d.Figure} figure
     * @param {Number} w
     * @param {Number} h
     *
     * @private
     */
    adjustDimension: function (figure, w, h) {
        var diffW = (figure.getAbsoluteX() + w) - this.constRect.getRight();
        var diffH = (figure.getAbsoluteY() + h) - this.constRect.getBottom();

        if (diffW > 0) {
            w = w - diffW;
        }
        if (diffH > 0) {
            h = h - diffH;
        }

        return {w: w, h: h};
    }
});

/**
 * @class draw2d.policy.figure.HorizontalEditPolicy
 *
 * An EditPolicy for use with Figures. With this edit policy you can move the shape only in a horizontal manner.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *       // add some demo figure to the canvas
 *       var circle =new draw2d.shape.basic.Circle({diameter:50, x:10, y:30});
 *       canvas.add(circle);
 *
 *       // add the edit policy to the shape. At this point you can move the shape only
 *       // horizontal
 *       circle.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy());
 *
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.figure.HorizontalEditPolicy = draw2d.policy.figure.DragDropEditPolicy.extend({

    NAME: "draw2d.policy.figure.HorizontalEditPolicy",

    /**
     * @constructor
     * Creates a new constraint object
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * It is only possible to drag&drop the element in a horizontal line
     *
     * @param figure
     * @param {Number|draw2d.geo.Point} x
     * @param {number} [y]
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    adjustPosition: function (figure, x, y) {
        return new draw2d.geo.Point(x, figure.getY());
    }

});

/**
 * @class draw2d.policy.figure.VerticalEditPolicy
 *
 * An EditPolicy for use with Figures. With this edit policy you can move the shape only in a vertical manner.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *       // add some demo figure to the canvas
 *       var circle =new draw2d.shape.basic.Circle({diameter:50, x:10, y:30});
 *       canvas.add(circle);
 *
 *       // add the edit policy to the shape. At this point you can move the shape only
 *       // horizontal
 *       circle.installEditPolicy(new draw2d.policy.figure.VerticalEditPolicy());
 *
 *
 * @author Andreas Herz
 *
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.figure.VerticalEditPolicy = draw2d.policy.figure.DragDropEditPolicy.extend({

    NAME: "draw2d.policy.figure.VerticalEditPolicy",

    /**
     * @constructor
     * Creates a new constraint object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * It is only possible to drag&drop the element in a vertical line
     *
     * @param figure
     * @param {Number|draw2d.geo.Point} x
     * @param {number} [y]
     * @returns {draw2d.geo.Point} the constraint position of the figure
     */
    adjustPosition: function (figure, x, y) {
        return new draw2d.geo.Point(figure.getX(), y);
    }

});

/**
 * @class draw2d.policy.figure.SelectionFeedbackPolicy
 *
 * A draw2d.policy.SelectionFeedbackPolicy that is sensitive to the canvas selection. Subclasses will typically
 * decorate the {@link draw2d.Figure figure} with things like selection handles and/or focus feedback.
 * <br>
 * If you want to change the handle visibility for a figure, then you should use SelectionFeedbackPolicy to do that.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.figure.SelectionFeedbackPolicy = draw2d.policy.figure.DragDropEditPolicy.extend({

    NAME: "draw2d.policy.figure.SelectionFeedbackPolicy",

    /**
     * @constructor
     *
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     *
     * @template
     * @param figure
     * @param isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {
        console.log("on select")
    },


    /**
     * @method
     *
     * @param {draw2d.Figure} figure the unselected figure
     */
    onUnselect: function (canvas, figure) {
        figure.selectionHandles.each(function (i, e) {
            e.hide();
        });
        figure.selectionHandles = new draw2d.util.ArrayList();
    },

    /**
     * @method
     * Called by the host if the policy has been installed.
     *
     * @param {draw2d.Figure} figure
     */
    onInstall: function (figure) {
        this._super(figure);

        var canvas = figure.getCanvas();
        if (canvas !== null) {
            if (canvas.getSelection().contains(figure)) {
                this.onSelect(canvas, figure, true);
            }
        }
    },


    /**
     * @method
     * Called by the host if the policy has been uninstalled.
     *
     * @param {draw2d.Figure} figure
     */
    onUninstall: function (figure) {
        this._super(figure);

        if (typeof figure.selectionHandles === "undefined") {
            return;
        }

        figure.selectionHandles.each(function (i, e) {
            e.hide();
        });
        figure.selectionHandles = new draw2d.util.ArrayList();
    }

});


/**
 * @class draw2d.policy.figure.ResizeSelectionFeedbackPolicy
 *
 * Selection feedback policy without "marching ant lines" or any other rectangle highlight. Just
 * some resize handles at each corner of the shape.
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.ResizeSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @since 4.0.0
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 *
 */
draw2d.policy.figure.ResizeSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.ResizeSelectionFeedbackPolicy",
    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {

        if (figure.selectionHandles.isEmpty()) {
            // create standard Resize handles for the figure
            //
            var r1 = draw2d.Configuration.factory.createResizeHandle(figure, 1); // 1 = LEFT TOP
            var r2 = draw2d.Configuration.factory.createResizeHandle(figure, 2); // 2 = CENTER_TOP
            var r3 = draw2d.Configuration.factory.createResizeHandle(figure, 3); // 3 = RIGHT_TOP
            var r4 = draw2d.Configuration.factory.createResizeHandle(figure, 4); // 4 = RIGHT_MIDDLE
            var r5 = draw2d.Configuration.factory.createResizeHandle(figure, 5); // 5 = RIGHT_BOTTOM
            var r6 = draw2d.Configuration.factory.createResizeHandle(figure, 6); // 6 = CENTER_BOTTOM
            var r7 = draw2d.Configuration.factory.createResizeHandle(figure, 7); // 7 = LEFT_BOTTOM
            var r8 = draw2d.Configuration.factory.createResizeHandle(figure, 8); // 8 = LEFT_MIDDLE

            // and add them to the figure. We need the reference to the ResizeHandles
            // to remove the resize handles if the figure will be unselect. Just a simple
            // refrence store
            //
            figure.selectionHandles.add(r1);
            figure.selectionHandles.add(r2);
            figure.selectionHandles.add(r3);
            figure.selectionHandles.add(r4);
            figure.selectionHandles.add(r5);
            figure.selectionHandles.add(r6);
            figure.selectionHandles.add(r7);
            figure.selectionHandles.add(r8);

            // show the default top/left, top/right, bottom/right and bottom/left
            // resize handles
            //
            r1.show(canvas);
            r3.show(canvas);
            r5.show(canvas);
            r7.show(canvas);

            // The corner ResizeHandles are only draggable fi the figure is
            // resizeable. But the Resize handles are visible
            //

            // change the look&feel of the corner resizehandles if the
            // figure isn't resizeable
            //
            if (figure.isResizeable() === false) {
                r1.setBackgroundColor(null);
                r3.setBackgroundColor(null);
                r5.setBackgroundColor(null);
                r7.setBackgroundColor(null);
                r1.setDraggable(false);
                r3.setDraggable(false);
                r5.setDraggable(false);
                r7.setDraggable(false);
            }

            // show only the additional resizehandles if the figure is resizeable
            //
            if ((!figure.getKeepAspectRatio()) && figure.isResizeable()) {
                r2.show(canvas);
                r4.show(canvas);
                r6.show(canvas);
                r8.show(canvas);
            }
        }
        this.moved(canvas, figure);
    },

    /**
     * @method
     * Callback if the figure has been moved. In this case we must update the position of the
     * resize handles.
     *
     * @param figure
     *
     * @template
     */
    moved: function (canvas, figure) {
        if (figure.selectionHandles.isEmpty()) {
            return; // silently
        }

        var objHeight = figure.getHeight();
        var objWidth = figure.getWidth();
        var xPos = figure.getX();
        var yPos = figure.getY();

        var r1 = figure.selectionHandles.get(0);
        var r3 = figure.selectionHandles.get(2);
        var r5 = figure.selectionHandles.get(4);
        var r7 = figure.selectionHandles.get(6);
        r1.setPosition(xPos - r1.getWidth(), yPos - r1.getHeight());
        r3.setPosition(xPos + objWidth, yPos - r3.getHeight());
        r5.setPosition(xPos + objWidth, yPos + objHeight);
        r7.setPosition(xPos - r7.getWidth(), yPos + objHeight);

        if (!figure.getKeepAspectRatio()) {
            var r2 = figure.selectionHandles.get(1);
            var r4 = figure.selectionHandles.get(3);
            var r6 = figure.selectionHandles.get(5);
            var r8 = figure.selectionHandles.get(7);

            r2.setPosition(xPos + (objWidth / 2) - (r2.getWidth() / 2), yPos - r2.getHeight());
            r4.setPosition(xPos + objWidth, yPos + (objHeight / 2) - (r4.getHeight() / 2));
            r6.setPosition(xPos + (objWidth / 2) - (r6.getWidth() / 2), yPos + objHeight);
            r8.setPosition(xPos - r8.getWidth(), yPos + (objHeight / 2) - (r8.getHeight() / 2));
        }
    }


});


/**
 * @class draw2d.policy.figure.RectangleSelectionFeedbackPolicy
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle({diameter:50});
 *       circle.installEditPolicy(new draw2d.policy.RectangleSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.RectangleSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.RectangleSelectionFeedbackPolicy",
    /**
     * @constructor
     * Creates a selection feedback for a shape.
     */
    init: function () {
        this._super();

    },


    /**
     * @inheritdoc
     */
    onSelect: function (canvas, figure, isPrimarySelection) {
        if (figure.selectionHandles.isEmpty()) {
            // Add a dotted line rectangle to the figure. Override the show/hide method of the standard
            // figure to avoid adding these element to the hit test of the canvas. In this case the element
            // is just visible but not part of the model or responsible for any drag/drop operation
            //
            var box = new draw2d.shape.basic.Rectangle({bgColor: null, dashArray: "- ", color: "#2096fc", stroke: 0.5});
            box.hide = function () {
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                box.setCanvas(null);
            };
            box.show = function (canvas) {
                box.setCanvas(canvas);
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                //canvas.resizeHandles.add(box);
                box.toFront(figure);
            };
            // create standard Resize handles for the figure
            //
            var r1 = draw2d.Configuration.factory.createResizeHandle(figure, 1); // 1 = LEFT TOP
            var r2 = draw2d.Configuration.factory.createResizeHandle(figure, 2); // 2 = CENTER_TOP
            var r3 = draw2d.Configuration.factory.createResizeHandle(figure, 3); // 3 = RIGHT_TOP
            var r4 = draw2d.Configuration.factory.createResizeHandle(figure, 4); // 4 = RIGHT_MIDDLE
            var r5 = draw2d.Configuration.factory.createResizeHandle(figure, 5); // 5 = RIGHT_BOTTOM
            var r6 = draw2d.Configuration.factory.createResizeHandle(figure, 6); // 6 = CENTER_BOTTOM
            var r7 = draw2d.Configuration.factory.createResizeHandle(figure, 7); // 7 = LEFT_BOTTOM
            var r8 = draw2d.Configuration.factory.createResizeHandle(figure, 8); // 8 = LEFT_MIDDLE

            // and add them to the figure. We need the reference to the ResizeHandles
            // to remove the resize handles if the figure will be unselect. Just a simple
            // reference store
            //
            figure.selectionHandles.add(r1);
            figure.selectionHandles.add(r2);
            figure.selectionHandles.add(r3);
            figure.selectionHandles.add(r4);
            figure.selectionHandles.add(r5);
            figure.selectionHandles.add(r6);
            figure.selectionHandles.add(r7);
            figure.selectionHandles.add(r8);

            // show the default top/left, top/right, bottom/right and bottom/left
            // resize handles
            //
            r1.show(canvas);
            r3.show(canvas);
            r5.show(canvas);
            r7.show(canvas);


            // change the look&feel of the corner resizehandles if the
            // figure isn't resizeable
            //
            if (figure.isResizeable() === false) {
                r1.setBackgroundColor(null);
                r3.setBackgroundColor(null);
                r5.setBackgroundColor(null);
                r7.setBackgroundColor(null);
                r1.setDraggable(false);
                r3.setDraggable(false);
                r5.setDraggable(false);
                r7.setDraggable(false);
            }

            // show only the additional resizehandles if the figure is resizeable and didn't care about
            // the aspect ration
            //
            if ((!figure.getKeepAspectRatio()) && figure.isResizeable()) {
                r2.show(canvas);
                r4.show(canvas);
                r6.show(canvas);
                r8.show(canvas);
            }

            // add the reference of the "ant box" to the figure as well. But wee add them
            // to the end of the array because inherit classes expect the resizehandles
            // on index 0-7.
            //
            figure.selectionHandles.add(box);

            // call the box.show() at last to ensure that the resize handles are above the
            // rectangle. The rectangle did a toFront(parentShape);
            box.show(canvas);
        }
        this.moved(canvas, figure);
    },

    /**
     * @inheritdoc
     */
    onUnselect: function (canvas, figure) {
        this._super(canvas, figure);
    },


    /**
     * @method
     * Callback if the figure has been moved. In this case we must update the position of the
     * resize handles and the "ant" box.
     *
     * @param figure
     *
     * @template
     */
    moved: function (canvas, figure) {
        if (figure.selectionHandles.isEmpty()) {
            return; // silently
        }

        var objHeight = figure.getHeight();
        var objWidth = figure.getWidth();
        var xPos = figure.getX();
        var yPos = figure.getY();

        var r1 = figure.selectionHandles.get(0);
        var r3 = figure.selectionHandles.get(2);
        var r5 = figure.selectionHandles.get(4);
        var r7 = figure.selectionHandles.get(6);
        r1.setPosition(xPos - r1.getWidth(), yPos - r1.getHeight());
        r3.setPosition(xPos + objWidth, yPos - r3.getHeight());
        r5.setPosition(xPos + objWidth, yPos + objHeight);
        r7.setPosition(xPos - r7.getWidth(), yPos + objHeight);

        if (!figure.getKeepAspectRatio()) {
            var r2 = figure.selectionHandles.get(1);
            var r4 = figure.selectionHandles.get(3);
            var r6 = figure.selectionHandles.get(5);
            var r8 = figure.selectionHandles.get(7);

            r2.setPosition(xPos + (objWidth / 2) - (r2.getWidth() / 2), yPos - r2.getHeight());
            r4.setPosition(xPos + objWidth, yPos + (objHeight / 2) - (r4.getHeight() / 2));
            r6.setPosition(xPos + (objWidth / 2) - (r6.getWidth() / 2), yPos + objHeight);
            r8.setPosition(xPos - r8.getWidth(), yPos + (objHeight / 2) - (r8.getHeight() / 2));
        }
        var box = figure.selectionHandles.get(8);
        box.setPosition(figure.getPosition().translate(-2, -2));
        box.setDimension(figure.getWidth() + 4, figure.getHeight() + 4);
        box.setRotationAngle(figure.getRotationAngle());
    }


});


/**
 * @class draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy = draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.BigRectangleSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {

        this._super(canvas, figure, isPrimarySelection);

        if (!figure.selectionHandles.isEmpty()) {
            figure.selectionHandles.each(function (i, e) {
                e.setDimension(15, 15);
            });
        }
        this.moved(canvas, figure);
    }
});


/**
 * @class draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy
 *
 * See the example:
 *
 *       @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.RoundRectangleSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.RectangleSelectionFeedbackPolicy
 */
draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy = draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.RoundRectangleSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {

        this._super(canvas, figure, isPrimarySelection);

        if (!figure.selectionHandles.isEmpty()) {
            figure.selectionHandles.each(function (i, e) {
                e.setDimension(12, 12);
                e.setRadius(4);
            });
        }
        this.moved(canvas, figure);
    }
});


/**
 * @class draw2d.policy.figure.BusSelectionFeedbackPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.BusSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.BusSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {
        if (figure.selectionHandles.isEmpty()) {
            var r2 = draw2d.Configuration.factory.createResizeHandle(figure, 2); // 2 = CENTER_TOP
            var r4 = draw2d.Configuration.factory.createResizeHandle(figure, 4); // 4 = RIGHT_MIDDLE
            var r6 = draw2d.Configuration.factory.createResizeHandle(figure, 6); // 6 = CENTER_BOTTOM
            var r8 = draw2d.Configuration.factory.createResizeHandle(figure, 8); // 8 = LEFT_MIDDLE

            figure.selectionHandles.add(r2);
            figure.selectionHandles.add(r4);
            figure.selectionHandles.add(r6);
            figure.selectionHandles.add(r8);

            r2.setDraggable(figure.isResizeable());
            r4.setDraggable(figure.isResizeable());
            r6.setDraggable(figure.isResizeable());
            r8.setDraggable(figure.isResizeable());

            r2.show(canvas);
            r4.show(canvas);
            r6.show(canvas);
            r8.show(canvas);
        }
        this.moved(canvas, figure);
    },


    /**
     * @method
     * Callback if the figure has been moved
     *
     * @param figure
     *
     * @template
     */
    moved: function (canvas, figure) {
        if (figure.selectionHandles.isEmpty()) {
            return; // silently
        }
        var r2 = figure.selectionHandles.get(0);
        var r4 = figure.selectionHandles.get(1);
        var r6 = figure.selectionHandles.get(2);
        var r8 = figure.selectionHandles.get(3);

        var objHeight = figure.getHeight();
        var objWidth = figure.getWidth();

        var xPos = figure.getX();
        var yPos = figure.getY();
        r2.setPosition(xPos + (objWidth / 2) - (r2.getWidth() / 2), yPos - r2.getHeight());
        r4.setPosition(xPos + objWidth, yPos + (objHeight / 2) - (r4.getHeight() / 2));
        r6.setPosition(xPos + (objWidth / 2) - (r6.getWidth() / 2), yPos + objHeight);
        r8.setPosition(xPos - r8.getWidth(), yPos + (objHeight / 2) - (r8.getHeight() / 2));
    }


});


/**
 * @class draw2d.policy.figure.WidthSelectionFeedbackPolicy
 * This selection shows only selection handles for the width. It is only possible to change the width
 * of an shaped. The height stays always the same or is recalculated by the figure itself.
 *
 *     @example preview small frame
 *
 *
 *       // add some demo figure to the canvas
 *       //
 *       var shape =new draw2d.shape.basic.Rectangle({width:50, height:100, x:10, y:30});
 *       canvas.add(shape);
 *
 *       // At this point you can only change the width of the shape
 *       //
 *       shape.installEditPolicy(new draw2d.policy.figure.WidthSelectionFeedbackPolicy());
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.WidthSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.BusSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {
        if (figure.selectionHandles.isEmpty()) {
            var r4 = draw2d.Configuration.factory.createResizeHandle(figure, 4); // 4 = RIGHT_MIDDLE
            var r8 = draw2d.Configuration.factory.createResizeHandle(figure, 8); // 8 = LEFT_MIDDLE

            r4.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy());
            r8.installEditPolicy(new draw2d.policy.figure.HorizontalEditPolicy());
            figure.selectionHandles.add(r4);
            figure.selectionHandles.add(r8);

            r4.setDraggable(figure.isResizeable());
            r8.setDraggable(figure.isResizeable());

            r4.show(canvas);
            r8.show(canvas);
        }
        this.moved(canvas, figure);
    },


    /**
     * @method
     * Callback if the figure has been moved
     *
     * @param figure
     *
     * @template
     */
    moved: function (canvas, figure) {
        if (figure.selectionHandles.isEmpty()) {
            return; // silently
        }
        var r4 = figure.selectionHandles.first();
        var r8 = figure.selectionHandles.last();

        var objWidth = figure.getWidth();

        var xPos = figure.getX();
        var yPos = figure.getY();
        r4.setDimension(r4.getWidth(), figure.getHeight());
        r8.setDimension(r8.getWidth(), figure.getHeight());
        r4.setPosition(xPos + objWidth, yPos);
        r8.setPosition(xPos - r8.getWidth(), yPos);
    }


});


/**
 * @class draw2d.policy.figure.VBusSelectionFeedbackPolicy
 *
 * Selection feedback policy for vertical bus figures.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.BusSelectionFeedbackPolicy
 */
draw2d.policy.figure.VBusSelectionFeedbackPolicy = draw2d.policy.figure.BusSelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.VBusSelectionFeedbackPolicy",
    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Callback if the figure has been moved
     *
     * @param figure
     *
     **/
    moved: function (canvas, figure) {
        if (figure.selectionHandles.isEmpty()) {
            return; // silently
        }
        var r2 = figure.selectionHandles.get(0);
        var r6 = figure.selectionHandles.get(2);
        var objWidth = figure.getWidth();
        // adjust the resize handles on the left/right to the new dimension of the shape
        //
        r2.setDimension(objWidth, r2.getHeight());
        r6.setDimension(objWidth, r6.getHeight());

        this._super(canvas, figure);
    }


});


/**
 * @class draw2d.policy.figure.HBusSelectionFeedbackPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.BusSelectionFeedbackPolicy
 */
draw2d.policy.figure.HBusSelectionFeedbackPolicy = draw2d.policy.figure.BusSelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.HBusSelectionFeedbackPolicy",
    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Callback if the figure has been moved
     *
     * @param figure
     *
     * @template
     */
    moved: function (canvas, figure) {
        if (figure.selectionHandles.isEmpty()) {
            return; // silently
        }
        var r4 = figure.selectionHandles.get(1);
        var r8 = figure.selectionHandles.get(3);

        r4.setDimension(r4.getWidth(), figure.getHeight());
        r8.setDimension(r4.getWidth(), figure.getHeight());

        this._super(canvas, figure);
    }


});


/**
 * @class draw2d.policy.figure.AntSelectionFeedbackPolicy
 *
 * Provide support for selecting and positioning a non-resizable figure.
 * Selection is indicated via rectangular handle that outlines the figure with a 1-pixel black
 * dotted line.
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle({diameter:50, x:90, y:50});
 *       circle.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
 *       canvas.add(circle);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.AntSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.AntSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {draw2d.Figure} figure the figure to decorate with a selection feedback
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {
        if (figure.selectionHandles.isEmpty()) {
            var box = new draw2d.shape.basic.Rectangle();
            box.setBackgroundColor(null);
            box.setDashArray("- ");
            box.setColor("#00bdee");
            box.hide = function () {
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                box.setCanvas(null);
            };
            box.show = function (canvas) {
                box.setCanvas(canvas);
                // IMPORTANT
                // don't add/remove this rectangle to the canvas resizeHandles. This rect isn't responsible for any hitTest or
                // dragDrop operation
                //canvas.resizeHandles.remove(box);
                //canvas.resizeHandles.add(box);
                box.shape.toFront();
            };
            box.show(canvas);
            figure.selectionHandles.add(box);
        }
        this.moved(canvas, figure);
    },


    /**
     * @method
     * Callback if the figure has been moved
     *
     * @param figure
     *
     * @template
     */
    moved: function (canvas, figure) {
        if (figure.selectionHandles.isEmpty()) {
            return; // silently
        }
        var box = figure.selectionHandles.get(0);
        box.setPosition(figure.getPosition().translate(-2, -2));
        box.setDimension(figure.getWidth() + 4, figure.getHeight() + 4);
        box.setRotationAngle(figure.getRotationAngle());
    }
});

/**
 * @class draw2d.policy.figure.GlowSelectionFeedbackPolicy
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.figure.GlowSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label("Click on the circle to see the selection feedback"),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.GlowSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.GlowSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {
        figure.setGlow(true);
        this.moved(canvas, figure);
    },


    /**
     * @method
     *
     * @param {draw2d.Figure} figure the unselected figure
     */
    onUnselect: function (canvas, figure) {
        this._super(canvas, figure);
        figure.setGlow(false);
    }

});

/**
 * @class draw2d.policy.figure.SlimSelectionFeedbackPolicy
 * Add only very small resize handles to the figure.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *       circle =new draw2d.shape.basic.Circle();
 *       circle.installEditPolicy(new draw2d.policy.SlimSelectionFeedbackPolicy());
 *       canvas.add(circle,90,50);
 *
 *       canvas.add(new draw2d.shape.basic.Label({text:"Click on the circle to see the selection feedback"}),20,10);
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.RectangleSelectionFeedbackPolicy
 */
draw2d.policy.figure.SlimSelectionFeedbackPolicy = draw2d.policy.figure.RectangleSelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.SlimSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {

        this._super(canvas, figure, isPrimarySelection);

        if (!figure.selectionHandles.isEmpty()) {
            // resize the standard resize handles to the half on the normal size
            //
            figure.selectionHandles.each(function (i, e) {
                e.setDimension(6, 6);
                e.setRadius(0);
            });
        }
        this.moved(canvas, figure);
    }
});


/**
 * @class draw2d.policy.figure.VertexSelectionFeedbackPolicy
 *
 * Called by the framework if the user edit the position of a figure with a drag drop operation.
 * Sub class like SelectionEditPolicy or RegionEditPolicy cam adjust th e position of the figure or the selections handles.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.figure.VertexSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.figure.VertexSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     *
     * @template
     * @param {draw2d.Connection} connection the selected figure
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, connection, isPrimarySelection) {
//    	this._super(canvas, connection, isPrimarySelection);

        var points = connection.getVertices();
        for (var i = 0; i < points.getSize(); i++) {
            var handle = new draw2d.shape.basic.VertexResizeHandle(connection, i);
            connection.selectionHandles.add(handle);
            handle.setDraggable(connection.isResizeable());
            handle.show(canvas);

            if (i !== 0) {
                var handle = new draw2d.shape.basic.GhostVertexResizeHandle(connection, i - 1);
                connection.selectionHandles.add(handle);
                handle.setDraggable(connection.isResizeable());
                handle.show(canvas);
            }
        }

        this.moved(canvas, connection);
    },

    /**
     * @method
     * Callback method if the figure has been moved.
     *
     * @template
     */
    moved: function (canvas, figure) {
        figure.selectionHandles.each(function (i, e) {
            e.relocate();
        });
    }


});

/**
 * @class draw2d.policy.line.LineSelectionFeedbackPolicy
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.SelectionFeedbackPolicy
 */
draw2d.policy.line.LineSelectionFeedbackPolicy = draw2d.policy.figure.SelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.line.LineSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new selection feedback policy for a line or connection
     */
    init: function () {
        this._super();
    },


    /**
     * @method
     * Called by the framework of the Policy should show a resize handle for the given shape
     *
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {
        if (figure.selectionHandles.isEmpty()) {
            figure.selectionHandles.add(new draw2d.shape.basic.LineStartResizeHandle(figure));
            figure.selectionHandles.add(new draw2d.shape.basic.LineEndResizeHandle(figure));

            figure.selectionHandles.each(function (i, e) {
                e.setDraggable(figure.isResizeable());
                e.show(canvas);
            });
        }
        this.moved(canvas, figure);

        if(this.onSelectCallBack != null) {
            this.onSelectCallBack(canvas, figure, isPrimarySelection);
        }

    },

    /**
     * @method
     * Callback method if the figure has been moved.
     *
     * @template
     */
    moved: function (canvas, figure) {
        figure.selectionHandles.each(function (i, e) {
            e.relocate();
        });
    }

});


/**
 * @class draw2d.policy.line.VertexSelectionFeedbackPolicy
 *
 * Feedback and edit policy for the VertexRouter.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.line.LineSelectionFeedbackPolicy
 */
draw2d.policy.line.VertexSelectionFeedbackPolicy = draw2d.policy.line.LineSelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.line.VertexSelectionFeedbackPolicy",

    /**
     * @constructor
     *
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     *
     * @template
     * @param {draw2d.Connection} connection the selected figure
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, figure, isPrimarySelection) {

        var startHandle = new draw2d.shape.basic.LineStartResizeHandle(figure);
        var endHandle = new draw2d.shape.basic.LineEndResizeHandle(figure);
        figure.selectionHandles.add(startHandle);
        figure.selectionHandles.add(endHandle);

        var points = figure.getVertices();
        var count = points.getSize() - 1;
        var i = 1;
        for (; i < count; i++) {
            figure.selectionHandles.add(new draw2d.shape.basic.VertexResizeHandle(figure, i));
            figure.selectionHandles.add(new draw2d.shape.basic.GhostVertexResizeHandle(figure, i - 1));
        }

        figure.selectionHandles.add(new draw2d.shape.basic.GhostVertexResizeHandle(figure, i - 1));

        figure.selectionHandles.each(function (i, e) {
            e.setDraggable(figure.isResizeable());
            e.show(canvas);
        });

        this.moved(canvas, figure);

    }

});

/**
 * @class draw2d.policy.line.OrthogonalSelectionFeedbackPolicy
 *
 * Feedback and edit policy for the InteractiveMannhattanRouter.
 *
 * @author  Andreas Herz
 * @extends draw2d.policy.line.LineSelectionFeedbackPolicy
 */
draw2d.policy.line.OrthogonalSelectionFeedbackPolicy = draw2d.policy.line.LineSelectionFeedbackPolicy.extend({

    NAME: "draw2d.policy.line.OrthogonalSelectionFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();

        // The ResizeHandle for the Policy. This is inline to avoid that a user want to use them without
        // the right installed policy.
        //
        this.ResizeHandle = draw2d.ResizeHandle.extend({
            NAME: "#ResizeHandle",

            init: function (figure, index) {
                this._super(figure);
                this.index = index;
            },


            /**
             * @method
             * Called if a drag&drop operation starts.<br>
             * @param {Number} x the x-coordinate of the mouse up event
             * @param {Number} y the y-coordinate of the mouse up event
             * @param {Boolean} shiftKey true if the shift key has been pressed during this event
             * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
             *
             * @private
             **/
            onDragStart: function (xs, y, shiftKey, ctrlKey) {
                this._super();
                this.command = this.getCanvas().getCurrentSelection().createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE_VERTICES));

                // Vertex is a reference and not a copy of the point
                this.vertex = this.owner.getVertices().get(this.index).clone();
            },

            /**
             * @method
             * Called from the framework during a drag&drop operation of the ResizeHandles
             *
             * @param {Number} dx the x difference between the start of the drag drop operation and now
             * @param {Number} dy the y difference between the start of the drag drop operation and now
             * @param {Number} dx2 The x diff since the last call of this dragging operation
             * @param {Number} dy2 The y diff since the last call of this dragging operation
             * @return {boolean}
             **/
            onDrag: function (dx, dy, dx2, dy2) {
                if (this.command == null) {
                    return false;
                }

                var fromDir = this.owner.getSource().getConnectionDirection(this.owner, this.owner.getTarget());
                var toDir = this.owner.getTarget().getConnectionDirection(this.owner, this.owner.getSource());

                this.vertex.translate(dx2, dy2);

                var vertices = this.owner.getVertices();
                var count = vertices.getSize();
                //shortcut for math operations
                var max = Math.max;
                var min = Math.min;


                // Keep in mind: "p1" is always the dragged handle in the coding below
                //               marked with an '*' in the diagram
                //

                // FIRST handle of the connection
                //
                if (this.index === 1) {
                    var p0 = vertices.get(this.index - 1); // first vertex of the connection
                    var p1 = vertices.get(this.index); // dragged vertex
                    var p2 = vertices.get(this.index + 1); // additional neighbor

                    // vertex alignment to handle:
                    //
                    //      p0 +-----* p1       p1 *------+ p0
                    //               |             |
                    //               |             |
                    //               + p2       p2 +
                    if ((p1.x == p2.x) && (p0.y == p1.y)) {
                        switch (fromDir) {
                            case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                                // p0 is on the left of p1
                                //
                                this.owner.setVertex(1, max(p0.x + 10, this.vertex.x), p1.y); // p1
                                this.owner.setVertex(2, max(p0.x + 10, this.vertex.x), p2.y); // p2
                                break;
                            // p0 is on the right of p2
                            //
                            case draw2d.geo.Rectangle.DIRECTION_LEFT:
                                this.owner.setVertex(1, min(p0.x - 10, this.vertex.x), p1.y); // p1
                                this.owner.setVertex(2, min(p0.x - 10, this.vertex.x), p2.y); // p2
                                break;
                        }
                    }

                    // vertices alignment to handle:
                    //
                    //      p0 +              p1 *--------+ p2
                    //         |                 |
                    //         |                 |
                    //      p1 *-----+ p2     p0 +
                    else {
                        switch (fromDir) {
                            case draw2d.geo.Rectangle.DIRECTION_UP:
                                // p0 is below of p1
                                //
                                this.owner.setVertex(1, p1.x, min(p0.y - 10, this.vertex.y)); // p1
                                this.owner.setVertex(2, p2.x, min(p0.y - 10, this.vertex.y)); // p2
                                break;
                            // p0 is above of p2
                            //
                            case draw2d.geo.Rectangle.DIRECTION_DOWN:
                                this.owner.setVertex(1, p1.x, max(p0.y + 10, this.vertex.y)); // p1
                                this.owner.setVertex(2, p2.x, max(p0.y + 10, this.vertex.y)); // p2
                                break;
                        }
                    }
                }

                // LAST handle: Only the left hand side sibling can be changed
                //
                else if (this.index === (count - 2)) {
                    var p2 = vertices.get(this.index - 1);  // neighbor of the dragged vertex
                    var p1 = vertices.get(this.index);  // dragged vertex
                    var p0 = vertices.get(this.index + 1);  // last vertex of the connection

                    // vertices with this alignment.
                    //
                    //      p2 +-----* p1                 + p0
                    //               |                    |
                    //               |                    |
                    //               + p0     p2 +--------* p1
                    if ((p0.x === p1.x) && (p2.y === p1.y)) {
                        switch (toDir) {
                            // p0 is below of p1
                            case draw2d.geo.Rectangle.DIRECTION_UP:
                                this.owner.setVertex(count - 2, p1.x, min(p0.y - 10, this.vertex.y)); // p1
                                this.owner.setVertex(count - 3, p2.x, min(p0.y - 10, this.vertex.y)); // p2
                                break;
                            // p0 is above p2
                            case draw2d.geo.Rectangle.DIRECTION_DOWN:
                                this.owner.setVertex(count - 2, p1.x, max(p0.y + 10, this.vertex.y)); // p1
                                this.owner.setVertex(count - 3, p2.x, max(p0.y + 10, this.vertex.y)); // p2
                                break;
                        }
                    }

                    // vertices with this alignment.
                    //
                    //      p2 +              p0 +--------* p1
                    //         |                          |
                    //         |                          |
                    //      p1 *-----+ p0              p2 +
                    else {
                        switch (toDir) {
                            case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                                // p0 is on the left of p1
                                //
                                this.owner.setVertex(count - 2, max(p0.x + 10, this.vertex.x), p1.y); // p1
                                this.owner.setVertex(count - 3, max(p0.x + 10, this.vertex.x), p2.y); // p2
                                break;
                            // p0 is on the right of p2
                            //
                            case draw2d.geo.Rectangle.DIRECTION_LEFT:
                                this.owner.setVertex(count - 2, min(p0.x - 10, this.vertex.x), p1.y); // p1
                                this.owner.setVertex(count - 3, min(p0.x - 10, this.vertex.x), p2.y); // p2
                                break;
                        }
                    }
                }
                // The resize handle is in the middle of the connection.
                // -> In this case the connection MUST HAVE at least 5 vertices
                //
                else {
                    var p_m1 = vertices.get(this.index - 2);
                    var p0 = vertices.get(this.index - 1);
                    var p1 = vertices.get(this.index);
                    var p2 = vertices.get(this.index + 1);
                    var p3 = vertices.get(this.index + 2);

                    // vertices alignment to handle
                    //
                    //               .              .
                    //               .              .
                    //   p1 *------->+  p0      p0  +<---------* p1
                    //      |        .              .          |
                    //      |        .              .          |
                    //   p2 |                                  | p2
                    //   ...+...                         ......+.....
                    //
                    if ((p1.x === p2.x) && (p1.y === p0.y)) {
                        // Exception handling if the dragged handle (p1) is near by the start of the connection
                        // p_m1 is the start of the connection
                        // p0 must be the immediate neighbor of p_m1
                        //
                        if (this.index - 2 === 0) {
                            switch (fromDir) {
                                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                                    this.owner.setVertex(this.index - 1, p0.x, max(this.vertex.y, p_m1.y - 10));          // p0
                                    this.owner.setVertex(this.index, this.vertex.x, max(this.vertex.y, p_m1.y - 10)); // p1
                                    this.owner.setVertex(this.index + 1, this.vertex.x, p2.y);                         // p2
                                    break;
                                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                                    this.owner.setVertex(this.index - 1, p0.x, min(this.vertex.y, p_m1.y + 10));          // p0
                                    this.owner.setVertex(this.index, this.vertex.x, this.vertex.y); // p1
                                    this.owner.setVertex(this.index + 1, this.vertex.x, p2.y);                         // p2
                                    break;
                                case draw2d.geo.Rectangle.DIRECTION_UP:
                                    this.owner.setVertex(this.index - 1, p0.x, min(this.vertex.y, p_m1.y - 10));          // p0
                                    this.owner.setVertex(this.index, this.vertex.x, min(this.vertex.y, p_m1.y - 10)); // p1
                                    this.owner.setVertex(this.index + 1, this.vertex.x, p2.y);                         // p2
                                    break;
                                case draw2d.geo.Rectangle.DIRECTION_DOWN:
                                    this.owner.setVertex(this.index - 1, p0.x, max(this.vertex.y, p_m1.y + 10));          // p0
                                    this.owner.setVertex(this.index, this.vertex.x, max(this.vertex.y, p_m1.y + 10)); // p1
                                    this.owner.setVertex(this.index + 1, this.vertex.x, p2.y);                        // p2
                                    break;
                            }
                        }
                        // Exception handling if the dragged handle (p1L) near by the end of the connection
                        // p3 is the end of the connection
                        //
                        else if ((this.index - count + 3) === 0) {
                            switch (toDir) {
                                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                                    this.owner.setVertex(this.index - 1, p0.x, this.vertex.y);                       // p0
                                    this.owner.setVertex(this.index, max(this.vertex.x, p3.x + 10), this.vertex.y); // p1
                                    this.owner.setVertex(this.index + 1, max(this.vertex.x, p3.x + 10), p2.y);          // p2
                                    break;
                                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                                    this.owner.setVertex(this.index - 1, p0.x, this.vertex.y);                       // p0
                                    this.owner.setVertex(this.index, min(this.vertex.x, p3.x - 10), this.vertex.y); // p1
                                    this.owner.setVertex(this.index + 1, min(this.vertex.x, p3.x - 10), p2.y);          // p2
                                    break;
                            }
                        }
                        else {
                            this.owner.setVertex(this.index - 1, p0.x, this.vertex.y);                          // p0
                            this.owner.setVertex(this.index, this.vertex);                                 // p1
                            this.owner.setVertex(this.index + 1, this.vertex.x, p2.y);                          // p2
                        }
                    }
                    // vertices alignment to handle
                    //
                    //  ...+...                            ...+...
                    //  p0 |                        .         | p0
                    //     |          .             .         |
                    //     |          .             .         |
                    //  p1 *----------+ p2      p2  +---------* p1
                    //                .             .
                    //                .             .
                    else if ((p0.x === p1.x) && (p1.y === p2.y)) {
                        // p_m1 is the start of the analyzed segment
                        // p0 must be the immediate neighbor of p_m1
                        //
                        if (this.index - 2 === 0) {
                            switch (fromDir) {
                                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                                    this.owner.setVertex(this.index - 1, max(this.vertex.x, p_m1.x + 10), p0.y);          // p0
                                    this.owner.setVertex(this.index, max(this.vertex.x, p_m1.x + 10), this.vertex.y); // p1
                                    this.owner.setVertex(this.index + 1, p2.x, this.vertex.y);                         // p2
                                    break;
                                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                                    this.owner.setVertex(this.index - 1, min(this.vertex.x, p_m1.x - 10), p0.y);          // p0
                                    this.owner.setVertex(this.index, min(this.vertex.x, p_m1.x - 10), this.vertex.y); // p1
                                    this.owner.setVertex(this.index + 1, p2.x, this.vertex.y);                         // p2
                                    break;
                            }
                        }
                        // p3 ist der Endpunkt
                        //
                        else if ((this.index - count + 3) === 0) {
                            switch (toDir) {
                                case draw2d.geo.Rectangle.DIRECTION_RIGHT:
                                    this.owner.setVertex(this.index - 1, p0.x, min(this.vertex.y, p3.y + 10));            // p0
                                    this.owner.setVertex(this.index, this.vertex.x, min(this.vertex.y, p3.y + 10));   // p1
                                    this.owner.setVertex(this.index + 1, this.vertex.x, p2.y);                         // p2
                                    break;
                                case draw2d.geo.Rectangle.DIRECTION_LEFT:
                                    this.owner.setVertex(this.index - 1, p0.x, max(this.vertex.y, p3.y - 10));            // p0
                                    this.owner.setVertex(this.index, this.vertex.x, max(this.vertex.y, p3.y - 10));   // p1
                                    this.owner.setVertex(this.index + 1, this.vertex.x, p2.y);                         // p2
                                    break;
                            }
                        }
                        else {
                            this.owner.setVertex(this.index - 1, this.vertex.x, p0.y);                            // p0
                            this.owner.setVertex(this.index, this.vertex);                                   // p1
                            this.owner.setVertex(this.index + 1, p2.x, this.vertex.y);                            // p2
                        }
                    }
                }

                this.relocate();

                // update the command for the undo/redo stuff
                //
                if (this.command !== null) {
                    this.command.updateVertices(this.owner.getVertices().clone());
                }

                // note that the user has changed the routing manually.
                // This skips the automatic routing.
                this.owner._routingMetaData.routedByUserInteraction = true;
                return true;
            },

            /**
             * @method Called after a drag and drop action.<br>
             *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
             *
             * @param {Number} x the x-coordinate of the mouse event
             * @param {Number} y the y-coordinate of the mouse event
             * @param {Boolean} shiftKey true if the shift key has been pressed during this event
             * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
             *
             * @return {boolean}
             */
            onDragEnd: function (x, y, shiftKey, ctrlKey) {
                var stack = this.getCanvas().getCommandStack();

                stack.execute(this.command);
                this.command = null;

                return true;
            },


            /**
             * @method
             * Controls the location of the resize handle
             *
             * @template
             **/
            relocate: function () {

                var resizeWidthHalf = this.getWidth() / 2;
                var resizeHeightHalf = this.getHeight() / 2;

                var anchor = this.owner.getVertices().get(this.index);
                if (anchor)
                    this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf);
            }

        });
    },


    /**
     * @method
     *
     * @template
     * @param {draw2d.Connection} connection the selected figure
     * @param {boolean} isPrimarySelection
     */
    onSelect: function (canvas, connection, isPrimarySelection) {
        this._super(canvas, connection, isPrimarySelection);

        var points = connection.getVertices();
        var i = 1;
        for (; i < (points.getSize() - 1); i++) {
            var handle = new this.ResizeHandle(connection, i);
            connection.selectionHandles.add(handle);
            handle.setDraggable(connection.isResizeable());
            handle.show(canvas);
        }

        this.moved(canvas, connection);
        console.log("selected");

    },


    /**
     * @method
     * remove the segment with the given index.
     * You must check if it possible to remove the segment before. The method didn'T do any consistency checks.
     *
     * @param conn
     * @param segmentIndex
     */
    removeSegment: function (conn, segmentIndex) {
        var PADDING = 10;

        var segmentCount = conn.getVertices().getSize() - 1;

        var fromPt = conn.getStartPoint();
        var fromDir = conn.getSource().getConnectionDirection(conn, conn.getTarget());

        var toPt = conn.getEndPoint();
        var toDir = conn.getTarget().getConnectionDirection(conn, conn.getSource());

        var p0 = conn.getVertex(segmentIndex - 1);
        var p1 = conn.getVertex(segmentIndex);
        var p2 = conn.getVertex(segmentIndex + 1);
        var p3 = conn.getVertex(segmentIndex + 2);

        //                                             p0 .
        // Es wird ein Horizontales Segment               .
        // geloescht. Es muessen somit die Punkte         .
        // p0 und p3 neu gesetzt werden.               p1 +------*-----+ p2
        // Ihre neue X-Koordinate ist somit in der               ^     .
        // Mitte des geloeschten Segmentes                      newX   .
        //                                                             . p3
        //
        if (p1.y === p2.y) {
            var newX = (p1.x + p2.x) / 2;
            // Die neue X-Koordinate muss auf jeden Falls zwischen p-1 und p4 liegen
            //
            if (segmentIndex === 1) {
                if (fromDir === draw2d.geo.Rectangle.DIRECTION_RIGHT) {
                    newX = Math.max(newX, fromPt.x + PADDING);
                }
                else if (fromDir === draw2d.geo.Rectangle.DIRECTION_LEFT) {
                    newX = Math.min(newX, fromPt.x - PADDING);
                }
            }

            if (segmentIndex === segmentCount - 2) {
                if (toDir === draw2d.geo.Rectangle.DIRECTION_RIGHT) {
                    newX = Math.max(newX, toPt.x + PADDING);
                }
                else if (toDir === draw2d.geo.Rectangle.DIRECTION_LEFT) {
                    newX = Math.min(newX, toPt.x - PADDING);
                }
            }

            conn.setVertex(segmentIndex - 1, new draw2d.geo.Point(newX, p0.y));
            conn.setVertex(segmentIndex + 2, new draw2d.geo.Point(newX, p3.y));

            conn.removeVertexAt(segmentIndex);
            conn.removeVertexAt(segmentIndex);
            conn._routingMetaData.routedByUserInteraction = true;
        }

        //                                                         p2       p3
        // Es wird ein vertikales Segment                        +..........+
        // geloescht. Es muessen somit die Punkte                |
        // p0 und p3 neu gesetzt werden.                         |
        // Ihre neue Y-Koordinate ist somit in der               |
        // Mitte des geloeschten Segmentes              p0       | p1
        //                                              +........+
        //
        else if (p1.x === p2.x) {
            var newY = (p1.y + p2.y) / 2;
            // Die neue Y-Koordinate muss auf jeden Falls zwischen p-1 und p4 liegen
            //
            if (segmentIndex === 1) {
                if (fromDir === draw2d.geo.Rectangle.DIRECTION_RIGHT) {
                    newY = fromPt.y;
                }
                else if (fromDir === draw2d.geo.Rectangle.DIRECTION_LEFT) {
                    newY = fromPt.y;
                }
            }

            if (segmentIndex === segmentCount - 2) {
                if (toDir === draw2d.geo.Rectangle.DIRECTION_RIGHT) {
                    newY = toPt.y;
                }
                else if (toDir === draw2d.geo.Rectangle.DIRECTION_LEFT) {
                    newY = toPt.y;
                }
            }

            conn.setVertex(segmentIndex - 1, new draw2d.geo.Point(p0.x, newY));
            conn.setVertex(segmentIndex + 2, new draw2d.geo.Point(p3.x, newY));

            conn.removeVertexAt(segmentIndex);
            conn.removeVertexAt(segmentIndex);
            conn._routingMetaData.routedByUserInteraction = true;
        }
    },


    /**
     * @method
     * split the segment with the given index and insert a new segment.
     *
     * @param conn
     * @param segmentIndex
     */
    splitSegment: function (conn, segmentIndex, x, y) {
        var segmentCount = conn.getVertices().getSize() - 1;
        var p1 = conn.getVertex(segmentIndex);
        var p2 = conn.getVertex(segmentIndex + 1);
        var length = 40;

        // the selected segment is vertical
        //
        if (p1.x == p2.x) {
            conn._routingMetaData.routedByUserInteraction = true;
            // edge case of an ManhattanRouter: One segment. This happens if the source/target on the same x - coordinate
            //
            if (segmentCount === 1) {
                //     + p1
                //     |
                // np1 +-----+ np2
                //           |
                //           |
                // np3 +-----+ np3
                //     |
                //     |
                //     + p2
                //
                var newSegLength = (p1.getDistance(p2) / 4) / 2;
                var np1 = new draw2d.geo.Point(p1.x, y - newSegLength);
                var np2 = new draw2d.geo.Point(p2.x + length, y - newSegLength);
                var np3 = new draw2d.geo.Point(p2.x + length, y + newSegLength);
                var np4 = new draw2d.geo.Point(p2.x, y + newSegLength);

                conn.insertVertexAt(segmentIndex + 1, np1);
                conn.insertVertexAt(segmentIndex + 2, np2);
                conn.insertVertexAt(segmentIndex + 3, np3);
                conn.insertVertexAt(segmentIndex + 4, np4);
            }
            else {
                //       p2 +
                //          .
                // np1 +----+ np2
                //     .
                //     .
                //     + p1
                var np1 = new draw2d.geo.Point(p1.x - (length / 2), y);
                var np2 = new draw2d.geo.Point(p2.x + (length / 2), y);

                conn.setVertex(segmentIndex, new draw2d.geo.Point(np1.x, p1.y));
                conn.setVertex(segmentIndex + 1, new draw2d.geo.Point(np2.x, p2.y));
                conn.insertVertexAt(segmentIndex + 1, np1);
                conn.insertVertexAt(segmentIndex + 2, np2);
            }
        }
        // the selected segment is horizontal
        //
        else if (p1.y == p2.y) {
            conn._routingMetaData.routedByUserInteraction = true;
            // edge case of an ManhattanRouter: One segment. This happens if the source/target on the same y - coordinate
            //
            if (segmentCount === 1) {
                //     np2 +---------+ np3
                //         |         |
                // --------+np1   np4+--------
                //
                var newSegLength = (p1.getDistance(p2) / 4) / 2;
                var np1 = new draw2d.geo.Point(x - newSegLength, p1.y);
                var np2 = new draw2d.geo.Point(x - newSegLength, p1.y - length);
                var np3 = new draw2d.geo.Point(x + newSegLength, p1.y - length);
                var np4 = new draw2d.geo.Point(x + newSegLength, p1.y);

                conn.insertVertexAt(segmentIndex + 1, np1);
                conn.insertVertexAt(segmentIndex + 2, np2);
                conn.insertVertexAt(segmentIndex + 3, np3);
                conn.insertVertexAt(segmentIndex + 4, np4);
            }
            else {
                //     p1        np1
                //   +.........+
                //             |
                //             |
                //             | np2       p2
                //             +.........+
                var np1 = new draw2d.geo.Point(0, 0);
                var np2 = new draw2d.geo.Point(0, 0);

                // p1 ist der Startpunkt und darf somit nicht verschoben werden
                //
                if (segmentIndex === 0) {
                    np1.x = x;
                    np1.y = p1.y;
                    np2.x = x;
                    np2.y = p2.y + length;
                    conn.setVertex(segmentIndex + 1, new draw2d.geo.Point(p2.x, np2.y));
                }
                // p2 ist der Schlusspunkt und darf somit nicht veaendert werden
                //
                else if (segmentIndex === segmentCount - 1) {
                    np1.x = x;
                    np1.y = p1.y - length;
                    np2.x = x;
                    np2.y = p2.y;
                    conn.setVertex(segmentIndex, new draw2d.geo.Point(p1.x, np1.y));
                }
                else {
                    np1.x = x;
                    np1.y = p1.y - (length / 2);
                    np2.x = x;
                    np2.y = p2.y + (length / 2);
                    conn.setVertex(segmentIndex, new draw2d.geo.Point(p1.x, np1.y));
                    conn.setVertex(segmentIndex + 1, new draw2d.geo.Point(p2.x, np2.y));
                }
                conn.insertVertexAt(segmentIndex + 1, np1);
                conn.insertVertexAt(segmentIndex + 2, np2);
            }
        }
    },

    /**
     * @method
     * Called if the user press the right mouse on the figure.<br>
     * You can either override the "onContextMenu" method of the figure or install an editor policy and override this method.
     * Booth is valid and possible.
     *
     * @param {draw2d.shape.basic.Line} conn the polyline below the mouse
     * @param {Number} x the x-coordinate of the mouse down event
     * @param {Number} y the y-coordinate of the mouse down event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since 4.4.0
     */
    onRightMouseDown: function (conn, x, y, shiftKey, ctrlKey) {
        var segment = conn.hitSegment(x, y);
        var items = {"split": {name: draw2d.Configuration.i18n.menu.addSegment}};

        if (segment === null) {
            return;
        }

        if (conn.getRouter().canRemoveSegmentAt(conn, segment.index)) {
            items.remove = {name: draw2d.Configuration.i18n.menu.deleteSegment};
        }

        $.contextMenu({
            selector: 'body',
            events: {
                hide: function () {
                    $.contextMenu('destroy');
                }
            },
            callback: $.proxy(function (key, options) {
                switch (key) {
                    case "remove":
                        // deep copy of the vertices of the connection for the command stack to avoid side effects
                        var originalVertices = conn.getVertices().clone(true);
                        this.removeSegment(conn, segment.index);
                        var newVertices = conn.getVertices().clone(true);
                        conn.getCanvas().getCommandStack().execute(new draw2d.command.CommandReplaceVertices(conn, originalVertices, newVertices));
                        break;
                    case "split":
                        // deep copy of the vertices of the connection for the command stack to avoid side effects
                        var originalVertices = conn.getVertices().clone(true);
                        this.splitSegment(conn, segment.index, x, y);
                        var newVertices = conn.getVertices().clone(true);
                        conn.getCanvas().getCommandStack().execute(new draw2d.command.CommandReplaceVertices(conn, originalVertices, newVertices));
                        break;
                    default:
                        break;
                }

            }, this),
            x: x,
            y: y,
            items: items
        });
    }


});

/**
 * @class draw2d.policy.port.PortFeedbackPolicy
 *
 * A draw2d.policy.SelectionFeedbackPolicy that is sensitive to the canvas selection. Subclasses will typically
 * decorate the {@link draw2d.Figure figure} with things like selection handles and/or focus feedback.
 * <br>
 * If you want to change the handle visibility for a figure, then you should use SelectionFeedbackPolicy to do that.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.port.PortFeedbackPolicy = draw2d.policy.figure.DragDropEditPolicy.extend({


    NAME: "draw2d.policy.port.PortFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
    },

    /**
     * @method
     * Called if the dragged port hove another port
     *
     * @param {draw2d.Canvas} canvas
     * @param {draw2d.Port}   draggedFigure
     * @param {draw2d.Figure} hoverFigure
     */
    onHoverEnter: function (canvas, draggedFigure, hoverFigure) {

    },

    onHoverLeave: function (canvas, draggedFigure, hoverFigure) {
    }


});


/**
 * @class draw2d.policy.port.ElasticStrapFeedbackPolicy
 *
 * A draw2d.policy.SelectionFeedbackPolicy that is sensitive to the canvas selection. Subclasses will typically
 * decorate the {@link draw2d.Figure figure} with things like selection handles and/or focus feedback.
 * <br>
 * If you want to change the handle visibility for a figure, then you should use SelectionFeedbackPolicy to do that.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.port.ElasticStrapFeedbackPolicy = draw2d.policy.port.PortFeedbackPolicy.extend({

    NAME: "draw2d.policy.port.ElasticStrapFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
        this.connectionLine = null;
    },

    /**
     * @method
     * Called by the framework if the related shape has init a drag&drop
     * operation
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onDragStart: function (canvas, figure, x, y, shiftKey, ctrlKey) {
        this.connectionLine = new draw2d.shape.basic.Line();
        this.connectionLine.setCanvas(canvas);
        this.connectionLine.getShapeElement();

        this.onDrag(canvas, figure);
    },


    /**
     * @method
     * Called by the framework during drag a figure.
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @template
     */
    onDrag: function (canvas, figure) {
        var x1 = figure.ox + figure.getParent().getAbsoluteX();
        var y1 = figure.oy + figure.getParent().getAbsoluteY();

        this.connectionLine.setStartPoint(x1, y1);
        this.connectionLine.setEndPoint(figure.getAbsoluteX(), figure.getAbsoluteY());
    },

    /**
     * @method
     * Called by the framework if the drag drop operation ends.
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onDragEnd: function (canvas, figure, x, y, shiftKey, ctrlKey) {
        this.connectionLine.setCanvas(null);
        this.connectionLine = null;
    },

    onHoverEnter: function (canvas, draggedFigure, hoverFiger) {
        this.connectionLine.setGlow(true);
        hoverFiger.setGlow(true);
    },

    onHoverLeave: function (canvas, draggedFigure, hoverFiger) {
        hoverFiger.setGlow(false);
        this.connectionLine.setGlow(false);
    }


});


/**
 * @class draw2d.policy.port.IntrusivePortsFeedbackPolicy
 *
 * A draw2d.policy.SelectionFeedbackPolicy that is sensitive to the canvas selection. Subclasses will typically
 * decorate the {@link draw2d.Figure figure} with things like selection handles and/or focus feedback.
 * <br>
 * If you want to change the handle visibility for a figure, then you should use SelectionFeedbackPolicy to do that.
 *
 * @author Andreas Herz
 * @extends draw2d.policy.figure.DragDropEditPolicy
 */
draw2d.policy.port.IntrusivePortsFeedbackPolicy = draw2d.policy.port.PortFeedbackPolicy.extend({

    NAME: "draw2d.policy.port.IntrusivePortsFeedbackPolicy",

    /**
     * @constructor
     * Creates a new Router object
     */
    init: function () {
        this._super();
        this.connectionLine = null;
        this.tweenable = null;
    },

    /**
     * @method
     * Called by the framework if the related shape has init a drag&drop
     * operation
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     */
    onDragStart: function (canvas, figure, x, y, shiftKey, ctrlKey) {
        var start = 0;
        var allPorts = canvas.getAllPorts().clone();
        allPorts.each(function (i, element) {
            element.__beforeInflate = element.getWidth();
            start = element.__beforeInflate;
        });

        // animate the resize of the ports
        //
        allPorts.grep(function (p) {
            return (p.NAME != figure.NAME && p.parent !== figure.parent) || (p instanceof draw2d.HybridPort) || (figure instanceof draw2d.HybridPort);
        });
        this.tweenable = new Tweenable();
        this.tweenable.tween({
            from: {'size': start / 2},
            to: {'size': start},
            duration: 200,
            easing: "easeOutSine",
            step: function (params) {
                allPorts.each(function (i, element) {
                    // IMPORTANT shortcut to avoid rendering errors!!
                    // performance shortcut to avoid a lot of events and recalculate/routing of all related connections
                    // for each setDimension call. Additional the connection is following a port during Drag&Drop operation
                    element.shape.attr({rx: params.size, ry: params.size});
                    element.width = element.height = params.size * 2;
                    //element.setDimension(params.size, params.size);
                });
            }
        });

        this.connectionLine = new draw2d.shape.basic.Line();
        this.connectionLine.setCanvas(canvas);
        this.connectionLine.getShapeElement();
        this.connectionLine.setDashArray("- ");
        this.connectionLine.setColor("#30c48a");

        this.onDrag(canvas, figure);
    },


    /**
     * @method
     * Called by the framework during drag a figure.
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @template
     */
    onDrag: function (canvas, figure) {
        var x1 = figure.ox + figure.getParent().getAbsoluteX();
        var y1 = figure.oy + figure.getParent().getAbsoluteY();

        this.connectionLine.setStartPoint(x1, y1);
        this.connectionLine.setEndPoint(figure.getAbsoluteX(), figure.getAbsoluteY());
    },

    /**
     * @method
     * Called by the framework if the drag drop operation ends.
     *
     * @param {draw2d.Canvas} canvas The host canvas
     * @param {draw2d.Figure} figure The related figure
     * @template
     */
    onDragEnd: function (canvas, figure, x, y, shiftKey, ctrlKey) {
        this.tweenable.stop(false);
        this.tweenable = null;
        canvas.getAllPorts().each(function (i, element) {
            // IMPORTANT shortcut to avoid rendering errors!!
            // performance shortcut to avoid a lot of events and recalculate/routing of all related connections
            // for each setDimension call. Additional the connection is following a port during Drag&Drop operation
            element.shape.attr({rx: element.__beforeInflate / 2, ry: element.__beforeInflate / 2});
            element.width = element.height = element.__beforeInflate;
            //element.setDimension(element.__beforeInflate, element.__beforeInflate);
        });
        this.connectionLine.setCanvas(null);
        this.connectionLine = null;
    },

    onHoverEnter: function (canvas, draggedFigure, hoverFiger) {
        this.connectionLine.setGlow(true);
        hoverFiger.setGlow(true);
    },

    onHoverLeave: function (canvas, draggedFigure, hoverFiger) {
        hoverFiger.setGlow(false);
        this.connectionLine.setGlow(false);
    }


});

draw2d.Configuration = {
    version: "5.2.0",
    i18n: {
        command: {
            move: "Move Shape",
            assignShape: "Add Shapes to Composite",
            groupShapes: "Group Shapes",
            ungroupShapes: "Ungroup Shapes",
            deleteShape: "Delete Shape",
            moveShape: "Move Shape",
            moveLine: "Move Line",
            addShape: "Add Shape",
            moveVertex: "Move Vertex",
            moveVertices: "Move Vertices",
            deleteVertex: "Delete Vertex",
            resizeShape: "Resize Shape",
            collection: "Execute Commands",
            addVertex: "Add Vertex",
            connectPorts: "Connect Ports"
        },
        menu: {
            deleteSegment: "Delete Segment",
            addSegment: "Add Segment"
        },
        dialog: {
            filenamePrompt: "Enter Filename:"
        }
    },

    factory: {
        // all selection policies calles this method to create a ResizeHandle.
        // It is possible to replace this method with a custom implementation
        // @since 5.2.0
        createResizeHandle: function (forShape, type) {
            return new draw2d.ResizeHandle(forShape, type);
        }
    }
};

/**
 * @class draw2d.Canvas
 * Interactive paint area of the draw2d library.
 * <br>
 * <strong>Usage</strong>
 *
 *
 *      $(window).load(function () {
 *
 *          var canvas = new draw2d.Canvas("gfx_holder");
 *
 *          var figure1 = new draw2d.shape.basic.Oval();
 *          var figure2 = new draw2d.shape.basic.Rectangle();
 *          canvas.add(figure1,100,100);
 *          canvas.add(figure2,120,150);
 *      });
 *
 *
 * @inheritable
 * @author Andreas Herz
 */
draw2d.Canvas = Class.extend(
    {
        NAME: "draw2d.Canvas",

        /**
         * @constructor
         * Create a new canvas with the given HTML DOM references.
         *
         * @param {String} canvasId the id of the DOM element to use a parent container
         */
        init: function (canvasId, width, height) {
            var _this = this;
            // Hook the canvas calculation for IE8
            //
            if (navigator.appName == 'Microsoft Internet Explorer') {
                var ua = navigator.userAgent;
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null) {
                    rv = parseInt(RegExp.$1);
                    if (rv === 8) {
                        this.fromDocumentToCanvasCoordinate = this._fromDocumentToCanvasCoordinate_IE8_HACK;
                    }
                }
            }

            this.setScrollArea(document.body);
            this.canvasId = canvasId;
            this.html = $("#" + canvasId);
            this.html.css({"cursor": "default"});
            if (typeof width !== "undefined") {
                this.initialWidth = width;
                this.initialHeight = height;
            }
            else {
                this.initialWidth = this.getWidth();
                this.initialHeight = this.getHeight();
            }

            // avoid the "highlighting" in iPad, iPhone if the user tab/touch on the canvas.
            // .... I don't like this.
            this.html.css({"-webkit-tap-highlight-color": "rgba(0,0,0,0)"});

            // Drag&Drop Handling from foreign DIV into the Canvas
            // Only available in combination with jQuery-UI
            //
            // Create the droppable area for the css class "draw2d_droppable"
            // This can be done by a palette of toolbar or something else.
            // For more information see : http://jqueryui.com/demos/droppable/
            //
            if (typeof this.html.droppable !== "undefined") {
                this.html.droppable({
                    accept: '.draw2d_droppable',
                    over: function (event, ui) {
                        _this.onDragEnter(ui.draggable);
                    },
                    out: function (event, ui) {
                        _this.onDragLeave(ui.draggable);
                    },
                    drop: function (event, ui) {
                        event = _this._getEvent(event);
                        var pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                        _this.onDrop(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey);
                    }
                });

                // Create the jQuery-Draggable for the palette -> canvas drag&drop interaction
                //
                $(".draw2d_droppable").draggable({
                    appendTo: "body",
                    stack: "body",
                    zIndex: 27000,
                    helper: "clone",
                    drag: function (event, ui) {
                        event = _this._getEvent(event);
                        var pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                        _this.onDrag(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey);
                    },
                    stop: function (e, ui) {
                    },
                    start: function (e, ui) {
                        $(ui.helper).addClass("shadow");
                    }
                });
            }

            // painting stuff
            //
            if (typeof height !== "undefined") {
                this.paper = Raphael(canvasId, width, height);
            }
            else {
                this.paper = Raphael(canvasId, this.getWidth(), this.getHeight());
            }
            this.paper.canvas.style.position = "absolute";

            // Status handling
            //
            this.zoomFactor = 1.0; // range [0.001..10]
            this.selection = new draw2d.Selection();
            this.currentDropTarget = null;
            this.currentHoverFigure = null;

            // eventhandling since version 5.0.0
            this.eventSubscriptions = {};

            this.editPolicy = new draw2d.util.ArrayList();

            // internal document with all figures, ports, ....
            //
            this.figures = new draw2d.util.ArrayList();
            this.lines = new draw2d.util.ArrayList(); // crap - why are connections not just figures. Design by accident
            this.commonPorts = new draw2d.util.ArrayList();
            this.dropTargets = new draw2d.util.ArrayList();

            // all visible resize handles which can be drag&drop around. Selection handles like AntRectangleSelectionFeedback
            // are not part of this collection. Required for hitTest only
            this.resizeHandles = new draw2d.util.ArrayList();

            // The CommandStack for undo/redo operations
            //
            this.commandStack = new draw2d.command.CommandStack();

            // INTERSECTION/CROSSING handling for connections and lines
            //
            this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList();
            this.lineIntersections = new draw2d.util.ArrayList();

            this.installEditPolicy(new draw2d.policy.canvas.DefaultKeyboardPolicy());      // Handles the ke3yboard interaction
            this.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy()); // Responsible for selection handling
            this.installEditPolicy(new draw2d.policy.canvas.ConnectionInterceptorPolicy());// Responsible for port, connection and drop operations

            // Calculate all intersection between the different lines
            //
            this.commandStack.addEventListener(function (event) {
                if (event.isPostChangeEvent() === true) {
                    _this.calculateConnectionIntersection();
                    _this.linesToRepaintAfterDragDrop.each(function (i, line) {
                        line.svgPathString = null;
                        line.repaint();
                    });
                    _this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList();
                }
            });

            // DragDrop status handling
            //
            this.mouseDown = false;
            this.mouseDownX = 0;
            this.mouseDownY = 0;
            this.mouseDragDiffX = 0;
            this.mouseDragDiffY = 0;

            this.html.bind("mouseup touchend", function (event) {
                if (_this.mouseDown === false) {
                    return;
                }

                event = _this._getEvent(event);
                _this.calculateConnectionIntersection();

                _this.mouseDown = false;
                var pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                _this.editPolicy.each(function (i, policy) {
                    policy.onMouseUp(_this, pos.x, pos.y, event.shiftKey, event.ctrlKey);
                });

                _this.mouseDragDiffX = 0;
                _this.mouseDragDiffY = 0;
            });

            this.html.bind("mousemove touchmove", function (event) {
                event = _this._getEvent(event);
                if (_this.mouseDown === false) {
                    var pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                    // mouseEnter/mouseLeave events for Figures. Don't use the Raphael or DOM native functions.
                    // Raphael didn't work for Rectangle with transparent fill (events only fired for the border line)
                    // DOM didn't work well for lines. No eclipse area - you must hit the line exact to retrieve the event.
                    // In this case I implement my own stuff...again and again.
                    //
                    // don't break the main event loop if one element fires an error during enter/leave event.
                    try {
                        var hover = _this.getBestFigure(pos.x, pos.y);
                        if (hover !== _this.currentHoverFigure && _this.currentHoverFigure !== null) {
                            _this.currentHoverFigure.onMouseLeave();
                        }
                        if (hover !== _this.currentHoverFigure && hover !== null) {
                            hover.onMouseEnter();
                        }
                        _this.currentHoverFigure = hover;
                    }
                    catch (exc) {
                        // just write it to the console
                        console.log(exc);
                    }

                    _this.editPolicy.each(function (i, policy) {
                        policy.onMouseMove(_this, pos.x, pos.y, event.shiftKey, event.ctrlKey);
                    });
                }
                else {
                    var diffXAbs = (event.clientX - _this.mouseDownX) * _this.zoomFactor;
                    var diffYAbs = (event.clientY - _this.mouseDownY) * _this.zoomFactor;
                    _this.editPolicy.each(function (i, policy) {
                        policy.onMouseDrag(_this, diffXAbs, diffYAbs, diffXAbs - _this.mouseDragDiffX, diffYAbs - _this.mouseDragDiffY);
                    });
                    _this.mouseDragDiffX = diffXAbs;
                    _this.mouseDragDiffY = diffYAbs;
                }
            });

            this.html.bind("mousedown touchstart", function (event) {
                try {
                    var pos = null;
                    switch (event.which) {
                        case 1: //touch pressed
                        case 0: //Left mouse button pressed
                            event.preventDefault();
                            event = _this._getEvent(event);
                            _this.mouseDownX = event.clientX;
                            _this.mouseDownY = event.clientY;
                            _this.mouseDragDiffX = 0;
                            _this.mouseDragDiffY = 0;
                            pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                            _this.mouseDown = true;
                            _this.editPolicy.each(function (i, policy) {
                                policy.onMouseDown(_this, pos.x, pos.y, event.shiftKey, event.ctrlKey);
                            });
                            break;
                        case 3: //Right mouse button pressed
                            event.preventDefault();
                            event = _this._getEvent(event);
                            pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                            _this.onRightMouseDown(pos.x, pos.y, event.shiftKey, event.ctrlKey);
                            break;
                        case 2:
                            //Middle mouse button pressed
                            break;
                        default:
                        //You have a strange mouse
                    }
                }
                catch (exc) {
                    console.log(exc);
                }
            });


            // Catch the dblclick and route them to the Canvas hook.
            //
            this.html.bind("dblclick", function (event) {
                event = _this._getEvent(event);

                _this.mouseDownX = event.clientX;
                _this.mouseDownY = event.clientY;
                var pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                _this.onDoubleClick(pos.x, pos.y, event.shiftKey, event.ctrlKey);
            });


            // Catch the click event and route them to the canvas hook
            //
            this.html.bind("click", function (event) {
                event = _this._getEvent(event);

                // fire only the click event if we didn't move the mouse (drag&drop)
                //
                if (_this.mouseDownX === event.clientX || _this.mouseDownY === event.clientY) {
                    var pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                    _this.onClick(pos.x, pos.y, event.shiftKey, event.ctrlKey);
                }
            });

            // Catch the keyUp and CTRL-key and route them to the Canvas hook.
            //
            this.keyupCallback = function (event) {
                // don't initiate the delete command if the event comes from an INPUT field. In this case the user want delete
                // a character in the input field and not the related shape
                var target = $(event.target);
                if (!target.is("input") && !target.is("textarea")) {
                    _this.editPolicy.each(function (i, policy) {
                        if (policy instanceof draw2d.policy.canvas.KeyboardPolicy) {
                            policy.onKeyUp(_this, event.keyCode, event.shiftKey, event.ctrlKey);
                        }
                    });
                }
            };
            $(document).bind("keyup", this.keyupCallback);

            // Catch the keyDown and CTRL-key and route them to the Canvas hook.
            //
            this.keydownCallback = function (event) {
                // don't initiate the delete command if the event comes from an INPUT field. In this case the user want delete
                // a character in the input field and not the related shape
                var target = $(event.target);
                if (!target.is("input") && !target.is("textarea")) {
                    _this.editPolicy.each(function (i, policy) {
                        if (policy instanceof draw2d.policy.canvas.KeyboardPolicy) {
                            policy.onKeyDown(_this, event.keyCode, event.shiftKey, event.ctrlKey);
                        }
                    });
                }
            };
            $(document).bind("keydown", this.keydownCallback);

        },

        /**
         * @method
         * Call this method if you didn't need the canvas anymore. The method unregister all even handlers
         * and free all resources. The canvas is unusable after this call
         *
         * @since. 4.7.4
         */
        destroy: function () {
            this.clear();
            $(document).unbind("keydown", this.keydownCallback);
            $(document).unbind("keyup", this.keyupCallback);
            // reset the event handlers of the canvas without any notice
            //
            this.eventSubscriptions = {};

            try {
                this.paper.remove();
            } catch (exc) {
                // breaks in some ie7 version....don't care about this because ie7/8 isn't a state of the art browser  ;-)
            }
        },

        /**
         * @method
         * Reset the canvas and delete all model elements.<br>
         * You can now reload another model to the canvas with a {@link draw2d.io.Reader}
         *
         * @since 1.1.0
         */
        clear: function () {
            // notice all listener that the canvas will be cleared
            this.fireEvent("clear");

            var _this = this;

            this.lines.clone().each(function (i, e) {
                _this.remove(e);
            });

            this.figures.clone().each(function (i, e) {
                _this.remove(e);
            });

            this.zoomFactor = 1.0;
            this.selection.clear();
            this.currentDropTarget = null;

            // internal document with all figures, ports, ....
            //
            this.figures = new draw2d.util.ArrayList();
            this.lines = new draw2d.util.ArrayList();
            this.commonPorts = new draw2d.util.ArrayList();
            this.dropTargets = new draw2d.util.ArrayList();

            this.commandStack.markSaveLocation();

            // INTERSECTION/CROSSING handling for connections and lines
            //
            this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList();
            this.lineIntersections = new draw2d.util.ArrayList();

            // Inform all listener that the selection has been cleanup. Normally this will be done
            // by the edit policies of the canvas..but exceptional this is done in the clear method as well -
            // Design flaw.
            this.fireEvent("select", null);

            return this;
        },

        /**
         * @method
         * Callback for any kind of image export tools to trigger the canvas to hide all unwanted
         * decorations. The method is called e.g. from the draw2d.io.png.Writer
         *
         * @since 4.0.0
         * @template
         */
        hideDecoration: function () {

        },

        /**
         * @method
         * callback method for any image export writer to reactivate the decoration
         * of the canvas. e.g. grids, rulers,...
         *
         *
         * @since 4.0.0
         * @template
         */
        showDecoration: function () {

        },

        /**
         * @method
         * Calculate all connection intersection of the canvas.
         * Required for "bridging" or "crossing decoration"
         *
         * @private
         */
        calculateConnectionIntersection: function () {

            var _this = this;
            this.lineIntersections = new draw2d.util.ArrayList();
            var lines = this.getLines().clone();
            while (lines.getSize() > 0) {
                var l1 = lines.removeElementAt(0);
                lines.each(function (ii, l2) {
                    var partInter = l1.intersection(l2);
                    if (partInter.getSize() > 0) {
                        _this.lineIntersections.add({line: l1, other: l2, intersection: partInter});
                        _this.lineIntersections.add({line: l2, other: l1, intersection: partInter});
                    }
                });
            }

            return this;
        },


        /**
         * @method
         *
         * Install a new selection and edit policy into the canvas
         *
         * @since 2.2.0
         * @param {draw2d.policy.EditPolicy} policy
         */
        installEditPolicy: function (policy) {
            var _this = this;
            // a canvas can handle only one selection policy
            //
            if (policy instanceof draw2d.policy.canvas.SelectionPolicy) {
                // reset old selection before install new selection strategy
                this.getSelection().getAll().each(function (i, figure) {
                    figure.unselect();
                });

                // remove existing selection policy
                this.editPolicy.grep(function (p) {
                    var stay = !(p instanceof draw2d.policy.canvas.SelectionPolicy);
                    if (stay === false) {
                        p.onUninstall(_this);
                    }
                    return stay;
                });
            }
            // only one SnapToXYZ edit policy at once
            else if (policy instanceof draw2d.policy.canvas.SnapToEditPolicy) {
                // remove existing snapTo policy
                this.editPolicy.grep(function (p) {
                    var stay = !(p instanceof draw2d.policy.canvas.SnapToEditPolicy);
                    if (stay === false) {
                        p.onUninstall(_this);
                    }
                    return stay;
                });
            }
            else if (policy instanceof draw2d.policy.canvas.ConnectionInterceptorPolicy) {
                // think about if I allow to install move than one
            }

            policy.onInstall(this);
            this.editPolicy.add(policy);

            return this;
        },

        /**
         * @method
         *
         * UnInstall the selection and edit policy from the canvas.
         *
         * @since 2.2.0
         * @param {draw2d.policy.EditPolicy} policy
         */
        uninstallEditPolicy: function (policy) {
            if (!(policy instanceof draw2d.policy.EditPolicy)) {
                return this; // silently
            }

            // either remove exact the policy instance...
            //
            var removed = this.editPolicy.remove(policy);
            if (removed !== null) {
                removed.onUninstall(this);
            }
            else {
                // ..or all of the same class if the policy isn't installed before
                // With this kind of behaviour it is possible to deinstall all policies with
                // the same class at once
                //
                var _this = this;
                this.editPolicy.grep(function (p) {
                    if (p.NAME === policy.NAME) {
                        p.onUninstall(_this);
                        return false;
                    }
                    return true;
                });
            }
            return this;
        },

        getInterceptorPolicies: function () {
            return this.editPolicy.clone().grep(function (p) {
                return (p instanceof draw2d.policy.canvas.ConnectionInterceptorPolicy);
            });
        },

        /**
         * @method
         * Set the new zoom factor for the canvas. The value must be between [0.01..10]
         *
         *      // you can register an eventhandler if the zoom factor did change
         *      canvas.on("zoom", function(emitterFigure, zoomData){
     *          alert("canvas zoomed to:"+zoomData.factor);
     *      });
         *
         * @param {Number} zoomFactor new zoom factor.
         * @param {boolean} [animated] set it to true for smooth zoom in/out
         */
        setZoom: function (zoomFactor, animated) {
            var _this = this;
            var _zoom = function (z) {
                _this.zoomFactor = Math.min(Math.max(0.01, z), 10);

                var viewBoxWidth = (_this.initialWidth * (_this.zoomFactor)) | 0;
                var viewBoxHeight = (_this.initialHeight * (_this.zoomFactor)) | 0;

                _this.paper.setViewBox(0, 0, viewBoxWidth, viewBoxHeight);

                _this.fireEvent("zoom", {factor: _this.zoomFactor});

                // BUG: raphael didn't handle setViewBox AND setSize correct
//            var paintArea =this.html.children(":first");
//            this.paper.setSize(this.html.width(), this.html.height());

                // didn't work too....   :-(
//            paintArea.width(this.initialWidth * this.zoomFactor);
//            paintArea.height(this.initialHeight * this.zoomFactor);
            };

            if (animated) {
                var myTweenable = new Tweenable();
                myTweenable.tween({
                    from: {'x': this.zoomFactor},
                    to: {'x': zoomFactor},
                    duration: 300,
                    easing: "easeOutSine",
                    step: function (params) {
                        _zoom(params.x);
                    }
                });
            }
            else {
                _zoom(zoomFactor);
            }
        },

        /**
         * @method
         * Return the current zoom factor of the canvas.
         *
         * @returns {Number}
         */
        getZoom: function () {
            return this.zoomFactor;
        },

        /**
         * @method
         * Return the dimension of the drawing area
         *
         * @since 4.4.0
         * @returns {draw2d.geo.Rectangle}
         */
        getDimension: function () {
            return new draw2d.geo.Rectangle(0, 0, this.initialWidth, this.initialHeight);
        },

        /**
         * @method
         * Tells the canvas to resize. If you do not specific any parameters
         * the canvas will attempt to determine the height and width by the enclosing bounding box
         * of all elements and set the dimension accordingly. If you would like to set the dimension
         * explicitly pass in an draw2d.geo.Rectangle or an object with <b>height</b> and <b>width</b> properties.
         *
         * @since 4.4.0
         * @param {draw2d.geo.Rectangle} [dim] the dimension to set or null for autodetect
         */
        setDimension: function (dim) {
            if (typeof dim === "undefined") {
                var widths = this.getFigures().clone().map(function (f) {
                    return f.getAbsoluteX() + f.getWidth();
                });
                var heights = this.getFigures().clone().map(function (f) {
                    return f.getAbsoluteY() + f.getHeight();
                });
                this.initialHeight = Math.max.apply(Math, heights.asArray());
                this.initialWidth = Math.max.apply(Math, widths.asArray());
            }
            else if (dim instanceof draw2d.geo.Rectangle) {
                this.initialWidth = dim.w;
                this.initialHeight = dim.h;
            }
            else if (typeof dim.width === "number" && typeof dim.height === "number") {
                this.initialWidth = dim.width;
                this.initialHeight = dim.height;
            }
            this.html.css({"width": this.initialWidth + "px", "height": this.initialHeight + "px"});
            this.paper.setSize(this.initialWidth, this.initialHeight);
            this.setZoom(this.zoomFactor, false);

            return this;
        },


        /**
         * @method
         * Transforms a document coordinate to canvas coordinate.
         *
         * @param {Number} x the x coordinate relative to the window
         * @param {Number} y the y coordinate relative to the window
         *
         * @returns {draw2d.geo.Point} The coordinate in relation to the canvas [0,0] position
         */
        fromDocumentToCanvasCoordinate: function (x, y) {
            return new draw2d.geo.Point(
                (x - this.getAbsoluteX() + this.getScrollLeft()) * this.zoomFactor,
                (y - this.getAbsoluteY() + this.getScrollTop()) * this.zoomFactor);
        },

        _fromDocumentToCanvasCoordinate_IE8_HACK: function (x, y) {
            return new draw2d.geo.Point(
                (x - this.getAbsoluteX()) * this.zoomFactor,
                (y - this.getAbsoluteY()) * this.zoomFactor);
        },

        /**
         * @method
         * Transforms a canvas coordinate to document coordinate.
         *
         * @param {Number} x the x coordinate in the canvas
         * @param {Number} y the y coordinate in the canvas
         *
         * @returns {draw2d.geo.Point} the coordinate in relation to the document [0,0] position
         */
        fromCanvasToDocumentCoordinate: function (x, y) {
            return new draw2d.geo.Point(
                ((x * (1 / this.zoomFactor)) + this.getAbsoluteX() - this.getScrollLeft()),
                ((y * (1 / this.zoomFactor)) + this.getAbsoluteY() - this.getScrollTop()));
        },

        /**
         * @method
         * The DOM host of the canvas
         *
         * @returns {HTMLElement}
         */
        getHtmlContainer: function () {
            return this.html;
        },


        /**
         * @method
         * Return a common event object independed if we run on an iPad or desktop.
         *
         * @param event
         * @return
         * @private
         */
        _getEvent: function (event) {
            // check for iPad, Android touch events
            //
            if (typeof event.originalEvent !== "undefined") {
                if (event.originalEvent.touches && event.originalEvent.touches.length) {
                    return event.originalEvent.touches[0];
                } else if (event.originalEvent.changedTouches && event.originalEvent.changedTouches.length) {
                    return event.originalEvent.changedTouches[0];
                }
            }
            return event;
        },

        /**
         * @method
         *
         * Set the area which are scrolling the canvas. This can be a jquery selector or
         * a jQuery node.
         *
         * @param {String/HTMLElement} elementSelector
         **/
        setScrollArea: function (elementSelector) {
            this.scrollArea = $(elementSelector);

            return this;
        },

        /**
         * @method
         *
         * return the scrolling area of the canvas. This is jQuery object
         *
         * @return {HTMLElement}
         **/
        getScrollArea: function () {
            return this.scrollArea;
        },

        /**
         * @method
         * The left scroll position.
         *
         * @return {Number} the left scroll offset of the canvas
         **/
        getScrollLeft: function () {
            return this.scrollArea.scrollLeft();
        },

        /**
         * @method
         * The top scroll position
         *
         * @return {Number} the top scroll offset of the cnavas.
         **/
        getScrollTop: function () {
            return this.scrollArea.scrollTop();
        },

        /**
         * @method
         * The absolute document x offset.
         *
         * @return {Number}
         **/
        getAbsoluteX: function () {
            return this.html.offset().left;
        },

        /**
         * @method
         * The absolute document y offset.
         *
         * @return {Number}
         **/
        getAbsoluteY: function () {
            return this.html.offset().top;
        },


        /**
         * @method
         * Return the width of the canvas
         *
         * @return {Number}
         **/
        getWidth: function () {
            return this.html.width();
        },


        /**
         * @method
         * Return the height of the canvas.
         *
         * @return {Number}
         **/
        getHeight: function () {
            return this.html.height();
        },


        /**
         * @method
         * Add a figure at the given x/y coordinate. This method fires an event.
         *
         * Example:
         *
         *      canvas.on("figure:add", function(emitter, event){
     *         alert("figure added:");
     *      });
         *
         *      // or more general if you want catch all figure related events
         *      //
         *      canvas.on("figure", function(emitter, event){
     *         // use event.figure.getCanvas()===null to determine if the
     *         // figure part of the canvas
     *
     *         alert("figure added or removed:");
     *      });
         *
         * @param {draw2d.Figure} figure The figure to add.
         * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure or the x/y coordinate if it is an draw2d.geo.Point
         * @param {Number} [y] The y position.
         **/
        add: function (figure, x, y) {
            if (figure.getCanvas() === this) {
                return;
            }

            if (figure instanceof draw2d.shape.basic.Line) {
                this.lines.add(figure);
                this.linesToRepaintAfterDragDrop = this.lines;
            }
            else {
                this.figures.add(figure);
                if (typeof y !== "undefined") {
                    figure.setPosition(x, y);
                }
                else if (typeof x !== "undefined") {
                    figure.setPosition(x);
                }
            }
            figure.setCanvas(this);

            // important inital call
            figure.getShapeElement();

            // init a repaint of the figure. This enforce that all properties
            // ( color, dim, stroke,...) will be set.
            figure.repaint();
            // fire the figure:add event before the "move" event and after the figure.repaint() call!
            //   - the move event can only be fired if the figure part of the canvas.
            //     and in this case the notification event should be fired to the listener before
            this.fireEvent("figure:add", {figure: figure});

            // ...now we can fire the initial move event
            figure.fireEvent("move");

            return this;
        },

        /**
         * @method
         * Deprecated since version 5.0.0
         * @deprecated use draw2d.Canvas.add() instead
         */
        addFigure: function (figure, x, y) {
            return this.add(figure, x, y);
        },


        /**
         * @method
         * Remove a figure or connection from the Canvas. This method fires an event
         * which can be catched.
         *
         * Example:
         *
         *      canvas.on("figure:remove", function(emitter, event){
     *         alert("figure removed:");
     *      });
         *
         *      // or more general if you want catch all figure related events
         *      //
         *      canvas.on("figure", function(emitter, event){
     *         // use event.figure.getCanvas()===null to determine if the
     *         // figure part of the canvas
     *
     *         alert("figure added or removed:");
     *      });
         *
         *
         * @param {draw2d.Figure} figure The figure to remove
         **/
        remove: function (figure) {
            // remove the figure from a selection handler as well and cleanup the
            // selection feedback
            var _this = this;
            this.editPolicy.each(function (i, policy) {
                if (typeof policy.unselect === "function") {
                    policy.unselect(_this, figure);
                }
            });

            if (figure instanceof draw2d.shape.basic.Line) {
                this.lines.remove(figure);
            }
            else {
                this.figures.remove(figure);
            }
            figure.setCanvas(null);

            if (figure instanceof draw2d.Connection) {
                figure.disconnect();
            }

            this.fireEvent("figure:remove", {figure: figure});

            return this;
        },

        /**
         * @method
         * Deprecated since 5.0.0
         * @deprecated use draw2d.Canvas.remove()
         * @param figure
         */
        removeFigure: function (figure) {
            return this.remove(figure);
        },

        /**
         * @method
         * Returns all lines/connections in this workflow/canvas.<br>
         *
         * @protected
         * @return {draw2d.util.ArrayList}
         **/
        getLines: function () {
            return this.lines;
        },

        /**
         * @method
         * Returns the internal figures.<br>
         *
         * @protected
         * @return {draw2d.util.ArrayList}
         **/
        getFigures: function () {
            return this.figures;
        },

        /**
         * @method
         * Returns the line or connection with the given id.
         *
         * @param {String} id The id of the line.
         *
         * @type draw2d.shape.basic.Line
         **/
        getLine: function (id) {
            var count = this.lines.getSize();
            for (var i = 0; i < count; i++) {
                var line = this.lines.get(i);
                if (line.getId() === id) {
                    return line;
                }
            }
            return null;
        },

        /**
         * @method
         * Returns the figure with the given id.
         *
         * @param {String} id The id of the figure.
         * @return {draw2d.Figure}
         **/
        getFigure: function (id) {
            var figure = null;
            this.figures.each(function (i, e) {
                if (e.id === id) {
                    figure = e;
                    return false;
                }
            });
            return figure;
        },

        /**
         * @method
         * Return all intersections draw2d.geo.Point between the given line and all other
         * lines in the canvas.
         *
         * @param {draw2d.shape.basic.Line} line the line for the intersection test
         * @return {draw2d.util.ArrayList}
         */
        getIntersection: function (line) {
            var result = new draw2d.util.ArrayList();

            this.lineIntersections.each(function (i, entry) {
                if (entry.line === line) {
                    entry.intersection.each(function (i, p) {
                        result.add({x: p.x, y: p.y, justTouching: p.justTouching, other: entry.other});
                    });
                }
            });

            return result;
        },


        /**
         * @method
         *  Adjust the coordinate with the installed SnapToHelper.
         *
         * @param  {draw2d.Figure} figure The related figure
         * @param  {draw2d.geo.Point} pos The position to adjust
         *
         * @return {draw2d.geo.Point} the adjusted position
         * @private
         **/
        snapToHelper: function (figure, pos) {
            var _this = this;
            this.editPolicy.each(function (i, policy) {
                pos = policy.snap(_this, figure, pos);
            });

            return pos;
        },


        /**
         * @method
         * Register a port to the canvas. This is required for other ports to find a valid drop target.
         *
         * @param {draw2d.Port} port The new port which has been added to the Canvas.
         **/
        registerPort: function (port) {
            // All elements have the same drop targets.
            //
            if (!this.commonPorts.contains(port)) {
                this.commonPorts.add(port);
            }

            return this;
        },

        /**
         * @method
         * Remove a port from the internal cnavas registration. Now other ports can't find the
         * port anymore as drop target. The port itself is still visible.
         *
         * @param {draw2d.Port} p The port to unregister as potential drop target
         * @private
         **/
        unregisterPort: function (port) {
            this.commonPorts.remove(port);

            return this;
        },

        /**
         * @method
         * Return all ports in the canvas
         *
         */
        getAllPorts: function () {
            return this.commonPorts;
        },

        /**
         * @method
         * Returns the command stack for the Canvas. Required for undo/redo support.
         *
         * @return {draw2d.command.CommandStack}
         **/
        getCommandStack: function () {
            return this.commandStack;
        },

        /**
         * @method
         * Returns the current selected figure in the Canvas.
         *
         * @return {draw2d.Figure}
         * @deprecated
         **/
        getCurrentSelection: function () {
            return this.selection.getPrimary();
        },

        /**
         * @method
         * Returns the current selection.
         *
         * @return {draw2d.Selection}
         **/
        getSelection: function () {
            return this.selection;
        },

        /**
         * @method
         * Set the current selected figure or figures in the canvas.<br>
         * <br>
         * You can hand over a draw2d.util.ArrayList since version 4.8.0 for multiple selection.
         *
         * @param {draw2d.Figure| draw2d.util.ArrayList} object The figure or list of figures to select.
         **/
        setCurrentSelection: function (object) {
            var _this = this;

            // multiple selection
            if (object instanceof draw2d.util.ArrayList) {
                this.selection.each(function (i, e) {
                    _this.editPolicy.each(function (i, policy) {
                        if (typeof policy.unselect === "function") {
                            policy.unselect(_this, e);
                        }
                    });
                });
                this.addSelection(object);
            }
            // single selection
            else {
                var figure = object;
                this.selection.getAll().each(function (i, e) {
                    _this.editPolicy.each(function (i, policy) {
                        if (typeof policy.unselect === "function") {
                            policy.unselect(_this, e);
                        }
                    });
                });

                this.editPolicy.each(function (i, policy) {
                    if (typeof policy.select === "function") {
                        policy.select(_this, figure);
                    }
                });
            }


            return this;
        },

        /**
         * @method
         * Add the current figure to the selection. If a single selection policy is installed in the
         * canvas the selection before is reseted and the figure is the one and only selection.
         *
         * @param {draw2d.Figure| draw2d.util.ArrayList} object The figure(s) to add to the selection
         * @since 4.6.0
         **/
        addSelection: function (object) {
            var _this = this;

            var add = function (i, figure) {
                _this.editPolicy.each(function (i, policy) {
                    if (typeof policy.select === "function") {
                        policy.select(_this, figure);
                    }
                });
            };

            if (object instanceof draw2d.util.ArrayList) {
                object.each(add);
            }
            else {
                add(0, object);
            }

            return this;

        },


        /**
         * @method
         * Register a listener to the Canvas. The listener must provide a function "onSelectionChanged".
         *
         *      // since version 5.0.0 use this method to register an listener
         *      //
         *      canvas.on("select", function(canvas, selectedFigureOrNull){
      *          alert("object selected/unselected");
      *      });
         *
         * @param {Object/Function} w an object which implements the 'onSelectionChanged' method or a callback function
         * @deprecated use draw2d.Canvas.on() instead
         **/
        addSelectionListener: function (w) {
            if (w !== null) {
                if (typeof w === "function") {
                    this.on("select", w);
                }
                else if (typeof w.onSelectionChanged === "function") {
                    this.on("select", $.proxy(w.onSelectionChanged, w));
                }
                else {
                    throw "Object doesn't implement required callback method [onSelectionChanged]";
                }
            }

            return this;
        },

        /**
         * @method
         * unregister the listener from the canvas.
         *
         * @param {Object/Function} w The object which will be removed from the selection eventing
         * @deprecated use draw2d.Canvas.off() instead
         **/
        removeSelectionListener: function (/*:Object*/ w) {
            this.off("select", w);

            return this;
        },


        /**
         * @method
         * Returns the best figure at the location [x,y]. It is a simple hit test. Keep in mind that only visible objects
         * are returned.
         *
         * @param {Number} x The x position.
         * @param {Number} y The y position.
         * @param {draw2d.Figure|Array} [figureToIgnore] The figures which should be ignored.
         **/
        getBestFigure: function (x, y, figureToIgnore) {
            if (!$.isArray(figureToIgnore)) {
                if (figureToIgnore instanceof draw2d.Figure) {
                    figureToIgnore = [figureToIgnore];
                }
                else {
                    figureToIgnore = [];
                }
            }

            var result = null;
            var testFigure = null;
            var i = 0;
            var children = null;

            // ResizeHandles first
            for (i = 0, len = this.resizeHandles.getSize(); i < len; i++) {
                testFigure = this.resizeHandles.get(i);
                if (testFigure.isVisible() === true && testFigure.hitTest(x, y) === true && $.inArray(testFigure, figureToIgnore) === -1) {
                    return testFigure;
                }
            }

            // Checking ports
            for (i = 0, len = this.commonPorts.getSize(); i < len; i++) {
                testFigure = this.commonPorts.get(i);
                if ($.inArray(testFigure, figureToIgnore) === -1) {
                    if (testFigure.isVisible() === true && testFigure.hitTest(x, y) === true) {
                        return testFigure;
                    }
                }
            }

            // tool method to check recursive a figure for hitTest
            //
            var checkRecursive = function (children) {
                children.each(function (i, e) {
                    var c = e.figure;
                    checkRecursive(c.children);
                    if (result === null && c.isVisible() === true && c.hitTest(x, y) === true && $.inArray(c, figureToIgnore) === -1) {
                        result = c;
                    }
                    return result === null; // break the each-loop if we found an element
                });
            };

            //  Check now the common objects.
            //  run reverse to aware the z-oder of the figures
            for (i = (this.figures.getSize() - 1); i >= 0; i--) {
                var figure = this.figures.get(i);
                // check first a children of the figure
                //
                checkRecursive(figure.children);

                // ...and the figure itself
                //
                if (result === null && figure.isVisible() === true && figure.hitTest(x, y) === true && $.inArray(figure, figureToIgnore) === -1) {
                    result = figure;
                }

                if (result !== null) {
                    return result;
                }
            }

            // Check the children of the lines as well
            // Not selectable/draggable. But should receive onClick/onDoubleClick events
            // as well.
            var count = this.lines.getSize();
            for (i = 0; i < count; i++) {
                var line = this.lines.get(i);
                // check first a children of the figure
                //
                checkRecursive(line.children);

                if (result !== null) {
                    return result;
                }
            }

            // A line is the last option in the priority queue for a "Best" figure
            //
            result = this.getBestLine(x, y, figureToIgnore);
            if (result !== null) {
                return result;
            }

            return result;
        },


        /**
         * @method
         * Return the line which match the hands over coordinate
         *
         * @param {Number} x the x-coordinate for the hit test
         * @param {Number} y the x-coordinate for the hit test
         * @param {draw2d.shape.basic.Line} [lineToIgnore] a possible line which should be ignored for the hit test
         *
         * @private
         * @return {draw2d.shape.basic.Line}
         **/
        getBestLine: function (x, y, lineToIgnore) {
            if (!$.isArray(lineToIgnore)) {
                if (lineToIgnore instanceof draw2d.Figure) {
                    lineToIgnore = [lineToIgnore];
                }
                else {
                    lineToIgnore = [];
                }
            }
            var count = this.lines.getSize();

            for (var i = 0; i < count; i++) {
                var line = this.lines.get(i);
                if (line.isVisible() === true && line.hitTest(x, y) === true && $.inArray(line, lineToIgnore) === -1) {
                    return line;
                }
            }
            return null;
        },


        /**
         * @private
         **/
        hideSnapToHelperLines: function () {
            this.hideSnapToHelperLineHorizontal();
            this.hideSnapToHelperLineVertical();
        },

        /**
         * @private
         **/
        hideSnapToHelperLineHorizontal: function () {
        },

        /**
         * @private
         **/
        hideSnapToHelperLineVertical: function () {

        },


        /**
         * @method
         * Called by the framework during drag&drop operations.<br>
         * Droppable can be setup with:
         * <pre>
         *     $(".draw2d_droppable").draggable({
     *          appendTo:"#container",
     *          stack:"#container",
     *          zIndex: 27000,
     *          helper:"clone",
     *          start: function(e, ui){$(ui.helper).addClass("shadow");}
     *     });
         * </pre>
         * Graphiti use the jQuery draggable/droppable lib. Please inspect
         * http://jqueryui.com/demos/droppable/ for further information.
         *
         * @param {HTMLElement} draggedDomNode The DOM element which is currently dragging
         *
         * @template
         **/
        onDragEnter: function (draggedDomNode) {
        },


        /**
         * @method
         * Called if the DragDrop object is moving around.<br>
         * <br>
         * Graphiti use the jQuery draggable/droppable lib. Please inspect
         * http://jqueryui.com/demos/droppable/ for further information.
         *
         * @param {HTMLElement} draggedDomNode The dragged DOM element.
         * @param {Number} x the x coordinate of the drag
         * @param {Number} y the y coordinate of the drag
         *
         * @template
         **/
        onDrag: function (draggedDomNode, x, y) {
        },


        /**
         * @method
         * Called if the DragDrop object leaving the current hover figure.<br>
         * <br>
         * Graphiti use the jQuery draggable/droppable lib. Please inspect
         * http://jqueryui.com/demos/droppable/ for further information.
         *
         * @param {HTMLElement} draggedDomNode The figure which is currently dragging
         *
         * @template
         **/
        onDragLeave: function (draggedDomNode) {
        },


        /**
         * @method
         * Called if the user drop the droppedDomNode onto the canvas.<br>
         * <br>
         * Draw2D use the jQuery draggable/droppable lib. Please inspect
         * http://jqueryui.com/demos/droppable/ for further information.
         *
         * @param {HTMLElement} droppedDomNode The dropped DOM element.
         * @param {Number} x the x-coordinate of the mouse up event
         * @param {Number} y the y-coordinate of the mouse up event
         * @param {Boolean} shiftKey true if the shift key has been pressed during this event
         * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
         *
         * @template
         **/
        onDrop: function (droppedDomNode, x, y, shiftKey, ctrlKey) {
        },


        /**
         * @method
         * Callback method for the double click event. The x/y coordinates are relative to the top left
         * corner of the canvas.
         *
         * @private
         **/
        onDoubleClick: function (x, y, shiftKey, ctrlKey) {
            this.fireEvent("dblclick", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey});

            // check if a line has been hit
            //
            var figure = this.getBestFigure(x, y);

            if (figure !== null) {
                figure.fireEvent("dblclick", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey});
                figure.onDoubleClick();
            }

            // forward the event to all install policies as well.
            // (since 4.0.0)
            this.editPolicy.each(function (i, policy) {
                policy.onDoubleClick(figure, x, y, shiftKey, ctrlKey);
            });
        },

        /**
         *
         * @param {Number} x the x coordinate of the event
         * @param {Number} y the y coordinate of the event
         * @param {Boolean} shiftKey true if the shift key has been pressed during this event
         * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
         * @private
         **/
        onClick: function (x, y, shiftKey, ctrlKey) {
            this.fireEvent("click", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey});

            // check if a figure has been hit
            //
            var figure = this.getBestFigure(x, y);

            // or a line/connection. May we should test the line before a figure..?
            // (since 4.0.0)
            if (figure === null) {
                figure = this.getBestLine(x, y);
            }

            if (figure !== null) {
                figure.fireEvent("click", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey}); // since 5.0.0
                figure.onClick();          // backward compatiblity
            }

            // forward the event to all install policies as well.
            // (since 3.0.0)
            this.editPolicy.each(function (i, policy) {
                policy.onClick(figure, x, y, shiftKey, ctrlKey);
            });

        },

        /**
         * @method
         * The user has triggered a right click. Redirect them to a responsible figure.
         *
         * @param {Number} x The x-coordinate of the click
         * @param {Number} y The y-coordinate of the click
         * @param {Boolean} shiftKey true if the shift key has been pressed during this event
         * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
         *
         * @private
         * @since 1.1.0
         **/
        onRightMouseDown: function (x, y, shiftKey, ctrlKey) {
            this.fireEvent("contextmenu", {x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey});

            var figure = this.getBestFigure(x, y);
            if (figure !== null) {
                figure.fireEvent("contextmenu", {x: x, y: y});
                figure.onContextMenu(x, y);

                // forward the event to all installed policies of the figure
                // soft migration from onHookXYZ to Policies.
                // since 4.4.0
                figure.editPolicy.each(function (i, policy) {
                    policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey);
                });
            }

            // forward the event to all install policies as well.
            // (since 4.4.0)
            this.editPolicy.each(function (i, policy) {
                policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey);
            });

        },

        // NEW EVENT HANDLING SINCE VERSION 5.0.0
        /**
         * @method
         * Execute all handlers and behaviors attached to the canvas for the given event type.
         *
         *
         * @param {String} event the event to trigger
         * @param {Object} [args] optional parameters for the triggered event callback
         *
         * @since 5.0.0
         */
        fireEvent: function (event, args) {
            if (typeof this.eventSubscriptions[event] === 'undefined') {
                return;
            }

            var subscribers = this.eventSubscriptions[event];
            for (var i = 0; i < subscribers.length; i++) {
                try {
                    subscribers[i](this, args);
                }
                catch (exc) {
                    console.log(exc);
                    console.log(subscribers[i]);
                }
            }
        },

        /**
         * @method
         * Attach an event handler function for one or more events to the canvas.
         * To remove events bound with .on(), see {@link #off}.
         *
         * possible events are:<br>
         * <ul>
         *   <li>reset</li>
         *   <li>select</li>
         * </ul>
         *
         * Example:
         *
         *      canvas.on("clear", function(emitter){
     *         alert("canvas.clear() called.");
     *      });
         *
         *      canvas.on("select", function(emitter,figure){
     *          if(figure!==null){
     *              alert("figure selected");
     *          }
     *          else{
     *              alert("selection cleared");
     *          }
     *      });
         *
         * @param {String}   event One or more space-separated event types
         * @param {Function} callback A function to execute when the event is triggered.
         * @param {draw2d.Canvas} callback.emitter the emitter of the event
         * @param {Object} [callback.obj] optional event related data
         *
         * @since 5.0.0
         */
        on: function (event, callback) {
            var events = event.split(" ");
            for (var i = 0; i < events.length; i++) {
                if (typeof this.eventSubscriptions[events[i]] === 'undefined') {
                    this.eventSubscriptions[events[i]] = [];
                }
                this.eventSubscriptions[events[i]].push(callback);
            }
            return this;
        },

        /**
         * @method
         * The .off() method removes event handlers that were attached with {@link #on}.<br>
         * Calling .off() with no arguments removes all handlers attached to the canvas.<br>
         * <br>
         * If a simple event name such as "reset" is provided, all events of that type are removed from the canvas.
         *
         *
         * @param {String|Function} eventOrFunction the event name of the registerd function
         * @since 5.0.0
         */
        off: function (eventOrFunction) {
            if (typeof eventOrFunction === "undefined") {
                this.eventSubscriptions = {};
            }
            else if (typeof eventOrFunction === 'string') {
                this.eventSubscriptions[eventOrFunction] = [];
            }
            else {
                for (var event in this.eventSubscriptions) {
                    this.eventSubscriptions[event] = $.grep(this.eventSubscriptions[event], function (callback) {
                        return callback !== eventOrFunction;
                    });
                }
            }

            return this;
        }
    });

/**
 * @class draw2d.Selection
 *
 * Represents the current selection in the canvas. The selection element is a pure passive element which
 * manage/store the selection.
 *
 *
 * @author Andreas Herz
 */
draw2d.Selection = Class.extend({

    NAME: "draw2d.Selection",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     */
    init: function () {
        this.primary = null;
        this.all = new draw2d.util.ArrayList();
    },

    /**
     * Reset the current selection
     *
     */
    clear: function () {
        this.primary = null;
        this.all = new draw2d.util.ArrayList();
    },

    /**
     * @method
     * Return the primary selection. This can only one figure at once.
     *
     * @return {draw2d.Figure} the primary selected figure
     */
    getPrimary: function () {
        return this.primary;
    },

    /**
     * @method
     * Set the primary selection.
     *
     * @param {draw2d.Figure} figure The new primary selection
     */
    setPrimary: function (figure) {
        this.primary = figure;
        this.add(figure);
    },

    /**
     * @method
     * Remove the given figure from the selection (primary,all)
     *
     * @param {draw2d.Figure} figure
     */
    remove: function (figure) {
        this.all.remove(figure);
        if (this.primary === figure) {
            this.primary = null;
        }
    },

    /**
     * @method
     * Add a figure to the selection. No events are fired or update the selection handle. This method just
     * add the figure to the internal management data structure.
     *
     * @param figure
     * @private
     */
    add: function (figure) {
        if (figure !== null && !this.all.contains(figure)) {
            this.all.add(figure);
        }
    },


    /**
     * @method
     * return true if the given figure part of the selection
     *
     * @param {draw2d.Figure} figure The figure to check
     * @since 2.2.0
     */
    contains: function (figure) {
        return this.all.contains(figure);
    },

    /**
     * @method
     * Return the size of the selection
     *
     * @since 4.8.0
     */
    getSize: function () {
        return this.all.getSize();
    },

    /**
     * @method
     * Return the complete selection - including the primary selection.
     *
     */
    getAll: function () {
        return this.all.clone();
    },

    /**
     * @method
     * @param func
     */
    each: function (func) {
        this.all.each(func);
    }
});
/**
 * @class draw2d.Figure
 * A lightweight graphical object. Figures are rendered to a {@link draw2d.Canvas} object.
 *
 * @inheritable
 * @author Andreas Herz
 */
draw2d.Figure = Class.extend({

    NAME: "draw2d.Figure",

    MIN_TIMER_INTERVAL: 50, // minimum timer interval in milliseconds

    // special attributes that should be get/set via method calls

    /**
     * @constructor
     * Creates a new figure element which is not assigned to any canvas.
     *
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        this.setterWhitelist = $.extend({
            /** @attr {Number} x the x offset of the figure in relation to the parent figure or canvas */
            x: this.setX,
            /** @attr {Number} y the y offset of the figure in relation to the parent figure or canvas */
            y: this.setY,
            /** @attr {Number} width the new width of the figure. Considering the minWidth of the shape */
            width: this.setWidth,
            /** @attr {Number} height the new height of the figure. Considering the minHeight of the shape */
            height: this.setHeight,
            /** @attr {Number} minWidth the new min width of the figure. */
            minWidth: this.setMinWidth,
            /** @attr {Number} minHeight the new min height of the figure. */
            minHeight: this.setMinHeight,
            /** @attr {String} cssClass the css class of the shape. can be used to style the shape via CSS3 (SVG only) */
            cssClass: this.setCssClass,
            /** @attr {Object} userData additional custom data which can be stored by the shape */
            userData: this.setUserData,
            /** @attr {Boolean} resizeable drives the resizeable behaviour of the shape */
            resizeable: this.setResizeable,
            /** @attr {Number} angle the rotation angle of the shape. At the moment only 90 degree increments are possible */
            angle: this.setRotationAngle,
            /** @attr {Number} alpha the the alpha/opacity of the shape. value must be between [0..1] */
            alpha: this.setAlpha,
            /** @attr {Number} opacity the the alpha/opacity of the shape. value must be between [0..1] */
            opacity: this.setAlpha,
            /** @attr {Boolean} glow the glow flag for the shape. The representation of the "glow" depends on the shape */
            glow: this.setGlow,
            /** @attr {Boolean} visible set the visibility flag of the shape */
            visible: this.setVisible,
            /** @attr {Boolean} keepAspectRatio indicate if the shape should keep the aspect ratio during resize */
            keepAspectRatio: this.setKeepAspectRatio

        }, setter);

        this.getterWhitelist = $.extend({
            visible: this.isVisible,
            angle: this.getRotationAngle,
            x: this.getX,
            y: this.getY,
            width: this.getWidth,
            height: this.getHeight,
            resizeable: this.isResizeable,
            alpha: this.getAlpha,
            opacity: this.getAlpha
        }, getter);

        // all figures has an unique id. Required for figure get and persistence storage
        this.id = draw2d.util.UUID.create();

        // required for the SelectionEditPolicy to indicate the type of figure
        // which the user clicks
        this.isResizeHandle = false;

        // for undo/redo operation. It holds the command during a drag/drop operation
        // and execute it on the CommandStack if the user drop the figure.
        this.command = null;

        // the assigned canvas
        this.canvas = null;

        // the RaphaelJS element reference
        this.shape = null;

        // possible decorations ( e.g. a Label) of the Connection
        // children are fixed bounded the figure. Most of the events of the child will bee
        // routed to the parent
        this.children = new draw2d.util.ArrayList();

        // behavior flags
        //
        this.selectable = true;
        this.deleteable = true;
        this.resizeable = true;
        this.draggable = true;
        this.visible = true;
        // since 4.1.0.
        this.keepAspectRatio = false;


        this.canSnapToHelper = true;
        this.snapToGridAnchor = new draw2d.geo.Point(0, 0);    // hot spot for snap to grid
        this.editPolicy = new draw2d.util.ArrayList();

        // timer for animation or automatic update
        //
        this.timerId = -1;
        this.timerInterval = 0;

        // possible parent of the figure.
        // @see: this.children
        this.parent = null;

        // a figure can be part of a StrongComposite like a group, ...
        //
        this.composite = null;

        // generic handle for the JSON read/write of user defined data
        this.userData = null;

        // appearance, position and dim properties
        //
        this.x = 0;
        this.y = 0;
        this.minHeight = 5;
        this.minWidth = 5;
        this.rotationAngle = 0;
        // add the name of the class to the css attribute
        this.cssClass = this.NAME.replace(new RegExp("[.]", "g"), "_");

        this.width = this.getMinWidth();
        this.height = this.getMinHeight();

        this.alpha = 1.0;

        // internal status flags for the Drag&Drop operation handling and other stuff
        //
        this.isInDragDrop = false;
        this.ox = 0;
        this.oy = 0;
        this.repaintBlocked = false;
        this.lastAppliedAttributes = {};
        this.selectionHandles = new draw2d.util.ArrayList();

        // eventhandling since version 5.0.0
        this.eventSubscriptions = {};

        // install default selection handler. Can be overridden or replaced
        this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());

        // the new style attr call with object attributes
        this.attr(attr);
    },

    /**
     * @method
     * Read or set shape attributes.<br>
     * When no value is given, reads specified attribute from the element.<br>
     * When value is given, sets the attribute to that value.
     * Multiple attributes can be set by passing an object with name-value pairs.
     *
     *     var figure = new draw2d.shape.basic.Rectangle();
     *     figure.attr('x');      //=> read value
     *     figure.attr('x', 30);  //=> set value
     *
     *     // multiple attributes:
     *     figure.attr({
     *       x: 30,
     *       y: 40,
     *       width : 200,
     *       height: 50,
     *       cssClass: "red_border_figure"
     *     });
     *
     * Additional you can set the user defined values (userData) with this method
     * using the dot-notation. User defined values are always part of the exported
     * JSON data.
     *
     *     // setting multiple attributes:
     *     figure.attr({
     *       userData.my.property.x: 30,
     *       userData.my.property.y: 40
     *     });
     *
     * Also set using array notation is possible for the userData:
     *
     *     // dot notation and array brackets:
     *     figure.attr({
     *       userData.my.names[0]: "John",
     *       userData.my.names[1]: "Doe"
     *     });
     *
     *
     * The Object returned should be the equivalent structured object:
     *
     *     var obj = figure.getUserData();
     *
     * That is, where obj is equivalent to:
     *
     *     var obj = {
     *         my:{
     *             property:{
     *                 x: 30,
     *                 y: 40
     *            },
     *            names:  ["John", "Doe"]
     *        }
     *    };
     *
     *
     * @param {String/Object} name
     * @param {Object} [value]
     * @since 5.0.1
     * @experimental
     * @returns
     **/
    attr: function (name, value) {
        this.repaintBlocked = true;
        try {
            // call of attr as setter method with {name1:val1, name2:val2 }  argument list
            //
            if ($.isPlainObject(name)) {
                for (key in name) {
                    // user can set the "userData" with path notation. In this case we
                    // expand the path to a real JSON object and set the data.
                    // index/brackets are allowed too.
                    //
                    if (key.substring(0, 9) === "userData.") {
                        draw2d.util.JSON.set({userData: this.userData}, key, name[key]);
                    }
                    else {
                        var func = this.setterWhitelist[key];
                        if (func) {
                            func.call(this, name[key]);
                        }
                    }
                }
            }
            else if (typeof name === "string") {
                // call attr as getter
                //
                if (typeof value === "undefined") {
                    var getter = this.getterWhitelist[name];
                    if ($.isFunction(getter)) {
                        return getter.call(this);
                    }
                    // or it is a userData path notation like "userData.any.path.value"
                    else if (name.substring(0, 9) === "userData.") {
                        var data = {userData: this.userData};
                        return draw2d.util.JSON.get(data, name);
                    }
                    return; // undefined
                }
                // call attr as simple setter with (key , value)
                //

                // the value can be a function. In this case we must call the value().
                if ($.isFunction(value)) {
                    value = value();
                }
                if (name.substring(0, 9) === "userData.") {
                    draw2d.util.JSON.set({userData: this.userData}, name, value);
                }
                else {
                    var setter = this.setterWhitelist[name];
                    if (setter) {
                        setter.call(this, value);
                    }
                }
            }
            // generic getter of all registered attributes
            else if (typeof name === "undefined") {
                var result = {};
                for (key in this.getterWhitelist) {
                    result[key] = this.getterWhitelist[key].call(this);
                }
                return result;
            }
        }
        finally {
            this.repaintBlocked = false;
        }
        this.repaint();

        return this;
    },

    /**
     * Return a copy of the object, filtered to only have values for the whitelisted keys.
     * @deprecated
     */
    pick: function (obj, var_keys) {
        var keys = typeof arguments[1] !== 'string' ? arguments[1] : Array.prototype.slice.call(arguments, 1);
        var out = {}, key;
        for (key in keys) {
            if (typeof obj[key] !== "undefined")
                out[key] = obj[key];
        }
        return out;
    },

    /**
     * @method
     * Add the figure to the current selection and propagate this to all edit policies.
     *
     * @param {boolean} [isPrimarySelection] true if the element should be the primary selection
     * @private
     */
    select: function (asPrimarySelection) {
        if (typeof asPrimarySelection === "undefined") {
            asPrimarySelection = true;
        }

        // apply all EditPolicy for select Operations
        //
        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                e.onSelect(_this.canvas, _this, asPrimarySelection);
            }
        });

        if (this.canvas !== null) {
            this.canvas.getSelection().add(this);
        }

        return this;
    },

    /**
     * @method
     * Unselect the figure and propagete this event to all edit policies.
     *
     * @private
     **/
    unselect: function () {
        var _this = this;
        // apply all EditPolicy for select Operations
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                e.onUnselect(_this.canvas, _this);
            }
        });

        if (this.canvas !== null) {
            this.canvas.getSelection().remove(this);
        }

        return this;
    },

    /**
     * @method
     * Allows a user to attach (or remove) data to an element, without needing to create a custom figure or shape.
     * The data must be a valid JSON object.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        userData: object
     *      });
     *
     * @since 2.7.2
     * @param {Object} object
     */
    setUserData: function (object) {
        this.userData = object;
        this.fireEvent("change:userData");
        return this;
    },

    /**
     * @method
     * Returns any user data set previously on the given figure by setUserData.
     *
     * @since 2.7.2
     * @returns {Object}
     */
    getUserData: function () {
        return this.userData;
    },

    /**
     * @method
     * Return the UUID of this element.
     *
     * @return {String}
     */
    getId: function () {
        return this.id;
    },


    /**
     * @method
     * Set the id of this element.
     *
     *     // Alternatively you can use the attr method:
     *     figure.attr({
     *       id: newId
     *     });
     *
     * @param {String} newId the new id for this figure
     */
    setId: function (newId) {
        this.id = newId;

        return this;
    },


    /**
     * @method
     * Return the css styling class name of the element.
     *
     *
     * @return {String}
     */
    getCssClass: function () {
        return this.cssClass;
    },

    /**
     * @method
     * Set the css class of the node.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        "cssClass": "red_border_figure"
     *      });
     *
     * @param {String} cssClass the new css class name of the node
     * @since 2.9.0
     */
    setCssClass: function (cssClass) {
        this.cssClass = cssClass === null ? null : $.trim(cssClass);

        if (this.shape === null) {
            return this;
        }

        if (this.cssClass === null) {
            this.shape.node.removeAttribute("class");
        }
        else {
            this.shape.node.setAttribute("class", this.cssClass);
        }
        this.fireEvent("change:userData");

        return this;
    },

    /**
     * @method
     * The method will return true if the class is assigned to the element, even if other classes also are.
     *
     * @param {String} className the class name to check
     * @since 2.9.0
     */
    hasCssClass: function (className) {
        if (this.cssClass === null) {
            return false;
        }

        return new RegExp(' ' + $.trim(className) + ' ').test(' ' + this.cssClass + ' ');
    },

    /**
     * @method
     * Add a CSS class to the figure.<br>
     * It's important to note that this method does not replace a class. It simply adds the class,
     * appending it to any which may already be assigned to the elements.
     *
     * @param {String} className
     * @since 2.9.0
     */
    addCssClass: function (className) {
        className = $.trim(className);
        if (!this.hasCssClass(className)) {
            if (this.cssClass === null) {
                this.setCssClass(className);
            }
            else {
                this.setCssClass(this.cssClass + ' ' + className);
            }
            this.fireEvent("change:cssClass");
        }

        return this;
    },

    /**
     * @method
     *
     * Remove the given css class name from the figure
     *
     * @param {String} className the css class name to add
     */
    removeCssClass: function (className) {
        className = $.trim(className);
        var newClass = ' ' + this.cssClass.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasCssClass(className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            this.setCssClass(newClass.replace(/^\s+|\s+$/g, ''));
            this.fireEvent("change:cssClass");
        }

        return this;
    },

    /**
     * @method
     *
     * Add or remove the given css class name from the figure
     *
     * @param {String} className the class name to toggle
     */
    toggleCssClass: function (className) {
        className = $.trim(className);
        var newClass = ' ' + this.cssClass.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasCssClass(className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            this.setCssClass(newClass.replace(/^\s+|\s+$/g, ''));
        } else {
            this.setCssClass(this.cssClass + ' ' + className);
        }
        this.fireEvent("change:cssClass");

        return this;
    },

    /**
     * @method
     * Set the canvas element of this figures. This can be used to determine whenever an element
     * is added or removed to the canvas.
     *
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function (canvas) {
        // remove the shape if we reset the canvas and the element
        // was already drawn
        if (canvas === null && this.shape !== null) {
            this.unselect();
            this.shape.remove();
            this.shape = null;
        }

        this.canvas = canvas;

        if (this.canvas !== null) {
            this.getShapeElement();
        }

        if (canvas === null) {
            this.stopTimer();
        }
        else {
            if (this.timerInterval >= this.MIN_TIMER_INTERVAL) {
                this.startTimer(this.timerInterval);
            }
        }

        this.children.each(function (i, e) {
            e.figure.setCanvas(canvas);
        });

        return this;
    },

    /**
     * @method
     * Return the current assigned canvas container.
     *
     * @return {draw2d.Canvas}
     */
    getCanvas: function () {
        return this.canvas;
    },


    /**
     * @method
     * Start a timer which calls the onTimer method in the given interval.
     *
     * @param {Number} milliSeconds
     */
    startTimer: function (milliSeconds) {
        this.stopTimer();
        this.timerInterval = Math.max(this.MIN_TIMER_INTERVAL, milliSeconds);

        if (this.canvas !== null) {
            this.timerId = window.setInterval($.proxy(function () {
                this.onTimer();
                this.fireEvent("timer");
            }, this), this.timerInterval);
        }

        return this;
    },

    /**
     * @method
     * Stop the internal timer.
     *
     */
    stopTimer: function () {
        if (this.timerId >= 0) {
            window.clearInterval(this.timerId);
            this.timerId = -1;
        }

        return this;
    },

    /**
     * @method
     * Callback method for the internal timer handling<br>
     * Inherit classes must override this method if they want use the timer feature.
     *
     *      // Alternatively you can register for this event with
     *      figure.on("timer", function(emitterFigure){
      *          alert("timer fired");
      *      });
     *
     * @template
     */
    onTimer: function () {
    },

    /**
     * @method
     * Moves the element so it is the closest to the viewer?��s eyes, on top of other elements. Additional
     * the internal model changed as well.
     *
     * Optional: Inserts current object in front of the given one.
     *
     * @param {draw2d.Figure} [figure] move current object in front of the given one.
     * @since 3.0.0
     */
    toFront: function (figure) {
        // ensure that the z-oder is still correct if the figure is assigned
        // to a StrongComposite
        //
        if (this.composite instanceof draw2d.shape.composite.StrongComposite && (typeof figure !== "undefined")) {
            var indexFigure = figure.getZOrder();
            var indexComposite = this.composite.getZOrder();
            if (indexFigure < indexComposite) {
                figure = this.composite;
            }
        }

        if (typeof figure === "undefined") {
            this.getShapeElement().toFront();

            if (this.canvas !== null) {
                var figures = this.canvas.getFigures();
                var lines = this.canvas.getLines();
                if (figures.remove(this) !== null) {
                    figures.add(this);
                } else if (lines.remove(this) !== null) {
                    lines.add(this);
                }
            }
        }
        else {
            this.getShapeElement().insertAfter(figure.getTopLevelShapeElement());

            if (this.canvas !== null) {
                var figures = this.canvas.getFigures();
                var lines = this.canvas.getLines();
                if (figures.remove(this) !== null) {
                    var index = figures.indexOf(figure);
                    figures.insertElementAt(this, index + 1);
                } else if (lines.remove(this) !== null) {
                    lines.add(this);
                }
            }
        }

        // bring all children figures in front of the parent
        this.children.each(function (i, child) {
            child.figure.toFront(figure);
        });

        return this;
    },

    /**
     * @method
     * Moves the element to the background. Additional
     * the internal model changed as well.
     *
     * @since 4.7.2
     */
    toBack: function (figure) {
        // it is not allowed that a figure is behind an assinged composite
        //
        if (this.composite instanceof draw2d.shape.composite.StrongComposite) {
            this.toFront(this.composite);
            return;
        }

        if (this.canvas !== null) {
            var figures = this.canvas.getFigures();
            var lines = this.canvas.getLines();
            if (figures.remove(this) !== null) {
                figures.insertElementAt(this, 0);
            } else if (lines.remove(this) !== null) {
                lines.insertElementAt(this, 0);
            }
        }

        // bring all children figures in front of the parent
        // run reverse to the collection to care about the z-order of the children)
        this.children.each(function (i, child) {
            child.figure.toBack(figure);
        }, true);

        if (typeof figure !== "undefined") {
            this.getShapeElement().insertBefore(figure.getShapeElement());
        }
        else {
            this.getShapeElement().toBack();
        }

        return this;
    },


    /**
     * @method
     * Install a new edit policy to the figure. Each editpolicy is able to focus on a single editing
     * task or group of related tasks. This also allows editing behavior to be selectively reused across
     * different figure implementations. Also, behavior can change dynamically, such as when the layouts
     * or routing methods change.
     *
     * Example for limited DragDrop behavior can be a draw2d.layout.constraint.RegionConstriantPolicy.
     *
     * @param {draw2d.policy.EditPolicy} policy
     */
    installEditPolicy: function (policy) {
        // it is only possible to install one SelectionFeedbackPolicy at once
        //
        if (policy instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
            var _this = this;
            this.editPolicy.grep(function (p) {
                var stay = !(p instanceof draw2d.policy.figure.SelectionFeedbackPolicy);
                if (!stay) {
                    p.onUninstall(_this);
                }
                return stay;
            });
        }
        policy.onInstall(this);
        this.editPolicy.add(policy);

        return this;
    },

    /**
     * @method
     *
     * UnInstall the edit policy from the figure. Either the instance itself if found
     * or all kind of the given edit policies.
     *
     *
     * @param {draw2d.policy.EditPolicy} policy
     * @since 4.81
     */
    uninstallEditPolicy: function (policy) {
        var removedPolicy = this.editPolicy.remove(policy);

        // we found the policy and we are happy
        //
        if (removedPolicy !== null) {
            removedPolicy.onUninstall(this);
            return;
        }

        // The policy isn'T part of the figure. In this case we "think" the user want
        // deinstall all instances of the policy
        //
        var _this = this;
        this.editPolicy.grep(function (p) {
            if (p.NAME === policy.NAME) {
                p.onUninstall(_this);
                return false;
            }
            return true;
        });
    },

    /**
     * @method
     * Add a child figure to the figure. The hands over figure doesn't support drag&drop
     * operations. It's only a decorator for the connection.<br>
     * Mainly for labels or other decorations
     *
     *
     *     var start = new draw2d.shape.node.Start({x:80, y:150});
     *     start.add(new draw2d.shape.basic.Label({text:"Test Label"}), new draw2d.layout.locator.TopLocator());
     *
     *     canvas.add( start);
     *
     * @param {draw2d.Figure} figure the figure to add as decoration to the connection.
     * @param {draw2d.layout.locator.Locator} locator the locator for the child.
     * @param {Number} [index] optional index where to insert the figure
     **/
    add: function (child, locator, index) {
        if (typeof locator === "undefined" || locator === null) {
            throw "Second parameter 'locator' is requried for method 'Figure#add'";
        }

        // the child is now a slave of the parent
        //
        child.setDraggable(false);
        child.setSelectable(false);
        child.setParent(this);

        if ($.isNumeric(index)) {
            this.children.insertElementAt({figure: child, locator: locator}, index);
        }
        else {
            this.children.add({figure: child, locator: locator});
        }

        if (this.canvas !== null) {
            child.setCanvas(this.canvas);
        }

        this.repaint();

        return this;
    },
    /**
     * @method
     * @deprecated use draw2d.Figure.add()
     */
    addFigure: function (child, locator) {
        return this.add(child, locator);
    },

    /**
     * @method
     * Remove the child figure from this figure and the canvas
     *
     * @param {draw2d.Figure} child the figure to remove.
     *
     * @return {Object} the removed tupple of figure/locator or null if the child isn't found
     * @return {draw2d.Figure} return.figure The removed figure
     * @return {draw2d.shape.layout.Layout} return.locator The used locator of the figure
     *
     * @since 5.0.0
     **/
    remove: function (child) {
        if (typeof child === "undefined" || child === null) {
            debug.warn("The parameter child is required for Figure.remove");
            return null; // silently
        }

        var removed = null;
        this.children.grep(function (e) {
            var stay = e.figure !== child;
            if (!stay) {
                removed = e;
            }
            return stay;
        });

        if (removed !== null) {
            child.setParent(null);
            child.setCanvas(null);

            this.repaint();
            return removed;
        }

        return null;
    },
    /**
     * @method
     * @deprecated use draw2d.Figure.remove()
     */
    removeFigure: function (child) {
        return this.remove(child);
    },


    /**
     * @method
     * Return all children/decorations of this shape which has been added with
     * draw2d.Figure.add
     */
    getChildren: function () {
        return this.children.clone().map(function (e) {
            return e.figure;
        });
    },


    /**
     * @method
     * Remove all children/decorations of this shape
     *
     */
    resetChildren: function () {
        this.children.each(function (i, e) {
            e.figure.setCanvas(null);
        });
        this.children = new draw2d.util.ArrayList();
        this.repaint();

        return this;
    },


    /**
     * @method
     * return the current SVG shape element or create it on demand.
     *
     * @private
     */
    getShapeElement: function () {
        if (this.shape !== null) {
            return this.shape;
        }

        this.shape = this.createShapeElement();

        // add CSS class to enable styling of the element with CSS rules/files
        //
        if (this.cssClass !== null) {
            this.shape.node.setAttribute("class", this.cssClass);
        }

        return this.shape;
    },

    /**
     * @method
     * Get the top level shape element. May the figure has a set of SVG elements. In this case this
     * method must return the top level node.<br>
     * This method is used for the toFron/toBack method to order the nodes in the correct way.
     *
     * @since 5.0.0
     * @private
     */
    getTopLevelShapeElement: function () {
        return this.getShapeElement();
    },


    /**
     * @method
     * Inherited classes must override this method to implement it's own draw functionality.
     *
     * @template
     * @abstract
     */
    createShapeElement: function () {
        throw "Inherited class [" + this.NAME + "] must override the abstract method createShapeElement";
    },


    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     *
     * @param {Object} attributes the style attributes for the SVG shape
     * @private
     **/
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return this;
        }


        if (this.visible === true) {
            this.shape.show();
        }
        else {
            this.shape.hide();
            return this;
        }


        // enrich with common properties
        attributes.opacity = this.alpha;

        // performance improvement
        // Only apply attributes which has changed. This end in a big performance improvement
        // because the raphael shape isn't redraw at all.
        //
        var diff = function (obj1, obj2) {
            var result = {};
            for (key in obj1) {
                if (obj1[key] !== obj2[key]) {
                    result[key] = obj1[key];
                }
            }
            return result;
        };
        attributes = diff(attributes, this.lastAppliedAttributes);
        this.lastAppliedAttributes = attributes;


        this.shape.attr(attributes);

        this.applyTransformation();

        /* moved to setDimension.
         * Locator is only called if the dimension of the figure has been changed
         * Performance
         */
        // Relocate all children of the figure.
        // This means that the Locater can calculate the new Position of the child.
        //
        this.children.each(function (i, e) {
            e.locator.relocate(i, e.figure);
        });

        return this;
    },

    /**
     * @method
     * apply a transformation to the shape like rotation, translate,..
     *
     * @private
     * @template
     */
    applyTransformation: function () {
        return this;
    },

    /**
     * @method
     * Highlight the element or remove the highlighting
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
      *        glow: flag
      *      });
     *
     * @param {Boolean} flag indicates glow/noGlow
     * @template
     */
    setGlow: function (flag) {
        // do nothing in the base class.
        // Subclasses must implement this method.

        return this;
    },


    /**
     * @method
     * Called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean} true if the figure accepts dragging
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {
        this.isInDragDrop = false;

        this.command = this.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));

        if (this.command !== null) {
            this.ox = this.getX();
            this.oy = this.getY();
            this.isInDragDrop = true;

            // notify all installed policies
            //
            var _this = this;
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                    e.onDragStart(_this.canvas, _this, x, y, shiftKey, ctrlKey);
                }
            });

            return true;
        }

        return false;
    },

    /**
     * @method
     * Don't call them manually. This will be done by the framework.<br>
     * Will be called if the object are moved via drag and drop.
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super(dx, dy, dx2, dy2);</code>
     *
     * @private
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        var _this = this;

        // apply all EditPolicy for DragDrop Operations
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                var newPos = e.adjustPosition(_this, _this.ox + dx, _this.oy + dy);
                dx = newPos.x - _this.ox;
                dy = newPos.y - _this.oy;
            }
        });

        var newPos = new draw2d.geo.Point(this.ox + dx, this.oy + dy);

        // Adjust the new location if the object can snap to a helper
        // like grid, geometry, ruler,...
        //
        if (this.getCanSnapToHelper()) {
            newPos = this.getCanvas().snapToHelper(this, newPos);
        }

        this.setPosition(newPos);

        // notify all installed policies
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.onDrag(_this.canvas, _this);
            }
        });

        this.fireEvent("move");
        this.fireEvent("change:x");
        this.fireEvent("change:y");
    },

    /**
     * @method
     * Called by the framework if the figure returns false for the drag operation. In this
     * case we send a "panning" event - mouseDown + mouseMove. This is very useful for
     * UI-Widget like slider, spinner,...
     *
     * @param {Number} dx the x difference between the mouse down operation and now
     * @param {Number} dy the y difference between the mouse down operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @template
     */
    onPanning: function (dx, dy, dx2, dy2) {

    },


    /**
     * @method
     * Will be called after a drag and drop action.<br>
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super();</code>
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @template
     **/
    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        var _this = this;

        // Element ist zwar schon an seine Position, das Command muss aber trotzdem
        // in dem CommandStack gelegt werden damit das Undo funktioniert.
        //
        this.command.setPosition(this.x, this.y);
        this.isInDragDrop = false;

        this.canvas.getCommandStack().execute(this.command);
        this.command = null;

        // notify all installed policies
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.onDragEnd(_this.canvas, _this, x, y, shiftKey, ctrlKey);
            }
        });

        this.fireEvent("move");
        this.fireEvent("change:x");
        this.fireEvent("change:y");
    },

    /**
     * @method
     * Called by the framework during drag&drop operations if the user drag a figure over this figure
     *
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     *
     * @return {draw2d.Figure} the figure which should receive the drop event or null if the element didn't want a drop event
     * @template
     **/
    onDragEnter: function (draggedFigure) {
        var _this = this;
        var delegate = draggedFigure;
        this.getCanvas().getInterceptorPolicies().each(function (i, policy) {
            delegate = policy.delegateDrop(draggedFigure, _this);
            if (delegate !== null) {
                return false; // break the loop
            }
        });

        return delegate;
    },

    /**
     * @method
     * Called if the DragDrop object leaving the current hover figure.
     *
     * @param {draw2d.Figure} figure The figure which is currently dragging
     * @template
     **/
    onDragLeave: function (draggedFigure) {
    },


    /**
     * @method
     * Called if the user drop this element onto the dropTarget. This event is ONLY fired if the
     * shape return "this" in the {@link draw2d.Figure#onDragEnter} method.
     *
     *
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     **/
    onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
    },

    /**
     * @method
     * Called if the user dropped an figure onto this element. This event is ONLY fired if the
     * in the canvas installed {@link draw2d.policy.canvas.ConnectionInterceptorPolicy} allow this.
     *
     *
     * @param {draw2d.Figure} droppedFigure The dropped figure.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since 4.8.0
     **/
    onCatch: function (droppedFigure, x, y, shiftKey, ctrlKey) {
    },


    /**
     * @method
     * Callback method for the mouse enter event. Usefull for mouse hover-effects.
     * Override this method for your own effects. Don't call them manually.
     *
     * @template
     **/
    onMouseEnter: function () {
    },


    /**
     * @method
     * Callback method for the mouse leave event. Useful for mouse hover-effects.
     *
     * @template
     **/
    onMouseLeave: function () {
    },

    /**
     * @method
     * Called when a user dbl clicks on the element
     *
     *      // Alternatively you register for this event with:
     *      figure.on("dblclick", function(emitterFunction){
     *          alert("user dbl click on the figure");
     *      });
     *
     * @template
     */
    onDoubleClick: function () {
    },


    /**
     * @method
     * Called when a user clicks on the element.
     *
     *      // Alternatively you register for this event with:
     *      figure.on("click", function(emitterFunction){
     *          alert("user click on the figure");
     *      });
     *
     * @template
     * @deprecated
     */
    onClick: function () {
    },

    /**
     * @method
     * called by the framework if the figure should show the context menu.<br>
     * The strategy to show the context menu depends on the platform. Either looong press or
     * right click with the mouse.
     *
     *      // Alternatively you register for this event with:
     *      figure.on("contextmenu", function(emitterFunction){
     *          alert("user press the right mouse button for a context menu");
     *      });
     *
     * @param {Number} x the x-coordinate to show the menu
     * @param {Number} y the y-coordinate to show the menu
     * @since 1.1.0
     * @template
     */
    onContextMenu: function (x, y) {
    },

    /**
     * @method
     * Set the alpha blending of this figure.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        "alpha": percent
     *      });
     *
     *      // ...or:
     *      figure.attr({
     *        "opacity": percent
     *      });
     *
     * @param {Number} percent value between [0..1].
     * @template
     **/
    setAlpha: function (percent) {
        percent = Math.min(1, Math.max(0, parseFloat(percent)));
        if (percent === this.alpha) {
            return;
        }

        this.alpha = percent;
        this.repaint();
        this.fireEvent("change:opacity");

        return this;
    },


    /**
     * @method
     * Return the alpha blending of the figure
     *
     * @return {Number} the current alpha blending
     */
    getAlpha: function () {
        return this.alpha;
    },


    /**
     * @method
     * Set the rotation angle in degree [0..356]<br>
     * <b>Only steps of 90 degree is working well</b>
     * <br>
     *      // Alternatively you can use the attr method:
     *      figure.attr({
      *        angle: angle
      *      });
     *
     * @param {Number} angle the rotation angle in degree
     */
    setRotationAngle: function (angle) {
        var _this = this;

        this.rotationAngle = angle;

        // Update the resize handles if the user change the position of the element via an API call.
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("change:angle");
        this.repaint();

        return this;
    },

    /**
     * @method
     * return the rotation angle of the figure in degree of [0..356].
     *
     * <br>
     * <b>NOTE: this method is pre alpha and not for production. Only steps of 90 degree is working well</b>
     * <br>
     * @returns {Number}
     */
    getRotationAngle: function () {
        return this.rotationAngle;
    },


    /**
     * @method
     * Show/hide the element. The element didn't receive any mouse events (click, dblclick) if you hide the
     * figure.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
      *        visible: flag
      *      });
     *
     * @param {Boolean} flag
     * @since 1.1.0
     */
    setVisible: function (flag) {
        flag = !!flag;
        if (flag === this.visible) {
            return;
        }
        this.visible = flag;

        this.repaint();

        if (this.visible) {
            this.fireEvent("show");
        } else {
            this.fireEvent("hide");
        }
        this.fireEvent("change:visibility");

        return this;
    },

    /**
     * @method
     * Return true if the figure visible.
     *
     * @return {Boolean}
     * @since 1.1.0
     */
    isVisible: function () {
        return this.visible && this.shape !== null;
    },

    /**
     * @method
     * Guarantee, that the figure width/height will not be distorted. Applicable before calling setDimension().
     * It is false by default.
     *
     * @since 4.1.0
     * @param {Boolean} flag boolean flag if the figure should respect the aspect ratio
     */
    setKeepAspectRatio: function (flag) {
        this.keepAspectRatio = flag;

        return this;
    },

    /**
     * @method
     * Return the flag if the shape keep the aspect ratio.
     *
     * @since 4.1.0
     */
    getKeepAspectRatio: function () {
        return this.keepAspectRatio;
    },

    /**
     * @method
     * Return the current z-index of the element. Currently this is an expensive method. The index will be calculated
     * all the time. Caching is not implemented at the moment.
     *
     * @return {Number}
     */
    getZOrder: function () {
        if (this.shape === null) {
            return -1;
        }

        var i = 0;
        var child = this.shape.node;
        while ((child = child.previousSibling) !== null) {
            i++;
        }
        return i;
    },

    /**
     * @method
     * Set the flag if this object can snap to grid or geometry.
     * A window of dialog should set this flag to false.
     *
     * @param {Boolean} flag The snap to grid/geometry enable flag.
     *
     **/
    setCanSnapToHelper: function (flag) {
        this.canSnapToHelper = !!flag;

        return this;
    },

    /**
     * @method
     * Returns true if the figure can snap to any helper like a grid, guide, geometrie
     * or something else.
     *
     * @return {boolean}
     **/
    getCanSnapToHelper: function () {
        return this.canSnapToHelper;
    },

    /**
     *
     * @return {draw2d.geo.Point}
     **/
    getSnapToGridAnchor: function () {
        return this.snapToGridAnchor;
    },

    /**
     * @method
     * Set the hot spot for all snapTo### operations.
     * (deprecated? Todo: check references in existing projects)
     *
     * @param {draw2d.geo.Point} point
     **/
    setSnapToGridAnchor: function (point) {
        this.snapToGridAnchor = point;

        return this;
    },

    /**
     * @method
     * Set the width of the figure and consider the minWidth attribute
     *
     * @param {Number} width the new width of the figure
     * @since 5.1.0
     */
    setWidth: function (width) {
        this.setDimension(parseFloat(width), this.getHeight());
        this.fireEvent("change:width");
    },

    /**
     * @method
     * The current width of the figure.
     *
     * @type {Number}
     **/
    getWidth: function () {
        return this.width;
    },

    /**
     * @method
     * Set the heigth of the figure and consider the minWidth attribute
     *
     * @param {Number} width the new width of the figure
     * @since 5.1.0
     */
    setHeight: function (height) {
        this.setDimension(this.getWidth(), parseFloat(height));
        this.fireEvent("change:height");
    },

    /**
     * @method
     * The current height of the figure.
     *
     * @type {Number}
     **/
    getHeight: function () {
        return this.height;
    },


    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinWidth: function () {
        return this.minWidth;
    },

    /**
     * @method
     * Set the minimum width of this figure
     *
     * @param {Number} w
     */
    setMinWidth: function (w) {
        this.minWidth = parseFloat(w);
        this.fireEvent("change:minWidth");

        // fit the width with the new constraint
        this.setWidth(this.getWidth());

        return this;
    },

    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. height of this object.
     */
    getMinHeight: function () {
        return this.minHeight;

        return this;
    },

    /**
     * @method
     * Set the minimum heigth of the figure.
     *
     * @param {Number} h
     */
    setMinHeight: function (h) {
        this.minHeight = parseFloat(h);
        this.fireEvent("change:minHeight");

        // fit the height with the new constraint
        this.setHeight(this.getHeight());

        return this;
    },

    /**
     * @method
     * the the x-offset related to the parent figure or canvas
     *
     * @param {Number} x the new x offset of the figure
     * @since 5.0.8
     */
    setX: function (x) {
        this.setPosition(parseFloat(x), this.y);
        this.fireEvent("change:x");
    },

    /**
     * @method
     * The x-offset related to the parent figure or canvas.
     *
     * @return {Number} the x-offset to the parent figure
     **/
    getX: function () {
        return this.x;
    },

    /**
     * @method
     * the the y-offset related to the parent figure or canvas
     *
     * @param {Number} x the new x offset of the figure
     * @since 5.0.8
     */
    setY: function (y) {
        this.setPosition(this.x, parseFloat(y));
        this.fireEvent("change:y");
    },


    /**
     * @method
     * The y-offset related to the parent figure or canvas.
     *
     * @return {Number} The y-offset to the parent figure.
     **/
    getY: function () {
        return this.y;
    },


    /**
     * @method
     * The x-offset related to the canvas.
     *
     * @return {Number} the x-offset to the canvas
     **/
    getAbsoluteX: function () {
        if (!this.parent) {
            return this.getX();
        }
        return this.getX() + this.parent.getAbsoluteX();
    },


    /**
     * @method
     * The y-offset related to the canvas.
     *
     * @return {Number} The y-offset to the canvas.
     **/
    getAbsoluteY: function () {
        if (!this.parent) {
            return this.getY();
        }
        return this.getY() + this.parent.getAbsoluteY();
    },


    /**
     * @method
     * Returns the absolute y-position of the port.
     *
     * @type {draw2d.geo.Point}
     **/
    getAbsolutePosition: function () {
        return new draw2d.geo.Point(this.getAbsoluteX(), this.getAbsoluteY());
    },

    /**
     * @method
     * Returns the absolute y-position of the port.
     *
     * @return {draw2d.geo.Rectangle}
     **/
    getAbsoluteBounds: function () {
        return new draw2d.geo.Rectangle(this.getAbsoluteX(), this.getAbsoluteY(), this.getWidth(), this.getHeight());
    },


    /**
     * @method
     * Set the position of the object.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
      *        x: x,
      *        y: y
      *      });
     *
     * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure or the x/y coordinate if it is an draw2d.geo.Point
     * @param {Number} [y] The new y coordinate of the figure
     **/
    setPosition: function (x, y) {
        if (x instanceof draw2d.geo.Point) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }

        var oldPos = {x: this.x, y: this.y};

        var _this = this;

        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                var newPos = e.adjustPosition(_this, _this.x, _this.y);
                _this.x = newPos.x;
                _this.y = newPos.y;
            }
        });

        var diffPos = {x: oldPos.x - this.x, y: oldPos.y - this.y};
        this.repaint();

        this.children.each(function (i, e) {
            if (e.locator.translate) {
                // new method since 5.2.0 to support faster rendering of draw2d.shape.layout.Layout shapes
                e.locator.translate(e.figure, diffPos);
            }
            else {
                e.locator.relocate(i, e.figure);
            }
        });

        // Update the resize handles if the user change the position of the
        // element via an API call.
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("move");
        this.fireEvent("change:x");
        this.fireEvent("change:y");

        return this;
    },


    /**
     * @method
     * Get the current position of the figure
     *
     * @return {draw2d.geo.Point}
     * @since 2.0.0
     */
    getPosition: function () {
        return new draw2d.geo.Point(this.getX(), this.getY());
    },

    /**
     * @method
     * Translate the figure with the given x/y offset.
     *
     * @param {Number} dx The x offset to translate
     * @param {Number} dy The y offset to translate
     **/
    translate: function (dx, dy) {
        this.setPosition(this.getX() + dx, this.getY() + dy);

        return this;
    },


    /**
     * @method
     * Set the new width and height of the figure.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *         width:  w,
     *         height: h
     *      });
     *
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     **/
    setDimension: function (w, h) {
        var _this = this;
        w = Math.max(this.getMinWidth(), w);
        h = Math.max(this.getMinHeight(), h);

        if (this.width === w && this.height === h) {
            // required if an inherit figure changed the w/h to a given constraint.
            // In this case the Resize handles must be informed that the shape didn't resized.
            // because the minWidth/minHeight did have a higher prio.
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                    e.moved(_this.canvas, _this);
                }
            });
            return this;
        }


        // apply all EditPolicy to adjust/modify the new dimension
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                var newDim = e.adjustDimension(_this, w, h);
                w = newDim.w;
                h = newDim.h;
            }
        });

        // respect the aspect ratio if required
        //
        if (this.keepAspectRatio === true) {
            if (w >= this.getMinWidth()) {
                // scale the height to the given ratio
                h = this.getHeight() * (w / this.getWidth());
                // and apply the new dimension only if the values are in range of the given constraints
                if (h >= this.getMinHeight()) {
                    this.width = w;
                    this.height = h;
                }
            }
        }
        else {
            this.width = Math.max(this.getMinWidth(), w);
            this.height = Math.max(this.getMinHeight(), h);
        }


        this.repaint();

        this.fireEvent("resize");
        this.fireEvent("change:dimension");

        // Update the resize handles if the user change the position of the element via an API call.
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        return this;
    },


    /**
     * @method
     * Set the bounding box of the figure
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        width: w,
     *        height: h,
     *        x: x,
     *        y: y
     *      });
     *
     * @param {draw2d.geo.Rectangle} rect
     * @since 4.8.0
     */
    setBoundingBox: function (rect) {
        this.repaintBlocked = true;
        this.setPosition(rect.x, rect.y);
        this.repaintBlocked = false;
        this.setDimension(rect.w, rect.h);

        return this;
    },

    /**
     * @method
     * Return the bounding box of the figure in absolute position to the canvas.
     *
     * @return {draw2d.geo.Rectangle}
     **/
    getBoundingBox: function () {
        return new draw2d.geo.Rectangle(this.getAbsoluteX(), this.getAbsoluteY(), this.getWidth(), this.getHeight());
    },

    /**
     * @method
     * Detect whenever the hands over coordinate is inside the figure.
     * The default implementation is a simple bounding box test.
     *
     * @param {Number} iX
     * @param {Number} iY
     * @param {Number} [corona]
     *
     * @returns {Boolean}
     */
    hitTest: function (iX, iY, corona) {
        if (typeof corona === "number") {
            return this.getBoundingBox().scale(corona, corona).hitTest(iX, iY);
        }
        return this.getBoundingBox().hitTest(iX, iY);
    },


    /**
     * @method
     * Switch on/off the drag drop behaviour of this object
     *
     * @param {Boolean} flag The new drag drop indicator
     **/
    setDraggable: function (flag) {
        this.draggable = !!flag;

        return this;
    },

    /**
     * @method
     * Get the Drag drop enable flag
     *
     * @return {boolean} The new drag drop indicator
     **/
    isDraggable: function () {
        // delegate to the composite if given
        if (this.composite !== null) {
            return this.composite.isMemberDraggable(this, this.draggable);
        }

        return this.draggable;
    },


    /**
     * @method
     * Returns the true if the figure can be resized.
     *
     * @return {boolean}
     **/
    isResizeable: function () {
        return this.resizeable;
    },

    /**
     * @method
     * You can change the resizeable behaviour of this object. Hands over [false] and
     * the figure has no resizehandles if you select them with the mouse.<br>
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        resizeable: flag
     *      });
     *
     * @param {boolean} flag The resizeable flag.
     **/
    setResizeable: function (flag) {
        this.resizeable = !!flag;
        this.fireEvent("change:resizeable");

        return this;
    },

    /**
     * @method
     * Indicates whenever the element is selectable by user interaction or API.
     *
     * @return {boolean}
     **/
    isSelectable: function () {
        // delegate to the composite if given
        if (this.composite !== null) {
            return this.composite.isMemberSelectable(this, this.selectable);
        }

        return this.selectable;
    },


    /**
     * @method
     * You can change the selectable behavior of this object. Hands over [false] and
     * the figure has no selection handles if you try to select them with the mouse.<br>
     *
     * @param {boolean} flag The selectable flag.
     **/
    setSelectable: function (flag) {
        this.selectable = !!flag;
        this.fireEvent("change:selectable");

        return this;
    },

    /**
     * @method
     * Return true if the object doesn't care about the aspect ratio.
     * You can change the height and width independent.<br>
     *
     * Replaced with "getKeepAspectRatio"
     * @return {boolean}
     * @deprecated
     */
    isStrechable: function () {
        return !this.getKeepAspectRatio();
    },

    /**
     * @method
     * Return false if you avoid that the user can delete your figure.
     * Sub class can override this method.
     *
     * @return {boolean}
     **/
    isDeleteable: function () {
        return this.deleteable;
    },

    /**
     * @method
     * Set the flag if the shape is deleteable.
     *
     * @param {boolean} flag enable or disable flag for the delete operation
     **/
    setDeleteable: function (flag) {
        this.deleteable = !!flag;
        this.fireEvent("change:deleteable");

        return this;
    },

    /**
     * @method
     * Set the parent of this figure.
     * Don't call them manually.
     *
     * @param {draw2d.Figure} parent The new parent of this figure
     * @private
     **/
    setParent: function (parent) {
        this.parent = parent;

        return this;
    },

    /**
     * @method
     * Get the parent of this figure.
     *
     * @return {draw2d.Figure}
     **/
    getParent: function () {
        return this.parent;
    },

    /**
     * @method
     * Get the top most parent of this figure. This can be an layout figure or parent container
     *
     * @return {draw2d.Figure}
     * @since 5.0.6
     **/
    getRoot: function () {
        var root = this.parent;
        while (root !== null && root.parent !== null) {
            root = root.parent;
        }
        return root;
    },

    /**
     * @method
     * Set the assigned composite of this figure.
     *
     * @param {draw2d.shape.composite.StrongComposite} composite The assigned composite of this figure
     * @private
     * @since 4.8.0
     **/
    setComposite: function (composite) {
        if (composite !== null && !(composite instanceof draw2d.shape.composite.StrongComposite)) {
            throw "'composite must inherit from 'draw2d.shape.composite.StrongComposite'";
        }

        this.composite = composite;

        return this;
    },

    /**
     * @method
     * Get the assigned composite of this figure.
     *
     * @return {draw2d.shape.composite.StrongComposite}
     * @since 4.8.0
     **/
    getComposite: function () {
        return this.composite;
    },

    // NEW EVENT HANDLING SINCE VERSION 5.0.0
    /**
     * @method
     * Execute all handlers and behaviors attached to the figure for the given event type.
     *
     *
     * @param {String} event the event to trigger
     * @param {Object} [args] optional parameters for the triggered event callback
     *
     * @since 5.0.0
     */
    fireEvent: function (event, args) {
        try {
            if (typeof this.eventSubscriptions[event] === 'undefined') {
                return;
            }

            // avoid recursion
            if (this._inEvent === true) {
                return;
            }
            this._inEvent = true;
            var subscribers = this.eventSubscriptions[event];
            for (var i = 0; i < subscribers.length; i++) {
                subscribers[i](this, args);
            }
        }
        finally {
            this._inEvent = false;

            // fire a generic change event if an attribute has changed
            // required for some DataBinding frameworks or for the Backbone.Model compatibility
            // the event "change" with the corresponding attribute name as additional parameter
            if (event.substring(0, 7) === "change:") {
                this.fireEvent("change", event.substring(7));
            }
        }
    },

    /**
     * @method
     * Attach an event handler function for one or more events to the figure.
     * To remove events bound with .on(), see {@link #off}.
     *
     * possible events are:<br>
     * <ul>
     *   <li>click</li>
     *   <li>dblclick</li>
     *   <li>move</li>
     *   <li>resize</li>
     *   <li>timer</li>
     *   <li>contextmenu</li>
     *   <li>show</li>
     *   <li>hide</li>
     *   <li>change:[attr]</li>
     * </ul>
     *
     * @param {String}   event One or more space-separated event types
     * @param {Function} callback A function to execute when the event is triggered.
     * @param {draw2d.Figure} callback.emitter the emitter of the event
     * @param {Object} [callback.obj] optional event related data
     * @param {Object} [context] optional context of the fucntion callback.
     * @since 5.0.0
     */
    on: function (event, callback, context) {
        var events = event.split(" ");
        // the "context" param is add to be compatible with Backbone.Model.
        // The project "backbone.ModelBinder" used this signature and we want use this
        if (context) {
            callback = $.proxy(callback, context);
            callback.___originalCallback = callback;
        }

        for (var i = 0; i < events.length; i++) {
            if (typeof this.eventSubscriptions[events[i]] === 'undefined') {
                this.eventSubscriptions[events[i]] = [];
            }
            this.eventSubscriptions[events[i]].push(callback);
        }
        return this;
    },

    /**
     * @method
     * The .off() method removes event handlers that were attached with {@link #on}.<br>
     * Calling .off() with no arguments removes all handlers attached to the elements.<br>
     * <br>
     * If a simple event name such as "move" is provided, all events of that type are removed from the figure.
     *
     *
     * @param {String|Function} eventOrFunction the event name of the registerd function or the function itself
     * @since 5.0.0
     */
    off: function (eventOrFunction) {
        if (typeof eventOrFunction === "undefined") {
            this.eventSubscriptions = {};
        }
        else if (typeof eventOrFunction === 'string') {
            this.eventSubscriptions[eventOrFunction] = [];
        }
        else {
            for (var event in this.eventSubscriptions) {
                this.eventSubscriptions[event] = $.grep(this.eventSubscriptions[event], function (callback) {
                    if (typeof callback.___originalCallback !== "undefined") {
                        return callback.___originalCallback !== eventOrFunction;
                    }
                    return callback !== eventOrFunction;
                });
            }
        }

        return this;
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
     *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     * @return {draw2d.command.Command} null or a Command
     * @private
     **/
    createCommand: function (request) {
        if (request === null) {
            return null;
        }

        if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
            if (!this.isDraggable()) {
                return null;
            }
            return new draw2d.command.CommandMove(this);
        }

        if (request.getPolicy() === draw2d.command.CommandType.DELETE) {
            if (!this.isDeleteable()) {
                return null;
            }
            return new draw2d.command.CommandDelete(this);
        }

        if (request.getPolicy() === draw2d.command.CommandType.RESIZE) {
            if (!this.isResizeable()) {
                return null;
            }
            return new draw2d.command.CommandResize(this);
        }

        return null;
    },

    /**
     * @method
     * Clone the figure. <br>
     * You must override and implement the methods <b>getPersistentAttributes</b> and <b>setPersistentAttributes</b> for your custom
     * figures if the have special attributes.
     *
     * @since 4.1.0
     * @experimental
     */
    clone: function () {
        var clone = eval("new " + this.NAME + "();");
        var initialId = clone.id;

        clone.setPersistentAttributes(this.getPersistentAttributes());

        clone.id = initialId;

        // add all decorations to the memento
        //
        clone.resetChildren();
        this.children.each(function (i, entry) {
            var child = entry.figure.clone();
            var locator = eval("new " + entry.locator.NAME + "();");
            clone.add(child, locator);
        });

        return clone;
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @return
     */
    getPersistentAttributes: function () {
        // force deep copy of userData to avoid side effects in the clone method.
        //
        var memento = {
            type: this.NAME,
            id: this.id,
            x: this.getX(),
            y: this.getY(),
            width: this.width,
            height: this.height,
            alpha: this.alpha,
            userData: $.extend(true, {}, this.userData)
        };


        if (this.cssClass !== null) {
            memento.cssClass = this.cssClass;
        }

        if (this.composite !== null) {
            memento.composite = this.composite.getId();
        }

        if (typeof memento.alpha !== "undefined") {
            this.setAlpha(parseFloat(memento.alpha));
        }

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     */
    setPersistentAttributes: function (memento) {
        this.id = memento.id;
        this.x = parseFloat(memento.x);
        this.y = parseFloat(memento.y);

        // width and height are optional parameter for the JSON stuff.
        // We use the defaults if the attributes not present
        if (typeof memento.width !== "undefined") {
            this.width = parseFloat(memento.width);
        }

        if (typeof memento.height !== "undefined") {
            this.height = parseFloat(memento.height);
        }

        if (typeof memento.userData !== "undefined") {
            this.userData = memento.userData;
        }

        if (typeof memento.cssClass !== "undefined") {
            this.setCssClass(memento.cssClass);
        }

        if (typeof memento.alpha !== "undefined") {
            this.setAlpha(parseFloat(memento.alpha));
        }
        return this;
    }

});

/**
 * @class draw2d.shape.node.Node
 *
 * A Node is the base class for all figures which can have {@link draw2d.Port}s. A {@link draw2d.Port} is the
 * anchor for a {@link draw2d.Connection} line.<br><br>A {@link draw2d.Port} is a green dot which can
 * be dragged and dropped over another port.<br>
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.Figure
 */
draw2d.shape.node.Node = draw2d.Figure.extend({

    NAME: "draw2d.shape.node.Node",

    /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.inputPorts = new draw2d.util.ArrayList();
        this.outputPorts = new draw2d.util.ArrayList();
        this.hybridPorts = new draw2d.util.ArrayList();

        // flag which indicates if the figure should read/write ports to
        // JSON
        this.persistPorts = true;

        // Flags just for performance reasons
        //
        this.portRelayoutRequired = true;

        // just for performance reasons
        //
        this.cachedPorts = null;

        this._super(
            $.extend({width: 50, height: 50}, attr),
            $.extend({
                /** @attr {Number} radius the radius to render the line edges */
                persistPorts: this.setPersistPorts
            }, setter),
            $.extend({
                persistPorts: this.getPersistPorts
            }, getter));
    },


    /**
     * @method
     * Indicates if the node should read/write the ports via the draw2d.Figure.getPersistenAttributes
     * to the JSON object
     *
     * @param {Boolean} flag
     * @since 5.0.4
     */
    setPersistPorts: function (flag) {
        this.persistPorts = flag;
        this.fireEvent("change:persistPorts");

        return this;
    },

    /**
     * @method
     * Indicates if the figure writes the ports to the JSON structore too.
     * Default is "false"
     *
     * @returns {Boolean}
     */
    getPersistPorts: function () {
        return this.persistPorts;
    },

    /**
     * @inheritdoc
     */
    onDoubleClick: function () {
        this.canvas.getCommandStack().execute(new draw2d.command.CommandRotate(this, (this.getRotationAngle() + 90) % 360));
    },

    /**
     * @inheritdoc
     */
    toFront: function (figure) {
        this._super(figure);

        var _this = this;
        this.getPorts().each(function (i, port) {
            port.getConnections().each(function (i, connection) {
                connection.toFront(figure);
            });
            // a port should always be in front of the shape dosn't matter what the
            // "figure" parameter says.
            //
            port.toFront(_this);
        });

        return this;
    },

    /**
     * @inheritdoc
     */
    toBack: function (figure) {

        this.getPorts().each(function (i, port) {
            port.getConnections().each(function (i, connection) {
                connection.toBack(figure);
            });
            port.toBack(figure);
        });

        this._super(figure);

        return this;
    },

    /**
     * @inheritdoc
     */
    setVisible: function (flag) {
        // adjust the visibility of the ports to the parent state
        //
        if (!flag) {
            this.getPorts().each(function (i, port) {
                port.__initialVisibilityState = port.isVisible();
                port.setVisible(false);
            });
        }
        else {
            this.getPorts().each(function (i, port) {
                if (typeof port.__initialVisibilityState !== "undefined") {
                    port.setVisible(port.__initialVisibilityState);
                }
                else {
                    port.setVisible(true);
                }
                delete port.__initialVisibilityState;
            });
        }
        this._super(flag);
    },


    /**
     * @method
     * Return all ports of the node.
     *
     * @return  {draw2d.util.ArrayList}
     **/
    getPorts: function () {
        // TODO: expensive! Find another solution.
        if (this.cachedPorts === null) {
            this.cachedPorts = new draw2d.util.ArrayList();
            this.cachedPorts.addAll(this.inputPorts);
            this.cachedPorts.addAll(this.outputPorts);
            this.cachedPorts.addAll(this.hybridPorts);

            var _this = this;
            this.children.each(function (i, e) {
                _this.cachedPorts.addAll(e.figure.getPorts());
            });
        }

        return this.cachedPorts;
    },


    /**
     * @method
     * Return all input ports of the node.
     *
     * @return {draw2d.util.ArrayList}
     **/
    getInputPorts: function () {
        return this.inputPorts
            .clone()
            .addAll(this.hybridPorts);
    },

    /**
     * @method
     * Return all output ports of the node.
     *
     * @return {draw2d.util.ArrayList}
     **/
    getOutputPorts: function () {
        return this.outputPorts
            .clone()
            .addAll(this.hybridPorts);
    },


    /**
     * @inheritdoc
     */
    clone: function () {
        var clone = this._super();

        // remove all ports of the clone. the "init" method can have create some. but this must
        // removed because we want a clone of an existing figure
        //
        clone.resetPorts();
        var ports = this.getPorts();

        ports.each(function (i, port) {
            var clonePort = port.clone();
            var locator = port.getLocator().clone();
            clone.addPort(clonePort, locator);
        });

        return clone;
    },

    /**
     * @method
     * Return the port with the corresponding name.
     *
     *
     * @param {String} portName The name of the port to return.
     * @return {draw2d.Port} Returns the port with the hands over name or null.
     **/
    getPort: function (portName) {
        var port = null;

        this.getPorts().each(function (i, e) {

            if (e.getName() === portName) {
                port = e;
                return false;
            }
        });

        return port;
    },

    /**
     * @method
     * Return the input port with the corresponding name.
     *
     *
     * @param {String/Number} portNameOrIndex The name or numeric index of the port to return.
     * @return {draw2d.InputPort} Returns the port with the hands over name or null.
     **/
    getInputPort: function (portNameOrIndex) {
        if (typeof portNameOrIndex === "number") {
            return this.inputPorts.get(portNameOrIndex);
        }

        for (var i = 0; i < this.inputPorts.getSize(); i++) {
            var port = this.inputPorts.get(i);
            if (port.getName() === portNameOrIndex) {
                return port;
            }
        }

        return null;
    },

    /**
     * @method
     * Return the output port with the corresponding name.
     *
     * @param {String/Number} portNameOrIndex The name or the numeric index of the port to return.
     * @return {draw2d.OutputPort} Returns the port with the hands over name or null.
     **/
    getOutputPort: function (portNameOrIndex) {
        if (typeof portNameOrIndex === "number") {
            return this.outputPorts.get(portNameOrIndex);
        }

        for (var i = 0; i < this.outputPorts.getSize(); i++) {
            var port = this.outputPorts.get(i);
            if (port.getName() === portNameOrIndex) {
                return port;
            }
        }

        return null;
    },

    /**
     * @method
     * Return the input port with the corresponding name.
     *
     *
     * @param {String/Number} portNameOrIndex The name or numeric index of the port to return.
     * @return {draw2d.InputPort} Returns the port with the hands over name or null.
     **/
    getHybridPort: function (portNameOrIndex) {
        if (typeof portNameOrIndex === "number") {
            return this.hybridPorts.get(portNameOrIndex);
        }

        for (var i = 0; i < this.hybridPorts.getSize(); i++) {
            var port = this.hybridPorts.get(i);
            if (port.getName() === portNameOrIndex) {
                return port;
            }
        }

        return null;
    },

    /**
     * @method
     * Add a port to this node at the given position.<br>
     *
     * @param {draw2d.Port} port The new port to add.
     * @param {draw2d.layout.locator.Locator} locator The layouter for the port.
     **/
    addPort: function (port, locator) {
        if (!(port instanceof draw2d.Port)) {
            throw "Argument is not typeof 'draw2d.Port'. \nFunction: draw2d.shape.node.Node#addPort";
        }

        // add to the internal cache if already build
        if (this.cachedPorts !== null) {
            this.cachedPorts.add(port);
        }
        this.portRelayoutRequired = true;


        if (port instanceof draw2d.InputPort) {
            this.inputPorts.add(port);
        }
        else if (port instanceof draw2d.OutputPort) {
            this.outputPorts.add(port);
        }
        else if (port instanceof draw2d.HybridPort) {
            this.hybridPorts.add(port);
        }

        if ((typeof locator !== "undefined") && (locator instanceof draw2d.layout.locator.Locator)) {
            port.setLocator(locator);
        }

        port.setParent(this);
        port.setCanvas(this.canvas);

        // You can't delete a port with the [DEL] key if a port is a child of a node
        port.setDeleteable(false);

        if (this.canvas !== null) {
            port.getShapeElement();
            this.canvas.registerPort(port);
        }
    },

    /**
     * @method
     * Remove all ports of this node
     *
     * @since 5.0.0
     */
    resetPorts: function () {
        var _this = this;
        this.getPorts().each(function (i, port) {
            _this.removePort(port);
        });

        return this;
    },


    /**
     * @method
     * Removes a port and all related connections from this node.<br>
     *
     * @param {draw2d.Port} port The port to remove.
     **/
    removePort: function (port) {
        this.portRelayoutRequired = true;

        this.cachedPorts = null;
        this.inputPorts.remove(port);
        this.outputPorts.remove(port);
        this.hybridPorts.remove(port);

        if (port.getCanvas() !== null) {
            port.getCanvas().unregisterPort(port);
            // remove the related connections of the port too.
            var connections = port.getConnections();
            for (var i = 0; i < connections.getSize(); ++i) {
                port.getCanvas().remove(connections.get(i));
            }
        }

        port.setCanvas(null);
    },

    /**
     * @method
     * Create a standard Port for this element. Inherited class can override this
     * method to create its own type of ports.
     *
     * @param {String} type the type of the requested port. possible ["input", "output"]
     * @param {draw2d.layout.locator.Locator} [locator] the layouter to use for this port
     * @template
     */
    createPort: function (type, locator) {
        var newPort = null;
        var count = 0;

        switch (type) {
            case "input":
                newPort = new draw2d.InputPort();
                newPort.setBackgroundColor('#f3546a');
                count = this.inputPorts.getSize();
                break;
            case "output":
                newPort = new draw2d.OutputPort();
                newPort.setBackgroundColor('#b9dd69');
                count = this.outputPorts.getSize();
                break;
            case "hybrid":
                newPort = new draw2d.HybridPort();
                count = this.hybridPorts.getSize();
                break;
            case "extend":
                newPort = new draw2d.OutputPort();
                count = this.outputPorts.getSize();
                break;
            default:
                throw "Unknown type [" + type + "] of port requested";
        }

        newPort.setName(type + count);

        this.addPort(newPort, locator);
        // relayout the ports
        this.setDimension(this.width, this.height);

        this.layoutPorts();

        return newPort;
    },

    /**
     * @method
     * Return all connections related to this node.
     *
     * @returns {draw2d.util.ArrayList}
     */
    getConnections: function () {
        var connections = new draw2d.util.ArrayList();
        var ports = this.getPorts();
        for (var i = 0; i < ports.getSize(); i++) {
            var port = ports.get(i);
            // Do NOT add twice the same connection if it is linking ports from the same node
            for (var c = 0, c_size = port.getConnections().getSize(); c < c_size; c++) {
                if (!connections.contains(port.getConnections().get(c))) {
                    connections.add(port.getConnections().get(c));
                }
            }
        }
        return connections;
    },

    /**
     * @inheritdoc
     */
    setCanvas: function (canvas) {
        var oldCanvas = this.canvas;
        this._super(canvas);

        var ports = this.getPorts();
        if (oldCanvas !== null) {
            ports.each(function (i, port) {
                oldCanvas.unregisterPort(port);
            });
        }

        if (canvas !== null) {
            ports.each(function (i, port) {
                port.setCanvas(canvas);
                canvas.registerPort(port);
            });
            // relayout the ports
            this.setDimension(this.width, this.height);
        }
        else {
            ports.each(function (i, port) {
                port.setCanvas(null);
            });
        }
    },

    /**
     * @inheritdoc
     */
    setRotationAngle: function (angle) {
        this.portRelayoutRequired = true;
        this._super(angle);

        this.layoutPorts();
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
        this.portRelayoutRequired = true;
        this._super(w, h);
    },

    /**
     * @method
     * Called if the value of any port has been changed
     *
     * @param {draw2d.Port} relatedPort
     * @template
     */
    onPortValueChanged: function (relatedPort) {

    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        this._super(attributes);
        this.layoutPorts();
    },

    /**
     * @method
     *
     * @private
     */
    layoutPorts: function () {

        if (this.portRelayoutRequired === false) {
            return;//silently
        }
        this.portRelayoutRequired = false;

        // layout the ports
        //
        this.outputPorts.each(function (i, port) {
            port.locator.relocate(i, port);
        });

        this.inputPorts.each(function (i, port) {
            port.locator.relocate(i, port);
        });

        this.hybridPorts.each(function (i, port) {
            port.locator.relocate(i, port);
        });
    },


    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        // write all ports to the JSON
        //
        if (this.persistPorts === true) {
            memento.ports = [];
            this.getPorts().each(function (i, port) {
                memento.ports.push({
                    name: port.getName(),
                    port: port.NAME,
                    locator: port.getLocator().NAME
                });
            });
        }

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.ports !== "undefined") {
            // we read the ports from the JSON and now we save it to the JSON too.
            this.persistPorts = true;

            // remove all ports created in the init method
            //
            this.resetPorts();

            // and restore all ports of the JSON document instead.
            //
            $.each(memento.ports, $.proxy(function (i, e) {
                var port = eval("new " + e.port + "()");
                var locator = eval("new " + e.locator + "()");

                this.addPort(port, locator);
                port.setName(e.name);
            }, this));
        }
    }

});

/**
 * @class draw2d.VectorFigure
 * The base class for all vector based figures like {@link draw2d.shape.basic.Rectangle}  or {@link draw2d.shape.basic.Oval}
 * inside a canvas.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.node.Node
 */
draw2d.VectorFigure = draw2d.shape.node.Node.extend({
    NAME: "draw2d.VectorFigure",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.stroke = 1;
        this.radius = 0;
        this.bgColor = new draw2d.util.Color("#ffffff");
        this.color = new draw2d.util.Color("#303030");

        // memento for the stroke if we reset the glow effect of this shape
        //
        this.strokeBeforeGlow = this.stroke;
        this.glowIsActive = false;

        this._super(attr,
            $.extend({
                /** @attr {Number} radius the radius to render the line edges */
                radius: this.setRadius,
                /** @attr {String|draw2d.util.Color} bgColor the background color of the shape */
                bgColor: this.setBackgroundColor,
                /** @attr {String|draw2d.util.Color} color the main color of the shape */
                color: this.setColor,
                /** @attr {Number} stroke the stroke width */
                stroke: this.setStroke
            }, setter),
            $.extend({
                radius: this.getRadius,
                bgColor: this.getBackgroundColor,
                color: this.getColor,
                stroke: this.getStroke
            }, getter)
        );
    },

    /**
     * @method
     * Sets the corner radius or the edges.
     *
     * @param {Number} radius
     * @since 4.2.1
     */
    setRadius: function (radius) {
        this.radius = radius;
        this.repaint();
        this.fireEvent("change:radius");

        return this;
    },

    /**
     * @method
     * Get the corner radius of the edges.
     *
     * @return {Number}
     * @since 4.2.1
     */
    getRadius: function () {
        return this.radius;
    },


    /**
     * @method
     * Highlight the element or remove the highlighting
     *
     * @param {Boolean} flag indicates glow/noGlow
     */
    setGlow: function (flag) {

        if (flag === this.glowIsActive) {
            return this;
        }

        this.glowIsActive = flag;
        if (flag === true) {
            this.strokeBeforeGlow = this.getStroke();
            this.setStroke(this.strokeBeforeGlow * 2.5);
        }
        else {
            this.setStroke(this.strokeBeforeGlow);
        }

        return this;
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        attributes.x = this.getAbsoluteX();
        attributes.y = this.getAbsoluteY();

        if (typeof attributes.stroke === "undefined") {
            if (this.color === null || this.stroke === 0) {
                attributes.stroke = "none";
            }
            else {
                attributes.stroke = this.color.hash();
            }
        }

        if (typeof attributes["stroke-width"] === "undefined") {
            attributes["stroke-width"] = this.stroke;
        }

        if (typeof attributes.fill === "undefined") {
            attributes.fill = this.bgColor.hash();
        }

        this._super(attributes);

        return this;
    },


    /**
     * @method
     * Set the new background color of the figure. It is possible to hands over
     * <code>null</code> to set the background transparent.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        "bgColor": "#f0f0f0"
    *      });
     *
     * @param {String|draw2d.util.Color} color The new background color of the figure
     **/
    setBackgroundColor: function (color) {
        this.bgColor = new draw2d.util.Color(color);

        this.repaint();
        this.fireEvent("change:bgColor");

        return this;
    },

    /**
     * @method
     * The current used background color.
     *
     *      // Alternatively you can use the attr method:
     *      var color =figure.attr("bgColor");
     *
     * @return {draw2d.util.Color}
     */
    getBackgroundColor: function () {
        return this.bgColor;
    },

    /**
     * @method
     * Set the stroke to use.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        "stroke": 2
    *      });
     *
     * @param {Number} w The new line width of the figure
     **/
    setStroke: function (w) {
        this.stroke = w;
        this.repaint();
        this.fireEvent("change:stroke");

        return this;
    },

    /**
     * @method
     * The used line width.
     *
     * @type {Number}
     **/
    getStroke: function () {
        return this.stroke;
    },

    /**
     * @method
     * Set the foreground color of the figure.
     * This method fires a <i>document dirty</i> event.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        "color": "#f3f3f3"
    *      });
     *
     * @param {String|draw2d.util.Color} color The new color of the line.
     **/
    setColor: function (color) {
        this.color = new draw2d.util.Color(color);
        this.repaint();
        this.fireEvent("change:color");

        return this;
    },

    /**
     * @method
     * Get the current used foreground color
     *
     *
     * @returns {draw2d.util.Color}
     */
    getColor: function () {
        return this.color;
    },


    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        return $.extend(this._super(), {
            bgColor: this.bgColor.hash(),
            color: this.color.hash(),
            stroke: this.stroke,
            radius: this.radius
        });
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.radius !== "undefined") {
            this.setRadius(memento.radius);
        }

        if (typeof memento.bgColor !== "undefined") {
            this.setBackgroundColor(memento.bgColor);
        }

        if (typeof memento.color !== "undefined") {
            this.setColor(memento.color);
        }

        if (typeof memento.stroke !== "undefined") {
            this.setStroke(parseFloat(memento.stroke));
        }

        return this;
    }


});

/**
 * @class draw2d.shape.basic.Rectangle
 * A Rectangle Figure.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var rect1 =  new draw2d.shape.basic.Rectangle({
 *     	x:10,
 *      y:10
 *     });
 *
 *     var rect2 =  new draw2d.shape.basic.Rectangle({
 *       x: 100,
 *       y: 10,
 *       bgColor: "#f0f000",
 *       alpha  : 0.7,
 *       width: 100,
 *       height: 60,
 *       radius: 10
 *     });
 *
 *     canvas.add(rect1);
 *     canvas.add(rect2);
 *
 *     canvas.setCurrentSelection(rect2);
 *
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Rectangle = draw2d.VectorFigure.extend({
    NAME: "draw2d.shape.basic.Rectangle",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.dasharray = null;


        this._super(
            $.extend({bgColor: "#a0a0a0", color: "#1B1B1B"}, attr),
            $.extend({}, {
                /** @attr {String} dash The dot/dash pattern for the line style. Valid values: ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]*/
                dash: this.setDashArray
            }, setter),
            $.extend({}, {
                dash: this.getDashArray
            }, getter)
        );

        // some performance improvements
        this.lastAppliedRotation = -1;
    },

    /**
     * @inheritdoc
     **/
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = $.extend({}, {
            width: this.getWidth(),
            height: this.getHeight(),
            r: this.getRadius()
        }, attributes);

        if (this.dasharray !== null) {
            attributes["stroke-dasharray"] = this.dasharray;
        }

        this._super(attributes);

        return this;
    },

    /**
     * @inheritdoc
     */
    applyTransformation: function () {
        this.shape.transform("R" + this.rotationAngle);

        if (this.getRotationAngle() === 90 || this.getRotationAngle() === 270) {
            var ratio = this.getHeight() / this.getWidth();
            var rs = "...S" + ratio + "," + 1 / ratio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2);
            this.shape.transform(rs);
        }

        return this;
    },

    /**
     * @inheritdoc
     */
    createShapeElement: function () {
        return this.canvas.paper.rect(this.getAbsoluteX(), this.getAbsoluteY(), this.getWidth(), this.getHeight());
    },


    /**
     * @method
     * Set the line style for dot/dash styling. Possible values are
     * ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
     *        dash: pattern
     *      });
     *
     * @param {String} pattern the string with the dot/dash pattern. valid values: ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
     */
    setDashArray: function (pattern) {
        this.dasharray = pattern;
        this.repaint();
        this.fireEvent("change:dashArray");

        return this;
    },

    /**
     * @method
     * Get the line style for this object.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr("dash");
     *
     * @since 5.1.0
     */
    getDashArray: function (dashPattern) {
        return this.dasharray;
    },

    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        if (this.dasharray !== null) {
            memento.dasharray = this.dasharray;
        }

        return memento;
    },


    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.dasharray === "string") {
            this.dasharray = memento.dasharray;
        }

        return this;
    }

});

/**
 * @class draw2d.SetFigure
 *
 * A SetFigure is a composition of different SVG elements.
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.SetFigure = draw2d.shape.basic.Rectangle.extend({

    NAME: "draw2d.SetFigure",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        // collection of SVG DOM nodes
        this.svgNodes = null;

        this.originalWidth = null;
        this.originalHeight = null;

        this.scaleX = 1;
        this.scaleY = 1;

        this.strokeScale = true; // scale the stroke width of the children nodes if the parent resize

        this._super($.extend({stroke: 0, bgColor: null}, attr), setter, getter);
    },

    /**
     * @method
     * Set/Reset the canvas for the element.
     *
     * @param {draw2d.Canvas} canvas the canvas to use
     */
    setCanvas: function (canvas) {
        // remove the shape if we reset the canvas and the element
        // was already drawn
        if (canvas === null && this.svgNodes !== null) {
            this.svgNodes.remove();
            this.svgNodes = null;
        }

        this._super(canvas);
    },


    /**
     * @method
     * Set the css class if the node.
     *
     * @param {String} cssClass the new css class name of the node
     * @since 2.9.0
     */
    setCssClass: function (cssClass) {
        this._super(cssClass);

        if (this.svgNodes === null) {
            return this;
        }

        if (this.cssClass === null) {
            this.svgNodes.forEach(function (e) {
                e.node.removeAttribute("class");
            });
        }
        else {
            this.svgNodes.forEach(function (e) {
                e.node.setAttribute("class", cssClass);
            });
        }

        return this;
    },


    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element and
     * repaint them.
     *
     **/
    repaint: function (attributes) {

        // repaint can be blocked during deserialization and if the shape
        // not part of any canvas.
        //
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        if (this.originalWidth !== null) {
            this.scaleX = this.width / this.originalWidth;
            this.scaleY = this.height / this.originalHeight;
        }

        attributes = attributes || {};

        this.applyAlpha();

        this._super(attributes);
    },

    /**
     * @inheritdoc
     */
    setVisible: function (flag) {
        this._super(flag);

        if (this.svgNodes !== null) {
            if (this.visible === true) {
                this.svgNodes.show();
            }
            else {
                this.svgNodes.hide();
            }
        }
    },

    /**
     * @method
     * Apply the opacity to all child set elements. Override this if you want to avoid opacity changes.
     * @private
     *
     */
    applyAlpha: function () {
        this.svgNodes.attr({opacity: this.alpha});
    },

    /**
     * @private
     */
    applyTransformation: function () {
        var s =
            "S" + this.scaleX + "," + this.scaleY + ",0,0 " +
            "R" + this.rotationAngle + "," + ((this.getWidth() / 2) | 0) + "," + ((this.getHeight() / 2) | 0) +
            "T" + this.getAbsoluteX() + "," + this.getAbsoluteY() +
            "";
        this.svgNodes.transform(s);
        if (this.rotationAngle === 90 || this.rotationAngle === 270) {
            var before = this.svgNodes.getBBox(true);
            var ratio = before.height / before.width;
            var reverseRatio = before.width / before.height;
            var rs = "...S" + ratio + "," + reverseRatio + "," + (this.getAbsoluteX() + this.getWidth() / 2) + "," + (this.getAbsoluteY() + this.getHeight() / 2);
            this.svgNodes.transform(rs);
        }
    },

    /**
     * @method
     * Moves the element so it is the closest to the viewer?��s eyes, on top of other elements. Additional
     * the internal model changed as well.
     *
     * Optional: Inserts current object in front of the given one.
     *
     * @param {draw2d.Figure} [figure] move current object in front of the given one.
     * @since 3.0.0
     */
    toFront: function (figure) {
        ////////////////////////////////////////////////////////////////////
        // NOTE: the code has a complete different order of draw2d.Figure.
        //       we must respect the svgNodes here
        ////////////////////////////////////////////////////////////////////

        // ensure that the z-oder is still correct if the figure is assigned
        // to a StrongComposite
        //
        if (this.composite instanceof draw2d.shape.composite.StrongComposite && (typeof figure !== "undefined")) {
            var indexFigure = figure.getZOrder();
            var indexComposite = this.composite.getZOrder();
            if (indexFigure < indexComposite) {
                figure = this.composite;
            }
        }

        if (typeof figure === "undefined") {
            this.getShapeElement().toFront();

            if (this.canvas !== null) {
                var figures = this.canvas.getFigures();
                var lines = this.canvas.getLines();
                if (figures.remove(this) !== null) {
                    figures.add(this);
                } else if (lines.remove(this) !== null) {
                    lines.add(this);
                }
            }
        }
        else {
            this.getShapeElement().insertAfter(figure.getTopLevelShapeElement());

            if (this.canvas !== null) {
                var figures = this.canvas.getFigures();
                var lines = this.canvas.getLines();
                if (figures.remove(this) !== null) {
                    var index = figures.indexOf(figure);
                    figures.insertElementAt(this, index + 1);
                } else if (lines.remove(this) !== null) {
                    lines.add(this);
                }
            }
        }


        // Bring the SVG shapes in front
        //
        if (this.svgNodes !== null) {
            if (typeof figure !== "undefined") {
                this.svgNodes.insertAfter(figure.getTopLevelShapeElement());
            }
            else {
                this.svgNodes.toFront();
            }
        }

        // bring all children figures in front of the parent
        //
        this.children.each(function (i, child) {
            child.figure.toFront(figure);
        });

        // and last but not least - the ports are always on top
        //
        var _this = this;
        this.getPorts().each(function (i, port) {
            port.getConnections().each(function (i, connection) {
                connection.toFront(figure);
            });
            // a port should always be in front of the shape doesn't matter what the
            // "figure" parameter says.
            //
            port.toFront(_this);
        });


        return this;
    },

    /**
     * @method
     * Moves the element to the background. Additional
     * the internal model changed as well.
     *
     * Optional: Inserts current object in front of the given one.
     *
     * @param {draw2d.Figure} [figure] move current object in front of the given one.
     * @since 4.7.2
     */
    toBack: function (figure) {

        // it is not allowed that a figure is behind the assigned composite
        //
        if (this.composite instanceof draw2d.shape.composite.StrongComposite) {
            this.toFront(this.composite);
            return;
        }

        // sort the JSON Doc
        //
        if (this.canvas !== null) {
            var figures = this.canvas.getFigures();
            var lines = this.canvas.getLines();
            if (figures.remove(this) !== null) {
                figures.insertElementAt(this, 0);
            } else if (lines.remove(this) !== null) {
                lines.insertElementAt(this, 0);
            }
        }

        // bring all children figures in front of the parent
        // run reverse to the collection to care about the z-order of the children)
        this.children.each(function (i, child) {
            child.figure.toBack(figure);
        }, true);

        if (this.svgNodes !== null) {
            if (typeof figure !== "undefined") {
                this.svgNodes.insertBefore(figure.getShapeElement());
            }
            else {
                this.svgNodes.toBack();
            }
        }


        if (typeof figure !== "undefined") {
            this.getShapeElement().insertBefore(figure.getShapeElement());
        }
        else {
            this.getShapeElement().toBack();
        }

        // and last but not least - the ports are always on top
        //
        var _this = this;
        this.getPorts().each(function (i, port) {
            port.getConnections().each(function (i, connection) {
                connection.toFront(_this);
            });
            // a port should always be in front of the shape doesn't matter what the
            // "figure" parameter says.
            //
            port.toFront(_this);
        });

        return this;
    },


    /**
     * @inheritdoc
     */
    getTopLevelShapeElement: function () {
        return this.svgNodes;
    },

    /**
     * @private
     */
    createShapeElement: function () {
        // NOTE: don't change the order of the two calls. This defines the z-oder in the canvas.
        // The "set" must always be on top.
        var shape = this.canvas.paper.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        this.svgNodes = this.createSet();

        // check if the element is a "set" or a simple raphael shape. otherwise we wrap them into a set
        //
        if (typeof this.svgNodes.forEach === "undefined") {
            var set = this.canvas.paper.set();
            set.push(this.svgNodes);
            this.svgNodes = set;
        }

        this.svgNodes.attr({"stroke-scale": this.strokeScale});

        // update the visibility of the children
        this.setVisible(this.visible);

        // propagate the CSS style to all set elements
        this.setCssClass(this.cssClass);

        var bb = this.svgNodes.getBBox();
        this.originalWidth = bb.width;
        this.originalHeight = bb.height;

        return shape;
    },

    /**
     * @method
     * Override this method to add your own SVG elements. See {@link draw2d.shape.basic.Label} as example.
     *
     * @template
     */
    createSet: function () {
        return this.canvas.paper.set(); // return empty set as default;
    }

});

/**
 * @class draw2d.SVGFigure
 * Abstract class which can handle plain SVG content. Inherit class must override the method
 * <code>getSVG()</code>.
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.SVGFigure = draw2d.SetFigure.extend({

    NAME: "draw2d.SVGFigure",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr) {
        this._super(attr);
    },

    /**
     * @inheritdoc
     */
    createSet: function () {
        return this.importSVG(this.canvas, this.getSVG());
    },

    /**
     * @private
     */
    importSVG: function (canvas, rawSVG) {

        var set = canvas.paper.set();

        try {
            if (typeof rawSVG === 'undefined') {
                throw 'No data was provided.';
            }

            // Override the dimension from the JSON if the SVG contains any
            //
            var svgDOM = $(rawSVG);

            // set the dimension of the element if the JSON import didn't provide
            // a dimension already
            //
            if (typeof this._dimensionReadFromJSON === "undefined") {
                if (svgDOM.attr("width") && svgDOM.attr("height")) {
                    this.setDimension(parseFloat(svgDOM.attr("width")), parseFloat(svgDOM.attr("height")));
                }
                delete this._dimensionReadFromJSON;
            }

            var findStyle = new RegExp('([a-z0-9\-]+) ?: ?([^ ;]+)[ ;]?', 'gi');

            svgDOM.children().each(function (i, element) {
                //element = $(element);
                var shape = null;
                var style = null;
                var attr = {};
                var node = element.tagName;

                // remove the namespace of the node if existing. This can happen in IE8
                //
                var index = node.indexOf(":");
                if (index != -1)
                    node = node.substr(index + 1);

                // map some element to Raphael specifix attributes or ignore some unknown attributes
                //
                $(element.attributes).each(function () {
                    switch (this.nodeName) {
                        case 'stroke-dasharray':
                            attr[this.nodeName] = '- ';
                            break;
                        case 'style':
                            style = this.nodeValue;
                            break;
                        case 'id':
                        case 'xml:space':
                            // just to ignore
                            break;
                        default:
                            if (this.value) {
                                attr[this.nodeName] = this.value;
                            }
                            else {
                                // @deprecated
                                attr[this.nodeName] = this.nodeValue;
                            }
                            break;
                    }
                });


                if (style !== null) {
                    while (findStyle.exec(style)) {
                        attr[RegExp.$1] = RegExp.$2;
                    }
                }

                // set some good defaults if the element didn't provide a stroke-width but has a "stroke" attribute
                //
                if (typeof attr['stroke-width'] === 'undefined') {
                    attr['stroke-width'] = (typeof attr.stroke === 'undefined' ? 0 : 1.2);
                }

                switch (node) {
                    case 'rect':
                        shape = canvas.paper.rect();
                        break;
                    case 'circle':
                        shape = canvas.paper.circle();
                        break;
                    case 'ellipse':
                        shape = canvas.paper.ellipse();
                        break;
                    case 'path':
                        attr.fill = "none";
                        shape = canvas.paper.path(attr.d);
                        break;
                    case 'line':
                        attr.d = "M " + attr.x1 + " " + attr.y1 + "L" + attr.x2 + " " + attr.y2;
                        attr.fill = "none";
                        shape = canvas.paper.path(attr.d);
                        break;
                    case 'polyline':
                        var path = attr.points;
                        attr.d = "M " + path.replace(" ", " L");
                        shape = canvas.paper.path(attr.d);
                        break;
                    case 'polygon':
                        shape = canvas.paper.polygon(attr.points);
                        break;
                    case 'image':
                        shape = canvas.paper.image();
                        break;
                    case 'tspan':
                    case 'text':
                        if (element.childNodes.length > 0) {
                            var child = element.firstChild;
                            do {
                                switch (child.nodeType) {
                                    case 2://ATTRIBUTE_NODE
                                    case 4://CDATA_SECTION_NODE
                                    case 5://ENTITY_REFERENCE_NODE
                                    case 6://ENTITY_NODE
                                    case 7://PROCESSING_INSTRUCTION_NODE
                                    case 8://COMMENT_NODE
                                    case 9://DOCUMENT_NODE
                                    case 10://DOCUMENT_TYPE_NODE
                                    case 11://DOCUMENT_FRAGMENT_NODE
                                    case 12://NOTATION_NODE
                                        return;
                                    case 3://TEXT_NOD
                                        // redirect to the parent node if we found a simple TEXT without any attributes
                                        child = element;
                                        break;
                                    case 1://ELEMENT_NODE
                                }
                                var subShape = canvas.paper.text(0, 0, $(child).text());
                                var subAttr = {
                                    "x": parseFloat(child.attributes.x.value),
                                    "y": parseFloat(child.attributes.y.value)
                                };
                                subAttr["text-anchor"] = "start";
                                if (typeof child.attributes["text-anchor"] !== "undefined") {
                                    subAttr["text-anchor"] = child.attributes["text-anchor"].value;
                                }
                                else if (typeof attr["text-anchor"] !== "undefined") {
                                    subAttr["text-anchor"] = attr["text-anchor"];
                                }

                                if (typeof child.attributes["font-size"] !== "undefined") {
                                    subAttr["font-size"] = parseInt(child.attributes["font-size"].value);
                                }
                                else if (typeof attr["font-size"] !== "undefined") {
                                    // inherit the font size from the parent node
                                    subAttr["font-size"] = parseInt(attr["font-size"]);
                                }

                                if (typeof child.attributes["font-family"] !== "undefined") {
                                    subAttr["font-family"] = child.attributes["font-family"].value;
                                }
                                else if (typeof attr["font-family"] !== "undefined") {
                                    // inherit the font size from the parent node
                                    subAttr["font-family"] = attr["font-family"];
                                }

                                subAttr["fill"] = "#000000";
                                if (typeof child.attributes["fill"] !== "undefined") {
                                    subAttr["fill"] = child.attributes["fill"].value;
                                }
                                else if (typeof attr["fill"] !== "undefined") {
                                    // inherit the font size from the parent node
                                    subAttr["fill"] = attr["fill"];
                                }

                                subAttr.y = subAttr.y + subShape.getBBox().height / 2;

                                subShape.attr(subAttr);
                                set.push(subShape);
                            } while (child = child.nextSibling);
                        }
                        else {
                            shape = canvas.paper.text(0, 0, $(element).html());
                            if (typeof attr["fill"] === "undefined")
                                attr["fill"] = "#000000";
                            if (typeof attr["text-anchor"] === "undefined")
                                attr["text-anchor"] = "start";
                            if (typeof attr["font-size"] !== "undefined")
                                attr["font-size"] = parseInt(attr["font-size"]);
                            if (typeof attr["font-family"] !== "undefined")
                                attr["font-family"] = parseInt(attr["font-family"]);
                            attr.y = parseFloat(attr.y) + shape.getBBox().height / 2;
                        }
                        break;
                }
                if (shape !== null) {
                    shape.attr(attr);
                    set.push(shape);
                }
            });
        } catch (error) {
            alert('The SVG data you entered was invalid! (' + error + ')');
        }


        return set;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @return
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        // keep a temp flag to indicate the we have read the dimension of the
        // element from the JSON struct. In this case we didn't care about the dimension
        // from the SVG data
        //
        if (typeof memento.width !== "undefined") {
            this._dimensionReadFromJSON = true;
        }
        else if (typeof memento.height !== "undefined") {
            this._dimensionReadFromJSON = true;
        }

        return this;
    }


});

/**
 * @class draw2d.shape.node.Hub
 *
 * A hub is a shape with a special kind of port handling. The hole figure is a hybrid port. You can drag&drop a Port directly on
 * the figure.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *
 *     canvas.add(new draw2d.shape.node.Start({x:50, y:50}));
 *     canvas.add(new draw2d.shape.node.Hub({x:150, y:50}));
 *
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.node.Hub = draw2d.shape.basic.Rectangle.extend({

    NAME: "draw2d.shape.node.Hub",

    DEFAULT_COLOR: new draw2d.util.Color("#4DF0FE"),
    BACKGROUND_COLOR: new draw2d.util.Color("#29AA77"),

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.label = null;

        this._super(
            $.extend({color: this.DEFAULT_COLOR.darker(), bgColor: this.BACKGROUND_COLOR}, attr),
            $.extend({
                // deprecated
                label: this.setLabel,
                /** @attr {String} text the text to display in the center of the hub */
                text: this.setLabel
            }, setter),
            $.extend({
                label: this.getLabel,
                text: this.getLabel
            }, getter));

        var _port = this.port = this.createPort("hybrid", new draw2d.layout.locator.CenterLocator());

        this.CONNECTION_DIR_STRATEGY = [function (conn, relatedPort) {
            return _port.getParent().getBoundingBox().getDirection(relatedPort.getAbsolutePosition());
        },
            function (conn, relatedPort) {
                return _port.getAbsoluteY() > relatedPort.getAbsoluteY() ? 0 : 2;
            },
            function (conn, relatedPort) {
                return _port.getAbsoluteX() > relatedPort.getAbsoluteX() ? 3 : 1;
            }];

        // redirect the glow effect and the hitTest for the port to the parent node
        //
        this.port.setGlow = $.proxy(this.setGlow, this);
        this.port._orig_hitTest = this.port.hitTest;
        this.port.hitTest = $.proxy(this.hitTest, this);


        // provide a special connection anchor for this port. We use the bounding box of the
        // parent as connection border
        //
        this.port.setConnectionAnchor(new draw2d.layout.anchor.ShortesPathConnectionAnchor(this.port));
        this.port.setVisible(false);
        this.port.setVisible = function () {
        };

        this.setConnectionDirStrategy(0);
    },

    /**
     * @method
     * Called by the framework during drag&drop operations if the user drag a figure over this figure
     *
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     *
     * @return {draw2d.Figure} the figure which should receive the drop event or null if the element didn't want a drop event
     **/
    onDragEnter: function (draggedFigure) {
        // redirect the dragEnter handling to the hybrid port
        //
        return this.getHybridPort(0).onDragEnter(draggedFigure);
    },

    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinWidth: function () {
        if (this.label !== null) {
            return Math.max(this.label.getMinWidth(), this._super());
        }
        return this._super();
    },


    /**
     * @inheritdoc
     *
     * @private
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        // set some good defaults if the parent didn't
        if (typeof attributes.fill === "undefined") {
            if (this.bgColor !== null) {
                attributes.fill = "90-" + this.bgColor.hash() + ":5-" + this.bgColor.lighter(0.3).hash() + ":95";
            }
            else {
                attributes.fill = "none";
            }
        }

        this._super(attributes);
    },

    /**
     * @method
     * Set the label for the Hub
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
      *        text: label
      *      });
     *
     *
     * @param {String} label
     * @since 3.0.4
     */
    setLabel: function (label) {
        // Create any Draw2D figure as decoration for the connection
        //
        if (this.label === null) {
            this.label = new draw2d.shape.basic.Label({text: label, color: "#0d0d0d", fontColor: "#0d0d0d", stroke: 0});
            // add the new decoration to the connection with a position locator.
            //
            this.add(this.label, new draw2d.layout.locator.CenterLocator());
        }
        else {
            this.label.setText(label);
        }

    },

    /**
     * @method
     * Set the strategy for the connection direction calculation.<br>
     * <br>
     *
     * <ul>
     * <li>0 - Use the best/shortest direction (UP/RIGHT/DOWN/LEFT) for the connection routing (default)</li>
     * <li>1 - Use UP/DOWN for the connection direction</li>
     * <li>2 - Use LEFT/RIGHT</li>
     * </ul>
     * @param {Number} strategy the connection routing strategy to use
     * @since 2.4.3
     */
    setConnectionDirStrategy: function (strategy) {
        switch (strategy) {
            case 0:
            case 1:
            case 2:
                this.port.getConnectionDirection = this.CONNECTION_DIR_STRATEGY[strategy];
                break;
        }
    },

    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        memento.dirStrategy = this.CONNECTION_DIR_STRATEGY.indexOf(this.port.getConnectionDirection);
        if (this.label !== null) {
            memento.label = this.label.getText();
        }

        return memento;
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.dirStrategy === "number") {
            this.setConnectionDirStrategy(memento.dirStrategy);
        }

        if (typeof memento.label !== "undefined") {
            this.setLabel(memento.label);
        }
    }

});


/**
 * @class draw2d.shape.node.HorizontalBus
 *
 * A horizontal bus shape with a special kind of port handling. The hole figure is a hybrid port.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.node.HorizontalBus({width:300, height:20, text:"Horizontal Bus"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.node.Hub
 */
draw2d.shape.node.HorizontalBus = draw2d.shape.node.Hub.extend({

    NAME: "draw2d.shape.node.HorizontalBus",

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr);

        this.setConnectionDirStrategy(1);

        this.installEditPolicy(new draw2d.policy.figure.HBusSelectionFeedbackPolicy());
    }

});


/**
 * @class draw2d.shape.node.VerticalBus
 *
 * A horizontal bus shape with a special kind of port handling. The hole figure is a hybrid port.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.node.VerticalBus({width:40, height:300, text:"Vertical Bus"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.node.Hub
 */
draw2d.shape.node.VerticalBus = draw2d.shape.node.Hub.extend({

    NAME: "draw2d.shape.node.VerticalBus",

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr);

        this.setConnectionDirStrategy(2);
        this.installEditPolicy(new draw2d.policy.figure.VBusSelectionFeedbackPolicy());
    },


    /**
     * @method
     * set the label for the Hub
     *
     * @param {String} labelString
     * @since 3.0.4
     */
    setLabel: function (labelString) {
        var mustAdjustTheAngel = this.label === null;

        this._super(labelString);

        if (mustAdjustTheAngel === true && this.label !== null) {
            this.label.setRotationAngle(90);
        }
    },

    /**
     * @inheritdoc
     */
    getMinHeight: function () {
        if (this.shape === null && this.label === null) {
            return 0;
        }

        if (this.label !== null) {
            return this.label.getMinWidth();
        }

        return this._super();
    },

    /**
     * @inheritdoc
     */
    getMinWidth: function () {
        if (this.shape === null && this.label === null) {
            return 0;
        }

        if (this.label !== null) {
            return this.label.getMinHeight();
        }

        return this._super();
    }


});


/**
 * @class draw2d.shape.node.Fulcrum
 *
 * A horizontal bus shape with a special kind of port handling. The hole figure is a hybrid port.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     canvas.add( new draw2d.shape.node.Fulcrum(),50,10);
 *     canvas.add( new draw2d.shape.node.Fulcrum(),80,100);
 *     canvas.add( new draw2d.shape.node.Fulcrum(),150,50);
 *
 * @extends draw2d.shape.node.Hub
 */
draw2d.shape.node.Fulcrum = draw2d.shape.node.Hub.extend({

    NAME: "draw2d.shape.node.Fulcrum",

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({width: 40, height: 40}, attr), setter, getter);


        this.port.setConnectionAnchor(new draw2d.layout.anchor.ConnectionAnchor(this.port));
        this.port.setVisible(true);
        this.port.hitTest = this.port._orig_hitTest;

        this.setConnectionDirStrategy(0);
        this.setColor(null);
        this.setRadius(10);
        this.setBackgroundColor(null);
        this.setStroke(0);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        // set some good defaults if the parent didn't
        if (typeof attributes.fill === "undefined") {
            attributes.fill = this.bgColor.hash();
        }

        this._super(attributes);
    }

});


/**
 * @class draw2d.shape.basic.ARc
 * Oval figure.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var arc =  new draw2d.shape.basic.Arc({diameter:150, x:50, y:10, startAngle:0, endAngle:45});
 *
 *     canvas.add(arc);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Arc = draw2d.SetFigure.extend({
    NAME: "draw2d.shape.basic.Arc",

    /**
     *
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.startAngle = 180;
        this.endAngle = 360;

        this._super($.extend({width: 80, height: 50, bgColor: null, color: "#1B1B1B"}, attr), setter, getter);
        this.strokeScale = false; // scale the stroke width of the children nodes if the parent resize
    },


    /**
     * @template
     **/
    createSet: function () {
        this.canvas.paper.setStart();


        var flag = (this.endAngle - this.startAngle) > 180;
        var a1 = (this.startAngle % 360) * Math.PI / 180;
        var a2 = (this.endAngle % 360) * Math.PI / 180;

        var w2 = this.getWidth() / 2;
        var h2 = this.getHeight() / 2;

        this.canvas.paper.path([
            ["M", w2, h2,
                "l", w2 * Math.cos(a1), h2 * Math.sin(a1),
                "A", w2, h2, 0, +flag, 1, w2 + w2 * Math.cos(a2), h2 + h2 * Math.sin(a2),
                "z"]
        ].join("")).attr({"fill": "#fff0f0"});

        return this.canvas.paper.setFinish();

    }

});


/**
 * @class draw2d.shape.basic.Oval
 * Oval figure.
 *
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var oval =  new draw2d.shape.basic.Oval({width:150, height:100, x:50, y:10});
 *
 *     canvas.add(oval);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Oval = draw2d.VectorFigure.extend({
    NAME: "draw2d.shape.basic.Oval",

    /**
     *
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({bgColor: "#C02B1D", color: "#1B1B1B"}, attr), setter, getter);
    },


    /**
     * @template
     **/
    createShapeElement: function () {
        var halfW = this.getWidth() / 2;
        var halfH = this.getHeight() / 2;

        return this.canvas.paper.ellipse(this.getAbsoluteX() + halfW, this.getAbsoluteY() + halfH, halfW, halfH);
    },


    /**
     * @inheritdoc
     *
     * @template
     **/
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};


        // don't override cx/cy if inherited class has set the center already.
        if (typeof attributes.rx === "undefined") {
            attributes.rx = this.width / 2;
            attributes.ry = this.height / 2;
        }

        // don't override cx/cy if inherited class has set the center already.
        if (typeof attributes.cx === "undefined") {
            attributes.cx = this.getAbsoluteX() + attributes.rx;
            attributes.cy = this.getAbsoluteY() + attributes.ry;
        }

        this._super(attributes);
    },

    /*****
     *
     *   intersectEllipseLine
     *
     *   NOTE: Rotation will need to be added to this function
     *
     *****/
    intersectionWithLine: function (a1, a2) {
        var rx = this.getWidth() / 2;
        var ry = this.getHeight() / 2;

        var result = new draw2d.util.ArrayList();

        var origin = new draw2d.geo.Point(a1.x, a1.y);
        var dir = a2.subtract(a1);
        var center = new draw2d.geo.Point(this.getAbsoluteX() + rx, this.getAbsoluteY() + ry);
        var diff = origin.subtract(center);
        var mDir = new draw2d.geo.Point(dir.x / (rx * rx), dir.y / (ry * ry));
        var mDiff = new draw2d.geo.Point(diff.x / (rx * rx), diff.y / (ry * ry));

        var a = dir.dot(mDir);
        var b = dir.dot(mDiff);
        var c = diff.dot(mDiff) - 1.0;
        var d = b * b - a * c;

        if (d < 0) {
            // "Outside"
        } else if (d > 0) {
            var root = Math.sqrt(d);
            var t_a = (-b - root) / a;
            var t_b = (-b + root) / a;

            if ((t_a < 0 || 1 < t_a) && (t_b < 0 || 1 < t_b)) {
                if ((t_a < 0 && t_b < 0) || (t_a > 1 && t_b > 1)) {
                    //"Outside";
                }
                else {
                    //"Inside";
                }
            } else {
                if (0 <= t_a && t_a <= 1)
                    result.add(a1.lerp(a2, t_a));
                if (0 <= t_b && t_b <= 1)
                    result.add(a1.lerp(a2, t_b));
            }
        } else {
            var t = -b / a;
            if (0 <= t && t <= 1) {
                result.add(a1.lerp(a2, t));
            } else {
                //"Outside";
            }
        }

        return result;
    }

});


/**
 * @class draw2d.shape.basic.Circle
 * A circle figure with basic background and stroke API. <br>
 * A circle can not be streched. <strong>The aspect ration is always 1:1</strong>.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var shape =  new draw2d.shape.basic.Circle({x:40,y:10, stroke:3, color:"#3d3d3d", bgColor:"#3dff3d"});
 *
 *     canvas.add(shape);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Oval
 */
draw2d.shape.basic.Circle = draw2d.shape.basic.Oval.extend({

    NAME: "draw2d.shape.basic.Circle",

    /**
     * @constructor
     * Create a new circle figure.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr, $.extend({
            /** @attr {Number} diameter the diameter of the circle */
            diameter: this.setDiameter,
            /** @attr {Number} radius the radius of the circle */
            radius: this.setRadius
        }, setter), $.extend({
            diameter: this.getDiameter,
            radius: this.getRadius
        }, getter));

        this.setKeepAspectRatio(true);
    },

    /**
     * @method
     * Set the diameter of the circle. The center of the circle will be retained.
     *
     * @param {Number} d The new diameter of the circle.
     * @since 4.0.0
     **/
    setDiameter: function (d) {
        var center = this.getCenter();
        this.setDimension(d, d);
        this.setCenter(center);
        this.fireEvent("change:diameter");

        return this;
    },

    /**
     * @method
     * Get the diameter of the circle.
     *
     * @since 4.0.0
     **/
    getDiameter: function () {
        return this.getWidth();
    },


    /**
     * @method
     * Set the radius of the circle. The center of the circle will be retained.
     *
     * @param {Number} d The new radius of the circle.
     * @since 4.0.0
     **/
    setRadius: function (r) {
        this.setDiameter(r * 2);
        this.fireEvent("change:radius");

        return this;
    },


    /**
     * @method
     * Get the center of the circle
     *
     */
    getCenter: function () {
        var d2 = this.getDiameter() / 2;
        return this.getPosition().translate(d2, d2);
    },

    /**
     * @method
     * Set the center of the circle.
     *
     * @param {Number|draw2d.geo.Point} x the new x coordinate of the center or a draw2d.geo.Point object with the center
     * @param {Number} y the y coordinate of the new center of the first argument isn't a draw2d.geo.Point object
     */
    setCenter: function (x, y) {
        var pos = new draw2d.geo.Point(x, y);
        var d2 = this.getDiameter() / 2;
        pos.translate(-d2, -d2);
        this.fireEvent("change:center");
        this.setPosition(pos);

        return this;
    },

    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        var memento = this._super();
        // delete the radius attribute of the parent. Because the "radius" is the corner radius
        // of the shape and not the "radius" of the circle. Design flaw.  :-/
        delete memento.radius;

        return memento;
    }

});

/**
 * @class draw2d.shape.basic.Label
 * Implements a simple text label.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var shape =  new draw2d.shape.basic.Label({text:"This is a simple label", x:40, y:10});
 *
 *     canvas.add(shape);
 *
 * @author Andreas Herz
 *
 * @extends draw2d.SetFigure
 */
draw2d.shape.basic.Label = draw2d.SetFigure.extend({

    NAME: "draw2d.shape.basic.Label",

    FONT_FALLBACK: {
        'Georgia': 'Georgia, serif',
        'Palatino Linotype': '"Palatino Linotype", "Book Antiqua", Palatino, serif',
        'Times New Roman': '"Times New Roman", Times, serif',
        'Arial': 'Arial, Helvetica, sans-serif',
        'Arial Black': '"Arial Black", Gadget, sans-serif',
        'Comic Sans MS': '"Comic Sans MS", cursive, sans-serif',
        'Impact': 'Impact, Charcoal, sans-serif',
        'Lucida Sans Unicode': '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
        'Tahoma, Geneva': 'Tahoma, Geneva, sans-seri',
        'Trebuchet MS': '"Trebuchet MS", Helvetica, sans-serif',
        'Verdana': 'Verdana, Geneva, sans-serif',
        'Courier New': '"Courier New", Courier, monospace',
        'Lucida Console': '"Lucida Console", Monaco, monospace'
    },


    /**
     * @constructor
     * Creates a new text element.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        this.text = "";
        // for performance reasons
        //
        this.cachedWidth = null;
        this.cachedHeight = null;
        this.cachedMinWidth = null;
        this.cachedMinHeight = null;

        // appearance of the shape
        //
        this.fontSize = 12;
        this.fontColor = new draw2d.util.Color("#080808");
        this.fontFamily = null;
        this.padding = {top: 4, right: 4, bottom: 4, left: 4};

        this.outlineStroke = 0;
        this.outlineColor = new draw2d.util.Color(null);

        this.bold = false;

        this._super(
            $.extend({stroke: 1, width: 1, height: 1, resizeable: false}, attr),
            $.extend({
                /** @attr {String} text the text to show */
                text: this.setText,
                /** @attr {Number} outlineStroke the line width of the text to draw. Fill color and outline of the text can be different. */
                outlineStroke: this.setOutlineStroke,
                /** @attr {String|draw2d.util.Color} outlineColor the outline color of the text */
                outlineColor: this.setOutlineColor,
                /** @attr {String} fontFamily the font to use*/
                fontFamily: this.setFontFamily,
                /** @attr {Number} fontSize the font size to use */
                fontSize: this.setFontSize,
                /** @attr {String|draw2d.util.Color} fontColor the font color */
                fontColor: this.setFontColor,
                /** @attr {Number} padding the padding in pixel around the text */
                padding: this.setPadding,
                /** @attr {Boolean} bold indicator if bold text should be used*/
                bold: this.setBold
            }, setter),
            $.extend({
                text: this.getText,
                outlineStroke: this.getOutlineStroke,
                outlineColor: this.getOutlineColor,
                fontFamily: this.getFontFamily,
                fontSize: this.getFontSize,
                fontColor: this.getFontColor,
                padding: this.getPadding,
                bold: this.isBold
            }, getter));


        // behavior of the shape
        //
        this.editor = null;

        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());


        // some performance approvements
        this.lastAppliedRotation = -1;
    },

    /**
     * @method
     * Creates the shape object for a text node.
     *
     * @template
     **/
    createSet: function () {
        return this.canvas.paper.text(0, 0, this.text);
    },

    /**
     * @method
     * Set the canvas element of this figures.
     *
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function (canvas) {
        this.clearCache();
        this._super(canvas);
        this.clearCache();
    },

    /**
     * @method
     * Trigger the repaint of the element and transport all style properties to the visual representation.<br>
     * Called by the framework.
     *
     * @template
     **/
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        // style the label
        var lattr = this.calculateTextAttr();
        lattr.text = this.text;
        this.svgNodes.attr(lattr);
        // set of the x/y must be done AFTER the font-size and bold has been set.
        // Reason: the getBBox method needs the font attributes for calculation
        this.svgNodes.attr({
            x: this.padding.left + this.stroke,
            y: this.svgNodes.getBBox(true).height / 2 + this.padding.top
        });

        this._super(attributes);
    },


    /**
     *
     * @private
     */
    calculateTextAttr: function () {
        var lattr = {
            "text-anchor": "start",
            "font-size": this.fontSize,
            "font-weight": (this.bold === true) ? "bold" : "normal",
            fill: this.fontColor.hash(),
            stroke: this.outlineColor.hash(),
            "stroke-width": this.outlineStroke
        };
        if (this.fontFamily !== null) {
            lattr["font-family"] = this.fontFamily;
        }
        return lattr;
    },

    /**
     * @private
     */
    applyTransformation: function () {
        this.shape.transform("R" + this.rotationAngle);

        this.svgNodes.transform(
            "R" + this.rotationAngle +
            "T" + this.getAbsoluteX() + "," + this.getAbsoluteY());

        return this;
    },


    /**
     * @method
     * Set the new font size in [pt].
     *
     * @param {Number} size The new font size in <code>pt</code>
     **/
    setFontSize: function (size) {
        this.clearCache();
        this.fontSize = size;

        this.repaint();

        this.fireEvent("change:fontSize");
        this.fireEvent("resize");

        // Update the resize handles if the user change the position of the element via an API call.
        //
        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });


        return this;
    },

    /**
     * @method
     * Return the current used font size in px.
     *
     * @returns {Number}
     * @since 4.0.1
     */
    getFontSize: function () {
        return this.fontSize;
    },


    /**
     * @method
     * Set the label to <b>bold</b> or <b>normal</b> font weight.
     *
     * @param {Boolean} bold The bold flag for the label
     * @since 2.4.1
     **/
    setBold: function (bold) {
        this.clearCache();
        this.bold = bold;
        this.repaint();

        this.fireEvent("change:bold");
        this.fireEvent("resize");

        // Update the resize handles if the user change the position of the element via an API call.
        //
        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        return this;
    },

    /**
     * @method
     * Return the "bold" attribute of the label
     *
     * @since 5.0.0
     * @returns {Boolean}
     */
    isBold: function () {
        return this.bold;
    },

    /**
     * @method
     * Set the outline color of the font.
     *
     * @param {draw2d.util.Color/String} color The new color of the line.
     * @since 4.2.1
     **/
    setOutlineColor: function (color) {
        this.outlineColor = new draw2d.util.Color(color);
        this.repaint();
        this.fireEvent("change:outlineColor");

        return this;
    },

    /**
     * @method
     * The outlien color of the text
     *
     * @returns {draw2d.util.Color}
     * @since 4.2.1
     */
    getOutlineColor: function () {
        return this.outlineColor;
    },

    /**
     * @method
     * Set the stroke of the text to use.
     *
     * @param {Number} w The new line width of the figure
     * @since 4.2.1
     **/
    setOutlineStroke: function (w) {
        this.outlineStroke = w;
        this.repaint();
        this.fireEvent("change:outlineStroke");

        return this;
    },

    /**
     * @method
     * The used outline line width.
     *
     * @type {Number}
     * @since 4.2.1
     **/
    getOutlineStroke: function () {
        return this.outlineStroke;
    },

    /**
     * @method
     * Set the color of the font.
     *
     * @param {draw2d.util.Color/String} color The new color of the line.
     **/
    setFontColor: function (color) {
        this.fontColor = new draw2d.util.Color(color);
        this.repaint();
        this.fireEvent("change:fontColor");

        return this;
    },

    /**
     * @method
     * The current used font color
     *
     * @returns {draw2d.util.Color}
     */
    getFontColor: function () {
        return this.fontColor;
    },

    /**
     * @method
     * Set the padding of the element
     *
     *      // Alternatively you can use the attr method:
     *      //
     *      // set the padding for top,left,bottom,right in one call
     *      figure.attr({
     *        padding: 3
     *      });
     *
     *      // update the padding left and top
     *      figure.attr({
     *        padding: {left:3, top:30}
     *      });
     *
     * @param {Number|Object} padding The new padding
     **/
    setPadding: function (padding) {
        this.clearCache();
        if (typeof padding === "number") {
            this.padding = {top: padding, right: padding, bottom: padding, left: padding};
        }
        else {
            $.extend(this.padding, padding);
        }
        this.repaint();
        this.fireEvent("change:padding");

        return this;
    },


    /**
     * @method
     * Get the padding of the element.
     *
     * @since 4.0.1
     **/
    getPadding: function () {
        return this.padding;
    },

    /**
     * @method
     * Set the font family to use. If you use the shown font names the typical fallback
     * font are installed as well.
     *
     * <b>Serif Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Georgia'">Georgia</span></li>
     *  <li><span style="font-family:'Palatino Linotype'">Palatino Linotype</span></li>
     *  <li><span style="font-family:'Times New Roman'">Times New Roman</span></li>
     * </ul>
     *
     * <b>Sans-Serif Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Arial'">Arial</span></li>
     *  <li><span style="font-family:'Arial Black'">Arial Black</span></li>
     *  <li><span style="font-family:'Comic Sans MS'">Comic Sans MS</span></li>
     *  <li><span style="font-family:'Impact, Charcoal'">Impact, Charcoal</span></li>
     *  <li><span style="font-family:'Lucida Sans Unicode'">Lucida Sans Unicode</span></li>
     *  <li><span style="font-family:'Tahoma, Geneva'">Tahoma, Geneva</span></li>
     *  <li><span style="font-family:'Trebuchet MS'">Trebuchet MS</span> </li>
     *  <li><span style="font-family:'Verdana'">Verdana</span>, Geneva, sans-serif   /li>
     * </ul>
     *
     * <b>Monospace Fonts</b>
     * <ul>
     *  <li><span style="font-family:'Courier New'">Courier New</span></li>
     *  <li><span style="font-family:'Lucida Console'">Lucida Console</span></li>
     * </ul>
     *
     * @param {String} font The font to use
     **/
    setFontFamily: function (font) {
        this.clearCache();

        // check for fallback
        //
        if ((typeof font !== "undefined") && font !== null && typeof this.FONT_FALLBACK[font] !== "undefined") {
            font = this.FONT_FALLBACK[font];
        }

        this.fontFamily = font;
        this.repaint();
        this.fireEvent("change:fontFamily");

        return this;
    },


    /**
     * @method
     * Returns the used font family of the label.
     *
     * @returns {String}
     */
    getFontFamily: function () {
        return this.fontFamily;
    },


    /**
     * @method
     * A Label did have "autosize". Do nothing at all.
     *
     **/
    setDimension: function (w, h) {
        this.clearCache();

        this._super(w, h);

        return this;
    },

    /**
     * @method
     * clear the internal cache for width/height precalculation
     * @private
     */
    clearCache: function () {
        this.portRelayoutRequired = true;
        this.cachedMinWidth = null;
        this.cachedMinHeight = null;
        this.cachedWidth = null;
        this.cachedHeight = null;

        return this;
    },

    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinWidth: function () {
        if (this.shape === null) {
            return 0;
        }

        if (this.cachedMinWidth === null) {
            this.cachedMinWidth = this.svgNodes.getBBox(true).width
                + this.padding.left
                + this.padding.right
                + 2 * this.getStroke();
        }

        return this.cachedMinWidth;
    },

    /**
     * @method
     * This value is relevant for the interactive resize of the figure.
     *
     * @return {Number} Returns the min. width of this object.
     */
    getMinHeight: function () {
        if (this.shape === null) {
            return 0;
        }

        if (this.cachedMinHeight === null) {
            this.cachedMinHeight = this.svgNodes.getBBox(true).height
                + this.padding.top
                + this.padding.bottom
                + 2 * this.getStroke();
        }

        return this.cachedMinHeight;
    },

    /**
     * @method
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     *
     * @returns the calculated width of the label
     * @return {Number}
     **/
    getWidth: function () {
        if (this.shape === null) {
            return 0;
        }

        if (this.cachedWidth === null) {
            if (this.resizeable === true) {
                this.cachedWidth = Math.max(this.width, this.getMinWidth());
            }
            else {
                this.cachedWidth = this.getMinWidth();
            }
        }


        return this.cachedWidth;
    },
    /**
     * @method
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     *
     * @returns the calculated height of the label
     * @return {Number}
     */
    getHeight: function () {
        if (this.shape === null) {
            return 0;
        }

        if (this.cachedHeight === null) {
            this.cachedHeight = Math.max(this.height, this.getMinHeight());
        }

        return this.cachedHeight;
    },

    /**
     * @method
     * Set an editor for the label. This can be a dialog or inplace editor for the
     * Text.<br>
     * The editor will be activated if you doubleClick on the label.
     *
     * @param {draw2d.ui.LabelEditor} editor
     */
    installEditor: function (editor) {
        this.editor = editor;

        return this;
    },

    /**
     * @method
     * Called when a user dbl clicks on the element
     *
     */
    onDoubleClick: function () {
        if (this.editor !== null) {
            this.editor.start(this);
        }
    },


    /**
     * @method
     * Returns the current text of the label.
     *
     * @returns the current display text of the label
     * @type String
     **/
    getText: function () {
        return this.text;
    },

    /**
     * @method
     * Set the text for the label. Use \n for multiline text.
     *
     * @param {String} text The new text for the label.
     **/
    setText: function (text) {
        this.clearCache();
        this.text = text;

        this.repaint();
        // Update the resize handles if the user change the position of the element via an API call.
        //
        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("resize");
        this.fireEvent("change:text");

        if (this.parent !== null) {
            this.parent.repaint();
        }

        return this;
    },


    hitTest: function (x, y) {
        // apply a simple bounding box test if the label isn'T rotated
        //
        if (this.rotationAngle === 0) {
            return this._super(x, y);
        }

        // rotate the box with the current matrix of the
        // shape
        var matrix = this.shape.matrix;
        var points = this.getBoundingBox().getVertices();
        points.each(function (i, point) {
            var x = matrix.x(point.x, point.y);
            var y = matrix.y(point.x, point.y);
            point.x = x;
            point.y = y;
        });

        var polySides = 4;
        var i = 0;
        var j = polySides - 1;
        var oddNodes = false;

        for (i = 0; i < polySides; i++) {
            var pi = points.get(i);
            var pj = points.get(j);
            if ((pi.y < y && pj.y >= y
                || pj.y < y && pi.y >= y)
                && (pi.x <= x || pj.x <= x)) {
                if (pi.x + (y - pi.y) / (pj.y - pi.y) * (pj.x - pi.x) < x) {
                    oddNodes = !oddNodes;
                }
            }
            j = i;
        }
        return oddNodes;
    },


    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        memento.text = this.text;
        memento.outlineStroke = this.outlineStroke;
        memento.outlineColor = this.outlineColor.hash();
        memento.fontSize = this.fontSize;
        memento.fontColor = this.fontColor.hash();
        memento.fontFamily = this.fontFamily;

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);
        if (typeof memento.text !== "undefined") {
            this.setText(memento.text);
        }
        if (typeof memento.outlineStroke !== "undefined") {
            this.setOutlineStroke(memento.outlineStroke);
        }
        if (typeof memento.outlineColor !== "undefined") {
            this.setOutlineColor(memento.outlineColor);
        }
        if (typeof memento.fontFamily !== "undefined") {
            this.setFontFamily(memento.fontFamily);
        }
        if (typeof memento.fontSize !== "undefined") {
            this.setFontSize(memento.fontSize);
        }
        if (typeof memento.fontColor !== "undefined") {
            this.setFontColor(memento.fontColor);
        }
    }

});


/**
 * @class draw2d.shape.basic.Text
 * Implements a simple text with word wrapping.<br>The height of the element is automatic calculated. The widht of
 * the element is changeable by the user and respect the minWidth constraint.
 * <br>
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var shape =  new draw2d.shape.basic.Text({text:"This is a simple text with some loooooong word in."});
 *
 *     canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 * @since 4.2.3
 * @extends draw2d.shape.basic.Label
 */
draw2d.shape.basic.Text = draw2d.shape.basic.Label.extend({

    NAME: "draw2d.shape.basic.Text",

    /**
     * @constructor
     * Creates a new text element.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.cachedWrappedAttr = null;

        this._super($.extend({width: 100, height: 50, resizeable: true}, attr), setter, getter);

        this.installEditPolicy(new draw2d.policy.figure.WidthSelectionFeedbackPolicy());
    },


    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        // style the label
        this.svgNodes.attr($.extend({}, this.calculateTextAttr(), this.wrappedTextAttr(this.text, this.getWidth() - this.padding.left - this.padding.right)));

        // set of the x/y must be done AFTER the font-size and bold has been set.
        // Reason: the getHeight method needs the font-size for calculation because
        //         it redirects the calculation to the SVG element.
        this.svgNodes.attr({x: this.padding.left, y: this.getHeight() / 2});

        // this is an exception call. Don't call the super method (Label) to avoid
        // the calculation in this method.
        draw2d.SetFigure.prototype.repaint.call(this, attributes);
    },


    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
        this.clearCache();
        var attr = this.wrappedTextAttr(this.text, w);

        this._super(Math.min(w, attr.width), attr.height);
        this.fireEvent("change:dimension");

        return this;
    },

    /**
     * @method
     * clear the internal cache for width/height precalculation
     * @private
     */
    clearCache: function () {
        this._super();
        this.cachedWrappedAttr = null;

        return this;
    },


    /**
     * @inheritdoc
     */
    getMinWidth: function () {
        if (this.shape === null) {
            return 0;
        }

        if (this.cachedMinWidth === null) {
            // get the longest word in the text
            //
            var longestWord = this.text.split(" ").reduce(function (arg1, arg2) {
                return arg1.length > arg2.length ? arg1 : arg2;
            });
            var svgText = this.canvas.paper
                .text(0, 0, longestWord)
                .attr($.extend({}, this.calculateTextAttr(), {text: longestWord}));
            this.cachedMinWidth = svgText.getBBox(true).width + this.padding.left + this.padding.right + 2 * this.getStroke();
            svgText.remove();
        }

        return this.cachedMinWidth;
    },


    /**
     * @method
     * calculates the attributes (wrapped text and width, height) with the given parameter
     *
     * @private
     */
    wrappedTextAttr: function (text, width) {
        var words = text.split(" ");
        if (this.canvas === null || words.length === 0) {
            return {text: text, width: width, height: 20};
        }

        if (this.cachedWrappedAttr === null) {
            var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var svgText = this.canvas.paper.text(0, 0, "").attr($.extend({}, this.calculateTextAttr(), {text: abc}));

            // get a good estimation of a letter width...not correct but this is working for the very first draft implementation
            var letterWidth = svgText.getBBox(true).width / abc.length;

            var s = [words[0]], x = s[0].length * letterWidth;
            var w = null;
            for (var i = 1; i < words.length; i++) {
                w = words[i];
                var l = w.length * letterWidth;
                if ((x + l) > width) {
                    s.push("\n");
                    x = l;
                }
                else {
                    s.push(" ");
                    x += l;
                }
                s.push(w);
            }
            var bbox = svgText.getBBox(true);
            svgText.remove();
            this.cachedWrappedAttr = {
                text: s.join(""),
                width: (bbox.width + this.padding.left + this.padding.right),
                height: (bbox.height + this.padding.top + this.padding.bottom)
            };
        }
        return this.cachedWrappedAttr;
    },

    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        var memento = this._super();


        return memento;
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        return this;
    }

});


/**
 * @class draw2d.shape.basic.Line
 * The base class for all visible elements inside a canvas.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // Create the line and modify the start/end after inserting them into
 *     // the canvas
 *     var line1 =  new draw2d.shape.basic.Line({startX:30, startY:30, endX:100, endY:80});
 *
 *     canvas.add(line1);
 *
 *     // Create the line with a given start/end coordinate in the constructor
 *     //
 *     var line2 = new draw2d.shape.basic.Line({
 *           startX:20,
 *           startY:80,
 *           endX:200,
 *           endY:150,
 *           stroke:3,
 *           color:"#1d1dff"
 *      });
 *     canvas.add(line2);
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.Figure
 */
draw2d.shape.basic.Line = draw2d.Figure.extend({
    NAME: "draw2d.shape.basic.Line",

    DEFAULT_COLOR: new draw2d.util.Color(0, 0, 0),

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas witht he given start and
     * end coordinate.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        // click area for the line hit test
        this.corona = 10;
        this.isGlowing = false;
        this.lineColor = this.DEFAULT_COLOR;
        this.stroke = 1;
        this.outlineStroke = 0;
        this.outlineColor = new draw2d.util.Color(null);
        this.outlineVisible = false;

        this.dasharray = null;

        this.start = new draw2d.geo.Point(30, 30);
        this.end = new draw2d.geo.Point(100, 100);

        this.vertices = new draw2d.util.ArrayList();
        this.vertices.add(this.start);
        this.vertices.add(this.end);

        this._super(attr,
            $.extend({}, {
                /** @attr {Number} startX the x coordinate of the start point */
                startX: this.setStartX,
                /** @attr {Number} startY the y coordinate of the start point */
                startY: this.setStartY,
                /** @attr {Number} endX the x coordinate of the end */
                endX: this.setEndX,
                /** @attr {Number} endY the y coordinate of the end */
                endY: this.setEndY,
                /** @attr {String | draw2d.util.Color} outlineColor the outline color of the line */
                outlineColor: this.setOutlineColor,
                /** @attr {Number} outlineStroke the line width of the outline */
                outlineStroke: this.setOutlineStroke,
                /** @attr {String|draw2d.util.Color} color the color of the line */
                color: this.setColor,
                /** @attr {Number} stroke the line width of the color */
                stroke: this.setStroke,
                /** @attr {String} dasharray the line pattern see {@link draw2d.shape.basic.Line#setDashArray} for more information*/
                dasharray: this.setDashArray,
                /** @attr {Boolean} glow the glow flag for the shape. The representation of the "glow" depends on the shape */
                glow: this.setGlow
            }, setter),

            $.extend({}, {
                outlineColor: this.getOutlineColor,
                outlineStroke: this.getOutlineStroke,
                stroke: this.getStroke,
                dasharray: this.getDashArray
            }, getter));

        // create the selections handles/decorations
        this.installEditPolicy(new draw2d.policy.line.LineSelectionFeedbackPolicy());

        this.setSelectable(true);
        this.setDeleteable(true);
    },

    /**
     * @method
     * Set the outline color of the line.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        outlineColor: color
    *      });
     *
     * @param {draw2d.util.Color/String} color The new color of the line.
     * @since 4.2.1
     **/
    setOutlineColor: function (color) {
        this.outlineColor = new draw2d.util.Color(color);
        this.repaint();
        this.fireEvent("change:outlineColor");

        return this;
    },

    /**
     * @method
     * The outline color of the text
     *
     * @returns {draw2d.util.Color}
     * @since 4.2.1
     */
    getOutlineColor: function () {
        return this.outlineColor;
    },

    /**
     * @method
     * Set the outline stroke of the line to use.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        outlineStroke: w
    *      });
     *
     * @param {Number} w The new outline width of the line
     * @since 4.2.1
     **/
    setOutlineStroke: function (w) {
        this.outlineStroke = w;
        this.repaint();
        this.fireEvent("change:outlineStroke");

        return this;
    },

    /**
     * @method
     * The used outline line width.
     *
     * @type {Number}
     * @since 4.2.1
     **/
    getOutlineStroke: function () {
        return this.outlineStroke;
    },

    /**
     * @method
     * Don't call them manually. This will be done by the framework.<br>
     * Will be called if the object are moved via drag and drop.
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super(dx, dy, dx2, dy2);</code>
     * @private
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        if (this.command === null) {
            return;
        }

        this.command.setTranslation(dx, dy);

        this.vertices.each(function (i, e) {
            e.translate(dx2, dy2);
        });
        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();

        this.svgPathString = null;
        this._super(dx, dy, dx2, dy2);
    },

    /**
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     */
    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        // Element ist zwar schon an seine Position, das Command muss aber trotzdem
        // in dem CommandStack gelegt werden damit das Undo funktioniert.
        //
        this.isInDragDrop = false;

        if (this.command === null) {
            return;
        }

        var _this = this;

        // we must undo the interim drag/drop translation of the line. The real translation will be done
        // by the execute of the command. Yes - you are right. This is a HACK or design flaw :-/
        this.getVertices().each(function (i, e) {
            e.translate(-_this.command.dx, -_this.command.dy);
        });

        this.canvas.getCommandStack().execute(this.command);
        this.command = null;
        this.isMoving = false;

        // notify all installed policies
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.onDragEnd(_this.canvas, _this, x, y, shiftKey, ctrlKey);
            }
        });

        // inform all other listener
        this.fireEvent("move");
    },

    /**
     * @method
     * Called when a user clicks on the element.
     *
     *      // Alternatively you can register for this event with
     *      figure.on("click", function(emitterFigure){
    *          alert("clicked");
    *      });
     *
     * @template
     * @since 4.0.0
     */
    onClick: function () {
    },

    /**
     * @method
     * Set the line style for this object.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        dash: dashPattern
    *      });
     *
     * @param dash can be one of this ["", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."]
     */
    setDashArray: function (dashPattern) {
        this.dasharray = dashPattern;
        this.repaint();

        this.fireEvent("change:dashArray");

        return this;
    },

    /**
     * @method
     * Get the line style for this object.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr("dash");
     *
     * @since 5.1.0
     */
    getDashArray: function (dashPattern) {
        return this.dasharray;
    },


    /**
     * @method
     * Set the width for the click hit test of this line.
     *
     * @param {Number} width the width of the line hit test.
     **/
    setCoronaWidth: function (width) {
        this.corona = width;

        return this;
    },


    /**
     * @method
     * Called by the framework. Don't call them manually.
     *
     * @private
     **/
    createShapeElement: function () {
        var set = this.canvas.paper.set();

        // the drop shadow or border line
        set.push(this.canvas.paper.path("M" + this.start.x + " " + this.start.y + "L" + this.end.x + " " + this.end.y));
        // the main path
        set.push(this.canvas.paper.path("M" + this.start.x + " " + this.start.y + "L" + this.end.x + " " + this.end.y));
        set.node = set.items[1].node;

        // indicate that the outline is visisble at the momenet
        // the repaint update the status correct and set the attributes the first time
        this.outlineVisible = true;

        return set;
    },

    /**
     * @inheritdoc
     *
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        // don't override existing values
        //
        if (typeof attributes === "undefined") {
            attributes = {
                "stroke": this.lineColor.hash(),
                "stroke-width": this.stroke,
                "path": ["M", this.start.x, this.start.y, "L", this.end.x, this.end.y].join(" ")
            };
        }
        else {
            if (typeof attributes.path === "undefined") {
                attributes.path = ["M", this.start.x, this.start.y, "L", this.end.x, this.end.y].join(" ");
            }
            attributes.stroke = this.lineColor.hash();
            attributes["stroke-width"] = this.stroke;
        }

        if (this.dasharray !== null) {
            attributes["stroke-dasharray"] = this.dasharray;
        }

        this._super(attributes);

        if (this.outlineStroke > 0) {
            this.shape.items[0].attr({
                "stroke-width": (this.outlineStroke + this.stroke),
                "stroke": this.outlineColor.hash()
            });
            if (this.outlineVisible === false)
                this.shape.items[0].show();
            this.outlineVisible = true;
        }
        else if (this.outlineVisible === true) {
            // reset them once
            this.shape.items[0].attr({"stroke-width": 0, "stroke": "none"});
            this.shape.items[0].hide();
        }
    },

    /**
     * @method
     * Highlight the element or remove the highlighting
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        glow: flag
    *      });
     *
     * @param {Boolean} flag indicates glow/noGlow
     * @template
     */
    setGlow: function (flag) {
        if (this.isGlowing === flag) {
            return;
        }

        if (flag === true) {
            // store old values for restore
            this._lineColor = this.lineColor;
            this._stroke = this.stroke;

            this.setColor(new draw2d.util.Color("#3f72bf"));
            this.setStroke((this.stroke * 4) | 0);
        }
        else {
            this.setColor(this._lineColor);
            this.setStroke(this._stroke);
        }

        this.isGlowing = flag;

        return this;
    },


    /**
     * You can't drag&drop the resize handles if the line not resizeable.
     * @type boolean
     **/
    isResizeable: function () {
        return true;
    },


    /**
     * Set the line width. This enforce a repaint of the line.
     * This method fires a <i>document dirty</i> event.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        stroke: w
    *      });
     *
     * @param {Number} w The new line width of the figure.
     **/
    setStroke: function (w) {
        this.stroke = parseFloat(w);

        this.repaint();
        this.fireEvent("change:stroke");

        return this;
    },


    /**
     * @method
     * The used line width.
     *
     * @type {Number}
     **/
    getStroke: function () {
        return this.stroke;
    },


    /**
     * @method
     * Set the color of the line.
     * This method fires a <i>document dirty</i> event.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        color: color
    *      });
     *
     * @param {draw2d.util.Color|String} color The new color of the line.
     **/
    setColor: function (color) {
        this.lineColor = new draw2d.util.Color(color);
        this.repaint();
        this.fireEvent("change:color");

        return this;
    },

    /**
     * @method
     * Return the current paint color.
     *
     * @return {draw2d.util.Color} The paint color of the line.
     **/
    getColor: function () {
        return this.lineColor;
    },

    /**
     * @method
     * Translate the line with the given x/y offset.
     *
     * @param {Number} dx The new x translate offset
     * @param {Number} dy The new y translate offset
     * @since 4.1.0
     **/
    translate: function (dx, dy) {
        this.vertices.each(function (i, e) {
            e.translate(dx, dy);
        });
        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.svgPathString = null;
        this.repaint();

        return this;
    },

    /**
     * @method
     * return the bounding box of the line or polygon
     *
     * TODO: precalculate or cache this values
     *
     * @returns {draw2d.geo.Rectangle}
     * @since 4.8.2
     */
    getBoundingBox: function () {
        var minX = Math.min.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
            return n.x;
        }));
        var minY = Math.min.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
            return n.y;
        }));
        var maxX = Math.max.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
            return n.x;
        }));
        var maxY = Math.max.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
            return n.y;
        }));
        var width = maxX - minX;
        var height = maxY - minY;

        return new draw2d.geo.Rectangle(minX, minY, width, height);
    },


    /**
     * @method
     * Set the start point of the line.
     * This method fires a <i>document dirty</i> event.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        startX: x,
    *        startY: y
    *      });
     *
     * @param {Number} x the x coordinate of the start point
     * @param {Number} y the y coordinate of the start point
     **/
    setStartPoint: function (x, y) {
        if (this.start.x === x && this.start.y === y) {
            return this;
        }

        this.start.setPosition(x, y);
        this.repaint();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:start");

        return this;
    },


    setStartX: function (x) {
        this.setStartPoint(x, this.start.y);
    },

    setStartY: function (y) {
        this.setStartPoint(this.start.x, y);
    },

    setEndX: function (x) {
        this.setEndPoint(x, this.end.y);
    },

    setEndY: function (y) {
        this.setEndPoint(this.start.x, y);
    },

    /**
     * Set the end point of the line.
     * This method fires a <i>document dirty</i> event.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        endX: x,
    *        endY: y
    *      });
     *
     * @param {Number} x the x coordinate of the end point
     * @param {Number} y the y coordinate of the end point
     **/
    setEndPoint: function (x, y) {
        if (this.end.x === x && this.end.y === y) {
            return this;
        }

        this.end.setPosition(x, y);
        this.repaint();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("change:end");

        return this;
    },

    /**
     * @method
     * Return the x coordinate of the start.
     * @deprecated
     * @return {Number}
     **/
    getStartX: function () {
        return this.start.x;
    },

    /**
     * @method
     * Return the y coordinate of the start.
     *
     * @deprecated
     * @return {Number}
     **/
    getStartY: function () {
        return this.start.y;
    },

    /**
     * @method
     * Return the start point.
     *
     * @return {draw2d.geo.Point}
     **/
    getStartPoint: function () {
        return this.start.clone();
    },


    /**
     * @method
     * Return the x coordinate of the end point
     *
     * @deprecated
     * @return {Number}
     **/
    getEndX: function () {
        return this.end.x;
    },

    /**
     * @method
     * Return the y coordinate of the end point.
     *
     * @deprecated
     * @return {Number}
     **/
    getEndY: function () {
        return this.end.y;
    },

    /**
     * @method
     * Return the end point.
     *
     * @return {draw2d.geo.Point}
     **/
    getEndPoint: function () {
        return this.end.clone();
    },


    /**
     * @method
     * Return the Vertex with the given index.
     *
     * @param {Number} index the index of the vertex to return
     */
    getVertex: function (index) {
        return this.vertices.get(index);
    },

    /**
     * @method
     * Returns the vertices of the connection
     *
     * @return {draw2d.util.ArrayList} an draw2d.util.ArrayList of type draw2d.Point
     **/
    getVertices: function () {
        return this.vertices;
    },
    /* @deprecated */
    getPoints: function () {
        return this.getVertices();
    },

    /**
     * @method
     * Update the vertices of the object. The given array is copied and assigned.
     *
     * @param {draw2d.util.ArrayList} vertices the new vertices of the polyline.
     *
     * @since 4.0.1
     */
    setVertices: function (vertices) {
        this.vertices = vertices.clone(true);

        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();

        // update the UI and the segment parts
        this.svgPathString = null;
        this.repaint();

        var _this = this;
        // align the SelectionHandles to the new situation
        // This is a Hack....normally this should be done below and the Line shouldn't know
        // something about this issue....this is complete a "EditPolicy" domain to handle this.
        if (!this.selectionHandles.isEmpty()) {
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                    e.onUnselect(_this.canvas, _this);
                    e.onSelect(_this.canvas, _this);
                }
            });
        }

        // notify the listener about the changes
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("change:vertices");

        return this;
    },

    /**
     * @method
     * Return the segments of the line with {start:s, end: e} JSON array list
     *
     * @returns {draw2d.util.ArrayList}
     */
    getSegments: function () {
        var result = new draw2d.util.ArrayList();
        result.add({start: this.getStartPoint(), end: this.getEndPoint()});

        return result;
    },

    /**
     * @method
     * Returns the length of the line.
     *
     * @return {Number}
     **/
    getLength: function () {
        return Math.sqrt((this.start.x - this.end.x) * (this.start.x - this.end.x) + (this.start.y - this.end.y) * (this.start.y - this.end.y));
    },

    /**
     * @method
     * Returns the angle of the line in degree.
     *
     * <pre>
     *                                 270�?
     *                               |
     *                               |
     *                               |
     *                               |
     * 180�? -------------------------+------------------------> +X
     *                               |                        0�?
     *                               |
     *                               |
     *                               |
     *                               V +Y
     *                              90�?
     * </pre>
     * @return {Number}
     **/
    getAngle: function () {
        var length = this.getLength();
        var angle = -(180 / Math.PI) * Math.asin((this.start.y - this.end.y) / length);

        if (angle < 0) {
            if (this.end.x < this.start.x) {
                angle = Math.abs(angle) + 180;
            }
            else {
                angle = 360 - Math.abs(angle);
            }
        }
        else {
            if (this.end.x < this.start.x) {
                angle = 180 - angle;
            }
        }
        return angle;
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null if the shape want cancel the
     * operation or it can't operate the command.
     *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     * @return {draw2d.command.Command} null or a Command
     * @private
     **/
    createCommand: function (request) {
        if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
            if (this.isDraggable()) {
                return new draw2d.command.CommandMoveLine(this);
            }
        }
        if (request.getPolicy() === draw2d.command.CommandType.DELETE) {
            if (this.isDeleteable() === false) {
                return null;
            }
            return new draw2d.command.CommandDelete(this);
        }

        return null;
    },

    /**
     * @method
     * Checks if the hands over coordinate close to the line. The 'corona' is considered
     * for this test. This means the point isn't direct on the line. Is it only close to the
     * line!
     *
     * @param {Number} px the x coordinate of the test point
     * @param {Number} py the y coordinate of the test point
     * @return {boolean}
     **/
    hitTest: function (px, py) {
        return draw2d.shape.basic.Line.hit(this.corona + this.stroke, this.start.x, this.start.y, this.end.x, this.end.y, px, py);
    },

    /**
     * @method
     * Return all intersection points between the given Line.
     *
     * @param {draw2d.shape.basic.Line} other
     * @returns {draw2d.util.ArrayList}
     */
    intersection: function (other) {
        var result = new draw2d.util.ArrayList();

        // empty result. the lines are equal...infinit array
        if (other === this) {
            return result;
        }

        var segments1 = this.getSegments();
        var segments2 = other.getSegments();

        segments1.each(function (i, s1) {
            segments2.each(function (j, s2) {
                var p = draw2d.shape.basic.Line.intersection(s1.start, s1.end, s2.start, s2.end);
                if (p !== null) {
                    result.add(p);
                }
            });
        });
        return result;
    },


    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        var memento = this._super();
        delete memento.x;
        delete memento.y;
        delete memento.width;
        delete memento.height;

        memento.stroke = this.stroke;
        memento.color = this.getColor().hash();
        memento.outlineStroke = this.outlineStroke;
        memento.outlineColor = this.outlineColor.hash();
        if (this.dasharray !== null) {
            memento.dasharray = this.dasharray;
        }

        if (this.editPolicy.getSize() > 0) {
            memento.policy = this.editPolicy.getFirstElement().NAME;
        }

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.dasharray === "string") {
            this.dasharray = memento.dasharray;
        }
        if (typeof memento.stroke !== "undefined") {
            this.setStroke(parseFloat(memento.stroke));
        }
        if (typeof memento.color !== "undefined") {
            this.setColor(memento.color);
        }
        if (typeof memento.outlineStroke !== "undefined") {
            this.setOutlineStroke(memento.outlineStroke);
        }
        if (typeof memento.outlineColor !== "undefined") {
            this.setOutlineColor(memento.outlineColor);
        }
        if (typeof memento.policy !== "undefined") {
            try {
                this.installEditPolicy(eval("new " + memento.policy + "()"));
            }
            catch (exc) {
                debug.warn("Unable to install edit policy '" + memento.policy + "' forced by " + this.NAME + ".setPersistendAttributes. Using default.");
            }
        }
    }
});


/**
 * see: http://en.wikipedia.org/wiki/Line-line_intersection
 *
 * @param {draw2d.geo.Point} a1
 * @param {draw2d.geo.Point} a2
 * @param {draw2d.geo.Point} b1
 * @param {draw2d.geo.Point} b2
 *
 * @static
 * @private
 * @returns
 */
draw2d.shape.basic.Line.intersection = function (a1, a2, b1, b2) {
    var result = null;

    var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);

    if (u_b != 0) {
        var ua = ua_t / u_b;
        var ub = ub_t / u_b;

        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            result = new draw2d.geo.Point((a1.x + ua * (a2.x - a1.x)) | 0, (a1.y + ua * (a2.y - a1.y)) | 0);

            // determine if the lines are crossing or just touching
            //
            result.justTouching = ( 0 == ua || ua == 1 || 0 == ub || ub == 1 );
        }
    }

    return result;
};

/**
 * Static util function to determine is a point(px,py) on the line(x1,y1,x2,y2)
 * A simple hit test.
 *
 * @return {boolean}
 * @static
 * @private
 * @param {Number} coronaWidth the accepted corona for the hit test
 * @param {Number} X1 x coordinate of the start point of the line
 * @param {Number} Y1 y coordinate of the start point of the line
 * @param {Number} X2 x coordinate of the end point of the line
 * @param {Number} Y2 y coordinate of the end point of the line
 * @param {Number} px x coordinate of the point to test
 * @param {Number} py y coordinate of the point to test
 **/
draw2d.shape.basic.Line.hit = function (coronaWidth, X1, Y1, X2, Y2, px, py) {
    // Adjust vectors relative to X1,Y1
    // X2,Y2 becomes relative vector from X1,Y1 to end of segment
    X2 -= X1;
    Y2 -= Y1;
    // px,py becomes relative vector from X1,Y1 to test point
    px -= X1;
    py -= Y1;
    var dotprod = px * X2 + py * Y2;
    var projlenSq;
    if (dotprod <= 0.0) {
        // px,py is on the side of X1,Y1 away from X2,Y2
        // distance to segment is length of px,py vector
        // "length of its (clipped) projection" is now 0.0
        projlenSq = 0.0;
    } else {
        // switch to backwards vectors relative to X2,Y2
        // X2,Y2 are already the negative of X1,Y1=>X2,Y2
        // to get px,py to be the negative of px,py=>X2,Y2
        // the dot product of two negated vectors is the same
        // as the dot product of the two normal vectors
        px = X2 - px;
        py = Y2 - py;
        dotprod = px * X2 + py * Y2;
        if (dotprod <= 0.0) {
            // px,py is on the side of X2,Y2 away from X1,Y1
            // distance to segment is length of (backwards) px,py vector
            // "length of its (clipped) projection" is now 0.0
            projlenSq = 0.0;
        } else {
            // px,py is between X1,Y1 and X2,Y2
            // dotprod is the length of the px,py vector
            // projected on the X2,Y2=>X1,Y1 vector times the
            // length of the X2,Y2=>X1,Y1 vector
            projlenSq = dotprod * dotprod / (X2 * X2 + Y2 * Y2);
        }
    }
    // Distance to line is now the length of the relative point
    // vector minus the length of its projection onto the line
    // (which is zero if the projection falls outside the range
    //  of the line segment).
    var lenSq = px * px + py * py - projlenSq;
    if (lenSq < 0) {
        lenSq = 0;
    }
    return Math.sqrt(lenSq) < coronaWidth;
};


/**
 * @class draw2d.shape.basic.PolyLine
 *
 * A PolyLine is a line with more than 2 points.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Line
 */
draw2d.shape.basic.PolyLine = draw2d.shape.basic.Line.extend({

    NAME: "draw2d.shape.basic.PolyLine",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        // internal status handling for performance reasons
        //
        this.svgPathString = null;
        this.oldPoint = null;

        this.router = null;
        this.routingRequired = true;
        this.lineSegments = new draw2d.util.ArrayList();

        this.radius = 2;

        this._super(
            $.extend(
                {router: draw2d.shape.basic.PolyLine.DEFAULT_ROUTER}, attr),
            $.extend({}, {
                /** @attr {draw2d.layout.connection.ConnectionRouter} the router to use to layout the polyline */
                router: this.setRouter,
                /** @attr {Number} radius the radius to render the line edges */
                radius: this.setRadius
            }, setter),
            $.extend({}, {
                router: this.getRouter,
                radius: this.getRadius
            }, getter)
        );
    },

    /**
     * @method
     * Sets the corner radius of the edges.
     *
     * @param {Number} radius the corner radius
     * @since 4.2.1
     */
    setRadius: function (radius) {
        this.radius = radius;
        this.svgPathString = null;
        this.repaint();
        this.fireEvent("change:radius");

        return this;
    },

    /**
     * @method
     * Get the corner radius of the edges.
     *
     * @return {Number}
     * @since 4.2.1
     */
    getRadius: function () {
        return this.radius;
    },


    /**
     * @method
     * Set the start point of the line.
     *
     * @param {Number} x the x coordinate of the start point
     * @param {Number} y the y coordinate of the start point
     **/
    setStartPoint: function (x, y) {
        if (this.start.x === x && this.start.y === y) {
            return this;
        }
        this.start.setPosition(x, y);
        this.calculatePath();
        this.repaint();
        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:start");

        return this;
    },

    /**
     * @method
     * Set the end point of the line.
     *
     * @param {Number} x the x coordinate of the end point
     * @param {Number} y the y coordinate of the end point
     */
    setEndPoint: function (x, y) {
        if (this.end.x === x && this.end.y === y) {
            return this;
        }

        this.end.setPosition(x, y);
        this.calculatePath();
        this.repaint();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:end");

        return this;
    },

    /**
     * @method
     * Inserts the draw2d.geo.Point object into the vertex list of the polyline just after the object with the given index.
     *
     * @param {Number} index the insert index
     * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
     * @param {Number} [y] the y coordinate or undefined of the second argument is a point
     *
     * @since 4.0.0
     */
    addVertex: function (x, y) {
        this.vertices.add(new draw2d.geo.Point(x, y));

        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();

        this.svgPathString = null;
        this.repaint();

        if (!this.selectionHandles.isEmpty()) {
            var _this = this;
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                    e.onUnselect(_this.canvas, _this);
                    e.onSelect(_this.canvas, _this);
                }
            });
        }
        this.fireEvent("change:vertices");

        return this;
    },

    /**
     * @method
     * Update the vertex at the give position with the new coordinate
     *
     * @param {Number} index the index of the vertex to update
     * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
     * @param {Number} [y] the y coordinate or undefined of the second argument is a point
     *
     * @since 4.0.0
     */
    setVertex: function (index, x, y) {
        if (x instanceof draw2d.geo.Point) {
            y = x.y;
            x = x.x;
        }

        var vertex = this.vertices.get(index);

        // invalid point or nothing todo
        //
        if (vertex === null || (vertex.x === x && vertex.y === y)) {
            return;
        }

        vertex.x = parseFloat(x);
        vertex.y = parseFloat(y);

        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();

        this.svgPathString = null;
        this.routingRequired = true;
        this.repaint();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:vertices");

        return this;
    },


    /**
     * @method
     * Inserts the draw2d.geo.Point object into the vertex list of the polyline just after the object with the given index.
     *
     * @param {Number} index the insert index
     * @param {Number|draw2d.geo.Point} x the x coordinate or the draw2d.geo.Point object
     * @param {Number} [y] the y coordinate or undefined of the second argument is a point
     *
     * @since 4.0.0
     */
    insertVertexAt: function (index, x, y) {
        var vertex = new draw2d.geo.Point(x, y);

        this.vertices.insertElementAt(vertex, index);

        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();

        this.svgPathString = null;
        this.repaint();

        if (!this.selectionHandles.isEmpty()) {
            var _this = this;
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                    e.onUnselect(_this.canvas, _this);
                    e.onSelect(_this.canvas, _this);
                }
            });
        }
        this.fireEvent("change:vertices");

        return this;
    },


    /**
     * @method
     * Remove a vertex from the polyline and return the removed point. The current installed connection router
     * can send an veto for this operation.
     *
     * @param index
     * @returns {draw2d.geo.Point} the removed point or null of the current router decline this operation
     * @since 4.0.0
     */
    removeVertexAt: function (index) {
        var removedPoint = this.vertices.removeElementAt(index);

        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();

        this.svgPathString = null;
        this.repaint();

        if (!this.selectionHandles.isEmpty()) {
            var _this = this;
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                    e.onUnselect(_this.canvas, _this);
                    e.onSelect(_this.canvas, _this);
                }
            });
        }
        this.fireEvent("change:vertices");

        return removedPoint;
    },


    /**
     * @method
     * Set the router for this connection.
     *
     * @param {draw2d.layout.connection.ConnectionRouter} [router] the new router for this connection or null if the connection should use the default routing
     **/
    setRouter: function (router) {
        if (this.router !== null) {
            this.router.onUninstall(this);
        }

        if (typeof router === "undefined" || router === null) {
            this.router = new draw2d.layout.connection.DirectRouter();
        }
        else {
            this.router = router;
        }

        this.router.onInstall(this);

        this.routingRequired = true;

        // repaint the connection with the new router
        this.repaint();

        this.fireEvent("change:router");

        return this;
    },

    /**
     * @method
     * Return the current active router of this connection.
     *
     * @type draw2d.layout.connection.ConnectionRouter
     **/
    getRouter: function () {
        return this.router;
    },

    /**
     * @method
     * Calculate the path of the polyline
     *
     * @private
     */
    calculatePath: function () {

        if (this.shape === null) {
            return;
        }

        this.svgPathString = null;

        var oldVertices = this.vertices;

        // cleanup the routing cache
        //
        this.oldPoint = null;
        this.lineSegments = new draw2d.util.ArrayList();
        this.vertices = new draw2d.util.ArrayList();

        // Use the internal router
        //
        this.router.route(this, oldVertices);
        this.routingRequired = false;
        this.fireEvent("routed");
        this.fireEvent("change:route");

        // update the selection handles if the count of the vertices has changed.
        //
        /*
         if(oldVertices.getSize()!==this.vertices.getSize() && !this.selectionHandles.isEmpty()){
         this.editPolicy.each($.proxy(function(i, e) {
         if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
         e.onUnselect(this.canvas, this);
         e.onSelect(this.canvas, this);
         }
         }, this));
         }
         */
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        if (this.svgPathString === null || this.routingRequired === true) {
            this.calculatePath();
        }


        this._super($.extend({
            path: this.svgPathString,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }, attributes));

        return this;
    },


    /**
     * @method
     * Called if the DragDrop object leaving the current hover figure.
     *
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     * @template
     **/
    onDragLeave: function (draggedFigure) {
    },


    /**
     * @method
     * Return all line segments of the polyline.
     *
     * @returns {draw2d.util.ArrayList}
     */
    getSegments: function () {
        return this.lineSegments;
    },

    /**
     * @method
     * used for the router to add the calculated points
     *
     * @private
     *
     **/
    addPoint: function (/*:draw2d.geo.Point*/ p, y) {
        if (typeof y !== "undefined") {
            p = new draw2d.geo.Point(p, y);
        }
        this.vertices.add(p);

        if (this.oldPoint !== null) {
            // store the painted line segment for the "mouse selection test"
            // (required for user interaction)
            this.lineSegments.add({start: this.oldPoint, end: p});
        }
        this.svgPathString = null;
        this.oldPoint = p;
    },

    /**
     * @inheritdoc
     */
    onOtherFigureIsMoving: function (/*:draw2d.Figure*/ figure) {
        this.repaintBlocked = true;
        this._super(figure);
        this.calculatePath();

        this.repaintBlocked = false;
        this.repaint();
    },

    /**
     * @method
     * get the best segment of the line which is below the given coordinate or null if
     * all segment are not below the coordinate. <br>
     * The 'corona' property of the polyline is considered for this test. This means
     * the point isn't direct on the line. Is it only close to the line!
     *
     * @param {Number} px the x coordinate of the test point
     * @param {Number} py the y coordinate of the test point
     * @return {Object}
     * @since 4.4.0
     **/
    hitSegment: function (px, py) {
        for (var i = 0; i < this.lineSegments.getSize(); i++) {
            var segment = this.lineSegments.get(i);
            if (draw2d.shape.basic.Line.hit(this.corona, segment.start.x, segment.start.y, segment.end.x, segment.end.y, px, py)) {
                return {index: i, start: segment.start, end: segment.end};
            }
        }
        return null;
    },

    /**
     * @method
     * Checks if the hands over coordinate close to the line. The 'corona' property of the polyline
     * is considered for this test. This means the point isn't direct on the line. Is it only close to the
     * line!
     *
     * @param {Number} px the x coordinate of the test point
     * @param {Number} py the y coordinate of the test point
     * @return {boolean}
     **/
    hitTest: function (px, py) {
        return this.hitSegment(px, py) !== null;
    },

    /**
     * @inheritdoc
     */
    createCommand: function (request) {

        if (request.getPolicy() === draw2d.command.CommandType.DELETE) {
            if (this.isDeleteable() === true) {
                return new draw2d.command.CommandDelete(this);
            }
        }
        else if (request.getPolicy() === draw2d.command.CommandType.MOVE_VERTEX) {
            if (this.isResizeable() === true) {
                return new draw2d.command.CommandMoveVertex(this);
            }
        }
        else if (request.getPolicy() === draw2d.command.CommandType.MOVE_VERTICES) {
            if (this.isResizeable() === true) {
                return new draw2d.command.CommandMoveVertices(this);
            }
        }

        return this._super(request);
    },

    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        var memento = $.extend(this._super(), {
            router: this.router.NAME,
            radius: this.radius
        });

        memento = this.router.getPersistentAttributes(this, memento);

        return memento;
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.router !== "undefined") {
            try {
                this.setRouter(eval("new " + memento.router + "()"));
            }
            catch (exc) {
                debug.warn("Unable to install router '" + memento.router + "' forced by " + this.NAME + ".setPersistendAttributes. Using default");
            }
        }

        if (typeof memento.radius !== "undefined") {
            this.setRadius(memento.radius);
        }

        this.router.setPersistentAttributes(this, memento);

        this.start = this.vertices.first().clone();
        this.end = this.vertices.last().clone();
    }
});

/**
 * The default ConnectionRouter for the running applicaiton. Set this to your wanted implementation
 * {@link draw2d.layout.connection.ConnectionRouter}
 */
draw2d.shape.basic.PolyLine.DEFAULT_ROUTER = new draw2d.layout.connection.ManhattanConnectionRouter();


/**
 * @class draw2d.shape.basic.Image
 * Simple Image shape.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.node.Node
 */
draw2d.shape.basic.Image = draw2d.shape.node.Node.extend({
    NAME: "draw2d.shape.basic.Image",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr,
            $.extend({
                /** @attr {String} path the image path (absolute or relative) of the shape */
                path: this.setPath
            }, setter),
            $.extend({
                path: this.getPath
            }, getter));
    },


    /**
     * @method
     * Set the image path attribute of the Image shape and repaint them.
     * The path can be relative or absolute
     *
     * @param path
     * @since 2.8.0
     */
    setPath: function (path) {
        this.path = path;

        if (this.shape !== null) {
            this.shape.attr({src: this.path});
        }
        this.fireEvent("change:path");

        return this;
    },

    /**
     * @method
     * Return the image path attribute of the shape.
     *
     * @returns {String}
     * @since 2.8.0
     */
    getPath: function () {
        return this.path;
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return this;
        }

        attributes = attributes || {};

        attributes.x = this.getAbsoluteX();
        attributes.y = this.getAbsoluteY();
        attributes.width = this.getWidth();
        attributes.height = this.getHeight();
        attributes.src = this.path;

        // propagate the width/height as CSS attribute as well because Chrome
        // did some "flickering" in some versions and sometimes the image disappear complete
        $(this.shape.node).css({width: attributes.width, height: attributes.height});

        this._super(attributes);

        return this;
    },

    /**
     * @inheritdoc
     */
    createShapeElement: function () {
        return this.canvas.paper.image(this.path, this.getX(), this.getY(), this.getWidth(), this.getHeight());
    },


    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        return $.extend(this._super(), {
            path: this.path
        });
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);
        if (typeof memento.path !== "undefined") {
            this.setPath(memento.path);
        }
    }

});


/**
 * @class draw2d.shape.basic.Polygon
 * A Polygon figure.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var p1 =  new draw2d.shape.basic.Polygon({width:100, height:100});
 *     var p2 =  new draw2d.shape.basic.Polygon({width:100, height:60});
 *
 *     canvas.add(p1,10,10);
 *     canvas.add(p2,100,10);
 *
 *     p2.attr({color:"#f0f000", alpha:0.7});
 *
 *     canvas.setCurrentSelection(p2);
 *
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Polygon = draw2d.VectorFigure.extend({

    NAME: "draw2d.shape.basic.Polygon",

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.vertices = new draw2d.util.ArrayList();

        this._super(attr);

        // we must cache the initial width/height because the width/height of the shape
        // is recalculated in the addVertex method. After the first call this values are 0/0
        if (this.vertices.getSize() === 0) {
            var w = this.width;
            var h = this.height;
            var pos = this.getPosition();
            this.addVertex(new draw2d.geo.Point(0, 0));
            this.addVertex(new draw2d.geo.Point(w, 0));
            this.addVertex(new draw2d.geo.Point(w, h));

            this.setPosition(pos);
        }

        this.svgPathString = null;

        this.installEditPolicy(new draw2d.policy.figure.VertexSelectionFeedbackPolicy());
    },

    /**
     * @inheritdoc
     */
    setRadius: function (radius) {
        this.svgPathString = null;

        this._super(radius);
        this.fireEvent("change:radius");

        return this;
    },

    /**
     * @inheritdoc
     */
    createShapeElement: function () {
        // return some good default...
        return this.canvas.paper.path("M0 10L100 100");
    },

    /**
     * @method
     * calculate the path of the polygon
     *
     */
    calculatePath: function () {
        var radius = this.getRadius();
        var path = [];
        if (radius === 0) {
            var length = this.vertices.getSize();
            var p = this.vertices.get(0);
            path.push("M", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5);
            for (var i = 1; i < length; i++) {
                p = this.vertices.get(i);
                path.push("L", (p.x | 0) + 0.5, " ", (p.y | 0) + 0.5);
            }
            path.push("Z");
        }
        else {
            length = this.vertices.getSize();
            var start = this.vertices.first();
            var end = this.vertices.last();
            var begin = this.insetPoint(start, end, radius);
            path.push("M", (begin.x | 0) + 0.5, ",", (begin.y | 0) + 0.5);
            for (var i = 0; i < length; i++) {
                start = this.vertices.get(i);
                end = this.vertices.get((i + 1) % length);
                modStart = this.insetPoint(start, end, radius);
                modEnd = this.insetPoint(end, start, radius);
                path.push("Q", start.x, ",", start.y, " ", (modStart.x | 0) + 0.5, ", ", (modStart.y | 0) + 0.5);
                path.push("L", (modEnd.x | 0) + 0.5, ",", (modEnd.y | 0) + 0.5);
            }
        }
        this.svgPathString = path.join("");
        return this;
    },

    /**
     * @method
     * Returns a new ray with a new length but with the same direction of the start/end.
     *
     * @param start
     * @param end
     * @param distanceFromStart
     * @private
     * @returns
     */
    insetPoint: function (start, end, distanceFromStart) {
        if (start.equals(end)) {
            return start;
        }
        var vx = start.x - end.x;
        var vy = start.y - end.y;
        var length = Math.sqrt(vx * vx + vy * vy);
        var localDistance = Math.min(length / 2, distanceFromStart);
        return {
            x: end.x + vx / length * (length - localDistance),
            y: end.y + vy / length * (length - localDistance)
        };

    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        if (this.svgPathString === null) {
            this.calculatePath();
        }

        attributes = attributes || {};

        if (typeof attributes.path === "undefined") {
            attributes.path = this.svgPathString;
        }

        this._super(attributes);
    },

    /**
     * @method
     * Translate the figure with the given x/y offset. This method modifies all
     * vertices and the bounding box.
     *
     * @param {Number} dx The new x translate offset
     * @param {Number} dy The new y translate offset
     **/
    translate: function (dx, dy) {
        this.vertices.each(function (i, e) {
            e.translate(dx, dy);
        });
        this.svgPathString = null;

        this.repaint();

        this.updateBoundingBox();

        // Update the resize handles if the user change the position of the
        // element via an API call.
        //
        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("move");
        this.fireEvent("change:position");

        return this;
    },

    /**
     * @method
     * Change the position of the polygon. This method updates all vertices.
     *
     * @param {Number|draw2d.geo.Point} x
     * @param {Number} y
     */
    setPosition: function (x, y) {
        if (x instanceof draw2d.geo.Point) {
            y = x.y;
            x = x.x;
        }

        var dx = x - this.minX;
        var dy = y - this.minY;
        this.translate(dx, dy);

        this.x = x;
        this.y = y;

        return this;
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
        var oldWidth = this.width;
        var oldHeight = this.height;

        this._super(w, h);

        var fracWidth = (1 / oldWidth) * this.width;
        var fracHeight = (1 / oldHeight) * this.height;

        var thisX = this.x;
        var thisY = this.y;
        this.vertices.each(function (i, e) {
            // calculate difference between point and figure origin
            var diffX = (e.getX() - thisX) * fracWidth;
            var diffY = (e.getY() - thisY) * fracHeight;
            e.setPosition(thisX + diffX, thisY + diffY);
        });

        this.svgPathString = null;
        this.repaint();
        this.fireEvent("change:dimension");

        return this;
    },

    /**
     * @method
     * Return all vertices of the polygon.
     *
     * @returns {draw2d.util.ArrayList}
     */
    getVertices: function () {
        return this.vertices;
    },


    /**
     * @method
     * Return the Vertex with the given index.
     *
     * @param {Number} index the index of the vertex to return
     * @since 5.0.2
     */
    getVertex: function (index) {
        return this.vertices.get(index);
    },

    resetVertices: function () {
        this.vertices = new draw2d.util.ArrayList();

        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
    },

    /**
     * @method
     * Update the vertex at the given index. The method call didn't have any effect
     * if the vertex didn't exists.
     *
     * @param {Number} index
     * @param {Number} x
     * @param {Number} y
     */
    setVertex: function (index, x, y) {
        var vertex = this.vertices.get(index);

        // invalid point or nothing todo
        //
        if (vertex === null || (vertex.x === x && vertex.y === y)) {
            return this;
        }

        vertex.x = parseFloat(x);
        vertex.y = parseFloat(y);

        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:vertex");

        return this;
    },

    /**
     * @method
     * Append a new vertex to the polygon.
     *
     * @param {Number} x
     * @param {Number} y
     */
    addVertex: function (x, y) {
        var vertex = null;
        if (x instanceof draw2d.geo.Point) {
            vertex = x.clone();
        }
        else {
            vertex = new draw2d.geo.Point(x, y);
        }
        this.vertices.add(vertex);


        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();

        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });
        this.fireEvent("change:vertices");

        return this;
    },

    /**
     * @method
     * Insert a new vertex at the given index. All vertices will be shifted to
     * free the requested index.
     *
     * @param {Number} index
     * @param {Number} x
     * @param {Number} y
     */
    insertVertexAt: function (index, x, y) {
        var vertex = new draw2d.geo.Point(x, y);

        this.vertices.insertElementAt(vertex, index);

        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();

        if (!this.selectionHandles.isEmpty()) {
            var _this = this;
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                    e.onUnselect(_this.canvas, _this);
                    e.onSelect(_this.canvas, _this);
                }
            });
        }
        this.fireEvent("change:vertices");

        return this;
    },


    /**
     * @method
     * Remove a vertex from the polygon and return the removed point.
     *
     * @param {Number} index
     *
     * @returns {draw2d.geo.Point} the removed vertex
     */
    removeVertexAt: function (index) {
        // a polygon need at least 3 vertices
        //
        if (this.vertices.getSize() <= 3) {
            return null;
        }

        var vertex = this.vertices.removeElementAt(index);

        this.svgPathString = null;
        this.repaint();

        this.updateBoundingBox();

        if (!this.selectionHandles.isEmpty()) {
            var _this = this;
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.figure.SelectionFeedbackPolicy) {
                    e.onUnselect(_this.canvas, _this);
                    e.onSelect(_this.canvas, _this);
                }
            });
        }
        this.fireEvent("change:vertices");

        return vertex;
    },


    /**
     * @inheritdoc
     */
    setRotationAngle: function (angle) {
        this.rotationAngle = 360 % angle;

        // The different to the other figures is, the the vertices must rotated instead of
        // transform the shape with SVG matrix.
        //
        // Reason: the vertices are selectable and in this case the coordinates must transform
        //         and not only the resulting SVG shape.
        //
        var radian = angle / (180 / Math.PI);
        var center = this.getBoundingBox().getCenter();
        var rotate = function (x, y, xm, ym, radian) {
            var cos = Math.cos,
                sin = Math.sin;
            return {
                x: (x - xm) * cos(radian) - (y - ym) * sin(radian) + xm,
                y: (x - xm) * sin(radian) + (y - ym) * cos(radian) + ym
            };
        };

        this.vertices.each(function (i, e) {
            var rot = rotate(e.x, e.y, center.x, center.y, radian);
            e.setPosition(rot.x, rot.y);
        });

        this.updateBoundingBox();


        // Update the resize handles if the user change the position of the element via an API call.
        //
        var _this = this;
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.repaint();
        this.fireEvent("change:angle");

        return this;
    },

    /**
     * @method
     * Calculate the bounding box of the shape and store them in an internal
     * variable for fast access.
     *
     * @private
     */
    updateBoundingBox: function () {
        if (this.vertices.isEmpty()) {
            this.minX = this.x;
            this.minY = this.y;
            this.maxX = this.x + this.width;
            this.maxY = this.y + this.height;
        }
        else {
            this.minX = this.x = Math.min.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
                return n.x;
            }));
            this.minY = this.y = Math.min.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
                return n.y;
            }));
            this.maxX = Math.max.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
                return n.x;
            }));
            this.maxY = Math.max.apply(Math, $.map(this.vertices.asArray(), function (n, i) {
                return n.y;
            }));
            this.width = this.maxX - this.minX;
            this.height = this.maxY - this.minY;
        }
    },


    /**
     * @inheritdoc
     */
    createCommand: function (request) {

        if (request.getPolicy() === draw2d.command.CommandType.MOVE_VERTEX) {
            if (this.isResizeable() === true) {
                return new draw2d.command.CommandMoveVertex(this);
            }
        }

        return this._super(request);
    },


    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        memento.vertices = [];

        this.vertices.each(function (i, e) {
            memento.vertices.push({x: e.x, y: e.y});
        });

        return memento;
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        // restore the points from the JSON data and add them to the polyline
        //
        if (typeof memento.vertices !== "undefined") {
            this.vertices = new draw2d.util.ArrayList();
            var _this = this;
            $.each(memento.vertices, function (i, e) {
                _this.addVertex(e.x, e.y);
            });
        }
    }
});


/**
 * @class draw2d.shape.basic.Diamond
 * A Diamond Figure.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var d1 =  new draw2d.shape.basic.Diamond({x:10,y:10});
 *     var d2 =  new draw2d.shape.basic.Diamond({x:100,y:10, bgColor:"#f0f000", alpha:0.7, width:100, height:60});
 *
 *     canvas.add(d1);
 *     canvas.add(d2);
 *
 *     canvas.setCurrentSelection(d2);
 *
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Diamond = draw2d.shape.basic.Polygon.extend({
    NAME: "draw2d.shape.basic.Diamond",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({bgColor: "#00a3f6", color: "#1B1B1B"}, attr), setter, getter);

        var pos = this.getPosition();

        this.resetVertices();

        var box = this.getBoundingBox();
        this.addVertex(box.w / 2, 0);       // Go to the top center..
        this.addVertex(box.w, box.h / 2); // ...draw line to the right middle
        this.addVertex(box.w / 2, box.h);   // ...bottom center...
        this.addVertex(0, box.h / 2); // ...left middle...

        // override the selection handler from the polygon. Because the vertices of
        // the diamond are not selectable and modifiable
        //
        this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());

        this.setPosition(pos);
    }


});


/**
 * @class draw2d.shape.basic.Triangle
 * A Triangle Figure.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 * @author Andreas Herz
 * @extends draw2d.VectorFigure
 */
draw2d.shape.basic.Triangle = draw2d.shape.basic.Polygon.extend({
    NAME: "draw2d.shape.basic.Triangle",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({bgColor: "#00a3f6", color: "#1B1B1B"}, attr), setter, getter);

        var pos = this.getPosition();

        this.resetVertices();

        var box = this.getBoundingBox();

        this.addVertex(0, box.h / 2);       // Go to the top center..
        this.addVertex(box.w, 0); // ...draw line to the right middle
        this.addVertex(box.w, box.h);   // ...bottom center...

        // override the selection handler from the polygon. Because the vertices of
        // the Triangle are not selectable and modifiable
        //
        this.installEditPolicy(new draw2d.policy.figure.RectangleSelectionFeedbackPolicy());

        this.setPosition(pos);
    }


});

/**
 * @class draw2d.shape.composite.Composite
 * Base interface for the compiste shapes
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 * @since 4.7.2
 */
draw2d.shape.composite.Composite = draw2d.shape.basic.Rectangle.extend({
    NAME: "draw2d.shape.composite.Composite",

    /**
     * @constructor
     * Creates a new composite element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr, setter, getter);
    },

    /**
     * @method
     * Called when a user dbl clicks on the element
     *
     * @template
     */
    onDoubleClick: function () {
        // do nothing per default. no rotation of the shape.
    },

    /**
     * @method
     * Delegate method to calculate if a figure is selectable. A composite has the right to override the
     * initial selectable flag of the figure.
     *
     * @param {draw2d.Figure} figure the figure to test
     * @param {Boolean} selectable the initial selectable flag of the figure
     * @returns
     *
     */
    isMemberSelectable: function (figure, selectable) {
        return selectable;
    },

    /**
     * @method
     * Delegate method to calculate if a figure is draggable. A composite has the right to override the
     * initial draggable flag of the figure.
     *
     * @param {draw2d.Figure} figure the figure to test
     * @param {Boolean} draggable the initial draggable flag of the figure
     * @returns
     *
     */
    isMemberDraggable: function (figure, draggable) {
        return draggable;
    },

    delegateSelectionHandling: function (figure) {
        return figure;
    },

    /**
     * @method
     * Set the canvas element of this figures. This can be used to determine whenever an element
     * is added or removed to the canvas.
     *
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function (canvas) {
        this._super(canvas);

        // an composite shape goes always in the background
        //
        if (canvas !== null) {
            this.toBack();
        }
    }

});

/**
 * @class draw2d.shape.composite.StrongComposite
 * A StrongComposite is a composite figure with strong assignment of the children and the composite.
 * The child knows everything about the assigned composite and receives events about assignment to a
 * composite.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.composite.Composite
 * @since 4.8.0
 */
draw2d.shape.composite.StrongComposite = draw2d.shape.composite.Composite.extend({
    NAME: "draw2d.shape.composite.StrongComposite",

    /**
     * @constructor
     * Creates a new strong composite element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        this.assignedFigures = new draw2d.util.ArrayList();

        this._super(attr, setter, getter);

    },


    /**
     * @method
     * Assign a figure to the composite.
     *
     * @param {draw2d.Figure} figure
     * @template
     */
    assignFigure: function (figure) {
        return this;
    },

    /**
     * @method
     * Remove the given figure from the group assignment
     *
     * @param {draw2d.Figure} figure the figure to remove
     * @template
     */
    unassignFigure: function (figure) {
        return this;
    },

    /**
     * @method
     * Return all assigned figures of the composite
     *
     * @returns {draw2d.util.ArrayList}
     */
    getAssignedFigures: function () {
        return this.assignedFigures;
    },


    /**
     * @method
     * Called if the user drop this element onto the dropTarget. This event is ONLY fired if the
     * shape return "this" in the onDragEnter method.
     *
     *
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since  4.7.4
     **/
    onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
    },

    /**
     * @method
     * Called if the user dropped an figure onto this element. This event is ONLY fired if the
     * shape return "this" in the onDragEnter method.
     *
     *
     * @param {draw2d.Figure} droppedFigure The dropped figure.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @template
     * @since 4.7.4
     **/
    onCatch: function (droppedFigure, x, y, shiftKey, ctrlKey) {
    },

    /**
     * @method
     * Moves the element so it is the closest to the viewer?��s eyes, on top of other elements. Additional
     * the internal model changed as well.
     *
     * Optional: Inserts current object in front of the given one.
     *
     * @param {draw2d.Figure} [figure] move current object in front of the given one.
     */
    toFront: function (figure) {
        this._super(figure);
        // ensure that all assigned figures are in front of the composite
        //
        var figures = this.getAssignedFigures().clone();
        figures.sort(function (a, b) {
            // return 1  if a before b
            // return -1 if b before a
            return a.getZOrder() > b.getZOrder() ? -1 : 1;
        });
        var _this = this;
        figures.each(function (i, f) {
            f.toFront(_this);
        });

        return this;
    },

    toBack: function (figure) {
        this._super(figure);
        // ensure that all assigned figures are in front of the composite
        //
        var figures = this.getAssignedFigures().clone();
        figures.sort(function (a, b) {
            // return 1  if a before b
            // return -1 if b before a
            return a.getZOrder() > b.getZOrder() ? -1 : 1;
        });

        var _this = this;
        figures.each(function (i, f) {
            f.toBack(_this);
        });

        return this;
    }
});


/**
 * @class draw2d.shape.composite.Group
 *
 * A group is a figure that acts as a transparent container for other figures. A group
 * is a StrongComposite node that controls a set of child figures. The bounding rectangle of
 * a group is the union of the bounds of its children. Child nodes cannot be selected or
 * manipulated individually.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.composite.StrongComposite
 * @since 4.8.0
 */
draw2d.shape.composite.Group = draw2d.shape.composite.StrongComposite.extend({
    NAME: "draw2d.shape.composite.Group",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({bgColor: null, color: null, resizeable: false}, attr), setter, getter);


        this.stickFigures = false;
    },

    /**
     * @method
     * Checks whenever a figure is selectable. In case of a group a single figure
     * isn't selectable. Just a complete group can be selected.
     *
     * @param {draw2d.Figure} figure the figure to check
     */
    delegateSelectionHandling: function (figure) {
        return this;
    },


    /**
     * @method
     * Delegate method to calculate if a figure is selectable. A composite has the right to override the
     * initial selectable flag of the figure.
     *
     * @param {draw2d.Figure} figure the figure to test
     * @param {Boolean} selectable the initial selectable flag of the figure
     * @returns
     *
     */
    isMemberSelectable: function (figure, selectable) {
        return false;
    },

    /**
     * @method
     * Delegate method to calculate if a figure is draggable. A composite has the right to override the
     * initial draggable flag of the figure.
     * <br>
     * Returns false because only the complete group is draggable
     *
     * @param {draw2d.Figure} figure the figure to test
     * @param {Boolean} draggable the initial draggable flag of the figure
     * @returns
     *
     */
    isMemberDraggable: function (figure, draggable) {
        return false;
    },

    /**
     * @method
     * Set the position of the object.
     *
     * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure
     * @param {Number} [y] The new y coordinate of the figure
     **/
    setPosition: function (x, y) {
        var oldX = this.x;
        var oldY = this.y;


        this._super(x, y);

        var dx = this.x - oldX;
        var dy = this.y - oldY;

        if (dx === 0 && dy === 0) {
            return this;
        }

        if (this.stickFigures === false) {
            this.assignedFigures.each(function (i, figure) {
                figure.translate(dx, dy);
            });
        }

        return this;
    },

    /**
     * @method
     * Assign a figure to the given group.
     * The bounding box of the group is recalculated and the union of the current bounding box with the
     * figure bounding box.
     *
     * @param {draw2d.Figure} figure
     */
    assignFigure: function (figure) {
        if (!this.assignedFigures.contains(figure)) {
            this.stickFigures = true;
            if (this.assignedFigures.isEmpty() === true) {
                this.setBoundingBox(figure.getBoundingBox());
            }
            else {
                this.setBoundingBox(this.getBoundingBox().merge(figure.getBoundingBox()));
            }
            this.assignedFigures.add(figure);
            figure.setComposite(this);
            this.stickFigures = false;
        }
        return this;
    },

    /**
     * @method
     * Remove the given figure from the group assignment
     *
     * @param {draw2d.Figure} figure the figure to remove
     *
     */
    unassignFigure: function (figure) {
        if (this.assignedFigures.contains(figure)) {
            this.stickFigures = true;
            figure.setComposite(null);
            this.assignedFigures.remove(figure);
            if (!this.assignedFigures.isEmpty()) {
                var box = this.assignedFigures.first().getBoundingBox();
                this.assignedFigures.each(function (i, figure) {
                    box.merge(figure.getBoundingBox());
                });
                this.setBoundingBox(box);
            }
            this.stickFigures = false;
        }

        return this;
    }
});


/**
 * @class draw2d.shape.composite.Jailhouse
 *
 * A Jailhouse is a figure that acts as a container for other figures. A Jailhouse
 * is a StrongComposite node that controls a set of child figures. Child nodes can't
 * moved outside of the composite.<br>
 * Objects in a jailhouse have the same Z-order, which can be relatively controlled with
 * respect to other figures.
 *
 * @author Andreas Herz
 * @extends draw2d.shape.composite.StrongComposite
 * @since 4.8.0
 */
draw2d.shape.composite.Jailhouse = draw2d.shape.composite.StrongComposite.extend({
    NAME: "draw2d.shape.composite.Jailhouse",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.policy = new draw2d.policy.figure.RegionEditPolicy(0, 0, 10, 10);
        this._super($.extend({bgColor: "#f0f0f0", color: "#333333"}, attr), setter, getter);

        this.stickFigures = false;
    },

    /**
     * @method
     * Set the new width and height of the figure and update the constraint policy for the assigned
     * figures..
     *
     * @param {Number} w The new width of the figure
     * @param {Number} h The new height of the figure
     **/
    setDimension: function (w, h) {
        this._super(w, h);
        this.policy.setBoundingBox(this.getAbsoluteBounds());
    },

    /**
     * @method
     * Return the figure which handles the selection handling. In case of a jailhouse, all
     * assigned figures are selectable and this method return always the "figure" parameter.
     *
     * @param {draw2d.Figure} figure the figure which requests the selection
     * @returns
     */
    delegateSelectionHandling: function (figure) {
        return figure;
    },


    /**
     * @method
     * Set the position of the object.
     *
     * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure
     * @param {Number} [y] The new y coordinate of the figure
     **/
    setPosition: function (x, y) {
        var oldX = this.x;
        var oldY = this.y;


        this._super(x, y);

        var dx = this.x - oldX;
        var dy = this.y - oldY;

        if (dx === 0 && dy === 0) {
            return this;
        }
        this.policy.setBoundingBox(this.getAbsoluteBounds());

        if (this.stickFigures === false) {
            this.assignedFigures.each(function (i, figure) {
                figure.translate(dx, dy);
            });
        }

        return this;
    },

    /**
     * @method
     * Assign a figure to the given group.
     * The bounding box of the group is recalculated and the union of the current bounding box with the
     * figure bounding box.
     *
     * @param {draw2d.Figure} figure
     */
    assignFigure: function (figure) {
        if (!this.assignedFigures.contains(figure) && figure !== this) {
            this.stickFigures = true;
            this.setBoundingBox(this.getBoundingBox().merge(figure.getBoundingBox()));
            this.assignedFigures.add(figure);
            figure.setComposite(this);
            figure.installEditPolicy(this.policy);
            figure.toFront(this);
            this.stickFigures = false;
        }
        return this;
    },

    /**
     * @method
     * Remove the given figure from the group assignment
     *
     * @param {draw2d.Figure} figure the figure to remove
     *
     */
    unassignFigure: function (figure) {
        if (this.assignedFigures.contains(figure)) {
            this.stickFigures = true;
            figure.setComposite(null);
            figure.uninstallEditPolicy(this.policy);
            this.assignedFigures.remove(figure);
            if (!this.assignedFigures.isEmpty()) {
                var box = this.assignedFigures.first().getBoundingBox();
                this.assignedFigures.each(function (i, figure) {
                    box.merge(figure.getBoundingBox());
                });
                this.setBoundingBox(box);
            }
            this.stickFigures = false;
        }

        return this;
    },

    onCatch: function (droppedFigure, x, y, shiftKey, ctrlKey) {
        this.getCanvas().getCommandStack().execute(new draw2d.command.CommandAssignFigure(droppedFigure, this));
    },


    /**
     * @method
     * Return the minWidth of the jailhouse. The minWidth is calculated by care the assigned figures.
     *
     *
     * @private
     * @returns
     */
    getMinWidth: function () {
        var width = 0;
        this.assignedFigures.each(function (i, figure) {
            width = Math.max(width, figure.getBoundingBox().getRight());
        });
        return width - this.getAbsoluteX();
    },

    /**
     * @method
     *
     * @private
     * @returns
     */
    getMinHeight: function () {
        var height = 0;
        this.assignedFigures.each(function (i, figure) {
            height = Math.max(height, figure.getBoundingBox().getBottom());
        });
        return height - this.getAbsoluteY();
    }
});


/**
 * @class draw2d.shape.composite.WeakComposite
 * A WeakComposite is a composite figure with loose coupling of the children and the composite.
 * The child didn't know anything about the assigned composite nor did they receive any events
 * about assignment to a composite.
 *
 * Assignment without obligation.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.composite.Composite
 * @since 4.8.0
 */
draw2d.shape.composite.WeakComposite = draw2d.shape.composite.Composite.extend({
    NAME: "draw2d.shape.composite.WeakComposite",

    /**
     * @constructor
     * Creates a new weak composite element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr, setter, getter);
    }
});


/**
 * @class draw2d.shape.composite.Raft
 * Raft figures are shapes, which aggregate multiple figures. It works like a real raft. Aboard figures are
 * moved if the raft figures moves.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var rect1 =  new draw2d.shape.composite.Raft({width:200, height:100});
 *     var rect2 =  new draw2d.shape.basic.Rectangle({width:50, height:50});
 *
 *     canvas.add(rect1,10,10);
 *     canvas.add(rect2,20,20);
 *
 *     rect2.attr({bgColor:"#f0f000", width:50, height:50, radius:10});
 *
 *     canvas.setCurrentSelection(rect1);
 *
 * @author Andreas Herz
 * @extends draw2d.shape.composite.WeakComposite
 * @since 4.7.0
 */
draw2d.shape.composite.Raft = draw2d.shape.composite.WeakComposite.extend({
    NAME: "draw2d.shape.composite.Raft",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        this.aboardFigures = new draw2d.util.ArrayList();

        this._super($.extend({bgColor: "#f0f0f0", color: "#1B1B1B"}, attr), setter, getter);
    },


    /**
     * @method
     * Will be called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean} true if the figure accepts dragging
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {
        this._super(x, y, shiftKey, ctrlKey);

        this.aboardFigures = new draw2d.util.ArrayList();
        // force the recalculation of the aboard figures if the shape is in a drag&drop operation
        this.getAboardFigures(this.isInDragDrop);
    },

    /**
     * @method
     * Set the position of the object.
     *
     * @param {Number/draw2d.geo.Point} x The new x coordinate of the figure
     * @param {Number} [y] The new y coordinate of the figure
     **/
    setPosition: function (x, y) {
        var oldX = this.x;
        var oldY = this.y;

        // we need the figures before the composite has moved. Otherwise some figures are fall out of the raft
        //
        var aboardedFigures = this.getAboardFigures(this.isInDragDrop === false);

        this._super(x, y);

        var dx = this.x - oldX;
        var dy = this.y - oldY;

        if (dx === 0 && dy === 0) {
            return this;
        }

        aboardedFigures.each(function (i, figure) {
            figure.translate(dx, dy);
        });

        return this;
    },

    /**
     * @method
     * Return all figures which are aboard of this shape. These shapes are moved as well if the raft
     * is moving.
     *
     * @returns {draw2d.util.ArrayList}
     */
    getAboardFigures: function (recalculate) {
        if (recalculate === true && this.canvas !== null) {
            var raftBoundingBox = this.getBoundingBox();
            var zIndex = this.getZOrder();
            this.aboardFigures = new draw2d.util.ArrayList();

            var _this = this;
            this.getCanvas().getFigures().each(function (i, figure) {
                if (figure !== _this && figure.isSelectable() === true && figure.getBoundingBox().isInside(raftBoundingBox)) {
                    // Don't add the figure if it is already catched by another composite with a higher z-index
                    //
                    if (_this.getNextComposite(figure) !== _this) {
                        return;
                    }
                    // only add the shape if it is in front of the raft
                    if (figure.getZOrder() > zIndex) {
                        _this.aboardFigures.add(figure);
                    }
                }
            });
        }
        return this.aboardFigures;
    },

    /**
     * @method
     * return the next potential composite parent figure
     *
     * @param figureToTest
     * @returns
     */
    getNextComposite: function (figureToTest) {
        var nextComposite = null;
        this.getCanvas().getFigures().each(function (i, figure) {
            if (figureToTest === figure) {
                return;
            }
            if (figure instanceof draw2d.shape.composite.Composite) {
                if (nextComposite !== null && nextComposite.getZOrder() > figure.getZOrder()) {
                    return;
                }

                if (figure.getBoundingBox().contains(figureToTest.getBoundingBox())) {
                    nextComposite = figure;
                }
            }
        });

        return nextComposite;
    }
});


/**
 * @class draw2d.Connection
 * See the example:
 *
 *     @example preview small frame
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.Connection();
 *
 *     // Set the endpoint decorations for the connection
 *     //
 *     c.setSourceDecorator(new draw2d.decoration.connection.BarDecorator());
 *     c.setTargetDecorator(new draw2d.decoration.connection.DiamondDecorator());
 *     // Connect the endpoints with the start and end port
 *     //
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 * Connections figures are used to display a line between two points. The Connection interface extends
 * {@link draw2d.shape.basic.PolyLine PolyLine}.<br>
 * The source and target endpoints of a connection are each defined using a {@link draw2d.layout.anchor.ConnectionAnchor ConnectionAnchor}.
 * These endpoints, along with any other points on the connection, are set by the connection's  {@link draw2d.layout.connection.ConnectionRouter ConnectionRouter}.
 * <br>
 * Usually every connection in a drawing has the same router instance. Connections with
 * common endpoints can share anchor instances as well.
 *
 * <h2>Connection Usage</h2>
 *
 * Connections are created and added just like any other figure. Unlike normal figures, you must not set the
 * bounds of a connection. Instead, you must provide the source and target port and let the connection router
 * calculate the connection's points. The connection then determines its own bounding box.<br>
 * <br>
 * A connection has a simple router by default - one that can connect the source and target anchors. But additional routers
 * are available and can be set on the connection. Some routers can handle constraints for the connection. Note that when
 * setting a routing constraint on a connection, you must first set the router which will use that constraint.<br>
 * <br>
 *
 * <b>TODO:<br></b>
 * <i>
 * A convenient way to share the router with all connections and to place connections above the drawing is to use a
 * ConnectionLayer. The layer has a connection router property which it shares with every child that's a connection.
 * You can update this property and easily change every connection's router at once.
 * </i>
 * <br>
 * <br>
 * <h2>Routing and Anchors</h2>
 * A connection always has a router and it must set at least two ports on the connection: the source and target
 * endpoints. By default, or when set to null, the connection's routing will be performed by an internal default router.
 * The ends are placed with the help of {@link draw2d.layout.anchor.ConnectionAnchor anchors}. An
 * {@link draw2d.layout.anchor.ConnectionAnchor anchors} is a fixed or calculated location, usually associated with some
 * figure. For example, the {@link draw2d.layout.anchor.ChopboxConnectionAnchor ChopboxAnchor} finds the point at which a
 * line going to the reference point intersects a box, such as the bounds of a figure. The reference point is either
 * the anchor at the opposite end, or a bendpoint or some other point nearest to the anchor.
 * <br>
 * {@img jsdoc_chopbox.gif ChopboxAnchor}
 * <br>
 * The router calculates the endpoints and any other points in the middle of the connection. It then sets the points on the
 * connection by calling {@link draw2d.shape.basic.PolyLine#addPoint Polyline.addPoint}. The connection's existing point list
 * can be reused to reduce garbage, but the points must be set on the connection anyway so that it knows about any changes made.
 * <br>
 * <h2>Adding Decorations and Children to Connections</h2>
 * Like most figures, Connection supports the addition of children. The children might be a label that
 * decorate the connection. The placement of each type of decoration can vary, so a {@link draw2d.layout.locator.ConnectionLocator ConnectionLocator}
 * is used to delegate to each child's constraint object, a Locator. <br>
 * <br>
 * {@link draw2d.decoration.connection.Decorator Decorator} can be used to create and render a rotatable shape at
 * the end or start of a connection like arrows or boxes. Examples are {@link draw2d.decoration.connection.ArrowDecorator ArrowDecorator}, {@link draw2d.decoration.connection.BarDecorator BarDecorator} or {@link draw2d.decoration.connection.CircleDecorator CircleDecorator}
 * <br>
 * <h2>Connection Layout</h2>
 * Connections extend the process of validation and layout to include routing. Since layout is the process of positioning children, routing must
 * come first. This allows a child's locator to operate on the connection's newly-routed points.<br>
 * Check out [Class System Guide](#!/guide/class_system) for additional reading.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.PolyLine
 */
draw2d.Connection = draw2d.shape.basic.PolyLine.extend({
    NAME: "draw2d.Connection",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        this.sourcePort = null;
        this.targetPort = null;

        this.oldPoint = null;

        this.sourceDecorator = null;
        /*:draw2d.ConnectionDecorator*/
        this.targetDecorator = null;
        /*:draw2d.ConnectionDecorator*/

        // decoration of the polyline
        //
        this.sourceDecoratorNode = null;
        this.targetDecoratorNode = null;

        this.isMoving = false;

        var _this = this;
        this.moveListener = function (figure) {
            if (figure === _this.sourcePort) {
                _this.setStartPoint(_this.sourcePort.getAbsoluteX(), _this.sourcePort.getAbsoluteY());
            }
            else {
                _this.setEndPoint(_this.targetPort.getAbsoluteX(), _this.targetPort.getAbsoluteY());
            }
        };

        this._super(
            $.extend({color: "#1b1b1b", stroke: 1}, attr),
            $.extend({
                router: this.setRouter,
                sourceDecorator: this.setSourceDecorator,
                targetDecorator: this.setTargetDecorator,
                source: this.setSource,
                target: this.setTarget
            }, setter),
            $.extend({
                router: this.getRouter,
                sourceDecorator: this.getSourceDecorator,
                targetDecorator: this.getTargetDecorator,
                source: this.getSource,
                target: this.getTarget
            }, getter)
        );
    },


    /**
     * @private
     **/
    disconnect: function () {
        if (this.sourcePort !== null) {
            this.sourcePort.off(this.moveListener);
            this.sourcePort.connections.remove(this);
            this.fireSourcePortRouteEvent();
        }

        if (this.targetPort !== null) {
            this.targetPort.off(this.moveListener);
            this.targetPort.connections.remove(this);
            this.fireTargetPortRouteEvent();
        }
    },


    /**
     * @private
     **/
    reconnect: function () {
        if (this.sourcePort !== null) {
            this.sourcePort.on("move", this.moveListener);
            this.sourcePort.connections.add(this);
            this.fireSourcePortRouteEvent();
        }

        if (this.targetPort !== null) {
            this.targetPort.on("move", this.moveListener);
            this.targetPort.connections.add(this);
            this.fireTargetPortRouteEvent();
        }
        this.routingRequired = true;
        this.repaint();
    },


    /**
     * You can't drag&drop the resize handles of a connector.
     * @type boolean
     **/
    isResizeable: function () {
        return this.isDraggable();
    },


    /**
     * @method
     * Add a child figure to the Connection. The hands over figure doesn't support drag&drop
     * operations. It's only a decorator for the connection.<br>
     * Mainly for labels or other fancy decorations :-)
     *
     * @param {draw2d.Figure} figure the figure to add as decoration to the connection.
     * @param {draw2d.layout.locator.ConnectionLocator} locator the locator for the child.
     **/
    add: function (child, locator) {
        // just to ensure the right interface for the locator.
        // The base class needs only 'draw2d.layout.locator.Locator'.
        if (!(locator instanceof draw2d.layout.locator.ConnectionLocator)) {
            throw "Locator must implement the class draw2d.layout.locator.ConnectionLocator";
        }

        this._super(child, locator);
    },


    /**
     * @method
     * Set the ConnectionDecorator for this object.
     *
     * @param {draw2d.decoration.connection.Decorator} the new source decorator for the connection
     **/
    setSourceDecorator: function (decorator) {
        this.sourceDecorator = decorator;
        this.routingRequired = true;
        if (this.sourceDecoratorNode !== null) {
            this.sourceDecoratorNode.remove();
            this.sourceDecoratorNode = null;
        }
        this.repaint();
    },

    /**
     * @method
     * Get the current source ConnectionDecorator for this object.
     *
     * @returns draw2d.decoration.connection.Decorator
     **/
    getSourceDecorator: function () {
        return this.sourceDecorator;
    },

    /**
     * @method
     * Set the ConnectionDecorator for this object.
     *
     * @param {draw2d.decoration.connection.Decorator} the new target decorator for the connection
     **/
    setTargetDecorator: function (decorator) {
        this.targetDecorator = decorator;
        this.routingRequired = true;
        if (this.targetDecoratorNode !== null) {
            this.targetDecoratorNode.remove();
            this.targetDecoratorNode = null;
        }
        this.repaint();
    },

    /**
     * @method
     * Get the current target ConnectionDecorator for this object.
     *
     * @returns draw2d.decoration.connection.Decorator
     **/
    getTargetDecorator: function () {
        return this.targetDecorator;
    },


    /**
     * @method
     * Calculate the path of the polyline.
     *
     * @private
     */
    calculatePath: function () {

        if (this.sourcePort === null || this.targetPort === null) {
            return this;
        }

        this._super();

        return this;
    },

    /**
     * @private
     **/
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        if (this.sourcePort === null || this.targetPort === null) {
            return;
        }


        this._super(attributes);

        // paint the decorator if any exists
        //
        if (this.targetDecorator !== null && this.targetDecoratorNode === null) {
            this.targetDecoratorNode = this.targetDecorator.paint(this.getCanvas().paper);
        }

        if (this.sourceDecorator !== null && this.sourceDecoratorNode === null) {
            this.sourceDecoratorNode = this.sourceDecorator.paint(this.getCanvas().paper);
        }

        var _this = this;

        // translate/transform the decorations to the end/start of the connection
        // and rotate them as well
        //
        if (this.sourceDecoratorNode !== null) {
            var start = this.getVertices().first();
            this.sourceDecoratorNode.transform("r" + this.getStartAngle() + "," + start.x + "," + start.y + " t" + start.x + "," + start.y);
            // propagate the color and the opacity to the decoration as well
            this.sourceDecoratorNode.attr({"stroke": "#" + this.lineColor.hex(), opacity: this.alpha});
            this.sourceDecoratorNode.forEach(function (shape) {
                shape.node.setAttribute("class", _this.cssClass !== null ? _this.cssClass : "");
            });
        }

        if (this.targetDecoratorNode !== null) {
            var end = this.getVertices().last();
            this.targetDecoratorNode.transform("r" + this.getEndAngle() + "," + end.x + "," + end.y + " t" + end.x + "," + end.y);
            this.targetDecoratorNode.attr({"stroke": "#" + this.lineColor.hex(), opacity: this.alpha});
            this.targetDecoratorNode.forEach(function (shape) {
                shape.node.setAttribute("class", _this.cssClass !== null ? _this.cssClass : "");
            });
        }

    },

    /**
     * @method
     * The x-offset related to the canvas.
     * Didn't provided by a connection. Return always '0'. This is required
     * for children position calculation. (e.g. Label decoration)
     *
     * @return {Number} the x-offset to the parent figure
     **/
    getAbsoluteX: function () {
        return 0;
    },


    /**
     * @method
     * The y-offset related to the canvas.
     * Didn't provided by a connection. Return always '0'. This is required
     * for children position calculation. (e.g. Label decoration)
     *
     * @return {Number} The y-offset to the parent figure.
     **/
    getAbsoluteY: function () {
        return 0;
    },


    postProcess: function (postProcessCache) {
        this.router.postProcess(this, this.getCanvas(), postProcessCache);
    },


    /**
     * @method
     * Don't call them manually. This will be done by the framework.<br>
     * Will be called if the object are moved via drag and drop.
     * Sub classes can override this method to implement additional stuff. Don't forget to call
     * the super implementation via <code>this._super(dx, dy, dx2, dy2);</code>
     * @private
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        if (this.command === null) {
            return;
        }

        this.command.setTranslation(dx, dy);

        // don't drag start/end around. This Points are bounded to the related
        // ports.
        var count = this.getVertices().getSize() - 1;
        for (var i = 1; i < count; i++) {
            this.getVertex(i).translate(dx2, dy2);

        }

        var _this = this;

        // notify all installed policies
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.onDrag(_this.canvas, _this);
            }
        });

        this.svgPathString = null;
        this.repaint();

        // Update the resize handles if the user change the position of the
        // element via an API call.
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.moved(_this.canvas, _this);
            }
        });

        this.fireEvent("move");
    },


    /**
     * @method
     * Called if the DragDrop object leaving the current hover figure.
     *
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     * @template
     **/
    onDragLeave: function (draggedFigure) {
//    	this.setGlow(false);
    },


    /**
     * @method
     * Return the recalculated position of the start point with the usage of
     * the installed connection anchor locator.
     *
     * @return draw2d.geo.Point
     **/
    getStartPoint: function (refPoint) {
        if (this.isMoving === false) {
            if (refPoint) {
                return this.sourcePort.getConnectionAnchorLocation(refPoint, this);
            }
            return this.sourcePort.getConnectionAnchorLocation(this.targetPort.getConnectionAnchorReferencePoint(this), this);
        }

        return this._super();
    },


    /**
     * @method
     * Return the recalculated position of the start point with the usage of
     * the installed connection anchor locator.
     *
     * @return draw2d.geo.Point
     **/
    getEndPoint: function (refPoint) {
        if (this.isMoving === false) {
            if (refPoint) {
                return this.targetPort.getConnectionAnchorLocation(refPoint, this);
            }
            return this.targetPort.getConnectionAnchorLocation(this.sourcePort.getConnectionAnchorReferencePoint(this), this);
        }

        return this._super();
    },

    /**
     * @method
     * Set the new source port of this connection. This enforce a repaint of the connection.
     *
     * @param {draw2d.Port} port The new source port of this connection.
     *
     **/
    setSource: function (port) {
        if (this.sourcePort !== null) {
            this.sourcePort.off(this.moveListener);
            this.sourcePort.connections.remove(this);
            this.sourcePort.fireEvent("disconnect", this);
            this.canvas.fireEvent("disconnect", {"port": this.sourcePort, "connection": this});
            this.sourcePort.onDisconnect(this);
        }

        this.sourcePort = port;
        if (this.sourcePort === null) {
            return;
        }

        this.routingRequired = true;
        this.fireSourcePortRouteEvent();
        if(this.sourcePort != undefined) {
            this.sourcePort.connections.add(this);
            this.sourcePort.on("move", this.moveListener);
        }

        if (this.canvas !== null) {
            this.canvas.fireEvent("connect", {"port": this.sourcePort, "connection": this});
            this.sourcePort.fireEvent("connect", this);
            this.sourcePort.onConnect(this);
        }
        this.setStartPoint(port.getAbsoluteX(), port.getAbsoluteY());
    },

    /**
     * @method
     * Returns the source port of this connection.
     *
     * @type draw2d.Port
     **/
    getSource: function () {
        return this.sourcePort;
    },

    /**
     * @method
     * Set the target port of this connection. This enforce a repaint of the connection.
     *
     * @param {draw2d.Port} port The new target port of this connection
     **/
    setTarget: function (port) {
        if (this.targetPort !== null) {
            this.targetPort.off(this.moveListener);
            this.targetPort.connections.remove(this);
            this.targetPort.fireEvent("disconnect", this);
            this.canvas.fireEvent("disconnect", {"port": this.targetPort, "connection": this});
            this.targetPort.onDisconnect(this);
        }

        this.targetPort = port;
        if (this.targetPort === null) {
            return;
        }

        this.routingRequired = true;
        this.fireTargetPortRouteEvent();
        this.targetPort.connections.add(this);
        this.targetPort.on("move", this.moveListener);
        if (this.canvas !== null) {
            this.canvas.fireEvent("connect", {"port": this.targetPort, "connection": this});
            this.targetPort.fireEvent("connect", this);
            this.targetPort.onConnect(this);
        }
        this.setEndPoint(port.getAbsoluteX(), port.getAbsoluteY());
    },

    /**
     * @method
     * Returns the target port of this connection.
     *
     * @type draw2d.Port
     **/
    getTarget: function () {
        return this.targetPort;
    },

    /**
     * @method
     * Method returns true if the connection has at least one common draw2d.Port with the given connection.
     *
     * @param {draw2d.Connection} other
     * @returns {Boolean}
     */
    sharingPorts: function (other) {
        return this.sourcePort == other.sourcePort ||
            this.sourcePort == other.targetPort ||
            this.targetPort == other.sourcePort ||
            this.targetPort == other.targetPort;
    },


    /**
     * @method
     * Set the canvas element of this figures.
     *
     * @param {draw2d.Canvas} canvas the new parent of the figure or null
     */
    setCanvas: function (canvas) {
        var notiCanvas = this.canvas == null ? canvas : this.canvas;

        this._super(canvas);


        if (this.sourceDecoratorNode !== null) {
            this.sourceDecoratorNode.remove();
            this.sourceDecoratorNode = null;
        }

        if (this.targetDecoratorNode !== null) {
            this.targetDecoratorNode.remove();
            this.targetDecoratorNode = null;
        }

        if (this.canvas === null) {
            this.router.onUninstall(this);

            if (this.sourcePort !== null) {
                this.sourcePort.off(this.moveListener);
                notiCanvas.fireEvent("disconnect", {"port": this.sourcePort, "connection": this});
                this.sourcePort.onDisconnect(this);
            }
            if (this.targetPort !== null) {
                this.targetPort.off(this.moveListener);
                notiCanvas.fireEvent("disconnect", {"port": this.targetPort, "connection": this});
                this.targetPort.onDisconnect(this);
            }
        }
        else {
            this.router.onInstall(this);

            if (this.sourcePort !== null) {
                this.sourcePort.on("move", this.moveListener);
                this.canvas.fireEvent("connect", {"port": this.sourcePort, "connection": this});
                this.sourcePort.onConnect(this);
            }
            if (this.targetPort !== null) {
                this.targetPort.on("move", this.moveListener);
                this.canvas.fireEvent("connect", {"port": this.targetPort, "connection": this});
                this.targetPort.onConnect(this);
            }
        }

    },


    /**
     * Returns the angle of the connection at the output port (source)
     *
     **/
    getStartAngle: function () {
        // return a good default value if the connection is not routed at the
        //  moment
        if (this.lineSegments.getSize() === 0) {
            return 0;
        }

        var p1 = this.lineSegments.get(0).start;
        var p2 = this.lineSegments.get(0).end;
        if (this.router instanceof draw2d.layout.connection.SplineConnectionRouter) {
            p2 = this.lineSegments.get(5).end;
        }
        var length = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        var angle = -(180 / Math.PI) * Math.asin((p1.y - p2.y) / length);

        if (angle < 0) {
            if (p2.x < p1.x) {
                angle = Math.abs(angle) + 180;
            }
            else {
                angle = 360 - Math.abs(angle);
            }
        }
        else {
            if (p2.x < p1.x) {
                angle = 180 - angle;
            }
        }
        return angle;
    },

    getEndAngle: function () {
        // return a good default value if the connection is not routed at the
        //  moment
        if (this.lineSegments.getSize() === 0) {
            return 90;
        }

        var p1 = this.lineSegments.get(this.lineSegments.getSize() - 1).end;
        var p2 = this.lineSegments.get(this.lineSegments.getSize() - 1).start;
        if (this.router instanceof draw2d.layout.connection.SplineConnectionRouter) {
            p2 = this.lineSegments.get(this.lineSegments.getSize() - 5).end;
        }
        var length = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        var angle = -(180 / Math.PI) * Math.asin((p1.y - p2.y) / length);

        if (angle < 0) {
            if (p2.x < p1.x) {
                angle = Math.abs(angle) + 180;
            }
            else {
                angle = 360 - Math.abs(angle);
            }
        }
        else {
            if (p2.x < p1.x) {
                angle = 180 - angle;
            }
        }
        return angle;
    },


    /**
     * @private
     **/
    fireSourcePortRouteEvent: function () {
        if(this.sourcePort == undefined) {
            return;
        }
        this.sourcePort.getConnections().each(function (i, conn) {
            conn.routingRequired = true;
            conn.repaint();
        });
    },

    /**
     * @private
     **/
    fireTargetPortRouteEvent: function () {
        // enforce a repaint of all connections which are related to this port
        // this is required for a "FanConnectionRouter" or "ShortesPathConnectionRouter"
        //
        this.targetPort.getConnections().each(function (i, conn) {
            conn.routingRequired = true;
            conn.repaint();
        });
    },


    /**
     * @method
     * Returns the Command to perform the specified Request or null.
     *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     * @return {draw2d.command.Command} null or a Command
     **/
    createCommand: function (request) {
        if (request.getPolicy() === draw2d.command.CommandType.MOVE_BASEPOINT) {
            // DragDrop of a connection doesn't create a undo command at this point. This will be done in
            // the onDrop method
            return new draw2d.command.CommandReconnect(this);
        }

        return this._super(request);
    },


    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        var parentNode = this.getSource().getParent();
        while (parentNode.getParent() !== null) {
            parentNode = parentNode.getParent();
        }
        memento.source = {
            node: parentNode.getId(),
            port: this.getSource().getName()
        };

        var parentNode = this.getTarget().getParent();
        while (parentNode.getParent() !== null) {
            parentNode = parentNode.getParent();
        }
        memento.target = {
            node: parentNode.getId(),
            port: this.getTarget().getName()
        };

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        // nothing to to for the connection creation. This will be done in the draw2d.io.Reader
        // implementation
        //
    }
});

/**
 * @method
 * Factory method to provide a default connection for all drag&drop connections. You
 * can override this method and customize this for your personal purpose.
 *
 * Either you return a conection of "undefined". If "undefined" returned the "callback" must
 * be called by this method.
 *
 * @param {draw2d.Port} sourcePort port of the source of the connection
 * @param {draw2d.Port} targetPort port of the target of the connection
 * @template
 * @returns {draw2d.Connection}
 */
draw2d.Connection.createConnection = function (sourcePort, targetPort, callback, dropTarget) {

    return new draw2d.Connection();
};


/**
 * The default ConnectionRouter for the running applicaiton. Set this to your wanted implementation
 * {@link draw2d.layout.connection.ConnectionRouter}
 */
draw2d.Connection.DEFAULT_ROUTER = new draw2d.layout.connection.ManhattanConnectionRouter();

/**
 * @class draw2d.VectorFigure
 * The base class for all vector based figures like {@link draw2d.shape.basic.Rectangle}  or {@link draw2d.shape.basic.Oval}
 * inside a canvas.
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.node.Node
 */
draw2d.VectorFigure = draw2d.shape.node.Node.extend({
    NAME: "draw2d.VectorFigure",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.stroke = 1;
        this.radius = 0;
        this.bgColor = new draw2d.util.Color("#ffffff");
        this.color = new draw2d.util.Color("#303030");

        // memento for the stroke if we reset the glow effect of this shape
        //
        this.strokeBeforeGlow = this.stroke;
        this.glowIsActive = false;

        this._super(attr,
            $.extend({
                /** @attr {Number} radius the radius to render the line edges */
                radius: this.setRadius,
                /** @attr {String|draw2d.util.Color} bgColor the background color of the shape */
                bgColor: this.setBackgroundColor,
                /** @attr {String|draw2d.util.Color} color the main color of the shape */
                color: this.setColor,
                /** @attr {Number} stroke the stroke width */
                stroke: this.setStroke
            }, setter),
            $.extend({
                radius: this.getRadius,
                bgColor: this.getBackgroundColor,
                color: this.getColor,
                stroke: this.getStroke
            }, getter)
        );
    },

    /**
     * @method
     * Sets the corner radius or the edges.
     *
     * @param {Number} radius
     * @since 4.2.1
     */
    setRadius: function (radius) {
        this.radius = radius;
        this.repaint();
        this.fireEvent("change:radius");

        return this;
    },

    /**
     * @method
     * Get the corner radius of the edges.
     *
     * @return {Number}
     * @since 4.2.1
     */
    getRadius: function () {
        return this.radius;
    },


    /**
     * @method
     * Highlight the element or remove the highlighting
     *
     * @param {Boolean} flag indicates glow/noGlow
     */
    setGlow: function (flag) {

        if (flag === this.glowIsActive) {
            return this;
        }

        this.glowIsActive = flag;
        if (flag === true) {
            this.strokeBeforeGlow = this.getStroke();
            this.setStroke(this.strokeBeforeGlow * 2.5);
        }
        else {
            this.setStroke(this.strokeBeforeGlow);
        }

        return this;
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        attributes.x = this.getAbsoluteX();
        attributes.y = this.getAbsoluteY();

        if (typeof attributes.stroke === "undefined") {
            if (this.color === null || this.stroke === 0) {
                attributes.stroke = "none";
            }
            else {
                attributes.stroke = this.color.hash();
            }
        }

        if (typeof attributes["stroke-width"] === "undefined") {
            attributes["stroke-width"] = this.stroke;
        }

        if (typeof attributes.fill === "undefined") {
            attributes.fill = this.bgColor.hash();
        }

        this._super(attributes);

        return this;
    },


    /**
     * @method
     * Set the new background color of the figure. It is possible to hands over
     * <code>null</code> to set the background transparent.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        "bgColor": "#f0f0f0"
    *      });
     *
     * @param {String|draw2d.util.Color} color The new background color of the figure
     **/
    setBackgroundColor: function (color) {
        this.bgColor = new draw2d.util.Color(color);

        this.repaint();
        this.fireEvent("change:bgColor");

        return this;
    },

    /**
     * @method
     * The current used background color.
     *
     *      // Alternatively you can use the attr method:
     *      var color =figure.attr("bgColor");
     *
     * @return {draw2d.util.Color}
     */
    getBackgroundColor: function () {
        return this.bgColor;
    },

    /**
     * @method
     * Set the stroke to use.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        "stroke": 2
    *      });
     *
     * @param {Number} w The new line width of the figure
     **/
    setStroke: function (w) {
        this.stroke = w;
        this.repaint();
        this.fireEvent("change:stroke");

        return this;
    },

    /**
     * @method
     * The used line width.
     *
     * @type {Number}
     **/
    getStroke: function () {
        return this.stroke;
    },

    /**
     * @method
     * Set the foreground color of the figure.
     * This method fires a <i>document dirty</i> event.
     *
     *      // Alternatively you can use the attr method:
     *      figure.attr({
    *        "color": "#f3f3f3"
    *      });
     *
     * @param {String|draw2d.util.Color} color The new color of the line.
     **/
    setColor: function (color) {
        this.color = new draw2d.util.Color(color);
        this.repaint();
        this.fireEvent("change:color");

        return this;
    },

    /**
     * @method
     * Get the current used foreground color
     *
     *
     * @returns {draw2d.util.Color}
     */
    getColor: function () {
        return this.color;
    },


    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        return $.extend(this._super(), {
            bgColor: this.bgColor.hash(),
            color: this.color.hash(),
            stroke: this.stroke,
            radius: this.radius
        });
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.radius !== "undefined") {
            this.setRadius(memento.radius);
        }

        if (typeof memento.bgColor !== "undefined") {
            this.setBackgroundColor(memento.bgColor);
        }

        if (typeof memento.color !== "undefined") {
            this.setColor(memento.color);
        }

        if (typeof memento.stroke !== "undefined") {
            this.setStroke(parseFloat(memento.stroke));
        }

        return this;
    }


});


/**
 * @class draw2d.ResizeHandle
 * The Resizehandles for Figures.

 * <pre>
 * Possible Type:
 *
 *     1             2               3
 *     O-----------O-------------O
 *     |                         |
 *     |                         |
 *   8 O           + 9           O 4
 *     |                         |
 *     |                         |
 *     O-----------O-------------O
 *   7             6               5
 * </pre>
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.ResizeHandle = draw2d.shape.basic.Rectangle.extend({
    NAME: "draw2d.ResizeHandle",

    /**
     * @constructor
     * Creates a new figure element which are not assigned to any canvas.
     *
     * @param {draw2d.Canvas} canvas the related canvas element
     * @param {Number} type the type of the ResizeHandle.
     */
    init: function (figure, type) {

        this._super({bgColor: "#5bcaff", stroke: 1, radius: 0});

        // required in the SelectionEditPolicy to indicate the type of figure
        // which the user clicks
        this.isResizeHandle = true;

        this.owner = figure;
        this.type = type;
        this.command = null;
        this.commandMove = null;
        this.commandResize = null;

        this.setSelectable(false);

        this.setDimension(); // get best if no params are given
    },


    /**
     * @method
     * The edge of the rectangle for the snapTo mechanism.
     *
     * @return
     */
    getSnapToDirection: function () {
        switch (this.type) {
            case 1:
                return draw2d.SnapToHelper.NORTH_WEST;
            case 2:
                return draw2d.SnapToHelper.NORTH;
            case 3:
                return draw2d.SnapToHelper.NORTH_EAST;
            case 4:
                return draw2d.SnapToHelper.EAST;
            case 5:
                return draw2d.SnapToHelper.SOUTH_EAST;
            case 6:
                return draw2d.SnapToHelper.SOUTH;
            case 7:
                return draw2d.SnapToHelper.SOUTH_WEST;
            case 8:
                return draw2d.SnapToHelper.WEST;
            case 9:
                return draw2d.SnapToHelper.NSEW;
            default :
                return draw2d.SnapToHelper.EAST;
        }
    },

    /**
     * @inheritdoc
     */
    createShapeElement: function () {
        var shape = this._super();

        shape.node.setAttribute("type", this.type);
        this.updateCursor(shape);

        return shape;
    },

    /**
     * @method
     * calculate and set the cursor of the reize handle
     * @private
     */
    updateCursor: function (shape) {
        if (shape === null) {
            return this;
        }

        if (this.isDraggable() === false) {
            shape.attr({"cursor": "default"});
            return this;
        }

        switch (this.type) {
            case 1:
                shape.attr({"cursor": "nw-resize"});
                break;
            case 2:
                shape.attr({"cursor": "n-resize"});
                break;
            case 3:
                shape.attr({"cursor": "ne-resize"});
                break;
            case 4:
                shape.attr({"cursor": "e-resize"});
                break;
            case 5:
                shape.attr({"cursor": "se-resize"});
                break;
            case 6:
                shape.attr({"cursor": "s-resize"});
                break;
            case 7:
                shape.attr({"cursor": "sw-resize"});
                break;
            case 8:
                shape.attr({"cursor": "w-resize"});
                break;
            default:
                shape.attr({"cursor": "move"});
                break;
        }
        return this;
    },

    /**
     * @method
     * Adjust the draggable flag of the resize handle and update the cursor of the shape in relation
     * to the type of resize handle. north, south,west,..
     *
     * @param flag
     * @returns
     */
    setDraggable: function (flag) {
        this._super(flag);
        this.updateCursor(this.shape);

        return this;
    },

    /**
     * @method
     * Will be called if the drag and drop action beginns. You can return [false] if you
     * want avoid that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean} true whenever the drag drop operation is allowed.
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {
        // This happens if the selected figure has set the "nonResizeable" flag
        // In this case the ResizeHandle can't be dragged. => no resize
        //
        if (!this.isDraggable()) {
            return false;
        }

        this.ox = this.getAbsoluteX();
        this.oy = this.getAbsoluteY();

        this.commandMove = this.owner.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE));
        this.commandResize = this.owner.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.RESIZE));

        return true;
    },


    /**
     * @method
     * Called by the framework if the figure is moved by user interaction.
     *
     * @param {Number} dx the move x offset
     * @param {Number} dy the move y offset
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     *
     * @return {boolean}
     */
    onDrag: function (dx, dy, dx2, dy2) {
        if (this.isDraggable() === false) {
            return;
        }

        var oldX = this.getAbsoluteX();
        var oldY = this.getAbsoluteY();

        // call the super.drag method with all snapTo### handler and adjustments
        this._super(dx, dy, dx2, dy2);

        var diffX = this.getAbsoluteX() - oldX;
        var diffY = this.getAbsoluteY() - oldY;

        var obj = this.owner;
        var objPosX = obj.getAbsoluteX();
        var objPosY = obj.getAbsoluteY();
        var objWidth = obj.getWidth();
        var objHeight = obj.getHeight();

        var newX = null;
        var newY = null;
        var corrPos = null;
        switch (this.type) {
            case 1:
                obj.setDimension(objWidth - diffX, objHeight - diffY);
                newX = objPosX + (objWidth - obj.getWidth());
                newY = objPosY + (objHeight - obj.getHeight());
                obj.setPosition(newX, newY);
                break;
            case 2:
                obj.setDimension(objWidth, objHeight - diffY);
                newX = objPosX;
                newY = objPosY + (objHeight - obj.getHeight());
                obj.setPosition(newX, newY);
                break;
            case 3:
                obj.setDimension(objWidth + diffX, objHeight - diffY);
                newX = objPosX;
                newY = objPosY + (objHeight - obj.getHeight());
                obj.setPosition(newX, newY);
                break;
            case 4:
                obj.setDimension(objWidth + diffX, objHeight);
                break;
            case 5:
                obj.setDimension(objWidth + diffX, objHeight + diffY);
                break;
            case 6:
                obj.setDimension(objWidth, objHeight + diffY);
                break;
            case 7:
                obj.setDimension(objWidth - diffX, objHeight + diffY);
                newX = objPosX + (objWidth - obj.getWidth());
                newY = objPosY;
                obj.setPosition(newX, newY);
                break;
            case 8:
                obj.setDimension(objWidth - diffX, objHeight);
                newX = objPosX + (objWidth - obj.getWidth());
                newY = objPosY;
                obj.setPosition(newX, newY);
                break;
        }

        if (newX !== null) {
            // may the setPosition has changed regarding any constraint or edit policies. In this case
            // we must adjust the dimension with the related correction
            //
            corrPos = obj.getPosition();
            if (corrPos.x !== newX || corrPos.y !== newY) {
                obj.setDimension(obj.getWidth() - (corrPos.x - newX), obj.getHeight() - (corrPos.y - newY));
            }
        }
    },

    /**
     * @method
     * Will be called after a drag and drop action.<br>
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        if (!this.isDraggable()) {
            return;
        }

        // An non draggable resizeHandle doesn't create a move/resize command.
        // This happens if the selected figure has set the "nonResizeable" flag.
        //
        if (this.commandMove !== null) {
            this.commandMove.setPosition(this.owner.getX(), this.owner.getY());
            this.canvas.getCommandStack().execute(this.commandMove);
            this.commandMove = null;
        }

        if (this.commandResize !== null) {
            this.commandResize.setDimension(this.owner.getWidth(), this.owner.getHeight());
            this.canvas.getCommandStack().execute(this.commandResize);
            this.commandResize = null;
        }

        this.canvas.hideSnapToHelperLines();
    },

    /**
     * Set the position of the object.<br>
     * The ResizeHandle overrides the Figure.setPosition method. The base
     * class updates the resize handles during the update of the Dimension/Position. This
     * is not neccessary for the ResizeHandles. Performance issue.
     *
     * @param {Number} x The new x coordinate of the figure
     * @param {Number} y The new y coordinate of the figure
     **/
    setPosition: function (x, y) {
        // don't call base implementation. Base implementation will show
        // ResizeHandles...but I'm the ResizeHandle
        if (x instanceof draw2d.geo.Point) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }

        if (this.repaintBlocked === true || this.shape === null) {
            return this;
        }

        // performace improment by setting the coordinates direct.
        this.shape.attr({x: this.x, y: this.y});
//        this.repaint();
    },


    /**
     * @method
     * Set the new dimension of the the ResizeHandle. IF you didn't pass any width/height the best default for the
     * platform will be used.
     *
     * @param {Number} [width] new width of the resize handle
     * @param {Number} [height] new width of the resize handle
     */
    setDimension: function (width, height) {
        if (typeof height !== "undefined") {
            this._super(width, height);
        }
        else {
            if (draw2d.isTouchDevice) {
                this._super(15, 15);
            }
            else {
                this._super(8, 8);
            }
        }

        var offset = this.getWidth();
        var offset2 = offset / 2;

        switch (this.type) {
            case 1:
                this.setSnapToGridAnchor(new draw2d.geo.Point(offset, offset));
                break;
            case 2:
                this.setSnapToGridAnchor(new draw2d.geo.Point(offset2, offset));
                break;
            case 3:
                this.setSnapToGridAnchor(new draw2d.geo.Point(0, offset));
                break;
            case 4:
                this.setSnapToGridAnchor(new draw2d.geo.Point(0, offset2));
                break;
            case 5:
                this.setSnapToGridAnchor(new draw2d.geo.Point(0, 0));
                break;
            case 6:
                this.setSnapToGridAnchor(new draw2d.geo.Point(offset2, 0));
                break;
            case 7:
                this.setSnapToGridAnchor(new draw2d.geo.Point(offset, 0));
                break;
            case 8:
                this.setSnapToGridAnchor(new draw2d.geo.Point(offset, offset2));
                break;
            case 9:
                this.setSnapToGridAnchor(new draw2d.geo.Point(offset2, offset2));
                break;
        }

    },

    /**
     * @method
     * Show the ResizeHandle and add it to the canvas.<br>
     * Additional bring it in to the front of other figures.
     *
     * @param {draw2d.Canvas} canvas the canvas to use
     * @param {Number} x the x-positin
     * @param {Number} y the y-position
     **/
    show: function (canvas) {
        // don't call the parent function. The parent functions delete this object
        // and a resize handle can't be deleted.
        this.setCanvas(canvas);

        this.canvas.resizeHandles.add(this);
        this.shape.insertAfter(this.owner.getShapeElement());
        this.repaint();

        return this;
    },

    /**
     * @method
     * Hide the resize handle and remove it from the canvas.
     *
     **/
    hide: function () {
        // don't call the parent function. The parent functions delete this object
        // and a resize handle shouldn't be deleted.
        if (this.shape === null) {
            return;
        }

        this.canvas.resizeHandles.remove(this);
        this.setCanvas(null);

        return this;
    },

    /**
     * @method
     * Set the new background color of the figure. It is possible to hands over
     * <code>null</code> to set the background transparent.
     *
     * @param {draw2d.util.Color} color The new background color of the figure
     **/
    setBackgroundColor: function (color) {
        color = new draw2d.util.Color(color);

        this.bgGradient = "90-" + color.hash() + "-" + color.darker(0.2).hash();
        this._super(color);

        return this;
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        if (this.bgColor.hash() === "none") {
            attributes.fill = "none";
        }
        else if (this.getAlpha() < 0.9) {
            attributes.fill = this.bgColor.hash();
        }
        else {
            attributes.fill = this.bgGradient;
        }


        this._super(attributes);
    },


    /**
     * @method
     * return true if the element can be used in combination with the
     * SnapToHelper feature.
     *
     * @return [boolean]
     **/
    supportsSnapToHelper: function () {
        return true;
    },


    /**
     * @method
     * Override this method and redirect them to the cavas. A ResizeHandle didn't support
     * Keyboard interaction at the moment.
     *
     * @param {Number} keyCode the id of the pressed key
     * @param {boolean} ctrl true if the user has pressed the CTRL/STRG key as well.
     **/
    onKeyDown: function (keyCode, ctrl) {
        // don't call the parent function. The parent functions delete this object
        // and a resize handle can't be deleted.
        this.canvas.onKeyDown(keyCode, ctrl);
    },


    fireEvent: function () {
        // A resizeHandle doesn't fire this event.
        // Normally this set the document dirty. This is not necessary for a ResizeHandle.
    }
});

/**
 * @class draw2d.shape.basic.LineResizeHandle
 * Base class for selection handle for connections and normal lines.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Circle
 */
draw2d.shape.basic.LineResizeHandle = draw2d.shape.basic.Circle.extend({
    NAME: "draw2d.shape.basic.LineResizeHandle",

    init: function (figure) {
        this._super();
        this.owner = figure;
        // required in the SelectionEditPolicy to indicate the type of figure
        // which the user clicks
        this.isResizeHandle = true;

        if (draw2d.isTouchDevice) {
            this.setDimension(20, 20);
        }
        else {
            this.setDimension(10, 10);
        }

        this.setBackgroundColor("#5bcaff");
        this.setStroke(1);
        this.setSelectable(false);

        this.currentTarget = null;
    },

    /**
     * @inheritdoc
     */
    createShapeElement: function () {
        var shape = this._super();

        shape.attr({"cursor": "move"});
        return shape;
    },

    /**
     * @inheritdoc
     **/
    setBackgroundColor: function (color) {
        color = new draw2d.util.Color(color);

        this.bgGradient = "r(.4,.3)" + color.hash() + "-" + color.darker(0.1).hash() + ":60-" + color.darker(0.2).hash();
        this._super(color);
        this.setColor(color.darker(0.3));

        return this;
    },


    /**
     * @method
     * Return the port below the ResizeHandle.
     *
     * @template
     * @return {draw2d.Port}
     */
    getRelatedPort: function () {
        return null;
    },


    /**
     * @method
     * Return the port of the other side of the related connection.
     *
     * @template
     * @return {draw2d.Port}
     */
    getOppositePort: function () {
        return null;
    },


    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};


        if (this.bgColor.hash() === "none") {
            attributes.fill = this.bgColor.hash();
        }
        else if (this.getAlpha() < 0.9) {
            attributes.fill = this.bgColor.hash();
        }
        else {
            attributes.fill = this.bgGradient;
        }


        this._super(attributes);
    },

    /**
     * Called if the drag and drop action beginns. You can return [false] if you
     * want avoid the that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @type {boolean}
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {
        this.command = this.getCanvas().getCurrentSelection().createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE_BASEPOINT));
        this.setAlpha(0.2);
        this.shape.attr({"cursor": "crosshair"});

        return true;
    },


    /**
     * @method
     * Called from the framework during a drag&drop operation
     *
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @return {boolean}
     * @private
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        this.setPosition(this.x + dx2, this.y + dy2);

        var port = this.getOppositePort();

        var target = port !== null ? port.getCanvas().getBestFigure(this.getX(), this.getY(), [this, this.owner]) : null;

        // the hovering element has been changed
        if (target !== this.currentTarget) {

            if (this.currentTarget !== null) {
                this.currentTarget.onDragLeave(port);
                this.currentTarget.setGlow(false);
            }

            if (target !== null) {
                this.currentTarget = target.onDragEnter(port);
                if (this.currentTarget !== null) {
                    this.currentTarget.setGlow(true);
                }
            }
        }

        return true;
    },

    /**
     * @method Called after a drag and drop action.<br>
     *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean}
     */
    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        if (!this.isDraggable()) {
            return false;
        }

        this.shape.attr({"cursor": "move"});

        var port = this.getOppositePort();
        if (port !== null) {
            if (this.currentTarget !== null) {

                this.onDrop(this.currentTarget, x, y, shiftKey, ctrlKey);
                this.currentTarget.onDragLeave(port);
                this.currentTarget.setGlow(false);
                this.currentTarget.onCatch(this, x, y, shiftKey, ctrlKey);
                this.currentTarget = null;
            }
        }

        this.owner.isMoving = false;
        // A Connection is stuck to the corresponding ports. So we must reset the position
        // to the origin port if we doesn't drop the ResizeHandle on a other port.
        //
        if (this.getCanvas().getCurrentSelection() instanceof draw2d.Connection) {
            if (this.command !== null) {
                this.command.cancel();
            }
        }
        //
        else {
            // An non draggable resizeHandle doesn't create a move/resize command.
            // This happens if the selected figure has set "isResizeable=false".
            //
            if (this.command !== null) {
                this.getCanvas().getCommandStack().execute(this.command);
            }
        }
        this.command = null;
        this.getCanvas().hideSnapToHelperLines();

        this.setAlpha(1);

        return true;
    },


    /**
     * @inheritdoc
     **/
    relocate: function () {

    },


    /**
     * @method
     * The LineResizeHandle didn't support the SnapToHelper feature if the
     * corresponding object is an Connection. A Connection is always bounded to
     * Port. In this case it makes no sense to use a Grid or Geometry for snapping.
     *
     * @return {boolean} return false if the corresponding object didn't support snapTo
     **/
    supportsSnapToHelper: function () {
        if (this.getCanvas().getCurrentSelection() instanceof draw2d.Connection) {
            return false;
        }

        return true;
    },

    /**
     * @method
     * Show the ResizeHandle and add it to the canvas.<br>
     * Additional bring it in to the front of other figures.
     *
     * @param {draw2d.Canvas} canvas the canvas to use
     * @param {Number} x the x-position
     * @param {Number} y the y-position
     **/
    show: function (canvas, x, y) {
        // don't call the parent function. The parent functions make this object selectable/deleteable
        // and a resize handle can't be deleted.
        this.setCanvas(canvas);
        //     this.setPosition(x,y);
        this.shape.toFront();
        this.canvas.resizeHandles.add(this);
    },

    /**
     * @method
     * Hide the resize handle and remove it from the canvas.
     *
     **/
    hide: function () {
        // don't call the parent function. The parent functions delete this object
        // and a resize handle shouldn't be deleted.
        if (this.shape === null) {
            return;
        }

        this.canvas.resizeHandles.remove(this);
        this.setCanvas(null);
    },

    /**
     * @method
     * Override this method and redirect them to the canvas. A ResizeHandle didn't support
     * Keyboard interaction at the moment.
     *
     * @param {Number} keyCode the id of the pressed key
     * @param {boolean} ctrl true if the user has pressed the CTRL/STRG key as well.
     **/
    onKeyDown: function (keyCode, ctrl) {
        // don't call the parent function. The parent functions delete this object
        // and a resize handle can't be deleted.
        this.canvas.onKeyDown(keyCode, ctrl);
    }
});

/**
 * @class draw2d.shape.basic.LineStartResizeHandle
 * Selection handle for connections and normal lines.
 *
 * TODO: Split the LineEndResizeHandle to ConnectionEndResizeHandle and LineEndResizeHandle!!!!
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.LineResizeHandle
 */
draw2d.shape.basic.LineStartResizeHandle = draw2d.shape.basic.LineResizeHandle.extend({
    NAME: "draw2d.shape.basic.LineStartResizeHandle",

    init: function (figure) {
        this._super(figure);
    },

    /**
     * @method
     * Return the Port below the ResizeHandle
     *
     * @return {draw2d.Port}
     */
    getRelatedPort: function () {
        if (this.owner instanceof draw2d.Connection)
            return this.owner.getSource();

        return null;
    },

    /**
     * @method
     * Return the Port on the opposite side of the ResizeHandle
     *
     * @returns
     */
    getOppositePort: function () {
        if (this.owner instanceof draw2d.Connection)
            return this.owner.getTarget();

        return null;
    },

    /**
     * @method
     * Called from the framework during a drag&drop operation
     *
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @return {boolean}
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        this._super(dx, dy, dx2, dy2);

        var objPos = this.owner.getStartPoint();
        objPos.translate(dx2, dy2);

        this.owner.setStartPoint(objPos.x, objPos.y);

        this.owner.isMoving = true;

        return true;
    },

    /**
     * @method
     * Resize handle has been drop on a InputPort/OutputPort.
     *
     * @param {draw2d.Port} dropTarget
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     **/
    onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
        this.owner.isMoving = false;

        // The ResizeHandle of a Connection has been droped on a Port
        // This will enforce a ReconnectCommand
        if (this.owner instanceof draw2d.Connection && this.command !== null) {
            this.command.setNewPorts(dropTarget, this.owner.getTarget());
            this.getCanvas().getCommandStack().execute(this.command);
        }
        this.command = null;
    },

    /**
     * @method
     * Controls the location of the resize handle
     *
     * @template
     **/
    relocate: function () {

        var resizeWidthHalf = this.getWidth() / 2;
        var resizeHeightHalf = this.getHeight() / 2;

        var anchor = this.owner.getStartPoint();

        this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf);
    }


});

/**
 * @class draw2d.shape.basic.LineEndResizeHandle
 *
 * Selection handle for connections and normal lines.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.LineResizeHandle
 */
draw2d.shape.basic.LineEndResizeHandle = draw2d.shape.basic.LineResizeHandle.extend({
    NAME: "draw2d.shape.basic.LineEndResizeHandle",

    init: function (figure) {
        this._super(figure);
    },


    /**
     * @method
     * Return the Port assigned to this ResizeHandle if the line is an instance of draw2d.Connection
     *
     * @return {draw2d.Port}
     */
    getRelatedPort: function () {
        if (this.owner instanceof draw2d.Connection) {
            return this.owner.getTarget();
        }

        return null;
    },

    /**
     * @method
     * Return the peer Port assigned to this ResizeHandle if the line is an instance of draw2d.Connection
     *
     * @returns {draw2d.Port}
     */
    getOppositePort: function () {
        if (this.owner instanceof draw2d.Connection) {
            return this.owner.getSource();
        }

        return null;
    },


    /**
     * @method
     * Called from the framework during a drag&drop operation
     *
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @return {boolean}
     * @private
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        this._super(dx, dy, dx2, dy2);

        var objPos = this.owner.end.clone();//getEndPoint();
        // objPos.translate(dx2,dy2);

        this.owner.setEndPoint(objPos.x + dx2, objPos.y + dy2);

        this.owner.isMoving = true;

        return true;
    },

    /**
     * @method
     * Resizehandle has been drop on a InputPort/OutputPort.
     *
     * @param {draw2d.Figure} dropTarget
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {
        this.owner.isMoving = false;

        if (this.owner instanceof draw2d.Connection && this.command !== null) {
            this.command.setNewPorts(this.owner.getSource(), dropTarget);
            this.getCanvas().getCommandStack().execute(this.command);
        }
        this.command = null;
    },

    /**
     * @method
     * Controls the location of the resize handle
     *
     * @private
     **/
    relocate: function () {

        var resizeWidthHalf = this.getWidth() / 2;
        var resizeHeightHalf = this.getHeight() / 2;

        var anchor = this.owner.getEndPoint();

        this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf);

        return this
    }
});

/**
 * @class draw2d.shape.basic.VertexResizeHandle
 *
 * Selection handle for polyline vertices.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.ResizeHandle
 */
draw2d.shape.basic.VertexResizeHandle = draw2d.ResizeHandle.extend({
    NAME: "draw2d.shape.basic.VertexResizeHandle",

    SNAP_THRESHOLD: 3,
    LINE_COLOR: "#1387E6",
    FADEOUT_DURATION: 300,

    init: function (figure, index) {
        this._super(figure);
        this.index = index;
        this.isDead = false;

        this.vline = null;
        this.hline = null;
    },


    /**
     * @method
     * Called when a user double clicks on the element
     *
     * @template
     */
    onDoubleClick: function () {
        var cmd = new draw2d.command.CommandRemoveVertex(this.owner, this.index);
        this.getCanvas().getCommandStack().execute(cmd);

        this.isDead = true;
    },


    /**
     * @method
     * Called if a drag&drop operation starts.<br>
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {
        if (this.isDead === true) {
            return;
        }

        this._super();
        this.command = this.getCanvas().getCurrentSelection().createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.MOVE_VERTEX));
        if (this.command != null) {
            this.command.setIndex(this.index);
            this.setAlpha(0.2);
            this.shape.attr({"cursor": "crosshair"});
        }

        // Vertex is a reference and not a copy of the point
        this.vertex = this.owner.getVertex(this.index).clone();
    },

    /**
     * @method
     * Called from the framework during a drag&drop operation
     *
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @return {boolean}
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        if (this.isDead === true || this.command == null) {
            return false;
        }

        this.setPosition(this.x + dx2, this.y + dy2);

        // update the polyline for immediately  drag&drop feedback
        //
        this.vertex.translate(dx2, dy2);
        this.owner.setVertex(this.index, this.vertex.x, this.vertex.y);

        // update the command for the undo/redo stuff
        //
        this.command.updatePosition(this.vertex.x, this.vertex.y);

        // show snapTo lines
        //
        var points = this.owner.getVertices();
        var size = points.getSize();
        var left = points.get((this.index - 1 + size) % size); // % is just to ensure the [0, size] interval
        var right = points.get((this.index + 1) % size);       // % is just to ensure the [0, size] interval

        // horizontal guided line
        //
        if (Math.abs(left.x - this.vertex.x) < this.SNAP_THRESHOLD) {
            this.showVerticalLine(left.x);
        }
        else if (Math.abs(right.x - this.vertex.x) < this.SNAP_THRESHOLD) {
            this.showVerticalLine(right.x);
        }
        else {
            this.hideVerticalLine();
        }

        // horizontal guided line
        //
        if (Math.abs(left.y - this.vertex.y) < this.SNAP_THRESHOLD) {
            this.showHorizontalLine(left.y);
        }
        else if (Math.abs(right.y - this.vertex.y) < this.SNAP_THRESHOLD) {
            this.showHorizontalLine(right.y);
        }
        else {
            this.hideHorizontalLine();
        }


        return true;
    },

    /**
     * @method Called after a drag and drop action.<br>
     *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean}
     */
    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        if (this.isDead === true || this.command === null) {
            return false;
        }

        this.shape.attr({"cursor": "move"});
        this.hideVerticalLine();
        this.hideHorizontalLine();

        // snapTo
        var points = this.owner.getVertices();
        var size = points.getSize();
        var left = points.get((this.index - 1 + size) % size); // % is just to ensure the [0, size] interval
        var right = points.get((this.index + 1) % size);       // % is just to ensure the [0, size] interval

        // Vertical snapTo
        //
        if (Math.abs(left.x - this.vertex.x) < this.SNAP_THRESHOLD) {
            this.command.updatePosition(left.x, this.vertex.y);
        }
        else if (Math.abs(right.x - this.vertex.x) < this.SNAP_THRESHOLD) {
            this.command.updatePosition(right.x, this.vertex.y);
        }

        // horizontal snapTo
        //
        if (Math.abs(left.y - this.vertex.y) < this.SNAP_THRESHOLD) {
            this.command.updatePosition(this.vertex.x, left.y);
        }
        else if (Math.abs(right.y - this.vertex.y) < this.SNAP_THRESHOLD) {
            this.command.updatePosition(this.vertex.x, right.y);
        }

        var stack = this.getCanvas().getCommandStack();

        stack.startTransaction();
        try {
            stack.execute(this.command);
            this.command = null;
            this.getCanvas().hideSnapToHelperLines();

            var angle = this.getEnclosingAngle();
            if (angle > 178) {
                var cmd = new draw2d.command.CommandRemoveVertex(this.owner, this.index);
                stack.execute(cmd);
            }
        }
        finally {
            stack.commitTransaction();
        }

        this.setAlpha(1);

        return true;
    },


    /**
     * @method
     * Controls the location of the resize handle
     *
     * @template
     **/
    relocate: function () {

        var resizeWidthHalf = this.getWidth() / 2;
        var resizeHeightHalf = this.getHeight() / 2;

        var anchor = this.owner.getVertex(this.index);

        this.setPosition(anchor.x - resizeWidthHalf, anchor.y - resizeHeightHalf);
    },

    /**
     * @method
     * Calculates the angle between the siblings
     *
     * @returns {Number}
     */
    getEnclosingAngle: function () {
        // calculate the angle between the siblings
        var points = this.owner.getVertices();
        var trans = this.vertex.getScaled(-1);
        var size = points.getSize();
        var left = points.get((this.index - 1 + size) % size).getTranslated(trans); // % is just to ensure the [0, size] interval
        var right = points.get((this.index + 1) % size).getTranslated(trans);       // % is just to ensure the [0, size] interval

        var dot = left.dot(right);

        var acos = Math.acos(dot / (left.length() * right.length()));
        return acos * 180 / Math.PI;
    },

    showVerticalLine: function (x) {
        if (this.vline != null) {
            return; //silently
        }
        this.vline = this.canvas.paper
            .path("M " + x + " 0 l 0 " + this.canvas.getHeight())
            .attr({"stroke": this.LINE_COLOR, "stroke-width": 1});
    },

    hideVerticalLine: function () {
        if (this.vline == null) {
            return;
        }
        var tmp = this.vline;
        tmp.animate({
            opacity: 0.1
        }, this.FADEOUT_DURATION, function () {
            tmp.remove();
        });

        this.vline = null;
    },


    showHorizontalLine: function (y) {
        if (this.hline != null) {
            return;
        }

        this.hline = this.canvas.paper
            .path("M 0 " + y + " l " + this.canvas.getWidth() + " 0")
            .attr({"stroke": this.LINE_COLOR, "stroke-width": 1});
    },

    hideHorizontalLine: function () {
        if (this.hline == null) {
            return; //silently
        }
        var tmp = this.hline;
        tmp.animate({
            opacity: 0.1
        }, this.FADEOUT_DURATION, function () {
            tmp.remove();
        });
        this.hline = null;
    }

});

/**
 * @class draw2d.shape.basic.GhostVertexResizeHandle
 * ResizeHandle for a vertex edit policy. Click of this kind of resize handles
 * adds a new vertex to the polyline or polygon.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.shape.basic.LineResizeHandle
 */
draw2d.shape.basic.GhostVertexResizeHandle = draw2d.shape.basic.LineResizeHandle.extend({
    NAME: "draw2d.shape.basic.GhostVertexResizeHandle",

    init: function (figure, precursorIndex) {
        this.maxOpacity = 0.35;

        this._super(figure);
        this.precursorIndex = precursorIndex;

        this.setAlpha(this.maxOpacity);
    },

    createShapeElement: function () {
        var shape = this._super();

        shape.attr({"cursor": "pointer"});

        return shape;
    },

    /**
     * @method
     * Set the alpha blending of this figure.
     *
     * @param {Number} percent Value between [0..1].
     * @template
     **/
    setAlpha: function (percent) {
        percent = Math.min(this.maxOpacity, Math.max(0, parseFloat(percent)));
        this._super(percent);

        return this;
    },

    /**
     * @method
     * Called when a user clicks on the element
     *
     * @template
     */
    onClick: function () {
        var cmd = new draw2d.command.CommandAddVertex(this.owner, this.precursorIndex + 1, this.getAbsoluteX() + this.getWidth() / 2, this.getAbsoluteY() + this.getHeight() / 2);
        this.getCanvas().getCommandStack().execute(cmd);
    },


    /**
     * @method
     * Called from the framework during a drag&drop operation
     *
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     * @return {boolean}
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        return true;
    },

    /**
     * @method Called after a drag and drop action.<br>
     *         Sub classes can override this method to implement additional stuff. Don't forget to call the super implementation via <code>this._super();</code>
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean}
     */
    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        return true;
    },


    /**
     * @method
     * Controls the location of the resize handle
     *
     * @template
     **/
    relocate: function () {
        var p1 = this.owner.getVertices().get(this.precursorIndex);
        var p2 = this.owner.getVertices().get(this.precursorIndex + 1);

        var x = ((p2.x - p1.x) / 2 + p1.x - this.getWidth() / 2) | 0;
        var y = ((p2.y - p1.y) / 2 + p1.y - this.getHeight() / 2) | 0;


        this.setPosition(x, y);
    }


});

/**
 * @class draw2d.Port
 * A port is an object that is used to establish a connection between a node and a {@link draw2d.Connection}. The port can
 * be placed anywhere within a node ( see {@link draw2d.layout.locator.PortLocator} for details)
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Circle
 */
draw2d.Port = draw2d.shape.basic.Circle.extend({
    NAME: "draw2d.Port",

    DEFAULT_BORDER_COLOR: new draw2d.util.Color("#1B1B1B"),

    /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr) {
        this.locator = null;
        this.lighterBgColor = null;

        this._super(attr);

        if (draw2d.isTouchDevice) {
            this.setDiameter(25);
        }
        else {
            this.setDiameter(10);
        }


        // status var for user interaction
        //
        this.ox = this.x;
        this.oy = this.y;
        this.coronaWidth = 5; // the corona width for the hitTest method. Useful during drag&drop of ports. Better SnapTo behavior.
        this.corona = null; // Circle

        // currentTarget can be differ from the currentTargetPort. In this case
        // we must store booth of them for notifications hoverEnter/hoverLeft
        this.currentTargetPort = null; // port
        this.currentTarget = null; // Figure

        // current attached connections
        this.connections = new draw2d.util.ArrayList();

        // visible representation
        //
        this.setBackgroundColor("#4f6870");
        this.setStroke(1);
        this.setColor(this.DEFAULT_BORDER_COLOR);
        this.setSelectable(false);

        // avoid "undefined" values. This breaks the code on iOS.
        if (typeof name === "undefined") {
            this.name = null;
        }
        else {
            this.name = name;
        }

        this.moveListener = function (figure) {
            this.repaint();
            // Falls sich der parent bewegt hat, dann muss der Port dies seinen
            // Connections mitteilen
            this.fireEvent("move");
        }.bind(this);

        this.connectionAnchor = new draw2d.layout.anchor.ConnectionAnchor(this);

        // for dynamic diagrams. A Port can have a value which is set by a connector
        //
        this.value = null;
        this.maxFanOut = Number.MAX_VALUE;

        this.setCanSnapToHelper(false);

        this.installEditPolicy(new draw2d.policy.port.IntrusivePortsFeedbackPolicy());
        //    this.installEditPolicy(new draw2d.policy.port.ElasticStrapFeedbackPolicy());
    },

    /**
     * @method
     * set the maximal possible count of connections for this port.<br>
     * This method din't delete any connection if you reduce the number and a bunch of
     * connection are bounded already.
     *
     * @param {Number} count the maximal number of connection related to this port
     */
    setMaxFanOut: function (count) {
        this.maxFanOut = Math.max(1, count);
        this.fireEvent("change:maxFanOut");

        return this;
    },

    /**
     * @method
     * return the maximal possible connections (in+out) for this port.
     *
     * @returns
     */
    getMaxFanOut: function () {
        return this.maxFanOut;
    },

    /**
     * @method
     * Set the Anchor for this object. An anchor is responsible for the endpoint calculation
     * of an connection. just visible representation.
     *
     * @param {draw2d.layout.anchor.ConnectionAnchor} [anchor] the new source anchor for the connection
     **/
    setConnectionAnchor: function (anchor) {
        // set some good defaults.
        if (typeof anchor === "undefined" || anchor === null) {
            anchor = new draw2d.layout.anchor.ConnectionAnchor();
        }

        this.connectionAnchor = anchor;
        this.connectionAnchor.setOwner(this);

        // the anchor has changed. In this case all connections needs an change event to recalculate
        // the anchor and the routing itself
        this.fireEvent("move");

        return this;
    },

    getConnectionAnchorLocation: function (referencePoint, inquiringConnection) {
        return this.connectionAnchor.getLocation(referencePoint, inquiringConnection);
    },

    getConnectionAnchorReferencePoint: function (inquiringConnection) {
        return this.connectionAnchor.getReferencePoint(inquiringConnection);
    },


    /**
     * @method
     * Returns the **direction** for the connection in relation to the given port and it's parent.
     *
     * <p>
     * Possible values:
     * <ul>
     *   <li>up -&gt; 0</li>
     *   <li>right -&gt; 1</li>
     *   <li>down -&gt; 2</li>
     *   <li>left -&gt; 3</li>
     * </ul>
     * <p>
     *
     * @param {draw2d.Connection} conn the related Connection
     * @param {draw2d.Port} relatedPort the counterpart port
     * @return {Number} the direction.
     */
    getConnectionDirection: function (conn, relatedPort) {
        return this.getParent().getBoundingBox().getDirection(this.getAbsolutePosition());
    },

    /**
     * @method
     * Set the locator/layouter of the port. A locator is responsive for the x/y arrangement of the
     * port in relation to the parent node.
     *
     * @param {draw2d.layout.locator.Locator} locator
     */
    setLocator: function (locator) {
        this.locator = locator;

        return this;
    },

    /**
     * @method
     * Get the locator/layouter of the port. A locator is responsive for the x/y arrangement of the
     * port in relation to the parent node.
     *
     * @since 4.2.0
     */
    getLocator: function () {
        return this.locator;
    },


    /**
     * @method
     * Set the new background color of the figure. It is possible to hands over
     * <code>null</code> to set the background transparent.
     *
     * @param {draw2d.util.Color} color The new background color of the figure
     **/
    setBackgroundColor: function (color) {
        this._super(color);
        this.lighterBgColor = this.bgColor.lighter(0.3).hash();
        return this;
    },

    /**
     * @method
     * Set a value for the port. This is useful for interactive/dynamic diagrams like circuits, simulator,...
     *
     * @param {Object} value the new value for the port
     */
    setValue: function (value) {
        this.value = value;
        if (this.getParent() !== null) {
            this.getParent().onPortValueChanged(this);
        }

        return this;
    },

    /**
     * @method
     * Return the user defined value of the port.
     *
     * @returns {Object}
     */
    getValue: function () {
        return this.value;
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};


        // a port did have the 0/0 coordinate in the center and not in the top/left corner
        //
        attributes.cx = this.getAbsoluteX();
        attributes.cy = this.getAbsoluteY();
        attributes.rx = this.width / 2;
        attributes.ry = attributes.rx;
        attributes.cursor = "move";

        if (this.getAlpha() < 0.9) {
            attributes.fill = this.bgColor.hash();
        }
        else {
            attributes.fill = ["90", this.bgColor.hash(), this.lighterBgColor].join("-");
        }

        this._super(attributes);
    },


    /**
     * @inheritdoc
     *
     **/
    onMouseEnter: function () {
        this.setStroke(2);
    },


    /**
     * @inheritdoc
     *
     **/
    onMouseLeave: function () {
        this.setStroke(1);
    },


    /**
     * @method
     * Returns a {@link draw2d.util.ArrayList} of {@link draw2d.Connection}s of all related connections to this port.
     *
     * @type {draw2d.util.ArrayList}
     **/
    getConnections: function () {
        return this.connections;
    },


    /**
     * @inheritdoc
     */
    setParent: function (parent) {
        this._super(parent);

        if (this.parent !== null) {
            this.parent.off(this.moveListener);
        }

        if (this.parent !== null) {
            this.parent.on("move", this.moveListener);
        }
    },


    /**
     * @method
     * Returns the corona width of the Port. The corona width will be used during the
     * drag&drop of a port.
     *
     * @return {Number}
     **/
    getCoronaWidth: function () {
        return this.coronaWidth;
    },


    /**
     * @method
     * Set the corona width of the Port. The corona width will be used during the
     * drag&drop of a port. You can drop a port in the corona of this port to create
     * a connection. It is not neccessary to drop exactly on the port.
     *
     * @param {Number} width The new corona width of the port
     **/
    setCoronaWidth: function (width) {
        this.coronaWidth = width;
    },

    /**
     * @inheritdoc
     *
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean}
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {
        // just allow the DragOperation if the port didn't have reached the max fanOut
        // limit.
        if (this.getConnections().getSize() >= this.maxFanOut) {
            return false;
        }

        var _this = this;

        // this can happen if the user release the mouse button outside the window during a drag&drop
        // operation
        if (this.isInDragDrop === true) {
            this.onDragEnd(x, y, shiftKey, ctrlKey);
        }

        this.getShapeElement().insertAfter(this.parent.getShapeElement());
        // don't call the super method. This creates a command and this is not necessary for a port
        this.ox = this.x;
        this.oy = this.y;

        // notify all installed policies
        //
        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.onDragStart(_this.canvas, _this, x, y, shiftKey, ctrlKey);
            }
        });

        return true;
    },

    /**
     * @inheritdoc
     *
     * @param {Number} dx the x difference between the start of the drag drop operation and now
     * @param {Number} dy the y difference between the start of the drag drop operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     **/
    onDrag: function (dx, dy, dx2, dy2) {
        this.isInDragDrop = true;

        this._super(dx, dy);

        var _this = this;

        var target = this.getCanvas().getBestFigure(this.getAbsoluteX(), this.getAbsoluteY(), this);

        // the hovering element has been changed
        if (target !== this.currentTarget) {
            if (this.currentTarget !== null) {
                this.currentTarget.onDragLeave(this);
                this.editPolicy.each(function (i, e) {
                    if (e instanceof draw2d.policy.port.PortFeedbackPolicy) {
                        e.onHoverLeave(_this.canvas, _this, _this.currentTarget);
                    }
                });
            }

            // possible hoverEnter event
            //
            if (target !== null) {
                this.currentTarget = target.onDragEnter(this);
                if (this.currentTarget !== null) {
                    this.currentTargetPort = target;
                    this.editPolicy.each(function (i, e) {
                        if (e instanceof draw2d.policy.port.PortFeedbackPolicy) {
                            e.onHoverEnter(_this.canvas, _this, _this.currentTarget);
                        }
                    });
                }
            }
            else {
                this.currentTarget = null;
            }

        }
    },


    /**
     * @param {Number} x the x-coordinate of the mouse event
     * @param {Number} y the y-coordinate of the mouse event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     **/
    onDragEnd: function (x, y, shiftKey, ctrlKey) {
        // Don't call the parent implementation. This will create an CommandMove object
        // and store them o the CommandStack for the undo operation. This makes no sense for a
        // port.
        // draw2d.shape.basic.Rectangle.prototype.onDragEnd.call(this); DON'T call the super implementation!!!

        this.setAlpha(1.0);

        // 1.) Restore the old Position of the node
        //
        this.setPosition(this.ox, this.oy);

        this.isInDragDrop = false;

        var _this = this;

        // notify all installed policies
        //
        if (this.currentTarget) {
            this.editPolicy.each(function (i, e) {
                if (e instanceof draw2d.policy.port.PortFeedbackPolicy) {
                    e.onHoverLeave(_this.canvas, _this, _this.currentTarget);
                }
            });
        }

        this.editPolicy.each(function (i, e) {
            if (e instanceof draw2d.policy.figure.DragDropEditPolicy) {
                e.onDragEnd(_this.canvas, _this, x, y, shiftKey, ctrlKey);
            }
        });

        // Reset the drag&drop flyover information
        //
        this.currentTarget = null;
    },

    /**
     * @method
     *
     * @param {draw2d.Figure} draggedFigure The figure which is currently dragging
     *
     * @return {draw2d.Figure} the figure which should receive the drop event or null if the element didn't want a drop event
     * @private
     **/
    onDragEnter: function (draggedFigure) {
        var delegate = null;
        var _this = this;
        this.getCanvas().getInterceptorPolicies().each(function (i, policy) {
            delegate = policy.delegateDrop(draggedFigure, _this);
            if (delegate !== null) {
                return false; // break the loop
            }
        });

        if (delegate === null) {
            return null;
        }

        // Create a CONNECT Command to determine if we can show a Corona.
        //
        var request = new draw2d.command.CommandType(draw2d.command.CommandType.CONNECT);
        request.canvas = this.getCanvas();
        request.source = delegate;
        request.target = draggedFigure;
        var command = draggedFigure.createCommand(request);

        if (command === null) {
            return null;
        }

        return delegate;
    },

    /**
     * @method
     *
     * @param {draw2d.Figure} figure The figure which is currently dragging
     * @private
     **/
    onDragLeave: function (figure) {
        // Ports accepts only Ports as DropTarget
        //
        if (!(figure instanceof draw2d.Port)) {

        }
    },

    /**
     * @method
     * Called if the user drop this element onto the dropTarget
     *
     * @param {draw2d.Figure} dropTarget The drop target.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop: function (dropTarget, x, y, shiftKey, ctrlKey) {

        // Ports accepts only Ports as DropTarget
        //
        if (!(dropTarget instanceof draw2d.Port)) {
            return;
        }

        var request = new draw2d.command.CommandType(draw2d.command.CommandType.CONNECT);
        request.canvas = this.parent.getCanvas();
        request.source = dropTarget;
        request.target = this;
        var command = this.createCommand(request);

        if (command !== null) {
            this.parent.getCanvas().getCommandStack().execute(command);
        }
        this.setGlow(false);
    },


    /**
     * @method
     * Callback method if a new connection has created with this port
     *
     *      // Alternatively you register for this event with:
     *      port.on("connect", function(emitterPort, connection){
     *          alert("port connected");
     *      });
     *
     * @param {draw2d.Connection} connection The connection which has been created
     * @since 2.5.1
     * @template
     **/
    onConnect: function (connection) {
    },

    /**
     * @method
     * Callback method if a new connection has created with this port
     *
     *      // Alternatively you register for this event with:
     *      port.on("connect", function(emitterPort, connection){
     *          alert("port disconnected");
     *      });
     *
     * @param {draw2d.Connection} connection The connection which has been deleted
     * @since 2.5.1
     * @template
     **/
    onDisconnect: function (connection) {
    },


    /**
     * @method
     * Return the name of this port.
     *
     * @return {String}
     **/
    getName: function () {
        return this.name;
    },

    /**
     * @method
     * Set the name of this port. The name of the port can be referenced by the lookup of
     * ports in the node.
     *
     *
     * @param {String} name The new name of this port.
     **/
    setName: function (name) {
        this.name = name;
    },

    /**
     * @method
     * Hit test for ports. This method respect the corona diameter of the port for the hit test.
     * The corona width can be set with {@link draw2d.Port#setCoronaWidth}
     * @param {Number} iX
     * @param {Number} iY
     * @returns {Boolean}
     */
    hitTest: function (iX, iY) {
        var x = this.getAbsoluteX() - this.coronaWidth - this.getWidth() / 2;
        var y = this.getAbsoluteY() - this.coronaWidth - this.getHeight() / 2;
        var iX2 = x + this.getWidth() + (this.coronaWidth * 2);
        var iY2 = y + this.getHeight() + (this.coronaWidth * 2);

        return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
    },

    /**
     * @method
     * Highlight this port
     *
     * @param {boolean} flag indicator if the figure should glow.
     */
    setGlow: function (flag) {
        if (flag === true && this.corona === null) {
            this.corona = new draw2d.Corona();
            this.corona.setDimension(this.getWidth() + (this.getCoronaWidth() * 2), this.getWidth() + (this.getCoronaWidth() * 2));
            this.corona.setPosition(this.getAbsoluteX() - this.getCoronaWidth() - this.getWidth() / 2, this.getAbsoluteY() - this.getCoronaWidth() - this.getHeight() / 2);

            this.corona.setCanvas(this.getCanvas());

            // important inital
            this.corona.getShapeElement();
            this.corona.repaint();

            // DON'T add them to the document. The corona is just a visual feedback and not part
            // of the canvas document.
            // this.parent.getCanvas().add(this.corona,this.getAbsoluteX()-this.getCoronaWidth()-this.getWidth()/2, this.getAbsoluteY()-this.getCoronaWidth()-this.getHeight()/2);
        }
        else if (flag === false && this.corona !== null) {
//    	  this.parent.getCanvas().remove(this.corona);
            this.corona.setCanvas(null);
            this.corona = null;
        }

        return this;
    },

    /**
     * @inheritdoc
     */
    createCommand: function (request) {
        // the port has its own implementation of the CommandMove
        //
        if (request.getPolicy() === draw2d.command.CommandType.MOVE) {
            if (!this.isDraggable()) {
                return null;
            }
            return new draw2d.command.CommandMovePort(this);
        }

        // Connect request between two ports
        //
        if (request.getPolicy() === draw2d.command.CommandType.CONNECT) {
            return new draw2d.command.CommandConnect(request.canvas, request.source, request.target, request.source);
        }

        return null;
    },

    /**
     * @method
     * Called from the figure itself when any position changes happens. All listener
     * will be informed.
     * <br>
     * DON'T fire this event if the Port is during a Drag&Drop operation. This can happen
     * if we try to connect two ports
     *
     * @private
     **/
    fireEvent: function (event, args) {
        if (this.isInDragDrop === true) {
            return;
        }

        this._super(event, args);
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @return
     */
    getPersistentAttributes: function () {
        var memento = this._super();

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);


        return this;
    }
});

/**
 * @class draw2d.Corona
 * Glow effect for ports. Just for internal use.
 *
 * @extend draw2d.shape.basic.Circle
 */
draw2d.Corona = draw2d.shape.basic.Circle.extend({

    /**
     * @constructor
     * Creates a new Node element which are not assigned to any canvas.
     *
     */
    init: function () {
        this._super();
        this.setAlpha(0.3);
        this.setBackgroundColor(new draw2d.util.Color(178, 225, 255));
        this.setColor(new draw2d.util.Color(102, 182, 252));
    },

    /**
     * @method
     * the the opacity of the element.
     *
     * @param {Number} percent
     */
    setAlpha: function (percent) {
        this._super(Math.min(0.3, percent));
        this.setDeleteable(false);
        this.setDraggable(false);
        this.setResizeable(false);
        this.setSelectable(false);

        return this;
    }
});

/**
 * @class draw2d.InputPort
 * A InputPort is the start anchor for a {@link draw2d.Connection}.
 *
 * @author Andreas Herz
 * @extend draw2d.Port
 */
draw2d.InputPort = draw2d.Port.extend({

    NAME: "draw2d.InputPort",

    /**
     * @constructor
     * Create a new InputPort element
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr) {
        this._super(attr);

        // responsive for the arrangement of the port
        // calculates the x/y coordinates in relation to the parent node
        this.locator = new draw2d.layout.locator.InputPortLocator();
    },


    /**
     * @inheritdoc
     */
    onDragLeave: function (figure) {
        if (figure instanceof draw2d.OutputPort) {
            this._super(figure);
        }

        else if (figure instanceof draw2d.HybridPort) {
            this._super(figure);
        }
    },


    /**
     * @inheritdoc
     */
    createCommand: function (request) {
        // Connect request between two ports
        //
        if (request.getPolicy() === draw2d.command.CommandType.CONNECT) {
            return new draw2d.command.CommandConnect(request.canvas, request.source, request.target, request.source);
        }

        // ...else call the base class
        return this._super(request);
    }
});

/**
 * @class draw2d.OutputPort
 * A OutputPort is the start anchor for a {@link draw2d.Connection}.
 *
 * @author Andreas Herz
 * @extends draw2d.Port
 */
draw2d.OutputPort = draw2d.Port.extend({

    NAME: "draw2d.OutputPort",

    /**
     * @constructor
     * Create a new OutputPort element
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr) {
        this._super(attr);

        // responsive for the arrangement of the port
        // calculates the x/y coordinates in relation to the parent node
        this.locator = new draw2d.layout.locator.OutputPortLocator();
    },


    /**
     * @inheritdoc
     *
     */
    onDragLeave: function (figure) {
        // Ports accepts only InputPorts as DropTarget
        //
        if (figure instanceof draw2d.InputPort) {
            this._super(figure);
        }
        else if (figure instanceof draw2d.HybridPort) {
            this._super(figure);
        }
    },

    /**
     * @inheritdoc
     */
    createCommand: function (request) {
        // Connect request between two ports
        //
        if (request.getPolicy() === draw2d.command.CommandType.CONNECT) {
            return new draw2d.command.CommandConnect(request.canvas, request.target, request.source, request.source);
        }

        // ...else call the base class
        return this._super(request);
    }
});

/**
 * @class draw2d.HybridPort
 * A HybridPort can work as Input and as Output port in the same way for a {@link draw2d.Connection}.
 *
 * @author Andreas Herz
 * @extends draw2d.Port
 */
draw2d.HybridPort = draw2d.Port.extend({

    NAME: "draw2d.HybridPort",

    /**
     * @constructor
     * Create a new HybridPort element
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr) {
        this._super(attr);

        // responsive for the arrangement of the port
        // calculates the x/y coordinates in relation to the parent node
        this.locator = new draw2d.layout.locator.InputPortLocator();
    },


    /**
     * @inheritdoc
     *
     * @param {draw2d.Figure} figure The figure which is currently dragging
     * @return {draw2d.Figure} the figure which should receive the drop event or null if the element didnt want a drop event
     */
    onDragEnter: function (figure) {
        // Accept any kind of port
        if (figure instanceof draw2d.Port) {
            return this._super(figure);
        }

        return null;
    },

    /**
     * @inheritdoc
     *
     */
    onDragLeave: function (figure) {
        // Ports accepts only Ports as DropTarget
        //
        if (!(figure instanceof draw2d.Port)) {
            return;
        }

        // accept any kind of port
        if (figure instanceof draw2d.Port) {
            this._super(figure);
        }

    },

    /**
     * @inheritdoc
     */
    createCommand: function (request) {
        // Connect request between two ports
        //
        if (request.getPolicy() === draw2d.command.CommandType.CONNECT) {

            if (request.source.getParent().getId() === request.target.getParent().getId()) {
                return null;
            }

            if (request.source instanceof draw2d.InputPort) {
                // This is the difference to the InputPort implementation of createCommand.
                return new draw2d.command.CommandConnect(request.canvas, request.target, request.source, request.source);
            }
            else if (request.source instanceof draw2d.OutputPort) {
                // This is the different to the OutputPort implementation of createCommand
                return new draw2d.command.CommandConnect(request.canvas, request.source, request.target, request.source);
            }
            else if (request.source instanceof draw2d.HybridPort) {
                // This is the different to the OutputPort implementation of createCommand
                return new draw2d.command.CommandConnect(request.canvas, request.target, request.source, request.source);
            }

            return null;
        }

        // ...else call the base class
        return this._super(request);
    }
});

/**
 * @class draw2d.layout.anchor.ConnectionAnchor
 *  An object to which a {@link draw2d.Connection} will be anchored.
 *
 * @inheritable
 * @author Andreas Herz
 */
draw2d.layout.anchor.ConnectionAnchor = Class.extend({
    NAME: "draw2d.layout.anchor.ConnectionAnchor",

    /**
     * @constructor
     *
     * @param {draw2d.Figure} [owner] the figure to use for the anchor calculation
     */
    init: function (owner) {
        this.owner = owner;
    },

    /**
     * @method
     * Returns the location where the Connection should be anchored in absolute coordinates.
     * The anchor may use the given reference Point to calculate this location.
     *
     * @param {draw2d.geo.Point} reference the opposite reference point
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     *
     * @return {Number} reference The reference Point in absolute coordinates
     */
    getLocation: function (reference, inquiringConnection) {
        // return the center of the owner/port.
        return this.getReferencePoint(inquiringConnection);
    },

    /**
     * @method
     * Returns the Figure that contains this ConnectionAnchor.
     *
     * @return {draw2d.Figure} The Figure that contains this ConnectionAnchor
     */
    getOwner: function () {
        return this.owner;
    },

    /**
     * @method
     * Set the owner of the Anchor.
     *
     * @param {draw2d.Figure} owner the new owner of the anchor locator
     */
    setOwner: function (owner) {
        if (typeof owner === "undefined") {
            throw "Missing parameter for 'owner' in ConnectionAnchor.setOwner";
        }
        this.owner = owner;
    },

    /**
     * @method
     * Returns the bounds of this Anchor's owner.  Subclasses can override this method
     * to adjust the box. Maybe you return the box of the port parent (the parent figure)
     *
     * @return {draw2d.geo.Rectangle} The bounds of this Anchor's owner
     */
    getBox: function () {
        return this.getOwner().getAbsoluteBounds();
    },

    /**
     * @method
     * Returns the reference point for this anchor in absolute coordinates. This might be used
     * by another anchor to determine its own location.
     *
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     * @return {draw2d.geo.Point} The reference Point
     */
    getReferencePoint: function (inquiringConnection) {
        return this.getOwner().getAbsolutePosition();
    }
});

/**
 * @class draw2d.layout.anchor.ChopboxConnectionAnchor
 *
 * The ChopboxAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box. A Connection using the
 * ChopBoxAnchor will be oriented such that they point to their port owner's
 * center.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.layout.anchor.ConnectionAnchor
 */
draw2d.layout.anchor.ChopboxConnectionAnchor = draw2d.layout.anchor.ConnectionAnchor.extend({

    NAME: "draw2d.layout.anchor.ChopboxConnectionAnchor",

    /**
     * @constructor
     *
     * @param {draw2d.Figure} owner the figure to use for the anchor calculation

     */
    init: function (owner) {
        this._super(owner);
    },

    /**
     * @method
     *
     * Returns the location where the Connection should be anchored in
     * absolute coordinates. The anchor may use the given reference
     * Point to calculate this location.
     *
     * @param {draw2d.geo.Point} reference The reference Point in absolute coordinates
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     * @return The anchor's location
     */
    getLocation: function (reference, inquiringConnection) {

        var r = new draw2d.geo.Rectangle(0, 0);
        r.setBounds(this.getBox());
        r.translate(-1, -1);
        r.resize(1, 1);

        var center = r.getCenter();

        if (r.isEmpty() || (reference.x === center.x && reference.y === center.y)) {
            return center; // This avoids divide-by-zero
        }

        var dx = reference.x - center.x;
        var dy = reference.y - center.y;

        // r.width, r.height, dx, and dy are guaranteed to be non-zero.
        var scale = 0.5 / Math.max(Math.abs(dx) / r.w, Math.abs(dy) / r.h);

        dx *= scale;
        dy *= scale;
        center.translate(dx, dy);

        return center;
    },

    /**
     * Returns the bounds of this Anchor's owner. Subclasses can
     * override this method to adjust the box. Maybe you return the box
     * of the port parent (the parent figure)
     *
     * @return The bounds of this Anchor's owner
     */
    getBox: function () {
        return this.getOwner().getParent().getBoundingBox();
    },

    /**
     * @method
     *
     * Returns the reference point for this anchor in absolute coordinates. This might be used
     * by another anchor to determine its own location.
     *
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     * @return The bounds of this Anchor's owner
     */
    getReferencePoint: function (inquiringConnection) {
        return this.getBox().getCenter();
    },

});

/**
 * @class draw2d.layout.anchor.FanConnectionAnchor
 *
 * The FanConnectionAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box.
 * Additional the anchor resolves conflicts by spread the anchor if more than one
 * connection has the same reference point. <br>
 * In a case of a DirectRouter parallel connections are the result.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @since 4.6.0
 * @extends draw2d.layout.anchor.ConnectionAnchor
 */
draw2d.layout.anchor.FanConnectionAnchor = draw2d.layout.anchor.ConnectionAnchor.extend({

    NAME: "draw2d.layout.anchor.FanConnectionAnchor",

    /**
     * @constructor
     *
     * @param {draw2d.Figure} owner the figure to use for the anchor calculation
     * @param {Number} [separation] the separation or fan distance between the concurrent/conflicting anchors
     */
    init: function (owner, separation) {
        this._super(owner);

        if (separation) {
            this.separation = parseInt(separation);
        }
        else {
            this.separation = 10;
        }
    },

    /**
     * @method
     *
     * Returns the location where the Connection should be anchored in
     * absolute coordinates. The anchor may use the given reference
     * Point to calculate this location.
     *
     * @param {draw2d.geo.Point} reference The reference Point in absolute coordinates
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     * @return The anchor's location
     */
    getLocation: function (reference, inquiringConnection) {

        var r = new draw2d.geo.Rectangle(0, 0);
        r.setBounds(this.getBox());
        r.translate(-1, -1);
        r.resize(1, 1);

        var center = r.getCenter();

        if (r.isEmpty() || (reference.x === center.x && reference.y === center.y)) {
            return center; // This avoids divide-by-zero
        }

        // translate the center if required
        //
        var s = inquiringConnection.getSource();
        var t = inquiringConnection.getTarget();
        var lines = this.getOwner().getConnections().clone();
        lines.grep(function (other) {
            return (other.getTarget() === t && other.getSource() === s) || (other.getTarget() === s && other.getSource() === t);
        });
        var index = lines.indexOf(inquiringConnection) + 1;
        var position = center.getPosition(reference);
        var ray;
        if (position == draw2d.geo.PositionConstants.SOUTH || position == draw2d.geo.PositionConstants.EAST) {
            ray = new draw2d.geo.Point(reference.x - center.x, reference.y - center.y);
        }
        else {
            ray = new draw2d.geo.Point(center.x - reference.x, center.y - reference.y);
        }
        var length = Math.sqrt(ray.x * ray.x + ray.y * ray.y);
        if (index <= 2) {
            length *= 1.5;
        }
        var xSeparation = this.separation * ray.x / length;
        var ySeparation = this.separation * ray.y / length;
        if (index % 2 === 0) {
            center = new draw2d.geo.Point(center.x + (index / 2) * (-1 * ySeparation), center.y + (index / 2) * xSeparation);
        }
        else {
            center = new draw2d.geo.Point(center.x + (index / 2) * ySeparation, center.y + (index / 2) * (-1 * xSeparation));
        }

        var intersections = this.getBox().intersectionWithLine(center, reference);
        // perfect - one intersection mean that the shifted center point is inside the bounding box and has only one intersection with it.
        //
        switch (intersections.getSize()) {
            case 0:
                // calculate the edge of the boundign box which is nearest to the reference point
                //
                var v = this.getBox().getVertices();
                var first = v.first();
                first.distance = reference.getDistance(first);
                return v.asArray().reduce(function (previous, current) {
                    current.distance = reference.getDistance(current);
                    return current.distance < previous.distance ? current : previous;
                });
            case 1:
                return intersections.get(0);
                break;
            case 2:
                // get the nearest of these points
                var p0 = intersections.get(0);
                var p1 = intersections.get(1);
                var p0diff = reference.getDistance(p0);
                var p1diff = reference.getDistance(p1);
                if (p0diff < p1diff) {
                    return p0;
                }
                return p1;
        }

        // we have 0 or 2 intersections with the bounding box. This means the shifted
        // calculate the intersection if the new "center" with the bounding box of the
        // shape (if any exists)

    },

    /**
     * Returns the bounds of this Anchor's owner. Subclasses can
     * override this method to adjust the box. Maybe you return the box
     * of the port parent (the parent figure)
     *
     * @return The bounds of this Anchor's owner
     */
    getBox: function () {
        return this.getOwner().getParent().getBoundingBox();
    },

    /**
     * @method
     *
     * Returns the reference point for this anchor in absolute coordinates. This might be used
     * by another anchor to determine its own location.
     *
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     * @return The bounds of this Anchor's owner
     */
    getReferencePoint: function (inquiringConnection) {
        return this.getBox().getCenter();
    }
});

/**
 * @class draw2d.layout.anchor.ShortesPathConnectionAnchor
 *
 * The ChopboxAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box. A Connection using the
 * ChopBoxAnchor will be oriented such that they point to their port owner's
 * center.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.layout.anchor.ConnectionAnchor
 */
draw2d.layout.anchor.ShortesPathConnectionAnchor = draw2d.layout.anchor.ConnectionAnchor.extend({

    NAME: "draw2d.layout.anchor.ShortesPathConnectionAnchor",

    /**
     * @constructor
     *
     * @param {draw2d.Figure} [owner] the figure to use for the anchor calculation
     */
    init: function (owner) {
        this._super(owner);
    },

    /**
     * @method
     *
     * Returns the location where the Connection should be anchored in
     * absolute coordinates. The anchor may use the given reference
     * Point to calculate this location.
     *
     * @param {draw2d.geo.Point} ref The reference Point in absolute coordinates
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     *
     * @return {draw2d.geo.Point} The anchor's location
     */
    getLocation: function (ref, inquiringConnection) {
        var r = this.getOwner().getParent().getBoundingBox();
        var center = r.getCenter();

        // check if we can calculate with a circle/line intersection
        //
        if (this.getOwner().getParent() instanceof draw2d.shape.basic.Oval) {
            var result = this.getOwner().getParent().intersectionWithLine(ref, center);
            if (result.getSize() == 1) {
                return result.get(0);
            }
        }

        /*    0 | 1 | 2
         *    __|___|__
         *    7 | 8 | 3
         *    __|___|__
         *    6 | 5 | 4
         */
        var octant = r.determineOctant(new draw2d.geo.Rectangle(ref.x, ref.y, 2, 2));

        switch (octant) {
            case 0:
                return r.getTopLeft();
            case 1:
                return new draw2d.geo.Point(ref.x, r.getTop());
            case 2:
                return r.getTopRight();
            case 3:
                return new draw2d.geo.Point(r.getRight(), ref.y);
            case 4:
                return r.getBottomRight();
            case 5:
                return new draw2d.geo.Point(ref.x, r.getBottom());
            case 6:
                return r.getBottomLeft();
            case 7:
                return new draw2d.geo.Point(r.getLeft(), ref.y);
        }

        return r.getTopLeft();
    },

    /**
     * Returns the bounds of this Anchor's owner. Subclasses can
     * override this method to adjust the box. Maybe you return the box
     * of the port parent (the parent figure)
     *
     * @return The bounds of this Anchor's owner
     */
    getBox: function () {
        return this.getOwner().getParent().getBoundingBox();
    },

    /**
     * @method
     *
     * Returns the bounds of this Anchor's owner. Subclasses can
     * override this method to adjust the box. Maybe you return the box
     * of the port parent (the parent figure)
     *
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     *
     * @return The bounds of this Anchor's owner
     */
    getReferencePoint: function (inquiringConnection) {
        return this.getBox().getCenter();
    }
});

/**
 * @class draw2d.layout.anchor.CenterEdgeConnectionAnchor
 *
 * The ChopboxAnchor's location is found by calculating the intersection of a
 * line drawn from the center point of its owner's box (the parent of the
 * connection port) to a reference point on that box. A Connection using the
 * ChopBoxAnchor will be oriented such that they point to their port owner's
 * center.
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extends draw2d.layout.anchor.ConnectionAnchor
 */
draw2d.layout.anchor.CenterEdgeConnectionAnchor = draw2d.layout.anchor.ConnectionAnchor.extend({

    NAME: "draw2d.layout.anchor.CenterEdgeConnectionAnchor",

    /**
     * @constructor
     *
     * @param {draw2d.Figure} [owner] the figure to use for the anchor calculation
     */
    init: function (owner) {
        this._super(owner);
    },

    /**
     * @method
     *
     * Returns the location where the Connection should be anchored in
     * absolute coordinates. The anchor may use the given reference
     * Point to calculate this location.
     *
     * @param {draw2d.geo.Point} ref The reference Point in absolute coordinates
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     *
     * @return {draw2d.geo.Point} The anchor's location
     */
    getLocation: function (ref, inquiringConnection) {
        var r = this.getOwner().getParent().getBoundingBox();

        var dir = r.getDirection(ref);
        var center = r.getCenter();

        switch (dir) {
            case 0:
                center.y = r.y;
                break;
            case 1:
                center.x = r.x + r.w;
                break;
            case 2:
                center.y = r.y + r.h;
                break;
            case 3:
                center.x = r.x;
        }

        return center;
    },

    /**
     * Returns the bounds of this Anchor's owner. Subclasses can
     * override this method to adjust the box. Maybe you return the box
     * of the port parent (the parent figure)
     *
     * @return The bounds of this Anchor's owner
     */
    getBox: function () {
        return this.getOwner().getParent().getBoundingBox();
    },

    /**
     * @method
     *
     * Returns the bounds of this Anchor's owner. Subclasses can
     * override this method to adjust the box. Maybe you return the box
     * of the port parent (the parent figure)
     *
     * @param {draw2d.Connection} inquiringConnection the connection who ask for the location.
     * @return The bounds of this Anchor's owner
     */
    getReferencePoint: function (inquiringConnection) {
        return this.getBox().getCenter();
    }
});

/**
 * @class draw2d.shape.arrow.CalligrapherArrowLeft
 * Hand drawn arrow to the left.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.arrow.CalligrapherArrowLeft({x:10, y:10, color:"#3d3d3d"});
 *
 *     canvas.add(figure);
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.arrow.CalligrapherArrowLeft = draw2d.SVGFigure.extend({

    NAME: "draw2d.shape.arrow.CalligrapherArrowLeft",

    /**
     * @constructor
     * Creates a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr);
    },


    getSVG: function () {
        return '<svg width="230" height="60" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
            '  <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3024" d="m 218.87943,27.464763 c -1.21088,-0.0563 -2.42064,-0.14616 -3.63262,-0.16893 c -5.82495,-0.10948 -18.61676,-0.0226 -22.97385,0.0122 c -7.12848,0.057 -14.25673,0.14021 -21.38495,0.22333 c -9.03765,0.10539 -18.07511,0.22813 -27.11266,0.3422 c -10.2269,0.11878 -20.4538,0.23756 -30.6807,0.35634 c -35.488759,0.4089 -70.975849,0.82793 -106.4669238,0.95195 c 0,0 7.9718628,-5.70244 7.9718628,-5.70244 l 0,0 c 6.374241,0.28694 12.745594,0.64561 19.122722,0.86083 c 28.09499,0.94816 56.21338,0.92473 84.315959,0.32205 c 10.51273,-0.32805 21.0288,-0.56402 31.53819,-0.98412 c 27.47361,-1.09824 54.91405,-2.91665 82.28177,-5.53697 c 0,0 -12.9788,9.32351 -12.9788,9.32351 z" inkscape:connector-curvature="0" />' +
            '  <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3026" d="m 100.75066,1.6309831 c -7.165239,3.9571 -14.284929,7.47866 -22.036659,10.2707299 c -5.00195,1.80163 -10.10374,3.31886 -15.2402,4.79424 c -8.25878,2.37815 -16.55626,4.65805 -24.9012,6.79479 c -2.89107,0.71593 -5.74687,1.56407 -8.66266,2.20424 c -3.211679,0.70512 -6.49468,1.17333 -9.752959,1.6747 c -5.447101,0.92112 -10.9044008,1.81762 -16.3983488,2.50082 c -1.608931,0.0814 -0.850754,0.10697 -2.275834,-0.0365 C 20.004071,21.041553 19.256899,21.517873 32.515691,19.216243 c 6.21537,-1.05913 12.34875,-2.37668 18.3945,-4.03234 c 8.12719,-2.02803 16.23765,-4.1157 24.26421,-6.4321199 c 5.23574,-1.55053 10.41682,-3.15473 15.46857,-5.12875 c 1.38953,-0.54295 2.7579,-1.12682 4.12253,-1.71603 c 0.98421,-0.42496 3.86537,-1.81801999 2.92296,-1.32600999 C 93.642191,2.6934931 89.529511,4.7073031 85.450031,6.7704531 l 15.300629,-5.1394 z" inkscape:connector-curvature="0" sodipodi:nodetypes="csccsccccccsssccc" />' +
            '  <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3028" d="m 80.764281,58.068863 c -2.45498,-3.50762 -6.58178,-6.10525 -10.40324,-8.66732 c -4.30614,-2.72676 -7.93958,-6.28283 -12.6021,-8.28702 c -7.39912,-4.50257 -11.70055,-7.85592 -20.85866,-9.23429 c -4.9257,-0.85706 -17.294247,-1.32043 -22.226462,-2.15427 c -3.445882,-0.42869 -6.2035918,0.70541 -9.6845138,0.57715 c -1.496337,-0.0586 -2.99355,-0.0965 -4.491229,-0.12472 l 13.9525278,-6.24562 l 3.25,-1.17153 c 1.441459,0.0813 -1.116338,0.15309 0.325505,0.23016 c 3.574557,0.17902 7.211864,0.0695 10.712655,0.73822 c 4.723107,1.08097 9.443947,2.1624 14.234177,3.05317 c 2.76739,0.64203 3.92627,0.87082 6.64127,1.66289 c 4.42146,1.28993 8.60075,3.01513 12.86503,4.58129 c 1.90199,0.73446 5.05193,1.93181 6.89302,2.7216 c 4.92005,2.11061 9.5916,4.57045 13.9716,7.31023 c 4.16708,2.62011 8.48023,5.20033 11.72012,8.56863 z" inkscape:connector-curvature="0" sodipodi:nodetypes="ccccccccccccscsccc" />' +
            '</svg>';
    },

    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     **/
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }


        if (this.svgNodes !== null) {
            this.svgNodes.attr({fill: this.color.hash()});
        }

        this._super(attributes);
    }

});

/**
 * @class draw2d.shape.arrow.CalligrapherArrowDownLeft
 * Hand drawn arrow which points down left
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.arrow.CalligrapherArrowDownLeft({x:10,y:10, color:"#3d3d3d"});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.arrow.CalligrapherArrowDownLeft = draw2d.SVGFigure.extend({

    NAME: "draw2d.shape.arrow.CalligrapherArrowDownLeft",

    /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr);
    },


    getSVG: function () {
        return '<svg width="180" height="300" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
            '     <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3084" d="m 159.63578,17.846597 c 0.43137,9.44641 -0.0636,18.88035 -0.8284,28.30165 c -1.73211,18.38336 -4.05381,36.71698 -6.08253,55.075313 c -1.61738,13.7075 -3.03402,27.43467 -3.97611,41.19113 c -1.09101,11.16584 -1.31019,22.36559 -1.28541,33.56466 c -0.1328,4.82188 0.3218,9.6468 0.14332,14.46812 c -0.0888,2.39977 -0.28315,3.73625 -0.55012,6.12095 c -0.85848,4.73147 -2.27416,9.40019 -4.7769,13.68272 c -1.47003,2.51544 -3.78493,5.6647 -5.47739,8.05048 c -5.02888,6.66256 -11.08555,12.65652 -18.10552,17.75963 c -4.23302,3.07716 -7.74942,5.12065 -12.22081,7.86298 c -13.253319,6.72606 -25.889792,15.11686 -40.84124,18.60576 c -3.016829,0.7039 -4.431417,0.8157 -7.450859,1.2076 c -6.983246,0.5774 -14.009174,0.3375 -21.010676,0.2509 c -3.278795,-0.033 -6.55749,0.01 -9.835897,0.045 c 0,0 20.838833,-13.2364 20.838833,-13.2364 l 0,0 c 3.147056,0.093 6.294483,0.1852 9.443646,0.2007 c 6.966697,0.011 13.971433,0.1301 20.897176,-0.6344 c 3.732439,-0.5577 7.321215,-1.2431 10.881203,-2.4145 c 1.517208,-0.4992 5.830867,-2.43339 4.487902,-1.6386 c -6.098183,3.6088 -25.104875,12.8748 -9.52514,5.223 c 4.40875,-2.5927 8.262057,-4.7459 12.425175,-7.65986 c 6.839117,-4.78709 12.633657,-10.50427 17.500607,-16.86761 c 2.53518,-3.56692 5.24684,-7.12748 7.07617,-11.03446 c 1.42357,-3.0404 2.21532,-6.28727 2.91146,-9.50152 c 0.91919,-6.88822 1.03991,-13.81392 1.25118,-20.74151 c 0.47683,-11.27871 0.96259,-22.55877 1.61689,-33.83062 c 1.21127,-14.03392 3.64191,-27.94339 5.46543,-41.92167 c 2.26899,-18.186603 4.6835,-36.384373 5.4487,-54.679643 c 0.0788,-2.46092 0.23808,-4.92087 0.23618,-7.38276 c -0.005,-6.45916 -0.62194,-13.00218 -2.13821,-19.32664 c 0,0 23.48134,-10.73998 23.48134,-10.73998 z" inkscape:connector-curvature="0" />' +
            '     <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3086" d="m 41.271518,252.40239 c 2.465518,-0.7264 4.879503,-1.7726 7.145328,-2.9859 c 0.955597,-0.5117 3.736822,-2.1986 2.791991,-1.6673 c -5.218817,2.9348 -10.409826,5.9187 -15.61474,8.878 c 5.366557,-3.4898 10.227818,-7.6685 14.119927,-12.75576 c 3.507157,-5.09382 4.097613,-11.17122 4.301158,-17.17644 c 0.02635,-3.95844 -0.31227,-7.90612 -0.635377,-11.84752 c 0,0 19.920693,-10.3059 19.920693,-10.3059 l 0,0 c 0.171761,4.05015 0.409899,8.09777 0.50079,12.15101 c -0.185739,6.23619 -0.347804,12.66862 -3.492579,18.24747 c -0.503375,0.75197 -0.961922,1.53596 -1.510126,2.25591 c -3.478528,4.56826 -8.226837,8.04586 -12.757403,11.47443 c -7.345206,4.3297 -14.671333,8.692 -22.035619,12.9891 c -3.551305,2.0723 -7.368692,3.8726 -11.394645,4.7773 c 0,0 18.660602,-14.0344 18.660602,-14.0344 z" inkscape:connector-curvature="0" />' +
            '     <path style="fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path3088" d="m 37.815923,255.49919 c 3.41111,0.1581 6.814569,0.2213 10.182693,0.8184 c 6.92998,2.6928 13.533527,6.2357 20.043462,9.8162 c 3.912139,2.1362 7.91195,4.4644 10.690321,8.0298 c 1.039962,1.2802 1.510411,2.7604 1.893523,4.3313 c 0,0 -20.370847,10.9259 -20.370847,10.9259 l 0,0 c -0.225419,-1.2711 -0.55067,-2.4558 -1.329618,-3.5184 c -2.332229,-3.3633 -5.869056,-5.6279 -9.247191,-7.8233 c -6.335066,-3.7106 -12.98611,-7.1834 -20.232784,-8.6836 c -3.497247,-0.3814 -7.011372,-0.4307 -10.521829,-0.1703 c 0,0 18.89227,-13.726 18.89227,-13.726 z" inkscape:connector-curvature="0" />' +
            '</svg>';
    },

    /**
     * @method
     * propagate all attributes like color, stroke,... to the shape element
     **/
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }


        if (this.svgNodes !== null) {
            this.svgNodes.attr({fill: this.color.hash()});
        }

        this._super(attributes);
    }

});

/**
 * @class draw2d.shape.node.Start
 *
 * A generic Node which has an OutputPort. Mainly used for demo and examples.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.node.Start({color: "#3d3d3d"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.node.Start = draw2d.shape.basic.Rectangle.extend({

    NAME: "draw2d.shape.node.Start",

    DEFAULT_COLOR: new draw2d.util.Color("#4D90FE"),

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({
            bgColor: this.DEFAULT_COLOR,
            color: this.DEFAULT_COLOR.darker(),
            width: 50,
            height: 50
        }, attr), setter, getter);

        this.createPort("output");
    }

});

/**
 * @class draw2d.shape.node.End
 * A simple Node which has a InputPort. Mainly used for demo and examples.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.node.End({color: "#3d3d3d"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.node.End = draw2d.shape.basic.Rectangle.extend({

    NAME: "draw2d.shape.node.End",

    DEFAULT_COLOR: new draw2d.util.Color("#4D90FE"),

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({
            bgColor: this.DEFAULT_COLOR,
            color: this.DEFAULT_COLOR.darker(),
            width: 50,
            height: 50
        }, attr), setter, getter);

        this.createPort("input");

    }

});

/**
 * @class draw2d.shape.node.Between
 * A simple Node which has a  InputPort and OutputPort. Mainly used for demo and examples.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.node.Between({color: "#3d3d3d"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.node.Between = draw2d.shape.basic.Rectangle.extend({

    NAME: "draw2d.shape.node.Between",

    DEFAULT_COLOR: new draw2d.util.Color("#4D90FE"),

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({
            bgColor: this.DEFAULT_COLOR,
            color: this.DEFAULT_COLOR.darker(),
            width: 50,
            height: 50
        }, attr), setter, getter);

        this.createPort("output");
        this.createPort("input");
    }
});

/**
 * @class draw2d.shape.note.PostIt
 *
 * Simple Post-it like figure with text. Can be used for annotations or documentation.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var shape =  new draw2d.shape.note.PostIt({
 *        text:"This is a simple sticky note",
 *        color:"#000000",
 *        padding:20
 *     });
 *
 *     canvas.add(shape,40,10);
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Label
 */
draw2d.shape.note.PostIt = draw2d.shape.basic.Label.extend({

    NAME: "draw2d.shape.note.PostIt",

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super(attr);

        this.setStroke(1);
        this.setBackgroundColor("#5b5b5b");
        this.setColor("#FFFFFF");
        this.setFontColor("#ffffff");
        this.setFontSize(14);
        this.setPadding(5);
        this.setRadius(5);
    }
});

/**
 * @class draw2d.shape.widget.Widget
 * Base class for all diagrams.
 *
 * @extends draw2d.SetFigure
 */
draw2d.shape.widget.Widget = draw2d.SetFigure.extend({

    init: function (attr, setter, getter) {
        this._super(attr);
    }
});

/**
 * @class draw2d.shape.widget.Slider
 * See the example:
 *
 *     @example preview small frame
 *
 *     var slider = new draw2d.shape.widget.Slider({width:120, height:20});
 *     canvas.add( slider,100,60);
 *
 * @extends draw2d.shape.widget.Widget
 */
draw2d.shape.widget.Slider = draw2d.shape.widget.Widget.extend({

    NAME: "draw2d.shape.widget.Slider",

    DEFAULT_COLOR_THUMB: new draw2d.util.Color("#bddf69"),
    DEFAULT_COLOR_BG: new draw2d.util.Color("#d3d3d3"),


    init: function (attr, setter, getter) {
        this.currentValue = 0; // [0..100]
        this.slideBoundingBox = new draw2d.geo.Rectangle(0, 0, 10, 20);

        this._super($.extend({width: 150, height: 15}, attr));

        this.setBackgroundColor(this.DEFAULT_COLOR_BG);
        this.setColor(this.DEFAULT_COLOR_THUMB);
        this.setStroke(1);
        this.setRadius(4);
        this.setResizeable(true);

        this.setMinHeight(10);
        this.setMinWidth(80);
    },

    /**
     * @method
     * Create the additional elements for the figure
     *
     */
    createSet: function () {
        var result = this.canvas.paper.set();
        var thumb = this.canvas.paper.rect(5, 5, 10, 20);
        thumb.node.style.cursor = "col-resize";
        result.push(thumb);

        return result;
    },

    setDimension: function (w, h) {
        this._super(w, h);
        this.slideBoundingBox.setBoundary(0, 0, this.getWidth() - 10, this.getHeight());
        this.slideBoundingBox.setHeight(this.getHeight() + 1);

        // TODO: and repaint again.....two repaints for one "setDimension"....BAD
        //
        this.repaint();
    },

    /**
     * @method
     * Called if the value of the slider has been changed.
     *
     * @param {Number} value The new value of the slider in percentage [0..100]
     * @template
     */
    onValueChange: function (value) {
    },

    /**
     * @method
     * Will be called if the drag and drop action begins. You can return [false] if you
     * want avoid that the figure can be move.
     *
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @return {boolean} true if the figure accepts dragging
     **/
    onDragStart: function (x, y, shiftKey, ctrlKey) {

        // check if the use has been clicked on the thumb
        //
        if (this.slideBoundingBox.hitTest(x, y)) {
            this.origX = this.slideBoundingBox.getX();
            this.origY = this.slideBoundingBox.getY();
            return false;
        }

        return this._super(x, y, shiftKey, ctrlKey);
    },

    /**
     * @method
     * Called by the framework if the figure returns false for the drag operation. In this
     * case we send a "panning" event - mouseDown + mouseMove. This is very usefull for
     * UI-Widget like slider, spinner,...
     *
     * @param {Number} dx the x difference between the mouse down operation and now
     * @param {Number} dy the y difference between the mouse down operation and now
     * @param {Number} dx2 The x diff since the last call of this dragging operation
     * @param {Number} dy2 The y diff since the last call of this dragging operation
     */
    onPanning: function (dx, dy, dx2, dy2) {
        this.slideBoundingBox.setPosition(this.origX + dx, this.origY + dy);
        // calculate the internal value of the slider
        this.setValue(100 / (this.slideBoundingBox.bw - this.slideBoundingBox.getWidth()) * this.slideBoundingBox.getX());
    },

    /**
     * @method
     * Set the current value of the slider. Valid values are [0..100]
     *
     * @param {Number} value values between [0..100]
     */
    setValue: function (value) {
        this.currentValue = Math.min(Math.max(0, (value | 0)), 100);
        this.repaint();
        this.onValueChange(this.currentValue);
        this.fireEvent("change:value");
    },


    /**
     *
     * @param attributes
     */
    repaint: function (attributes) {

        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        // adjust the slider to the current value and the new dimension of the widget
        //
        var thumbX = ((this.slideBoundingBox.bw - this.slideBoundingBox.getWidth()) / 100 * this.currentValue) | 0;
        this.slideBoundingBox.setX(thumbX);


        // update slider
        //
        if (this.svgNodes !== null) {
            var attr = this.slideBoundingBox.toJSON();
            attr.y = attr.y - 5;
            attr.height = attr.height + 10;
            attr.fill = this.getColor().hash();
            attr.stroke = this.getColor().darker(0.2).hash();
            attr.r = 4;
            this.svgNodes.attr(attr);
        }


        attributes.fill = "90-" + this.bgColor.hash() + ":5-" + this.bgColor.lighter(0.3).hash() + ":95";
        attributes.stroke = this.bgColor.darker(0.1).hash();

        this._super(attributes);
    },


    applyTransformation: function () {
        this.svgNodes.transform("T" + this.getAbsoluteX() + "," + this.getAbsoluteY());
    }

});

/**
 * @class draw2d.shape.diagram.Diagram
 *
 * Base class for all diagrams.
 *
 * @extends draw2d.SetFigure
 */
draw2d.shape.diagram.Diagram = draw2d.SetFigure.extend({

    /**
     * @constructor
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.data = [];
        this.cache = {};

        this._super(
            $.extend({data: [], bgColor: "#8dabf2", stroke: 1, color: "#f0f0f0", radius: 2, resizeable: true}, attr),
            $.extend({}, {
                /** @attr {Array} data the data to display in the diagram */
                data: this.setData
            }, setter),
            $.extend({}, {
                data: this.getData
            }, getter)
        );
    },

    /**
     * @method
     * Set the data for the chart/diagram element
     *
     * @param {Array} data
     *
     */
    setData: function (data) {
        this.data = data;
        this.cache = {};


        if (this.svgNodes !== null) {
            this.svgNodes.remove();
            this.svgNodes = this.createSet();
        }

        this.repaint();
        this.fireEvent("change:data");

    },

    /**
     * @method
     * Return the data of the diagram
     *
     * @since 5.0.0
     */
    getData: function () {
        return this.data;
    },


    /**
     * @method
     * Set the dimension of the diagram and reset the cached calculation
     *
     * @since 5.0.0
     */
    setDimension: function (w, h) {
        this.cache = {};
        this._super(w, h);

        return this;
    },


    /**
     * @method
     * Return the calculate width of the set. This calculates the bounding box of all elements.
     *
     * @return {Number} the calculated width of the label
     **/
    getWidth: function () {
        return this.width;
    },

    /**
     * @method
     * Return the calculated height of the set. This calculates the bounding box of all elements.
     *
     * @return {Number} the calculated height of the label
     */
    getHeight: function () {
        return this.height;
    },

    /**
     *
     * @param attributes
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape == null) {
            return;
        }

        attributes = attributes || {};

        if (typeof attributes.fill === "undefined") {
            attributes.fill = "none";
        }

        this._super(attributes);

        return this;
    },

    applyTransformation: function () {
        if (this.isResizeable() === true) {
            this.svgNodes.transform("S" + this.scaleX + "," + this.scaleY + "," + this.getAbsoluteX() + "," + this.getAbsoluteY() + "t" + this.getAbsoluteX() + "," + this.getAbsoluteY());
        }
        else {
            this.svgNodes.transform("T" + this.getAbsoluteX() + "," + this.getAbsoluteY());
        }

        return this;
    }


});

/**
 * @class draw2d.shape.diagram.Pie
 *
 * Small data pie chart.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var pie = new draw2d.shape.diagram.Pie({
 *        diameter:80,
 *        data:[30,60,122,4],
 *        x:100,
 *        y:60
 *     });
 *
 *     canvas.add( pie);
 *
 * @extends draw2d.shape.diagram.Diagram
 */
draw2d.shape.diagram.Pie = draw2d.shape.diagram.Diagram.extend({

    COLORS: ['#00A8F0', '#b9dd69', '#f3546a', '#4DA74D', '#9440ED'],
    TWO_PI: Math.PI * 2,

    /**
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {


        this._super(
            $.extend({stroke: 0}, attr),
            $.extend({
                /** @attr {Number} diameter the diameter of the pie chart */
                diameter: this.setDiameter,
                /** @attr {Number} radius the radius of the pie chart */
                radius: this.setRadius
            }, setter),
            $.extend({
                diameter: this.getDiameter,
                radius: this.getRadius
            }, getter));
    },

    /**
     * @method
     * Set the diameter of the circle. The center of the circle will be retained.
     *
     * @param {Number} d The new diameter of the circle.
     * @since 4.0.0
     **/
    setDiameter: function (d) {
        var center = this.getCenter();
        this.setDimension(d, d);
        this.setCenter(center);
        this.fireEvent("change:diameter");

        return this;
    },

    /**
     * @method
     * Get the diameter of the circle.
     *
     * @since 4.0.0
     **/
    getDiameter: function () {
        return this.getWidth();
    },


    /**
     * @method
     * Set the radius of the circle. The center of the circle will be retained.
     *
     * @param {Number} r The new radius of the circle.
     * @since 4.0.0
     **/
    setRadius: function (r) {
        this.setDiameter(r * 2);
        this.fireEvent("change:radius");

        return this;
    },


    /**
     * @method
     * Get the center of the circle
     *
     */
    getCenter: function () {
        var d2 = this.getDiameter() / 2;
        return this.getPosition().translate(d2, d2);
    },

    /**
     * @method
     * Set the center of the circle.
     *
     * @param {Number|draw2d.geo.Point} x the new x coordinate of the center or a draw2d.geo.Point object with the center
     * @param {Number} y the y coordinate of the new center of the first argument isn't a draw2d.geo.Point object
     */
    setCenter: function (x, y) {
        var pos = new draw2d.geo.Point(x, y);
        var d2 = this.getDiameter() / 2;
        pos.translate(-d2, -d2);
        this.setPosition(pos);
        this.fireEvent("change:center");

        return this;
    },

    /**
     * @inheritdoc
     */
    setData: function (data) {

        // Normalize the Data.
        // The SUM must be == 1.
        this.sum = 0;
        var _this = this;
        $.each(data, function (i, val) {
            _this.sum += val;
        });
        var _sum = 1 / this.sum;
        $.each(data, function (i, val) {
            data[i] = _sum * val;
        });

        //  pass the normalize data to the base implementation
        //
        this._super(data);
        this.fireEvent("change:data");

        return this;
    },

    /**
     * @inheritdoc
     */
    createSet: function () {
        var radius = this.getWidth() / 2;
        var length = this.data.length;

        var pie = this.canvas.paper.set();

        var offsetAngle = 0;

        for (var i = 0; i < length; i++) {
            // angle is percent of TWO_PI
            var angle = this.TWO_PI * this.data[i];
            var color = this.COLORS[i % length];
            var seg = this.drawSegment(radius, angle, offsetAngle, 0.1);
            seg.attr({stroke: this.color.hash(), fill: color});
            pie.push(seg);
            offsetAngle += angle;
        }
        return pie;
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
        // keep the aspect ration
        //
        if (w > h) {
            this._super(w, w);
        }
        else {
            this._super(h, h);
        }

        // we must recreate the diagram if we change the size.
        // low performance. Better: transfor/scale the set. Can be done in the next release
        //
        if (this.svgNodes !== null) {
            this.svgNodes.remove();
            this.svgNodes = this.createSet();
        }

        this.repaint();

        return this;
    },

    polarPath: function (radius, theta, rotation) {
        var x, y;
        x = radius * Math.cos(theta + rotation) + radius;
        y = radius * Math.sin(theta + rotation) + radius;
        return "L " + x + " " + y + " ";
    },

    drawSegment: function (radius, value, rotation, resolution) {
        var path = "M " + radius + " " + radius;

        for (var i = 0; i < value; i += resolution) {
            path += this.polarPath(radius, i, rotation);
        }
        path += this.polarPath(radius, value, rotation);

        path += "L " + radius + " " + radius;
        return this.getCanvas().paper.path(path);
    },

    /**
     * @inheritdoc
     */
    applyTransformation: function () {
        this.svgNodes.transform("T" + this.getAbsoluteX() + "," + this.getAbsoluteY());

        return this;
    }

});

/**
 * @class draw2d.shape.diagram.Sparkline
 *
 * Small data line diagram.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var testData = [];
 *     for(var i=0;i<100;i++) {
 *       testData.push(Math.floor(Math.random() * 100));
 *     }
 *
 *     var sparkline = new draw2d.shape.diagram.Sparkline({
 *     	data: testData,
 *      width:150,
 *      height:50,
 *      x:100,
 *      y:60
 *     });
 *
 *     canvas.add( sparkline);
 *
 * @extends draw2d.shape.diagram.Diagram
 */
draw2d.shape.diagram.Sparkline = draw2d.shape.diagram.Diagram.extend({

    /**
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.min = 0;
        this.max = 10;
        this.padding = 4;

        this._super($.extend({width: 180, height: 50}, attr), setter, getter);
    },

    /**
     * @inheritdoc
     */
    setData: function (data) {
        if (data.length > 0) {
            // get the min/max from an array and not only from two elements..
            this.min = Math.min.apply(Math, data);
            this.max = Math.max.apply(Math, data);
        }
        else {
            this.min = 0;
            this.max = 1;
        }

        if (this.max == this.min) {
            this.max = this.min + 1;
        }

        this._super(data);
        this.fireEvent("change:data");

        return this;
    },

    /**
     * @inheritdoc
     */
    createSet: function () {
        return this.canvas.paper.path("M0 0 l0 0");
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        attributes.fill = "90-#000:5-#4d4d4d:95";

        var padding = this.padding;
        var width = this.getWidth() - 2 * padding;
        var height = this.getHeight() - 2 * padding;
        var length = this.data.length;
        var min = this.min;
        var max = this.max;
        var toCoords = function (value, idx) {
            var step = 1;
            // avoid divisionByZero
            if (length > 1) {
                step = (width / (length - 1));
            }

            return {
                y: -((value - min) / (max - min) * height) + height + padding,
                x: padding + idx * step
            };
        };

        if (this.svgNodes !== null && (typeof this.cache.pathString === "undefined")) {
            var prev_pt = null;
            $.each(this.data, $.proxy(function (idx, item) {
                var pt = toCoords(item, idx);
                if (prev_pt === null) {
                    this.cache.pathString = ["M", pt.x, pt.y].join(" ");
                }
                else {
                    this.cache.pathString = [this.cache.pathString, "L", pt.x, pt.y].join(" ");
                }
                prev_pt = pt;
            }, this));

            this.svgNodes.attr({path: this.cache.pathString, stroke: "#f0f0f0"});

        }
        this._super(attributes);

        return this;
    }
});

/**
 * @class draw2d.shape.analog.OpAmp
 * Hand drawn arrow which points down left
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.analog.OpAmp({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.analog.OpAmp = draw2d.SVGFigure.extend({

    NAME: "draw2d.shape.analog.OpAmp",

    // custom locator for the special design of the OpAmp Input area
    MyInputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, port) {
            var parent = port.getParent();
            var calcY = (8 + 18.5 * index) * parent.scaleY;
            this.applyConsiderRotation(port, 1, calcY);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({stroke: 0, bgColor: "#f0f0ff"}, attr), setter, getter);

        this.inputLocator = new this.MyInputPortLocator();

        this.createPort("input", this.inputLocator);
        this.createPort("input", this.inputLocator);

        this.createPort("output");

    },


    /**
     * @inheritdoc
     */
    getSVG: function () {
        return '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50"  height="50">' +
            '<path d="m8.2627,0l0,35.36035l31.23926,-17.76025l-31.23926,-17.60011l0,0l0,0.00001zm2.27832,27.36719l4.08105,0m-2.10449,-2.20703l0,4.27979m2.26367,-21.35938l-4.15918,0"  stroke="#1B1B1B" fill="none"/>' +
            '<line x1="0.53516"  y1="8"  x2="8.21191"  y2="8"  stroke="#010101"/>' +
            '<line x1="39.14941" y1="18" x2="45.81055" y2="18" stroke="#010101" />' +
            '<line x1="0.53516"  y1="27" x2="8.21191"  y2="27" stroke="#010101" />' +
            '</svg>';
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }

        attributes = attributes || {};

        // redirect the backgroundColor to an internal SVG node.
        // In this case only a small part of the shape are filled with the background color
        // and not the complete rectangle/bounding box
        //
        attributes["fill"] = "none";
        if (this.bgColor != null) {
            this.svgNodes[0].attr({fill: this.bgColor.hash()});
        }

        this._super(attributes);

        return this;
    }

});

/**
 * @class draw2d.shape.analog.ResistorBridge
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.analog.ResistorBridge({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.analog.ResistorBridge = draw2d.SVGFigure.extend({

    NAME: "draw2d.shape.analog.ResistorBridge",

    // custom locator for the special design of the ResistorBridge Input area
    MyInputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure, w / 2 + 1, h * index);
        }
    }),

    // custom locator for the special design of the ResistorBridge Input area
    MyOutputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();

            this.applyConsiderRotation(figure, w * (index - 2), h / 2);
        }
    }),


    /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        this._super($.extend({width: 50, height: 50}, attr), setter, getter);

        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid", this.inputLocator);
        this.createPort("hybrid", this.inputLocator);

        this.createPort("hybrid", this.outputLocator);
        this.createPort("hybrid", this.outputLocator);
    },


    /**
     * @inheritdoc
     */
    getSVG: function () {
        return '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">' +
            '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12322" d="m47.62207,22.71094l0,0c0.73145,0.73242 0.71777,1.93359 -0.03027,2.68164c-0.74805,0.74951 -1.94922,0.76123 -2.68073,0.0293c-0.73138,-0.73242 -0.71967,-1.93211 0.03033,-2.68115c0.74707,-0.74803 1.94727,-0.76219 2.68066,-0.02979l0,0z"/>' +
            '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12324" d="m25.84082,0.93115l0,0c0.73145,0.73096 0.71875,1.93359 -0.02832,2.68066c-0.75,0.74951 -1.94922,0.76123 -2.68164,0.0293c-0.73242,-0.73241 -0.71973,-1.93164 0.0293,-2.68065c0.74805,-0.74756 1.94922,-0.76172 2.68066,-0.0293l0,0l0,-0.00002z"/>' +
            '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12326" d="m25.75098,44.58203l0,0c0.73145,0.73193 0.71875,1.93311 -0.02832,2.68115c-0.75,0.74902 -1.94922,0.76074 -2.68262,0.0293c-0.73145,-0.73193 -0.71973,-1.93262 0.03033,-2.68164c0.74707,-0.74756 1.94922,-0.76123 2.68066,-0.02879l0,0l-0.00006,-0.00002z"/>' +
            '<path fill="#010101" stroke="#010101" stroke-miterlimit="14.3" id="path12328" d="m3.9707,22.80127l0,0c0.73242,0.73193 0.71777,1.93359 -0.0293,2.68115c-0.74902,0.74951 -1.94922,0.76172 -2.68164,0.0293c-0.73145,-0.73242 -0.71973,-1.93164 0.03027,-2.68115c0.74707,-0.74707 1.94922,-0.76074 2.68066,-0.0293l0,0z"/>' +
            '<polyline fill="none" stroke="#010101" id="polyline12334" points="24.908203125,45.49267578125 31.71875,38.68310546875 31.2119140625,36.98876953125 34.892578125,37.95703125 33.953125,34.22265625 37.6650390625,35.18359375 36.6767578125,31.52490234375 40.3759765625,32.47314453125 39.873046875,30.52783203125 45.884765625,24.51708984375 " stroke-miterlimit="14.3"/>' +
            '<polyline fill="#010101" id="polyline12338" points="36.3408203125,23.98876953125 38.146484375,29.55810546875 33.630859375,29.55810546875 35.435546875,23.98779296875 "/>' +
            '<line fill="none" stroke="#010101" id="line12340" y2="28.90967" x2="35.8877" y1="41.13428" x1="35.88867" stroke-miterlimit="14.3"/>' +
            '<polyline fill="none" stroke="#010101" id="polyline12346" points="3.2109375,23.79248046875 10.01953125,16.98388671875 9.513671875,15.2890625 13.193359375,16.25732421875 12.251953125,12.5234375 15.9658203125,13.48486328125 14.9775390625,9.82568359375 18.6767578125,10.7734375 18.173828125,8.82958984375 24.185546875,2.81787109375 " stroke-miterlimit="14.3"/>' +
            '<polyline fill="#010101" id="polyline12350" points="13.126953125,23.80419921875 11.3212890625,18.236328125 15.8369140625,18.236328125 14.0322265625,23.806640625 "/>' +
            '<line fill="none" stroke="#010101" id="line12352" y2="18.8833" x2="13.58008" y1="6.65967" x1="13.5791" stroke-miterlimit="14.3"/>' +
            '<polyline fill="none" stroke="#010101" id="polyline12358" points="46.65625,24.33642578125 39.84765625,17.52783203125 38.154296875,18.033203125 39.1220703125,14.353515625 35.3876953125,15.29345703125 36.34765625,11.58056640625 32.689453125,12.56884765625 33.6376953125,8.86865234375 31.6923828125,9.373046875 24.322265625,2.00341796875 " stroke-miterlimit="14.3"/>' +
            '<polyline fill="#010101" id="polyline12362" points="36.578125,1.87109375 38.3828125,7.439453125 33.8681640625,7.439453125 35.6728515625,1.869140625 "/>' +
            '<line fill="none" stroke="#010101" id="line12364" y2="6.7915" x2="36.125" y1="19.01758" x1="36.125" stroke-miterlimit="14.3"/>' +
            '<polyline fill="none" stroke="#010101" id="polyline12370" points="24.494140625,46.49951171875 17.685546875,39.69091796875 15.9921875,40.1953125 16.958984375,36.515625 13.2265625,37.45556640625 14.185546875,33.7421875 10.52734375,34.73193359375 11.474609375,31.03125 9.529296875,31.53515625 2.1611328125,24.166015625 " stroke-miterlimit="14.3"/>' +
            '<polyline fill="#010101" id="polyline12374" points="12.150390625,44.80029296875 10.34765625,39.23193359375 14.861328125,39.23095703125 13.0556640625,44.80224609375 "/>' +
            '<line fill="none" stroke="#010101" id="line12376" y2="39.87891" x2="12.60352" y1="27.6543" x1="12.60352" stroke-miterlimit="14.3"/>' +
            '</svg>';
    }
});

/**
 * @class draw2d.shape.analog.ResistorVertical
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.analog.ResistorVertical({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.analog.ResistorVertical = draw2d.SetFigure.extend({

    NAME: "draw2d.shape.analog.ResistorVertical",

    // custom locator for the special design of the Input area
    MyInputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure, w / 2, h);
        }
    }),

    // custom locator for the special design of the Output area
    MyOutputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var w = figure.getParent().getWidth();
            this.applyConsiderRotation(figure, w / 2, 0);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {

        this._super($.extend({width: 30, height: 50, bgColor: null}, attr), setter, getter);

        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid", this.inputLocator);
        this.createPort("hybrid", this.outputLocator);
    },


    /**
     * @inheritdoc
     */
    createSet: function () {
        var set = this._super();

        set.push(this.canvas.paper.path("M15,0 L15,5 L0,7.5 L30,10 L0,15 L30,20 L0,25 L30,30 L15,32.5 L15,40"));

        return set;
    }
});

/**
 * @class draw2d.shape.analog.VoltageSupplyHorizontal
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.analog.VoltageSupplyHorizontal({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.analog.VoltageSupplyHorizontal = draw2d.SVGFigure.extend({

    NAME: "draw2d.shape.analog.VoltageSupplyHorizontal",

    // custom locator for the special design of the Input area
    MyInputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure, 0, h / 2);
        }
    }),

    // custom locator for the special design of the Output area
    MyOutputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure, w, h / 2);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({width: 50, height: 30}, attr), setter, getter);

        this.createPort("hybrid", new this.MyInputPortLocator());  // GND
        this.createPort("hybrid", new this.MyOutputPortLocator()); // VCC
    },


    /**
     * @inheritdoc
     */
    getSVG: function () {
        return '<svg width="49" height="28" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
            '<path d="m24.99933,18.95592l0,-9.54576m-5.78374,-9.40907l0,28.35939m-5.78718,-9.40457l0,-9.54576m-5.78374,-9.40907l0,28.35939" id="path10566" stroke-miterlimit="14.3" stroke="#010101" fill="none"/>' +
            '<path d="m26.79878,14.13039l6.90583,0m-33.22691,0l6.90583,0" id="path10568" stroke-miterlimit="14.3" stroke-linecap="square" stroke="#010101" fill="none"/>' +
            '</svg>';
    }
});

/**
 * @class draw2d.shape.analog.VoltageSupplyVertical
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.analog.VoltageSupplyVertical({x:10, y:10});
 *
 *     canvas.add(figure);
 *
 *
 * @extends draw2d.SVGFigure
 */
draw2d.shape.analog.VoltageSupplyVertical = draw2d.SVGFigure.extend({

    NAME: "draw2d.shape.analog.VoltageSupplyVertical",

    // custom locator for the special design of the Input area
    MyInputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var w = figure.getParent().getWidth();
            var h = figure.getParent().getHeight();
            this.applyConsiderRotation(figure, w / 2, h);
        }
    }),

    // custom locator for the special design of the Output area
    MyOutputPortLocator: draw2d.layout.locator.PortLocator.extend({
        init: function () {
            this._super();
        },
        relocate: function (index, figure) {
            var w = figure.getParent().getWidth();
            this.applyConsiderRotation(figure, w / 2, 0);
        }
    }),

    /**
     * @constructor
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({width: 30, height: 50}, attr), setter, getter);

        this.inputLocator = new this.MyInputPortLocator();
        this.outputLocator = new this.MyOutputPortLocator();

        this.createPort("hybrid", this.inputLocator); // GND
        this.createPort("hybrid", this.outputLocator);// VCC
    },


    /**
     * @inheritdoc
     */
    getSVG: function () {
        return '<svg  xmlns="http://www.w3.org/2000/svg" version="1.1">' +
            '<path d="m19.62398,12.37594l-9.87926,0m-9.74355,8.22145l29.36289,0m-9.74007,8.22469l-9.87927,0m-9.74355,8.22145l29.36289,0" id="path10560" stroke-miterlimit="14.3" stroke="#010101" fill="none"/>' +
            '<path d="m14.63157,9.81646l0,-9.81646m0,47.2328l0,-9.81646" id="path10562" stroke-miterlimit="14.3" stroke-linecap="square" stroke="#010101" fill="none"/>' +
            '</svg>';
    }
});

/**
 * @class draw2d.shape.layout.Layout
 *
 * A base class for positioning child figures and determining the ideal size for
 * a figure with children.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.layout.Layout = draw2d.shape.basic.Rectangle.extend({

    NAME: "draw2d.shape.layout.Layout",

    /**
     * @constructor
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this._super($.extend({bgColor: null, radius: 0, stroke: 0}, attr), setter, getter);

        var _this = this;
        this.resizeListener = function (figure) {
            // propagate the event to the parent or other listener if existing
            //
            if (_this.getParent() instanceof draw2d.shape.layout.Layout) {
                _this.fireEvent("resize");
            }
            // or we are the parent and must consume it self
            else {
                _this.setDimension(1, 1);
            }
        };

        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
    },

    /**
     * @inheritdoc
     */
    add: function (child, locator, index) {
        var r = this._super(child, locator, index);
        child.on("resize", this.resizeListener);
        child.on("change:visibility", this.resizeListener);
        this.setDimension(1, 1);

        return r;
    },

    /**
     * @inheritdoc
     */
    remove: function (child) {
        var r = this._super(child);
        child.off(this.resizeListener);
        this.setDimension(1, 1);

        return r;
    },


    /**
     * @inheritdoc
     */
    setRotationAngle: function (angle) {
        // ignore them for the layout elements
        // Layout's can't rotate
    }

});

/**
 * @class draw2d.shape.layout.HorizontalLayout
 * The HorizontalLayout class arranges the layout elements in a horizontal sequence,
 * left to right, with optional gaps between the elements.
 *
 * During the execution of the setDimension() method, the minimum width of the container is calculated
 * by accumulating the minimum sizes of the elements, including stroke, gaps and padding.
 *
 *
 * See the example below with and without gap and border settings
 *
 *
 *     @example preview small frame
 *
 *     // first container without any gap and a border of the parent
 *     // container
 *     var label1 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     var label2 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     var label3 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *     var container1 = new draw2d.shape.layout.HorizontalLayout();
 *
 *     container1.add(label1);
 *     container1.add(label2);
 *     container1.add(label3);
 *     container1.setGap(10);
 *     container1.setStroke(2);
 *     canvas.add(container1,50,10);
 *
 *     // second container without any gab or border
 *     //
 *     var label11 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     var label12 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     var label13 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *     var container2 = new draw2d.shape.layout.HorizontalLayout();
 *
 *     container2.add(label11);
 *     container2.add(label12);
 *     container2.add(label13);
 *
 *     canvas.add(container2,50,90);
 *
 *
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 * @since 2.5.1
 */
draw2d.shape.layout.HorizontalLayout = draw2d.shape.layout.Layout.extend({

    NAME: "draw2d.shape.layout.HorizontalLayout",

    /**
     * @constructor
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        this.gap = 0;
        var _this = this;
        this.locator = {
            translate: function (figure, diff) {
                figure.setPosition(figure.x + diff.x, figure.y + diff.y);
            },
            relocate: function (index, target) {
                var stroke = _this.getStroke();
                var xPos = stroke; // respect the border of the parent
                var gap = 0;
                for (var i = 0; i < index; i++) {
                    var child = _this.children.get(i).figure;
                    if (child.isVisible()) {
                        xPos += child.getWidth() + gap;
                        gap = _this.gap;
                    }
                }

                target.setPosition(xPos, stroke);
            }
        };

        this._super(
            $.extend({width: 1, height: 1, gap: 0}, attr),
            $.extend({
                /** @attr {Number} gap the gap between the children shapes */
                gap: this.setGap
            }, setter),
            $.extend({
                gap: this.getGap
            }, getter));

    },

    /**
     * @inheritdoc
     */
    add: function (child, locator, index) {
        return this._super(child, this.locator, index);
    },

    /**
     * @method
     * Set the gap width between child components within this layout.
     * This will only affect the space between components, not the space around all the components in the layout.
     *
     * @param {Number} gap The space, in pixels, between items.
     * @since 2.5.1
     */
    setGap: function (gap) {
        this.gap = gap;
        // this forces a relayout of the element
        this.setDimension(1, 1);

        return this;
    },

    /**
     * @method
     * Return the gap between the children shapes
     *
     * @since 5.0.0
     *
     */
    getGap: function () {
        return this.gap;
    },

    /**
     * @inheritdoc
     */
    getMinWidth: function () {
        var width = this.stroke * 2;
        var gap = 0;
        this.children.each(function (i, e) {
            if (e.figure.isVisible()) {
                width += (e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth() + gap);
                gap = this.gap;
            }
        }.bind(this));
        return width;
    },

    /**
     * @inheritdoc
     */
    getMinHeight: function () {
        var height = (this.stroke * 2);
        this.children.each(function (i, e) {
            height = Math.max(height, e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight());
        });
        return height + this.stroke * 2;
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
        this._super(w, h);

        var diff = this.width - this.getMinWidth();
        if (diff > 0) {
            diff = (diff / this.children.getSize()) | 0;
            this.children.each(function (i, e) {
                if (e.figure.isResizeable() === true) {
                    e.figure.setDimension(e.figure.getMinWidth() + diff, e.figure.getHeight());
                }
            });
        }
        else {
            this.children.each(function (i, e) {
                // The layout respect the "resizeable" flag because a layout is a kind of layouter and
                // any kind of autolayouter must respect this flag
                if (e.figure.isResizeable() === true) {
                    // reset the shape to the minimum width/height. see setMinWidth/setMinHeight
                    e.figure.setDimension(1, 1);
                }
            });
        }
    }
});

/**
 * @class draw2d.shape.layout.VerticalLayout
 * The VerticalLayout class arranges the layout elements in a vertical sequence,
 * left to right, with optional gaps between the elements.
 *
 * During the execution of the setDimension() method, the minimum height of the container is calculated
 * by accumulating the minimum sizes of the elements, including stroke, gaps and padding.
 *
 * See the example below with and without gap and border settings
 *
 *
 *     @example preview small frame
 *
 *     // first container without any gap and a border of the parent
 *     // container
 *     var label1 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     var label2 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     var label3 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *     var container1 = new draw2d.shape.layout.VerticalLayout();
 *
 *     container1.add(label1);
 *     container1.add(label2);
 *     container1.add(label3);
 *     container1.setGap(10);
 *     container1.setStroke(2);
 *     canvas.add(container1,50,10);
 *
 *     // second container without any gab or border
 *     //
 *     var label11 =  new draw2d.shape.basic.Label({text:"Label 1"});
 *     var label12 =  new draw2d.shape.basic.Label({text:"Label 2"});
 *     var label13 =  new draw2d.shape.basic.Label({text:"Label 3"});
 *
 *     var container2 = new draw2d.shape.layout.VerticalLayout();
 *
 *     container2.add(label11);
 *     container2.add(label12);
 *     container2.add(label13);
 *
 *     canvas.add(container2,150,10);
 *
 * @author Andreas Herz
 * @extends draw2d.shape.layout.Layout
 */
draw2d.shape.layout.VerticalLayout = draw2d.shape.layout.Layout.extend({

    NAME: "draw2d.shape.layout.VerticalLayout",

    /**
     * @constructor
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        // some layout parameter
        //
        this.gap = 0;

        // "this" shortcut to avoid $.proxy
        var _this = this;

        this.locator = {
            translate: function (figure, diff) {
                figure.setPosition(figure.x + diff.x, figure.y + diff.y);
            },
            relocate: function (index, target) {
                var stroke = _this.getStroke();
                var yPos = stroke; // respect the border of the shape

                for (var i = 0; i < index; i++) {
                    var child = _this.children.get(i).figure;
                    if (child.isVisible())
                        yPos = yPos + child.getHeight() + _this.gap;
                }

                target.setPosition(stroke, yPos);
            }
        };

        this._super(
            $.extend({width: 10, height: 10}, attr),
            $.extend({
                /** @attr {Number} gap the gap between the children shapes */
                gap: this.setGap
            }, setter),
            $.extend({
                gap: this.getGap
            }, getter));

    },

    /**
     * @inheritdoc
     */
    add: function (child, locator, index) {
        // ignore the parameter "locator" and use the locator for the vertical layout instead

        return this._super(child, this.locator, index);
    },


    /**
     * @method
     * Set the gap width between child components within this layout.
     * This will only affect the space between components, not the space around all the components in the layout.
     *
     * @param {Number} gap The space, in pixels, between items.
     */
    setGap: function (gap) {
        this.gap = gap;
        // this forces a relayout of the element
        this.setDimension(1, 1);
    },

    /**
     * @inheritdoc
     */
    getMinWidth: function () {
        var width = 10;
        this.children.each(function (i, e) {
            if (e.figure.isVisible())
                width = Math.max(width, e.figure.isResizeable() ? e.figure.getMinWidth() : e.figure.getWidth());
        });
        return width + (this.stroke * 2);
    },

    /**
     * @inheritdoc
     */
    getMinHeight: function () {
        var gap = 0;
        var height = 2 * this.stroke;
        this.children.each(function (i, e) {
            if (e.figure.isVisible()) {
                height += ((e.figure.isResizeable() ? e.figure.getMinHeight() : e.figure.getHeight()) + gap);
                // first element is iterated. Now we must add the gap to all next elements
                gap = this.gap;
            }
        }.bind(this));

        return height;
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
        this._super(w, h);

        var width = this.width - (2 * this.stroke);
        this.children.each(function (i, e) {
            if (e.figure.isResizeable() && e.figure.isVisible()) {
                e.figure.setDimension(width, e.figure.getHeight());
            }
        });
    }


});

/**
 * @class draw2d.shape.pert.Activity
 *
 * NOT FOR PRODUCTIVE
 *
 * Checkout [Wikipedia PERT][1] for more information.
 *
 * Double click on the Task name or the top middle number to change the value.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     canvas.add( new draw2d.shape.pert.Start(),10,10);
 *     canvas.add( new draw2d.shape.pert.Activity(),80,130);
 *     canvas.add( new draw2d.shape.pert.Activity(),180,50);
 *
 * [1] http://en.wikipedia.org/wiki/Program_Evaluation_and_Review_Technique
 *
 * @extends draw2d.shape.layout.VerticalLayout
 */
draw2d.shape.pert.Activity = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "draw2d.shape.pert.Activity",

    /**
     * @constructor
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        // shortcut for some callback methods to avoid $.proxy wrapper
        var _this = this;

        // persistence values for the activity
        // will be stored/read in the JSON
        this.mementoValues = {
            duration: null
        };

        // just some color attributes for the rendering/gradient
        this.bgColor = new draw2d.util.Color("#f3f3f3");
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();


        this._super($.extend({
            bgColor: this.bgColor,
            stroke: 2,
            radius: 2,
            color: this.darkerBgColor
        }, attr), setter, getter);

        // Compose the top row of the shape
        //
        var top = new draw2d.shape.layout.HorizontalLayout({stroke: 0});


        this.earlyStartLabel = this.createLabel("Early Start").setStroke(0);

        this.durationLabel = new draw2d.shape.basic.Label({
            text: "Duration",
            stroke: 1,
            color: this.darkerBgColor,
            radius: 0,
            bgColor: null,
            padding: 5
        });
        // duration label has a inplaceEditor for the value
        this.durationLabel.installEditor(new draw2d.ui.LabelEditor({
            onCommit: function (value) {
                _this.setDuration(parseFloat(value));
            }
        }));

        this.earlyEndLabel = this.createLabel({text: "Early End", stroke: 0});

        top.add(this.earlyStartLabel);
        top.add(this.durationLabel);
        top.add(this.earlyEndLabel);


        // the middle part of the shape
        // This part contains the ports for the connection
        //
        this.activityLabel = new draw2d.shape.basic.Label({
            text: "Activity Name",
            radius: 0,
            padding: 10,
            color: this.darkerBgColor,
            bgColor: null
        });
        // direct editor for the label
        this.activityLabel.installEditor(new draw2d.ui.LabelInplaceEditor());

        this.inputPort = this.activityLabel.createPort("input");
        this.inputPort.getActivity = function () {
            return _this;
        };
        this.inputPort.onConnect = function () {
            _this.setDuration(_this.mementoValues.duration);
        };
        this.inputPort.onDisconnect = function () {
            _this.setDuration(_this.mementoValues.duration);
        };
        this.inputPort.setValue = function (anyValue) {
            _this.setDuration(_this.mementoValues.duration);
        };

        this.outputPort = this.activityLabel.createPort("output");
        this.outputPort.getActivity = function () {
            return _this;
        };
        this.outputPort.onConnect = function () {
            _this.setDuration(_this.mementoValues.duration);
        };
        this.outputPort.onDisconnect = function () {
            _this.setDuration(_this.mementoValues.duration);
        };


        // the bottom of the activity shape
        //
        var bottom = new draw2d.shape.layout.HorizontalLayout({stroke: 0});


        this.lateStartLabel = this.createLabel("Late Start").setStroke(0);
        this.stackLabel = this.createLabel("Stack");
        this.lateEndLabel = this.createLabel("Late End").setStroke(0);

        bottom.add(this.lateStartLabel);
        bottom.add(this.stackLabel);
        bottom.add(this.lateEndLabel);

        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.add(top);
        this.add(this.activityLabel);
        this.add(bottom);


        // set some good default value for the activity
        //
        this.setDuration(1);
    },

    /**
     * @method
     * Set the duration for the activity. This triggers a complete recalculation of the complete
     * diagram. No further calls are required
     *
     * @param {Number} duration the new Duration for the activity
     */
    setDuration: function (duration) {

        if (this.mementoValues.duration !== duration) {
            // store the new value
            this.mementoValues.duration = duration;

            // update the labels for duration
            this.durationLabel.setText(this.mementoValues.duration);
        }

        // calculate the earlyStart and latestEnd and set the labels
        //
        var start = this.getEarlyStart();

        this.earlyStartLabel.setText(start);
        this.earlyEndLabel.setText(start + this.mementoValues.duration);

        // notify all children that a parent value has been changed
        // Just knock on the inputPort...
        //
        var connections = this.outputPort.getConnections();
        connections.each(function (i, conn) {
            var targetPort = conn.getTarget();
            targetPort.setValue();
        });

        // propagate the lateFinish up to all parent nodes if we are a leaf
        //
        if (connections.getSize() === 0) {
            var lateFinish = parseFloat(this.earlyEndLabel.getText());
            this.setLateFinish(lateFinish);
        }
    },

    getEarlyEnd: function () {
        return this.getEarlyStart() + this.mementoValues.duration;
    },

    getEarlyStart: function () {
        var latestEarlyEnd = 0;

        // retrieve the greatest "earlyStart" from all parent activities
        this.inputPort.getConnections().each(function (i, conn) {
            var parentActivity = conn.getSource().getActivity();
            latestEarlyEnd = Math.max(latestEarlyEnd, parentActivity.getEarlyEnd());
        });

        return latestEarlyEnd;
    },

    setLateFinish: function (value) {
        var lateStart = value - this.mementoValues.duration;

        this.lateEndLabel.setText(value);
        this.lateStartLabel.setText(lateStart);
        this.stackLabel.setText(lateStart - parseFloat(this.earlyStartLabel.getText()));

        var connections = this.inputPort.getConnections();
        connections.each(function (i, conn) {
            var sourcePort = conn.getSource();
            sourcePort.getActivity().setLateFinish(lateStart);
        });
    },

    /**
     * @method
     * help method to create some labels
     *
     * @param {String} txt the label to display
     * @returns {draw2d.shape.basic.Label}
     */
    createLabel: function (txt) {
        var label = new draw2d.shape.basic.Label({text: txt});
        label.setStroke(1);
        label.setColor(this.darkerBgColor);
        label.setRadius(0);
        label.setBackgroundColor(null);
        label.setPadding(5);
        label.setColor(this.bgColor.darker(0.2));
        label.onDoubleClick = function (angle) {/* ignore them for the layout elements*/
        };

        return label;
    },

    /**
     * @inheritdoc
     */
    setBackgroundColor: function (color) {
        this._super(color);

        // calculate the new lighter and darker colors for the gradient
        //
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {

        // repaint can be blocked during deserialization and if the shape
        // not part of any canvas.
        //
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }


        attributes = attributes || {};

        if (this.getAlpha() < 0.9) {
            attributes.fill = this.bgColor.hash();
        }
        else {
            attributes.fill = ["90", this.bgColor.hash(), this.lighterBgColor].join("-");
        }


        this._super(attributes);
    }
});

/**
 * @class draw2d.shape.pert.Start
 *
 * NOT FOR PRODUCTIVE
 *
 * Checkout [Wikipedia PERT][1] for more information.
 *
 * Double click on the Task name or the top middle number to change the value.
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     canvas.add( new draw2d.shape.pert.Start(),10,10);
 *     canvas.add( new draw2d.shape.pert.Activity(),80,130);
 *     canvas.add( new draw2d.shape.pert.Activity(),180,50);
 *
 * [1] http://en.wikipedia.org/wiki/Program_Evaluation_and_Review_Technique
 *
 * @extends draw2d.shape.layout.VerticalLayout
 */
draw2d.shape.pert.Start = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "draw2d.shape.pert.Start",

    /**
     * @constructor
     * Create a new instance
     *
     * @param {Object} [attr] the configuration of the shape
     */
    init: function (attr, setter, getter) {
        // shortcut for some callback methods to avoid $.proxy wrapper
        var _this = this;

        // persistence values for the activity
        // will be stored/read in the JSON
        this.mementoValues = {
            duration: null
        };

        // just some color attributes for the rendering/gradient
        this.bgColor = new draw2d.util.Color("#f3f3f3");
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();


        this._super($.extend({
            bgColor: this.bgColor,
            stroke: 2,
            radius: 2,
            color: this.darkerBgColor
        }, attr), setter, getter);

        // Compose the top row of the shape
        //
        var top = new draw2d.shape.layout.HorizontalLayout({stroke: 0});


        this.durationLabel = new draw2d.shape.basic.Label({
            text: "Duration",
            stroke: 1,
            color: this.darkerBgColor,
            radius: 0,
            bgColor: null,
            padding: 5
        });
        // duration label has a inplaceEditor for the value
        this.durationLabel.installEditor(new draw2d.ui.LabelEditor({
            text: "Enter new duration",
            onCommit: function (value) {
                _this.setDuration(parseFloat(value));
            }
        }));

        this.earlyEndLabel = this.createLabel({text: "Early End", stroke: 0});

        top.add(this.durationLabel);
        top.add(this.earlyEndLabel);


        // the middle part of the shape
        // This part contains the ports for the connection
        //
        this.activityLabel = new draw2d.shape.basic.Label({
            text: "Start",
            radius: 0,
            padding: 10,
            color: this.darkerBgColor,
            bgColor: null
        });
        // direct editor for the label
        this.activityLabel.installEditor(new draw2d.ui.LabelInplaceEditor());

        this.outputPort = this.activityLabel.createPort("output");
        this.outputPort.getActivity = function () {
            return _this;
        };
        this.outputPort.onConnect = function () {
            _this.setDuration(_this.mementoValues.duration);
        };
        this.outputPort.onDisconnect = function () {
            _this.setDuration(_this.mementoValues.duration);
        };


        // the bottom of the activity shape
        //
        var bottom = this.createLabel(" ");
        bottom.setPadding(10);
        bottom.setStroke(0);
        this.lateEndLabel = bottom;

        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.add(top);
        this.add(this.activityLabel);
        this.add(bottom);

        // set some good default value for the activity
        //
        this.setDuration(1);
    },

    /**
     * @method
     * Set the duration for the activity. This triggers a complete recalculation of the complete
     * diagram. No further calls are required
     *
     * @param {Number} duration the new Duration for the activity
     */
    setDuration: function (duration) {

        if (this.mementoValues.duration !== duration) {
            // store the new value
            this.mementoValues.duration = duration;

            // update the labels for duration
            this.durationLabel.setText(this.mementoValues.duration);
        }

        this.earlyEndLabel.setText(this.mementoValues.duration);

        // notify all children that a parent value has been changed
        // Just knock on the inputPort...
        //
        var connections = this.outputPort.getConnections();
        connections.each(function (i, conn) {
            var targetPort = conn.getTarget();
            targetPort.setValue();
        });

        // propagate the lateFinish up to all parent nodes if we are a leaf
        //
        if (connections.getSize() === 0) {
            var lateFinish = parseFloat(this.earlyEndLabel.getText());
            this.setLateFinish(lateFinish);
        }
    },

    getEarlyEnd: function () {
        return this.mementoValues.duration;
    },


    setLateFinish: function (value) {
        var lateStart = value - this.mementoValues.duration;

        this.lateEndLabel.setText(value);

    },

    /**
     * @method
     * help method to create some labels
     *
     * @param {String} txt the label to display
     * @returns {draw2d.shape.basic.Label}
     */
    createLabel: function (txt) {
        var label = new draw2d.shape.basic.Label({text: txt});
        label.setStroke(1);
        label.setColor(this.darkerBgColor);
        label.setRadius(0);
        label.setBackgroundColor(null);
        label.setPadding(5);
        label.setColor(this.bgColor.darker(0.2));
        label.onDoubleClick = function (angle) {/* ignore them for the layout elements*/
        };

        return label;
    },

    /**
     * @inheritdoc
     */
    setBackgroundColor: function (color) {
        this._super(color);

        // calculate the new lighter and darker colors for the gradient
        //
        this.lighterBgColor = this.bgColor.lighter(0.2).hash();
        this.darkerBgColor = this.bgColor.darker(0.2).hash();
    },

    /**
     * @inheritdoc
     */
    repaint: function (attributes) {

        // repaint can be blocked during deserialization and if the shape
        // not part of any canvas.
        //
        if (this.repaintBlocked === true || this.shape === null) {
            return;
        }


        attributes = attributes || {};

        if (this.getAlpha() < 0.9) {
            attributes.fill = this.bgColor.hash();
        }
        else {
            attributes.fill = ["90", this.bgColor.hash(), this.lighterBgColor].join("-");
        }

        this._super(attributes);
    }
});

/**
 * @class draw2d.shape.state.Start
 *
 * The start node for a state diagram
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     var figure =  new draw2d.shape.state.Start({color:"#3d3d3d"});
 *
 *     canvas.add(figure,50,10);
 *
 * @extends draw2d.shape.basic.Rectangle
 */
draw2d.shape.state.Start = draw2d.shape.basic.Circle.extend({

    NAME: "draw2d.shape.state.Start",

    DEFAULT_COLOR: new draw2d.util.Color("#3369E8"),

    init: function (attr, setter, getter) {
        this._super(attr);

        this.port = this.createPort("output", new draw2d.layout.locator.BottomLocator());
        this.port.setConnectionAnchor(new draw2d.layout.anchor.ShortesPathConnectionAnchor(this.port));

        this.setDimension(50, 50);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.setStroke(0);
        //this.setColor(this.DEFAULT_COLOR.darker());

        var label = new draw2d.shape.basic.Label({text: "START"});
        label.setStroke(0);
        label.setFontColor("#ffffff");
        label.setFontFamily('"Open Sans",sans-serif');
        this.add(label, new draw2d.layout.locator.CenterLocator());
    }
});

/**
 * @class draw2d.shape.state.End
 *
 * The end node for a state diagram
 *
 * See the example:
 *
 *     @example preview small frame
 *     var end   = new draw2d.shape.state.End();

 *     // ...add it to the canvas
 *     canvas.add( end, 230,80);
 *
 * @extends draw2d.shape.basic.Circle
 */
draw2d.shape.state.End = draw2d.shape.basic.Circle.extend({

    NAME: "draw2d.shape.state.End",

    DEFAULT_COLOR: new draw2d.util.Color("#4D90FE"),

    init: function (attr, setter, getter) {
        this.innerCircle = new draw2d.shape.basic.Circle(20);

        this._super(attr);

        this.port = this.createPort("input", new draw2d.layout.locator.TopLocator());
        this.port.setConnectionAnchor(new draw2d.layout.anchor.ShortesPathConnectionAnchor(this.port));

        this.setDimension(50, 50);
        this.setBackgroundColor(this.DEFAULT_COLOR);
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.innerCircle.setStroke(2);
        this.innerCircle.setBackgroundColor(null);
        this.add(this.innerCircle, new draw2d.layout.locator.CenterLocator());

        this.setStroke(0);
        //this.setColor(this.DEFAULT_COLOR.darker());
    },

    /**
     * @inheritdoc
     */
    setDimension: function (w, h) {
        this._super(w, h);
        this.innerCircle.setDimension(this.getWidth() - 10, this.getHeight() - 10);
    }
});

/**
 * @class draw2d.shape.state.State
 *
 * a state shape for a state diagram
 *
 *     @example preview small frame
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.state.Start();
 *     var state   = new draw2d.shape.state.State();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( state, 230,180);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.shape.state.Connection({
 *     		source : start.getOutputPort(0),
 *          target : state.getInputPort(0)
 *     });
 *
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 * @extends draw2d.shape.layout.VerticalLayout
 */
draw2d.shape.state.State = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "draw2d.shape.state.State",

    init: function (attr, setter, getter) {
        this._super(attr);

        this.port = this.createPort("hybrid", new draw2d.layout.locator.BottomLocator());
        this.port.setConnectionAnchor(new draw2d.layout.anchor.ChopboxConnectionAnchor(this.port));


        this.setBackgroundColor("#f3f3f3");

        // UI representation
        this.setStroke(1);
        this.setColor("#e0e0e0");
        this.setRadius(5);

        // Compose the top row of the shape
        //
        var top = this.createLabel("State").setStroke(0);
        this.label = top;

        // the middle part of the shape
        // This part contains the ports for the connection
        //
        var center = new draw2d.shape.basic.Rectangle();
        center.getHeight = function () {
            return 1;
        };
        center.setMinWidth(90);
        center.setColor("#e0e0e0");

        // the bottom of the activity shape
        //
        var bottom = new draw2d.shape.basic.Rectangle();
        bottom.setMinHeight(30);
        bottom.setStroke(0);
        bottom.setBackgroundColor(null);

        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.add(top);
        this.add(center);
        this.add(bottom);
    },

    /**
     * @method
     * Set the text to show if the state shape
     *
     * @param {String} text
     */
    setLabel: function (text) {
        this.label.setText(text);
        this.fireEvent("change:label");

        return this;
    },


    /**
     * @method
     * Return the label of the shape
     *
     */
    getLabel: function () {
        return this.label.getText();
    },


    /**
     * @method
     * helper method to create some labels
     *
     * @param {String} txt the label to display
     * @returns {draw2d.shape.basic.Label}
     * @private
     */
    createLabel: function (txt) {
        var label = new draw2d.shape.basic.Label(txt);
        label.setStroke(1);
        label.setColor(this.darkerBgColor);
        label.setRadius(0);
        label.setBackgroundColor(null);
        label.setPadding(5);
        label.setColor(this.bgColor.darker(0.2));
        label.onDoubleClick = function (angle) {/* ignore them for the layout elements*/
        };

        return label;
    },


    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        return $.extend(this._super(), {
            label: this.getLabel()
        });
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.label !== "undefined") {
            this.setLabel(memento.label);
        }

    }
});

/**
 * @class draw2d.shape.state.Connection
 *
 * Connection designed for a state diagram with arrow decoration at the
 * target of the connection and a label
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.state.Start();
 *     var end   = new draw2d.shape.state.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,180);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.shape.state.Connection({
 *     	 source : start.getOutputPort(0),
 *       target : end.getInputPort(0)
 *     });
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 *
 * @extends draw2d.Connection
 */
draw2d.shape.state.Connection = draw2d.Connection.extend({

    NAME: "draw2d.shape.state.Connection",

    DEFAULT_COLOR: new draw2d.util.Color("#4D90FE"),

    init: function (attr, setter, getter) {
        this._super($.extend({router: null, stroke: 2}, attr), setter, getter);

        this.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator(17, 8));


        this.label = new draw2d.shape.basic.Label({text: "label"});
        this.label.setStroke(1);
        this.label.setPadding(2);
        this.label.setBackgroundColor("#f0f0f0");
        this.add(this.label, new draw2d.layout.locator.ParallelMidpointLocator());

    },
    /**
     * @method
     * Set the text to show if the state shape
     *
     * @param {String} text
     */
    setLabel: function (text) {
        this.label.setText(text);

        // hide the label if no text available
        this.label.setVisible(!(text === null || text === ""));
        this.fireEvent("change:label");

        return this;
    },


    /**
     * @method
     * Return the label of the shape
     *
     */
    getLabel: function () {
        return this.label.getText();
    },


    /**
     * @inheritdoc
     */
    getPersistentAttributes: function () {
        return $.extend(this._super(), {
            label: this.getLabel()
        });
    },

    /**
     * @inheritdoc
     */
    setPersistentAttributes: function (memento) {
        this._super(memento);

        if (typeof memento.label !== "undefined") {
            this.setLabel(memento.label);
        }
    }

});

/**
 * @class draw2d.ui.LabelEditor
 * Base class for all draw2d.shape.basic.Label editors. The default implementation is to open
 * a simple javascript prompt dialog.<br>
 * Use LabelInplaceEditor or your own implementation if you need more comfort.
 *
 *     @example preview small frame
 *
 *     var label =  new draw2d.shape.basic.Label({text:"Double Click on me"});
 *
 *     label.installEditor(new draw2d.ui.LabelEditor({
 *        // called after the value has been set to the LabelFigure
 *        onCommit: $.proxy(function(value){
 *            alert("new value set to:"+value);
 *        },this),
 *        // called if the user abort the operation
 *        onCancel: function(){
 *        }
 *     }));
 *
 *     canvas.add(label,50,10);
 *
 *
 * @author Andreas Herz
 */
draw2d.ui.LabelEditor = Class.extend({

    /**
     * @constructor
     * Create an label editor with a dedicated callback listener
     *
     */
    init: function (listener) {

        // register some default listener and override this with the handover one
        this.configuration = $.extend({
            onCommit: function () {
            }, onCancel: function () {
            }, text: "Value"
        }, listener);
    },

    /**
     * @method
     * Trigger the edit of the label text.
     *
     * @param {draw2d.shape.basic.Label} label the label to edit
     */
    start: function (label) {
        var newText = prompt(this.configuration.text, label.getText());
        if (newText) {
            label.setText(newText);
            this.configuration.onCommit(label.getText());
        }
        else {
            this.configuration.onCancel();
        }
    }

});

/**
 * @class draw2d.ui.LabelInplaceEditor
 *
 * Inplace editor for draw2d.shape.base.Label
 *
 *     @example preview small frame
 *
 *     var label =  new draw2d.shape.basic.Label({text:"Double Click on me"});
 *
 *     label.installEditor(new draw2d.ui.LabelInplaceEditor({
 *        // called after the value has been set to the LabelFigure
 *        onCommit: $.proxy(function(value){
 *            alert("new value set to:"+value);
 *        },this),
 *        // called if the user abort the operation
 *        onCancel: function(){
 *        }
 *     }));
 *
 *     canvas.add(label,50,10);
 *
 * @author Andreas Herz
 * @extends draw2d.ui.LabelEditor
 */
draw2d.ui.LabelInplaceEditor = draw2d.ui.LabelEditor.extend({

    /**
     * @constructor
     * @private
     */
    init: function (listener) {
        this._super();

        // register some default listener and override this with the handover one
        this.listener = $.extend({
            onCommit: function () {
            }, onCancel: function () {
            }
        }, listener);
    },

    /**
     * @method
     * Trigger the edit of the label text.
     *
     * @param {draw2d.shape.basic.Label} label the label to edit
     */
    start: function (label) {
        this.label = label;

        this.commitCallback = $.proxy(this.commit, this);

        // commit the editor if the user clicks anywhere in the document
        //
        $("body").bind("click", this.commitCallback);

        // append the input field to the document and register
        // the ENTER and ESC key to commit /cancel the operation
        //
        this.html = $('<input id="inplaceeditor">');
        this.html.val(label.getText());
        this.html.hide();

        $("body").append(this.html);

        this.html.autoResize({animate: false});

        this.html.bind("keyup", $.proxy(function (e) {
            switch (e.which) {
                case 13:
                    this.commit();
                    break;
                case 27:
                    this.cancel();
                    break;
            }
        }, this));

        this.html.bind("blur", this.commitCallback);

        // avoid commit of the operation if we click inside the editor
        //
        this.html.bind("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
        });

        // Position the INPUT and init the autoresize of the element
        //
        var canvas = this.label.getCanvas();
        var bb = this.label.getBoundingBox();

        bb.setPosition(canvas.fromCanvasToDocumentCoordinate(bb.x, bb.y));

        // remove the scroll from the body if we add the canvas directly into the body
        var scrollDiv = canvas.getScrollArea();
        if (scrollDiv.is($("body"))) {
            bb.translate(canvas.getScrollLeft(), canvas.getScrollTop());
        }

        bb.translate(-1, -1);
        bb.resize(2, 2);

        this.html.css({
            position: "absolute",
            "top": bb.y,
            "left": bb.x,
            "min-width": bb.w * (1 / canvas.getZoom()),
            "height": Math.max(25, bb.h * (1 / canvas.getZoom()))
        });
        this.html.fadeIn($.proxy(function () {
            this.html.focus();
        }, this));
    },

    /**
     * @method
     * Transfer the data from the editor into the label.<br>
     * Remove the editor.<br>
     * @private
     */
    commit: function () {
        this.html.unbind("blur", this.commitCallback);
        $("body").unbind("click", this.commitCallback);
        var label = this.html.val();
        this.label.setText(label);
        this.html.fadeOut($.proxy(function () {
            this.html.remove();
            this.html = null;
            this.listener.onCommit(this.label.getText());
        }, this));
    },

    /**
     * @method
     * Transfer the data from the editor into the label.<br>
     * Remove the editor.<br>
     * @private
     */
    cancel: function () {
        this.html.unbind("blur", this.commitCallback);
        $("body").unbind("click", this.commitCallback);
        this.html.fadeOut($.proxy(function () {
            this.html.remove();
            this.html = null;
            this.listener.onCancel();
        }, this));

    }
});

/**
 * @class draw2d.decoration.connection.Decorator
 *
 *
 * @inheritable
 * @author Andreas Herz
 */
draw2d.decoration.connection.Decorator = Class.extend({

    NAME: "draw2d.decoration.connection.Decorator",

    /**
     * @constructor
     */
    init: function (width, height) {

        if (typeof width === "undefined" || width < 1) {
            this.width = 20;
        }
        else {
            this.width = width;
        }

        if (typeof height === "undefined" || height < 1) {
            this.height = 15;
        }
        else {
            this.height = height;
        }

        this.color = new draw2d.util.Color(0, 0, 0);
        this.backgroundColor = new draw2d.util.Color(250, 250, 250);
    },

    /**
     * @method
     * Paint the decoration for a connector. The Connector starts always in
     * [0,0] and ends in [x,0].
     * It is not necessary to consider any rotation of the connection. This will be done by the
     * framework.
     *
     * <pre>
     *                | -Y
     *                |
     *                |
     *  --------------+-----------------------------&gt; +X
     *                |
     *                |
     *                |
     *                V +Y
     *
     *
     * </pre>
     *
     * See in ArrowConnectionDecorator for example implementation.
     * @param {Raphael} paper
     */
    paint: function (paper) {
        // do nothing per default
    },

    /**
     * @method
     * Set the stroke color for the decoration
     *
     * @param {draw2d.util.Color|String} c
     */
    setColor: function (c) {
        this.color = new draw2d.util.Color(c);

        return this;
    },

    /**
     * @method
     * Set the background color for the decoration
     *
     * @param {draw2d.util.Color|String} c
     */
    setBackgroundColor: function (c) {
        this.backgroundColor = new draw2d.util.Color(c);

        return this;
    },

    /**
     * @method
     * Change the dimension of the decoration shape
     *
     * @param {Number} width  The new width of the decoration
     * @param {Number} height The new height of the decoration
     **/
    setDimension: function (width, height) {
        this.width = width;
        this.height = height;

        return this;
    }

});

/**
 * @class draw2d.decoration.connection.ArrowDecorator
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.Connection();
 *
 *     // toggle from ManhattenRouter to DirectRouter to show the rotation of decorations
 *     c.setRouter(new draw2d.layout.connection.DirectRouter());
 *
 *     // Set the endpoint decorations for the connection
 *     //
 *     c.setSourceDecorator(new draw2d.decoration.connection.ArrowDecorator());
 *     c.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator());
 *     // Connect the endpoints with the start and end port
 *     //
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extend draw2d.decoration.connection.Decorator
 */
draw2d.decoration.connection.ArrowDecorator = draw2d.decoration.connection.Decorator.extend({

    NAME: "draw2d.decoration.connection.ArrowDecorator",

    /**
     * @constructor
     *
     * @param {Number} [width] the width of the arrow
     * @param {Number} [height] the height of the arrow
     */
    init: function (width, height) {
        this._super(width, height);
    },

    /**
     * Draw a filled arrow decoration.
     * It's not your work to rotate the arrow. The draw2d do this job for you.
     *
     * <pre>
     *                        ---+ [length , width/2]
     *                 -------   |
     * [3,0]   --------          |
     *     +---                  |==========================
     *         --------          |
     *                 -------   |
     *                        ---+ [lenght ,-width/2]
     *
     *</pre>
     * @param {Raphael} paper the raphael paper object for the paint operation
     **/
    paint: function (paper) {
        var st = paper.set();

        st.push(paper.path(["M0 0",
            "L", this.width, " ", -this.height / 2,
            "L", this.width, " ", this.height / 2,
            "L0 0"].join("")));

        st.attr({fill: this.backgroundColor.hash(), stroke: this.color.hash()});

        return st;
    }
});

/**
 * @class draw2d.decoration.connection.DiamondDecorator
 * See the example:
 *
 *     @example preview small frame
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.Connection();
 *
 *     // toggle from ManhattenRouter to DirectRouter to show the rotation of decorations
 *     c.setRouter(new draw2d.layout.connection.DirectRouter());
 *
 *     // Set the endpoint decorations for the connection
 *     //
 *     c.setSourceDecorator(new draw2d.decoration.connection.DiamondDecorator());
 *     c.setTargetDecorator(new draw2d.decoration.connection.DiamondDecorator());
 *     // Connect the endpoints with the start and end port
 *     //
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 *
 * @inheritable
 * @author Andreas Herz
 * @extend draw2d.decoration.connection.Decorator
 */
draw2d.decoration.connection.DiamondDecorator = draw2d.decoration.connection.Decorator.extend({

    NAME: "draw2d.decoration.connection.DiamondDecorator",

    /**
     * @constructor
     *
     * @param {Number} [width] the width of the arrow
     * @param {Number} [height] the height of the arrow
     */
    init: function (width, height) {
        this._super(width, height);
    },

    /**
     * Draw a filled diamond decoration.
     *
     * It's not your work to rotate the arrow. The draw2d do this job for you.
     *
     * @param {Raphael} paper the raphael paper object for the paint operation
     **/
    paint: function (paper) {
        var st = paper.set();

        st.push(
            paper.path(["M", this.width / 2, " ", -this.height / 2,  // Go to the top center..
                "L", this.width, " ", 0,               // ...draw line to the right middle
                "L", this.width / 2, " ", this.height / 2,   // ...bottom center...
                "L", 0, " ", 0,               // ...left middle...
                "L", this.width / 2, " ", -this.height / 2,  // and close the path
                "Z"].join(""))
        );

        st.attr({fill: this.backgroundColor.hash(), stroke: this.color.hash()});
        return st;
    }

});

/**
 * @class draw2d.decoration.connection.CircleDecorator
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.Connection();
 *
 *     // toggle from ManhattenRouter to DirectRouter to show the rotation of decorations
 *     c.setRouter(new draw2d.layout.connection.DirectRouter());
 *
 *     // Set the endpoint decorations for the connection
 *     //
 *     c.setSourceDecorator(new draw2d.decoration.connection.CircleDecorator());
 *     c.setTargetDecorator(new draw2d.decoration.connection.CircleDecorator());
 *     // Connect the endpoints with the start and end port
 *     //
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 * @inheritable
 * @author Andreas Herz
 * @extend draw2d.decoration.connection.Decorator
 */
draw2d.decoration.connection.CircleDecorator = draw2d.decoration.connection.Decorator.extend({

    NAME: "draw2d.decoration.connection.CircleDecorator",

    /**
     * @constructor
     *
     * @param {Number} [width] the width of the arrow
     * @param {Number} [height] the height of the arrow
     */
    init: function (width, height) {
        this._super(width, height);
    },

    /**
     * Draw a filled circle decoration.
     *
     * @param {Raphael} paper the raphael paper object for the paint operation
     **/
    paint: function (paper) {
        var st = paper.set();

        st.push(paper.circle(0, 0, this.width / 2));
        st.attr({fill: this.backgroundColor.hash(), stroke: this.color.hash()});

        return st;
    }
});

/**
 * @class draw2d.decoration.connection.BarDecorator
 *
 * See the example:
 *
 *     @example preview small frame
 *
 *     // create and add two nodes which contains Ports (In and OUT)
 *     //
 *     var start = new draw2d.shape.node.Start();
 *     var end   = new draw2d.shape.node.End();

 *     // ...add it to the canvas
 *     canvas.add( start, 50,50);
 *     canvas.add( end, 230,80);
 *
 *     // Create a Connection and connect the Start and End node
 *     //
 *     var c = new draw2d.Connection();
 *
 *     // toggle from ManhattenRouter to DirectRouter to show the rotation of decorations
 *     c.setRouter(new draw2d.layout.connection.DirectRouter());
 *
 *     // Set the endpoint decorations for the connection
 *     //
 *     c.setSourceDecorator(new draw2d.decoration.connection.BarDecorator());
 *     c.setTargetDecorator(new draw2d.decoration.connection.BarDecorator());
 *     // Connect the endpoints with the start and end port
 *     //
 *     c.setSource(start.getOutputPort(0));
 *     c.setTarget(end.getInputPort(0));
 *
 *     // and finally add the connection to the canvas
 *     canvas.add(c);
 *
 * @inheritable
 * @author Andreas Herz
 * @extend draw2d.decoration.connection.Decorator
 */
draw2d.decoration.connection.BarDecorator = draw2d.decoration.connection.Decorator.extend({

    NAME: "draw2d.decoration.connection.BarDecorator",

    /**
     * @constructor
     *
     * @param {Number} [width] the width of the bar
     * @param {Number} [height] the height of the bar
     */
    init: function (width, height) {
        this._super(width, height);
    },

    /**
     * @method
     * Draw a bar decoration.
     *
     *
     * @param {Raphael} paper the raphael paper object for the paint operation
     **/
    paint: function (paper) {
        var st = paper.set();
        var path = ["M", this.width / 2, " ", -this.height / 2];  // Go to the top center..
        path.push("L", this.width / 2, " ", this.height / 2);   // ...bottom center...

        st.push(
            paper.path(path.join(""))
        );
        st.attr({fill: this.backgroundColor.hash(), stroke: this.color.hash()});
        return st;
    }

});

/**
 * @class draw2d.io.Reader
 * Template class for general import of a document into the canvas.
 *
 * @author andreas Herz
 */
draw2d.io.Reader = Class.extend({

    /**
     * @constructor
     * @private
     */
    init: function () {

    },

    /**
     * @method
     *
     * Restore the canvas from a given String.
     *
     * @param {draw2d.Canvas} canvas the canvas to restore
     * @param {Object} document the document to read
     *
     * @return {draw2d.util.ArrayList} the added elements
     * @template
     */
    unmarshal: function (canvas, document) {
        // do nothing. Inherit classes must implement this method
    }

});

/**
 * @class draw2d.io.Writer
 * Serialize the canvas to an external format. This is only a template/interface class.
 * Inherit classes must implement the export format.
 *
 * @author Andreas Herz
 */
draw2d.io.Writer = Class.extend({

    /**
     * @constructor
     * @private
     */
    init: function () {

    },

    /**
     * @method
     * Export the content to the implemented data format. Inherit class implements
     * content specific writer.
     * <br>
     * <br>
     *
     * Method signature has been changed from version 2.10.1 to version 3.0.0.<br>
     * The parameter <b>resultCallback</b> is required and new. The method calls
     * the callback instead of return the result.
     *
     * @template
     * @since 2.10.1
     * @param {draw2d.Canvas} canvas
     * @param {Function} resultCallback the method to call on success. The first argument is the result object, the second the base64 content of a corresponding file
     * @returns {Object}
     *
     */
    marshal: function (canvas, resultCallback) {
        // I change the API signature from version 2.10.1 to 3.0.0. Throw an exception
        // if any application not care about this changes.
        if (typeof resultCallback !== "function") {
            throw "Writer.marshal method signature has been change from version 2.10.1 to version 3.0.0. Please consult the API documentation about this issue.";
        }


        resultCallback("", "");
    },

    /**
     * @method
     * utility method to format a given XML string.
     *
     * @param xml
     * @returns {String}
     */
    formatXml: function (xml) {
        var formatted = '';
        var reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        var pad = 0;
        jQuery.each(xml.split('\r\n'), function (index, node) {
            var indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad != 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }

            var padding = '';
            for (var i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });

        return formatted;
    }
});

/**
 * @class draw2d.io.svg.Writer
 *
 * Serialize the canvas document into a SVG document.
 *
 *      // Create a SVG writer and convert the canvas into a SVG document.
 *      //
 *      var writer = new draw2d.io.svg.Writer();
 *      writer.marshal(canvas, function(svg){
 *          // insert the svg string into a DIV for preview or post
 *          // it via ajax to the server....
 *          $("#svg").text(svg);
 *      });
 *
 *
 *
 * @author Andreas Herz
 * @extends draw2d.io.Writer
 */
draw2d.io.svg.Writer = draw2d.io.Writer.extend({

    init: function () {
        this._super();
    },

    /**
     * @method
     * Export the content of the canvas into SVG. The SVG document can be loaded with Inkscape or any other SVG Editor.
     * <br>
     * <br>
     *
     * Method signature has been changed from version 2.10.1 to version 3.0.0.<br>
     * The parameter <b>resultCallback</b> is required and new. The method calls
     * the callback instead of return the result.
     *
     *
     * @param {draw2d.Canvas} canvas the canvas to marshal
     * @param {Function} callback the method to call on success. The first argument is the SVG document
     * @param {String} callback.svg  the SVG document
     * @param {String} callback.base64  the SVG document encoded in base64
     */
    marshal: function (canvas, callback) {
        // I change the API signature from version 2.10.1 to 3.0.0. Throw an exception
        // if any application not care about this changes.
        if (typeof callback !== "function") {
            throw "Writer.marshal method signature has been change from version 2.10.1 to version 3.0.0. Please consult the API documentation about this issue.";
        }

        var s = canvas.getCurrentSelection();
        canvas.setCurrentSelection(null);
        var svg = canvas.getHtmlContainer().html()
            .replace(/>\s+/g, ">")
            .replace(/\s+</g, "<");
        svg = this.formatXml(svg);
        svg = svg.replace(/<desc>.*<\/desc>/g, "<desc>Create with draw2d JS graph library and RaphaelJS</desc>");

        canvas.setCurrentSelection(s);

        var base64Content = draw2d.util.Base64.encode(svg);
        callback(svg, base64Content);
    }
});
/**
 * @class draw2d.io.png.Writer
 * Convert the canvas document into a PNG Image.
 *
 *     // example how to create a PNG image and set an
 *     // image src attribute.
 *     //
 *     var writer = new draw2d.io.png.Writer();
 *     writer.marshal(canvas, function(png){
 *         $("#preview").attr("src",png);
 *     });
 *
 * @author Andreas Herz
 * @extends draw2d.io.Writer
 */
draw2d.io.png.Writer = draw2d.io.Writer.extend({

    init: function () {
        this._super();
    },

    /**
     * @method
     * Export the content to a PNG image. The result can be set as <b>src="...."</b> because
     * the result is encoded as data source url <b>data:image/png;base64....</b>
     * <br>
     * <br>
     *
     * Method signature has been changed from version 2.10.1 to version 3.0.0.<br>
     * The parameter <b>resultCallback</b> is required and new. The method calls
     * the callback instead of return the result.
     *
     * @param {draw2d.Canvas} canvas
     * @param {Function} resultCallback the method to call on success. The first argument is the dataUrl, the second is the base64 formated png image
     * @param {String} resultCallback.img  The image as data source url <b>data:image/png;base64....</b>
     * @param {String} resultCallback.base64  the image encoded in base64
     * @param {draw2d.geo.Rectangle} cropBoundingBox optional cropping/clipping bounding box
     */
    marshal: function (canvas, resultCallback, cropBoundingBox) {
        // I change the API signature from version 2.10.1 to 3.0.0. Throw an exception
        // if any application not care about this changes.
        if (typeof resultCallback !== "function") {
            throw "Writer.marshal method signature has been change from version 2.10.1 to version 3.0.0. Please consult the API documentation about this issue.";
        }

        canvas.hideDecoration();

        var svg = canvas.getHtmlContainer().html().replace(/>\s+/g, ">").replace(/\s+</g, "<");

        // add missing namespace for images in SVG
        //
        svg = svg.replace("<svg ", "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\" ");

        // required for IE9 support.
        // The following table contains ready-to-use conditions to detec IE Browser versions
        //
        // IE versions     Condition to check for
        // ------------------------------------------------------------
        // 10 or older     document.all
        // 9 or older      document.all && !window.atob
        // 8 or older      document.all && !document.addEventListener
        // 7 or older      document.all && !document.querySelector
        // 6 or older      document.all && !window.XMLHttpRequest
        // 5.x             document.all && !document.compatMode
        if (document.all) {
            svg = svg.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
        }

        canvasDomNode = $('<canvas id="canvas_png_export_for_draw2d" style="display:none"></canvas>');
        $('body').append(canvasDomNode);
        fullSizeCanvas = $("#canvas_png_export_for_draw2d")[0];
        fullSizeCanvas.width = canvas.initialWidth;
        fullSizeCanvas.height = canvas.initialHeight;

        canvg("canvas_png_export_for_draw2d", svg, {
            ignoreMouse: true,
            ignoreAnimation: true,
            renderCallback: function () {
                try {
                    canvas.showDecoration();

                    if (typeof cropBoundingBox !== "undefined") {
                        var sourceX = cropBoundingBox.x;
                        var sourceY = cropBoundingBox.y;
                        var sourceWidth = cropBoundingBox.w;
                        var sourceHeight = cropBoundingBox.h;

                        croppedCanvas = document.createElement('canvas');
                        croppedCanvas.width = sourceWidth;
                        croppedCanvas.height = sourceHeight;

                        croppedCanvas.getContext("2d").drawImage(fullSizeCanvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);

                        var dataUrl = croppedCanvas.toDataURL("image/png");
                        var base64Image = dataUrl.replace("data:image/png;base64,", "");
                        resultCallback(dataUrl, base64Image);
                    }
                    else {
                        var img = fullSizeCanvas.toDataURL("image/png");
                        resultCallback(img, img.replace("data:image/png;base64,", ""));
                    }
                }
                finally {
                    canvasDomNode.remove();
                }
            }
        });
    }
});


/**
 * @class draw2d.io.json.Writer
 * Serialize the canvas document into a JSON object which can be read from the corresponding
 * {@link draw2d.io.json.Reader}.
 *
 *      // Create a JSON writer and convert it into a JSON-String representation.
 *      //
 *      var writer = new draw2d.io.json.Writer();
 *      writer.marshal(canvas, function(json){
 *         // convert the json object into string representation
 *         var jsonTxt = JSON.stringify(json,null,2);
 *
 *         // insert the json string into a DIV for preview or post
 *         // it via ajax to the server....
 *         $("#json").text(jsonTxt);
 *
 *      });
 *
 *
 *
 * @author Andreas Herz
 * @extends draw2d.io.Writer
 */
draw2d.io.json.Writer = draw2d.io.Writer.extend({

    init: function () {
        this._super();
    },

    /**
     * @method
     * Export the content to the implemented data format. Inherit class implements
     * content specific writer.
     * <br>
     * <br>
     *
     * Method signature has been changed from version 2.10.1 to version 3.0.0.<br>
     * The parameter <b>resultCallback</b> is required and new. The method calls
     * the callback instead of return the result.
     *
     * @param {draw2d.Canvas} canvas
     * @param {Function} resultCallback the method to call on success. The first argument is the result object, the second the base64 representation of the file content
     * @param {Object} resultCallback.json  the canvas document as JSON object
     * @param {String} resultCallback.base64  the canvas document as base encoded JSON
     */
    marshal: function (canvas, resultCallback) {
        // I change the API signature from version 2.10.1 to 3.0.0. Throw an exception
        // if any application not care about this changes.
        if (typeof resultCallback !== "function") {
            throw "Writer.marshal method signature has been change from version 2.10.1 to version 3.0.0. Please consult the API documentation about this issue.";
        }

        var obj = {};
        var result = [];

        canvas.getFigures().each(function (i, figure) {
            result.push(figure.getPersistentAttributes());
        });

        canvas.getLines().each(function (i, element) {
            result.push(element.getPersistentAttributes());
        });

        obj['canvas'] = result;
        obj['userData'] = canvas['userData'];

        var base64Content = draw2d.util.Base64.encode(JSON.stringify(obj, null, 2));

        resultCallback(obj, base64Content);
    }
});

/**
 * @class draw2d.io.json.Reader
 * Read a JSON data and import them into the canvas. The JSON must be generated with the
 * {@link draw2d.io.json.Writer}.
 *
 *      // Load a standard draw2d JSON object into the canvas
 *      //
 *      var jsonDocument =
 *          [
 *           {
 *              "type": "draw2d.shape.basic.Oval",
 *              "id": "5b4c74b0-96d1-1aa3-7eca-bbeaed5fffd7",
 *              "x": 237,
 *              "y": 236,
 *              "width": 93,
 *              "height": 38
 *            },
 *            {
 *              "type": "draw2d.shape.basic.Rectangle",
 *              "id": "354fa3b9-a834-0221-2009-abc2d6bd852a",
 *              "x": 225,
 *              "y": 97,
 *              "width": 201,
 *              "height": 82,
 *              "radius": 2
 *            }
 *          ];
 *      // unmarshal the JSON document into the canvas
 *      // (load)
 *      var reader = new draw2d.io.json.Reader();
 *      reader.unmarshal(canvas, jsonDocument);
 *
 *
 * @extends draw2d.io.Reader
 */
draw2d.io.json.Reader = draw2d.io.Reader.extend({

    NAME: "draw2d.io.json.Reader",

    init: function () {
        this._super();
    },

    /**
     * @method
     *
     * Restore the canvas from a given JSON object.
     *
     * @param {draw2d.Canvas} canvas the canvas to restore
     * @param {Object} document the json object to load.
     */
    unmarshal: function (canvas, json) {
        var result = new draw2d.util.ArrayList();

        if (typeof json === "string") {
            json = JSON.parse(json);
        }

        var node = null;
        $.each(json, $.proxy(function (i, element) {
            try {
                var o = eval("new " + element.type + "()");
                var source = null;
                var target = null;
                for (i in element) {
                    var val = element[i];
                    if (i === "source") {
                        node = canvas.getFigure(val.node);
                        if (node === null) {
                            throw "Source figure with id '" + val.node + "' not found";
                        }
                        source = node.getPort(val.port);
                        if (source === null) {
                            throw "Unable to find source port '" + val.port + "' at figure '" + val.node + "' to unmarschal '" + element.type + "'";
                        }
                    }
                    else if (i === "target") {
                        node = canvas.getFigure(val.node);
                        if (node === null) {
                            throw "Target figure with id '" + val.node + "' not found";
                        }
                        target = node.getPort(val.port);
                        if (target === null) {
                            throw "Unable to find target port '" + val.port + "' at figure '" + val.node + "' to unmarschal '" + element.type + "'";
                        }
                    }
                }
                if (source !== null && target !== null) {
                    o.setSource(source);
                    o.setTarget(target);
                }
                o.setPersistentAttributes(element);
                canvas.add(o);
                result.add(o);
            }
            catch (exc) {
                debug.error(element, "Unable to instantiate figure type '" + element.type + "' with id '" + element.id + "' during unmarshal by " + this.NAME + ". Skipping figure..");
                debug.error(exc);
                debug.warn(element);
            }
        }, this));

        // restore group assignment
        //
        $.each(json, $.proxy(function (i, element) {
            if (typeof element.composite !== "undefined") {
                var figure = canvas.getFigure(element.id);
                if (figure === null) {
                    figure = canvas.getLine(element.id);
                }
                var group = canvas.getFigure(element.composite);
                group.assignFigure(figure);
            }
        }, this));

        // recalculate all crossings and repaint the connections with
        // possible crossing decoration
        canvas.calculateConnectionIntersection();
        canvas.getLines().each(function (i, line) {
            line.svgPathString = null;
            line.repaint();
        });
        canvas.linesToRepaintAfterDragDrop = canvas.getLines().clone();

        canvas.showDecoration();

        return result;
    }
});

/**
 * @class draw2d.storage.FileStorage
 *
 * <b>BETA: changes can happen without notice</b>
 * <br>
 * <br>
 * FileStorage is an file storage abstraction library for Draw2D. It allows you to easily
 * read and write files to any supported file storage backends with a simple an consistent
 * API. FileStorage also supports storing metadata if the storage backend supports it.
 *
 * There are a number of different ways to store your files when you're building an application
 * with Draw2D. There's the local file system of the server, Databases and of course there are
 * cloud-based CDN solutions such as Google Drive, Amazon S3 and many more.
 *
 * From application point of view, it's not optimal to deeply bind your implementation to any single
 * storage backend, as there might be a need to be able to change that later. For example, you might
 * first use a local filesystem when you start developing but the change to a more advanced solution
 * when the application matures. This is when FileStorage becomes handy. Using the simple API of
 * FileStorage you are able to change the storage backend without needing to change the code using it.
 *
 *
 */
draw2d.storage.FileStorage = Class.extend({
    NAME: "draw2d.storage.FileStorage",

    /**
     * @constructor
     *
     */
    init: function () {
    },

    /**
     * @method
     *
     * @param {String} filenameFilter the file picker set a file name filter with the given pattern. Only files which contains the given string will be loaded
     * @param {Function} successCallback callback method if the user select a file and the content is loaded
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    pickFileAndLoad: function (filenameFilter, successCallback, errorCallback) {
    },


    /**
     * @method
     * Request a filename for a new file. The application can use this platform depending
     * filename selector before the saveFile function is called.
     *
     * @since 4.2.0
     */
    promptForFilename: function (successCallback, abortCallback) {
        var fileName = prompt(draw2d.Configuration.i18n.dialog.filenamePrompt);
        if (!fileName) {
            if (abortCallback) {
                abortCallback();
            }
        }
        else {
            successCallback(fileName);
        }
    },

    /**
     * @method
     * Save a file to the google drive bakcend. Either <b>file</b> is a string or a fileHandle.<br>
     * If it is a fileHnadle a <b>updateFile</b> is called.
     *
     * @param {String} fileName the filename of the file
     * @param {String} content the content of the file base64 decoded
     * @param {boolean} contentIsBase64 indicates if the provided content base64 encoded
     * @param {Function} successCallback callback method if the save operation finished
     * @param {Function} errorCallback method to call if any error happens
     * @since 4.0.0
     */
    saveFile: function (fileName, content, contentIsBase64, base64Thumbnail, successCallback, errorCallback) {
    },

    /**
     * @method
     * Save a already loaded file.
     *
     *
     * @param {Object} fileHandle the file handle of the pickFileAndLoad method
     * @param {String} content the file content as base64 coded content
     * @param {boolean} contentIsBase64 indicates if the provided content base64 encoded
     * @param {Function} successCallback the callback method if the file has been saved successfully.
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    updateFile: function (fileHandle, content, contentIsBase64, successCallback, errorCallback) {
    },

    /**
     * @method
     * Save a new file in the storage provider.
     *
     *
     * @param {String} fileName the file name if the new file
     * @param {String} content the content of the file as base64 encoded
     * @param {boolean} contentIsBase64 indicates if the provided content base64 encoded
     * @param {Function} successCallback the callback method after a successful save operation
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    insertFile: function (fileName, content, contentIsBase64, successCallback, errorCallback) {
    }
});
/**
 * <b>BETA: changes can happen without notice</b>
 * <br>
 * <br>
 * Applications that use this interface must abide by all existing Terms of Service of the Google Drive API.<br>
 * Most importantly, you must correctly identify yourself in your requests. Please read the documentation below before
 * you send any "getting started" questions or any bug reports<br>
 *
 * https://developers.google.com/picker/docs/
 *
 *
 * Example usage of the google drive and auth libs. Please note that I didn't use a parallel loading
 * mechanism for the google dependencies. I did this just to simplify the example code.<br>
 *
 *        var app=null;
 *
 *        // call this after the DOM onLoad
 *        //
 *        function initApp(){
 *              // configure the google drive FilePicker API
 *              //
 *              draw2d.storage.GoogleDrive.developerKey = <YOUR_GOOGLE_DEVELOPER_KEY>;
 *              draw2d.storage.GoogleDrive.clientId     = <YOUR_GOOGLE_CIENT_ID>;
 *
 *              // load all dependencies for the google drive api.
 *              // TODO: switch to parallel loading of scripts .. this is just a hack
 *              //
 *              gapi.load('auth', {'callback': function(){
 *                     gapi.load('picker', {'callback': function(){
 *                         gapi.client.load('drive', 'v2', function(){
 *
 *                             // all google libs loaded well. you can now init the application.
 *                             //
 *                             app  = new example.Application();
 *                         });
 *                     }});
 *                  }
 *              });
 *        }
 *
 * @author Andreas Herz
 * @extends draw2d.storage.FileStorage
 */
/**
 * @class draw2d.storage.LocalFileStorage
 *
 * <b>BETA: changes can happen without notice</b>
 * <br>
 * <br>
 * Storage provider for the HTML5 FileAPI.
 *
 *
 * @author Andreas Herz
 * @extends draw2d.storage.FileStorage
 */
draw2d.storage.LocalFileStorage = draw2d.storage.FileStorage.extend({
    NAME: "draw2d.storage.LocalFileStorage",

    /**
     * @constructor
     *
     */
    init: function () {
        this._super();

        this.initDone = false;
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
        } else {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }

        this.initDone = true;

    },

    /**
     * @method
     *
     * Open the file picker and load the selected file.<br>
     *
     * Example usage:
     *
     *      this.openButton.on("click",$.proxy(function(){
     *         this.filePicker.pickFileAndLoad($.proxy(function(file, fileData){
     *            // save the fileHandle for further save operations
     *            this.file = file;
     *
     *            // cleanup the canvas
     *            this.canvas.clear();
     *
     *            // load the JSON into the canvas
     *            var reader = new draw2d.io.json.Reader();
     *            reader.unmarshal(canvas, JSON.parse(fileData));
     *        },this));
     *     },this));
     *
     * @param {String} filenameFilter the file picker set a file name filter with the given pattern. Only files which contains the given string will be loaded
     * @param {Function} successCallback callback method if the user select a file and the content is loaded
     * @param {Function} errorCallback method to call if any error happens
     *
     * @since 4.0.0
     */
    pickFileAndLoad: function (filenameFilter, successCallback, errorCallback) {
        // #modal-background
        var modalBackgroundCSS = {
            "display": "block",
            "position": "fixed",
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%",
            "background-color": "white",
            "opacity": .50,
            "-webkit-opacity": .5,
            "-moz-opacity": .5,
            "filter": "alpha(opacity=50)",
            "z-index": 1000
        };

        var modelContentCSS = {
            "background-color": "white",
            "border-radius": "10px",
            "-webkit-border-radius": "10px",
            "-moz-border-radius": "10px",
            "box-shadow": "0 0 20px 0 #222",
            "-webkit-box-shadow": "0 0 20px 0 #222",
            "-moz-box-shadow": " 0 20px 0 #222",
            "display": "block",
            "height": "240px",
            "left": "50%",
            "margin": "-120px 0 0 -160px",
            "padding": "10px",
            "position": "absolute",
            "top": "50%",
            "width": "320px",
            "z-index": "1000"
        };


        $("body").append($('<div id="modal-background"></div>' +
            '<div id="modal-content">' +
            '    <input type="file" id="storage_files" name="files"  />' +
            '</div>'));

        // open a dialog as modal div above the document body
        //
        $("#modal-background").css(modalBackgroundCSS);
        $("#modal-content").css(modelContentCSS);

        $("#modal-background, #modal-close").click(function () {
            $("#modal-background, #modal-content").remove();
        });

        $('#storage_files').on('change', function (event) {
            $("#modal-background, #modal-content").remove();
            var f = event.target.files[0]; // FileList object
            f.title = f.name;
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = function (e) {
                // Render thumbnail.
                successCallback(f, e.target.result);
            };
            // Read in the image file as a data URL.
            reader.readAsText(f);
        });
    },


    /**
     * @method
     * Save a file to the google drive back end. Either <b>file</b> is a string or a fileHandle.<br>
     * If it is a fileHnadle a <b>updateFile</b> is called.
     *
     * @param {String} fileName the filename of the file
     * @param {String} content the content of the file base64 decoded
     * @param {String} contentIsBase64 indicates if the content already base64 encoded
     * @param {Function} successCallback callback method if the save operation finished
     * @since 4.0.0
     */
    saveFile: function (fileName, content, contentIsBase64, successCallback) {
        var blob = new Blob([content]);
        saveAs(blob, fileName);
        successCallback({title: fileName});
    },

    /**
     * @method
     * Save a already loaded file.
     *
     *
     * @param {Object} fileHandle the file handle of the pickFileAndLoad method
     * @param {String} content the file content
     * @param {String} contentIsBase64 indicates if the content already base64 encoded
     * @param {Function} successCallback the callback method if the file has been saved successfully.
     *
     * @since 4.0.0
     */
    updateFile: function (fileHandle, content, contentIsBase64, successCallback) {
        this.saveFile(fileHandle.title, content, contentIsBase64, successCallback);
    },

    /**
     * @method
     * Save a new file in the storage provider.
     *
     *
     * @param {String} fileName the file name if the new file
     * @param {String} content the content of the file
     * @param {String} [contentIsBase64] idicates if the content already base64 encoded
     * @param {Function} successCallback the callback method after a successful save operation
     *
     * @since 4.0.0
     */
    insertFile: function (fileName, content, contentIsBase64, successCallback) {
        this.saveFile(fileName, content, contentIsBase64, successCallback);
    }
});