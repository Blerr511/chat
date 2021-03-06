import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store, {persistor} from './helpers/store';
import {PersistGate} from 'redux-persist/integration/react';
if (module.hot && process.env.NODE_ENV !== 'production') {
	module.hot.accept();
}

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

// if (process.env.NODE_ENV === 'development') {
// 	///DevTools
// 	const script = document.createElement('script');
// 	script.setAttribute('src', 'http://localhost:8097');
// 	document.head.appendChild(script);
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
