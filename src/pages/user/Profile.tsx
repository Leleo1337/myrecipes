import { useContext, useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import UserContext from '../../context/user';
import { fetchUserData } from '../../services/user';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import ProfileHeader from '../../components/profile/ProfileHeader';
import RecipesSection from '../../components/profile/RecipesSection';

export default function Profile() {
	const [profileData, setProfileData] = useState({
		_id: '',
		profilePicture: '',
		name: '',
		email: '',
		bio: '	!',
		socialLinks: { instragram: '', facebook: '', discord: '' },
	});
	const [recipesData, setRecipesData] = useState({
		createdCount: 1,
		likedCount: 1,
		likesReceived: 1,
	});

	const [sidebarOpen, setSidebarOpen] = useState(false);

	const navigate = useNavigate();
	const params = useParams();

	const user = useContext(UserContext);
	if (!user) throw new Error('Usuario não encontrado');

	const isLoggedInUserProfileOwner = profileData._id == user.userID;

	async function getProfileData() {
		try {
			const data = await fetchUserData(params.userID);
			setProfileData(data.user);
			setRecipesData(data.recipes);
		} catch (error) {
			console.log(error);
			navigate('/recipes');
			toast.error('usuario não encontrado!');
		}
	}

	useEffect(() => {
		getProfileData();
	}, [params.userID]);

	return (
		<>
			{sidebarOpen && (
				<div
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='fixed inset-0 z-3 bg-black/70 md:hidden'></div>
			)}
			<header>
				<Header toggleSide={() => setSidebarOpen(!sidebarOpen)} />
				<SideBar
					open={sidebarOpen}
					toggle={() => setSidebarOpen(!sidebarOpen)}
				/>
			</header>
			<main className='container max-w-[1400px] mx-auto px-4 relative top-24 pb-16'>
				<ProfileHeader
					userID={profileData._id}
					name={profileData.name}
					bio={profileData.bio}
					email={profileData.email}
					profilePicture={profileData.profilePicture}
					createdRecipesCount={recipesData.createdCount}
					likedRecipesCount={recipesData.likedCount}
					likesReceivedCount={recipesData.likesReceived}
					isProfileOnwer={isLoggedInUserProfileOwner}
					onProfileChange={getProfileData}
				/>
				<RecipesSection
					isLoggedInUserProfileOwner={isLoggedInUserProfileOwner}
					userID={profileData._id}
				/>
			</main>
		</>
	);
}
