import { ChefHat, Heart, Loader2 } from 'lucide-react';
import RecipeCard from '../recipes/RecipeCard';
import { useEffect, useState } from 'react';
import type { RecipeCardProps } from '../../types/components/recipes';
import { useNavigate } from 'react-router';
import { getUserCreatedRecipes, getUserLikedRecipes } from '../../services/recipes';
import { toast } from 'sonner';

export default function RecipesSection({ isLoggedInUserProfileOwner, userID }: { isLoggedInUserProfileOwner: boolean; userID: string }) {
	const [likedRecipes, setLikedRecipes] = useState<RecipeCardProps[]>([]);
	const [createdRecipes, setCreatedRecipes] = useState<RecipeCardProps[]>([]);
	const [activeTab, setActiveTab] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	async function handleFetchLiked() {
		try {
			setIsLoading(true);
			const data = await getUserLikedRecipes(userID);
			setLikedRecipes(data);
			setIsLoading(false);
		} catch (error) {
			toast.error('algo deu errado');
			setIsLoading(false);
		}
	}

	async function handleFetchCreated() {
		try {
			setIsLoading(true);
			const data = await getUserCreatedRecipes(userID);
			setCreatedRecipes(data);
			setIsLoading(false);
		} catch (error) {
			toast.error('algo deu errado');
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (userID) {
			handleFetchLiked();
			handleFetchCreated();
		}
	}, [userID]);

	return (
		<section className='container p-4 mx-auto mt-4 bg-white border rounded-md shadow-xs md:px-6 border-slate-300'>
			<div className='border-b border-gray-300'>
				<div className='flex space-x-8'>
					<button
						onClick={() => setActiveTab(1)}
						className={`flex gap-2 px-1 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${activeTab === 1 ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} `}>
						<ChefHat />
						<p>{isLoggedInUserProfileOwner ? 'Minhas receitas' : 'Receitas criadas'} </p>
						<span>({createdRecipes.length})</span>
					</button>
					<button
						onClick={() => setActiveTab(2)}
						className={`flex gap-2 px-1 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${activeTab === 2 ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} `}>
						<Heart />
						<p>receitas curtidas </p>
						<span>({likedRecipes.length})</span>
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
					<div className='grid grid-cols-4 gap-4'>
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
				) : activeTab === 2 && likedRecipes.length > 0 ? (
					likedRecipes.map((recipe) => (
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
					))
				) : isLoggedInUserProfileOwner && !isLoading ? (
					<div className='flex flex-col items-center justify-center py-16 text-center grid-0 text-gray-700'>
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
						<div className='flex flex-col gap-2 items-center justify-center py-16 text-center grid-0'>
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
