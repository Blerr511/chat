import React from 'react';

import usePermissions from '../../hooks/usePermissions.hook';

export default (permission, Component, Fallback = null) => {
	const checkPermissions = usePermissions(permission);
	if (checkPermissions()) return <Component />;
	else return <Fallback />;
};
