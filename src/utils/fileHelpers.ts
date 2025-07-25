export function isFileSupportedFileType(file: File): boolean {
	const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/apng'];
	return supportedTypes.includes(file.type);
}

export function convertFileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result) {
				resolve(reader.result as string);
			} else {
				reject('Erro ao converter imagem');
			}
		};
		reader.onerror = () => reject('Erro ao ler o arquivo');
		reader.readAsDataURL(file);
	});
}
