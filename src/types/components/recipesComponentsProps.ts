export type RecipeCardProps = {
	_id?: string;
	createdBy: {
		name: string,
		profilePicture: string
	}
	difficulty: 'facil' | 'medio' | 'dificil';
	category: string;
	image: string;
	description: string;
	title: string;
	cookingTime: number;
	portions: number;
	likesCount: number;
};

export type featuredCardProps = {
	recipe: RecipeCardProps;
};

export type recipeStep = {
	_id?: string;
	step: number;
	instructions: string;
};

export type recipeIngredient = {
	_id?: string;
	quantity: string;
	unit: string;
	ingredient: string;
};

export type recipeIngredientList = {
	ingredients: {
		_id?: string
		quantity: string;
		unit: string;
		name: string;
	}[];
};

export type recipeInstructionListTypes = {
	instructions: {
		_id?: string;
		description: string;
		step: number;
	}[];
};