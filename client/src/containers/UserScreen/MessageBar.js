import React, { useRef, useEffect } from "react";
import {
    makeStyles,
    Paper,
    Typography,
    AppBar,
    Box,
    Avatar,
    TextField,
    IconButton,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { connect } from "react-redux";
import { Map, List } from "immutable";
import { sendSocketMessage } from "../../helpers/socketIo.middleware";
const useStyles = makeStyles((styles) => ({
    paper: {
        backgroundColor: styles.palette.background.paper,
        flex: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
    },
    headerContainer: {
        backgroundColor: styles.palette.background.paper,
        padding: "18px",
        display: "flex",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
    title: {
        fontSize: "20px",
    },
    MessageContainer: {
        backgroundColor: styles.palette.background.paper,
        flex: 21,
        overflow: "hidden",
        position: "relative",
    },
    messageBox: {
        backgroundColor: styles.palette.background.paper,
        overflow: "auto",
        position: "absolute",
        top: styles.spacing(2),
        right: styles.spacing(2),
        bottom: styles.spacing(2),
        left: styles.spacing(2),
    },
    listItemText: {
        fontSize: "16px",
    },
    listItemSenderText: {
        fontSize: "14px",
    },
    messageItemPaper: {
        padding: "10px",
    },
    senderBox: {
        backgroundColor: styles.palette.background.default,
        padding: "20px",
        marginTop: "20px",
        display: "flex",
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    senderPaper: {
        backgroundColor: styles.palette.grey[100],
    },
}));

const Header = ({ user }) => {
    const classes = useStyles();
    return (
        <AppBar
            className={classes.headerContainer}
            position="static"
            color="default"
            elevation={0}
        >
            <Typography
                component="span"
                variant="body2"
                className={classes.title}
                color="textPrimary"
            >
                {user?.map((el) => el.get("username")).join(" , ")}
            </Typography>
        </AppBar>
    );
};

const MessageItem = ({ avatar, text, sender, itsMe }) => {
    const classes = useStyles();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: itsMe ? "row-reverse" : "row",
                alignItems: "flex-end",
                margin: "0 0 20px 0",
            }}
        >
            <Avatar
                style={{
                    marginRight: "20px",
                    marginLeft: "20px",
                }}
                src={"/empty/"}
                alt={sender.get("username")}
            ></Avatar>
            <div>
                <Typography
                    color="textSecondary"
                    className={classes.listItemSenderText}
                    style={{ textAlign: itsMe ? "right" : "left" }}
                >
                    {sender.get("username")}
                </Typography>
                <Paper className={classes.messageItemPaper}>
                    <Typography
                        className={classes.listItemText}
                        color="textPrimary"
                    >
                        {text}
                    </Typography>
                </Paper>
            </div>
        </div>
    );
};

const MessageContainer = ({ data, myUser, getSender }) => {
    const classes = useStyles();
    const $paper = useRef();
    useEffect(() => {
        $paper.current.scrollIntoView({ behavior: "smooth" });
    }, [data.size]);
    return (
        <Box className={classes.MessageContainer}>
            <Paper className={classes.messageBox}>
                {data.map((el) => {
                    return (
                        <MessageItem
                            key={el.get("_id")}
                            text={el?.get("data")}
                            sender={getSender(el.get("sender"))}
                            itsMe={myUser === el.get("sender")}
                        />
                    );
                })}
                <div ref={$paper}></div>
            </Paper>
        </Box>
    );
};

const MessageSender = ({ onSend }) => {
    const classes = useStyles();
    const $textField = useRef();
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSend($textField.current.value);
                $textField.current.value = "";
            }}
        >
            <Box className={classes.senderBox}>
                <TextField
                    style={{
                        height: "100%",
                        margin: 0,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    rows={1}
                    placeholder="Type a message"
                    fullWidth
                    margin="normal"
                    inputRef={$textField}
                />
                <IconButton
                    aria-label="send"
                    style={{ width: "60px" }}
                    type="submit"
                >
                    <Send />
                </IconButton>
            </Box>
        </form>
    );
};

const MessageBar = ({ room, myUserId, sendMessage }) => {
    const classes = useStyles();
    const getSender = (senderId) => {
        return room.getIn([
            "members",
            room.get("members").findIndex((el) => el.get("_id") === senderId),
        ]);
    };

    const handleSend = (message) => {
        sendMessage({ room: room.get("_id"), message });
    };
    return (
        <Paper className={classes.paper}>
            <Header user={room.get("members")} />
            <MessageContainer
                data={room.get("messages")}
                myUser={myUserId}
                getSender={getSender}
            />
            <MessageSender onSend={handleSend} />
        </Paper>
    );
};

const mapStateToProps = (state) => {
    const room =
        state.rooms.get("rooms").size > 0
            ? state.rooms.getIn(["rooms", state.rooms.get("currentActive")])
            : Map({ messages: List() });
    const myUserId = state.auth.getIn(["user", "_id"]);

    return {
        room,
        myUserId,
    };
};

const mapDispatchToProps = {
    sendMessage: sendSocketMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
