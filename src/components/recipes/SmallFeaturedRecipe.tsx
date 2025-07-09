import { Clock, Heart } from 'lucide-react';
import image from '../../assets/anime.png';
import pizza from '../../assets/pizza.jpg';

export default function SmallFeaturedRecipeCard() {
	return (
		<>
			<div className='flex overflow-hidden transition duration-150 ease-in bg-white border-white shadow cursor-pointer lg:h-full group hover:outline outline-white rounded-xl hover:outline-emerald-200 hover:shadow-lg shadow-gray-600/10'>
				<div className='w-1/2 max-w-[185px] overflow-hidden'>
					<img
						src={pizza}
						alt=''
						className='object-cover w-full h-full transition-transform duration-200 group-hover:scale-105'
					/>
				</div>
				<div className='w-full px-4 py-2'>
					<div className='inline-block px-2 py-0.5 text-xs text-red-700 rounded-xl bg-red-500/30 font-semibold'>
						<span>Dificil</span>
					</div>
					<h2 className='font-bold transition duration-100 ease-in group-hover:text-emerald-600'>sushi caseiro - temaki de salmao</h2>
					<div className='flex items-center justify-between py-1'>
						<div className='flex items-center gap-1 text-gray-500'>
							<Clock size={12} />
							<span className='text-xs'>40 min</span>
						</div>
						<div className='flex items-center gap-0.5'>
							<Heart
								size={12}
								color='red'
								fill='red'
							/>
							<span className='text-xs'>1</span>
						</div>
					</div>
					<div className='flex items-center gap-2 md:pt-4'>
						<img
							src={image}
							alt='pfp'
							className='w-6 h-6 text-xs rounded-full'
						/>
						<div className='flex flex-col'>
							<span className='text-xs font-semibold'>admin</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
