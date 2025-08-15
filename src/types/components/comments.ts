export type commentProps = {
	_id?: string;
	createdBy: {
		name: string;
		profilePicture: string;
	};
	createdAt: string;
	text: string;
};
