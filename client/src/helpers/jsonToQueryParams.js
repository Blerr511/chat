export const jsonToQueryParams = (apiUrl, data = {}) => {
    try {
        const url = new URL(apiUrl);
        for (const k in data) {
            if (data[k] !== null && data[k] !== undefined)
                url.searchParams.append(k, data[k]);
        }

        return url.toString();
    } catch (error) {
        const urlParams = new URLSearchParams();
        for (const k in data) {
            if (data[k] !== null && data[k] !== undefined)
                urlParams.append(k, data[k]);
        }
        return apiUrl + "?" + urlParams.toString();
    }
};
