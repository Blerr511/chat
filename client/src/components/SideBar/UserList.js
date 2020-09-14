import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { selectActiveRoom } from "../../actions/room.action";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@material-ui/icons";
import Drawer from "./Drawer";
const useStyles = makeStyles((theme) => {
    return {
        root: {
            width: "99%",
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: "inline",
        },
        listItem: {
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        listItemActive: {
            backgroundColor: theme.palette.primary.dark,
        },
        listItemLastMessage: {
            color: theme.palette.text.secondary,
            opacity: 0.7,
        },
    };
});

const findSender = (users, senderId) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user._id === senderId) return user;
    }
};

/**
 * @param {Object} props
 * @param {Array.<Room>} props.rooms
 */
export default function UserList({
    rooms,
    active,
    setActive,
    users,
    searchUsers,
    getMyRooms,
}) {
    const [showSearchUser, setShowSearchUser] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentActive = useSelector((state) =>
        state.rooms.get("currentActive")
    );
    const handleOnAddUserClick = () => setShowSearchUser((v) => !v);
    const handleOnClose = (users) => {
        setShowSearchUser(false);
        if (users?.size > 0) {
            getMyRooms(users.map((el) => el.get("username")).join(","));
        }
    };
    const handleOnOpen = () => setShowSearchUser(true);
    return (
        <>
            {/* <Drawer
                open={showSearchUser}
                onOpen={handleOnOpen}
                onClose={handleOnClose}
                searchUsers={searchUsers}
                users={users}
            /> */}
            <List className={classes.root}>
                {rooms.size === 0 && (
                    <ListItem alignItems="flex-start">
                        <Typography color="textSecondary" align="center">
                            No users for this project yet
                        </Typography>
                    </ListItem>
                )}
                {
                    <ListItem alignItems="flex-start">
                        <Tooltip title="Add user" placement="right">
                            <IconButton
                                onClick={handleOnAddUserClick}
                                color="primary"
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                }
                {rooms.map((el, i) => {
                    const lastMessage = el.get("messages").reverse().toJS()[0];
                    const lastSender = findSender(
                        el.get("members").toJS(),
                        lastMessage?.sender
                    );
                    return (
                        <div key={el.get("_id")}>
                            <ListItem alignItems="flex-start">
                                <Button
                                    variant="contained"
                                    color={
                                        currentActive === i
                                            ? "default"
                                            : "secondary"
                                    }
                                    className={classes.listItem}
                                    onClick={() =>
                                        dispatch(selectActiveRoom(i))
                                    }
                                >
                                    <ListItemAvatar style={{ marginTop: 0 }}>
                                        <Avatar
                                            alt={el.getIn([
                                                "members",
                                                0,
                                                "firstName",
                                            ])}
                                            src="/static/images/avatar/2.jpg"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={el
                                            .getIn(["members"])
                                            .map((el) => el.get("firstName"))
                                            .toJS()
                                            .join(" , ")}
                                        style={{
                                            textAlign: "left",
                                        }}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                        }}
                                        secondary={
                                            <Typography
                                                color="textSecondary"
                                                noWrap
                                            >
                                                {lastSender &&
                                                    lastSender?.firstName +
                                                        " - "}
                                                <span
                                                    className={
                                                        classes.listItemLastMessage
                                                    }
                                                >
                                                    {lastMessage?.data}
                                                </span>
                                            </Typography>
                                        }
                                    />
                                </Button>
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        </>
    );
}
