export type headerProps = {
	toggleSide: () => void;
};

export type sideBarProps = {
	toggle: () => void;
	open: boolean;
};

export type editHeaderProps = {
	openModal: () => void;
	submitForm: () => void;
};

export type deleteRecipeModalProps = {
	isModalOpen: boolean;
	toggleModal: () => void;
	onDelete: () => void;
};

export type createHeaderProps = {
	submitForm: () => void;
};
