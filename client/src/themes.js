import { createMuiTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const light = createMuiTheme({
    palette: {
        secondary: {
            main: "#7289da",
        },
        tonalOffset: 0.2,
    },
});

export const dark = createMuiTheme({
    palette: {
        background: {
            primary: "#36393f",
            secondary: "#2f3136",
            secondaryAlt: "#292b2f",
            tertiary: "#202225",
            accent: "#4f545c",
            floating: " #18191c",
            mobilePrimary: "#36393f",
            mobileSecondary: "#2f3136",
            modifierHover: "rgba(79,84,92,0.16)",
            modifierActive: "rgba(79,84,92,0.24)",
            modifierSelected: "rgba(79,84,92,0.32)",
            modifierAccent: "hsla(0,0%,100%,0.06)",
            mentioned: "rgba(250,166,26,0.05)",
            mentionedHover: "rgba(250,166,26,0.08)",
            messageHover: "rgba(4,4,5,0.07)",
            helpWarning: "rgba(250,166,26,0.1)",
            helpInfo: "rgba(0,176,244,0.1)",
            interactiveActive: "#fff",
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
        text: {
            primary: "#ffffff",
            secondary: "#b9bbbe",
            normal: "#dcddde",
            muted: "#72767d",
            link: "#00b0f4",
            interactiveNormal: "#b9bbbe",
            interactiveHover: "#dcddde",
            channelsDefault: "#8e9297",
            interactiveMuted: "#4f545c",
            interactiveActive: "#fff",
        },
        secondary: {
            main: "#2F3136",
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        tonalOffset: 0.2,
        type: "dark",
    },
    shape: {
        serverIconBorderRadius: "16px",
        sideBarWidth: 240,
        borderRadius: 3,
        iconSmallest: 12,
        iconSmaller: 20,
    },
    transitions: {
        duration: {
            shortest: 170,
        },
    },
    shadows: [
        "0 0 0 1px rgba(4,4,5,0.15)",
        "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)",
        "0 4px 4px rgba(0,0,0,0.16)",
        "0 8px 16px rgba(0,0,0,0.24)",
    ],
    typography: {
        button: {
            fontSize: "16px",
        },
        fontFamily: "Whitney,Helvetica Neue,Helvetica,Arial,sans-serif",
        allVariants: {
            textRendering: "optimizeLegibility",
            userSelect: "none",
        },
    },
});

export default { dark, light };
