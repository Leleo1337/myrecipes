import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { ArrowLeft, ChefHat, Eye, EyeOff, LockKeyholeIcon, Mail, User } from 'lucide-react';
import type { registerForm } from '../../types/auth';
import { register } from '../../services/auth';
import BigLoader from '../../components/ui/BigLoader';
import AuthContext from '../../context/auth';

export default function Register() {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const [inputTypes, setInputType] = useState({
		password: 'password',
		passwordConfirmation: 'password',
	});
	const [registerForm, setRegisterForm] = useState<registerForm>({ name: '', confirmation: '', email: '', password: '' });
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const key = e.target.name;
		const value = e.target.value;

		setRegisterForm((prev: any) => ({ ...prev, [key]: value }));
	}

	async function handleSubmit() {
		setIsLoading(false);
		setError('');

		try {
			const response = await register(registerForm);
			const token = response.token;
			setIsLoading(true);
			if (response && token) {
				toast.success('Usuario registrado com sucesso!');
				setTimeout(() => {
					navigate('/login');
				}, 1000);
			}
		} catch (error: any) {
			setError(error.response.data.msg);
		}
	}

	useEffect(() => {
		if (auth?.token) {
			navigate('/recipes');
			toast.message('Usuario já autenticado!')
		}
	}, [auth?.token]);

	return (
		<>
			<div className='w-full h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700'></div>
			{isLoading ? (
				<BigLoader color={'white'} />
			) : (
				<div className='absolute top-1/2 left-1/2 -translate-1/2 w-[95%] max-w-[450px] bg-white rounded-xl py-4 shadow-md'>
					<div className='px-6 py-4'>
						<Link
							to={'/'}
							className='inline-block'>
							<ArrowLeft className='transition duration-75 cursor-pointer hover:text-emerald-600 hover:scale-120 ease' />
						</Link>
						<div className='flex flex-col items-center'>
							<div className='relative py-2'>
								<ChefHat
									className='absolute bottom-14 left-34.5 text-emerald-600 my-1'
									size={24}
								/>
								<h1 className='text-4xl font-bold text-center'>Criar conta</h1>
								<p className='text-lg font-semibold text-emerald-600'>Junte-se à nossa comunidade!</p>
							</div>
						</div>
						<div className='space-y-2'>
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
										onChange={handleChange}
										value={registerForm?.name}
										autoComplete='off'
										className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-600'
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
										onChange={handleChange}
										value={registerForm?.email}
										autoComplete='off'
										className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-600'
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
										type={inputTypes.password}
										name='password'
										id='password'
										value={registerForm?.password}
										onChange={handleChange}
										autoComplete='off'
										className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-600'
										placeholder='••••••••'
									/>
									<LockKeyholeIcon className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
									<div
										className='absolute bottom-2.5 right-4 hover:scale-105 cursor-pointer transition ease-in duration-75 text-gray-600'
										onClick={() => setInputType((inputType) => ({ ...inputType, password: inputType.password === 'password' ? 'text' : 'password' }))}>
										{inputTypes.password === 'text' ? <EyeOff size={20} /> : <Eye size={20} />}
									</div>
								</div>
							</div>
							<div>
								<label
									className='text-sm font-semibold text-gray-500'
									htmlFor='confirmation'>
									Confirme a senha
								</label>
								<div className='relative'>
									<input
										type={inputTypes.passwordConfirmation}
										name='confirmation'
										id='confirmation'
										value={registerForm?.confirmation}
										onChange={handleChange}
										autoComplete='off'
										className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-600'
										placeholder='Confirme a senha'
									/>
									<LockKeyholeIcon className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
									<div
										className='absolute bottom-2.5 right-4 hover:scale-105 cursor-pointer transition ease-in duration-75 text-gray-600'
										onClick={() =>
											setInputType((inputType) => ({
												...inputType,
												passwordConfirmation: inputType.passwordConfirmation === 'password' ? 'text' : 'password',
											}))
										}>
										{inputTypes.passwordConfirmation === 'text' ? <EyeOff size={20} /> : <Eye size={20} />}
									</div>
								</div>
							</div>
							<div>
								<div className='text-sm text-red-600 '> {error} </div>
							</div>
							<button
								onClick={handleSubmit}
								className='w-full px-4 py-3 mt-4 font-semibold text-white transition duration-75 rounded-md cursor-pointer bg-emerald-600 hover:bg-emerald-700 ease'>
								Criar conta
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
