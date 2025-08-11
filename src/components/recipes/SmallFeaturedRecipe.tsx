import { Clock, Heart } from 'lucide-react';
import type { featuredCardProps } from '../../types/components/recipes';
import { Link } from 'react-router';
import notFoundImage from '../../assets/404Image.jpeg';
import Avatar from 'react-avatar';

export default function SmallFeaturedRecipeCard({ recipe }: featuredCardProps) {
	return (
		<>
			<Link
				to={`/recipes/${recipe._id}`}
				className='flex overflow-hidden transition duration-150 ease-in bg-white border-white shadow cursor-pointer lg:h-full group hover:outline outline-white rounded-xl hover:outline-emerald-200 hover:shadow-lg shadow-gray-600/10'>
				<div className='w-1/2 max-w-[185px] max-h-40 h-40 overflow-hidden'>
					<img
						src={recipe.image ? recipe.image : notFoundImage}
						alt=''
						className='object-cover w-full h-full transition-transform duration-200 group-hover:scale-105'
					/>
				</div>
				<div className='w-full px-4 py-2'>
					<div className='inline-block px-2 py-0.5 text-xs text-red-700 rounded-xl bg-red-500/30 font-semibold'>
						<span>Dificil</span>
					</div>
					<h2 className='font-bold transition duration-100 ease-in group-hover:text-emerald-600'>{recipe.title}</h2>
					<div className='flex items-center justify-between py-1'>
						<div className='flex items-center gap-1 text-gray-500'>
							<Clock size={12} />
							<span className='text-xs'>{recipe.cookingTime} min</span>
						</div>
						<div className='flex items-center gap-0.5'>
							<Heart
								size={12}
								color='red'
								fill='red'
							/>
							<span className='text-xs'>{recipe.likesCount}</span>
						</div>
					</div>
					<div className='flex items-center gap-2 md:pt-4'>
						{recipe.createdBy.profilePicture ? (
							<img
								src={recipe.createdBy.profilePicture}
								alt='user pfp'
								className='w-7 h-7 text-xs rounded-full outline-1 outline-black/20'
							/>
						) : (
							<Avatar
								name={recipe.createdBy.name}
								size='24'
								className='rounded-full'
							/>
						)}
						<div className='flex flex-col'>
							<span className='text-xs font-semibold'>{recipe.createdBy.name}</span>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}
