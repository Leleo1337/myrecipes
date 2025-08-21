import { ChefHat } from 'lucide-react';
import RecipeIngredient from './RecipeIngredient';
import type { recipeIngredientList } from '../../types/components/recipes';

export default function RecipeIngredients({ ingredients }: recipeIngredientList) {
	return (
		<>
			<div className='p-4 bg-white shadow md:p-6 rounded-2xl'>
				<div className='flex items-center gap-2'>
					<div className='flex items-center p-2 bg-emerald-200/60 text-emerald-700 rounded-xl'>
						<ChefHat />
					</div>
					<h4 className='text-lg font-semibold'>Ingredientes</h4>
				</div>
				<div>
					<ul className='pt-4 space-y-2'>
						{ingredients.map((ingredient) => (
							<RecipeIngredient
								key={ingredient._id}
								quantity={ingredient.quantity}
								ingredient={ingredient.name}
							/>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
