import {RoleController} from '../helpers/utils/roles/RoleController';

const usePermissionControl = (role) => {
	const RC = new RoleController(role);
	const WithPermission = ({permission, children, fallback = null}) =>
		RC.can(permission) ? children : fallback;
	return WithPermission;
};

export default usePermissionControl;
