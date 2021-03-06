const {default: messageSchema} = require('./message.schema');

const required = true;
const roomSchema = {
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
		messages: {
			type: 'array',
			items: messageSchema
		}
	}
};
export default roomSchema;
