import api from './api';

export async function getUserData() {
	try {
		const userData = await api.get(`/api/v1/user/me`);
        return userData.data.user
	} catch (err) {
		console.log('[ERRO] ALGO DEU ERRADO: ', err);
		throw err;
	}
}
