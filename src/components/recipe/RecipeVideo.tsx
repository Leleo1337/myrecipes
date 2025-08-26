export default function RecipeVideo({ url }: { url: string }) {
	return (
		<>
			<div className='w-full py-4 mt-8 bg-white border border-gray-300 rounded-md h-134'>
				<iframe
					className='w-full h-full p-4 rounded-md'
					src={url}></iframe>
			</div>
		</>
	);
}
