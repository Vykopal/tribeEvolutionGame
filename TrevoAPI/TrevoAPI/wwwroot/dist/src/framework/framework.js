export var FluxFramework;
(function (FluxFramework) {
    class FluxApp {
        constructor() {
            this.setup();
        }
        static getInstance() {
            if (!FluxApp.instance) {
                FluxApp.instance = new FluxApp();
                FluxApp.instance.stores = new Map();
                FluxApp.instance.actionSets = new Map();
            }
            return FluxApp.instance;
        }
        setup() {
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
//# sourceMappingURL=framework.js.map