import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import immutableTransform from 'redux-persist-transform-immutable';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSocketIoMiddleware from './socketIo.middleware';
import reducer from '../reducers';

/**
 * @type {import('redux-persist').PersistConfig}
 */
const persistConfig = {
	key: 'root',
	whitelist: ['auth', 'server'],
	storage,
	transforms: [immutableTransform()]
};

const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose
		: compose;
const middleware = [];

middleware.push(thunk);
middleware.push(createSocketIoMiddleware());

const store = createStore(
	persistedReducer,
	composeEnhancers(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);

export default store;
