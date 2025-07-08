import { Link } from 'react-router';

export default function AuthButtons() {
	return (
		<div className='md:flex md:gap-4'>
			<Link
				to={'/login'}
				className='flex items-center justify-center w-full my-1 md:my-0 py-2 md:px-6 border md:border-0 border-emerald-600/60 rounded-md font-semibold text-emerald-500 md:text-gray-600 hover:text-gray-400 transition ease-in duration-100'>
				Entrar
			</Link>
			<Link
				to={'/register'}
				className='flex items-center justify-center w-full my-1 md:my-0 py-2 md:px-6 bg-emerald-600 rounded-md font-semibold text-white hover:bg-emerald-700 transition ease-in duration-100'>
				Cadastrar
			</Link>
		</div>
	);
}
