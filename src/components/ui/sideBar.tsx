import { ChefHat, HomeIcon, LogOut, Plus, Search, User, X } from 'lucide-react';
import type { sideBarProps } from '../../types/components/UI';
import AuthButtons from '../recipes/AuthButtons';
import { Link, useLocation } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../../context/auth';
import UserContext from '../../context/user';
import Avatar from 'react-avatar';

export default function SideBar({ toggle, open }: sideBarProps) {
	const auth = useContext(AuthContext);
	const user = useContext(UserContext);
	const location = useLocation();

	if (!auth || !user) throw new Error('Usuario não encontrado');
	const { isAuthenticated, logOut } = auth;
	const { username, profilePicture } = user;

	function getActiveTabIndex() {
		if (location.pathname === '/recipes') return 1;
		if (location.pathname === '/recipes/create') return 2;
		if (location.pathname === '/my-recipes') return 3;
		return 0;
	}

	const activeTab = getActiveTabIndex();

	return (
		<>
			<header>
				<div
					className={`fixed z-20 right-0 w-[85%] max-w-[300px] bg-white h-screen shadow-md transition-transform duration-300 ease-in-out md:hidden
                        ${open ? 'translate-x-0' : 'translate-x-full'}
                    `}>
					<div className='relative top-0 w-full py-4 border-b pb border-gray-500/20'>
						<div className='flex flex-col items-center gap-2'>
							<div className='flex gap-0.5 items-center justify-between px-4'>
								<div className='relative p-2 text-white bottom-1 bg-emerald-600 rounded-xl'>
									<ChefHat size={24} />
								</div>
								<div className='flex flex-col px-2'>
									<span className='text-xl font-bold'>myRecipes</span>
									<p className='text-xs text-gray-600'>Nossa comunidade de receitas!</p>
								</div>
								<div className='relative p-1 bg-gray-100 rounded-md shadow bottom-2'>
									<X
										size={24}
										onClick={toggle}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-4 mt-8'>
						<Link
							to={'/'}
							className={`${
								activeTab === 0
									? 'bg-emerald-600 w-full text-white font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
									: 'w-full text-gray-600 border border-gray-300 font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
							}`}>
							<div className='flex items-center gap-2'>
								<HomeIcon size={20} />
								<span>Início</span>
							</div>
						</Link>
						<Link
							to={'/recipes'}
							className={`${
								activeTab === 1
									? 'bg-emerald-600 w-full text-white font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
									: 'w-full text-gray-600 border border-gray-300 font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
							}`}>
							<div className='flex items-center gap-2'>
								<ChefHat size={20} />
								<span>Receitas</span>
							</div>
						</Link>
						{isAuthenticated && (
							<>
								<Link
									to={'/recipes/create'}
									className={`${
										activeTab === 2
											? 'bg-emerald-600 w-full text-white font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
											: 'w-full text-gray-600 border border-gray-300 font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
									}`}>
									<div className='flex items-center gap-2'>
										<Plus size={20} />
										<span>Criar</span>
									</div>
								</Link>
								<Link
									to={'/recipes/my-recipes'}
									className={`${
										activeTab === 3
											? 'bg-emerald-600 w-full text-white font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
											: 'w-full text-gray-600 border border-gray-300 font-semibold text-xl ml-2 rounded-l-2xl px-4 py-2'
									}`}>
									<div className='flex items-center gap-2'>
										<Search size={20} />
										<span>Minhas receitas</span>
									</div>
								</Link>
							</>
						)}
					</div>
					<div className='absolute bottom-0 w-full py-3 border-t z-2 border-t-gray-500/20'>
						<div className='flex flex-col px-2'>
							{isAuthenticated ? (
								<div>
									<div className='flex justify-between w-full p-3 my-2 border bg-emerald-600/10 border-emerald-600/30 rounded-xl'>
										<div className='flex items-center'>
											<div>
												{profilePicture ? (
													<img
														src={profilePicture}
														alt='pfp'
														className='w-10 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
													/>
												) : (
													<Avatar
														name={'createdBy'}
														size='36'
														className='mr-2 text-xs rounded-full outline-1 outline-green-500/80'
													/>
												)}
											</div>
											<div className='flex flex-col'>
												<span className='overflow-hidden text-base font-semibold truncate'>{username}</span>
												<span className='text-xs'>{"email"}</span>
											</div>
										</div>
										<Link
											to={'/profile'}
											className='flex items-center'>
											<User size={20} />
											<span className='text-sm'>Profile</span>
										</Link>
									</div>
									<div>
										<button onClick={logOut} className='flex items-center justify-center w-full gap-2 p-2 my-2 text-gray-700 border bg-gray-500/10 border-gray-500/30 rounded-xl'>
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
			</header>
		</>
	);
}
