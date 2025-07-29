import Avatar from 'react-avatar';
import type { commentProps } from '../../types/components/comments';

export default function RecipeComment({ image, author, text, date }: commentProps) {
	return (
		<div className='flex items-center p-4 bg-slate-50 rounded-2xl'>
			{image ? (
				<img
					src={image}
					alt='user pfp'
					className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
				/>
			) : (
				<Avatar
					name={author}
					size='32'
					className='w-8 h-8 text-xs rounded-full'
				/>
			)}
			<div className='flex flex-col ml-2'>
				<div className='flex items-center'>
					<h6 className='font-semibold'>{author ? author : 'username'}</h6>
					<span className='flex items-center ml-2 text-xs font-semibold text-gray-500'>{date? date: '29-4-2014'}</span>
				</div>
				<p className='text-sm text-gray-600'>{text}</p>
			</div>
		</div>
	);
}
