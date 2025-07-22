export default function BigLoader({color}: {color: 'white' | 'emerald'}) {
	return (
		<>
			<div className='absolute inset-0 flex items-center justify-center'>
				<div className={`lds-ring ${color === 'white' ? 'text-white' : 'text-emerald-600'}`}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	);
}
