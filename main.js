/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 354:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 365:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.bunny.net/css?family=birthstone-bounce:500);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 4. Add accessible line-height */
  line-height: 1.5;
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 6. Improve media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 7. Inherit fonts for form controls */
input, button, textarea, select {
  font: inherit;
}

/* 8. Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/*
  10. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

:root {
    --primary-colour: rgb(80, 57, 57);
    --secondary-colour: rgb(255, 255, 255);
    --tertiary-colour: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

nav {
    display: flex;
    justify-content: center;
    background-image: linear-gradient(270deg, rgb(63, 40, 40), var(--primary-colour) 70%, rgb(63, 40, 40));
    min-height: 7vh;
    gap: 100px;
}

nav button {
    background-color: transparent;
    border: none;
    color: var(--secondary-colour);
    font-size: 1.5rem;
    font-weight: 600;
}

nav button:hover {
    cursor: pointer;
}

.active-button {
    text-decoration: underline;
}

#content {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('https://images.pexels.com/photos/230484/pexels-photo-230484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: cover;
    height: 93vh;
    background-position: center;
    color: var(--secondary-colour);
}

#content::after {
    opacity: 0.1;
}

#home {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

#home h1 {
    font-size: 13rem;
    font-family: 'Birthstone Bounce', handwriting;
    margin-bottom: -20px;
}

#home p {
    width: 50%;
    text-wrap: balance;
    text-align: center;
    font-style: italic;
    font-size: 1.2rem;
}

#home p:first-of-type {
    margin-bottom: 20px;
}

#menu {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 500px;
    height: 100%;
    gap: 100px;
    padding: 100px;
    overflow: scroll;
}

.menu-item {
    color: var(--secondary-colour);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    text-align: center;
    padding: 20px;
    font-size: 1.5rem;
    font-style: italic;
}

.menu-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    margin-bottom: 10px;
    border-radius: 20px;
    border: 2px solid var(--secondary-colour);
}

#contact {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#contact div {
  max-width: 30%;
  font-size: 1.5rem;
  font-style: italic;
  text-align: center;
  text-wrap: balance;
}

#contact div p:first-child{
  margin-bottom: 20px;
}

#contact img {
  border-radius: 10px;
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAEA,6CAA6C;AAC7C;EACE,sBAAsB;AACxB;;AAEA,6BAA6B;AAC7B;EACE,SAAS;AACX;;AAEA,iCAAiC;AACjC;EACE;IACE,gCAAgC;EAClC;AACF;;AAEA;EACE,kCAAkC;EAClC,gBAAgB;EAChB,8BAA8B;EAC9B,mCAAmC;AACrC;;AAEA,8BAA8B;AAC9B;EACE,cAAc;EACd,eAAe;AACjB;;AAEA,uCAAuC;AACvC;EACE,aAAa;AACf;;AAEA,4BAA4B;AAC5B;EACE,yBAAyB;AAC3B;;AAEA,6BAA6B;AAC7B;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;AACpB;;AAEA;;CAEC;AACD;EACE,kBAAkB;AACpB;;AAEA;IACI,iCAAiC;IACjC,sCAAsC;IACtC,wBAAwB;IACxB,mJAAmJ;AACvJ;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,sGAAsG;IACtG,eAAe;IACf,UAAU;AACd;;AAEA;IACI,6BAA6B;IAC7B,YAAY;IACZ,8BAA8B;IAC9B,iBAAiB;IACjB,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,0BAA0B;AAC9B;;AAEA;IACI,+LAA+L;IAC/L,sBAAsB;IACtB,YAAY;IACZ,2BAA2B;IAC3B,8BAA8B;AAClC;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,gBAAgB;IAChB,6CAA6C;IAC7C,oBAAoB;AACxB;;AAEA;IACI,UAAU;IACV,kBAAkB;IAClB,kBAAkB;IAClB,kBAAkB;IAClB,iBAAiB;AACrB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,qBAAqB;IACrB,YAAY;IACZ,UAAU;IACV,cAAc;IACd,gBAAgB;AACpB;;AAEA;IACI,8BAA8B;IAC9B,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,qBAAqB;IACrB,kBAAkB;IAClB,aAAa;IACb,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,YAAY;IACZ,iBAAiB;IACjB,uBAAuB;IACvB,mBAAmB;IACnB,mBAAmB;IACnB,yCAAyC;AAC7C;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB","sourcesContent":["@import url(https://fonts.bunny.net/css?family=birthstone-bounce:500);\n\n/* 1. Use a more-intuitive box-sizing model */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n/* 2. Remove default margin */\n* {\n  margin: 0;\n}\n\n/* 3. Enable keyword animations */\n@media (prefers-reduced-motion: no-preference) {\n  html {\n    interpolate-size: allow-keywords;\n  }\n}\n\nbody {\n  /* 4. Add accessible line-height */\n  line-height: 1.5;\n  /* 5. Improve text rendering */\n  -webkit-font-smoothing: antialiased;\n}\n\n/* 6. Improve media defaults */\nimg, picture, video, canvas, svg {\n  display: block;\n  max-width: 100%;\n}\n\n/* 7. Inherit fonts for form controls */\ninput, button, textarea, select {\n  font: inherit;\n}\n\n/* 8. Avoid text overflows */\np, h1, h2, h3, h4, h5, h6 {\n  overflow-wrap: break-word;\n}\n\n/* 9. Improve line wrapping */\np {\n  text-wrap: pretty;\n}\nh1, h2, h3, h4, h5, h6 {\n  text-wrap: balance;\n}\n\n/*\n  10. Create a root stacking context\n*/\n#root, #__next {\n  isolation: isolate;\n}\n\n:root {\n    --primary-colour: rgb(80, 57, 57);\n    --secondary-colour: rgb(255, 255, 255);\n    --tertiary-colour: black;\n    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\nnav {\n    display: flex;\n    justify-content: center;\n    background-image: linear-gradient(270deg, rgb(63, 40, 40), var(--primary-colour) 70%, rgb(63, 40, 40));\n    min-height: 7vh;\n    gap: 100px;\n}\n\nnav button {\n    background-color: transparent;\n    border: none;\n    color: var(--secondary-colour);\n    font-size: 1.5rem;\n    font-weight: 600;\n}\n\nnav button:hover {\n    cursor: pointer;\n}\n\n.active-button {\n    text-decoration: underline;\n}\n\n#content {\n    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('https://images.pexels.com/photos/230484/pexels-photo-230484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');\n    background-size: cover;\n    height: 93vh;\n    background-position: center;\n    color: var(--secondary-colour);\n}\n\n#content::after {\n    opacity: 0.1;\n}\n\n#home {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    height: 100%;\n}\n\n#home h1 {\n    font-size: 13rem;\n    font-family: 'Birthstone Bounce', handwriting;\n    margin-bottom: -20px;\n}\n\n#home p {\n    width: 50%;\n    text-wrap: balance;\n    text-align: center;\n    font-style: italic;\n    font-size: 1.2rem;\n}\n\n#home p:first-of-type {\n    margin-bottom: 20px;\n}\n\n#menu {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-auto-rows: 500px;\n    height: 100%;\n    gap: 100px;\n    padding: 100px;\n    overflow: scroll;\n}\n\n.menu-item {\n    color: var(--secondary-colour);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-items: center;\n    text-align: center;\n    padding: 20px;\n    font-size: 1.5rem;\n    font-style: italic;\n}\n\n.menu-item img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    object-position: center;\n    margin-bottom: 10px;\n    border-radius: 20px;\n    border: 2px solid var(--secondary-colour);\n}\n\n#contact {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n}\n\n#contact div {\n  max-width: 30%;\n  font-size: 1.5rem;\n  font-style: italic;\n  text-align: center;\n  text-wrap: balance;\n}\n\n#contact div p:first-child{\n  margin-bottom: 20px;\n}\n\n#contact img {\n  border-radius: 10px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/styles.css
var styles = __webpack_require__(365);
;// ./src/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const src_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/contact.js
function loadContactContent() {
    const contactContainer = document.createElement('div');
    contactContainer.id = 'contact';

    const img = new Image();
    img.src = 'https://images.pexels.com/photos/143640/pexels-photo-143640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    const infoContainer = document.createElement('div');

    const info = document.createElement('p');
    info.textContent = 'Feel free to call or email us with any of your inquiries regarding allergies, bookings, or anything else about tea!';

    const email = document.createElement('p');
    email.textContent = 'Email: definitely_a_real_email@yahoo.net';

    const phoneNumber = document.createElement('p');
    phoneNumber.textContent = 'Phone number: 01-23456789';

    infoContainer.append(info, email, phoneNumber);
    contactContainer.append(img, infoContainer);

    return contactContainer;
}

