export type RecipeCardProps = {
	_id?: string;
	difficulty: 'facil' | 'medio' | 'dificil';
	category: string;
	image: string;
	description: string;
	title: string;
	cookingTime: number;
	portions: number;
    likesCount: number
};

export type featuredCardProps = {
	recipe: RecipeCardProps
}

export type stepListItemProps = {
	step: number;
	instructions: string;
};

export type ingredientListProps = {
    quantity: string
	unity: string;
	ingredient: string;
};
