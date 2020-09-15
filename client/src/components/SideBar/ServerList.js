import {
    Avatar,
    IconButton,
    ListItemAvatar,
    makeStyles,
    Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import { Add, Forum } from "@material-ui/icons";

const styles = makeStyles((theme) => ({
    container: {
        paddingLeft: "0.4em",
        display: "flex",
        flexDirection: "column",
        width: "70px",
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        overflow: "auto",
        direction: "ltr",
        "&::-webkit-scrollbar": {
            width: "1px",
        },
        "&::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.dark,
            outline: "1px solid slategrey",
        },
    },
    avatarContainer: {
        margin: "8px",
        borderRadius: "10px",
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));
const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: theme.typography.pxToRem(16),
    },
}));

const useAvatarStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "50px",
        height: "50px",
        overflow: "visible",
        "&[data-active='true'],&:hover": {
            borderRadius: "10px",
        },
        "&::after": {
            content: '""',
            display: "block",
            width: 5,
            backgroundColor:
                theme.palette.type === "dark"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
            position: "absolute",
            left: -14,
            height: 25,
            top: 13,
            borderBottomRightRadius: 5,
            borderTopRightRadius: 5,
            opacity: 0,
            transitionDuration: theme.transitions.duration.shorter,
        },
        "&:hover::after": {
            opacity: 1,
        },
        "&[data-active='true']::after": {
            opacity: 1,
            height: 40,
            top: 5,
        },
        transitionDuration: theme.transitions.duration.shorter,
    },

    colorDefault: {
        "&[data-active='true'],&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    },
}));

const ServerList = ({ servers = List(), handleCreateClick }) => {
    const classes = styles();
    const tooltipClasses = useStylesBootstrap();
    const avatarClasses = useAvatarStyles();
    const [active, setActive] = useState(0);
    return (
        <div className={classes.container}>
            <div>
                <ListItemAvatar className={classes.avatarContainer}>
                    <IconButton
                        style={{ padding: "10px" }}
                        onClick={handleCreateClick}
                    >
                        <Forum style={{ width: "30px", height: "30px" }} />
                    </IconButton>
                </ListItemAvatar>
                {servers.map((el, i) => {
                    return (
                        <ListItemAvatar
                            key={el.get("_id")}
                            className={classes.avatarContainer}
                        >
                            <IconButton
                                style={{ padding: 0 }}
                                onClick={(_) => {
                                    setActive(i);
                                }}
                            >
                                <Tooltip
                                    classes={tooltipClasses}
                                    title={el.get("name")}
                                    placement="right"
                                    arrow
                                >
                                    <Avatar
                                        data-active={String(active === i)}
                                        alt={el.get("name")[0]}
                                        src={el.get("icon")}
                                        defaultChecked
                                        classes={avatarClasses}
                                    >
                                        {!el.get("icon") && el.get("name")[0]}
                                    </Avatar>
                                </Tooltip>
                            </IconButton>
                        </ListItemAvatar>
                    );
                })}
                <ListItemAvatar className={classes.avatarContainer}>
                    <IconButton
                        style={{ padding: 0 }}
                        onClick={handleCreateClick}
                    >
                        <Add style={{ width: "50px", height: "50px" }} />
                    </IconButton>
                </ListItemAvatar>
            </div>
        </div>
    );
};

ServerList.propTypes = {
    servers: PropTypes.oneOfType([
        PropTypes.instanceOf(Array),
        PropTypes.instanceOf(List),
    ]).isRequired,
    handleCreateClick: PropTypes.func.isRequired,
};

export default ServerList;
