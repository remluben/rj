# rj

Remluben JavaScript - A collection of useful JavaScript helper functions

<img src="http://cdn.remluben.at/assets/logo-358x398.png" width="32"> 

## Description

Note, that I did not write the functions on my own. I simply tried to collect
them and provide a useful set of unit tests.

### Usage

To use these helper functions, download this repository and include the 
*dist/rj.min.js* distribution file in your project. In order to use single 
functions, please copy and paste the required functions from the *dist/rj.js* 
file to your project's JavaScript code.

## Function reference

### rj.debounce(func, wait, immediate)

Use the `rj.debounce` function whenever you're attaching event handlers to DOM 
events such as the *scroll*, *resize* or any of the *keyX* events. It provides
you an easy interface to avoid firing a function call each time it is triggered,
but wait `wait` seconds to call `func` after it was triggered before firing it
instead. It makes any event handler function more efficient.

```javascript
var myEfficientFn = rj.debounce(function() {
    // Do something here, i.e. show or hide a DOM element, trigger an ajax call, ...
}, 250);
window.addEventListener('resize', myEfficientFn);
```

Please view the original function and docs at https://davidwalsh.name/javascript-debounce-function

### rj.events

An easy to use pub/sub interface for dealing with application wide events.

If you've not used pub/sub before, the gist is that you publish to a topic and anyone can subscribe, much like the way a radio works: a radio station broadcasts (publishes) and anyone can listen (subscribes). This is excellent for highly modular web applications; it's a license to globally communicate without attaching to any specific object.

Publishing to a topic:

```javascript
rj.events.publish('/page/load', {
    url: '/some/url/path' // any argument
});
```

...and subscribing to said topic in order to be notified of events:

```javascript
var subscription = rj.events.subscribe('/page/load', function(obj) {
    // Do something now that the event has occurred
});

// ...sometime later where I no longer want subscription...
subscription.remove();
```

Please view the original function and docs at https://davidwalsh.name/pubsub-javascript

### rj.getAbsoluteUrl(url)

Getting an absolute URL from a variable string isn't as easy as you think. 
There's the URL constructor but it can act up if you don't provide the required 
arguments (which sometimes you can't). `rj.getAbsoluteUrl` does the trick for 
you.

```javascript
// on a website http://www.example.com...
rj.getAbsoluteUrl('/something'); // http://www.example.com/something
rj.getAbsoluteUrl('/something/different'); // http://www.example.com/something/different
rj.getAbsoluteUrl('subdomain.example.com/something'); // http://subdomain.example.com/something
```

Please view the original function and docs at https://davidwalsh.name/get-absolute-url

### rj.numberFormat(number, decimals = 2, decimalPoint = '.', thousandSeparator = ',')

Formats a given numer with the specified number of decimals, the specified decimal point and the specified thousand separator.

```javascript
rj.numberFormat(1200.99); // 1,200.99
rj.numberFormat(1200.905, 2, ',', '.'); // 1.200,91
rj.numberFormat(1200.904, 2); // 1,200.90
rj.numberFormat(1200.99, 0, '.', ' '); // 1 201
rj.numberFormat(undefined, 2, '.', ' '); // 0.00
```

Please view the original function and docs at https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript#149099

### rj.once(func, context)

There are times when you prefer a given functionality only happen once, similar 
to the way you'd use an `window.onload` event. The `rj.once` function provides 
you with a simple interface to do so and makes it easy to avoid duplicate 
initialization.

```javascript
var canOnlyFireOnce = rj.once(function() {
    // Do some initialization stuff here
});
canOnlyFireOnce(); // executes the initialization stuff
canOnlyFireOnce(); // nada
```

Please view the original function and docs at https://davidwalsh.name/javascript-once

### rj.poll(func, timeout, interval)

If you want to allow your desired code (or function) to be executed after a 
certain condition was met the `rj.poll` function is your choice. It allows you to
check for a condition to be met every `interval` milliseconds.

```javascript
// ensure element is visible
rj.poll(function() {
    return document.getElementById('lightbox').offsetWidth > 0;
}, 2000, 150).then(function() {
    // Polling done, now do something else!
}).catch(function() {
    // Polling timed out, handle the error!
});
```

Please view the original function and docs at https://davidwalsh.name/javascript-polling

### rj.toCamel(str)

Transforms the given string to its camelcase representation.

```javascript
rj.toCamel('property-one'); // "propertyOne"
rj.toCamel('property_two'); // "propertyTwo"
rj.toCamel('_property_three'); // "PropertyThree"
```

Please view the original function and docs at https://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/

### rj.toUnderscore(str)

Transforms the given camelcase string to its dash representation.

```javascript
rj.toUnderscore('propertyOne'); // "property-one"
rj.toUnderscore('propertyTwo'); // "property-two"
rj.toUnderscore('PropertyThree'); // "-property-three"
```

Please view the original function and docs at https://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/

### rj.toUnderscore(str)

Transforms the given camelcase string to its underscore representation.

```javascript
rj.toUnderscore('propertyOne'); // "property_one"
rj.toUnderscore('propertyTwo'); // "property-two"
rj.toUnderscore('PropertyThree'); // "_property_three"
```

Please view the original function and docs at https://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/

### rj.trim(str)

Strips whitespaces from the beginning and end of the given string.

```javascript
rj.trim(' Frank Example '); // " Frank Example " > "Frank Example"
```

Please view the original function and docs at https://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/

### rj.urlParams(url)

Use the `rj.urlParams` function whenever you need to read the URL parameters from either an URL from a variable or the current applications URL.

Note, that this function deals with simple parameters as well as with array URL parameters.

```javascript
// for a given example URL 
// http://www.example.com/directory?foo[]=one&foo[]=two&show_target_section=1&bar[1]=second&bar[0]=first
var bool = false;

bool = rj.urlParams().show_target_section === '1'; // true
bool = rj.urlParams().foo[0] === 'one'; // true
bool = rj.urlParams().foo[1] === 'two'; // true
bool = rj.urlParams().bar[0] === 'second'; // false
bool = rj.urlParams().foo[0] === 'first'; // true
bool = rj.urlParams().foo[1] === 'second'; // true
```

Please note, that this function is an improved version of the original function at https://www.sitepoint.com/get-url-parameters-with-javascript/

## Roadmap

* Add browser support information to docs  
* Find and document polyfills for ECMAScript6 features or transpile to ECMAScript5 compatibility
* Improve development setup
* Add new functions

## Credits

Source code for the functions
* rj.debounce
* rj.events
* rj.getAbsoluteUrl
* rj.once
* rj.poll

was taken from https://davidwalsh.name/essential-javascript-functions.

Source code for rj.urlParams was taken from https://www.sitepoint.com/get-url-parameters-with-javascript/

Source code for rj.numberFormat was taken from https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript#149099

Source code for the functions
* rj.toCamel
* rj.toDash
* rj.toUnderscore
* rj.trim

was taken from https://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/.
