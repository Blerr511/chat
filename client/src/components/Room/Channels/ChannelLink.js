import React from 'react';
import {Button, makeStyles, Typography} from '@material-ui/core';
import {NavLink} from 'react-router-dom';

import HashIcon from '../../../svg/Hash.icon';
import controller from '../../../Routes/controller';
import SettingsIcon from '../../../svg/Settings.icon';
import AddPersonIcon from '../../../svg/AddPerson.icon';
import {Styled} from '../../StyledComponents/Styled.group';
import usePermissions from '../../../hooks/usePermissions.hook';
import lastTextChannel from '../../../storage/servers/lastTextChannel';

const useStyles = makeStyles(theme => ({
	roomTitle: {
		display: 'flex',
		marginBottom: '2px',
		marginLeft: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		justifyContent: 'space-between',
		fontSize: theme.typography.pxToRem(12),
		color: theme.palette.text.channelsDefault,
		width: `calc(100% - ${theme.spacing(1)}px)`,
		'&[data-active=true]': {
			color: theme.palette.text.interactiveActive,
			backgroundColor: theme.palette.background.modifierSelected
		},
		'&[data-active=false]:hover': {
			color: theme.palette.text.interactiveHover,
			backgroundColor: theme.palette.background.modifierHover
		}
	},
	iconHash: {
		width: theme.shape.iconSmaller,
		height: theme.shape.iconSmaller,
		color: theme.palette.text.muted,
		marginRight: '6px'
	},
	actionContainer: {
		display: 'flex'
	},
	actionIcon: {
		color: theme.palette.text.interactiveNormal,
		'&:hover': {
			color: theme.palette.text.interactiveHover
		}
	}
}));

const ChannelLink = ({roomId, serverId, textChannelExpanded, name}) => {
	const classes = useStyles();
	const checkPermissions = usePermissions();
	return (
		<NavLink
			to={controller.channels.link({
				serverId,
				roomId
			})}
			aria-current={'true'}
			component={props => {
				const isActive = props['aria-current'] === 'true';
				if (!textChannelExpanded && !isActive) return null;
				return (
					<Button
						variant="text"
						className={classes.roomTitle}
						data-active={isActive}
						onClick={() => {
							props.navigate();
							lastTextChannel.set(serverId, roomId);
						}}>
						<span
							style={{
								display: 'flex',
								alignItems: 'center'
							}}>
							<HashIcon className={classes.iconHash} />{' '}
							<Typography
								style={{
									textTransform: 'none',
									lineHeight: 1
								}}>
								{name}
							</Typography>
						</span>
						{checkPermissions('editRoom') && isActive && (
							<div className={classes.actionContainer}>
								<Styled.ToolTip
									title={'Create Invite'}
									placement="top"
									arrow>
									<AddPersonIcon
										className={classes.actionIcon}
									/>
								</Styled.ToolTip>
								<Styled.ToolTip
									title={'Edit channel'}
									placement="top"
									arrow>
									<SettingsIcon
										style={{
											marginLeft: '4px'
										}}
										className={classes.actionIcon}
									/>
								</Styled.ToolTip>
							</div>
						)}
					</Button>
				);
			}}></NavLink>
	);
};

export default ChannelLink;
