export type commentProps = {
	_id: string;
	recipeID: string
	createdBy: {
		_id: string;
		name: string;
		profilePicture: string;
	};
	createdAt: string;
	text: string;
	fetchComments: (page: number) => Promise<void>
};
