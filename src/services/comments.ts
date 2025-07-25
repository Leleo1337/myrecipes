import api from './api';

export async function getRecipeComments(recipeID: string) {
	try {
		const response = await api.get(`/api/v1/recipes/${recipeID}/comments`);
		return response.data.data;
	} catch (err) {
		throw err;
	}
}

export async function createComment(commentData: any, recipeID: string | undefined) {
	try {
		const response = await api.post(`/api/v1/recipes/${recipeID}/comments`, commentData);
		return response.data.data;
	} catch (err) {
		throw err;
	}
}
