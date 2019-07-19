/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/framework/fluxImplementation.ts":
/*!*********************************************!*\
  !*** ./src/framework/fluxImplementation.ts ***!
  \*********************************************/
/*! exports provided: SimulationStore, SimulationActions, TrevoFlux */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationStore", function() { return SimulationStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationActions", function() { return SimulationActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrevoFlux", function() { return TrevoFlux; });
/* harmony import */ var _framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework */ "./src/framework/framework.ts");

class SimulationStore extends _framework__WEBPACK_IMPORTED_MODULE_0__["FluxFramework"].Store {
    constructor(actions) {
        let defaultState = {};
        super(actions.getId(), defaultState, actions);
        this.addHandler("START_SIMULATION", this.startSimulationHandler);
    }
    startSimulationHandler(actionResult) {
        //update state accordingly
        this.state = actionResult;
    }
}
class SimulationActions extends _framework__WEBPACK_IMPORTED_MODULE_0__["FluxFramework"].ActionSet {
    constructor(id) {
        super(id);
        this.addAction("START_SIMULATION", this.startSimulationAction);
    }
    startSimulationAction(payload) {
        //call api
        return {
            simulationResult: payload
        };
    }
}
class TrevoFlux extends _framework__WEBPACK_IMPORTED_MODULE_0__["FluxFramework"].FluxApp {
    constructor() {
        super();
        const simId = "SIMULATION";
        this.addActionSet(new SimulationActions(simId));
        this.addStore(new SimulationStore(this.getActionSet(simId)));
    }
    static getInstance() {
        if (!TrevoFlux.instance) {
            TrevoFlux.instance = new TrevoFlux();
        }
        return TrevoFlux.instance;
    }
}


/***/ }),

/***/ "./src/framework/framework.ts":
/*!************************************!*\
  !*** ./src/framework/framework.ts ***!
  \************************************/
/*! exports provided: FluxFramework */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FluxFramework", function() { return FluxFramework; });
var FluxFramework;
(function (FluxFramework) {
    class FluxApp {
        constructor() {
            this.stores = new Map();
            this.actionSets = new Map();
        }
        addStore(store) {
            this.stores.set(store.getId(), store);
        }
        getStore(key) {
            return this.stores.get(key);
        }
        addActionSet(actionSet) {
            this.actionSets.set(actionSet.getId(), actionSet);
        }
        getActionSet(key) {
            return this.actionSets.get(key);
        }
        run(storeId, actionId, payload) {
            let store = this.stores.get(storeId);
            if (store) {
                store.do(actionId, payload);
            }
        }
    }
    FluxFramework.FluxApp = FluxApp;
    class Store {
        constructor(id, defaultState, actions) {
            this.id = id;
            this.state = defaultState;
            this.actionSet = actions;
            this.listeners = [];
            this.handlersSet = new Map();
        }
        getId() {
            return this.id;
        }
        addHandler(actionKey, handler) {
            this.handlersSet.set(actionKey, handler);
        }
        do(actionKey, payload) {
            let action = this.actionSet.getAction(actionKey);
            if (action) {
                let handler = this.handlersSet.get(actionKey);
                if (handler) {
                    handler(action(payload));
                    this.notifyAll(actionKey);
                }
                else {
                    throw new Error("handler with id " + actionKey + " not found in store " + this.getId());
                }
            }
            else {
                throw new Error("action with id " + actionKey + " not found in store " + this.getId());
            }
        }
        notifyAll(actionName) {
            for (let listener of this.listeners) {
                listener(actionName);
            }
        }
        getState() {
            return JSON.parse(JSON.stringify(this.state));
        }
        subscribe(listener) {
            this.listeners.push(listener);
            return this.listeners.length;
        }
        unSubscribe(listenerId) {
            this.listeners.splice(listenerId, 1);
        }
    }
    FluxFramework.Store = Store;
    class ActionSet {
        constructor(id) {
            this.id = id;
            this.actions = new Map();
        }
        getId() {
            return this.id;
        }
        addAction(key, action) {
            this.actions.set(key, action);
        }
        getAction(key) {
            return this.actions.get(key);
        }
    }
    FluxFramework.ActionSet = ActionSet;
})(FluxFramework || (FluxFramework = {}));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _framework_fluxImplementation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework/fluxImplementation */ "./src/framework/fluxImplementation.ts");

