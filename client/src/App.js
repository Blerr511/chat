import React, { useEffect } from "react";
import "./App.css";
import SignIn from "./components/Auth/Auth";
import {
    CircularProgress,
    Container,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core";
import { connect } from "react-redux";
import { login } from "./actions/auth.action";
import UserScreen from "./containers/UserScreen/UserScreen";
const theme = createMuiTheme({
    palette: {
        // primary: {
        //     // light: will be calculated from palette.primary.main,
        //     main: "#ff4400",
        //     // dark: will be calculated from palette.primary.main,
        //     // contrastText: will be calculated to contrast with palette.primary.main
        // },
        secondary: {
            light: "#0066ff",
            main: "#0044ff",
            // dark: will be calculated from palette.secondary.main,
            contrastText: "#ffcc00",
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        tonalOffset: 0.2,
    },
});

const App = ({ auth, login }) => {
    const loggedIn = auth.get("loggedIn");
    useEffect(() => {
        login();
    }, [login]);
    let Screen = null;
    switch (loggedIn) {
        case true:
            Screen = <UserScreen />;
            break;
        case false:
            Screen = <SignIn login={login} />;
            break;
        default:
            Screen = (
                <Container
                    component="main"
                    style={{
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Container>
            );
            break;
    }
    return <ThemeProvider theme={theme}>{Screen}</ThemeProvider>;
};

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = {
    login,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
