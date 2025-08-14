import api from './api';

export async function likeRecipe(recipeID: string) {
	try {
		const response = await api.post(`/api/v1/recipes/${recipeID}/like/`);
		return response.data;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export async function getRecipeLikes(recipeID: string) {
	try {
		const response = await api.get(`/api/v1/recipes/${recipeID}/like/count`);
		return response.data;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

export async function fetchHasUserLiked(recipeID: string) {
	try {
		const response = await api.get(`/api/v1/recipes/${recipeID}/like/check`);
		return response.data;
	} catch (err) {
		console.log(err);
		throw err;
	}
}
