import {useCallback, useRef} from 'react';
/**
 * Creates debounced function
 * @param  {function(): *} callback callback
 * @param  {number} timeout debounce timer in milliseconds
 * @returns {function(): *} debounced function
 */
const useDebounce = (callback, timeout = 0) => {
	const timerRef = useRef();
	const tmpCb = useCallback(
		(...arg) => {
			clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => callback(...arg), timeout);
		},
		[callback, timeout, timerRef]
	);
	return tmpCb;
};

export default useDebounce;
