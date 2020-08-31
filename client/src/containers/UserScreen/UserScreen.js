import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core";
import SideBar from "../../components/SideBar/SideBar";
import { _getMyRooms } from "../../actions/room.action";
import { connect } from "react-redux";
import { searchUsers, searchUsersFakeLoading } from "../../actions/user.action";
import MessageBar from "./MessageBar";

/**
 * Logged in user screen
 * @param {Object} props
 * @param {import("@material-ui/core").StyledComponentProps.<ClassKey>} props.classes
 * @param {getMyRooms} props.getMyRooms
 * @param {Map.<RoomsKeys,*>} props.rooms
 * @param {Array.<User>} props.users
 */
const UserScreen = ({
    classes,
    rooms,
    users,
    getMyRooms,
    searchUsers,
    searchUsersFakeLoading,
}) => {
    useEffect(() => {
        getMyRooms();
    }, [getMyRooms]);
    const loading1 = rooms.get("loading");
    const loading2 = users.get("loading");
    const myRooms = rooms.get("rooms");
    const activeRoom = rooms.get("currentActive");
    return (
        <section className={classes.container}>
            <SideBar
                refreshRooms={getMyRooms}
                loading={loading1 || loading2}
                rooms={myRooms}
                users={users}
                searchUsers={searchUsers}
                fakeLoading={searchUsersFakeLoading}
                activeRoom={activeRoom}
            />
            <MessageBar />
        </section>
    );
};

const styles = (theme) => ({
    container: {
        backgroundColor: "red",
        flex: 1,
        flexDirection: "row",
        // width:"100%",
        display: "flex",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColo: "red",
    },
});

const mapStateToProps = (state) => ({
    rooms: state.rooms,
    users: state.users,
});

const mapDispatchToProps = {
    getMyRooms: _getMyRooms,
    searchUsers,
    searchUsersFakeLoading,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(UserScreen));
