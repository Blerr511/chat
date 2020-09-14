import {
    Avatar,
    IconButton,
    ListItemAvatar,
    makeStyles,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import { Add } from "@material-ui/icons";
const styles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "70px",
        backgroundColor: theme.palette.background.default,
        height: "100vh",
        overflow: "auto",
        direction: "rtl",
        "&::-webkit-scrollbar": {
            width: "0.4em",
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
    },
}));

const ServerList = ({ servers = List(), handleCreateClick }) => {
    const classes = styles();
    return (
        <div className={classes.container}>
            <div>
                {servers.map((el) => {
                    return (
                        <ListItemAvatar
                            key={el.get("_id")}
                            className={classes.avatarContainer}
                        >
                            <IconButton style={{ padding: 0 }}>
                                <Avatar
                                    alt={el.get("name")}
                                    src={el.get("icon")}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                    }}
                                />
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
