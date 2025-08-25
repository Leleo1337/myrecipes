import { Plus, X } from 'lucide-react';
import type { addInstructionFormProps } from '../../types/components/forms';

export default function InstructionForm({ recipeForm, addInstruction, handleInstructionChange, removeInstruction }: addInstructionFormProps) {
	return (
		<>
			<section className='container max-w-[900px] mx-auto py-6 px-4 md:px-6 bg-white border border-slate-300 rounded-md shadow-xs mt-8'>
				<div className='flex pb-8 flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
					<h1 className='text-2xl font-semibold'>Modo de Preparo</h1>
					<button
						onClick={addInstruction}
						className='flex gap-1 cursor-pointer text-emerald-600 hover:text-emerald-700'>
						<Plus />
						<span>Adicionar Passo</span>
					</button>
				</div>
				<div>
					{recipeForm.instructions.map((ingredient, index) => (
						<div className='flex gap-4 space-y-4'>
							<div className='flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold text-white rounded-full bg-emerald-600'>
								{ingredient.step}
							</div>
							<textarea
								name='instructions'
								id='instructions'
								onChange={(e) => handleInstructionChange(index, e.target.value)}
								value={ingredient.description}
								className='bg-slate-50 border border-slate-300 w-full py-2 px-4 rounded-md'></textarea>
							<div>
								<X
									onClick={() => removeInstruction(index)}
									className={`${index === 0 ? 'hover:cursor-not-allowed text-gray-500 hover:text-gray-400' : 'cursor-pointer text-red-500 hover:text-red-600'} hover:scale-110 transition ease-in duration-75 mt-5`}
								/>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
