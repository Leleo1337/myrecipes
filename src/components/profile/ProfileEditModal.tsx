import { Eye, EyeOff, Save, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type profileEditModalProps = {
	isModalOpen: boolean;
	toggleModal: () => void;
};

export default function ProfileEditModal({ isModalOpen, toggleModal }: profileEditModalProps) {
	const [inputType, setInputType] = useState<'password' | 'text'>('password');
	const modalRef = useRef(null);

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
			{isModalOpen && <div className='fixed inset-0 z-40 w-full h-full bg-gray-400/30'></div>}
			<div
				ref={modalRef}
				className={`${isModalOpen ? 'opacity-100' : 'opacity-0 hidden'} absolute inset-0 z-60 p-2`}>
				<div className='w-full max-w-[800px] p-4 bg-white rounded-xl mx-auto'>
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
									name='name'
									id='name'
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
									name='email'
									id='email'
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
									Password *
								</label>
								<div className='relative'>
									<input
										type={inputType}
										name='password'
										id='password'
										autoComplete='off'
										className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring ring-emerald-600 outline-0'
										placeholder={inputType === 'text' ? 'Sua senha' : '••••••••'}
									/>
									<div
										className='absolute bottom-2.5 right-4 hover:scale-105 hover:text-emerald-600 cursor-pointer transition ease-in duration-75 text-gray-600'
										onClick={() => setInputType((inputType) => (inputType === 'password' ? 'text' : 'password'))}>
										{inputType === 'text' ? <EyeOff size={20} /> : <Eye size={20} />}
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
									name='bio'
									id='bio'
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
							<button className='flex items-center gap-2 px-6 py-2 font-semibold text-white transition duration-100 ease-in rounded-md cursor-pointer bg-emerald-600 hover:bg-emerald-700'>
								<Save size={20} /> Salvar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
