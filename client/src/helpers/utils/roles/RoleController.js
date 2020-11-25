const SUPER_ADMIN = 'admin';
export class RoleController {
	/**
	 * @param {Object} role
	 * @param {string} role.name
	 * @param {Array.<string>} role.permissions
	 */
	constructor(role) {
		this.roleName = role?.name;
		this.permissions = role?.permissions;
	}
	can(access) {
		if (!this.roleName || !this.permissions) return false;
		return (
			this.roleName === SUPER_ADMIN || this.permissions.includes(access)
		);
	}
}
