import { useEffect, useState } from 'react';
import { getVideoId } from '../../../utils/getVideoId';
import { toast } from 'sonner';
import { checkVideoExists } from '../../../utils/videoExists';

export type videoFormTypes = {
	formVideoID?: string;
	onVideoLoad: (id: string) => void;
};

export default function VideoForm({ onVideoLoad, formVideoID }: videoFormTypes) {
	const [videoUrl, setVideoUrl] = useState('');
	const [videoID, setVideoID] = useState<string | null>('');
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	async function handleLoadVideo() {
		setVideoID('');
		setIsVideoLoaded(false);
		const videoId = getVideoId(videoUrl);
		const videoExists = await checkVideoExists(videoId);
		if (videoExists) {
			setIsVideoLoaded(true);
			setVideoID(videoId);
			onVideoLoad(videoId!);
			toast.success('URL valida');
		} else {
			toast.error('URL invalida');
			setVideoID('');
			onVideoLoad('');
		}
	}

	function handleVideoUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;

		setVideoUrl(value);
	}

	useEffect(() => {
		if (formVideoID) {
			setVideoID(formVideoID);
            setVideoUrl(`https://www.youtube.com/watch?v=${formVideoID}`)
			setIsVideoLoaded(true);
		}
        console.log(formVideoID)
	}, [formVideoID]);

	return (
		<>
			<div className='w-full py-4 mt-8 bg-white border border-gray-300 rounded-md'>
				<div className='flex flex-col gap-1 p-4'>
					<label
						htmlFor='videoUrl'
						className='text-sm font-semibold text-gray-800'>
						Youtube video url
					</label>
					<div className='flex gap-2'>
						<input
							type='text'
							name='videoUrl'
							id='videoUrl'
                            value={videoUrl}
							placeholder='https://www.youtube.com/watch?v=Cyskqnp1j64'
							onChange={handleVideoUrlChange}
							autoComplete='off'
							className='w-full px-4 py-2.5 border rounded-md bg-slate-50 border-slate-300 placeholder:text-sm placeholder:text-gray-300'
						/>
						<button
							onClick={handleLoadVideo}
							className='px-6 py-2 font-semibold text-white transition duration-100 ease-in rounded-md cursor-pointer bg-emerald-600 hover:bg-emerald-700'>
							Enviar
						</button>
					</div>
				</div>
				{isVideoLoaded && (
					<div className='w-full h-124'>
						<iframe
							className='w-full h-full p-4 rounded-md'
							src={`https://www.youtube.com/embed/${videoID}`}></iframe>
					</div>
				)}
			</div>
		</>
	);
}
