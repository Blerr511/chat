import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    CircularProgress,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
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
import { PhotoCamera, PhotoCameraOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { CloseOutlined } from "@material-ui/icons";
const styles = makeStyles((theme) => ({
    container: {
        flex: 1,
        flexDirection: "row",
        // width:"100%",
        display: "flex",
    },
    dialogContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minWidth: "500px",
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
    buttonProgress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
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
    const myRooms = rooms.get("rooms");
    const activeRoom = rooms.get("currentActive");
    const servers = server.get("list");
    const classes = styles();
    const [open, setOpen] = useState(false);
    const _error3 = server.get("error");
    const _message3 = server.get("message");
    const [error3, setError3] = useState("");
    const [message3, setMessage3] = useState("");
    useEffect(() => {
        setError3(Boolean(_error3));
    }, [_error3]);
    useEffect(() => {
        let tmr = null;
        setMessage3(Boolean(_message3));
        if (Boolean(_message3))
            tmr = setTimeout(() => {
                setMessage3("");
                setOpen(false);
            }, 1500);
        return () => clearTimeout(tmr);
    }, [_message3]);
    const credentials = useRef({});
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
    const handleSubmit = () => {
        createServer(credentials.current.name, credentials.current.file);
    };
    return (
        <section className={classes.container}>
            <Dialog open={open} onClose={handleOnClose}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <DialogTitle>
                        <Typography style={{ textAlign: "center" }}>
                            Create server
                        </Typography>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <Collapse
                            in={Boolean(error3) || Boolean(message3)}
                            onExited={clearServerMessages}
                            style={{ width: "100%", marginBottom: "20px" }}
                        >
                            <Alert
                                severity={Boolean(error3) ? "error" : "success"}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            if (error3) setError3("");
                                            if (message3) setMessage3("");
                                        }}
                                    >
                                        <CloseOutlined fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {server.get("error") || server.get("message")}
                            </Alert>
                        </Collapse>
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: "none" }}
                            id="raised-button-file"
                            type="file"
                            onChange={(e) => {
                                credentials.current.file = e.target.files[0];
                            }}
                        />
                        <label htmlFor="raised-button-file">
                            <PhotoCameraOutlined
                                style={{
                                    width: "50px",
                                    height: "50px",
                                }}
                            />
                            <Typography style={{ textAlign: "center" }}>
                                Upload
                            </Typography>
                        </label>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="serverName"
                            label="Name"
                            onChange={(e) => {
                                credentials.current.name = e.target.value;
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <div className={classes.wrapper}>
                            <Button type="submit" disabled={loading3}>
                                Create
                            </Button>
                            {loading3 && (
                                <CircularProgress
                                    size={24}
                                    className={classes.buttonProgress}
                                />
                            )}
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
            <ServerList
                servers={servers}
                handleCreateClick={handleCreateClick}
            />
            <SideBar
                refreshRooms={getMyRooms}
                getMyRooms={getMyRooms}
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
