import type { recipeForm } from "../recipes";

export type basicInfoFormTypes = {
    recipeForm: recipeForm;
    handleFileUpload: (File: FileList | null) => Promise<void>;
    isImageLoading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    handleSetPublicForm: () => void;
    publicForm: boolean;
};

export type addIngredientFormProps = {
	recipeForm: recipeForm;
	addIngredient: () => void;
	removeIngredient: (index: number) => void;
	handleIngredientChange: (index: number, field: any, value: any) => void;
};

export type addInstructionFormProps = {
	recipeForm: recipeForm;
	addInstruction: () => void;
	handleInstructionChange: (index: number, value: any) => void;
	removeInstruction: (index: number) => void;
};