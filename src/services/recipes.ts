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

export async function getAllRecipes(page?: number) {
	const pageIndex = page || 1;
	try {
		const response = await api.get(`/api/v1/recipes?page=${pageIndex}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function getRecipe(recipeID: string) {
	try {
		const response = await api.get(`/api/v1/recipes/${recipeID}`);
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

export async function getUserCreatedRecipes(userID: string, page?: number) {
	const pageIndex = page || 1;
	try {
		const response = await api.get(`/api/v1/user/${userID}/created?page=${pageIndex}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function getUserLikedRecipes(userID: string, page?: number) {
	const pageIndex = page || 1;
	try {
		const response = await api.get(`/api/v1/user/${userID}/liked?page=${pageIndex}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}
