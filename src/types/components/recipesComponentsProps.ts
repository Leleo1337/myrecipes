export type RecipeCardProps = {
	id: string;
	difficulty: 'Facil' | 'Medio' | 'Dificil';
	category: string;
	image: string;
	description: string;
	title: string;
	cookTime: number;
	portions: number;
    likesCount: number
};

export type stepListItemProps = {
	step: number;
	instructions: string;
};

export type ingredientListProps = {
    quantity: string
	unity: string;
	ingredient: string;
};
