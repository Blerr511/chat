import {Avatar, Button, makeStyles, Typography} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {inviteServices} from '../services/invite.service';

const styles = makeStyles(theme => ({
	container: {
		backgroundColor: theme.palette.background.tertiary,
		width: '100vw',
		height: '100vh',
		overflow: 'hidden'
	},
	boxWrapper: {
		widtH: '100%',
		height: '100%',
		display: 'flex',
		maxWidth: '1480px',
		justifyContent: 'center',
		alignItems: 'center'
	},
	paper: {
		padding: theme.spacing(4),
		fontSize: theme.typography.pxToRem(18),
		backgroundColor: theme.palette.background.mobilePrimary,
		width: '480px',
		boxSizing: 'border-box'
	},
	wrapper: {
		margin: 0,
		padding: 0,
		border: 0,
		fontSize: '100%',
		verticalAlign: 'baseline',
		outline: 0,
		width: '100%',
		textAlign: 'center'
	},
	img: {
		marginBottom: theme.spacing(1),
		width: '100%',
		maxWidth: '186px',
		height: 'auto',
		maxHeight: '120px',
		pointerEvents: 'none',
		textIndent: '-9999px'
	},
	header: {
		fontSize: theme.typography.pxToRem(24),
		fontWeight: 600,
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(1)
	},
	desc: {
		fontSize: theme.typography.pxToRem(16),
		lineHeight: theme.spacing(3)
	},
	button: {
		textRendering: 'optimizeLegibility',
		outline: 0,
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 500,
		padding: theme.spacing(0.25, 2),
		userSelect: 'none',
		height: '44px',
		minWidth: '130px',
		minHeight: '44px',
		width: '100%',
		marginTop: theme.spacing(5),
		fontSize: theme.typography.pxToRem(16),
		lineHeight: theme.spacing(3),
		textTransform: 'none'
	},
	imgInviter: {
		width: '100px',
		height: '100px',
		borderRadius: '100%',
		objectFit: 'cover',
		margin: 'auto'
	},
	serverWrapper: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(1),
		alignItems: 'center'
	},
	serverImg: {
		width: '30px',
		height: '30px',
		objectFit: 'cover',
		margin: '4px'
	},
	serverImgPlaceholder: {
		backgroundColor: theme.palette.background.secondary,
		color: theme.palette.text.normal,
		fontSize: '100%'
	},
	chip: {
		textAlign: 'center',
		fontSize: '100%',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0.5, 2),
		borderRadius: '100px',
		backgroundColor: theme.palette.background.tertiary,
		'&:first-of-type': {
			marginRight: theme.spacing(1)
		}
	},
	onlineIndicator: {
		height: '10px',
		width: '10px',
		borderRadius: '50%',
		marginRight: theme.spacing(0.5),
		backgroundColor: theme.palette.text.secondary,
		'&[data-online=true]': {
			backgroundColor: '#43b581'
		}
	},
	onlineText: {
		lineHeight: '20px',
		fontSize: theme.typography.pxToRem(14),
		color: theme.palette.text.secondary,
		whiteSpace: 'nowrap'
	},
	mh: {
		height: '100%'
	}
}));

const Invite = () => {
	const classes = styles();
	const {token: invite} = useParams();
	const [invalidInvite, setInvalidInvite] = useState(false);
	const [data, setData] = useState(null);
	useEffect(() => {
		inviteServices
			.getInvite(invite)
			.then(data => setData(data.data))
			.catch(err => setInvalidInvite(true));
	}, []);
	return (
		<div className={classes.container}>
			<div className={classes.boxWrapper}>
				{(data || invalidInvite) && (
					<Paper className={classes.paper} elevation={3}>
						{invalidInvite ? (
							<InvalidInvite />
						) : (
							<ValidInvite
								server={data.server}
								token={invite}
								sender={data.createdBy}
							/>
						)}
					</Paper>
				)}
			</div>
		</div>
	);
};

const ValidInvite = ({sender, server, token}) => {
	const classes = styles();
	const history = useHistory();
	const handleButtonClick = () => {
		inviteServices
			.joinToServer({serverId: server._id, token})
			.finally(() => {
				history.push('/');
			});
	};

	return (
		<div className={classes.wrapper}>
			<div>
				<Avatar
					src={sender.image}
					alt="Invite not found"
					className={classes.imgInviter}
					classes={{
						colorDefault: classes.serverImgPlaceholder
					}}>
					{sender.username}
				</Avatar>
				<Typography color="textSecondary" style={{marginTop: '8px'}}>
					{sender.username} inviting you to join
				</Typography>
				<div className={classes.serverWrapper}>
					<Avatar
						src={server.icon}
						style={{marginRight: '8px'}}
						className={classes.serverImg}
						classes={{
							colorDefault: classes.serverImgPlaceholder
						}}>
						{server.name}
					</Avatar>
					<Typography
						className={classes.header}
						style={{margin: 0}}
						color="textPrimary">
						{server.name}
					</Typography>
				</div>
				<div className={classes.serverWrapper}>
					<div className={classes.chip}>
						<div
							className={classes.onlineIndicator}
							data-online={true}></div>
						<span className={classes.onlineText}>{1} online</span>
					</div>
					<div className={classes.chip}>
						<div
							className={classes.onlineIndicator}
							data-online={false}></div>
						<span className={classes.onlineText}>{1} member</span>
					</div>
				</div>
			</div>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				classes={{
					label: classes.mh
				}}
				onClick={handleButtonClick}>
				Accept Request
			</Button>
		</div>
	);
};

const InvalidInvite = () => {
	const classes = styles();
	const history = useHistory();
	const handleButtonClick = () => {
		history.push('/');
	};
	return (
		<div className={classes.wrapper}>
			<img
				src={require('../assets/img/invalid_invite.svg')}
				alt="Invite not found"
				className={classes.img}
			/>
			<Typography className={classes.header} color="textPrimary">
				The invitation is invalid
			</Typography>
			<Typography color="textSecondary">
				This invitation has expired or you are not authorized to join
			</Typography>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				onClick={handleButtonClick}>
				Go to Chat
			</Button>
		</div>
	);
};

export default Invite;
