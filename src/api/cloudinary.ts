import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

async function generateLinkFromImage(fileObj: FileList): Promise<string | undefined> {
	const image = fileObj[0];

	const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/apng'];
	if (!supportedTypes.includes(image.type)) {
		return;
	}

	const data = new FormData();

	data.append('file', image);
	data.append('upload_preset', 'recipes');
	data.append('cloud_name', CLOUD_NAME);

	console.log(data);

	try {
		const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data);
		return response.data.secure_url;
	} catch (error) {
		window.alert('Erro ao fazer upload');
	}
}

export default generateLinkFromImage;
