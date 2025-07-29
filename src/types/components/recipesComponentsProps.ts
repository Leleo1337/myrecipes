export type RecipeCardProps = {
	_id?: string;
	creatorProfilePicture: string;
	creatorUsername: string;
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
	step: number;
	instructions: string;
};

export type recipeIngredient = {
	quantity: string;
	unit: string;
	ingredient: string;
};
