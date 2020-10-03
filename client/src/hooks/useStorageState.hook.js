import { useCallback, useState } from "react";

const useStorageState = (key, initialValue) => {
    const [_state, _setState] = useState(
        localStorage.getItem(String(key)) ?? initialValue
    );
    /**
     * @type {React.Dispatch<*>}
     */
    const setState = useCallback(
        (v) => {
            _setState(v);
            localStorage.setItem(key, v);
        },
        [key]
    );
    return [JSON.parse(_state), setState];
};

export default useStorageState;
