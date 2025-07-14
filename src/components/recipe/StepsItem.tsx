
export type stepsItemProps = {
    step: number
    instructions: string
}
export default function StepsItem({step, instructions}: stepsItemProps) {
	return (
		<li className='flex'>
			<div className='flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold text-white rounded-full bg-emerald-600'>{step}</div>
			<p className='ml-4 text-sm text-gray-900'>{instructions}</p>
		</li>
	);
}
