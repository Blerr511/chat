import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Invite from './Invite';
import controller from './controller';
import UserScreen from './UserScreen';
import PublicRoute from '../components/Route/PublicRoute';
import PrivateRoute from '../components/Route/PrivateRoute';
import LoadingScreen from '../components/Loading/LoadingScreen';
import authSelector from '../selectors/auth.selector';
import {useSelector} from 'react-redux';

const GoToMain = () => (
	<Redirect to={{pathname: controller.channels.link({serverId: '@me'})}} />
);
const SignIn = lazy(() => import('./Auth'));
const SignUp = lazy(() => import('./SignUp'));
//FIXME - add loading
const Router = () => {
	const loading = useSelector(authSelector.loading);
	if (loading) return <LoadingScreen />;
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingScreen />}>
				<Switch>
					<Route path={controller.invite.path} component={Invite} />
					<PublicRoute
						path={controller.login.path}
						component={SignIn}
					/>
					<PublicRoute
						path={controller.signup.path}
						component={SignUp}
					/>
					<PrivateRoute
						path={controller.channels.path}
						component={UserScreen}
					/>
					<PrivateRoute component={GoToMain} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
};

export default Router;
