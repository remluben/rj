QUnit.test("rj.debounce", function(assert) {
    assert.equal(typeof(rj.debounce), 'function',  "rj.debounce is a function.");

    (function () {
        var callback = function () {
                // do something
            },
            originalCallback = callback,
            handler;

        callback = sinon.spy(callback);
        handler = rj.debounce(callback, 250);
        handler();

        assert.equal(callback.callCount, 0, "rj.debounce does not call the callback functions immediately for parameter 'wait' set to 250 milliseconds.");

        callback = originalCallback;
    })();

    (function () {
        var callback = function () {
                // do something
            },
            originalCallback = callback,
            handler,
            done;

        callback = sinon.spy(callback);
        handler = rj.debounce(callback, 250);

        assert.timeout(1000);
        done = assert.async();

        handler();
        setTimeout(function() {
            assert.equal(callback.callCount, 1, "rj.debounce calls the callback functions once after 500 milliseconds passed for parameter 'wait' set to 250 milliseconds.");

            callback = originalCallback;
            done();
        }, 500);
    })();

    (function () {
        var callback = function () {
                // do something
            },
            originalCallback = callback,
            handler,
            done;

        callback = sinon.spy(callback);
        handler = rj.debounce(callback, 250);

        assert.timeout(1000);
        done = assert.async();

        handler();
        handler();
        handler();
        handler();
        handler();
        setTimeout(function() {
            assert.equal(callback.callCount, 1, "rj.debounce calls the callback functions only once although triggered five times after 500 milliseconds for parameter 'wait' set to 250 milliseconds.");

            callback = originalCallback;
            done();
        }, 500);
    })();

    (function () {
        var callback = function () {
                // do something
            },
            originalCallback = callback,
            handler,
            done;

        callback = sinon.spy(callback);
        handler = rj.debounce(callback, 250);

        assert.timeout(1000);
        done = assert.async();

        handler();
        setTimeout(function() {
            handler();

            setTimeout(function () {
                assert.equal(callback.callCount, 2, "rj.debounce calls the callback functions two times if triggered again after 300 milliseconds for parameter 'wait' set to 250 milliseconds.");

                callback = originalCallback;
                done();
            }, 300);
        }, 300);
    })();

    (function () {
        var callback = function () {
                // do something
            },
            originalCallback = callback,
            handler;

        callback = sinon.spy(callback);
        handler = rj.debounce(callback, 250, true);
        handler();

        assert.equal(callback.callCount, 1, "rj.debounce calls the callback functions immediately for parameter 'wait' set to 250 milliseconds with 'immediate' set to 'true'.");

        callback = originalCallback;
    })();
});

QUnit.test("rj.poll", function(assert) {
    assert.equal(typeof(rj.poll), 'function',  "rj.poll is a function.");

    (function () {
        var check = function () {
                return false;
            },
            success = function() {},
            error = function () {},
            timeout = 750,
            interval = 250,
            done;

        assert.timeout(1000);
        done = assert.async();

        check = sinon.spy(check);
        success = sinon.spy(success);
        error = sinon.spy(error);

        rj.poll(check, timeout, interval).then(success).catch(error);

        window.setTimeout(function () {
            assert.equal(check.callCount, 3, "rj.poll called the check method 3 times within 750 milliseconds for an interval of 250 milliseconds.");
            assert.equal(success.callCount, 0, "rj.poll does not call the success callback for an unmet condition.");
            window.setTimeout(function () {
                assert.equal(error.callCount, 1, "rj.poll calls the error callback for an unmet condition.");
                done();
            }, 200); // 950ms
        }, 750);
    })();
});

QUnit.test("rj.once", function(assert) {
    assert.equal(typeof(rj.once), 'function',  "rj.once is a function.");

    (function () {
        var func = function() {},
            originalFunc = func,
            callback;

        func = sinon.spy(func);

        callback = rj.once(func);
        callback();
        callback();
        callback();

        assert.equal(func.callCount, 1, "rj.once called the func function only once although called 3 times.");

        func = originalFunc;

        func = sinon.spy(func);

        callback = rj.once(func);
        callback();
        callback();
        callback();
        func();

        assert.equal(func.callCount, 2, "The function func was called twice: one time from rj.once and additionally once by being called directly.");
    })();
});

QUnit.test("rj.getAbsoluteUrl", function(assert) {
    assert.equal(typeof(rj.getAbsoluteUrl), 'function',  "rj.getAbsoluteUrl is a function.");
    // TODO: tests
});