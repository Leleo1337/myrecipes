import { Link, useLocation } from 'react-router';
import { ChefHat, HomeIcon, LogOut, Menu, Plus, Search, User } from 'lucide-react';
import type { headerProps } from '../../types/components/UI';
import AuthButtons from '../recipes/AuthButtons';
import { useContext } from 'react';
import AuthContext from '../../context/auth';
import UserContext from '../../context/user';
import Avatar from 'react-avatar';

export default function Header({ toggleSide }: headerProps) {
	const auth = useContext(AuthContext);
	const user = useContext(UserContext);
	const location = useLocation();

	if (!auth || !user) throw new Error('Usuario não encontrado');
	const { isAuthenticated, logOut } = auth;
	const { username, profilePicture } = user;

	function getActiveTabIndex() {
		if (location.pathname === '/recipes') return 1;
		if (location.pathname === '/recipes/create') return 2;
		if (location.pathname === `/user/${user?.userID}/profile`) return 3;
		return 0;
	}
	const activeTab = getActiveTabIndex();

	return (
		<div className='fixed top-0 w-full bg-white z-2 drop-shadow'>
			<div className='container max-w-[1400px] items-center justify-between px-4 py-2 pb-3 mx-auto md:flex'>
				<div className='flex items-center justify-between gap-2'>
					<div className='flex items-center'>
						<div className='p-2 bg-emerald-600 rounded-xl'>
							<ChefHat
								color='white'
								size={24}
							/>
						</div>
						<Link
							to={'/'}
							className='flex flex-col px-2'>
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
						className={`
								flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
						}`}>
						<HomeIcon size={16} />
						<span>Início</span>
					</Link>
					<Link
						to={'/recipes'}
						className={`${
							activeTab === 1
								? 'flex items-center gap-1 bg-emerald-600 font-semibold text-white px-3 py-1.5 rounded-xl shadow-md cursor-pointer'
								: 'flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
						}`}>
						<Search size={16} />
						<span>Explorar</span>
					</Link>
					{isAuthenticated && (
						<>
							<Link
								to={'/recipes/create'}
								className={`${
									activeTab === 2
										? 'flex items-center gap-1 bg-emerald-600 font-semibold text-white px-3 py-1.5 rounded-xl shadow-md cursor-pointer'
										: 'flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
								}`}>
								<Plus size={16} />
								<span>Criar</span>
							</Link>{' '}
							<Link
								to={`/user/${user.userID}/profile`}
								className={`${
									activeTab === 3
										? 'flex items-center gap-1 bg-emerald-600 font-semibold text-white px-3 py-1.5 rounded-xl shadow-md cursor-pointer'
										: 'flex items-center gap-1 font-semibold text-gray-500 hover:text-gray-600 transition ease-in duration-100 cursor-pointer'
								}`}>
								<User size={16} />
								<span>Perfil</span>
							</Link>
						</>
					)}
				</div>
				<div className='hidden md:flex'>
					{isAuthenticated ? (
						<div className='flex items-center gap-2'>
							<div className='items-center hidden w-full px-3 border h-9 lg:flex bg-emerald-600/10 border-emerald-600/10 rounded-xl'>
								<div>
									{profilePicture ? (
										<img
											src={profilePicture}
											alt='pfp'
											className='w-6 h-6 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
										/>
									) : (
										<Avatar
											name={username}
											size='24'
											className='mr-2 text-xs rounded-full outline-1 outline-green-500/80'
										/>
									)}
								</div>
								<div className='flex flex-col'>
									<span className='text-xs font-semibold'>{username}</span>
								</div>
							</div>
							<div>
								<button
									onClick={logOut}
									className='flex items-center justify-center gap-2 p-2 my-2 text-red-700 cursor-pointer hover:text-red-800'>
									<LogOut />
									<span>Sair</span>
								</button>
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
