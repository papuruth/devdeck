import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { thunk as thunkMiddleware } from "redux-thunk";
import rootReducer from "./rootReducer";
import sagas from "./rootSagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunkMiddleware];

// Redux DevTools — guard against SSR (no window on server)
const composeEnhancers =
    (process.env.NODE_ENV === "development" &&
        typeof window !== "undefined" &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
