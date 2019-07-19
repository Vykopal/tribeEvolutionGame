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

/***/ "./src/flux/flux.ts":
/*!**************************!*\
  !*** ./src/flux/flux.ts ***!
  \**************************/
/*! exports provided: SimulationStore, SimulationActions, TrevoFlux, STORES, ACTIONS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationStore", function() { return SimulationStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulationActions", function() { return SimulationActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrevoFlux", function() { return TrevoFlux; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STORES", function() { return STORES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIONS", function() { return ACTIONS; });
/* harmony import */ var _framework_framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/framework */ "./src/framework/framework.ts");

class SimulationStore extends _framework_framework__WEBPACK_IMPORTED_MODULE_0__["FluxFramework"].Store {
    constructor(defaultState, actions) {
        super(actions.getId(), defaultState, actions);
        this.startSimulationHandler = (actionResult) => {
            //update state accordingly
            this.state = actionResult;
        };
        this.addHandler(ACTIONS.START_SIMULATION, this.startSimulationHandler);
    }
}
class SimulationActions extends _framework_framework__WEBPACK_IMPORTED_MODULE_0__["FluxFramework"].ActionSet {
    constructor(id) {
        super(id);
        this.startSimulationAction = (payload) => {
            fetch("api/simulation", {
                method: 'post',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                return {
                    simulationResult: response
                };
            }).catch(error => {
                throw new Error("Failed to fetch simulation result.");
            });
        };
        this.addAction(ACTIONS.START_SIMULATION, this.startSimulationAction);
    }
}
class TrevoFlux extends _framework_framework__WEBPACK_IMPORTED_MODULE_0__["FluxFramework"].FluxApp {
    constructor() {
        super();
        const initialSimulationState = {};
        const simId = STORES.SIMULATION;
        this.addActionSet(new SimulationActions(simId));
        this.addStore(new SimulationStore(initialSimulationState, this.getActionSet(simId)));
    }
}
TrevoFlux.getInstance = () => {
    if (!TrevoFlux.instance) {
        TrevoFlux.instance = new TrevoFlux();
    }
    return TrevoFlux.instance;
};
var STORES;
(function (STORES) {
    STORES.SIMULATION = "SIMULATION";
})(STORES || (STORES = {}));
var ACTIONS;
(function (ACTIONS) {
    ACTIONS.START_SIMULATION = "START_SIMULATION";
})(ACTIONS || (ACTIONS = {}));


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
            this.addStore = (store) => {
                this.stores.set(store.getId(), store);
            };
            this.getStore = (key) => {
                return this.stores.get(key);
            };
            this.addActionSet = (actionSet) => {
                this.actionSets.set(actionSet.getId(), actionSet);
            };
            this.getActionSet = (key) => {
                return this.actionSets.get(key);
            };
            this.run = (storeId, actionId, payload) => {
                let store = this.stores.get(storeId);
                if (store) {
                    store.do(actionId, payload);
                }
            };
            this.stores = new Map();
            this.actionSets = new Map();
        }
    }
    FluxFramework.FluxApp = FluxApp;
    class Store {
        constructor(id, defaultState, actions) {
            this.getId = () => {
                return this.id;
            };
            this.addHandler = (actionKey, handler) => {
                this.handlersSet.set(actionKey, handler);
            };
            this.do = (actionKey, payload) => {
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
            };
            this.notifyAll = (actionName) => {
                for (let listener of this.listeners) {
                    listener(actionName);
                }
            };
            this.getState = () => {
                return JSON.parse(JSON.stringify(this.state));
            };
            this.subscribe = (listener) => {
                this.listeners.push(listener);
                return this.listeners.length;
            };
            this.unSubscribe = (listenerId) => {
                this.listeners.splice(listenerId, 1);
            };
            this.id = id;
            this.state = defaultState;
            this.actionSet = actions;
            this.listeners = [];
            this.handlersSet = new Map();
        }
    }
    FluxFramework.Store = Store;
    class ActionSet {
        constructor(id) {
            this.getId = () => {
                return this.id;
            };
            this.addAction = (key, action) => {
                this.actions.set(key, action);
            };
            this.getAction = (key) => {
                return this.actions.get(key);
            };
            this.id = id;
            this.actions = new Map();
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
/* harmony import */ var _flux_flux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flux/flux */ "./src/flux/flux.ts");

(function myTest() {
    let flux = _flux_flux__WEBPACK_IMPORTED_MODULE_0__["TrevoFlux"].getInstance();
    var id = _flux_flux__WEBPACK_IMPORTED_MODULE_0__["STORES"].SIMULATION;
    var simStore = flux.getStore(id);
    simStore.subscribe(function (action) {
        console.log(action + " happened at store " + id);
        console.log("New state:", JSON.stringify(simStore.getState()));
    });
    flux.run(id, _flux_flux__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].START_SIMULATION, { PlayerId: 1 });
    flux.run(id, _flux_flux__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].START_SIMULATION, { PlayerId: 2 });
    flux.run(id, _flux_flux__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].START_SIMULATION, { PlayerId: 3 });
    window.setTimeout(function () {
        flux.run(id, _flux_flux__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].START_SIMULATION, { PlayerId: 4 });
    }, 1000);
    window.setTimeout(function () {
        flux.run(id, _flux_flux__WEBPACK_IMPORTED_MODULE_0__["ACTIONS"].START_SIMULATION, { PlayerId: 5 });
    }, 500);
})();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsdXgvZmx1eC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZnJhbWV3b3JrL2ZyYW1ld29yay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUF1RDtBQUVoRCxNQUFNLGVBQWdCLFNBQVEsa0VBQWEsQ0FBQyxLQUFLO0lBQ3BELFlBQVksWUFBb0IsRUFBRSxPQUFnQztRQUM5RCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUtsRCwyQkFBc0IsR0FBRyxDQUFDLFlBQW9CLEVBQUUsRUFBRTtZQUM5QywwQkFBMEI7WUFD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LEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsa0RBQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLGtEQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4RCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxrREFBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFeEQsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLGtEQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFVCxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsa0RBQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBGbHV4RnJhbWV3b3JrIH0gZnJvbSBcIi4uL2ZyYW1ld29yay9mcmFtZXdvcmtcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaW11bGF0aW9uU3RvcmUgZXh0ZW5kcyBGbHV4RnJhbWV3b3JrLlN0b3JlIHtcclxuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRTdGF0ZTogb2JqZWN0LCBhY3Rpb25zOiBGbHV4RnJhbWV3b3JrLkFjdGlvblNldCkge1xyXG4gICAgICAgIHN1cGVyKGFjdGlvbnMuZ2V0SWQoKSwgZGVmYXVsdFN0YXRlLCBhY3Rpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRIYW5kbGVyKEFDVElPTlMuU1RBUlRfU0lNVUxBVElPTiwgdGhpcy5zdGFydFNpbXVsYXRpb25IYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNpbXVsYXRpb25IYW5kbGVyID0gKGFjdGlvblJlc3VsdDogb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgLy91cGRhdGUgc3RhdGUgYWNjb3JkaW5nbHlcclxuICAgICAgICB0aGlzLnN0YXRlID0gYWN0aW9uUmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNpbXVsYXRpb25BY3Rpb25zIGV4dGVuZHMgRmx1eEZyYW1ld29yay5BY3Rpb25TZXQge1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGlkKTtcclxuICAgICAgICB0aGlzLmFkZEFjdGlvbihBQ1RJT05TLlNUQVJUX1NJTVVMQVRJT04sIHRoaXMuc3RhcnRTaW11bGF0aW9uQWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNpbXVsYXRpb25BY3Rpb24gPSAocGF5bG9hZDogb2JqZWN0KSAgPT4ge1xyXG4gICAgICAgIGZldGNoKFwiYXBpL3NpbXVsYXRpb25cIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBzaW11bGF0aW9uUmVzdWx0OiByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHNpbXVsYXRpb24gcmVzdWx0LlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUcmV2b0ZsdXggZXh0ZW5kcyBGbHV4RnJhbWV3b3JrLkZsdXhBcHAge1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgY29uc3QgaW5pdGlhbFNpbXVsYXRpb25TdGF0ZSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IHNpbUlkID0gU1RPUkVTLlNJTVVMQVRJT047XHJcbiAgICAgICAgdGhpcy5hZGRBY3Rpb25TZXQobmV3IFNpbXVsYXRpb25BY3Rpb25zKHNpbUlkKSk7XHJcbiAgICAgICAgdGhpcy5hZGRTdG9yZShuZXcgU2ltdWxhdGlvblN0b3JlKGluaXRpYWxTaW11bGF0aW9uU3RhdGUsIHRoaXMuZ2V0QWN0aW9uU2V0KHNpbUlkKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIVRyZXZvRmx1eC5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBUcmV2b0ZsdXguaW5zdGFuY2UgPSBuZXcgVHJldm9GbHV4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBUcmV2b0ZsdXguaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFNUT1JFUyB7XHJcbiAgICBleHBvcnQgY29uc3QgU0lNVUxBVElPTjogc3RyaW5nID0gXCJTSU1VTEFUSU9OXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgQUNUSU9OUyB7XHJcbiAgICBleHBvcnQgY29uc3QgU1RBUlRfU0lNVUxBVElPTjogc3RyaW5nID0gXCJTVEFSVF9TSU1VTEFUSU9OXCI7XHJcbn1cclxuIiwiZXhwb3J0IG5hbWVzcGFjZSBGbHV4RnJhbWV3b3JrIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRmx1eEFwcCB7XHJcbiAgICAgICAgcHJvdGVjdGVkIHN0b3JlczogTWFwPHN0cmluZywgU3RvcmU+O1xyXG4gICAgICAgIHByb3RlY3RlZCBhY3Rpb25TZXRzOiBNYXA8c3RyaW5nLCBBY3Rpb25TZXQ+O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc3RhdGljIGluc3RhbmNlOiBGbHV4QXBwO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVzID0gbmV3IE1hcDxzdHJpbmcsIFN0b3JlPigpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNldHMgPSBuZXcgTWFwPHN0cmluZywgQWN0aW9uU2V0PigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZFN0b3JlID0gKHN0b3JlOiBTdG9yZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3Jlcy5zZXQoc3RvcmUuZ2V0SWQoKSwgc3RvcmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFN0b3JlID0gKGtleTogc3RyaW5nKTogU3RvcmUgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yZXMuZ2V0KGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkQWN0aW9uU2V0ID0gKGFjdGlvblNldDogQWN0aW9uU2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2V0cy5zZXQoYWN0aW9uU2V0LmdldElkKCksIGFjdGlvblNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0QWN0aW9uU2V0ID0gKGtleTogc3RyaW5nKTogQWN0aW9uU2V0ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uU2V0cy5nZXQoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBydW4gPSAoc3RvcmVJZDogc3RyaW5nLCBhY3Rpb25JZDogc3RyaW5nLCBwYXlsb2FkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHN0b3JlID0gdGhpcy5zdG9yZXMuZ2V0KHN0b3JlSWQpO1xyXG4gICAgICAgICAgICBpZiAoc3RvcmUpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JlLmRvKGFjdGlvbklkLCBwYXlsb2FkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RvcmUge1xyXG4gICAgICAgIHByb3RlY3RlZCBpZDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBzdGF0ZTogYW55O1xyXG4gICAgICAgIHByb3RlY3RlZCBhY3Rpb25TZXQ6IEFjdGlvblNldDtcclxuICAgICAgICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiAoKGFjdGlvbk5hbWU6IHN0cmluZykgPT4gdm9pZClbXTtcclxuICAgICAgICBwcm90ZWN0ZWQgaGFuZGxlcnNTZXQ6IE1hcDxzdHJpbmcsIChhY3Rpb25SZXN1bHQ6IGFueSkgPT4gdm9pZD47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGRlZmF1bHRTdGF0ZTogYW55LCBhY3Rpb25zOiBBY3Rpb25TZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gZGVmYXVsdFN0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNldCA9IGFjdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNTZXQgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0SWQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkSGFuZGxlciA9IChhY3Rpb25LZXk6IHN0cmluZywgaGFuZGxlcjogKGFjdGlvblJlc3VsdDogYW55KSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNTZXQuc2V0KGFjdGlvbktleSwgaGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG8gPSAoYWN0aW9uS2V5OiBzdHJpbmcsIHBheWxvYWQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gdGhpcy5hY3Rpb25TZXQuZ2V0QWN0aW9uKGFjdGlvbktleSk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyc1NldC5nZXQoYWN0aW9uS2V5KTtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihhY3Rpb24ocGF5bG9hZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5QWxsKGFjdGlvbktleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJoYW5kbGVyIHdpdGggaWQgXCIgKyBhY3Rpb25LZXkgKyBcIiBub3QgZm91bmQgaW4gc3RvcmUgXCIgKyB0aGlzLmdldElkKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYWN0aW9uIHdpdGggaWQgXCIgKyBhY3Rpb25LZXkgKyBcIiBub3QgZm91bmQgaW4gc3RvcmUgXCIgKyB0aGlzLmdldElkKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgbm90aWZ5QWxsID0gKGFjdGlvbk5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoYWN0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRTdGF0ZSA9ICgpOiBvYmplY3QgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnN0YXRlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3Vic2NyaWJlID0gKGxpc3RlbmVyOiAoYWN0aW9uTmFtZTogc3RyaW5nKSA9PiB2b2lkKTogbnVtYmVyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdW5TdWJzY3JpYmUgPSAobGlzdGVuZXJJZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lcklkLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvblNldCB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGFjdGlvbnM6IE1hcDxzdHJpbmcsIChwYXlsb2FkOiBvYmplY3QpID0+IHZvaWQ+O1xyXG4gICAgICAgIHByb3RlY3RlZCBpZDogc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldElkID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZEFjdGlvbiA9IChrZXk6IHN0cmluZywgYWN0aW9uOiAocGF5bG9hZDogb2JqZWN0KSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5zZXQoa2V5LCBhY3Rpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldEFjdGlvbiA9IChrZXk6IHN0cmluZyk6IChwYXlsb2FkOiBvYmplY3QpID0+IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmdldChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFRyZXZvRmx1eCwgU1RPUkVTLCBBQ1RJT05TIH0gZnJvbSBcIi4vZmx1eC9mbHV4XCI7XHJcblxyXG4oZnVuY3Rpb24gbXlUZXN0KCkge1xyXG4gICAgbGV0IGZsdXggPSBUcmV2b0ZsdXguZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICB2YXIgaWQgPSBTVE9SRVMuU0lNVUxBVElPTjtcclxuICAgIHZhciBzaW1TdG9yZSA9IGZsdXguZ2V0U3RvcmUoaWQpO1xyXG4gICAgc2ltU3RvcmUuc3Vic2NyaWJlKGZ1bmN0aW9uIChhY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGFjdGlvbiArIFwiIGhhcHBlbmVkIGF0IHN0b3JlIFwiICsgaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTmV3IHN0YXRlOlwiLCBKU09OLnN0cmluZ2lmeShzaW1TdG9yZS5nZXRTdGF0ZSgpKSk7XHJcbiAgICB9KTtcclxuICAgIGZsdXgucnVuKGlkLCBBQ1RJT05TLlNUQVJUX1NJTVVMQVRJT04sIHsgUGxheWVySWQ6IDEgfSk7XHJcbiAgICBmbHV4LnJ1bihpZCwgQUNUSU9OUy5TVEFSVF9TSU1VTEFUSU9OLCB7IFBsYXllcklkOiAyIH0pO1xyXG4gICAgZmx1eC5ydW4oaWQsIEFDVElPTlMuU1RBUlRfU0lNVUxBVElPTiwgeyBQbGF5ZXJJZDogMyB9KTtcclxuXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZmx1eC5ydW4oaWQsIEFDVElPTlMuU1RBUlRfU0lNVUxBVElPTiwgeyBQbGF5ZXJJZDogNCB9KTtcclxuICAgIH0sIDEwMDApO1xyXG5cclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmbHV4LnJ1bihpZCwgQUNUSU9OUy5TVEFSVF9TSU1VTEFUSU9OLCB7IFBsYXllcklkOiA1IH0pO1xyXG4gICAgfSwgNTAwKTtcclxufSkoKTsiXSwic291cmNlUm9vdCI6IiJ9