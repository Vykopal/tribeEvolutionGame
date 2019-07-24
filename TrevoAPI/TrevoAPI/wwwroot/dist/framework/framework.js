export var FluxFramework;
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
    class BaseState {
    }
    FluxFramework.BaseState = BaseState;
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
//# sourceMappingURL=framework.js.map