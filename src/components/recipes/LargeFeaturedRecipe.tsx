import { Clock, Heart, TrendingUp, Users } from 'lucide-react';
import image from '../../assets/anime.png';
import pizza from '../../assets/pizza.jpg';

export default function LargeFeaturedRecipe() {
	return (
		<div className='relative flex overflow-hidden transition duration-150 ease-in bg-white border-white shadow cursor-pointer relateive lg:h-full group hover:outline outline-white rounded-xl hover:outline-emerald-200 hover:shadow-lg shadow-gray-600/10'>
			<div className='absolute left-2 top-2 flex gap-2 items-center z-1 px-3 py-0.5 rounded-xl bg-emerald-600/95'>
				<TrendingUp
					size={16}
					color='white'
				/>
				<span className='text-sm font-semibold text-white'>Popular</span>
			</div>
			<div className='w-[800px] overflow-hidden'>
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
				<h2 className='text-2xl font-bold transition duration-100 ease-in group-hover:text-emerald-600'>sushi caseiro - temaki de salmao</h2>
				<div className='py-4 text-gray-600'>Um sushi muito sigmaa sigma sigma boy sigma boy aaaaa sigma zaddy sigma </div>
				<div className='flex items-center justify-between py-1'>
					<div className='flex items-center gap-4 text-gray-500'>
						<div className='flex items-center gap-1'>
							<Clock size={14} />
							<span className='text-sm'>40 min</span>
						</div>
						<div className='flex items-center gap-1'>
							<Users size={14} />
							<span className='text-sm'>40 min</span>
						</div>
					</div>
					<div className='flex items-center gap-0.5'>
						<Heart
							size={14}
							color='red'
							fill='red'
						/>
						<span className='text-sm'>1</span>
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
	);
}
