import React from 'react';
import {useSelector} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import controller from '../../Routes/controller';
/**
 * This route will be visible only for logged in users , otherwise user will be redirected to login or ```redirectTo``` page
 * @param {import('react-router-dom').RouteProps & {redirectTo:string}} props
 */
const PrivateRoute = ({component: Component, redirectTo, ...rest}) => {
	const isLoggedIn = useSelector(state => state.auth.get('loggedIn'));

	return (
		<Route
			{...rest}
			render={props =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: redirectTo || controller.login.link(),
							state: {from: props.location}
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
