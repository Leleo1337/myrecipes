import api from './api';

export async function getFeaturedRecipes() {
	try {
		const response = await api.get(`/api/v1/recipes/featured`);
		return response.data.data;
	} catch (error) {
		console.log('ERRO NA REQUISIÇÃO, POR FAVOR TENTE NOVAMENTE DEPOIS ', error);
		throw error;
	}
}

export async function getAllRecipes() {
	try {
		const response = await api.get(`/api/v1/recipes`);
		return response.data.data;
	} catch (error) {
		console.log('ERRO NA REQUISIÇÃO, POR FAVOR TENTE NOVAMENTE DEPOIS ', error);
		throw error;
	}
}
