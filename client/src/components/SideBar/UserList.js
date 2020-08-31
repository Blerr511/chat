import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton, Tooltip, TextField } from "@material-ui/core";
import { selectActiveRoom } from "../../actions/room.action";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useDebounce from "../../hooks/useDebounce.hook";
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
            color: theme.palette.text.disabled,
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
}) {
    const [showSearchUser, setShowSearchUser] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const currentActive = useSelector((state) =>
        state.rooms.get("currentActive")
    );
    const handleOnAddUserClick = () => setShowSearchUser((v) => !v);
    const debounced = useDebounce((v) => {
        searchUsers(v);
    }, 300);
    const handleOnChange = (e) => {
        const v = e.target.value;
        debounced(v);
    };
    return (
        <List className={classes.root}>
            {
                <ListItem alignItems="flex-start">
                    <Tooltip title="Add user" placement="right">
                        <IconButton onClick={handleOnAddUserClick}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <div className={classes.listItem}>
                        {showSearchUser && (
                            <Autocomplete
                                getOptionLabel={(opt) => opt.username}
                                style={{ width: "90%", marginLeft: "20px" }}
                                options={users.get("data").toJS()}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        placeholder="Search by email address, phone number, or user UID"
                                        onChange={handleOnChange}
                                        InputProps={{
                                            disableUnderline: true,
                                            className: classes.searchInput,
                                        }}
                                        {...params}
                                    />
                                )}
                            />
                        )}
                    </div>
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
                                    currentActive === i ? "primary" : "default"
                                }
                                className={classes.listItem}
                                onClick={() => dispatch(selectActiveRoom(i))}
                            >
                                <ListItemAvatar style={{ marginTop: 0 }}>
                                    <Avatar
                                        alt={el
                                            .getIn(["members", 0, "username"])
                                            .toUpperCase()}
                                        src="/static/images/avatar/2.jpg"
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={el
                                        .getIn(["members"])
                                        .map((el) => el.get("username"))
                                        .toJS()
                                        .join(" , ")
                                        .toUpperCase()}
                                    style={{
                                        textAlign: "left",
                                    }}
                                    primaryTypographyProps={{ noWrap: true }}
                                    secondary={
                                        <Typography color="textPrimary" noWrap>
                                            {lastSender &&
                                                lastSender?.username + " - "}
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
    );
}
