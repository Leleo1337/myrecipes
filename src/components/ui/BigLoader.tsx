export default function BigLoader({color}: {color: 'black' | 'emerald'}) {
	return (
		<>
			<div className='absolute inset-0 flex items-center justify-center'>
				<div className={`lds-ring ${color === 'black' ? 'text-black' : 'text-emerald-600'}`}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	);
}
