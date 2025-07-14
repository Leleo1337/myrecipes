import { Link, useParams } from 'react-router';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import { useState } from 'react';
import { ArrowLeft, ChefHat, Clock, Heart, MessageCircleIcon, Send, Share2, Shield, Star, Users2 } from 'lucide-react';
import pizza from '../../assets/pizza.jpg';
import image from '../../assets/anime.png';
import IngredientItem from '../../components/recipe/IngredientItem';
import StepsItem from '../../components/recipe/stepsItem';
import Comment from '../../components/recipe/Comment';

export default function Recipe() {
	const [like, setLike] = useState(false);
	const recipeID = useParams();
	const isAuth = true;

	const [sidebarOpen, setSidebarOpen] = useState(false);

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	console.log(recipeID);
	return (
		<>
			{sidebarOpen && <div className='fixed inset-0 z-2 bg-black/70 md:hidden'></div>}
			<header>
				<Header toggleSide={handleSideBarToggle} />
				<SideBar
					toggle={handleSideBarToggle}
					open={sidebarOpen}
				/>
				<div className='fixed w-full bg-white border-b border-gray-300 shadow top-12 md:top-16 z-2'>
					<div className='flex justify-between items-center container max-w-[900px] mx-auto py-2 px-4 md:py-3'>
						<Link
							to={'/recipes'}
							className='flex gap-1 text-gray-600 hover:text-gray-800'>
							<ArrowLeft />
							<span className='font-semibold'>Voltar</span>
						</Link>
						<Link
							to={'/recipes'}
							className='flex'>
							<Share2
								size={20}
								className='text-gray-600 hover:text-gray-800'
							/>
						</Link>
					</div>
				</div>
			</header>
			<main className='relative w-full pb-12 top-40 '>
				<section className='container max-w-[900px] mx-auto px-4'>
					<div>
						<div className='bg-white shadow rounded-2xl'>
							<div className='relative h-[35vh] md:h-[50vh]'>
								<img
									src={pizza}
									alt='food img'
									className='object-cover w-full h-full rounded-t-2xl brightness-95'
								/>
								<div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 to-transparent md:p-6'>
									<h1 className='text-2xl font-bold text-white'>RISOTO SIGMA AZUL</h1>
									<p className='text-white'>
										uma receita muito sigma de ingredientes betinhas e blablablabvla!das plpads lpsd lpsdplsd lpsd plslpd plsd lpasd lpasd lpplasd lpasdlpasd lp
									</p>
								</div>
							</div>
							<div className='px-4 py-6 md:px-6'>
								<div className='grid-cols-3 gap-4 pb-4 space-y-4 sm:grid'>
									<div className='flex items-center gap-3 p-3 transition duration-100 ease-in bg-gray-100 rounded-xl hover:scale-101 hover:ring ring-emerald-500/20'>
										<div className='p-2 bg-emerald-200/60 text-emerald-700 rounded-xl'>
											<Clock size={24} />
										</div>
										<div className='flex flex-col'>
											<h3 className='text-sm font-semibold'>tempo de preparo</h3>
											<span className='text-lg font-bold'>{45} min</span>
										</div>
									</div>
									<div className='flex items-center gap-3 p-3 transition duration-100 bg-gray-100 rounded-xl hover:scale-101 hover:ring ring-emerald-500/20'>
										<div className='p-2 bg-emerald-300/30 text-emerald-800 rounded-xl'>
											<Users2 size={24} />
										</div>
										<div className='flex flex-col'>
											<h3 className='text-sm font-semibold'>Porções</h3>
											<span className='text-lg font-bold'>4</span>
										</div>
									</div>
									<div className='flex items-center gap-3 p-3 pb-3 mb-4 transition duration-100 bg-gray-100 rounded-xl hover:scale-101 hover:ring ring-emerald-500/20'>
										<div className='p-2 text-yellow-600 bg-yellow-500/40 rounded-xl'>
											<Shield size={24} />
										</div>
										<div className='flex flex-col'>
											<h3 className='text-sm font-semibold'>Dificuldade</h3>
											<span className='text-lg font-bold'>{'facil'}</span>
										</div>
									</div>
								</div>
								<div className='flex items-center justify-between w-full px-3 pt-8 border-t border-gray-200'>
									<div className='flex items-center w-full gap-1'>
										<div>
											<img
												src={image}
												alt='pfp'
												className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
											/>
										</div>
										<div className='flex flex-col'>
											<span className='text-sm font-semibold'>admin</span>
											<span className='hidden text-xs text-gray-500 sm:block'>Chef da comunidade</span>
										</div>
									</div>
									<div className='flex gap-2'>
										<div
											onClick={() => setLike(!like)}
											className={`flex items-center gap-2 text-sm transition ease-in duration-100 bg-gray-50 text-gray-600 rounded-xl py-1.5 px-3 ${isAuth && like && 'bg-red-500/30 text-red-600'} ${isAuth ? 'cursor-pointer hover:bg-red-500/30 hover:text-red-500' : 'text-gray-500 hover:bg-gray-100 cursor-not-allowed'}`}>
											{isAuth && like ? (
												<Heart
													fill='oklch(57.7% 0.245 27.325)'
													size={20}
												/>
											) : (
												<Heart size={20} />
											)}
											<span>0</span>
										</div>
										<div>
											<div className={`flex items-center gap-2 text-sm transition ease-in duration-100 text-gray-600 rounded-xl py-1.5 px-3`}>
												<MessageCircleIcon size={20} />
												<span>0</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='flex flex-col grid-cols-2 gap-8 mt-8 sm:grid gap-y-6'>
							<div className='p-4 bg-white shadow md:p-6 rounded-2xl'>
								<div className='flex items-center gap-2'>
									<div className='flex items-center p-2 bg-emerald-200/60 text-emerald-700 rounded-xl'>
										<ChefHat />
									</div>
									<h4 className='text-lg font-semibold'>Ingredientes</h4>
								</div>
								<div>
									<ul className='pt-4 space-y-2'>
										<IngredientItem
											unity='300g'
											ingredient='bosta'
										/>
										<IngredientItem
											unity='300g'
											ingredient='bosta'
										/>
										<IngredientItem
											unity='300g'
											ingredient='bosta'
										/>
										<IngredientItem
											unity='300g'
											ingredient='bosta'
										/>
									</ul>
								</div>
							</div>
							<div className='p-4 bg-white shadow md:p-6 rounded-2xl'>
								<div className='flex items-center gap-2'>
									<div className='flex items-center p-2 bg-emerald-200/60 text-emerald-700 rounded-xl'>
										<Star />
									</div>
									<h4 className='text-lg font-semibold'>Modo de preparo</h4>
								</div>
								<div>
									<ul className='pt-4 space-y-2'>
										<StepsItem
											step={1}
											instructions='bla blabla faz assim e tal faz do seu jeito'
										/>
										<StepsItem
											step={2}
											instructions='bla blabla faz assim e tal faz do seu jeito'
										/>
									</ul>
								</div>
							</div>
						</div>
						<div className='pt-8'>
							<div className='p-4 bg-white shadow rounded-2xl md:p-6'>
								<div className='flex items-center gap-2'>
									<div className='p-1.5 text-white bg-emerald-600 rounded-xl'>
										<MessageCircleIcon />
									</div>
									<span className='font-semibold text-gray-700'>Comentarios ({1})</span>
								</div>
								<div>
									<div className='pt-8'>
										{isAuth ? (
											<div className='flex gap-2'>
												<img
													src={image}
													alt='pfp'
													className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
												/>
												<div className='w-full'>
													<textarea
														name='comment'
														id='comment'
														className='w-full p-4 transition duration-100 ease-in border border-gray-300 rounded-md focus:ring focus:ring-emerald-500 outline-0'></textarea>
													<button className='flex items-center gap-2 px-4 py-2 mt-2 text-white transition duration-100 ease-in cursor-pointer hover:bg-emerald-700 rounded-xl bg-emerald-600'>
														<Send size={16} /> comentar
													</button>
												</div>
												<div></div>
											</div>
										) : (
											<div className='flex flex-col gap-6'>
												<div>
													<h1 className='text-2xl font-semibold text-center'>quer comentar ?</h1>
													<p className='text-center text-gray-600'>faça parte da nossa comunidade</p>
												</div>
												<div className='flex flex-col gap-2 sm:flex-row'>
													<Link
														to={'/login'}
														className='flex items-center justify-center w-full py-2 my-1 font-semibold transition duration-100 ease-in border rounded-md md:my-0 md:px-6 border-emerald-600/60 text-emerald-500 md:text-gray-600 hover:text-gray-400'>
														Entrar
													</Link>
													<Link
														to={'/register'}
														className='flex items-center justify-center w-full py-2 my-1 font-semibold text-white transition duration-100 ease-in rounded-md md:my-0 md:px-6 bg-emerald-600 hover:bg-emerald-700'>
														Cadastrar
													</Link>
												</div>
											</div>
										)}
									</div>
									<div className='p-4 space-y-2 md:p-6'>
										<Comment
											author='leleo'
											date='2020'
											text='uma bosta realmente'
											image='url'
										/>
										<Comment
											author='leleo'
											date='2020'
											text='uma bosta realmente'
											image='url'
										/>
										<Comment
											author='leleo'
											date='2020'
											text='uma bosta realmente'
											image='url'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
