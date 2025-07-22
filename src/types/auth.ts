export type registerForm = {
	name: string;
	email: string;
	password: string;
	confirmation?: string;
};

export type loginForm = {
	user: string;
	password: string;
};
