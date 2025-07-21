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
