import { Heart, Star, Users2 } from 'lucide-react';
import FeaturedCardItem from './FeaturedCardItem';

export default function FeaturedCard() {
	return (
		<div className='flex flex-col items-center justify-center gap-4 mt-12 lg:flex-row'>
			<FeaturedCardItem
				icon={
					<Users2
						size={30}
						color='white'
					/>
				}
				title='Comunidade Ativa'
				text='Conecte-se com outros amantes de culinária, compartilhe experiências e aprenda novas receitas.'
				color='darkgreen'
			/>
			<FeaturedCardItem
				icon={
					<Heart
						size={30}
						color='white'
					/>
				}
				title='Favoritos e Likes'
				text='Salve receitas preferidas, deixe seu like e comente nas criações da comunidade gastronômica.'
				color='green'
			/>
			<FeaturedCardItem
				icon={
					<Star
						size={30}
						color='white'
					/>
				}
				title='Receitas Variadas'
				text='Descubra pratos que vão dos mais casuais aos mais elaborados, para todos os níveis e ocasiões.'
				color='orange'
			/>
		</div>
	);
}
