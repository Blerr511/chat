import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	dateDivider: {
		borderTop: `thin solid ${theme.palette.background.modifierAccent}`,
		zIndex: 1,
		height: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: '0 0 auto',
		boxSizing: 'border-box',
		pointerEvents: 'none',
		margin: '6 0 ',
		marginLeft: '1rem',
		marginRight: '0.875rem'
	},
	dividerText: {
		color: theme.palette.text.muted,
		backgroundColor: theme.palette.background.primary,
		lineHeight: 13,
		fontSize: theme.typography.pxToRem(12),
		marginTop: -1,
		borderRadius: 8,
		fontWeight: 600,
		padding: '2px 4px'
	}
}));

const DateDivider = ({children}) => {
	const classes = useStyles();
	return (
		<div className={classes.dateDivider}>
			<span className={classes.dividerText}>{children}</span>
		</div>
	);
};

DateDivider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
};

export default DateDivider;
