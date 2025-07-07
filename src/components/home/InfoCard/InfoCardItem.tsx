type infoCardProps = {
	icon: any;
	stats: string;
	paragraph: string;
	textColor: 'yellow' | 'red' | 'blue';
};

const colorClasses = {
	yellow: {
		text: 'text-yellow-200',
	},
	red: {
		text: 'text-red-200',
	},
	blue: {
		text: 'text-blue-200',
	},
};

export default function InfoCardItem({ icon, stats, paragraph, textColor }: infoCardProps) {
	const selectedColor = colorClasses[textColor];
	return (
		<div className='bg-white/30 rounded-2xl p-4 space-y-1'>
			{icon}
			<p className='font-bold text-lg'>{stats}</p>
			<span className={`${selectedColor}`}>{paragraph}</span>
		</div>
	);
}
