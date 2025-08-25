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

export type profileEditModalProps = {
	userID: string;
	isModalOpen: boolean;
	toggleModal: () => void;
};

export type profileEditFormTypes = {
	name: string;
	bio: string;
	email: string;
	currentPassword?: string;
	newPassword?: string;
};
