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
import { _login, _signUp, _clearAuthMessages } from "./actions/auth.action";
import UserScreen from "./containers/UserScreen/UserScreen";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
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

const App = ({ auth, login, signUp, clear }) => {
    const loggedIn = auth.get("loggedIn");
    const error = auth.get("error");
    const loading = auth.get("loading");
    const message = auth.get("message");
    useEffect(() => {
        login();
    }, [login]);
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={({ location }) => {
                            return loggedIn ? (
                                <UserScreen />
                            ) : loggedIn === false ? (
                                <Redirect
                                    to={{
                                        pathname: "/login",
                                        state: { from: location },
                                    }}
                                />
                            ) : (
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
                        }}
                    ></Route>
                    <Route
                        path={"/login"}
                        render={({ location }) => {
                            return loggedIn ? (
                                <Redirect
                                    to={{
                                        pathname: "/",
                                        state: { from: location },
                                    }}
                                />
                            ) : (
                                <SignIn
                                    login={login}
                                    loggedIn={loggedIn}
                                    error={error}
                                    clear={clear}
                                />
                            );
                        }}
                        exact
                    ></Route>
                    <Route path={"/signup"} exact>
                        <SignUp
                            signUp={signUp}
                            error={error}
                            message={message}
                            loading={loading}
                            clear={clear}
                        />
                    </Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

const mapStateToProps = (state) => ({ auth: state.auth });
const mapDispatchToProps = {
    login: _login,
    signUp: _signUp,
    clear: _clearAuthMessages,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
