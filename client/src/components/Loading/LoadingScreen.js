import {CircularProgress, Container} from '@material-ui/core';
import React from 'react';

const LoadingScreen = () => {
	return (
		<Container
			component="main"
			style={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
			<CircularProgress />
		</Container>
	);
};

export default LoadingScreen;
