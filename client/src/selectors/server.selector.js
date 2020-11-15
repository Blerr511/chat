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

export default {server};
