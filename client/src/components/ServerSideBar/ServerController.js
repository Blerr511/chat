import React, {useContext} from 'react';
import {createContext} from 'react';
import {useSelector} from 'react-redux';
import authSelector from '../../selectors/auth.selector';
import serverSelector from '../../selectors/server.selector';

export const ServerContext = createContext(null);

export const ServerProvider = ({serverId, children}) => {
	return (
		<ServerContext.Provider value={{serverId}}>
			{children}
		</ServerContext.Provider>
	);
};

export const useMemberSelector = (userId, selector) => {
	const ctx = useContext(ServerContext);
	if (!ctx) throw new Error('useMember used outside of ServerProvider');
	const serverId = ctx.serverId;
	const member = useSelector(state => {
		const member = serverSelector.member(userId, serverId)(state);
		if (!member) return null;
		return selector ? selector(member) : member;
	});

	return member;
};

export const useMyMemberSelector = selector => {
	const ctx = useContext(ServerContext);
	if (!ctx) throw new Error('useMyMember use outside of ServerProvider');
	const serverId = ctx.serverId;
	const myUserId = useSelector(state => authSelector.user(state)?.get('_id'));
	if (!myUserId) throw new Error('useMyMember used when use not loggedIn');
	const myMember = useSelector(state => {
		const server = serverSelector.member(myUserId, serverId)(state);
		if (!server) return null;
		return selector ? selector(server) : server;
	});

	return myMember;
};

export const useMyRole = () => {
	const ctx = useContext(ServerContext);
	if (!ctx) throw new Error('useMyRole use outside of ServerProvider');
	const serverId = ctx.serverId;
	const myUserId = useSelector(state => authSelector.user(state).get('_id'));
	if (!myUserId) throw new Error('useMyRole used when use not loggedIn');
	const myMember = useSelector(state =>
		serverSelector.member(myUserId, serverId)(state).get('role')
	);

	return myMember;
};

export const useServerSelector = selector => {
	const ctx = useContext(ServerContext);
	if (!ctx)
		throw new Error('useServerSelector used outside of ServerProvider');
	const serverId = ctx.serverId;
	const server = useSelector(state => {
		const server = serverSelector.server(serverId)(state);
		if (!server) return null;
		return selector ? selector(server) : server;
	});
	return server;
};

export default {
	ServerProvider,
	useMemberSelector,
	useMyMemberSelector,
	useMyRole,
	useServerSelector
};
