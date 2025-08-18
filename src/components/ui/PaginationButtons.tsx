import { ArrowLeft, ArrowRight } from 'lucide-react';

export type paginationButtonsProps = {
	pageIndex: number;
	pageLimit: number;
	size: 'small' | 'medium';
	prevPage: () => void;
	nextPage: () => void;
};

export default function PaginationButtons({ pageIndex, pageLimit, size, prevPage, nextPage }: paginationButtonsProps) {
	return (
		<>
			<div className='flex items-center justify-center gap-4 pt-4'>
				{pageIndex === 1 ? (
					<button disabled>
						<ArrowLeft
							size={size === 'small' ? 24 : 32}
							className='text-gray-600 transition duration-100 ease-in cursor-pointer hover:text-gray-500'
						/>
					</button>
				) : (
					<button>
						<ArrowLeft
							size={size === 'small' ? 24 : 32}
							className={`transition duration-100 ease-in cursor-pointer hover:text-emerald-600`}
							onClick={prevPage}
						/>
					</button>
				)}
				<p className={`mb-1 ${size === 'small' ? 'text-xl' : 'text-2xl'} font-semibold`}>{pageIndex}</p>
				{pageIndex >= pageLimit ? (
					<button disabled>
						<ArrowRight
							size={size === 'small' ? 24 : 32}
							className='text-gray-600 transition duration-100 ease-in cursor-pointer hover:text-gray-500'
						/>
					</button>
				) : (
					<button>
						<ArrowRight
							size={size === 'small' ? 24 : 32}
							className={`transition duration-100 ease-in cursor-pointer hover:text-emerald-600`}
							onClick={nextPage}
						/>
					</button>
				)}
			</div>
		</>
	);
}
