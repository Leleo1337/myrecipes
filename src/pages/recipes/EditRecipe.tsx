import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import type { recipeForm } from '../../types/recipes';
import generateImageLinkFromFile from '../../services/cloudinary';
import { deleteRecipe, fetchRecipe, updateRecipe } from '../../services/recipes';
import { toast } from 'sonner';
import BigLoader from '../../components/ui/BigLoader';
import { convertFileToBase64, isFileSupportedFileType } from '../../utils/fileHelpers';
import AddInstructionForm from '../../components/forms/InstructionForm';
import AddIngredientForm from '../../components/forms/IngredientForm';
import BasicInfoForm from '../../components/forms/BasicInfoForm';
import EditHeader from '../../components/edit/EditHeader';
import DeleteRecipeModal from '../../components/edit/DeleteRecipeModal';

const emptyRecipe = {
	image: '',
	title: '',
	description: '',
	category: 'cafe da manha',
	difficulty: 'facil',
	visibility: 'public',
	cookingTime: 1,
	portions: 1,
	ingredients: [{ _id: '', name: '', quantity: '' }],
	instructions: [{ _id: '', step: 1, description: '' }],
};

export default function EditRecipe() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [recipeForm, setRecipeForm] = useState<recipeForm>(emptyRecipe);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [publicRecipe, setPublicRecipe] = useState(true);
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [file, setFile] = useState<FileList | null>(null);
	const [isBigLoaderLoading, setIsBigLoaderLoading] = useState(false);
	const navigate = useNavigate();
	const { recipeID } = useParams();

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	async function getRecipeData() {
		try {
			const response = await fetchRecipe(recipeID!);
			setRecipeForm((prev) => ({
				...prev,
				category: response.data.category,
				cookingTime: response.data.cookingTime,
				description: response.data.description,
				difficulty: response.data.difficulty,
				image: response.data.image,
				portions: response.data.portions,
				title: response.data.title,
				ingredients: response.data.ingredients.map(({ _id, ...ingredient }: any) => ingredient),
				instructions: response.data.instructions.map(({ _id, ...instruction }: any) => instruction),
			}));
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSubmit() {
		try {
			const newImage = await generateImageLinkFromFile(file);
			let dataToSend = { ...recipeForm, image: newImage };
			const response = await updateRecipe(recipeID!, dataToSend);
			toast.success('Receita atualizada com sucesso!');
			setIsBigLoaderLoading(true);
			if (response) {
				setTimeout(() => {
					navigate(`/recipes/${recipeID!}`);
					setIsBigLoaderLoading(false);
				}, 1000);
			}
			setRecipeForm(emptyRecipe);
		} catch (error: any) {
			toast.error(error.response.data.msg);
		}
	}

	async function handleDelete() {
		try {
			await deleteRecipe(recipeID)
			toast.success('Receita deletada com sucesso')
			navigate('/recipes')
		} catch (error) {
			
		}
	}

	async function handleFileUpload(fileObj: FileList | null) {
		if (!fileObj) return;

		const file = fileObj[0];
		if (!isFileSupportedFileType(file)) return;
		setIsImageLoading(true);

		const base64Image = await convertFileToBase64(file);
		setRecipeForm((prev) => ({ ...prev, image: base64Image }));
		setIsImageLoading(false);
		setFile(fileObj);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) {
		const key = e.target.name;
		const val = e.target.value;

		setRecipeForm((prev: any) => ({ ...prev, [key]: val }));
	}

	function toggleVisibility() {
		setRecipeForm((prev) => ({ ...prev, visibility: prev.visibility === 'public' ? 'private' : 'public' }));
		setPublicRecipe(!publicRecipe);
	}

	function handleIngredientChange(index: number, field: string, value: string) {
		const updated = [...recipeForm.ingredients];
		updated[index][field as keyof (typeof updated)[number]] = value;

		setRecipeForm((prev) => ({ ...prev, ingredients: updated }));
	}

	function addIngredient() {
		setRecipeForm((prev) => ({ ...prev, ingredients: [...prev.ingredients, { name: '', quantity: '' }] }));
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
		getRecipeData();
	}, [recipeID]);
	
	return (
		<>
			{sidebarOpen && (
				<div
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='fixed inset-0 z-3 bg-black/70 md:hidden'></div>
			)}
			<header>
				<Header toggleSide={handleSideBarToggle} />
				<SideBar
					toggle={handleSideBarToggle}
					open={sidebarOpen}
				/>
				<EditHeader
					submitForm={handleSubmit}
					openModal={() => setDeleteModalOpen(true)}
				/>
			</header>
			{isBigLoaderLoading ? (
				<BigLoader color='emerald' />
			) : (
				<>
					<DeleteRecipeModal
						isModalOpen={deleteModalOpen}
						toggleModal={() => setDeleteModalOpen(!deleteModalOpen)}
						onDelete={handleDelete}
					/>
					<main className='relative w-full px-4 pb-12 top-40'>
						<BasicInfoForm
							recipeForm={recipeForm}
							isImageLoading={isImageLoading}
							publicForm={publicRecipe}
							handleChange={handleChange}
							handleFileUpload={handleFileUpload}
							handleSetPublicForm={toggleVisibility}
						/>
						<AddIngredientForm
							addIngredient={addIngredient}
							removeIngredient={removeIngredient}
							handleIngredientChange={handleIngredientChange}
							recipeForm={recipeForm}
						/>
						<AddInstructionForm
							addInstruction={addInstruction}
							removeInstruction={removeInstruction}
							handleInstructionChange={handleInstructionChange}
							recipeForm={recipeForm}
						/>
					</main>
				</>
			)}
		</>
	);
}
