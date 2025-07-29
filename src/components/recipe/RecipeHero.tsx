import notFoundImage from '../../assets/404Image.jpeg';

export type recipeHeroProps = {
	image?: string;
	title: string;
	description: string;
};

export default function RecipeHero({ image, title, description }: recipeHeroProps) {
	return (
		<>
			<div className='relative h-[35vh] md:h-[50vh]'>
				<img
					src={image ? image : notFoundImage}
					alt='food img'
					className='object-cover w-full h-full rounded-t-2xl brightness-95'
				/>
				<div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 to-transparent md:p-6'>
					<h1 className='text-2xl font-bold text-white'>{title}</h1>
					<p className='text-white'>{description}</p>
				</div>
			</div>
		</>
	);
}
