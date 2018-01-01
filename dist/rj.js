/*!
 * rj.js v1.0.0
 * (c) 2017 Benjamin Ulmer<ulmer.benjamin@gmail.com>
 * Released under the MIT License.
 */
!function(n){var e={};e.debounce=function(n,e,r){var t;return function(){var u,o,i=this,a=arguments;o=function(){t=null,r||n.apply(i,a)},u=r&&!t,clearTimeout(t),t=setTimeout(o,e),u&&n.apply(i,a)}},e.poll=function(n,e,r){var t,u=Number(new Date)+(e||2e3);return r=r||100,t=function(e,o){var i=n();i?e(i):Number(new Date)<u?setTimeout(t,r,e,o):o(new Error("timed out for "+n+": "+arguments))},new Promise(t)},e.once=function(n,e){var r;return function(){return n&&(r=n.apply(e||this,arguments),n=null),r}},e.getAbsoluteUrl=function(){var n;return function(e){return n||(n=document.createElement("a")),n.href=e,n.href}}(),n.rj=e}(window);