import { useEffect, useState } from 'react';
import SideBar from '../../components/recipes/sideBar';
import Header from '../../components/recipes/Header';

export default function Recipes() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	useEffect(() => {
		document.body.style.backgroundColor = '#f3f4f6';
		return () => {
			document.body.style.backgroundColor = 'white';
		};
	}, []);

	return (
		<>
			{sidebarOpen && <div className='absolute w-screen h-screen z-2 bg-black/70 md:hidden'></div>}
			<main>
				<header>
					{/* Mobile Sidebar */}
					<SideBar
						toggle={handleSideBarToggle}
						open={sidebarOpen}
					/>
					<Header toggleSide={handleSideBarToggle} />
				</header>
				<section></section>
			</main>
		</>
	);
}
