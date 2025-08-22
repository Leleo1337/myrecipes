import type { recipeForm } from '../types/recipes';
import api from './api';

export async function fetchFeaturedRecipes() {
	try {
		const response = await api.get(`/api/v1/recipes/featured`);
		return response.data.data;
	} catch (error) {
		throw error;
	}
}

export async function fetchAllRecipes(page?: number) {
	const pageIndex = page || 1;
	try {
		const response = await api.get(`/api/v1/recipes?page=${pageIndex}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function fetchRecipe(recipeID: string) {
	try {
		const response = await api.get(`/api/v1/recipes/${recipeID}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function fetchRecipeSearch(filters: { query?: string; category?: string }) {
	try {
		const response = await api.get(`/api/v1/recipes/search`, { params: filters });
		return response.data.data;
	} catch (err) {
		throw err;
	}
}

export async function updateRecipe(recipeID: string | undefined, formData: any) {
	try {
		const response = await api.patch(`/api/v1/recipes/${recipeID}/`, formData);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function deleteRecipe(recipeID: string) {
	try {
		const response = await api.delete(`/api/v1/recipes/${recipeID}`);
		return response.data;
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

export async function fetchUserCreatedRecipes(userID: string, page?: number) {
	const pageIndex = page || 1;
	try {
		const response = await api.get(`/api/v1/user/${userID}/created?page=${pageIndex}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function fetchUserLikedRecipes(userID: string, page?: number) {
	const pageIndex = page || 1;
	try {
		const response = await api.get(`/api/v1/user/${userID}/liked?page=${pageIndex}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}
