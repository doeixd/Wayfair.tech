// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"NqYy":[function(require,module,exports) {
//This is the service worker with the combined offline experience (Offline page + Offline copy of pages)
//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function (event) {
  event.waitUntil(preLoad());
});

var preLoad = function preLoad() {
  return caches.open('pwabuilder-offline').then(function (cache) {
    return cache.addAll(['index.html']);
  });
};

self.addEventListener('fetch', function (event) {
  console.log('[PWA Builder] The service worker is serving the asset.');
  event.respondWith(checkResponse(event.request).catch(function () {
    return returnFromCache(event.request);
  }));
  event.waitUntil(addToCache(event.request));
});

var checkResponse = function checkResponse(request) {
  return new Promise(function (fulfill, reject) {
    fetch(request).then(function (response) {
      if (response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function addToCache(request) {
  return caches.open('pwabuilder-offline').then(function (cache) {
    return fetch(request).then(function (response) {
      console.log('[PWA Builder] add page to offline' + response.url);
      return cache.put(request, response);
    });
  });
};

var returnFromCache = function returnFromCache(request) {
  return caches.open('pwabuilder-offline').then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status == 404) {
        return cache.match('index.html');
      } else {
        return matching;
      }
    });
  });
};
},{}],"u9lk":[function(require,module,exports) {

},{"./uni.png":[["uni.a182ae34.png","bWxz"],"bWxz"]}],"Focm":[function(require,module,exports) {
"use strict";

var _sw = _interopRequireDefault(require("./sw"));

require("./styles.sass");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var h1 = document.querySelector('h1');
var submit = document.querySelector('#submit');
submit.addEventListener('click', console.log('cllickes'));
setInterval(function (_) {
  h1.style.color = h1.style.color == 'transparent' ? 'white' : 'transparent';
  window.navigator.vibrate(100);
}, 500);

function send() {
  var message = document.querySelector('#message');
  var email = document.querySelector('#email');

  if (!email || !password) {
    alert('must not be empty');
  }

  fetch('/contact', {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "email=".concat(email, "&message=").concat(message)
  }).then(function (response) {
    return response.json();
  }).then(function (res) {
    return console.log(res);
  });
}

(0, _sw.default)();
},{"./sw":"NqYy","./styles.sass":"u9lk"}]},{},["Focm"], null)
//# sourceMappingURL=/tech.22230758.map