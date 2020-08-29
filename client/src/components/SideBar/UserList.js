import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));

const findSender = (users, senderId) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(user, senderId);
        if (user._id === senderId) return user;
    }
};

/**
 * @param {Object} props
 * @param {Array.<Room>} props.rooms
 */
export default function UserList({ rooms }) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {rooms.map((el) => {
                const lastMessage = el.messages.reverse()[0];
                const lastSender = findSender(el.members, lastMessage?.sender);
                return (
                    <div key={el._id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    alt={el.members[0].username.toUpperCase()}
                                    src="/static/images/avatar/2.jpg"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={el.members.map(
                                    (el, i, m) =>
                                        el.username +
                                        (i === m.length - 1 ? "" : " , ")
                                )}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {lastSender &&
                                                lastSender?.username + " - "}
                                        </Typography>
                                        {lastMessage?.data}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider
                            variant="inset"
                            component="li"
                            key={el._id + "div"}
                        />
                    </div>
                );
            })}
        </List>
    );
}
