import React, { useCallback, useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import SideBar from "../components/SideBar/SideBar";
import { _getMyRooms } from "../actions/room.action";
import { connect } from "react-redux";
import { searchUsers, searchUsersFakeLoading } from "../actions/user.action";
import MessageBar from "../containers/UserScreen/MessageBar";
import {
    clearServerMessages,
    createNewServerRoom,
    createServer,
    getServers,
    serverSetActiveChannel,
} from "../actions/server.action";
import ServerList from "../components/SideBar/ServerList";
import DialogCreateServer from "../components/Dialog/DialogCreateServer";
import ServerSideBar from "../components/ServerSideBar/ServerSideBar";
import { _getRoles } from "../actions/permissions.action";
import {
    sendSocketAction,
    SOCKET_ACTION_TYPES,
} from "../helpers/socketIo.middleware";
const styles = makeStyles((theme) => ({
    container: {
        flex: 1,
        flexDirection: "row",
        display: "flex",
        backgroundColor: theme.palette.background.tertiary,
    },
    paper: {
        flex: 1,
        overflow: "hidden",
        display: "flex",
        height: "calc(100vh - 20px)",
    },
}));

/**
 * Logged in user screen
 * @param {Object} props
 * @param {import("@material-ui/core").StyledComponentProps.<ClassKey>} props.classes
 * @param {getMyRooms} props.getMyRooms
 * @param {Map.<RoomsKeys,*>} props.rooms
 * @param {Array.<User>} props.users
 */
const UserScreen = ({
    user,
    rooms,
    users,
    server,
    getMyRooms,
    searchUsers,
    searchUsersFakeLoading,
    getServers,
    createServer,
    clearServerMessages,
    getRoles,
    createNewServerRoom,
    serverSetActiveChannel,
    sendSocketAction,
}) => {
    const classes = styles();
    const [activeServer, setActiveServer] = useState(null);
    const loading1 = rooms.get("loading");
    const loading2 = users.get("loading");
    const loading3 = server.get("loading");
    const error3 = server.get("error");
    const message3 = server.get("message");
    const myRooms = rooms.get("rooms");
    const activeRoom = rooms.get("currentActive");
    const servers = server.get("list");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getMyRooms();
        getServers();
        getRoles();
    }, [getMyRooms, getServers, getRoles]);

    const handleCreateClick = () => {
        setOpen(true);
    };
    const handleOnClose = () => {
        setOpen(false);
        clearServerMessages();
    };
    const handleSubmit = (credentials) => {
        createServer(credentials.name, credentials.file);
    };
    const handleSendMessage = useCallback(
        ({ roomId, message }) => {
            const serverId = servers.getIn([activeServer, "_id"]);
            sendSocketAction({
                type: SOCKET_ACTION_TYPES.SEND_MESSAGE,
                payload: {
                    serverId,
                    roomId,
                    data: message,
                },
            });
        },
        [sendSocketAction, servers, activeServer]
    );
    return (
        <section className={classes.container}>
            <DialogCreateServer
                error={error3}
                message={message3}
                handleOnClose={handleOnClose}
                handleSubmit={handleSubmit}
                loading={loading3}
                onMessageClose={clearServerMessages}
                open={open}
            />
            <ServerList
                active={activeServer}
                setActive={setActiveServer}
                servers={servers}
                handleCreateClick={handleCreateClick}
            />
            <Paper className={classes.paper}>
                <div
                    style={{
                        flex: 1,
                        maxWidth: 768,
                        height: "100%",
                    }}
                >
                    {activeServer === null && (
                        <SideBar
                            getMyRooms={getMyRooms}
                            loading={loading1 || loading2}
                            rooms={myRooms}
                            users={users}
                            searchUsers={searchUsers}
                            fakeLoading={searchUsersFakeLoading}
                            activeRoom={activeRoom}
                        />
                    )}
                    {typeof activeServer === "number" && (
                        <ServerSideBar
                            myUser={user}
                            server={servers.get(activeServer)}
                            error={servers.get("error")}
                            message={servers.get("message")}
                            loading={servers.get("loading")}
                            clearServerMessages={clearServerMessages}
                            createNewRoom={createNewServerRoom}
                            setSelectedTextChannel={serverSetActiveChannel}
                        />
                    )}
                </div>
                <div style={{ flex: 4 }}>
                    {typeof activeServer === "number" && (
                        <MessageBar
                            handleSend={handleSendMessage}
                            room={servers.getIn([
                                activeServer,
                                "rooms",
                                servers.getIn([activeServer, "activeRoom"]),
                            ])}
                        />
                    )}
                </div>
            </Paper>
        </section>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.get("user"),
    rooms: state.rooms,
    users: state.users,
    server: state.server,
});

const mapDispatchToProps = {
    getMyRooms: _getMyRooms,
    searchUsers,
    searchUsersFakeLoading,
    getServers,
    createServer,
    clearServerMessages,
    getRoles: _getRoles,
    createNewServerRoom,
    serverSetActiveChannel,
    sendSocketAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
