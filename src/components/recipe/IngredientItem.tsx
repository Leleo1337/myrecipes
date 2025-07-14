export type ingredientProps = {
	unity: string;
	ingredient: string;
};

export default function IngredientItem({ unity, ingredient }: ingredientProps) {
	return (
		<>
			<li className='flex items-center gap-2 px-2 py-3 bg-slate-50 rounded-2xl'>
				<div className='w-2 h-2 rounded-full bg-emerald-500'></div>
				<p className='text-sm font-semibold text-gray-900'>
					<span className='font-bold'>{unity}</span> de {ingredient}
				</p>
			</li>
		</>
	);
}
