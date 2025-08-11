import type { infoCardProps } from '../../../types/components/homeComponentsProps';

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
		<div className='p-4 space-y-1 bg-white/30 rounded-2xl'>
			{icon}
			<p className='text-lg font-bold'>{stats}</p>
			<span className={`${selectedColor}`}>{paragraph}</span>
		</div>
	);
}
