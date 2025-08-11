import { useContext, useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import SideBar from '../../components/ui/sideBar';
import UserContext from '../../context/user';
import { getUserData } from '../../services/user';
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
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const navigate = useNavigate();
	const params = useParams();

	const user = useContext(UserContext);
	if (!user) throw new Error('Usuario não encontrado');

	const isLoggedInUserProfileOwner = profileData._id == user.userID;

	async function fetchProfile() {
		try {
			const data = await getUserData(params.userID);
			setProfileData(data);
		} catch (error) {
			console.log(error);
			navigate('/recipes');
			toast.error('usuario não encontrado!');
		}
	}

	useEffect(() => {
		fetchProfile();
	}, [params.userID]);

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
				<ProfileHeader
					userID={profileData._id}
					name={profileData.name}
					bio={profileData.bio}
					email={profileData.email}
					profilePicture={profileData.profilePicture}
					createdRecipesCount={1}
					likedRecipesCount={1}
					likesReceivedCount={1}
					isProfileOnwer={isLoggedInUserProfileOwner}
					onProfileChange={fetchProfile}
				/>
				<RecipesSection
					isLoggedInUserProfileOwner={isLoggedInUserProfileOwner}
					userID={profileData._id}
				/>
			</main>
		</>
	);
}
