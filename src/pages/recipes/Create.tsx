import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Clock, Eye, EyeOff, ImageIcon, Loader2, Plus, Save, Users2, X } from 'lucide-react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';

type recipeForm = {
	image: string;
	title: string;
	description: string;
	category: string;
	difficulty: string;
	time: number;
	portions: number;
	ingredients: {
		name: string;
		quantity: string;
		unit: string;
	}[];
	instructions: {
		step: number;
		description: string;
	}[];
};

const emptyRecipe = {
	image: '',
	title: '',
	description: '',
	category: '',
	difficulty: 'Fácil',
	time: 0,
	portions: 0,
	ingredients: [{ name: '', quantity: '', unit: '' }],
	instructions: [{ step: 1, description: '' }],
};

export default function Create() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [recipeForm, setRecipeForm] = useState<recipeForm>(emptyRecipe);
	const [publicForm, setPublicForm] = useState(true);
	const [image, setImage] = useState('');
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [file, setFile] = useState<File | undefined>();

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	async function handleFileUpload(fileObj: FileList | null) {
		if (!fileObj) return;
		const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/apng'];
		if (!supportedTypes.includes(fileObj[0].type)) {
			window.alert('Arquivo não suportado');
			return;
		}

		setIsImageLoading(true);
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const base64 = fileReader.result;
			if (typeof base64 === 'string') {
				setImage(base64);
				setFile(fileObj[0]);
				setIsImageLoading(false);
			}
		};
		fileReader.readAsDataURL(fileObj[0]);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) {
		const key = e.target.name;
		const val = e.target.value;

		setRecipeForm((prev: any) => ({ ...prev, [key]: val }));
	}

	function handleIngredientChange(index: number, field: string, value: string) {
		const updated = [...recipeForm.ingredients];
		updated[index][field as keyof (typeof updated)[number]] = value;

		setRecipeForm((prev) => ({ ...prev, ingredients: updated }));
	}

	function addIngredient() {
		setRecipeForm((prev) => ({ ...prev, ingredients: [...prev.ingredients, { name: '', quantity: '', unit: '' }] }));
	}

	function removeIngredient(index: number) {
		if (index === 0) {
			return;
		}
		const ingredients = [...recipeForm.ingredients];
		ingredients.splice(index, 1);

		setRecipeForm((prev) => ({ ...prev, ingredients }));
	}

	function addInstruction() {
		const nextStep = recipeForm.instructions.length + 1;

		setRecipeForm((prev) => ({ ...prev, instructions: [...prev.instructions, { step: nextStep, description: '' }] }));
	}

	function handleInstructionChange(index: number, value: string) {
		const updated = [...recipeForm.instructions];
		updated[index].description = value;

		setRecipeForm((prev) => ({ ...prev, instructions: updated }));
	}

	function removeInstruction(index: number) {
		if (index === 0) {
			return;
		}
		const updated = [...recipeForm.instructions]
			.filter((instructions) => instructions.step - 1 !== index)
			.map((instructions, index) => ({ ...instructions, step: index + 1 }));

		setRecipeForm((prev) => ({ ...prev, instructions: updated }));
	}

	useEffect(() => {
		console.log(recipeForm);
		console.log(file);
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
									type='number'
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
							<div className='flex flex-col w-full gap-0.5'>
								<label className='text-xs text-gray-500 font-semibold'>unidade</label>
								<input
									type='text'
									name='unit'
									id='unit'
									placeholder='colheres de sopa'
									value={ingredient.unit}
									onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
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
			</main>
		</>
	);
}
