'use strict';

/*!
 * rj.js v1.1.0
 * (c) 2017 Benjamin Ulmer<ulmer.benjamin@gmail.com>
 * Released under the MIT License.
 */
(function (w) {

    let rj = {};

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
    rj.debounce = (func, wait, immediate) => {
        let timeout;

        return () => {
            let context = this,
                args = arguments,
                callNow,
                later;

            later = () => {
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
    rj.poll = (func, timeout, interval) => {
        let endTime = Number(new Date()) + (timeout || 2000),
            checkCondition;

        interval = interval || 100;

        checkCondition = (resolve, reject) => {
            var result = func();

            // If the condition is met, we're done!
            if(result) {
                resolve(result);
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(checkCondition, interval, resolve, reject);
            }
            // Didn't match and too much time, reject!
            else {
                reject(new Error('timed out for ' + func + ': ' + arguments));
            }
        };

        return new Promise(checkCondition);
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
    rj.once = (func, context) => {
        let result;

        return () => {
            if(func) {
                result = func.apply(context || this, arguments);
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
    rj.getAbsoluteUrl = (() => {
        let a;

        return (url) => {
            if(!a) a = document.createElement('a');
            a.href = url;

            return a.href;
        };
    })();

    /**
     * Takes an URL string or uses the window.location and returns an object
     * containing all URL parameters
     *
     * @see https://www.sitepoint.com/get-url-parameters-with-javascript/
     *
     * @param  {string} i.e. 'http://www.example.com/test?foo=bar&baz=foo#anchor'
     *
     * @return {{}} i.e. {"foo": "bar", "baz":"foo"}
     */
    rj.urlParams = (url) => {
        // get query string from url (optional) or window
        let queryString = url ? url.split('?')[1] : w.location.search.slice(1),
            obj = {};

        // if query string exists
        if (queryString) {

            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];

            // split our query string into its component parts
            let arr = queryString.split('&'),
                i = 0;

            for (i = 0; i < arr.length; i++) {
                    // separate the keys and the values
                let a = arr[i].split('='),
                    paramNum = undefined,
                    paramName = undefined,
                    // set parameter value (use 'true' if empty)
                    paramValue = typeof(a[1])==='undefined' ? true : decodeURIComponent(a[1]),
                    paramIsArray = false;

                // in case params look like: list[]=thing1&list[]=thing2
                // or list[1]=thing2&list[0]=thing1
                // in case params look like: list[one]=thing1&list[two]=thing2
                // the string keys are ignored, the values will be pushed to
                // the result values without an index
                paramName = a[0].replace(/\[\d*\]/, function(v) {
                    paramNum = !isNaN(parseInt(v.slice(1, -1), 10)) ? parseInt(v.slice(1, -1), 10)  : undefined;
                    paramIsArray = true;
                    return '';
                }).replace(/\[[^\]]*\]/, function(v) {
                    paramNum = undefined;
                    paramIsArray = true;
                    return '';
                });

                // the parameter has not been set in our results object yet,
                // so we check if the current parameter is an array type parameter
                // and initialize the parameter value as array or simple value
                // otherwise
                if (obj[paramName] === undefined) {
                    if(paramIsArray) {
                        obj[paramName] = [];

                        if(paramNum !== undefined) {
                            obj[paramName][paramNum] = paramValue;
                        }
                        else {
                            obj[paramName].push(paramValue);
                        }
                    }
                    else {
                        obj[paramName] = paramValue;
                    }
                }
                // the parameter was set before in our results, so we add an
                // additional value for the parameter. This requires converting
                // the value to an array (if it is not an array) and add the
                // value
                else {
                    if(typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }

                    if(paramNum !== undefined) {
                        obj[paramName][paramNum] = paramValue;
                    }
                    else {
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }

        return obj;
    };

    /**
     * Return an appropriately formatted number
     *
     * @see https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript#149099
     *
     * @param {float} number
     * @param {integer} decimals
     *        the number of decimals to use
     * @param {string} decimalPoint
     *        the decimal point sign to use
     * @param {float} number
     *
     * @return {string} the formatted number
     */
    rj.numberFormat = (number, decimals = 2, decimalPoint = '.', thousandSeparator = ',') => {
        // let decimals = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals,
        //     decimalPoint = decimalPoint == undefined ? "." : decimalPoint,
        //     thousandSeparator = thousandSeparator == undefined ? "," : thousandSeparator,
        let s = number < 0 ? "-" : "",
            i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decimals))),
            j = i.length > 3 ? i.length % 3 : 0;

        return s + (j ? i.substr(0, j) + thousandSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousandSeparator) + (decimals ? decimalPoint + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    };


    /**
     * An easy to use pub/sub interface for dealing with application wide events.
     *
     * If you've not used pub/sub before, the gist is that you publish to a
     * topic and anyone can subscribe, much like the way a radio works: a radio
     * station broadcasts (publishes) and anyone can listen (subscribes). This
     * is excellent for highly modular web applications; it's a license to
     * globally communicate without attaching to any specific object.
     *
     * @see https://davidwalsh.name/pubsub-javascript
     *
     * @return  {Object} the events pub/sub object
     */
    rj.events = (() => {
        let topics = {},
            hOP = topics.hasOwnProperty;

        return {
            subscribe(topic, listener) {
                // Create the topic's object if not yet created
                if(!hOP.call(topics, topic)) topics[topic] = [];

                // Add the listener to queue
                let index = topics[topic].push(listener) -1;

                // Provide handle back for removal of topic
                return {
                    remove() {
                        delete topics[topic][index];
                    }
                };
            },
            publish(topic, info) {
                // If the topic doesn't exist, or there's no listeners in queue, just leave
                if(!hOP.call(topics, topic)) return;

                // Cycle through topics queue, fire!
                topics[topic].forEach(function(item) {
                    item(info !== undefined ? info : {});
                });
            }
        };
    })();

    /**
     * Trims all kind of whitespace characters from the given string and returns
     * the cleaned version.
     *
     * @param {string} str
     *
     * @returns {string}
     */
    rj.trim = (str) => {
        return str.replace(/^\s+|\s+$/g, "");
    };

    /**
     * Transforms a string containing dashes and underscores to its camelcase
     * version.
     *
     * @param {string} str
     *
     * @returns {string}
     */
    rj.toCamel = (str) => {
        return str.replace(/([-_][a-z])/g,
            (match) => {
                return match.toUpperCase().replace(/[-_]/,'');
            }
        );
    };

    /**
     * Transforms a camelcase string to a lowercase string separated by dashes.
     *
     * @param {string} str
     *
     * @returns {string}
     */
    rj.toDash = (str) => {
        return str.replace(/([A-Z])/g,
            (match) => {
                return "-" + match.toLowerCase();
            }
        );
    };


    /**
     * Transforms a camelcase string to a lowercase string separated by
     * underscores.
     *
     * @param {string} str
     *
     * @returns {string}
     */
    rj.toUnderscore = (str) => {
        return str.replace(/([A-Z])/g,
            (match) => {
                return "_" + match.toLowerCase();
            }
        );
    };

    // export
    w.rj = rj;

})(window);