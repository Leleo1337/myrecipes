import { useEffect, useState } from 'react';
import SideBar from '../../components/ui/sideBar';
import Header from '../../components/ui/Header';
import { Filter, Loader2, Search, TrendingUpIcon } from 'lucide-react';
import LargeFeaturedRecipe from '../../components/recipes/LargeFeaturedRecipe';
import SmallFeaturedRecipeCard from '../../components/recipes/SmallFeaturedRecipe';
import RecipeCard from '../../components/recipes/RecipeCard';
import type { recipe } from '../../types/recipes';
import { fetchAllRecipes, fetchFeaturedRecipes, fetchRecipeSearch } from '../../services/recipes';
import PaginationButtons from '../../components/ui/PaginationButtons';

export default function Recipes() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [featured, setFeatured] = useState<recipe[]>([]);
	const [recipes, setRecipes] = useState<recipe[]>([]);
	const [activeFilter, setActiveFilter] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsloading] = useState(false);
	const [pageIndex, setPageIndex] = useState<number>(1);
	const [pageLimit, setPageLimit] = useState(0);

	async function getRecipes(page?: number) {
		setIsloading(true);
		setRecipes([]);
		try {
			const recipes = await fetchAllRecipes(page);
			const featuredRecipes = await fetchFeaturedRecipes();
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

	async function handleSearch(query?: string) {
		const filters: any = {};
		filters.query = query;
		filters.category = activeFilter;

		const response = await fetchRecipeSearch(filters);
		setRecipes(response);
	}

	useEffect(() => {
		if (searchQuery === '' && activeFilter === '') {
			getRecipes();
			return;
		}
		const timeout = setTimeout(() => handleSearch(searchQuery), 500);
		return () => clearTimeout(timeout);
	}, [searchQuery, activeFilter]);

	useEffect(() => {
		getRecipes(pageIndex);
	}, [pageIndex]);

	return (
		<>
			{sidebarOpen && (
				<div
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='fixed inset-0 z-3 bg-black/70 md:hidden'></div>
			)}
			<header>
				{/* Mobile Sidebar */}
				<SideBar
					toggle={handleSideBarToggle}
					open={sidebarOpen}
				/>
				<Header toggleSide={handleSideBarToggle} />
			</header>
			<main className='container max-w-[1400px] mx-auto px-4 relative top-18 pb-12'>
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
									autoComplete='off'
									onChange={(e) => setSearchQuery(e.target.value)}
									className='w-full p-4 pl-12 bg-gray-100 border border-gray-300 rounded-2xl outline-0 focus:ring focus:ring-emerald-600/60 '
								/>
								<Search className='absolute text-gray-500 top-4 left-4' />
							</div>
							<div className='flex flex-col gap-4'>
								<div className='flex items-center gap-4'>
									<label
										htmlFor='filter'
										className={`hidden sm:block ${activeFilter === '' ? 'text-gray-600' : 'text-emerald-600'}`}>
										<Filter />
									</label>
									<select
										className={`w-full px-6 py-4 border md:w-auto rounded-2xl outline-0 ${activeFilter === '' ? 'border-gray-300' : 'border-emerald-600'}`}
										name='filter'
										id='filter'
										value={activeFilter}
										onChange={(e) => setActiveFilter(e.target.value)}>
										<option
											defaultChecked
											value=''>
											Todas
										</option>
										<option value='cafe da manha'>Café da manha</option>
										<option value='almoço'>Almoço</option>
										<option value='jantar'>Jantar</option>
										<option value='entrada'>Entrada</option>
										<option value='sobremesa'>Sobremesa</option>
										<option value='bebida'>Bebida</option>
										<option value='lanche'>Lanche</option>
										<option value='outro'>Outro</option>
									</select>
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
							size='medium'
						/>
					</div>
				</section>
			</main>
		</>
	);
}
