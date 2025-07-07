import { ArrowRight, ChefHat, User } from 'lucide-react';
import FeaturedCard from '../components/home/FeaturedCard/FeaturedCard';
import InfoCard from '../components/home/InfoCard/infoCard';
import { Link } from 'react-router';

export default function Home() {
	return (
		<>
			<main>
				<section className='relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white overflow-hidden'>
					<div className='p-4 sm:p-6 mx-auto max-w-7xl h-[85vh] sm:h-[68vh]'>
						<header className='flex justify-between'>
							<div className='flex items-center gap-2'>
								<div className='p-2 bg-white/20 rounded-xl'>
									<ChefHat />
								</div>
								<span className='font-bold text-lg sm:text-xl text-white'>myRecipes</span>
							</div>
							<ul className='flex items-center gap-2 sm:gap-4'>
								<li>
									<Link to={'/login'} className='md:text-lg hover:text-emerald-300 transition ease-in duration-150 cursor-pointer'>
                                        Entrar
                                    </Link>
								</li>
								<li>
									<Link to={'/register'} className='bg-white/20 py-1.5 px-2 sm:py-2.5 sm:px-6 border border-white/20 rounded-xl md:text-lg hover:bg-white hover:text-emerald-800 transition ease-in duration-100 cursor-pointer'>
										Cadastrar
									</Link>
								</li>
							</ul>
						</header>
						<div className='mt-20 lg:flex'>
							<div className='lg:mr-36'>
								<div className='text-5xl sm:text-6xl font-bold pb-8'>
									<div>Descubra o</div>
									<div className='bg-gradient-to-r from-yellow-200 via-emerald-300 to-cyan-100 text-transparent bg-clip-text'>
										Sabor Perfeito
									</div>
								</div>
								<p className='text-xl md:text-2xl leading-8 font-thin'>
									Compartilhe suas receitas favoritas, descubra novos sabores e conecte-se com uma comunidade apaixonada
									por culinária.
								</p>
								<div className='flex flex-col sm:flex-row gap-4 mt-12'>
									<button className='flex justify-center gap-2 items-center w-full sm:w-auto px-8 py-4 bg-white text-lg text-emerald-800 font-semibold rounded-2xl hover:bg-green-50 transition ease-in duration-150 cursor-pointer'>
										Explorar receitas <ArrowRight />
									</button>
									<button className='flex justify-center gap-2 items-center w-full sm:w-auto px-8 py-4 border-2 border-white text-lg text-white font-semibold rounded-2xl hover:bg-white hover:text-emerald-800 transition ease-in duration-150 cursor-pointer'>
										Junte-se a nós <User />
									</button>
								</div>
							</div>
							<InfoCard />
						</div>
					</div>
				</section>
				<section>
					<div className='p-4 sm:p-6 mx-auto max-w-7xl mb-12'>
						<div className='flex flex-col items-center justify-center mt-4 md:mt-16'>
							<h2 className='font-bold text-3xl text-center text-gray-800'>Por que escolher o myRecipes</h2>
							<p className='mt-8 text-center text-gray-500 text-xl'>
								Uma plataforma completa para compartilhar, descobrir e gerenciar suas receitas favoritas
							</p>
						</div>
						<FeaturedCard />
					</div>
				</section>
				<section className='bg-slate-900/96 border-b border-gray-800 py-8'>
					<div className='flex items-center justify-center flex-col gap-4 p-4 sm:p-6 mx-auto max-w-7xl h-[30vh] md:h-[35vh]'>
						<h1 className='text-center text-2xl md:text-4xl text-gray-200 font-bold'>Pronto para começar sua jornada culinária?</h1>
						<p className='text-lg md:text-xl text-center text-gray-300'>Junte-se à nossa comunidade e comece a compartilhar suas receitas hoje mesmo!</p>
						<button className='flex items-center gap-2 border border-white/20 font-semibold text-white text-lg py-4 px-8 mt-4 rounded-2xl hover:bg-white/10 hover:text-emerald-500 transition ease-in duration-150 cursor-pointer'>
							Criar Conta Gratuita <ArrowRight />
						</button>
					</div>
				</section>
			</main>
            <footer className='flex justify-center items-center w-full bg-slate-900 p-4'>
                <span className='text-center text-gray-300'>
                    © 2025 myRecipes. Projeto feito para fins de estudo por <a className='underline text-emerald-400 hover:text-emerald-600 transition ease-in duration-75' href="https://github.com/leleo1337" target='_blank'>Leleo1337</a>.
                </span>
            </footer>
		</>
	);
}
