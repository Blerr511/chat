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
	myPage: new Path('/channels/@me'),
	channels: new Path('/channels/:serverId/:roomId?'),
	invite: new Path('/invite/:token')
};
