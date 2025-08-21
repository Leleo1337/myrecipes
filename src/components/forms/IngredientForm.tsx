import { Plus, X } from 'lucide-react';
import type { recipeForm } from '../../types/recipes';

export type addIngredientFormProps = {
	recipeForm: recipeForm;
	addIngredient: () => void;
	removeIngredient: (index: number) => void;
	handleIngredientChange: (index: number, field: any, value: any) => void;
};

export default function IngredientForm({ recipeForm, addIngredient, removeIngredient, handleIngredientChange }: addIngredientFormProps) {
	return (
		<>
			<section className='container max-w-[900px] mx-auto py-6 px-4 md:px-6 bg-white border border-slate-300 rounded-md shadow-xs mt-8'>
				<div className='flex pb-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<h1 className='text-2xl font-semibold'>Ingredientes</h1>
					<button
						className='flex gap-1 cursor-pointer text-emerald-600 hover:text-emerald-700'
						onClick={addIngredient}>
						<Plus />
						<span>Adicionar Ingrediente</span>
					</button>
				</div>
				{recipeForm.ingredients.map((ingredient, index) => (
					<div
						key={index}
						className='flex flex-col md:flex-row items-start md:items-center gap-4 p-4'>
						<div className='flex flex-col w-full gap-0.5'>
							<label className='text-xs text-gray-500 font-semibold'>Ingrediente</label>
							<input
								type='text'
								name='ingredient'
								id='ingredient'
								placeholder='açucar'
								autoComplete='off'
								value={ingredient.name}
								required
								onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
								className='px-4 py-2.5 border rounded-md bg-slate-50 border-slate-300 placeholder:text-sm placeholder:text-gray-300'
							/>
						</div>
						<div className='flex flex-col w-full gap-0.5'>
							<label className='text-xs text-gray-500 font-semibold'>quantidade</label>
							<input
								type='text'
								name='quantity'
								id='quantity'
								autoComplete='off'
								placeholder='2'
								value={ingredient.quantity}
								onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
								required
								className='px-4 py-2.5 border rounded-md bg-slate-50 border-slate-300 placeholder:text-sm placeholder:text-gray-300'
							/>
						</div>
						<div>
							<X
								className={`${index === 0 ? 'hover:cursor-not-allowed text-gray-500 hover:text-gray-400' : 'cursor-pointer text-red-500 hover:text-red-600'} hover:scale-110 transition ease-in duration-75 sm:mt-4`}
								onClick={() => removeIngredient(index)}
							/>
						</div>
					</div>
				))}
			</section>
		</>
	);
}
