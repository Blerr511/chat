export const GroupArrayByKey = (array, getKey) => {
	const objMap = array.reduce((acc, v) => {
		const _k = getKey(v);
		acc[_k] = acc[_k] || [];
		acc[_k].push(v);
		return acc;
	}, {});
	return Object.keys(objMap).map(k => ({key: k, data: objMap[k]}));
};
