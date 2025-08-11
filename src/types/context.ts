export type AuthContextTypes = {
	token: string | null;
	login: (token: string) => void;
	logOut: () => void;
	isAuthenticated: boolean;
};

export type UserDataType = {
	userID?: string;
	username?: string;
	profilePicture?: string;
};

export type UserContextType = UserDataType & {
	setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
};