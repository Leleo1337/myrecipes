export type recipeForm = {
	image: string;
	title: string;
	description: string;
	category: string;
	difficulty: string;
	time: number;
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

export type recipes = {
    _id: string
	image: string;
	title: string;
	description: string;
	category: string;
	difficulty: "Facil" | "Medio" | "Dificil";
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
    likesCount: number
};
