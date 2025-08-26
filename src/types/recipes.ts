export type recipeForm = {
	image?: string;
	title: string;
	description: string;
	category: string;
	difficulty: string;
	visibility: string;
	cookingTime: number;
	portions: number;
	videoUrl: string;
	ingredients: {
		name: string;
		quantity: string;
	}[];
	instructions: {
		step: number;
		description: string;
	}[];
};

export type recipe = {
	_id: string;
	image: string;
	title: string;
	description: string;
	category: string;
	difficulty: 'facil' | 'medio' | 'dificil';
	cookingTime: number;
	portions: number;
	videoUrl: string;
	ingredients: {
		name: string;
		quantity: string;
	}[];
	instructions: {
		step: number;
		description: string;
	}[];
	createdBy: {
		_id: string;
		name: string;
		profilePicture: string;
	};
	likesCount: number;
	commentsCount: number;
};
