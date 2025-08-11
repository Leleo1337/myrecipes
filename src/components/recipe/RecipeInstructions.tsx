import { Star } from 'lucide-react';
import RecipeStep from './RecipeStep';
import type { recipeInstructionListTypes } from '../../types/components/recipes';

export default function RecipeInstructions({ instructions }: recipeInstructionListTypes) {
	return (
		<>
			<div className='p-4 bg-white shadow md:p-6 rounded-2xl'>
				<div className='flex items-center gap-2'>
					<div className='flex items-center p-2 bg-emerald-200/60 text-emerald-700 rounded-xl'>
						<Star />
					</div>
					<h4 className='text-lg font-semibold'>Modo de preparo</h4>
				</div>
				<div>
					<ul className='pt-4 space-y-4'>
						{instructions.map((instruction) => (
							<RecipeStep
								key={instruction._id}
								instructions={instruction.description}
								step={instruction.step}
							/>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
