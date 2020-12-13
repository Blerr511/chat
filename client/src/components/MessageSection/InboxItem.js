import React from 'react';
import {Avatar, makeStyles, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useMemberSelector} from '../ServerSideBar/ServerController';

const useStyles = makeStyles(theme => ({
	listItemText: {
		fontSize: '16px',
		opacity: 0.9
	},
	messageDate: {
		fontSize: '0.75rem',
		color: theme.palette.text.muted,
		marginLeft: '.25rem',
		lineHeight: '1.375rem',
		fontWeight: 500,
		alignSelf: 'center'
	},
	listItemSenderText: {
		fontSize: '1rem',
		cursor: 'pointer',
		marginRight: '.25rem',
		'&:hover': {
			textDecoration: 'underline'
		}
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: '.125rem',
		paddingBottom: '.125rem',
		paddingLeft: '72px',
		position: 'relative',
		'&[data-text-only=false]': {
			minHeight: '2.75rem',
			marginTop: '1.0625rem'
		},
		'&:hover': {
			backgroundColor: theme.palette.background.messageHover,
			'& $sendHours': {
				opacity: 1
			}
		}
	},
	avatar: {
		position: 'absolute',
		left: '16px',
		marginTop: 'calc(4px - .125rem)',
		width: '40px',
		height: '40px',
		overflow: 'hidden',
		cursor: 'pointer'
	},
	sendHours: {
		opacity: 0,
		position: 'absolute',
		height: '1.375rem',
		lineHeight: '1.375rem',
		width: '56px',
		userSelect: 'none',
		textAlign: 'right',
		left: 0,
		fontSize: '0.6875rem',
		color: theme.palette.text.muted,
		marginLeft: '.25rem',
		fontWeight: 500
	}
}));

const InboxItem = ({text, sender, date, textOnly}) => {
	const classes = useStyles();
	const _date = moment(date);
	const displayDate = date && _date.isValid() ? _date.calendar() : null;
	const displayHours = _date.format('HH:mm A');
	const member = useMemberSelector(sender);
	const avatar = member?.getIn(['user', 'avatar']);
	const username = member?.getIn(['user', 'username']);
	return (
		<div className={classes.container} data-text-only={textOnly}>
			{textOnly ? (
				<span className={classes.sendHours}>{displayHours}</span>
			) : (
				<Avatar
					className={classes.avatar}
					src={avatar}
					alt={username}></Avatar>
			)}
			<div>
				{!textOnly && (
					<span style={{display: 'flex'}}>
						<Typography
							role="h2"
							className={classes.listItemSenderText}
							style={{textAlign: 'left'}}>
							{username}
						</Typography>
						<Typography
							color="textPrimary"
							className={classes.messageDate}
							style={{textAlign: 'left'}}>
							{displayDate}
						</Typography>
					</span>
				)}
				<div>
					<Typography
						className={classes.listItemText}
						color="textPrimary">
						{text}
					</Typography>
				</div>
			</div>
		</div>
	);
};

InboxItem.propTypes = {
	text: PropTypes.string,
	sender: PropTypes.string,
	date: PropTypes.any,
	textOnly: PropTypes.bool
};

export default InboxItem;
