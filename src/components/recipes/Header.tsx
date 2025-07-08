import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChefHat, HomeIcon, LogOut, Menu, Plus, Search, User } from 'lucide-react';
import AuthButtons from './AuthButtons';
import image from '../../assets/anime.png';

export default function Header({ toggleSide }: any) {
	const [isAuth, setIsAuth] = useState(true);
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
		<div className='block fixed w-full top-0 bg-white px-4 py-2 drop-shadow-sm'>
			<div className='container max-w-[1400px] mx-auto md:flex justify-between items-center py-1'>
				<div className='flex justify-between items-center gap-2'>
					<div className='flex items-center'>
						<div className='p-2 bg-emerald-600 rounded-xl'>
							<ChefHat
								color='white'
								size={24}
							/>
						</div>
						<div className='flex flex-col px-2'>
							<span className='font-bold text-xl'>myRecipes</span>
							<p className='text-gray-600 text-xs hidden md:block'>Nossa comunidade de receitas!</p>
						</div>
					</div>
					<div className='bg-gray-100 p-1 rounded-md shadow'>
						<Menu
							size={24}
							className='md:hidden'
							onClick={toggleSide}
						/>
					</div>
				</div>
				<div className='hidden md:flex gap-4'>
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
						<div className='flex gap-4 items-center'>
							<div className='h-9 px-2 lg:flex items-center w-full bg-emerald-600/10 border border-emerald-600/10 rounded-xl'>
								<div>
									<img
										src={image}
										alt='pfp'
										className='w-6 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
									/>
								</div>
								<div className='flex flex-col'>
									<span className='font-semibold text-sm'>admin</span>
								</div>
							</div>
							<Link to={'/user/profile'} className='flex gap-2 items-center justify-center text-gray-60 font-semibold cursor-pointer'>
								<User />
								<span>Perfil</span>
							</Link>
							<div>
								<div className='flex gap-2 items-center justify-center text-red-700 my-2 p-2 cursor-pointer'>
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
