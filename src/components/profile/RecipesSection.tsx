import { ChefHat, Heart, Loader2 } from 'lucide-react';
import RecipeCard from '../recipes/RecipeCard';
import { useEffect, useState } from 'react';
import type { RecipeCardProps } from '../../types/components/recipes';
import { useNavigate } from 'react-router';
import { fetchUserCreatedRecipes, fetchUserLikedRecipes } from '../../services/recipes';
import { toast } from 'sonner';
import PaginationButtons from '../ui/PaginationButtons';

export default function RecipesSection({ isLoggedInUserProfileOwner, userID }: { isLoggedInUserProfileOwner: boolean; userID: string }) {
	const [likedRecipes, setLikedRecipes] = useState<RecipeCardProps[]>([]);
	const [createdRecipes, setCreatedRecipes] = useState<RecipeCardProps[]>([]);
	const [recipesLength, setRecipesLength] = useState({ created: 0, liked: 0 });
	const [activeTab, setActiveTab] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [pageIndex, setPageIndex] = useState({ created: { index: 1 }, liked: { index: 1 } });
	const [pageLimit, setPageLimit] = useState({ created: { index: 1 }, liked: { index: 1 } });

	const navigate = useNavigate();

	async function handleFetchLiked(page?: number) {
		setIsLoading(true);
		setCreatedRecipes([]);
		try {
			const data = await fetchUserCreatedRecipes(userID, page);
			const pageLimit = Math.ceil(data.total / data.limit);
			setLikedRecipes(data.data);
			setRecipesLength((prev) => ({ ...prev, liked: data.total }));
			setPageLimit((prev) => ({ ...prev, liked: { index: pageLimit } }));
		} catch (error) {
			toast.error('algo deu errado');
		} finally {
			setIsLoading(false);
		}
	}

	async function handleFetchCreated(page?: number) {
		setIsLoading(true);
		setCreatedRecipes([]);
		try {
			const data = await fetchUserLikedRecipes(userID, page);
			const pageLimit = Math.ceil(data.total / data.limit);
			setCreatedRecipes(data.data);
			setRecipesLength((prev) => ({ ...prev, created: data.total }));
			setPageLimit((prev) => ({ ...prev, created: { index: pageLimit } }));
		} catch (error) {
			toast.error('algo deu errado');
		} finally {
			setIsLoading(false);
		}
	}

	function nextPage(key: keyof typeof pageIndex) {
		if (pageIndex[key].index < pageLimit[key].index) {
			setPageIndex((prev) => ({ ...prev, [key]: { index: prev[key].index + 1 } }));
		}
	}

	function prevPage(page: keyof typeof pageIndex) {
		if (pageIndex[page].index > 1) {
			setPageIndex((prev) => ({ ...prev, [page]: { index: prev[page].index - 1 } }));
		}
	}

	useEffect(() => {
		if (!userID) return;
		setPageIndex({ created: { index: 1 }, liked: { index: 1 } });
		handleFetchCreated(1);
		handleFetchLiked(1);
	}, [userID]);

	useEffect(() => {
		if (!userID) return;
		handleFetchCreated(pageIndex.created.index);
	}, [pageIndex.created.index, userID]);

	useEffect(() => {
		if (!userID) return;
		handleFetchLiked(pageIndex.liked.index);
	}, [pageIndex.liked.index, userID]);

	return (
		<section className='container p-4 mx-auto mt-4 bg-white border rounded-md shadow-xs md:px-6 border-slate-300'>
			<div className='border-b border-gray-300'>
				<div className='flex gap-8'>
					<button
						onClick={() => setActiveTab(1)}
						className={`flex gap-2 px-1 py-2 text-sm items-center font-medium transition-colors border-b-2 cursor-pointer ${activeTab === 1 ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} `}>
						<ChefHat className='hidden sm:block' />
						<p>{isLoggedInUserProfileOwner ? 'Minhas receitas' : 'Receitas criadas'} </p>
						<span>({recipesLength.created})</span>
					</button>
					<button
						onClick={() => setActiveTab(2)}
						className={`flex gap-2 px-1 py-2 text-sm font-medium transition-colors border-b-2 items-center cursor-pointer ${activeTab === 2 ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} `}>
						<Heart className='hidden sm:block' />
						<p>receitas curtidas </p>
						<span>({recipesLength.liked})</span>
					</button>
				</div>
			</div>
			<div className='py-4'>
				{isLoading && (
					<div className='flex items-center justify-center my-16'>
						<Loader2
							size={64}
							className='animate-spin text-emerald-600'
						/>
					</div>
				)}
				{activeTab === 1 && createdRecipes.length > 0 ? (
					<>
						<div className='sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:grid'>
							{createdRecipes.map((recipe) => (
								<RecipeCard
									key={recipe._id}
									_id={recipe._id}
									category={recipe.category}
									cookingTime={recipe.cookingTime}
									createdBy={recipe.createdBy}
									description={recipe.description}
									difficulty={recipe.difficulty}
									image={recipe.image}
									likesCount={recipe.likesCount}
									portions={recipe.portions}
									title={recipe.title}
								/>
							))}
						</div>
						<div>
							<PaginationButtons
								prevPage={() => prevPage('created')}
								nextPage={() => nextPage('created')}
								pageIndex={pageIndex.created.index}
								pageLimit={pageLimit.created.index}
								size='medium'
							/>
						</div>
					</>
				) : activeTab === 2 && likedRecipes.length > 0 ? (
					<>
						<div className='sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:grid'>
							{likedRecipes.map((recipe) => (
								<RecipeCard
									key={recipe._id}
									_id={recipe._id}
									category={recipe.category}
									cookingTime={recipe.cookingTime}
									createdBy={recipe.createdBy}
									description={recipe.description}
									difficulty={recipe.difficulty}
									image={recipe.image}
									likesCount={recipe.likesCount}
									portions={recipe.portions}
									title={recipe.title}
								/>
							))}
						</div>
						<div>
							<PaginationButtons
								prevPage={() => prevPage('liked')}
								nextPage={() => nextPage('liked')}
								pageIndex={pageIndex.liked.index}
								pageLimit={pageLimit.liked.index}
								size='medium'
							/>
						</div>
					</>
				) : isLoggedInUserProfileOwner && !isLoading ? (
					<div className='flex flex-col items-center justify-center py-16 text-center text-gray-700 grid-0'>
						{activeTab === 1 ? (
							<ChefHat
								size={64}
								className='text-emerald-600'
							/>
						) : (
							<Heart
								size={64}
								className='text-emerald-600'
							/>
						)}
						<span>Você não {activeTab === 1 ? 'Criou' : 'Curtiu'} nenhuma receita ainda!</span>
						<div className='flex gap-1'>
							{activeTab === 1 && <p>Você pode criar uma</p>}
							<button
								onClick={() => navigate(activeTab === 1 ? '/recipes/create' : '/recipes')}
								className='font-semibold underline cursor-pointer hover:text-emerald-700 text-emerald-600'>
								{activeTab === 1 ? 'Aqui!' : 'Explore receitas!'}
							</button>
						</div>
					</div>
				) : (
					!isLoading && (
						<div className='flex flex-col items-center justify-center gap-2 py-16 text-center grid-0'>
							<Heart
								size={64}
								className='text-emerald-600'
							/>
							<span className='text-gray-700'>Esse usuario não curtiu nenhuma receita!</span>
						</div>
					)
				)}
			</div>
		</section>
	);
}
