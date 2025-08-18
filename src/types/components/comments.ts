export type commentProps = {
	_id?: string;
	createdBy: {
		_id: string;
		name: string;
		profilePicture: string;
	};
	createdAt: string;
	text: string;
};
