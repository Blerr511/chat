import React from 'react';
import {useSelector} from 'react-redux';

const usePermissions = role => {
	const roles = useSelector(state => state.permissions);
	const [, myRole] = roles.get('data').findEntry(v => v.get('name') === role);
	const check = permission => {
		if (!myRole) return false;
		if (myRole.get('name') === 'admin') return true;
		return myRole.get('permissions').includes(permission);
	};
	return check;
};

export default usePermissions;
