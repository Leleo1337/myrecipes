import { ChartColumn, Heart, Stars } from "lucide-react";
import InfoCardItem from "./InfoCardItem";


export default function InfoCard() {
	return (
		<div className='hidden lg:grid grid-cols-2 bg-white/10 border backdrop:blur-2xl border-white/20 rounded-3xl w-full p-8 gap-4 hover:scale-102 transition ease-in duration-150'>
			<InfoCardItem
				icon={
					<Stars
						className='text-yellow-300'
						size={36}
					/>
				}
				stats='1000+'
				paragraph='Receitas'
				textColor='yellow'
			/>
			<InfoCardItem
				icon={
					<Stars
						className='text-blue-200'
						size={36}
					/>
				}
				stats='50+'
				paragraph='Chefs'
				textColor='blue'
			/>
			<InfoCardItem
				icon={
					<Heart
						className='text-red-300'
						size={36}
					/>
				}
				stats='1000+'
				paragraph='Likes'
				textColor='red'
			/>
			<InfoCardItem
				icon={
					<ChartColumn
						className='text-blue-200'
						size={36}
					/>
				}
				stats='100%'
				paragraph='Satisfação'
				textColor='blue'
			/>
		</div>
	);
}
