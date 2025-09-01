import api from './api';

export async function fetchRecipeComments(recipeID: string, page: number) {
	try {
		const response = await api.get(`/api/v1/recipes/${recipeID}/comments?page=${page}`);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function updateComment(recipeID: string, commentID: string, commentData: any) {
	try {
		const response = await api.patch(`/api/v1/recipes/${recipeID}/comments/${commentID}`, commentData);
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

export async function deleteComent(recipeID: string, commentID: string) {
	try {
		const response = await api.delete(`/api/v1/recipes/${recipeID}/comments/${commentID}`);
		return response.data.data;
	} catch (err) {
		throw err;
	}
}
