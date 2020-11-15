import {
	Avatar,
	Divider,
	IconButton,
	ListItemAvatar,
	makeStyles,
	Tooltip
} from '@material-ui/core';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import {Add, Forum} from '@material-ui/icons';
import {HoverSquare} from '../StyledComponents/HoverSquare.group';
import {Styled} from '../StyledComponents/Styled.group';
import {NavLink, useHistory, useRouteMatch} from 'react-router-dom';
import controller from '../../Routes/controller';
import lastTextChannel from '../../storage/servers/lastTextChannel';
import SideBarNavLink from '../Room/Servers/SideBarNavLink';

const styles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '72px',
		height: '100vh',
		overflow: 'auto',
		direction: 'ltr',
		'&::-webkit-scrollbar': {
			width: '1px'
		},
		'&::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: theme.palette.primary.dark,
			outline: '1px solid slategrey'
		}
	},
	contDiv: {
		paddingTop: theme.spacing(1.5)
	},
	avatarContainer: {
		marginBottom: theme.spacing(1),
		borderRadius: '10px',
		width: '100%',
		height: '48px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	dividerContainer: {
		width: theme.spacing(9),
		position: 'relative',
		marginBottom: theme.spacing(1)
	},
	divider: {
		width: theme.spacing(4),
		margin: 'auto',
		marginBottom: theme.spacing(1),
		height: '2px',
		backgroundColor: theme.palette.background.modifierAccent
	}
}));

const ServerList = ({servers = List(), handleCreateClick}) => {
	const classes = styles();
	// const avatarClasses = useAvatarStyles();
	return (
		<div className={classes.container}>
			<div className={classes.contDiv}>
				<ListItemAvatar className={classes.avatarContainer}>
					<NavLink
						to={controller.myPage.link()}
						aria-current={'true'}
						component={props => (
							<HoverSquare.IconButton
								style={{padding: '10px'}}
								onClick={props.navigate}
								data-active={props['aria-current'] === 'true'}>
								<Forum
									style={{width: '30px', height: '30px'}}
								/>
							</HoverSquare.IconButton>
						)}></NavLink>
				</ListItemAvatar>
				<div className={classes.dividerContainer}>
					<Divider className={classes.divider} />
				</div>

				{servers.map((el, i) => {
					return (
						<ListItemAvatar
							key={el.get('_id')}
							className={classes.avatarContainer}>
							<SideBarNavLink server={el} />
						</ListItemAvatar>
					);
				})}
				<ListItemAvatar className={classes.avatarContainer}>
					<HoverSquare.IconButton
						style={{padding: 0}}
						onClick={handleCreateClick}>
						<Add style={{width: '50px', height: '50px'}} />
					</HoverSquare.IconButton>
				</ListItemAvatar>
			</div>
		</div>
	);
};

ServerList.propTypes = {
	servers: PropTypes.oneOfType([
		PropTypes.instanceOf(Array),
		PropTypes.instanceOf(List)
	]).isRequired,
	handleCreateClick: PropTypes.func.isRequired
};

export default ServerList;
