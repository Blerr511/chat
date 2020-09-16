import React from "react";
import {
    Avatar as AVATAR,
    IconButton as ICONBUTTON,
    makeStyles,
} from "@material-ui/core";

const useAvatarStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "50px",
        height: "50px",
        overflow: "visible",
        "&[data-active=true],&:hover": {
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
/**
 * @param {import("@material-ui/core").AvatarProps & {'data-active':boolean}} props
 */
const Avatar = (props) => {
    const classes = useAvatarStyles();
    return <AVATAR classes={classes} {...props} />;
};
/**
 * @param {import("@material-ui/core").IconButtonProps & {'data-active':boolean}} props
 */
const IconButton = (props) => {
    const classes = useAvatarStyles();
    return <ICONBUTTON classes={classes} {...props} />;
};

export const HoverSquare = {
    Avatar,
    IconButton,
};
