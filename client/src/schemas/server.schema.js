const {default: roleSchema} = require('./role.schema');
const {default: roomSchema} = require('./room.schema');
const {default: userSchema} = require('./user.schema');

const required = true;

const serverSchema = {
	title: 'serverSchema',
	type: 'object',
	properties: {
		_id: {
			type: 'string',
			required
		},
		icon: {type: 'string', required},
		members: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					user: userSchema,
					role: roleSchema
				}
			}
		},
		rooms: {
			type: 'array',
			items: roomSchema
		}
	}
};

export default serverSchema;