/* harmony default export */ const contact = (loadContactContent);

;// ./src/home.js
function loadHomeContent() {
    const homeContainer = document.createElement('div');
    homeContainer.id = 'home';

    const title = document.createElement('h1');
    title.textContent = 'The Tea Tent';

    const firstSubtitle = document.createElement('p');
    firstSubtitle.textContent = 'The best place in Wageningen to enjoy fine aromatic beverages, hang out with your loved ones, and feel warmed by a cozy atmosphere';

    const secondSubtitle = document.createElement('p');
    secondSubtitle.textContent = 'Be sure to check our menu to find out if we have your favourite tea!'

    homeContainer.append(title, firstSubtitle, secondSubtitle);

    return homeContainer;
}

/* harmony default export */ const home = (loadHomeContent);

;// ./src/menu.js
function loadMenuContent() {
    const menuContainer = document.createElement('div');
    menuContainer.id = 'menu';

    const menuItems = {
        'Ginger with lemongrass': 'https://plus.unsplash.com/premium_photo-1673507375644-55520bbeaaf7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Hibiscus': 'https://images.pexels.com/photos/31012762/pexels-photo-31012762/free-photo-of-vibrant-hibiscus-tea-pouring-over-ice-cubes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Earl grey': 'https://plus.unsplash.com/premium_photo-1663853293768-11ae559bc4e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Mint': 'https://images.unsplash.com/photo-1591299089616-c9604047b1a6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Jasmine': 'https://images.unsplash.com/photo-1609016617751-e80552ae6ec2?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Matcha': 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Green': 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Mysteary': 'https://images.pexels.com/photos/5428828/pexels-photo-5428828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }

    for (const item in menuItems) {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        const img = new Image();
        img.src = menuItems[item];

        const itemTitle = document.createElement('h2');
        itemTitle.innerText = item;

        menuItem.append(img, itemTitle);
        menuContainer.appendChild(menuItem);
    }

    return menuContainer;
}

/* harmony default export */ const menu = (loadMenuContent);

;// ./src/index.js





const contentContainer = document.querySelector('#content');

const navButtons = document.querySelectorAll('button');
navButtons.forEach((button) => {
    button.addEventListener('click', () => navButtonHandler(button));
});


function navButtonHandler(navButton) {
    if (navButton.className.includes('home')) {
        loadPage(home);
    } else if (navButton.className.includes('menu')) {
        loadPage(menu);
    } else if (navButton.className.includes('contact')) {
        loadPage(contact);
    }

    document.querySelector('.active-button').classList.remove('active-button');
    navButton.classList += ' active-button';
}


function loadPage(loadContent) {
    contentContainer.innerHTML = '';
    const content = loadContent();
    contentContainer.appendChild(content);
}

// Initial page load.
loadPage(home);

/******/ })()
;
//# sourceMappingURL=main.js.map