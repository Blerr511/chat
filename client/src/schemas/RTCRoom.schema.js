const {default: userSchema} = require('./user.schema');

const required = true;
const RTCRoomSchema = {
	title: 'roomSchema',
	type: 'object',
	properties: {
		_id: {
			type: 'string',
			required
		},
		name: {
			type: 'string',
			required
		},
		createdAt: {
			type: 'string'
		},
		members: {
			type: 'array',
			items: {
				type: userSchema
			}
		}
	}
};
export default RTCRoomSchema;
