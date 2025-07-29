export type recipeForm = {
	image?: string;
	title: string;
	description: string;
	category: string;
	difficulty: string;
	cookingTime: number;
	portions: number;
	ingredients: {
		name: string;
		quantity: string;
		unit: string;
	}[];
	instructions: {
		step: number;
		description: string;
	}[];
};

export type recipe = {
	_id: string;
	creatorProfilePicture: string
	creatorUsername: string
	image: string;
	title: string;
	description: string;
	category: string;
	difficulty: 'facil' | 'medio' | 'dificil';
	cookingTime: number;
	portions: number;
	ingredients: {
		name: string;
		quantity: string;
		unit: string;
	}[];
	instructions: {
		step: number;
		description: string;
	}[];
	createdBy: string;
	likesCount: number;
};
