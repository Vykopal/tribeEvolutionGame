export namespace FluxFramework {

    export class FluxApp {
        protected stores: Map<string, Store<BaseState>>;
        protected actionSets: Map<string, ActionSet>;

        protected static instance: FluxApp;

        protected constructor() {
            this.stores = new Map<string, Store<BaseState>>();
            this.actionSets = new Map<string, ActionSet>();
        }

        public addStore = (store: Store<BaseState>) => {
            this.stores.set(store.getId(), store);
        }

        public getStore = (key: string): Store<BaseState> => {
            return this.stores.get(key);
        }

        public addActionSet = (actionSet: ActionSet) => {
            this.actionSets.set(actionSet.getId(), actionSet);
        }

        public getActionSet = (key: string): ActionSet => {
            return this.actionSets.get(key);
        }

        public run = (storeId: string, actionId: string, payload: any) => {
            let store = this.stores.get(storeId);
            if (store) {
                store.do(actionId, payload);
            }
        }
    }

    export class Store<T extends BaseState> {
        protected id: string;
        protected state: T;
        protected actionSet: ActionSet;
        protected listeners: ((actionName: string) => void)[];
        protected handlersSet: Map<string, (actionResult: any) => void>;

        constructor(id: string, defaultState: T, actions: ActionSet) {
            this.id = id;
            this.state = defaultState;
            this.actionSet = actions;
            this.listeners = [];
            this.handlersSet = new Map();
        }

        public getId = (): string => {
            return this.id;
        }

        public addHandler = (actionKey: string, handler: (actionResult: any) => void) => {
            this.handlersSet.set(actionKey, handler);
        }

        public do = (actionKey: string, payload: any) => {
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

        public notifyAll = (actionName: string) => {
            for (let listener of this.listeners) {
                listener(actionName);
            }
        }

        public getState = (): T => {
            return JSON.parse(JSON.stringify(this.state)) as T;
        }

        public subscribe = (listener: (actionName: string) => void): number => {
            this.listeners.push(listener);
            return this.listeners.length;
        }

        public unSubscribe = (listenerId: number) => {
            this.listeners.splice(listenerId, 1);
        }
    }

    export class BaseState {

    }

    export class ActionSet {
        protected actions: Map<string, (payload: object) => void>;
        protected id: string;

        constructor(id: string) {
            this.id = id;
            this.actions = new Map();
        }

        public getId = (): string => {
            return this.id;
        }

        public addAction = (key: string, action: (payload: object) => void) => {
            this.actions.set(key, action);
        }

        public getAction = (key: string): (payload: object) => void => {
            return this.actions.get(key);
        }
    }
}