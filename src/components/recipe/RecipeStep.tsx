import type { recipeStep  } from "../../types/components/recipes";

export default function RecipeStep({step, instructions}: recipeStep) {
	return (
		<li className='flex items-center'>
			<div className='flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold text-white rounded-full bg-emerald-600'>{step}</div>
			<p className='ml-3 text-sm text-gray-900'>{instructions}</p>
		</li>
	);
}
