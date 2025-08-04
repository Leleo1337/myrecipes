import { useContext, useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import UserContext from '../../context/user';
import Avatar from 'react-avatar';
import { getUserData } from '../../services/user';
import { useParams } from 'react-router';

export default function Profile() {
	const [profileData, setProfileData] = useState({
		_id: '686eb09877ecfb0ea5486ba1',
		profilePicture: '',
		name: '',
		bio: '',
		socialLinks: { instragram: '', facebook: '', discord: '' },
	});
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const user = useContext(UserContext);
	const params = useParams();

	if (!user) throw new Error('Usuario não encontrado');

	const isLoggedInUserProfile = profileData._id == user.userID;

	async function handleFetchProfile() {
		try {
			const data = await getUserData(params.userID);
			setProfileData(data);
			console.log(isLoggedInUserProfile);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		handleFetchProfile();
	}, []);

	return (
		<>
			<header>
				<Header toggleSide={() => setSidebarOpen(!sidebarOpen)} />
				<SideBar
					open={sidebarOpen}
					toggle={() => setSidebarOpen(!sidebarOpen)}
				/>
			</header>
			<main className='container max-w-[1400px] mx-auto px-4 relative top-24'>
				<section className='container mx-auto py-6 px-4 md:px-6 bg-white border border-slate-300 rounded-md shadow-xs'>
					<div>
						<Avatar name={'usuario'} />
						<div>
							<h1>nome</h1>
							<p>email</p>
						</div>
					</div>
					<div></div>
				</section>
			</main>
		</>
	);
}
