import api from './api';

export async function getUserData() {
	try {
		const userData = await api.get(`/api/v1/me/`);
        return userData.data.user
	} catch (error) {
		console.log('ERRO NA REQUISIÇÃO, POR FAVOR TENTE NOVAMENTE DEPOIS ', error);
		throw error;
	}
}
