import {generatePath} from 'react-router-dom';

export class Path {
	/**
	 * @param {String} path
	 */
	constructor(path) {
		this.path = path;
	}
	link(params) {
		return generatePath(this.path, params);
	}
}

export default {
	main: new Path('/'),
	login: new Path('/login'),
	signup: new Path('/signup'),
	channels: new Path('/channels/:serverId?'),
	invite: new Path('/invite/:token')
};
