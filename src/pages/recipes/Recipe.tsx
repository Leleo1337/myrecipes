import { Link, useParams } from 'react-router';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import { useState } from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';

export default function Recipe() {
	const recipeID = useParams();

	const [sidebarOpen, setSidebarOpen] = useState(false);

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	console.log(recipeID);
	return (
		<>
			{sidebarOpen && <div className='fixed inset-0 z-2 bg-black/70 md:hidden'></div>}
			<header>
				<Header toggleSide={handleSideBarToggle} />
				<SideBar
					toggle={handleSideBarToggle}
					open={sidebarOpen}
				/>
				<div className='px-4 pt-16 bg-white border-b border-gray-300 shadow'>
					<div className='flex justify-between items-center container max-w-[900px] mx-auto py-4'>
						<Link
							to={'/recipes'}
							className='flex gap-1 text-gray-600'>
							<ArrowLeft />
							<span className='font-semibold'>Voltar</span>
						</Link>
						<Link
							to={'/recipes'}
							className='flex'>
							<Share2
								size={20}
								className='text-gray-600'
							/>
						</Link>
					</div>
				</div>
			</header>
			<main className='mt-6'>
				<section></section>
			</main>
		</>
	);
}
