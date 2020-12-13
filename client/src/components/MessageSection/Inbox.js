import {Box, makeStyles} from '@material-ui/core';
import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import InboxItem from './InboxItem';
import {GroupArrayByKey} from '../../helpers/utils/GroupArrayByKey';
import DateDivider from './DateDivider';
const useStyles = makeStyles(theme => ({
	container: {
		height: '100%',
		position: 'relative',
		flex: '1 1 auto',
		display: 'flex'
	},
	messageBox: {
		backgroundColor: theme.palette.background.primary,
		overflow: 'hidden scroll',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		'&::-webkit-scrollbar': {
			width: 16,
			height: 16
		},

		'&::-webkit-scrollbar-track': {
			backgroundColor: theme.palette.scrollbar.autoTrack,
			border: '4px solid transparent',
			backgroundClip: 'padding-box',
			borderRadius: 8
		},
		'&::-webkit-scrollbar-thumb,::-webkit-scrollbar-track': {
			backgroundColor: theme.palette.scrollbar.autoThumb,
			border: '4px solid transparent',
			backgroundClip: 'padding-box',
			borderRadius: 8,
			minHeight: '40px'
		}
	},
	dateDividedContainer: {
		paddingTop: 6,
		paddingBottom: 6
	}
}));

const INTERVAL_BETWEEN_NEW_USER_MESSAGE = 60;

const Inbox = ({data}) => {
	const classes = useStyles();
	const $paper = useRef();
	const _initialRender = useRef(true);
	useEffect(() => {
		$paper.current.scrollIntoView({
			behavior: _initialRender.current ? 'auto' : 'smooth'
		});

		if (_initialRender.current) _initialRender.current = false;
	}, [data.size]);
	return (
		<Box className={classes.container}>
			<div className={classes.messageBox}>
				{GroupArrayByKey(data.toJS(), v => {
					const date = new Date(v.createdAt);
					return `${
						date.getMonth() + 1
					}/${date.getDate()}/${date.getFullYear()}`;
				}).map(el => {
					return (
						<div
							key={el.key}
							className={classes.dateDividedContainer}>
							<DateDivider>
								{moment(el.data[0].createdAt).format('LL')}
							</DateDivider>

							{el.data.map((message, i, arr) => {
								const textOnly =
									i > 0 &&
									message.sender === arr[i - 1].sender &&
									moment(message.createdAt).diff(
										moment(arr[i - 1].createdAt),
										'seconds'
									) <= INTERVAL_BETWEEN_NEW_USER_MESSAGE;
								return (
									<InboxItem
										key={message._id}
										text={message.data}
										sender={message.sender}
										textOnly={textOnly}
										date={message.createdAt}
									/>
								);
							})}
						</div>
					);
				})}
				<div ref={$paper}></div>
			</div>
		</Box>
	);
};
Inbox.propTypes = {
	data: PropTypes.object
};
export default Inbox;
