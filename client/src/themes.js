import { createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const light = createMuiTheme({
    palette: {
        secondary:{
            main:'#7289da'
        },
        tonalOffset: 0.2,
    },
});

export const dark = createMuiTheme({
    palette: {
        background: {
            paper: "#35393F",
            default: "#2F3136",
        },
        neutral: {
            main: "#5c6ac4",
        },
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#7289da",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        text: { primary: "#ffffff", secondary: grey[600] },
        secondary: {
            main: "#2F3136",
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        tonalOffset: 0.2,
        type: "dark",
    },
    typography: {
        fontWeightLight: 100,
    },
});

export default { dark, light };
