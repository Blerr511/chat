import {connect} from 'react-redux';
import {ThemeProvider} from '@material-ui/core';
import React, {useEffect, createContext, useState} from 'react';

import themes from './themes';
import Router from './Routes/Router';
import {_login} from './actions/auth.action';

import './App.css';
import authSelector from './selectors/auth.selector';

export const ThemeController = createContext();

const App = ({login, loggedIn}) => {
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

const mapStateToProps = state => ({loggedIn: authSelector.loggedIn(state)});
const mapDispatchToProps = {login: _login};
export default connect(mapStateToProps, mapDispatchToProps)(App);
