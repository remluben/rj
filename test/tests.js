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

QUnit.test("rj.urlParams", function(assert) {
    assert.equal(typeof(rj.urlParams), 'function',  "rj.urlParams is a function.");

    assert.propEqual(
        rj.urlParams('http://www.example.com/test?foo=bar&baz=foo#anchor'),
        {
            foo: 'bar',
            baz: 'foo'
        },
        "rj.urlParam returns the URL params from a full URL with params and hash."
    );

    assert.propEqual(
        rj.urlParams('http://www.example.com/test?foo=&baz=#anchor'),
        {
            foo: '',
            baz: ''
        },
        "rj.urlParam returns the URL params from a full URL with params and hash, even if the values are empty (no value after the '=' sign)."
    );

    assert.propEqual(
        rj.urlParams('http://www.example.com/test?foo[]=bar&foo[]=boo&baz=foo#anchor'),
        {
            foo: ['bar','boo'],
            baz: 'foo'
        },
        "rj.urlParam handles array URL params without key values correctly."
    );

    assert.propEqual(
        rj.urlParams('http://www.example.com/test?foo[1]=second&foo[0]=first&baz=foo#anchor'),
        {
            foo: ['first','second'],
            baz: 'foo'
        },
        "rj.urlParam handles array URL params with numeric keys correctly and adds them to the results in the appropriate order."
    );

    assert.propEqual(
        rj.urlParams('http://www.example.com/test?foo=a%20bar&bar=a%20foo#anchor'),
        {
            foo: 'a bar',
            bar: 'a foo'
        },
        "rj.urlParam handles urlencoded URL param values correctly and returns the properly decoded values."
    );

    assert.propEqual(
        rj.urlParams('http://www.example.com/test?foo[one]=1&foo[two]=2#anchor'),
        {
            foo: ['1', '2']
        },
        "rj.urlParam ignores non-numeric array URL param keys and pushes the values in parameter order to the resulting object."
    );
});

QUnit.test("rj.numberFormat", function(assert) {
    assert.equal(typeof(rj.numberFormat), 'function',  "rj.numberFormat is a function.");

    assert.equal(rj.numberFormat('invalid', 2, ',', ' '), '0,00',
        "rj.numberFormat returns 0,00 for an invalid value 'invalid' provided.");

    assert.equal(rj.numberFormat('', 2, ',', ' '), '0,00',
        "rj.numberFormat returns 0,00 for an empty value provided as number.");

    assert.equal(rj.numberFormat(undefined, 2, ',', ' '), '0,00',
        "rj.numberFormat returns 0,00 for 'undefined' provided as number.");

    assert.equal(rj.numberFormat(null, 2, ',', ' '), '0,00',
        "rj.numberFormat returns 0,00 for 'null' provided as number.");

    assert.equal(rj.numberFormat(NaN, 2, ',', ' '), '0,00',
        "rj.numberFormat returns 0,00 for 'NaN' provided as number.");

    assert.equal(rj.numberFormat(1200.99, 2, ',', ' '), '1 200,99',
        "rj.numberFormat formats a valid float correctly.");

    assert.equal(rj.numberFormat(0.905, 2, ',', ' '), '0,91',
        "rj.numberFormat rounds numbers correctly to the given precision.");

    assert.equal(rj.numberFormat(0.904, 2, ',', ' '), '0,90',
        "rj.numberFormat rounds numbers correctly to the given precision.");

    assert.equal(rj.numberFormat(1200.99, 0, '.', ' '), '1 201',
        "rj.numberFormat rounds numbers correctly to the given precision.");
});

QUnit.test("rj.events", function(assert) {
    assert.equal(typeof(rj.events), 'object',  "rj.events is successfully initialized.");

    assert.equal(typeof(rj.events.publish), 'function',  "rj.events.publish is a function.");

    assert.equal(typeof(rj.events.subscribe), 'function',  "rj.events.subscribe is a function.");

    (function () {
        var func = sinon.spy();

        rj.events.subscribe('ExampleEvent', func)
        rj.events.publish('ExampleEvent');

        assert.ok(func.calledOnce, "A function subscribed for the event 'ExampleEvent' is called once if the event is published once.");
    })();

    (function () {
        var func = sinon.spy(function () {}),
            subscription = rj.events.subscribe('ExampleEvent', func);

        subscription.remove();
        rj.events.publish('ExampleEvent');

        assert.ok(func.notCalled,  "The function subscribed for the event 'ExampleEvent' is not called if it's subscription was remove before the event is fired.");
    })();

    (function () {
        var funcOne = sinon.spy(),
            funcTwo = sinon.spy();

        rj.events.subscribe('ExampleEvent', funcOne)
        rj.events.subscribe('ExampleEvent', funcTwo)

        rj.events.publish('ExampleEvent');
        rj.events.publish('ExampleEvent');

        assert.equal(funcOne.callCount, funcTwo.callCount,  "Two functions, that subscribed for the same event 'ExampleEvent', are both called twice if the event is published twice.");
    })();

    (function () {
        var func = sinon.spy(),
            params = {"foo":"bar"};

        rj.events.subscribe('ExampleEvent', func)
        rj.events.publish('ExampleEvent', params);

        // func.args[0] // array of parameters provided on first call
        // func.args[0][0] // first parameter of parameters provided on first call
        assert.equal(func.args[0][0], params, "The function subscribed for the event 'ExampleEvent' receives the info data published with the event as first function parameter.");
    })();
});