export const jsonToQueryParams = (apiUrl, data = {}) => {
	const url = new URL(apiUrl);
	for (const k in data) {
		if (data[k] !== null && data[k] !== undefined)
			url.searchParams.append(k, data[k]);
	}

	return url.toString();
};
