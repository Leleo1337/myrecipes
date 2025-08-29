export type infoCardProps = {
	icon: any;
	stats: string;
	paragraph: string;
	textColor: 'yellow' | 'red' | 'blue';
};

export type featuredCardProps = {
	icon: any;
	title: string;
	text: string;
	color: 'darkgreen' | 'green' | 'orange';
};

export type profileHeaderProps = {
	userID: string;
	profilePicture: string;
	name: string;
	email: string;
	bio: string;
	createdRecipesCount: number;
	likedRecipesCount: number;
	likesReceivedCount: number;
	isProfileOwner: boolean;
	socialLinks: {
		tiktok: string;
		facebook: string;
		instagram: string;
	};
	onProfileChange: () => void;
};
