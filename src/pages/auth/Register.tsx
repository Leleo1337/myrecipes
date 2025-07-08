import { ArrowLeft, ChefHat, LockKeyholeIcon, Mail, User } from 'lucide-react';
import { Link } from 'react-router';

export default function Register() {
	return (
		<>
			<div className='w-full h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700'></div>
			<div className='absolute top-1/2 left-1/2 -translate-1/2 w-[95%] max-w-[450px] bg-white rounded-xl py-6 shadow-md'>
				<div className='px-6 py-4'>
					<Link to={'/'}>
						<ArrowLeft className='cursor-pointer hover:text-emerald-600 hover:scale-120 transition ease duration-75' />
					</Link>
					<div className='flex flex-col items-center'>
						<div className='relative py-2'>
							<ChefHat
								className='absolute bottom-14 left-34.5 text-emerald-600 my-1'
								size={24}
							/>
							<h1 className='text-center text-4xl font-bold'>Criar conta</h1>
							<p className='text-lg text-emerald-600 font-semibold'>Junte-se à nossa comunidade!</p>
						</div>
					</div>
					<div className='space-y-2'>
						<div>
							<label
								className='text-gray-500 font-semibold text-sm'
								htmlFor='name'>
								Nome
							</label>
							<div className='relative'>
								<input
									type='text'
									name='name'
									id='name'
									autoComplete='off'
									className='w-full border border-gray-400 rounded-md pl-12 py-2 outline-0 focus:ring ring-emerald-600'
									placeholder='Nome de usuário'
								/>
								<User className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
							</div>
						</div>
						<div>
							<label
								className='text-gray-500 font-semibold text-sm'
								htmlFor='email'>
								email
							</label>
							<div className='relative'>
								<input
									type='email'
									name='email'
									id='email'
									autoComplete='off'
									className='w-full border border-gray-400 rounded-md pl-12 py-2 outline-0 focus:ring ring-emerald-600'
									placeholder='seu@email.com'
								/>
								<Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
							</div>
						</div>
						<div>
							<label
								className='text-gray-500 font-semibold text-sm'
								htmlFor='password'>
								Senha
							</label>
							<div className='relative'>
								<input
									type='password'
									name='password'
									id='password'
									autoComplete='off'
									className='w-full border border-gray-400 rounded-md pl-12 py-2 outline-0 focus:ring ring-emerald-600'
									placeholder='••••••••'
								/>
								<LockKeyholeIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
							</div>
						</div>
						<div>
							<label
								className='text-gray-500 font-semibold text-sm'
								htmlFor='name'>
								Confirme a senha
							</label>
							<div className='relative'>
								<input
									type='text'
									name='name'
									id='name'
									autoComplete='off'
									className='w-full border border-gray-400 rounded-md pl-12 py-2 outline-0 focus:ring ring-emerald-600'
									placeholder='Confirme a senha'
								/>
								<LockKeyholeIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
							</div>
						</div>
						<button className='w-full mt-4 bg-emerald-600 hover:bg-emerald-700 cursor-pointer py-3 px-4 text-white font-semibold rounded-md transition ease duration-75'>
							Criar conta
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
