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
	Typography,
	Checkbox
} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';
import React, {useEffect, useRef, useState} from 'react';

const DialogCreateRoom = ({
	open,
	handleOnClose,
	handleSubmit,
	error,
	message,
	loading,
	onMessageClose,
	defaultActive
}) => {
	const classes = styles();
	const credentials = useRef({name: ''});
	const [error3, setError3] = useState('');
	const [message3, setMessage3] = useState('');
	const [channelType, setChannelType] = useState(defaultActive);
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

	useEffect(() => {
		setChannelType(defaultActive);
	}, [setChannelType, defaultActive]);
	return (
		<Dialog open={open} onClose={handleOnClose}>
			<form
				onSubmit={e => {
					e.preventDefault();
					handleSubmit({...credentials.current, type: channelType});
				}}>
				<DialogTitle>
					<Typography style={{textAlign: 'center'}}>
						Create {channelType === 'text' ? 'text' : 'audio'}{' '}
						channel
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
					<div className={classes.typeButtonsContainer}>
						<Button
							variant={
								channelType === 'text' ? 'contained' : 'text'
							}
							onClick={() => setChannelType('text')}
							color="primary"
							style={{
								justifyContent: 'flex-start',
								paddingLeft: 0
							}}>
							<Checkbox
								checked={channelType === 'text'}
								style={{color: 'white!important'}}
							/>
							Text Channel
						</Button>
						<Button
							variant={
								channelType === 'audio' ? 'contained' : 'text'
							}
							onClick={() => setChannelType('audio')}
							color="primary"
							style={{
								justifyContent: 'flex-start',
								paddingLeft: 0
							}}>
							<br />
							<Checkbox
								checked={channelType === 'audio'}
								style={{color: 'white!important'}}
							/>
							Audio Channel
						</Button>
					</div>
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
	},
	typeButtonsContainer: {
		width: '100%',
		display: 'grid'
	}
}));

export default DialogCreateRoom;
