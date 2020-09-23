import { Button, withStyles } from "@material-ui/core";

const textButtonStyles = (theme) => ({
    root: {
        background: "none",
        "&:hover": {
            background: "none",
        },
    },
    text: {
        transition: "color 50ms ease",
        "&:hover": {
            color: theme.palette.grey[600],
        },
    },
});

const invertedTextButtonStyles = (theme) => ({
    text: {
        transition: "color 50ms ease",
        color: theme.palette.grey[600],
        "&:hover": {
            color: theme.palette.grey[100],
        },
    },
});

/**
 * @param {import('@material-ui/core').ButtonProps}
 */
const TextButton = withStyles(textButtonStyles)(Button);

const TextButtonInverted = withStyles(invertedTextButtonStyles)(TextButton);

export const Styled = { TextButton, TextButtonInverted };
