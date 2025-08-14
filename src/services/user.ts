import api from './api';

export async function getLoggedInUserData() {
	try {
		const userData = await api.get(`/api/v1/user/me`);
		return userData.data.user;
	} catch (err) {
		console.log('[ERRO] ALGO DEU ERRADO: ', err);
		throw err;
	}
}

export async function getUserData(userID: string | undefined) {
	try {
		const userData = await api.get(`/api/v1/user/${userID}`);
		return userData.data;
	} catch (err) {
		console.log('[ERRO] ALGO DEU ERRADO: ', err);
		throw err;
	}
}

export async function updateUser(userID: string, update: any) {
	try {
		const data = await api.patch(`/api/v1/user/${userID}`, update);
		return data.data;
	} catch (err) {
		console.log('[ERRO] ALGO DEU ERRADO: ', err);
		throw err;
	}
}
