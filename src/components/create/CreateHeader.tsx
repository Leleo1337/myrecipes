import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router';

export type createHeaderProps = {
	submitForm: () => void;
};

export default function CreateHeader({ submitForm }: createHeaderProps) {
	return (
		<>
			<div className='fixed w-full bg-white border-b shadow border-slate-300 top-12 md:top-16 z-2'>
				<div className='flex justify-between items-center container max-w-[900px] mx-auto py-2 px-4 md:py-3'>
					<Link
						to={'/recipes'}
						className='flex gap-1 text-gray-600 hover:text-gray-800'>
						<ArrowLeft />
						<span className='font-semibold'>Voltar</span>
					</Link>
					<button
						onClick={submitForm}
						className='flex items-center gap-2 px-4 py-2 text-sm text-white transition duration-75 ease-in rounded-md cursor-pointer bg-emerald-600 hover:bg-emerald-700'>
						<Save size={20} />
						<span>Publicar</span>
					</button>
				</div>
			</div>
		</>
	);
}
