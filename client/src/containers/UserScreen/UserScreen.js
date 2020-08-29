import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import SideBar from "../../components/SideBar/SideBar";
import { _getMyRooms } from "../../actions/room.action";
import { connect } from "react-redux";
import { Map } from "immutable";

/**
 * Logged in user screen
 * @param {Object} props
 * @param {import("@material-ui/core").StyledComponentProps.<ClassKey>} props.classes
 * @param {getMyRooms} props.getMyRooms
 * @param {Map.<RoomsKeys,*>} props.rooms
 */
const UserScreen = ({ classes, rooms, getMyRooms }) => {
    const [l,setL] = useState(true)
    useEffect(() => {
        setTimeout(()=>{
            setL(false)
        },3000)
        getMyRooms();
    }, [getMyRooms]);
    const loading = rooms.get("loading");
    const myRooms = rooms.get("rooms");
    return (
        <section className={classes.container}>
            <SideBar
                loading={l}
                rooms={myRooms}
            />
        </section>
    );
};

const styles = (theme) => ({
    container: {
        backgroundColo: "red",
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
});

const mapDispatchToProps = {
    getMyRooms: _getMyRooms,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(UserScreen));
