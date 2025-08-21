import { ArrowLeft, Edit, Share2 } from 'lucide-react';
import { Link } from 'react-router';
import type { recipeHeaderProps } from '../../types/components/recipes';
import { toast } from 'sonner';

export default function RecipeHeader({ recipeID, isCreatedByLoggedInUser }: recipeHeaderProps) {
	function handleCopyCurrentUrl() {
		navigator.clipboard.writeText(window.location.href);
		toast.success('Link copiado para a área de transferência!');
	}

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
						<div>
							{isCreatedByLoggedInUser && (
								<Link
									className='text-gray-600 hover:text-gray-800'
									to={`/recipes/${recipeID}/edit`}>
									<Edit
										size={20}
										className='text-gray-600 hover:text-emerald-600 transiton ease-in duration-100'
									/>
								</Link>
							)}
						</div>
						<div
							className='cursor-pointer'
							onClick={handleCopyCurrentUrl}>
							<Share2
								size={20}
								className='text-gray-600 hover:text-emerald-600 transiton ease-in duration-100'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
