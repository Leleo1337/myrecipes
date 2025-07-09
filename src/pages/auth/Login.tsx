import { ArrowLeft, ChefHat, LockKeyholeIcon, Mail, User } from 'lucide-react';
import { Link } from 'react-router';

export default function Login() {
	return (
		<>
			<div className='w-full h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700'></div>
			<div className='absolute top-1/2 left-1/2 -translate-1/2 w-[95%] max-w-[450px] bg-white rounded-xl py-6 shadow-md'>
				<div className='px-6 py-4'>
					<Link to={'/'}>
						<ArrowLeft className='transition duration-75 cursor-pointer hover:text-emerald-600 hover:scale-120 ease' />
					</Link>
					<div className='flex flex-col items-center'>
						<div className='relative py-2'>
							<ChefHat
								className='absolute bottom-16.5 left-13 text-emerald-500 my-1'
								size={24}
							/>
							<h1 className='text-4xl font-bold text-center'>Entrar</h1>
							<p className='text-lg font-semibold text-emerald-600'>Bem vindo de volta chefe!</p>
						</div>
					</div>
					<div className='space-y-1.5'>
						<div>
							<label
								className='text-sm font-semibold text-gray-500'
								htmlFor='name'>
								Nome
							</label>
							<div className='relative'>
								<input
									type='text'
									name='name'
									id='name'
									autoComplete='off'
									className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-500'
									placeholder='Nome de usuário'
								/>
								<User className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							</div>
						</div>
						<div>
							<label
								className='text-sm font-semibold text-gray-500'
								htmlFor='email'>
								email
							</label>
							<div className='relative'>
								<input
									type='email'
									name='email'
									id='email'
									autoComplete='off'
									className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-500'
									placeholder='seu@email.com'
								/>
								<Mail className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							</div>
						</div>
						<div>
							<label
								className='text-sm font-semibold text-gray-500'
								htmlFor='password'>
								Senha
							</label>
							<div className='relative'>
								<input
									type='password'
									name='password'
									id='password'
									autoComplete='off'
									className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-500'
									placeholder='••••••••'
								/>
								<LockKeyholeIcon className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
							</div>
							<div className='flex justify-between pt-2'>
								<div className='flex gap-1.5 items-center justify-center'>
									<input
										type='checkbox'
										name='remember'
										id='remember'
									/>
									<label htmlFor='remember'>Lembrar-me</label>
								</div>
								<Link
									to={'/forgot'}
									className='text-emerald-700 hover:underline'>
									Esqueci minha senha
								</Link>
							</div>
						</div>
						<button className='w-full px-4 py-3 mt-4 font-semibold text-white transition duration-75 rounded-md cursor-pointer bg-emerald-500 hover:bg-emerald-600 ease'>
							Entrar
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
