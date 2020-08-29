/**
 * @param {Response} res
 * @return {Promise}
 */
export const handleResponse = async (res) => {
    const json = await res.json();
    if (!(res.status >= 200 && res.status <= 300) || json.status === "error") {
        throw json.message ?? res.statusText;
    }
    return json;
};
