import type { recipeForm } from '../types/recipes';
import api from './api';

export async function getFeaturedRecipes() {
	try {
		const response = await api.get(`/api/v1/recipes/featured`);
		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export async function getAllRecipes() {
	try {
		const response = await api.get(`/api/v1/recipes`);
		return response.data.data;
	} catch (err) {
		throw err;
	}
}

export async function getRecipe(recipeID: string) {
	try {
		const response = await api.get(`/api/v1/recipes/${recipeID}`);
		return response.data.data;
	} catch (err) {
		throw err;
	}
}

export async function createRecipe(data: recipeForm) {
	try {
		const response = await api.post(`/api/v1/recipes/`, data);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function fetchTabRecipes(userID: string, tabIndex: number) {
	const tab = tabIndex === 1 ? 'created' : 'liked';
	try {
		const response = await api.get(`/api/v1/user/${userID}/${tab}`);
		return response.data.data;
	} catch (err) {
		throw err;
	}
}
