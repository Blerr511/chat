import {makeStyles, TextField} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import React, {useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as SVG_GIFT} from '../../assets/svg/gift.svg';
import {ReactComponent as SVG_GIF} from '../../assets/svg/gif.svg';
import {SMILE_SHAPE} from '../../assets/img';
import ShapedButton from '../ShapedButton';

const SendBlock = ({onSend, roomName}) => {
	const classes = useStyles();
	const inputClasses = useInputClasses();
	const $input = useRef();
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			onSend($input.current.value);
			$input.current.value = '';
		},
		[onSend, $input]
	);

	const handleKeyDown = useCallback(
		event => {
			if (event.key === 'Enter') {
				handleSubmit(event);
			}
		},
		[handleSubmit]
	);

	return (
		<form className={classes.formContainer} onSubmit={handleSubmit}>
			<div className={classes.senderWrapper}>
				<div className={classes.senderContainer}>
					<div className={classes.innerContainer}>
						<div className={classes.add}>
							<AddCircle />
						</div>
						<div className={classes.textareaWrapper}>
							<TextField
								id="send-message"
								onKeyDown={handleKeyDown}
								className={classes.textarea}
								multiline
								InputProps={{
									classes: inputClasses,
									className: classes.textareaInput
								}}
								placeholder={`Message #${roomName}`}
								inputRef={$input}
							/>
						</div>
						<div className={classes.icons}>
							<div>
								<SVG_GIFT />
							</div>
							<div>
								<SVG_GIF />
							</div>
							<div>
								<ShapedButton
									shape={{
										src: SMILE_SHAPE,
										count: 50,
										height: 220,
										width: 484,
										columns: 11
									}}
									width={22}
									height={22}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

SendBlock.propTypes = {
	onSend: PropTypes.func.isRequired,
	roomName: PropTypes.string
};

export default SendBlock;

const useStyles = makeStyles(theme => ({
	formContainer: {
		flexShrink: 0,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingTop: theme.spacing(-1)
	},

	senderWrapper: {
		backgroundColor: theme.palette.background.primary,
		position: 'relative',
		width: '100%',
		borderRadius: '8px',
		marginBottom: theme.spacing(3)
	},
	senderContainer: {
		overflow: 'hidden',
		backgroundColor: theme.palette.background.channelTextarea,
		maxHeight: '50vh',
		borderRadius: '8px'
	},
	innerContainer: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		display: 'flex',
		alignItems: 'flex-start'
	},
	add: {
		color: theme.palette.text.interactiveNormal,
		cursor: 'pointer',
		padding: '10px 16px',
		marginLeft: theme.spacing(-2),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'&:hover': {
			color: theme.palette.text.interactiveHover
		},
		position: 'sticky'
	},
	textareaWrapper: {
		fontWeight: 400,
		fontSize: '1rem',
		lineHeight: '1.375rem',
		width: '100%',
		minHeight: 44,
		resize: 'none',
		display: 'flex',
		alignItems: 'center'
	},
	textarea: {
		outline: 'none',
		border: 'none',
		alignSelf: 'center',
		width: '100%',
		lineHeight: '1.375rem!important'
	},
	textareaInput: {
		color: '#dcddde'
	},
	icons: {
		marginRight: -6,
		position: 'sticky',
		display: 'flex',
		top: 0,
		height: 44,
		'&>div': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: theme.spacing(0.5),
			margin: theme.spacing(0, 0.5),
			cursor: 'pointer',
			color: theme.palette.text.interactiveNormal,
			'&:hover': {
				color: theme.palette.text.interactiveHover,
			}
		}
	}
}));

const useInputClasses = makeStyles(() => ({
	underline: {
		'&&&:before': {
			borderBottom: 'none'
		},
		'&&:after': {
			borderBottom: 'none'
		}
	},
	input: {
		'&::placeholder': {
			fontWeight: 100
		}
	}
}));
