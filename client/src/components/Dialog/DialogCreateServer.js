import {
	Button,
	CircularProgress,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	makeStyles,
	TextField,
	Typography
} from '@material-ui/core';
import {CloseOutlined, PhotoCameraOutlined} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';
import React, {useEffect, useRef, useState} from 'react';

const DialogCreateServer = ({
	open,
	handleOnClose,
	handleSubmit,
	error,
	message,
	loading,
	onMessageClose
}) => {
	const classes = styles();
	const credentials = useRef({file: null, name: ''});
	const [error3, setError3] = useState('');
	const [message3, setMessage3] = useState('');
	useEffect(() => {
		setError3(Boolean(error));
	}, [error]);
	useEffect(() => {
		let tmr = null;
		setMessage3(Boolean(message));
		if (message)
			tmr = setTimeout(() => {
				setMessage3('');
				handleOnClose();
			}, 1500);
		return () => clearTimeout(tmr);
	}, [message]);
	return (
		<Dialog open={open} onClose={handleOnClose}>
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSubmit(credentials.current);
				}}>
				<DialogTitle>
					<Typography style={{textAlign: 'center'}}>
						Create server
					</Typography>
				</DialogTitle>
				<DialogContent className={classes.dialogContent}>
					<Collapse
						in={Boolean(error3) || Boolean(message3)}
						onExited={onMessageClose}
						style={{width: '100%', marginBottom: '20px'}}>
						<Alert
							severity={error3 ? 'error' : 'success'}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => {
										if (error3) setError3('');
										if (message3) setMessage3('');
									}}>
									<CloseOutlined fontSize="inherit" />
								</IconButton>
							}>
							{error || message}
						</Alert>
					</Collapse>
					<input
						accept="image/*"
						className={classes.input}
						style={{display: 'none'}}
						id="raised-button-file"
						type="file"
						onChange={e => {
							credentials.current.file = e.target.files[0];
						}}
					/>
					<label htmlFor="raised-button-file">
						<PhotoCameraOutlined
							style={{
								width: '50px',
								height: '50px'
							}}
						/>
						<Typography style={{textAlign: 'center'}}>
							Upload
						</Typography>
					</label>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="serverName"
						label="Name"
						onChange={e => {
							credentials.current.name = e.target.value;
						}}
					/>
				</DialogContent>
				<DialogActions>
					<div className={classes.wrapper}>
						<Button
							variant="text"
							disabled={loading}
							onClick={handleOnClose}
							style={{marginRight: '10px'}}>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={loading}
							variant="contained"
							color="primary">
							Create
						</Button>
						{loading && (
							<CircularProgress
								size={24}
								className={classes.buttonProgress}
							/>
						)}
					</div>
				</DialogActions>
			</form>
		</Dialog>
	);
};

const styles = makeStyles(theme => ({
	container: {
		flex: 1,
		flexDirection: 'row',
		// width:"100%",
		display: 'flex'
	},
	dialogContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		minWidth: '500px'
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative'
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12
	}
}));

export default DialogCreateServer;
