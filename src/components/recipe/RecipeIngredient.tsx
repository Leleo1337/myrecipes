import type { recipeIngredient } from "../../types/components/recipes";

export default function RecipeIngredient({ quantity, unit, ingredient }: recipeIngredient) {
	return (
		<>
			<li className='flex items-center gap-2 px-2 py-3 bg-slate-50 rounded-2xl'>
				<div className='w-2 h-2 rounded-full bg-emerald-500'></div>
				<p className='text-sm font-semibold text-gray-900'>
					<span className='font-bold'>{quantity}{unit}</span> de {ingredient}
				</p>
			</li>
		</>
	);
}
