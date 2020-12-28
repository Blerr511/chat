/* eslint-disable react/prop-types */
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
	createNewRtcRoom
} from '../actions/server.action';
import {Redirect, Route, Switch} from 'react-router-dom';
import controller from './controller';
import ServerController from '../components/ServerSideBar/ServerController';
import {joinToRtcChannel} from '../actions/sendSocket.action';

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
 * TODO - add Prop validation
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
	joinToRtcChannel,
	sendSocketAction,
	createNewRtcRoom,
	clearServerMessages,
	createNewServerRoom,
	searchUsersFakeLoading
}) => {
	const classes = styles();
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
		({serverId, roomId, message}) => {
			sendSocketAction({
				type: SOCKET_ACTION_TYPES.SEND_MESSAGE,
				payload: {
					serverId,
					roomId,
					data: message
				}
			});
		},
		[sendSocketAction, servers]
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
				handleCreateClick={handleCreateClick}
			/>
			<Paper className={classes.paper}>
				<Switch>
					<Route
						exact
						path={controller.myPage.path}
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
							path={controller.channels.path}
							render={({
								match: {
									params: {serverId, roomId}
								}
							}) => {
								const serverIndex = servers.findIndex(
									v => v.get('_id') === serverId
								);
								if (serverIndex === -1)
									return (
										<Redirect
											to={controller.myPage.link()}
										/>
									);
								const server = servers.get(serverIndex);
								const roomIndex = server
									.get('rooms')
									.findIndex(v => v.get('_id') === roomId);
								if (roomIndex === -1)
									return (
										<Redirect
											to={controller.channels.link({
												serverId: server.get('_id'),
												roomId: server.getIn([
													'rooms',
													0,
													'_id'
												])
											})}
										/>
									);
								const room = server.getIn(['rooms', roomIndex]);
								const [, myMember] = server
									.get('members')
									.findEntry(
										v =>
											v.getIn(['user', '_id']) ===
											user?.get('_id')
									);
								return (
									<ServerController.ServerProvider
										serverId={serverId}>
										<ServerSideBar
											myUser={user}
											server={server}
											error={servers.get('error')}
											message={servers.get('message')}
											loading={servers.get('loading')}
											createNewRoom={createNewServerRoom}
											createNewRtcRoom={createNewRtcRoom}
											clearServerMessages={
												clearServerMessages
											}
											joinToRtcChannel={joinToRtcChannel}
										/>
										<MessageBar
											handleSend={handleSendMessage}
											room={room}
											key={room.get('_id')}
										/>
									</ServerController.ServerProvider>
								);
							}}
						/>
					)}
				</Switch>
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
	createNewRtcRoom,
	searchUsersFakeLoading,
	getMyRooms: _getMyRooms,
	joinToRtcChannel
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
