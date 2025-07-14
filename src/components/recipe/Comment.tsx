export type commentProps = {
	image?: string;
	author: string;
	text: string;
	date: string;
};

export default function Comment({ image, author, text, date }: commentProps) {
	return (
		<div className='flex p-4 bg-slate-50 rounded-2xl'>
			<img
				src={image}
				alt='user pfp'
				className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
			/>
			<div className='flex flex-col ml-2'>
				<div className="flex gap-2">
                    <h6 className='font-semibold'>{author}</h6>
                    <span className="flex items-center ml-2 text-xs text-gray-600">{date}</span>
                </div>
				<p className='text-sm text-gray-600'>{text}</p>
			</div>
		</div>
	);
}
