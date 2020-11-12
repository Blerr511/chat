import {connect} from 'react-redux';
import {ThemeProvider} from '@material-ui/core';
import React, {useEffect, createContext, useState} from 'react';

import themes from './themes';
import Router from './Routes/Router';
import {_login} from './actions/auth.action';

import './App.css';

export const ThemeController = createContext();

const App = ({login}) => {
	const [theme, setTheme] = useState('dark');

	useEffect(() => {
		login();
	}, [login]);
	return (
		<ThemeController.Provider value={[theme, setTheme]}>
			<ThemeProvider theme={themes[theme]}>
				<Router />
			</ThemeProvider>
		</ThemeController.Provider>
	);
};

export default connect(null, {login: _login})(App);
