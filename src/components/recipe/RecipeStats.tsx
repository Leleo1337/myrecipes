import { Clock, Heart, MessageCircle, Shield, Users2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import AuthContext from '../../context/auth';
import { Link } from 'react-router';
import type { recipeStatsProps } from '../../types/components/recipes';
import { fetchHasUserLiked, fetchRecipeLikes, likeRecipe } from '../../services/likes';
import { toast } from 'sonner';

export default function RecipeStats({ recipeID, cookingTime, portions, difficulty, createdBy, commentsCount }: recipeStatsProps) {
	const [likesCount, setLikesCount] = useState(0);
	const [like, setLike] = useState(false);

	const auth = useContext(AuthContext);
	if (!auth) throw new Error('Usuario não encontrado');
	const { isAuthenticated } = auth;

	async function handleSetLike() {
		try {
			setLike(!like);
			await likeRecipe(recipeID);
			const likesCount = await fetchRecipeLikes(recipeID);
			setLikesCount(likesCount.likesCount);
		} catch (error: any) {
			toast.error(error.response.data.msg);
		}
	}
	async function setLikeStates() {
		const likes = await fetchRecipeLikes(recipeID);
		const hasUserLiked = await fetchHasUserLiked(recipeID);
		setLikesCount(likes.likesCount);
		setLike(hasUserLiked.hasLiked);
	}

	useEffect(() => {
		setLikeStates();
	}, []);

	return (
		<>
			<div className='grid-cols-3 gap-4 pb-4 space-y-4 sm:grid'>
				<div className='flex items-center gap-3 p-3 transition duration-100 ease-in bg-gray-100 rounded-xl hover:scale-101 hover:ring ring-emerald-500/20'>
					<div className='p-2 bg-emerald-200/60 text-emerald-700 rounded-xl'>
						<Clock size={24} />
					</div>
					<div className='flex flex-col'>
						<h3 className='text-sm font-semibold'>tempo de preparo</h3>
						<span className='text-lg font-bold'>{cookingTime} min</span>
					</div>
				</div>
				<div className='flex items-center gap-3 p-3 transition duration-100 bg-gray-100 rounded-xl hover:scale-101 hover:ring ring-emerald-500/20'>
					<div className='p-2 bg-emerald-300/30 text-emerald-800 rounded-xl'>
						<Users2 size={24} />
					</div>
					<div className='flex flex-col'>
						<h3 className='text-sm font-semibold'>Porções</h3>
						<span className='text-lg font-bold'>{portions}</span>
					</div>
				</div>
				<div className='flex items-center gap-3 p-3 pb-3 mb-4 transition duration-100 bg-gray-100 rounded-xl hover:scale-101 hover:ring ring-emerald-500/20'>
					<div className='p-2 text-yellow-600 bg-yellow-500/40 rounded-xl'>
						<Shield size={24} />
					</div>
					<div className='flex flex-col'>
						<h3 className='text-sm font-semibold'>Dificuldade</h3>
						<span className='text-lg font-bold'>{difficulty}</span>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-between w-full px-3 pt-8 border-t border-gray-200'>
				<Link
					to={`/user/${createdBy._id}/profile`}
					className='flex items-center gap-1'>
					{createdBy.profilePicture ? (
						<img
							src={createdBy.profilePicture}
							alt='user pfp'
							className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-black/20'
						/>
					) : (
						<div>
							<Avatar
								name={createdBy.name}
								size='36'
								className='mr-2 text-xs rounded-full outline-1 outline-green-500/80'
							/>
						</div>
					)}
					<div className='flex flex-col group'>
						<span className='text-sm font-semibold transition duration-100 ease-in group-hover:text-emerald-600'>{createdBy.name}</span>
						<span className='hidden text-xs text-gray-500 transition duration-100 ease-in sm:block group-hover:text-emerald-600'>Chef da comunidade</span>
					</div>
				</Link>
				<div className='flex gap-2'>
					<div
						onClick={handleSetLike}
						className={`flex items-center gap-2 text-sm transition ease-in duration-75 bg-gray-50 text-gray-600 rounded-xl py-1.5 px-3 ${isAuthenticated && like && 'bg-red-500/30 text-red-500'} ${isAuthenticated ? 'cursor-pointer hover:bg-red-500/30 hover:text-red-500' : 'text-gray-500 hover:bg-gray-100 cursor-not-allowed'}`}>
						{isAuthenticated && like ? (
							<Heart
								fill='oklch(57.7% 0.245 27.325)'
								size={20}
							/>
						) : (
							<Heart size={20} />
						)}
						<span>{likesCount}</span>
					</div>
					<div>
						<div className={`flex items-center gap-2 text-sm transition ease-in duration-100 text-gray-600 rounded-xl py-1.5 px-3`}>
							<MessageCircle size={20} />
							<span>{commentsCount}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
