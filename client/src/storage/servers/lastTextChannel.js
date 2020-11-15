import _ from '.';

export default {
	set: (serverId, channelId) =>
		localStorage.setItem(_.lastSelectedTextChannel(serverId), channelId),
	get: serverId => localStorage.getItem(_.lastSelectedTextChannel(serverId))
};
