import { useCallback, useEffect, useState } from "react";

const SafeJsonParse = (v, f) => {
    try {
        return JSON.parse(v, f);
    } catch (err) {
        return v;
    }
};

const useStorageState = (key, initialValue) => {
    const [_state, _setState] = useState(
        SafeJsonParse(localStorage.getItem(String(key))) ?? initialValue
    );
    /**
     * @type {React.Dispatch<*>}
     */
    const setState = useCallback((v) => {
        _setState(v);
    }, []);
    useEffect(() => {
        localStorage.setItem(key, _state);
    }, [_state]);
    useEffect(() => {
        _setState(
            SafeJsonParse(localStorage.getItem(String(key))) ?? initialValue
        );
    }, [key, initialValue]);
    return [_state, setState];
};

export default useStorageState;
