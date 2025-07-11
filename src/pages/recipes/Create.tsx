import { useState } from 'react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';

export default function Create() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	function handleSideBarToggle() {
		setSidebarOpen(!sidebarOpen);
	}

	return (
		<>
			<header>
				<Header toggleSide={handleSideBarToggle} />
				<SideBar
					toggle={handleSideBarToggle}
					open={sidebarOpen}
				/>
			</header>
			<div>oi</div>
		</>
	);
}
