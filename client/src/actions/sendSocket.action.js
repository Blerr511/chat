import {sendSocketAction} from '../helpers/socketIo.middleware';

export const JOIN_TO_RTC_CHANNEL = 'JOIN_TO_RTC_CHANNEL';

export const joinToRtcChannel = payload =>
	sendSocketAction({type: JOIN_TO_RTC_CHANNEL, payload});
