import { withStyles } from "@material-ui/core";
import _Avatar from "@material-ui/core/Avatar";
import _IconButton from "@material-ui/core/IconButton";

const avatarStyles = (theme) => ({
    root: {
        position: "relative",
        width: "48px",
        height: "48px",
        overflow: "visible",
        color: theme.palette.text.normal,
        "&[data-active=true],&:hover": {
            borderRadius: theme.shape.serverIconBorderRadius,
            color: theme.palette.text.primary,
        },
        "&::after": {
            content: '""',
            display: "block",
            width: 8,
            backgroundColor:
                theme.palette.type === "dark"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
            position: "absolute",
            left: -16,
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
            backgroundColor: theme.palette.primary.main,
        },
    },
});
const iconButtonStyles = (theme) => ({
    root: {
        position: "relative",
        width: "50px",
        height: "50px",
        overflow: "visible",
        "&[data-active=true],&:hover": {
            borderRadius: theme.shape.serverIconBorderRadius,
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
});
/**
 * @param {import("@material-ui/core").AvatarProps & {'data-active':boolean}} props
 */
const Avatar = withStyles(avatarStyles)(_Avatar);

/**
 * @param {import("@material-ui/core").IconButtonProps & {'data-active':boolean}} props
 */
const IconButton = withStyles(iconButtonStyles)(_IconButton);

export const HoverSquare = {
    Avatar,
    IconButton,
};
