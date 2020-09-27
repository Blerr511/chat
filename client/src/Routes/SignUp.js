import React, { useRef, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Collapse } from "@material-ui/core";
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = ({ signUp, error, message, loading, clear }) => {
    const classes = useStyles();
    const history = useHistory();
    const $firstName = useRef();
    const $lastName = useRef();
    const $username = useRef();
    const $email = useRef();
    const $password = useRef();

    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    const handleSubmit = () => {
        signUp({
            firstName: $firstName.current,
            lastName: $lastName.current,
            username: $username.current,
            email: $email.current,
            password: $password.current,
        });
    };
    useEffect(() => {
        setErrorMsg(Boolean(error));
    }, [error]);
    useEffect(() => {
        setSuccessMsg(Boolean(message));
        if (Boolean(message)) setTimeout(() => history.push("/login"), 2000);
    }, [message]);
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <div className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ height: "100%" }}>
                            <Collapse in={errorMsg} onExited={clear}>
                                <Alert
                                    severity="error"
                                    onClose={() => setErrorMsg(false)}
                                >
                                    <AlertTitle>Error</AlertTitle>
                                    {error}
                                </Alert>
                            </Collapse>
                            <Collapse in={successMsg}>
                                <Alert
                                    severity="success"
                                    onClose={() => setSuccessMsg(false)}
                                >
                                    <AlertTitle>Success</AlertTitle>
                                    {message}
                                </Alert>
                            </Collapse>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={(e) =>
                                    ($firstName.current = e.target.value)
                                }
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={(e) =>
                                    ($lastName.current = e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={(e) =>
                                    ($username.current = e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) =>
                                    ($email.current = e.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    ($password.current = e.target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link
                                onClick={() => history.push("/login")}
                                style={{ cursor: "pointer" }}
                                variant="body2"
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default SignUp;
