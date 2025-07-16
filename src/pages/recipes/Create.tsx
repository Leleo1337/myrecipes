import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Clock, Eye, EyeOff, ImageIcon, Loader2, Save, Users2 } from 'lucide-react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import generateLinkFromImage from '../../api/cloudinary';

type recipeForm = {
	image: string;
	title: string;
	description: string;
	category: string;
	difficulty: string;
	time: number;
	portions: number;
};
const emptyRecipe = { image: '', title: '', description: '', category: '', difficulty: 'Fácil', time: 0, portions: 0 };

export default function Create() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [recipeForm, setRecipeForm] = useState<recipeForm>(emptyRecipe);
	const [publicForm, setPublicForm] = useState(true);
	const [image, setImage] = useState('');
	const [isImageLoading, setIsImageLoading] = useState(false);

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) {
		const key = e.target.name;
		const val = e.target.value;

		setRecipeForm((prev: any) => ({ ...prev, [key]: val }));
	}

	async function handleFileUpload(fileObj: FileList | null) {
		if (!fileObj) return;
		setIsImageLoading(true);
		const imageLink = await generateLinkFromImage(fileObj);
		if (!imageLink) {
			window.alert('Imagem não suportada');
			return;
		}
		setIsImageLoading(false);
		setImage(imageLink);
		setRecipeForm((prev) => ({ ...prev, image: imageLink }));
	}

	useEffect(() => {
		console.log(recipeForm);
	}, [recipeForm]);

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
						<button className='flex items-center gap-2 px-4 py-2 text-sm text-white transition duration-75 ease-in rounded-md cursor-pointer bg-emerald-600 hover:bg-emerald-700'>
							<Save size={20} />
							<span>Publicar</span>
						</button>
					</div>
				</div>
			</header>
			<main className='relative w-full px-4 pb-12 top-40'>
				<section className='container max-w-[900px] mx-auto py-6 px-4 md:px-6 bg-white border border-slate-300 rounded-md shadow-xs'>
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
									<option value='Café da manha'>Café da manha</option>
									<option value='Almoço'>Almoço</option>
									<option value='Jantar'>Jantar</option>
									<option value='Entrada'>Entrada</option>
									<option value='Prato principal'>Prato principal</option>
									<option value='Sobremesa'>Sobremesa</option>
									<option value='Bebida'>Bebida</option>
									<option value='Lanche'>Lanche</option>
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
									<option value='Fácil'>Fácil</option>
									<option value='Medio'>Medio</option>
									<option value='Dificil'>Dificil</option>
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
						<div
							className={`relative w-full transition duration-75 ease-in border-2 border-dashed rounded-md cursor-pointer h-60 md:h-80 bg-slate-50 hover:bg-slate-100 ${image ? 'border-emerald-500' : 'border-slate-300'}`}>
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
									src={image}
									className='object-cover w-full h-full rounded-md brightness-60'
								/>
								<div className={`absolute flex items-center flex-col justify-center gap-4 text-gray-500 ${image && 'text-white'}`}>
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
			</main>
		</>
	);
}
