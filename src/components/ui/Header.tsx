import { Link, useLocation } from 'react-router';
import { ChefHat, HomeIcon, LogOut, Menu, Plus, Search, User } from 'lucide-react';
import AuthButtons from '../recipes/AuthButtons';
import image from '../../assets/anime.png';

export default function Header({ toggleSide }: any) {
	const isAuth = false;
	const location = useLocation();

	function getActiveTabIndex() {
		if (location.pathname === '/recipes') return 1;
		if (location.pathname === '/recipes/create') return 2;
		if (location.pathname === '/my-recipes') return 3;
		return 0;
	}

	const activeTab = getActiveTabIndex();
	console.log(activeTab);

	return (
		<div className='fixed top-0 block w-full bg-white z-1 drop-shadow'>
			<div className='container max-w-[1400px] mx-auto md:flex justify-between items-center py-1 px-4'>
				<div className='flex items-center justify-between gap-2'>
					<div className='flex items-center'>
						<div className='p-2 bg-emerald-600 rounded-xl'>
							<ChefHat
								color='white'
								size={24}
							/>
						</div>
						<Link to={'/'} className='flex flex-col px-2'>
							<span className='text-xl font-bold'>myRecipes</span>
							<p className='hidden text-xs text-gray-600 md:block'>Nossa comunidade de receitas!</p>
						</Link>
					</div>
					<div className='p-1 bg-gray-100 rounded-md shadow md:hidden'>
						<Menu
							size={24}
							onClick={toggleSide}
						/>
					</div>
				</div>
				<div className='hidden gap-4 md:flex'>
					<Link
						to={'/'}
						className={`${
							activeTab === 0
								? 'flex items-center gap-1 bg-emerald-600 font-semibold text-white px-4 py-2 rounded-xl shadow-md cursor-pointer'
								: 'flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
						}`}>
						<HomeIcon size={16} />
						<span>Início</span>
					</Link>
					<Link
						to={'/recipes'}
						className={`${
							activeTab === 1
								? 'flex items-center gap-1 bg-emerald-600 font-semibold text-white px-4 py-2 rounded-xl shadow-md cursor-pointer'
								: 'flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
						}`}>
						<Search size={16} />
						<span>Explorar</span>
					</Link>
					{isAuth && (
						<>
							<Link
								to={'/recipes/create'}
								className={`${
									activeTab === 2
										? 'flex items-center gap-1 bg-emerald-600 font-semibold text-white px-4 py-2 rounded-xl shadow-md cursor-pointer'
										: 'flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
								}`}>
								<Plus size={16} />
								<span>Criar</span>
							</Link>
							<Link
								to={'/recipes/my-recipes'}
								className={`${
									activeTab === 3
										? 'flex items-center gap-1 bg-emerald-600 font-semibold text-white px-4 py-2 rounded-xl shadow-md cursor-pointer'
										: 'flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
								}`}>
								<Search size={16} />
								<span>Minhas receitas</span>
							</Link>
						</>
					)}
				</div>
				<div className='hidden md:flex'>
					{isAuth ? (
						<div className='flex items-center gap-4'>
							<div className='items-center w-full px-3 border h-9 lg:flex bg-emerald-600/10 border-emerald-600/10 rounded-xl'>
								<div>
									<img
										src={image}
										alt='pfp'
										className='w-6 h-6 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
									/>
								</div>
								<div className='flex flex-col'>
									<span className='text-sm font-semibold'>admin</span>
								</div>
							</div>
							<Link to={'/user/profile'} className='flex items-center justify-center gap-2 font-semibold text-gray-600 cursor-pointer hover:text-gray-700'>
								<User />
								<span>Perfil</span>
							</Link>
							<div>
								<div className='flex items-center justify-center gap-2 p-2 my-2 text-red-700 cursor-pointer hover:text-red-800'>
									<LogOut />
									<span>Sair</span>
								</div>
							</div>
						</div>
					) : (
						<AuthButtons />
					)}
				</div>
			</div>
		</div>
	);
}
