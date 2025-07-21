export type RecipeCardProps = {
	id: string;
	difficulty: 'Facil' | 'Medio' | 'Dificil';
	category: string;
	image: string;
	description: string;
	title: string;
	cookTime: number;
	portions: number;
};

export type stepListItemProps = {
	step: number;
	instructions: string;
};

export type ingredientListProps = {
	unity: string;
	ingredient: string;
};
