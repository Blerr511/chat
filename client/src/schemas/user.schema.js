const required = true;

const userSchema = {
	title: 'userSchema',
	type: 'object',
	properties: {
		email: {
			type: 'string'
		},
		firstName: {
			type: 'string'
		},
		lastName: {
			type: 'string'
		},
		online: {
			type: 'boolean'
		},
		username: {
			type: 'string',
			required
		},
		_id: {
			type: 'string',
			required
		}
	},
	required
};

export default userSchema;
