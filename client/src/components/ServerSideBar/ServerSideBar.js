import {
    Button,
    Collapse,
    Divider,
    ListItem,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import { Add, ChevronRight, ExpandMore, PersonAdd } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import usePermissions from "../../hooks/usePermissions.hook";
import DialogCreateInvite from "../Dialog/DialogCreateInvite";
import DialogCreateRoom from "../Dialog/DialogCreateRoom";
import { Styled } from "../StyledComponents/Styled.group";

const useStyles = makeStyles((theme) => ({
    paper: {
        flex: 1,
        maxWidth: 768,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        backgroundColor: theme.palette.background.default,
        height: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3),
    },
    title: {
        fontSize: theme.typography.pxToRem(24),
    },
    inviteBlock: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    roomContainer: {
        flex: 16,
        paddingTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
    roomHeaderTitle: {
        justifyContent: "flex-start",
        width: "100%",
        fontSize: theme.typography.pxToRem(12),
    },
    roomTitle: {
        justifyContent: "flex-start",
        width: "100%",
        fontSize: theme.typography.pxToRem(12),
        "&[data-active=true]": {
            backgroundColor: theme.palette.background.selected,
        },
    },
    headerContainer: {
        display: "flex",
        justifyContent: "flex-between",
    },
}));

const ServerSideBar = ({
    server,
    myUser,
    error,
    message,
    loading,
    clearServerMessages,
    createNewRoom,
    setSelectedTextChannel,
}) => {
    const name = server.get("name"),
        rooms = server.get("rooms"),
        members = server.get("members"),
        id = server.get("_id"),
        selectedTextChannel = server.get("activeRoom");
    const classes = useStyles();
    const [textChannelExpanded, setTextChannelExpanded] = useState(true);
    const [createRoomDialog, setCreateRoomDialog] = useState(false);
    const [createInviteDialog, setCreateInviteDialog] = useState(false);
    const handleTextExpandClick = () => {
        setTextChannelExpanded((v) => !v);
    };

    const handleCloseDialog = () => setCreateRoomDialog(false);
    const handleOpenDialog = () => setCreateRoomDialog(true);
    const handleCloseInviteDialog = () => setCreateInviteDialog(false);
    const handleOpenInviteDialog = () => setCreateInviteDialog(true);
    const [, myMember] = members.findEntry((v) => v._id === myUser);

    const handleSubmitNewRoom = ({ name, type }) => {
        if (type === "text") createNewRoom(id, { name });
        handleCloseDialog();
    };

    const checkPermissions = usePermissions(myMember.getIn(["role", "name"]));

    useEffect(() => {
        setSelectedTextChannel({ serverId: id, index: 0 });
    }, [id, setSelectedTextChannel]);
    return (
        <>
            <DialogCreateRoom
                error={error}
                handleOnClose={handleCloseDialog}
                handleSubmit={handleSubmitNewRoom}
                loading={loading}
                message={message}
                open={createRoomDialog}
                onMessageClose={clearServerMessages}
            />
            <DialogCreateInvite
                handleOnClose={handleCloseInviteDialog}
                open={createInviteDialog}
                server={server}
            />
            <Paper className={classes.paper}>
                <Paper className={classes.header} elevation={1} square>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.title}
                        color="textPrimary"
                    >
                        {name}
                    </Typography>
                </Paper>
                <div className={classes.inviteBlock}>
                    <PersonAdd
                        color="action"
                        style={{ width: 50, height: 50 }}
                    />
                    <Typography
                        style={{
                            margin: "30px 15% 30px 15%",
                        }}
                    >
                        {"Invite more peoples to your server and enjoy"}
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleOpenInviteDialog}
                    >
                        Invite people
                    </Button>
                </div>
                <Divider />
                <div className={classes.roomContainer}>
                    <div className={classes.headerContainer}>
                        <Styled.TextButtonInverted
                            variant="text"
                            onClick={handleTextExpandClick}
                            disableElevation
                            disableRipple
                            disableFocusRipple
                            className={classes.roomHeaderTitle}
                        >
                            {textChannelExpanded ? (
                                <ExpandMore />
                            ) : (
                                <ChevronRight />
                            )}
                            Text channels
                        </Styled.TextButtonInverted>
                        {checkPermissions("createRoom") && (
                            <Styled.TextButtonInverted
                                variant="text"
                                onClick={handleOpenDialog}
                                disableElevation
                                disableRipple
                                disableFocusRipple
                            >
                                <Add />
                            </Styled.TextButtonInverted>
                        )}
                    </div>

                    <Collapse in={textChannelExpanded}>
                        {rooms &&
                            rooms.map((el, i) => {
                                return (
                                    <ListItem
                                        key={el.get("_id")}
                                        style={{ width: "100%" }}
                                    >
                                        <Button
                                            variant="text"
                                            className={classes.roomTitle}
                                            data-active={
                                                selectedTextChannel === i
                                            }
                                            onClick={() =>
                                                setSelectedTextChannel({
                                                    serverId: id,
                                                    index: i,
                                                })
                                            }
                                        >
                                            {el.get("name")}
                                        </Button>
                                    </ListItem>
                                );
                            })}
                    </Collapse>
                </div>
            </Paper>
        </>
    );
};

export default ServerSideBar;
