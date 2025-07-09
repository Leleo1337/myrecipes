import { Link } from 'react-router';

export default function AuthButtons() {
	return (
		<div className='md:flex md:gap-4'>
			<Link
				to={'/login'}
				className='flex items-center justify-center w-full py-2 my-1 font-semibold transition duration-100 ease-in border rounded-md md:my-0 md:px-6 md:border-0 border-emerald-600/60 text-emerald-500 md:text-gray-600 hover:text-gray-400'>
				Entrar
			</Link>
			<Link
				to={'/register'}
				className='flex items-center justify-center w-full py-2 my-1 font-semibold text-white transition duration-100 ease-in rounded-md md:my-0 md:px-6 bg-emerald-600 hover:bg-emerald-700'>
				Cadastrar
			</Link>
		</div>
	);
}
