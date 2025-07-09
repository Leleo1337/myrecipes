import { ChefHat, LogOut, User, X } from 'lucide-react';
import AuthButtons from './AuthButtons';
import image from '../../assets/anime.png';
import { Link } from 'react-router';

export default function SideBar({ toggle, open }: { toggle: () => void; open: boolean }) {
	const isAuth = true;
	return (
		<>
			<header>
				<div
					className={`fixed z-10 right-0 w-[85%] max-w-[300px] bg-white h-screen shadow-md transition-transform duration-300 ease-in-out md:hidden
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
					<div className='absolute bottom-0 w-full py-3 border-t z-2 border-t-gray-500/20'>
						<div className='flex flex-col px-2'>
							{isAuth ? (
								<div>
									<div className='flex justify-between w-full p-3 my-2 border bg-emerald-600/10 border-emerald-600/30 rounded-xl'>
										<div className='flex'>
											<div>
												<img
													src={image}
													alt='pfp'
													className='w-10 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
												/>
											</div>
											<div className='flex flex-col'>
												<span className='text-base font-semibold'>admin</span>
												<span className='text-xs'>admin@email.com</span>
											</div>
										</div>
										<Link to={'/profile'} className='flex items-center'>
											<User size={20}/>
											<span className='text-sm'>Profile</span>
										</Link>
									</div>
									<div>
										<div className='flex items-center justify-center w-full gap-2 p-2 my-2 text-gray-700 border bg-gray-500/10 border-gray-500/30 rounded-xl'>
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
			</header>
		</>
	);
}
