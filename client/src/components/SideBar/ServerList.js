import {
    Avatar,
    Divider,
    IconButton,
    ListItemAvatar,
    makeStyles,
    Tooltip,
} from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import { Add, Forum } from "@material-ui/icons";
import { HoverSquare } from "../StyledComponents/HoverSquare.group";

const styles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(1.5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "72px",
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
        marginBottom: theme.spacing(1),
        borderRadius: "10px",
        width: "100%",
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    dividerContainer: {
        width: theme.spacing(9),
        position: "relative",
        marginBottom: theme.spacing(1),
    },
    divider: {
        width: theme.spacing(4),
        margin: "auto",
        marginBottom: theme.spacing(1),
        height: "2px",
        backgroundColor:theme.palette.background.modifierAccent
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

const ServerList = ({
    servers = List(),
    handleCreateClick,
    active,
    setActive,
}) => {
    const classes = styles();
    const tooltipClasses = useStylesBootstrap();
    // const avatarClasses = useAvatarStyles();
    return (
        <div className={classes.container}>
            <div>
                <ListItemAvatar className={classes.avatarContainer}>
                    <HoverSquare.IconButton
                        style={{ padding: "10px" }}
                        onClick={() => {
                            setActive(null);
                        }}
                        data-active={active === null}
                    >
                        <Forum style={{ width: "30px", height: "30px" }} />
                    </HoverSquare.IconButton>
                </ListItemAvatar>
                <div className={classes.dividerContainer}>
                    <Divider className={classes.divider} />
                </div>
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
                                    <HoverSquare.Avatar
                                        data-active={active === i}
                                        alt={el.get("name")}
                                        src={el.get("icon")}
                                        defaultChecked
                                        style={{
                                            fontSize: `${
                                                el.get("name").length > 10
                                                    ? 10
                                                    : 20 - el.get("name").length
                                            }px`,
                                        }}
                                    >
                                        {!el.get("icon") &&
                                            el.get("name").slice(0, 7)}
                                    </HoverSquare.Avatar>
                                </Tooltip>
                            </IconButton>
                        </ListItemAvatar>
                    );
                })}
                <ListItemAvatar className={classes.avatarContainer}>
                    <HoverSquare.IconButton
                        style={{ padding: 0 }}
                        onClick={handleCreateClick}
                    >
                        <Add style={{ width: "50px", height: "50px" }} />
                    </HoverSquare.IconButton>
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
