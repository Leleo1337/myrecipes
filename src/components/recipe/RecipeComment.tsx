import Avatar from 'react-avatar';
import type { commentProps } from '../../types/components/comments';
import { Link } from 'react-router';

export default function RecipeComment({ createdBy, text, createdAt }: commentProps) {
	const date = new Date(createdAt);
	const formattedDate = date.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<div className='flex p-4 bg-slate-50 rounded-2xl'>
			{createdBy.profilePicture ? (
				<img
					src={createdBy.profilePicture}
					alt='user pfp'
					className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-black/20'
				/>
			) : (
				<Avatar
					name={createdBy.name}
					size='32'
					className='w-8 h-8 text-xs rounded-full'
				/>
			)}
			<div className='flex flex-col ml-2 group-hover:text-emerald-600'>
				<div className='flex items-center'>
					<Link to={`/user/${createdBy._id}/profile`}>
						<h6 className='font-semibold hover:text-emerald-600 cursor-pointer'>{createdBy.name ? createdBy.name : 'username'}</h6>{' '}
					</Link>
					<span className='flex items-center ml-2 text-xs font-semibold text-gray-500'>{formattedDate}</span>
				</div>
				<p className='text-sm text-gray-600 break-all'>{text}</p>
			</div>
		</div>
	);
}
