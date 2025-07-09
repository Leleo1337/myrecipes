import { ArrowRight, ChefHat, User } from 'lucide-react';
import FeaturedCard from '../components/home/FeaturedCard/FeaturedCard';
import InfoCard from '../components/home/InfoCard/InfoCard';
import { Link } from 'react-router';

export default function Home() {
	return (
		<>
			<main>
				<section className='relative overflow-hidden text-white bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700'>
					<div className='p-4 sm:p-6 mx-auto max-w-7xl h-[85vh] sm:h-[68vh]'>
						<header className='flex justify-between'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-white/20 rounded-xl'>
									<ChefHat />
								</div>
								<span className='text-lg font-bold text-white sm:text-xl'>myRecipes</span>
							</div>
							<ul className='flex items-center gap-2 sm:gap-4'>
								<li>
									<Link
										to={'/login'}
										className='transition duration-150 ease-in cursor-pointer md:text-lg hover:text-emerald-300'>
										Entrar
									</Link>
								</li>
								<li>
									<Link
										to={'/register'}
										className='bg-white/20 py-1.5 px-2 sm:py-2.5 sm:px-6 border border-white/20 rounded-xl md:text-lg hover:bg-white hover:text-emerald-800 transition ease-in duration-100 cursor-pointer'>
										Cadastrar
									</Link>
								</li>
							</ul>
						</header>
						<div className='mt-20 lg:flex'>
							<div className='lg:mr-36'>
								<div className='pb-8 text-5xl font-bold sm:text-6xl'>
									<div>Descubra o</div>
									<div className='text-transparent bg-gradient-to-r from-yellow-200 via-emerald-300 to-cyan-100 bg-clip-text'>Sabor Perfeito</div>
								</div>
								<p className='text-xl font-thin leading-8 md:text-2xl'>
									Compartilhe suas receitas favoritas, descubra novos sabores e conecte-se com uma comunidade apaixonada por culinária.
								</p>
								<div className='flex flex-col gap-4 mt-12 sm:flex-row'>
									<Link
										to={'/recipes'}
										className='flex items-center justify-center w-full gap-2 px-8 py-4 text-lg font-semibold transition duration-150 ease-in bg-white cursor-pointer sm:w-auto text-emerald-800 rounded-2xl hover:bg-green-50'>
										Explorar receitas <ArrowRight />
									</Link>
									<Link
										to={'/register'}
										className='flex items-center justify-center w-full gap-2 px-8 py-4 text-lg font-semibold text-white transition duration-150 ease-in border-2 border-white cursor-pointer sm:w-auto rounded-2xl hover:bg-white hover:text-emerald-800'>
										Junte-se a nós <User />
									</Link>
								</div>
							</div>
							<InfoCard />
						</div>
					</div>
				</section>
				<section>
					<div className='p-4 mx-auto mb-12 sm:p-6 max-w-7xl'>
						<div className='flex flex-col items-center justify-center mt-4 md:mt-16'>
							<h2 className='text-3xl font-bold text-center text-gray-800'>Por que escolher o myRecipes</h2>
							<p className='mt-8 text-xl text-center text-gray-500'>Uma plataforma completa para compartilhar, descobrir e gerenciar suas receitas favoritas</p>
						</div>
						<FeaturedCard />
					</div>
				</section>
				<section className='p-4 py-6 border-b border-gray-800 bg-slate-900/96'>
					<div className='flex items-center justify-center flex-col gap-4 mx-auto max-w-7xl h-[30vh] md:h-[35vh]'>
						<h1 className='text-2xl font-bold text-center text-gray-200 md:text-4xl'>Pronto para começar sua jornada culinária?</h1>
						<p className='text-lg text-center text-gray-300 md:text-xl'>Junte-se à nossa comunidade e comece a compartilhar suas receitas hoje mesmo!</p>
						<Link
							to={'/register'}
							className='flex items-center gap-2 px-8 py-4 mt-4 text-lg font-semibold text-white transition duration-150 ease-in border cursor-pointer border-white/20 rounded-2xl hover:bg-white/10 hover:text-emerald-500'>
							Criar Conta Gratuita <ArrowRight />
						</Link>
					</div>
				</section>
			</main>
			<footer className='flex items-center justify-center w-full p-4 bg-slate-900'>
				<span className='text-center text-gray-300'>
					© 2025 myRecipes. Projeto feito para fins de estudo por
					<a
						className='underline transition duration-75 ease-in text-emerald-400 hover:text-emerald-600'
						href='https://github.com/leleo1337'
						target='_blank'>
						Leleo1337
					</a>
				</span>
			</footer>
		</>
	);
}
