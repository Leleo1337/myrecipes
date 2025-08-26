export function checkVideoExists(videoId: string | null): Promise<boolean> {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
		img.onload = () => {
			resolve(!(img.width === 120 && img.height === 90));
		};
		img.onerror = () => resolve(false);
	});
}
