/**
 * @return {{Authorization:String}}
 */
export const authHeader = () => {
	const token = localStorage.getItem('token');
	if (!token) return null;

	return {Authorization: 'Bearer ' + token};
};
