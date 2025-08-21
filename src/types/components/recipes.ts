export type RecipeCardProps = {
	_id?: string;
	createdBy: {
		name: string;
		profilePicture: string;
	};
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
	ingredient: string;
};

export type recipeIngredientList = {
	ingredients: {
		_id?: string;
		quantity: string;
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

export type recipeHeaderProps = {
	recipeID: string;
	isCreatedByLoggedInUser: boolean;
};

export type recipeStatsProps = {
	recipeID: string;
	cookingTime: number;
	portions: number;
	difficulty: string;
	createdBy: {
		_id: string;
		name: string;
		profilePicture: string;
	};
	commentsCount: number
};

export type recipeHeroProps = {
	image?: string;
	title: string;
	description: string;
};
