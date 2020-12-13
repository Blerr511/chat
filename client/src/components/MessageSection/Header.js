import {makeStyles, Paper, Typography} from '@material-ui/core';
import React from 'react';
import HashIcon from '../../svg/Hash.icon';
import PropTypes from 'prop-types';
const useStyles = makeStyles(theme => ({
	headerContainer: {
		display: 'flex',
		flex: '0 0 auto',
		padding: theme.spacing(0, 1),
		height: theme.spacing(6),
		lineHeight: theme.spacing(2.5),
		width: '100%',
		backgroundColor: theme.palette.background.primary,
		alignItems: 'center',
		marginBottom: 2
	},
	titleContainer: {
		display: 'flex',
		flex: '1 1 auto'
	},
	title: {
		fontSize: theme.typography.pxToRem(16),
		fontWeight: 600,
		color: theme.palette.header.primary
	},
	iconHash: {
		width: 'auto',
		height: theme.shape.iconMid,
		color: theme.palette.text.muted,
		margin: theme.spacing(0, 1),
		flex: '0 0 auto'
	}
}));

const Header = ({name}) => {
	const classes = useStyles();
	return (
		<Paper className={classes.headerContainer} elevation={1} square>
			<div className={classes.titleContainer}>
				<HashIcon className={classes.iconHash} />{' '}
				<Typography
					component="span"
					variant="body2"
					className={classes.title}
					color="textPrimary">
					{name}
				</Typography>
			</div>
		</Paper>
	);
};
Header.propTypes = {
	name: PropTypes.string
};

export default Header;
