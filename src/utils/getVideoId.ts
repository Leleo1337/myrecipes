export function getVideoId(url: string): string | null {
    // validates youtube url & returns id
	const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^?&]+)/;
	const match = url.match(regex);
	return match ? match[1] || match[2] : null;
}
