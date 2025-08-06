import { useContext, useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import UserContext from '../../context/user';
import Avatar from 'react-avatar';
import { getUserData } from '../../services/user';
import { useNavigate, useParams } from 'react-router';
import { CameraIcon, ChefHat, Heart } from 'lucide-react';
import RecipeCard from '../../components/recipes/RecipeCard';
import type { RecipeCardProps } from '../../types/components/recipesComponentsProps';
import { fetchTabRecipes } from '../../services/recipes';

export default function Profile() {
	const [profileData, setProfileData] = useState({
		_id: '686eb09877ecfb0ea5486ba1',
		profilePicture: '',
		name: '',
		email: '',
		bio: '	!',
		socialLinks: { instragram: '', facebook: '', discord: '' },
	});
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
	const [activeTab, setActiveTab] = useState(1);
	const user = useContext(UserContext);
	const navigate = useNavigate();
	const params = useParams();
	if (!user) throw new Error('Usuario não encontrado');

	const isLoggedInUserProfile = profileData._id == user.userID;

	async function handleFetchProfile() {
		try {
			const data = await getUserData(params.userID);
			setProfileData(data);
			await fetchData(data._id);
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchData(userID: string) {
		const data = await fetchTabRecipes(userID, activeTab);
		setRecipes(data);
	}

	useEffect(() => {
		handleFetchProfile();
	}, [params.userID]);

	useEffect(() => {
		if (profileData._id) {
			fetchData(profileData._id);
		}
	}, [activeTab, profileData._id]);

	return (
		<>
			<header>
				<Header toggleSide={() => setSidebarOpen(!sidebarOpen)} />
				<SideBar
					open={sidebarOpen}
					toggle={() => setSidebarOpen(!sidebarOpen)}
				/>
			</header>
			<main className='container max-w-[1400px] mx-auto px-4 relative top-24'>
				<section className='container px-4 py-6 mx-auto bg-white border rounded-md shadow-xs md:px-6 border-slate-300'>
					<div className='flex gap-4'>
						<div className='relative z-0 flex items-center justify-center w-24 h-24 bg-primary-100'>
							{profileData.profilePicture ? (
								<img
									src={profileData.profilePicture}
									alt='profile picture'
									className='object-cover w-full h-full rounded-full'
								/>
							) : (
								<Avatar
									name={profileData.name}
									className='object-cover w-full h-full rounded-full'
								/>
							)}
							<div className='absolute bottom-0 right-0 p-1 text-white transition duration-100 ease-in rounded-full cursor-pointer z-2 bg-emerald-600 hover:bg-emerald-700'>
								<CameraIcon />
							</div>
						</div>
						<div className='flex-1 space-y-1'>
							<h1 className='text-3xl font-semibold'>{profileData.name}</h1>
							<p className='text-gray-500'>{profileData.email ? profileData.email : profileData.name}</p>
							<p>{profileData.bio}</p>
						</div>
						<div className='grid grid-cols-3 gap-4'>
							<div className='flex flex-col items-center justify-center'>
								<span className='text-2xl font-semibold text-emerald-600'>{2}</span>
								<span className='text-gray-600'>receitas</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<span className='text-2xl font-semibold text-emerald-700'>{2}</span>
								<span className='text-gray-600'>curtidas</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<span className='text-2xl font-semibold text-red-600'>{2}</span>
								<span className='text-gray-600'>likes recebidos</span>
							</div>
						</div>
					</div>
				</section>
				<section className='container p-4 mx-auto mt-4 bg-white border rounded-md shadow-xs md:px-6 border-slate-300'>
					<div className='border-b border-gray-300'>
						<div className='flex space-x-8'>
							<button
								onClick={() => setActiveTab(1)}
								className={`flex gap-2 px-1 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${activeTab === 1 ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} `}>
								<ChefHat />
								<p>{isLoggedInUserProfile ? 'Minhas receitas' : 'Receitas criadas'} </p>
								<span>(0)</span>
							</button>
							<button
								onClick={() => setActiveTab(2)}
								className={`flex gap-2 px-1 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${activeTab === 2 ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} `}>
								<Heart />
								<p>receitas curtidas </p>
								<span>(0)</span>
							</button>
						</div>
					</div>
					<div className='py-4'>
						{recipes.length > 0 ? (
							<div className='grid grid-cols-4 gap-4'>
								{recipes.map((recipe) => (
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
						) : isLoggedInUserProfile ? (
							<div className='relative flex flex-col items-center justify-center py-16 text-center grid-0'>
								<ChefHat
									size={64}
									className='text-emerald-600'
								/>
								<span>Você não criou nenhuma receita ainda!</span>
								<p>
									Você pode criar uma
									<button
										onClick={() => navigate('/recipes/create')}
										className='font-semibold underline cursor-pointer hover:text-emerald-700 text-emerald-600'>
										aqui!
									</button>
								</p>
							</div>
						) : (
							<div></div>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
