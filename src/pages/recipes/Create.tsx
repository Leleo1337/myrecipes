import { useState } from 'react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import { Link } from 'react-router';
import { ArrowLeft, Clock, Eye, EyeOff, Save, Users2 } from 'lucide-react';

export default function Create() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [publicForm, setPublicForm] = useState(true);

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}
	
	return (
		<>
			{sidebarOpen && <div className='fixed inset-0 z-3 bg-black/70 md:hidden'></div>}
			<header>
				<Header toggleSide={handleSideBarToggle} />
				<SideBar
					toggle={handleSideBarToggle}
					open={sidebarOpen}
				/>
				<div className='fixed w-full bg-white border-b shadow border-slate-300 top-12 md:top-16 z-2'>
					<div className='flex justify-between items-center container max-w-[900px] mx-auto py-2 px-4 md:py-3'>
						<Link
							to={'/recipes'}
							className='flex gap-1 text-gray-600 hover:text-gray-800'>
							<ArrowLeft />
							<span className='font-semibold'>Voltar</span>
						</Link>
						<button className='flex items-center gap-2 px-4 py-2 text-sm text-white transition duration-100 ease-in rounded-md cursor-pointer bg-emerald-600 hover:bg-emerald-700'>
							<Save size={20} />
							<span>Publicar</span>
						</button>
					</div>
				</div>
			</header>
			<main className='relative w-full px-4 pb-12 top-40'>
				<section className='container max-w-[900px] mx-auto py-6 md:px-6 bg-white border border-slate-300 rounded-md shadow-xs'>
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
									name='description'
									id='description'
									className='w-full px-4 py-3 transition duration-75 ease-in border rounded-md border-slate-300 outline-0 focus:ring ring-emerald-500'>
									<option value='cm'>Café da manha</option>
									<option value='am'>Almoço</option>
									<option value='jt'>Jantar</option>
									<option value='et'>Entrada</option>
									<option value='pp'>Prato principal</option>
									<option value='ss'>Sobremesa</option>
									<option value='bd'>Bebida</option>
									<option value='lc'>Lanche</option>
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
										name='time'
										id='time'
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
									onClick={() => setPublicForm(!publicForm)}
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
					</div>
				</section>
			</main>
		</>
	);
}
