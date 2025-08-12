import { useEffect, useState } from 'react';
import SideBar from '../../components/ui/sideBar';
import Header from '../../components/ui/Header';
import { Filter, Loader2, Search, TrendingUpIcon } from 'lucide-react';
import LargeFeaturedRecipe from '../../components/recipes/LargeFeaturedRecipe';
import SmallFeaturedRecipeCard from '../../components/recipes/SmallFeaturedRecipe';
import RecipeCard from '../../components/recipes/RecipeCard';
import type { recipe } from '../../types/recipes';
import { getAllRecipes, getFeaturedRecipes } from '../../services/recipes';
import PaginationButtons from '../../components/ui/PaginationButtons';

export default function Recipes() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [featured, setFeatured] = useState<recipe[]>([]);
	const [recipes, setRecipes] = useState<recipe[]>([]);
	const [isLoading, setIsloading] = useState(false);
	const [pageIndex, setPageIndex] = useState<number>(1);
	const [pageLimit, setPageLimit] = useState(0);

	async function fetchRecipes(page?: number) {
		setIsloading(true);
		try {
			const recipes = await getAllRecipes(page);
			const featuredRecipes = await getFeaturedRecipes();
			const pageLimit = Math.ceil(recipes.total / recipes.limit);
			setPageLimit(pageLimit);
			setRecipes(recipes.data);
			setFeatured(featuredRecipes);
		} catch (error) {
			console.log(error);
		} finally {
			setIsloading(false);
		}
	}

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	function nextPage() {
		if (pageIndex < pageLimit) {
			setPageIndex(pageIndex + 1);
		}
	}

	function prevPage() {
		if (pageIndex > 1) {
			setPageIndex(pageIndex - 1);
		}
	}

	useEffect(() => {
		fetchRecipes(pageIndex);
	}, [pageIndex]);

	return (
		<>
			{sidebarOpen && <div className='fixed inset-0 z-3 bg-black/70 md:hidden'></div>}
			<header>
				{/* Mobile Sidebar */}
				<SideBar
					toggle={handleSideBarToggle}
					open={sidebarOpen}
				/>
				<Header toggleSide={handleSideBarToggle} />
			</header>
			<main className='container max-w-[1400px] mx-auto px-4 relative top-18'>
				<section className='pb-8'>
					<div className='flex items-center gap-1 py-4'>
						<div className='relative p-2 text-white bg-emerald-600 bottom-1 rounded-xl'>
							<TrendingUpIcon size={30} />
						</div>
						<div className='flex flex-col px-2'>
							<h1 className='text-2xl font-bold'>Receitas Populares</h1>
							<p className='font-semibold text-gray-600'>As mais curtidas!</p>
						</div>
					</div>
					{isLoading && (
						<div className='flex items-center justify-center py-8'>
							<Loader2
								className='animate-spin text-emerald-600'
								size={64}
							/>
						</div>
					)}
					{featured.length > 2 && (
						<div className='flex flex-col grid-cols-2 gap-4 lg:grid'>
							<div className='row-span-2 lg:block'>
								<LargeFeaturedRecipe recipe={featured[0]} />
							</div>
							<SmallFeaturedRecipeCard recipe={featured[1]} />
							<SmallFeaturedRecipeCard recipe={featured[2]} />
						</div>
					)}
				</section>
				<section className='pb-4'>
					<div className='p-4 bg-white border border-gray-300 shadow-xs rounded-xl'>
						<div className='flex items-center gap-4'>
							<TrendingUpIcon
								className='text-emerald-600'
								size={22}
							/>
							<span className='text-lg font-semibold'>Explorar receitas</span>
						</div>
						<div className='flex flex-col gap-4 pt-4 md:flex-row'>
							<div className='relative w-full'>
								<input
									type='text'
									name='search'
									id='search'
									className='w-full p-4 pl-12 bg-gray-100 border border-gray-300 rounded-2xl outline-0 focus:ring focus:ring-emerald-600/60 '
								/>
								<Search className='absolute text-gray-500 top-4 left-4' />
							</div>
							<div className='flex flex-col gap-4'>
								<div className='flex items-center gap-4'>
									<label
										htmlFor='filter'
										className='hidden sm:block'>
										<Filter />
									</label>
									<select
										className='w-full px-6 py-4 border border-gray-300 md:w-auto rounded-2xl'
										name='filter'
										id='filter'>
										<option defaultChecked>Todas</option>
										<option value=''>Café da manha</option>
										<option value=''>Almoço</option>
										<option value=''>Jantar</option>
										<option value=''>Entrada</option>
										<option value=''>Prato Principal</option>
										<option value=''>Sobremesa</option>
										<option value=''>Bebida</option>
										<option value=''>Lanche</option>
									</select>
									<div>
										<button className='w-full px-8 py-4 text-white cursor-pointer md:w-auto bg-emerald-600 rounded-2xl hover:bg-emerald-700'>Buscar</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					{isLoading && (
						<div className='flex items-center justify-center w-full py-8'>
							<Loader2
								className='animate-spin text-emerald-600'
								size={64}
							/>
						</div>
					)}
					<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{recipes.map((recipes) => (
							<RecipeCard
								key={recipes._id}
								_id={recipes._id}
								createdBy={recipes.createdBy}
								category={recipes.category}
								cookingTime={recipes.cookingTime}
								description={recipes.description}
								likesCount={recipes.likesCount}
								difficulty={recipes.difficulty}
								image={recipes.image}
								portions={recipes.portions}
								title={recipes.title}
							/>
						))}
					</div>
					<div>
						<PaginationButtons
							prevPage={prevPage}
							nextPage={nextPage}
							pageIndex={pageIndex}
							pageLimit={pageLimit}
						/>
					</div>
				</section>
			</main>
		</>
	);
}
