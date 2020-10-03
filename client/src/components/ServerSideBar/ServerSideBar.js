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
import useStorageState from "../../hooks/useStorageState.hook";
import DialogCreateInvite from "../Dialog/DialogCreateInvite";
import DialogCreateRoom from "../Dialog/DialogCreateRoom";
import { Styled } from "../StyledComponents/Styled.group";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 240,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        backgroundColor: theme.palette.background.secondary,
        height: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(0, 2),
        height: "48px",
        boxSizing: "border-box",
        backgroundColor: theme.palette.background.secondary,
        boxShadow: theme.shadows[1],
    },
    title: {
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.text.primary,
        fontWeight: 600,
        lineHeight: 20,
        textOverflow: "ellipsis",
    },
    inviteBlock: {
        textAlign: "center",
        position: "relative",
        boxShadow: `inset 0 -1px 0 ${theme.palette.background.modifierAccent}`,
        background: `url(${require("../../assets/img/invite_new_m.svg")}) no-repeat center 20px`,
        padding: "73px 20px 20px",
    },
    inviteText: {
        fontSize: "14px",
        color: theme.palette.text.normal,
        lineHeight: "18px",
        marginTop: theme.spacing(1),
        "& span": {
            display: "block",
        },
    },
    roomContainer: {
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        flex: "1 1 auto",
        boxShadow: "none",
    },
    roomHeaderContainer: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "relative",
        height: theme.spacing(3),
    },
    roomHeaderTitle: {
        justifyContent: "flex-start",
        width: "100%",
        fontSize: 12,
        padding: 0,
        margin: 0,
        textTransform: "uppercase",
        textOverflow: "ellipsis",
        color: theme.palette.text.channelsDefault,
        fontWeight: 600,
        lineHeight: "16px",
        "&:hover": {
            color: theme.palette.text.interactiveHover,
        },
    },
    roomTitle: {
        justifyContent: "flex-start",
        width: "100%",
        fontSize: theme.typography.pxToRem(12),
        "&[data-active=true]": {
            backgroundColor: theme.palette.background.modifierSelected,
        },
    },
    headerContainer: {
        display: "flex",
        position: "relative",
        paddingTop: theme.spacing(2),
    },
    inviteButton: {
        fontFamily: "Whitney,Helvetica Neue,Helvetica,Arial,sans-serif",
        border: "none",
        borderRadius: "3px",
        fontSize: "14px",
        height: "38px",
        padding: theme.spacing(0.25, 2),
        minWidth: "96px",
        width: "auto",
        color: theme.palette.text.primary,
        margin: theme.spacing(2, "auto", 0),
        textRendering: "optimizeLegibility",
        textTransform: "none",
    },
    closeInviteBlock: {
        position: "absolute",
        top: "12px",
        right: "16px",
        width: "18px",
        height: "18px",
        color: theme.palette.text.interactiveNormal,
        cursor: "pointer",
        "&:hover": {
            color: theme.palette.text.interactiveHover,
        },
    },
    expandIcon: {
        position: "absolute",
        left: 2,
        top: 6,
        width: theme.shape.iconSmallest,
        height: theme.shape.iconSmallest,
        transition: "transform .2s ease-out,-webkit-transform .2s ease-out",
        "&[data-expanded=true]": {
            transform: "rotate(90deg)",
        },
    },
    newRoomIcon: {
        padding: 0,
        width: 18,
        height: 18,
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
    const [hideInviteBlock, setHideInviteBlock] = useStorageState(
        "app.hideInviteBlock",
        false
    );
    const handleTextExpandClick = () => {
        setTextChannelExpanded((v) => !v);
    };

    const handleCloseDialog = () => setCreateRoomDialog(false);
    const handleOpenDialog = () => setCreateRoomDialog(true);
    const handleCloseInviteDialog = () => setCreateInviteDialog(false);
    const handleOpenInviteDialog = () => setCreateInviteDialog(true);
    const handleCloseInviteBlock = () => {
        setHideInviteBlock(true);
    };
    const [, myMember] = members.findEntry(
        (v) => v.getIn(["user", "_id"]) === myUser?.get("_id")
    );
    const checkPermissions = usePermissions(myMember?.getIn(["role", "name"]));
    const handleSubmitNewRoom = ({ name, type }) => {
        if (type === "text") createNewRoom(id, { name });
        handleCloseDialog();
    };

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
            <nav className={classes.paper}>
                <Paper className={classes.header} elevation={1} square>
                    <Typography
                        component="span"
                        variant="h1"
                        className={classes.title}
                        color="textPrimary"
                    >
                        {name}
                    </Typography>
                </Paper>
                <div>
                    {!hideInviteBlock && (
                        <div className={classes.inviteBlock}>
                            <svg
                                onClick={handleCloseInviteBlock}
                                className={classes.closeInviteBlock}
                                aria-hidden="false"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                                ></path>
                            </svg>
                            <Typography className={classes.inviteText}>
                                <span>{"An adventure begins."}</span>
                                <span>{"Let's add some friends!"}</span>
                            </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleOpenInviteDialog}
                                className={classes.inviteButton}
                            >
                                Invite people
                            </Button>
                        </div>
                    )}
                </div>
                <div className={classes.roomContainer}>
                    <div className={classes.headerContainer}>
                        <div className={classes.roomHeaderContainer}>
                            <Typography
                                onClick={handleTextExpandClick}
                                className={classes.roomHeaderTitle}
                            >
                                <ChevronRight
                                    className={classes.expandIcon}
                                    data-expanded={textChannelExpanded}
                                />
                                Text channels
                            </Typography>
                        </div>
                        {checkPermissions("createRoom") && (
                            <Styled.TextButtonInverted
                                variant="text"
                                onClick={handleOpenDialog}
                                disableElevation
                                disableRipple
                                disableFocusRipple
                                className={classes.newRoomIcon}
                            >
                                <Add
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
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
            </nav>
        </>
    );
};

export default ServerSideBar;
