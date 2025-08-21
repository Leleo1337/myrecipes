import { Eye, EyeOff, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchUserData, updateUser } from '../../services/user';
import { toast } from 'sonner';

export type profileEditModalProps = {
	userID: string;
	isModalOpen: boolean;
	toggleModal: () => void;
};

export type profileEditFormTypes = {
	name: string;
	bio: string;
	email: string;
	currentPassword?: string;
	newPassword?: string;
};

const baseForm = {
	name: '',
	email: '',
	currentPassword: '',
	newPassword: '',
	bio: '',
};

export default function ProfileEditModal({ userID, isModalOpen, toggleModal }: profileEditModalProps) {
	const [profileEditForm, setProfileEditForm] = useState<profileEditFormTypes>(baseForm);
	const [inputTypes, setInputTypes] = useState<{ current: 'password' | 'text'; new: 'password' | 'text' }>({ current: 'password', new: 'password' });

	function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
		const key = e.target.name;
		const value = e.target.value;

		setProfileEditForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleSubmit() {
		const dataToSend = { ...profileEditForm };
		if (!dataToSend.currentPassword) delete dataToSend.currentPassword;
		if (!dataToSend.newPassword) delete dataToSend.newPassword;

		try {
			await updateUser(userID, dataToSend);
			toast.success('Atualizações feitas com sucesso!');
			toggleModal();
			setProfileEditForm(baseForm);
		} catch (error: any) {
			toast.error(error.response.data.msg);
			console.log('erro:', error);
		}
	}

	async function getProfileData(userID: string) {
		try {
			const response = await fetchUserData(userID);
			setProfileEditForm((prev) => ({
				...prev,
				name: response.user.name ?? prev.name,
				email: response.user.email ?? prev.email,
				bio: response.user.bio ?? prev.bio,
			}));
		} catch (error: any) {
			toast.error(error.msg);
		}
	}

	useEffect(() => {
		if (isModalOpen && userID) {
			getProfileData(userID);
		}
	}, [isModalOpen, userID]);

	useEffect(() => {
		const body = document.querySelector('body');
		if (!body) return;

		if (isModalOpen) {
			body.style.overflowY = 'hidden';
		}

		return () => {
			body.style.overflowY = 'auto';
		};
	}, [isModalOpen]);

	return (
		<>
			<div
				className={`transition-all absolute inset-0 z-60 p-2 max-w-[800px] mx-auto ${isModalOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20 pointer-events-none'}`}>
				<div className='w-full p-4 bg-white rounded-xl'>
					<div className='sticky top-0 flex items-center justify-between gap-4 py-2 bg-white'>
						<h1 className='text-xl font-semibold'>Editar perfil</h1>
						<X
							onClick={toggleModal}
							className='cursor-pointer hover:text-emerald-600'
						/>
					</div>
					<div className='overflow-y-auto max-h-[400px] px-4'>
						<div className='flex flex-col gap-4 py-4 overflow-y-auto sm:flex-row'>
							<div className='flex flex-col w-full'>
								<label
									htmlFor='name'
									className='text-sm font-semibold text-gray-600'>
									Nome *
								</label>
								<input
									type='text'
									onChange={handleChange}
									name='name'
									id='name'
									value={profileEditForm.name}
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0 '
									autoComplete='off'
									placeholder='Seu nome de usuario'
								/>
							</div>
							<div className='flex flex-col w-full'>
								<label
									htmlFor='email'
									className='text-sm font-semibold text-gray-600'>
									Email *
								</label>
								<input
									type='text'
									onChange={handleChange}
									name='email'
									id='email'
									value={profileEditForm.email}
									autoComplete='off'
									className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'
									placeholder='Seu Email'
								/>
							</div>
						</div>
						<div className='space-y-4'>
							<div className='flex flex-col w-full'>
								<label
									htmlFor='password'
									className='text-sm font-semibold text-gray-600'>
									Current password *
								</label>
								<div className='relative'>
									<input
										type={inputTypes.current}
										onChange={handleChange}
										name='currentPassword'
										id='currentPassword'
										value={profileEditForm.currentPassword}
										autoComplete='off'
										className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'
										placeholder={inputTypes.current === 'text' ? 'Sua senha' : '••••••••'}
									/>
									<div
										className='absolute bottom-2.5 right-4 hover:scale-105 hover:text-emerald-600 cursor-pointer transition ease-in duration-75 text-gray-600'
										onClick={() => setInputTypes((prev) => ({ ...prev, current: prev.current === 'password' ? 'text' : 'password' }))}>
										{inputTypes.current === 'text' ? <EyeOff size={20} /> : <Eye size={20} />}
									</div>
								</div>
							</div>
							<div className='flex flex-col w-full'>
								<label
									htmlFor='newPassword'
									className='text-sm font-semibold text-gray-600'>
									New password *
								</label>
								<div className='relative'>
									<input
										type={inputTypes.new}
										onChange={handleChange}
										name='newPassword'
										id='newPassword'
										value={profileEditForm.newPassword}
										autoComplete='off'
										className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'
										placeholder={inputTypes.new === 'text' ? 'Sua senha' : '••••••••'}
									/>
									<div
										className='absolute bottom-2.5 right-4 hover:scale-105 hover:text-emerald-600 cursor-pointer transition ease-in duration-75 text-gray-600'
										onClick={() => setInputTypes((prev) => ({ ...prev, new: prev.new === 'password' ? 'text' : 'password' }))}>
										{inputTypes.new === 'text' ? <EyeOff size={20} /> : <Eye size={20} />}
									</div>
								</div>
							</div>
							<div className='flex flex-col w-full'>
								<label
									htmlFor='bio'
									className='text-sm font-semibold text-gray-600'>
									Bio
								</label>
								<textarea
									onChange={handleChange}
									name='bio'
									id='bio'
									value={profileEditForm.bio}
									autoComplete='off'
									placeholder='Sua bio'
									className='w-full px-4 py-2 min-h-[100px] border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'></textarea>
							</div>
						</div>
						<div className='pt-4'>
							<h3 className='py-2 text-lg font-semibold'>Redes sociais</h3>
							<div className='flex flex-col gap-4 sm:flex-row'>
								<div className='flex flex-col w-full'>
									<label
										htmlFor='discord'
										className='text-sm font-semibold text-gray-600'>
										Discord
									</label>
									<input
										type='text'
										id='discord'
										name='discord'
										className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'
									/>
								</div>
								<div className='flex flex-col w-full'>
									<label
										htmlFor='instagram'
										className='text-sm font-semibold text-gray-600'>
										Instagram
									</label>
									<input
										type='text'
										id='instagram'
										name='instagram'
										className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'
									/>
								</div>
								<div className='flex flex-col w-full'>
									<label
										htmlFor='facebook'
										className='text-sm font-semibold text-gray-600'>
										Facebook
									</label>
									<input
										type='text'
										id='facebook'
										name='facebook'
										className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'
									/>
								</div>
							</div>
						</div>
						<div className='flex justify-end gap-4 pt-8 pb-4'>
							<button
								onClick={toggleModal}
								className='px-6 py-2 font-semibold transition duration-100 ease-in border rounded-md cursor-pointer text-emerald-600 border-emerald-600 hover:bg-emerald-600 hover:text-white'>
								Cancelar
							</button>
							<button
								onClick={handleSubmit}
								className='flex items-center gap-2 px-6 py-2 font-semibold text-white transition duration-100 ease-in rounded-md cursor-pointer bg-emerald-600 hover:bg-emerald-700'>
								<Save size={20} /> Salvar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
