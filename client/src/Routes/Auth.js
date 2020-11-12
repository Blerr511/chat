import React, {useRef, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {Grid, Link as MuiLink, Collapse} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import {connect} from 'react-redux';
import {_clearAuthMessages, _login, _signUp} from '../actions/auth.action';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

const SignIn = ({login, error, clear}) => {
	const classes = useStyles();
	const $username = useRef();
	const $password = useRef();
	const history = useHistory();
	const [errorMsg, setErrorMsg] = useState(false);
	const handleSubmit = () => {
		login($username.current, $password.current);
	};
	useEffect(() => {
		setErrorMsg(Boolean(error));
	}, [error]);
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<div className={classes.form} noValidate>
					<Grid item xs={12} style={{height: '100%'}}>
						<Collapse in={errorMsg} onExited={clear}>
							<Alert
								severity="error"
								onClose={() => setErrorMsg(false)}>
								<AlertTitle>Error</AlertTitle>
								{error}
							</Alert>
						</Collapse>
					</Grid>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={e => {
							$username.current = e.target.value;
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={e => {
							$password.current = e.target.value;
						}}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs></Grid>
						<Grid item>
							<MuiLink
								onClick={() => history.push('/signup')}
								style={{cursor: 'pointer'}}>
								{"Don't have an account? Sign Up"}
							</MuiLink>
						</Grid>
					</Grid>
				</div>
			</div>
		</Container>
	);
};

const mapStateToProps = state => {
	const auth = state.auth;
	const error = auth.get('error');
	return {error};
};
const mapDispatchToProps = {
	login: _login,
	clear: _clearAuthMessages
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
