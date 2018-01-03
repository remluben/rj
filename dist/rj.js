

/*!
 * rj.js v1.0.0
 * (c) 2017 Benjamin Ulmer<ulmer.benjamin@gmail.com>
 * Released under the MIT License.
 */
(function (w) {
    var _this = this,
        _arguments = arguments;

    var rj = {};

    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * N milliseconds. If *immediate* is passed, trigger the function on the
     * leading edge, instead of the trailing.
     *
     * @see https://davidwalsh.name/essential-javascript-functions
     *
     * @param  {Function} func
     * @param  {integer} wait
     * @param  {boolean} immediate
     *
     * @return {Function}
     */
    rj.debounce = function (func, wait, immediate) {
        var timeout = void 0;

        return function () {
            var context = _this,
                args = _arguments,
                callNow = void 0,
                later = void 0;

            later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };

            callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    /**
     * Returns a Promise for a certain condition to be met. The condition is
     * provided as parameter 'func' and called in the given 'interval' for as
     * long as the 'timeout' time limit is not reached.
     *
     * @see https://davidwalsh.name/essential-javascript-functions
     *
     * @param  {Function} func
     * @param  {integer} timeout
     * @param  {integer} interval
     *
     * @return {Promise}
     */
    rj.poll = function (func, timeout, interval) {
        var endTime = Number(new Date()) + (timeout || 2000),
            _checkCondition = void 0;

        interval = interval || 100;

        _checkCondition = function checkCondition(resolve, reject) {
            var result = func();

            // If the condition is met, we're done!
            if (result) {
                resolve(result);
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                    setTimeout(_checkCondition, interval, resolve, reject);
                }
                // Didn't match and too much time, reject!
                else {
                        reject(new Error('timed out for ' + func + ': ' + _arguments));
                    }
        };

        return new Promise(_checkCondition);
    };

    /**
     * The once function ensures a given function can only be called once,
     * thus prevent duplicate initialization.
     *
     * @see https://davidwalsh.name/essential-javascript-functions
     *
     * @param  {Function} func
     * @param  {{}} context
     *
     * @return mixed
     */
    rj.once = function (func, context) {
        var result = void 0;

        return function () {
            if (func) {
                result = func.apply(context || _this, _arguments);
                func = null;
            }

            return result;
        };
    };

    /**
     * Takes a path or URL string, providing a reliable absolute URL in return.
     *
     * @see https://davidwalsh.name/essential-javascript-functions
     *
     * @param  {string} i.e. '/something'
     *
     * @return {string} i.e. 'http://www.example.com/something'
     */
    rj.getAbsoluteUrl = function () {
        var a = void 0;

        return function (url) {
            if (!a) a = document.createElement('a');
            a.href = url;

            return a.href;
        };
    }();

    // export
    w.rj = rj;
})(window);