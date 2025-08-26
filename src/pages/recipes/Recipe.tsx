import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import UserContext from '../../context/user';
import type { recipe } from '../../types/recipes';
import { fetchRecipe } from '../../services/recipes';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import RecipeHeader from '../../components/recipe/RecipeHeader';
import BigLoader from '../../components/ui/BigLoader';
import RecipeHero from '../../components/recipe/RecipeHero';
import RecipeStats from '../../components/recipe/RecipeStats';
import RecipeIngredients from '../../components/recipe/RecipeIngredients';
import RecipeInstructions from '../../components/recipe/RecipeInstructions';
import RecipeComments from '../../components/recipe/RecipeComments';
import RecipeVideo from '../../components/recipe/RecipeVideo';

export default function Recipe() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [currentRecipe, setCurrentRecipe] = useState<recipe>();
	const [isPageLoading, setIsPageLoading] = useState(false);
	const navigate = useNavigate();
	const params = useParams();
	const user = useContext(UserContext);

	if (!user) throw new Error('Erro ao buscar usuario');

	const isRecipeCreatedByLoggedInUser = currentRecipe?.createdBy._id == user.userID;

	async function getRecipeData() {
		const recipeID = params.id!;
		setIsPageLoading(true);
		try {
			const recipe = await fetchRecipe(recipeID);
			setCurrentRecipe(recipe.data);
			setIsPageLoading(false);
		} catch (error) {
			navigate('/recipes');
			toast.error('Receita não encontrada!');
			return;
		}
	}

	useEffect(() => {
		getRecipeData();
	}, []);

	if (isPageLoading || !currentRecipe) {
		return <BigLoader color='emerald' />;
	}

	return (
		<>
			{sidebarOpen && (
				<div
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='fixed inset-0 z-3 bg-black/70 md:hidden'></div>
			)}
			<header>
				<Header toggleSide={() => setSidebarOpen(!sidebarOpen)} />
				<SideBar
					toggle={() => setSidebarOpen(!sidebarOpen)}
					open={sidebarOpen}
				/>
				<RecipeHeader
					recipeID={currentRecipe._id}
					isCreatedByLoggedInUser={isRecipeCreatedByLoggedInUser}
				/>
			</header>
			<main className='relative w-full pb-12 top-40 '>
				<section className='container max-w-[900px] mx-auto px-4'>
					<div>
						<div className='bg-white shadow rounded-2xl'>
							<RecipeHero
								image={currentRecipe.image}
								title={currentRecipe.title}
								description={currentRecipe.description}
							/>
							<div className='px-4 py-6 md:px-6'>
								<RecipeStats
									recipeID={currentRecipe._id}
									createdBy={currentRecipe.createdBy}
									cookingTime={currentRecipe.cookingTime}
									difficulty={currentRecipe.difficulty}
									portions={currentRecipe.portions}
									commentsCount={currentRecipe.commentsCount}
								/>
							</div>
						</div>
						{currentRecipe.videoUrl && <RecipeVideo url={currentRecipe.videoUrl} />}
						<div className='flex flex-col grid-cols-2 gap-8 mt-8 sm:grid gap-y-6'>
							<RecipeIngredients ingredients={currentRecipe.ingredients} />
							<RecipeInstructions instructions={currentRecipe.instructions} />
						</div>
						<div className='pt-8'>
							<div className='p-4 bg-white shadow rounded-2xl md:p-6'>
								<RecipeComments />
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
