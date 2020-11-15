import {IconButton} from '@material-ui/core';
import React from 'react';
import {NavLink} from 'react-router-dom';
import controller from '../../../Routes/controller';
import lastTextChannel from '../../../storage/servers/lastTextChannel';
import {HoverSquare} from '../../StyledComponents/HoverSquare.group';
import {Styled} from '../../StyledComponents/Styled.group';

const SideBarNavLink = ({server}) => {
	const serverRoute = controller.channels.link({
		serverId: server.get('_id')
	});

	return (
		<NavLink
			to={controller.channels.link({
				serverId: server.get('_id'),
				roomId:
					lastTextChannel.get(server.get('_id')) ||
					server.getIn(['rooms', 0, '_id'])
			})}
			isActive={(_, location) => location.pathname.includes(serverRoute)}
			aria-current={'true'}
			component={props => (
				<IconButton style={{padding: 0}}>
					<Styled.ToolTip
						title={server.get('name')}
						placement="right"
						arrow>
						<HoverSquare.Avatar
							onClick={props.navigate}
							data-active={props['aria-current'] === 'true'}
							alt={server.get('name')}
							src={server.get('icon')}
							defaultChecked
							style={{
								fontSize: `${
									server.get('name').length > 10
										? 10
										: 20 - server.get('name').length
								}px`
							}}>
							{!server.get('icon') &&
								server.get('name').slice(0, 7)}
						</HoverSquare.Avatar>
					</Styled.ToolTip>
				</IconButton>
			)}></NavLink>
	);
};

export default SideBarNavLink;
