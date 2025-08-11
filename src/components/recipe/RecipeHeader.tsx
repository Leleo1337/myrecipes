import { ArrowLeft, Settings, Share2 } from 'lucide-react';
import { Link } from 'react-router';
import type { recipeHeaderProps } from '../../types/components/recipesComponentsProps';

export default function RecipeHeader({ recipeID, isCreatedByLoggedInUser }: recipeHeaderProps) {
	return (
		<>
			<div className='fixed w-full bg-white border-b border-gray-300 shadow top-14 md:top-16 z-2'>
				<div className='flex justify-between items-center container max-w-[900px] mx-auto py-2 px-4 md:py-3'>
					<Link
						to={'/recipes'}
						className='flex gap-1 text-gray-600 hover:text-gray-800'>
						<ArrowLeft />
						<span className='font-semibold'>Voltar</span>
					</Link>
					<div className='flex items-center gap-4'>
						<Link
							to={'/recipes'}
							className='flex'>
							<Share2
								size={20}
								className='text-gray-600 hover:text-gray-800'
							/>
						</Link>
						{isCreatedByLoggedInUser && (
							<Link
								className='text-gray-600 hover:text-gray-800'
								to={`/recipes/${recipeID}/edit`}>
								<Settings />
							</Link>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
