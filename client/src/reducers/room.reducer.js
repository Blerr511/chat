import {Map, fromJS} from 'immutable';
import {
	GET_MY_ROOMS_REQUEST,
	GET_MY_ROOMS_SUCCESS,
	GET_MY_ROOMS_FAILURE,
	SELECT_ACTIVE_ROOM
} from '../actions/room.action';
import {SOCKET_MESSAGE_RECEIVED} from '../helpers/socketIo.middleware';
const initialState = Map({
	message: null,
	error: null,
	loading: false,
	rooms: [],
	currentActive: 0
});
const rooms = (state = initialState, {type, payload}) => {
	switch (type) {
		case GET_MY_ROOMS_REQUEST:
			return state.set('loading', true);
		case GET_MY_ROOMS_SUCCESS:
			return state.withMutations(mutable => {
				mutable.set('loading', false);
				if (payload instanceof Array)
					mutable.set('rooms', fromJS(payload));
				return mutable;
			});
		case GET_MY_ROOMS_FAILURE:
			return state.withMutations(mutable => {
				mutable.set('loading', false);
				mutable.set('error', payload);
				return mutable;
			});
		case SELECT_ACTIVE_ROOM:
			return state.set('currentActive', payload);
		case SOCKET_MESSAGE_RECEIVED:
			return state.updateIn(
				[
					'rooms',
					state
						.get('rooms')
						.findIndex(el => el.get('_id') === payload.room),
					'messages'
				],
				messages => {
					return messages.push(fromJS(payload.data));
				}
			);
		default:
			return state;
	}
};

export default rooms;
