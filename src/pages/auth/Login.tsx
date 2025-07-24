import { ArrowLeft, ChefHat, Eye, EyeOff, LockKeyholeIcon, User } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { getToken, login } from '../../services/auth';
import BigLoader from '../../components/ui/BigLoader';
import AuthContext from '../../context/auth';

export default function Login() {
	const [inputType, setInputType] = useState<'password' | 'text'>('password');
	const [loginForm, setLoginForm] = useState({ user: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const key = e.target.name;
		const value = e.target.value;

		setLoginForm((prev) => ({ ...prev, [key]: value }));
	}

	async function handleSubmit() {
		setIsLoading(false);
		try {
			await login(loginForm);
			const token = getToken();
			if (!token) {
				return;
			}
			setIsLoading(true);
			setTimeout(() => {
				auth?.login(token);
			}, 2000);
			toast.success('Welcome back!');
		} catch (error: any) {
			setError(error.response.data.msg);
		}
	}

	useEffect(() => {
		if (auth?.token) {
			navigate('/recipes');
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
									htmlFor='user'>
									Usuario
								</label>
								<div className='relative'>
									<input
										type='text'
										name='user'
										id='user'
										value={loginForm.user}
										onChange={handleChange}
										autoComplete='off'
										className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-500'
										placeholder='Usuario ou e-mail'
									/>
									<User className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
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
										type={inputType}
										name='password'
										id='password'
										value={loginForm.password}
										onChange={handleChange}
										autoComplete='off'
										className='w-full py-2 pl-12 border border-gray-400 rounded-md outline-0 focus:ring ring-emerald-500'
										placeholder='••••••••'
									/>
									<LockKeyholeIcon className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400' />
									<div
										className='absolute bottom-2.5 right-4 hover:scale-105 cursor-pointer transition ease-in duration-75 text-gray-600'
										onClick={() => setInputType((inputType) => (inputType === 'password' ? 'text' : 'password'))}>
										{inputType === 'text' ? <EyeOff size={20} /> : <Eye size={20} />}
									</div>
								</div>
								<div className='pt-1'>
									<div className='text-sm text-red-600 '> {error} </div>
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
							<button
								onClick={handleSubmit}
								className='w-full px-4 py-3 mt-4 font-semibold text-white transition duration-75 rounded-md cursor-pointer bg-emerald-500 hover:bg-emerald-600 ease'>
								Entrar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