(function myTest() {
    console.log("test started");
    let flux = _framework_fluxImplementation__WEBPACK_IMPORTED_MODULE_0__["TrevoFlux"].getInstance();
    var id = "SIMULATION";
    var simStore = flux.getStore(id);
    simStore.subscribe(function (action) {
        console.log(action + " happened at store " + id);
        console.log("New state: " + simStore.getState());
    });
    flux.run(id, "START_SIMULATION", { PlayerId: 1 });
    flux.run(id, "START_SIMULATION", { PlayerId: 2 });
    flux.run(id, "START_SIMULATION", { PlayerId: 3 });
    window.setTimeout(function () {
        flux.run(id, "START_SIMULATION", { PlayerId: 4 });
    }, 1000);
    window.setTimeout(function () {
        flux.run(id, "START_SIMULATION", { PlayerId: 5 });
    }, 500);
})();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9mbHV4SW1wbGVtZW50YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYW1ld29yay9mcmFtZXdvcmsudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUE0QztBQUVyQyxNQUFNLGVBQWdCLFNBQVEsd0RBQWEsQ0FBQyxLQUFLO0lBQ3BELFlBQVksT0FBZ0M7UUFDeEMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxVQUFVLENBQUMs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LFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsTUFBTTtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRWxELE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVULE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBGbHV4RnJhbWV3b3JrIH0gZnJvbSBcIi4vZnJhbWV3b3JrXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2ltdWxhdGlvblN0b3JlIGV4dGVuZHMgRmx1eEZyYW1ld29yay5TdG9yZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBGbHV4RnJhbWV3b3JrLkFjdGlvblNldCkge1xyXG4gICAgICAgIGxldCBkZWZhdWx0U3RhdGUgPSB7fTtcclxuICAgICAgICBzdXBlcihhY3Rpb25zLmdldElkKCksIGRlZmF1bHRTdGF0ZSwgYWN0aW9ucyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkSGFuZGxlcihcIlNUQVJUX1NJTVVMQVRJT05cIiwgdGhpcy5zdGFydFNpbXVsYXRpb25IYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNpbXVsYXRpb25IYW5kbGVyKGFjdGlvblJlc3VsdDogb2JqZWN0KSB7XHJcbiAgICAgICAgLy91cGRhdGUgc3RhdGUgYWNjb3JkaW5nbHlcclxuICAgICAgICB0aGlzLnN0YXRlID0gYWN0aW9uUmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXVsYXRpb25BY3Rpb25zIGV4dGVuZHMgRmx1eEZyYW1ld29yay5BY3Rpb25TZXQge1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkKTtcclxuICAgICAgICB0aGlzLmFkZEFjdGlvbihcIlNUQVJUX1NJTVVMQVRJT05cIiwgdGhpcy5zdGFydFNpbXVsYXRpb25BY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2ltdWxhdGlvbkFjdGlvbihwYXlsb2FkOiBvYmplY3QpIHtcclxuICAgICAgICAvL2NhbGwgYXBpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2ltdWxhdGlvblJlc3VsdDogcGF5bG9hZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmV2b0ZsdXggZXh0ZW5kcyBGbHV4RnJhbWV3b3JrLkZsdXhBcHAge1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc3Qgc2ltSWQgPSBcIlNJTVVMQVRJT05cIjtcclxuICAgICAgICB0aGlzLmFkZEFjdGlvblNldChuZXcgU2ltdWxhdGlvbkFjdGlvbnMoc2ltSWQpKTtcclxuICAgICAgICB0aGlzLmFkZFN0b3JlKG5ldyBTaW11bGF0aW9uU3RvcmUodGhpcy5nZXRBY3Rpb25TZXQoc2ltSWQpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgIGlmICghVHJldm9GbHV4Lmluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIFRyZXZvRmx1eC5pbnN0YW5jZSA9IG5ldyBUcmV2b0ZsdXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFRyZXZvRmx1eC5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IG5hbWVzcGFjZSBGbHV4RnJhbWV3b3JrIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRmx1eEFwcCB7XHJcbiAgICAgICAgcHJvdGVjdGVkIHN0b3JlczogTWFwPHN0cmluZywgU3RvcmU+O1xyXG4gICAgICAgIHByb3RlY3RlZCBhY3Rpb25TZXRzOiBNYXA8c3RyaW5nLCBBY3Rpb25TZXQ+O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBGbHV4QXBwO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7ICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVzID0gbmV3IE1hcDxzdHJpbmcsIFN0b3JlPigpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNldHMgPSBuZXcgTWFwPHN0cmluZywgQWN0aW9uU2V0PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFN0b3JlKHN0b3JlOiBTdG9yZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3Jlcy5zZXQoc3RvcmUuZ2V0SWQoKSwgc3RvcmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFN0b3JlKGtleTogc3RyaW5nKTogU3RvcmUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZXMuZ2V0KGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkQWN0aW9uU2V0KGFjdGlvblNldDogQWN0aW9uU2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2V0cy5zZXQoYWN0aW9uU2V0LmdldElkKCksIGFjdGlvblNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0QWN0aW9uU2V0KGtleTogc3RyaW5nKTogQWN0aW9uU2V0IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uU2V0cy5nZXQoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBydW4oc3RvcmVJZDogc3RyaW5nLCBhY3Rpb25JZDogc3RyaW5nLCBwYXlsb2FkOiBhbnkpIHtcclxuICAgICAgICAgICAgbGV0IHN0b3JlID0gdGhpcy5zdG9yZXMuZ2V0KHN0b3JlSWQpO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmUpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JlLmRvKGFjdGlvbklkLCBwYXlsb2FkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcmUge1xyXG4gICAgICAgIHByb3RlY3RlZCBpZDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBzdGF0ZTogYW55O1xyXG4gICAgICAgIHByb3RlY3RlZCBhY3Rpb25TZXQ6IEFjdGlvblNldDtcclxuICAgICAgICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiAoKGFjdGlvbk5hbWU6IHN0cmluZykgPT4gdm9pZClbXTtcclxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlcnNTZXQ6IE1hcDxzdHJpbmcsIChhY3Rpb25SZXN1bHQ6IGFueSkgPT4gdm9pZD47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGRlZmF1bHRTdGF0ZTogYW55LCBhY3Rpb25zOiBBY3Rpb25TZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gZGVmYXVsdFN0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNldCA9IGFjdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNTZXQgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkSGFuZGxlcihhY3Rpb25LZXk6IHN0cmluZywgaGFuZGxlcjogKGFjdGlvblJlc3VsdDogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNTZXQuc2V0KGFjdGlvbktleSwgaGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG8oYWN0aW9uS2V5OiBzdHJpbmcsIHBheWxvYWQ6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gdGhpcy5hY3Rpb25TZXQuZ2V0QWN0aW9uKGFjdGlvbktleSk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyc1NldC5nZXQoYWN0aW9uS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihhY3Rpb24ocGF5bG9hZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5QWxsKGFjdGlvbktleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJoYW5kbGVyIHdpdGggaWQgXCIgKyBhY3Rpb25LZXkgKyBcIiBub3QgZm91bmQgaW4gc3RvcmUgXCIgKyB0aGlzLmdldElkKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWN0aW9uIHdpdGggaWQgXCIgKyBhY3Rpb25LZXkgKyBcIiBub3QgZm91bmQgaW4gc3RvcmUgXCIgKyB0aGlzLmdldElkKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbm90aWZ5QWxsKGFjdGlvbk5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoYWN0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRTdGF0ZSgpOiBvYmplY3Qge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3Vic2NyaWJlKGxpc3RlbmVyOiAoYWN0aW9uTmFtZTogc3RyaW5nKSA9PiB2b2lkKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdW5TdWJzY3JpYmUobGlzdGVuZXJJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lcklkLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvblNldCB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFjdGlvbnM6IE1hcDxzdHJpbmcsIChwYXlsb2FkOiBvYmplY3QpID0+IG9iamVjdD47XHJcbiAgICAgICAgcHJvdGVjdGVkIGlkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkQWN0aW9uKGtleTogc3RyaW5nLCBhY3Rpb246IChwYXlsb2FkOiBvYmplY3QpID0+IG9iamVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuc2V0KGtleSwgYWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRBY3Rpb24oa2V5OiBzdHJpbmcpOiAocGF5bG9hZDogb2JqZWN0KSA9PiBvYmplY3Qge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmdldChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNpbXVsYXRpb25TdG9yZSwgU2ltdWxhdGlvbkFjdGlvbnMsIFRyZXZvRmx1eCB9IGZyb20gXCIuL2ZyYW1ld29yay9mbHV4SW1wbGVtZW50YXRpb25cIjtcclxuXHJcbihmdW5jdGlvbiBteVRlc3QoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInRlc3Qgc3RhcnRlZFwiKTtcclxuXHJcbiAgICBsZXQgZmx1eCA9IFRyZXZvRmx1eC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIHZhciBpZCA9IFwiU0lNVUxBVElPTlwiO1xyXG4gICAgdmFyIHNpbVN0b3JlID0gZmx1eC5nZXRTdG9yZShpZCk7XHJcbiAgICBzaW1TdG9yZS5zdWJzY3JpYmUoZnVuY3Rpb24gKGFjdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiArIFwiIGhhcHBlbmVkIGF0IHN0b3JlIFwiICsgaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IHN0YXRlOiBcIiArIHNpbVN0b3JlLmdldFN0YXRlKCkpO1xyXG4gICAgfSk7XHJcbiAgICBmbHV4LnJ1bihpZCwgXCJTVEFSVF9TSU1VTEFUSU9OXCIsIHsgUGxheWVySWQ6IDEgfSk7XHJcbiAgICBmbHV4LnJ1bihpZCwgXCJTVEFSVF9TSU1VTEFUSU9OXCIsIHsgUGxheWVySWQ6IDIgfSk7XHJcbiAgICBmbHV4LnJ1bihpZCwgXCJTVEFSVF9TSU1VTEFUSU9OXCIsIHsgUGxheWVySWQ6IDMgfSk7XHJcblxyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZsdXgucnVuKGlkLCBcIlNUQVJUX1NJTVVMQVRJT05cIiwgeyBQbGF5ZXJJZDogNCB9KTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbHV4LnJ1bihpZCwgXCJTVEFSVF9TSU1VTEFUSU9OXCIsIHsgUGxheWVySWQ6IDUgfSk7XHJcbiAgICB9LCA1MDApO1xyXG59KSgpOyJdLCJzb3VyY2VSb290IjoiIn0=