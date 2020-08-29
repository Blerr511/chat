import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";

const composeEnhancers =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
const middleware = [];

middleware.push(thunk);

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
