import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles, Paper} from '@material-ui/core';
import {connect} from 'react-redux';

import SideBar from '../components/SideBar/SideBar';
import {_getMyRooms} from '../actions/room.action';
import ServerList from '../components/SideBar/ServerList';
import {_getRoles} from '../actions/permissions.action';
import MessageBar from '../containers/UserScreen/MessageBar';
import ServerSideBar from '../components/ServerSideBar/ServerSideBar';
import DialogCreateServer from '../components/Dialog/DialogCreateServer';
import {searchUsers, searchUsersFakeLoading} from '../actions/user.action';
import {
	sendSocketAction,
	SOCKET_ACTION_TYPES
} from '../helpers/socketIo.middleware';
import {
	getServers,
	createServer,
	clearServerMessages,
	createNewServerRoom,
	serverSetActiveChannel
} from '../actions/server.action';
import {Route, Switch} from 'react-router-dom';

const styles = makeStyles(theme => ({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.palette.background.tertiary
	},
	paper: {
		flex: 1,
		display: 'flex',
		height: '100vh',
		borderRadius: 0,
		overflow: 'hidden'
	}
}));

/**
 * Logged in user screen
 * @param {Object} props
 * @param {Array.<User>} props.users
 * @param {getMyRooms} props.getMyRooms
 * @param {Map.<RoomsKeys,*>} props.rooms
 * @param {import("@material-ui/core").StyledComponentProps.<ClassKey>} props.classes
 */
const UserScreen = ({
	user,
	rooms,
	users,
	server,
	getRoles,
	getMyRooms,
	getServers,
	searchUsers,
	createServer,
	sendSocketAction,
	clearServerMessages,
	createNewServerRoom,
	searchUsersFakeLoading,
	serverSetActiveChannel
}) => {
	const classes = styles();
	const [activeServer, setActiveServer] = useState(null);
	const error3 = server.get('error');
	const myRooms = rooms.get('rooms');
	const servers = server.get('list');
	const loading1 = rooms.get('loading');
	const loading2 = users.get('loading');
	const loading3 = server.get('loading');
	const message3 = server.get('message');
	const activeRoom = rooms.get('currentActive');
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getRoles();
		getMyRooms();
		getServers();
	}, [getMyRooms, getServers, getRoles]);

	const handleCreateClick = () => {
		setOpen(true);
	};
	const handleOnClose = () => {
		setOpen(false);
		clearServerMessages();
	};
	const handleSubmit = credentials => {
		createServer(credentials.name, credentials.file);
	};
	const handleSendMessage = useCallback(
		({roomId, message}) => {
			const serverId = servers.getIn([activeServer, '_id']);
			sendSocketAction({
				type: SOCKET_ACTION_TYPES.SEND_MESSAGE,
				payload: {
					serverId,
					roomId,
					data: message
				}
			});
		},
		[sendSocketAction, servers, activeServer]
	);
	return (
		<section className={classes.container}>
			<DialogCreateServer
				open={open}
				error={error3}
				message={message3}
				loading={loading3}
				handleSubmit={handleSubmit}
				handleOnClose={handleOnClose}
				onMessageClose={clearServerMessages}
			/>
			<ServerList
				servers={servers}
				active={activeServer}
				setActive={setActiveServer}
				handleCreateClick={handleCreateClick}
			/>
			<Paper className={classes.paper}>
				<div>
					<Switch>
						<Route
							path="/channels/@me"
							render={() => (
								<SideBar
									users={users}
									rooms={myRooms}
									getMyRooms={getMyRooms}
									activeRoom={activeRoom}
									searchUsers={searchUsers}
									loading={loading1 || loading2}
									fakeLoading={searchUsersFakeLoading}
								/>
							)}
						/>
						{servers.size && (
							<Route
								path="/channels/:serverId"
								render={({
									match: {
										params: {serverId}
									}
								}) => {
									return (
										<ServerSideBar
											myUser={user}
											server={servers.get(
												servers.findIndex(
													v =>
														v.get('_id') ===
														serverId
												)
											)}
											error={servers.get('error')}
											message={servers.get('message')}
											loading={servers.get('loading')}
											createNewRoom={createNewServerRoom}
											clearServerMessages={
												clearServerMessages
											}
											setSelectedTextChannel={
												serverSetActiveChannel
											}
										/>
									);
								}}
							/>
						)}
					</Switch>
				</div>
				<div style={{flex: 4}}>
					{typeof activeServer === 'number' && (
						<MessageBar
							handleSend={handleSendMessage}
							room={servers.getIn([
								activeServer,
								'rooms',
								servers.getIn([activeServer, 'activeRoom'])
							])}
						/>
					)}
				</div>
			</Paper>
		</section>
	);
};

const mapStateToProps = state => ({
	rooms: state.rooms,
	users: state.users,
	server: state.server,
	user: state.auth.get('user')
});

const mapDispatchToProps = {
	getServers,
	searchUsers,
	createServer,
	sendSocketAction,
	clearServerMessages,
	getRoles: _getRoles,
	createNewServerRoom,
	searchUsersFakeLoading,
	serverSetActiveChannel,
	getMyRooms: _getMyRooms
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
