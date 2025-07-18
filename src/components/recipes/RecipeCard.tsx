import { Clock, Heart, MessageCircleIcon, Users2 } from 'lucide-react';
import { Link } from 'react-router';

export default function RecipeCard({ id, difficulty, category, image, description, title, cookTime, portions }: any) {
	return (
		<>
			<Link
				to={`/recipes/${id}`}
				className='w-full h-full overflow-hidden transition duration-150 ease-in bg-white border-white shadow cursor-pointer group relateive lg:h-full hover:outline outline-white rounded-xl hover:outline-emerald-200 hover:shadow-lg shadow-gray-600/10'>
				<div className='relative rounded-xl'>
					<div className='absolute flex justify-between w-full px-2 top-4 z-1'>
						<div className='px-4 py-0.5 text-red-700 bg-red-300/90 font-semibold text-sm rounded-xl'>{difficulty}</div>
						<div className='px-4 py-0.5 text-gray-800 bg-gray-100/90 font-semibold text-sm rounded-xl'>{category}</div>
					</div>
					<img
						src={image}
						alt=''
						className='object-cover w-full transition-transform duration-150 h-60 rounded-t-2xl group-hover:scale-105'
					/>
				</div>
				<div className='px-6 py-4 bg-white border border-gray-300 shadow '>
					<div>
						<h4 className='text-2xl font-semibold truncate transition duration-150 ease-in group-hover:text-emerald-600'>{title}</h4>
						<p className='text-gray-600 line-clamp-2'>{description}</p>
					</div>
					<div className='flex justify-between py-4'>
						<div className='flex items-center gap-1 text-gray-500'>
							<Clock size={16} />
							<span className='text-sm'>{cookTime} min</span>
						</div>
						<div className='flex items-center gap-1 text-gray-500'>
							<Users2 size={16} />
							<span className='text-sm'>{portions} porções</span>
						</div>
					</div>
					<div className='border-t border-gray-400/30'>
						<div className='flex items-center justify-between'>
							<div className='flex pt-4'>
								<div>
									<img
										src={'user image'}
										alt='pfp'
										className='mr-2 text-xs rounded-full h-7 w-7 outline outline-black/30'
									/>
								</div>
								<div className='flex flex-col'>
									<span className='text-sm font-semibold text-gray-700'>user</span>
								</div>
							</div>
							<div className='flex gap-4'>
								<div className='flex items-center gap-1 text-gray-600'>
									<Heart size={16} />
									<span className='text-sm'>0</span>
								</div>
								<div className='flex items-center gap-1 text-gray-600'>
									<MessageCircleIcon size={16} />
									<span className='text-sm'>0</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}
