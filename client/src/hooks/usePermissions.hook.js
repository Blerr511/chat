import {useSelector} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';
import authSelector from '../selectors/auth.selector';
import serverSelector from '../selectors/server.selector';

const usePermissions = () => {
	const match = useRouteMatch();
	const myRoles = useSelector(state => {
		const userId = authSelector.user(state).get('_id');
		if (!match?.params?.serverId) return null;
		const serverId = match.params.serverId;
		const server = serverSelector.server(serverId)(state);
		if (!server) return null;
		const memberIndex = server
			.get('members')
			.findIndex(v => v.getIn(['user', '_id']) === userId);
		if (memberIndex === -1) return null;
		return server.getIn(['members', memberIndex, 'role']);
	});
	const check = permission => {
		if (!myRoles) return false;
		if (myRoles.get('name') === 'admin') return true;
		return myRoles.get('permissions').includes(permission);
	};
	return check;
};

export default usePermissions;
