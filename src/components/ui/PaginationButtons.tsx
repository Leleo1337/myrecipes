import { ArrowLeft, ArrowRight } from 'lucide-react';

export type paginationButtonsProps = {
	pageIndex: number;
	pageLimit: number;
	prevPage: () => void;
	nextPage: () => void;
};

export default function PaginationButtons({ pageIndex, pageLimit, prevPage, nextPage }: paginationButtonsProps) {
	return (
		<>
			<div className='flex items-center justify-center gap-4 py-6'>
				{pageIndex === 1 ? (
					<button disabled>
						<ArrowLeft
							size={32}
							className='text-gray-600 transition duration-100 ease-in cursor-pointer hover:text-gray-500'
						/>
					</button>
				) : (
					<button>
						<ArrowLeft
							size={32}
							className={`transition duration-100 ease-in cursor-pointer hover:text-emerald-600`}
							onClick={prevPage}
						/>
					</button>
				)}
				<p className='mb-1 text-2xl font-semibold'>{pageIndex}</p>
				{pageIndex === pageLimit ? (
					<button disabled>
						<ArrowRight
							size={32}
							className='text-gray-600 transition duration-100 ease-in cursor-pointer hover:text-gray-500'
						/>
					</button>
				) : (
					<button>
						<ArrowRight
							size={32}
							className={`transition duration-100 ease-in cursor-pointer hover:text-emerald-600`}
							onClick={nextPage}
						/>
					</button>
				)}
			</div>
		</>
	);
}
