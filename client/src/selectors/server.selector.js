/**
 * @callback serverSelector
 * @returns {import('immutable').Map}
 */
/**
 * @returns {serverSelector}
 */
const server = serverId => state =>
	state.server.getIn([
		'list',
		state.server.get('list').findIndex(v => v.get('_id') === serverId)
	]);
const findMember = (userId, server) => {
	if (!server) return null;
	const myMemberIndex = server
		.get('members')
		.findIndex(v => v.getIn(['user', '_id']) === userId);
	if (myMemberIndex === -1) return null;
	return server.getIn(['members', myMemberIndex]);
};
const member = (userId, serverId) => state => {
	const myServer = server(serverId)(state);
	const myMemberIndex = myServer
		.get('members')
		.findIndex(v => v.getIn(['user', '_id']) === userId);
	if (myMemberIndex === -1) return null;
	return myServer.getIn(['members', myMemberIndex]);
};

export default {server, findMember, member};
