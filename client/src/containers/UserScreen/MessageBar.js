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
const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        flex: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
    },
    headerContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3),
    },
    title: {
        fontSize: theme.typography.pxToRem(24),
    },
    MessageContainer: {
        height: "100%",
        marginTop: "50px",
        overflow: "hidden",
        position: "relative",
    },
    messageBox: {
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        position: "absolute",
        top: theme.spacing(2),
        right: theme.spacing(2),
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },
    listItemText: {
        fontSize: "16px",
        opacity: 0.9,
    },
    messageDate: {
        fontSize: theme.typography.pxToRem(10),
        color: theme.palette.grey[600],
        marginLeft: theme.spacing(1),
    },
    listItemSenderText: {
        fontSize: theme.typography.pxToRem(14),
    },
    messageItemPaper: {
        padding: "10px",
    },
    messageItemContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    senderBox: {
        backgroundColor: theme.palette.background.default,
        padding: "20px",
        marginTop: "20px",
        display: "flex",
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    senderPaper: {
        backgroundColor: theme.palette.grey[100],
    },
}));

const Header = ({ name }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.headerContainer} elevation={1} square>
            <Typography
                component="span"
                variant="body2"
                className={classes.title}
                color="textPrimary"
            >
                {name}
            </Typography>
        </Paper>
    );
};

const MessageItem = ({ avatar, text, sender, date }) => {
    const classes = useStyles();
    return (
        <div className={classes.messageItemContainer}>
            <Avatar
                style={{
                    marginRight: "20px",
                    marginLeft: "20px",
                }}
                src={avatar}
                alt={sender}
            ></Avatar>
            <div>
                <span style={{ display: "flex" }}>
                    <Typography
                        color="textPrimary"
                        className={classes.listItemSenderText}
                        style={{ textAlign: "left" }}
                    >
                        {sender}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        className={classes.messageDate}
                        style={{ textAlign: "left" }}
                    >
                        {date}
                    </Typography>
                </span>
                <div>
                    <Typography
                        className={classes.listItemText}
                        color="textPrimary"
                    >
                        {text}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

const MessageContainer = ({ data, myUser = "Blerr", getSender }) => {
    const classes = useStyles();
    const $paper = useRef();
    useEffect(() => {
        $paper.current.scrollIntoView({ behavior: "smooth" });
    }, [data.size]);
    return (
        <Box className={classes.MessageContainer}>
            <div className={classes.messageBox}>
                {data.map((el) => {
                    return (
                        <MessageItem
                            key={el.get("_id")}
                            text={el.get("data")}
                            sender={"hello "}
                            itsMe={false}
                        />
                    );
                })}
            </div>
            <div ref={$paper}></div>
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

const MessageBar = ({ room, handleSend }) => {
    const classes = useStyles();
    if (!room) return null;

    const name = room.get("name");
    const data = room.get("messages");
    const roomId = room.get("_id");
    const onSend = (message) => {
        handleSend({ roomId, message });
    };

    return (
        <Paper className={classes.paper}>
            {<Header name={name} />}
            {<MessageContainer data={data} />}
            <MessageSender onSend={onSend} />
        </Paper>
    );
};

export default MessageBar;
