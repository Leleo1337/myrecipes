import { CameraIcon, Edit } from 'lucide-react';
import Avatar from 'react-avatar';
import { isFileSupportedFileType } from '../../utils/fileHelpers';
import generateImageLinkFromFile from '../../services/cloudinary';
import { updateUser } from '../../services/user';
import { toast } from 'sonner';
import { useContext, useState } from 'react';
import UserContext from '../../context/user';
import type { profileHeaderProps } from '../../types/components/home';
import ProfileEditModal from './ProfileEditModal';

export default function ProfileHeader({
	userID,
	profilePicture,
	name,
	email,
	bio,
	createdRecipesCount,
	likedRecipesCount,
	likesReceivedCount,
	isProfileOnwer,
	onProfileChange,
}: profileHeaderProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const user = useContext(UserContext);

	async function handleFileUpload(fileObj: FileList | null) {
		if (!fileObj) return;
		const file = fileObj[0];
		if (!isFileSupportedFileType(file)) return;

		const uploadedImage = await generateImageLinkFromFile(fileObj);

		try {
			await updateUser(userID, { profilePicture: uploadedImage });
			onProfileChange();
			user?.setUser({ ...user, profilePicture: uploadedImage });
		} catch (error) {
			console.log(error);
			toast.error('Algo deu errado! tente novamente mais tarde.');
		}
	}

	return (
		<>
			<ProfileEditModal
				isModalOpen={isModalOpen}
				toggleModal={() => setIsModalOpen(!isModalOpen)}
			/>
			<section className='container px-4 py-6 mx-auto bg-white border rounded-md shadow-xs md:px-6 border-slate-300'>
				<div className='justify-between gap-4 sm:flex'>
					<div className='flex items-center gap-4'>
						<div className='relative z-0 flex items-center justify-center w-25 h-25 bg-primary-100'>
							{profilePicture ? (
								<img
									src={profilePicture}
									alt='profile picture'
									className='w-full h-full border border-gray-300 rounded-full'
								/>
							) : (
								<Avatar
									name={name}
									className='object-cover w-full h-full rounded-full'
								/>
							)}
							{isProfileOnwer && (
								<div className='absolute bottom-0 right-0 p-1 text-white transition duration-100 ease-in rounded-full cursor-pointer z-2 bg-emerald-600 hover:bg-emerald-700'>
									<label
										className='w-full h-full p-0 m-0 cursor-pointer'
										htmlFor='profile-picture-upload'>
										<CameraIcon />
									</label>
									<input
										id='profile-picture-upload'
										type='file'
										className='hidden'
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e.target.files)}
									/>
								</div>
							)}
						</div>
						<div className='flex-1 space-y-1'>
							<div className='flex items-center gap-4'>
								<h1 className='text-3xl font-semibold'>{name}</h1>
								{isProfileOnwer && (
									<Edit
										size={16}
										onClick={() => setIsModalOpen(!isModalOpen)}
										className='transition duration-100 ease-in cursor-pointer hover:scale-105 hover:text-emerald-600'
									/>
								)}
							</div>
							<p className='text-gray-500'>{email ? email : name}</p>
							<p>{bio}</p>
						</div>
					</div>
					<div className='grid grid-cols-3 pt-4 sm:pt-0 sm:gap-4'>
						<div className='flex flex-col items-center justify-center text-sm text-center sm:text-base'>
							<span className='text-xl font-semibold text-emerald-600 sm:text-2xl'>{createdRecipesCount}</span>
							<span className='text-gray-600'>receitas criadas</span>
						</div>
						<div className='flex flex-col items-center justify-center text-sm text-center sm:text-base'>
							<span className='text-xl font-semibold text-emerald-700 sm:text-2xl'>{likedRecipesCount}</span>
							<span className='text-gray-600'>receitas curtidas</span>
						</div>
						<div className='flex flex-col items-center justify-center text-sm text-center sm:text-base'>
							<span className='text-xl font-semibold text-red-600 sm:text-2xl'>{likesReceivedCount}</span>
							<span className='text-gray-600'>curtidas recebidas</span>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
