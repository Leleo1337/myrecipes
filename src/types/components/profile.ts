export type ProfileHeaderProps = {
	userID: string;
	profilePicture: string;
	name: string;
	email: string;
	bio: string;
	createdRecipesCount: number;
	likedRecipesCount: number;
	likesReceivedCount: number;
	isProfileOnwer: boolean;
	onProfileChange: () => void;
};