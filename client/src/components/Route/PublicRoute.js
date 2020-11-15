import React from 'react';
import {useSelector} from 'react-redux';
import controller from '../../Routes/controller';
import {Redirect, Route} from 'react-router-dom';

/**
 * This route will be visible only for 💥NOT💥 logged in users , otherwise user will be redirected to main or ```redirectTo``` page
 * @param {import('react-router-dom').RouteProps & {redirectTo:string}} props
 */
const PublicRoute = ({component: Component, ...rest}) => {
	const isLoggedIn = useSelector(state => state.auth.get('loggedIn'));

	return (
		<Route
			{...rest}
			render={props =>
				isLoggedIn ? (
					<Redirect
						to={{
							pathname: controller.main.link(),
							state: {from: props.location}
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

export default PublicRoute;
