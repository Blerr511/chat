/**
 * @returns {import('immutable').Map | null}
 */
const user = state => state.auth.get('user');

/**
 * @returns {String}
 */
const token = state => state.auth.getIn(['user', 'token']);

/**
 * @returns {boolean}
 */
const loggedIn = state => state.auth.get('loggedIn');

/**
 * @returns {boolean}
 */
const loading = state => state.auth.get('loading');

export default {
	user,
	token,
	loggedIn,
	loading
};
