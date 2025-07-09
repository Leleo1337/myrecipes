type FeaturedCardProps = {
	icon: any;
	title: string;
	text: string;
	color: 'darkgreen' | 'green' | 'orange';
};

const colorClasses = {
	darkgreen: {
		bg: 'bg-emerald-500/10',
		border: 'border-emerald-600/20',
		iconBg: 'bg-emerald-600',
	},
	green: {
		bg: 'bg-lime-500/10',
		border: 'border-lime-500/20',
		iconBg: 'bg-lime-600',
	},
	orange: {
		bg: 'bg-orange-400/10',
		border: 'border-orange-400/20',
		iconBg: 'bg-orange-500',
	},
};

export default function FeaturedCardItem({ icon, title, text, color }: FeaturedCardProps) {
	const selectedColor = colorClasses[color];

	return (
		<div
			className={`${selectedColor.bg} ${selectedColor.border} w-full border p-4 rounded-xl py-8 lg:py-12 shadow-xs hover:shadow-xl transition ease-in duration-100`}>
			<div className='flex flex-col items-center justify-center space-y-2'>
				<div className={`flex items-center justify-center w-16 h-16 ${selectedColor.iconBg} rounded-2xl shadow-md`}>{icon}</div>
				<p className='text-xl font-semibold text-center text-gray-900'>{title}</p>
			</div>
			<p className='mt-2 text-center text-gray-600 lg:text-lg'>{text}</p>
		</div>
	);
}
