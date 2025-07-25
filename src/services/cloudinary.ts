import axios from 'axios';
import { isFileSupportedFileType } from '../utils/fileHelpers';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

async function generateImageLinkFromFile(fileObj: FileList | null): Promise<string | undefined> {
	if (!fileObj) return;
	const image = fileObj[0];

	if (!isFileSupportedFileType(image)) return;

	const data = new FormData();

	data.append('file', image);
	data.append('upload_preset', 'recipes');
	data.append('cloud_name', CLOUD_NAME);

	try {
		const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data);
		return response.data.secure_url;
	} catch (error) {
		window.alert('Erro ao fazer upload');
	}
}

export default generateImageLinkFromFile;
