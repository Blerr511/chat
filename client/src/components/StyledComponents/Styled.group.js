import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import _Tooltip from '@material-ui/core/Tooltip';

const textButtonStyles = theme => ({
	root: {
		background: 'none',
		'&:hover': {
			background: 'none'
		}
	},
	text: {
		transition: 'color 50ms ease',
		'&:hover': {
			color: theme.palette.grey[600]
		}
	}
});

const invertedTextButtonStyles = theme => ({
	text: {
		transition: 'color 50ms ease',
		color: theme.palette.grey[600],
		'&:hover': {
			color: theme.palette.grey[100]
		}
	}
});
const tooltipStyles = theme => ({
	arrow: {
		color: theme.palette.common.black
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
		fontSize: theme.typography.pxToRem(16)
	}
});
/**
 * @param {import('@material-ui/core').ButtonProps}
 */
const TextButton = withStyles(textButtonStyles)(Button);
/**
 * @param {import('@material-ui/core').ButtonProps}
 */
const TextButtonInverted = withStyles(invertedTextButtonStyles)(TextButton);

const ToolTip = withStyles(tooltipStyles)(_Tooltip);

export const Styled = {TextButton, TextButtonInverted, ToolTip};
