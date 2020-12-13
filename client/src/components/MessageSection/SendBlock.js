import {makeStyles, TextField} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import React, {useCallback} from 'react';
import {useRef} from 'react';

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
						<div className={classes.icons}></div>
					</div>
				</div>
			</div>
		</form>
	);
};

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
	icons: {}
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

export default SendBlock;
