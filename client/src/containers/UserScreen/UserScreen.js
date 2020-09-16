import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import SideBar from "../../components/SideBar/SideBar";
import { _getMyRooms } from "../../actions/room.action";
import { connect } from "react-redux";
import { searchUsers, searchUsersFakeLoading } from "../../actions/user.action";
import MessageBar from "./MessageBar";
import {
    clearServerMessages,
    createServer,
    getServers,
} from "../../actions/server.action";
import ServerList from "../../components/SideBar/ServerList";
import DialogCreateServer from "../../components/Dialog/DialogCreateServer";
import ServerSideBar from "../../components/ServerSideBar/ServerSideBar";
const styles = makeStyles((theme) => ({
    container: {
        flex: 1,
        flexDirection: "row",
        display: "flex",
        backgroundColor: theme.palette.background.dark,
    },
    paper: {
        flex: 1,
        overflow: "hidden",
        display: "flex",
        height: "calc(100vh - 20px)",
        margin: "20px 20px 0 20px",
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
    rooms,
    users,
    server,
    getMyRooms,
    searchUsers,
    searchUsersFakeLoading,
    getServers,
    createServer,
    clearServerMessages,
}) => {
    const loading1 = rooms.get("loading");
    const loading2 = users.get("loading");
    const loading3 = server.get("loading");
    const error3 = server.get("error");
    const message3 = server.get("message");
    const myRooms = rooms.get("rooms");
    const activeRoom = rooms.get("currentActive");
    const servers = server.get("list");
    const classes = styles();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        getMyRooms();
        getServers();
    }, [getMyRooms, getServers]);

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
    const [activeServer, setActiveServer] = useState(null);
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
                            name={servers.getIn([activeServer, "name"])}
                            rooms={servers.getIn([activeServer, "rooms"])}
                        />
                    )}
                </div>
                <MessageBar />
            </Paper>
        </section>
    );
};

const mapStateToProps = (state) => ({
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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
