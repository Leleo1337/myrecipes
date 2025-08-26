import { Clock, Eye, EyeOff, ImageIcon, Loader2, Users2 } from 'lucide-react';
import type { basicInfoFormTypes } from '../../../types/components/forms';

export default function BasicInfoForm({ isImageLoading, handleFileUpload, recipeForm, handleChange, handleSetPublicForm, publicForm }: basicInfoFormTypes) {
	return (
		<>
			<section className='px-4 py-6 mx-auto bg-white border rounded-md shadow-xs md:px-6 border-slate-300'>
				<h1 className='pb-4 text-xl font-semibold'>Informações Básicas</h1>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-1'>
						<label
							htmlFor='title'
							className='text-sm font-semibold text-gray-800'>
							Título da Receita
						</label>
						<input
							type='text'
							name='title'
							id='title'
							onChange={handleChange}
							value={recipeForm.title}
							className='w-full px-4 py-3 transition duration-75 ease-in border rounded-md border-slate-300 outline-0 focus:ring ring-emerald-500'
							placeholder='Ex: Brigadeiro Gourmet'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label
							htmlFor='description'
							className='text-sm font-semibold text-gray-800'>
							Descrição
						</label>
						<textarea
							name='description'
							id='description'
							onChange={handleChange}
							value={recipeForm.description}
							className='w-full px-4 py-3 transition duration-75 ease-in border rounded-md border-slate-300 outline-0 focus:ring ring-emerald-500'></textarea>
					</div>
					<div className='grid-cols-2 gap-4 sm:grid'>
						<div className='flex flex-col gap-1'>
							<label
								htmlFor='category'
								className='text-sm font-semibold text-gray-800'>
								Categoria
							</label>
							<select
								name='category'
								id='category'
								onChange={handleChange}
								className='w-full px-4 py-3 transition duration-75 ease-in border rounded-md border-slate-300 outline-0 focus:ring ring-emerald-500'>
								<option
									value='cafe da manha'
									defaultValue={'cafe da manha'}>
									Café da manha
								</option>
								<option value='almoço'>Almoço</option>
								<option value='jantar'>Jantar</option>
								<option value='entrada'>Entrada</option>
								<option value='sobremesa'>Sobremesa</option>
								<option value='bebida'>Bebida</option>
								<option value='lanche'>Lanche</option>
								<option value='outro'>Outro</option>
							</select>
						</div>
						<div className='flex flex-col gap-1'>
							<label
								htmlFor='difficulty'
								className='text-sm font-semibold text-gray-800'>
								Dificuldade
							</label>
							<select
								name='difficulty'
								id='difficulty'
								onChange={handleChange}
								className='w-full px-4 py-3 transition duration-75 ease-in border rounded-md border-slate-300 outline-0 focus:ring ring-emerald-500'>
								<option value='facil'>Fácil</option>
								<option value='medio'>Medio</option>
								<option value='dificil'>Dificil</option>
							</select>
						</div>
					</div>
					<div className='grid-cols-3 gap-4 sm:grid'>
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm font-semibold text-gray-800'
								htmlFor='time'>
								Tempo (minutos)
							</label>
							<div className='relative'>
								<input
									type='number'
									name='cookingTime'
									id='cookingTime'
									onChange={handleChange}
									autoComplete='off'
									className='w-full px-4 py-3 border rounded-md border-slate-300 pl-9 outline-0 focus:ring ring-emerald-600'
									defaultValue={0}
								/>
								<Clock className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm font-semibold text-gray-800'
								htmlFor='portions'>
								Porções
							</label>
							<div className='relative'>
								<input
									type='number'
									name='portions'
									id='portions'
									onChange={handleChange}
									autoComplete='off'
									className='w-full px-4 py-3 border rounded-md border-slate-300 pl-9 outline-0 focus:ring ring-emerald-600'
									defaultValue={4}
								/>
								<Users2 className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<label
								className='text-sm font-semibold text-gray-800'
								htmlFor='visible'>
								Visibilidade
							</label>
							<button
								onClick={handleSetPublicForm}
								className={`w-full flex items-center gap-1 justify-center space-x-2 px-4 py-3 border rounded-lg transition-colors cursor-pointer ${publicForm ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-600 border-slate-300'}`}>
								{publicForm ? (
									<>
										<Eye />
										Pública
									</>
								) : (
									<>
										<EyeOff />
										Privada
									</>
								)}
							</button>
						</div>
					</div>
					<div
						className={`relative w-full transition duration-75 ease-in group border-2 border-dashed rounded-md cursor-pointer h-60 md:h-80 bg-slate-50 hover:bg-slate-100  ${recipeForm.image ? 'border-emerald-500' : 'border-slate-300'}`}>
						<input
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e.target.files)}
							type='file'
							id='image'
							name='image'
							className='hidden'></input>
						<label
							htmlFor='image'
							className='relative flex flex-col items-center justify-center w-full h-full cursor-pointer '>
							<img
								src={recipeForm.image ? recipeForm.image : undefined}
								className='object-cover w-full h-full transition-all duration-100 ease-in rounded-md group-hover:brightness-50'
							/>
							<div
								className={`${recipeForm.image && 'opacity-0'} absolute flex items-center flex-col justify-center gap-4 text-gray-500 ${recipeForm.image && 'text-white'} group-hover:opacity-100 transtion-all ease-in duration-100`}>
								{isImageLoading ? (
									<Loader2
										size={64}
										className='animate-spin'
									/>
								) : (
									<>
										<ImageIcon
											size={64}
											className='cursor-pointer'
										/>
										<span className='font-medium text-center'>Clique para selecionar uma imagem</span>
									</>
								)}
							</div>
						</label>
					</div>
				</div>
			</section>
		</>
	);
}
