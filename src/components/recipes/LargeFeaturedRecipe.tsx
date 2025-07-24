import { Link } from 'react-router';
import { Clock, Heart, TrendingUp, Users } from 'lucide-react';
import type { featuredCardProps } from '../../types/components/recipesComponentsProps';
import notFoundImage from '../../assets/404Image.jpeg';

export default function LargeFeaturedRecipe({ recipe }: featuredCardProps) {
	const difficultyColors = {
		Facil: 'bg-green-600/80 text-white',
		Medio: 'bg-yellow-500/80 text-black',
		Dificil: 'bg-red-600/80 text-white',
	};

	return (
		<Link
			to={`/recipes/${recipe._id}`}
			className='relative flex flex-col overflow-hidden transition duration-150 ease-in bg-white border-white shadow cursor-pointer lg:flex-row relateive lg:h-full group hover:outline outline-white rounded-xl hover:outline-emerald-200 hover:shadow-lg shadow-gray-600/10'>
			<div className='absolute left-2 top-2 flex gap-2 items-center z-1 px-3 py-0.5 rounded-xl bg-emerald-600/95'>
				<TrendingUp
					size={16}
					color='white'
				/>
				<span className='text-sm font-semibold text-white'>Popular</span>
			</div>
			<div className='lg:w-[800px] w-full h-60 lg:h-auto overflow-hidden'>
				<img
					src={recipe.image ? recipe.image : notFoundImage}
					alt='recipe image'
					className='object-cover w-full h-full transition-transform duration-200 group-hover:scale-105'
				/>
			</div>
			<div className='w-full px-4 py-2'>
				<div className={`inline-block px-4 py-0.5 ${difficultyColors[recipe.difficulty]} font-semibold text-sm rounded-xl`}>
					<div>{recipe.difficulty}</div>
				</div>
				<h2 className='text-2xl font-bold transition duration-100 ease-in group-hover:text-emerald-600'>{recipe.title}</h2>
				<div className='py-4 text-gray-600'>{recipe.description} </div>
				<div className='flex items-center justify-between py-1'>
					<div className='flex items-center gap-4 text-gray-500'>
						<div className='flex items-center gap-1'>
							<Clock size={14} />
							<span className='text-sm'>{recipe.cookingTime} min</span>
						</div>
						<div className='flex items-center gap-1'>
							<Users size={14} />
							<span className='text-sm'>{recipe.portions}</span>
						</div>
					</div>
					<div className='flex items-center gap-0.5'>
						<Heart
							size={14}
							color='red'
							fill='red'
						/>
						<span className='text-sm'>{recipe.likesCount}</span>
					</div>
				</div>
				<div className='flex items-center gap-2 md:pt-4'>
					<img
						src={'user'}
						alt='pfp'
						className='w-6 h-6 text-xs rounded-full'
					/>
					<div className='flex flex-col'>
						<span className='text-xs font-semibold'>admin</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
