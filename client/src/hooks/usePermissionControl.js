import ServerController from '../components/ServerSideBar/ServerController';
import {RoleController} from '../helpers/utils/roles/RoleController';

const usePermissionControl = () => {
	const role = ServerController.useMyRole();
	const RC = new RoleController(role.toJS());
	const WithPermission = ({permission, children, fallback = null}) =>
		RC.can(permission) ? children : fallback;
	return WithPermission;
};

export default usePermissionControl;
