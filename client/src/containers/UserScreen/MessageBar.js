import React from 'react';
import {makeStyles, Paper} from '@material-ui/core';

import MessageSection from '../../components/MessageSection';

const useStyles = makeStyles(theme => ({
	paper: {
		backgroundColor: theme.palette.background.primary,
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column'
	},

	messageSection: {
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column'
	}
}));

const MessageBar = ({room, handleSend}) => {
	const classes = useStyles();
	if (!room) return null;

	const name = room.get('name');
	const data = room.get('messages');
	const roomId = room.get('_id');
	const onSend = message => {
		handleSend({roomId, message});
	};

	return (
		<Paper className={classes.paper} component="main">
			<MessageSection.Header name={name} />
			<section className={classes.messageSection}>
				<MessageSection.Inbox data={data} />
				<MessageSection.SendBlock onSend={onSend} roomName={name} />
			</section>
		</Paper>
	);
};

export default MessageBar;
