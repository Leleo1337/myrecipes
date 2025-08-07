import { CameraIcon } from 'lucide-react';
import Avatar from 'react-avatar';
import { convertFileToBase64, isFileSupportedFileType } from '../../utils/fileHelpers';

export type ProfileHeaderProps = {
	profilePicture: string;
	name: string;
	email: string;
	bio: string;
	createdRecipesCount: number;
	likedRecipesCount: number;
	likesReceivedCount: number;
	isProfileOnwer: boolean;
};

export default function ProfileHeader({
	profilePicture,
	name,
	email,
	bio,
	createdRecipesCount,
	likedRecipesCount,
	likesReceivedCount,
	isProfileOnwer,
}: ProfileHeaderProps) {

	
	async function handleFileUpload(fileObj: FileList | null) {
		if (!fileObj) return;
		const file = fileObj[0];
		if (!isFileSupportedFileType(file)) return;

		const base64Image = await convertFileToBase64(file);

		console.log(base64Image);
	}

	return (
		<section className='container px-4 py-6 mx-auto bg-white border rounded-md shadow-xs md:px-6 border-slate-300'>
			<div className='flex gap-4'>
				<div className='relative z-0 flex items-center justify-center w-24 h-24 bg-primary-100'>
					{profilePicture ? (
						<img
							src={profilePicture}
							alt='profile picture'
							className='object-cover w-full h-full rounded-full'
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
								className='cursor-pointer m-0 p-0'
								htmlFor='profile-picture-upload'>
								<CameraIcon />
								<input
									id='profile-picture-upload'
									type='file'
									className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e.target.files)}
								/>
							</label>
						</div>
					)}{' '}
				</div>
				<div className='flex-1 space-y-1'>
					<h1 className='text-3xl font-semibold'>{name}</h1>
					<p className='text-gray-500'>{email ? email : name}</p>
					<p>{bio}</p>
				</div>
				<div className='grid grid-cols-3 gap-4'>
					<div className='flex flex-col items-center justify-center'>
						<span className='text-2xl font-semibold text-emerald-600'>{createdRecipesCount}</span>
						<span className='text-gray-600'>receitas</span>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<span className='text-2xl font-semibold text-emerald-700'>{likedRecipesCount}</span>
						<span className='text-gray-600'>curtidas</span>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<span className='text-2xl font-semibold text-red-600'>{likesReceivedCount}</span>
						<span className='text-gray-600'>likes recebidos</span>
					</div>
				</div>
			</div>
		</section>
	);
}
