"use strict";/*!
 * rj.js v1.0.0
 * (c) 2017 Benjamin Ulmer<ulmer.benjamin@gmail.com>
 * Released under the MIT License.
 */
!function(n){var e=this,r=arguments,t={};t.debounce=function(n,t,o){var u=void 0;return function(){var i=e,c=r,a=void 0,f=void 0;f=function(){u=null,o||n.apply(i,c)},a=o&&!u,clearTimeout(u),u=setTimeout(f,t),a&&n.apply(i,c)}},t.poll=function(n,e,t){var o=Number(new Date)+(e||2e3),u=void 0;return t=t||100,u=function(e,i){var c=n();c?e(c):Number(new Date)<o?setTimeout(u,t,e,i):i(new Error("timed out for "+n+": "+r))},new Promise(u)},t.once=function(n,t){var o=void 0;return function(){return n&&(o=n.apply(t||e,r),n=null),o}},t.getAbsoluteUrl=function(){var n=void 0;return function(e){return n||(n=document.createElement("a")),n.href=e,n.href}}(),n.rj=t}(window);